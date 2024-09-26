import ChatNavbar from "@/features/chat/ChatNavbar";
import MemberSidebar from "@/features/members/MemberSidebar";
import {
  ChannelModeType,
  ChannelType,
  MemberRole,
  MemberType,
} from "@/utils/types";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export interface ChannelContextType {
  videoChannels: ChannelType[];
  audioChannels: ChannelType[];
  textChannels: ChannelType[];
  members: MemberType[];
}

const ChannelPage = () => {
  const { serverId, channelId } = useParams();
  const { videoChannels, audioChannels, textChannels, members } =
    useOutletContext<ChannelContextType>();
  const { channel, member } = use;

  const [open, setOpen] = useState<boolean>(false);
  const iconMap = {
    [ChannelModeType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelModeType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelModeType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
  };

  const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: (
      <ShieldCheck className="mr-2 h-4 w-4 text-[#AF79F9]" />
    ),
    [MemberRole.ADMIN]: <ShieldAlert className="mr-2 h-4 w-4 text-rose-500" />,
  };

  return (
    <div className="h-full w-full bg-[#1D203E]">
      <ChatNavbar
        label="general"
        type="channel"
        handleSidebar={setOpen}
        dataObj={[
          {
            description: "Text Channels",
            type: "channel",
            data: textChannels?.map((channel) => ({
              id: channel.id,
              name: channel.name,
              icon: iconMap[channel.type],
            })),
          },
          {
            description: "Voice Channels",
            type: "channel",
            data: audioChannels?.map((channel) => ({
              id: channel.id,
              name: channel.name,
              icon: iconMap[channel.type],
            })),
          },
          {
            description: "Video Channels",
            type: "channel",
            data: videoChannels?.map((channel) => ({
              id: channel.id,
              name: channel.name,
              icon: iconMap[channel.type],
            })),
          },
          {
            description: "Members",
            type: "member",
            data: members?.map((member) => ({
              id: member.id,
              name: member.profile.name,
              icon: roleIconMap[member.role],
            })),
          },
        ]}
      />
      {open && <MemberSidebar members={members} roleIconMap={roleIconMap} />}
    </div>
  );
};

export default ChannelPage;
