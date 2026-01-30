import { useEffect, useState, useRef } from "react";
import { useSocket } from "@/context/SocketProvider";
import { Loader2, Mic, MicOff, Video, VideoOff, PhoneOff } from "lucide-react";

interface MediaRoomProps {
    channelId: string;
    video: boolean;
    audio: boolean;
}

interface Participant {
    peerId: string;
    profileId: string;
    stream?: MediaStream;
}

const MediaRoom = ({ channelId, video, audio }: MediaRoomProps) => {
    const [isConnecting, setIsConnecting] = useState(true);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [isMuted, setIsMuted] = useState(!audio);
    const [isVideoOff, setIsVideoOff] = useState(!video);

    const { socket, isConnected } = useSocket();
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnections = useRef<Map<string, RTCPeerConnection>>(new Map());

    const iceServers = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
        ],
    };

    useEffect(() => {
        const initializeMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: video,
                    audio: audio,
                });

                setLocalStream(stream);

                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                setIsConnecting(false);
            } catch (error) {
                console.error("Failed to get media devices:", error);
                setIsConnecting(false);
            }
        };

        initializeMedia();

        return () => {
            localStream?.getTracks().forEach((track) => track.stop());
        };
    }, [video, audio]);

    useEffect(() => {
        if (!socket || !isConnected || !localStream) return;

        socket.emit("webrtc:join", {
            channelId,
            peerId: socket.id,
        });

        socket.on("webrtc:user-joined", async ({ peerId, profileId }) => {
            console.log("User joined:", peerId);

            const peerConnection = new RTCPeerConnection(iceServers);
            peerConnections.current.set(peerId, peerConnection);

            localStream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, localStream);
            });

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    socket.emit("webrtc:signal", {
                        targetPeerId: peerId,
                        signal: { type: "candidate", candidate: event.candidate },
                    });
                }
            };

            peerConnection.ontrack = (event) => {
                setParticipants((prev) => {
                    const existing = prev.find((p) => p.peerId === peerId);
                    if (existing) {
                        return prev.map((p) =>
                            p.peerId === peerId ? { ...p, stream: event.streams[0] } : p
                        );
                    }
                    return [...prev, { peerId, profileId, stream: event.streams[0] }];
                });
            };

            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            socket.emit("webrtc:signal", {
                targetPeerId: peerId,
                signal: { type: "offer", sdp: offer },
            });
        });

        socket.on("webrtc:signal", async ({ peerId, signal }) => {
            let peerConnection = peerConnections.current.get(peerId);

            if (!peerConnection) {
                peerConnection = new RTCPeerConnection(iceServers);
                peerConnections.current.set(peerId, peerConnection);

                localStream.getTracks().forEach((track) => {
                    peerConnection!.addTrack(track, localStream);
                });

                peerConnection.onicecandidate = (event) => {
                    if (event.candidate) {
                        socket.emit("webrtc:signal", {
                            targetPeerId: peerId,
                            signal: { type: "candidate", candidate: event.candidate },
                        });
                    }
                };

                peerConnection.ontrack = (event) => {
                    setParticipants((prev) => {
                        const existing = prev.find((p) => p.peerId === peerId);
                        if (existing) {
                            return prev.map((p) =>
                                p.peerId === peerId ? { ...p, stream: event.streams[0] } : p
                            );
                        }
                        return [...prev, { peerId, profileId: "", stream: event.streams[0] }];
                    });
                };
            }

            if (signal.type === "offer") {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp));
                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);

                socket.emit("webrtc:signal", {
                    targetPeerId: peerId,
                    signal: { type: "answer", sdp: answer },
                });
            } else if (signal.type === "answer") {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp));
            } else if (signal.type === "candidate") {
                await peerConnection.addIceCandidate(new RTCIceCandidate(signal.candidate));
            }
        });

        socket.on("webrtc:user-left", ({ peerId }) => {
            const peerConnection = peerConnections.current.get(peerId);
            if (peerConnection) {
                peerConnection.close();
                peerConnections.current.delete(peerId);
            }
            setParticipants((prev) => prev.filter((p) => p.peerId !== peerId));
        });

        return () => {
            socket.emit("webrtc:leave", { channelId });
            socket.off("webrtc:user-joined");
            socket.off("webrtc:signal");
            socket.off("webrtc:user-left");

            peerConnections.current.forEach((pc) => pc.close());
            peerConnections.current.clear();
        };
    }, [socket, isConnected, localStream, channelId]);

    const toggleMute = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled;
            });
            setIsVideoOff(!isVideoOff);
        }
    };

    const leaveCall = () => {
        localStream?.getTracks().forEach((track) => track.stop());
        window.history.back();
    };

    if (isConnecting) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center bg-[#1D203E]">
                <Loader2 className="my-4 h-10 w-10 animate-spin text-[#AF79F9]" />
                <p className="text-sm text-zinc-400">Connecting to media room...</p>
            </div>
        );
    }

    return (
        <div className="relative flex flex-1 flex-col bg-[#1D203E]">
            <div className="flex-1 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-[#2A2D4E]">
                        <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                            You
                        </div>
                    </div>

                    {participants.map((participant) => (
                        <ParticipantVideo
                            key={participant.peerId}
                            stream={participant.stream}
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 p-4">
                <button
                    onClick={toggleMute}
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition ${isMuted ? "bg-red-500" : "bg-[#2A2D4E] hover:bg-[#3A3D5E]"
                        }`}
                >
                    {isMuted ? (
                        <MicOff className="h-5 w-5 text-white" />
                    ) : (
                        <Mic className="h-5 w-5 text-white" />
                    )}
                </button>

                {video && (
                    <button
                        onClick={toggleVideo}
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition ${isVideoOff ? "bg-red-500" : "bg-[#2A2D4E] hover:bg-[#3A3D5E]"
                            }`}
                    >
                        {isVideoOff ? (
                            <VideoOff className="h-5 w-5 text-white" />
                        ) : (
                            <Video className="h-5 w-5 text-white" />
                        )}
                    </button>
                )}

                <button
                    onClick={leaveCall}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 transition hover:bg-red-600"
                >
                    <PhoneOff className="h-5 w-5 text-white" />
                </button>
            </div>
        </div>
    );
};

const ParticipantVideo = ({ stream }: { stream?: MediaStream }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <div className="relative aspect-video overflow-hidden rounded-lg bg-[#2A2D4E]">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="h-full w-full object-cover"
            />
        </div>
    );
};

export default MediaRoom;
