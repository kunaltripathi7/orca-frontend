import { toast } from "@/components/ui/use-toast";
import { createServerRequest } from "@/services/apiServer";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AxiosResponse } from "axios";

export function useCreateServer() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const userId = useSelector((state: RootState) => state.auth.user.id);

  const { mutate: createServer, isLoading } = useMutation(
    "createServer",
    (serverData: FormData) => createServerRequest(userId, getToken, serverData),
    {
      onError: () => {
        toast({
          description: "Failed to create Server",
          variant: "destructive",
        });
        navigate("/app");
      },
      onSuccess: (response: AxiosResponse) => {
        const id = response.data.id;
        if (id) navigate(`/server/${id}`);
      },
    },
  );
  return { createServer, isLoading };
}
