import React from "react";
import { ChevronRightIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface ThreadBarProps {
  count?: number;
  image?: string;
  name?: string;
  timestamp?: number | undefined;
  onClick: () => void;
}

const ThreadBar = ({
  count,
  image,
  name = "Member",
  timestamp,
  onClick,
}: ThreadBarProps) => {
  const avatarFallback = name.charAt(0).toUpperCase();

  if (!count || !timestamp) return null;

  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent flex items-center justify-start group thread-bar transition max-w-[600px]"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="size-6 shrink-0">
          <AvatarImage className="rounded-md" src={image} />
          <AvatarFallback className="rounded-md bg-sky-500 text-white text-xs">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm text-sky-700 dark:text-sky-300 hover:underline font-bold truncate">
          {count} {count > 1 ? "replies" : "reply"}
        </span>
        <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:hidden block">
          Last reply {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
        <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:block hidden">
          View thread
        </span>
      </div>
      <ChevronRightIcon className="size-4 text-muted-foreground ml-auto opacity-0 group-hover/thread-bar:opacity-100 transition shrink-0" />
    </button>
  );
};

export default ThreadBar;
