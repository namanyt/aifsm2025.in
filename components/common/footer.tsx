"use client";

import { useEffect, useState } from "react";
import { Instagram, TwitterIcon, FacebookIcon } from "lucide-react";

export function Footer() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // TODO: Make this api to get the visit count
  }, []);

  return (
    <footer className="bg-gradient-to-r from-[#0072b1] to-[#009fdc] text-white pt-12 font-sans text-base ">
      <div className="max-w-[1800px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Logo and Info */}
          <div className="md:col-span-1 flex flex-col items-start">
            <span
              className="font-extrabold text-[96px] leading-none tracking-tight mb-6"
              style={{ letterSpacing: "-0.04em" }}
            >
              AIFSM
            </span>
            <div className="flex items-start gap-3 mb-2">
              <img src="/logos/uk_rajya.png" alt="Uttarakhand Logo" className="w-10 h-10" />
              <div className="text-white/90 text-base">
                <div className="font-medium text-lg mb-0.5">28th All India Forest Sports Meet, 2025</div>
                <div>Uttarakhand Forest Department</div>
                <div>Government of Uttarakhand</div>
              </div>
            </div>
          </div>
          {/* Game Rules */}
          <div className="md:col-span-1">
            <div className="font-semibold mb-4 text-lg text-white">Game Rules</div>
            <ul className="list-none p-0 m-0 space-y-1">
              <li>
                <a href="#" className="text-[#cbe7fa] hover:underline">
                  Game Rules for 27th Aifsm
                </a>
              </li>
              <li>
                <a href="#" className="text-[#cbe7fa] hover:underline">
                  Specific Rules
                </a>
              </li>
              <li>
                <a href="#" className="text-[#cbe7fa] hover:underline">
                  Proceedings of Meeting
                </a>
              </li>
              <li>
                <a href="#" className="text-[#cbe7fa] hover:underline">
                  Maximum Participant per Sport
                </a>
              </li>
              <li>
                <a href="#" className="text-[#cbe7fa] hover:underline">
                  Weights to be used in Throws
                </a>
              </li>
            </ul>
          </div>
          {/* Other Links */}
          <div className="md:col-span-1">
            <div className="font-semibold mb-4 text-lg text-white">Other Links</div>
            <ul className="list-none p-0 m-0 space-y-1">
              <li>
                <a href="#" className="text-[#cbe7fa] hover:underline">
                  Ministry of Environmental Forest and Climate Change
                </a>
              </li>
              <li>
                <a href="#" className="text-[#cbe7fa] hover:underline">
                  Dehradun Forest and Climate Change Department
                </a>
              </li>
              <li>
                <a href="#" className="text-[#cbe7fa] hover:underline">
                  Dehradun Government website
                </a>
              </li>
              <li>
                <a href="#" className="text-[#cbe7fa] hover:underline">
                  Dehradun Tourism Board Website
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Us */}
          <div className="md:col-span-1">
            <div className="font-semibold mb-4 text-lg text-white">Contact Us</div>
            <div className="text-[#cbe7fa]">Raipur, Dehradun India.</div>
          </div>
          {/* Follow Us */}
          <div className="md:col-span-1">
            <div className="font-semibold mb-4 text-lg text-white">Follow Us</div>
            <div className="flex gap-4">
              <a href="#" aria-label="X" className="text-[#cbe7fa] text-[22px] hover:text-white">
                <TwitterIcon />
              </a>
              <a href="#" aria-label="Facebook" className="text-[#cbe7fa] text-[22px] hover:text-white">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Instagram" className="text-[#cbe7fa] text-[22px] hover:text-white">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-white/15 mt-10 pt-4 flex flex-col md:flex-row justify-between items-center text-sm max-w-full">
          <div className="w-full md:w-auto text-left mb-2 md:mb-0">Copyright 2025 All right reserved</div>
          <div className="w-full md:w-auto text-center text-[#cbe7fa] mb-2 md:mb-0">
            Visitors Count :{" "}
            <span className="font-semibold text-white">{visitorCount !== null ? visitorCount : "69420"}</span>
          </div>
          <div className="w-full md:w-auto text-right text-[#cbe7fa]">
            Last Updated on : <span className="font-semibold text-white">11 March 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
