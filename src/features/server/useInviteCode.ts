import { toast } from "@/components/ui/use-toast";
import { getInviteCodeRequest } from "@/services/apiServer";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "react-query";

export function useInvitecode() {
  const { getToken } = useAuth();
  // const { serverId } = useParams(); works only inside Route compo

  const {
    mutate: getInviteCode,
    isLoading,
    data: server,
  } = useMutation(
    ["getServerInviteCode"],
    (serverId: string | undefined) => getInviteCodeRequest(getToken, serverId),
    {
      onError: (error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      },
    },
  );
  return { getInviteCode, isLoading, server };
}
