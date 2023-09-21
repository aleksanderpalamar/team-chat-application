"use client"

import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Video, VideoOff} from "lucide-react"

import { ActionTooltip } from "@/components/action-tooltip"

export const ChatVideoButton = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isVideo = searchParams?.get("video")

  const handleClick = () => {
    const url = qs.stringifyUrl({
      url: pathname || "",
      query: {
        video: isVideo ? undefined : true
      }
    }, { skipNull: true })

    router.push(url)
  }

  const Icon = isVideo ? VideoOff : Video
  const tooltipLabel = isVideo ? "Stop video call" : "Start video call"

  return (
    <ActionTooltip label={tooltipLabel} side="bottom" >
      <button onClick={handleClick} className="hover:opacity-75
      transition mr-4">
        <Icon className="w-6 h-6 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300" />
      </button>
    </ActionTooltip>
  )
}