import React, { Suspense } from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import CourseListView from "@/features/course/views/CourseListView";
import { getCourses, getUniversities } from "@/services/api";
import { getPageMetaData } from "@/constants/pageMetaData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/courses");

  return {
    title: pageMeta?.title || "Select Online Course & Top Universities",
    description: pageMeta?.description || "Compare fees, approvals, and curriculum for distance MBA, MCA, DBA, BBA, BCA programs.",
    keywords: pageMeta?.keywords,
    alternates: {
      canonical: pageMeta?.canonicalUrl,
    },
    openGraph: {
      title: pageMeta?.ogTitle || "Select Online Course & Top Universities",
      description: pageMeta?.ogDescription,
      images: pageMeta?.ogImage ? [{ url: pageMeta.ogImage }] : [],
    },
  };
}

export default async function CoursesPage({ searchParams }) {
  const params = (await searchParams) || {};

  const [initialCourses, initialUniversities] = await Promise.all([
    getCourses(params),
    getUniversities(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <CourseListView initialCourses={initialCourses} initialUniversities={initialUniversities} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
