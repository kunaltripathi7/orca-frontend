import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import NavigationSidebar from "@/components/NavigationSidebar";
import ServerSidebar from "@/components/ServerSidebar";
import { ServerType, ChannelModeType, ChannelType, MemberType } from "@/utils/types";
import { Hash, Mic, Video } from "lucide-react";
import { useMemo } from "react";
import { useGetServer } from "@/features/server/useGetServer";
import { useUser } from "@/features/auth/useUser";
import { ReactElement } from "react";

const MobileToggle = () => {
  const {
    server,
    isLoading: isServerLoading,
  }: {
    server: ServerType | undefined;
    isLoading: boolean;
  } = useGetServer();

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

  const iconMap: { [key in ChannelModeType]: ReactElement } = {
    [ChannelModeType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelModeType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelModeType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="mr-2 md:hidden">
          <Menu className="h-5 w-5 text-zinc-200" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <div className="flex-1">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;
