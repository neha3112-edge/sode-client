"use client";

import React, { useState, useMemo } from "react";
import { Empty, Pagination } from "antd";
import {
  CalendarOutlined,
  ArrowRightOutlined,
  EyeOutlined,
  SearchOutlined,
  BookOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import WebsiteLayout from "@/components/layout/WebsiteLayout";
import Container from "@/components/common/Container";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

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

function cleanExcerpt(content, maxLength = 120) {
  if (!content) return "";
  const plain = content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const decoded = decodeHtml(plain);
  return decoded.length > maxLength ? `${decoded.substring(0, maxLength)}...` : decoded;
}

function formatBlogDate(dateStr) {
  if (!dateStr) return "27 Aug 2026";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "27 Aug 2026";
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "27 Aug 2026";
  }
}

function formatReadViews(views, readTime) {
  if (views && typeof views === "number" && views > 0) {
    if (views >= 1000) return `${(views / 1000).toFixed(1)}k Read`;
    return `${views} Read`;
  }
  if (readTime && typeof readTime === "string") {
    return readTime.includes("Read") || readTime.includes("read") ? readTime : `${readTime} Read`;
  }
  return "1.4k Read";
}

function getAuthorName(author) {
  if (!author) return "Amritanjali Singh";
  if (typeof author === "string") return author;
  return author.fullname || author.name || "Amritanjali Singh";
}

