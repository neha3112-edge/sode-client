"use client";

import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import BlogListView from "@/features/blog/views/BlogListView";

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <BlogListView />
      </main>
      <Footer />
    </div>
  );
}
