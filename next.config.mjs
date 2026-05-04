/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "atosausa.com" },
      { protocol: "https", hostname: "refrigerationx.com" },
      { protocol: "https", hostname: "gsw-usa.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;

