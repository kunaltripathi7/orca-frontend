import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "react-query";
import { getChannelRequest } from "../../services/apiChannels";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";

export function useCreateChannel() {
  const { getToken } = useAuth();
  const { serverId, channelId } = useParams();

  const { data: channel, isLoading: isChannelLoading } = useQuery(
    ["getChannel"],
    () => getChannelRequest(serverId, channelId, getToken),
    {
      onError: (error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: async () => {},
    },
  );

  return { channel, isChannelLoading };
}
