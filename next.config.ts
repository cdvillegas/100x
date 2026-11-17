import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  watchOptions: {
    pollIntervalMs: 1000,
  },
};

export default nextConfig;
