/** @type {import('next').NextConfig} */
const MINIO_PUBLIC_URL = process.env.NEXT_PUBLIC_MINIO_URL || "http://172.236.183.64:9000";

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  allowedDevOrigins: ["192.168.1.68", "localhost", "127.0.0.1"],

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
        hostname: "172.236.183.64",
        port: "9000",
        pathname: "/**",
      },
    ],
    // Proxy path se same-domain pe serve hoti hain so no CORS issue
    unoptimized: true,
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
