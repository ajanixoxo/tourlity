"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";

// Fetch user from a secure API endpoint and hydrate Zustand on client load
async function fetchUserProfile() {
  try {
    console.log("[AuthSyncProvider] Fetching /api/auth/me...");
    const res = await fetch("/api/auth/me", { credentials: "include" });
    if (!res.ok) return null;
    const user = await res.json();
    console.log("[AuthSyncProvider] /api/auth/me result:", user);
    return user;
  } catch (e) {
    console.log("[AuthSyncProvider] Error fetching /api/auth/me", e);
    return null;
  }
}

export default function AuthSyncProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    fetchUserProfile().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [setUser, setLoading]);

  return children;
}
