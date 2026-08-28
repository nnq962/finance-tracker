import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.2.65",
    "10.70.22.33",
    "*.local",
  ],
};

export default nextConfig;