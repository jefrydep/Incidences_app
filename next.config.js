/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "api.pagosvirtualesperu.com",
      },
    ],
  },
};

module.exports = nextConfig;
