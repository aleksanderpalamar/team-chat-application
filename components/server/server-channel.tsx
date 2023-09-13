"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Lock, Mic, Trash, Video } from "lucide-react";
import { Chat } from "phosphor-react"
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Chat,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  const { onOpen } = useModal();
  const router = useRouter();
  const params = useParams();

  const Icon = iconMap[channel.type];

  return (
    <button
      onClick={() => {}}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Icon
        className="w-5 h-5 flex-shrink-0 text-zinc-500
        dark:text-zinc-400"        
      />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "welcome" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit Channel">
            <Edit 
            onClick={() => onOpen("editChannel", { channel, server })}
            className="w-4 h-4 hidden group-hover:block text-zinc-500
            hover:text-zinc-600 dark:text-zinc-400
            dark:hover:text-zinc-300 transition"/>
          </ActionTooltip>
          <ActionTooltip label="Delete Channel">
            <Trash 
            onClick={() => onOpen("deleteChannel", { channel, server })}
            className="w-4 h-4 hidden group-hover:block text-zinc-500
            hover:text-zinc-600 dark:text-zinc-400
            dark:hover:text-zinc-300 transition"/>
          </ActionTooltip>
        </div>
      )}
      {channel.name === "welcome" && (
        <Lock className="w-4 h-4 ml-auto text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
};
