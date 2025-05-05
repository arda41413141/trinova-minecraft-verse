
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

interface ForgotPasswordFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  onBackToLogin: () => void;
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "E-posta adresi gerekli" })
    .email({ message: "Geçerli bir e-posta adresi girin" }),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordForm = ({ open, onOpenChange, onSuccess, onBackToLogin }: ForgotPasswordFormProps) => {
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    
    try {
      await forgotPassword(values.email);
      onSuccess();
    } catch (error) {
      // If there's an error, we're already showing a toast in the forgotPassword function
      // Here we'll just redirect back to login since the email doesn't exist
      onBackToLogin();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-minecraft-primary/20">
        <DialogHeader>
          <DialogTitle className="text-center font-minecraft text-minecraft-primary text-2xl">
            Şifremi Unuttum
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Hesabınıza bağlı e-posta adresini girin, şifre sıfırlama bağlantısı göndereceğiz.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-posta</FormLabel>
                  <FormControl>
                    <Input placeholder="eposta@ornek.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button 
                type="button"
                variant="outline" 
                className="w-full gap-2"
                onClick={onBackToLogin}
              >
                <ArrowLeft size={16} /> Giriş Yapa Dön
              </Button>
              
              <Button 
                type="submit" 
                className="minecraft-btn w-full" 
                disabled={loading}
              >
                <span className="btn-content">
                  {loading ? "İşleniyor..." : "Şifremi Sıfırla"}
                </span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordForm;
