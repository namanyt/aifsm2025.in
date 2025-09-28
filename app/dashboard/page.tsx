import { AddPlayerDialog } from "@/components/AddPlayerDialog";
import { Header_Image } from "@/components/common/header";
import { PlayerCard } from "@/components/player_card";

import { pb } from "@/lib/db/pb";
import { Player } from "@/lib/types";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Dashboard() {
  // 🔑 Check auth on the server
  const cookie = await cookies();
  pb.authStore.loadFromCookie(cookie.toString());
  if (!pb.authStore.isValid) {
    console.log("User not authenticated, redirecting to /register");
    console.log("Current cookies:", cookie.toString());
    redirect("/register");
  }

  const user = pb.authStore.record;

  const players = await pb.collection("players").getFullList<Player>(200, {
    filter: `RegisteredBy="${user?.id}"`,
    sort: "-created",
  });

  // console.log("Fetched players:", players);

  return (
    <div className="min-h-screen">
      <Header_Image />
      <div className="absolute left-1/2 transform -translate-x-1/2 top-80 text-center">
        <div className="dark:bg-gray-50/30 backdrop-blur-xs rounded-lg py-4 px-10 shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-[#c96e00] mt-2">Dashboard</h1>
          <div className="border-b-4 border-[#c96e00] w-24 mx-auto mb-4"></div>
        </div>
      </div>

      <div className="mt-20"></div>
      <AddPlayerDialog userId={user?.id ?? ""} />

      <div className="mt-20 mb-20 px-4 flex justify-center">
        {players.length === 0 ? (
          <p className="text-gray-500">No players found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {players.map((player, index) => (
              <PlayerCard key={player.id} player={player} index={index + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
