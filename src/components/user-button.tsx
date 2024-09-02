"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import React, { useState } from "react";
import { Loader, LogOut, Palette } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AppearanceModal from "./appearance-modal";

import { useCurrentUser } from "../hooks/auth/use-current-user";

const UserButton = () => {
  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  const [appearanceOpen, setAppearanceOpen] = useState<boolean>(false);

  if (isLoading) {
    <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!data) return null;

  const { name, image } = data;
  const avatarFallback = name!.charAt(0).toUpperCase();

  return (
    <>
      <AppearanceModal open={appearanceOpen} setOpen={setAppearanceOpen} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative">
          <Avatar className="size-10 hover:opacity-75 transition">
            <AvatarImage alt="pic" src={image} />
            <AvatarFallback className="bg-sky-600 dark:bg-sky-700 text-white">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" side="right" className="w-60">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setAppearanceOpen(true)}
          >
            <Palette className="size-4 mr-2" />
            Appearance
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="size-4 mr-2" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserButton;
