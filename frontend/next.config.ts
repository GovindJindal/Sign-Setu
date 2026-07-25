import type { NextConfig } from "next";

if (typeof global !== "undefined" && typeof global.localStorage !== "undefined") {
  try {
    delete (global as any).localStorage;
  } catch (e) {}
}
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;