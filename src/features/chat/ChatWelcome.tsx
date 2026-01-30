import { Hash, User } from "lucide-react";

interface ChatWelcomeProps {
    type: "channel" | "conversation";
    name: string;
}

const ChatWelcome = ({ type, name }: ChatWelcomeProps) => {
    return (
        <div className="mb-4 space-y-2 px-4">
            {type === "channel" ? (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2A2D4E]">
                    <Hash className="h-8 w-8 text-[#AF79F9]" />
                </div>
            ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2A2D4E]">
                    <User className="h-8 w-8 text-[#AF79F9]" />
                </div>
            )}
            <p className="text-xl font-bold text-white md:text-3xl">
                {type === "channel" ? `Welcome to #${name}` : `${name}`}
            </p>
            <p className="text-sm text-zinc-400">
                {type === "channel"
                    ? `This is the start of the #${name} channel.`
                    : `This is the beginning of your direct message history with ${name}.`}
            </p>
        </div>
    );
};

export default ChatWelcome;
