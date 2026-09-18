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
import { useCompare } from "@/hooks/useCompare";
import { getAssetPath } from "@/lib/utils";
import { request } from "@/services/request";
import Container from "../common/Container";

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
  return getAssetPath(media, null);
}

function UniversityCard({ uni }) {
  const { toggleCompare, isInCompare } = useCompare();
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
  const reviewsCount = typeof uni?.reviewsCount === "number" ? uni.reviewsCount : 250;

  const coursesList = Array.isArray(uni?.courses)
    ? uni.courses.map((c) => (typeof c === "object" ? c?.name || c?.displayName || c?.title || "" : c)).filter(Boolean)
    : [];
  const featuredCourse = uni?.featuredCourse || coursesList[0] || "";
  const programsText = coursesList.length > 0 ? coursesList.join(" | ") : "";

  const logoUrl = !logoErr ? resolveMediaUrl(uni?.image || uni?.logoSrc || uni?.logo) : null;
  const imageSrc = !imgErr ? resolveMediaUrl(uni?.bannerImg || uni?.imageSrc || uni?.image) : null;
  const logoAlt = uni?.image?.name || uni?.logoSrc?.name || uni?.logo?.name || name;
  const imgAlt = uni?.bannerImg?.name || uni?.imageSrc?.name || name;

  const avatarBg = getAvatarColor(name);
  const inCompare = isInCompare(slug);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group h-full">
      <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-slate-100 shrink-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imgAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="eager"
            priority
            unoptimized
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

        <div className="absolute -bottom-3 left-0 h-9 sm:h-12 w-24 sm:w-26 bg-white rounded-md rounded-tl-none flex items-center justify-center p-1 z-10 overflow-hidden">
          {logoUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={logoUrl}
                alt={logoAlt}
                fill
                unoptimized
                sizes="110px"
                className="object-contain"
                onError={() => setLogoErr(true)}
              />
            </div>
          ) : (
            <span className="text-[#072C50] text-[11px] font-black truncate px-1">{name}</span>
          )}
        </div>
      </div>

      <div className="pt-4.5 px-3.5 pb-3 flex flex-col flex-1">
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
            <span className="text-slate-400 font-normal">({reviewsCount})</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              size="small"
              type={inCompare ? "default" : "dashed"}
              icon={<SwapOutlined className={inCompare ? "text-amber-600 text-xs" : "text-xs"} />}
              onClick={() => {
                const compareItem = {
                  _id: uni._id,
                  slug: slug,
                  title: featuredCourse || `${name} Online Programs`,
                  uniName: name,
                  uniSlug: slug,
                  logoUrl: logoUrl,
                  university: uni,
                };
                toggleCompare(compareItem);
              }}
              className={`font-semibold rounded-md h-7 px-2 text-[11px] cursor-pointer ${inCompare
                ? "border-amber-500 bg-amber-50 text-amber-700"
                : "border-slate-300 text-slate-600 hover:border-slate-400"
                }`}
            >
              {inCompare ? "✓ Comparing" : "+ Compare"}
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

  // 🏛️ Dynamic Categories / Top options from API
  const topOptions = useMemo(() => {
    if (Array.isArray(filterOptions?.categories) && filterOptions.categories.length > 0) {
      return filterOptions.categories.map((c) => ({
        value: c.value || c.slug || c._id,
        label: c.label || c.name,
      }));
    }
    return [];
  }, [filterOptions]);

  // 🎓 Dynamic Courses from API (Deduplicated with actual Mode)
  const courseOptions = useMemo(() => {
    if (Array.isArray(filterOptions?.courses) && filterOptions.courses.length > 0) {
      return filterOptions.courses.map((c) => ({
        value: c.value || c.label || c.name,
        label: c.label || c.name,
      }));
    }
    return [];
  }, [filterOptions]);

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
        label: typeof a === "object" ? a.label || a.title || a.name : a,
      }));
    }
    return [];
  }, [filterOptions]);

  const resetFilters = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    setServerSearchResults(null);
    setSelectedTop(null);
    setSelectedCourse(null);
    setSelectedState(null);
    setSelectedAccreditation(null);
    setCurrentPage(1);
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
        const hasApproval = rawApps.some((a) => a.includes(target) || target.includes(a));
        const hasNaac = target.includes("NAAC") && Boolean(uni?.naac_rating?.grade || uni?.naac_rating?.name);
        if (!hasApproval && !hasNaac) return false;
      }

      if (selectedTop) {
        const sel = selectedTop.toLowerCase();
        const uniCats = Array.isArray(uni?.category)
          ? uni.category
          : (uni?.category ? [uni.category] : []);
        const hasCategory = uniCats.some((c) => {
          if (!c) return false;
          const cSlug = (typeof c === "object" ? (c.slug || "") : "").toLowerCase();
          const cName = (typeof c === "object" ? (c.name || "") : String(c || "")).toLowerCase();
          const cCode = (typeof c === "object" ? (c.code || "") : "").toLowerCase();
          const cId = (typeof c === "object" ? (c._id || "") : "").toString().toLowerCase();
          return (
            (cSlug && cSlug === sel) ||
            (cName && cName === sel) ||
            (cCode && cCode === sel) ||
            (cId && cId === sel) ||
            (cSlug && sel.includes(cSlug)) ||
            (cSlug && cSlug.includes(sel)) ||
            (cName && sel.includes(cName)) ||
            (cName && cName.includes(sel))
          );
        });
        if (!hasCategory) return false;
      }

      if (selectedCourse) {
        const cTarget = selectedCourse
          .toLowerCase()
          .replace(/^(online|distance|regular)\s+/i, "")
          .replace(/[^a-z0-9]/g, "");
        const uniCourses = Array.isArray(uni?.courses)
          ? uni.courses.map((c) => (typeof c === "object" ? c?.name || c?.displayName || c?.title || "" : String(c)).toLowerCase().replace(/[^a-z0-9]/g, ""))
          : [];
        if (uniCourses.length > 0 && !uniCourses.some((c) => c === cTarget || c.includes(cTarget))) {
          return false;
        }
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
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight m-0 tracking-tight font-sans">
                Find India’s Top <span className="text-[#F3CE7F]">UGC- DEB Approved</span> Universities for You
              </h1>
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
              onChange={(val) => {
                setSelectedTop(val);
                setCurrentPage(1);
              }}
              placeholder={
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Landmark className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  Select Category
                </span>
              }
              options={topOptions}
              allowClear
              className="w-full lg:w-auto lg:min-w-41.25"
              popupMatchSelectWidth={false}
            />

            <Select
              value={selectedCourse}
              onChange={(val) => {
                setSelectedCourse(val);
                setCurrentPage(1);
              }}
              placeholder={
                <span className="flex items-center gap-1.5 text-slate-700">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  Select Course
                </span>
              }
              options={courseOptions}
              allowClear
              className="w-full lg:w-auto lg:min-w-36.25"
              popupMatchSelectWidth={false}
            />

            <Select
              value={selectedState}
              onChange={(val) => {
                setSelectedState(val);
                setCurrentPage(1);
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
                <X className="w-3 h-3 cursor-pointer hover:text-amber-300" onClick={() => setSearchTerm("")} />
              </span>
            )}
            {selectedTop && (
              <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md border border-white/20">
                {selectedTop}
                <X className="w-3 h-3 cursor-pointer hover:text-amber-300" onClick={() => setSelectedTop(null)} />
              </span>
            )}
            {selectedCourse && (
              <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md border border-white/20">
                {selectedCourse}
                <X className="w-3 h-3 cursor-pointer hover:text-amber-300" onClick={() => setSelectedCourse(null)} />
              </span>
            )}
            {selectedState && (
              <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md border border-white/20">
                {selectedState}
                <X className="w-3 h-3 cursor-pointer hover:text-amber-300" onClick={() => setSelectedState(null)} />
              </span>
            )}
            {selectedAccreditation && (
              <span className="inline-flex items-center gap-1 bg-white/15 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md border border-white/20">
                {selectedAccreditation}
                <X className="w-3 h-3 cursor-pointer hover:text-amber-300" onClick={() => setSelectedAccreditation(null)} />
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
