import React from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import Appearance from "./appearance";

interface AppearanceModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AppearanceModal = ({ open, setOpen }: AppearanceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>Appearance</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center p-12">
          <Appearance />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppearanceModal;
