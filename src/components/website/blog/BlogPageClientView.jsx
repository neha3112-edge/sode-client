"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Empty, Pagination } from "antd";
import {
  SearchOutlined,
  BookOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const getAssetPath = (obj) => (typeof obj === "string" ? obj : obj?.url || obj?.path || obj?.src || null);
import WebsiteLayout from "@/components/layout/WebsiteLayout";
import Container from "@/components/common/Container";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { request } from "@/services/request";

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

function formatReadTime(readTime) {
  if (readTime && typeof readTime === "string" && readTime.trim()) {
    const trimmed = readTime.trim();
    if (trimmed.toLowerCase().includes("min")) {
      return trimmed.toLowerCase().includes("read") ? trimmed : `${trimmed} read`;
    }
    return `${trimmed} min read`;
  }
  if (typeof readTime === "number" && readTime > 0) {
    return `${readTime} min read`;
  }
  return "5 min read";
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
  const readTimeText = formatReadTime(blog.readTime);
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
        {/* Meta Row: Date & Read Time */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-400 mb-2.5">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-500 leading-none">
            <Calendar size={13} className="text-blue-500 shrink-0" />
            <span className="leading-none">{formattedDate}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-500 leading-none">
            <Clock size={13} className="text-slate-400 shrink-0" />
            <span className="leading-none">{readTimeText}</span>
          </span>
        </div>

        {/* Title */}
        <Link href={`/blogs/${blogSlug}`} className="block group-hover:text-blue-600 transition-colors">
          <h3 className="text-[16px] sm:text-base font-semibold text-[#072C50] m-0 line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>

        {/* Subtitle */}
        <p className="text-xs text-slate-500 line-clamp-2 m-0 mt-1 mb-3">
          {subtitleText}
        </p>

        {/* Footer: Author & Read More */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 truncate max-w-[60%] leading-none">
            <User size={13} className="text-slate-400 shrink-0" />
            <span className="truncate leading-none">{authorName}</span>
          </span>
          <Link
            href={`/blogs/${blogSlug}`}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1 group/btn shrink-0 leading-none"
          >
            <span className="leading-none">Read More</span>
            <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogPageClientView({
  initialBlogs = [],
  initialCategories = [],
  initialPagination = {},
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

  const pageSize = initialPagination?.limit || 12;
  const [blogsList, setBlogsList] = useState(initialBlogs);
  const [totalCount, setTotalCount] = useState(initialPagination?.total ?? initialBlogs.length);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(initialPagination?.page || 1);
  const [loading, setLoading] = useState(false);

  // Compute category list: prioritize server unpaginated initialCategories, fallback to blogs' populated category field
  const categoryList = useMemo(() => {
    if (Array.isArray(initialCategories) && initialCategories.length > 0) {
      return initialCategories.map((cat) => ({
        id: String(cat._id || cat.id),
        name: cat.name,
        slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-"),
        count: cat.count || 0,
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

  // 🚀 Fetch from Backend with page, category, and search query
  const fetchBlogs = async (page = 1, category = activeCategory, search = searchQuery) => {
    try {
      setLoading(true);
      const isAll = category === "all" || !category;
      const options = {
        page,
        items: pageSize,
      };
      if (!isAll) {
        options.category = category;
      }
      if (search && search.trim()) {
        options.q = search.trim();
      }

      const res = await request.dynamicList({
        entity: "blogs",
        endPoint: "v1/list",
        options,
      });

      const list = res?.result || res?.blogs || (Array.isArray(res) ? res : []);
      const newTotal = res?.pagination?.total ?? res?.pagination?.count ?? list.length;

      setBlogsList(Array.isArray(list) ? list : []);
      setTotalCount(newTotal);
      setCurrentPage(page);
    } catch (err) {
      console.error("[BlogPage] Error fetching blogs from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (catItem, updateHash = true) => {
    const isAll = catItem === "all" || !catItem;
    const selectedKey = isAll ? "all" : (catItem.slug || catItem.id || catItem);
    const catId = isAll ? "all" : (catItem.id || selectedKey);
    setActiveCategory(catId);
    setCurrentPage(1);

    if (typeof window !== "undefined" && updateHash) {
      if (isAll) {
        window.history.replaceState(null, "", window.location.pathname);
      } else {
        const hashSlug =
          catItem.slug ||
          (catItem.name
            ? catItem.name
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
            : String(selectedKey));
        window.history.replaceState(null, "", `#${hashSlug}`);
      }
    }

    if (isAll && !searchQuery.trim()) {
      setBlogsList(initialBlogs);
      setTotalCount(initialPagination?.total ?? initialBlogs.length);
      return;
    }

    fetchBlogs(1, catId, searchQuery);
  };

  // 🔗 Sync URL hash (#category-slug or #banking-and-finance) on load and hashchange
  useEffect(() => {
    if (typeof window === "undefined" || !categoryList || categoryList.length === 0) return;

    const applyHashCategory = () => {
      const rawHash = window.location.hash.replace(/^#+/, "").trim();
      if (!rawHash) {
        if (activeCategory !== "all") {
          handleCategoryChange("all", false);
        }
        return;
      }

      const decodedHash = decodeURIComponent(rawHash).toLowerCase();
      const cleanHash = decodedHash.replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();

      const foundCat = categoryList.find((c) => {
        const cSlug = String(c.slug || "").toLowerCase().trim();
        const cId = String(c.id || "").toLowerCase().trim();
        const cName = String(c.name || "").toLowerCase().trim();
        const cNameClean = cName.replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
        const cSlugClean = cSlug.replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();

        return (
          cSlug === decodedHash ||
          cSlugClean === cleanHash ||
          cNameClean === cleanHash ||
          cId === decodedHash
        );
      });

      if (foundCat && activeCategory !== foundCat.id) {
        handleCategoryChange(foundCat, false);
      }
    };

    applyHashCategory();

    window.addEventListener("hashchange", applyHashCategory);
    return () => window.removeEventListener("hashchange", applyHashCategory);
  }, [categoryList]);

  const displayedBlogs = blogsList || [];

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
            onSubmit={(e) => {
              e.preventDefault();
              fetchBlogs(1, activeCategory, searchQuery);
            }}
            className="relative max-w-2xl sm:max-w-3xl mx-auto mt-3.5 sm:mt-4"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                if (!val.trim()) {
                  fetchBlogs(1, activeCategory, "");
                }
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
                    onClick={() => handleCategoryChange(cat)}
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
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${loading ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
            {displayedBlogs.map((blog, idx) => (
              <BlogCard key={blog._id || blog.slug} blog={blog} index={idx} />
            ))}
          </div>
        )}

        {/* 🧭 Centered Pagination (Backend Powered) */}
        {totalCount > pageSize && (
          <div className="flex justify-center items-center pt-6 pb-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalCount}
              onChange={(page) => {
                fetchBlogs(page, activeCategory, searchQuery);
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
