"use client";

import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCreateWorkspaceModal } from "@/stores/workspaces/use-create-workspace-modal";

import { useCreateWorkspace } from "@/apis/workspaces/use-create-workspace";
import { useRouter } from "next/navigation";

const CreateWorkspaceModal = () => {
  const router = useRouter();

  const [open, setOpen] = useCreateWorkspaceModal();
  const { mutate, isPending } = useCreateWorkspace();

  const [name, setName] = useState<string>("");

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        name,
      },
      {
        onSuccess: (id) => {
          toast.success("New workspace has been created");
          router.replace(`/workspace/${id}`);
          handleClose();
        },
        onError: () => {
          toast.error("Failed to create workspace. Try again.");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Enter your workspace name e.g. 'Team', 'Work', 'Personal'"
          />
          <div className="flex justify-end">
            <Button variant="confirm" disabled={isPending}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
