"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button, Empty, Input, Pagination, Select } from "antd";
import { StarFilled, SwapOutlined } from "@ant-design/icons";
import {
  Landmark,
  GraduationCap,
  MapPin,
  ShieldCheck,
  FileText,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCompare } from "@/hooks/useCompare";
import Container from "@/components/common/Container";
import { request } from "@/services/request";

function resolveCategoryMatch(paramVal, options = []) {
  if (!paramVal) return null;
  const raw = String(paramVal).trim().toLowerCase();
  const clean = raw.replace(/^top-?/i, "").replace(/[^a-z0-9]/g, "");

  // 1. Direct match on option value, label or slug
  const directMatch = options.find((opt) => {
    const val = String(opt.value || "").toLowerCase();
    const lbl = String(opt.label || "").toLowerCase();
    const slg = String(opt.slug || "").toLowerCase();
    return val === raw || lbl === raw || slg === raw;
  });
  if (directMatch) return directMatch.value;

  // 2. Normalized match (without "top-")
  const normMatch = options.find((opt) => {
    const valClean = String(opt.value || "").toLowerCase().replace(/^top-?/i, "").replace(/[^a-z0-9]/g, "");
    const lblClean = String(opt.label || "").toLowerCase().replace(/^top-?/i, "").replace(/[^a-z0-9]/g, "");
    const slgClean = String(opt.slug || "").toLowerCase().replace(/^top-?/i, "").replace(/[^a-z0-9]/g, "");
    return (
      valClean === clean ||
      lblClean === clean ||
      slgClean === clean ||
      (clean && (valClean.includes(clean) || clean.includes(valClean)))
    );
  });
  if (normMatch) return normMatch.value;

  return paramVal;
}

function resolveAccreditationMatch(paramVal, options = []) {
  if (!paramVal) return null;
  const raw = String(paramVal).trim().toLowerCase();
  const direct = options.find((opt) => {
    const val = String(opt.value || "").toLowerCase();
    const lbl = String(opt.label || "").toLowerCase();
    return val === raw || lbl === raw || val.includes(raw) || raw.includes(val);
  });
  if (direct) return direct.value;

  if (raw.includes("ugc") || raw.includes("deb")) {
    const ugcOpt = options.find((opt) => String(opt.value || opt.label || "").toLowerCase().includes("ugc"));
    if (ugcOpt) return ugcOpt.value;
  }
  if (raw.includes("naac")) {
    const naacOpt = options.find((opt) => String(opt.value || opt.label || "").toLowerCase().includes("naac"));
    if (naacOpt) return naacOpt.value;
  }
  if (raw.includes("nirf")) {
    const nirfOpt = options.find((opt) => String(opt.value || opt.label || "").toLowerCase().includes("nirf"));
    if (nirfOpt) return nirfOpt.value;
  }
  if (raw.includes("aicte")) {
    const aicteOpt = options.find((opt) => String(opt.value || opt.label || "").toLowerCase().includes("aicte"));
    if (aicteOpt) return aicteOpt.value;
  }
  return paramVal;
}

function resolveCourseMatch(paramVal, options = []) {
  if (!paramVal) return null;
  const raw = String(paramVal).trim().toLowerCase();
  const clean = raw.replace(/^(online|distance|regular)\s+/i, "").replace(/[^a-z0-9]/g, "");

  const match = options.find((opt) => {
    const val = String(opt.value || "").toLowerCase();
    const lbl = String(opt.label || "").toLowerCase();
    const slg = String(opt.slug || "").toLowerCase();
    const valClean = val.replace(/^(online|distance|regular)\s+/i, "").replace(/[^a-z0-9]/g, "");
    const lblClean = lbl.replace(/^(online|distance|regular)\s+/i, "").replace(/[^a-z0-9]/g, "");
    const slgClean = slg.replace(/^(online|distance|regular)\s+/i, "").replace(/[^a-z0-9]/g, "");

    return (
      val === raw ||
      lbl === raw ||
      slg === raw ||
      valClean === clean ||
      lblClean === clean ||
      slgClean === clean ||
      (clean.length >= 2 && (lblClean.includes(clean) || clean.includes(lblClean)))
    );
  });
  return match ? match.value : paramVal;
}

