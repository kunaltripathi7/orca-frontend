import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { closeModal } from "../Modals/modalSlice";
import { createChannelRequest } from "@/services/apiChannels";

export interface Props {
  serverId: string | undefined;
  channelData: FormData;
}

export function useCreateChannel() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: createChannel, isLoading: isChannelLoading } = useMutation(
    ["createChannel"],
    ({ serverId, channelData }: Props) =>
      createChannelRequest(serverId, channelData, getToken),
    {
      onError: (error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["getServerById"] });
        dispatch(closeModal());
      },
    },
  );

  return { createChannel, isChannelLoading };
}
