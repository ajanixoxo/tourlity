import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserProfile } from "@/lib/stores/auth-store";

export async function getServerUser(): Promise<UserProfile | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      console.log("No token found in cookies");
      return null;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    const payload = jwt.verify(token, secret) as UserProfile;
    return payload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("Invalid token:", error.message);
    } else {
      console.error("Error getting server user:", error);
    }
    return null;
  }
}

// Bonus: Get just the token
export async function getServerToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value || null;
}