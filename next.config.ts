import type { NextConfig } from "next";
const { version } = require('./package.json');

const nextConfig: NextConfig = {
  env: {
    version
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev'
      }
    ]
  }
};

export default nextConfig;
