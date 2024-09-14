import { ServerType } from "@/utils/types";
import { useAllServers } from "@/features/server/useAllServers";
import Servers from "@/features/server/Servers";
import NavigationServerConfig from "@/features/server/NavigationServerConfig";
import { Separator } from "./ui/separator";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NavigationSidebar = () => {
  const {
    servers,
    isLoading,
  }: { servers: ServerType[] | undefined; isLoading: boolean } =
    useAllServers();

  return (
    <div className="inset-y-0 hidden h-full flex-col justify-between md:flex">
      <div className="flex h-full">
        <div className="scrollbar-hidden flex h-full w-[72px] flex-col items-center justify-between bg-[#1D203E]/30 pt-2">
          {isLoading ? (
            <Skeleton
              baseColor="#6d54b4"
              circle
              width={40}
              height={40}
              count={10}
              className="my-4"
            />
          ) : (
            <>
              <NavigationServerConfig />
              <Separator className="mb-2 mt-4 h-[1px] w-12 bg-purple-400" />
              {servers && <Servers servers={servers} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;
