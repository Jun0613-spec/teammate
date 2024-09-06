"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useGetWorkspaces } from "@/hooks/workspaces/use-get-workspaces";

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
    <div className="flex h-full items-center justify-center">
      <Loader2 className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
}
