import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import BlogDetailView from "@/features/blog/views/BlogDetailView";

export async function generateStaticParams() {
  return [
    { slug: "understanding-ugc-deb-approvals" },
    { slug: "is-online-dba-worth-it" },
    { slug: "balancing-distance-studies-and-work" },
  ];
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <BlogDetailView slug={slug} />
      </main>
      <Footer />
    </div>
  );
}
