
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useIsMobile } from "@/hooks/use-mobile";

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultView?: "login" | "register";
};

const AuthDialog = ({ open, onOpenChange, defaultView = "login" }: AuthDialogProps) => {
  const [view, setView] = useState<"login" | "register">(defaultView);
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-md glass-card border-minecraft-primary/20 ${isMobile ? 'w-[95%] p-4' : ''}`}>
        <DialogHeader>
          <DialogTitle className="text-center font-minecraft text-minecraft-primary text-2xl">
            {view === "login" ? "Giriş Yap" : "Kayıt Ol"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {view === "login" 
              ? "Hesabınıza giriş yaparak devam edin" 
              : "Yeni bir hesap oluşturarak aramıza katılın"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {view === "login" ? (
            <LoginForm onSuccess={() => onOpenChange(false)} switchToRegister={() => setView("register")} />
          ) : (
            <RegisterForm onSuccess={() => onOpenChange(false)} switchToLogin={() => setView("login")} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
