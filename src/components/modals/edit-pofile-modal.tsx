import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useUpdateUser } from "@/hooks/auth/use-update-user";

interface EditProfileModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditProfileModal = ({ open, setOpen }: EditProfileModalProps) => {
  const { data: user, isLoading: userLoading } = useCurrentUser();

  const [name, setName] = useState<string>(user?.name || "");

  const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateUser();

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?._id) throw new Error("User ID is missing");

    updateUser(
      { id: user._id, name },
      {
        onSuccess: () => {
          toast.success("User name has been changed");
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to update user name");
        },
      }
    );
  };

  if (userLoading) {
    <Loader2 className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!user) return null;

  const avatarFallback = user.name?.charAt(0).toUpperCase();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="p-4 ">
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative flex flex-col items-center space-y-2">
              <Avatar className="size-40">
                <AvatarImage src={user.image || ""} className="rounded-md" />
                <AvatarFallback className="text-6xl rounded-md bg-sky-600 dark:bg-sky-700 text-white">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <p className="text-xl font-bold">{user.name}</p>
            </div>
            <Separator />
            <form className="space-y-4" onSubmit={handleUpdate}>
              <Input
                value={name}
                disabled={isUpdatingUser}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full max-w-xs"
                minLength={3}
                maxLength={30}
              />
              <Button
                type="submit"
                className="w-full max-w-xs bg-sky-600 text-white hover:bg-sky-700"
                disabled={isUpdatingUser}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
