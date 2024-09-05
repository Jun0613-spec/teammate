import React, { useState } from "react";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCurrentUser } from "@/hooks/auth/use-current-user";
import { useUpdateUser } from "@/hooks/auth/use-update-user";
import { Separator } from "../ui/separator";
import { useGenerateUploadUrl } from "@/hooks/upload/use-generate-upload-url";
import toast from "react-hot-toast";
import { Id } from "../../../convex/_generated/dataModel";

interface EditProfileModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const EditProfileModal = ({ open, setOpen }: EditProfileModalProps) => {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: generateUploadUrl } = useGenerateUploadUrl();

  const [name, setName] = useState<string>(user?.name || "");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(user?.image || "");
  const [isPending, setIsPending] = useState<boolean>(false);

  if (userLoading) {
    <Loader2 className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!user) return null;

  const avatarFallback = user.name?.charAt(0).toUpperCase();

  const handleSave = async () => {
    try {
      setIsPending(true);

      let imageId: Id<"_storage"> | undefined;
      if (image) {
        const uploadUrl = await generateUploadUrl({}, { throwError: true });
        if (!uploadUrl) throw new Error("Upload URL not found");

        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": image.type },
          body: image,
        });

        if (!response.ok) throw new Error("Failed to upload image");

        const { storageId } = await response.json();
        imageId = storageId as Id<"_storage"> | undefined;
      }

      await updateUser({
        id: user._id,
        name,
        image: imageId,
      });

      setOpen(false); // Close modal on success
    } catch (error) {
      console.error("Failed to save changes", error);
      toast.error("Failed to save changes");
    } finally {
      setIsPending(false);
    }
  };

  const handleAvatarChange = () => {
    // Prompt user to select a new image
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="p-4 border-b bg-gray-100 dark:bg-gray-800">
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="size-40">
                <AvatarImage src={imageUrl} className="rounded-md" />
                <AvatarFallback className="text-2xl rounded-md bg-sky-600 dark:bg-sky-700 text-white">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                onClick={handleAvatarChange}
                className="w-full max-w-xs"
              >
                Change Avatar
              </Button>
            </div>
            <Separator />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full max-w-xs"
            />

            <Button
              onClick={handleSave}
              className="w-full max-w-xs bg-sky-600 text-white hover:bg-sky-700"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
