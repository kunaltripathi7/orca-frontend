import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

// way to apply external styles
interface Props {
  src: string;
  className?: string;
}

const UserAvatar = ({ src, className }: Props) => {
  return (
    <Avatar className={cn("h-7 w-7 md:h-8 md:w-8", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
