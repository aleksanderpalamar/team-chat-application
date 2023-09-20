"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member, MemberRole, Profile } from "@prisma/client";
import { UserAvatar } from "@/components/user-avatar";
import { ActionTooltip } from "@/components/action-tooltip";
import { Crown, DeleteIcon, Edit, File, FileIcon, Save, Sword, Trash, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter, useParams } from "next/navigation";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdate: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const formSchema = z.object({
  content: z.string().min(1),
})

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
  GUEST: "text-blue-400 text-sm font-semibold",
  MODERATOR: "text-pink-500 text-sm font-semibold",
  ADMIN: "text-[#8257e6] text-sm font-semibold",
};

export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdate,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const handleClickMember = () => {
    if (member.id === currentMember.id) {
      return
    }

    router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
  }

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keyDown", handleKeyDown);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    }    
  })

  const isLoading = form.formState.isSubmitting

  const handleOnSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    form.reset({
      content: content,
    })    
  }, [content, form])

  const icon = roleIconMap[member.role];
  const roleNameColor = roleNameColorMap[member.role];

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && ( isAdmin || isModerator || isOwner && !fileUrl )
  const canEditMessage = !deleted && isOwner && !fileUrl
  const isPDF = fileType === "pdf" && fileUrl
  const isMp4 = fileType === "mp4" && fileUrl
  const isImage = !isPDF && !isMp4 && fileUrl
  const isVideo = !isPDF && isMp4
  
  const newDateFormat = () => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  } 

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div onClick={handleClickMember} className="cursor-pointer hover:drop-shadow-md transition">
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-2">
              {roleNameColor.trim() && (
                <p onClick={handleClickMember} className={cn(
                  "cursor-pointer",
                  roleNameColor
                )}>{member.profile.name}</p>
              )}
              <ActionTooltip label={member.role}>
                <span>{icon}</span>
              </ActionTooltip>
            </div>
            <ActionTooltip label={timestamp}>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {newDateFormat()}
            </span>
            </ActionTooltip>
          </div>
            {isImage && (
              <a 
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-md mt-2 overflow-hidden border flex
                items-center bg-black/5 w-64 h-64"
              >
                <Image 
                  src={fileUrl}
                  alt={content}
                  fill
                  className="object-cover"
                />                
              </a>
            )}
            {isPDF && (
              <div className="relative w-32 flex items-center p-2 mt-2 rounded-md bg-black/10 dark:bg-black/25">
                <FileIcon className="w-10 h-10 fill-[#8257e6] stroke-violet-400"/>
                <a 
                 href={fileUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="ml-2 text-sm text-[#8257e6] hover:underline"
                >
                  archive.pdf
                </a>
              </div>
            )}
            {isVideo && (              
                <video 
                  src={fileUrl}
                  controls
                  className="aspect-video rounded-md mt-2 overflow-hidden border flex
                  items-center justify-center bg-black/5 w-64 h-64"
                  autoPlay={false} 
                />              
            )}
            {!fileUrl && !isEditing && (
              <p className={cn(
                "text-sm text-zinc-500 dark:text-zinc-400",
                deleted && "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}>
                {content}
                {isUpdate && !deleted && (
                  <span className="mx-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                    (edited)
                  </span>
                )}
              </p>
            )}
            {!fileUrl && isEditing && (
              <Form {...form}>
                <form 
                  className="flex items-center w-full gap-x-2 pt-2"
                  onSubmit={form.handleSubmit(handleOnSubmit)}
                >
                  <FormField 
                    control={form.control}
                    name="content"
                    render={({field}) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <div className="relative w-full">
                            <Input 
                            disabled={isLoading}
                            className="p-2 bg-sky-200/90
                            dark:bg-zinc-700/75 border-none border-0
                            focus-visible:ring-0
                            focus-visible:ring-offset-0 text-zinc-600
                            dark:text-zinc-200"
                            placeholder="Edited message" 
                            {...field}/>                            
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  /> 
                  <Button disabled={isLoading} size="sm" variant="primary">
                    <Save className="w-5 h-5" />
                  </Button>                 
                </form>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Press escape to cancel, or enter to save.
                </span>
              </Form>
            )}            
        </div>
      </div>
      {canDeleteMessage && (
        <div className="hidden group-hover:flex item-center gap-x-2
        absolute p-1 top-2 right-5 bg-black/10 dark:bg-black/20 border rounded-sm"
        >
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit 
              onClick={() => setIsEditing(true)}
              className="w-5 h-5 cursor-pointer ml-auto text-rose-500
              hover:text-rose-600 dark:text-rose-400 transition"/>
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash 
            onClick={() => onOpen("deleteMessage", {
              apiUrl: `${socketUrl}/${id}`,
              query: socketQuery
            })}
            className="w-5 h-5 cursor-pointer ml-auto text-rose-500
            hover:text-rose-600 dark:text-rose-400 transition" />
          </ActionTooltip>          
        </div>
      )}
    </div>
  );
};
