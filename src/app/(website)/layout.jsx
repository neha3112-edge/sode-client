import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import MobileBottomNav from "@/components/website/MobileBottomNav";
import { request } from "@/services/request";

export default async function WebsiteLayout({ children }) {
  const headerRes = await request.dynamicRead({
    entity: "header",
    endPoint: "public/by-slug",
    slug: "global",
    revalidate: 0,
  });

  const headerData = headerRes?.result || headerRes;

  return (
    <div className="flex flex-col min-h-screen">
      <Header initialHeaderData={headerData} />
      <main className="grow pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
