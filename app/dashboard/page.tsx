import { DashboardClient } from "@/components/DashboardClient";
import { pb } from "@/lib/db/pb";
import { Player } from "@/lib/types";
import { redirect } from "next/navigation";
import { getServerAuth } from "@/lib/auth/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard - All India Forest Sports Meet 2025",
};

export default async function Dashboard() {
  // 🔑 Check auth on the server
  const auth = await getServerAuth();

  if (!auth.isValid) {
    // console.log("User not authenticated, redirecting to /register");
    redirect("/register");
  }

  const user = auth.user;

  const players = await pb.collection("players").getFullList<Player>(200, {
    filter: `RegisteredBy="${user?.id}"`,
    sort: "-created",
  });

  return (
    <DashboardClient
      initialPlayers={players}
      userId={user?.id ?? ""}
    />
  );
}
