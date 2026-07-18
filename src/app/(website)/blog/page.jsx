import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import BlogListView from "@/features/blog/views/BlogListView";
import { getBlogs } from "@/services/api";

export const revalidate = 3600; // ISR revalidation: 1 hour

export default async function BlogPage() {
  const initialBlogs = await getBlogs();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <BlogListView initialBlogs={initialBlogs} />
      </main>
      <Footer />
    </div>
  );
}
