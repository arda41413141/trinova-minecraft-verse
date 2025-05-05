
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

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
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
