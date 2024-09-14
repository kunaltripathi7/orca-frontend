import { useModal } from "./useModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { closeModal } from "./modalSlice";
import { useDispatch } from "react-redux";
import { DialogDescription } from "@radix-ui/react-dialog";

import UserAvatar from "@/components/UserAvatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Check,
  EllipsisVertical,
  Gavel,
  LoaderCircle,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRole } from "../members/useRole";
import { MemberRole } from "@/utils/types";
import { useRemoveMember } from "../members/useRemoveMember";
import { MdCardMembership } from "react-icons/md";

const ManageMembersModal = () => {
  const {
    onRoleChange,
    loadingId: roleLoadingId,
    isLoading: roleLoading,
  } = useRole();
  const {
    onKickMember,
    loadingId: kickLoadingId,
    isLoading: kickLoading,
  } = useRemoveMember();

  const loadingId = roleLoadingId || kickLoadingId;
  const isLoading = roleLoading || kickLoading;

  const { isOpen, type, server } = useModal();
  const dispatch = useDispatch();
  const totalMembers = server?.members?.length;

  const isModalOpen = isOpen && type === "manageMembers";

  const handleClose = () => dispatch(closeModal());

  const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 text-indigo-500" />,
    ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className="bg-[#12161B] text-[#EAEBEC]"
        aria-describedby="Invite-code-modal"
        aria-description="Invite-Code"
      >
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="flex justify-center text-center text-2xl font-bold">
            <div className="flex gap-4">
              <MdCardMembership className="h-8 w-8 text-[#AF79F9]" />
              <span>Manage Members</span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {totalMembers}
            {totalMembers && totalMembers > 1 ? " members" : " member"}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => {
            return (
              <div className="flex items-center gap-x-4" key={member.id}>
                <UserAvatar src={member.profile.imageUrl} />
                <div className="flex flex-col justify-center gap-1 py-4">
                  <div className="flex items-center gap-x-2">
                    <span>{member.profile.name}</span>
                    {roleIconMap[member.role]}
                  </div>
                  <p className="text-xs text-zinc-400">
                    {member.profile.email}
                  </p>
                </div>
                {server.profileId != member.profileId &&
                  // fallback - if X - ||
                  (loadingId !== member.id || !isLoading) && (
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical className="h-5 w-5 text-zinc-400" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="left"
                          className="w-2 bg-black"
                        >
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="cursor-pointer">
                              <ShieldQuestion className="mr-2 h-4 w-4" />
                              <span>Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() =>
                                    onRoleChange({
                                      memberId: member.id,
                                      role: MemberRole.GUEST,
                                      serverId: server.id,
                                    })
                                  }
                                >
                                  <Shield className="mr-2 h-4 w-4" />
                                  Guest
                                  {member.role === "GUEST" && (
                                    <Check className="ml-auto h-4 w-4" />
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() =>
                                    onRoleChange({
                                      memberId: member.id,
                                      role: MemberRole.MODERATOR,
                                      serverId: server.id,
                                    })
                                  }
                                >
                                  <ShieldCheck className="mr-2 h-4 w-4" />
                                  Moderator
                                  {member.role === "MODERATOR" && (
                                    <Check className="ml-3 h-4 w-4" />
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              onKickMember({
                                memberId: member.id,
                                serverId: server.id,
                              })
                            }
                          >
                            <Gavel className="mr-2 h-4 w-4" />
                            <span>Kick</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                {member.id === loadingId && isLoading && (
                  <div className="ml-auto">
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  </div>
                )}
              </div>
            );
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersModal;
