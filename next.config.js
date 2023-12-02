/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "api.pagosvirtualesperu.com",
        hostname: "www.documentosvirtuales.com",
      },
    ],
  },
};

module.exports = nextConfig;
