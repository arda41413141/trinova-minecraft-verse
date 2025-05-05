
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { AuthContext } from "./AuthContext";
import { User } from "./types";
import { 
  getStoredUser, 
  getSavedEmails, 
  getStoredCredentials, 
  getStoredResetTokens,
  storeUser,
  storeSavedEmails,
  storeCredentials,
  storeResetTokens
} from "./authUtils";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedEmails, setSavedEmails] = useState<string[]>([]);

  // For demo purposes - store user credentials and reset tokens
  const [userCredentials, setUserCredentials] = useState<Record<string, { password: string, username: string }>>({});
  const [passwordResetTokens, setPasswordResetTokens] = useState<Record<string, string>>({});

  // Initialize auth state from localStorage
  useEffect(() => {
    // Load user
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }

    // Load saved emails
    const storedEmails = getSavedEmails();
    setSavedEmails(storedEmails);

    // Load credentials (for demo purposes)
    const storedCredentials = getStoredCredentials();
    setUserCredentials(storedCredentials);

    // Load reset tokens (for demo purposes)
    const storedTokens = getStoredResetTokens();
    setPasswordResetTokens(storedTokens);

    setLoading(false);
  }, []);

  // Update saved emails when they change
  useEffect(() => {
    if (savedEmails.length > 0) {
      storeSavedEmails(savedEmails);
    }
  }, [savedEmails]);

  // Update stored credentials when they change
  useEffect(() => {
    if (Object.keys(userCredentials).length > 0) {
      storeCredentials(userCredentials);
    }
  }, [userCredentials]);

  // Update stored reset tokens when they change
  useEffect(() => {
    if (Object.keys(passwordResetTokens).length > 0) {
      storeResetTokens(passwordResetTokens);
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
          storeUser(user);
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
          storeUser(user);
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
        // Check if email already exists
        if (userCredentials[email]) {
          reject(new Error("Email already registered"));
          return;
        }

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
          storeUser(user);
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
    localStorage.removeItem("trinova_user");
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
