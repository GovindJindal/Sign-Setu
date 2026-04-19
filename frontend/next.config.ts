import type { NextConfig } from "next";

if (typeof global !== "undefined" && typeof global.localStorage !== "undefined") {
  try {
    delete (global as any).localStorage;
  } catch (e) {}
}

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;