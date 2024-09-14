import { toast } from "@/components/ui/use-toast";
import { getRemoveMemberRequest } from "@/services/apiMember";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { openModal } from "../Modals/modalSlice";
import { ServerType } from "@/utils/types";

interface Props {
  memberId: string;
  serverId: string;
}

export function useRemoveMember() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const {
    mutate: onKickMember,
    variables,
    isLoading,
  } = useMutation(
    ["kickMember"],
    // mutation func. accepts only one arg
    ({ memberId, serverId }: Props) =>
      getRemoveMemberRequest(serverId, memberId, getToken),
    {
      onError: (error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: (res: ServerType | undefined) => {
        if (!res) return;
        dispatch(openModal({ type: "manageMembers", server: res }));
      },
    },
  );
  return { onKickMember, loadingId: variables?.memberId, isLoading };
}
