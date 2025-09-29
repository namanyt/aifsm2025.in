"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { pb } from "@/lib/db/pb";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLoggedIn(pb.authStore.isValid);
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
    <div className="w-full shadow-lg sticky top-0 z-50 bg-white">
      {/* Top Logo Section */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-24 py-3 md:py-4 bg-white">
        <div className="flex justify-between items-center gap-2 sm:gap-4">
          {/* Left Logos */}
          <div className="flex justify-start items-center gap-2 sm:gap-3 md:gap-5 flex-shrink-0">
            <img className="w-8 h-8 sm:w-10 sm:h-10" src="/logos/uk_rajya.png" alt="UK Rajya Logo" />
            <img className="w-8 h-8 sm:w-10 sm:h-10" src="/logos/uk_forest.png" alt="UK Forest Logo" />
          </div>

          {/* Center Text - Hidden on mobile */}
          <div className="hidden lg:block text-center flex-1 px-4">
            <div className="text-black text-base xl:text-xl font-medium font-['Inter'] leading-relaxed tracking-tight">
              28th All India Forest Sports Meet, 2025
              <br />
              Uttarakhand Forest Department
              <br />
              Government of Uttarakhand
            </div>
          </div>

          {/* Mobile Center Text - Visible only on mobile/tablet */}
          <div className="lg:hidden text-center flex-1 px-2">
            <div className="text-black text-xs sm:text-sm md:text-base font-medium font-['Inter'] leading-snug">
              28th All India Forest Sports Meet, 2025
            </div>
          </div>

          {/* Right Logos */}
          <div className="flex justify-end items-center gap-2 sm:gap-3 md:gap-5 flex-shrink-0">
            <img className="w-12 h-6 sm:w-16 sm:h-8 md:w-20 md:h-10" src="/logos/life_for_env.png" alt="Life for Environment Logo" />
            <img className="w-8 h-8 sm:w-10 sm:h-10" src="/logos/nature_logo.png" alt="Nature Logo" />
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="w-full px-4 sm:px-6 md:px-12 lg:px-24 py-2 bg-white border-t border-zinc-100">
        <div className="flex justify-between items-center">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-start items-center gap-2 xl:gap-4 2xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 xl:px-4 py-2 transition-colors rounded text-sm font-${isActive(item.href) ? "bold" : "medium"
                  } font-['Inter'] leading-tight tracking-tight whitespace-nowrap
                  ${isActive(item.href)
                    ? "bg-green-900 text-white hover:bg-green-800"
                    : "text-black hover:text-[#4169E1]"
                  }
                cursor-pointer`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex justify-end items-center gap-3 xl:gap-5">
            {loggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#4169E1] text-center text-white hover:bg-[#274fa1] px-6 py-3 rounded-md font-semibold inline-block"
                >
                  Dashboard
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white cursor-pointer text-center px-6 py-3 rounded-md font-semibold"
                  onClick={() => {
                    pb.authStore.clear();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 xl:px-6 py-2 border-2 border-[#4169e1] bg-[#4169E1] rounded-lg flex justify-center items-center transition-colors hover:bg-[#274fa1] cursor-pointer"
                >
                  <span className="text-white text-sm font-medium font-['Inter'] leading-tight tracking-tight whitespace-nowrap">
                    Login
                  </span>
                </Link>
                <Link
                  href="/register"
                  className="px-4 xl:px-6 py-2 rounded-lg border-2 border-[#4169E1] flex justify-center items-center transition-colors hover:bg-blue-50 cursor-pointer"
                >
                  <span className="text-[#4169E1] text-sm font-medium font-['Inter'] leading-tight tracking-tight whitespace-nowrap">
                    Register
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-zinc-200 pt-4 space-y-2">
            {/* Mobile Navigation Links */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 transition-colors rounded text-sm font-${isActive(item.href) ? "bold" : "medium"
                  } font-['Inter']
                  ${isActive(item.href)
                    ? "bg-green-900 text-white"
                    : "text-black hover:bg-gray-100"
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Action Buttons */}
            <div className="pt-4 space-y-2 border-t border-zinc-200">
              {loggedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-[#4169E1] w-full text-center text-white hover:bg-[#274fa1] px-6 py-3 rounded-md font-semibold inline-block"
                  >
                    Dashboard
                  </Link>
                  <button
                    className="bg-red-500 w-full hover:bg-red-400 text-white cursor-pointer text-center px-6 py-3 rounded-md font-semibold"
                    onClick={() => {
                      pb.authStore.clear();
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 bg-[#4169E1] rounded-lg text-center text-white text-sm font-medium font-['Inter'] hover:bg-[#274fa1]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full px-4 py-3 rounded-lg border-2 border-[#4169E1] text-center text-[#4169E1] text-sm font-medium font-['Inter'] hover:bg-blue-50"
                  >
                    Registration
                  </Link>
                </>
              )}
            </div>
          </div>
        )
        }
      </nav >
    </div >
  );
}

export function Header_Image() {
  return (
    <div className="w-full h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] relative">
      <Image
        src="/ui/header_image.png"
        alt="About AIFSM 2025"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
    </div>
  );
}
