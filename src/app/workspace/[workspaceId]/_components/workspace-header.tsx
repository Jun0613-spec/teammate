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

import Hint from "@/components/hint";

import PreferencesModal from "./preferences-modal";
import InviteModal from "./invite-modal";

interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
  const [preferencesOpen, setPreferencesOpen] = useState<boolean>(false);
  const [InviteOpen, setInviteOpen] = useState<boolean>(false);

  return (
    <>
      <PreferencesModal
        open={preferencesOpen}
        setOpen={setPreferencesOpen}
        initialValue={workspace.name}
      />

      <InviteModal
        open={InviteOpen}
        setOpen={setInviteOpen}
        name={workspace.name}
        joinCode={workspace.joinCode}
      />

      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="transparent"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
              size="sm"
            >
              <span className="truncate text-white">{workspace?.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0 text-white" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem className="cursor-pointer capitalize">
              <div className="size-9 relative overflow-hidden bg-neutral-500 font-semibold text-white text-xl rounded-md flex items-center justify-center mr-2">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <p className="font-bold">{workspace.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active workspace
                </p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => setInviteOpen(true)}
                >
                  <p className="truncate">Invite people to {workspace.name}</p>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => setPreferencesOpen(true)}
                >
                  Preferences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>

          <div className="flex items-center gap-0.5">
            <Hint label="New message" side="bottom">
              <Button size="iconSm" variant="transparent">
                <SquarePen className="size-4 text-white" />
              </Button>
            </Hint>
            <Hint label="Filter conversations" side="bottom">
              <Button size="iconSm" variant="transparent">
                <ListFilter className="size-4 text-white" />
              </Button>
            </Hint>
          </div>
        </DropdownMenu>
      </div>
    </>
  );
};

export default WorkspaceHeader;
