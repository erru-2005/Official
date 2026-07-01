import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['5ad2-103-89-235-172.ngrok-free.app'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "njnjduztkvqnybntyalv.supabase.co",
      },
    ],
  },
};

export default nextConfig;
