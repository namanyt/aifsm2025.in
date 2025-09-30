import { NextResponse } from "next/server";
import { pb } from "@/lib/db/pb";

export async function GET() {
  try {
    // Try to get server health/info
    const health = await pb.health.check();
    // console.log("🟢 PocketBase health check:", health);

    return NextResponse.json({
      status: "connected",
      url: pb.baseUrl,
      health: health,
    });
  } catch (error) {
    // console.error("🔴 PocketBase connection error:", error);

    return NextResponse.json(
      {
        status: "error",
        url: pb.baseUrl,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
