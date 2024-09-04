import React from "react";
import {
  MessageSquareIcon,
  PencilIcon,
  SmileIcon,
  Trash2Icon,
} from "lucide-react";

import EmojiPopover from "../../../../../../components/emoji-popover";
import Hint from "../../../../../../components/hint";

import { Button } from "../../../../../../components/ui/button";

interface MessageToolbarProps {
  isAuthor: boolean;
  isPending: boolean;
  handleEdit: () => void;
  handleThread: () => void;
  handleDelete: () => void;
  handleReaction: (value: string) => void;
  hideThreadButton?: boolean;
}

const MessageToolbar = ({
  isAuthor,
  isPending,
  handleEdit,
  handleThread,
  handleDelete,
  handleReaction,
  hideThreadButton,
}: MessageToolbarProps) => {
  return (
    <div className="absolute top-0 right-5">
      <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white shadow-sm rounded-md">
        <EmojiPopover
          hint="Add reaction"
          onEmojiSelect={(emoji) => handleReaction(emoji.native)}
        >
          <Button variant={"ghost"} disabled={isPending} size={"iconSm"}>
            <SmileIcon className="size-4" />
          </Button>
        </EmojiPopover>
        {!hideThreadButton && (
          <Hint label="Reply in thread">
            <Button
              onClick={handleThread}
              variant={"ghost"}
              disabled={isPending}
              size={"iconSm"}
            >
              <MessageSquareIcon className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Edit message">
            <Button
              onClick={handleEdit}
              variant={"ghost"}
              disabled={isPending}
              size={"iconSm"}
            >
              <PencilIcon className="size-4" />
            </Button>
          </Hint>
        )}
        {isAuthor && (
          <Hint label="Delete message">
            <Button
              onClick={handleDelete}
              variant={"ghost"}
              disabled={isPending}
              size={"iconSm"}
            >
              <Trash2Icon className="size-4" />
            </Button>
          </Hint>
        )}
      </div>
    </div>
  );
};

export default MessageToolbar;
