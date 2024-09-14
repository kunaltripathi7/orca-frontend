import { toast } from "@/components/ui/use-toast";
import { leaveServerRequest } from "@/services/apiServer";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "react-query";
import { closeModal } from "../Modals/modalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAllServers } from "./useAllServers";

export function useLeaveServer() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { servers } = useAllServers();

  const { mutate: leaveServer, isLoading } = useMutation(
    ["leaveServer"],
    (serverId: string | undefined) => leaveServerRequest(getToken, serverId),
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
        if (servers && servers.length > 0)
          navigate(`/server/${servers[0].id}`, { replace: true });
        dispatch(closeModal());
      },
    },
  );
  return { leaveServer, isLoading };
}
