import ActionTooltip from "@/components/ActionTooltip";
import React from "react";

type Props = {
  children: React.ReactElement;
  label: string;
  onClick: () => void;
};

const NavigationAction = ({ children, label, onClick }: Props) => {
  return (
    <ActionTooltip side="right" align="center" label={label}>
      <button
        className="active:scale-9 group relative my-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow-md transition-all hover:scale-105"
        onClick={onClick}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E8A9FF] to-[#53E1FF] opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="relative z-10 flex items-center justify-center">
          {React.cloneElement(children, {
            className: `w-14 h-14 transition-all group-hover:filter group-hover:drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] group-active:filter group-active:drop-shadow-[0_0_2px_rgba(255,255,255,1)] group-active:scale-90 ${children.props.className || ""}`,
          })}
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationAction;
