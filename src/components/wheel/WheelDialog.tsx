
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import SpinningWheel from "./SpinningWheel";

interface WheelDialogProps {
  children: ReactNode;
  trigger?: ReactNode;
}

export const WheelDialog = ({ children, trigger }: WheelDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-b from-minecraft-dark/95 to-black/95 border-minecraft-primary/50">
        <SpinningWheel onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default WheelDialog;
