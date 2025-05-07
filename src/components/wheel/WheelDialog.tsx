
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
import { Coins } from "lucide-react";
import { Link } from "react-router-dom";

interface WheelDialogProps {
  children: ReactNode;
  trigger?: ReactNode;
}

export const WheelDialog = ({ children, trigger }: WheelDialogProps) => {
  const [open, setOpen] = useState(false);
  const { coinBalance } = useCart();
  const canSpin = (coinBalance || 0) >= 50;

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
            <div className="p-4 mb-4 rounded-md bg-yellow-500/10 border border-yellow-500/30">
              <h3 className="text-lg font-minecraft text-yellow-400 mb-2">Yetersiz Coin</h3>
              <p className="text-white/80 mb-4">
                Şans çarkını çevirmek için 50 coin gerekiyor. Şu anki bakiyeniz: {coinBalance} coin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/coins">
                  <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Coins size={16} className="mr-2" />
                    Coin Bakiyemi Gör
                  </Button>
                </Link>
                <Link to="/shop?tab=coins">
                  <Button variant="outline" className="text-yellow-400 border-yellow-500/30">
                    Coin Satın Al
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
