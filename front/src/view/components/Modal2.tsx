import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/view/components/ui/dialog";
import React from "react";

interface Modal2Props {
  open: boolean;
  onOpenChange(): void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Modal2({ open, onOpenChange, title, description, children }: Modal2Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
