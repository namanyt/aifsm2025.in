import Image from "next/image";
import Link from "next/link";

import { Countdown } from "@/components/others/countdown";
import { ExternalLinkIcon, Link2Icon } from "lucide-react";

export default function HomePage() {
  const sportsEvents = [
    { name: "Athletics", icon: "🏃‍♂️" },
    { name: "Swimming", icon: "🏊‍♂️" },
    { name: "Weight Lifting", icon: "🏋️‍♂️" },
    { name: "Power Lifting", icon: "💪" },
    { name: "Badminton", icon: "🏸" },
    { name: "Cycling", icon: "🚴‍♂️" },
    { name: "Archery", icon: "🏹" },
    { name: "Golf", icon: "⛳" },
    { name: "Rifle Shooting", icon: "🎯" },
  ];

  const quickLinks = [
    "Proceedings",
    "Officers",
    "Important Contacts",
    "Event Incharge Details",
    "Venues",
    "Route Map",
    "AIFSM Booklet",
    "Sports Meet Result",
  ];

  const newsItems = [
    {
      date: "Sep 2025",
      title: "Dehradun Hosts Inter-State Cricket Championship",
      subtitle: "Record Participation in Dehradun Half Marathon",
    },
    {
      date: "Sep 2025",
      title: "Dehradun Hosts Inter-State Cricket Championship",
      subtitle: "Record Participation in Dehradun Half Marathon",
    },
    {
      date: "Sep 2025",
      title: "Dehradun Hosts Inter-State Cricket Championship",
      subtitle: "Record Participation in Dehradun Half Marathon",
    },
  ];

  const stateSymbols = [
    {
      type: "State Tree",
      name: "Buransh",
      description: "Red-flowered Rhododendron.",
      image: "/ui/state_symbol/tree.png",
    },
    {
      type: "State Animal",
      name: "Musk Deer",
      description: "Shy Himalayan Deer",
      image: "/ui/state_symbol/animal.png",
    },
    {
      type: "State Bird",
      name: "Himalayan Monal",
      description: "Colorful Himalayan Pheasant.",
      image: "/ui/state_symbol/bird.png",
    },
  ];

  return (
    <div className="bg-slate-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-100 to-white">
        <div className="container mx-auto mb-0 px-0 py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[50vh]">
            {/* Hero Image */}
            <div className="order-2 lg:order-1">
              <Image
                // src="https://placehold.co/736x587"
                src="/ui/mascot.png"
                alt="AIFSM 2025 Mascot"
                width={736}
                height={587}
                priority
              />
            </div>

            {/* Hero Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h1 className="text-[13em] text-center font-normal font-['Rampart_One'] text-teal-900 tracking-tight mb-">
                AIFSM
              </h1>
              <h2 className="text-[2.2rem] font-black text-teal-900 leading-tight tracking-tight mb-6 text-center">
                28th All India Forest Sports Meet, 2025
              </h2>
              <div className="text-xl md:text-2xl lg:text-3xl text-teal-900 space-y-2 text-center">
                <p className="font-semibold">Uttarakhand Forest Department</p>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold">Government of Uttarakhand</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Banner */}
      <section className="bg-gradient-to-r from-sky-700 to-cyan-600 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="px-8 py-4 bg-black/25 rounded-2xl border border-blue-300">
              <span className="text-white text-xl font-bold">12th-16th November</span>
            </div>
            <div className="h-16 border-l border-blue-300" />
            <Countdown />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-slate-100 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-6 py-4 rounded-md border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-8">VIDEO</h2>
          {/* Video placeholder - replace with actual video component */}
          <div className="max-w-4xl mx-auto bg-gray-300 aspect-video rounded-lg flex items-center justify-center">
            <span className="text-gray-600 text-xl">Video Content</span>
          </div>
        </div>
      </section>

      {/* Sports Events */}
      <section className="bg-gradient-to-b from-green-100 to-white py-16 h-[40vh] relative">
        {/* Background Forest Images */}
        <div className="absolute inset-0">
          <Image
            src="/ui/forest_1.png"
            alt="Forest Background Left"
            width={1920}
            height={600}
            className="absolute left-0 top-0 h-full opacity-60"
          />
        </div>
        <div className="absolute inset-0">
          <Image
            src="/ui/forest_2.png"
            alt="Forest Background Right"
            width={1920}
            height={565}
            className="absolute right-0 top-0 h-full object-cover opacity-60"
          />
        </div>

        {/* Sports Icons Container */}
        <div className="relative z-10">
          <div className="container mx-auto px-10 py-10">
            {/* frosted banner with sports icons */}
            <div className="bg-white/30 backdrop-blur-xs rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-between items-center px-8 py-12">
                {sportsEvents.map((sport, index) => (
                  <div key={index} className="flex flex-col items-center text-center min-w-0 flex-1">
                    <div className="mb-4">
                      <Image
                        src={`/ui/sports_logo/${sport.name.toLowerCase().replace(/\s+/g, "_")}.png`}
                        alt={`${sport.name} Icon`}
                        width={60}
                        height={60}
                        className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
                      />
                    </div>
                    <span className="text-black text-xs md:text-sm lg:text-base font-medium leading-tight">
                      {sport.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-yellow-700 mb-4">Latest News</h2>
            <div className="w-12 h-1 bg-yellow-700 mx-auto" />
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {newsItems.map((item, index) => (
              <article key={index} className="flex rounded-xl overflow-hidden shadow-lg">
                <div className="w-2/5 bg-gradient-to-b from-black/0 to-black/40 bg-gray-800 p-6 flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-500 rounded-lg">
                      <div className="w-8 h-8">
                        <ExternalLinkIcon size={32} />
                      </div>
                    </div>
                    <h3 className="text-white text-2xl font-bold">{item.title}</h3>
                  </div>
                </div>
                <div className="w-3/5 bg-white p-8 flex items-center">
                  <div>
                    <div className="text-gray-900 text-lg font-semibold mb-2">{item.date}</div>
                    <h4 className="text-gray-800 text-xl font-medium">{item.subtitle}</h4>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* State Symbols */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-yellow-700 mb-4">State Symbols</h2>
            <div className="w-12 h-1 bg-yellow-700 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stateSymbols.map((symbol, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-slate-200 to-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="relative">
                  <Image
                    src={symbol.image}
                    alt={symbol.name}
                    width={587}
                    height={263}
                    className="w-full h-64 object-cover"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-gray-50 rounded-[10px]">
                    <span className="text-gray-900 text-lg">{symbol.type}</span>
                  </div>
                </div>
                <div className="p-0 text-center">
                  <div className="bg-orange-500 text-white text-2xl font-bold py-3 mb-4">{symbol.name}</div>
                  <p className="text-gray-600 p-1 pb-3 text-md">{symbol.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
