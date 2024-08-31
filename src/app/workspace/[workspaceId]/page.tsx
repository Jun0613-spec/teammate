"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useEffect } from "react";
import { CircleAlert, Loader2 } from "lucide-react";

import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";

import { useCreateChannelModal } from "@/stores/channels/use-create-channel-modal";

import { useGetWorkspace } from "@/apis/workspaces/use-get-workspace";
import { useGetChannels } from "@/apis/channels/use-get-channels";
import { useCurrentMember } from "@/apis/members/use-current-member";

const WorkspaceIdPage = () => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const [open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  const channelId = useMemo(() => channels?.[0]._id, [channels]);
  const isAdmin = useMemo(() => member?.role === "admin", [member?.role]);

  useEffect(() => {
    if (
      workspaceLoading ||
      channelsLoading ||
      memberLoading ||
      !member ||
      !workspace
    )
      return;

    if (channelId) {
      router.push(`/workspace/${workspaceId}/channel/${channelId}`);
    } else if (!open && isAdmin) {
      setOpen(true);
    }
  }, [
    channelId,
    channelsLoading,
    workspaceId,
    workspaceLoading,
    workspace,
    memberLoading,
    member,
    isAdmin,
    router,
    open,
    setOpen,
  ]);

  if (workspaceLoading || channelsLoading || memberLoading) {
    return (
      <div
        className="h-full flex-1 flex items-center
       justify-center flex-col gap-2"
      >
        <Loader2 className="size-5 text-muted-foreground animate-spin" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div
        className="h-full flex-1 flex items-center
       justify-center flex-col gap-y-2"
      >
        <CircleAlert className="size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          Workspace not found
        </span>
      </div>
    );
  }

  return (
    <div
      className="h-full flex-1 flex items-center
     justify-center flex-col gap-2"
    >
      <CircleAlert className="size-6 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">No channel found</span>
    </div>
  );
};

export default WorkspaceIdPage;
