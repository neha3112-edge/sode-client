import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import BlogDetailView from "@/features/blog/views/BlogDetailView";
import { getBlogBySlug, getBlogs } from "@/services/api";

export const revalidate = 3600; // ISR revalidation: 1 hour

// Dynamic SEO Metadata Generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  return {
    title: `${blog.title} - Distance Education School`,
    description: blog.excerpt?.substring(0, 160) || `Read our latest blog post about ${blog.title}.`,
    openGraph: {
      title: `${blog.title} - Distance Education School`,
      description: blog.excerpt?.substring(0, 160),
      type: "article",
    }
  };
}

// Generate static params for SSG
export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <BlogDetailView slug={slug} initialBlog={blog} />
      </main>
      <Footer />
    </div>
  );
}
