import { useDispatch } from "react-redux";
import { useModal } from "./useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { closeModal } from "./modalSlice";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useDeleteChannel } from "../channels/useDeleteChannel";
import { matchPath, useLocation } from "react-router-dom";

const DeleteChannelModal = () => {
  const { isOpen, type, channel } = useModal();
  const { deleteChannel, isLoading } = useDeleteChannel();
  const dispatch = useDispatch();
  const isModalOpen = isOpen && type === "deleteChannel";
  const location = useLocation();
  const match = matchPath({ path: "/server/:serverId" }, location.pathname);

  const handleClose = () => dispatch(closeModal());
  const handleDelete = () =>
    deleteChannel({ serverId: match?.params.serverId, channelId: channel?.id });

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className="bg-[#12161B] text-[#EAEBEC]"
        aria-describedby="delete-channel-modal"
        aria-description="Delete-Channel"
      >
        <DialogHeader className="px-6 pt-2">
          <DialogTitle className="flex items-center gap-8 text-center text-2xl font-bold">
            <RiDeleteBin5Fill className="text-[#AF79F9]" />
            <span>Delete Channel</span>
          </DialogTitle>
          <DialogDescription className="text-start">
            Are you sure want to delete the channel{" "}
            <span className="tracking-wide text-[#AF79F9]">
              {channel?.name} ?
            </span>{" "}
            This action is permanent and can't be restored.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-[#242f3b] px-24 py-4">
          <div className="flex w-full justify-between">
            <Button
              variant="ghost"
              className="border-[1px] border-gray-500"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600"
              onClick={handleDelete}
              disabled={isLoading}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
