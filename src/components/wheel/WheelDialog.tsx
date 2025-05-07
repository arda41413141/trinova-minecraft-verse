
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
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

interface WheelDialogProps {
  children: ReactNode;
  trigger?: ReactNode;
}

export const WheelDialog = ({ children, trigger }: WheelDialogProps) => {
  const [open, setOpen] = useState(false);
  const { balance } = useCart();
  const canSpin = (balance || 0) >= 50;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || children}
      </DialogTrigger>
      <DialogContent 
        className={cn(
          "sm:max-w-md max-h-[90vh] overflow-y-auto border-minecraft-primary/50",
          "bg-gradient-to-b from-minecraft-dark/95 to-black/95",
          "shadow-2xl shadow-purple-500/20"
        )}
      >
        <DialogTitle className="sr-only">Şans Çarkı</DialogTitle>
        {canSpin ? (
          <SpinningWheel onClose={() => setOpen(false)} />
        ) : (
          <div className="py-6 text-center">
            <div className="p-4 mb-4 rounded-md bg-green-500/10 border border-green-500/30">
              <h3 className="text-lg font-minecraft text-green-400 mb-2">Yetersiz Bakiye</h3>
              <p className="text-white/80 mb-4">
                Şans çarkını çevirmek için 50 TL gerekiyor. Şu anki bakiyeniz: {balance} TL.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/balance">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Wallet size={16} className="mr-2" />
                    Bakiyemi Gör
                  </Button>
                </Link>
                <Link to="/shop?tab=balance">
                  <Button variant="outline" className="text-green-400 border-green-500/30">
                    Bakiye Yükle
                  </Button>
                </Link>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white"
            >
              Kapat
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WheelDialog;
