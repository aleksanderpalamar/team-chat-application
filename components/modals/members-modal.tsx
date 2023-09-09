"use client";
import qs from "query-string"
import { Check, Crown, Gavel,  Loader2, MoreVertical, Shield, ShieldQuestion, Sword, SwordsIcon, User, UserCheck, UserCheck2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserAvatar } from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { MemberRole } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const roleIconMap = {
  GUEST: (
    <User fill="currentColor" className="h-6 w-6 ml-2 text-pink-500 bg-blue-200 rounded p-[0.1rem]"/>
  ),
  MODERATOR: (
    <Sword
      fill="currentColor"
      className="h-6 w-6 ml-2 text-pink-500 bg-pink-300 rounded p-[0.1rem]"
    />
  ),
  ADMIN: (
    <Crown
      fill="currentColor"
      className="h-6 w-6 ml-2 text-[#e6df57] bg-[#c0aeea] rounded p-[0.1rem]"
    />
  ),
};

const roleNameColorMap = {
  GUEST: "text-blue-400",
  MODERATOR: "text-pink-500",
  ADMIN: "text-[#8257e6]",
};

export const MembersModal = () => {
  const router = useRouter()
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");

  const isModalOpen = isOpen && type === "membersManage";
  const { server } = data as { server: ServerWithMembersWithProfiles };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        }
      })

      const response = await axios.delete(url)
      router.refresh()
      onOpen("membersManage", { server: response.data })
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("")
    }    
  }

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        }
      })

      const response = await axios.patch(url, { role })
      router.refresh()
      onOpen("membersManage", { server: response.data })
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("")
    }    
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <span className="text-xs font-semibold flex items-center">
                  {member.role && (
                    <span
                      className={cn(
                        "flex items-center",
                        roleNameColorMap[member.role]
                      )}
                      title={member.role}
                    >
                      {member.profile.name}
                      {roleIconMap[member.role]}
                    </span>
                  )}
                </span>
                <span className="text-xs text-zinc-500">
                  {member.profile.email}
                </span>
              </div>
              {server.profileId !== member.profileId && loadingId !== member.id && (
                <div className="ml-auto">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreVertical className="h-4 w-4 text-zinc-500"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="flex items-center">
                          <ShieldQuestion className="h-4 w-4 mr-2 bg-[#c0aeea] rounded text-[#8257e6]"/>
                          <span className="text-xs">
                            Permission
                          </span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem 
                              onClick={() => onRoleChange(member.id, "GUEST")}
                              className="text-xs"
                            >
                              <User className="h-4 w-4 mr-2"/>
                              Guest
                              {member.role === "GUEST" && (
                                <Check className="ml-auto h-4 w-4 text-emerald-500" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => onRoleChange(member.id, "MODERATOR")}
                              className="text-xs"
                            >
                              <User className="h-4 w-4 mr-2"/>
                              Moderator
                              {member.role === "MODERATOR" && (
                                <Check className="ml-auto h-4 w-4 text-emerald-500" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>                          
                        </DropdownMenuPortal>                        
                      </DropdownMenuSub>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                      onClick={() => onKick(member.id)}
                      >
                        <Gavel className="h-4 w-4 mr-2 bg-rose-300 rounded text-rose-500"/>                        
                        <span className="text-rose-500 text-xs">Kick</span>                       
                      </DropdownMenuItem>
                    </DropdownMenuContent>                    
                  </DropdownMenu>
                </div>
              )}
              {loadingId === member.id && (
                <Loader2 className="ml-auto animate-spin text-zinc-500 h-4 w-4" />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
