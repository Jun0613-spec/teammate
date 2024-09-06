"use client";

import React, { useEffect, useState } from "react";
import { CircleAlert, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { Id } from "../../../../../../convex/_generated/dataModel";

import { useMemberId } from "@/hooks/members/use-member-id";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { useCreateOrGetConversation } from "@/hooks/conversations/use-create-or-get-conversation";

import Conversation from "./_components/conversation";

const MemberIdPage = () => {
  const memberId = useMemberId();
  const workspaceId = useWorkspaceId();

  const [conversationId, setConversationId] =
    useState<Id<"conversations"> | null>(null);

  const { mutate, isPending } = useCreateOrGetConversation();

  useEffect(() => {
    mutate(
      { workspaceId, memberId },
      {
        onSuccess: (data) => {
          setConversationId(data);
        },
        onError: () => {
          toast.error("Failed to create or get conversation");
        },
      }
    );
  }, [memberId, workspaceId, mutate]);

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center dark:bg-gray-900">
        <Loader2 className="size-6 animate-spin text-muted-foreground dark:text-gray-400" />
      </div>
    );
  }

  if (!conversationId) {
    return (
      <div className="flex h-full flex-col gap-y-2 items-center justify-center dark:bg-gray-900">
        <CircleAlert className="size-6 text-muted-foreground dark:text-gray-400" />
        <span className="text-sm text-muted-foreground dark:text-gray-400">
          Conversation not found
        </span>
      </div>
    );
  }

  return <Conversation id={conversationId} />;
};

export default MemberIdPage;
