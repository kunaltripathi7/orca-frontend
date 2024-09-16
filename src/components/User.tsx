import { UserButton } from "@clerk/clerk-react";
import { useState } from "react";

import { RiMicOffFill } from "react-icons/ri";
import { FaMicrophone } from "react-icons/fa6";
import { IoHeadsetSharp } from "react-icons/io5";
import { MdHeadsetOff } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

type Props = {
  name: string | null | undefined;
};

const userButtonAppearance = {
  elements: {
    userButtonAvatarBox: "w-9 h-9",
    userButtonPopoverCard: "bg-blue-100",
    userButtonPopoverActionButton: "text-white-500",
  },
};

const User = ({ name }: Props) => {
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isHeadsetEnabled, setIsHeadsetEnabled] = useState(true);

  const handleMic = () => setIsMicEnabled((prev) => !prev);
  const handleHeadset = () => setIsHeadsetEnabled((prev) => !prev);

  return (
    <div className="mt-auto flex h-[72px] items-center justify-between gap-5 overflow-hidden bg-[#1E213F] py-4">
      <div className="ml-3 flex">
        <UserButton appearance={userButtonAppearance} />
        <div className="ml-2 flex flex-col justify-center">
          <span className="font-lato text-xs tracking-wide text-zinc-100">
            {name}
          </span>
          <span className="font-lato text-[10px] tracking-wide text-gray-100/60">
            Online
          </span>
        </div>
      </div>
      <div className="mr-2 flex items-center gap-1 text-zinc-200/90">
        <button
          onClick={handleMic}
          className="cursor-pointer rounded-sm p-1 hover:bg-gray-600 active:scale-95"
        >
          {isMicEnabled ? (
            <FaMicrophone className="h-5 w-5" />
          ) : (
            <RiMicOffFill className="h-5 w-5 text-rose-500" />
          )}
        </button>
        <button
          onClick={handleHeadset}
          className="cursor-pointer rounded-sm p-1 hover:bg-gray-600 active:scale-95"
        >
          {isHeadsetEnabled ? (
            <IoHeadsetSharp className="h-5 w-5 cursor-pointer" />
          ) : (
            <MdHeadsetOff className="h-5 w-5 cursor-pointer text-rose-500" />
          )}
        </button>
        <button className="rounded-sm p-1 hover:bg-gray-600">
          <IoSettingsSharp className="h-5 w-5 cursor-pointer transition-transform duration-1000 ease-in-out hover:rotate-[360deg] active:scale-95" />
        </button>
      </div>
    </div>
  );
};

export default User;
