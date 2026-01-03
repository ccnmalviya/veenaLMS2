import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',  // Required for static export to Firebase Hosting
  images: {
    unoptimized: true,  // Required for static export
  },
};

export default nextConfig;
