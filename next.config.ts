/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // 👈 disables Turbopack
  },
  eslint: {
    ignoreDuringBuilds: true, // 👈 skips ESLint in `next build`
  },
};

module.exports = nextConfig;
