import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import UniversityDetailView from "@/features/university/views/UniversityDetailView";
import { getUniversityBySlug, getUniversities } from "@/services/api";

export const revalidate = 3600; // ISR revalidation: 1 hour

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const uni = await getUniversityBySlug(slug);

  if (!uni) {
    return {
      title: "University Details | SODE",
      description: "Explore accredited online and distance universities with SODE.",
    };
  }

  return {
    title: `${uni.name} Admission & Details`,
    description: uni.description?.substring(0, 160) || `Learn more about ${uni.name} accreditation, courses, fees, and eligibility.`,
    openGraph: {
      title: `${uni.name} Admission & Details`,
      description: uni.description?.substring(0, 160),
      type: "website",
    }
  };
}

// Generate static params for SSG
export async function generateStaticParams() {
  const universities = await getUniversities();
  return universities.map((uni) => ({
    slug: uni.slug,
  }));
}

export default async function UniversityDetailPage({ params }) {
  const { slug } = await params;
  const university = await getUniversityBySlug(slug);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <UniversityDetailView slug={slug} initialUniversity={university} />
      </main>
      <Footer />
    </div>
  );
}
