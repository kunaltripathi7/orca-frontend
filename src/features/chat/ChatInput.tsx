import { useState, FormEvent, useRef } from "react";
import { Plus, Send, Loader2, X, FileIcon, ImageIcon } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { sendMessage } from "@/services/apiMessages";
import { sendDirectMessage } from "@/services/apiConversation";
import EmojiPicker from "@/components/EmojiPicker";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:7000";

interface ChatInputProps {
    channelId?: string;
    serverId?: string;
    conversationId?: string;
    type: "channel" | "conversation";
    name: string;
}

const ChatInput = ({
    channelId,
    serverId,
    conversationId,
    type,
    name,
}: ChatInputProps) => {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { getToken } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        try {
            setIsLoading(true);
            const token = await getToken();
            if (!token) return;

            if (type === "channel" && channelId && serverId) {
                await sendMessage(token, channelId, serverId, content);
            } else if (type === "conversation" && conversationId) {
                await sendDirectMessage(token, conversationId, content);
            }

            setContent("");
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        try {
            setIsUploading(true);
            const token = await getToken();
            if (!token) return;

            const formData = new FormData();
            formData.append("file", selectedFile);

            const uploadRes = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            const fileUrl = uploadRes.data.url;

            if (type === "channel" && channelId && serverId) {
                await sendMessage(token, channelId, serverId, selectedFile.name, fileUrl);
            } else if (type === "conversation" && conversationId) {
                await sendDirectMessage(token, conversationId, selectedFile.name, fileUrl);
            }

            setSelectedFile(null);
            setIsUploadOpen(false);
        } catch (error) {
            console.error("Failed to upload file:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleEmojiSelect = (emoji: string) => {
        setContent((prev) => prev + emoji);
    };

    const isImage = selectedFile?.type.startsWith("image/");

    return (
        <form onSubmit={handleSubmit} className="p-4 pb-6">
            <div className="relative flex items-center rounded-lg bg-[#2A2D4E] p-2">
                <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                    <DialogTrigger asChild>
                        <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#AF79F9] text-white transition hover:opacity-80"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="border-[#2A2D4E] bg-[#1D203E] text-white">
                        <DialogHeader>
                            <DialogTitle>Add an attachment</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Send a file as a message
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <input
                                ref={fileInputRef}
                                type="file"
                                onChange={handleFileSelect}
                                className="hidden"
                                accept="image/*,.pdf,.doc,.docx,.txt"
                            />

                            {selectedFile ? (
                                <div className="relative rounded-lg bg-[#2A2D4E] p-4">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedFile(null)}
                                        className="absolute -right-2 -top-2 rounded-full bg-rose-500 p-1"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                    <div className="flex items-center gap-x-4">
                                        {isImage ? (
                                            <ImageIcon className="h-10 w-10 text-[#AF79F9]" />
                                        ) : (
                                            <FileIcon className="h-10 w-10 text-[#AF79F9]" />
                                        )}
                                        <div>
                                            <p className="text-sm font-medium">{selectedFile.name}</p>
                                            <p className="text-xs text-zinc-400">
                                                {(selectedFile.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-[#AF79F9] p-8 transition hover:bg-[#2A2D4E]"
                                >
                                    <div className="text-center">
                                        <Plus className="mx-auto h-10 w-10 text-[#AF79F9]" />
                                        <p className="mt-2 text-sm text-zinc-400">
                                            Click to select a file
                                        </p>
                                    </div>
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={handleFileUpload}
                                disabled={!selectedFile || isUploading}
                                className="w-full rounded-lg bg-[#AF79F9] py-2 text-white transition hover:opacity-80 disabled:opacity-50"
                            >
                                {isUploading ? (
                                    <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                                ) : (
                                    "Send"
                                )}
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>

                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`Message ${type === "channel" ? "#" : ""}${name}`}
                    disabled={isLoading}
                    className="flex-1 border-none bg-transparent px-4 text-sm text-zinc-200 placeholder:text-zinc-400 focus:outline-none disabled:opacity-50"
                />

                <EmojiPicker onChange={handleEmojiSelect} />

                <button
                    type="submit"
                    disabled={isLoading || !content.trim()}
                    className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#AF79F9] text-white transition hover:opacity-80 disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </button>
            </div>
        </form>
    );
};

export default ChatInput;
