import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import CourseListView from "@/features/course/views/CourseListView";
import { getCourses } from "@/services/api";

export const revalidate = 3600; // ISR revalidation: 1 hour

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
