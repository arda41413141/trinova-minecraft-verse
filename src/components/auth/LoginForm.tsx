
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  password: z.string().min(6, "Parola en az 6 karakter olmalıdır"),
});

type LoginFormProps = {
  onSuccess: () => void;
  switchToRegister: () => void;
};

const LoginForm = ({ onSuccess, switchToRegister }: LoginFormProps) => {
  const { login, savedEmails, forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(data.email, data.password);
      onSuccess();
    } catch (err) {
      setError("Giriş yapılamadı. E-posta veya şifre hatalı.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectEmail = (email: string) => {
    form.setValue("email", email);
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      return;
    }

    setIsResetting(true);
    try {
      await forgotPassword(resetEmail);
      setResetSuccess(true);
    } catch (error) {
      console.error("Şifre sıfırlama hatası:", error);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta</FormLabel>
                <div className="space-y-2">
                  <FormControl>
                    <Input placeholder="ornek@mail.com" {...field} />
                  </FormControl>
                  
                  {savedEmails.length > 0 && (
                    <Select onValueChange={handleSelectEmail}>
                      <SelectTrigger className="w-full bg-minecraft-dark/50">
                        <SelectValue placeholder="Kayıtlı e-postalar" />
                      </SelectTrigger>
                      <SelectContent>
                        {savedEmails.map((email, index) => (
                          <SelectItem key={index} value={email}>
                            {email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şifre</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <div className="flex flex-col space-y-2">
            <Button type="submit" disabled={isLoading} className="minecraft-btn w-full">
              <span className="btn-content">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Giriş Yap
              </span>
            </Button>
            
            <div className="flex justify-between items-center">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={switchToRegister}
                className="text-minecraft-accent hover:text-minecraft-primary text-sm"
              >
                Hesabın yok mu? Kayıt ol
              </Button>
              
              <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
                <DialogTrigger asChild>
                  <Button 
                    type="button" 
                    variant="link" 
                    className="text-minecraft-accent hover:text-minecraft-primary text-sm p-0"
                  >
                    Şifremi unuttum
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border-minecraft-primary/20 w-[95%] sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-minecraft text-minecraft-primary text-xl">Şifre Sıfırlama</DialogTitle>
                    <DialogDescription>
                      {!resetSuccess ? 
                        "E-posta adresinizi girin, şifre sıfırlama talimatlarını göndereceğiz." : 
                        "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi."
                      }
                    </DialogDescription>
                  </DialogHeader>
                  
                  {!resetSuccess ? (
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <label htmlFor="reset-email" className="text-sm font-medium">
                          E-posta
                        </label>
                        <Input 
                          id="reset-email" 
                          value={resetEmail} 
                          onChange={(e) => setResetEmail(e.target.value)}
                          placeholder="E-posta adresinizi girin"
                          className="w-full"
                        />
                      </div>
                      
                      <Button 
                        onClick={handleForgotPassword}
                        className="minecraft-btn w-full" 
                        disabled={isResetting || !resetEmail}
                      >
                        <span className="btn-content">
                          {isResetting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Şifre Sıfırlama Gönder
                        </span>
                      </Button>
                      
                      <p className="text-xs text-muted-foreground text-center">
                        Not: Gerçek bir uygulama e-posta göndereceği yerde, bu demo sürümde konsola token yazılacak.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-center text-green-400">
                        Şifre sıfırlama talimatları e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.
                      </p>
                      <Button 
                        onClick={() => {
                          setShowForgotPassword(false);
                          setResetSuccess(false);
                        }}
                        className="minecraft-btn w-full"
                      >
                        <span className="btn-content">
                          Tamam
                        </span>
                      </Button>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
