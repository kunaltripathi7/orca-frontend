import { toast } from "@/components/ui/use-toast";
import { editServerRequest } from "@/services/apiServer";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { closeModal } from "../Modals/modalSlice";

export interface Props {
  serverId: string | undefined;
  serverData: FormData;
}

export function useEditServer() {
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  const { mutate: editServer, isLoading } = useMutation(
    "editServer",
    ({ serverId, serverData }: Props) =>
      editServerRequest(serverId, getToken, serverData),
    {
      onError: (error: Error) => {
        toast({
          description: error.message,
          variant: "destructive",
        });
      },
      onSuccess: () => {
        dispatch(closeModal());
      },
    },
  );
  return { editServer, isLoading };
}
