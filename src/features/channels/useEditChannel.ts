import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { closeModal } from "../Modals/modalSlice";
import { editChannelRequest } from "@/services/apiChannels";

export interface Props {
  serverId: string | undefined;
  channelData: FormData;
  channelId: string | undefined;
}

export function useEditChannel() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: editChannel, isLoading: isChannelLoading } = useMutation(
    ["editChannel"],
    ({ serverId, channelData, channelId }: Props) =>
      editChannelRequest(serverId, channelId, channelData, getToken),
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

  return { editChannel, isChannelLoading };
}
