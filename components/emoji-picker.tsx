"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmileIcon } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data"
import { useTheme } from "next-themes";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <SmileIcon className="h-6 w-6 text-pink-500 hover:text-pink-400 transition" />
      </PopoverTrigger>
      <PopoverContent side="right" sideOffset={40} className="bg-transparent border-none shadow-none
      drop-shadow-none mb-16">
        <Picker 
          data={data} 
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          theme={resolvedTheme}
        />        
      </PopoverContent>
    </Popover>
  );
};
