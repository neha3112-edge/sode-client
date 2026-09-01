"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Empty,
  Pagination,
} from "antd";
import {
  CalendarOutlined,
  ArrowRightOutlined,
  EyeOutlined,
  LikeOutlined,
  ShareAltOutlined,
  SearchOutlined,
  BookOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import WebsiteLayout from "@/components/layout/WebsiteLayout";

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

function BlogCard({ blog }) {
  const [imgErr, setImgErr] = useState(false);
  const coverUrl = !imgErr ? getAssetPath(blog.coverImage) : null;
  const categoryName =
    blog.category?.name ||
    (typeof blog.category === "string" ? blog.category : "Education");

  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recent";

  return (
    <Card
      hoverable
      className="border border-slate-200/80 rounded-2xl transition-all duration-300 h-full flex flex-col overflow-hidden bg-white group hover:border-blue-400 hover:shadow-lg"
      styles={{
        body: { padding: 0, display: "flex", flexDirection: "column", flex: 1 },
      }}
    >
      {/* 🖼️ Full-Bleed Cover Image Banner */}
      <div className="w-full h-40 sm:h-48 md:h-52 overflow-hidden relative bg-slate-100 flex-shrink-0">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 text-center">
            <BookOutlined className="text-3xl mb-1 opacity-80" />
            <span className="text-xs font-bold uppercase tracking-wider line-clamp-1">
              {categoryName}
            </span>
          </div>
        )}

        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[11px] font-bold text-blue-700 bg-white/95 backdrop-blur-md rounded-full shadow-xs border border-blue-100">
            {categoryName}
          </span>
        </div>
      </div>

      {/* 📝 Blog Summary Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2.5">
        {/* Meta Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium text-slate-500">
            <CalendarOutlined className="text-blue-500 text-xs" />
            {formattedDate}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <EyeOutlined className="text-slate-400" />
              {blog.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <LikeOutlined className="text-slate-400" />
              {blog.likes || 0}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/blog/${blog.slug}`} className="group-hover:text-blue-600 transition-colors">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 m-0">
            {decodeHtml(blog.title)}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed m-0">
          {cleanExcerpt(blog.excerpt || blog.content)}
        </p>

        {/* Footer Link */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
          <span className="text-xs font-bold text-slate-700">
            {blog.author?.fullname || "Admin"}
          </span>
          <Link
            href={`/blog/${blog.slug}`}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/btn"
          >
            Read Article
            <ArrowRightOutlined className="text-[10px] group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default function BlogPageClientView({
  initialBlogs = [],
  initialCategories = [],
  initialTotal = 0,
}) {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialBlogs);
  const [categories, setCategories] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(initialTotal || initialBlogs.length);
  const pageSize = 12;

  useEffect(() => {
    if (activeCategory !== "all" || searchQuery.trim() || currentPage > 1) {
      const options = {
        page: currentPage,
        items: pageSize,
      };

      if (activeCategory !== "all") {
        options.category = activeCategory;
      }
      if (searchQuery.trim()) {
        options.q = searchQuery.trim();
      }

      request
        .dynamicList({ entity: "blogs", endPoint: "v1/list", options })
        .then((res) => {
          const list = res?.result || res?.blogs || (Array.isArray(res) ? res : []);
          const total = res?.pagination?.total || res?.total || (Array.isArray(list) ? list.length : 0);

          if (Array.isArray(list)) {
            setBlogs(list);
            setTotalCount(total);
          } else {
            setBlogs([]);
            setTotalCount(0);
          }
        })
        .catch((err) => console.error("Failed to filter blogs:", err));
    }
  }, [currentPage, activeCategory, searchQuery]);

  return (
    <WebsiteLayout py="py-4 sm:py-6" bg="#f8fafc">
      <div className="max-w-7xl mx-auto space-y-6 px-3 sm:px-4 md:px-6">
        {/* 🧭 Minimal Top Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium py-1">
          <Link href="/" className="text-slate-500 hover:text-[#046bd2] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold">Latest Blogs & Articles</span>
        </div>

        {/* 📰 Blog Grid Listing */}
        {blogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6">
            <Empty description="No blogs found in database." />
          </div>
        ) : (
          <Row gutter={[20, 20]}>
            {blogs.map((blog) => (
              <Col xs={24} sm={12} lg={8} key={blog._id || blog.slug}>
                <BlogCard blog={blog} />
              </Col>
            ))}
          </Row>
        )}

        {/* 🧭 Responsive Pagination */}
        {totalCount > pageSize && (
          <div className="flex justify-center pt-6 pb-2">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalCount}
              onChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              showSizeChanger={false}
              className="ant-pagination-custom"
            />
          </div>
        )}
      </div>
    </WebsiteLayout>
  );
}
