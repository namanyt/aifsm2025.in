"use client";

import { Metadata } from "next";
import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";
import { Header_Image } from "@/components/common/header";
import { sportsData } from "@/lib/types";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useState } from "react";

const SportsEvents = [
  { name: "Athletics", icon: "athletics.png" },
  { name: "Swimming", icon: "swimming.png" },
  { name: "Power Lifting", icon: "weights.png" },
  { name: "Weight Lifting", icon: "weights.png" },
  { name: "Indoor Games", icon: "indoor.png" },
  { name: "Field Games", icon: "field.png" },
  { name: "Rifle Shooting", icon: "rifle.png" },
  { name: "Cycling", icon: "cycling.png" },
  { name: "Archery", icon: "archery.png" },
];

// Categorized events data based on SportsEvents categories
const categorizedEvents = {
  "Athletics": sportsData.Athletics || {},
  "Swimming": sportsData.Swimming || {},
  "Power Lifting": sportsData["Power Lifting"] || {},
  "Weight Lifting": sportsData["Weight Lifting"] || {},
  "Indoor Games": {
    "Chess - Classic": sportsData.Chess?.Classic || [],
    "Chess - Rapid": sportsData.Chess?.Rapid || [],
    "Carrom - Singles": sportsData.Carrom?.Singles || [],
    "Carrom - Doubles": sportsData.Carrom?.Doubles || [],
    "Carrom - Mixed Doubles": sportsData.Carrom?.["Mixed Doubles"] || [],
    "Table Tennis - Singles": sportsData["Table Tennis"]?.Singles || [],
    "Table Tennis - Doubles": sportsData["Table Tennis"]?.Doubles || [],
    "Table Tennis - Mixed Doubles": sportsData["Table Tennis"]?.["Mixed Doubles"] || [],
    "Badminton - Singles": sportsData.Badminton?.Singles || [],
    "Badminton - Doubles": sportsData.Badminton?.Doubles || [],
    "Badminton - Mixed Doubles": sportsData.Badminton?.["Mixed Doubles"] || [],
    "Billiards - Open for All": sportsData.Billiards?.["Open for All"] || [],
    "Snooker - Open for All": sportsData.Snooker?.["Open for All"] || [],
    "Squash - Singles": sportsData.Squash?.Singles || [],
    "Quiz - Team": sportsData.Quiz?.Team || [],
    "Bridge - Team Duplicate": sportsData.Bridge?.["Team Duplicate"] || [],
    "Bridge - Master Pair": sportsData.Bridge?.["Master Pair"] || [],
    "Bridge - Progressive": sportsData.Bridge?.Progressive || [],
  },
  "Field Games": {
    "Cricket - Team": sportsData.Cricket?.Team || [],
    "Hockey - Team": sportsData.Hockey?.Team || [],
    "Volleyball - Team": sportsData.Volleyball?.Team || [],
    "Basketball - Team": sportsData.Basketball?.Team || [],
    "Football - Team": sportsData.Football?.Team || [],
    "Kabaddi - Team": sportsData.Kabaddi?.Team || [],
    "Tug of War - Team": sportsData["Tug of War"]?.Team || [],
    "Lawn Tennis - Singles": sportsData["Lawn Tennis"]?.Singles || [],
    "Lawn Tennis - Doubles": sportsData["Lawn Tennis"]?.Doubles || [],
    "Lawn Tennis - Mixed Doubles": sportsData["Lawn Tennis"]?.["Mixed Doubles"] || [],
  },
  "Rifle Shooting": sportsData["Rifle Shooting"] || {},
  "Cycling": sportsData.Cycling || {},
  "Archery": sportsData.Archery || {},
};

export default function About() {
  const [openAccordions, setOpenAccordions] = useState<{ [key: number]: boolean }>({});

  const toggleAccordion = (index: number) => {
    setOpenAccordions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header_Image />

      {/* Our Story Section */}
      <section className="w-full bg-white py-12">
        {/* Orange Header */}
        <div className="w-full bg-orange-500 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">Our Story</h2>
          </div>
        </div>

        {/* Mascot + Text */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Mascot */}
            <div className="flex justify-center">
              <Image
                src="/ui/mascot_full.png"
                alt="AIFSM Mascot"
                width={350}
                height={350}
                className="object-contain"
              />
            </div>

            {/* Text (spans 2/3 on desktop) */}
            <div className="md:col-span-2 space-y-4 text-lg text-black">
              <p>
                The All India Forest Sports Meet (AIFSM) is aimed at promoting sports
                and games activities among the staff and officers of the Forest
                Departments/Organisations/Institutions of the States, Union Territories
                and the Central Government, and thereby nurturing good health, team
                spirit and camaraderie among them.
              </p>
              <p>
                The All India Forest Sports Meet typically features a wide range of
                athletic competitions, including track and field events, archery,
                rifle shooting, and various other games and sports. The event is also
                an opportunity for forest officials from different states to meet and
                exchange ideas and experiences.
              </p>
              <p>
                The event is held in a different state each year and attracts a large
                number of participants from across India. The competition is fierce,
                but the spirit of sportsmanship and camaraderie prevails. The All
                India Forest Sports Meet is a symbol of commitment to promoting
                physical fitness and the importance of staying in good health, both
                physically and mentally.
              </p>
              <p>
                The 1st All India Forest Sports Meet was held at Hyderabad in the year
                1993. The 28th All India Forest Sports Meet is being conducted at
                Dehradun, Uttarakhand which has excellent sports and logistical
                infrastructure and facilities for smooth conduct of the sports meet.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Sports Events Section */}
      <section className="relative w-full bg-white py-12 mb-24">
        {/* Green Header */}
        <div className="w-full bg-green-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">Sports Events</h2>
          </div>
        </div>

        {/* Accordion Events List */}
        <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion>
            {SportsEvents.map((event, index) => (
              <AccordionItem key={index}>
                <AccordionTrigger
                  isOpen={openAccordions[index]}
                  onClick={() => toggleAccordion(index)}
                  className="hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500">
                      <Image
                        src={`/ui/sports_icon/${event.icon}`}
                        alt={event.name}
                        width={28}
                        height={28}
                        className="brightness-0 opacity-70"
                      />
                    </div>
                    <span className="text-lg sm:text-xl font-semibold text-gray-700">
                      {event.name}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent isOpen={openAccordions[index]}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 pt-4 max-w-full">
                    {Object.entries(categorizedEvents[event.name as keyof typeof categorizedEvents] || {}).map(([eventName, categories]) => (
                      <div key={eventName} className="bg-gray-50 rounded-lg p-3 min-w-0">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm" title={eventName}>
                          {eventName}
                        </h4>
                        <div className="space-y-1">
                          {Array.isArray(categories) ? categories.map((category, catIndex) => (
                            <div key={catIndex} className="text-xs text-gray-600 bg-white px-2 py-1 rounded break-words">
                              {category}
                            </div>
                          )) : (
                            <div className="text-xs text-gray-600">No categories available</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {Object.keys(categorizedEvents[event.name as keyof typeof categorizedEvents] || {}).length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      Events details coming soon...
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
