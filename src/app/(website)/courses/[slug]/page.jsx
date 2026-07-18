import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import CourseDetailView from "@/features/course/views/CourseDetailView";

export async function generateStaticParams() {
  return [
    { slug: "distance-mba" },
    { slug: "online-dba" },
    { slug: "distance-bba" },
    { slug: "online-mca" },
    { slug: "online-bca" },
  ];
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <CourseDetailView slug={slug} />
      </main>
      <Footer />
    </div>
  );
}
