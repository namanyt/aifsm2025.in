"use client";

import Image from "next/image";
import Link from "next/link";

import { Countdown } from "@/components/others/countdown";
import { ExternalLinkIcon, Link2Icon } from "lucide-react";
import { useState, useEffect } from "react";

type NewsType = {
  id: string;
  created: Date;
  updated: Date;
  news: string;
};

export default function HomePage() {
  const [news, setNews] = useState<NewsType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    // Fetch news from the API endpoint
    fetch("/api/news")
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  // Function to parse text and make URLs clickable
  const parseNewsText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            Link
          </a>
        );
      }
      return part;
    });
  };

  // Pagination logic
  const sortedNews = news.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = sortedNews.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

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
    { name: "Proceedings", content: "#" },
    { name: "Officers", content: "#" },
    { name: "Important Contacts", content: "#" },
    { name: "Event Incharge Details", content: "#" },
    { name: "Venues", content: "#" },
    { name: "Route Map", content: "#" },
    { name: "AIFSM Booklet", content: "#" },
    { name: "Sports Meet Result", content: "#" },
  ];

  // let newsItems = [
  //   {
  //     date: "Sep 2025",
  //     title: "Dehradun Hosts Inter-State Cricket Championship",
  //     subtitle: "Record Participation in Dehradun Half Marathon",
  //   },
  //   {
  //     date: "Sep 2025",
  //     title: "Dehradun Hosts Inter-State Cricket Championship",
  //     subtitle: "Record Participation in Dehradun Half Marathon",
  //   },
  //   {
  //     date: "Sep 2025",
  //     title: "Dehradun Hosts Inter-State Cricket Championship",
  //     subtitle: "Record Participation in Dehradun Half Marathon",
  //   },
  // ];

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
      <section className="relative bg-gradient-to-r from-slate-100 to-white overflow-hidden">
        <div className="container mx-auto mb-0 px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center min-h-[50vh]">
            {/* Hero Image */}
            <div className="order-2 lg:order-1 flex justify-center">
              <Image
                src="/ui/mascot_full.png"
                alt="AIFSM 2025 Mascot"
                width={736}
                height={587}
                priority
                className="max-w-full h-auto"
              />
            </div>

            {/* Hero Content */}
            <div className="order-1 lg:order-2 text-center lg:text-left px-4">
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[13rem] text-center font-normal font-['Rampart_One'] text-teal-900 tracking-tight mb-4 leading-none">
                AIFSM
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[2.2rem] font-black text-teal-900 leading-tight tracking-tight mb-6 text-center">
                28th All India Forest Sports Meet, 2025
              </h2>
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-teal-900 space-y-2 text-center">
                <p className="font-semibold">Uttarakhand Forest Department</p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold">
                  Government of Uttarakhand
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Banner */}
      <section className="bg-gradient-to-r from-sky-700 to-cyan-600 py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
            <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-black/25 rounded-2xl border border-blue-300">
              <span className="text-white text-lg sm:text-xl font-bold whitespace-nowrap">12th-16th November</span>
            </div>
            <div className="h-16 border-l border-blue-300 hidden lg:block" />
            <Countdown />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-slate-100 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={`${link.content}`}
                className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-md border-2 border-orange-500 text-orange-600 hover:bg-orange-50 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                {link.name}
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
      {/* <section className="bg-gradient-to-b from-green-100 to-white py-16 h-[40vh] relative">
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

        <div className="relative z-10">
          <div className="container mx-auto px-10 py-10">
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
      </section> */}

      <section className="bg-gradient-to-b from-green-100 to-white">
        <Image src="/ui/nature.svg" alt="Nature Background" width={1920} height={632} className="w-full h-full mb-8" />
      </section>

      {/* Latest News */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-yellow-700 mb-4">Latest Updates</h2>
            <div className="w-12 h-1 bg-yellow-700 mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto">
            {/* News Content */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 min-h-[300px]">
              {news && news.length > 0 ? (
                <>
                  <div className="divide-y divide-gray-200">
                    {currentNews.map((item, index) => (
                      <div key={item.id} className="p-6 hover:bg-white transition-colors duration-200">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
                              <ExternalLinkIcon size={20} className="text-white" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Notice
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(item.created).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2 leading-tight">
                              {parseNewsText(item.news)}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <span>Click on the link to view details</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200 rounded-b-lg">
                      <div className="flex items-center text-sm text-gray-700">
                        <span>
                          Showing {startIndex + 1} to {Math.min(endIndex, sortedNews.length)} of {sortedNews.length}{" "}
                          results
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={goToPrevious}
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>

                        <div className="flex space-x-1">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                              key={page}
                              onClick={() => goToPage(page)}
                              className={`px-3 py-2 text-sm font-medium rounded-md ${
                                currentPage === page
                                  ? "bg-yellow-600 text-white"
                                  : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                              }`}
                            >
                              {page}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={goToNext}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <ExternalLinkIcon size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts to display</h3>
                  <p className="text-gray-500 text-center max-w-sm">
                    There are currently no announcements or notices available. Please check back later.
                  </p>
                </div>
              )}
            </div>
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
