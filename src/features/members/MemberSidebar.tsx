import UserAvatar from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import { MemberRole, MemberType } from "@/utils/types";
import { ReactElement } from "react";

import { useNavigate, useParams } from "react-router-dom";

// interface doesn't supports mapped types
type RoleIconMap = {
  [key in MemberRole]: ReactElement | null;
};

interface Props {
  members: MemberType[] | undefined;
  roleIconMap: RoleIconMap;
}

const MemberSidebar = ({ members, roleIconMap }: Props) => {
  const { serverId, memberId } = useParams();
  const navigate = useNavigate();
  return (
    <div className="w-60 bg-[#2C2F48] text-white/90">
      <>
        {members?.length ? (
          members?.map((member) => {
            const Icon = roleIconMap[member.role];
            return (
              <div key={member.id} className="space-y-[2px]">
                <button
                  className={cn(
                    "group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-[#393D5D]",
                    memberId === member.id && "bg-[#25283e]",
                  )}
                  onClick={() =>
                    navigate(`/servers/${serverId}/conversations/${member.id}`)
                  }
                >
                  <UserAvatar src={member.profile.imageUrl} />
                  <p
                    className={cn(
                      "tracking-wid font-lato transition group-hover:text-zinc-200",
                      memberId === member.id && "text-zinc-200",
                    )}
                  >
                    {member.profile.name}
                  </p>
                  {Icon}
                </button>
              </div>
            );
          })
        ) : (
          <div className="mt-10 px-1 text-center">
            <p className="text-balance font-lato text-[13px] leading-5 tracking-wide">
              Looks like you're all alone here. Invite some friends to join!"
            </p>
          </div>
        )}
      </>
    </div>
  );
};

export default MemberSidebar;
