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
import { IoExit } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { useLeaveServer } from "../server/useLeaveServer";

const LeaveServerModal = () => {
  const dispatch = useDispatch();
  const { isOpen, type, server } = useModal();
  const { leaveServer, isLoading } = useLeaveServer();

  const isModalOpen = isOpen && type === "leaveServer";

  const handleClose = () => dispatch(closeModal());
  const handleLeave = () => leaveServer(server?.id);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className="bg-[#12161B] px-0 py-0 text-[#EAEBEC]"
        aria-describedby="Leave-server-modal"
        aria-description="Leave-Server"
      >
        <DialogHeader className="mt-4 px-12 py-4">
          <DialogTitle className="flex items-center gap-6 text-center text-2xl font-bold">
            <IoExit className="text-[#AF79F9]" />
            <span>Leave Server</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure want to leave the server{" "}
            <span className="tracking-wide text-[#AF79F9]">
              {server?.name} ?
            </span>
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
              onClick={handleLeave}
              disabled={isLoading}
            >
              Leave
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServerModal;
