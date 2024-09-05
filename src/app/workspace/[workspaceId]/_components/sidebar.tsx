import React from "react";
import { Home, Bell, MessagesSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

import UserButton from "@/components/user-button";

import WorkspaceSwitcher from "./workspace-switcher";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[70px] h-full bg-[#6264A7] flex flex-col items-center gap-y-4 pt-2 pb-4">
      <WorkspaceSwitcher />

      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />

      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
