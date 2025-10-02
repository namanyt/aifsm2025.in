"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createPlayer, getPlayersByAadhar, getRegistrationStatus } from "@/lib/db/pb";
import { sportsData, bloodGroups } from "@/lib/types";
import type { Player } from "@/lib/types";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/authContext";
import { REGISTRATION_OPEN, REGISTRATION_LIMITS, TEAM_EVENT_KEYWORDS } from "@/lib/constants";

const tShirtSizes = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL",
  XXXL: "XXXL",
};

const initialPlayerState: Omit<Player, "id"> = {
  organisation: "",
  name: "",
  age: 18,
  bloodGroup: "",
  tShirtSize: undefined as any,
  mobile: "",
  aadhar: "",
  employeeId: "",
  event: "",
  healthIssues: "",
  mealType: "Veg",
  profilePicture: undefined as any,
  employeeIDCard: undefined as any,
};

export function AddPlayerDialog({
  userId,
  onPlayerAdded,
}: {
  userId: string;
  onPlayerAdded?: (newPlayer: Player) => void;
}) {
  const { user } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ ...initialPlayerState });
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [aadharError, setAadharError] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState<{
    soloEvents: number;
    teamEvents: number;
    events: string[];
  } | null>(null);
  const [checkingRegistrations, setCheckingRegistrations] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(true);
  const [checkingRegistrationStatus, setCheckingRegistrationStatus] = useState(false);

  // Validate Aadhar number
  const validateAadhar = (aadharNumber: string): string => {
    // Remove any spaces or special characters
    const cleanAadhar = aadharNumber.replace(/\D/g, "");

    if (cleanAadhar.length !== 12) {
      return "Aadhar number must be exactly 12 digits";
    }

    if (cleanAadhar.startsWith("0") || cleanAadhar.startsWith("1")) {
      return "Aadhar number cannot start with 0 or 1";
    }

    if (!/^\d{12}$/.test(cleanAadhar)) {
      return "Aadhar number must contain only digits";
    }

    return "";
  };

  const checkCurrentRegistrations = async (aadharNumber: string) => {
    if (aadharNumber.length !== 12) {
      setRegistrationStatus(null);
      return;
    }

    setCheckingRegistrations(true);
    try {
      const existingPlayers = await getPlayersByAadhar(aadharNumber);

      const isTeamEvent = (event: string): boolean => {
        return TEAM_EVENT_KEYWORDS.some((keyword) => event.toLowerCase().includes(keyword.toLowerCase()));
      };

      let soloEvents = 0;
      let teamEvents = 0;
      const events: string[] = [];

      existingPlayers.forEach((player) => {
        events.push(player.event);
        if (isTeamEvent(player.event)) {
          teamEvents++;
        } else {
          soloEvents++;
        }
      });

      setRegistrationStatus({
        soloEvents,
        teamEvents,
        events,
      });
    } catch (error) {
      console.error("Error checking registrations:", error);
      setRegistrationStatus(null);
    } finally {
      setCheckingRegistrations(false);
    }
  };

  const validateRegistrationRegulations = async (
    aadharNumber: string,
    newEvent: string,
  ): Promise<{ isValid: boolean; message?: string }> => {
    try {
      // Get all existing registrations for this Aadhar number
      const existingPlayers = await getPlayersByAadhar(aadharNumber);

      if (existingPlayers.length === 0) {
        return { isValid: true }; // First registration for this player
      }

      // Define team events using centralized keywords
      const isTeamEvent = (event: string): boolean => {
        return TEAM_EVENT_KEYWORDS.some((keyword) => event.toLowerCase().includes(keyword.toLowerCase()));
      };

      // Count current registrations
      let soloEventsCount = 0;
      let teamEventsCount = 0;

      existingPlayers.forEach((player) => {
        if (isTeamEvent(player.event)) {
          teamEventsCount++;
        } else {
          soloEventsCount++;
        }
      });

      // Check if the new event would exceed limits
      if (isTeamEvent(newEvent)) {
        if (teamEventsCount >= REGISTRATION_LIMITS.MAX_TEAM_EVENTS) {
          return {
            isValid: false,
            message: `Player has already registered for maximum team events (${REGISTRATION_LIMITS.MAX_TEAM_EVENTS}). Current team events: ${teamEventsCount}`,
          };
        }
      } else {
        if (soloEventsCount >= REGISTRATION_LIMITS.MAX_SOLO_EVENTS) {
          return {
            isValid: false,
            message: `Player has already registered for maximum solo events (${REGISTRATION_LIMITS.MAX_SOLO_EVENTS}). Current solo events: ${soloEventsCount}`,
          };
        }
      }

      // Check for duplicate event registration
      const isDuplicateEvent = existingPlayers.some((player) => player.event === newEvent);
      if (isDuplicateEvent) {
        return {
          isValid: false,
          message: `Player is already registered for this event: ${newEvent}`,
        };
      }

      return { isValid: true };
    } catch (error) {
      console.error("Error validating registration regulations:", error);
      return {
        isValid: false,
        message: "Unable to validate registration. Please try again.",
      };
    }
  };

  // Pre-fill organisation when user data is available
  useEffect(() => {
    if (user?.org) {
      setFormData((prev) => ({ ...prev, organisation: user.org }));
    }

    // console.log("User data in AddPlayerDialog:", user);
  }, [user]);

  // Check registration status when dialog opens
  useEffect(() => {
    if (dialogOpen) {
      checkRegistrationStatus();
    }
  }, [dialogOpen]);

  const checkRegistrationStatus = async () => {
    setCheckingRegistrationStatus(true);
    try {
      const status = await getRegistrationStatus();
      setRegistrationOpen(status);
    } catch (error) {
      console.error("Failed to check registration status:", error);
      // Default to open on error
      setRegistrationOpen(true);
    } finally {
      setCheckingRegistrationStatus(false);
    }
  };

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
    setSelectedSubCategory("");
    setSelectedGender("");
  };
  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setSelectedGender("");
  };
  const getSubCategories = () => {
    if (!selectedSport || !sportsData[selectedSport]) return [];
    return Object.keys(sportsData[selectedSport]);
  };
  const getGenders = () => {
    if (!selectedSport || !selectedSubCategory || !sportsData[selectedSport]?.[selectedSubCategory]) return [];
    return sportsData[selectedSport][selectedSubCategory];
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "aadhar") {
      // Only allow digits and limit to 12 characters
      const cleanValue = value.replace(/\D/g, "").slice(0, 12);
      setFormData((prev) => ({ ...prev, [name]: cleanValue }));

      // Validate Aadhar if it's 12 digits
      if (cleanValue.length === 12) {
        const error = validateAadhar(cleanValue);
        setAadharError(error);
        if (!error) {
          // Check current registrations for this Aadhar
          await checkCurrentRegistrations(cleanValue);
        }
      } else {
        setAadharError(cleanValue.length > 0 ? "Aadhar number must be 12 digits" : "");
        setRegistrationStatus(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };
  const handleEventSelection = () => {
    if (selectedSport && selectedSubCategory && selectedGender) {
      setFormData((prev) => ({
        ...prev,
        event: `${selectedSport} - ${selectedSubCategory} (${selectedGender})`,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if registration is closed
    if (!registrationOpen) {
      toast.error("Registration is currently closed.");
      return;
    }

    // Validate Aadhar before submission
    if (formData.aadhar) {
      const aadharValidationError = validateAadhar(formData.aadhar);
      if (aadharValidationError) {
        setAadharError(aadharValidationError);
        toast.error("Please enter a valid Aadhar number");
        return;
      }
    }

    // Validate event selection
    if (!formData.event) {
      toast.error("Please select an event");
      return;
    }

    // Validate registration regulations
    const regulationCheck = await validateRegistrationRegulations(formData.aadhar, formData.event);
    if (!regulationCheck.isValid) {
      toast.error(regulationCheck.message || "Registration validation failed");
      return;
    }

    setLoading(true);
    try {
      const newPlayer = await createPlayer({ ...formData, RegisteredBy: userId });
      setDialogOpen(false);
      setFormData({ ...initialPlayerState, organisation: user?.org || "" });
      setSelectedSport("");
      setSelectedSubCategory("");
      setSelectedGender("");
      toast.success("Player registered successfully!");
      // Notify parent component if callback provided
      if (onPlayerAdded && newPlayer) {
        onPlayerAdded({ ...formData, id: newPlayer.id } as Player);
      }
    } catch (err) {
      toast.error("Failed to register player");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg cursor-pointer"
        disabled={!REGISTRATION_OPEN}
        onClick={() => {
          setDialogOpen(true);
          setAadharError(""); // Clear any previous validation errors
        }}
      >
        Register New Player
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="min-w-[60vw] w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold">Register New Player</DialogTitle>
            <DialogDescription className="text-lg">Enter all details for the new player</DialogDescription>

            {/* Registration status message */}
            {checkingRegistrationStatus && <div className="text-blue-600 text-sm">Checking registration status...</div>}
            {!checkingRegistrationStatus && !registrationOpen && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-2">
                <p className="text-red-700 font-medium">Registration is currently closed</p>
                <p className="text-red-600 text-sm">Please contact the administrators for more information.</p>
              </div>
            )}
          </DialogHeader>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-base text-gray-800"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Organization</label>
              <input
                className="bg-gray-100 rounded-md px-4 py-3 border border-gray-300 cursor-not-allowed"
                value={formData.organisation}
                name="organisation"
                onChange={handleChange}
                readOnly
                placeholder="Organisation will be auto-filled from your profile"
                required
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Enter Name</label>
              <input
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                value={formData.name}
                name="name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Enter Age</label>
              <input
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                type="number"
                value={formData.age}
                name="age"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Select Blood Group</label>
              <select
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                value={formData.bloodGroup}
                name="bloodGroup"
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Group</option>
                {Object.entries(bloodGroups).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Select T-Shirt Size</label>
              <select
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                value={formData.tShirtSize}
                name="tShirtSize"
                onChange={handleChange}
                required
              >
                <option value="">Select T-Shirt Size</option>
                {Object.entries(tShirtSizes).map(([key, value]) => (
                  <option key={key} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Enter Mobile Number</label>
              <input
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                value={formData.mobile}
                name="mobile"
                onChange={handleChange}
                type="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                minLength={10}
                required
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Enter Aadhar Card</label>
              <input
                className={`bg-gray-50 rounded-md px-4 py-3 border ${
                  aadharError ? "border-red-500" : "border-gray-300"
                } cursor-pointer`}
                value={formData.aadhar}
                name="aadhar"
                onChange={handleChange}
                type="text"
                placeholder="Enter 12-digit Aadhar number"
                maxLength={12}
                required
              />
              {aadharError && <span className="text-red-500 text-sm">{aadharError}</span>}

              {/* Registration Status Display */}
              {checkingRegistrations && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-600">Checking current registrations...</p>
                </div>
              )}

              {registrationStatus && (
                <div className="mt-2 p-4 bg-gray-50 border border-gray-300 rounded-md">
                  <h4 className="font-semibold text-gray-700 mb-2">Current Registrations:</h4>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="font-medium">Solo Events: </span>
                      <span
                        className={`${
                          registrationStatus.soloEvents >= REGISTRATION_LIMITS.MAX_SOLO_EVENTS
                            ? "text-red-600 font-bold"
                            : "text-green-600"
                        }`}
                      >
                        {registrationStatus.soloEvents}/{REGISTRATION_LIMITS.MAX_SOLO_EVENTS}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Team Events: </span>
                      <span
                        className={`${
                          registrationStatus.teamEvents >= REGISTRATION_LIMITS.MAX_TEAM_EVENTS
                            ? "text-red-600 font-bold"
                            : "text-green-600"
                        }`}
                      >
                        {registrationStatus.teamEvents}/{REGISTRATION_LIMITS.MAX_TEAM_EVENTS}
                      </span>
                    </div>
                  </div>
                  {registrationStatus.events.length > 0 && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Registered Events:</span>
                      <ul className="mt-1 pl-4 space-y-1">
                        {registrationStatus.events.map((event, index) => (
                          <li key={index} className="text-gray-600 text-xs">
                            • {event}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Enter Employee ID</label>
              <input
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                value={formData.employeeId}
                name="employeeId"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Select Event</label>
              <div className="grid grid-cols-1 gap-3">
                {/* Sport Category Dropdown */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-600">Sport Category</label>
                  <select
                    className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                    value={selectedSport}
                    onChange={(e) => handleSportChange(e.target.value)}
                    required
                  >
                    <option value="">Select Sport</option>
                    {Object.keys(sportsData).map((sport) => (
                      <option key={sport} value={sport}>
                        {sport}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Sub Category Dropdown */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-600">Event Type</label>
                  <select
                    className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                    value={selectedSubCategory}
                    onChange={(e) => handleSubCategoryChange(e.target.value)}
                    disabled={!selectedSport}
                    required
                  >
                    <option value="">Select Event Type</option>
                    {getSubCategories().map((subCategory) => (
                      <option key={subCategory} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Sub Category Dropdown */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium text-gray-600">Sub Category</label>
                  <select
                    className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    disabled={!selectedSubCategory}
                    onBlur={handleEventSelection}
                    required
                  >
                    <option value="">Select Sub Category</option>
                    {getGenders().map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Selected Event Display */}
                {selectedSport && selectedSubCategory && selectedGender && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm font-medium text-blue-800">
                      Selected Event:{" "}
                      <span className="font-bold">
                        {selectedSport} - {selectedSubCategory} ({selectedGender})
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Any Health Issues</label>
              <input
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                value={formData.healthIssues || ""}
                name="healthIssues"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Meal Preference</label>
              <select
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                value={formData.mealType}
                name="mealType"
                onChange={handleChange}
                required
              >
                <option value="Veg">VEG</option>
                <option value="Non-Veg">NON VEG</option>
                <option value="Both">BOTH</option>
                <option value="None">NONE</option>
              </select>
            </div>
            {/* File Upload Section */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col border-2 border-dashed border-gray-300 rounded-lg p-8 items-center w-full bg-gray-50 hover:bg-gray-100 transition-colors">
                <label className="font-semibold mb-4 text-lg text-gray-700">Profile Photo</label>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="mb-4 text-sm cursor-pointer"
                  name="profilePicture"
                  onChange={handleFileChange}
                />
                {formData.profilePicture && (
                  <span className="text-blue-600 underline text-sm mb-2">
                    {formData.profilePicture &&
                    typeof formData.profilePicture === "object" &&
                    "name" in formData.profilePicture
                      ? formData.profilePicture.name
                      : "View"}{" "}
                    (preview)
                  </span>
                )}
                <span className="text-sm text-gray-500">Format: png, jpeg (5MB max)</span>
              </div>
              <div className="flex flex-col border-2 border-dashed border-gray-300 rounded-lg p-8 items-center w-full bg-gray-50 hover:bg-gray-100 transition-colors">
                <label className="font-semibold mb-4 text-lg text-gray-700">Employee ID</label>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  className="mb-4 text-sm cursor-pointer"
                  name="employeeIDCard"
                  onChange={handleFileChange}
                />
                {formData.employeeIDCard && (
                  <span className="text-blue-600 underline text-sm mb-2">
                    {formData.employeeIDCard &&
                    typeof formData.employeeIDCard === "object" &&
                    "name" in formData.employeeIDCard
                      ? formData.employeeIDCard.name
                      : "View"}{" "}
                    (preview)
                  </span>
                )}
                <span className="text-sm text-gray-500">Format: png, jpeg (5MB max)</span>
              </div>
            </div>
            {/* Save Button */}
            <div className="col-span-1 md:col-span-2 flex justify-center mt-8 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-white px-12 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !registrationOpen || checkingRegistrationStatus}
              >
                {loading
                  ? "Registering..."
                  : checkingRegistrationStatus
                  ? "Checking..."
                  : !registrationOpen
                  ? "Registration Closed"
                  : "Register Player"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
