"use client";

import { Player, TravelPlanData } from "@/lib/types";
import { Button } from "./ui/button";
import { useState } from "react";
import { Edit, Upload, FileText, Image as ImageIcon, Trash2 } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { updatePlayer } from "@/lib/db/pb";
import { LOCAL_DATABASE_URL } from "@/lib/constants";
import { toast } from "sonner";

export function TravelPlanDialog({
  player,
  isOpen,
  onClose,
  onUpdate,
}: {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (updatedPlayer: Player) => void;
}) {
  const [viewMode, setViewMode] = useState(true);
  const [formData, setFormData] = useState<TravelPlanData>({
    modeOfTravel: player.modeOfTravel || "",
    travelPlan: player.travelPlan || undefined,
    travelPlanName: player.travelPlanName || "",
    travelPlanType: player.travelPlanType || "",
    lastUpdated: player.lastUpdated || "",
  });
  const [loading, setLoading] = useState(false);
  const [removing, setRemoving] = useState(false);

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        travelPlan: file,
        travelPlanName: file.name,
        travelPlanType: file.type,
        lastUpdated: new Date().toISOString(),
      }));
    }
  };

  // Handle file removal
  const handleFileRemove = async () => {
    if (!window.confirm("Are you sure you want to remove this travel plan file?")) {
      return;
    }

    setRemoving(true);
    try {
      // Update formData state immediately
      const updatedData = {
        ...formData,
        travelPlan: undefined,
        travelPlanName: "",
        travelPlanType: "",
        lastUpdated: new Date().toISOString(),
      };

      setFormData(updatedData);

      // Save to database immediately
      await updatePlayer(player.id, {
        ...updatedData,
        travelPlan: null, // Use null to properly remove the file from database
      } as any);

      toast.success("Travel plan file removed successfully!");

      // Update parent component's state if callback provided
      if (onUpdate) {
        onUpdate({ ...player, ...updatedData });
      }
    } catch (err) {
      toast.error("Failed to remove travel plan file");
      // Revert the state change if API call failed
      setFormData((prev) => ({
        ...prev,
        travelPlan: player.travelPlan || undefined,
        travelPlanName: player.travelPlanName || "",
        travelPlanType: player.travelPlanType || "",
        lastUpdated: player.lastUpdated || "",
      }));
    } finally {
      setRemoving(false);
    }
  };

  // Toggle between view and edit modes
  const toggleEditMode = () => {
    setViewMode(!viewMode);
  };

  // Save handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update player with travel plan data
      await updatePlayer(player.id, {
        ...formData,
        travelPlan: formData.travelPlan,
      } as any);
      setViewMode(true);
      toast.success("Travel plan updated successfully!");
      // Update parent component's state if callback provided
      if (onUpdate) {
        onUpdate({ ...player, ...formData });
      }
      // Don't close dialog, just switch to view mode
    } catch (err) {
      toast.error("Failed to update travel plan");
    } finally {
      setLoading(false);
    }
  };

  // Get file icon based on type
  const getFileIcon = (fileType?: string) => {
    if (!fileType) return <FileText className="h-8 w-8 text-gray-400" />;
    if (fileType.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-blue-500" />;
    if (fileType === "application/pdf") return <FileText className="h-8 w-8 text-red-500" />;
    return <FileText className="h-8 w-8 text-gray-400" />;
  };

  // Get file preview URL
  const getFilePreviewUrl = () => {
    if (!formData.travelPlan) return null;
    if (typeof formData.travelPlan === "string") {
      // If it's a string (existing file), construct the API URL
      return `${process.env.DATABASE_URL || LOCAL_DATABASE_URL}/api/files/players/${player.id}/${formData.travelPlan}`;
    } else {
      // If it's a File object (new upload), create object URL
      return URL.createObjectURL(formData.travelPlan);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-[60vw] w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">Travel Plan</DialogTitle>
              <DialogDescription className="text-lg">Travel plan for {player.name}</DialogDescription>
            </div>

            {/* Edit Toggle Button */}
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
              Edit Travel Plan
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Player Info Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Player Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {player.name}
              </div>
              <div>
                <span className="font-medium">Event:</span> {player.event}
              </div>
              <div>
                <span className="font-medium">Organization:</span> {player.organisation}
              </div>
              <div>
                <span className="font-medium">Employee ID:</span> {player.employeeId}
              </div>
            </div>
          </div>

          {/* Mode of Travel Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Mode of Travel</h3>

            {viewMode ? (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-gray-600">{formData.modeOfTravel || "No mode of travel specified"}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <label htmlFor="modeOfTravel" className="block text-sm font-medium text-gray-700">
                  Mode of Travel
                </label>
                <input
                  type="text"
                  id="modeOfTravel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Flight, Train, Bus, Car, etc."
                  value={formData.modeOfTravel || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, modeOfTravel: e.target.value }))}
                />
              </div>
            )}
          </div>

          {/* Travel Plan Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Travel Plan Document</h3>

            {viewMode ? (
              // View Mode - Show existing travel plan
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50">
                {formData.travelPlan ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(formData.travelPlanType)}
                      <div className="text-center">
                        <p className="font-medium text-gray-700">{formData.travelPlanName}</p>
                        <p className="text-sm text-gray-500">
                          {formData.travelPlanType?.includes("pdf") ? "PDF Document" : "Image File"}
                        </p>
                        {formData.lastUpdated && (
                          <p className="text-xs text-gray-400">
                            Last updated: {new Date(formData.lastUpdated).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Preview for images */}
                    {formData.travelPlanType?.startsWith("image/") && (
                      <div className="mt-4">
                        <img
                          src={getFilePreviewUrl() || ""}
                          alt="Travel Plan Preview"
                          className="max-w-full max-h-64 object-contain rounded border"
                        />
                      </div>
                    )}

                    {/* Download/View and Remove buttons */}
                    <div className="flex gap-3 mt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const url = getFilePreviewUrl();
                          if (url) window.open(url, "_blank");
                        }}
                      >
                        {formData.travelPlanType?.includes("pdf") ? "View PDF" : "View Full Size"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400">
                    <Upload className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No travel plan uploaded</p>
                  </div>
                )}
              </div>
            ) : (
              // Edit Mode - File upload
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center space-y-4">
                  <Upload className="h-12 w-12 text-gray-400" />
                  <div className="text-center">
                    <label className="font-semibold text-gray-700 cursor-pointer">
                      Upload Travel Plan
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Supported formats: Images (PNG, JPG, JPEG) and PDF (Max 10MB)
                    </p>
                  </div>

                  {/* Show selected file info */}
                  {formData.travelPlan && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(formData.travelPlanType)}
                          <div>
                            <p className="font-medium text-blue-800">{formData.travelPlanName}</p>
                            <p className="text-sm text-blue-600">
                              {formData.travelPlanType?.includes("pdf") ? "PDF Document" : "Image File"}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                          onClick={handleFileRemove}
                          disabled={removing}
                        >
                          {removing ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full mr-2"></div>
                              Removing...
                            </>
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons - Only show in edit mode */}
          {!viewMode && (
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                className="px-6 py-2"
                onClick={() => {
                  setViewMode(true);
                  setRemoving(false);
                  // Reset form data to original state
                  setFormData({
                    modeOfTravel: player.modeOfTravel || "",
                    travelPlan: player.travelPlan || undefined,
                    travelPlanName: player.travelPlanName || "",
                    travelPlanType: player.travelPlanType || "",
                    lastUpdated: player.lastUpdated || "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2" disabled={loading}>
                {loading ? "Saving..." : "Save Travel Plan"}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
