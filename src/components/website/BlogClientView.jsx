"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Skeleton, Collapse } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BankOutlined,
  BookOutlined,
  WhatsAppOutlined,
  LinkedinFilled,
  TwitterOutlined,
  FacebookFilled,
  ArrowRightOutlined,
  CheckCircleFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { ChevronRight, Share2, Award, TrendingUp } from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import WebsiteLayout from "@/components/layout/WebsiteLayout";
import FormWrapper from "@/components/forms/FormWrapper";
import SafeHtmlRenderer from "@/components/website/SafeHtmlRenderer";

function decodeHtml(html) {
  if (!html) return "";
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&hellip;/g, "...")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function processArticleContent(rawHtml, bannerUrl, relatedEntities = []) {
  if (!rawHtml) return "";

  let clean = rawHtml
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<div class="elementor-toc[\s\S]*?<\/div>\s*<\/div>/gi, "")
    .replace(/<section class="elementor-section[^"]*articles_sidebar[\s\S]*?<\/section>/gi, "")
    .replace(/<div class="elementor-widget-social-icons[\s\S]*?<\/div>\s*<\/div>/gi, "");

  if (bannerUrl) {
    const filename = bannerUrl.split("/").pop().replace(/\.[^.]+$/, "");
    if (filename && filename.length > 4) {
      const firstImgRegex = new RegExp(`<img[^>]*${filename}[^>]*>`, "i");
      clean = clean.replace(firstImgRegex, "");
    }
  }

  // ⚡ Dynamic University Comparison Table Generator from Live Database
  const universitiesList = Array.isArray(relatedEntities)
    ? relatedEntities
      .filter((r) => r?.entityType === "University" && r?.entityId)
      .map((r) => r.entityId)
    : [];

  if (
    clean.includes("[dynamic_university_comparison_table]") ||
    clean.includes("data-widget=\"university-comparison-table\"")
  ) {
    let dynamicTableHtml = "";
    if (universitiesList.length > 0) {
      const rowsHtml = universitiesList
        .map((uni, idx) => {
          const uniName = uni.name || "University";
          const uniSlug = uni.slug ? `/university/${uni.slug}` : "#";
          const naac = uni.naacRating?.name || uni.naacRating || "UGC Approved";
          const approvals = Array.isArray(uni.approvals)
            ? uni.approvals.map((a) => a.name || a.code || a).join(", ")
            : "UGC-DEB, AICTE";
          const feeRange = uni.feesDisplay || uni.feeStructure || "₹1,20,000 - ₹2,50,000";

          return `
            <tr class="hover:bg-blue-50/40 border-b border-slate-100 transition-colors">
              <td class="p-3.5 font-bold text-slate-900 border-r border-slate-100">
                <a href="${uniSlug}" class="text-[#046bd2] hover:underline font-bold">${uniName}</a>
              </td>
              <td class="p-3.5 text-slate-700 border-r border-slate-100 font-semibold">
                <span class="inline-block px-2 py-0.5 bg-amber-50 text-amber-900 border border-amber-200 rounded text-xs">${naac}</span>
              </td>
              <td class="p-3.5 text-slate-700 border-r border-slate-100 text-xs">${approvals}</td>
              <td class="p-3.5 text-emerald-800 font-bold border-r border-slate-100">${feeRange}</td>
              <td class="p-3.5 text-center">
                <a href="${uniSlug}" class="inline-flex items-center justify-center bg-[#046bd2] hover:bg-blue-700 text-white font-bold text-xs py-1.5 px-3 rounded-lg no-underline shadow-2xs">View Details &rarr;</a>
              </td>
            </tr>
          `;
        })
        .join("");

      dynamicTableHtml = `
        <div class="overflow-x-auto rounded-2xl border border-blue-200 my-6 shadow-xs bg-white">
          <div class="bg-blue-900 text-white p-3.5 font-bold text-sm flex items-center justify-between">
            <span>⚡ Live UGC-DEB Approved Universities (Real-time Database Sync)</span>
            <span class="text-xs text-blue-200">Auto-updated</span>
          </div>
          <table class="w-full text-left text-sm border-collapse">
            <thead class="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th class="p-3.5 font-bold text-slate-900 border-r border-slate-200">University Name</th>
                <th class="p-3.5 font-bold text-slate-900 border-r border-slate-200">NAAC Rating</th>
                <th class="p-3.5 font-bold text-slate-900 border-r border-slate-200">Approvals</th>
                <th class="p-3.5 font-bold text-slate-900 border-r border-slate-200">Live Fees</th>
                <th class="p-3.5 font-bold text-slate-900 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      `;
    }

    clean = clean
      .replace(/<div class="dynamic-widget-box" data-widget="university-comparison-table">[\s\S]*?<\/div>/gi, dynamicTableHtml)
      .replace(/\[dynamic_university_comparison_table\]/gi, dynamicTableHtml);
  }

  clean = clean.replace(
    /<a([^>]*?)>(Explore Now|Know More)<\/a>/gi,
    '<a $1 class="inline-flex items-center justify-center gap-1.5 w-full bg-[#046bd2] hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors my-2 no-underline cursor-pointer">$2 &rarr;</a>'
  );

  clean = clean
    .replace(/https?:\/\/new\.crm\.api\.mysode\.com\/minio\//gi, "/media/")
    .replace(/https?:\/\/[^"'\s<>]+:9000\//gi, "/media/");

  clean = clean
    .replace(/<table/g, '<div class="overflow-x-auto rounded-xl border border-slate-200 my-6 shadow-xs"><table class="w-full text-left text-sm border-collapse"')
    .replace(/<\/table>/g, "</table></div>")
    .replace(/<thead>/g, '<thead class="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">')
    .replace(/<th>/g, '<th class="p-3.5 font-bold text-slate-900 border-r border-slate-200 last:border-r-0">')
    .replace(/<td>/g, '<td class="p-3.5 text-slate-700 leading-relaxed border-r border-slate-100 last:border-r-0">')
    .replace(/<tr>/g, '<tr class="hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors">');

  return clean;
}

export default function BlogClientView({ initialData = null, initialPopularBlogs = [], slug = "" }) {
  const pageData = initialData;
  const popularBlogs = (initialPopularBlogs || []).filter((b) => b.slug !== slug);

  const blog = pageData?.blogId || pageData || {};
  const headline = pageData?.headline || blog.title || "Blog Post";
  const categoryName = blog.category?.name || (typeof blog.category === "string" ? blog.category : "Education");
  const bannerSrc = getAssetPath(pageData?.bannerImage || blog.coverImage);
  const authorName = pageData?.author?.fullname || blog.author?.fullname || "Jyoti Yadav";
  const readTime = blog.readTime || "6 min read";
  const rawContent = pageData?.content || blog.content || "";
  const relatedEntities = pageData?.relatedEntities || blog.relatedEntities || [];
  const salaryProgression = pageData?.salaryProgression || blog.salaryProgression || [];
  const specializationsGuide = pageData?.specializationsGuide || blog.specializationsGuide || [];
  const highlights = pageData?.highlights || blog.highlights || [];
  const faqs = pageData?.faqs || blog.faqs || [];
  const conclusion = pageData?.conclusion || blog.conclusion || {};

  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    : "August 26, 2026";

  const tocItems = useMemo(() => {
    if (!rawContent) return [];
    const headings = [];
    const regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
    let match;
    let index = 1;
    while ((match = regex.exec(rawContent)) !== null) {
      const text = match[1].replace(/<[^>]+>/g, "").trim();
      if (
        text &&
        !text.toLowerCase().includes("table of contents") &&
        !text.toLowerCase().includes("related posts")
      ) {
        const id = `heading-${index++}`;
        headings.push({ id, text: decodeHtml(text) });
      }
    }
    return headings;
  }, [rawContent]);

  const processedContent = useMemo(() => {
    if (!rawContent) return "";
    let clean = processArticleContent(rawContent, bannerSrc, pageData?.relatedEntities);
    let index = 1;
    clean = clean.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (full, attrs, inner) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (
        text.toLowerCase().includes("table of contents") ||
        text.toLowerCase().includes("related posts")
      ) {
        return "";
      }
      const id = `heading-${index++}`;
      return `<h2 id="${id}" ${attrs} class="text-xl sm:text-2xl font-extrabold text-slate-900 pt-6 pb-1 border-b border-slate-100 scroll-mt-24 mt-8 mb-3">${inner}</h2>`;
    });
    return clean;
  }, [rawContent, bannerSrc, pageData?.relatedEntities]);

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!blog?.title && !pageData?.headline) {
    return (
      <WebsiteLayout py="py-4 sm:py-6" bg="#f8fafc">
        <div className="max-w-7xl mx-auto space-y-5 px-3 sm:px-4 md:px-6">
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Blog Post Not Found</h2>
            <Link href="/blog" className="text-[#046bd2] font-semibold hover:underline">
              ← Back to all blogs
            </Link>
          </div>
        </div>
      </WebsiteLayout>
    );
  }

  return (
    <WebsiteLayout py="py-4 sm:py-6" bg="#f8fafc">
      <div className="max-w-7xl mx-auto space-y-5 px-3 sm:px-4 md:px-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium py-1">
          <Link href="/" className="text-slate-500 hover:text-[#046bd2] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="text-slate-500 hover:text-[#046bd2] transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
            {headline}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          <article className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-7 md:p-9 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-50 text-[#046bd2] font-bold text-xs px-3 py-1 rounded-md border border-blue-100 uppercase tracking-wider">
                {categoryName}
              </span>

              {relatedEntities.map((rel, idx) => {
                const entity = rel.entityId || {};
                const isCourse = rel.entityType === "Course" || rel.entityType === "SubCourse";
                const linkUrl = isCourse
                  ? `/courses/${entity.slug || ""}`
                  : `/university/${entity.slug || ""}`;

                return (
                  <Link
                    key={idx}
                    href={linkUrl}
                    className="inline-flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs px-3 py-1 rounded-md font-semibold transition-colors no-underline"
                  >
                    {isCourse ? (
                      <BookOutlined className="text-amber-600" />
                    ) : (
                      <BankOutlined className="text-amber-600" />
                    )}
                    <span>
                      {rel.entityType}: {entity.name || entity.courseName || rel.entityType}
                    </span>
                  </Link>
                );
              })}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-slate-900 leading-tight m-0 tracking-tight">
              {headline}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-y-2 py-3 border-y border-slate-100 text-xs sm:text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-3.5 flex-wrap">
                <span className="text-slate-800 font-semibold flex items-center gap-1">
                  <UserOutlined className="text-[#046bd2]" /> {authorName}
                </span>
                <span>•</span>
                <span>
                  <CalendarOutlined /> {formattedDate}
                </span>
                <span>•</span>
                <span>
                  <ClockCircleOutlined /> {readTime}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Share2 className="w-3.5 h-3.5" /> Share:
                </span>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(headline)}%20https://distanceeducationschool.com/blog/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center text-sm transition-colors"
                >
                  <WhatsAppOutlined />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://distanceeducationschool.com/blog/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-blue-50 text-[#046bd2] hover:bg-blue-100 flex items-center justify-center text-sm transition-colors"
                >
                  <LinkedinFilled />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(headline)}&url=https://distanceeducationschool.com/blog/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center text-sm transition-colors"
                >
                  <TwitterOutlined />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://distanceeducationschool.com/blog/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center justify-center text-sm transition-colors"
                >
                  <FacebookFilled />
                </a>
              </div>
            </div>

            {bannerSrc && (
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-xs">
                <Image
                  src={bannerSrc}
                  alt={headline}
                  fill
                  priority
                  loading="eager"
                  fetchPriority="high"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
            )}

            {tocItems.length > 0 && (
              <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                  <UnorderedListOutlined className="text-[#046bd2]" /> Table of Contents
                </div>
                <nav className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {tocItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToHeading(item.id)}
                      className="text-left text-slate-700 hover:text-[#046bd2] hover:underline flex items-start gap-1.5 bg-transparent border-none p-0 cursor-pointer leading-snug"
                    >
                      <span className="text-[#046bd2] font-bold shrink-0">{idx + 1}.</span>
                      <span>{item.text}</span>
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {highlights.length > 0 && (
              <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-100 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-[#046bd2] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Key Blog Takeaways
                </div>
                <ul className="space-y-2 m-0 p-0 list-none">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      <CheckCircleFilled className="text-[#046bd2] text-xs mt-1 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {processedContent ? (
              <div
                className="distance-blog-rich-content text-slate-700 text-base sm:text-[17px] leading-[1.85] space-y-5 
                    [&_.elementor-section]:my-4 [&_.elementor-container]:flex [&_.elementor-container]:flex-wrap [&_.elementor-container]:gap-4
                    [&_.elementor-inner-section]:bg-slate-50/60 [&_.elementor-inner-section]:p-4 [&_.elementor-inner-section]:rounded-2xl [&_.elementor-inner-section]:border [&_.elementor-inner-section]:border-slate-200/80 [&_.elementor-inner-section]:my-4
                    [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-slate-900 [&_h1]:mt-8 [&_h1]:mb-3 
                    [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-slate-900 [&_h2]:pt-4 [&_h2]:pb-1 [&_h2]:border-b [&_h2]:border-slate-100 [&_h2]:mt-6 [&_h2]:mb-2.5 
                    [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-5 [&_h3]:mb-2 
                    [&_p]:mb-3.5 [&_p]:leading-[1.85] 
                    [&_strong]:text-slate-900 [&_strong]:font-bold 
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1.5 [&_ul]:my-3
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1.5 [&_ol]:my-3
                    [&_li]:text-slate-700 [&_li]:leading-relaxed
                    [&_img]:max-h-[360px] [&_img]:w-full [&_img]:object-cover [&_img]:rounded-2xl [&_img]:border [&_img]:border-slate-200/80 [&_img]:my-3 [&_img]:shadow-2xs
                    [&_a]:text-[#046bd2] [&_a]:font-semibold [&_a]:underline hover:[&_a]:text-blue-800"
              >
                <SafeHtmlRenderer html={processedContent} />
              </div>
            ) : (
              <div className="space-y-4 text-slate-700 text-base sm:text-[17px] leading-[1.85]">
                {rawContent.split(/\n\s*\n/).map((p, idx) => (
                  <p key={idx} className="m-0 leading-relaxed text-slate-700">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {salaryProgression.length > 0 && (
              <div className="space-y-8 pt-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 m-0 mb-1">
                    Salary Breakdown by Career Experience Levels
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 m-0">
                    Comprehensive compensation benchmarks and job profiles across Entry, Mid, and Senior career stages.
                  </p>
                </div>

                {salaryProgression.map((stage, sIdx) => (
                  <div key={sIdx} className="border border-slate-200 rounded-2xl p-5 sm:p-7 bg-white shadow-2xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3.5">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#046bd2] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 inline-block mb-1">
                          {stage.experience || "Stage"}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 m-0">
                          {stage.level} Salaries in India
                        </h3>
                      </div>
                      <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-1.5 rounded-xl font-extrabold text-sm sm:text-base">
                        {stage.salaryRange}
                      </div>
                    </div>

                    {stage.description && (
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed m-0">
                        {stage.description}
                      </p>
                    )}

                    {Array.isArray(stage.roles) && stage.roles.length > 0 && (
                      <div className="overflow-x-auto rounded-xl border border-slate-200 mt-4 shadow-2xs">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                          <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                            <tr>
                              <th className="p-3.5 border-r border-slate-200 w-1/3">Job Role</th>
                              <th className="p-3.5 border-r border-slate-200">Description</th>
                              <th className="p-3.5 text-right whitespace-nowrap">Average Salary (LPA)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {stage.roles.map((r, rIdx) => (
                              <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                                <td className="p-3.5 font-bold text-slate-900 border-r border-slate-100">
                                  {r.role}
                                </td>
                                <td className="p-3.5 text-slate-600 leading-relaxed border-r border-slate-100">
                                  {r.desc}
                                </td>
                                <td className="p-3.5 font-extrabold text-emerald-600 text-right whitespace-nowrap">
                                  ₹{r.salary} LPA
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {specializationsGuide.length > 0 && (
              <div className="space-y-4 pt-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 pb-2 border-b border-slate-100 m-0">
                  Specializations and Their Role in Salary Determination
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {specializationsGuide.map((factor, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-2"
                    >
                      <h4 className="font-bold text-slate-900 text-base m-0 text-[#046bd2] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-[#046bd2] text-xs font-bold flex items-center justify-center shrink-0">
                          {fIdx + 1}
                        </span>
                        <span>{factor.title}</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0 pl-8">
                        {factor.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {faqs.length > 0 && (
              <div className="space-y-3 pt-4">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 m-0 mb-2">
                  Frequently Asked Questions (FAQs)
                </h2>
                <Collapse
                  accordion
                  className="bg-white border-slate-200 rounded-xl"
                  items={faqs.map((faq, i) => ({
                    key: String(i),
                    label: <span className="font-bold text-slate-800 text-xs sm:text-sm">{faq.question}</span>,
                    children: <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">{faq.answer}</p>,
                  }))}
                />
              </div>
            )}

            {conclusion?.content && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-200 space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900 m-0 flex items-center gap-2">
                  <Award className="text-[#046bd2] w-5 h-5" /> {conclusion.title || "Conclusion"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0">
                  {conclusion.content}
                </p>
              </div>
            )}

            <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-[#046bd2] text-white flex items-center justify-center text-xl font-bold shrink-0">
                <UserOutlined />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base m-0 mb-1">{authorName}</h4>
                <p className="text-xs sm:text-sm text-slate-500 m-0 leading-normal">
                  Higher Education Research & Admissions Advisory Team at Distance Education School. Providing verified guidance on UGC-DEB approved university admissions and career roadmaps.
                </p>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-2 sm:p-3 shadow-sm">
              <FormWrapper
                title="Book 100% Free Counseling"
                subtitle="Get upto 20% Scholarship Coupon Code."
                showPhoneCallLink={true}
                defaultCourse="MBA"
                formNameOverride={`BlogDetail_${slug || blog?.slug || "blog"}`}
                submitButtonText="Submit"
              />
            </div>

            {popularBlogs.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base m-0">
                    Most Popular Blogs
                  </h4>
                  <div className="w-12 h-1 bg-[#046bd2] rounded-full mt-2" />
                </div>

                <div className="space-y-3.5 divide-y divide-slate-100">
                  {popularBlogs.map((pBlog) => {
                    const coverImg = getAssetPath(pBlog.coverImage);
                    const pDate = pBlog.publishedAt
                      ? new Date(pBlog.publishedAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                      : "Recent";

                    return (
                      <Link
                        key={pBlog._id || pBlog.slug}
                        href={`/blog/${pBlog.slug}`}
                        className="flex items-center gap-3.5 pt-3 first:pt-0 group hover:no-underline"
                      >
                        <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                          {coverImg ? (
                            <Image
                              src={coverImg}
                              alt={pBlog.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-[#046bd2] text-xs font-bold">
                              Blog
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#046bd2] transition-colors line-clamp-2 m-0 mb-1 leading-snug">
                            {pBlog.title}
                          </h5>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 font-medium">
                            <span>{pBlog.author?.fullname || "Editorial Team"}</span>
                            <span>•</span>
                            <span>{pDate}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </WebsiteLayout>
  );
}
