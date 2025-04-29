
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type AuthDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultView?: "login" | "register";
};

const AuthDialog = ({ open, onOpenChange, defaultView = "login" }: AuthDialogProps) => {
  const [view, setView] = useState<"login" | "register">(defaultView);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-minecraft-primary/20">
        <DialogHeader>
          <DialogTitle className="text-center font-minecraft text-minecraft-primary text-2xl">
            {view === "login" ? "Giriş Yap" : "Kayıt Ol"}
          </DialogTitle>
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
