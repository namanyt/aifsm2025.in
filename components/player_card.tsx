"use client";

import { Player } from "@/lib/types";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Edit } from "lucide-react";

import { sportsData, bloodGroups } from "@/lib/types";
import { REGISTRATION_LIMITS, TEAM_EVENT_KEYWORDS } from "@/lib/constants";

const tShirtSizes = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL",
  XXXL: "XXXL",
};

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { updatePlayer, getPlayer } from "@/lib/db/pb";
import { DATABASE_URL, LOCAL_DATABASE_URL } from "@/lib/constants";
import { deletePlayer } from "@/lib/db/pb";
import { toast } from "sonner";
import { TravelPlanDialog } from "./travelPlanDialog";

export function PlayerCard({
  player,
  index,
  onUpdate,
  onDelete,
  isAdmin = false,
  showRegisteredBy = false,
}: {
  player: Player;
  index: number;
  onUpdate?: (updatedPlayer: Player) => void;
  onDelete?: (playerId: string) => void;
  isAdmin?: boolean;
  showRegisteredBy?: boolean;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [travelPlanDialogOpen, setTravelPlanDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const [formData, setFormData] = useState({ ...player });
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [aadharError, setAadharError] = useState("");

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }

    return age;
  };

  // Handle date of birth change
  const handleDateOfBirthChange = (date: Date | undefined) => {
    if (date) {
      const age = calculateAge(date);
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: date,
        age: age,
      }));
    }
  };

  // Helper function to check if event is team event
  const isTeamEvent = (event: string): boolean => {
    return TEAM_EVENT_KEYWORDS.some((keyword) => event.toLowerCase().includes(keyword.toLowerCase()));
  };

  // Count current solo and team events
  const getEventCounts = (events: string[], newEvent?: string) => {
    const allEvents = newEvent ? [...events, newEvent] : events;
    const soloEvents = allEvents.filter((event) => !isTeamEvent(event)).length;
    const teamEvents = allEvents.filter((event) => isTeamEvent(event)).length;
    return { soloEvents, teamEvents };
  };

  // Add event to selection
  const addEvent = () => {
    if (selectedSport && selectedSubCategory && selectedGender) {
      const newEvent = `${selectedSport} - ${selectedSubCategory} (${selectedGender})`;

      // Check if event already selected
      if (selectedEvents.includes(newEvent)) {
        toast.error("This event is already selected");
        return;
      }

      // Check limits
      const { soloEvents, teamEvents } = getEventCounts(selectedEvents, newEvent);
      const isNewEventTeam = isTeamEvent(newEvent);

      if (isNewEventTeam && teamEvents > REGISTRATION_LIMITS.MAX_TEAM_EVENTS) {
        toast.error(`Maximum ${REGISTRATION_LIMITS.MAX_TEAM_EVENTS} team events allowed`);
        return;
      }

      if (!isNewEventTeam && soloEvents > REGISTRATION_LIMITS.MAX_SOLO_EVENTS) {
        toast.error(`Maximum ${REGISTRATION_LIMITS.MAX_SOLO_EVENTS} solo events allowed`);
        return;
      }

      const updatedEvents = [...selectedEvents, newEvent];
      setSelectedEvents(updatedEvents);
      setFormData((prev) => ({
        ...prev,
        events: updatedEvents,
        event: updatedEvents.join(", "), // For backward compatibility
      }));

      // Reset dropdowns
      setSelectedSport("");
      setSelectedSubCategory("");
      setSelectedGender("");
    }
  };

  // Remove event from selection
  const removeEvent = (eventToRemove: string) => {
    const updatedEvents = selectedEvents.filter((event) => event !== eventToRemove);
    setSelectedEvents(updatedEvents);
    setFormData((prev) => ({
      ...prev,
      events: updatedEvents,
      event: updatedEvents.join(", "),
    }));
  };

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

  // Use effect to update formData when player prop changes
  useEffect(() => {
    setFormData({ ...player });
    // Initialize selectedEvents from player data
    if (player.events && Array.isArray(player.events)) {
      setSelectedEvents(player.events);
    } else if (player.event) {
      // Handle backward compatibility - split comma-separated events
      const events = player.event.split(", ").filter((e) => e.trim());
      setSelectedEvents(events);
    }
  }, [player]);

  // Reset subcategory and gender when sport changes
  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
    setSelectedSubCategory("");
    setSelectedGender("");
  };

  // Reset gender when subcategory changes
  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setSelectedGender("");
  };

  // Get available subcategories for selected sport
  const getSubCategories = () => {
    if (!selectedSport || !sportsData[selectedSport]) return [];
    return Object.keys(sportsData[selectedSport]);
  };

  // Get available genders for selected sport and subcategory
  const getGenders = () => {
    if (!selectedSport || !selectedSubCategory || !sportsData[selectedSport]?.[selectedSubCategory]) return [];
    return sportsData[selectedSport][selectedSubCategory];
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "aadhar") {
      // Only allow digits and limit to 12 characters
      const cleanValue = value.replace(/\D/g, "").slice(0, 12);
      setFormData((prev) => ({ ...prev, [name]: cleanValue }));

      // Validate Aadhar if it's 12 digits
      if (cleanValue.length === 12) {
        const error = validateAadhar(cleanValue);
        setAadharError(error);
      } else {
        setAadharError(cleanValue.length > 0 ? "Aadhar number must be 12 digits" : "");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // Handle event selection (composed event string)
  const handleEventSelection = () => {
    if (selectedSport && selectedSubCategory && selectedGender) {
      setFormData((prev) => ({
        ...prev,
        event: `${selectedSport} - ${selectedSubCategory} (${selectedGender})`,
      }));
    }
  };

  // Save handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Aadhar before submission
    if (formData.aadhar) {
      const aadharValidationError = validateAadhar(formData.aadhar);
      if (aadharValidationError) {
        setAadharError(aadharValidationError);
        toast.error("Please enter a valid Aadhar number");
        return;
      }
    }

    setLoading(true);
    try {
      await updatePlayer(player.id, formData);
      setViewMode(true);
      toast.success("Player updated successfully!");
      // Update parent component's state if callback provided
      if (onUpdate) {
        onUpdate({ ...player, ...formData });
      }
    } catch (err) {
      toast.error("Failed to update player");
    } finally {
      setLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await deletePlayer(player.id);
        setDialogOpen(false);
        toast.success("Player deleted successfully!");
        // Update parent component's state if callback provided
        if (onDelete) {
          onDelete(player.id);
        }
      } catch (err) {
        toast.error("Failed to delete player");
      }
    }
  };

  // Open dialog in view mode (edit mode can be toggled)
  const openDialog = () => {
    setViewMode(true); // Always start in view mode
    setDialogOpen(true);
    setFormData({ ...player });
    // Parse event string to set dropdowns
    if (player.event) {
      const match = player.event.match(/^(.*?) - (.*?) \((.*?)\)$/);
      if (match) {
        setSelectedSport(match[1]);
        setSelectedSubCategory(match[2]);
        setSelectedGender(match[3]);
      } else {
        setSelectedSport("");
        setSelectedSubCategory("");
        setSelectedGender("");
      }
    }
  };

  // Toggle between view and edit modes
  const toggleEditMode = () => {
    setViewMode(!viewMode);
    if (viewMode) {
      // Entering edit mode - reset form data and clear errors
      setFormData({ ...player });
      setAadharError("");
      // Initialize selectedEvents
      if (player.events && Array.isArray(player.events)) {
        setSelectedEvents(player.events);
      } else if (player.event) {
        const events = player.event.split(", ").filter((e) => e.trim());
        setSelectedEvents(events);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between h-full">
      <div>
        {/* Admin badge */}
        {isAdmin && (
          <div className="flex justify-between items-center mb-2">
            <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">ADMIN VIEW</span>
            {showRegisteredBy && (player as any).expand?.RegisteredBy && (
              <span className="text-xs text-gray-500">
                Registered by:{" "}
                {(player as any).expand.RegisteredBy.username || (player as any).expand.RegisteredBy.email}
              </span>
            )}
          </div>
        )}

        <h2 className="text-xl font-bold text-sky-900 mb-2">
          {index}. {player.name}
        </h2>
        <div className="text-gray-600 mb-1">
          <span className="font-semibold">Events:</span>
          {player.events && Array.isArray(player.events) && player.events.length > 0 ? (
            <div className="mt-1 space-y-1">
              {player.events.slice(0, 2).map((event, idx) => (
                <div key={idx} className="text-sm flex items-center">
                  {isTeamEvent(event) && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-1 py-0.5 rounded mr-1">TEAM</span>
                  )}
                  <span className="truncate">{event}</span>
                </div>
              ))}
              {player.events.length > 2 && (
                <div className="text-xs text-gray-500">+{player.events.length - 2} more events</div>
              )}
            </div>
          ) : (
            <span className="text-sm"> {player.event || "No events selected"}</span>
          )}
        </div>
        {isAdmin && (
          <div className="text-sm text-gray-500 mt-2 space-y-1">
            <p>
              <span className="font-semibold">Organization:</span> {player.organisation}
            </p>
            <p>
              <span className="font-semibold">Aadhar:</span> ****
              {player.aadhar && typeof player.aadhar === "string" ? player.aadhar.slice(-4) : "N/A"}
            </p>
            <p>
              <span className="font-semibold">Mobile:</span> {player.mobile}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4 gap-2">
        <Button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer flex-1"
          onClick={() => setTravelPlanDialogOpen(true)}
        >
          Upload Travel Plan
        </Button>
        <Button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer flex-1"
          onClick={openDialog}
        >
          View and Edit
        </Button>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="min-w-[90vw] max-w-[95vw] w-full max-h-[95vh] overflow-y-auto p-6">
            <DialogHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl font-bold">Player Profile</DialogTitle>
                  <DialogDescription className="text-lg">All details for {player.name}</DialogDescription>
                </div>

                {/* Edit Toggle Button - More prominent position */}
                <Button
                  type="button"
                  variant={viewMode ? "outline" : "default"}
                  size="default"
                  className={`px-4 py-2 mr-15 -mt-[1.7rem] cursor-pointer rounded-lg font-medium transition-all duration-200 ${
                    viewMode
                      ? "border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  onClick={toggleEditMode}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </Button>
              </div>
            </DialogHeader>
            <form
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-3 text-base text-gray-800"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Organization</label>
                <input
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${
                    viewMode ? "cursor-default" : "cursor-pointer"
                  }`}
                  value={formData.organisation}
                  name="organisation"
                  readOnly={viewMode}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Enter Name</label>
                <input
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${
                    viewMode ? "cursor-default" : "cursor-pointer"
                  }`}
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Date of Birth</label>
                {viewMode ? (
                  <input
                    className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-default"
                    value={formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Not set"}
                    readOnly
                  />
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer h-auto justify-start text-left font-normal hover:bg-gray-100"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Select date of birth"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border border-gray-300 shadow-lg" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.dateOfBirth}
                        onSelect={handleDateOfBirthChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                        className="rounded-md"
                        captionLayout="dropdown"
                        fromYear={1900}
                        toYear={new Date().getFullYear()}
                      />
                    </PopoverContent>
                  </Popover>
                )}
                <div className="text-sm text-gray-500">Age: {formData.age} years</div>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Select Blood Group</label>
                <select
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${
                    viewMode ? "cursor-default" : "cursor-pointer"
                  }`}
                  value={formData.bloodGroup}
                  name="bloodGroup"
                  onChange={handleChange}
                  disabled={viewMode}
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
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${
                    viewMode ? "cursor-default" : "cursor-pointer"
                  }`}
                  value={formData.tShirtSize || ""}
                  name="tShirtSize"
                  onChange={handleChange}
                  disabled={viewMode}
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
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${
                    viewMode ? "cursor-default" : "cursor-pointer"
                  }`}
                  value={formData.mobile}
                  name="mobile"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Enter Aadhar Card</label>
                <input
                  className={`bg-gray-50 rounded-md px-4 py-3 border ${
                    aadharError && !viewMode ? "border-red-500" : "border-gray-300"
                  } ${viewMode ? "cursor-default" : "cursor-pointer"}`}
                  value={formData.aadhar}
                  name="aadhar"
                  onChange={handleChange}
                  readOnly={viewMode}
                  type="text"
                  placeholder="Enter 12-digit Aadhar number"
                  maxLength={12}
                />
                {aadharError && !viewMode && <span className="text-red-500 text-sm">{aadharError}</span>}
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Enter Employee ID</label>
                <input
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${
                    viewMode ? "cursor-default" : "cursor-pointer"
                  }`}
                  value={formData.employeeId}
                  name="employeeId"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Events</label>
                {viewMode ? (
                  <div className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300">
                    {selectedEvents.length > 0 ? (
                      <div className="space-y-2">
                        {selectedEvents.map((event, index) => (
                          <div key={index} className="flex items-center">
                            {isTeamEvent(event) && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">TEAM</span>
                            )}
                            <span className="text-sm text-gray-700">{event}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500">No events selected</span>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {/* Sport Category Dropdown */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-gray-600">Sport Category</label>
                      <select
                        className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                        value={selectedSport}
                        onChange={(e) => handleSportChange(e.target.value)}
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
                        className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                        value={selectedSubCategory}
                        onChange={(e) => handleSubCategoryChange(e.target.value)}
                        disabled={!selectedSport}
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
                        className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                        value={selectedGender}
                        onChange={(e) => setSelectedGender(e.target.value)}
                        disabled={!selectedSubCategory}
                      >
                        <option value="">Select Sub Category</option>
                        {getGenders().map((gender) => (
                          <option key={gender} value={gender}>
                            {gender}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Add Event Button */}
                    {selectedSport && selectedSubCategory && selectedGender && (
                      <div className="mt-2">
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md mb-2">
                          <p className="text-sm font-medium text-blue-800">
                            Ready to add:{" "}
                            <span className="font-bold">
                              {selectedSport} - {selectedSubCategory} ({selectedGender})
                            </span>
                          </p>
                        </div>
                        <Button
                          type="button"
                          onClick={addEvent}
                          className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                        >
                          Add Event
                        </Button>
                      </div>
                    )}

                    {/* Current Event Limits Display */}
                    {selectedEvents.length > 0 && (
                      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">Event Limits:</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Solo Events: </span>
                            <span
                              className={`${
                                getEventCounts(selectedEvents).soloEvents >= REGISTRATION_LIMITS.MAX_SOLO_EVENTS
                                  ? "text-red-600 font-bold"
                                  : "text-green-600"
                              }`}
                            >
                              {getEventCounts(selectedEvents).soloEvents}/{REGISTRATION_LIMITS.MAX_SOLO_EVENTS}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Team Events: </span>
                            <span
                              className={`${
                                getEventCounts(selectedEvents).teamEvents >= REGISTRATION_LIMITS.MAX_TEAM_EVENTS
                                  ? "text-red-600 font-bold"
                                  : "text-green-600"
                              }`}
                            >
                              {getEventCounts(selectedEvents).teamEvents}/{REGISTRATION_LIMITS.MAX_TEAM_EVENTS}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Selected Events List */}
                    {selectedEvents.length > 0 && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                        <span className="font-medium text-green-800">Selected Events ({selectedEvents.length}):</span>
                        <ul className="mt-2 space-y-2">
                          {selectedEvents.map((event, index) => (
                            <li key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                              <div className="flex items-center">
                                <span className="text-sm text-gray-700">
                                  {isTeamEvent(event) && (
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                                      TEAM
                                    </span>
                                  )}
                                  {event}
                                </span>
                              </div>
                              <Button
                                type="button"
                                onClick={() => removeEvent(event)}
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-300 hover:bg-red-50"
                              >
                                Remove
                              </Button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Any Health Issues</label>
                <input
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${
                    viewMode ? "cursor-default" : "cursor-pointer"
                  }`}
                  value={formData.healthIssues || ""}
                  name="healthIssues"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Meal Preference</label>
                <select
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${
                    viewMode ? "cursor-default" : "cursor-pointer"
                  }`}
                  value={formData.mealType}
                  name="mealType"
                  onChange={handleChange}
                  disabled={viewMode}
                >
                  <option value="Veg">VEG</option>
                  <option value="Non-Veg">NON VEG</option>
                  <option value="Both">BOTH</option>
                  <option value="None">NONE</option>
                </select>
              </div>

              {/* File Upload Section */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
                {/* Profile Picture Preview or Upload */}
                <div className="flex flex-col border-2 border-dashed border-gray-300 rounded-lg p-8 items-center w-full bg-gray-50 hover:bg-gray-100 transition-colors">
                  <label className="font-semibold mb-4 text-lg text-gray-700">Profile Photo</label>
                  {viewMode ? (
                    formData.profilePicture ? (
                      <Image
                        src={
                          typeof formData.profilePicture === "string"
                            ? `${process.env.DATABASE_URL || DATABASE_URL}/api/files/players/${formData.id}/${
                                formData.profilePicture
                              }`
                            : URL.createObjectURL(formData.profilePicture)
                        }
                        alt="Profile Preview"
                        className="w-32 object-cover rounded mb-4 border"
                        width={128}
                        height={128}
                      />
                    ) : (
                      <span className="text-gray-400 mb-4">No profile photo uploaded</span>
                    )
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/png,image/jpeg"
                        className="mb-4 text-sm cursor-pointer"
                        name="profilePicture"
                        onChange={handleFileChange}
                        disabled={viewMode}
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
                    </>
                  )}
                </div>
                {/* Employee ID Preview or Upload */}
                <div className="flex flex-col border-2 border-dashed border-gray-300 rounded-lg p-8 items-center w-full bg-gray-50 hover:bg-gray-100 transition-colors">
                  <label className="font-semibold mb-4 text-lg text-gray-700">Employee ID</label>
                  {viewMode ? (
                    formData.employeeIDCard ? (
                      <Image
                        src={
                          typeof formData.employeeIDCard === "string"
                            ? `${process.env.DATABASE_URL || DATABASE_URL}/api/files/players/${formData.id}/${
                                formData.employeeIDCard
                              }`
                            : URL.createObjectURL(formData.employeeIDCard)
                        }
                        alt="Employee ID Preview"
                        className="w-32 object-cover rounded mb-4 border"
                        width={128}
                        height={128}
                      />
                    ) : (
                      <span className="text-gray-400 mb-4">No employee ID uploaded</span>
                    )
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="image/png,image/jpeg"
                        className="mb-4 text-sm cursor-pointer"
                        name="employeeIDCard"
                        onChange={handleFileChange}
                        disabled={viewMode}
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
                    </>
                  )}
                </div>
              </div>

              {/* Save & Remove Buttons - Only show in edit mode */}
              {!viewMode && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 flex justify-between mt-6 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg cursor-pointer"
                    onClick={handleDelete}
                  >
                    Remove Player
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg cursor-pointer"
                      onClick={() => {
                        setViewMode(true);
                        setFormData({ ...player }); // Reset form data
                        setAadharError(""); // Clear validation errors
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-lg cursor-pointer"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Travel Plan Dialog */}
      <TravelPlanDialog
        player={player}
        isOpen={travelPlanDialogOpen}
        onClose={() => setTravelPlanDialogOpen(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
}
