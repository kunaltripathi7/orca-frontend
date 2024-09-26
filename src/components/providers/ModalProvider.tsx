import CreateChannelModal from "@/features/Modals/CreateChannelModal";
import CreateServerModal from "@/features/Modals/CreateServerModal";
import DeleteChannelModal from "@/features/Modals/DeleteChannelModal";
import DeleteServerModal from "@/features/Modals/DeleteServerModal";
import EditChannelModal from "@/features/Modals/EditChannelModal";
import EditServerModal from "@/features/Modals/EditServerModal";
import InviteServerModal from "@/features/Modals/InviteServerModal";
import LeaveServerModal from "@/features/Modals/LeaveServerModal";
import ManageMembersModal from "@/features/Modals/ManageMembersModal";

export const ModalProvider = () => {
  return (
    <>
      <CreateServerModal />
      <InviteServerModal />
      <EditServerModal />
      <CreateChannelModal />
      <ManageMembersModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
    </>
  );
};
