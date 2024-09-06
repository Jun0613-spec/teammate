import React from "react";
import { Loader2 } from "lucide-react";

import { Id } from "../../../../../../../convex/_generated/dataModel";

import { useMemberId } from "@/hooks/members/use-member-id";
import { useGetMessages } from "@/hooks/messages/use-get-messages";
import { useGetMember } from "@/hooks/members/use-get-member";
import { usePanel } from "@/hooks/use-panel";

import MessageList from "@/components/message-list";

import Header from "./header";
import ChatInput from "./chat-input";

interface ConversationProps {
  id: Id<"conversations">;
}

const Conversation = ({ id }: ConversationProps) => {
  const memberId = useMemberId();

  const { onOpenProfile } = usePanel();

  const { data: member, isLoading: isMemberLoading } = useGetMember({
    id: memberId,
  });
  const { results, status, loadMore } = useGetMessages({ conversationId: id });

  if (isMemberLoading || status === "LoadingFirstPage") {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full dark:bg-gray-900 dark:text-white">
      <Header
        memberName={member?.user.name}
        memberImage={member?.user.image}
        onClick={() => onOpenProfile(memberId)}
      />
      <MessageList
        data={results}
        memberName={member?.user.name}
        memberImage={member?.user.image}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
        variant="conversation"
      />
      <ChatInput
        placeholder={`Message ${member?.user.name}`}
        conversationId={id}
      />
    </div>
  );
};

export default Conversation;
