import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { cookie } = await req.json();
  if (!cookie) return NextResponse.json({ error: "Missing cookie" }, { status: 400 });

  // Set cookie so server-side pages can read it
  return new Response(null, {
    status: 204,
    headers: {
      "Set-Cookie": cookie, // cookie already contains Path, SameSite, Secure, etc.
    },
  });
}

export async function DELETE(req: Request) {
  return new Response(null, {
    status: 204,
    headers: {
      "Set-Cookie": "pb_auth=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax",
    },
  });
}
