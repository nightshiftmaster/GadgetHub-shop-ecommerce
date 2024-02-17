/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.example.com",
        port: "",
      },
    ],
    domains: [
      "via.placeholder.com",
      "i.dummyjson.com",
      "static.vecteezy.com",
      "idme-marketplace.s3.amazonaws.com",
      "www.gadstyle.com",
      "img.freepik.com",
      "cdn.dummyjson.com",
      "i.ytimg.com",
      "png.pngtree.com",
    ],
  },
};

module.exports = nextConfig;
