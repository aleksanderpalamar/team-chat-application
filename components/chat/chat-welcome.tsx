"use client"

import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
}

export const ChatWelcome = ({name, type}: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && (
        <div className="w-[75px] h-[75px] rounded-full bg-sky-500 dark:bg-sky-700 flex items-center justify-center">
          <Hash className="h-12 w-12 text-white dark:text-zinc-700"/>          
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold ">
        {type === "channel" ? "Welcome to " : ""}
        <span className="text-sky-500">
          #{name}
        </span>
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of the conversation with ${name}`
        }
      </p>
    </div>
  )
}