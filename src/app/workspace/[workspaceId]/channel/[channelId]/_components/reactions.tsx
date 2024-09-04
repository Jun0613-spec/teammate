import React from "react";
import { MdOutlineAddReaction } from "react-icons/md";

import { Doc, Id } from "../../../../../../../convex/_generated/dataModel";

import EmojiPopover from "@/components/emoji-popover";
import Hint from "@/components/hint";

import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { useCurrentMember } from "@/hooks/members/use-current-member";

import { cn } from "@/lib/utils";

interface ReactionsProps {
  data: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  onChange: (value: string) => void;
}

const Reactions = ({ data, onChange }: ReactionsProps) => {
  const workspaceId = useWorkspaceId();
  const { data: currentMember } = useCurrentMember({ workspaceId });
  const currentMemberId = currentMember?._id;

  if (!currentMemberId || data.length === 0) {
    return;
  }

  return (
    <div className="flex items-center gap-1 mt-1 mb-1">
      {data.map((reaction) => (
        <Hint
          key={reaction._id}
          label={`${reaction.count} ${reaction.count === 1 ? "person" : "people"} reacted with ${reaction.value}`}
        >
          <button
            onClick={() => onChange(reaction.value)}
            className={cn(
              "h-6 px-2 rounded-full bg-neutral-200/70 border border-transparent text-neutral-800 flex items-center gap-x-1",
              reaction.memberIds.includes(currentMemberId) &&
                "bg-blue-100/70 border-blue-500 text-white"
            )}
          >
            {reaction.value}
            <span
              className={cn(
                "text-xs font-semibold text-muted-foreground",
                reaction.memberIds.includes(currentMemberId) && "text-blue-500"
              )}
            >
              {reaction.count}
            </span>
          </button>
        </Hint>
      ))}
      <EmojiPopover
        onEmojiSelect={(emoji) => onChange(emoji.native)}
        hint="Add reaction"
      >
        <button className="h-7 px-3 rounded-full bg-neutral-200/70 border border-transparent hover:border-neutral-500 text-neutral-800 flex items-center gap-x-1">
          <MdOutlineAddReaction className="size-4" />
        </button>
      </EmojiPopover>
    </div>
  );
};

export default Reactions;
