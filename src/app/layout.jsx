import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
