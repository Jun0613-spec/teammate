import React from "react";
import { FaChevronRight } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  memberName?: string;
  memberImage?: string;
  onClick?: () => void;
}

const Header = ({ memberName, memberImage, onClick }: HeaderProps) => {
  const avatarFallback = memberName?.charAt(0).toUpperCase();

  return (
    <div className="bg-white dark:bg-gray-800 h-[49px] flex border-b border-gray-200 dark:border-gray-700 items-center overflow-hidden px-4">
      <Button
        variant="ghost"
        className="text-lg font-semibold px-2 overflow-hidden w-auto dark:text-white"
        size="sm"
        onClick={onClick}
      >
        <Avatar className="size-6 mr-2">
          <AvatarImage src={memberImage} className="rounded-md" />
          <AvatarFallback className="rounded-md bg-sky-600 dark:bg-sky-700 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <span className="truncate dark:text-white">{memberName}</span>
        <FaChevronRight className="size-2.5 ml-2 dark:text-white" />
      </Button>
    </div>
  );
};

export default Header;
