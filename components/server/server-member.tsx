"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { Crown, Sword, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

const roleIconMap = {
  [MemberRole.ADMIN]: (
    <Crown
      fill="currentColor"
      className="h-6 w-6 mr-2 text-[#e6df57] bg-[#c0aeea] rounded p-[0.1rem]"
    />
  ),
  [MemberRole.MODERATOR]: (
    <Sword
      fill="currentColor"
      className="h-6 w-6 mr-2 text-pink-500 bg-pink-300 rounded p-[0.1rem]"
    />
  ),
  [MemberRole.GUEST]: (
    <User
      fill="currentColor"
      className="h-6 w-6 mr-2 text-pink-500 bg-blue-200 rounded p-[0.1rem]"
    />
  ),
};

const roleNameColorMap = {
  GUEST: "text-blue-400",
  MODERATOR: "text-pink-500",
  ADMIN: "text-[#8257e6]",
};

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];
  const roleNameColor = roleNameColorMap[member.role];

  const handleClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
  }

  return (
    <ScrollArea>
      <button
        onClick={handleClick}
        className={cn(
          "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
          params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
        )}
      >
        <UserAvatar
          className="w-8 h-8 md:w-8 md:h-8"
          src={member.profile.imageUrl}
        />
        <p
          className={cn(
            "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
            params?.memberId === member.id &&
              "text-primary dark:text-zinc-200 dark:group-hover:text-white"
          )}
        >
          {roleNameColor.trim() && (
            <span className={roleNameColor}>{member.profile.name}</span>
          )}
        </p>
        <ActionTooltip label={member.role}>{icon}</ActionTooltip>
      </button>
    </ScrollArea>
  );
};
