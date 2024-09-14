import { toast } from "@/components/ui/use-toast";
import { getServersRequest } from "@/services/apiServer";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useUser } from "../auth/useUser";
import { ServerType } from "@/utils/types";

export function useAllServers() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { currentUser } = useUser();

  const { data: servers, isLoading } = useQuery(
    "getServers",

    () => getServersRequest(getToken),
    {
      enabled: !!currentUser,
      onError: (error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
        navigate("/");
      },
      onSuccess: (res: ServerType[]) => {
        if (res.length === 0) {
          navigate("/app");
        }
      },
    },
  );
  return { servers, isLoading };
}
