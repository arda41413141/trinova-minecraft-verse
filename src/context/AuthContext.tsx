
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
  isAuthenticated: boolean;
}

// For demo purposes, we'll use localStorage
const STORAGE_KEY = "trinova_user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulated login - in a real app, this would call an API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Demo validation - in real app this would be server-side
        if (email === "demo@example.com" && password === "password") {
          const user = {
            id: "user1",
            email: email,
            username: "DemoUser",
          };
          setUser(user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
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
          const user = {
            id: `user_${Date.now()}`,
            email,
            username,
          };
          setUser(user);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
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
