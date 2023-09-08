import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  className?: string;
  src?: string;
}

export const UserAvatar = ({ className, src }: UserAvatarProps) => {
  return (
    <Avatar className={cn(
      "w-7 h-7 md:w-10 md:h-10",
      className
    )}>
      <AvatarImage src={src} />
    </Avatar>
  );
}