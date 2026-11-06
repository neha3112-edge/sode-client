import { Roboto } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://mysode.com")
  ),
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${roboto.variable} font-sans h-full antialiased`}
    >
      <head>
        <link rel="dns-prefetch" href="https://api.crm.mysode.com" />
      </head>
      <body className={`${roboto.className} min-h-full flex flex-col`} suppressHydrationWarning>
        <AppProviders>
          {children}
        </AppProviders>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
