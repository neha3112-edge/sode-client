"use client";

import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import BlogDetailView from "@/features/blog/views/BlogDetailView";

export default function BlogDetailPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <BlogDetailView />
      </main>
      <Footer />
    </div>
  );
}
