
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, resetToken: string, newPassword: string) => Promise<void>;
  isAuthenticated: boolean;
  savedEmails: string[];
}

// For demo purposes, we'll use localStorage
const STORAGE_KEY = "trinova_user";
const SAVED_EMAILS_KEY = "trinova_saved_emails";
const PASSWORD_RESET_TOKENS_KEY = "password_reset_tokens";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedEmails, setSavedEmails] = useState<string[]>([]);

  // For demo purposes - store user credentials and reset tokens
  // In a real app, this would be handled securely by a backend
  const [userCredentials, setUserCredentials] = useState<Record<string, { password: string, username: string }>>({});
  const [passwordResetTokens, setPasswordResetTokens] = useState<Record<string, string>>({});

  // Initialize auth state from localStorage
  useEffect(() => {
    // Load user
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // Load saved emails
    const storedEmails = localStorage.getItem(SAVED_EMAILS_KEY);
    if (storedEmails) {
      try {
        setSavedEmails(JSON.parse(storedEmails));
      } catch (error) {
        localStorage.removeItem(SAVED_EMAILS_KEY);
      }
    }

    // Load credentials (for demo purposes)
    const storedCredentials = localStorage.getItem("user_credentials");
    if (storedCredentials) {
      try {
        setUserCredentials(JSON.parse(storedCredentials));
      } catch (error) {
        localStorage.removeItem("user_credentials");
      }
    }

    // Load reset tokens (for demo purposes)
    const storedTokens = localStorage.getItem(PASSWORD_RESET_TOKENS_KEY);
    if (storedTokens) {
      try {
        setPasswordResetTokens(JSON.parse(storedTokens));
      } catch (error) {
        localStorage.removeItem(PASSWORD_RESET_TOKENS_KEY);
      }
    }

    setLoading(false);
  }, []);

  // Update saved emails when they change
  useEffect(() => {
    if (savedEmails.length > 0) {
      localStorage.setItem(SAVED_EMAILS_KEY, JSON.stringify(savedEmails));
    }
  }, [savedEmails]);

  // Update stored credentials when they change
  useEffect(() => {
    if (Object.keys(userCredentials).length > 0) {
      localStorage.setItem("user_credentials", JSON.stringify(userCredentials));
    }
  }, [userCredentials]);

  // Update stored reset tokens when they change
  useEffect(() => {
    if (Object.keys(passwordResetTokens).length > 0) {
      localStorage.setItem(PASSWORD_RESET_TOKENS_KEY, JSON.stringify(passwordResetTokens));
    }
  }, [passwordResetTokens]);

  const saveEmailToList = (email: string) => {
    if (!savedEmails.includes(email)) {
      setSavedEmails(prev => [...prev, email]);
    }
  };

  const login = async (email: string, password: string) => {
    // Simulated login - in a real app, this would call an API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Demo validation - in real app this would be server-side
        // First check if it's the demo account
        if (email === "demo@example.com" && password === "password") {
          const user = {
            id: "user1",
            email: email,
            username: "DemoUser",
          };
          setUser(user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          saveEmailToList(email);
          toast.success("Giriş başarılı!");
          resolve();
        } 
        // Then check against stored credentials
        else if (userCredentials[email] && userCredentials[email].password === password) {
          const user = {
            id: `user_${Date.now()}`,
            email: email,
            username: userCredentials[email].username,
          };
          setUser(user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          saveEmailToList(email);
          toast.success("Giriş başarılı!");
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const register = async (email: string, password: string, username: string) => {
    // Simulated registration - in a real app, this would call an API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          // Store credentials for this demo
          setUserCredentials(prev => ({
            ...prev,
            [email]: { password, username }
          }));

          const user = {
            id: `user_${Date.now()}`,
            email,
            username,
          };
          setUser(user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
          saveEmailToList(email);
          toast.success("Kayıt başarılı! Hoş geldiniz.");
          resolve();
        } else {
          reject(new Error("Registration failed"));
        }
      }, 1000);
    });
  };

  const logout = async () => {
    // Clear user state and localStorage
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    toast.info("Çıkış yapıldı");
  };

  const forgotPassword = async (email: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Check if email exists
        if (userCredentials[email] || email === "demo@example.com") {
          // Generate a "reset token" (in a real app, this would be sent via email)
          const resetToken = Math.random().toString(36).substring(2, 15);
          
          // Store the token (in a real app, this would be stored in a database with expiration)
          setPasswordResetTokens(prev => ({
            ...prev,
            [email]: resetToken
          }));
          
          toast.success("Şifre sıfırlama talimatları e-posta adresinize gönderildi.");
          console.log(`In a real app, an email would be sent to ${email} with reset token: ${resetToken}`);
          resolve();
        } else {
          toast.error("Bu e-posta adresi sistemde kayıtlı değil.");
          reject(new Error("Email not registered"));
        }
      }, 1000);
    });
  };

  const resetPassword = async (email: string, resetToken: string, newPassword: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Verify the token
        if (passwordResetTokens[email] === resetToken) {
          // Update the password
          if (email === "demo@example.com") {
            toast.error("Demo hesabının şifresi değiştirilemez.");
            reject(new Error("Cannot change demo account password"));
            return;
          }
          
          setUserCredentials(prev => ({
            ...prev,
            [email]: { 
              ...prev[email],
              password: newPassword 
            }
          }));
          
          // Remove the used token
          const updatedTokens = { ...passwordResetTokens };
          delete updatedTokens[email];
          setPasswordResetTokens(updatedTokens);
          
          toast.success("Şifreniz başarıyla güncellendi. Lütfen yeni şifrenizle giriş yapın.");
          resolve();
        } else {
          toast.error("Geçersiz veya süresi dolmuş token.");
          reject(new Error("Invalid or expired token"));
        }
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        isAuthenticated: !!user,
        savedEmails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
