import { toast } from "@/components/ui/use-toast";
import { getServerRequest } from "@/services/apiServer";
import { RootState } from "@/store/store";
import { useAuth } from "@clerk/clerk-react";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function useServer() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const userId = useSelector((state: RootState) => state.auth.user.id);

  const { data: server, isLoading } = useQuery(
    "getServer",
    () => getServerRequest(userId, getToken),
    {
      enabled: !!userId,
      onError: () => {
        toast({
          description: "Failed to get Server",
          variant: "destructive",
        });
        navigate("/");
      },
      onSuccess: (response: AxiosResponse) => {
        const id = response.data.id;
        if (server) navigate(`/server/${id}`);
      },
    },
  );

  return { server, isLoading };
}
