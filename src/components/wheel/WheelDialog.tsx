
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import SpinningWheel from "./SpinningWheel";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart";
import { SPIN_COST } from "./types";

interface WheelDialogProps {
  children: ReactNode;
  trigger?: ReactNode;
}

export const WheelDialog = ({ children, trigger }: WheelDialogProps) => {
  const [open, setOpen] = useState(false);
  const { balance } = useCart();
  const canSpin = (balance || 0) >= SPIN_COST;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || children}
      </DialogTrigger>
      <DialogContent 
        className={cn(
          "sm:max-w-md max-h-[90vh] overflow-y-auto border-purple-500/30",
          "bg-gradient-to-b from-minecraft-dark/95 to-black/95",
          "shadow-2xl shadow-purple-500/20"
        )}
      >
        <DialogTitle className="sr-only">Premium Şans Çarkı</DialogTitle>
        <SpinningWheel onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default WheelDialog;
