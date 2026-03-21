import ServerSearch from "@/components/ServerSearch";
import MobileToggle from "@/components/MobileToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hash } from "lucide-react";
import { BsFillPeopleFill } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  label: string | undefined;
  handleSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  type: "channel" | "conversation";
  imageUrl?: string;
  dataObj?: {
    description: string;
    type: "channel" | "member";
    data:
    | {
      icon: React.ReactNode;
      name: string;
      id: string;
    }[]
    | undefined;
  }[];
}

const ChatNavbar = ({
  label,
  handleSidebar,
  dataObj,
  type,
  imageUrl,
}: Props) => {
  return (
    <div className="flex h-12 items-center justify-between border-b bg-[#2C2F48] px-2 shadow-sm shadow-neutral-700/70 md:px-4">
      {!label ? (
        <Skeleton
          baseColor="#1C134F"
          highlightColor="#6c6967"
          width={80}
          height={22}
        />
      ) : (
        <h4 className="flex items-center font-lato font-bold text-zinc-200">
          <MobileToggle />
          {type === "channel" && (
            <Hash className="mr-2 h-5 w-5 text-zinc-200" />
          )}
          {type === "conversation" && imageUrl && (
            <Avatar className="mr-2 h-6 w-6">
              <AvatarImage src={imageUrl} />
              <AvatarFallback>{label.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          {label}
        </h4>
      )}
      {type === "channel" && <ServerSearch dataObj={dataObj} />}
      {handleSidebar && (
        <button
          className="transition hover:text-zinc-200"
          onClick={() => handleSidebar((prev) => !prev)}
        >
          <BsFillPeopleFill />
        </button>
      )}
    </div>
  );
};

export default ChatNavbar;

