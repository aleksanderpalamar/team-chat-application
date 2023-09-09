"use client"

import { CreateCommunityModal } from "@/components/modals/create-community-modal"
import { useEffect, useState } from "react"
import { InviteModal } from "@/components/modals/invite-modal"
import { EditServerModal } from "@/components/modals/edit-server-modal"
import { MembersModal } from "@/components/modals/members-modal"
import { CreateChannelModal } from "@/components/modals/create-channel-modal"
import { LeaveCommunityModal } from "@/components/modals/leave-community-modal"
import { DeleteCommunityModal } from "@/components/modals/delete-community-modal"

export const ModalProvider = () => {
  const [isMouted, setIsMouted] = useState(false)

  useEffect(() => {
    setIsMouted(true)  
  }, [])

  if (!isMouted) {
    return null
  }

  return (
    <>
      <CreateCommunityModal />
      <InviteModal />
      <EditServerModal />
      <MembersModal />
      <CreateChannelModal />
      <LeaveCommunityModal />
      <DeleteCommunityModal />
    </>
  )
}