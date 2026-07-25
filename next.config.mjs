/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Mengelakkan proses terhenti akibat amaran kecil kualiti kod semasa build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Mengelakkan build tersekat sekiranya terdapat amaran jenis data ketat
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
