import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 700, 1080, 1920],
  },
};

export default nextConfig;
