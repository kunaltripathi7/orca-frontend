import { useDispatch } from "react-redux";
import { useModal } from "./useModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { closeModal, openModal } from "./modalSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useInvitecode } from "../server/useInviteCode";
import { MdFolderShared } from "react-icons/md";

const InviteServerModal = () => {
  const { isOpen, type, server: modalServer } = useModal();
  const [copied, setCopied] = useState(false);
  const { server: newICServer, isLoading, getInviteCode } = useInvitecode();

  const dispatch = useDispatch();
  const isModalOpen = isOpen && type === "invite";
  const inviteUrl = `${window.location.origin}/invite/${modalServer?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleClose = () => dispatch(closeModal());
  const handleInvite = () => {
    getInviteCode(modalServer?.id);
  };

  useEffect(() => {
    if (!newICServer) return;
    dispatch(openModal({ type: "invite", server: newICServer }));
  }, [newICServer, dispatch]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className="bg-[#12161B] text-[#EAEBEC]"
        aria-describedby="Invite-code-modal"
        aria-description="Invite-Code"
      >
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="flex items-center gap-8 text-center text-2xl font-bold">
            <MdFolderShared className="text-[#AF79F9]" />
            <span>Invite People</span>
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-200">
            Server Invite Link
          </Label>
          <div className="mt-2 flex gap-2 gap-x-2">
            <Input
              className="border-[1px] border-zinc-500 bg-[#2a333d] text-zinc-100/90 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
              readOnly={true}
              disabled={isLoading}
            />
            <Button
              size="icon"
              className="bg-zinc-200"
              onClick={onCopy}
              disabled={isLoading}
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="mt-4 text-xs text-zinc-100"
            disabled={isLoading}
            onClick={handleInvite}
          >
            Generate a new link
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteServerModal;
