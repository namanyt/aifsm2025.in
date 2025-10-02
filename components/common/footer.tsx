"use client";

import { useEffect, useState } from "react";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { EVENT_TITLE, EVENT_SHORT_NAME, EVENT_YEAR } from "@/lib/constants";
import { getVisitorCount, incrementVisitorCount, getLastUpdated } from "@/lib/db/pb";

export function Footer() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const loadFooterData = async () => {
      try {
        // Increment visitor count and get the new count
        const newCount = await incrementVisitorCount();
        setVisitorCount(newCount);

        // Get last updated date
        const lastUpdateDate = await getLastUpdated();
        setLastUpdated(lastUpdateDate);
      } catch (error) {
        console.error("Failed to load footer data:", error);
        // Keep default values on error
      }
    };

    loadFooterData();
  }, []);

  return (
    <footer className="bg-gradient-to-r from-[#0072b1] to-[#009fdc] text-white font-sans text-base">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 items-start pt-6">
          {/* Logo and Info */}
          <div className="xl:col-span-2 flex flex-col items-start">
            <span className="font-extrabold text-[48px] sm:text-[64px] lg:text-[80px] xl:text-[96px] leading-none tracking-tight mb-6">
              {EVENT_SHORT_NAME}
            </span>
            <div className="flex items-start gap-3 mb-2">
              <img src="/logos/uk_rajya.png" alt="Uttarakhand Logo" className="w-10 h-10 flex-shrink-0" />
              <div className="text-white/90 text-sm sm:text-base">
                <div className="font-medium text-base sm:text-lg mb-0.5">{EVENT_TITLE}</div>
                <div>Uttarakhand Forest Department</div>
                <div>Government of Uttarakhand</div>
              </div>
            </div>
          </div>

          {/* Game Rules */}
          <div>
            <div className="font-semibold mb-4 text-lg text-white">Game Rules</div>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a href="#">Game Rules for {EVENT_SHORT_NAME}</a>
              </li>
              <li>
                <a href="#">Specific Rules</a>
              </li>
              <li>
                <a href="#">Proceedings of Meeting</a>
              </li>
              <li>
                <a href="#">Maximum Participant per Sport</a>
              </li>
              <li>
                <a href="#">Weights to be used in Throws</a>
              </li>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <div className="font-semibold mb-4 text-lg text-white">Other Links</div>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <a href="#">Ministry of Environmental Forest and Climate Change</a>
              </li>
              <li>
                <a href="#">Dehradun Forest and Climate Change Department</a>
              </li>
              <li>
                <a href="#">Dehradun Government website</a>
              </li>
              <li>
                <a href="#">Dehradun Tourism Board Website</a>
              </li>
            </ul>
          </div>

          {/* Contact + Social stacked */}
          <div className="space-y-6">
            <div>
              <div className="font-semibold mb-4 text-lg text-white">Contact Us</div>
              <div className="text-[#cbe7fa] text-sm sm:text-base">Raipur, Dehradun India.</div>
            </div>

            <div>
              <div className="font-semibold mb-4 text-lg text-white">Follow Us</div>
              <div className="flex gap-4">
                <a href="#">
                  <Twitter size={22} />
                </a>
                <a href="#">
                  <Facebook size={22} />
                </a>
                <a href="#">
                  <Instagram size={22} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/15 mt-10 pt-4 pb-4">
          {/* Main stats row */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm gap-2 mb-3">
            <div className="text-left">Copyright {EVENT_YEAR} All rights reserved</div>
            <div className="text-center text-[#cbe7fa]">
              Visitors Count:{" "}
              <span className="font-semibold text-white">
                {visitorCount !== null ? visitorCount.toLocaleString() : "Loading..."}
              </span>
            </div>
            <div className="text-right text-[#cbe7fa]">
              Last Updated on: <span className="font-semibold text-white">{lastUpdated || "Loading..."}</span>
            </div>
          </div>

          {/* Creator credit */}
          <div className="text-center text-xs text-white/60 border-t border-white/10 pt-3">
            Website developed by{" "}
            <span
              className="text-white/80 font-medium hover:underline cursor-pointer"
              onClick={() => window.open("https://ciderboi.xyz", "_blank")}
            >
              Nitya Naman
            </span>{" "}
            & designed by{" "}
            <span
              className="text-white/80 font-medium hover:underline cursor-pointer"
              onClick={() => {
                window.open("https://www.linkedin.com/in/amritanshu-rawat/", "_blank");
              }}
            >
              Amritanshu Rawat
            </span>
            . • Built with ❤️ for AIFSM 2025
          </div>
        </div>
      </div>
    </footer>
  );
}
