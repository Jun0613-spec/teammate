import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useConfirm } from "@/hooks/use-confirm";
import { useChannelId } from "@/hooks/chennels/use-channel-id";
import { useWorkspaceId } from "@/hooks/workspaces/use-workspace-id";
import { useUpdateChannel } from "@/hooks/chennels/use-update-channel";
import { useRemoveChannel } from "@/hooks/chennels/use-remove-channel";
import { useCurrentMember } from "@/hooks/members/use-current-member";

interface ChannelHeaderProps {
  title: string;
}

const ChannelHeader = ({ title }: ChannelHeaderProps) => {
  const router = useRouter();
  const channelId = useChannelId();
  const workspaceId = useWorkspaceId();

  const [value, setValue] = useState<string>(title);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const { data: member } = useCurrentMember({ workspaceId });
  const { mutate: updateChannel, isPending: updatingChannel } =
    useUpdateChannel();
  const { mutate: removeChannel, isPending: removingChannel } =
    useRemoveChannel();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "This will permanently delete the item. Do you wish to continue?"
  );

  const handleEditOpen = (value: boolean) => {
    if (member?.role !== "admin") return;

    setEditOpen(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replaceAll(/\s+/g, "-").toLowerCase();
    setValue(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateChannel(
      { id: channelId, name: value },
      {
        onSuccess: () => {
          toast.success("Channel name has been updated");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update channel name");
        },
      }
    );
  };

  const handleDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    removeChannel(
      {
        id: channelId,
      },
      {
        onSuccess: () => {
          toast.success("Channel has been deleted");
          router.replace(`/workspace/${workspaceId}`);
        },
        onError: () => {
          toast.error("Failed to delete channel");
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <div className="border-b h-[49px] flex items-center px-4 overflow-hidden bg-white dark:bg-gray-800">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-lg font-semibold px-2 overflow-hidden w-auto text-gray-900 dark:text-gray-100"
              size="sm"
            >
              <span># {title}</span>
              <FaChevronDown className="size-2.5 ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 bg-neutral-50 dark:bg-neutral-700 overflow-hidden">
            <DialogHeader className="p-4 border-b bg-white dark:bg-gray-900">
              <DialogTitle># {title}</DialogTitle>
            </DialogHeader>
            <div className="px-4 pb-4 flex flex-col gap-y-2">
              <Dialog open={editOpen} onOpenChange={handleEditOpen}>
                <DialogTrigger asChild>
                  <div className="px-5 py-4 bg-white dark:bg-gray-800 rounded-lg border cursor-pointer hover:bg-neutral-50 dark:hover:bg-gray-700">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        Channel name
                      </p>
                      {member?.role === "admin" && (
                        <p className="text-sm text-sky-600 hover:underline font-semibold dark:text-sky-400">
                          Edit
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      # {title}
                    </p>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-gray-800">
                  <DialogHeader className="bg-white dark:bg-gray-900">
                    <DialogTitle>Rename this channel</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input
                      value={value}
                      disabled={updatingChannel}
                      onChange={handleChange}
                      placeholder="e.g. project"
                      required
                      autoFocus
                      minLength={3}
                      maxLength={80}
                      className="bg-white dark:bg-gray-700"
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          disabled={updatingChannel}
                          className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        disabled={updatingChannel}
                        variant="confirm"
                        className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                      >
                        Save
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
              {member?.role === "admin" && (
                <button
                  disabled={removingChannel}
                  onClick={handleDelete}
                  className="flex items-center gap-x-2 px-5 py-4 bg-white dark:bg-gray-800 rounded-lg cursor-pointer border hover:bg-neutral-50 dark:hover:bg-gray-700 text-rose-600 dark:text-rose-400"
                >
                  <Trash2 className="size-4" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    Delete channel
                  </p>
                </button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ChannelHeader;
