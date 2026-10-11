import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "central.mprar.com", "growza.me", "journeywise-ai.vercel.app", "kuanta.ai"],
  },
};

export default nextConfig;
