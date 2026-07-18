"use client";

import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import UniversityDetailView from "@/features/university/views/UniversityDetailView";

export default function UniversityDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <UniversityDetailView />
      </main>
      <Footer />
    </div>
  );
}
