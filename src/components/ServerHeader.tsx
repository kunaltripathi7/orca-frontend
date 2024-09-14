import { MemberRole } from "@/utils/types";

import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { openModal } from "@/features/Modals/modalSlice";
import { useState } from "react";
import { useGetServer } from "@/features/server/useGetServer";

type Props = {
  role?: MemberRole;
};

const ServerHeader = ({ role }: Props) => {
  const { server } = useGetServer();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInvite = () => dispatch(openModal({ type: "invite", server }));

  const handleSettings = () =>
    dispatch(openModal({ type: "editServer", server }));

  const handleMembers = () =>
    dispatch(openModal({ type: "manageMembers", server }));
  const handleChannel = () => dispatch(openModal({ type: "createChannel" }));
  const handleLeaveServer = () =>
    dispatch(openModal({ type: "leaveServer", server }));
  const handleDeleteServer = () =>
    dispatch(openModal({ type: "deleteServer", server }));

  return (
    <header>
      <DropdownMenu onOpenChange={() => setIsOpen((prev) => !prev)}>
        <DropdownMenuTrigger className="w-full focus:outline-none">
          <div className="text-md flex h-[45px] w-full items-center justify-between px-4 font-lato font-semibold shadow-sm shadow-neutral-700/70 hover:bg-[#6c5e97]">
            <span>{server?.name}</span>
            <ChevronDown
              className={`ml-auto h-5 w-5 ${isOpen && "rotate-180"}`}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[235px] space-y-[2px] rounded-sm border-none bg-[#322A5D] px-2 font-lato tracking-normal">
          {isModerator && (
            <DropdownMenuItem
              className="flex cursor-pointer items-center px-3 py-2 text-sm hover:!bg-[#44376d] hover:outline-none"
              onClick={handleInvite}
            >
              Invite People
              <UserPlus className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              className="flex cursor-pointer items-center px-3 py-2 text-sm hover:!bg-[#44376d] hover:outline-none"
              onClick={handleSettings}
            >
              Server Settings
              <Settings className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              className="flex cursor-pointer items-center px-3 py-2 text-sm hover:!bg-[#44376d] hover:outline-none"
              onClick={handleMembers}
            >
              Manage Members
              <Users className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              className="flex cursor-pointer items-center px-3 py-2 text-sm hover:!bg-[#44376d] hover:outline-none"
              onClick={handleChannel}
            >
              Create Channel
              <PlusCircle className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
          {isModerator && <DropdownMenuSeparator className="bg-zinc-400/50" />}
          {isAdmin && (
            <DropdownMenuItem
              className="flex cursor-pointer items-center px-3 py-2 text-sm tracking-wide text-red-500 hover:!bg-rose-600 hover:!text-zinc-200 hover:outline-none"
              onClick={handleDeleteServer}
            >
              Delete Server
              <PlusCircle className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem
              className="flex cursor-pointer items-center px-3 py-2 text-sm tracking-wide text-rose-500 hover:!bg-rose-600 hover:!text-zinc-200 hover:outline-none"
              onClick={handleLeaveServer}
            >
              Leave Server
              <LogOut className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
export default ServerHeader;
