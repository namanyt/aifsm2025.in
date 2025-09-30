"use client";

import { Player } from "@/lib/types";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Edit } from "lucide-react";

import { sportsData, bloodGroups } from "@/lib/types";

const tShirtSizes = {
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL",
  XXXL: "XXXL"
};

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { updatePlayer, getPlayer, db } from "@/lib/db/pb";
import { deletePlayer } from "@/lib/db/pb";
import { toast } from "sonner";
import { TravelPlanDialog } from "./travelPlanDialog";

export function PlayerCard({
  player,
  index,
  onUpdate,
  onDelete
}: {
  player: Player;
  index: number;
  onUpdate?: (updatedPlayer: Player) => void;
  onDelete?: (playerId: string) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [travelPlanDialogOpen, setTravelPlanDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const [formData, setFormData] = useState({ ...player });
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [aadharError, setAadharError] = useState("");

  // Validate Aadhar number
  const validateAadhar = (aadharNumber: string): string => {
    // Remove any spaces or special characters
    const cleanAadhar = aadharNumber.replace(/\D/g, '');

    if (cleanAadhar.length !== 12) {
      return "Aadhar number must be exactly 12 digits";
    }

    if (cleanAadhar.startsWith('0') || cleanAadhar.startsWith('1')) {
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
      const cleanValue = value.replace(/\D/g, '').slice(0, 12);
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
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-bold text-sky-900 mb-2">
          {index}. {player.name}
        </h2>
        <p className="text-gray-600 mb-1">
          <span className="font-semibold">Event:</span> {player.event}
        </p>
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
          <DialogContent className="min-w-[60vw] w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-6">
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
                  className={`px-4 py-2 mr-15 -mt-[1.7rem] cursor-pointer rounded-lg font-medium transition-all duration-200 ${viewMode
                    ? "border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  onClick={toggleEditMode}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {/* {viewMode ? "View Mode" : "Edit Mode"} */}
                  Edit Details
                </Button>
              </div>
            </DialogHeader>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-base text-gray-800"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Organization</label>
                <input
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
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
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
                    }`}
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Enter Age</label>
                <input
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
                    }`}
                  type="number"
                  value={formData.age}
                  name="age"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Select Blood Group</label>
                <select
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
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
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
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
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
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
                  className={`bg-gray-50 rounded-md px-4 py-3 border ${aadharError && !viewMode ? 'border-red-500' : 'border-gray-300'
                    } ${viewMode ? "cursor-default" : "cursor-pointer"}`}
                  value={formData.aadhar}
                  name="aadhar"
                  onChange={handleChange}
                  readOnly={viewMode}
                  type="text"
                  placeholder="Enter 12-digit Aadhar number"
                  maxLength={12}
                />
                {aadharError && !viewMode && (
                  <span className="text-red-500 text-sm">{aadharError}</span>
                )}
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Enter Employee ID</label>
                <input
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
                    }`}
                  value={formData.employeeId}
                  name="employeeId"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Select Event</label>
                <div className="grid grid-cols-1 gap-3">
                  {/* Sport Category Dropdown */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-600">Sport Category</label>
                    <select
                      className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
                        }`}
                      value={selectedSport}
                      onChange={(e) => handleSportChange(e.target.value)}
                      disabled={viewMode}
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
                      className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
                        }`}
                      value={selectedSubCategory}
                      onChange={(e) => handleSubCategoryChange(e.target.value)}
                      disabled={!selectedSport || viewMode}
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
                      className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
                        }`}
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      disabled={!selectedSubCategory || viewMode}
                      onBlur={handleEventSelection}
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
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
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
                  className={`bg-gray-50 rounded-md px-4 py-3 border border-gray-300 ${viewMode ? "cursor-default" : "cursor-pointer"
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
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 pt-6 border-t border-gray-200">
                {/* Profile Picture Preview or Upload */}
                <div className="flex flex-col border-2 border-dashed border-gray-300 rounded-lg p-8 items-center w-full bg-gray-50 hover:bg-gray-100 transition-colors">
                  <label className="font-semibold mb-4 text-lg text-gray-700">Profile Photo</label>
                  {viewMode ? (
                    formData.profilePicture ? (
                      <Image
                        src={
                          typeof formData.profilePicture === "string"
                            ? `${process.env.DATABASE_URL || db}/api/files/players/${formData.id
                            }/${formData.profilePicture}`
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
                            ? `${process.env.DATABASE_URL || db}/api/files/players/${formData.id
                            }/${formData.employeeIDCard}`
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
                <div className="col-span-1 md:col-span-2 flex justify-between mt-8 pt-6 border-t border-gray-200">
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
