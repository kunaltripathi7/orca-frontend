import ServerSidebar from "@/components/ServerSidebar";
import { useGetServer } from "@/features/server/useGetServer";
import {
  ChannelModeType,
  ChannelType,
  MemberType,
  ServerType,
} from "@/utils/types";
import { useEffect } from "react";
import { useMemo } from "react";

import { Hash, Mic, Video } from "lucide-react";
import { useUser } from "@/features/auth/useUser";
import { Outlet, useNavigate } from "react-router-dom";

function Server() {
  const {
    server,
    isLoading: isServerLoading,
  }: {
    server: ServerType | undefined;
    isLoading: boolean;
  } = useGetServer();

  const { isLoading: isUserLoading, currentUser } = useUser();
  const isLoading = isUserLoading || isServerLoading;
  const navigate = useNavigate();

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

  useEffect(() => {
    if (server) {
      const channelId = server?.channels?.find(
        (channel) => channel?.name === "general",
      )?.id;
      navigate(`channels/${channelId}`);
    }
  }, [server, navigate]);

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
        <div className="flex h-full">
          <Outlet
            context={{
              videoChannels,
              audioChannels,
              textChannels,
              members,
              iconMap,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Server;
