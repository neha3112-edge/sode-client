"use client";

import React, { useState, useEffect } from "react";
import { Card, Tag, Row, Col, Breadcrumb, Button, Skeleton, Empty, Pagination } from "antd";
import {
  CalendarOutlined,
  ArrowRightOutlined,
  EyeOutlined,
  LikeOutlined,
  ShareAltOutlined,
  FireOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import WebsiteLayout from "@/components/layout/WebsiteLayout";

function resolveMediaUrl(media) {
  if (!media) return null;
  if (typeof media === "string") return getAssetPath(media, null);
  if (media.url) return getAssetPath(media.url, null);
  if (media.path) return getAssetPath(media.path, null);
  return null;
}

// 🌟 Instagram-style Shimmer / Skeleton Placeholder Card
function BlogSkeletonCard() {
  return (
    <Card
      className="border border-slate-200/80 rounded-xl sm:rounded-2xl h-full flex flex-col overflow-hidden bg-white shadow-none"
      styles={{
        body: { padding: 0, display: "flex", flexDirection: "column", flex: 1 },
      }}
    >
      {/* 🖼️ Shimmer Banner Image */}
      <div className="w-full h-36 sm:h-44 md:h-52 bg-slate-200/80 animate-pulse relative flex items-center justify-center">
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <div className="w-16 h-5 rounded-full bg-slate-300/80 animate-pulse" />
          <div className="w-14 h-5 rounded-full bg-slate-300/80 animate-pulse" />
        </div>
      </div>

      {/* 📄 Shimmer Card Content Body */}
      <div className="p-3.5 sm:p-4 md:p-5 flex flex-col flex-1 gap-2.5">
        {/* Meta row: Date + Read time */}
        <div className="flex justify-between items-center mb-1">
          <Skeleton.Input active size="small" style={{ width: 85, height: 16, borderRadius: 4 }} />
          <Skeleton.Input active size="small" style={{ width: 65, height: 16, borderRadius: 10 }} />
        </div>

        {/* Title Lines */}
        <div className="my-1">
          <Skeleton active paragraph={{ rows: 2, width: ["100%", "80%"] }} title={false} />
        </div>

        {/* Excerpt Lines */}
        <div className="mb-2">
          <Skeleton active paragraph={{ rows: 2, width: ["95%", "70%"] }} title={false} />
        </div>

        {/* Footer: Stats + CTA */}
        <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex justify-between items-center mt-auto">
          <Skeleton.Input active size="small" style={{ width: 110, height: 16, borderRadius: 4 }} />
          <Skeleton.Input active size="small" style={{ width: 45, height: 16, borderRadius: 4 }} />
        </div>
      </div>
    </Card>
  );
}

function BlogCard({ blog }) {
  const [imgErr, setImgErr] = useState(false);
  const coverUrl = !imgErr ? resolveMediaUrl(blog.coverImage) : null;
  const categoryName = blog.category?.name || (typeof blog.category === "string" ? blog.category : "Article");

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
      className="border border-slate-200/80 rounded-xl sm:rounded-2xl transition-all duration-300 h-full flex flex-col overflow-hidden bg-white group hover:border-blue-400"
      styles={{
        body: { padding: 0, display: "flex", flexDirection: "column", flex: 1 },
      }}
    >
      {/* 🖼️ Full-Bleed Cover Image Banner (Responsive Height: Mobile 144px, Tablet 180px, Desktop 208px) */}
      <div className="w-full h-36 sm:h-44 md:h-52 overflow-hidden relative bg-slate-100 flex-shrink-0">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={blog.title || "Blog cover"}
            fill
            loading="eager"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400 p-3 text-center">
            <span className="font-bold text-xs sm:text-sm text-slate-500 line-clamp-1">{categoryName}</span>
            <span className="text-[11px] text-slate-400 mt-0.5">SODE Education Insights</span>
          </div>
        )}

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 flex-wrap z-10">
          <Tag color="blue" className="font-semibold text-[11px] sm:text-xs border-none rounded-full px-2 sm:px-2.5 py-0.5 m-0 bg-blue-600/90 text-white backdrop-blur-sm shadow-sm">
            {categoryName}
          </Tag>
          {blog.isTrending && (
            <Tag color="volcano" icon={<FireOutlined />} className="font-semibold text-[10px] sm:text-xs border-none rounded-full px-2 py-0.5 m-0 shadow-sm">
              Trending
            </Tag>
          )}
          {blog.isTop && (
            <Tag color="gold" icon={<StarOutlined />} className="font-semibold text-[10px] sm:text-xs border-none rounded-full px-2 py-0.5 m-0 shadow-sm">
              Top Pick
            </Tag>
          )}
        </div>
      </div>

      {/* 📄 Card Content Body with Responsive Inner Padding */}
      <div className="p-3.5 sm:p-4 md:p-5 flex flex-col flex-1">
        {/* 📅 Date & Read Time Meta */}
        <div className="flex justify-between items-center text-[11px] sm:text-xs text-slate-400 mb-1.5 sm:mb-2.5 font-medium">
          <span className="flex items-center gap-1">
            <CalendarOutlined /> {formattedDate}
          </span>
          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold">
            {blog.readTime || "5 min read"}
          </span>
        </div>

        {/* 🏷️ Title */}
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 m-0 mb-1.5 sm:mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h3>

        {/* 📄 Excerpt */}
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 flex-grow line-clamp-2 sm:line-clamp-3">
          {blog.excerpt}
        </p>

        {/* 📊 Footer Stats & Action CTA */}
        <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <EyeOutlined /> {blog.viewsCount || 0}
            </span>
            <span className="flex items-center gap-1 text-rose-500">
              <LikeOutlined /> {blog.likesCount || 0}
            </span>
            <span className="flex items-center gap-1 text-blue-500">
              <ShareAltOutlined /> {blog.sharesCount || 0}
            </span>
          </div>

          <Link href={`/blog/${blog.slug}`} className="block">
            <span className="text-blue-600 font-bold text-xs flex items-center gap-1 hover:text-blue-700 cursor-pointer group-hover:translate-x-0.5 transition-transform">
              Read <ArrowRightOutlined className="text-[10px]" />
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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    request.dynamicList({ entity: "blogs", endPoint: "v1/list", options: { page: currentPage, items: pageSize } })
      .then((res) => {
        if (!isMounted) return;
        const list = res?.result || res?.blogs || (Array.isArray(res) ? res : []);
        if (Array.isArray(list)) {
          setBlogs(list);
          setTotalCount(res?.pagination?.count || res?.pagination?.total || list.length);
        } else {
          setBlogs([]);
          setTotalCount(0);
        }
      })
      .catch((err) => {
        console.error("Failed to load website blogs:", err);
        if (isMounted) setBlogs([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  return (
    <WebsiteLayout py="py-4 sm:py-6" bg="#f8fafc">
      <div className="w-full">
        {/* Top Header & Breadcrumb Bar */}
        <div className="flex items-center justify-between gap-3 mb-4">
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
                { title: <Link href="/" className="text-slate-500 hover:text-slate-800">Home</Link> },
                { title: <span className="font-semibold text-slate-800">Blogs & Articles</span> },
              ]}
            />
          </div>
        </div>

        {/* 🌟 Shimmer / Skeleton Loading State vs Real Cards */}
        {loading ? (
          <Row gutter={[20, 20]}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Col xs={24} sm={12} lg={8} key={`blog-skeleton-${index}`}>
                <BlogSkeletonCard />
              </Col>
            ))}
          </Row>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center my-8">
            <Empty description="No blogs published yet. Please check back soon!" />
          </div>
        ) : (
          <>
            {/* Blog Cards Grid (Responsive: Desktop 3 cards, Tablet 2 cards, Mobile 1 card) */}
            <Row gutter={[20, 20]}>
              {blogs.map((blog) => (
                <Col xs={24} sm={12} lg={8} key={blog._id || blog.slug}>
                  <BlogCard blog={blog} />
                </Col>
              ))}
            </Row>

            {/* Pagination */}
            {totalCount > pageSize && (
              <div className="flex justify-center mt-10">
                <Pagination
                  current={currentPage}
                  total={totalCount}
                  pageSize={pageSize}
                  onChange={(page) => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  showSizeChanger={false}
                />
              </div>
            )}
          </>
        )}
      </div>
    </WebsiteLayout>
  );
}
