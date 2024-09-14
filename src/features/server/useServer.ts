import { toast } from "@/components/ui/use-toast";
import { getServerByIdRequest } from "@/services/apiServer";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

export function useServer() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { serverId } = useParams();

  const { data: server, isLoading } = useQuery(
    "getServer",
    () => getServerByIdRequest(serverId, getToken),
    {
      enabled: !!serverId,
      onError: (error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
        navigate("/");
      },
    },
  );
  return { server, isLoading };
}
