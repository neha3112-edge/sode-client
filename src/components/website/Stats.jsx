"use client";

import { Container } from "@/components/ui/container";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAssetPath } from "@/lib/utils";
import { Card, Modal, Tooltip } from "antd";
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
      <Image
        src={iconUrl}
        alt={cat.name || cat.label || "Category"}
        width={28}
        height={28}
        unoptimized
        className="w-7 h-7 object-contain"
        onError={() => setImgError(true)}
      />
    );
  }

  return renderSvgFallback();
}

// Helper component to render circular avatar with image or gold wreath SVG fallback
function SmartLogoAvatar({ logoUrl, altName }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = getAssetPath(logoUrl, null);

  if (iconUrl && !imgError) {
    return (
      <img
        src={iconUrl}
        alt={altName || "Logo"}
        className="w-full h-full object-contain p-1"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-[#c59b43]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84a50.58 50.58 0 0 0-2.657.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M12 13.489v3.692m-5.462-6.52c.074-.5.194-.997.358-1.487m10.208 1.487a12.096 12.096 0 0 1-.358-1.487" />
    </svg>
  );
}

export function Stats({ categories = [] }) {
  const router = useRouter();
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

  const parentCategory = activeCategory?.parent
    ? activeCategory.parent
    : activeCategory?.parentId
      ? categories.find((c) => String(c._id) === String(activeCategory.parentId))
      : null;

  const handleCategoryClick = (cat) => {
    const subchildren = (categories || []).filter(
      (c) => c.parentId && String(c.parentId) === String(cat._id)
    );

    const hasSubchildren = (cat.children && cat.children.length > 0) || subchildren.length > 0;

    if (hasSubchildren || !activeCategory) {
      setActiveCategory(cat);
      setIsModalClosing(false);
      setModalData({
        category: cat,
        children: (cat.children && cat.children.length > 0) ? cat.children : subchildren,
        courses: cat.courses || [],
        universities: cat.universities || [],
      });
    } else {
      // If leaf category clicked inside modal, instantly navigate to courses page
      if (activeCategory) handleCloseModal();
      router.push(`/courses?category=${encodeURIComponent(cat.slug || cat.name || cat.label)}`);
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

        @keyframes fadeOut {
          from { opacity: 1; backdrop-filter: blur(4px); }
          to { opacity: 0; backdrop-filter: blur(0px); }
        }
        .animate-fade-out {
          animation: fadeOut 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes customScaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-custom-scale-up {
          animation: customScaleUp 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes customScaleDownExit {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.95) translateY(12px); }
        }
        .animate-custom-scale-down-exit {
          animation: customScaleDownExit 0.28s cubic-bezier(0.32, 0.94, 0.6, 1) forwards;
        }
      ` }} />

      {/* ── ROOT CATEGORIES ROW SECTION (TOP CATEGORY CARDS) ── */}
      {rootCategories.length > 0 && (
        <section className="py-3 bg-slate-50/60 relative overflow-hidden">
          <Container>
            <div
              className="rounded-2xl bg-white overflow-hidden"
            >
              {/* Flex Row of Root Category Items (Single Line) */}
              <div className="flex items-center p-3 justify-between sm:justify-around overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden gap-2 sm:gap-4">
                {rootCategories.map((cat) => (
                  <div
                    key={cat._id || cat.slug}
                    onClick={() => handleCategoryClick(cat)}
                    className="p-2 sm:p-3 rounded-xl text-center hover:bg-slate-50 transition-all duration-200 cursor-pointer group flex flex-col items-center justify-center flex-1 min-w-[100px] sm:min-w-[120px] shrink-0"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform shrink-0">
                      <CategoryIcon cat={cat} isActive={false} />
                    </div>
                    <div className="w-full text-center">
                      <h5 className="text-xs sm:text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                        {cat.label || cat.name}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* ── POPUP DIV OVERLAY MODAL FOR SELECTED CATEGORY (DARK NAVY THEME) ── */}
      {activeCategory !== null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur Layer */}
          <div
            onClick={handleCloseModal}
            className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md ${isModalClosing ? "animate-fade-out" : "animate-fade-in"}`}
          />

          {/* Modal Container */}
          <div
            className={`relative w-full max-w-[680px] bg-[#0e213b] border border-[#1e385c] text-white rounded-[24px] shadow-2xl p-6 sm:p-7 z-10 max-h-[88vh] flex flex-col ${isModalClosing ? "animate-custom-scale-down-exit" : "animate-custom-scale-up"
              }`}
          >
            {activeCategory && (
              <div className="flex flex-col text-left min-h-0 flex-1">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-[#1c365d] pb-4 mb-5 shrink-0 gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {parentCategory && (
                      <button
                        onClick={() => handleCategoryClick(parentCategory)}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/10 active:scale-95 shrink-0"
                        title={`Back to ${parentCategory.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                      </button>
                    )}
                    <div className="w-12 h-12 rounded-full bg-[#162e4d] border border-[#EEC471]/40 flex items-center justify-center text-[#EEC471] shrink-0 p-2 shadow-inner">
                      <CategoryIcon cat={activeCategory} isActive={true} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-tight tracking-tight truncate">
                        {activeCategory.label || activeCategory.name}
                      </h3>
                      {activeCategory.title && activeCategory.title.toLowerCase() !== (activeCategory.label || activeCategory.name || "").toLowerCase() ? (
                        <span className="text-xs text-[#EEC471] font-semibold block mt-0.5 truncate">
                          {activeCategory.title}
                        </span>
                      ) : (
                        <span className="text-xs text-[#EEC471] font-semibold block mt-0.5 truncate">
                          Online Doctoral Programs (DBA)
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleCloseModal}
                    className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Modal Body - Render Available Sections (Subcategories, Universities, Courses) */}
                <div className="flex-1 overflow-y-auto max-h-[64vh] overscroll-contain pr-1.5 space-y-6 [scrollbar-width:thin] [scrollbar-color:#213f68_transparent]">
                  {((modalData.children && modalData.children.length > 0) ||
                    (modalData.universities && modalData.universities.length > 0) ||
                    (modalData.courses && modalData.courses.length > 0)) ? (
                    <div className="space-y-6 p-1">
                      {/* 1. SUBCATEGORIES SECTION */}
                      {modalData.children && modalData.children.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-[#EEC471] uppercase tracking-wider mb-3.5 block">
                            Subcategories
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
                            {modalData.children.map((child) => {
                              const childName = child.name || child.label;
                              return (
                                <div
                                  key={child._id || child.slug}
                                  onClick={() => handleCategoryClick(child)}
                                  className="bg-[#162e4e] hover:bg-[#1a375d] border border-[#213e66] hover:border-[#EEC471]/50 p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-lg active:scale-95"
                                >
                                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white p-3 flex items-center justify-center overflow-hidden mb-3.5 shadow-md group-hover:scale-105 transition-transform shrink-0 relative">
                                    <SmartLogoAvatar
                                      logoUrl={child.logoUrl || child.logoSrc || child.logo || child.imageSrc || child.image}
                                      altName={childName}
                                    />
                                  </div>
                                  <Tooltip title={childName} placement="top">
                                    <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#EEC471] transition-colors leading-tight text-center truncate max-w-full">
                                      {childName}
                                    </h5>
                                  </Tooltip>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 2. UNIVERSITIES SECTION */}
                      {modalData.universities && modalData.universities.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-[#EEC471] uppercase tracking-wider mb-3.5 block">
                            Partner Universities
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
                            {modalData.universities.map((uni) => {
                              const uniName = uni.university?.name || uni.name || "Partner University";
                              const rawLogo = uni.university?.logoSrc?.url || uni.logoSrc?.url || uni.logoUrl || uni.logo;
                              return (
                                <Link
                                  key={uni._id}
                                  href={`/courses?category=${activeCategory.slug}&university=${encodeURIComponent(uniName)}`}
                                  onClick={handleCloseModal}
                                  className="bg-[#162e4e] hover:bg-[#1a375d] border border-[#213e66] hover:border-[#EEC471]/50 p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-lg active:scale-95"
                                >
                                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white p-3 flex items-center justify-center overflow-hidden mb-3.5 shadow-md group-hover:scale-105 transition-transform shrink-0 relative">
                                    <SmartLogoAvatar logoUrl={rawLogo} altName={uniName} />
                                  </div>
                                  <Tooltip title={uniName} placement="top">
                                    <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#EEC471] transition-colors leading-tight text-center truncate max-w-full">
                                      {uniName}
                                    </h5>
                                  </Tooltip>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 3. COURSES SECTION */}
                      {modalData.courses && modalData.courses.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold text-[#EEC471] uppercase tracking-wider mb-3.5 block">
                            Available Programs
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
                            {modalData.courses.map((program) => {
                              const courseTitle = program.title || program.name || "Program";
                              const rawLogo = program.university?.logoSrc?.url || program.logoSrc?.url || program.image?.url;
                              return (
                                <Link
                                  key={program._id || program.slug}
                                  href={`/courses?category=${activeCategory.slug}&search=${encodeURIComponent(program.title)}`}
                                  onClick={handleCloseModal}
                                  className="bg-[#162e4e] hover:bg-[#1a375d] border border-[#213e66] hover:border-[#EEC471]/50 p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-lg active:scale-95"
                                >
                                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white p-3 flex items-center justify-center overflow-hidden mb-3.5 shadow-md group-hover:scale-105 transition-transform shrink-0 relative">
                                    <SmartLogoAvatar logoUrl={rawLogo} altName={courseTitle} />
                                  </div>
                                  <Tooltip title={courseTitle} placement="top">
                                    <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#EEC471] transition-colors leading-tight text-center truncate max-w-full">
                                      {courseTitle}
                                    </h5>
                                  </Tooltip>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* EMPTY STATE */
                    <div className="bg-[#162e4e] border border-[#213e66] p-8 rounded-2xl text-center flex flex-col items-center justify-center space-y-3 my-4">
                      <p className="text-xs sm:text-sm text-white/80 font-medium">
                        🎓 No subcategories or courses found for {activeCategory.name || activeCategory.label}.
                      </p>
                      <Link
                        href={`/courses?category=${activeCategory.slug || ""}`}
                        onClick={handleCloseModal}
                        className="inline-flex items-center gap-2 bg-[#EEC471] text-[#0e213b] font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-[#e0b55c] transition-all shadow-md"
                      >
                        Browse All Courses &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Stats;