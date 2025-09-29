import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "94.136.191.187",
        port: "8090",
        pathname: "/api/files/players/**",
      },
      {
        hostname: "*.aifsm2025.in",
        pathname: "/api/files/**",
      }
    ],
  },
};

export default nextConfig;
