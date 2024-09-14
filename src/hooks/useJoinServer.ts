import { toast } from "@/components/ui/use-toast";
import { joinServerRequest } from "@/services/apiServer";
import { ServerType } from "@/utils/types";
import { useAuth } from "@clerk/clerk-react";
import { Server } from "lucide-react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

export function useJoinServer() {
  const { inviteCode } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { isLoading, error } = useQuery(
    "joinServer",
    () => joinServerRequest(getToken, inviteCode),
    {
      enabled: !!inviteCode,
      onError: (err: Error) => {
        toast({
          description: err.message,
          variant: "destructive",
        });
      },
      onSuccess: (response: ServerType | undefined | number) => {
        console.log(Server);
        if (!response) return;
        if (typeof response === "number") {
          if (response !== 1003) return;
          navigate("/");
          toast({
            description: "You are already a member",
            variant: "destructive",
          });
        } else navigate(`/server/${response.id}`);
      },
    },
  );
  return { isLoading, error };
}
