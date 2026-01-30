import { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Loader2, ServerCrash } from "lucide-react";
import ChatItem from "./ChatItem";
import ChatWelcome from "./ChatWelcome";
import { useSocket } from "@/context/SocketProvider";
import { getDirectMessages, editDirectMessage, deleteDirectMessage } from "@/services/apiConversation";
import { DirectMessageType, MemberType } from "@/utils/types";

interface ChatMessagesDirectProps {
    name: string;
    member: MemberType;
    conversationId: string;
    type: "conversation";
}

const ChatMessagesDirect = ({
    name,
    member,
    conversationId,
    type,
}: ChatMessagesDirectProps) => {
    const [messages, setMessages] = useState<DirectMessageType[]>([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [cursor, setCursor] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { getToken } = useAuth();
    const { socket } = useSocket();
    const bottomRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);

    const fetchMessages = useCallback(async (cursorId?: string) => {
        try {
            const token = await getToken();
            if (!token) return;

            if (cursorId) {
                setIsFetchingMore(true);
            } else {
                setIsLoading(true);
            }

            const data = await getDirectMessages(token, conversationId, cursorId);

            if (cursorId) {
                setMessages((prev) => [...prev, ...data.items]);
            } else {
                setMessages(data.items);
            }

            setCursor(data.nextCursor);
            setHasNextPage(!!data.nextCursor);
        } catch (err) {
            console.error("Failed to fetch messages:", err);
            setError("Failed to load messages");
        } finally {
            setIsLoading(false);
            setIsFetchingMore(false);
        }
    }, [conversationId, getToken]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        if (!socket) return;

        socket.emit("join:conversation", conversationId);

        const handleNewMessage = (message: DirectMessageType) => {
            setMessages((prev) => [message, ...prev]);
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        const handleUpdateMessage = (updatedMessage: DirectMessageType) => {
            setMessages((prev) =>
                prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
            );
        };

        socket.on("directMessage:new", handleNewMessage);
        socket.on("directMessage:update", handleUpdateMessage);

        return () => {
            socket.emit("leave:conversation", conversationId);
            socket.off("directMessage:new", handleNewMessage);
            socket.off("directMessage:update", handleUpdateMessage);
        };
    }, [socket, conversationId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingMore && cursor) {
                    fetchMessages(cursor);
                }
            },
            { threshold: 0.1 }
        );

        if (topRef.current) {
            observer.observe(topRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingMore, cursor, fetchMessages]);

    const handleEdit = async (messageId: string, content: string) => {
        try {
            const token = await getToken();
            if (!token) return;
            await editDirectMessage(token, conversationId, messageId, content);
        } catch (err) {
            console.error("Failed to edit message:", err);
        }
    };

    const handleDelete = async (messageId: string) => {
        try {
            const token = await getToken();
            if (!token) return;
            await deleteDirectMessage(token, conversationId, messageId);
        } catch (err) {
            console.error("Failed to delete message:", err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
                <p className="text-xs text-zinc-400">Loading messages...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center">
                <ServerCrash className="my-4 h-7 w-7 text-zinc-500" />
                <p className="text-xs text-zinc-400">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col overflow-y-auto py-4">
            {!hasNextPage && <ChatWelcome type={type} name={name} />}

            {isFetchingMore && (
                <div className="flex justify-center">
                    <Loader2 className="my-4 h-6 w-6 animate-spin text-zinc-500" />
                </div>
            )}

            <div ref={topRef} />

            <div className="mt-auto flex flex-col-reverse">
                {messages.map((message) => (
                    <ChatItem
                        key={message.id}
                        id={message.id}
                        content={message.content}
                        member={message.member}
                        timestamp={message.createdAt}
                        fileUrl={message.fileUrl}
                        deleted={message.deleted}
                        currentMember={member}
                        isUpdated={message.createdAt !== message.updatedAt}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <div ref={bottomRef} />
        </div>
    );
};

export default ChatMessagesDirect;
