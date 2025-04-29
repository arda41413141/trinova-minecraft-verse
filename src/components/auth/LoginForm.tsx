
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  password: z.string().min(6, "Parola en az 6 karakter olmalıdır"),
});

type LoginFormProps = {
  onSuccess: () => void;
  switchToRegister: () => void;
};

const LoginForm = ({ onSuccess, switchToRegister }: LoginFormProps) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
                <FormControl>
                  <Input placeholder="ornek@mail.com" {...field} />
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
            
            <Button 
              type="button" 
              variant="ghost" 
              onClick={switchToRegister}
              className="text-minecraft-accent hover:text-minecraft-primary"
            >
              Hesabın yok mu? Kayıt ol
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
