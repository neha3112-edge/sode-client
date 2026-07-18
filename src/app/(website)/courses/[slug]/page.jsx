import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import CourseDetailView from "@/features/course/views/CourseDetailView";
import { getCourseBySlug, getCourses } from "@/services/api";

export const revalidate = 3600; // ISR revalidation: 1 hour

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  
  return {
    title: `${course.title} - Distance Education School`,
    description: course.description?.substring(0, 160) || `Learn more about ${course.title} distance program eligibility, duration, and fees.`,
    openGraph: {
      title: `${course.title} - Distance Education School`,
      description: course.description?.substring(0, 160),
      type: "website",
    }
  };
}

// Generate static params for SSG
export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  
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
