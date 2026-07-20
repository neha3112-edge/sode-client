import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import CourseListView from "@/features/course/views/CourseListView";
import { getCourses } from "@/services/api";
import { getPageMetaData } from "@/constants/pageMetaData";

export const revalidate = 300; // ISR revalidation: 5 minutes

export async function generateMetadata() {
  const pageMeta = await getPageMetaData("/courses");

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

export default async function CoursesPage() {
  const initialCourses = await getCourses();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CourseListView initialCourses={initialCourses} />
      </main>
      <Footer />
    </div>
  );
}
