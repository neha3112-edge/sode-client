"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Tag,
  Row,
  Col,
  Breadcrumb,
  Button,
  Skeleton,
  Empty,
  Pagination,
  Input,
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

// 🌟 Skeleton Placeholder Card
function BlogSkeletonCard() {
  return (
    <Card
      className="border border-slate-200/80 rounded-2xl h-full flex flex-col overflow-hidden bg-white shadow-none"
      styles={{
        body: { padding: 0, display: "flex", flexDirection: "column", flex: 1 },
      }}
    >
      <div className="w-full h-44 sm:h-52 bg-slate-200/80 animate-pulse relative flex items-center justify-center">
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="w-20 h-6 rounded-full bg-slate-300 animate-pulse" />
        </div>
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
        <div className="flex justify-between items-center">
          <Skeleton.Input active size="small" style={{ width: 90, height: 16 }} />
          <Skeleton.Input active size="small" style={{ width: 60, height: 16 }} />
        </div>
        <Skeleton active paragraph={{ rows: 2, width: ["100%", "75%"] }} title={false} />
        <Skeleton active paragraph={{ rows: 2, width: ["90%", "60%"] }} title={false} />
        <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-auto">
          <Skeleton.Input active size="small" style={{ width: 100, height: 16 }} />
          <Skeleton.Input active size="small" style={{ width: 50, height: 16 }} />
        </div>
      </div>
    </Card>
  );
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

        <div className="absolute top-3 left-3 z-10">
          <span className="bg-white/95 backdrop-blur-md text-[#046bd2] font-bold text-xs px-3 py-1 rounded-full shadow-sm border border-slate-100">
            {categoryName}
          </span>
        </div>
      </div>

      {/* 📝 Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Meta Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5 font-medium">
          <span className="flex items-center gap-1.5 text-slate-500">
            <CalendarOutlined className="text-slate-400" />
            {formattedDate}
          </span>
          <span className="text-slate-400 font-medium">
            {blog.readTime || "5 min read"}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${blog.slug}`} className="hover:no-underline">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 m-0 mb-2 leading-snug line-clamp-2 group-hover:text-[#046bd2] transition-colors cursor-pointer">
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 flex-grow line-clamp-2 sm:line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Footer Action CTA */}
        <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-auto">
          <span className="text-xs text-slate-400 font-medium">
            By {blog.author?.fullname || "Distance Education"}
          </span>

          <Link href={`/blog/${blog.slug}`} className="block">
            <span className="text-[#046bd2] font-bold text-xs flex items-center gap-1 hover:text-blue-700 cursor-pointer group-hover:translate-x-1 transition-transform">
              Read More <ArrowRightOutlined className="text-[10px]" />
            </span>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default function BlogPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  // 1. Fetch Categories from CRM API
  useEffect(() => {
    request
      .dynamicList({ entity: "category", endPoint: "v1/list", options: { items: 50 } })
      .then((res) => {
        const catList = res?.result || res?.categories || (Array.isArray(res) ? res : []);
        if (Array.isArray(catList)) {
          setCategories(catList);
        }
      })
      .catch(() => {});
  }, []);

  // 2. Fetch Blogs from CRM API
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

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
        if (!isMounted) return;
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
      .catch((err) => {
        console.error("Failed to load blogs from CRM API:", err);
        if (isMounted) {
          setBlogs([]);
          setTotalCount(0);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
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
        {loading ? (
          <Row gutter={[20, 20]}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Col xs={24} sm={12} lg={8} key={idx}>
                <BlogSkeletonCard />
              </Col>
            ))}
          </Row>
        ) : blogs.length === 0 ? (
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
