import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface ChannelIdPageProps {
  params: {
    serverId: string,
    channelId: string
  }
}

const ChannelIdPage = async ({params}: ChannelIdPageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirectToSignIn()    
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId
    }
  })

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id
    }
  })

  if (!channel || !member) {
    return redirect("/")
  }

  return (
    <div className="dark:bg-[#313338] bg-[#e9f6ff] h-full flex flex-col">
      <ChatHeader 
        serverId={params.serverId}
        name={channel.name}
        type="channel"
      />
      <div className="flex-1">
        Future content
      </div>
      <ChatInput 
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId
        }}
      />
    </div>
  )
}

export default ChannelIdPage