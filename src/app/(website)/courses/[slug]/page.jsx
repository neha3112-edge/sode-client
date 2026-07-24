import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import CourseDetailView from "@/features/course/views/CourseDetailView";
import { getCourseBySlug, getWebsiteCourseRead } from "@/services/api";

export const revalidate = 300; // Next.js ISR: Revalidate static HTML cache every 5 minutes

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const courseData = await getWebsiteCourseRead(slug).catch(() => getCourseBySlug(slug));
  const course = courseData?.program || courseData;
  
  const title = course?.title || "Course Details";
  const desc = course?.description?.substring(0, 160) || `Learn more about ${title} distance program eligibility, duration, and fees.`;

  return {
    title: `${title} - Distance Education School`,
    description: desc,
    openGraph: {
      title: `${title} - Distance Education School`,
      description: desc,
      type: "website",
    }
  };
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const courseData = await getWebsiteCourseRead(slug).catch(() => getCourseBySlug(slug));
  const course = courseData?.program || courseData;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CourseDetailView slug={slug} initialCourse={course} />
      </main>
      <Footer />
    </div>
  );
}
