import React from "react";
import dynamic from "next/dynamic";
import { format, isToday, isYesterday } from "date-fns";
import toast from "react-hot-toast";

import { Doc, Id } from "../../../../../../../convex/_generated/dataModel";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../components/ui/avatar";

import Hint from "../../../../../../components/hint";
import Thumbnail from "./thumbnail";
import MessageToolbar from "./message-toolbar";
import Reactions from "./reactions";

import { useConfirm } from "@/hooks/use-confirm";
import { useUpdateMessage } from "@/hooks/messages/use-update-message";
import { useRemoveMessage } from "@/hooks/messages/use-remove-message";
import { useToggleReaction } from "@/hooks/reactions/use-toggle-reaction";

import { cn } from "@/lib/utils";

const Renderer = dynamic(
  () =>
    import(
      "@/app/workspace/[workspaceId]/channel/[channelId]/_components/renderer"
    ),
  { ssr: false }
);
const Editor = dynamic(
  () =>
    import(
      "@/app/workspace/[workspaceId]/channel/[channelId]/_components/editor"
    ),
  { ssr: false }
);

interface MessageProps {
  id: Id<"messages">;
  memberId: Id<"members">;
  authorImage?: string;
  authorName?: string;
  isAuthor: boolean;
  reactions: Array<
    Omit<Doc<"reactions">, "memberId"> & {
      count: number;
      memberIds: Id<"members">[];
    }
  >;
  body: Doc<"messages">["body"];
  image: string | null | undefined;
  createdAt: Doc<"messages">["_creationTime"];
  updatedAt: Doc<"messages">["updatedAt"];
  isEditing: boolean;
  isCompact?: boolean;
  setEditingId: (id: Id<"messages"> | null) => void;
  hideThreadButton?: boolean;
  threadImage?: string;
  threadTimestamp?: number;
  threadCount?: number;
  threadName?: string;
}

const Message = ({
  id,
  memberId,
  authorImage,
  authorName = "Member",
  threadName,
  isAuthor,
  reactions,
  body,
  image,
  createdAt,
  updatedAt,
  isEditing,
  isCompact,
  setEditingId,
  hideThreadButton,
  threadImage,
  threadTimestamp,
  threadCount,
}: MessageProps) => {
  const { mutate: updateMessage, isPending: isUpdatingMessage } =
    useUpdateMessage();
  const { mutate: removeMessage, isPending: isRemovingMessage } =
    useRemoveMessage();
  const { mutate: toggleReaction, isPending: isTogglingReaction } =
    useToggleReaction();

  const isPending = isUpdatingMessage;

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete message",
    "This will permanently delete the message. Do you wish to continue?"
  );

  const handleUpdate = ({ body }: { body: string }) => {
    updateMessage(
      { id, body },
      {
        onSuccess: () => {
          toast.success("Message has been updated");
          setEditingId(null);
        },
        onError: () => {
          toast.error("Failed to update message");
        },
      }
    );
  };

  const handelRemove = async () => {
    const ok = await confirm();
    if (!ok) return;

    removeMessage(
      { id },
      {
        onSuccess: () => {
          toast.success("Message had been deleted");

          //TODO: close thred if opened
        },
        onError: () => {
          toast.error("Failed to delete message");
        },
      }
    );
  };

  const handleReaction = (value: string) => {
    toggleReaction(
      { messageId: id, value },
      {
        onError: () => {
          toast.error("Failed to toggle reaction");
        },
      }
    );
  };

  const formatFullTime = (date: Date) => {
    return `${
      isToday(date)
        ? "Today"
        : isYesterday(date)
          ? "Yesterday"
          : format(date, "MMM d, yyyy")
    } at ${format(date, "h:mm:ss a")}`;
  };

  // Without profile image
  if (isCompact) {
    return (
      <>
        <ConfirmDialog />
        <div
          className={cn(
            "flex flex-col gap-2 p-1.5 px-5 hover:bg-neutral-100/60 group relative",
            isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
            isRemovingMessage &&
              "bg-rose-500/50 transform  transition-all scale-y-0 origin-bottom duration-200"
          )}
        >
          <div className="flex items-start gap-3">
            <Hint label={formatFullTime(new Date(createdAt))}>
              <button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
                {format(new Date(createdAt), "hh:mm")}
              </button>
            </Hint>
            {isEditing ? (
              <div className="h-full w-full">
                <Editor
                  variant="update"
                  disabled={isPending}
                  defaultValue={JSON.parse(body)}
                  onSubmit={handleUpdate}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <Renderer value={body} />
                <Thumbnail url={image} />
                {updatedAt ? (
                  <span className="text-cs text-muted-foreground">
                    (edited)
                  </span>
                ) : null}
                <Reactions data={reactions} onChange={handleReaction} />
              </div>
            )}
          </div>
          {!isEditing && (
            <MessageToolbar
              isAuthor={isAuthor}
              isPending={false}
              handleEdit={() => setEditingId(id)}
              handleThread={() => {}}
              handleDelete={handelRemove}
              handleReaction={handleReaction}
              hideThreadButton={hideThreadButton}
            />
          )}
        </div>
      </>
    );
  }

  const avatarFallback = authorName.charAt(0).toUpperCase();

  return (
    <>
      <ConfirmDialog />
      <div
        className={cn(
          "flex flex-col gap-2 p-1.5 px-5 hover:bg-neutral-100/60 group relative",
          isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
          isRemovingMessage &&
            "bg-rose-500/50 transform  transition-all scale-y-0 origin-bottom duration-200"
        )}
      >
        <div className="flex items-start gap-2">
          <button onClick={() => {}}>
            <Avatar className="rounded-md">
              <AvatarImage
                className="rounded-md"
                src={authorImage}
                alt={authorName}
              />
              <AvatarFallback className="rounded-md bg-sky-600 dark:bg-sky-700 text-white">
                {avatarFallback}
              </AvatarFallback>{" "}
            </Avatar>
          </button>
          {isEditing ? (
            <div className="w-full h-full">
              <Editor
                variant="update"
                disabled={isPending}
                defaultValue={JSON.parse(body)}
                onSubmit={handleUpdate}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div className="flex flex-col w-full overflow-hidden">
              <div className="text-sm">
                <button
                  onClick={() => {}}
                  className="font-bold text-primary hover:underline"
                >
                  {authorName}
                </button>
                <span>&nbsp;</span>
                <Hint label={formatFullTime(new Date(createdAt))}>
                  <button className="text-xs text-muted-foreground hover:underline">
                    {format(new Date(createdAt), "h:mm a")}
                  </button>
                </Hint>
              </div>
              <Renderer value={body} />
              <Thumbnail url={image} />
              {updatedAt ? (
                <span className="text-xs text-muted-foreground">(edited)</span>
              ) : null}
              <Reactions data={reactions} onChange={handleReaction} />
            </div>
          )}
        </div>

        {!isEditing && (
          <MessageToolbar
            isAuthor={isAuthor}
            isPending={false}
            handleEdit={() => setEditingId(id)}
            handleThread={() => {}}
            handleDelete={handelRemove}
            handleReaction={handleReaction}
            hideThreadButton={hideThreadButton}
          />
        )}
      </div>
    </>
  );
};

export default Message;