const AVATAR_COLORS = [
  "#1C3569", "#4F46E5", "#0369A1", "#047857", "#B45309",
  "#7C3AED", "#BE185D", "#0E7490", "#9A3412", "#374151",
];

function getAvatarColor(name = "") {
  const idx = (name || "U").charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function resolveMediaUrl(media) {
  if (!media) return null;
  if (typeof media === "string") return media;
  return media.url || media.path || media.src || null;
}

function UniversityCard({ uni }) {
  const router = useRouter();
  const { toggleCompare, compareList, isInCompare, setIsCompareDrawerOpen } = useCompare();
  const [logoErr, setLogoErr] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  if (!uni) return null;

  const name = uni?.name || "University";
  const slug =
    uni?.slug ||
    (uni?.name
      ? uni.name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
      : uni?._id || "");
  const type = uni?.type || uni?.category?.name || (uni?.isTop ? "Top" : (uni?.isFeatured ? "Featured" : ""));
  const location =
    typeof uni?.location === "object" && uni?.location !== null
      ? (uni.location.name || uni.location.formatted || [uni.location.city?.name || uni.location.city, uni.location.state?.name || uni.location.state, uni.location.country?.name || uni.location.country].filter(Boolean).join(", "))
      : (uni?.locationText || uni?.location || [uni?.city?.name, uni?.state?.name, uni?.country?.name].filter(Boolean).join(", ") || "");

  const rawApprovals = Array.isArray(uni?.approvals)
    ? uni.approvals.map((a) => (typeof a === "object" ? a.name || a.code || a.title || "" : a)).filter(Boolean)
    : [];

  const approvals = [...rawApprovals];
  if (uni?.naac_rating?.grade || uni?.naac_rating?.name) {
    approvals.push(`NAAC ${uni.naac_rating.grade || uni.naac_rating.name}`);
  }
  const rating = Number(uni?.rating || uni?.avg_rating || 4.8).toFixed(1);
  const coursesList = Array.isArray(uni?.courses)
    ? uni.courses.map((c) => (typeof c === "object" ? c?.name || c?.displayName || c?.title || "" : c)).filter(Boolean)
    : [];
  const featuredCourse = uni?.featuredCourse || coursesList[0] || "";
  const programsText = coursesList.length > 0 ? coursesList.join(" | ") : "";

  const logoUrl = !logoErr ? resolveMediaUrl(uni?.image) : null;
  const imageSrc = !imgErr ? resolveMediaUrl(uni?.bannerImg || uni?.imageSrc || uni?.image) : null;
  const logoAlt = uni?.image?.name || name;
  const imgAlt = uni?.bannerImg?.name || uni?.imageSrc?.name || name;

  const avatarBg = getAvatarColor(name);
  const inCompare = Boolean(isInCompare(uni) || isInCompare(slug));

  return (
    <div
      className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group h-full"
      suppressHydrationWarning
    >
      <Link
        href={`/universities/${slug}`}
        className="block relative h-32 sm:h-36 w-full overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
        suppressHydrationWarning
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imgAlt}
            title={imgAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="eager"
            priority
            unoptimized
            suppressHydrationWarning
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-base"
            style={{ background: `linear-gradient(135deg, ${avatarBg}22 0%, ${avatarBg}44 100%)` }}
          >
            {name}
          </div>
        )}

        {type && (
          <span className="absolute top-2.5 right-2.5 text-[9px] font-bold uppercase tracking-wider text-white bg-[#072C50]/85 backdrop-blur-xs rounded-full px-2 py-0.5 z-10">
            {type}
          </span>
        )}

        {logoUrl && (
          <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 h-9 sm:h-11 w-24 sm:w-28 flex items-center justify-center z-10" suppressHydrationWarning>
            <div className="relative w-full h-full">
              <Image
                src={logoUrl}
                alt={logoAlt}
                title={logoAlt}
                fill
                unoptimized
                sizes="110px"
                suppressHydrationWarning
                className="object-contain"
                onError={() => setLogoErr(true)}
              />
            </div>
          </div>
        )}
      </Link>

      <div className="pt-3.5 px-3.5 pb-3 flex flex-col flex-1">
        <Link href={`/universities/${slug}`} className="block group-hover:text-blue-600 transition-colors">
          <h3 className="text-sm sm:text-[15px] font-bold text-[#072C50] m-0 leading-tight line-clamp-1">
            {name}
          </h3>
        </Link>

        {location && (
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-0.5">
            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-1 mt-2">
          {approvals.slice(0, 4).map((appr, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50/90 text-blue-600 border border-blue-100/60 leading-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block shrink-0" />
              {appr}
            </span>
          ))}
        </div>

        {programsText ? (
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-0.5">
            <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
              <FileText className="w-2.5 h-2.5 text-slate-400" />
              FEATURED PROGRAM
            </div>
            <div className="text-[11px] font-semibold text-slate-700 line-clamp-2 leading-tight">
              {programsText}
            </div>
          </div>
        ) : null}

        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px]">
            <StarFilled className="text-amber-500 text-[11px]" />
            <span className="font-bold text-slate-700">{rating}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              size="small"
              type={inCompare ? "default" : "dashed"}
              icon={<SwapOutlined className={inCompare ? "text-amber-600 text-xs" : "text-xs"} />}
              onClick={() => {
                const compareItem = {
                  _id: uni._id || slug,
                  slug: slug,
                  name: name,
                  title: name,
                  uniName: name,
                  uniSlug: slug,
                  logoUrl: logoUrl,
                  logoSrc: logoUrl,
                  university: uni,
                };
                if (inCompare) {
                  const slugs = (compareList || [])
                    .map((u) => u.slug || u.uniSlug || u._id || u.id)
                    .filter(Boolean);
                  const combinedSlugs = Array.from(new Set([...slugs, slug])).slice(0, 3);
                  const activeCourse = (typeof window !== "undefined" && window.__CURRENT_PAGE_COURSES__?.[0]) || "";
                  router.push(`/tools/compare-universities?university=${encodeURIComponent(combinedSlugs.join(","))}${activeCourse ? `&course=${encodeURIComponent(activeCourse)}` : ""}`);
                } else {
                  toggleCompare(compareItem);
                  setIsCompareDrawerOpen(true);
                }
              }}
              className={`font-semibold rounded-md h-7 px-2 text-[11px] cursor-pointer ${inCompare
                ? "border-amber-500 bg-amber-50 text-amber-700 hover:bg-amber-100"
                : "border-slate-300 text-slate-600 hover:border-slate-400"
                }`}
            >
              {inCompare ? "Compare Now" : "+ Compare"}
            </Button>

            <Link href={`/universities/${slug}`}>
              <Button
                size="small"
                type="primary"
                className="bg-[#072C50] hover:bg-[#0c3966]! border-none font-bold rounded-md h-7 px-2.5 cursor-pointer text-[11px]"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UniversitiesPageClientView({
  initialUniversities = [],
  initialOptions = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ITEMS_PER_PAGE = 12;
  const [allUniversities] = useState(initialUniversities);
  const [filterOptions, setFilterOptions] = useState(initialOptions);
  const [serverSearchResults, setServerSearchResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedAccreditation, setSelectedAccreditation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const updateUrlParam = (key, value) => {
    const current = new URLSearchParams(Array.from(searchParams?.entries() || []));
    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.replace(`/universities${query}`, { scroll: false });
  };

  // ⏱️ Debounce search term by 300ms to avoid unnecessary load
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 🚀 Fetch filter options from backend API if not pre-populated
  useEffect(() => {
    if (filterOptions) return;
    let isMounted = true;

    request
      .dynamicList({
        entity: "universities",
        endPoint: "v1/list/options",
        revalidate: 900,
      })
      .then((res) => {
        if (!isMounted) return;
        if (res?.result) {
          setFilterOptions(res.result);
        }
      })
      .catch(() => { });

    return () => {
      isMounted = false;
    };
  }, [filterOptions]);

  // 🚀 Fetch search results from Redis-cached backend API on debounced search
  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    if (!trimmed) {
      setServerSearchResults(null);
      setIsSearching(false);
      return;
    }

    let isMounted = true;
    setIsSearching(true);

    request
      .dynamicList({
        entity: "universities",
        endPoint: "v1/list",
        options: {
          search: trimmed,
          items: 100,
        },
        revalidate: 900,
      })
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res?.result) ? res.result : (Array.isArray(res) ? res : []);
        setServerSearchResults(list);
        setIsSearching(false);
      })
      .catch(() => {
        if (isMounted) {
          setIsSearching(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [debouncedSearch]);

  const activeUniversities = useMemo(() => {
    return serverSearchResults !== null ? serverSearchResults : allUniversities;
  }, [serverSearchResults, allUniversities]);

  const statesList = useMemo(() => {
    const s = new Set();
    allUniversities.forEach((u) => {
      const st = u?.state?.name || u?.state;
      if (st && typeof st === "string") s.add(st);
    });
    return Array.from(s).sort();
  }, [allUniversities]);

  // 🏛️ Dynamic Primary Categories from API (Certifications, Bachelors, Masters, Doctorate)
  const categoryOptions = useMemo(() => {
    const list = [];
    const sourceList = filterOptions?.categories || [];
    const seen = new Set();

    sourceList.forEach((c) => {
      if (!c) return;
      const rawVal = c.slug || c.value || c._id;
      const lbl = c.label || c.name || rawVal;
      const val = String(rawVal).toLowerCase().trim();
      if (/^top\s+/i.test(lbl) || val === "top-courses") return;

      if (!seen.has(val)) {
        seen.add(val);
        list.push({
          value: val,
          label: lbl,
          slug: val,
        });
      }
    });

    if (list.length === 0) {
      return [
        { value: "certifications", label: "Certifications", slug: "certifications" },
        { value: "bachelors", label: "Bachelors", slug: "bachelors" },
        { value: "masters", label: "Masters", slug: "masters" },
        { value: "doctorate", label: "Doctorate", slug: "doctorate" },
      ];
    }
    return list;
  }, [filterOptions?.categories]);

  // 🎓 All Dynamic Courses with categorySlug linking
  const allCourseOptions = useMemo(() => {
    const list = [];
    const sourceList = filterOptions?.courses || [];
    const seen = new Set();

    sourceList.forEach((c) => {
      if (!c) return;
      const lbl = (c.label || c.name || c.displayName || "").trim();
      if (!lbl) return;

      const rawVal = c.slug || c.value || lbl.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const val = String(rawVal).toLowerCase().trim();
      const catSlug = String(c.categorySlug || "").toLowerCase().trim();
      const normKey = lbl.toUpperCase().replace(/[^A-Z0-9]/g, "");

      if (!seen.has(normKey)) {
        seen.add(normKey);
        const truncatedLabel = lbl.length > 30 ? `${lbl.slice(0, 30).trim()}...` : lbl;
        list.push({
          value: val,
          label: truncatedLabel,
          title: lbl,
          fullLabel: lbl,
          slug: val,
          name: lbl,
          categorySlug: catSlug,
        });
      }
    });
    return list;
  }, [filterOptions?.courses]);

  // 🎓 Cascading visible courses based on selected Category
  const visibleCourseOptions = useMemo(() => {
    if (!selectedTop) return allCourseOptions;
    const targetCat = String(selectedTop).toLowerCase().trim();

    return allCourseOptions.filter((c) => {
      if (!c.categorySlug) return true;
      const cat = c.categorySlug.toLowerCase();
      return cat === targetCat || cat.includes(targetCat) || targetCat.includes(cat);
    });
  }, [allCourseOptions, selectedTop]);

  // 📍 Dynamic States from API
  const stateOptions = useMemo(() => {
    if (Array.isArray(filterOptions?.states) && filterOptions.states.length > 0) {
      return filterOptions.states.map((st) => ({
        value: typeof st === "object" ? st.value || st.label || st.name : st,
        label: typeof st === "object" ? st.label || st.name || st.value : st,
      }));
    }
    return statesList.map((st) => ({ value: st, label: st }));
  }, [filterOptions, statesList]);

  // 🛡️ Dynamic Accreditations from API
  const accreditationOptions = useMemo(() => {
    if (Array.isArray(filterOptions?.accreditations) && filterOptions.accreditations.length > 0) {
      return filterOptions.accreditations.map((a) => ({
        value: typeof a === "object" ? a.value || a.name || a.code : a,
        label: typeof a === "object" ? a.label || a.name || a.code : a,
      }));
    }
    return [];
  }, [filterOptions]);

  const handleCategoryChange = (catVal) => {
    const cleanVal = catVal ? String(catVal).toLowerCase().trim() : null;
    setSelectedTop(cleanVal);
    setCurrentPage(1);
    updateUrlParam("category", cleanVal);

    // If current course doesn't belong to the new category, reset course
    if (selectedCourse && cleanVal) {
      const courseObj = allCourseOptions.find((c) => {
        const cVal = String(c.value).toLowerCase();
        const cSlug = String(c.slug).toLowerCase();
        const cLbl = String(c.label).toLowerCase();
        const sel = String(selectedCourse).toLowerCase();
        return cVal === sel || cSlug === sel || cLbl === sel;
      });

      if (courseObj && courseObj.categorySlug) {
        const cCat = courseObj.categorySlug.toLowerCase();
        if (cCat !== cleanVal && !cCat.includes(cleanVal) && !cleanVal.includes(cCat)) {
          setSelectedCourse(null);
          updateUrlParam("course", null);
        }
      }
    }
  };

  const handleCourseChange = (courseVal) => {
    const cleanVal = courseVal ? String(courseVal).toLowerCase().trim() : null;
    setSelectedCourse(cleanVal);
    setCurrentPage(1);
    updateUrlParam("course", cleanVal);

    // Auto-select parent category if course belongs to one
    if (cleanVal) {
      const courseObj = allCourseOptions.find((c) => {
        const cVal = String(c.value).toLowerCase();
        const cSlug = String(c.slug).toLowerCase();
        const cLbl = String(c.label).toLowerCase();
        return cVal === cleanVal || cSlug === cleanVal || cLbl === cleanVal;
      });

      if (courseObj && courseObj.categorySlug) {
        const catSlug = courseObj.categorySlug.toLowerCase();
        const matchedCat = categoryOptions.find(
          (cat) => cat.value.toLowerCase() === catSlug || cat.slug.toLowerCase() === catSlug
        );
        if (matchedCat && (!selectedTop || selectedTop !== matchedCat.value)) {
          setSelectedTop(matchedCat.value);
          updateUrlParam("category", matchedCat.value);
        }
      }
    }
  };

  // 🔗 Sync state with URL search parameters
  useEffect(() => {
    if (!searchParams) return;
    const cat = searchParams.get("category") || searchParams.get("type") || searchParams.get("top");
    const crs = searchParams.get("course");
    const st = searchParams.get("state");
    const appr = searchParams.get("accreditation") || searchParams.get("approval");
    const q = searchParams.get("search") || searchParams.get("q");

    let resolvedCourse = null;
    if (crs) {
      resolvedCourse = resolveCourseMatch(crs, allCourseOptions);
      setSelectedCourse(resolvedCourse);
    } else {
      setSelectedCourse(null);
    }

    if (cat) {
      const resolved = resolveCategoryMatch(cat, categoryOptions);
      setSelectedTop(resolved);
    } else if (resolvedCourse) {
      // Auto-select category if course is in URL
      const courseObj = allCourseOptions.find(
        (c) =>
          String(c.value).toLowerCase() === String(resolvedCourse).toLowerCase() ||
          String(c.slug).toLowerCase() === String(resolvedCourse).toLowerCase() ||
          String(c.label).toLowerCase() === String(resolvedCourse).toLowerCase()
      );
      if (courseObj && courseObj.categorySlug) {
        const matchedCat = categoryOptions.find(
          (opt) => opt.value === courseObj.categorySlug || opt.slug === courseObj.categorySlug
        );
        if (matchedCat) {
          setSelectedTop(matchedCat.value);
        }
      }
    } else {
      setSelectedTop(null);
    }

    if (st) {
      setSelectedState(st);
    } else {
      setSelectedState(null);
    }

    if (appr) {
      const resolved = resolveAccreditationMatch(appr, accreditationOptions);
      setSelectedAccreditation(resolved);
    } else {
      setSelectedAccreditation(null);
    }

    if (q) {
      setSearchTerm(q);
      setDebouncedSearch(q);
    }
  }, [searchParams, categoryOptions, allCourseOptions, stateOptions, accreditationOptions]);

  const resetFilters = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    setServerSearchResults(null);
    setSelectedTop(null);
    setSelectedCourse(null);
    setSelectedState(null);
    setSelectedAccreditation(null);
    setCurrentPage(1);
    router.replace("/universities", { scroll: false });
  };

  const filtered = useMemo(() => {
    return activeUniversities.filter((uni) => {
      const name = (uni?.name || "").toLowerCase();
      const loc = (typeof uni?.location === "object" && uni?.location !== null
        ? (uni.location.name || uni.location.formatted || "")
        : (uni?.locationText || uni?.location || "")).toLowerCase();
      const stateName = (uni?.location?.state?.name || uni?.state?.name || uni?.state || "").toLowerCase();
      const q = searchTerm.trim().toLowerCase();

      if (q && !name.includes(q) && !loc.includes(q) && !stateName.includes(q)) {
        return false;
      }

      if (selectedState) {
        const selSt = selectedState.toLowerCase().trim();
        if (stateName !== selSt && !loc.includes(selSt)) {
          return false;
        }
      }

      if (selectedAccreditation) {
        const rawApps = Array.isArray(uni?.approvals)
          ? uni.approvals.map((a) => (typeof a === "object" ? a.name || a.code || a.title || "" : String(a)).toUpperCase())
          : [];
        const target = selectedAccreditation.toUpperCase().trim();
        const normTarget = target.replace(/[^A-Z0-9]/g, "");
        const hasApproval = rawApps.some((a) => {
          const normA = a.replace(/[^A-Z0-9]/g, "");
          return normA.includes(normTarget) || normTarget.includes(normA) || a.includes(target) || target.includes(a);
        });
        const hasNaac = target.includes("NAAC") && Boolean(uni?.naac_rating?.grade || uni?.naac_rating?.name);
        if (!hasApproval && !hasNaac) return false;
      }

      if (selectedTop) {
        const selCat = String(selectedTop).toLowerCase().trim();
        const selCatNorm = selCat.replace(/[^a-z0-9]/g, "");

        // 1. Check university categorySlugs (from uniCourses + direct categories)
        const uniCatSlugs = Array.isArray(uni?.categorySlugs)
          ? uni.categorySlugs.map((s) => String(s).toLowerCase().trim())
          : [];

        // 2. Check direct university categories
        const uniCats = Array.isArray(uni?.category)
          ? uni.category
          : (uni?.category ? [uni.category] : []);
        const directCatSlugs = uniCats.map((c) =>
          typeof c === "object" ? String(c.slug || c.name || "").toLowerCase() : String(c).toLowerCase()
        );

        // 3. Inferred categories from university course names
        const uniCourses = Array.isArray(uni?.courses)
          ? uni.courses.map((c) => (typeof c === "object" ? c?.name || c?.displayName || "" : String(c)))
          : [];
        const inferredCourseCats = [];
        uniCourses.forEach((cn) => {
          const ucn = String(cn).toUpperCase();
          if (/^M\b|^MASTER|MBA|MCA|MSC|MCOM|MA\b/i.test(ucn) && !/DIPLOMA/i.test(ucn)) inferredCourseCats.push("masters");
          if (/^B\b|^BACHELOR|BBA|BCA|BSC|BCOM|BA\b|BTECH/i.test(ucn) && !/DIPLOMA/i.test(ucn)) inferredCourseCats.push("bachelors");
          if (/PHD|DOCTOR|DBA/i.test(ucn)) inferredCourseCats.push("doctorate");
          if (/CERTIFICATE/i.test(ucn)) inferredCourseCats.push("certifications");
        });

        const allUniCategories = [...uniCatSlugs, ...directCatSlugs, ...inferredCourseCats];

        const hasCategory = allUniCategories.some((cat) => {
          const catNorm = cat.replace(/[^a-z0-9]/g, "");
          return cat === selCat || catNorm === selCatNorm;
        });

        if (!hasCategory) return false;
      }

      if (selectedCourse) {
        const selCourse = String(selectedCourse).toLowerCase().trim();
        const selCourseNorm = selCourse.replace(/^(online|distance|regular)\s+/i, "").replace(/[^a-z0-9]/g, "");

        const uniCourseSlugs = Array.isArray(uni?.courseSlugs)
          ? uni.courseSlugs.map((s) => String(s).toLowerCase())
          : [];

        const uniCourses = Array.isArray(uni?.courses)
          ? uni.courses.map((c) => (typeof c === "object" ? c?.name || c?.displayName || "" : String(c)).toLowerCase())
          : [];

        const hasCourse =
          uniCourseSlugs.some((s) => s === selCourse || s === selCourseNorm || s.includes(selCourseNorm)) ||
          uniCourses.some((c) => {
            const cClean = c.replace(/^(online|distance|regular)\s+/i, "").replace(/[^a-z0-9]/g, "");
            return (
              c === selCourse ||
              cClean === selCourseNorm ||
              cClean.includes(selCourseNorm) ||
              (selCourseNorm.length >= 3 && selCourseNorm.includes(cClean))
            );
          });

        if (!hasCourse) return false;
      }

      return true;
    });
  }, [activeUniversities, searchTerm, selectedTop, selectedCourse, selectedState, selectedAccreditation]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUniversities = useMemo(() => {
    return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filtered, startIndex]);

  const hasActiveFilters = Boolean(searchTerm || selectedTop || selectedCourse || selectedState || selectedAccreditation);

  return (
    <Container>
      <div className="w-full bg-[#072C50] rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 shadow-none relative overflow-hidden mb-3 lg:mb-4 mt-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#F3CE7F]/15 border border-[#F3CE7F]/30 flex items-center justify-center shrink-0">
              <Landmark className="w-5 h-5 sm:w-6 sm:h-6 text-[#F3CE7F]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-none m-0 tracking-tight font-sans">
                Find India’s Top <span className="text-[#F3CE7F]">UGC- DEB Approved</span> Universities for You
              </h1>
              <h2 className="text-xs sm:text-sm lg:text-[15px] font-medium text-slate-200/90 mt-0.5 sm:mt-1 leading-tight m-0">
                Explore Top UGC-DEB-Approved Universities
              </h2>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 flex flex-col lg:flex-row items-stretch lg:items-center gap-2 sm:gap-2.5 w-full">
          <Input.Search
            className="w-full lg:flex-1 lg:min-w-55"
            allowClear
            loading={isSearching}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            onSearch={(val) => {
              setSearchTerm(val);
              setDebouncedSearch(val);
              setCurrentPage(1);
            }}
            placeholder="Search Universities Amity, Manipal, LPU etc.........."
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex items-center gap-2 sm:gap-2.5 w-full lg:w-auto">
            <Select
              value={selectedTop}
              onChange={handleCategoryChange}
              placeholder={
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Landmark className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  Select Category
                </span>
              }
              options={categoryOptions}
              allowClear
              className="w-full lg:w-auto lg:min-w-41.25"
              popupMatchSelectWidth={false}
            />

            <Select
              value={selectedCourse}
              onChange={handleCourseChange}
              placeholder={
                <span className="flex items-center gap-1.5 text-slate-700">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  Select Course
                </span>
              }
              options={visibleCourseOptions}
              allowClear
              className="w-full lg:w-auto lg:min-w-36.25"
              popupMatchSelectWidth={false}
              styles={{ popup: { root: { maxWidth: 300 } } }}
              classNames={{ popup: { root: "max-w-[300px]" } }}
            />

            <Select
              value={selectedState}
              onChange={(val) => {
                setSelectedState(val);
                setCurrentPage(1);
                updateUrlParam("state", val);
              }}
              placeholder={
                <span className="flex items-center gap-1.5 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  Select State
                </span>
              }
              options={stateOptions}
              allowClear
              className="w-full lg:w-auto lg:min-w-36.25"
              popupMatchSelectWidth={false}
            />

            <Select
              value={selectedAccreditation}
              onChange={(val) => {
                setSelectedAccreditation(val);
                setCurrentPage(1);
                updateUrlParam("accreditation", val);
              }}
              placeholder={
                <span className="flex items-center gap-1.5 text-slate-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  Select Accreditation
                </span>
              }
              options={accreditationOptions}
              allowClear
              className="w-full lg:w-auto lg:min-w-41.25"
              popupMatchSelectWidth={false}
            />
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-slate-300">Active Filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md border border-white/20">
                Search: &quot;{searchTerm}&quot;
                <X
                  className="w-3 h-3 cursor-pointer hover:text-amber-300"
                  onClick={() => {
                    setSearchTerm("");
                    setDebouncedSearch("");
                    updateUrlParam("search", null);
                  }}
                />
              </span>
            )}
            {selectedTop && (
              <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md border border-white/20">
                Category: {categoryOptions.find((o) => o.value === selectedTop)?.label || selectedTop}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-amber-300"
                  onClick={() => {
                    handleCategoryChange(null);
                  }}
                />
              </span>
            )}
            {selectedCourse && (
              <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md border border-white/20">
                Course: {allCourseOptions.find((o) => o.value === selectedCourse || o.slug === selectedCourse)?.label || selectedCourse}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-amber-300"
                  onClick={() => {
                    handleCourseChange(null);
                  }}
                />
              </span>
            )}
            {selectedState && (
              <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md border border-white/20">
                State: {selectedState}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-amber-300"
                  onClick={() => {
                    setSelectedState(null);
                    updateUrlParam("state", null);
                  }}
                />
              </span>
            )}
            {selectedAccreditation && (
              <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md border border-white/20">
                Accreditation: {accreditationOptions.find((o) => o.value === selectedAccreditation)?.label || selectedAccreditation}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-amber-300"
                  onClick={() => {
                    setSelectedAccreditation(null);
                    updateUrlParam("accreditation", null);
                  }}
                />
              </span>
            )}
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] font-bold text-amber-300 hover:text-amber-200 underline cursor-pointer ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedUniversities.map((uni) => (
              <UniversityCard key={uni?.slug || String(uni?._id)} uni={uni} />
            ))}
          </div>

          {filtered.length > ITEMS_PER_PAGE && (
            <div className="flex justify-end items-center m-5">
              <Pagination
                current={currentPage}
                pageSize={ITEMS_PER_PAGE}
                total={filtered.length}
                onChange={(page) => {
                  setCurrentPage(page);
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                showSizeChanger={false}
                showTotal={(totalCount, range) => (
                  <span className="text-xs font-semibold text-slate-500 mr-2">
                    Showing {range[0]}–{range[1]} of {totalCount} universities
                  </span>
                )}
              />
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 py-20 text-center">
          <Empty
            description={
              <span className="text-slate-400 text-base font-medium">
                No universities match your search criteria.
              </span>
            }
          />
        </div>
      )}
    </Container>
  );
}
