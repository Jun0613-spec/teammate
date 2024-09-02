"use client";

import { CircleAlert, Loader2 } from "lucide-react";
import React from "react";

import ChannelHeader from "./_components/channel-header";
import ChatInput from "./_components/chat-input";

import { useGetChannel } from "@/hooks/chennels/use-get-channel";

import { useChannelId } from "@/hooks/chennels/use-channel-id";

const ChannelIdPage = () => {
  const channelId = useChannelId();

  const { data: channel, isLoading: channelLoading } = useGetChannel({
    id: channelId,
  });

  if (channelLoading) {
    return (
      <div
        className="h-full flex-1 flex items-center
       justify-center "
      >
        <Loader2 className="size-5 text-muted-foreground animate-spin" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div
        className="h-full flex-1 flex items-center
       justify-center flex-col gap-y-2"
      >
        <CircleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-700">
      <ChannelHeader title={channel.name} />
      <div className="flex-1" />
      <ChatInput placeholder={`Message #${channel.name}`} />
    </div>
  );
};

export default ChannelIdPage;
