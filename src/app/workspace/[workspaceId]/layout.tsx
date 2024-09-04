"use client";

import React from "react";
import { Loader2 } from "lucide-react";

import { Id } from "../../../../convex/_generated/dataModel";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import WorkspaceToolbar from "./_components/workspace-toolbar";
import Sidebar from "./_components/sidebar";
import WorkspaceSidebar from "./_components/workspace-sidebar";
import Thread from "./_components/thread";

import { usePanel } from "@/hooks/use-panel";

const WorkspaceIdLayout = ({ children }: { children: React.ReactNode }) => {
  const { parentMessageId, onClose } = usePanel();

  const showPanel = !!parentMessageId;

  return (
    <main className="h-full">
      <WorkspaceToolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          autoSaveId={"ca-workspace-layout"}
          direction={"horizontal"}
        >
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#8283bd] "
          >
            <WorkspaceSidebar />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel minSize={20}>{children}</ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={29} minSize={20}>
                {parentMessageId ? (
                  <Thread
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </main>
  );
};

export default WorkspaceIdLayout;
