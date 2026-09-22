"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container } from "@/components/common/Container";
import { getAssetPath } from "@/lib/utils";
import { API_BASE_URL } from "@/config";
import {
  Search,
  Loader2,
  X,
  ArrowRight,
  Sparkles,
  FolderTree,
  Layers,
  GraduationCap,
  Building2,
} from "lucide-react";

export default function HeroSearchBar({
  allCourses = [],
  allUniversities = [],
  allCategories = [],
}) {
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
    appliedFilters: null,
    comparison: null,
    aiRecommendation: null,
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
      setSearchResults({
        courses: [],
        universities: [],
        specializations: [],
        categories: [],
        subcategories: [],
      });
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
        const res = await fetch(
          `${base}/courses/v1/search?q=${encodeURIComponent(trimmed)}&limit=6`
        );
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.result) {
            const data = {
              courses: json.result.courses || [],
              universities: json.result.universities || [],
              specializations: json.result.specializations || [],
              categories: json.result.categories || [],
              subcategories: json.result.subcategories || [],
              appliedFilters: json.appliedFilters || null,
              comparison: json.comparison || null,
              aiRecommendation: json.aiRecommendation || null,
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
              {/* Natural Language Filter Extraction Indicator */}
              {searchResults.appliedFilters &&
                (searchResults.appliedFilters.mode ||
                  searchResults.appliedFilters.maxBudget ||
                  searchResults.appliedFilters.location ||
                  searchResults.appliedFilters.minNaacGrade ||
                  searchResults.appliedFilters.degreeLevel) && (
                  <div className="px-3.5 py-2 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border-b border-blue-100 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
                      <Sparkles className="w-3.5 h-3.5 text-[#0B3B7E] shrink-0" />
                      <span className="text-[11px] font-semibold text-[#0B3B7E]">AI Search Filters:</span>
                      {searchResults.appliedFilters.mode && (
                        <span className="bg-white border border-blue-200 px-1.5 py-0.5 rounded text-[10.5px] font-bold text-blue-700 shadow-2xs">
                          {searchResults.appliedFilters.mode}
                        </span>
                      )}
                      {searchResults.appliedFilters.minBudget && searchResults.appliedFilters.maxBudget ? (
                        <span className="bg-white border border-emerald-200 px-1.5 py-0.5 rounded text-[10.5px] font-bold text-emerald-700 shadow-2xs">
                          Budget: ₹{Number(searchResults.appliedFilters.minBudget).toLocaleString("en-IN")} - ₹{Number(searchResults.appliedFilters.maxBudget).toLocaleString("en-IN")}
                        </span>
                      ) : searchResults.appliedFilters.maxBudget ? (
                        <span className="bg-white border border-emerald-200 px-1.5 py-0.5 rounded text-[10.5px] font-bold text-emerald-700 shadow-2xs">
                          Budget ≤ ₹{Number(searchResults.appliedFilters.maxBudget).toLocaleString("en-IN")}
                        </span>
                      ) : null}
                      {searchResults.appliedFilters.location && (
                        <span className="bg-white border border-indigo-200 px-1.5 py-0.5 rounded text-[10.5px] font-bold text-indigo-700 shadow-2xs">
                          📍 {searchResults.appliedFilters.location}
                        </span>
                      )}
                      {searchResults.appliedFilters.minNaacGrade && (
                        <span className="bg-white border border-amber-200 px-1.5 py-0.5 rounded text-[10.5px] font-bold text-amber-700 shadow-2xs">
                          🏆 NAAC {searchResults.appliedFilters.minNaacGrade}
                        </span>
                      )}
                      {searchResults.appliedFilters.degreeLevel && (
                        <span className="bg-white border border-purple-200 px-1.5 py-0.5 rounded text-[10.5px] font-bold text-purple-700 shadow-2xs">
                          {searchResults.appliedFilters.degreeLevel}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium shrink-0">Smart Matching</span>
                  </div>
                )}

              {/* ⚡ AI Compare Intent Card */}
              {searchResults.comparison && searchResults.comparison.item1 && searchResults.comparison.item2 && (
                <div
                  onClick={() => {
                    setIsFocused(false);
                    router.push(searchResults.comparison.compareUrl);
                  }}
                  className="m-2.5 p-3 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white shadow-md hover:shadow-lg cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-white shrink-0 text-sm">
                        ⚡
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-200 block">
                          AI Compare Match
                        </span>
                        <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm truncate">
                          <span className="truncate">{searchResults.comparison.item1.name}</span>
                          <span className="text-amber-300 font-extrabold text-[11px] px-1 py-0.2 bg-white/10 rounded">VS</span>
                          <span className="truncate">{searchResults.comparison.item2.name}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold bg-white text-blue-800 px-2.5 py-1 rounded-lg shrink-0 group-hover:bg-blue-50 transition-colors">
                      Compare &rarr;
                    </span>
                  </div>
                </div>
              )}

              {/* 💡 AI Recommendation / Fallback Card */}
              {searchResults.aiRecommendation?.hasSuggestion && (
                <div className="p-3 bg-amber-50/70 border-b border-amber-100 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>AI Recommendation</span>
                  </div>
                  <p className="text-[11px] text-amber-900/80 mb-2">
                    {searchResults.aiRecommendation.message}
                  </p>
                  {searchResults.aiRecommendation.suggestions?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {searchResults.aiRecommendation.suggestions.map((s, idx) => (
                        <span
                          key={idx}
                          onClick={() => {
                            setIsFocused(false);
                            router.push(s.href);
                          }}
                          className="bg-white border border-amber-200 hover:border-amber-400 text-amber-900 px-2 py-0.5 rounded-lg text-[10.5px] font-semibold cursor-pointer shadow-2xs transition-colors"
                        >
                          {s.name} {s.startingFee ? `(${s.startingFee})` : ""} &rarr;
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

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
                                {cat.categoryType && cat.categoryType !== "GENERAL" && (
                                  <span className="text-[10px] text-amber-700 font-medium block mt-0.5">
                                    {cat.categoryType.replace(/_/g, " ")}
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
                                <div className="flex items-center gap-2 text-[10.5px] text-slate-500 mt-0.5 flex-wrap">
                                  {c.universitiesCount > 0 && <span>{c.universitiesCount} Universities</span>}
                                  {c.subjectsCount > 0 && <span>• {c.subjectsCount} Subjects</span>}
                                  {c.startingFee && (
                                    <span className="text-emerald-700 font-medium">• Starts {c.startingFee}</span>
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
                                <div className="flex items-center gap-2 text-[10.5px] text-slate-500 mt-0.5 flex-wrap">
                                  {(u.city || u.state) && (
                                    <span className="truncate">
                                      {[u.city, u.state].filter(Boolean).join(", ")}
                                    </span>
                                  )}
                                  {u.programsCount > 0 && <span>• {u.programsCount} Programs</span>}
                                  {u.startingFee && (
                                    <span className="text-emerald-700 font-medium">• {u.startingFee}</span>
                                  )}
                                </div>
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
