"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import UserButton from "@/components/user-button";
import { ModeToggle } from "@/components/mode-toggel";

import { useGetWorkspaces } from "@/apis/workspaces/use-get-workspaces";

import { useCreateWorkspaceModal } from "@/stores/workspaces/use-create-workspace-modal";

export default function Home() {
  const router = useRouter();

  const [open, setOpen] = useCreateWorkspaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      router.replace(`workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [isLoading, workspaceId, open, setOpen, router]);

  return (
    <div>
      <UserButton />
      <ModeToggle />
    </div>
  );
}
