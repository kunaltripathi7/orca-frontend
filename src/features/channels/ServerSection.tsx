import ActionTooltip from "@/components/ActionTooltip";
import {
  ChannelModeType,
  MemberRole,
  ServerWithMembersWithProfiles,
} from "@/utils/types";
import { Plus } from "lucide-react";
import { openModal } from "../Modals/modalSlice";
import { useDispatch } from "react-redux";

interface Props {
  label: string;
  channelType?: ChannelModeType;
  role?: MemberRole | undefined;
  server?: ServerWithMembersWithProfiles;
}

const ServerSection = ({ label, channelType, role }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="mb-2 flex items-center justify-between px-2 text-[#FFFFFF]/85">
      <p className="tracking text-xs uppercase">{label}</p>
      {role !== MemberRole.GUEST && (
        <ActionTooltip label="Create Channel" side="top">
          {/* for accessbility wrap in button no onclick X on icons*/}
          <button
            className="ml-auto transition hover:text-[#FFFFFF]/60"
            onClick={() =>
              dispatch(
                openModal({
                  type: "createChannel",
                  channelType: channelType,
                }),
              )
            }
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  );
};

export default ServerSection;
