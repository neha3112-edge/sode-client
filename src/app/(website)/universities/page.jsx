"use client";

import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import UniversityListView from "@/features/university/views/UniversityListView";

export default function UniversitiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <UniversityListView />
      </main>
      <Footer />
    </div>
  );
}