function BlogCard({ blog, index = 0 }) {
  const [imgErr, setImgErr] = useState(false);
  const coverUrl = !imgErr ? getAssetPath(blog.coverImage || blog.featuredImage || blog.bannerImage) : null;
  const formattedDate = formatBlogDate(blog.publishedAt || blog.createdAt);
  const viewsText = formatReadViews(blog.viewsCount || blog.views, blog.readTime);
  const authorName = getAuthorName(blog.author);
  const title = decodeHtml(blog.title || "");
  const subtitleText = cleanExcerpt(blog.subtitle || blog.excerpt || blog.content || "", 135);
  const blogSlug = blog.slug || blog._id;
  const isAboveTheFold = index < 3;

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group h-full">
      {/* 🖼️ Cover Image Banner (Spacious, well-proportioned height) */}
      <Link
        href={`/blogs/${blogSlug}`}
        className="block relative h-45 w-full overflow-hidden bg-slate-100 shrink-0"
      >
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={isAboveTheFold ? "eager" : "lazy"}
            priority={isAboveTheFold}
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#072C50] to-[#0c3966] text-white p-4 text-center">
            <BookOutlined className="text-3xl mb-1.5 opacity-80" />
            <span className="text-xs font-bold uppercase tracking-wider line-clamp-1">
              {blog.category?.name || "Education"}
            </span>
          </div>
        )}
      </Link>

      {/* 📝 Blog Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Meta Row: Date & Reads */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 mb-2.5">
          <span className="flex items-center gap-1.5 font-medium text-slate-500">
            <CalendarOutlined className="text-blue-500 text-[11px]" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-500">
            <EyeOutlined className="text-slate-400 text-[11px]" />
            {viewsText}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blogs/${blogSlug}`} className="block group-hover:text-blue-600 transition-colors">
          <h3 className="text-[16px] sm:text-base font-bold text-[#072C50] m-0 line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Subtitle */}
        <p className="text-xs sm:text-[13px] text-slate-500 line-clamp-2 m-0 mt-1 mb-3">
          {subtitleText}
        </p>

        {/* Footer: Author & Read More */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-700 truncate max-w-[60%]">
            <UserOutlined className="text-slate-400 text-xs shrink-0" />
            <span className="truncate">{authorName}</span>
          </span>
          <Link
            href={`/blogs/${blogSlug}`}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 group/btn shrink-0"
          >
            <span>Read More</span>
            <ArrowRightOutlined className="text-[10px] group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogPageClientView({
  initialBlogs = [],
  initialCategories = [],
}) {
  // Top Global Breadcrumbs
  useBreadcrumb({
    items: [
      { label: "Home", href: "/" },
      { label: "Accreditations", href: "/accreditations" },
      { label: "Blogs" },
    ],
    backButton: { label: "Back to Home", href: "/" },
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Compute category list: prioritize server unpaginated initialCategories, fallback to blogs' populated category field
  const categoryList = useMemo(() => {
    if (Array.isArray(initialCategories) && initialCategories.length > 0) {
      return initialCategories.map((cat) => ({
        id: String(cat._id || cat.id),
        name: cat.name,
        slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-"),
      }));
    }

    const catMap = new Map();

    (initialBlogs || []).forEach((b) => {
      const cat = b?.category;
      if (!cat) return;

      if (typeof cat === "object" && cat.name) {
        const id = String(cat._id || cat.id || cat.slug || cat.name);
        const name = cat.name.trim();
        const slug = cat.slug || name.toLowerCase().replace(/\s+/g, "-");
        if (name && !catMap.has(name.toLowerCase())) {
          catMap.set(name.toLowerCase(), {
            id,
            name,
            slug,
          });
        }
      } else if (typeof cat === "string" && cat.trim()) {
        const name = cat.trim();
        if (!catMap.has(name.toLowerCase())) {
          catMap.set(name.toLowerCase(), {
            id: name,
            name,
            slug: name.toLowerCase().replace(/\s+/g, "-"),
          });
        }
      }
    });

    return Array.from(catMap.values());
  }, [initialCategories, initialBlogs]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  // Client-side filtering without any URL/router mutation
  const filteredBlogs = useMemo(() => {
    return (initialBlogs || []).filter((blog) => {
      // Category filter
      if (activeCategory !== "all") {
        const cat = blog.category;
        const target = String(activeCategory).toLowerCase();
        const catId = (typeof cat === "object" ? String(cat?._id || "") : String(cat || "")).toLowerCase();
        const catSlug = (typeof cat === "object" ? String(cat?.slug || "") : "").toLowerCase();
        const catName = (typeof cat === "object" ? String(cat?.name || "") : "").toLowerCase();

        const match =
          catId === target ||
          catSlug === target ||
          catName === target ||
          catName.includes(target) ||
          (blog.tags && blog.tags.some((t) => String(t).toLowerCase() === target));

        if (!match) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const title = (blog.title || "").toLowerCase();
        const subtitle = (blog.subtitle || blog.excerpt || blog.content || "").toLowerCase();
        const tags = Array.isArray(blog.tags) ? blog.tags.join(" ").toLowerCase() : "";
        if (!title.includes(q) && !subtitle.includes(q) && !tags.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [initialBlogs, activeCategory, searchQuery]);

  const totalCount = filteredBlogs.length;
  const displayedBlogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredBlogs.slice(start, start + pageSize);
  }, [filteredBlogs, currentPage, pageSize]);

  return (
    <WebsiteLayout hasContainer={false} py="" bg="#f8fafc">
      {/* 🔷 Compact Full-Bleed Dark Blue Hero Section */}
      <section className="w-full bg-[#072C50] text-white py-5 sm:py-6 md:py-7 px-4 sm:px-6 shadow-inner">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-[22px] sm:text-2xl md:text-3xl font-extrabold text-[#F3CE7F] tracking-tight mb-1.5 sm:mb-2">
            Blogs & Articles
          </h1>
          <p className="text-blue-100/90 text-[11px] sm:text-xs md:text-sm font-normal max-w-2xl sm:max-w-3xl mx-auto">
            Distance & Online education blogs and articles, featuring top courses and the best UGC universities according to facilities, support, & recognitions. Get the career guidance on the latest trends and updates in online/distance learning to help you achieve your academic & career goals.
          </p>

          {/* 🔍 Search Blogs Pill (Aligned with Paragraph Width) */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative max-w-2xl sm:max-w-3xl mx-auto mt-3.5 sm:mt-4"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search Blogs......"
              className="w-full h-9 sm:h-9.5 bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm rounded-full pl-5 pr-12 shadow-xs border border-transparent focus:outline-none focus:ring-1.5 focus:ring-[#F3CE7F] transition-all"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-9 flex items-center justify-center border-l border-slate-200 text-slate-500 hover:text-[#072C50] transition-colors cursor-pointer"
            >
              <SearchOutlined className="text-sm" />
            </button>
          </form>
        </div>
      </section>

      {/* 📄 Main Content Area (Wrapped in standard Container matching University Page) */}
      <Container className="py-6 sm:py-8 space-y-6">
        {/* 🏷️ Browse By Categories Strip (Only if blogs have categories) */}
        {categoryList.length > 0 && (
          <div className="w-full">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[18px] sm:text-lg font-bold text-slate-900 tracking-tight m-0">
                Browse By Categories
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsCategoriesExpanded((prev) => !prev);
                }}
                className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#072C50] flex items-center gap-1 transition-colors cursor-pointer group select-none"
              >
                <span>{isCategoriesExpanded ? "View Less" : "View All"}</span>
                <ArrowRightOutlined className="text-[11px] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Category Chips: Single Line Scroll (Default) OR Multi-Line Wrap when View All is clicked */}
            <div
              className={`flex items-center gap-2 sm:gap-2.5 pb-1.5 transition-all duration-300 ${isCategoriesExpanded
                ? "flex-wrap overflow-visible"
                : "flex-nowrap overflow-x-auto scrollbar-none"
                }`}
            >
              {/* 🌟 'All' Category Chip (Default Active) */}
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer border ${activeCategory === "all" || !activeCategory
                  ? "bg-[#072C50] text-white border-[#072C50] shadow-xs"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-500"
                  }`}
              >
                All
              </button>

              {categoryList.map((cat, idx) => {
                const isActive = activeCategory === cat.id || activeCategory === cat.slug;
                return (
                  <button
                    key={`${cat.id}-${idx}`}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer border ${isActive
                      ? "bg-[#072C50] text-white border-[#072C50] shadow-xs"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-500"
                      }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 📰 Blog Grid Listing (Matching University Grid) */}
        {displayedBlogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6">
            <Empty description="No blogs found matching your criteria." />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedBlogs.map((blog, idx) => (
              <BlogCard key={blog._id || blog.slug} blog={blog} index={idx} />
            ))}
          </div>
        )}

        {/* 🧭 Centered Pagination */}
        {totalCount > pageSize && (
          <div className="flex justify-center items-center pt-6 pb-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalCount}
              onChange={(page) => {
                setCurrentPage(page);
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              showSizeChanger={false}
              className="blog-custom-pagination"
            />
          </div>
        )}
      </Container>

      <style jsx global>{`
        .blog-custom-pagination .ant-pagination-item {
          border-radius: 6px;
          border-color: #cbd5e1;
          font-weight: 500;
          font-size: 13px;
          min-width: 32px;
          height: 32px;
          line-height: 30px;
        }
        .blog-custom-pagination .ant-pagination-item-active {
          border-color: #2563eb !important;
          background-color: #eff6ff !important;
          font-weight: 700;
        }
        .blog-custom-pagination .ant-pagination-item-active a {
          color: #2563eb !important;
        }
        .blog-custom-pagination .ant-pagination-prev .ant-pagination-item-link,
        .blog-custom-pagination .ant-pagination-next .ant-pagination-item-link {
          border-radius: 6px;
          border-color: #cbd5e1;
          min-width: 32px;
          height: 32px;
          line-height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </WebsiteLayout>
  );
}
