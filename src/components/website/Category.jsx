"use client";

import { Container } from "@/components/common/Container";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAssetPath } from "@/lib/utils";
import { ArrowLeft, X, Search, GraduationCap, Building2, Sparkles, ArrowRight, TrendingUp, Loader2, MapPin, Wallet, Clock, FolderTree, Layers } from "lucide-react";
import { Carousel, Modal } from "antd";
import { useToolWizard } from "@/components/tool/ToolWizardContext";
import { useFormModal } from "@/hooks/useFormModal";
import { API_BASE_URL } from "@/config";

// Category Icon Component - Renders MinIO Media Asset image/SVG from backend using Next.js Image
function CategoryIcon({ cat }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = getAssetPath(cat?.logo, null);

  if (iconUrl && !imgError) {
    return (
      <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 relative shrink-0">
        <Image
          src={iconUrl}
          alt={cat?.name}
          fill
          sizes="48px"
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 text-blue-500 font-semibold flex items-center justify-center text-[10px] sm:text-xs">
      {cat?.name?.charAt(0)}
    </div>
  );
}

// Course Icon Component - Renders logo/image or circular badge with initial
function CourseIcon({ course }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = getAssetPath(course?.logo, null);

  if (iconUrl && !imgError) {
    return (
      <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 relative shrink-0">
        <Image
          src={iconUrl}
          alt={course?.name}
          fill
          sizes="48px"
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50/80 text-[#0B3B7E] font-semibold flex items-center justify-center text-[10px] sm:text-xs border border-blue-100">
      {course?.name?.charAt(0)}
    </div>
  );
}

// Helper component to render backend logo/icon or fallback letter badge
function PartnerLogoIcon({ partner }) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = getAssetPath(partner?.logo, null);

  if (logoUrl && !imgError) {
    return (
      <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 relative shrink-0">
        <Image
          src={logoUrl}
          alt={partner?.name}
          fill
          sizes="48px"
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 text-blue-500 font-semibold flex items-center justify-center text-[10px] sm:text-xs">
      {partner?.name?.charAt(0)}
    </div>
  );
}

function formatTwoLineText(text = "") {
  if (!text) return "";
  const cleaned = text.trim();

  // Custom smart splits for common education domains & institutions
  if (/^business\s*&\s*entrepr/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">Business &</span>
        <span className="block text-center w-full font-semibold truncate text-[8.5px] min-[360px]:text-[9px] sm:text-[10px]">Entrepreneurship</span>
      </span>
    );
  }
  if (/^data science\s*&\s*analytics/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">Data Science &</span>
        <span className="block text-center w-full font-semibold truncate">Analytics</span>
      </span>
    );
  }
  if (/^ai\s*&\s*machine learning/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">AI & Machine</span>
        <span className="block text-center w-full font-semibold truncate">Learning</span>
      </span>
    );
  }
  if (/^energy\s*&\s*infrastructure/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">Energy &</span>
        <span className="block text-center w-full font-semibold truncate text-[8.5px] min-[360px]:text-[9px] sm:text-[10px]">Infrastructure</span>
      </span>
    );
  }
  if (/^logistics\s*&\s*supply chain/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">Logistics &</span>
        <span className="block text-center w-full font-semibold truncate">Supply Chain</span>
      </span>
    );
  }
  if (/^journalism\s*&\s*mass/i.test(cleaned)) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">Journalism &</span>
        <span className="block text-center w-full font-semibold truncate text-[8.5px] min-[360px]:text-[9px] sm:text-[10px]">Mass Comm.</span>
      </span>
    );
  }

  const words = cleaned.split(/\s+/);
  if (words.length === 1) {
    return <span className="block text-center w-full leading-tight font-semibold truncate">{cleaned}</span>;
  }

  if (words.length === 2) {
    return (
      <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
        <span className="block text-center w-full font-semibold truncate">{words[0]}</span>
        <span className="block text-center w-full font-semibold truncate mt-0.5">{words[1]}</span>
      </span>
    );
  }

  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");

  return (
    <span className="flex flex-col items-center justify-center leading-tight text-center w-full min-w-0">
      <span className="block text-center w-full font-semibold truncate">{line1}</span>
      <span className="block text-center w-full font-semibold truncate mt-0.5">{line2}</span>
    </span>
  );
}

