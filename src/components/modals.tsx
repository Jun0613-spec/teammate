"use client";

import React, { useEffect, useState } from "react";

import CreateChannelModal from "./channels/create-channel-modal";
import CreateWorkspaceModal from "./workspaces/create-workspace-modal";

const Modals = () => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return (
    <>
      <CreateChannelModal />
      <CreateWorkspaceModal />
    </>
  );
};

export default Modals;
