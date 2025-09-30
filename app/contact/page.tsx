import { Header_Image } from "@/components/common/header";
import { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact AIFSM 2025 - All India Forest Sports Meet 2025",
};

export default function Contact() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header_Image image="default" />

      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[75px] sm:top-[100px] md:top-[125px] lg:top-[150px] text-center z-10">
        <div className="bg-white/20 dark:bg-gray-400/40 backdrop-blur-md border border-white/30 rounded-2xl py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-12 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:bg-white/25">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">
            Contact Us
          </h1>
          <div className="border-b-4 border-white w-12 sm:w-16 md:w-20 lg:w-24 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Contact Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-16">
            {/* Contact Info Card */}
            <div className="flex flex-col items-center gap-6 w-full lg:w-auto">
              {/* Nodal Officer Card */}
              <div className="w-full max-w-sm bg-[#224231] rounded-xl overflow-hidden shadow-lg">
                <div className="p-6 text-center">
                  <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2">Shri PK Patro</h2>
                  <p className="text-white text-lg sm:text-xl font-bold mb-4">IFS AIFSM 2025</p>
                </div>

                <div className="bg-gradient-to-r from-transparent via-[#3F7D58] to-transparent py-4">
                  <p className="text-white text-lg sm:text-xl font-bold text-center">Nodal Officer</p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="flex flex-col gap-4 w-full max-w-sm">
                {/* Phone Card */}
                <div className="bg-[#224231] rounded-xl p-4 flex items-center gap-6">
                  <div className="bg-white rounded-full p-3 flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#224231]" />
                  </div>
                  <div className="text-white text-lg sm:text-xl lg:text-2xl font-bold">+91 94120 85077</div>
                </div>

                {/* Email Card */}
                <div className="bg-[#224231] rounded-xl p-4 flex items-center gap-6">
                  <div className="bg-white rounded-full p-3 flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#224231]" />
                  </div>
                  <div className="text-white text-base sm:text-lg lg:text-xl font-bold break-all">
                    aifsm.forest@uk.gov.in
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Image/Map Placeholder */}
            <div className="w-full max-w-2xl">
              <div className="rounded-xl aspect-video flex items-center justify-center">
                <Image src="/ui/contactimg.jpg" alt="Contact Us" width={800} height={450} />
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div className="text-center mb-12">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#9E5700]">Our Location</h2>
              <div className="w-12 sm:w-16 lg:w-20 h-1 bg-[#9E5700] rounded-full"></div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-200 h-64 sm:h-80 lg:h-96 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <p className="text-xl font-semibold">Interactive Map</p>
                <p className="text-sm mt-2">Google Maps or location map can be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
