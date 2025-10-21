/** @type {import('next').NextConfig} */
const nextConfig = {
  // raw.githubusercontent.com'dan resim çekmek için izin
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