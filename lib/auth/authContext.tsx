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
      try {
        const response = await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cookie: cookieStr }),
        });

        if (!response.ok) {
          console.error("Failed to set session cookie:", response.statusText);
        }
      } catch (error) {
        console.error("Error setting session cookie:", error);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // console.log("🔄 Attempting to login with PocketBase...");
      const authData = await pb.collection("users").authWithPassword(email, password);
      // console.log("✅ PocketBase authentication successful");
      // console.log("📋 Auth data:", { user: authData.record.email, id: authData.record.id });

      setUser(pb.authStore.record);
      const cookieStr = pb.authStore.exportToCookie(); // PocketBase cookie string
      // console.log("🍪 Exported cookie string:", cookieStr.substring(0, 50) + "...");

      // Send cookie to server so SSR pages can read it
      // console.log("🔄 Sending cookie to session API...");
      const response = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cookie: cookieStr }),
      });

      if (!response.ok) {
        // console.error("❌ Failed to set session cookie:", response.statusText);
        const errorText = await response.text();
        // console.error("❌ Response body:", errorText);
        throw new Error(`Failed to set session cookie: ${response.statusText}`);
      }

      // console.log("✅ Session cookie set successfully");
    } catch (error) {
      // console.error("❌ Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    pb.authStore.clear();
    setUser(null);

    // Clear the session cookie on the server
    try {
      const response = await fetch("/api/session", {
        method: "DELETE",
      });

      if (!response.ok) {
        // console.error("Failed to clear session cookie:", response.statusText);
      }
    } catch (error) {
      // console.error("Error clearing session cookie:", error);
    }
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
