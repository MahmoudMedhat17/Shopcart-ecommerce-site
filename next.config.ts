import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Here we make Next js to run the home page as /client when the npm run dev runs.
  async redirects() {
    return [
      {
        source: "/",
        destination: "/client",
        permanent: true,
      },
    ];
  },
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
