"use client";

import React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import WorkspaceToolbar from "./_components/workspace-toolbar";
import Sidebar from "./_components/sidebar";
import WorkspaceSidebar from "./_components/workspace-sidebar";

const WorkspaceIdLayout = ({ children }: { children: React.ReactNode }) => {
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
        </ResizablePanelGroup>
      </div>
    </main>
  );
};

export default WorkspaceIdLayout;
