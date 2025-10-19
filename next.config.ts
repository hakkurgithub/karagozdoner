import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'readdy.ai',
        port: '',
        pathname: '/api/search-image/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  // Vercel deployment için eklenen ayarlar
  serverExternalPackages: ['@vercel/postgres'],
  // Dosya yolu hatalarını çözmek için output directory değişikliği
  distDir: 'build',
};

export default nextConfig;