// 🔍 Hero Floating Universal Search Bar Component with Instant Autocomplete
function HeroSearchBar({ allCourses = [], allUniversities = [], allCategories = [] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState({
    courses: [],
    universities: [],
    specializations: [],
    categories: [],
    subcategories: [],
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchContainerRef = useRef(null);
  const cacheRef = useRef(new Map());
  const debounceTimerRef = useRef(null);

  const trimmed = searchTerm.trim();

  // Debounced API Search
  useEffect(() => {
    if (!trimmed) {
      setLoading(false);
      setSearchResults({ courses: [], universities: [], specializations: [], categories: [], subcategories: [] });
      return;
    }

    const lowerQ = trimmed.toLowerCase();
    if (cacheRef.current.has(lowerQ)) {
      setSearchResults((prev) => ({ ...prev, ...cacheRef.current.get(lowerQ) }));
      setLoading(false);
      return;
    }

    setLoading(true);
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const base = API_BASE_URL.replace(/\/+$/, "");
        const res = await fetch(`${base}/university-offerings/v1/search?q=${encodeURIComponent(trimmed)}&limit=6`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.result) {
            const data = {
              courses: json.result.courses || [],
              universities: json.result.universities || [],
              specializations: json.result.specializations || [],
              categories: json.result.categories || [],
              subcategories: json.result.subcategories || [],
            };
            cacheRef.current.set(lowerQ, data);
            setSearchResults((prev) => ({ ...prev, ...data }));
          }
        }
      } catch (err) {
        // Fallback gracefully
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [trimmed]);

  // Flattened actionable list for keyboard navigation
  const flatItems = useMemo(() => {
    if (!trimmed) return [];
    return [
      ...(searchResults.courses || []).map((i) => ({ ...i, itemType: "course" })),
      ...(searchResults.universities || []).map((i) => ({ ...i, itemType: "university" })),
      ...(searchResults.specializations || []).map((i) => ({ ...i, itemType: "specialization" })),
      ...(searchResults.categories || []).map((i) => ({ ...i, itemType: "category" })),
      ...(searchResults.subcategories || []).map((i) => ({ ...i, itemType: "subcategory" })),
    ];
  }, [trimmed, searchResults]);

  const totalMatches = flatItems.length;

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (selectedIndex >= 0 && flatItems[selectedIndex]) {
      const item = flatItems[selectedIndex];
      setIsFocused(false);
      router.push(item.href || `/courses?search=${encodeURIComponent(trimmed)}`);
      return;
    }
    if (!trimmed) return;
    setIsFocused(false);
    router.push(`/courses?search=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e) => {
    if (!isFocused || totalMatches === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalMatches - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : totalMatches - 1));
    } else if (e.key === "Escape") {
      setIsFocused(false);
      setSelectedIndex(-1);
    }
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsFocused(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="pt-2 pb-1.5 bg-white relative" ref={searchContainerRef}>
      <Container>
        <div className="max-w-2xl mx-auto w-full relative">
          {/* Main Search Input Box */}
          <form
            onSubmit={handleSearchSubmit}
            className={`relative flex items-center bg-white rounded-full border overflow-hidden transition-all duration-200 h-10 sm:h-11 shadow-xs ${
              isFocused
                ? "border-[#0B3B7E] ring-2 ring-[#0B3B7E]/10"
                : "border-slate-300 hover:border-slate-400"
            }`}
          >
            <div className="pl-3.5 sm:pl-4 text-slate-400 flex items-center justify-center shrink-0">
              {loading ? (
                <Loader2 className="w-4 h-4 text-[#0B3B7E] animate-spin" />
              ) : (
                <Search className="w-4 h-4 text-[#0B3B7E]" />
              )}
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedIndex(-1);
              }}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search 100+ Courses, Universities or Specializations..."
              className="w-full py-2 px-2.5 text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 bg-transparent border-0 outline-none font-medium"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedIndex(-1);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 mr-2 transition-colors cursor-pointer border-0 bg-transparent"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="submit"
              className="h-full px-5 sm:px-6 bg-[#0B3B7E] hover:bg-blue-900 text-white rounded-r-full text-xs sm:text-[13px] font-semibold tracking-wide transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer border-0 m-0"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline-block" />
            </button>
          </form>

          {/* Autocomplete Results Dropdown */}
          {isFocused && trimmed.length > 0 && (
            <div className="absolute left-0 right-0 w-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden divide-y divide-slate-100 max-h-[420px] overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150">
              {totalMatches > 0 && (
                <>
                  {/* 📂 Categories & Domains */}
                  {searchResults.categories?.length > 0 && (
                    <div className="p-2.5 sm:p-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
                        📂 Categories & Domains
                      </span>
                      <div className="space-y-1">
                        {searchResults.categories.map((cat) => (
                          <div
                            key={cat._id || cat.slug}
                            onClick={() => {
                              setIsFocused(false);
                              router.push(cat.href);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-50/80 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 font-bold flex items-center justify-center shrink-0 border border-amber-100 relative overflow-hidden p-0.5">
                                {cat.logo ? (
                                  <Image
                                    src={getAssetPath(cat.logo, null)}
                                    alt={cat.name}
                                    fill
                                    sizes="32px"
                                    className="object-contain p-0.5"
                                  />
                                ) : (
                                  <FolderTree className="w-4 h-4 text-amber-600" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-amber-800 block truncate">
                                  {cat.name}
                                </span>
                                {cat.categoryType && cat.categoryType !== 'GENERAL' && (
                                  <span className="text-[10px] text-amber-700 font-medium block mt-0.5">
                                    {cat.categoryType.replace(/_/g, ' ')}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-[11px] text-amber-700 font-medium shrink-0 ml-2">Browse &rarr;</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🔖 SubCategories */}
                  {searchResults.subcategories?.length > 0 && (
                    <div className="p-2.5 sm:p-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
                        🔖 SubCategories
                      </span>
                      <div className="space-y-1">
                        {searchResults.subcategories.map((scat) => (
                          <div
                            key={scat._id || scat.slug}
                            onClick={() => {
                              setIsFocused(false);
                              router.push(scat.href);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-sky-50/80 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 font-bold flex items-center justify-center shrink-0 border border-sky-100 relative overflow-hidden p-0.5">
                                {scat.logo ? (
                                  <Image
                                    src={getAssetPath(scat.logo, null)}
                                    alt={scat.name}
                                    fill
                                    sizes="32px"
                                    className="object-contain p-0.5"
                                  />
                                ) : (
                                  <Layers className="w-4 h-4 text-sky-600" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-sky-800 block truncate">
                                  {scat.name}
                                </span>
                                {scat.parentName && (
                                  <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                                    in {scat.parentName}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-[11px] text-sky-700 font-medium shrink-0 ml-2">Explore &rarr;</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🎓 Courses & Degrees */}
                  {searchResults.courses?.length > 0 && (
                    <div className="p-2.5 sm:p-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
                        🎓 Courses & Degrees
                      </span>
                      <div className="space-y-1">
                        {searchResults.courses.map((c) => (
                          <div
                            key={c._id || c.slug}
                            onClick={() => {
                              setIsFocused(false);
                              router.push(c.href);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-blue-50/80 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 border border-blue-100/60 p-1 relative overflow-hidden">
                                {c.logo ? (
                                  <Image
                                    src={getAssetPath(c.logo, null)}
                                    alt={c.name}
                                    fill
                                    sizes="32px"
                                    className="object-contain p-0.5"
                                  />
                                ) : (
                                  <GraduationCap className="w-4 h-4 text-blue-600" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-blue-600 block truncate">
                                  {c.name}
                                </span>
                                <div className="flex items-center gap-2 text-[10.5px] text-slate-500 mt-0.5">
                                  {c.universitiesCount > 0 && (
                                    <span>{c.universitiesCount} Universities</span>
                                  )}
                                  {c.startingFee && (
                                    <span className="text-emerald-700 font-medium">Starts {c.startingFee}</span>
                                  )}
                                  {c.duration && <span>• {c.duration}</span>}
                                </div>
                              </div>
                            </div>
                            <span className="text-[11px] text-blue-600 font-medium shrink-0 ml-2">Explore &rarr;</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🏷️ Specializations */}
                  {searchResults.specializations?.length > 0 && (
                    <div className="p-2.5 sm:p-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
                        🏷️ Specializations
                      </span>
                      <div className="space-y-1">
                        {searchResults.specializations.map((sc) => (
                          <div
                            key={sc._id || sc.slug}
                            onClick={() => {
                              setIsFocused(false);
                              router.push(sc.href);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-purple-50/80 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 font-bold flex items-center justify-center shrink-0 border border-purple-100">
                                <Sparkles className="w-4 h-4 text-purple-600" />
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-purple-700 block truncate">
                                  {sc.name}
                                </span>
                                <div className="flex items-center gap-2 text-[10.5px] text-slate-500 mt-0.5">
                                  {sc.courseName && (
                                    <span className="font-medium text-slate-600">{sc.courseName}</span>
                                  )}
                                  {sc.startingFee && (
                                    <span className="text-emerald-700 font-medium">• Starts {sc.startingFee}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <span className="text-[11px] text-purple-600 font-medium shrink-0 ml-2">Explore &rarr;</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 🏛️ Universities */}
                  {searchResults.universities?.length > 0 && (
                    <div className="p-2.5 sm:p-3">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
                        🏛️ Universities
                      </span>
                      <div className="space-y-1">
                        {searchResults.universities.map((u) => (
                          <div
                            key={u._id || u.slug}
                            onClick={() => {
                              setIsFocused(false);
                              router.push(u.href);
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/80 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 relative overflow-hidden p-0.5">
                                {u.logo ? (
                                  <Image
                                    src={getAssetPath(u.logo, null)}
                                    alt={u.name}
                                    fill
                                    sizes="32px"
                                    className="object-contain p-0.5"
                                  />
                                ) : (
                                  <Building2 className="w-4 h-4 text-emerald-600" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-emerald-700 truncate">
                                    {u.name}
                                  </span>
                                  {u.naacGrade && (
                                    <span className="text-[9.5px] font-bold bg-amber-50 border border-amber-200 text-amber-800 px-1.5 py-0.2 rounded">
                                      NAAC {u.naacGrade}
                                    </span>
                                  )}
                                  {u.viaPartner && (
                                    <span className="text-[9.5px] font-medium bg-[#FFF0F3] border border-[#FFE4E6] text-[#E52E2E] px-1.5 py-0.2 rounded">
                                      Via {u.viaPartner}
                                    </span>
                                  )}
                                </div>
                                {(u.city || u.state) && (
                                  <span className="text-[10.5px] text-slate-500 block truncate mt-0.5">
                                    {[u.city, u.state].filter(Boolean).join(", ")}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-[11px] text-emerald-600 font-medium shrink-0 ml-2">View Programs &rarr;</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* State 3: No matches found */}
              {trimmed && !loading && totalMatches === 0 && (
                <div className="p-6 text-center text-slate-500">
                  <p className="text-xs sm:text-sm m-0">No direct matches found for "{searchTerm}".</p>
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="mt-2 text-xs font-semibold text-blue-600 hover:underline bg-transparent border-0 cursor-pointer"
                  >
                    Search across all listings &rarr;
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

// Carousel Component for Universities using Ant Design built-in arrows + full drag/swipe support
function UniversityCarouselBlock({
  block,
  slidesToShowCount,
  handleMouseDown,
  handleSlideClick,
}) {
  const isScrollable = block.children && block.children.length > slidesToShowCount;

  if (!isScrollable) {
    return (
      <div className="grid grid-cols-4 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1.5 sm:gap-2.5 w-full mx-auto items-stretch">
        {block.children.map((child, idx) => (
          <div
            key={child._id || idx}
            onClick={() => handleSlideClick(null, child)}
            className="w-full aspect-square bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl p-1 min-[360px]:p-1.5 sm:p-2 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-200 hover:shadow hover:-translate-y-0.5 group min-w-0"
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
        ))}
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto min-h-[90px] sm:min-h-[110px]">
      <Carousel
        arrows={true}
        key={slidesToShowCount}
        autoplay={true}
        autoplaySpeed={4000}
        pauseOnHover={true}
        dots={false}
        draggable={true}
        swipe={true}
        swipeToSlide={true}
        touchMove={true}
        touchThreshold={10}
        slidesToShow={slidesToShowCount}
        slidesToScroll={1}
        className="w-full relative"
      >
        {block.children.map((child, idx) => (
          <div key={child._id || idx} className="px-1 py-0.5">
            <div
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              onClick={(e) => handleSlideClick(e, child)}
              className="w-full aspect-square bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl p-1 min-[360px]:p-1.5 sm:p-2 flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-200 hover:shadow hover:-translate-y-0.5 group min-w-0"
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
  const { openTool } = useToolWizard();
  const { openFormModal } = useFormModal();
  const [activeCategory, setActiveCategory] = useState(null);
  const [modalData, setModalData] = useState({ category: null, children: [], universities: [], courses: [] });
  const [visibleCounts, setVisibleCounts] = useState({});
  const [expandedSections, setExpandedSections] = useState({});
  const [slidesToShowCount, setSlidesToShowCount] = useState(4);

  const pointerDownRef = useRef({ x: 0, y: 0, time: 0 });

  const handleMouseDown = (e) => {
    const clientX = e?.touches ? e.touches[0]?.clientX : e?.clientX;
    const clientY = e?.touches ? e.touches[0]?.clientY : e?.clientY;
    pointerDownRef.current = { x: clientX || 0, y: clientY || 0, time: Date.now() };
  };

  const handleSlideClick = (e, child) => {
    if (e && pointerDownRef.current.time) {
      const clientX = e?.touches ? e.touches[0]?.clientX : e?.clientX;
      const clientY = e?.touches ? e.touches[0]?.clientY : e?.clientY;
      if (clientX !== undefined && clientY !== undefined) {
        const diffX = Math.abs(clientX - (pointerDownRef.current.x || 0));
        const diffY = Math.abs(clientY - (pointerDownRef.current.y || 0));
        if (diffX > 12 || diffY > 12) {
          return;
        }
      }
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

  // Dynamic Section Blocks (Top Courses, Top IITs & IIMs, Domestic, Global, etc.)
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

  const getItemSlug = (item) => {
    if (!item) return "";
    // If slug is a readable string and not a raw 24-character hex ObjectId
    if (item.slug && !/^[0-9a-fA-F]{24}$/.test(String(item.slug))) {
      return item.slug;
    }
    // Fallback to readable slugified name (e.g. "MBA" -> "mba", "IIM Lucknow" -> "iim-lucknow")
    if (item.name) {
      return item.name.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");
    }
    return item.slug || item._id || "";
  };

  const handleCardClick = (item) => {
    if (!item) return;

    // 1. If University Card (from Carousel) is clicked -> Open Modal with its Offered Courses
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
    if (item.targetUrl) {
      router.push(item.targetUrl);
    } else {
      const targetSlug = getItemSlug(item);
      if (item.itemType === "course" || item.targetType === "COURSE") {
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

      {/* ── 🔍 HERO FLOATING SEARCH BAR (OPTION 2) ── */}
      <HeroSearchBar
        allCourses={allCourses}
        allUniversities={allUniversities}
        allCategories={categoriesList}
      />

      {/* ── TOP STATS CARDS SECTION ── */}
      {rootCategories.length > 0 && (
        <section className="py-3 bg-white relative overflow-hidden" suppressHydrationWarning>
          <Container>
            {/* Grid: 4 columns on mobile, auto-fit on desktop for dynamic width */}
            <div className="grid grid-cols-4 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1.5 sm:gap-2.5 w-full mx-auto md:px-8 items-stretch" suppressHydrationWarning>
              {rootCategories.map((item) => (
                <div
                  key={item._id || item.slug}
                  onClick={() => handleCardClick(item)}
                  className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl sm:rounded-xl p-1 min-[360px]:p-1.5 sm:p-2.5 aspect-square flex flex-col items-center justify-center text-center cursor-pointer select-none transition-colors duration-200 group min-w-0 w-full"
                >
                  <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                    <CategoryIcon cat={item} />
                  </div>
                  <div className="h-6 min-[360px]:h-7 sm:h-8 flex items-center justify-center w-full min-w-0 px-0.5">
                    <span className="line-clamp-2 text-center leading-tight font-semibold text-[10px] min-[360px]:text-[11px] sm:text-xs text-gray-700 group-hover:text-blue-500 transition-colors w-full px-0.5">
                      {item.label || item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── FEATURED CAROUSELS & AI TOOLS SECTIONS (FULL-WIDTH SECTIONS) ── */}
      {parentBlocks.length > 0 &&
        parentBlocks.map((block, bIdx) => {
          const isToolsBlock =
            block.featuredType === "TOOLS" ||
            (block.title && block.title.toLowerCase().includes("tool"));

          // 🌟 DYNAMIC EXPLORE AI POWERED TOOLS & SCHOLARSHIP SECTION (GRAY BG EXTENDS EXACTLY TO HALF SCHOLARSHIP BANNER)
          if (isToolsBlock) {
            return (
              <section
                key={block._id || block.slug || bIdx}
                className="w-full relative pt-5 sm:pt-10 md:pt-12 pb-10 sm:pb-16 text-center"
                suppressHydrationWarning
              >
                {/* 🎨 Dual-Layer Background: Balanced overlap across scholarship banner in #F1F5F9 & pure white #ffffff */}
                <div className="absolute inset-x-0 top-0 h-[67%] w-full bg-[#F1F5F9] z-0 pointer-events-none" />
                <div className="absolute inset-x-0 top-[67%] bottom-0 w-full bg-white z-0 pointer-events-none" />

                <Container className="relative z-10">
                  <div className="max-w-6xl mx-auto text-center">
                    {/* Top Badge */}
                    <div className="flex justify-center mb-1.5 sm:mb-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-4 sm:py-1 rounded-full bg-[#F5E5BA] text-[#8C6228] border border-[#E9D195] text-[10px] sm:text-xs font-bold shadow-none">
                        <span className="text-[#8C6228] text-xs sm:text-sm font-extrabold">✦</span>
                        <span className="tracking-wider uppercase text-[10px] sm:text-[11px]">AI POWERED</span>
                      </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-lg sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight m-0 mb-1">
                      Explore AI Powered Tools
                    </h2>

                    {/* Subtitle */}
                    <p className="text-[#64748B] text-[11px] sm:text-sm md:text-base font-normal max-w-xl mx-auto m-0 mb-4 sm:mb-8">
                      Make smarter education decisions with AI-powered tools
                    </p>

                    {/* 4 Cards Grid - 2 columns on mobile, 4 columns on desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 text-center">
                      {block.children.map((child, cIdx) => {
                        const cName = (child.name || child.title || "").toLowerCase();

                        let sparkleColor = "text-[#00ACC1]";
                        let iconCircleBg = "bg-[#E0F7FA] text-[#00838F]";
                        let underlineClass = "border-[#00ACC1]";
                        let btnText = "Suggest University";
                        let desc = "Find universities that match your goals, preferences, and career plans.";
                        let clickHandler = () =>
                          openTool("suggest-me-a-university", { tool_mode: "Suggest University" });
                        let isLink = false;
                        let linkUrl = "#";

                        // Greek Temple / University Columns SVG
                        let iconSvg = (
                          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        );

                        if (cName.includes("eligib")) {
                          sparkleColor = "text-[#AB47BC]";
                          iconCircleBg = "bg-[#EDE7F6] text-[#6A1B9A]";
                          underlineClass = "border-[#AB47BC]";
                          btnText = "Check Eligibility";
                          desc = "Instantly check which courses and universities you're eligible for.";
                          clickHandler = () =>
                            openTool("suggest-me-a-university", { tool_mode: "Check Eligibility" });
                          // User Checklist Icon SVG
                          iconSvg = (
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          );
                        } else if (cName.includes("compar")) {
                          sparkleColor = "text-[#1E88E5]";
                          iconCircleBg = "bg-[#E3F2FD] text-[#1565C0]";
                          underlineClass = "border-[#1E88E5]";
                          btnText = "Compare University";
                          desc = "Compare universities, courses, fees, and key benefits side by side.";
                          isLink = true;
                          linkUrl = "/compare";
                          // Balance Scales SVG
                          iconSvg = (
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                          );
                        } else if (cName.includes("course")) {
                          sparkleColor = "text-[#EC407A]";
                          iconCircleBg = "bg-[#FCE4EC] text-[#C2185B]";
                          underlineClass = "border-[#EC407A]";
                          btnText = "Suggest Course";
                          desc = "Compare universities, courses, fees, and key benefits side by side.";
                          clickHandler = () =>
                            openTool("suggest-me-a-university", { tool_mode: "Suggest Course" });
                          // Open Book SVG
                          iconSvg = (
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          );
                        }

                        return (
                          <div
                            key={child._id || cIdx}
                            className="relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 shadow-sm hover:shadow-xl border border-slate-100/90 flex flex-col items-center text-center justify-between transition-all duration-300 hover:-translate-y-1 group"
                          >
                            {/* Top Right Sparkle */}
                            <span
                              className={`absolute top-2 right-2 sm:top-3.5 sm:right-3.5 ${sparkleColor} font-black text-[10px] sm:text-xs group-hover:rotate-12 transition-transform`}
                            >
                              ✦
                            </span>

                            {/* Icon Circle & Content */}
                            <div className="flex flex-col items-center space-y-2 sm:space-y-3 w-full">
                              <div
                                className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center group-hover:scale-110 transition-transform"
                              >
                                {child.logo?.url || (typeof child.logo === "string" && child.logo) ? (
                                  <Image
                                    src={child.logo?.url || child.logo}
                                    alt={child.name || "Tool icon"}
                                    width={48}
                                    height={48}
                                    unoptimized
                                    className="w-9 h-9 sm:w-12 sm:h-12 md:w-13 md:h-13 object-contain"
                                  />
                                ) : (
                                  iconSvg
                                )}
                              </div>

                              <h3 className="text-xs sm:text-base font-bold text-[#0F172A] tracking-tight m-0 pt-0.5 leading-tight">
                                <span className={`border-b-2 ${underlineClass} pb-0.5 inline-block`}>
                                  {child.name}
                                </span>
                              </h3>

                              <p className="text-[#64748B] text-[10px] sm:text-xs md:text-[12.5px] leading-snug sm:leading-relaxed font-normal m-0 line-clamp-2 sm:line-clamp-3">
                                {child.description || desc}
                              </p>
                            </div>

                            {/* Action Button */}
                            <div className="w-full pt-3 sm:pt-5">
                              {isLink ? (
                                <Link
                                  href={linkUrl}
                                  className="w-full py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-full bg-[#0B3B7E] hover:bg-[#072859] text-white font-bold text-[10px] sm:text-xs shadow-none transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer truncate"
                                >
                                  <span className="truncate">{btnText}</span>
                                  <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] sm:text-[10px] shrink-0 group-hover:translate-x-0.5 transition-transform">
                                    →
                                  </span>
                                </Link>
                              ) : (
                                <button
                                  type="button"
                                  onClick={clickHandler}
                                  className="w-full py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-full bg-[#0B3B7E] hover:bg-[#072859] text-white font-bold text-[10px] sm:text-xs shadow-none transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer truncate"
                                >
                                  <span className="truncate">{btnText}</span>
                                  <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white/20 flex items-center justify-center text-[9px] sm:text-[10px] shrink-0 group-hover:translate-x-0.5 transition-transform">
                                    →
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* ── SCHOLARSHIP BANNER (USING CLEAN HIGH-RES BACKGROUND GRAPHIC) ── */}
                    <div
                      onClick={() =>
                        openFormModal({
                          title: "Claim Up to 20% Scholarship",
                          subtitle: "Fill the form below to get instant scholarship coupon code & fee concession",
                          submitButtonText: "Get Scholarship Code",
                        })
                      }
                      className="mt-12 relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl min-h-[280px] sm:min-h-[320px] md:min-h-[350px] flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 md:p-10 lg:px-12 lg:py-10 select-none text-left cursor-pointer group"
                    >
                      {/* Background Image with Gradient, Coins on Left & Center Student Model */}
                      <Image
                        src="/Scholarship Image.webp"
                        alt="Scholarship Banner Background"
                        fill
                        sizes="(max-width: 768px) 100vw, 1200px"
                        loading="eager"
                        className="object-cover object-center -z-10 transition-transform duration-500"
                      />

                      {/* Left: UPTO in White, 20% in Gold, Scholarship in Pure Solid White */}
                      <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0 z-10 pl-0 md:pl-2">
                        <span className="text-white/90 font-medium text-xs sm:text-sm tracking-[0.2em] uppercase mb-1">
                          UPTO
                        </span>
                        <div className="text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight leading-none text-[#E8CA72]">
                          20%
                        </div>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase mt-1">
                          Scholarship
                        </span>
                      </div>

                      {/* Center Spacer to allow Student Model in background to shine through */}
                      <div className="w-16 md:w-28 lg:w-40 shrink-0 h-8 pointer-events-none" />

                      {/* Right: Heading, Subtitle & Bright Cyan Button */}
                      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 sm:space-y-3.5 max-w-md lg:max-w-lg z-10 pr-0 md:pr-2">
                        <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white leading-snug tracking-tight m-0">
                          Get <span className="text-[#E8CA72]">Scholarship</span> that <br className="hidden sm:inline" />
                          Make Education Affordable
                        </h3>
                        <p className="text-white/80 text-xs sm:text-[13px] leading-relaxed font-normal m-0 max-w-sm">
                          Education should be accessible to all. Use our Scholarship Coupon Code and get up to 20% off on course fees.
                        </p>
                        <div className="pt-1.5">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#00A8EC] hover:bg-[#0098D6] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
                          >
                            <span>Get Coupon Code</span>
                            <span className="text-base leading-none" aria-hidden="true">🎁</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </section>
            );
          }

          const blockKey = String(block._id || block.slug || bIdx);
          const isCourse = Boolean(block.isCourseBlock);
          const isExpanded = isCourse
            ? (visibleCounts[blockKey] || 8) >= block.children.length
            : Boolean(expandedSections[blockKey]);
          const currentVisibleCount = isCourse ? (visibleCounts[blockKey] || 8) : block.children.length;

          return (
            <section
              key={blockKey}
              className="py-3 bg-white relative overflow-hidden"
              suppressHydrationWarning
            >
              <Container>
                <div className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 transition-colors duration-200 max-w-6xl mx-auto">
                  {/* Section Title Header with Colored Accent Bar & Right-aligned View More (ONLY for Universities) */}
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2.5 truncate">
                      <span
                        className="w-1.5 h-5 rounded-full inline-block shrink-0 bg-blue-500"
                      />
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight truncate">
                        {block.title}
                      </h3>
                    </div>

                    {!isCourse && block.children && block.children.length > slidesToShowCount && (
                      <button
                        type="button"
                        onClick={(e) => {
                          const btnElement = e.currentTarget;
                          const sectionElement = btnElement.closest("section");

                          if (isExpanded) {
                            setExpandedSections((prev) => ({ ...prev, [blockKey]: false }));
                            setTimeout(() => {
                              if (sectionElement) {
                                const yOffset = -70;
                                const y = sectionElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                              }
                            }, 60);
                          } else {
                            setExpandedSections((prev) => ({ ...prev, [blockKey]: true }));
                            setTimeout(() => {
                              const scrollDelta = window.innerWidth < 768 ? 220 : 180;
                              window.scrollBy({ top: scrollDelta, behavior: "smooth" });
                            }, 100);
                          }
                        }}
                        className="text-xs font-bold text-[#0B3B7E] hover:text-blue-700 flex items-center gap-1 transition-colors group shrink-0 cursor-pointer"
                      >
                        <span>{isExpanded ? "View Less" : "View More"}</span>
                        {isExpanded ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-3.5 h-3.5 shrink-0"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Content: Course Grid OR University (Carousel by default -> Grid on View More) */}
                  {isCourse || isExpanded ? (
                    <div className="grid grid-cols-4 md:grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1.5 sm:gap-2.5 w-full mx-auto items-stretch animate-in fade-in duration-200">
                      {block.children.slice(0, currentVisibleCount).map((child, idx) => {
                        const isUni = !isCourse;

                        return (
                          <div
                            key={child._id || idx}
                            onClick={() => {
                              if (isUni) {
                                handleCardClick(child);
                              } else {
                                router.push(`/courses?course=${encodeURIComponent(getItemSlug(child))}`);
                              }
                            }}
                            className="w-full aspect-square bg-white hover:bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2.5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-200 group min-w-0"
                          >
                            <div className="mb-0.5 sm:mb-1 group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                              {isUni ? (
                                <PartnerLogoIcon partner={child} />
                              ) : (
                                <CourseIcon course={child} />
                              )}
                            </div>
                            <div className="h-6 min-[360px]:h-7 sm:h-8 flex items-center justify-center w-full min-w-0">
                              <span className="line-clamp-2 text-center leading-tight uppercase font-semibold text-[10px] min-[360px]:text-[11px] sm:text-xs text-gray-700 group-hover:text-blue-500 transition-colors w-full px-0.5">
                                {child.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <UniversityCarouselBlock
                      block={block}
                      slidesToShowCount={slidesToShowCount}
                      handleMouseDown={handleMouseDown}
                      handleSlideClick={handleSlideClick}
                    />
                  )}

                  {/* ── BOTTOM VIEW MORE / VIEW LESS ACTION BUTTON (ONLY FOR COURSES) ── */}
                  {isCourse && block.children && block.children.length > 8 && (
                    <div className="flex justify-center mt-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          const btnElement = e.currentTarget;
                          const sectionElement = btnElement.closest("section");

                          if (isExpanded) {
                            setVisibleCounts((prev) => ({ ...prev, [blockKey]: 8 }));
                            setTimeout(() => {
                              if (sectionElement) {
                                const yOffset = -70;
                                const y = sectionElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                              }
                            }, 60);
                          } else {
                            setVisibleCounts((prev) => ({ ...prev, [blockKey]: (prev[blockKey] || 8) + 8 }));
                            setTimeout(() => {
                              const scrollDelta = window.innerWidth < 768 ? 220 : 180;
                              window.scrollBy({ top: scrollDelta, behavior: "smooth" });
                            }, 100);
                          }
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
                      >
                        <span>{isExpanded ? "View Less" : "View More"}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"
                          }`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </Container>
            </section>
          );
        })}

      {/* ── ANTD MODAL POPUP FOR SELECTED CATEGORY / UNIVERSITY ── */}
      <Modal
        open={Boolean(activeCategory)}
        onCancel={handleCloseModal}
        footer={null}
        centered
        closable={false}
        mask={{ closable: true }}
        keyboard={true}
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
                <div className="w-10 h-10 flex items-center justify-center shrink-0">
                  {modalData.isUniversity ? (
                    <PartnerLogoIcon partner={activeCategory} />
                  ) : (
                    <CategoryIcon cat={activeCategory} />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight tracking-tight truncate m-0">
                    {activeCategory.label || activeCategory.name}
                  </h3>
                  <span className="text-xs text-slate-500 block mt-0.5 truncate">
                    {modalData.isUniversity
                      ? "Programs & Degrees Offered"
                      : (activeCategory.title || "Online Programs & Degrees")}
                  </span>
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
              {/* 1. Category Sub-categories or Universities Grid */}
              {!modalData.isUniversity && (
                <div>
                  {modalData.items && modalData.items.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                      {modalData.items.map((it, idx) => (
                        <div
                          key={`${it._id || it.slug || idx}-${idx}`}
                          onClick={() => {
                            handleCloseModal();
                            const parentCatSlug = getItemSlug(activeCategory);
                            const itemSlug = getItemSlug(it);

                            if (modalData.isUniversitiesModal) {
                              router.push(`/courses?university=${encodeURIComponent(itemSlug)}`);
                            } else if (parentCatSlug && parentCatSlug !== "all") {
                              router.push(`/courses?category=${encodeURIComponent(parentCatSlug)}&subcategory=${encodeURIComponent(itemSlug)}`);
                            } else if (it.targetUrl) {
                              router.push(it.targetUrl);
                            } else {
                              router.push(`/courses?subcategory=${encodeURIComponent(itemSlug)}`);
                            }
                          }}
                          className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 min-[360px]:p-2 aspect-square flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 w-full shadow-2xs overflow-hidden"
                        >
                          <div className="flex-1 flex items-center justify-center w-full min-h-0 pt-0.5">
                            <div className="group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                              {modalData.isUniversitiesModal ? (
                                <PartnerLogoIcon partner={it} />
                              ) : (
                                <CategoryIcon cat={it} />
                              )}
                            </div>
                          </div>
                          <div className="h-7 min-[360px]:h-8 sm:h-8.5 flex items-center justify-center w-full min-w-0 px-0.5 pb-0.5 shrink-0">
                            <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[10.5px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight min-w-0 m-0">
                              {formatTwoLineText(it.name)}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl text-center flex flex-col items-center justify-center space-y-2 my-3">
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        🎓 Explore courses and specializations in {activeCategory.name}.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          handleCloseModal();
                          router.push(`/courses?category=${encodeURIComponent(getItemSlug(activeCategory))}`);
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        Explore Category Courses
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 2. University Offered Courses Grid (When University card was clicked) */}
              {modalData.isUniversity && (
                <div>
                  {modalData.items && modalData.items.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                      {modalData.items.map((crs, idx) => (
                        <div
                          key={`${crs._id || crs.slug || idx}-${idx}`}
                          onClick={() => {
                            handleCloseModal();
                            const uniSlug = getItemSlug(modalData.category);
                            const crsSlug = getItemSlug(crs);
                            router.push(`/courses?university=${encodeURIComponent(uniSlug)}&course=${encodeURIComponent(crsSlug)}`);
                          }}
                          className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 min-[360px]:p-2 aspect-square flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 w-full shadow-2xs overflow-hidden"
                        >
                          <div className="flex-1 flex items-center justify-center w-full min-h-0 pt-0.5">
                            <div className="group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                              <CourseIcon course={crs} />
                            </div>
                          </div>
                          <div className="h-7 min-[360px]:h-8 sm:h-8.5 flex items-center justify-center w-full min-w-0 px-0.5 pb-0.5 shrink-0">
                            <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[10.5px] font-medium text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight min-w-0 m-0 uppercase">
                              {formatTwoLineText(crs.name)}
                            </h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl text-center flex flex-col items-center justify-center space-y-2 my-3">
                      <p className="text-xs sm:text-sm text-slate-600 font-medium">
                        🎓 Explore degree programs and courses offered by {modalData.category?.name}.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          handleCloseModal();
                          router.push(`/courses?university=${encodeURIComponent(getItemSlug(modalData.category))}`);
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        Explore University Courses
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Category;
