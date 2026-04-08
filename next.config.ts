import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permanently whitelists your cloud environment IP for the dev server
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;