"use client";

import React, { useState, useMemo } from "react";
import { Button, Empty, Input, Pagination, Select } from "antd";
import { StarFilled, SwapOutlined } from "@ant-design/icons";
import {
  Landmark,
  GraduationCap,
  MapPin,
  ShieldCheck,
  FileText,
  RotateCcw,
  Filter,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCompare } from "@/hooks/useCompare";
import { getAssetPath } from "@/lib/utils";
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
  const location = uni?.location || [uni?.city?.name, uni?.state?.name, uni?.country?.name].filter(Boolean).join(", ") || "";

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
    ? uni.courses.map((c) => (typeof c === "object" ? c?.name || c?.title || "" : c)).filter(Boolean)
    : [];
  const featuredCourse = uni?.featuredCourse || coursesList[0] || "";
  const programsText = coursesList.length > 0
    ? coursesList.slice(0, 6).join(" | ")
    : "MBA | MCA | MCOM | MSC | BBA | BA";

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

        <div className="absolute -bottom-3 left-3 h-8.5 sm:h-9 w-24 sm:w-26 bg-white rounded-md border border-slate-200/90 shadow-sm flex items-center justify-center p-1 z-10 overflow-hidden">
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

        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-col gap-0.5">
          <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
            <FileText className="w-2.5 h-2.5 text-slate-400" />
            FEATURED PROGRAM
          </div>
          <div className="text-[11px] font-semibold text-slate-700 line-clamp-1 leading-tight">
            {programsText}
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
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

