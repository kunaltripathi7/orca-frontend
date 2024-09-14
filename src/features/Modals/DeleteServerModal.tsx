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
import { useDeleteServer } from "../server/useDeleteServer";

const DeleteServerModal = () => {
  const { isOpen, type, server } = useModal();
  const { deleteServer, isLoading } = useDeleteServer();

  const dispatch = useDispatch();
  const isModalOpen = isOpen && type === "deleteServer";

  const handleClose = () => dispatch(closeModal());
  const handleDelete = () => deleteServer(server?.id);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className="bg-[#12161B] text-[#EAEBEC]"
        aria-describedby="delete-server-modal"
        aria-description="Delete-Server"
      >
        <DialogHeader className="px-6 pt-2">
          <DialogTitle className="flex items-center gap-8 text-center text-2xl font-bold">
            <RiDeleteBin5Fill className="text-[#AF79F9]" />
            <span>Delete Server</span>
          </DialogTitle>
          <DialogDescription className="text-start">
            Are you sure want to leave the server{" "}
            <span className="tracking-wide text-[#AF79F9]">
              {server?.name} ?
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

export default DeleteServerModal;
