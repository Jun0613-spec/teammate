"use client";

import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";
import React, { useState } from "react";
import { Loader2, LogOut, Palette, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import AppearanceModal from "./modals/appearance-modal";
import EditProfileModal from "./modals/edit-pofile-modal";

import { useCurrentUser } from "../hooks/auth/use-current-user";

const UserButton = () => {
  const router = useRouter();

  const { signOut } = useAuthActions();
  const { data, isLoading } = useCurrentUser();

  const [appearanceOpen, setAppearanceOpen] = useState<boolean>(false);
  const [editProfileOpen, setEditProfileOpen] = useState<boolean>(false);

  const onhandleSingout = () => {
    signOut();
    router.replace("/auth");
  };

  if (isLoading) {
    <Loader2 className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!data) return null;

  const { image, name } = data;
  const avatarFallback = name!.charAt(0).toUpperCase();

  return (
    <>
      <AppearanceModal open={appearanceOpen} setOpen={setAppearanceOpen} />
      <EditProfileModal open={editProfileOpen} setOpen={setEditProfileOpen} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none relative">
          <Avatar className="rounded-md size-10 hover:opacity-75 transition">
            <AvatarImage alt="profile-pic" src={image} />
            <AvatarFallback className="rounded-md bg-sky-600 dark:bg-sky-700 text-white">
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
            onClick={() => setEditProfileOpen(true)}
          >
            <Settings className="size-4 mr-2" />
            Edit profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={onhandleSingout}
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
