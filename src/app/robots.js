export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sode.co.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin-dashboard/", "/login"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
