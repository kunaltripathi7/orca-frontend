import ActionTooltip from "@/components/ActionTooltip";
import { IconMap } from "@/components/ServerSidebar";
import { cn } from "@/lib/utils";
import { ChannelType, MemberRole } from "@/utils/types";
import { Edit, Lock, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { openModal } from "../Modals/modalSlice";

interface Props {
  channel: ChannelType;
  iconMap: IconMap;
  role: MemberRole | undefined;
}

const ServerChannel = ({ channel, role, iconMap }: Props) => {
  const icon = iconMap[channel.type];
  const { channelId } = useParams();
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {}}
      className={cn(
        "group flex w-full items-center gap-x-2 rounded-md px-2 py-1 transition hover:bg-[#6C5E97]",
        channelId === channel.id && "bg-[#6C5E97]",
      )}
    >
      <span className="h-5 w-5 flex-shrink-0">{icon}</span>
      <p
        className={cn(
          "line-clamp-1 font-lato font-semibold text-stone-200 transition group-hover:text-white",
          channelId === channel.id && "text-white",
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit className="hidden h-4 w-4 text-stone-200 transition hover:text-white group-hover:block" />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              className="hidden h-4 w-4 text-stone-200 transition hover:text-white group-hover:block"
              onClick={() =>
                dispatch(openModal({ type: "deleteChannel", channel }))
              }
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto h-4 w-4 text-stone-200" />
      )}
    </button>
  );
};

export default ServerChannel;
