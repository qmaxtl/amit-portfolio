/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
};

export default nextConfig;
