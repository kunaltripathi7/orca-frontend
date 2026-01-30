import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "react-query";
import { getChannelRequest } from "../../services/apiChannels";
import { toast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { ChannelType } from "@/utils/types";

export function useGetChannel(): { channel: ChannelType | undefined; isChannelLoading: boolean } {
  const { getToken } = useAuth();
  const { serverId, channelId } = useParams();
  const navigate = useNavigate();
  const { data: channel, isLoading: isChannelLoading } = useQuery<ChannelType | undefined, Error>(
    ["getChannel", serverId, channelId],
    () => getChannelRequest(serverId, channelId, getToken),
    {
      onError: (error) => {
        let toastMessage = error.message;
        if (error.message === "1001") {
          navigate("/");
          toastMessage = "User is not a part of the requested server.";
        }
        toast({
          description: toastMessage,
          variant: "destructive",
        });
      },
      enabled: !!serverId && !!channelId,
    },
  );

  return { channel, isChannelLoading };
}
