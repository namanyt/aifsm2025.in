"use client";

import { useState } from "react";
import { Header_Image } from "@/components/common/header";
import { EventIcons as SportsEventsIcons, categorizedEvents } from "@/lib/types";
import { Metadata } from "next";
import Image from "next/image";

// Note: Can't export metadata from client component
// export const metadata: Metadata = {
//   title: "Events",
//   description: "Events of AIFSM 2025 - All India Forest Sports Meet 2025",
// };

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Function to get alternating colors based on index
  const getColorClass = (index: number) => {
    return index % 2 === 0 ? "bg-[#FF8F05]" : "bg-[#357843]";
  };

  const getEventsList = (categoryName: string) => {
    const categoryData = categorizedEvents[categoryName as keyof typeof categorizedEvents];
    if (!categoryData) return [];

    // If it's a nested object (like Indoor Games, Field Games), flatten it
    if (typeof categoryData === "object" && !Array.isArray(categoryData)) {
      const events: string[] = [];
      Object.entries(categoryData).forEach(([eventName, participants]) => {
        if (Array.isArray(participants) && participants.length > 0) {
          events.push(eventName);
        }
      });
      return events;
    }

    // If it's a direct sports category (like Athletics, Swimming)
    return Object.keys(categoryData);
  };

  return (
    <div className="relative min-h-screen">
      <Header_Image image="default" />

      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[75px] sm:top-[100px] md:top-[125px] lg:top-[150px] text-center z-10">
        <div className="bg-white/20 dark:bg-gray-400/40 backdrop-blur-md border border-white/30 rounded-2xl py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-12 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:bg-white/25">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">
            Events
          </h1>
          <div className="border-b-4 border-white w-12 sm:w-16 md:w-20 lg:w-24 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-12 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Sports Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {SportsEventsIcons.map((sport, index) => (
              <div
                key={sport.name}
                onClick={() => setSelectedCategory(selectedCategory === sport.name ? null : sport.name)}
                className={`${getColorClass(index)}
                  rounded-xl p-6 sm:p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl
                  ${selectedCategory === sport.name ? "ring-4 ring-white shadow-2xl scale-105" : ""}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-400/30 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Image
                      src={`/ui/icons/${sport.icon}`}
                      alt={`${sport.name} Icon`}
                      width={48}
                      height={48}
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg leading-tight">{sport.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Category Events */}
          {selectedCategory && (
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className={`${getColorClass(SportsEventsIcons.findIndex((s) => s.name === selectedCategory))} p-6`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-400/30 rounded-full flex items-center justify-center shadow-lg">
                    <Image
                      src={`/ui/icons/${SportsEventsIcons.find((s) => s.name == selectedCategory)?.icon}`}
                      alt={`${selectedCategory} Icon`}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                      unoptimized
                    />
                  </div>
                  <h2 className="text-white text-2xl sm:text-3xl font-bold">{selectedCategory} Events</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {getEventsList(selectedCategory).map((event, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-400 hover:bg-gray-100 transition-colors"
                    >
                      <h4 className="font-semibold text-gray-800 text-lg mb-2">{event}</h4>
                      {/* Show participants/categories for each event */}
                      <div className="flex flex-wrap gap-2">
                        {(() => {
                          const categoryData = categorizedEvents[selectedCategory as keyof typeof categorizedEvents];
                          if (typeof categoryData === "object" && !Array.isArray(categoryData)) {
                            // For nested categories like Indoor Games
                            const participants = (categoryData as any)[event];
                            if (Array.isArray(participants)) {
                              return participants.map((participant: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                  {participant}
                                </span>
                              ));
                            }
                          } else if (typeof categoryData === "object") {
                            // For direct sports categories like Athletics
                            const participants = (categoryData as any)[event];
                            if (Array.isArray(participants)) {
                              return participants.map((participant: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                  {participant}
                                </span>
                              ));
                            }
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          {!selectedCategory && (
            <div className="text-center mt-12">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore Sports Events</h3>
                <p className="text-gray-600 text-lg">Click on any sports category above to view the detailed events.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
