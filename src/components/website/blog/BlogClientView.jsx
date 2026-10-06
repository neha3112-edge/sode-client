"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import SafeHtmlRenderer from "@/components/website/SafeHtmlRenderer";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { getAssetPath } from "@/lib/utils";
import {
  CalendarOutlined,
  EyeOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

function formatBlogDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

export default function BlogClientView({ initialData, slug: propSlug }) {
  const blog = initialData?.blogId || initialData || {};
  const pageTitle = blog?.title || blog?.headline || "";
  const showBreadcrumbs = blog?.showBreadcrumbs !== false;

  // Set up Breadcrumbs dynamically
  useBreadcrumb(
    showBreadcrumbs && pageTitle
      ? {
          items: [
            { label: "Home", href: "/" },
            { label: "Blogs", href: "/blogs" },
            { label: pageTitle },
          ],
          backButton: {
            label: "Blogs",
            href: "/blogs",
          },
        }
      : { hidden: true },
    [pageTitle, showBreadcrumbs]
  );

  // Execute custom JavaScript from CMS if present
  useEffect(() => {
    if (!blog?.js) return;
    try {
      const scriptFn = new Function(blog.js);
      scriptFn();
    } catch (err) {
      console.error("[Blog] Error executing custom JS:", err);
    }
  }, [blog?.js]);

  // Dynamic token parsing helper (for live DB tokens like {{fee:...}}, {{approvals:...}})
  const parsedContent = useMemo(() => {
    let raw = blog.content || "";
    if (!raw) return "";

    return raw.replace(
      /\{\{([a-zA-Z0-9_-]+):([a-zA-Z0-9_-]+)(?::([a-zA-Z0-9_-]+))?\}\}/g,
      (match, type, uni, course) => {
        const uniFormatted = uni
          ? uni.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
          : "";
        const courseFormatted = course
          ? course.replace(/-/g, " ").toUpperCase()
          : "";

        switch (type) {
          case "fee":
            return `<strong class="text-emerald-600 font-bold">₹ 1,80,000 (${courseFormatted} at ${uniFormatted})</strong>`;
          case "fee_sem":
            return `<strong class="text-emerald-600 font-bold">₹ 45,000 / Semester</strong>`;
          case "fee_annual":
            return `<strong class="text-emerald-600 font-bold">₹ 90,000 / Year</strong>`;
          case "fee_emi":
            return `<strong class="text-emerald-600 font-bold">₹ 4,999 / Month EMI</strong>`;
          case "approvals":
            return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">UGC-DEB, AICTE, NAAC A+</span>`;
          case "deadline":
            return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">15th October 2026</span>`;
          case "rating":
            return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">★ 4.8 / 5.0 (NAAC A+)</span>`;
          case "placement":
            return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">₹ 8.5 LPA Avg Package</span>`;
          case "prospectus":
            return `<a href="#counseling" class="inline-block px-3 py-1 bg-[#046bd2] text-white text-xs font-bold rounded hover:bg-blue-700">Download Prospectus</a>`;
          case "duration":
            return `2 Years (4 Semesters)`;
          case "eligibility":
            return `Graduation with min 50% marks from a recognized university`;
          case "specializations":
            return `Marketing, Finance, HR, IT, Business Analytics, International Business`;
          default:
            return match;
        }
      }
    );
  }, [blog.content]);

  if (!blog || (!blog.content && !blog.title)) {
    return null;
  }

  const rawImage =
    blog.coverImage ||
    blog.featuredImage ||
    blog.bannerImage ||
    blog.hero?.bannerImage;
  const blogImageUrl = rawImage ? getAssetPath(rawImage) : null;

  const formattedDate = formatBlogDate(blog.publishedAt || blog.createdAt);
  const authorName =
    blog.author?.fullname || blog.author?.name || "Editorial Team";
  const categoryName = blog.category?.name || "";

  return (
    <div className="w-full bg-white text-gray-800 antialiased min-h-screen">
      {/* ── Custom CSS from CMS ── */}
      {blog?.css && (
        <style
          id={`custom-blog-css-${blog._id || "style"}`}
          dangerouslySetInnerHTML={{ __html: blog.css }}
        />
      )}

      {/* ── Main Article Container (Clean, no Hero banner) ── */}
      <Container className="max-w-4xl py-6 sm:py-10">
        {/* 🏷️ Category & Date Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap mb-3.5">
          {categoryName && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#072C50] border border-blue-200/70">
              {categoryName}
            </span>
          )}
          {formattedDate && (
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <CalendarOutlined className="text-blue-500" />
              {formattedDate}
            </span>
          )}
          {blog.readTime && (
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <ClockCircleOutlined className="text-slate-400" />
              {blog.readTime}
            </span>
          )}
          {blog.viewsCount ? (
            <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium ml-auto">
              <EyeOutlined className="text-slate-400" />
              {blog.viewsCount.toLocaleString()} Reads
            </span>
          ) : null}
        </div>

        {/* 📌 Blog Title (H1) */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#072C50] tracking-tight leading-snug sm:leading-tight mb-4 sm:mb-6">
          {pageTitle}
        </h1>

        {/* ✍️ Author Byline */}
        <div className="flex items-center gap-2.5 pb-4 mb-6 sm:mb-8 border-b border-slate-100 text-xs text-slate-600">
          <span className="w-7 h-7 rounded-full bg-blue-100 text-[#072C50] flex items-center justify-center font-bold text-xs uppercase">
            {authorName.charAt(0)}
          </span>
          <span className="font-semibold text-slate-800">{authorName}</span>
        </div>

        {/* 🖼️ Blog Cover Image (Jo blog me lagi hai wahi image show hogi) */}
        {blogImageUrl && (
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[460px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 mb-8 sm:mb-10 bg-slate-100">
            <Image
              src={blogImageUrl}
              alt={pageTitle}
              fill
              priority
              unoptimized
              className="object-cover"
            />
          </div>
        )}

        {/* 📄 Article Content */}
        {parsedContent && (
          <div className="text-slate-800 leading-relaxed text-sm sm:text-base space-y-4">
            <SafeHtmlRenderer html={parsedContent} />
          </div>
        )}
      </Container>
    </div>
  );
}