export default function UniversitiesPageClientView({ initialUniversities = [] }) {
  const ITEMS_PER_PAGE = 12;

  const [allUniversities] = useState(initialUniversities);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedAccreditation, setSelectedAccreditation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const statesList = useMemo(() => {
    const s = new Set();
    allUniversities.forEach((u) => {
      const st = u?.state?.name || u?.state;
      if (st && typeof st === "string") s.add(st);
    });
    return Array.from(s).sort();
  }, [allUniversities]);

  const topOptions = [
    { value: "top10", label: "Top 10 Universities" },
    { value: "naac_a", label: "NAAC A+ & A++" },
    { value: "featured", label: "Featured Universities" },
    { value: "gov", label: "Government / Central" },
  ];

  const courseOptions = [
    { value: "MBA", label: "Online MBA" },
    { value: "MCA", label: "Online MCA" },
    { value: "BBA", label: "Online BBA" },
    { value: "BCA", label: "Online BCA" },
    { value: "MCOM", label: "Online M.Com" },
    { value: "BCOM", label: "Online B.Com" },
    { value: "MSC", label: "Online M.Sc" },
    { value: "MA", label: "Online MA" },
    { value: "BA", label: "Online BA" },
  ];

  const stateOptions = useMemo(() => {
    return statesList.map((st) => ({ value: st, label: st }));
  }, [statesList]);

  const accreditationOptions = [
    { value: "UGC", label: "UGC Approved" },
    { value: "UGC-DEB", label: "UGC-DEB Approved" },
    { value: "NAAC", label: "NAAC Accredited" },
    { value: "AICTE", label: "AICTE Approved" },
    { value: "AIU", label: "AIU Member" },
    { value: "WES", label: "WES Recognized" },
    { value: "NIRF", label: "NIRF Ranked" },
  ];

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedTop(null);
    setSelectedCourse(null);
    setSelectedState(null);
    setSelectedAccreditation(null);
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    return allUniversities.filter((uni) => {
      const name = (uni?.name || "").toLowerCase();
      const loc = (uni?.location || "").toLowerCase();
      const stateName = (uni?.state?.name || uni?.state || "").toLowerCase();
      const q = searchTerm.trim().toLowerCase();

      if (q && !name.includes(q) && !loc.includes(q) && !stateName.includes(q)) {
        return false;
      }

      if (selectedState && stateName !== selectedState.toLowerCase()) {
        return false;
      }

      if (selectedAccreditation) {
        const rawApps = Array.isArray(uni?.approvals)
          ? uni.approvals.map((a) => (typeof a === "object" ? a.name || a.code || "" : a).toUpperCase())
          : [];
        const target = selectedAccreditation.toUpperCase();
        const hasApproval = rawApps.some((a) => a.includes(target));
        const hasNaac = target.includes("NAAC") && Boolean(uni?.naac_rating?.grade || uni?.naac_rating?.name);
        if (!hasApproval && !hasNaac) return false;
      }

      if (selectedTop) {
        if (selectedTop === "top10" && !uni?.isTop) {
          return true;
        }
        if (selectedTop === "naac_a") {
          const grade = (uni?.naac_rating?.grade || uni?.naac_rating?.name || "").toUpperCase();
          if (!grade.includes("A")) return false;
        }
        if (selectedTop === "featured" && !uni?.isFeatured) {
          return false;
        }
        if (selectedTop === "gov") {
          const typeStr = (uni?.type || "").toLowerCase();
          if (!typeStr.includes("gov") && !typeStr.includes("central")) return false;
        }
      }

      if (selectedCourse) {
        const cTarget = selectedCourse.toLowerCase();
        const uniCourses = Array.isArray(uni?.courses)
          ? uni.courses.map((c) => (typeof c === "object" ? c?.name || c?.title || "" : c).toLowerCase())
          : [];
        if (uniCourses.length > 0 && !uniCourses.some((c) => c.includes(cTarget))) {
          return false;
        }
      }

      return true;
    });
  }, [allUniversities, searchTerm, selectedTop, selectedCourse, selectedState, selectedAccreditation]);

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

        <div className="mt-3 block lg:hidden w-full">
          <Input.Search
            className="w-full"
            allowClear
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            onSearch={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
            placeholder="Search Universities Amity, Manipal, LPU etc.........."
          />
        </div>

        <div className="mt-2 sm:mt-4 hidden lg:flex flex-wrap lg:flex-nowrap items-center gap-2 sm:gap-2.5 w-full">
          <Input.Search
            className="flex-1 min-w-55"
            allowClear
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            onSearch={(val) => {
              setSearchTerm(val);
              setCurrentPage(1);
            }}
            placeholder="Search Universities Amity, Manipal, LPU etc.........."
          />

          <Select
            value={selectedTop}
            onChange={(val) => {
              setSelectedTop(val);
              setCurrentPage(1);
            }}
            placeholder={
              <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                <Landmark className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                Top 10 Universities
              </span>
            }
            options={topOptions}
            allowClear
            className="w-auto min-w-[165px] font-bold"
            popupMatchSelectWidth={false}
          />

          <Select
            value={selectedCourse}
            onChange={(val) => {
              setSelectedCourse(val);
              setCurrentPage(1);
            }}
            placeholder={
              <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                <GraduationCap className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                Online MBA
              </span>
            }
            options={courseOptions}
            allowClear
            className="w-auto min-w-36.25 font-bold"
            popupMatchSelectWidth={false}
          />

          <Select
            value={selectedState}
            onChange={(val) => {
              setSelectedState(val);
              setCurrentPage(1);
            }}
            placeholder={
              <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                Select State
              </span>
            }
            options={stateOptions}
            allowClear
            className="w-auto min-w-[145px] font-bold"
            popupMatchSelectWidth={false}
          />

          <Select
            value={selectedAccreditation}
            onChange={(val) => {
              setSelectedAccreditation(val);
              setCurrentPage(1);
            }}
            placeholder={
              <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                Select Accreditation
              </span>
            }
            options={accreditationOptions}
            allowClear
            className="w-auto min-w-[165px] font-bold"
            popupMatchSelectWidth={false}
          />
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

      <div className="block lg:hidden mb-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-md flex items-center justify-center text-gray-800">
              <Filter className="w-3 h-3 fill-current" />
            </div>
            <span className="font-bold text-slate-800 text-sm">Filter</span>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="text-red-500 hover:text-red-600 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Clear Filter
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2.5">
          <Select
            value={selectedTop}
            onChange={(val) => {
              setSelectedTop(val);
              setCurrentPage(1);
            }}
            placeholder={
              <span className="flex items-center gap-1.5 text-slate-700 font-bold truncate">
                <Landmark className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                Top 10 Universities
              </span>
            }
            options={topOptions}
            allowClear
            className="w-full font-bold"
            popupMatchSelectWidth={false}
          />

          <Select
            value={selectedCourse}
            onChange={(val) => {
              setSelectedCourse(val);
              setCurrentPage(1);
            }}
            placeholder={
              <span className="flex items-center gap-1.5 text-slate-700 font-bold truncate">
                <GraduationCap className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                Online MBA
              </span>
            }
            options={courseOptions}
            allowClear
            className="w-full font-bold"
            popupMatchSelectWidth={false}
          />

          <Select
            value={selectedAccreditation}
            onChange={(val) => {
              setSelectedAccreditation(val);
              setCurrentPage(1);
            }}
            placeholder={
              <span className="flex items-center gap-1.5 text-slate-700 font-bold truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                Select Accreditation
              </span>
            }
            options={accreditationOptions}
            allowClear
            className="w-full font-bold"
            popupMatchSelectWidth={false}
          />

          <Select
            value={selectedState}
            onChange={(val) => {
              setSelectedState(val);
              setCurrentPage(1);
            }}
            placeholder={
              <span className="flex items-center gap-1.5 text-slate-700 font-bold truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                Select State
              </span>
            }
            options={stateOptions}
            allowClear
            className="w-full font-bold"
            popupMatchSelectWidth={false}
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedUniversities.map((uni) => (
              <UniversityCard key={uni?.slug || String(uni?._id)} uni={uni} />
            ))}
          </div>

          {filtered.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center items-center mt-8 sm:mt-10 pt-6 border-t border-slate-200/80">
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
                  <span className="text-xs font-semibold text-slate-500">
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
