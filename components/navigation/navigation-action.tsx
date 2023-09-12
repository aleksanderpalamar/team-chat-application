"use client";

import { Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip label="create a new community" side="right" align="center">
        <button
          onClick={() => onOpen("communityServer")} 
          className="group flex items-center"
        >
          <div
            className="flex mx-3 h-[48px] w-[48px] rounded-[24px] 
        group-hover:rounded-[16px] transition-all
        overflow-hidden items-center justify-center
        bg-background dark:bg-neutral-700 group-hover:bg-sky-500"
          >
            <Plus
              className="group-hover:text-white transition text-sky-500"
              size={24}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
