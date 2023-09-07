"use client"

import { CreateServerModal } from "@/components/modals/create-server-modal"
import { useEffect, useState } from "react"
import { InviteModal } from "@/components/modals/invite-modal"

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
      <CreateServerModal />
      <InviteModal />
    </>
  )
}