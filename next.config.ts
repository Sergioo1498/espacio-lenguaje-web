import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Force 301 permanent redirect from non-www to www for SEO canonical consolidation
        source: "/:path*",
        has: [{ type: "host", value: "espaciolenguaje.com" }],
        destination: "https://www.espaciolenguaje.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
