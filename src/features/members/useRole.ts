import { toast } from "@/components/ui/use-toast";
import { getRoleChangeRequest } from "@/services/apiMember";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { openModal } from "../Modals/modalSlice";
import { MemberRole, ServerType } from "@/utils/types";

interface Props {
  memberId: string;
  role: MemberRole;
  serverId: string;
}

export function useRole() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    mutate: onRoleChange,
    variables,
    isLoading,
  } = useMutation(
    ["roleChange"],
    // mutation func. accepts only one arg
    ({ memberId, role, serverId }: Props) =>
      getRoleChangeRequest(serverId, memberId, role, getToken),
    {
      onError: (error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: async (res: ServerType | undefined) => {
        await queryClient.invalidateQueries({ queryKey: ["getServerById"] });
        if (!res) return;
        dispatch(openModal({ type: "manageMembers", server: res }));
      },
    },
  );
  return { onRoleChange, loadingId: variables?.memberId, isLoading };
}
