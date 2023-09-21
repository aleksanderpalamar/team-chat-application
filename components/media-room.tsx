"use client"

import { useEffect, useState } from "react"
import { LiveKitRoom, VideoConference } from "@livekit/components-react"
import "@livekit/components-styles"
import { Channel } from "@prisma/client"
import { useUser } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

interface MediaRoomProps {
  chatId: string
  video: boolean
  audio: boolean
}

export const MediaRoom = ({ chatId, video, audio }: MediaRoomProps) => {
  const { user } = useUser()
  const [token, setToken] = useState("")

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return

    const name = `${user.firstName} ${user.lastName}`;

    (async () => {
      try {
        const response = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
        const data = await response.json()
        setToken(data.token)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [user?.firstName, user?.lastName, chatId])

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="animate-spin w-8 h-8 text-sky-500 my-4" />
        <p className="text-sm text-sky-500">Loading...</p>
      </div>
    )
  }

  return (
    <LiveKitRoom 
      token={token}
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      video={video}
      audio={audio}
      connect={true}
    >
      <VideoConference />      
    </LiveKitRoom>
  )
}