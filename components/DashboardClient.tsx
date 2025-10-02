"use client";

import { useState, useEffect } from "react";
import { AddPlayerDialog } from "@/components/AddPlayerDialog";
import { Header_Image } from "@/components/common/header";
import { PlayerCard } from "@/components/player_card";
import { Player } from "@/lib/types";
import { pb, getRegistrationStatus, updateRegistrationStatus, updateLastUpdated } from "@/lib/db/pb";
import { toast } from "sonner";

export function DashboardClient({
  initialPlayers,
  userId,
  isAdmin = false,
  userEmail,
}: {
  initialPlayers: Player[];
  userId: string;
  isAdmin?: boolean;
  userEmail?: string;
}) {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(initialPlayers);
  const [searchTerm, setSearchTerm] = useState("");
  const [organizationFilter, setOrganizationFilter] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [updatingRegistration, setUpdatingRegistration] = useState(false);

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

  // Load registration status on component mount
  useEffect(() => {
    if (isAdmin) {
      loadRegistrationStatus();
    }
  }, [isAdmin]);

  const loadRegistrationStatus = async () => {
    try {
      const status = await getRegistrationStatus();
      setRegistrationOpen(status);
    } catch (error) {
      console.error("Failed to load registration status:", error);
    }
  };

  const handleRegistrationToggle = async () => {
    setUpdatingRegistration(true);
    try {
      const newStatus = !registrationOpen;
      await updateRegistrationStatus(newStatus);
      await updateLastUpdated(); // Update last modified date
      setRegistrationOpen(newStatus);
      toast.success(`Registration ${newStatus ? "opened" : "closed"} successfully!`);
    } catch (error) {
      toast.error("Failed to update registration status");
      console.error("Error updating registration status:", error);
    } finally {
      setUpdatingRegistration(false);
    }
  };

  // Filter players based on search and filter criteria
  useEffect(() => {
    let filtered = players;

    if (searchTerm) {
      filtered = filtered.filter(
        (player) =>
          player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (player.aadhar && typeof player.aadhar === "string" && player.aadhar.includes(searchTerm)) ||
          (player.mobile && typeof player.mobile === "string" && player.mobile.includes(searchTerm)) ||
          (player.employeeId &&
            typeof player.employeeId === "string" &&
            player.employeeId.toLowerCase().includes(searchTerm.toLowerCase())),
      );
    }

    if (organizationFilter) {
      filtered = filtered.filter((player) => player.organisation === organizationFilter);
    }

    if (eventFilter) {
      filtered = filtered.filter((player) => player.event.includes(eventFilter));
    }

    setFilteredPlayers(filtered);
  }, [players, searchTerm, organizationFilter, eventFilter]);

  // Get unique organizations and events for filter dropdowns
  const uniqueOrganizations = Array.from(new Set(players.map((p) => p.organisation))).sort();
  const uniqueEvents = Array.from(new Set(players.map((p) => p.event.split(" - ")[0]))).sort();

  // Export functionality for admin
  const exportToCSV = () => {
    const csvContent = [
      // CSV Header
      [
        "Name",
        "Organization",
        "Event",
        "Age",
        "Blood Group",
        "Mobile",
        "Aadhar",
        "Employee ID",
        "Meal Type",
        "T-Shirt Size",
        "Health Issues",
      ].join(","),
      // CSV Data - using tab prefix to preserve numbers as text
      ...filteredPlayers.map((player) =>
        [
          player.name,
          player.organisation,
          player.event,
          player.age,
          player.bloodGroup,
          `\t${String(player.mobile || "")}`, // Tab prefix forces text interpretation
          `\t${String(player.aadhar || "")}`, // Tab prefix forces text interpretation
          player.employeeId,
          player.mealType,
          player.tShirtSize,
          player.healthIssues || "None",
        ]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `AIFSM_2025_Players_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export functionality for regular users (their own players only)
  const exportUserPlayersToCSV = () => {
    const csvContent = [
      // CSV Header
      [
        "Name",
        "Organization",
        "Event",
        "Age",
        "Blood Group",
        "Mobile",
        "Employee ID",
        "Meal Type",
        "T-Shirt Size",
        "Health Issues",
      ].join(","),
      // CSV Data - using tab prefix to preserve numbers as text (excluding Aadhar for privacy)
      ...filteredPlayers.map((player) =>
        [
          player.name,
          player.organisation,
          player.event,
          player.age,
          player.bloodGroup,
          `\t${String(player.mobile || "")}`, // Tab prefix forces text interpretation
          player.employeeId,
          player.mealType,
          player.tShirtSize,
          player.healthIssues || "None",
        ]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `My_AIFSM_2025_Players_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen relative">
      {/* Top header image */}
      <Header_Image image="default" />

      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[75px] sm:top-[100px] md:top-[125px] lg:top-[150px] text-center z-10">
        <div className="bg-white/20 dark:bg-gray-400/40 backdrop-blur-md border border-white/30 rounded-2xl py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-12 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:bg-white/25">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">
            {isAdmin ? "Admin Dashboard" : "Dashboard"}
          </h1>
          {isAdmin && <p className="text-sm sm:text-base text-white/90 mb-2">Viewing all player registrations</p>}
          <div className="border-b-4 border-white w-12 sm:w-16 md:w-20 lg:w-24 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Content container with proper spacing from header */}
      <div className="pt-4 sm:pt-8 md:pt-12">
        {/* Admin Registration Control Section */}
        {isAdmin && (
          <div className="px-4 sm:px-6 lg:px-8 xl:px-12 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Registration Control</h2>
                    <p className="text-gray-600">
                      Current Status:{" "}
                      <span className={`font-semibold ${registrationOpen ? "text-green-600" : "text-red-600"}`}>
                        {registrationOpen ? "OPEN" : "CLOSED"}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={handleRegistrationToggle}
                    disabled={updatingRegistration}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 cursor-pointer ${
                      registrationOpen
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updatingRegistration ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      <>{registrationOpen ? "Close Registration" : "Open Registration"}</>
                    )}
                  </button>
                </div>
                {!registrationOpen && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-yellow-800 text-sm">
                      ⚠️ Registration is currently closed. Users cannot register new players.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Admin Stats Section */}
        {isAdmin && (
          <div className="px-4 sm:px-6 lg:px-8 xl:px-12 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Registration Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600">{players.length}</div>
                    <div className="text-sm text-gray-600">Total Players</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600">{uniqueOrganizations.length}</div>
                    <div className="text-sm text-gray-600">Organizations</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {new Set(players.map((p) => p.event)).size}
                    </div>
                    <div className="text-sm text-gray-600">Unique Events</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Filter Section */}
        {isAdmin && (
          <div className="px-4 sm:px-6 lg:px-8 xl:px-12 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Search & Filter Players</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <input
                      type="text"
                      placeholder="Search players..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization</label>
                    <select
                      value={organizationFilter}
                      onChange={(e) => setOrganizationFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Organizations</option>
                      {uniqueOrganizations.map((org) => (
                        <option key={org} value={org}>
                          {org}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
                    <select
                      value={eventFilter}
                      onChange={(e) => setEventFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Sports</option>
                      {uniqueEvents.map((event) => (
                        <option key={event} value={event}>
                          {event}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setOrganizationFilter("");
                        setEventFilter("");
                      }}
                      className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Showing {filteredPlayers.length} of {players.length} players
                  </div>
                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    📊 Export to CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Player button */}
        <div className="flex justify-center px-4 sm:px-6 mb-8 sm:mb-12">
          <div className="text-center">
            {isAdmin ? (
              // Admin view - center the register button since CSV export is in admin panel
              <div>
                <AddPlayerDialog userId={userId} onPlayerAdded={handlePlayerAdded} />
              </div>
            ) : (
              // Regular user view - show register button with CSV export option
              <div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <AddPlayerDialog userId={userId} onPlayerAdded={handlePlayerAdded} />
                  {players.length > 0 && (
                    <button
                      onClick={exportUserPlayersToCSV}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm sm:text-base"
                    >
                      📊 Export My Players
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PlayerCards Section - Single Column Vertical Layout */}
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 mb-20">
          {filteredPlayers.length === 0 ? (
            <div className="flex justify-center">
              <div className="text-center py-12 sm:py-16">
                {players.length === 0 ? (
                  <>
                    <p className="text-gray-500 text-lg sm:text-xl mb-4">No players registered yet</p>
                    <p className="text-gray-400 text-sm sm:text-base">
                      Click "Register New Player" to add your first player
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500 text-lg sm:text-xl mb-4">No players match your filters</p>
                    <p className="text-gray-400 text-sm sm:text-base">
                      Try adjusting your search criteria or clear the filters
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                {/* Single Column Vertical List */}
                <div className="space-y-6 sm:space-y-8">
                  {filteredPlayers.map((player, index) => (
                    <div key={player.id} className="w-full">
                      <PlayerCard
                        player={player}
                        index={index + 1}
                        onUpdate={handlePlayerUpdate}
                        onDelete={handlePlayerDelete}
                        isAdmin={isAdmin}
                        showRegisteredBy={isAdmin}
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
