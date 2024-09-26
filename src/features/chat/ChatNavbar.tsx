import ServerSearch from "@/components/ServerSearch";
import { BsFillPeopleFill } from "react-icons/bs";

interface Props {
  label: string;
  handleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  type: "channel" | "member";
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
    <div className="flex h-12 items-center justify-between border bg-[#2C2F48] px-4 shadow-sm shadow-neutral-700/70">
      <h4 className="font-lato font-bold text-zinc-200">{label}</h4>
      {type === "channel" && <ServerSearch dataObj={dataObj} />}
      <button
        className="transition hover:text-zinc-200"
        onClick={() => handleSidebar((prev) => !prev)}
      >
        <BsFillPeopleFill />
      </button>
    </div>
  );
};

export default ChatNavbar;
