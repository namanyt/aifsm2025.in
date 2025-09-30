import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { cookie } = await req.json();
  if (!cookie) return NextResponse.json({ error: "Missing cookie" }, { status: 400 });
  // console.log("📝 Received cookie from client:", cookie);

  // Parse the PocketBase cookie string to extract the value
  // PocketBase cookie format: "pb_auth=<value>; Path=/; HttpOnly; Secure; SameSite=Lax"
  const cookieMatch = cookie.match(/pb_auth=([^;]*)/);
  const cookieValue = cookieMatch ? cookieMatch[1] : "";

  // console.log("🔍 Parsed cookie value:", cookieValue ? "Found" : "Not found");

  if (!cookieValue) {
    console.error("❌ Invalid cookie format - no pb_auth value found");
    return NextResponse.json({ error: "Invalid cookie format" }, { status: 400 });
  }

  // Create response and set cookie properly
  const response = new Response(null, { status: 204 });

  // Determine if we're in development (HTTP) or production (HTTPS)
  const isDevelopment = process.env.NODE_ENV === "development";

  // Set cookie with proper attributes based on environment
  const cookieAttributes = [
    `pb_auth=${cookieValue}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=604800", // 7 days
  ];

  // Only add Secure flag in production (HTTPS)
  if (!isDevelopment) {
    cookieAttributes.push("Secure");
  }

  const finalCookie = cookieAttributes.join("; ");
  // console.log("🍪 Setting cookie with attributes:", finalCookie);

  response.headers.set("Set-Cookie", finalCookie);

  return response;
}

export async function DELETE(req: Request) {
  const response = new Response(null, { status: 204 });

  // Determine if we're in development (HTTP) or production (HTTPS)
  const isDevelopment = process.env.NODE_ENV === "development";

  // Clear the cookie by setting it with Max-Age=0
  const cookieAttributes = ["pb_auth=", "Max-Age=0", "Path=/", "HttpOnly", "SameSite=Lax"];

  // Only add Secure flag in production (HTTPS)
  if (!isDevelopment) {
    cookieAttributes.push("Secure");
  }

  response.headers.set("Set-Cookie", cookieAttributes.join("; "));

  return response;
}
