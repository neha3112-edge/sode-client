import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import UniversityListView from "@/features/university/views/UniversityListView";
import { getUniversities } from "@/services/api";
import { getPageMetaData } from "@/constants/pageMetaData";

export const revalidate = 300; // ISR revalidation: 5 minutes

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/universities");

  return {
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords,
    alternates: {
      canonical: pageMeta.canonicalUrl,
    },
    openGraph: {
      title: pageMeta.ogTitle,
      description: pageMeta.ogDescription,
      images: [{ url: pageMeta.ogImage }],
    },
    twitter: {
      card: pageMeta.twitterCard,
      title: pageMeta.ogTitle,
      description: pageMeta.ogDescription,
      images: [pageMeta.ogImage],
    },
  };
}

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
