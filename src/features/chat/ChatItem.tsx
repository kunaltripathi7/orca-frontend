import { useState } from "react";
import { format } from "date-fns";
import { Edit, Trash, FileIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { MemberRole, MemberType } from "@/utils/types";

interface ChatItemProps {
    id: string;
    content: string;
    member: MemberType;
    timestamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: MemberType;
    isUpdated: boolean;
    type: "channel" | "conversation";
    onEdit?: (messageId: string, content: string) => void;
    onDelete?: (messageId: string) => void;
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="ml-1 h-4 w-4 text-[#AF79F9]" />,
    [MemberRole.ADMIN]: <ShieldAlert className="ml-1 h-4 w-4 text-rose-500" />,
};

const ChatItem = ({
    id,
    content,
    member,
    timestamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    type,
    onEdit,
    onDelete,
}: ChatItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);

    const isOwner = currentMember.id === member.id;
    const canDeleteMessage = !deleted && (isOwner || currentMember.role === MemberRole.ADMIN || currentMember.role === MemberRole.MODERATOR);
    const canEditMessage = !deleted && isOwner;

    const isImage = fileUrl && (fileUrl.endsWith(".png") || fileUrl.endsWith(".jpg") || fileUrl.endsWith(".jpeg") || fileUrl.endsWith(".gif") || fileUrl.endsWith(".webp"));
    const isPdf = fileUrl && fileUrl.endsWith(".pdf");

    const handleEditSubmit = () => {
        if (onEdit && editContent.trim()) {
            onEdit(id, editContent);
            setIsEditing(false);
        }
    };

    return (
        <div className="group relative flex w-full items-start p-4 transition hover:bg-[#2A2D4E]/50">
            <div className="group flex w-full items-start gap-x-2">
                <div className="cursor-pointer transition hover:drop-shadow-md">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={member.profile.imageUrl} />
                        <AvatarFallback>{member.profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex w-full flex-col">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="cursor-pointer text-sm font-semibold text-zinc-200 hover:underline">
                                {member.profile.name}
                            </p>
                            {roleIconMap[member.role]}
                        </div>
                        <span className="text-xs text-zinc-400">
                            {format(new Date(timestamp), DATE_FORMAT)}
                        </span>
                    </div>

                    {isImage && (
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative mt-2 flex aspect-square h-48 w-48 items-center overflow-hidden rounded-md border bg-secondary"
                        >
                            <img src={fileUrl} alt="attachment" className="object-cover" />
                        </a>
                    )}

                    {isPdf && (
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative mt-2 flex items-center gap-x-2 rounded-md bg-[#2A2D4E] p-2"
                        >
                            <FileIcon className="h-10 w-10 fill-[#AF79F9] stroke-[#AF79F9]" />
                            <span className="text-sm text-[#AF79F9] hover:underline">
                                PDF File
                            </span>
                        </a>
                    )}

                    {!fileUrl && !isEditing && (
                        <p
                            className={cn(
                                "text-sm text-zinc-300",
                                deleted && "mt-1 text-xs italic text-zinc-400"
                            )}
                        >
                            {content}
                            {isUpdated && !deleted && (
                                <span className="mx-2 text-[10px] text-zinc-400">(edited)</span>
                            )}
                        </p>
                    )}

                    {isEditing && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleEditSubmit();
                            }}
                            className="flex w-full items-center gap-x-2 pt-2"
                        >
                            <input
                                type="text"
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="flex-1 rounded-md border-none bg-[#2A2D4E] p-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#AF79F9]"
                            />
                            <button
                                type="submit"
                                className="rounded-md bg-[#AF79F9] px-3 py-1 text-sm text-white"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditContent(content);
                                }}
                                className="text-sm text-zinc-400 hover:text-zinc-300"
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {!isEditing && (canDeleteMessage || canEditMessage) && (
                <div className="absolute -top-2 right-5 hidden items-center gap-x-2 rounded-sm border bg-[#1D203E] p-1 group-hover:flex">
                    {canEditMessage && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="cursor-pointer p-1 text-zinc-400 transition hover:text-zinc-300"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                    )}
                    {canDeleteMessage && (
                        <button
                            onClick={() => onDelete?.(id)}
                            className="cursor-pointer p-1 text-zinc-400 transition hover:text-rose-500"
                        >
                            <Trash className="h-4 w-4" />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatItem;
