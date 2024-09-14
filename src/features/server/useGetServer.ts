import { toast } from "@/components/ui/use-toast";
import { getServerByIdRequest } from "@/services/apiServer";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export function useGetServer() {
  const { getToken } = useAuth();
  const { serverId } = useParams();

  const {
    data: server,
    isLoading,
    error,
  } = useQuery(
    ["getServerById", serverId],
    () => getServerByIdRequest(serverId, getToken),
    {
      enabled: !!serverId,
      onError: (error: Error) => {
        if (error.message == "4001") return;
        toast({
          description: error.message,
          variant: "destructive",
        });
      },
    },
  );
  return { server, isLoading, error };
}
