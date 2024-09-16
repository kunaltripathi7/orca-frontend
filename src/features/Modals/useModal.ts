import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export function useModal() {
  const type = useSelector((state: RootState) => state.modal.type);
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const server = useSelector((state: RootState) => state.modal.server);
  const channel = useSelector((state: RootState) => state.modal.channel);
  const channelType = useSelector(
    (state: RootState) => state.modal.channelType,
  );
  // const onClose = useSelector((state: RootState) => state.modal.onClose);

  return { isOpen, type, server, channelType, channel };
}
