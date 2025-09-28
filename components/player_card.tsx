"use client";

import { Player } from "@/lib/types";
import { Button } from "./ui/button";
import { useState } from "react";
import Image from "next/image";

// Demo sports data structure
export type SportsDataType = {
  [sport: string]: {
    [subCategory: string]: string[];
  };
};

export const sportsData: SportsDataType = {
  Athletics: {
    "100m": ["Men", "Women", "Open"],
    "200m": ["Men", "Women", "Open"],
    "400m": ["Men", "Women", "Open"],
    "800m": ["Men", "Women", "Open"],
    "1500m": ["Men", "Women", "Open"],
    "1500m Walk": ["Men", "Women", "Open"],
    "5000m": ["Men", "Women", "Open"],
    "10000m": ["Men", "Women", "Open"],
    Marathon: ["Men", "Women", "Open"],
    "High Jump": ["Men", "Women", "Open"],
    "Long Jump": ["Men", "Women", "Open"],
    "Shot Put": ["Men", "Women", "Open"],
    "Discus Throw": ["Men", "Women", "Open"],
    "Javelin Throw": ["Men", "Women", "Open"],
  },
  Swimming: {
    "50m Freestyle": ["Men", "Women", "Open"],
    "100m Freestyle": ["Men", "Women", "Open"],
    "200m Freestyle": ["Men", "Women", "Open"],
    "50m Backstroke": ["Men", "Women", "Open"],
    "100m Backstroke": ["Men", "Women", "Open"],
    "50m Breaststroke": ["Men", "Women", "Open"],
    "100m Breaststroke": ["Men", "Women", "Open"],
    "50m Butterfly": ["Men", "Women", "Open"],
    "100m Butterfly": ["Men", "Women", "Open"],
    "200m Individual Medley": ["Men", "Women", "Open"],
  },
  Basketball: {
    "5v5": ["Men", "Women", "Mixed"],
    "3v3": ["Men", "Women", "Mixed"],
  },
  Volleyball: {
    Indoor: ["Men", "Women", "Mixed"],
    Beach: ["Men", "Women", "Mixed"],
  },
  Badminton: {
    Singles: ["Men", "Women"],
    Doubles: ["Men", "Women", "Mixed"],
    "Mixed Doubles": ["Open"],
  },
  Tennis: {
    Singles: ["Men", "Women"],
    Doubles: ["Men", "Women", "Mixed"],
  },
  Football: {
    "11v11": ["Men", "Women"],
    "7v7": ["Men", "Women", "Mixed"],
  },
  Cricket: {
    T20: ["Men", "Women"],
    "One Day": ["Men", "Women"],
    "Test Match": ["Men", "Women"],
  },
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

export function PlayerCard({ player, index }: { player: Player; index: number }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [formData, setFormData] = useState({ ...player });
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    try {
      await updatePlayer(player.id, formData);
      setDialogOpen(false);
    } catch (err) {
      alert("Failed to update player");
    }
  };

  // Open dialog in edit or view mode
  const openDialog = (mode: "edit" | "view") => {
    setViewMode(mode === "view");
    setDialogOpen(true);
    setFormData({ ...player });
    // Optionally parse event string to set dropdowns
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
          className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            alert(`Upload Travel Plan for ${player.name}`);
          }}
        >
          Upload Travel Plan
        </Button>
        <Button
          className="cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded-lg border border-gray-300"
          onClick={() => openDialog("view")}
        >
          View
        </Button>
        <Button
          className="cursor-pointer bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          onClick={() => openDialog("edit")}
        >
          Edit
        </Button>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="min-w-[60vw] w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader className="pb-6">
              <DialogTitle className="text-2xl font-bold">Player Profile</DialogTitle>
              <DialogDescription className="text-lg">All details for {player.name}</DialogDescription>
            </DialogHeader>
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-base text-gray-800"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Organization</label>
                <input
                  className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                  value={formData.organisation}
                  name="organisation"
                  readOnly={viewMode}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Enter Name</label>
                <input
                  className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Enter Age</label>
                <input
                  className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                  type="number"
                  value={formData.age}
                  name="age"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Enter Blood Group</label>
                <input
                  className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                  value={formData.bloodGroup}
                  name="bloodGroup"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Enter Mobile Number</label>
                <input
                  className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                  value={formData.mobile}
                  name="mobile"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Enter Aadhar Card</label>
                <input
                  className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                  value={formData.aadhar}
                  name="aadhar"
                  onChange={handleChange}
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Enter Employee ID</label>
                <input
                  className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
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
                      className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
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
                      className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
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

                  {/* Gender Category Dropdown */}
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-gray-600">Gender Category</label>
                    <select
                      className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      disabled={!selectedSubCategory || viewMode}
                      onBlur={handleEventSelection}
                    >
                      <option value="">Select Gender Category</option>
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
                  readOnly={viewMode}
                />
              </div>
              <div className="flex flex-col w-full space-y-2">
                <label className="font-semibold text-gray-700">Meal Preference</label>
                <select
                  className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300"
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
                            ? `${process.env.DATABASE_URL || "http://192.168.29.6:8090"}/api/files/players/${
                                formData.id
                              }/${formData.profilePicture}`
                            : URL.createObjectURL(formData.profilePicture)
                        }
                        alt="Profile Preview"
                        className="w-32 h-32 object-cover rounded mb-4 border"
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
                        className="mb-4 text-sm"
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
                            ? `${process.env.DATABASE_URL || "http://192.168.29.6:8090"}/api/files/players/${
                                formData.id
                              }/${formData.employeeIDCard}`
                            : URL.createObjectURL(formData.employeeIDCard)
                        }
                        alt="Employee ID Preview"
                        className="w-32 h-20 object-cover rounded mb-4 border"
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
                        className="mb-4 text-sm"
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

              {/* Save Button */}
              {!viewMode && (
                <div className="col-span-1 md:col-span-2 flex justify-center mt-8 pt-6 border-t border-gray-200">
                  <Button
                    type="submit"
                    className="cursor-pointer bg-sky-600 hover:bg-sky-700 text-white px-12 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg"
                  >
                    Save and Close
                  </Button>
                </div>
              )}
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
