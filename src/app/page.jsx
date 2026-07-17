// app/page.js
"use client";

import { useGetDynamicListQuery } from "@/redux/dynamic/action";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const { data, isLoading } = useGetDynamicListQuery({
    entity: "health",
    endPoint: "data",
  });

  console.log("st", data);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6"></main>
      <Footer />
    </div>
  );
}
