"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createPlayer } from "@/lib/db/pb";
import { sportsData } from "@/lib/types";
import type { Player } from "@/lib/types";
import { toast } from "sonner";

const initialPlayerState: Omit<Player, "id"> = {
  organisation: "",
  name: "",
  age: 18,
  bloodGroup: "",
  mobile: "",
  aadhar: 0,
  employeeId: "",
  event: "",
  healthIssues: "",
  mealType: "Veg",
  profilePicture: undefined as any,
  employeeIDCard: undefined as any,
};

export function AddPlayerDialog({ userId }: { userId: string }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ ...initialPlayerState });
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [loading, setLoading] = useState(false);

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    setLoading(true);
    try {
      await createPlayer({ ...formData, RegisteredBy: userId });
      setDialogOpen(false);
      setFormData({ ...initialPlayerState });
      setSelectedSport("");
      setSelectedSubCategory("");
      setSelectedGender("");
      // Optionally: refresh page or show notification
      toast("Player registered successfully!");
      window.location.reload();
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
        onClick={() => setDialogOpen(true)}
      >
        Register New Player
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="min-w-[60vw] w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-6">
            <DialogTitle className="text-2xl font-bold">Register New Player</DialogTitle>
            <DialogDescription className="text-lg">Enter all details for the new player</DialogDescription>
          </DialogHeader>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-base text-gray-800"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Organization</label>
              <input
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                value={formData.organisation}
                name="organisation"
                onChange={handleChange}
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
              <label className="font-semibold text-gray-700">Enter Blood Group</label>
              <input
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                value={formData.bloodGroup}
                name="bloodGroup"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Enter Mobile Number</label>
              <input
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                value={formData.mobile}
                name="mobile"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col w-full space-y-2">
              <label className="font-semibold text-gray-700">Enter Aadhar Card</label>
              <input
                className="bg-gray-50 rounded-md px-4 py-3 border border-gray-300 cursor-pointer"
                value={formData.aadhar}
                name="aadhar"
                onChange={handleChange}
                required
              />
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
                className="bg-sky-600 hover:bg-sky-700 text-white px-12 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg cursor-pointer"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Player"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
