"use client";

import { Container } from "@/components/ui/container";
import React, { useState } from "react";
import { getAssetPath } from "@/lib/utils";
import { Tooltip } from "antd";
import { getWebsiteCategoryBySlug, getWebsiteCoursesFilter, getUniversities } from "@/services/api";

// Helper component to safely render category logo image or vector SVG fallback
function CategoryIcon({ cat, isActive }) {
  const [imgError, setImgError] = useState(false);

  let rawUrl = null;
  if (cat) {
    rawUrl = cat.logoUrl || cat.logoSrc || cat.logo || cat.imageSrc || cat.image;
  }
  const iconUrl = getAssetPath(rawUrl, null);

  const slug = (cat?.slug || cat?.name || "").toLowerCase();
  const color = isActive ? "text-[#EEC471]" : "text-blue-600";

  const renderSvgFallback = () => {
    if (slug.includes("doc") || slug.includes("phd") || slug.includes("dba")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${color}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84a50.58 50.58 0 0 0-2.657.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M12 13.489v3.692m-5.462-6.52c.074-.5.194-.997.358-1.487m10.208 1.487a12.096 12.096 0 0 1-.358-1.487" />
        </svg>
      );
    }

    if (slug.includes("certif")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${color}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      );
    }

    if (slug.includes("exec")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${color}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387M3.75 14.15a2.18 2.18 0 0 1-.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m4.5 8.006h4.5m-4.5 0A2.25 2.25 0 0 1 10.5 16.5v-3a2.25 2.25 0 0 1 2.25-2.25h1.5A2.25 2.25 0 0 1 16.5 13.5v3a2.25 2.25 0 0 1-2.25 2.25m-4.5 0h4.5" />
        </svg>
      );
    }

    if (slug.includes("master") || slug.includes("mba")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${color}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      );
    }

    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${color}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    );
  };

  if (iconUrl && !imgError) {
    return (
      <img
        src={iconUrl}
        alt={cat.name || cat.label || "Category"}
        className="w-7 h-7 object-contain"
        onError={() => setImgError(true)}
      />
    );
  }

  return renderSvgFallback();
}

