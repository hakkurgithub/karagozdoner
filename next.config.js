/** @type {import('next').NextConfig} */
const nextConfig = {
  // === DİL GÜNCELLEMESİ (Yorum) ===
  // Engedély képek betöltésére a raw.githubusercontent.com-ról
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/hakkurgithub/images/main/**',
      },
    ],
  },
};

module.exports = nextConfig;