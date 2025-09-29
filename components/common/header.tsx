"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { pb } from "@/lib/db/pb";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function Header() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(pb.authStore.isValid); // only read client-side
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/committee", label: "Committee" },
    { href: "/events", label: "Events" },
    { href: "/results", label: "Results" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact Us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-full shadow-[0px_10px_12px_0px_rgba(0,0,0,1)] inline-flex flex-col justify-start items-start top-0 z-50 bg-white">
      {/* TODO: Make accessibility "skip to main content" and font size adjustable buttons */}

      <div className="w-full px-6 md:px-24 py-4 bg-white inline-flex justify-between items-center">
        <div className="flex-1 flex justify-between items-center">
          <div className="flex justify-start items-center gap-5">
            <img className="w-10 h-10" src="/logos/uk_rajya.png" alt="Logo 1" />
            <img className="w-10 h-10" src="/logos/uk_forest.png" alt="Logo 2" />
          </div>
          <div className="text-center justify-start text-black text-xl font-medium font-['Inter'] leading-relaxed tracking-tight hidden md:block">
            28th All India Forest Sports Meet, 2025
            <br />
            Uttarakhand Forest Department
            <br />
            Government of Uttarakhand
          </div>
          <div className="flex justify-start items-center gap-5">
            <img className="w-20 h-10" src="/logos/life_for_env.png" alt="Logo 3" />
            <img className="w-10 h-10" src="/logos/nature_logo.png" alt="Logo 4" />
          </div>
        </div>
      </div>

      <nav className="self-stretch h-12 px-6 md:px-24 py-2 bg-white border-t border-zinc-100 flex flex-col justify-center items-center gap-2.5">
        <div className="w-full flex justify-between items-center">
          {/* Navigation Items */}
          <div className="flex-1 flex justify-start items-center gap-4 lg:gap-8 xl:gap-12 2xl:gap-20 px-2 md:px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 transition-colors rounded text-sm font-${
                  isActive(item.href) ? "bold" : "medium"
                } font-['Inter'] leading-tight tracking-tight
                  ${
                    isActive(item.href)
                      ? "bg-green-900 text-white hover:bg-green-800"
                      : "text-black hover:text-[#4169E1]"
                  }
                cursor-pointer`}
              >
                <span className="text-center justify-center whitespace-nowrap">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-start items-center gap-5">
            {loggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-6 py-[.80rem] top-[0.5rem] bg-[#4169E1] rounded-lg flex justify-center items-center gap-2.5 transition-colors hover:bg-[#274fa1] cursor-pointer"
                >
                  <span className="text-center justify-center text-white text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                    Dashboard
                  </span>
                </Link>
                <Button
                  className="px-6 py-2 bg-red-500 rounded-lg flex justify-center items-center gap-2.5 transition-colors hover:bg-red-400 cursor-pointer"
                  onClick={() => {
                    pb.authStore.clear();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-2 bg-[#4169E1] rounded-lg flex justify-center items-center gap-2.5 transition-colors hover:bg-[#274fa1] cursor-pointer"
                >
                  <span className="text-center justify-center text-white text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                    Login
                  </span>
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 rounded-lg border-2 border-[#4169E1] flex justify-center items-center gap-2.5 transition-colors hover:bg-blue-50 cursor-pointer"
                >
                  <span className="text-center justify-center text-[#4169E1] text-sm font-medium font-['Inter'] leading-tight tracking-tight">
                    Registration
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export function Header_Image() {
  return (
    <>
      <Image
        src="/ui/header_image.png"
        alt="About AIFSM 2025"
        width={1920}
        height={200}
        className="object-cover overflow-hidden h-[300px]"
        priority
      />
    </>
  );
}
