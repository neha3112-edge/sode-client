import { Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";
import { CompareProvider } from "@/context/CompareContext";
import CompareDrawerWidget from "@/components/website/CompareDrawerWidget";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "SODE",
  description: "School of Online & Distance Education",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${montserrat.variable} font-sans h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://sode.api.mysode.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://sode.api.mysode.com" />
      </head>
      <body className={`${montserrat.className} min-h-full flex flex-col`} suppressHydrationWarning>
        <StoreProvider>
          <CompareProvider>
            {children}
            <CompareDrawerWidget />
          </CompareProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
