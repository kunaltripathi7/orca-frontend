import { useGetChannel } from "@/features/channels/useGetChannel";
import ChatNavbar from "@/features/chat/ChatNavbar";
import ChatMessages from "@/features/chat/ChatMessages";
import ChatInput from "@/features/chat/ChatInput";
import MediaRoom from "@/features/chat/MediaRoom";
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
  currentMember: MemberType;
}

const ChannelPage = () => {
  const { serverId, channelId } = useParams();
  const { videoChannels, audioChannels, textChannels, members, currentMember } =
    useOutletContext<ChannelContextType>();
  const { channel } = useGetChannel();

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

  const isTextChannel = channel?.type === ChannelModeType.TEXT;
  const isAudioChannel = channel?.type === ChannelModeType.AUDIO;
  const isVideoChannel = channel?.type === ChannelModeType.VIDEO;

  return (
    <div className="flex h-full w-full flex-col bg-[#1D203E]">
      <ChatNavbar
        label={channel?.name}
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

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col">
          {isTextChannel && channelId && serverId && currentMember && (
            <>
              <ChatMessages
                name={channel?.name || ""}
                member={currentMember}
                channelId={channelId}
                serverId={serverId}
                type="channel"
              />
              <ChatInput
                channelId={channelId}
                serverId={serverId}
                type="channel"
                name={channel?.name || ""}
              />
            </>
          )}

          {isAudioChannel && channelId && (
            <MediaRoom
              channelId={channelId}
              video={false}
              audio={true}
            />
          )}

          {isVideoChannel && channelId && (
            <MediaRoom
              channelId={channelId}
              video={true}
              audio={true}
            />
          )}
        </div>

        {open && <MemberSidebar members={members} roleIconMap={roleIconMap} />}
      </div>
    </div>
  );
};

export default ChannelPage;


