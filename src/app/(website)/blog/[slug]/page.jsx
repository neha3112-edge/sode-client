"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Breadcrumb, Button, Tag, Skeleton, Collapse } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleFilled,
  QuestionCircleOutlined,
  UserOutlined,
  UnorderedListOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { ArrowLeft } from "lucide-react";
import { getBlogBySlug } from "@/services/api";
import { getAssetPath } from "@/lib/utils";

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug;

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      setLoading(true);
      getBlogBySlug(slug)
        .then((res) => {
          if (!isMounted) return;
          if (res) {
            setPageData(res);
          }
        })
        .catch((err) => console.error("Error loading blog details:", err))
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    } else {
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const blog = pageData?.blogId || {};
  const headline = pageData?.headline || blog.title || "Blog Post";
  const subHeadline = pageData?.subHeadline || blog.excerpt || "";
  const categoryName = blog.category?.name || "Education";
  const bannerSrc = getAssetPath(pageData?.bannerImage || blog.coverImage);
  const authorName = pageData?.author?.fullname || blog.author?.fullname || "Editorial Team";
  const readTime = blog.readTime || "5 min read";
  const highlights = pageData?.highlights || [];
  const stats = pageData?.stats || [];
  const faqs = pageData?.faqs || [];
  const relatedBlogs = pageData?.relatedBlogs || [];

  return (
    <div className="bg-[#f8fafc] min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 🧭 Top Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-3 bg-white p-3.5 sm:p-4 px-4 sm:px-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.back()}
              type="button"
              className="p-1 rounded-full text-slate-600 hover:text-slate-900 transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center -ml-1"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Breadcrumb
              items={[
                { title: <Link href="/" className="text-slate-500 hover:text-slate-800 font-medium">Home</Link> },
                { title: <Link href="/blog" className="text-slate-500 hover:text-slate-800 font-medium">Blog</Link> },
                { title: <span className="font-semibold text-slate-800">{categoryName}</span> },
              ]}
            />
          </div>
          <Button
            type="text"
            onClick={() => router.push("/blog")}
            className="hidden sm:flex items-center font-semibold text-slate-600 hover:text-[#046bd2] p-0 h-auto cursor-pointer"
          >
            All Blogs
          </Button>
        </div>

        {loading ? (
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <Skeleton.Input active size="small" style={{ width: 140, height: 24, marginBottom: 12 }} />
            <Skeleton active paragraph={{ rows: 2 }} />
            <Skeleton.Image active style={{ width: "100%", height: 380, borderRadius: 16 }} />
            <Skeleton active paragraph={{ rows: 10 }} />
          </div>
        ) : (
          <article className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 md:p-10 space-y-7">
            {/* Article Header */}
            <div className="space-y-3.5 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="inline-block bg-[#046bd2]/10 text-[#046bd2] font-bold text-xs px-3 py-1 rounded-md">
                  {categoryName}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-slate-900 leading-tight m-0">
                {headline}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-500 font-medium pt-1">
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <UserOutlined className="text-[#046bd2]" /> {authorName}
                </span>
                {blog.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <CalendarOutlined /> {new Date(blog.publishedAt).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <ClockCircleOutlined /> {readTime}
                </span>
              </div>
            </div>

            {/* Cover Banner Image */}
            {bannerSrc && (
              <div className="relative w-full h-64 sm:h-80 md:h-105 lg:h-120 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                <Image
                  src={bannerSrc}
                  alt={headline}
                  fill
                  priority
                  loading="eager"
                  fetchPriority="high"
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            )}

            {/* Sub-Headline / Lead Paragraph */}
            {subHeadline && (
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 sm:p-5 rounded-2xl border-l-4 border-[#046bd2] m-0">
                {subHeadline}
              </p>
            )}

            {/* 📑 Table of Contents (TOC) Box */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-5 my-6">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-base mb-3">
                <UnorderedListOutlined className="text-[#046bd2]" /> Table of Contents
              </div>
              <ul className="space-y-2.5 text-sm text-[#046bd2] list-none p-0 m-0 pl-1">
                {highlights.length > 0 && (
                  <li>
                    <a href="#highlights" className="hover:underline flex items-center gap-1.5 text-slate-700 hover:text-[#046bd2] font-medium">
                      <span className="text-[#046bd2] font-semibold">•</span> Key Highlights & Features
                    </a>
                  </li>
                )}
                {stats.length > 0 && (
                  <li>
                    <a href="#fast-facts" className="hover:underline flex items-center gap-1.5 text-slate-700 hover:text-[#046bd2] font-medium">
                      <span className="text-[#046bd2] font-semibold">•</span> Fast Facts & Key Metrics
                    </a>
                  </li>
                )}
                {faqs.length > 0 && (
                  <li>
                    <a href="#faqs" className="hover:underline flex items-center gap-1.5 text-slate-700 hover:text-[#046bd2] font-medium">
                      <span className="text-[#046bd2] font-semibold">•</span> Frequently Asked Questions (FAQs)
                    </a>
                  </li>
                )}
                {relatedBlogs.length > 0 && (
                  <li>
                    <a href="#related" className="hover:underline flex items-center gap-1.5 text-slate-700 hover:text-[#046bd2] font-medium">
                      <span className="text-[#046bd2] font-semibold">•</span> Related Blog Posts
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* 📌 Key Highlights Section */}
            {highlights.length > 0 && (
              <section id="highlights" className="pt-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <ReadOutlined className="text-[#046bd2]" />
                  Key Highlights & Takeaways
                </h2>
                <div className="space-y-3">
                  {highlights.map((item, index) => (
                    <div key={index} className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircleFilled className="text-emerald-600 text-base shrink-0 mt-0.5" />
                      <div className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 📊 Fast Facts Table & Metrics */}
            {stats.length > 0 && (
              <section id="fast-facts" className="pt-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  Fast Facts & Course Overview
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-slate-200 rounded-xl overflow-hidden text-left text-sm sm:text-base">
                    <thead className="bg-[#f1f5f9]">
                      <tr>
                        <th className="border border-slate-200 p-3.5 font-bold text-slate-900">Feature / Parameter</th>
                        <th className="border border-slate-200 p-3.5 font-bold text-[#046bd2]">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.map((st, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                          <td className="border border-slate-200 p-3.5 font-semibold text-slate-700">{st.label}</td>
                          <td className="border border-slate-200 p-3.5 font-bold text-slate-900">{st.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* ❓ FAQs Accordion */}
            {faqs.length > 0 && (
              <section id="faqs" className="pt-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <QuestionCircleOutlined className="text-amber-500" />
                  Frequently Asked Questions (FAQs)
                </h2>
                <Collapse
                  accordion
                  bordered
                  className="bg-white rounded-xl border border-slate-200"
                  items={faqs.map((faq, i) => ({
                    key: String(i),
                    label: <span className="font-bold text-slate-800 text-sm sm:text-[15px]">{faq.question}</span>,
                    children: <div className="text-sm text-slate-600 leading-relaxed">{faq.answer}</div>,
                    className: "border-b border-slate-200 last:border-b-0",
                  }))}
                />
              </section>
            )}

            {/* 👤 Author Bio Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-[#046bd2] text-white flex items-center justify-center text-xl font-bold shrink-0">
                <UserOutlined />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base m-0 mb-1">{authorName}</h4>
                <p className="text-xs sm:text-sm text-slate-500 m-0 leading-normal">
                  Higher Education Research & Admissions Team at SODE. Providing verified guidance on UGC-DEB approved university admissions.
                </p>
              </div>
            </div>

            {/* 🔗 Related Blogs Section */}
            {relatedBlogs.length > 0 && (
              <section id="related" className="pt-6 border-t border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Related Articles & Guides
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedBlogs.map((rel) => {
                    const relImg = getAssetPath(rel.coverImage);
                    return (
                      <Link
                        key={rel._id}
                        href={`/blog/${rel.slug}`}
                        className="group block bg-slate-50 rounded-xl border border-slate-200 p-3.5 hover:border-[#046bd2] transition-colors no-underline"
                      >
                        {relImg && (
                          <div className="relative w-full h-36 rounded-lg overflow-hidden mb-2.5 bg-slate-200">
                            <Image src={relImg} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-200" />
                          </div>
                        )}
                        <Tag color="blue" className="rounded text-[10px] font-bold mb-1 border-none">
                          {rel.category?.name || "Education"}
                        </Tag>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-[#046bd2] transition-colors m-0">
                          {rel.title}
                        </h4>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </article>
        )}
      </div>
    </div>
  );
}
