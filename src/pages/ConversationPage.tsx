import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Loader2 } from "lucide-react";
import ChatNavbar from "@/features/chat/ChatNavbar";
import ChatInput from "@/features/chat/ChatInput";
import ChatMessagesDirect from "@/features/chat/ChatMessagesDirect";
import { getConversation } from "@/services/apiConversation";
import { ConversationType, MemberType } from "@/utils/types";
import { useUser } from "@/features/auth/useUser";

const ConversationPage = () => {
    const { conversationId, serverId } = useParams();
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { currentUser } = useUser();

    const [conversation, setConversation] = useState<ConversationType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentMember, setCurrentMember] = useState<MemberType | null>(null);
    const [otherMember, setOtherMember] = useState<MemberType | null>(null);

    useEffect(() => {
        const fetchConversation = async () => {
            if (!conversationId) return;

            try {
                const token = await getToken();
                if (!token) return;

                const data = await getConversation(token, conversationId);
                setConversation(data);

                if (currentUser) {
                    if (data.memberOne.profileId === currentUser.id) {
                        setCurrentMember(data.memberOne);
                        setOtherMember(data.memberTwo);
                    } else {
                        setCurrentMember(data.memberTwo);
                        setOtherMember(data.memberOne);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch conversation:", error);
                navigate(`/servers/${serverId}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConversation();
    }, [conversationId, getToken, currentUser, navigate, serverId]);

    if (isLoading) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#1D203E]">
                <Loader2 className="h-8 w-8 animate-spin text-[#AF79F9]" />
                <p className="mt-2 text-sm text-zinc-400">Loading conversation...</p>
            </div>
        );
    }

    if (!conversation || !currentMember || !otherMember) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#1D203E]">
                <p className="text-sm text-zinc-400">Conversation not found</p>
            </div>
        );
    }

    return (
        <div className="flex h-full w-full flex-col bg-[#1D203E]">
            <ChatNavbar
                label={otherMember.profile.name}
                type="conversation"
                imageUrl={otherMember.profile.imageUrl}
            />

            <div className="flex flex-1 flex-col overflow-hidden">
                <ChatMessagesDirect
                    name={otherMember.profile.name}
                    member={currentMember}
                    conversationId={conversation.id}
                    type="conversation"
                />
                <ChatInput
                    conversationId={conversation.id}
                    type="conversation"
                    name={otherMember.profile.name}
                />
            </div>
        </div>
    );
};

export default ConversationPage;
