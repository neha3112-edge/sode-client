"use client";

import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import CourseListView from "@/features/course/views/CourseListView";

export default function CoursesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CourseListView />
      </main>
      <Footer />
    </div>
  );
}
