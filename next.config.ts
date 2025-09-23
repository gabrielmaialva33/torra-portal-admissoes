import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath:
    process.env.NODE_ENV === "production" ? "/torra-portal-admissoes" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/torra-portal-admissoes" : "",
  images: {
    unoptimized: true,
  },
  // Trailing slash for better GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
