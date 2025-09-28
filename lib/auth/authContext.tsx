"use client";

import { pb } from "@/lib/db/pb";
import { createContext, useState, useEffect, use, useContext } from "react";

type User = typeof pb.authStore.record | null;

interface AuthContextProps {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(pb.authStore.record);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(async () => {
      setUser(pb.authStore.record);
      const cookieStr = pb.authStore.exportToCookie(); // PocketBase cookie string

      // Send cookie to server so SSR pages can read it
      await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cookie: cookieStr }),
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    await pb.collection("users").authWithPassword(email, password);
    setUser(pb.authStore.record);
    const cookieStr = pb.authStore.exportToCookie(); // PocketBase cookie string

    // Send cookie to server so SSR pages can read it
    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cookie: cookieStr }),
    });
  };

  const logout = async () => {
    pb.authStore.clear();
    setUser(null);
    const cookieStr = pb.authStore.exportToCookie(); // PocketBase cookie string

    // Send cookie to server so SSR pages can read it
    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cookie: cookieStr }),
    });
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
