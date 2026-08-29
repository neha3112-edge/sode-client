/** @type {import('next').NextConfig} */
const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_URL || "https://new.crm.api.mysode.com/minio";

const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "192.168.1.63",
    "192.168.1.68",
    "192.168.1.*",
    "localhost",
    "127.0.0.1",
  ],

  images: {
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

  async rewrites() {
    return [
      {
        // /media/:bucket/:year/:month/:day/:file -> MinIO
        source: "/media/:path*",
        destination: `${MINIO_PUBLIC_URL}/:path*`,
      },
    ];
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "antd",
      "@ant-design/icons",
      "lottie-react",
      "react-icons",
    ],
  },
};

export default nextConfig;
