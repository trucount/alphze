/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['commondatastorage.googleapis.com'],
  },
}

module.exports = nextConfig

