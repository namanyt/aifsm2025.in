import { Metadata } from "next";
import Image from "next/image";

import { ExternalLinkIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "About AIFSM 2025 - All India Forest Sports Meet 2025",
};

const SportsEvents = [
  { name: "Athletics", icon: "athletics.png" },
  { name: "Swimming", icon: "swimming.png" },
  { name: "Power Lifting (Mens)", icon: "weights.png" },
  { name: "Weight Lifting (Womens)", icon: "weights.png" },
  { name: "Weight Lifting (Mens)", icon: "weights.png" },
  { name: "Weight Lifting (Womens)", icon: "weights.png" },
  { name: "Indoor Games", icon: "indoor.png" },
  { name: "Field Games", icon: "field.png" },
  { name: "Rifle Shooting", icon: "rifle.png" },
  { name: "Cycling", icon: "cycling.png" },
  { name: "Archery", icon: "archery.png" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      <Image
        src="/ui/header_image.png"
        alt="About AIFSM 2025"
        width={1920}
        height={200}
        className="object-cover overflow-hidden h-[300px]"
      />

      <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 bg-white py-12 overflow-hidden">
        <Image
          src="/ui/mascot_full.png"
          alt="About AIFSM 2025"
          width={547 * 1.05}
          height={551 * 1.05}
          className="object-cover overflow-hidden absolute top-0 left-25 hidden md:block z-100"
        />
        <div className="w-screen absolute top-0 left-1/2 right-1/2 -translate-x-1/2 bg-orange-500 overflow-hidden text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold ml-120">Our Story</h2>
          </div>
        </div>
        <div className="max-w-4xl mx-auto ml-200 px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden">
          <p className="text-lg mb-4 text-black">
            The All India Forest Sports Meet (AIFSM) is aimed at promoting sports and games activities among the staff
            and officers of the Forest Departments/Organisations/Institutions of the States, Union Territories and the
            Central Government, and thereby nurturing good health, team spirit and camaraderie among them.
          </p>
          <p className="text-lg mb-4 text-black">
            The All India Forest Sports Meet typically features a wide range of athletic competitions, including track
            and field events, archery, rifle shooting, and various other games and sports. The event is also an
            opportunity for forest officials from different states to meet and exchange ideas and experiences.
          </p>
          <p className="text-lg mb-4 text-black">
            The event is held in a different state each year and attracts a large number of participants from across
            India. The competition is fierce, but the spirit of sportsmanship and camaraderie prevails. The All India
            Forest Sports Meet is a symbol of commitment to promoting physical fitness and the importance of staying in
            good health, both physically and mentally.
          </p>
          <p className="text-lg text-black">
            The 1st All India Forest Sports Meet was held at Hyderabad in the year 1993. The 28th All India Forest
            Sports Meet is being conducted at Dehradun, Uttarakhand which has excellent sports and logistical
            infrastructure and facilities for smooth conduct of the sports meet.
          </p>
        </div>
      </div>

      {/* same now with a green bar */}
      <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 bg-white py-12 mb-24 overflow-hidden">
        <div className="w-screen absolute top-0 left-1/2 right-1/2 -translate-x-1/2 bg-green-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold ml-120">Sports Events</h2>
          </div>
        </div>
        <div className="mt-16 space-y-8">
          {SportsEvents.map((event, index) => (
            <div key={index} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
              <div className="inline-block w-12 h-12 rounded-full bg-orange-500">
                <Image
                  src={`/ui/sports_icon/${event.icon}`}
                  alt={event.name}
                  width={32 * 0.8}
                  height={32 * 0.8}
                  className="inline-block ml-3 brightness-0 mt-3 opacity-55"
                />
              </div>
              <div className="inline-block w-screen ml-6 absolute">
                <ExternalLinkIcon className="text-gray-500 relative left-[65rem]" />
                <span className="text-xl font-semibold ml-25 absolute align-middle text-gray-500">{event.name}</span>
              </div>
              {index < SportsEvents.length - 1 && <div className="border-b border-gray-300 mt-10"></div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
