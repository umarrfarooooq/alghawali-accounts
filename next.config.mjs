/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "apis.alghawalimanpower.com",
      "training.apis.v2.alghawalimanpower.com",
    ],
  },
};

export default nextConfig;
