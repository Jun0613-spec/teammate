// @ts-nocheck
import React, { useState } from "react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useTheme } from "next-themes";

interface EmojiPopoverProps {
  children: React.ReactNode;
  hint?: string;
  onEmojiSelect: (value: string) => void;
}

const EmojiPopover = ({ children, hint, onEmojiSelect }: EmojiPopoverProps) => {
  const { theme } = useTheme();
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const onSelect = (value: EmojiClickData) => {
    onEmojiSelect(value.emoji);
    setPopoverOpen(false);

    setTimeout(() => {
      setTooltipOpen(false);
    }, 500);
  };

  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip
          open={tooltipOpen}
          onOpenChange={setTooltipOpen}
          delayDuration={50}
        >
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="bg-black text-white border border-white/10 dark:bg-neutral-700 dark:border-neutral-600">
            <p className="font-medium text-xs">{hint}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-lg dark:shadow-none">
          <EmojiPicker
            onEmojiClick={onSelect}
            theme={theme === "dark" ? "dark" : "light"}
          />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default EmojiPopover;
