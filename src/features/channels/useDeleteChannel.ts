import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { closeModal } from "../Modals/modalSlice";
import { deleteChannelRequest } from "@/services/apiChannels";

export function useDeleteChannel() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: deleteChannel, isLoading } = useMutation(
    ["deleteChannel"],
    ({
      serverId,
      channelId,
    }: {
      serverId: string | undefined;
      channelId: string | undefined;
    }) => deleteChannelRequest(getToken, serverId, channelId),
    {
      onError: (error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getServerById"],
        });
        dispatch(closeModal());
      },
    },
  );
  return { deleteChannel, isLoading };
}
