import UserAvatar from "@/components/UserAvatar";
import { cn } from "@/lib/utils";
import { MemberRole, MemberType } from "@/utils/types";
import { ReactElement } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams } from "react-router-dom";

// interface doesn't supports mapped types
type RoleIconMap = {
  [key in MemberRole]: ReactElement | null;
};

interface Props {
  members: MemberType[] | undefined;
  isLoading: boolean;
  roleIconMap: RoleIconMap;
}

const MemberSidebar = ({ members, isLoading, roleIconMap }: Props) => {
  const { memberId, channelId } = useParams();
  return (
    <div className="w-60 bg-[#2C2F48] text-white/90">
      {isLoading ? (
        <Skeleton
          count={20}
          width={190}
          className="mx-2 my-3"
          baseColor="#575a74"
          highlightColor="#9799a6"
          height={14}
        />
      ) : (
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
                  >
                    <UserAvatar src={member.profile.imageUrl} />
                    <p
                      className={cn(
                        "tracking-wid font-lato transition group-hover:text-zinc-200",
                        channelId === member.id && "text-zinc-200",
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
      )}
    </div>
  );
};

export default MemberSidebar;
