import React from "react";
import { GoHome } from "react-icons/go";
import { Bell, MessagesSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

import UserButton from "@/components/user-button";

import WorkspaceSwitcher from "./workspace-switcher";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[70px] h-full bg-[#6264A7] flex flex-col items-center gap-y-4 pt-[7px] pb-4">
      <WorkspaceSwitcher />
      <SidebarButton
        icon={GoHome}
        label="Home"
        isActive={pathname.includes("/workspace")}
      />
      <SidebarButton icon={MessagesSquare} label="Messages" isActive />
      <SidebarButton icon={Bell} label="Activity" isActive />
      <SidebarButton icon={MoreHorizontal} label="More" isActive />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
