import { toast } from "@/components/ui/use-toast";
import { deleteServerRequest } from "@/services/apiServer";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { closeModal } from "../Modals/modalSlice";

export function useDeleteServer() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: deleteServer, isLoading } = useMutation(
    ["deleteServer"],
    (serverId: string | undefined) => deleteServerRequest(getToken, serverId),
    {
      onError: (error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getServers"],
        });
        dispatch(closeModal());
      },
    },
  );
  return { deleteServer, isLoading };
}
