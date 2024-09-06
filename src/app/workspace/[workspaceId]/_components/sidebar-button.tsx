import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface SidebarButtonProps {
  icon: LucideIcon | IconType;
  label: string;
  isActive?: boolean;
}
const SidebarButton = ({ icon: Icon, label, isActive }: SidebarButtonProps) => {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer group">
      <Button
        variant={"transparent"}
        className={cn(
          "size-9 p-2 group-hover:bg-accent/20",
          isActive && "bg-accent/20",
          "dark:bg-neutral-800 dark:group-hover:bg-neutral-700 dark:group-focus:bg-neutral-700"
        )}
      >
        <Icon className="size-5 text-white group-hover:scale-110 transition-all dark:text-gray-300" />
      </Button>
      <span className="text-[11px] text-white group-hover:text-accent dark:text-gray-400 dark:group-hover:text-accent">
        {label}
      </span>
    </div>
  );
};

export default SidebarButton;
