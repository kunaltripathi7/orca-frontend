import { ServerType } from "@/utils/types";
import ActionTooltip from "@/components/ActionTooltip";
import { useNavigate, useParams } from "react-router-dom";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Props = {
  servers: ServerType[];
};

const Servers = ({ servers }: Props) => {
  const navigate = useNavigate();
  const { serverId } = useParams();
  const handleClick = (serverId: string) => {
    navigate(`servers/${serverId}`);
  };

  return (
    <ScrollArea className="data-[state=hidden]:active flex h-full flex-col items-center">
      {servers.map((server) => (
        <div key={server.id} className="group relative my-3">
          <div
            className={`absolute left-[1px] top-1/2 w-[3px] -translate-y-1/2 rounded-r-full bg-purple-300 transition-all group-active:h-[24px] ${server.id === serverId ? "h-[24px]" : "h-[8px] group-hover:h-[20px]"}`}
          />
          <ActionTooltip side="right" align="center" label={server.name}>
            <button
              className="relative flex items-center"
              onClick={() => handleClick(server.id)}
            >
              <div
                className={cn(
                  "relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-full transition-all duration-300 ease-in-out active:scale-95",
                  serverId === server.id
                    ? "scale-105 bg-primary/10 text-primary ring-[2px] ring-purple-300"
                    : "group-hover:scale-105 group-hover:ring-[2px] group-hover:ring-purple-300/80",
                )}
              >
                <div className="absolute inset-0 z-40 rounded-full opacity-0 ring-2 ring-purple-500/80 transition-opacity group-hover:opacity-100" />
                <AspectRatio ratio={1}>
                  <img
                    src={server.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
              </div>
            </button>
          </ActionTooltip>
        </div>
      ))}
    </ScrollArea>
  );
};

export default Servers;
