"use client";

import { useState, useEffect } from "react";
import { AddPlayerDialog } from "@/components/AddPlayerDialog";
import { Header_Image } from "@/components/common/header";
import { PlayerCard } from "@/components/player_card";
import { Player } from "@/lib/types";
import { pb } from "@/lib/db/pb";

export function DashboardClient({ initialPlayers, userId }: { initialPlayers: Player[]; userId: string }) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);

  // Handle when a new player is added
  const handlePlayerAdded = (newPlayer: Player) => {
    setPlayers((prev) => [newPlayer, ...prev]);
  };

  // Handle when a player is updated
  const handlePlayerUpdate = (updatedPlayer: Player) => {
    setPlayers((prev) => prev.map((player) => (player.id === updatedPlayer.id ? updatedPlayer : player)));
  };

  // Handle when a player is deleted
  const handlePlayerDelete = (playerId: string) => {
    setPlayers((prev) => prev.filter((player) => player.id !== playerId));
  };

  return (
    <div className="min-h-screen relative">
      {/* Top header image */}
      <Header_Image image="default" />

      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[75px] sm:top-[100px] md:top-[125px] lg:top-[150px] text-center z-10">
        <div className="bg-white/20 dark:bg-gray-400/40 backdrop-blur-md border border-white/30 rounded-2xl py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-12 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:bg-white/25">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">
            Dashboard
          </h1>
          <div className="border-b-4 border-white w-12 sm:w-16 md:w-20 lg:w-24 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Content container with proper spacing from header */}
      <div className="pt-4 sm:pt-8 md:pt-12">
        {/* Add Player button */}
        <div className="flex justify-center px-4 sm:px-6 mb-8 sm:mb-12">
          <AddPlayerDialog userId={userId} onPlayerAdded={handlePlayerAdded} />
        </div>

        {/* PlayerCards Section - Single Column Vertical Layout */}
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 mb-20">
          {players.length === 0 ? (
            <div className="flex justify-center">
              <div className="text-center py-12 sm:py-16">
                <p className="text-gray-500 text-lg sm:text-xl mb-4">No players registered yet</p>
                <p className="text-gray-400 text-sm sm:text-base">
                  Click "Register New Player" to add your first player
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                {/* Single Column Vertical List */}
                <div className="space-y-6 sm:space-y-8">
                  {players.map((player, index) => (
                    <div key={player.id} className="w-full">
                      <PlayerCard
                        player={player}
                        index={index + 1}
                        onUpdate={handlePlayerUpdate}
                        onDelete={handlePlayerDelete}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
