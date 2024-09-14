import { toast } from "@/components/ui/use-toast";
import { createServerRequest } from "@/services/apiServer";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { useUser } from "../auth/useUser";
import { useDispatch } from "react-redux";
import { closeModal } from "../Modals/modalSlice";

export function useCreateServer() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: createServer, isLoading } = useMutation(
    "createServer",
    (serverData: FormData) =>
      createServerRequest(currentUser.id, getToken, serverData),
    {
      onError: (error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
        navigate("/app");
      },
      onSuccess: (response: AxiosResponse) => {
        const id = response.data.id;
        if (id) navigate(`/server/${id}`, { replace: true });
        queryClient.invalidateQueries({ queryKey: ["getServers"] });
        dispatch(closeModal());
      },
    },
  );
  return { createServer, isLoading };
}
