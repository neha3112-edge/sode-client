"use client";

import { Container } from "@/components/ui/container";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAssetPath } from "@/lib/utils";
import { Tooltip } from "antd";
import { ArrowLeft, X } from "lucide-react";
import { getWebsiteCategories } from "@/services/api";

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
      <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
        <Image
          src={iconUrl}
          alt={cat.name || cat.label || "Category"}
          fill
          sizes="24px"
          unoptimized
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-[10px]">
      {(cat?.name || "C").charAt(0)}
    </div>
  );
}

// Helper function to format multi-word card titles into 2 stacked lines (uppr / neeche)
function formatTwoLineText(name) {
  if (!name || typeof name !== "string") return name;
  const words = name.trim().split(/\s+/);
  if (words.length <= 1) return name;

  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");

  return (
    <span className="flex flex-col items-center justify-center leading-tight">
      <span className="block truncate max-w-full">{line1}</span>
      <span className="block truncate max-w-full mt-0.5">{line2}</span>
    </span>
  );
}

// Helper component to render circular avatar with image fallback inside modal
function SmartLogoAvatar({ logoUrl, altName }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = getAssetPath(logoUrl, null);

  if (iconUrl && !imgError) {
    return (
      <Image
        src={iconUrl}
        alt={altName || "Logo"}
        width={32}
        height={32}
        unoptimized
        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
      {(altName || "U").charAt(0)}
    </div>
  );
}

export function Stats({ categories: initialCategories = [] }) {
  const router = useRouter();
  const [categoriesList, setCategoriesList] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [modalData, setModalData] = useState({ category: null, children: [], courses: [], universities: [] });

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategoriesList(initialCategories);
    } else {
      getWebsiteCategories().then((res) => {
        if (res && res.categories && res.categories.length > 0) {
          setCategoriesList(res.categories);
        }
      });
    }
  }, [initialCategories]);

  // Filter root categories dynamically from Backend API (showInStats !== false)
  const rootCategories = (categoriesList || [])
    .filter((cat) => !cat.parentId && (cat.slug || "").toLowerCase() !== "all" && cat.showInStats !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Dynamically extract "Browse By Category" pills directly from SSR categoriesList prop
  const browseParentDoc = (categoriesList || []).find(
    (c) => (c.slug || "").toLowerCase() === "browse-by-category"
  );

  const browseByPills = browseParentDoc
    ? (categoriesList || [])
      .filter((c) => c.parentId && String(c.parentId) === String(browseParentDoc._id))
      .map((item) => ({
        _id: item._id,
        name: item.name,
        slug: item.slug,
        search: item.name === "HR" ? "Human Resource" : item.name,
      }))
    : [];

  const parentCategory = activeCategory?.parent
    ? activeCategory.parent
    : activeCategory?.parentId
      ? categoriesList.find((c) => String(c._id) === String(activeCategory.parentId))
      : null;

  const handleCardClick = (cat) => {
    const subchildren = (categoriesList || []).filter(
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

      {/* ── STATS CARDS SECTION (MOBILE: 4 CARDS/ROW | DESKTOP: 8 CARDS IN 1 SINGLE ROW) ── */}
      {rootCategories.length > 0 && (
        <section className="py-3 bg-white relative overflow-hidden" suppressHydrationWarning>
          <Container>
            {/* Grid: 4 columns on mobile, 8 columns in 1 single row on desktop (Ultra Compact) */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5 sm:gap-2.5 max-w-4xl mx-auto items-stretch" suppressHydrationWarning>
              {rootCategories.map((item) => (
                <div
                  key={item._id || item.slug}
                  onClick={() => handleCardClick(item)}
                  className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 aspect-square flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 shadow-2xs w-full"
                >
                  <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                    <CategoryIcon cat={item} />
                  </div>
                  <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight px-0.5 min-w-0">
                    {formatTwoLineText(item.name || item.label)}
                  </h5>
                </div>
              ))}
            </div>

            {/* ── BROWSE BY CATEGORY PILLS SECTION (DYNAMIC FROM BACKEND SEED DB) ── */}
            {browseByPills.length > 0 && (
              <div className="max-w-4xl mx-auto mt-5 pt-4 border-t border-slate-200/80 text-left">
                <h4 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight mb-3">
                  Browse By Category
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-2.5" suppressHydrationWarning>
                  {browseByPills.map((pill) => (
                    <button
                      key={pill._id || pill.slug || pill.name}
                      onClick={() => router.push(`/courses?search=${encodeURIComponent(pill.search || pill.name)}`)}
                      className="px-2.5 sm:px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300/90 rounded-lg text-[11px] sm:text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer shadow-2xs hover:shadow-xs whitespace-nowrap"
                      suppressHydrationWarning
                    >
                      {pill.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* ── POPUP DIV OVERLAY MODAL FOR SELECTED CATEGORY (CLEAN LIGHT WHITE THEME - 3 CARDS PER ROW) ── */}
      {activeCategory !== null && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur Layer */}
          <div
            onClick={handleCloseModal}
            className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm ${isModalClosing ? "animate-fade-out" : "animate-fade-in"}`}
          />

          {/* Modal Container (Compact Light White - 3-Card Grid Layout) */}
          <div
            className={`relative w-full max-w-md bg-white border border-slate-200/90 text-slate-900 rounded-2xl shadow-2xl p-2 sm:p-3 z-10 max-h-[88vh] flex flex-col ${isModalClosing ? "animate-custom-scale-down-exit" : "animate-custom-scale-up"
              }`}
          >
            {activeCategory && (
              <div className="flex flex-col text-left min-h-0 flex-1">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2 shrink-0 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {parentCategory && (
                      <button
                        onClick={() => handleCardClick(parentCategory)}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
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
                    onClick={handleCloseModal}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Body - 3 Cards per Row Grid Layout */}
                <div className="flex-1 overflow-y-auto max-h-[64vh] overscroll-contain pr-1 space-y-6 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
                  {((modalData.children && modalData.children.length > 0) ||
                    (modalData.universities && modalData.universities.length > 0) ||
                    (modalData.courses && modalData.courses.length > 0)) ? (
                    <div className="space-y-6 p-0.5">
                      {/* 1. SUBCATEGORIES SECTION */}
                      {modalData.children && modalData.children.length > 0 && (
                        <div>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
                            {modalData.children.map((child) => {
                              const childName = child.name || child.label;
                              return (
                                <div
                                  key={child._id || child.slug}
                                  onClick={() => handleCardClick(child)}
                                  className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 aspect-square flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 shadow-2xs"
                                >
                                  <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                                    <SmartLogoAvatar
                                      logoUrl={child.logoUrl || child.logoSrc || child.logo || child.imageSrc || child.image}
                                      altName={childName}
                                    />
                                  </div>
                                  <Tooltip title={childName} placement="top">
                                    <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight px-0.5 min-w-0">
                                      {formatTwoLineText(childName)}
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
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3.5 block">
                            Partner Universities
                          </h4>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
                            {modalData.universities.map((uni) => {
                              const uniName = uni.university?.name || uni.name || "Partner University";
                              const rawLogo = uni.university?.logoSrc?.url || uni.logoSrc?.url || uni.logoUrl || uni.logo;
                              return (
                                <Link
                                  key={uni._id}
                                  href={`/courses?category=${activeCategory.slug}&university=${encodeURIComponent(uniName)}`}
                                  onClick={handleCloseModal}
                                  className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 aspect-square flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 shadow-2xs"
                                >
                                  <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                                    <SmartLogoAvatar logoUrl={rawLogo} altName={uniName} />
                                  </div>
                                  <Tooltip title={uniName} placement="top">
                                    <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight px-0.5 min-w-0">
                                      {formatTwoLineText(uniName)}
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
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3.5 block">
                            Available Programs
                          </h4>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
                            {modalData.courses.map((program) => {
                              const courseTitle = program.title || program.name || "Program";
                              const rawLogo = program.university?.logoSrc?.url || program.logoSrc?.url || program.image?.url;
                              return (
                                <Link
                                  key={program._id || program.slug}
                                  href={`/courses?category=${activeCategory.slug}&search=${encodeURIComponent(program.title)}`}
                                  onClick={handleCloseModal}
                                  className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 aspect-square flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 shadow-2xs"
                                >
                                  <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                                    <SmartLogoAvatar logoUrl={rawLogo} altName={courseTitle} />
                                  </div>
                                  <Tooltip title={courseTitle} placement="top">
                                    <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight px-0.5 min-w-0">
                                      {formatTwoLineText(courseTitle)}
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
                    <div className="bg-slate-50 border border-slate-200/80 p-8 rounded-2xl text-center flex flex-col items-center justify-center space-y-3 my-4">
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        🎓 No subcategories or courses found for {activeCategory.name || activeCategory.label}.
                      </p>
                      <Link
                        href={`/courses?category=${activeCategory.slug || ""}`}
                        onClick={handleCloseModal}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl text-xs hover:bg-blue-700 transition-all shadow-sm"
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