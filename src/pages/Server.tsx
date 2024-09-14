import ServerSidebar from "@/components/ServerSidebar";
import MemberSidebar from "@/features/members/MemberSidebar";
import ServerNavbar from "@/features/server/ServerNavbar";
import { useGetServer } from "@/features/server/useGetServer";
import {
  ChannelModeType,
  ChannelType,
  MemberRole,
  MemberType,
  ServerType,
} from "@/utils/types";
import { useState } from "react";
import { useMemo } from "react";

import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { useUser } from "@/features/auth/useUser";

function Server() {
  const {
    server,
    isLoading: isServerLoading,
  }: {
    server: ServerType | undefined;
    isLoading: boolean;
  } = useGetServer();

  const [open, setOpen] = useState<boolean>(false);
  const { isLoading: isUserLoading, currentUser } = useUser();
  const isLoading = isUserLoading || isServerLoading;

  const textChannels = useMemo(
    () =>
      server?.channels?.filter(
        (channel: ChannelType) => channel.type === ChannelModeType.TEXT,
      ) || [],
    [server?.channels],
  );

  const audioChannels = useMemo(
    () =>
      server?.channels?.filter(
        (channel: ChannelType) => channel.type === ChannelModeType.AUDIO,
      ) || [],
    [server?.channels],
  );

  const videoChannels = useMemo(
    () =>
      server?.channels?.filter(
        (channel: ChannelType) => channel.type === ChannelModeType.VIDEO,
      ) || [],
    [server?.channels],
  );

  const role = useMemo(
    () =>
      server?.members?.find(
        (member: MemberType) => member.profileId === currentUser?.id,
      )?.role,
    [server?.members, currentUser?.id],
  );

  const members = useMemo(
    () =>
      server?.members?.filter(
        (member: MemberType) => member.profileId !== currentUser?.id,
      ),
    [server?.members, currentUser?.id],
  );

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
    <>
      <ServerSidebar
        server={server}
        isLoading={isLoading}
        user={currentUser?.name}
        iconMap={iconMap}
        data={{
          channels: { textChannels, audioChannels, videoChannels },
          role,
        }}
      />
      <div className="flex w-full flex-col">
        <ServerNavbar
          label="channel"
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
        <div className="flex h-full">
          <div className="h-full w-full bg-[#1D203E]"></div>
          {open && (
            <MemberSidebar
              members={members}
              isLoading={isLoading}
              roleIconMap={roleIconMap}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Server;
