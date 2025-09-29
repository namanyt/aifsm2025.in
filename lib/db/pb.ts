import Pocketbase from "pocketbase";
import type { Player } from "@/lib/types";

export const pb = new Pocketbase(process.env.DATABASE_URL || "http://192.168.29.6:8090");

export type DBPlayer = Player & {
  RegisteredBy: string; // User ID who registered the player
};

// Update a player by id
export async function updatePlayer(id: string, data: Partial<Player>) {
  return pb.collection("players").update(id, data);
}

export async function createPlayer(data: Partial<DBPlayer>) {
  return pb.collection("players").create(data);
}

// Get a player by id
export async function getPlayer(id: string) {
  return pb.collection("players").getOne(id);
}

export async function deletePlayer(id: string) {
  return pb.collection("players").delete(id);
}
