/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "energized-cod-255.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
