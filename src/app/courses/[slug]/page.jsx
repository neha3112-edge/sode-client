import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import CourseDetailView from "@/features/course/views/CourseDetailView";
import { getWebsiteCourseRead } from "@/services/api";

export const revalidate = 0;
export const dynamic = "force-dynamic";

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const courseData = await getWebsiteCourseRead(slug);
  const course = courseData?.program || courseData;

  // Use subcourse title for SEO when navigated via subcourse slug
  let title = course?.title || "Course Details";
  if (course?.activeSubcourseSlug && Array.isArray(course?.universityOfferings)) {
    const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const offering = course.universityOfferings[course.activeOfferingIdx || 0];
    const matchedSub = offering?.subcourses?.find(s => slugify(s.title || "") === course.activeSubcourseSlug);
    if (matchedSub?.title) title = matchedSub.title;
  }
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
  const courseData = await getWebsiteCourseRead(slug);
  const course = courseData?.program || courseData;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <CourseDetailView slug={slug} initialCourse={course} />
      </main>
      <Footer />
    </div>
  );
}
