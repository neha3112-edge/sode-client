import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import CourseListView from "@/features/course/views/CourseListView";
import { getCourses } from "@/services/api";

export const revalidate = 3600; // ISR revalidation: 1 hour

export const metadata = {
  title: "Explore Online & Distance Courses | Distance Education School",
  description: "Browse top accredited distance & online MBA, BBA, MCA, BCA, DBA and executive degree programs from leading universities.",
  openGraph: {
    title: "Explore Online & Distance Courses | Distance Education School",
    description: "Browse top accredited distance & online MBA, BBA, MCA, BCA, DBA and executive degree programs from leading universities.",
  },
};

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
