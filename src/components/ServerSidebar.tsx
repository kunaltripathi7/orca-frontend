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

const ServerSidebar = ({ data, isLoading, user, iconMap }: Props) => {
  const {
    channels: { textChannels, audioChannels, videoChannels },
    role,
  } = data;

  return (
    <SkeletonTheme baseColor="#6c55ab">
      <div className="hidden h-full w-[288px] flex-col bg-[#2C2F48]/50 text-primary md:flex">
        {isLoading ? (
          <div className="mr-3 mt-2 flex justify-center">
            <Skeleton width={200} height={25} />
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
