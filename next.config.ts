import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Disable experimental features that might cause issues
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
