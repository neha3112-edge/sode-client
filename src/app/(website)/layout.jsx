import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import MobileBottomNav from "@/components/website/MobileBottomNav";

export default function WebsiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
