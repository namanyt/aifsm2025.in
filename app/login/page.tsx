import { Header_Image } from "@/components/common/header";
import type { Metadata } from "next";
import { LoginForm } from "@/components/common/loginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to AIFSM 2025 - All India Forest Sports Meet 2025",
};

export default function Login() {
  return (
    <div>
      <Header_Image />

      <div className="absolute left-1/2 transform -translate-x-1/2 top-80 text-center">
        {/* blur background around the login text */}
        <div className="dark:bg-gray-50/30 backdrop-blur-xs rounded-lg py-4 px-10 shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-[#c96e00] mt-2">Login</h1>
          {/* a small horizontal line thick */}
          <div className="border-b-4 border-[#c96e00] w-24 mx-auto mb-4"></div>
        </div>
      </div>

      {/* align it to the center of this div */}
      <div className="mt-20 mb-20 px-4 flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
