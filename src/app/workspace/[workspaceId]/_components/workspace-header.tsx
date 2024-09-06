import React, { useState } from "react";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";

import { Doc } from "../../../../../convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import PreferencesModal from "./preferences-modal";
import InviteModal from "./invite-modal";

interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
  const [preferencesOpen, setPreferencesOpen] = useState<boolean>(false);
  const [inviteOpen, setInviteOpen] = useState<boolean>(false);

  return (
    <>
      <PreferencesModal
        open={preferencesOpen}
        setOpen={setPreferencesOpen}
        initialValue={workspace.name}
      />

      <InviteModal
        open={inviteOpen}
        setOpen={setInviteOpen}
        name={workspace.name}
        joinCode={workspace.joinCode}
      />

      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transparent"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden text-white dark:text-neutral-200"
              size="sm"
              aria-expanded="false"
              aria-label={`Workspace ${workspace?.name}`}
            >
              <span className="truncate">{workspace?.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0 text-white dark:text-neutral-200" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="start"
            className="w-64 dark:bg-neutral-800"
          >
            <DropdownMenuItem className="cursor-pointer capitalize dark:bg-neutral-700">
              <div className="size-9 relative overflow-hidden bg-neutral-500 dark:bg-neutral-600 font-semibold text-white dark:text-neutral-200 text-xl rounded-md flex items-center justify-center mr-2">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold text-black dark:text-neutral-200">
                  {workspace.name}
                </p>
                <p className="text-xs text-muted-foreground dark:text-neutral-400">
                  Active workspace
                </p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator className="dark:border-neutral-700" />
                <DropdownMenuItem
                  className="cursor-pointer py-2 dark:hover:bg-neutral-600"
                  onClick={() => setInviteOpen(true)}
                >
                  <p className="truncate text-black dark:text-neutral-200">
                    Invite people to {workspace.name}
                  </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:border-neutral-700" />
                <DropdownMenuItem
                  className="cursor-pointer py-2 dark:hover:bg-neutral-600"
                  onClick={() => setPreferencesOpen(true)}
                >
                  Preferences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default WorkspaceHeader;
