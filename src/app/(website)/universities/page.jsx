import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import UniversityListView from "@/features/university/views/UniversityListView";
import { getUniversities } from "@/services/api";

export const revalidate = 3600; // ISR revalidation: 1 hour

export default async function UniversitiesPage() {
  const initialUniversities = await getUniversities();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <UniversityListView initialUniversities={initialUniversities} />
      </main>
      <Footer />
    </div>
  );
}
