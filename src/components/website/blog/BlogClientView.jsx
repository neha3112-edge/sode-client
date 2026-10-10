"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Carousel, Form, Input, message, Modal, Table } from "antd";
import SafeHtmlRenderer from "@/components/website/SafeHtmlRenderer";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { getAssetPath } from "@/lib/utils";
import { CalendarIcon, Check, ChevronDown, ChevronRight, ChevronUp, Clock, Download, Eye, Image as ImageIcon, Minus, Play, Plus, ThumbsDown, ThumbsUp, User, Video } from "lucide-react";
import { request } from "@/services/request";
import BlogSidebar from "./BlogSidebar";

function formatBlogDate(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function formatViewsCount(views, readTime) {
  const count = views !== undefined && views !== null && views !== "" ? Number(views) : null;
  if (count !== null && !isNaN(count) && count > 0) {
    if (count >= 1000) {
      const formatted = (count / 1000).toFixed(1).replace(/\.0$/, "");
      return `${formatted}k Read`;
    }
    return `${count} Read`;
  }
  if (readTime && typeof readTime === "string") {
    return readTime.toLowerCase().includes("read") ? readTime : `${readTime} Read`;
  }
  if (views) {
    return `${views} Read`;
  }
  return null;
}

function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== "string") return null;
  const cleanUrl = url.trim();

  if (cleanUrl.includes("youtube.com/embed/")) {
    return cleanUrl;
  }

  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = cleanUrl.match(regExp);

  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0&modestbranding=1`;
  }

  return null;
}

export default function BlogClientView({
  initialData,
  initialPopularBlogs = [],
  initialTools = [],
  initialCategories = null,
  slug: propSlug,
}) {
  const [toolsList, setToolsList] = useState(
    Array.isArray(initialTools) && initialTools.length > 0 ? initialTools : []
  );
  const [sidebarBlogs, setSidebarBlogs] = useState(
    Array.isArray(initialPopularBlogs) && initialPopularBlogs.length > 0
      ? initialPopularBlogs
      : []
  );
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Sync or client-side fetch blogs for sidebar if initialPopularBlogs is small
  useEffect(() => {
    if (!sidebarBlogs || sidebarBlogs.length < 5) {
      let isMounted = true;
      (async () => {
        try {
          const res = await request.dynamicList({
            entity: "blogs",
            endPoint: "v1/list",
            options: { items: 10 },
            revalidate: 300,
          });
          const list =
            res?.result ||
            res?.blogs ||
            (Array.isArray(res) ? res : []);
          if (isMounted && Array.isArray(list) && list.length > 0) {
            setSidebarBlogs(list);
          }
        } catch { }
      })();
      return () => {
        isMounted = false;
      };
    }
  }, []);

  // Responsive slides calculation (1 card on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const updateSlides = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  // Sync or client-side fetch dynamic tools from category entity if initialTools is empty
  useEffect(() => {
    if (Array.isArray(initialTools) && initialTools.length > 0) {
      setToolsList(initialTools);
      return;
    }
    let isMounted = true;
    (async () => {
      try {
        const res = await request.dynamicList({
          entity: "category",
          endPoint: "v1/list",
          revalidate: 300,
        });
        const categories = Array.isArray(res?.result)
          ? res.result
          : Array.isArray(res?.categories)
            ? res.categories
            : Array.isArray(res?.sections)
              ? res.sections
              : Array.isArray(res)
                ? res
                : [];
        const toolsParent = categories.find(
          (c) =>
            c.featuredType === "TOOLS" ||
            c.featuredType === "FEATURED_TOOLS" ||
            c.sectionType === "TOOLS" ||
            (c.name && c.name.toLowerCase().includes("tool")) ||
            (c.title && c.title.toLowerCase().includes("tool"))
        );
        const rawTools = toolsParent && (toolsParent.children || toolsParent.items);
        if (
          isMounted &&
          Array.isArray(rawTools) &&
          rawTools.length > 0
        ) {
          setToolsList(rawTools);
        }
      } catch (err) {
        // Fallback gracefully
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [initialTools]);

  const blog = initialData?.blogId || initialData || {};
  const pageTitle = blog?.title || blog?.headline || "";
  const showBreadcrumbs = blog?.showBreadcrumbs !== false;

  const blogSections = useMemo(() => {
    const raw = blog?.sections || initialData?.sections || [];
    if (!Array.isArray(raw)) return [];
    return raw.filter((s) => s && s.enabled !== false);
  }, [blog?.sections, initialData?.sections]);

  // 📄 Group consecutive blocks under headings to prevent large disjoint gaps
  const groupedSections = useMemo(() => {
    if (!Array.isArray(blogSections) || blogSections.length === 0) return [];

    const groups = [];
    let currentGroup = null;

    blogSections.forEach((sec) => {
      const headingText = (sec.title || sec.poll?.title || "").trim();
      const hasHeading = Boolean(headingText);

      if (hasHeading || !currentGroup) {
        const secId =
          sec.id ||
          (sec._id ? String(sec._id) : null) ||
          (headingText ? headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") : null) ||
          `section-${groups.length + 1}`;

        currentGroup = {
          _id: sec._id || sec.id || `group-${groups.length}`,
          id: secId,
          headingText,
          headingTag: sec.headingTag || "h2",
          items: [sec],
        };
        groups.push(currentGroup);
      } else {
        currentGroup.items.push(sec);
      }
    });

    return groups;
  }, [blogSections]);

  const [tocOpen, setTocOpen] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [selectedPoll, setSelectedPoll] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [articleHelpful, setArticleHelpful] = useState("yes");
  const [commentsList, setCommentsList] = useState(
    Array.isArray(blog?.comments) ? blog.comments : []
  );
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [activePdf, setActivePdf] = useState({ url: "", title: "" });

  useEffect(() => {
    if (Array.isArray(blog?.comments)) {
      setCommentsList(blog.comments);
    }
  }, [blog?.comments]);

  useEffect(() => {
    if (selectedPoll) return;
    const secWithPoll = blogSections.find((s) => s?.poll?.options?.length > 0);
    if (secWithPoll) {
      const firstOpt = secWithPoll.poll.options[0];
      const firstTitle =
        typeof firstOpt === "string"
          ? firstOpt
          : firstOpt?.option || firstOpt?.text || firstOpt?.title || "";
      if (firstTitle) setSelectedPoll(firstTitle);
    }
  }, [blogSections, selectedPoll]);

  // ── Ant Design Comment Form State & Handler ──
  const [commentForm] = Form.useForm();
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const handleCommentSubmit = async (values) => {
    setCommentSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      if (values?.name && values?.comment) {
        setCommentsList((prev) => [
          {
            id: Date.now(),
            name: values.name,
            text: values.comment,
          },
          ...prev,
        ]);
      }
      message.success("Thank you! Your comment has been submitted successfully.");
      commentForm.resetFields();
    } catch {
      message.error("Failed to submit comment. Please try again.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  // ── Ant Design Table Memoized Columns Configuration (Exact CoursePage Styling) ──
  const feeTableColumns = useMemo(
    () => [
      {
        title: "Fee Component",
        dataIndex: "name",
        key: "name",
        width: "50%",
        align: "left",
        onCell: (record) => ({
          className: record?.isTotal
            ? "font-bold text-gray-900 bg-slate-50 text-left text-xs sm:text-sm"
            : "font-semibold text-gray-900 text-left text-xs sm:text-sm",
        }),
      },
      {
        title: "Example Amount",
        dataIndex: "amount",
        key: "amount",
        width: "50%",
        align: "left",
        onCell: (record) => ({
          className: record?.isTotal
            ? "font-bold text-[#0F2A4A] bg-slate-50 text-left text-xs sm:text-sm"
            : "font-medium text-gray-800 text-left text-xs sm:text-sm",
        }),
      },
    ],
    []
  );

  const comparisonTableColumns = useMemo(
    () => [
      {
        title: "Factor",
        dataIndex: "factor",
        key: "factor",
        width: "35%",
        align: "left",
        onCell: () => ({
          className: "font-bold text-gray-900 text-left text-xs sm:text-sm",
        }),
      },
      {
        title: "What to Check",
        dataIndex: "check",
        key: "check",
        width: "65%",
        align: "left",
        onCell: () => ({
          className: "text-gray-700 font-normal text-left text-xs sm:text-sm",
        }),
      },
    ],
    []
  );

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
        containerClassName: "!max-w-none w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16",
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

  // 🤖 Dynamic Tools Mapping (from Category/Tools database)
  const mappedTools = useMemo(() => {
    if (Array.isArray(toolsList) && toolsList.length > 0) {
      return toolsList.map((t, idx) => {
        const fullName = (t.name || t.title || "Tool").trim();
        const lower = fullName.toLowerCase();

        // Split name into prefix and underlineWord
        const parts = fullName.split(/\s+/);
        const underlineWord = parts.length > 1 ? parts.pop() : fullName;
        const prefix = parts.join(" ");

        let sparkleColor = "text-[#00ACC1]";
        let underlineClass = "border-[#00ACC1]";
        let circleBg = "bg-[#E0F7F6]";
        let btnText = "Suggest Me A University";
        let linkUrl = "/tools/suggest-university";
        let defaultDesc = "Find universities that match your goals, preferences, and career plans.";
        let iconSvg = (
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#00ACC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );

        if (lower.includes("eligib")) {
          sparkleColor = "text-[#AB47BC]";
          underlineClass = "border-[#AB47BC]";
          circleBg = "bg-[#F3E8FF]";
          btnText = "Check Eligibility";
          linkUrl = "/tools/eligibility-checker";
          defaultDesc = "Instantly check which courses and universities you're eligible for.";
          iconSvg = (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#AB47BC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          );
        } else if (lower.includes("compar")) {
          sparkleColor = "text-[#1E88E5]";
          underlineClass = "border-[#1E88E5]";
          circleBg = "bg-[#E0E7FF]";
          btnText = "Compare University";
          linkUrl = "/tools/compare-universities";
          defaultDesc = "Compare universities, courses, fees, and key benefits side by side.";
          iconSvg = (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#1E88E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          );
        } else if (lower.includes("course")) {
          sparkleColor = "text-[#EC407A]";
          underlineClass = "border-[#EC407A]";
          circleBg = "bg-[#FCE4EC]";
          btnText = "Suggest Course";
          linkUrl = "/tools/suggest-course";
          defaultDesc = "Discover accredited degree and diploma programs matched to your background.";
          iconSvg = (
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#EC407A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          );
        } else if (idx % 4 === 1) {
          sparkleColor = "text-[#AB47BC]";
          underlineClass = "border-[#AB47BC]";
          circleBg = "bg-[#F3E8FF]";
        } else if (idx % 4 === 2) {
          sparkleColor = "text-[#1E88E5]";
          underlineClass = "border-[#1E88E5]";
          circleBg = "bg-[#E0E7FF]";
        } else if (idx % 4 === 3) {
          sparkleColor = "text-[#EC407A]";
          underlineClass = "border-[#EC407A]";
          circleBg = "bg-[#FCE4EC]";
        }

        const rawLogo = t.logo?.url || t.logo || t.image?.url || t.image;
        const logoUrl = rawLogo ? getAssetPath(rawLogo) : null;

        return {
          id: t._id || t.id || String(idx),
          name: fullName,
          prefix,
          underlineWord,
          description: t.description || defaultDesc,
          btnText:
            t.btnText ||
            (lower.includes("suggest") && lower.includes("univ")
              ? "Suggest Me A University"
              : btnText),
          linkUrl: t.linkUrl || t.url || (t.slug ? `/tools/${t.slug}` : linkUrl),
          sparkleColor,
          underlineClass,
          circleBg,
          icon: logoUrl ? (
            <Image
              src={logoUrl}
              alt={fullName}
              width={48}
              height={48}
              loading="eager"
              unoptimized
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
            />
          ) : (
            iconSvg
          ),
        };
      });
    }
    return [];
  }, [toolsList]);

  const allFaqs = useMemo(() => {
    if (Array.isArray(blog?.faqs) && blog.faqs.length > 0) return blog.faqs;
    if (Array.isArray(initialData?.faqs) && initialData.faqs.length > 0) return initialData.faqs;
    return [];
  }, [blog?.faqs, initialData?.faqs]);

  // 📑 Dynamic Table of Contents (Directly generated from the grouped sections rendered on the page)
  const finalHeadings = useMemo(() => {
    const list = groupedSections
      .map((group) => {
        if (!group.headingText) return null;
        const headingTagNum = group.headingTag
          ? parseInt(group.headingTag.replace(/[^\d]/g, "")) || 2
          : 2;
        return {
          id: group.id,
          text: group.headingText,
          level: headingTagNum,
        };
      })
      .filter(Boolean);

    if (allFaqs && allFaqs.length > 0) {
      list.push({
        id: "faqs",
        text: "Frequently Asked Questions (FAQs)",
        level: 2,
      });
    }
    return list;
  }, [groupedSections, allFaqs]);

  // 🏷️ Display Tags (from blog only, no dummy fallback)
  const displayTags = useMemo(() => {
    if (Array.isArray(blog?.tags) && blog.tags.length > 0) {
      return blog.tags.filter(Boolean).join(" | ");
    }
    if (typeof blog?.tags === "string" && blog.tags.trim()) {
      return blog.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
        .join(" | ");
    }
    return "";
  }, [blog?.tags]);

  // Scroll spy to highlight active heading in TOC like course nav
  useEffect(() => {
    if (!finalHeadings || finalHeadings.length === 0) return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      let cur = "";
      for (const h of finalHeadings) {
        const el = document.getElementById(h.id);
        if (el && el.offsetTop <= scrollPos) {
          cur = h.id;
        }
      }
      if (cur) setActiveHeadingId(cur);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [finalHeadings]);

  if (!blog || (!blog.title && !blog.slug && !blog.headline)) {
    return null;
  }

  const rawImage =
    blog.coverImage ||
    blog.featuredImage ||
    blog.bannerImage ||
    blog.hero?.bannerImage;
  const blogImageUrl = rawImage ? getAssetPath(rawImage) : null;

  const formattedDate = formatBlogDate(blog.publishedAt || blog.createdAt);
  const viewsText = formatViewsCount(blog.viewsCount ?? blog.views, blog.readTime);
  const authorName =
    blog.author?.fullname ||
    blog.author?.name ||
    (typeof blog.author === "string" ? blog.author : "");

  // 🌟 Common Tailwind Typography (Ek hi jagah se pura text size & color change kar sakte hain)
  const BLOG_BODY_TYPOGRAPHY = "[&_p]:text-xs sm:[&_p]:text-sm [&_p]:text-slate-700 [&_li]:text-xs sm:[&_li]:text-sm [&_li]:text-gray-700";

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 pb-16">
      {/* ── Ant Design Table CSS (Strictly matching CoursePageClientView.jsx) ── */}
      <style>{`
        /* Ant Design Table Mobile-Fit & Crystal Clear Header Typography */
        .course-antd-table {
          width: 100% !important;
        }
        .course-antd-table .ant-table-wrapper {
          width: 100% !important;
        }
        .course-antd-table table {
          table-layout: fixed !important;
          width: 100% !important;
        }
        .course-antd-table .ant-table {
          overflow-x: visible !important;
          background: #ffffff !important;
        }
        .course-antd-table .ant-table-container {
          border-radius: 8px !important;
          overflow: hidden !important;
        }
        .course-antd-table .ant-table-content {
          overflow-x: visible !important;
        }
        .course-antd-table .ant-table-thead > tr > th,
        .course-antd-table .ant-table-thead > tr > th.ant-table-cell,
        .course-antd-table .ant-table-thead > tr > th *,
        .course-antd-table .ant-table-thead th .ant-table-cell-content {
          background-color: #0C2B4E !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 12px !important;
          line-height: 1.35 !important;
          letter-spacing: 0.025em !important;
          font-family: inherit !important;
          text-shadow: none !important;
          opacity: 1 !important;
        }
        .course-antd-table .ant-table-thead > tr > th {
          padding: 8px 8px !important;
          white-space: normal !important;
          word-break: break-word !important;
          border-bottom: none !important;
          border-right: 1px solid rgba(255, 255, 255, 0.15) !important;
        }
        @media (min-width: 640px) {
          .course-antd-table .ant-table-thead > tr > th,
          .course-antd-table .ant-table-thead > tr > th.ant-table-cell,
          .course-antd-table .ant-table-thead > tr > th *,
          .course-antd-table .ant-table-thead th .ant-table-cell-content {
            font-size: 14px !important;
          }
          .course-antd-table .ant-table-thead > tr > th {
            padding: 10px 14px !important;
          }
        }
        .course-antd-table .ant-table-thead > tr > th:last-child {
          border-right: none !important;
        }
        .course-antd-table .ant-table-thead > tr > th::before {
          display: none !important;
        }
        .course-antd-table .ant-table-tbody > tr > td {
          padding: 6px 7px !important;
          font-size: 12px !important;
          white-space: normal !important;
          word-break: break-word !important;
          vertical-align: middle !important;
          border-bottom: 1px solid #e2e8f0 !important;
          border-right: 1px solid #f1f5f9 !important;
        }
        @media (min-width: 640px) {
          .course-antd-table .ant-table-tbody > tr > td {
            padding: 8px 14px !important;
            font-size: 14px !important;
          }
        }
        .course-antd-table .ant-table-tbody > tr > td:last-child {
          border-right: none !important;
        }
        .course-antd-table .ant-table-tbody > tr:hover > td {
          background-color: #f8fafc !important;
        }
        .course-antd-table-alt .ant-table-thead > tr > th,
        .course-antd-table-alt .ant-table-thead > tr > th.ant-table-cell,
        .course-antd-table-alt .ant-table-thead > tr > th * {
          background-color: #0C2B4E !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          font-weight: 700 !important;
        }

        /* Ant Design Carousel for AI Tools */
        .tools-antd-carousel .slick-slider {
          overflow: hidden !important;
          width: 100% !important;
        }
        .tools-antd-carousel .slick-list {
          margin: 0 -10px !important;
          overflow: hidden !important;
        }
        .tools-antd-carousel .slick-slide {
          padding: 0 10px !important;
          box-sizing: border-box !important;
          float: left !important;
          height: auto !important;
        }
        .tools-antd-carousel .slick-slide > div {
          height: 100% !important;
        }
        @media (max-width: 767px) {
          .tools-antd-carousel .slick-list {
            margin: 0 !important;
          }
          .tools-antd-carousel .slick-slide {
            padding: 0 4px !important;
          }
        }
      `}</style>

      <div className="w-full pt-2.5 sm:pt-6 px-2.5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 xl:gap-8 w-full">
          {/* ─── LEFT COLUMN: Main Blog Post Content ─── */}
          <main className={`flex-1 min-w-0 w-full ${BLOG_BODY_TYPOGRAPHY}`}>
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/90 shadow-xs p-3.5 sm:p-7">
              <h1 className="text-lg sm:text-2xl text-gray-900 font-bold leading-snug sm:leading-tight mb-2 sm:mb-3">
                {pageTitle}
              </h1>
              {(authorName || formattedDate || blog?.readTime) && (
                <div className="flex items-center justify-between flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-600 mb-2.5 sm:mb-3">
                  {authorName && (
                    <div className="flex items-center gap-1">
                      <User className="size-3" />
                      <span className="font-normal text-xs text-slate-600">{authorName}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap ml-auto">
                    {formattedDate && (
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="size-3 text-slate-500" />
                        <span className="font-normal text-xs text-slate-600">{formattedDate}</span>
                      </div>
                    )}
                    {viewsText && (
                      <div className="flex items-center gap-1">
                        <Eye className="size-3 text-slate-500" />
                        <span className="font-normal text-xs text-slate-600">{viewsText}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* 🖼️ Featured Cover Image Banner */}
              {blogImageUrl && (
                <div className="relative w-full h-44 sm:h-64 md:h-72 lg:h-80 rounded overflow-hidden mb-4 sm:mb-6">
                  <Image
                    src={blogImageUrl}
                    alt={pageTitle}
                    fill
                    loading="eager"
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}
              {/* 📄 Intro / Subtitle from API */}
              {blog.subtitle && (
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3 sm:mb-4">
                  {blog.subtitle}
                </p>
              )}

              {/* 📑 Table of Contents (Dynamically mapped to the sections below) */}
              {finalHeadings.length > 0 && (
                <div className="my-6 sm:my-8 rounded-2xl bg-white border border-gray-200 p-4 shadow-2xs w-full">
                  <div
                    onClick={() => setTocOpen(!tocOpen)}
                    className={`flex items-center justify-between cursor-pointer select-none ${tocOpen ? "mb-4" : "mb-0"
                      }`}
                  >
                    <h2 className="text-base sm:text-lg font-bold text-[#0D3B66] m-0">
                      Table of Contents
                    </h2>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTocOpen(!tocOpen);
                      }}
                      className="text-[#0D3B66] hover:text-blue-700 p-1 rounded-md transition-colors cursor-pointer"
                      aria-label="Toggle Table of Contents"
                    >
                      {tocOpen ? (
                        <ChevronUp size={20} strokeWidth={2.4} />
                      ) : (
                        <ChevronDown size={20} strokeWidth={2.4} />
                      )}
                    </button>
                  </div>

                  <ul
                    className={`space-y-2.5 text-xs sm:text-sm font-medium list-none p-0 m-0 ${tocOpen ? "block" : "hidden"
                      }`}
                    aria-hidden={!tocOpen}
                  >
                    {finalHeadings.map((h, i) => (
                      <li key={h.id || i} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold select-none text-[17px] leading-none shrink-0">
                          »
                        </span>
                        <a
                          href={`#${h.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(h.id);
                            if (el) {
                              const y =
                                el.getBoundingClientRect().top +
                                window.pageYOffset -
                                85;
                              window.scrollTo({ top: y, behavior: "smooth" });
                            }
                          }}
                          className="text-gray-700 text-xs sm:text-sm hover:text-blue-800 transition-colors hover:underline cursor-pointer"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 📄 Dynamic Structured Sections from API */}
              {groupedSections && groupedSections.length > 0 && (
                <div className="space-y-6 sm:space-y-7 text-gray-700 text-xs sm:text-sm mt-5 sm:mt-6">
                  {groupedSections.map((group, gIdx) => {
                    const HeadingTag =
                      group.headingTag && ["h1", "h2", "h3", "h4", "h5", "h6"].includes(group.headingTag.toLowerCase())
                        ? group.headingTag.toLowerCase()
                        : "h2";

                    return (
                      <section key={group._id || group.id || gIdx} id={group.id} className="scroll-mt-24">
                        {group.headingText && (
                          <HeadingTag className="text-xl sm:text-2xl font-bold text-[#0D3B66] m-0 mb-1 tracking-tight">
                            {group.headingText}
                          </HeadingTag>
                        )}

                        <div className="space-y-2 text-gray-700 text-xs sm:text-sm">
                          {group.items.map((sec, sIdx) => {
                            const hasImage = Boolean(
                              sec.image ||
                              sec.imageUrl ||
                              sec.media ||
                              sec.blockType === "image"
                            );

                            const hasVideo = Boolean(
                              sec.video ||
                              sec.videoUrl ||
                              sec.youtubeUrl ||
                              sec.blockType === "video"
                            );

                            const hasPdf = Boolean(
                              sec.pdf ||
                              sec.blockType === "pdf"
                            );

                            const isTitleOnly =
                              !sec.paragraphs &&
                              !sec.intro &&
                              !sec.checklist &&
                              !sec.table &&
                              !sec.columnsList &&
                              !sec.numberedList &&
                              !sec.bulletPoints &&
                              !sec.twoColBullets &&
                              !sec.poll &&
                              !sec.orderedSteps &&
                              !sec.importantNotice &&
                              !sec.ctaButtons &&
                              !sec.ctaButton &&
                              !sec.outro &&
                              !sec.note &&
                              !hasImage &&
                              !hasVideo &&
                              !hasPdf;

                            if (isTitleOnly) return null;

                            return (
                              <div key={sec._id || sec.id || sIdx} className="space-y-1.5">
                                {sec.title && sec.title.trim() !== group.headingText && (
                                  <h3 className="text-base sm:text-lg font-bold text-[#0D3B66] m-0 mb-1">
                                    {sec.title}
                                  </h3>
                                )}

                                {Array.isArray(sec.paragraphs) &&
                                  sec.paragraphs.map((p, idx) => {
                                    if (typeof p !== "string" || !p.trim()) return null;
                                    const parts = p.split(/\n\s*\n/).filter((t) => t.trim().length > 0);
                                    return parts.map((part, pIdx) => (
                                      <p key={`${idx}-${pIdx}`} className="m-0 text-gray-700 text-xs sm:text-sm">
                                        {part.trim()}
                                      </p>
                                    ));
                                  })}
                                {typeof sec.paragraphs === "string" &&
                                  sec.paragraphs.trim() &&
                                  sec.paragraphs.split(/\n\s*\n/).filter((t) => t.trim().length > 0).map((part, pIdx) => (
                                    <p key={pIdx} className="m-0 text-gray-700 text-xs sm:text-sm">
                                      {part.trim()}
                                    </p>
                                  ))}

                                {sec.intro && <p className="m-0 text-gray-700 text-xs sm:text-sm">{sec.intro}</p>}

                                {/* 🖼️ Image Section / Banner (1041 x 585 px / 16:9) */}
                                {hasImage && (
                                  <div className="my-3 sm:my-4 w-full">
                                    {(() => {
                                      const rawImg = sec.image || sec.imageUrl || sec.media;
                                      const imgUrl =
                                        typeof rawImg === "string"
                                          ? rawImg
                                          : rawImg?.url || rawImg?.path || rawImg?.fileName
                                            ? getAssetPath(rawImg)
                                            : null;
                                      const altText =
                                        (typeof rawImg === "object" ? rawImg?.alt : null) ||
                                        sec.title ||
                                        "Blog image";
                                      const captionText =
                                        (typeof rawImg === "object" ? rawImg?.caption : null) ||
                                        sec.imageCaption ||
                                        "";

                                      if (imgUrl) {
                                        return (
                                          <div className="w-full">
                                            <div className="relative w-full h-44 sm:h-64 md:h-72 lg:h-80 rounded overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs">
                                              <Image
                                                src={getAssetPath(imgUrl)}
                                                alt={altText}
                                                fill
                                                unoptimized
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 900px"
                                              />
                                            </div>
                                            {captionText && (
                                              <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-1.5 font-medium italic m-0">
                                                {captionText}
                                              </p>
                                            )}
                                          </div>
                                        );
                                      }

                                      // Exact placeholder matching screenshot (1041 x 585 px with image icon)
                                      return (
                                        <div className="w-full">
                                          <div className="relative w-full h-44 sm:h-64 md:h-72 lg:h-80 rounded bg-[#737373] flex flex-col items-center justify-center text-white shadow-xs select-none">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-white/90 mb-2">
                                              <ImageIcon size={64} strokeWidth={1.5} className="text-white/90" />
                                            </div>
                                            <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                                              {captionText || "1041 x 585 px"}
                                            </span>
                                          </div>
                                          {captionText && (
                                            <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-1.5 font-medium italic m-0">
                                              {captionText}
                                            </p>
                                          )}
                                        </div>
                                      );
                                    })()}
                                  </div>
                                )}

                                {/* 🎥 Video Section (YouTube Embed / Video Player 16:9) */}
                                {hasVideo && (
                                  <div className="my-3 sm:my-4 w-full">
                                    {(() => {
                                      const rawVideo = sec.video || sec.videoUrl || sec.youtubeUrl;
                                      const videoUrl = typeof rawVideo === "string" ? rawVideo : rawVideo?.url || "";
                                      const videoTitle =
                                        (typeof rawVideo === "object" ? rawVideo?.title : null) ||
                                        sec.title ||
                                        "Educational Video";
                                      const captionText =
                                        (typeof rawVideo === "object" ? rawVideo?.caption : null) ||
                                        sec.videoCaption ||
                                        "";

                                      const embedUrl = getYouTubeEmbedUrl(videoUrl);
                                      const isDirectVideo =
                                        !embedUrl && videoUrl && /\.(mp4|webm|ogg|mov)($|\?)/i.test(videoUrl);

                                      if (embedUrl) {
                                        return (
                                          <div className="w-full">
                                            <div className="relative w-full aspect-video rounded overflow-hidden bg-black border border-slate-200/80 shadow-xs">
                                              <iframe
                                                src={embedUrl}
                                                title={videoTitle}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                className="w-full h-full border-0 absolute inset-0"
                                              />
                                            </div>
                                            {captionText && (
                                              <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-1.5 font-medium italic m-0">
                                                {captionText}
                                              </p>
                                            )}
                                          </div>
                                        );
                                      }

                                      if (isDirectVideo) {
                                        return (
                                          <div className="w-full">
                                            <div className="relative w-full aspect-video rounded overflow-hidden bg-black border border-slate-200/80 shadow-xs">
                                              <video
                                                controls
                                                playsInline
                                                className="w-full h-full object-cover"
                                                src={getAssetPath(videoUrl)}
                                              />
                                            </div>
                                            {captionText && (
                                              <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-1.5 font-medium italic m-0">
                                                {captionText}
                                              </p>
                                            )}
                                          </div>
                                        );
                                      }

                                      // Video Player Placeholder (matching Screenshot 2 & 3)
                                      return (
                                        <div className="w-full">
                                          <div className="relative w-full aspect-video rounded bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 flex flex-col items-center justify-center text-white shadow-xs overflow-hidden group">
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                              <Play size={26} className="fill-current translate-x-0.5 text-white" />
                                            </div>
                                            <span className="text-xs sm:text-sm font-semibold text-slate-300 mt-3 tracking-wide">
                                              {videoTitle && videoTitle !== "Educational Video"
                                                ? videoTitle
                                                : "Video Player (16:9)"}
                                            </span>
                                          </div>
                                          {captionText && (
                                            <p className="text-center text-[11px] sm:text-xs text-slate-500 mt-1.5 font-medium italic m-0">
                                              {captionText}
                                            </p>
                                          )}
                                        </div>
                                      );
                                    })()}
                                  </div>
                                )}

                                {/* 📄 PDF Document Button/Card (matching Screenshot) */}
                                {hasPdf && (
                                  <div className="my-3 w-full">
                                    {(() => {
                                      const rawPdf = sec.pdf;
                                      const pdfUrl =
                                        typeof rawPdf === "string"
                                          ? rawPdf
                                          : rawPdf?.url || rawPdf?.path || "";
                                      let pdfName =
                                        (typeof rawPdf === "object"
                                          ? rawPdf?.name || rawPdf?.alt || rawPdf?.fileName
                                          : null) ||
                                        sec.title ||
                                        (typeof rawPdf === "string" && rawPdf.includes(".pdf")
                                          ? rawPdf.split("/").pop()
                                          : "Document.pdf");

                                      if (pdfName && typeof pdfName === "string" && !/\.pdf$/i.test(pdfName)) {
                                        pdfName = `${pdfName}.pdf`;
                                      }

                                      const href = pdfUrl ? getAssetPath(pdfUrl) : "";

                                      return (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (href) {
                                              setActivePdf({
                                                url: href,
                                                title: pdfName,
                                              });
                                              setPdfModalOpen(true);
                                            }
                                          }}
                                          className="inline-flex items-center gap-3 bg-[#EAEBED] hover:bg-[#E2E4E7] border border-slate-300/60 px-3.5 py-2.5 rounded-lg transition-colors shadow-2xs group no-underline text-left cursor-pointer max-w-sm"
                                        >
                                          {/* PDF Icon with red border, ribbon, and PDF text */}
                                          <div className="shrink-0 w-8 h-10 relative flex items-center justify-center">
                                            <svg
                                              className="w-8 h-10"
                                              viewBox="0 0 32 40"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M4 2C2.89543 2 2 2.89543 2 4V36C2 37.1046 2.89543 38 4 38H28C29.1046 38 30 37.1046 30 36V12L20 2H4Z"
                                                fill="white"
                                                stroke="#E11D48"
                                                strokeWidth="1.8"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                d="M20 2V12H30"
                                                stroke="#E11D48"
                                                strokeWidth="1.8"
                                                strokeLinejoin="round"
                                              />
                                              <path
                                                d="M12.5 21C13 18 14.5 15.5 16 15.5C17 15.5 17 17.5 16 19.5C14.8 22 11 25.5 8.5 26C7.5 26.2 7 25.5 7.5 24.5C8.5 22.5 11 22 12.5 21ZM12.5 21C15 20.5 19.5 21 22 23C23 23.8 22.5 24.5 21 24C19 23.5 15.5 21.8 12.5 21Z"
                                                stroke="#E11D48"
                                                strokeWidth="1.3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              />
                                              <text
                                                x="16"
                                                y="34.5"
                                                textAnchor="middle"
                                                fill="#1E293B"
                                                fontSize="6.5"
                                                fontWeight="800"
                                                fontFamily="sans-serif"
                                                letterSpacing="0.5"
                                              >
                                                PDF
                                              </text>
                                            </svg>
                                          </div>

                                          {/* PDF Details */}
                                          <div className="flex-1 min-w-0">
                                            <span className="text-xs sm:text-[13px] font-semibold text-slate-800 leading-snug line-clamp-1 block">
                                              {pdfName}
                                            </span>
                                            <span className="text-[11px] sm:text-xs font-semibold text-[#1a73e8] group-hover:underline flex items-center gap-1 mt-0.5">
                                              View PDF
                                            </span>
                                          </div>
                                        </button>
                                      );
                                    })()}
                                  </div>
                                )}

                                {Array.isArray(sec.checklist) && sec.checklist.length > 0 && (
                                  <ul className="space-y-0.5 list-none p-0">
                                    {sec.checklist.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-gray-700 text-xs sm:text-sm">
                                        <span className="inline-flex items-center justify-center w-3 h-3 rounded bg-[#22C55E] text-white shrink-0 mt-1 shadow-2xs">
                                          <Check size={9} strokeWidth={4} />
                                        </span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}

                                {sec.table && Array.isArray(sec.table.rows) && sec.table.rows.length > 0 && (
                                  <div className="my-2.5 w-full">
                                    <div className="w-full overflow-hidden border border-gray-200 shadow-2xs rounded-lg">
                                      <Table
                                        columns={
                                          Array.isArray(sec.table.headers) && sec.table.headers.length > 0
                                            ? sec.table.headers.map((headerText, cIdx) => {
                                              const total = sec.table.headers.length;
                                              const width =
                                                total === 2
                                                  ? cIdx === 0
                                                    ? "35%"
                                                    : "65%"
                                                  : `${Math.floor(100 / total)}%`;
                                              return {
                                                title: headerText,
                                                dataIndex: `col${cIdx + 1}`,
                                                key: `col${cIdx + 1}`,
                                                width,
                                                align: "left",
                                                onCell: (record) => ({
                                                  className: record?.isTotal
                                                    ? "font-bold text-gray-900 bg-slate-50 text-left text-xs sm:text-sm"
                                                    : cIdx === 0
                                                      ? "font-bold text-gray-900 text-left text-xs sm:text-sm"
                                                      : "font-normal text-gray-700 text-left text-xs sm:text-sm",
                                                }),
                                                render: (val, record) => {
                                                  if (val !== undefined && val !== null && val !== "") return val;
                                                  if (Array.isArray(record.cols) && record.cols[cIdx] !== undefined) return record.cols[cIdx];
                                                  if (Array.isArray(record.values) && record.values[cIdx] !== undefined) return record.values[cIdx];
                                                  if (cIdx === 0) return record.factor || record.name || record.category || "";
                                                  if (cIdx === 1) return record.check || record.amount || record.details || "";
                                                  return "";
                                                },
                                              };
                                            })
                                            : sec.table.type === "comparison"
                                              ? comparisonTableColumns
                                              : feeTableColumns
                                        }
                                        dataSource={sec.table.rows.map((row, idx) => ({
                                          ...row,
                                          key: row.key || row._id || row.factor || row.name || row.col1 || idx,
                                        }))}
                                        pagination={false}
                                        size="small"
                                        bordered
                                        scroll={{ x: sec.table?.headers?.length > 3 ? "max-content" : undefined }}
                                        className="course-antd-table w-full"
                                      />
                                    </div>
                                    {sec.table.note && (
                                      <p className="text-xs sm:text-sm text-slate-500 mt-1.5 italic m-0">
                                        {sec.table.note}
                                      </p>
                                    )}
                                  </div>
                                )}

                                {Array.isArray(sec.columnsList) && sec.columnsList.length > 0 && (
                                  <div
                                    className={`grid gap-x-8 gap-y-1.5 ${sec.columnsList.length === 1
                                      ? "grid-cols-1"
                                      : sec.columnsList.length === 2
                                        ? "grid-cols-1 sm:grid-cols-2"
                                        : sec.columnsList.length === 3
                                          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                                      }`}
                                  >
                                    {sec.columnsList.map((col, cIdx) => (
                                      <ul key={cIdx} className="space-y-1 list-none p-0 m-0">
                                        {Array.isArray(col) &&
                                          col.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                              <span className="text-blue-500 font-bold select-none text-[16px] leading-none shrink-0 mt-0.5">
                                                »
                                              </span>
                                              <span className="text-gray-700 text-xs sm:text-sm hover:text-blue-800 transition-colors">
                                                {item}
                                              </span>
                                            </li>
                                          ))}
                                      </ul>
                                    ))}
                                  </div>
                                )}

                                {Array.isArray(sec.numberedList) && sec.numberedList.length > 0 && (
                                  <div className="space-y-2">
                                    {sec.numberedList.map((item, idx) => {
                                      const rawTitle = (item?.title || "").trim();
                                      let numberStr = `${idx + 1}.`;
                                      let titleText = rawTitle;

                                      const match = rawTitle.match(/^(\d+[\.\)])\s*(.*)$/);
                                      if (match) {
                                        numberStr = match[1];
                                        titleText = match[2];
                                      }

                                      return (
                                        <div key={idx} className="flex items-start gap-2">
                                          <span className="font-bold text-slate-900 text-xs sm:text-sm select-none shrink-0">
                                            {numberStr}
                                          </span>
                                          <div className="space-y-0.5 min-w-0 flex-1">
                                            {titleText && (
                                              <h4 className="font-bold text-slate-900 m-0 text-xs sm:text-sm">
                                                {titleText}
                                              </h4>
                                            )}
                                            {item?.desc && (
                                              <p className="text-gray-700 m-0 text-xs sm:text-sm">
                                                {item.desc}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {Array.isArray(sec.bulletPoints) && sec.bulletPoints.length > 0 && (
                                  Array.isArray(sec.bulletPoints[0]) ? (
                                    <div
                                      className={`grid gap-x-8 gap-y-1.5 ${sec.bulletPoints.length === 1
                                        ? "grid-cols-1"
                                        : sec.bulletPoints.length === 2
                                          ? "grid-cols-1 sm:grid-cols-2"
                                          : sec.bulletPoints.length === 3
                                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                                        }`}
                                    >
                                      {sec.bulletPoints.map((col, cIdx) => (
                                        <ul key={cIdx} className="space-y-1 list-disc list-outside ml-5 text-gray-700 text-xs sm:text-sm p-0 m-0">
                                          {Array.isArray(col) &&
                                            col.map((item, idx) => (
                                              <li key={idx}>
                                                <span>{item}</span>
                                              </li>
                                            ))}
                                        </ul>
                                      ))}
                                    </div>
                                  ) : (
                                    <ul className="space-y-1 list-disc list-outside ml-5 text-gray-700 text-xs sm:text-sm my-1 p-0">
                                      {sec.bulletPoints.map((item, idx) => (
                                        <li key={idx}>
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )
                                )}

                                {Array.isArray(sec.twoColBullets) && sec.twoColBullets.length > 0 && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                                    {sec.twoColBullets.map((col, cIdx) => (
                                      <ul key={cIdx} className="space-y-1 list-disc list-inside text-gray-700 text-xs sm:text-sm p-0 m-0">
                                        {Array.isArray(col) &&
                                          col.map((item, idx) => (
                                            <li key={idx}>
                                              <span>{item}</span>
                                            </li>
                                          ))}
                                      </ul>
                                    ))}
                                  </div>
                                )}

                                {sec.poll && Array.isArray(sec.poll.options) && sec.poll.options.length > 0 && (
                                  <div className="rounded-xl border border-blue-400 bg-white p-4 sm:p-5 my-2.5 shadow-2xs">
                                    {sec.poll.question && (
                                      <h3 className="text-base sm:text-lg font-bold text-[#0D3B66] mb-3 m-0">
                                        {sec.poll.question}
                                      </h3>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                      {sec.poll.options.map((optItem, optIdx) => {
                                        const optTitle =
                                          typeof optItem === "string"
                                            ? optItem
                                            : optItem?.option || optItem?.text || optItem?.title || "";
                                        const isSelected = selectedPoll === optTitle;
                                        return (
                                          <button
                                            key={optIdx}
                                            type="button"
                                            onClick={() => setSelectedPoll(optTitle)}
                                            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border text-xs sm:text-sm font-medium transition-all cursor-pointer text-left ${isSelected
                                              ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-2xs ring-1 ring-blue-500/20"
                                              : "border-slate-200 hover:border-slate-300 text-gray-700 bg-white"
                                              }`}
                                          >
                                            <span
                                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 border ${isSelected ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-slate-200"
                                                }`}
                                            >
                                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                            </span>
                                            <span className="truncate">{optTitle}</span>
                                          </button>
                                        );
                                      })}
                                    </div>

                                    {(() => {
                                      const activeOpt = sec.poll.options.find((o) => {
                                        const title =
                                          typeof o === "string"
                                            ? o
                                            : o?.option || o?.text || o?.title || "";
                                        return title === selectedPoll;
                                      });
                                      const displayText =
                                        (typeof activeOpt === "object" ? activeOpt?.answer : null) ||
                                        sec.poll.footnote ||
                                        null;

                                      if (!displayText) return null;

                                      const formattedText = displayText.startsWith("*")
                                        ? displayText
                                        : `*${displayText}`;

                                      return (
                                        <p className="text-xs sm:text-sm text-slate-500 mt-3 m-0 font-normal">
                                          {formattedText}
                                        </p>
                                      );
                                    })()}
                                  </div>
                                )}

                                {(() => {
                                  const buttons = Array.isArray(sec.ctaButtons) && sec.ctaButtons.length > 0
                                    ? sec.ctaButtons.filter((b) => b && b.text)
                                    : sec.ctaButton && sec.ctaButton.text
                                      ? [sec.ctaButton]
                                      : [];
                                  if (buttons.length === 0) return null;
                                  return (
                                    <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
                                      {buttons.map((btn, bIdx) => (
                                        <Link
                                          key={bIdx}
                                          href={btn.href || "/courses"}
                                          className="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-[#F4D068] hover:bg-[#ebc557] text-[#0C2B4E] text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer no-underline active:scale-95"
                                        >
                                          {btn.text}
                                        </Link>
                                      ))}
                                    </div>
                                  );
                                })()}

                                {Array.isArray(sec.orderedSteps) && sec.orderedSteps.length > 0 && (
                                  Array.isArray(sec.orderedSteps[0]) ? (
                                    <div
                                      className={`grid gap-x-8 gap-y-2.5 pt-1 ${sec.orderedSteps.length === 1
                                        ? "grid-cols-1"
                                        : sec.orderedSteps.length === 2
                                          ? "grid-cols-1 sm:grid-cols-2"
                                          : sec.orderedSteps.length === 3
                                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                                        }`}
                                    >
                                      {sec.orderedSteps.map((col, cIdx) => (
                                        <ol key={cIdx} className="space-y-1.5 list-none p-0 m-0 text-gray-700 text-xs sm:text-sm">
                                          {Array.isArray(col) &&
                                            col.map((step, idx) => (
                                              <li key={idx} className="flex items-start gap-3">
                                                <span className="text-gray-500 font-medium select-none min-w-[20px] text-right">
                                                  {idx + 1}.
                                                </span>
                                                <span className="text-gray-700">{step}</span>
                                              </li>
                                            ))}
                                        </ol>
                                      ))}
                                    </div>
                                  ) : (
                                    <ol className="space-y-1.5 list-none p-0 m-0 text-gray-700 text-xs sm:text-sm">
                                      {sec.orderedSteps.map((step, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                          <span className="text-gray-500 font-medium select-none min-w-[20px] text-right">
                                            {idx + 1}.
                                          </span>
                                          <span className="text-gray-700">{step}</span>
                                        </li>
                                      ))}
                                    </ol>
                                  )
                                )}

                                {sec.importantNotice && (sec.importantNotice.title || sec.importantNotice.desc) && (
                                  <div className="space-y-1 pt-2">
                                    {sec.importantNotice.title && (
                                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm m-0">
                                        {sec.importantNotice.title}
                                      </h4>
                                    )}
                                    {sec.importantNotice.desc && (
                                      <p className="text-gray-700 text-xs sm:text-sm m-0">
                                        {sec.importantNotice.desc}
                                      </p>
                                    )}
                                  </div>
                                )}

                                {sec.note && <p className="text-xs sm:text-sm text-gray-700 font-bold m-0">{sec.note}</p>}
                                {sec.outro && <p className="text-xs sm:text-sm text-gray-700 m-0">{sec.outro}</p>}
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    );
                  })}
                </div>
              )}
            </div>


            {/* =====================================================================
            1️⃣5️⃣ FREQUENTLY ASKED QUESTIONS (Exact Course Page Standalone Card)
        ===================================================================== */}
            {allFaqs && allFaqs.length > 0 && (
              <div
                id="faqs"
                data-nav-label="FAQs"
                className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 md:p-8 mt-6 scroll-mt-20 space-y-5 sm:space-y-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                  Frequently Asked Questions (FAQs)
                </h2>

                <div className="space-y-2.5 sm:space-y-3 max-w-5xl mx-auto">
                  {allFaqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    const cleanQuestion = (faq.question || faq.q || "")
                      .replace(/^q\d*[\.\:\s]*/i, "")
                      .trim();
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl border transition-all duration-200 overflow-hidden ${isOpen
                          ? "border-blue-400 bg-blue-200/30 shadow-2xs"
                          : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                          className="w-full flex items-center justify-between gap-3 p-2.5 sm:p-3 text-left cursor-pointer bg-transparent border-none outline-none"
                        >
                          <span
                            className={`text-xs sm:text-sm font-semibold ${isOpen ? "text-[#0C2B4E]" : "text-gray-900"
                              }`}
                          >
                            Q{idx + 1}. {cleanQuestion}
                          </span>
                          <span
                            className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 transition-colors ${isOpen
                              ? "bg-[#0C2B4E] text-white"
                              : "bg-gray-300 text-gray-500"
                              }`}
                          >
                            {isOpen ? <Minus size={10} /> : <Plus size={10} />}
                          </span>
                        </button>
                        <div
                          className={
                            isOpen
                              ? "p-3 text-xs sm:text-sm text-gray-700 font-normal border-t border-blue-100/60"
                              : "sr-only"
                          }
                        >
                          <SafeHtmlRenderer html={faq.answer || faq.a || ""} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =====================================================================
            👍 WAS THIS ARTICLE HELPFUL? (Helpful Feedback Card)
        ===================================================================== */}
            <div className="bg-[#f0f7ff] rounded-xl border border-blue-100 p-4 sm:p-5 mt-6">
              <h3 className="text-base sm:text-lg font-bold text-[#0D3B66] m-0 mb-3 tracking-tight">
                Was This Article Helpful?
              </h3>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setArticleHelpful("yes")}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all border cursor-pointer active:scale-95 ${articleHelpful === "yes"
                    ? "bg-white border-emerald-500 text-gray-800 shadow-2xs"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <ThumbsUp size={14} className="text-emerald-600 fill-emerald-600" />
                  <span>Yes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setArticleHelpful("no")}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all border cursor-pointer active:scale-95 ${articleHelpful === "no"
                    ? "bg-white border-slate-400 text-gray-800 shadow-2xs"
                    : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                >
                  <ThumbsDown size={14} className="text-slate-500 fill-slate-500" />
                  <span>No</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-3 m-0 font-normal">
                {articleHelpful === "no"
                  ? "*Thanks for your feedback! We'll work to improve it."
                  : "*Thanks! We're glad this article helped."}
              </p>
            </div>

            {/* =====================================================================
            💬 ADD COMMENTS SECTION
        ===================================================================== */}
            <div id="add-comments" className="mt-6 scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight m-0 mb-3">
                Add Comments
              </h2>

              <div className="bg-[#f8f9fa] rounded-2xl border border-gray-200/90 p-4 sm:p-6 space-y-4">
                {/* Scrollable list of comments */}
                {commentsList && commentsList.length > 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200/80 p-4 max-h-[190px] overflow-y-auto space-y-3 shadow-2xs">
                    {commentsList.map((cmt, idx) => (
                      <div
                        key={cmt._id || cmt.id || idx}
                        className={`flex items-start gap-3 ${idx !== commentsList.length - 1 ? "pb-3 border-b border-gray-100" : ""
                          }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                          <User size={15} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs sm:text-sm font-bold text-gray-900 m-0">
                            {cmt.name}
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 m-0 font-normal">
                            {cmt.text || cmt.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-gray-200/80 p-4 text-center text-xs sm:text-sm text-slate-500 shadow-2xs">
                    No comments yet. Be the first to share your thoughts!
                  </div>
                )}

                {/* Leave a Comment Form */}
                <div className="pt-1">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 m-0 mb-2">
                    Leave a Comment
                  </h4>

                  <Form
                    form={commentForm}
                    layout="vertical"
                    onFinish={handleCommentSubmit}
                    className="space-y-3"
                  >
                    <Form.Item
                      name="comment"
                      rules={[{ required: true, message: "Please enter your comment" }]}
                      className="mb-3"
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder=""
                        className="rounded-lg border border-gray-200 bg-white hover:border-blue-400 focus:border-blue-600 text-xs sm:text-sm p-3 resize-none shadow-2xs"
                      />
                    </Form.Item>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-5">
                        <Form.Item
                          name="name"
                          rules={[{ required: true, message: "Please enter your name" }]}
                          className="mb-0"
                        >
                          <Input
                            placeholder="Enter Your Name*"
                            className="rounded-lg border-gray-200 h-10 text-xs sm:text-sm bg-white"
                          />
                        </Form.Item>
                      </div>

                      <div className="sm:col-span-4">
                        <Form.Item
                          name="email"
                          rules={[
                            { required: true, message: "Please enter your email" },
                            { type: "email", message: "Please enter a valid email address" },
                          ]}
                          className="mb-0"
                        >
                          <Input
                            placeholder="Enter Your Email*"
                            className="rounded-lg border-gray-200 h-10 text-xs sm:text-sm bg-white"
                          />
                        </Form.Item>
                      </div>

                      <div className="sm:col-span-3">
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={commentSubmitting}
                          className="w-full h-10 bg-[#003884] hover:bg-[#07244D] text-white font-bold rounded-lg border-none text-xs sm:text-sm shadow-xs transition-colors cursor-pointer flex items-center justify-center active:scale-95"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>

              {/* Tags Bar directly below Add Comments card */}
              {displayTags ? (
                <div className="mt-4 bg-[#f8f9fa] rounded-lg border border-gray-200 px-4 py-2.5 text-xs sm:text-sm text-gray-700">
                  <span className="font-bold text-gray-900">Tags: </span>
                  <span className="text-gray-700">{displayTags}</span>
                </div>
              ) : null}

              {/* =====================================================================
              🤖 EXPLORE AI POWERED TOOLS (Ant Design Carousel directly below Tags)
          ===================================================================== */}
              {mappedTools && mappedTools.length > 0 && (
                <div
                  id="ai-tools"
                  data-nav-label="AI Tools"
                  className="bg-[#F8FAFC] rounded-2xl border border-slate-200/80 p-5 sm:p-7 md:p-8 mt-6 scroll-mt-20"
                >
                  {/* Top Pill Badge */}
                  <div className="flex justify-center mb-2 sm:mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-[11px] font-bold tracking-wide uppercase shadow-2xs">
                      <span className="text-[#D97706] text-xs">✦</span>
                      <span>AI Powered</span>
                    </span>
                  </div>

                  {/* Heading */}
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] text-center tracking-tight mb-1">
                    Explore AI Powered Tools
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 text-center font-normal mb-6">
                    Make smarter education decisions with AI-powered tools
                  </p>

                  {/* Ant Design Carousel with infinite scrolling & autoplay */}
                  <Carousel
                    key={`tools-carousel-${slidesToShow}`}
                    ref={carouselRef}
                    autoplay={true}
                    autoplaySpeed={3000}
                    speed={600}
                    pauseOnHover={true}
                    dots={false}
                    slidesToShow={slidesToShow}
                    slidesToScroll={1}
                    infinite={mappedTools.length > slidesToShow}
                    arrows={false}
                    beforeChange={(from, to) => setActiveSlide(to % mappedTools.length)}
                    className="tools-antd-carousel"
                  >
                    {mappedTools.map((tool, idx) => (
                      <div key={tool.id || idx} className="py-2">
                        <div className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-xl border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 group">
                          {/* Top-Right Sparkle */}
                          <span
                            className={`absolute top-3.5 right-3.5 ${tool.sparkleColor} font-black text-xs select-none group-hover:rotate-12 transition-transform`}
                          >
                            ✦
                          </span>

                          {/* Round Icon with colored background */}
                          <div
                            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full ${tool.circleBg} flex items-center justify-center mb-3 transition-transform group-hover:scale-110 shrink-0`}
                          >
                            {tool.icon}
                          </div>

                          {/* Title with Underlined Word */}
                          <div className="w-full flex items-center justify-center mb-1.5">
                            <h3 className="text-sm sm:text-base font-bold text-[#0F172A] tracking-tight m-0 leading-tight line-clamp-1 w-full text-center">
                              {tool.prefix ? `${tool.prefix} ` : ""}
                              <span className={`border-b-2 ${tool.underlineClass} pb-0.5 inline-block`}>
                                {tool.underlineWord}
                              </span>
                            </h3>
                          </div>

                          {/* Description */}
                          <div className="w-full flex items-center justify-center min-h-[36px] sm:min-h-[40px]">
                            <p className="text-[#64748B] text-xs sm:text-sm font-normal m-0 line-clamp-2 text-center">
                              {tool.description}
                            </p>
                          </div>

                          {/* Button */}
                          <div className="w-full mt-4 sm:mt-5 flex justify-center">
                            <Link
                              href={tool.linkUrl}
                              className="w-full max-w-53.75 py-2 px-3.5 rounded-full bg-[#0B3B7E] hover:bg-[#072859] text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-between cursor-pointer no-underline group-hover:shadow-md active:scale-95"
                            >
                              <span className="truncate">{tool.btnText}</span>
                              <span className="w-5 h-5 rounded-full bg-white text-[#0B3B7E] flex items-center justify-center text-xs font-bold shrink-0 ml-1.5 transition-transform group-hover:translate-x-0.5">
                                →
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Carousel>

                  {/* Dynamic Dots Pagination (strictly mappedTools.length, not fixed 4 dots) */}
                  {mappedTools.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5 mt-5">
                      {mappedTools.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => carouselRef.current?.goTo(dotIdx)}
                          className={`transition-all rounded-full cursor-pointer border-none p-0 ${activeSlide === dotIdx
                            ? "w-2.5 h-2.5 bg-[#0B3B7E]"
                            : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                            }`}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>

          {/* ─── RIGHT COLUMN: Blog Sidebar (Positioned to the right to fill desktop space) ─── */}
          <aside className="w-full lg:w-[360px] xl:w-[390px] 2xl:w-[420px] shrink-0 lg:self-stretch">
            <BlogSidebar
              title={pageTitle}
              categories={initialCategories}
              author={blog.author}
              relatedBlogs={
                Array.isArray(blog.related)
                  ? blog.related
                  : Array.isArray(initialData?.related)
                    ? initialData.related
                    : []
              }
              recentBlogs={
                Array.isArray(blog.recent) && blog.recent.length > 0
                  ? blog.recent
                  : Array.isArray(initialData?.recent) && initialData.recent.length > 0
                    ? initialData.recent
                    : sidebarBlogs.length > 5
                      ? sidebarBlogs.slice(5, 10)
                      : sidebarBlogs.slice(0, 5)
              }
              popularBlogs={
                Array.isArray(blog.popular) && blog.popular.length > 0
                  ? blog.popular
                  : Array.isArray(initialData?.popular) && initialData.popular.length > 0
                    ? initialData.popular
                    : sidebarBlogs.slice(0, 5)
              }
              currentSlug={propSlug || blog.slug}
            />
          </aside>
        </div>
      </div>

      {/* ── PDF Preview Modal ── */}
      <Modal
        open={pdfModalOpen}
        onCancel={() => setPdfModalOpen(false)}
        footer={null}
        width={960}
        centered
        destroyOnClose
        title={
          <div className="flex items-center justify-between gap-3 pr-8">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="shrink-0 w-6 h-7 relative flex items-center justify-center">
                <svg className="w-6 h-7" viewBox="0 0 32 40" fill="none">
                  <path
                    d="M4 2C2.89543 2 2 2.89543 2 4V36C2 37.1046 2.89543 38 4 38H28C29.1046 38 30 37.1046 30 36V12L20 2H4Z"
                    fill="white"
                    stroke="#E11D48"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 2V12H30"
                    stroke="#E11D48"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <text
                    x="16"
                    y="34.5"
                    textAnchor="middle"
                    fill="#E11D48"
                    fontSize="7"
                    fontWeight="800"
                    fontFamily="sans-serif"
                  >
                    PDF
                  </text>
                </svg>
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base truncate">
                {activePdf.title || "PDF Document"}
              </span>
            </div>
            {activePdf.url && (
              <a
                href={activePdf.url}
                download={activePdf.title || "document.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold shrink-0 transition-colors no-underline cursor-pointer"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Download</span>
              </a>
            )}
          </div>
        }
        styles={{
          body: { padding: 0, height: "78vh", display: "flex", flexDirection: "column" },
        }}
      >
        <div className="w-full h-full bg-slate-100 rounded-b-lg overflow-hidden flex flex-col">
          {activePdf.url ? (
            <iframe
              src={`${activePdf.url}#toolbar=1&navpanes=0`}
              title={activePdf.title || "PDF Viewer"}
              className="w-full h-full border-0 flex-1"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
              No document available
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