export function Stats({ categories = [] }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [modalData, setModalData] = useState({ category: null, children: [], courses: [], universities: [] });

  // Filter ONLY root categories (Categories that do NOT have a parentId)
  const rootCategories = (categories || []).filter((cat) => {
    if (cat.parentId) return false;
    const slug = (cat.slug || "").toLowerCase();
    if (slug === "all") return false;
    if (slug.includes("top-iim") || slug.includes("top-iit")) return false;
    return true;
  });

  const handleCategoryClick = async (cat) => {
    setActiveCategory(cat);
    setIsLoadingModal(true);
    setIsModalClosing(false);
    setModalData({ category: cat, children: [], courses: [], universities: [] });

    try {
      // 1. Fetch category read (category + subcategories/children) from API
      const catRes = await getWebsiteCategoryBySlug(cat.slug);
      // 2. Fetch courses mapped to this category from API
      const coursesRes = await getWebsiteCoursesFilter({ category: cat.slug, limit: 20 });
      // 3. Fetch universities mapped to this category from API
      const unisRes = await getUniversities({ category: cat.slug, limit: 10 });

      setModalData({
        category: catRes?.category || cat,
        children: catRes?.children || [],
        courses: coursesRes?.programs || [],
        universities: Array.isArray(unisRes) ? unisRes : [],
      });
    } catch (err) {
      console.error("❌ Error fetching category data for modal:", err);
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setActiveCategory(null);
      setIsModalClosing(false);
    }, 380);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(4px); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes customScaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-custom-scale-up {
          animation: customScaleUp 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      ` }} />

      {/* ── ROOT CATEGORIES ROW (CATEGORIES WITHOUT PARENT) ── */}
      {rootCategories.length > 0 && (
        <section className="w-full bg-white border-b border-slate-100 py-6 select-none relative z-10">
          <Container>
            <div className="flex items-center justify-start md:justify-center gap-4 md:gap-8 overflow-x-auto pb-2 md:pb-0 scrollbar-none px-4">
              {rootCategories.map((cat) => {
                const catId = String(cat._id || cat.slug);
                const isActive = activeCategory && String(activeCategory._id || activeCategory.slug) === catId;

                return (
                  <button
                    key={catId}
                    onClick={() => handleCategoryClick(cat)}
                    className={`flex flex-col items-center text-center group min-w-28 sm:min-w-32 cursor-pointer focus:outline-none transition-all duration-200 ${
                      isActive ? "scale-[1.02]" : "hover:scale-[1.01]"
                    }`}
                  >
                    {/* Circle Icon Wrapper */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 transition-all duration-300 shadow-2xs overflow-hidden ${
                        isActive
                          ? "bg-[#102441] border-[#EEC471] scale-105"
                          : "bg-slate-50 border-slate-200 group-hover:border-slate-300"
                      }`}
                    >
                      <CategoryIcon cat={cat} isActive={isActive} />
                    </div>

                    {/* Category Label */}
                    <span
                      className={`text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                        isActive ? "text-[#102441] text-[13px]" : "text-slate-800"
                      }`}
                    >
                      {cat.label || cat.name}
                    </span>

                    {/* Subtitle / Type */}
                    <span className="text-[10px] text-slate-400 mt-0.5 whitespace-nowrap truncate max-w-28">
                      {cat.title || cat.description || "Executive Program"}
                    </span>
                  </button>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ── CENTERED POPUP MODAL FOR SELECTED CATEGORY (CLEAN CIRCULAR LOGO + TITLE ONLY) ── */}
      {activeCategory && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <div
            onClick={handleCloseModal}
            className={`absolute inset-0 bg-slate-950/75 backdrop-blur-xs ${isModalClosing ? "animate-fade-out" : "animate-fade-in"}`}
          />

          {/* Modal Container */}
          <div className={`relative w-full max-w-2xl bg-[#102441] border border-white/10 text-white rounded-2xl shadow-2xl p-4 sm:p-6 z-10 max-h-[85vh] overflow-hidden text-left flex flex-col ${isModalClosing ? "animate-custom-scale-down-exit" : "animate-custom-scale-up"}`}>
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#EEC471] border border-[#EEC471]/30 shrink-0">
                  <CategoryIcon cat={activeCategory} isActive={true} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                    {activeCategory.label || activeCategory.name}
                  </h3>
                  {activeCategory.title && activeCategory.title.toLowerCase() !== (activeCategory.label || activeCategory.name || "").toLowerCase() && (
                    <span className="text-[10px] sm:text-xs text-[#EEC471] font-semibold block mt-0.5">
                      {activeCategory.title}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-white/60 hover:text-white cursor-pointer focus:outline-none transition-colors p-1.5 rounded-full hover:bg-white/5"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body - Clean Grid of Circular Logo + Title Name Only */}
            <div className="flex-1 overflow-y-auto pr-1">
              {isLoadingModal ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-4">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="flex flex-col items-center text-center animate-pulse space-y-2">
                      <div className="w-16 h-16 rounded-full bg-white/10 shrink-0" />
                      <div className="h-3 bg-white/15 rounded w-3/4" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* SUBCATEGORIES / UNIVERSITIES / COURSES IN CIRCULAR GRID */}
                  {((modalData.children && modalData.children.length > 0) ||
                    (modalData.universities && modalData.universities.length > 0) ||
                    (modalData.courses && modalData.courses.length > 0)) ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 p-2 sm:p-4">
                      {/* 1. MAPPED SUBCATEGORIES */}
                      {modalData.children?.map((child) => {
                        const childName = child.name || child.label;
                        return (
                          <a
                            key={child._id || child.slug}
                            href={`/courses?category=${child.slug || activeCategory.slug}`}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-200 group cursor-pointer shadow-xs hover:shadow-md active:scale-95"
                          >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-3 flex items-center justify-center overflow-hidden mb-3 shadow-md group-hover:scale-105 transition-transform shrink-0">
                              <CategoryIcon cat={child} isActive={false} />
                            </div>
                            <Tooltip title={childName} placement="top">
                              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#EEC471] transition-colors leading-tight text-center truncate max-w-full">
                                {childName}
                              </h5>
                            </Tooltip>
                          </a>
                        );
                      })}

                      {/* 2. MAPPED UNIVERSITIES */}
                      {modalData.universities?.map((uni) => {
                        const uniName = uni.university?.name || uni.name || "Partner University";
                        const logoUrl = getAssetPath(uni.university?.logoSrc?.url || uni.logoSrc?.url, "/assets/images/iim-logo.jpg");
                        return (
                          <a
                            key={uni._id}
                            href={`/courses?category=${activeCategory.slug}&university=${encodeURIComponent(uniName)}`}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-200 group cursor-pointer shadow-xs hover:shadow-md active:scale-95"
                          >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-3 flex items-center justify-center overflow-hidden mb-3 shadow-md group-hover:scale-105 transition-transform shrink-0">
                              <img src={logoUrl} alt={uniName} className="w-full h-full object-contain" />
                            </div>
                            <Tooltip title={uniName} placement="top">
                              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#EEC471] transition-colors leading-tight text-center truncate max-w-full">
                                {uniName}
                              </h5>
                            </Tooltip>
                          </a>
                        );
                      })}

                      {/* 3. MAPPED COURSES */}
                      {modalData.courses?.map((program) => {
                        const courseTitle = program.university?.name || program.title;
                        const logoUrl = getAssetPath(program.university?.logoSrc?.url || program.logoSrc?.url || program.image?.url, "/assets/images/iim-logo.jpg");
                        return (
                          <a
                            key={program._id || program.slug}
                            href={`/courses?category=${activeCategory.slug}&search=${encodeURIComponent(program.title)}`}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-200 group cursor-pointer shadow-xs hover:shadow-md active:scale-95"
                          >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-3 flex items-center justify-center overflow-hidden mb-3 shadow-md group-hover:scale-105 transition-transform shrink-0">
                              <img src={logoUrl} alt={courseTitle} className="w-full h-full object-contain" />
                            </div>
                            <Tooltip title={courseTitle} placement="top">
                              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#EEC471] transition-colors leading-tight text-center truncate max-w-full">
                                {courseTitle}
                              </h5>
                            </Tooltip>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center text-xs text-white/70">
                      🎓 No programs available right now for {activeCategory.name || activeCategory.label}.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Stats;