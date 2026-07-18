import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import UniversityDetailView from "@/features/university/views/UniversityDetailView";

export async function generateStaticParams() {
  return [
    { slug: "golden-gate-university" },
    { slug: "subharti-university" },
    { slug: "mangalayatan-university" },
    { slug: "rushford-business-school" },
  ];
}

export default async function UniversityDetailPage({ params }) {
  const { slug } = await params;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <UniversityDetailView slug={slug} />
      </main>
      <Footer />
    </div>
  );
}
