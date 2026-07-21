import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import UniversityCompareView from "@/features/university/views/UniversityCompareView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Compare Online & Distance Universities Side-by-Side | Distance Education School",
  description: "Compare UGC & WES approved distance and online universities. Evaluate fees, eligibility, course options, and accreditations side-by-side.",
};

export default function ComparePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <UniversityCompareView />
      </main>
      <Footer />
    </div>
  );
}
