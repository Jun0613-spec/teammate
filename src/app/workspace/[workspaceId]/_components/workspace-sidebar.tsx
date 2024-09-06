import React from "react";
import { CircleAlert, Hash, Loader2 } from "lucide-react";

import WorkspaceHeader from "./workspace-header";
import SidebarItem from "./sidebar-item";
import WorkspaceSection from "./workspace-section";
import UserItem from "./user-item";

import { useCurrentMember } from "@/hooks/members/use-current-member";
import { useGetWorkspace } from "@/hooks/workspaces/use-get-workspace";
import { useGetMembers } from "@/hooks/members/use-get-members";
import { useGetChannels } from "@/hooks/chennels/use-get-channels";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { useChannelId } from "@/hooks/chennels/use-channel-id";
import { useMemberId } from "@/hooks/members/use-member-id";

import { useCreateChannelModal } from "@/stores/channels/use-create-channel-modal";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const channelId = useChannelId();
  const memberId = useMemberId();

  const [_open, setOpen] = useCreateChannelModal();

  const { data: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: members, isLoading: membersLoading } = useGetMembers({
    workspaceId: workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: channels, isLoading: channelsLoading } = useGetChannels({
    workspaceId,
  });

  if (workspaceLoading || memberLoading || membersLoading || channelsLoading) {
    return (
      <div className="flex flex-col bg-[#8283bd] h-full items-center justify-center">
        <Loader2 className="size-5 text-white animate-spin" />
      </div>
    );
  }

  if (!workspace || !member)
    return (
      <div className="flex flex-col gap-y-2 bg-[#8283bd] h-full items-center justify-center">
        <CircleAlert className="size-5 text-white" />
        <p className="text-sm text-white">Workspace not found</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-y-2 bg-[#8283bd] h-full">
      <WorkspaceHeader
        isAdmin={member.role === "admin"}
        workspace={workspace}
      />
      <WorkspaceSection
        label="Channels"
        hint="New channel"
        onNew={member.role === "admin" ? () => setOpen(true) : undefined}
      >
        {channels?.map((item) => (
          <SidebarItem
            key={item._id}
            id={item._id}
            icon={Hash}
            label={item.name}
            variant={channelId === item._id ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
      <WorkspaceSection label="Direct Messages" hint="New direct message">
        {members?.map((item) => (
          <UserItem
            key={item._id}
            id={item._id}
            label={item.user.name}
            image={item.user.image}
            variant={item._id === memberId ? "active" : "default"}
          />
        ))}
      </WorkspaceSection>
    </div>
  );
};

export default WorkspaceSidebar;
