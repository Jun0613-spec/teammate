import React from "react";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/ui/button";

import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";

import { cn } from "@/lib/utils";

const sidebarItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-neutral-50 dark:text-neutral-200",
        active:
          "text-[#141652] bg-white/90 hover:bg-white/90 dark:text-white dark:bg-neutral-800 dark:hover:bg-neutral-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface SidebarItemProps {
  label: string;
  icon: LucideIcon | IconType;
  id: string;
  variant?: VariantProps<typeof sidebarItemVariants>["variant"];
}

const SidebarItem = ({ label, icon: Icon, id, variant }: SidebarItemProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Button
      variant="transparent"
      size="sm"
      className={cn(sidebarItemVariants({ variant }))}
      asChild
    >
      <Link
        href={`/workspace/${workspaceId}/channel/${id}`}
        className="flex items-center"
      >
        <Icon className="size-3.5 shrink-0 mr-1" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};

export default SidebarItem;
