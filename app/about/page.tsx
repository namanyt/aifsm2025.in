"use client";

import { Metadata } from "next";
import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";
import { Header_Image } from "@/components/common/header";
import { SportsEventsIcons as SportsEvents, categorizedEvents } from "@/lib/types";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useState } from "react";

export default function About() {
  const [openAccordions, setOpenAccordions] = useState<{ [key: number]: boolean }>({});

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen relative">
      <Header_Image image="about" />

      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[75px] sm:top-[100px] md:top-[125px] lg:top-[150px] text-center z-10">
        <div className="bg-white/20 dark:bg-gray-400/40 backdrop-blur-md border border-white/30 rounded-2xl py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-12 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:bg-white/25">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">
            About AIFSM 2025
          </h1>
          <div className="border-b-4 border-white w-12 sm:w-16 md:w-20 lg:w-24 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="w-full top-0 bg-white py-12">
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
              <Image src="/ui/mascot_full.png" alt="AIFSM Mascot" width={350} height={350} className="object-contain" />
            </div>

            {/* Text (spans 2/3 on desktop) */}
            <div className="md:col-span-2 space-y-4 text-lg text-black">
              <p>
                The All India Forest Sports Meet (AIFSM) is aimed at promoting sports and games activities among the
                staff and officers of the Forest Departments/Organisations/Institutions of the States, Union Territories
                and the Central Government, and thereby nurturing good health, team spirit and camaraderie among them.
              </p>
              <p>
                The All India Forest Sports Meet typically features a wide range of athletic competitions, including
                track and field events, archery, rifle shooting, and various other games and sports. The event is also
                an opportunity for forest officials from different states to meet and exchange ideas and experiences.
              </p>
              <p>
                The event is held in a different state each year and attracts a large number of participants from across
                India. The competition is fierce, but the spirit of sportsmanship and camaraderie prevails. The All
                India Forest Sports Meet is a symbol of commitment to promoting physical fitness and the importance of
                staying in good health, both physically and mentally.
              </p>
              <p>
                The 1st All India Forest Sports Meet was held at Hyderabad in the year 1993. The 28th All India Forest
                Sports Meet is being conducted at Dehradun, Uttarakhand which has excellent sports and logistical
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
                    <span className="text-lg sm:text-xl font-semibold text-gray-700">{event.name}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent isOpen={openAccordions[index]}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 pt-4 max-w-full">
                    {Object.entries(categorizedEvents[event.name as keyof typeof categorizedEvents] || {}).map(
                      ([eventName, categories]) => (
                        <div key={eventName} className="bg-gray-50 rounded-lg p-3 min-w-0">
                          <h4 className="font-semibold text-gray-800 mb-2 text-sm" title={eventName}>
                            {eventName}
                          </h4>
                          <div className="space-y-1">
                            {Array.isArray(categories) ? (
                              categories.map((category, catIndex) => (
                                <div
                                  key={catIndex}
                                  className="text-xs text-gray-600 bg-white px-2 py-1 rounded break-words"
                                >
                                  {category}
                                </div>
                              ))
                            ) : (
                              <div className="text-xs text-gray-600">No categories available</div>
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                  {Object.keys(categorizedEvents[event.name as keyof typeof categorizedEvents] || {}).length === 0 && (
                    <div className="text-center text-gray-500 py-8">Events details coming soon...</div>
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
