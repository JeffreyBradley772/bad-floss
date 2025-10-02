import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['i5.walmartimages.com', 'lh3.googleusercontent.com'],
  },
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'lucide-react'],
  },
  // Enable standalone output for Docker deployment
  output: 'standalone',

  // Ensure environment variables are available at runtime
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  // Webpack configuration to ensure environment variables are available
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure environment variables are available in server-side code
      config.externals = config.externals || [];
    }
    return config;
  },
};

export default nextConfig;
