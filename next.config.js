/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src', 'scripts'],
  },
  output: 'export',
};

module.exports = nextConfig;
