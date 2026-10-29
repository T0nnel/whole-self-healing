import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/workshops",
        destination: "/workshop",
        permanent: true,
      },
      {
        source: "/book",
        destination: "/workshop",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/coaching",
        permanent: false,
      },
      {
        source: "/services",
        destination: "/coaching",
        permanent: false,
      },
      {
        source: "/apply",
        destination: "/coaching",
        permanent: false,
      },
      {
        source: "/bibi",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
