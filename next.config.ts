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
        hostname: "192.168.29.6",
        port: "8090",
        pathname: "/api/files/players/**",
      },
    ],
  },
};

export default nextConfig;
