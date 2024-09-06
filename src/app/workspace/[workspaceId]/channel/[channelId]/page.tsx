"use client";

import { CircleAlert, Loader2 } from "lucide-react";
import React from "react";

import ChannelHeader from "./_components/channel-header";
import ChatInput from "./_components/chat-input";

import { useGetChannel } from "@/hooks/chennels/use-get-channel";
import { useChannelId } from "@/hooks/chennels/use-channel-id";
import { useGetMessages } from "@/hooks/messages/use-get-messages";
import MessageList from "@/components/message-list";

const ChannelIdPage = () => {
  const channelId = useChannelId();

  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });
  const { results, status, loadMore } = useGetMessages({ channelId });

  if (channelLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex-1 flex items-center justify-center bg-white dark:bg-gray-900">
        <Loader2 className="size-5 text-muted-foreground animate-spin" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="h-full flex-1 flex items-center justify-center flex-col gap-y-2 bg-white dark:bg-gray-900">
        <CircleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground dark:text-gray-300">
          Channel not found
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <ChannelHeader title={channel.name} />

      <MessageList
        channelName={channel.name}
        channelCreationTime={channel._creationTime}
        data={results}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
        variant="channel"
      />

      <ChatInput placeholder={`Message #${channel.name}`} />
    </div>
  );
};

export default ChannelIdPage;
