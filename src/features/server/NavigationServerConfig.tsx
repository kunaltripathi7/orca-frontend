import NavigationAction from "./NavigationAction";
import Plus from "../../assets/icons/plus.svg";
import Explore from "../../assets/icons/explore.svg";

import { useDispatch } from "react-redux";
import { openModal } from "../Modals/modalSlice";
import ActionTooltip from "@/components/ActionTooltip";
import React, { ReactElement } from "react";
import Logo from "@/assets/icons/Logo";

interface Props {
  children: ReactElement;
}

const NavigationServerConfig = ({ children }: Props) => {
  const dispatch = useDispatch();
  return (
    // mt-auto for moving a flex to the bottom
    <section className="flex flex-col items-center justify-center gap-1">
      <ActionTooltip side="right" align="center" label="Direct Messages">
        <button
          className="active:scale-9 group relative my-1 flex cursor-pointer items-center justify-center rounded-full shadow-md transition-all hover:scale-105 active:scale-90"
          onClick={() => {}}
        >
          <Logo className="h-[43px] w-[43px]" />
        </button>
      </ActionTooltip>
      {children}
      <NavigationAction label="Explore communities" onClick={() => {}}>
        <Explore />
      </NavigationAction>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          className="active:scale-9 group relative my-1 flex cursor-pointer items-center justify-center rounded-full shadow-md transition-all hover:scale-105 active:scale-90"
          onClick={() => dispatch(openModal({ type: "createServer" }))}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E8A9FF] to-[#53E1FF] opacity-0 transition-opacity group-hover:opacity-100" />
          {React.cloneElement(<Plus />, {
            className: `w-11 h-11 transition-all cursor-pointer group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] group-active:filter group-active:drop-shadow-[0_0_2px_rgba(255,255,255,1)] group-active:scale-90`,
          })}
          <div />
        </button>
      </ActionTooltip>
    </section>
  );
};

export default NavigationServerConfig;
