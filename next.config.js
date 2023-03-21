/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.thecocktaildb.com",
        port: "",
        pathname: "/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**/**.{jpg,jpeg,png,svg,bmp}",
      },
    ],
  },
};

module.exports = nextConfig;
