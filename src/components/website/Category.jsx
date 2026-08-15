"use client";

import { Container } from "@/components/common/Container";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAssetPath } from "@/lib/utils";
import { ArrowLeft, X } from "lucide-react";
import { Carousel, Modal } from "antd";

// Category Icon Component - Renders MinIO Media Asset image/SVG from backend using Next.js Image
function CategoryIcon({ cat }) {
  const [imgError, setImgError] = useState(false);

  let rawUrl = null;
  if (cat) {
    rawUrl = cat.logoUrl || cat.logoSrc || cat.logo || cat.imageSrc || cat.image;
    if (typeof rawUrl === "object" && rawUrl?.url) rawUrl = rawUrl.url;
  }
  const iconUrl = getAssetPath(rawUrl, null);

  if (iconUrl && !imgError) {
    return (
      <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 relative shrink-0">
        <Image
          src={iconUrl}
          alt={cat.name || cat.label || "Category"}
          fill
          sizes="48px"
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-[10px] sm:text-xs">
      {(cat?.name || "C").charAt(0)}
    </div>
  );
}

// Course Icon Component - Renders logo/image or circular blue badge with course code/initials matching design
function CourseIcon({ course }) {
  const [imgError, setImgError] = useState(false);

  let rawUrl = course?.logoUrl || course?.logoSrc || course?.logo || course?.image;
  if (typeof rawUrl === "object" && rawUrl?.url) rawUrl = rawUrl.url;
  const iconUrl = getAssetPath(rawUrl, null);

  if (iconUrl && !imgError) {
    return (
      <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 relative shrink-0">
        <Image
          src={iconUrl}
          alt={course?.name || "Course"}
          fill
          sizes="48px"
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Circular Badge matching screenshot 2 (ring with centered course code/initials)
  const code = (course?.name || "CRS").trim();
  return (
    <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 rounded-full border-2 border-slate-700/80 text-slate-800 font-bold flex items-center justify-center text-[9px] min-[360px]:text-[10px] sm:text-xs bg-white group-hover:border-blue-600 group-hover:text-blue-600 transition-colors shrink-0">
      {code.length > 4 ? code.slice(0, 3) : code}
    </div>
  );
}

// Helper component to render backend logo/icon or fallback letter badge (Identical to MockupAdditions.jsx)
function PartnerLogoIcon({ partner }) {
  const [imgError, setImgError] = useState(false);

  let rawUrl = null;
  if (partner) {
    rawUrl = partner.logoUrl || partner.logoSrc || partner.logo || partner.imageSrc || partner.image;
    if (typeof rawUrl === "object" && rawUrl?.url) rawUrl = rawUrl.url;
  }
  const logoUrl = getAssetPath(rawUrl, null);

  if (logoUrl && !imgError) {
    return (
      <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 relative shrink-0">
        <Image
          src={logoUrl}
          alt={partner?.name || "Partner Logo"}
          fill
          sizes="48px"
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-[10px] sm:text-xs">
      {(partner?.name || "U").charAt(0)}
    </div>
  );
}

// Helper to format text strictly into max 2 balanced lines without mid-word breaks
function formatTwoLineText(text = "") {
  if (!text) return "";
  const cleaned = text.trim();
  const words = cleaned.split(/\s+/);
  if (words.length === 1) {
    return <span className="block text-center w-full leading-tight font-semibold">{cleaned}</span>;
  }

  if (words.length === 2) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full">
        <span className="block text-center w-full font-semibold">{words[0]}</span>
        <span className="block text-center w-full font-semibold mt-0.5">{words[1]}</span>
      </span>
    );
  }

  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");

  return (
    <span className="flex flex-col items-center justify-center leading-tight text-center w-full">
      <span className="block text-center w-full truncate font-semibold">{line1}</span>
      <span className="block text-center w-full truncate font-semibold mt-0.5">{line2}</span>
    </span>
  );
}

// Carousel Component for Universities using Ant Design built-in arrows
function UniversityCarouselBlock({
  block,
  slidesToShowCount,
  handleSlidePointerDown,
  handleSlidePointerUp,
  handleSlideClick,
}) {
  return (
    <div className="relative px-0 sm:px-1 py-0.5 max-w-6xl mx-auto">
      {/* Ant Design Carousel with built-in arrows */}
      <Carousel
        arrows={true}
        key={slidesToShowCount}
        autoplay={true}
        autoplaySpeed={4000}
        pauseOnHover={true}
        dots={false}
        draggable={false}
        touchMove={true}
        slidesToShow={slidesToShowCount}
        slidesToScroll={1}
        className="w-full relative"
      >
        {block.children.map((child, idx) => (
          <div key={child._id || idx} className="px-1 py-0.5">
            <div
              onPointerDown={handleSlidePointerDown}
              onPointerUp={(e) => handleSlidePointerUp(e, child)}
              onClick={(e) => handleSlideClick(e, child)}
              className="w-full aspect-square bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-200 hover:shadow hover:-translate-y-0.5 group shadow min-w-0"
            >
              <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                <PartnerLogoIcon partner={child} />
              </div>
              <div className="h-6 min-[360px]:h-7 sm:h-8 flex items-center justify-center w-full min-w-0">
                <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight px-0.5 min-w-0 leading-tight line-clamp-2">
                  {formatTwoLineText(child.name)}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export function Category({ categories = [], universities = [], programs = [] }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(null);
  const [modalData, setModalData] = useState({ category: null, children: [], universities: [], courses: [] });

  const [visibleCoursesCount, setVisibleCoursesCount] = useState(8);
  const [slidesToShowCount, setSlidesToShowCount] = useState(4);
  const accentBarColors = ["#EEC471", "#2563eb", "#10b981", "#9333ea", "#102441"];

  const pointerStartRef = useRef({ x: 0, y: 0, time: 0 });
  const hasTriggeredRef = useRef(false);

  const handleSlidePointerDown = (e) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    hasTriggeredRef.current = false;
  };

  const handleSlidePointerUp = (e, child) => {
    const diffX = Math.abs(e.clientX - pointerStartRef.current.x);
    const diffY = Math.abs(e.clientY - pointerStartRef.current.y);
    const duration = Date.now() - pointerStartRef.current.time;
    if (diffX < 12 && diffY < 12 && duration < 600) {
      hasTriggeredRef.current = true;
      handleCardClick(child);
    }
  };

  const handleSlideClick = (e, child) => {
    e.stopPropagation();
    if (!hasTriggeredRef.current) {
      handleCardClick(child);
    }
    setTimeout(() => {
      hasTriggeredRef.current = false;
    }, 150);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w < 640) {
        setSlidesToShowCount(4);
      } else if (w < 768) {
        setSlidesToShowCount(5);
      } else if (w < 1024) {
        setSlidesToShowCount(6);
      } else if (w < 1280) {
        setSlidesToShowCount(8);
      } else {
        setSlidesToShowCount(9);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categoriesList = Array.isArray(categories?.result)
    ? categories.result
    : Array.isArray(categories?.categories)
      ? categories.categories
      : Array.isArray(categories)
        ? categories
        : [];

  // Filter root parent categories (showOnHome === true) - rendered ONLY in top row
  const rootCategories = (categoriesList || [])
    .filter((c) => c.showOnHome === true)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Extract all courses from rootCategories cat.courses (filtered by showOnWebsite: true)
  const categoryCoursesList = (rootCategories || []).flatMap((cat) => cat.courses || []);
  const rawCourses = categoryCoursesList.length > 0
    ? categoryCoursesList
    : (programs || []).filter((p) => p.showOnWebsite === true);

  const allCategoryCourses = rawCourses.map((crs) => ({
    _id: crs._id,
    slug: crs.slug || crs._id,
    name: crs.name,
    label: crs.name,
    itemType: "course",
    isCourse: true,
    logo: crs.logo || crs.universityIds?.[0]?.logo,
  }));

  // Deduplicate course cards by ID / slug
  const topCourseChildren = [];
  const seenCourseKeys = new Set();
  allCategoryCourses.forEach((crs) => {
    if (!crs || !crs.name) return;
    const key = String(crs.slug || crs._id || crs.name).toLowerCase();
    if (!seenCourseKeys.has(key)) {
      seenCourseKeys.add(key);
      topCourseChildren.push(crs);
    }
  });

  // Derive parent blocks dynamically for all featured categories (TRENDING_COURSES, TOP_INDIAN_UNIV, TOP_IIT_IIM, TOP_GLOBAL_UNIV)
  const featuredMap = new Map();

  (categoriesList || []).forEach((c) => {
    const fType = c.featuredType;
    if (!fType || fType === "NONE") return;

    let blockTitle = c.name;
    let blockKey = c._id || c.slug;

    if (fType === "TRENDING_COURSES") {
      blockTitle = c.name || "Top Courses";
      blockKey = "TRENDING_COURSES";
    } else if (fType === "TOP_INDIAN_UNIV") {
      blockTitle = "Top Indian Universities";
      blockKey = "TOP_INDIAN_UNIV";
    } else if (fType === "TOP_IIT_IIM") {
      blockTitle = "Top IITs & IIMs";
      blockKey = "TOP_IIT_IIM";
    } else if (fType === "TOP_GLOBAL_UNIV") {
      blockTitle = "Top Global Universities";
      blockKey = "TOP_GLOBAL_UNIV";
    }

    if (!featuredMap.has(blockKey)) {
      featuredMap.set(blockKey, {
        _id: c._id,
        slug: c.slug,
        title: blockTitle,
        displayOrder: c.displayOrder || 0,
        featuredType: fType,
        isCourseBlock: fType === "TRENDING_COURSES" || c.targetType === "COURSE" || c.slug === "top-courses",
        children: [],
      });
    } else {
      const existing = featuredMap.get(blockKey);
      if (c.displayOrder && c.displayOrder < existing.displayOrder) {
        existing.displayOrder = c.displayOrder;
      }
      if (fType === "TRENDING_COURSES") {
        existing.isCourseBlock = true;
      }
    }

    const currentBlock = featuredMap.get(blockKey);

    // Add universities attached to this category
    const catUnis = c.universities || [];
    catUnis.forEach((u) => {
      const uKey = String(u._id || u.slug);
      if (!currentBlock.children.some((child) => String(child._id || child.slug) === uKey)) {
        currentBlock.children.push({
          ...u,
          logo: u.logoUrl || u.logoSrc || u.logo,
        });
      }
    });

    // Add courses attached to this category
    const catCourses = c.courses || [];
    catCourses.forEach((crs) => {
      const crsKey = String(crs._id || crs.slug);
      if (!currentBlock.children.some((child) => String(child._id || child.slug) === crsKey)) {
        currentBlock.children.push({
          ...crs,
          logo: crs.logo || crs.universityIds?.[0]?.logo,
        });
      }
    });
  });

  const parentBlocks = Array.from(featuredMap.values())
    .filter((b) => b.children && b.children.length > 0)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const parentCategory = activeCategory?.parent
    ? activeCategory.parent
    : activeCategory?.parentId
      ? categoriesList.find((c) => String(c._id) === String(activeCategory.parentId))
      : null;

  const deduplicateItems = (items = []) => {
    const map = new Map();
    (items || []).forEach((item) => {
      if (!item) return;
      const key = String(item._id || item.slug || item.name);
      if (!map.has(key)) {
        map.set(key, item);
      }
    });
    return Array.from(map.values());
  };

  const handleCardClick = (cat) => {
    if (!cat) return;
    const catIdStr = String(cat._id || cat.slug);

    const rawChildren = (cat.children && cat.children.length > 0)
      ? cat.children
      : (categoriesList || []).filter((c) => {
        const pId = c.parentId;
        if (!pId) return false;
        if (Array.isArray(pId)) return pId.some((p) => String(p) === catIdStr || (p?._id && String(p._id) === catIdStr));
        return String(pId) === catIdStr || (pId?._id && String(pId._id) === catIdStr);
      });

    const childrenList = deduplicateItems(rawChildren);

    const catUniversities = deduplicateItems(
      (cat.universities && cat.universities.length > 0) ? cat.universities : []
    );

    // 1. Direct courses attached to category or university (from backend API)
    let directCourses = (cat.courses && cat.courses.length > 0) ? cat.courses : [];

    // Fallback: If clicked card has no courses directly on it, search in categoriesList
    if (directCourses.length === 0) {
      const fullItem = (categoriesList || []).flatMap((c) => [
        c,
        ...(c.universities || []),
        ...(c.children || []),
      ]).find(
        (item) => String(item._id) === catIdStr || (item.slug && String(item.slug) === catIdStr)
      );
      if (fullItem && fullItem.courses && fullItem.courses.length > 0) {
        directCourses = fullItem.courses;
      }
    }

    const catCourses = deduplicateItems(directCourses);

    // If the clicked card is a leaf (has NO children, NO universities, and NO courses),
    // navigate directly to its page instead of opening an empty popup
    if (childrenList.length === 0 && catUniversities.length === 0 && catCourses.length === 0) {
      if (activeCategory) {
        setActiveCategory(null);
      }
      const targetSlug = cat.slug || cat._id;
      if (cat.targetType === "COURSE") {
        router.push(`/courses/${encodeURIComponent(targetSlug)}`);
      } else if (cat.targetType === "UNIVERSITY") {
        router.push(`/universities/${encodeURIComponent(targetSlug)}`);
      } else {
        router.push(`/category/${encodeURIComponent(targetSlug)}`);
      }
      return;
    }

    setActiveCategory(cat);
    setModalData({
      category: cat,
      children: childrenList,
      universities: catUniversities,
      courses: catCourses,
    });
  };

  const handleCloseModal = () => {
    setActiveCategory(null);
  };

  const handleSubcategoryClick = (child) => {
    const childIdStr = String(child._id || child.slug);
    const rawSubChildren = (child.children && child.children.length > 0)
      ? child.children
      : (categoriesList || []).filter((c) => {
        const pId = c.parentId;
        if (!pId) return false;
        if (Array.isArray(pId)) return pId.some((p) => String(p) === childIdStr || (p?._id && String(p._id) === childIdStr));
        return String(pId) === childIdStr || (pId?._id && String(pId._id) === childIdStr);
      });

    if (rawSubChildren.length > 0) {
      handleCardClick(child);
      return;
    }

    // Leaf subcategory: close modal and navigate directly to category page
    handleCloseModal();
    const targetSlug = child.slug || child._id;
    router.push(`/category/${encodeURIComponent(targetSlug)}`);
  };

  return (
    <>
      {/* Ant Design Carousel Built-in Arrow Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .ant-carousel .slick-prev,
        .ant-carousel .slick-next {
          color: #64748b !important;
          z-index: 20;
          width: 24px !important;
          height: 24px !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .ant-carousel .slick-prev:hover,
        .ant-carousel .slick-next:hover {
          color: #2563eb !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .ant-carousel .slick-prev {
          left: -10px !important;
        }
        .ant-carousel .slick-next {
          right: -10px !important;
        }
        .ant-carousel .slick-prev::before,
        .ant-carousel .slick-next::before {
          color: #64748b !important;
          font-size: 16px !important;
          opacity: 0.75 !important;
          transition: all 0.2s;
        }
        .ant-carousel .slick-prev:hover::before,
        .ant-carousel .slick-next:hover::before {
          color: #2563eb !important;
          opacity: 1 !important;
        }
      ` }} />

      {/* ── TOP STATS CARDS SECTION (EXACT ORIGINAL SODE/CLIENT ASPECT-SQUARE CSS) ── */}
      {rootCategories.length > 0 && (
        <section className="py-3 bg-white relative overflow-hidden" suppressHydrationWarning>
          <Container>
            {/* Grid: 4 columns on mobile, auto-fit on desktop for dynamic width */}
            <div className="grid grid-cols-4 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1.5 sm:gap-2.5 w-full mx-auto md:px-8 items-stretch" suppressHydrationWarning>
              {rootCategories.map((item) => (
                <div
                  key={item._id || item.slug}
                  onClick={() => handleCardClick(item)}
                  className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-1 min-[360px]:p-1.5 sm:p-2.5 aspect-square flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 shadow-2xs w-full"
                >
                  <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                    <CategoryIcon cat={item} />
                  </div>
                  <div className="h-6 min-[360px]:h-7 sm:h-8 flex items-center justify-center w-full min-w-0 px-0.5">
                    <h5 className="text-[10px] min-[360px]:text-[11px] sm:text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors text-center w-full tracking-normal min-w-0 leading-tight antialiased">
                      {formatTwoLineText(item.label || item.name)}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── FEATURED CAROUSELS (TOP COURSES, TOP INDIAN UNIV, TOP IITs & IIMs, TOP GLOBAL UNIV) ── */}
      {parentBlocks.length > 0 && (
        <section className="pb-6 bg-white relative overflow-hidden" suppressHydrationWarning>
          <Container>
            <div className="max-w-6xl mx-auto space-y-6 text-left">
              {parentBlocks.map((block, bIdx) => {
                const accentColor = accentBarColors[bIdx % accentBarColors.length];

                return (
                  <div
                    key={block._id || block.slug || bIdx}
                    className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-2xs hover:shadow-xs transition-all duration-200 max-w-6xl mx-auto"
                  >
                    {/* Section Title Header with Colored Accent Bar */}
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <div className="flex items-center gap-2.5 truncate">
                        <span
                          className="w-1.5 h-5 rounded-full inline-block shrink-0"
                          style={{ backgroundColor: accentColor }}
                        />
                        <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight truncate">
                          {block.title}
                        </h3>
                      </div>

                      {/* Show More / Show Less buttons */}
                      {(block.isCourseBlock || block.slug === "top-courses" || block.featuredType === "TRENDING_COURSES") &&
                        block.children &&
                        block.children.length > 8 && (
                          <div className="flex items-center gap-3 shrink-0">
                            {visibleCoursesCount > 8 && (
                              <button
                                type="button"
                                onClick={() => setVisibleCoursesCount(8)}
                                className="text-xs font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1 transition-colors group cursor-pointer bg-transparent border-0 p-0"
                              >
                                <span>Show Less</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2.5}
                                  stroke="currentColor"
                                  className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                </svg>
                              </button>
                            )}

                            {visibleCoursesCount < block.children.length && (
                              <button
                                type="button"
                                onClick={() => setVisibleCoursesCount((prev) => prev + 8)}
                                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors group cursor-pointer bg-transparent border-0 p-0"
                              >
                                <span>Show More</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2.5}
                                  stroke="currentColor"
                                  className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                              </button>
                            )}
                          </div>
                        )}
                    </div>

                    {/* Content: 4-Column Grid for Courses vs. Carousel for Universities */}
                    {block.isCourseBlock || block.slug === "top-courses" || block.featuredType === "TRENDING_COURSES" ? (
                      <div className="grid grid-cols-4 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1.5 sm:gap-2.5 w-full mx-auto items-stretch">
                        {block.children.slice(0, visibleCoursesCount).map((child, idx) => (
                          <div
                            key={child._id || idx}
                            onClick={() => {
                              router.push(`/courses/${encodeURIComponent(child.slug || child._id)}`);
                            }}
                            className="w-full aspect-square bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group shadow-2xs min-w-0"
                          >
                            <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                              <CourseIcon course={child} />
                            </div>
                            <div className="h-6 min-[360px]:h-7 sm:h-8 flex items-center justify-center w-full min-w-0">
                              <h5 className="text-[10px] min-[360px]:text-[11px] sm:text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight px-0.5 min-w-0 leading-tight uppercase">
                                {formatTwoLineText(child.name)}
                              </h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <UniversityCarouselBlock
                        block={block}
                        slidesToShowCount={slidesToShowCount}
                        handleSlidePointerDown={handleSlidePointerDown}
                        handleSlidePointerUp={handleSlidePointerUp}
                        handleSlideClick={handleSlideClick}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ── ANTD MODAL POPUP FOR SELECTED CATEGORY / UNIVERSITY ── */}
      <Modal
        open={Boolean(activeCategory)}
        onCancel={handleCloseModal}
        footer={null}
        centered
        closable={false}
        mask={{ closable: false }}
        keyboard={false}
        destroyOnHidden
        width={620}
        styles={{
          content: {
            padding: "16px",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
          },
          body: {
            padding: 0,
          },
        }}
      >
        {activeCategory && (
          <div className="flex flex-col text-left min-h-0">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5 shrink-0 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {parentCategory && (
                  <button
                    type="button"
                    onClick={() => handleCardClick(parentCategory)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0 border-0"
                    title={`Back to ${parentCategory.name}`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 p-1.5 shadow-xs">
                  <CategoryIcon cat={activeCategory} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight tracking-tight truncate">
                    {activeCategory.label || activeCategory.name}
                  </h3>
                  {activeCategory.title && activeCategory.title.toLowerCase() !== (activeCategory.label || activeCategory.name || "").toLowerCase() ? (
                    <span className="text-xs text-gray-600 font-medium block mt-0.5 truncate">
                      {activeCategory.title}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 block mt-0.5 truncate">
                      Online Programs & Degrees
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer border-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body - 3 Cards Mobile / 5 Cards Desktop Grid Layout */}
            <div className="flex-1 overflow-y-auto max-h-[64vh] overscroll-contain pr-1 space-y-4 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
              {((modalData.children && modalData.children.length > 0) ||
                (modalData.universities && modalData.universities.length > 0) ||
                (modalData.courses && modalData.courses.length > 0)) ? (
                <div className="space-y-4 p-0.5">
                  {/* Priority 1: If category has SUBCATEGORIES (children), show ONLY subcategories */}
                  {modalData.children && modalData.children.length > 0 ? (
                    <div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                        {modalData.children.map((child, idx) => (
                          <div
                            key={`${child._id || child.slug || idx}-${idx}`}
                            onClick={() => handleSubcategoryClick(child)}
                            className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 aspect-square flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 shadow-2xs"
                          >
                            <div className="mb-1 sm:mb-1.5 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                              <CategoryIcon cat={child} />
                            </div>
                            <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight px-0.5 min-w-0">
                              {formatTwoLineText(child.name)}
                            </h5>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : modalData.universities && modalData.universities.length > 0 ? (
                    /* Priority 2: UNIVERSITIES SECTION */
                    <div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                        {modalData.universities.map((uni, idx) => {
                          const name = uni.name || uni.title;
                          const slug = uni.slug || uni._id;
                          return (
                            <Link
                              key={`${uni._id || slug || idx}-${idx}`}
                              href={`/universities/${encodeURIComponent(slug)}`}
                              onClick={handleCloseModal}
                              className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 aspect-square flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 shadow-2xs"
                            >
                              <div className="mb-1 sm:mb-1.5 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0 h-10 sm:h-12 w-full">
                                <PartnerLogoIcon partner={uni} />
                              </div>
                              <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight px-0.5 min-w-0">
                                {formatTwoLineText(name)}
                              </h5>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : modalData.courses && modalData.courses.length > 0 ? (
                    /* Priority 3: COURSES SECTION */
                    <div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                        {modalData.courses.map((course, idx) => {
                          const name = course.name || course.title;
                          const slug = course.slug || course._id;
                          return (
                            <Link
                              key={`${course._id || slug || idx}-${course.courseId || ''}-${idx}`}
                              href={`/courses/${encodeURIComponent(slug)}`}
                              onClick={handleCloseModal}
                              className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 aspect-square flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 shadow-2xs"
                            >
                              <div className="mb-1 sm:mb-1.5 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                                <CourseIcon course={course} />
                              </div>
                              <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-medium text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight px-0.5 min-w-0 uppercase">
                                {formatTwoLineText(name)}
                              </h5>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl text-center flex flex-col items-center justify-center space-y-2 my-3">
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    🎓 No subcategories or programs available right now for {activeCategory.name}.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}