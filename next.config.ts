import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for VPS deployment
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Environment variables validation
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "https://torra-admissoes.mahina.cloud",
  },
  // Disable experimental features that might cause issues
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;
