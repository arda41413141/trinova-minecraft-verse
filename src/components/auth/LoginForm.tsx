
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail } from "lucide-react";

interface LoginFormProps {
  onSuccess: () => void;
  switchToRegister: () => void;
  onForgotPassword: () => void;
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "E-posta adresi gerekli" })
    .email({ message: "Geçerli bir e-posta adresi girin" }),
  password: z
    .string()
    .min(6, { message: "En az 6 karakter gerekli" }),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = ({ onSuccess, switchToRegister, onForgotPassword }: LoginFormProps) => {
  const { login, savedEmails } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Update email field when a saved email is selected
  useEffect(() => {
    if (selectedEmail) {
      form.setValue("email", selectedEmail);
    }
  }, [selectedEmail, form]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    
    try {
      await login(values.email, values.password);
      onSuccess();
    } catch (error) {
      toast.error("Geçersiz e-posta veya şifre");
    } finally {
      setLoading(false);
    }
  };

  const hasSavedEmails = savedEmails && savedEmails.length > 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {hasSavedEmails && (
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-1 block">Kayıtlı Hesaplar</label>
            <Select onValueChange={(value) => setSelectedEmail(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Bir hesap seçin" />
              </SelectTrigger>
              <SelectContent>
                {savedEmails.map((email) => (
                  <SelectItem key={email} value={email} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{email}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-posta</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="eposta@ornek.com" {...field} className="pl-8" />
                </div>
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
              <div className="flex items-center justify-between">
                <FormLabel>Şifre</FormLabel>
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm font-medium text-minecraft-primary hover:underline"
                >
                  Şifremi Unuttum
                </button>
              </div>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="minecraft-btn w-full" disabled={loading}>
          <span className="btn-content">
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </span>
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Hesabınız yok mu?{" "}
            <button
              type="button"
              onClick={switchToRegister}
              className="font-medium text-minecraft-primary hover:underline"
            >
              Kayıt Ol
            </button>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
