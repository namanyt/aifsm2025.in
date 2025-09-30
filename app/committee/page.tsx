"use client";

import { useState } from "react";
import { COMMITTEES_DATA } from "@/lib/types";
import { Header, Header_Image } from "@/components/common/header";

export default function Committee() {
  const [activeTab, setActiveTab] = useState(0);

  const activeCommittee = COMMITTEES_DATA[activeTab];
  const chairperson = activeCommittee.members.find(
    (m) => m.designation.toLowerCase().includes("chairman") || m.designation.toLowerCase().includes("chairperson"),
  );
  const otherMembers = activeCommittee.members.filter(
    (m) => !m.designation.toLowerCase().includes("chairman") && !m.designation.toLowerCase().includes("chairperson"),
  );

  return (
    <div className="min-h-screen relative">
      {/* Header Section */}
      <Header_Image />

      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[75px] sm:top-[100px] md:top-[125px] lg:top-[150px] text-center z-10">
        <div className="bg-white/20 dark:bg-gray-400/40 backdrop-blur-md border border-white/30 rounded-2xl py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-12 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:bg-white/25">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">
            Committee
          </h1>
          <div className="border-b-4 border-white w-12 sm:w-16 md:w-20 lg:w-24 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Committee Navigation Tabs */}
      <div className="relative z-10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {COMMITTEES_DATA.map((committee, index) => (
              <button
                key={committee.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md cursor-pointer ${
                  activeTab === index ? "text-black border-2 border-black" : "bg-white text-black hover:bg-teal-50"
                }`}
              >
                {committee.name}
              </button>
            ))}
          </div>

          {/* Committee Members Section */}
          <div className="bg-teal-800/50 backdrop-blur-sm rounded-xl p-8 mb-8">
            {/* Chairperson Card */}
            {chairperson && (
              <div className="mb-8">
                <div className="bg-teal-700/60 border-2 border-yellow-200 rounded-xl p-6 max-w-sm mx-auto text-center shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-1">{chairperson.name}</h3>
                  <div className="mt-3 pt-3 border-t border-teal-500/30">
                    <span className="text-teal-100 font-medium">{chairperson.designation}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Other Members Grid */}
            {otherMembers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center">
                {otherMembers.map((member, index) => {
                  const isLastItem = index === otherMembers.length - 1;
                  const isOddTotal = otherMembers.length % 3 !== 0;
                  const shouldCenter = isLastItem && isOddTotal && otherMembers.length % 3 === 1;

                  return (
                    <div
                      key={index}
                      className={`bg-teal-600/40 backdrop-blur-sm border border-teal-500/30 rounded-lg p-5 text-center shadow-md hover:bg-teal-600/60 transition-all duration-300 w-full max-w-sm ${
                        shouldCenter ? "md:col-start-2" : ""
                      }`}
                    >
                      <h4 className="text-lg font-semibold text-white mb-1">{member.name}</h4>
                      <p className="text-teal-100 text-sm font-medium">{member.designation}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Download PDF Button */}
          <div className="flex justify-end mb-6">
            <button className="text-gray-800 border-2 border-red-500 bg-white cursor-pointer px-6 py-2.5 rounded-lg font-medium hover:bg-red-200 transition-colors duration-300 flex items-center gap-2 shadow-md">
              <span className="text-black">📄</span>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
