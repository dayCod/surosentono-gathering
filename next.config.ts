import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static HTML export
  images: {
    unoptimized: true, // Karena static export tidak support Image Optimization
  },
};

export default nextConfig;
