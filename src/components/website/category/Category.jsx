"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/common/Container";
import SearchBar from "./SearchBar";
import { CategoryIcon, getItemSlug } from "./CategoryIcons";
import AiTools from "./AiTools";
import CategorySection from "./CategorySection";
import CategoryModal from "./CategoryModal";

export function Category({ categories = [], universities = [], programs = [] }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(null);
  const [modalData, setModalData] = useState({ category: null, children: [], universities: [], courses: [] });
  const [visibleCounts, setVisibleCounts] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [slidesToShowCount, setSlidesToShowCount] = useState(4);

  const isDraggingRef = useRef(false);
  const pointerStartPosRef = useRef({ x: 0, y: 0 });

  const handleSlidePointerDown = (e) => {
    isDraggingRef.current = false;
    pointerStartPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleSlidePointerMove = (e) => {
    const diffX = Math.abs(e.clientX - (pointerStartPosRef.current.x || 0));
    const diffY = Math.abs(e.clientY - (pointerStartPosRef.current.y || 0));
    if (diffX > 8 || diffY > 8) {
      isDraggingRef.current = true;
    }
  };

  const handleSlideClick = (e, child) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      return;
    }
    handleCardClick(child);
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

  // Top Row Categories (showOnHome === true)
  const rootCategories = Array.isArray(categories?.topCategories) && categories.topCategories.length > 0
    ? categories.topCategories
    : categoriesList
      .filter((c) => c && c.showOnHome === true)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Dynamic Section Blocks (Top Courses, Top IITs & IIMs, Domestic, Global, Tools, etc.)
  const parentBlocks = Array.isArray(categories?.sections) && categories.sections.length > 0
    ? categories.sections
      .filter((s) => s.items && s.items.length > 0)
      .map((s) => ({
        _id: s._id,
        slug: s.slug,
        title: s.title,
        displayOrder: s.displayOrder || 0,
        featuredType: s.featuredType,
        isCourseBlock: s.sectionType === "COURSES",
        children: s.items,
      }))
    : categoriesList
      .filter((c) => c && c.featuredType && c.featuredType !== "NONE")
      .map((c) => {
        const children = (c.universities && c.universities.length > 0)
          ? c.universities
          : (c.courses && c.courses.length > 0)
            ? c.courses
            : (c.children || []);

        return {
          _id: c._id,
          slug: c.slug,
          title: c.name || c.title,
          displayOrder: c.displayOrder || 0,
          featuredType: c.featuredType,
          isCourseBlock: Boolean(c.courses && c.courses.length > 0 && (!c.universities || c.universities.length === 0)),
          children,
        };
      })
      .filter((b) => b.children.length > 0)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  // Extract all distinct courses & universities for instant search autocomplete
  const allCourses = useMemo(() => {
    const courseMap = new Map();
    (parentBlocks || []).forEach((b) => {
      (b.children || []).forEach((c) => {
        if (c && c.name && (b.isCourseBlock || c.isCourse) && !courseMap.has(c.name.toLowerCase())) {
          courseMap.set(c.name.toLowerCase(), c);
        }
      });
    });
    return Array.from(courseMap.values());
  }, [parentBlocks]);

  const allUniversities = useMemo(() => {
    const uniMap = new Map();
    (universities || []).forEach((u) => {
      if (u && u.name && !uniMap.has(u.name.toLowerCase())) {
        uniMap.set(u.name.toLowerCase(), u);
      }
    });
    (parentBlocks || []).forEach((b) => {
      (b.children || []).forEach((u) => {
        if (u && u.name && (!b.isCourseBlock || u.isUniversity) && !uniMap.has(u.name.toLowerCase())) {
          uniMap.set(u.name.toLowerCase(), u);
        }
      });
    });
    return Array.from(uniMap.values());
  }, [universities, parentBlocks]);

  const handleCardClick = (item) => {
    if (!item) return;

    // 1. If University Card is clicked -> Open Modal with its Offered Courses
    if (item.isUniversity === true || item.itemType === "university") {
      setModalData({
        category: item,
        isUniversity: true,
        isUniversitiesModal: false,
        items: item.courses || [],
      });
      setActiveCategory(item);
      return;
    }

    // 2. If Category has Sub-Categories (children or items)
    const subItems = (item.children && item.children.length > 0)
      ? item.children
      : (item.items && item.items.length > 0)
        ? item.items
        : [];

    if (subItems.length > 0) {
      setModalData({
        category: item,
        isUniversity: false,
        isUniversitiesModal: item.modalType === "UNIVERSITIES" || (item.universities && item.universities.length > 0),
        items: subItems,
      });
      setActiveCategory(item);
      return;
    }

    // 3. If Category has Universities
    if (Array.isArray(item.universities) && item.universities.length > 0) {
      setModalData({
        category: item,
        isUniversity: false,
        isUniversitiesModal: true,
        items: item.universities,
      });
      setActiveCategory(item);
      return;
    }

    // 4. Fallback Direct Route Navigation
    if (activeCategory) {
      setActiveCategory(null);
    }
    if (item.targetUrl && !/[0-9a-fA-F]{24}/.test(item.targetUrl)) {
      router.push(item.targetUrl);
    } else {
      const targetSlug = getItemSlug(item);
      if (item.isUniversity === true || item.itemType === "university") {
        router.push(`/courses?university=${encodeURIComponent(targetSlug)}`);
      } else if (item.itemType === "course" || item.targetType === "COURSE") {
        router.push(`/courses?course=${encodeURIComponent(targetSlug)}`);
      } else {
        router.push(`/courses?category=${encodeURIComponent(targetSlug)}`);
      }
    }
  };

  const handleCloseModal = () => {
    setActiveCategory(null);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .ant-carousel .slick-slider {
          min-height: 80px;
        }
        .ant-carousel .slick-prev,
        .ant-carousel .slick-next {
          color: #6b7280 !important;
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
          color: #3b82f6 !important;
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
          color: #6b7280 !important;
          font-size: 16px !important;
          opacity: 0.75 !important;
          transition: all 0.2s;
        }
        .ant-carousel .slick-prev:hover::before,
        .ant-carousel .slick-next:hover::before {
          color: #3b82f6 !important;
          opacity: 1 !important;
        }
        .ant-carousel .slick-slide {
          cursor: pointer !important;
        }
        .ant-carousel .slick-slide > div {
          cursor: pointer !important;
        }
        .ant-carousel .slick-list {
          overflow: hidden !important;
        }
      ` }} />

      {/* ── 🔍 HERO FLOATING SEARCH BAR ── */}
      <SearchBar
        allCourses={allCourses}
        allUniversities={allUniversities}
        allCategories={categoriesList}
      />

      {/* ── TOP STATS CARDS SECTION ── */}
      {rootCategories.length > 0 && (
        <section className="py-3 bg-white relative overflow-hidden" suppressHydrationWarning>
          <Container>
            <div className="grid grid-cols-4 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1.5 sm:gap-2.5 w-full mx-auto items-stretch" suppressHydrationWarning>
              {rootCategories.map((item) => (
                <div
                  key={item._id || item.slug}
                  onClick={() => handleCardClick(item)}
                  className="w-full aspect-square bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 hover:border-amber-400 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2 sm:p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-200 group min-w-0"
                >
                  <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                    <CategoryIcon category={item} />
                  </div>
                  <div className="h-6 min-[360px]:h-7 sm:h-8 flex items-center justify-center w-full min-w-0">
                    <span className="line-clamp-2 text-center leading-tight uppercase font-semibold text-[10px] min-[360px]:text-[11px] sm:text-xs text-slate-700 group-hover:text-amber-700 transition-colors w-full px-0.5">
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── FEATURED CAROUSELS & AI TOOLS SECTIONS ── */}
      {parentBlocks.length > 0 &&
        parentBlocks.map((block, bIdx) => {
          const isToolsBlock =
            block.featuredType === "TOOLS" ||
            (block.title && block.title.toLowerCase().includes("tool"));

          if (isToolsBlock) {
            return (
              <AiTools
                key={block._id || block.slug || bIdx}
                block={block}
                bIdx={bIdx}
              />
            );
          }

          return (
            <CategorySection
              key={String(block._id || block.slug || bIdx)}
              block={block}
              bIdx={bIdx}
              slidesToShowCount={slidesToShowCount}
              visibleCounts={visibleCounts}
              setVisibleCounts={setVisibleCounts}
              expandedSections={expandedSections}
              setExpandedSections={setExpandedSections}
              handleCardClick={handleCardClick}
              handleSlidePointerDown={handleSlidePointerDown}
              handleSlidePointerMove={handleSlidePointerMove}
              handleSlideClick={handleSlideClick}
              router={router}
            />
          );
        })}

      {/* ── MODAL POPUP FOR SELECTED CATEGORY / UNIVERSITY ── */}
      <CategoryModal
        activeCategory={activeCategory}
        modalData={modalData}
        onClose={handleCloseModal}
        router={router}
      />
    </>
  );
}

export default Category;
