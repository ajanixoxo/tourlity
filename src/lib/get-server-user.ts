import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserProfile } from "@/lib/stores/auth-store";

export async function getServerUser(): Promise<UserProfile | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    // Replace 'your_jwt_secret' with your actual secret
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as UserProfile;
    return payload;
  } catch {
    return null;
  }
}
