import { Header_Image } from "@/components/common/header";
import type { Metadata } from "next";
import { RegisterForm } from "@/components/common/registerForm";

export const metadata: Metadata = {
  title: "Registration",
  description: "Registration for AIFSM 2025 - All India Forest Sports Meet 2025",
};

export default function Registration() {
  return (
    <div className="relative min-h-screen">
      <Header_Image image="default" />

      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-[75px] sm:top-[100px] md:top-[125px] lg:top-[150px] text-center z-10">
        <div className="bg-white/20 dark:bg-gray-400/40 backdrop-blur-md border border-white/30 rounded-2xl py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-12 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:bg-white/25">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 md:mb-4 text-white drop-shadow-lg">
            Registration
          </h1>
          <div className="border-b-4 border-white w-12 sm:w-16 md:w-20 lg:w-24 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* align it to the center of this div */}
      <div className="mt-20 mb-20 px-4 flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
