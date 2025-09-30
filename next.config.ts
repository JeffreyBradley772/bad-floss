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
  // Ensure environment variables are available at runtime
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
};

export default nextConfig;
