import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['i5.walmartimages.com', 'lh3.googleusercontent.com'],
  },
  // Enable standalone output for Docker deployments
  output: 'standalone',
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },
};

export default nextConfig;
