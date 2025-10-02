import Pocketbase from "pocketbase";
import type { Player } from "@/lib/types";
import { DATABASE_URL } from "@/lib/constants";

export const pb = new Pocketbase(process.env.DATABASE_URL || DATABASE_URL);

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
export async function getPlayer(id: string): Promise<Player> {
  const player = await pb.collection("players").getOne<Player>(id);

  // Ensure mobile and aadhar are strings
  return {
    ...player,
    mobile: String(player.mobile || ""),
    aadhar: String(player.aadhar || ""),
  };
}

// Settings management functions
export async function getRegistrationStatus(): Promise<boolean> {
  try {
    const record = await pb.collection("settings").getFirstListItem('key="registration_open"');
    return record.value === "true";
  } catch (error) {
    // If no record exists, default to open
    console.log("No registration status found, defaulting to open");
    return true;
  }
}

export async function updateRegistrationStatus(isOpen: boolean): Promise<void> {
  try {
    // Try to get existing record
    const existingRecord = await pb.collection("settings").getFirstListItem('key="registration_open"');

    // Update existing record
    await pb.collection("settings").update(existingRecord.id, {
      value: isOpen.toString(),
      updated: new Date().toISOString(),
    });
  } catch (error) {
    console.warn("Settings collection not available, cannot update registration status:", error);
    // Silently fail since settings collection may not be configured
    // This prevents the app from breaking
  }
}

// Visitor count management
export async function getVisitorCount(): Promise<number> {
  try {
    const record = await pb.collection("settings_public").getFirstListItem('key="visitor_count"');
    console.log("Visitor count record:", record);
    return parseInt(record.value) || 0;
  } catch (error) {
    console.warn("Settings collection not available, using fallback visitor count:", error);
    return 0;
  }
}

export async function incrementVisitorCount(): Promise<number> {
  try {
    const record = await pb.collection("settings_public").getFirstListItem('key="visitor_count"');
    const newCount = (parseInt(record.value) || 0) + 1;

    await pb.collection("settings_public").update(record.id, {
      value: newCount.toString(),
      updated: new Date().toISOString(),
    });

    return newCount;
  } catch (error) {
    console.warn("Settings collection not available, using fallback visitor count:", error);
    return 0;
  }
}

// Last updated management
export async function getLastUpdated(): Promise<string> {
  try {
    const record = await pb.collection("settings").getFirstListItem('key="last_updated"');
    return record.value;
  } catch (error) {
    console.warn("Settings collection not available, using fallback last updated date:", error);
    // Return current date as fallback since settings collection may not be configured
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return currentDate;
  }
}

export async function updateLastUpdated(date?: string): Promise<void> {
  const updateDate =
    date ||
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  try {
    const record = await pb.collection("settings").getFirstListItem('key="last_updated"');

    await pb.collection("settings").update(record.id, {
      value: updateDate,
      updated: new Date().toISOString(),
    });
  } catch (error) {
    console.warn("Settings collection not available, cannot update last updated date:", error);
    // Silently fail since settings collection may not be configured
    // This prevents the app from breaking
  }
}

export async function deletePlayer(id: string) {
  return pb.collection("players").delete(id);
}

export async function listNews() {
  return pb.collection("news").getFullList();
}

// Get players by Aadhar number
export async function getPlayersByAadhar(aadhar: string): Promise<Player[]> {
  const players = await pb.collection("players").getFullList<Player>({
    filter: `aadhar = "${aadhar}"`,
  });

  // Ensure mobile and aadhar are strings
  return players.map((player) => ({
    ...player,
    mobile: String(player.mobile || ""),
    aadhar: String(player.aadhar || ""),
  }));
}

// Get all players (admin only) or players by user ID
export async function getPlayersForUser(userId: string, isAdmin: boolean = false): Promise<Player[]> {
  let players: Player[];

  if (isAdmin) {
    // Admin sees all players with additional info about who registered them
    players = await pb.collection("players").getFullList<Player>({
      sort: "-created",
      expand: "RegisteredBy",
    });
  } else {
    // Regular users see only their registered players
    players = await pb.collection("players").getFullList<Player>({
      filter: `RegisteredBy="${userId}"`,
      sort: "-created",
    });
  }

  // Ensure mobile and aadhar are strings to prevent scientific notation
  return players.map((player) => ({
    ...player,
    mobile: String(player.mobile || ""),
    aadhar: String(player.aadhar || ""),
  }));
}
