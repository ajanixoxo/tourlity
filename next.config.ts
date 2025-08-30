import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [new URL('https://images.unsplash.com/**')],
  },
    server: {
    host: '0.0.0.0',
    port: 3000
  }  
  
};

export default nextConfig;
