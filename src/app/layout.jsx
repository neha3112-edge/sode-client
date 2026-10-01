import { Roboto, Poppins, Montserrat, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
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
      data-scroll-behavior="smooth"
      className={`${roboto.variable} ${poppins.variable} ${montserrat.variable} ${barlowCondensed.variable} font-sans h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://new.crm.api.mysode.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://new.crm.api.mysode.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;0,900;1,700;1,800&family=Oswald:wght@600;700&display=swap" />
      </head>
      <body className={`${roboto.className} font-roboto min-h-full flex flex-col`} suppressHydrationWarning>
        <AppProviders>
          {children}
        </AppProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
