import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimización de imágenes — next/image servirá AVIF/WebP cuando el navegador
  // lo soporte, reduciendo 60-80% el peso vs PNG/JPG originales.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },
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
  async headers() {
    return [
      {
        source: "/llms.txt",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/llms-full.txt",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
