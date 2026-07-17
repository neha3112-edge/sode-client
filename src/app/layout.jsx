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
  description: "SODE",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Puri app ko Redux Store ke andar wrap kar diya */}
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
