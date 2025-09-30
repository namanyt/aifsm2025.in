import { cookies } from "next/headers";
import { pb } from "@/lib/db/pb";

export async function getServerAuth() {
  const cookieStore = await cookies();
  const pbAuthCookie = cookieStore.get("pb_auth");

  // console.log("🔍 Server auth check - pb_auth cookie:", pbAuthCookie ? "Found" : "Not found");
  // console.log("🔍 Cookie value length:", pbAuthCookie?.value?.length || 0);

  if (pbAuthCookie) {
    // Reconstruct the cookie string in the format PocketBase expects
    const cookieString = `pb_auth=${pbAuthCookie.value}; Path=/; HttpOnly; SameSite=Lax`;
    pb.authStore.loadFromCookie(cookieString);
    // console.log("🔍 After loading cookie - isValid:", pb.authStore.isValid);
    // console.log("🔍 Auth store record:", pb.authStore.record ? "User found" : "No user");
  }

  return {
    isValid: pb.authStore.isValid,
    user: pb.authStore.record,
    token: pb.authStore.token,
  };
}

export async function requireAuth() {
  const auth = await getServerAuth();

  if (!auth.isValid) {
    throw new Error("Authentication required");
  }

  return auth;
}
