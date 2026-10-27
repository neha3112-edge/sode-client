/** @type {import('next').NextConfig} */
const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_URL || "https://api.crm.mysode.com/minio";

const BACKEND_URL =
  process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_DEV_REMOTE === "remote"
    ? (process.env.NEXT_PUBLIC_REMOTE_BACKEND_SERVER || "https://api.crm.mysode.com").replace(/\/+$/, "")
    : (process.env.NEXT_PUBLIC_LOCAL_BACKEND_SERVER || "http://localhost:3000").replace(/\/+$/, "");

const nextConfig = {
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  allowedDevOrigins: [
    "192.168.1.63",
    "192.168.1.68",
    "192.168.1.*",
    "localhost",
    "127.0.0.1",
  ],
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "antd",
      "@ant-design/icons",
      "lucide-react",
      "react-icons",
    ],
  },

  // 🚀 Fast Edge & Browser Caching Headers (Zero speed slowdown)
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=86400, immutable",
          },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        // Reverse proxy all /api/* client calls to the backend server
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
      {
        source: "/download/:path*",
        destination: `${BACKEND_URL}/download/:path*`,
      },
      {
        // ⚡ Clean /images/:path* -> MinIO Images Direct Proxy
        source: "/images/:path*",
        destination: "https://api.crm.mysode.com/images/:path*",
      },
      {
        source: "/media/:path*",
        destination: `${MINIO_PUBLIC_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
