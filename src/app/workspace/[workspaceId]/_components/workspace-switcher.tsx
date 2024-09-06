import React from "react";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { useGetWorkspace } from "@/hooks/workspaces/use-get-workspace";
import { useGetWorkspaces } from "@/hooks/workspaces/use-get-workspaces";

import { useCreateWorkspaceModal } from "@/stores/workspaces/use-create-workspace-modal";

const WorkspaceSwitcher = () => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const [_open, setOpen] = useCreateWorkspaceModal();

  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });
  const { data: workspaces, isLoading: workspacesLoading } = useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace?._id !== workspaceId
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-200/80 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xl">
          {workspaceLoading ? (
            <Loader2 className="size-5 animate-spin shrink-0" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="w-64 dark:bg-neutral-800 dark:text-neutral-200"
      >
        <DropdownMenuItem
          onClick={() => router.push(`/workspace/${workspaceId}`)}
          className="cursor-pointer flex-col justify-start items-start capitalize"
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground dark:text-muted-foreground">
            Active workspace
          </span>
        </DropdownMenuItem>
        {filteredWorkspaces?.map((workspace) => (
          <DropdownMenuItem
            key={workspace._id}
            onClick={() => router.push(`/workspace/${workspace._id}`)}
            className="cursor-pointer capitalize overflow-hidden"
          >
            <div className="shrink-0 size-9 relative overflow-hidden bg-neutral-500 dark:bg-neutral-600 text-white dark:text-gray-200 font-semibold text-xl rounded-md flex items-center justify-center mr-2">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <p className="truncate">{workspace.name}</p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="size-9 relative overflow-hidden bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xl rounded-md flex items-center justify-center mr-2">
            <Plus />
          </div>
          Create Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
