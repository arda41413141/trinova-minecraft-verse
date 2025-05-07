
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
import { Wallet, Plus } from "lucide-react";
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
          "sm:max-w-md max-h-[90vh] overflow-y-auto border-purple-500/30",
          "bg-gradient-to-b from-minecraft-dark/95 to-black/95",
          "shadow-2xl shadow-purple-500/20"
        )}
      >
        <DialogTitle className="sr-only">Premium Şans Çarkı</DialogTitle>
        {canSpin ? (
          <SpinningWheel onClose={() => setOpen(false)} />
        ) : (
          <div className="py-8 text-center">
            <div className="p-6 mb-4 rounded-md bg-gradient-to-br from-purple-800/20 to-purple-900/20 border border-purple-500/30 backdrop-blur-sm">
              <h3 className="text-xl font-minecraft bg-gradient-to-r from-purple-400 via-purple-600 to-indigo-600 text-transparent bg-clip-text mb-3">
                Yetersiz Bakiye
              </h3>
              <p className="text-white/80 mb-6">
                Premium çarkı çevirmek için 50 TL gerekiyor. Şu anki bakiyeniz: {balance.toFixed(2)} TL.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/balance">
                  <Button className="bg-gradient-to-r from-purple-600 to-purple-800 text-white border border-purple-500/30 shadow-lg shadow-purple-500/20">
                    <Wallet size={16} className="mr-2" />
                    Bakiyemi Gör
                  </Button>
                </Link>
                <Link to="/shop?tab=balance">
                  <Button variant="outline" className="text-purple-400 border-purple-500/30 hover:bg-purple-500/20">
                    <Plus size={16} className="mr-2" />
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
