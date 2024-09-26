import {
  ChannelModeType,
  ChannelType,
  MemberRole,
  ServerType,
} from "@/utils/types";

import ServerHeader from "./ServerHeader";
import User from "./User";

import { ScrollArea } from "./ui/scroll-area";

import ServerSection from "@/features/channels/ServerSection";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ServerChannel from "@/features/server/ServerChannel";
import { ReactElement } from "react";

export type IconMap = {
  [key in ChannelModeType]: ReactElement;
};

interface Props {
  server: ServerType | undefined;
  isLoading: boolean;
  iconMap: IconMap;
  data: {
    channels: {
      audioChannels: ChannelType[];
      videoChannels: ChannelType[];
      textChannels: ChannelType[];
    };
    role: MemberRole | undefined;
  };
  user: string;
}

const ServerSidebar = ({ data, isLoading, user, iconMap, server }: Props) => {
  const {
    channels: { textChannels, audioChannels, videoChannels },
    role,
  } = data;

  return (
    <SkeletonTheme baseColor="#6c55ab" highlightColor="#8C75D1">
      <div className="hidden h-full w-[288px] flex-col bg-[#2C2F48]/50 text-primary md:flex">
        {isLoading ? (
          <div className="mx-3 mt-2 flex flex-col items-start">
            <Skeleton width={200} height={20} />
            <Skeleton height={15} width={70} className="mt-6" />
            <Skeleton width={200} height={15} />
            <Skeleton height={15} width={70} className="mt-8" />
            <Skeleton width={200} height={15} />
            <Skeleton height={15} width={70} className="mt-8" />
            <Skeleton width={200} height={15} />
          </div>
        ) : (
          <>
            <ServerHeader role={role} />
            <ScrollArea className="w-full flex-1 px-3">
              <div className="mt-4 w-full space-y-6">
                {textChannels.length && (
                  <div className="mb-2">
                    <ServerSection
                      label="Text Channels"
                      channelType={ChannelModeType.TEXT}
                      role={role}
                    />
                    <div className="mt-1 space-y-[2px]">
                      {textChannels.map((channel) => (
                        <ServerChannel
                          key={channel.id}
                          channel={channel}
                          iconMap={iconMap}
                          role={role}
                          server={server}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {!!audioChannels.length && (
                  <div className="my-4">
                    <ServerSection
                      label="Voice Channels"
                      channelType={ChannelModeType.AUDIO}
                      role={role}
                    />
                    <div className="space-y-[2px]">
                      {audioChannels.map((channel) => (
                        <ServerChannel
                          key={channel.id}
                          channel={channel}
                          iconMap={iconMap}
                          role={role}
                          server={server}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {!!videoChannels.length && (
                  <div className="my-4">
                    <ServerSection
                      label="Video Channels"
                      channelType={ChannelModeType.VIDEO}
                      role={role}
                    />
                    <div className="space-y-[2px]">
                      {videoChannels.map((channel) => (
                        <ServerChannel
                          key={channel.id}
                          channel={channel}
                          iconMap={iconMap}
                          role={role}
                          server={server}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </>
        )}
        <User name={user?.split(" ")[0]} />
      </div>
    </SkeletonTheme>
  );
};

export default ServerSidebar;
