
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const resetSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  token: z.string().min(1, "Token gereklidir"),
  password: z.string().min(6, "Parola en az 6 karakter olmalıdır"),
  confirmPassword: z.string().min(6, "Parola en az 6 karakter olmalıdır"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
});

type PasswordResetFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

const PasswordResetForm = ({ open, onOpenChange, onSuccess }: PasswordResetFormProps) => {
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
      token: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof resetSchema>) => {
    setIsLoading(true);
    setError(null);
    try {
      await resetPassword(data.email, data.token, data.password);
      setSuccess(true);
      setTimeout(() => {
        onOpenChange(false);
        onSuccess();
      }, 3000);
    } catch (err) {
      setError("Şifre sıfırlama başarısız oldu. Lütfen bilgilerinizi kontrol edin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-minecraft-primary/20 w-[95%] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-minecraft text-minecraft-primary text-xl">Şifre Sıfırla</DialogTitle>
          <DialogDescription>
            {!success ? 
              "Şifrenizi sıfırlamak için e-posta adresinizi, aldığınız token'ı ve yeni şifrenizi girin." :
              "Şifreniz başarıyla sıfırlandı. Şimdi giriş yapabilirsiniz."
            }
          </DialogDescription>
        </DialogHeader>
        
        {!success ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta</FormLabel>
                    <FormControl>
                      <Input placeholder="ornek@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sıfırlama Token'ı</FormLabel>
                    <FormControl>
                      <Input placeholder="Size gönderilen tokeni girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yeni Şifre</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Yeni şifreniz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre Tekrar</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Yeni şifrenizi tekrar girin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <Button type="submit" disabled={isLoading} className="minecraft-btn w-full">
                <span className="btn-content">
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Şifremi Sıfırla
                </span>
              </Button>
            </form>
          </Form>
        ) : (
          <div className="text-center py-4">
            <p className="text-green-400 mb-4">Şifreniz başarıyla sıfırlandı!</p>
            <p>Birkaç saniye içinde giriş ekranına yönlendirileceksiniz.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PasswordResetForm;
