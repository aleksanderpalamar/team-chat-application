import { Hash } from "lucide-react"
import { MobileToggle } from "@/components/mobile-toggle"
import { UserAvatar } from "@/components/user-avatar"
import { SocketIndicator } from "@/components/socket-indicator"
import { ChatVideoButton } from "./chat-video-button"

type ChatHeaderProps = {
  serverId: string
  name: string
  type: "channel" | "conversation"
  imageUrl?: string
}

export const ChatHeader = ({serverId, name, type, imageUrl}: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12
    border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle 
        serverId={serverId}
      />
      {type === "channel" && (
        <Hash className="h-6 w-6 mr-2 text-pink-500"/>
      )}
      {type === "conversation" && (
        <UserAvatar 
          src={imageUrl}
          className="w-8 h-8 md:w-8 md:h-8 mr-2"
        />
      )}
      <p className="font-semibold text-md text-sky-500">
        {name}
      </p>
      <div className="ml-auto flex items-center">
        {type === "conversation" && (
          <ChatVideoButton />
        )}
        <SocketIndicator />
      </div>
    </div>
  )
}