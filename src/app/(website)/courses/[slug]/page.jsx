"use client";

import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import CourseDetailView from "@/features/course/views/CourseDetailView";

export default function CourseDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CourseDetailView />
      </main>
      <Footer />
    </div>
  );
}
