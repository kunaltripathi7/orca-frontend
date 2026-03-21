import { Search } from "lucide-react";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { CommandEmpty } from "cmdk";
import { useNavigate, useParams } from "react-router-dom";
import { DialogTitle } from "./ui/dialog";

interface Props {
  dataObj:
    | {
        description: string;
        type: "channel" | "member";
        data:
          | {
              icon: React.ReactNode;
              name: string;
              id: string;
            }[]
          | undefined;
      }[]
    | undefined;
}

const ServerSearch = ({ dataObj }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { serverId } = useParams();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  });

  const onClick = ({ id, type }: { id: string; type: string }) => {
    setOpen(false);
    if (type === "channel") navigate(`/servers/${serverId}/channels/${id}`);
    if (type === "member") navigate(`/servers/${serverId}/conversations/${id}`);
  };

  return (
    <>
      <button
        className="group flex items-center gap-x-2 rounded-md bg-[#151130]/70 p-2 text-zinc-300 transition hover:bg-[#1c134f] md:mx-1 md:my-1 md:w-52 md:px-2 md:py-[6px]"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        <p className="hidden text-sm transition group-hover:text-zinc-200 md:block">Search</p>
        <kbd className="pointer-events-none ml-auto hidden select-none items-center gap-x-1 rounded border bg-muted px-1.5 font-lato text-[10px] font-medium text-muted-foreground md:inline-flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="hidden">
          Search for channels and members
        </DialogTitle>
        <CommandInput placeholder="Search all Channels and members" />
        <CommandList className="py-2 text-center">
          <CommandEmpty>No Results Found</CommandEmpty>
          {dataObj?.map(({ description, type, data }) => {
            if (!data?.length) return null;
            return (
              <CommandGroup
                key={description}
                heading={description}
                className="text-start"
              >
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                    >
                      {icon} <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
