"use client";

import React, { useState, useEffect, useMemo, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input, Button, Drawer, Tag, Breadcrumb, Spin, Select, Pagination } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  RightOutlined,
  ReloadOutlined,
  BookOutlined,
  PhoneFilled,
  ClockCircleFilled,
  SortAscendingOutlined,
  LoadingOutlined
} from "@ant-design/icons";

import { FormModalContext } from "@/context/FormModalContext";
import { getAssetPath } from "@/lib/utils";
import { getWebsiteCoursesFilter } from "@/services/api";
import { useSearchParams } from "next/navigation";

import WebsiteLayout from "@/components/layout/WebsiteLayout";

// Reusable Sidebar Filter Component defined OUTSIDE to maintain stable React DOM identity
function FilterSidebarContent({
  activeFilterCount,
  handleClearFilters,
  searchInputValue,
  setSearchInputValue,
  setAppliedSearchTerm,
  activeCategoryTab,
  setActiveCategoryTab,
  categoryTabs = [],
  durationOptions = [],
  sortBy,
  setSortBy,
  selectedDuration,
  setSelectedDuration,
  openFormModal,
}) {
  return (
    <div className="space-y-5 text-slate-800">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-extrabold text-base text-[#1C3569] m-0 flex items-center gap-2">
          <FilterOutlined className="text-amber-600" /> Filter Options
        </h3>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md"
          >
            <ReloadOutlined className="text-[10px]" /> Reset
          </button>
        )}
      </div>

      {/* 1. Global Live Search Box */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          Live Search Mongoose DB
        </label>
        <Input.Search
          placeholder="e.g. MCA, MBA, DBA..."
          allowClear
          enterButton={<span className="font-medium text-xs">Search</span>}
          size="middle"
          value={searchInputValue}
          onChange={(e) => {
            setSearchInputValue(e.target.value);
            if (!e.target.value) setAppliedSearchTerm("");
          }}
          onSearch={(value) => setAppliedSearchTerm(value)}
          className="rounded-xl border-slate-200"
        />
      </div>

      {/* 2. Course Category (Antd Select) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
          <BookOutlined className="text-amber-600" /> Course Category
        </label>
        <Select
          value={activeCategoryTab ? activeCategoryTab.toLowerCase() : "all"}
          onChange={(val) => setActiveCategoryTab(val)}
          className="w-full font-semibold rounded-xl"
          size="middle"
          options={categoryTabs.map((cat) => ({
            value: cat.slug,
            label: cat.label,
          }))}
        />
      </div>

      {/* 4. Sort Results By (Antd Select) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
          <SortAscendingOutlined className="text-amber-600" /> Sort Results By
        </label>
        <Select
          value={sortBy}
          onChange={(val) => setSortBy(val)}
          className="w-full font-semibold rounded-xl"
          size="middle"
          options={[
            { value: "featured", label: "Featured First" },
            { value: "title-asc", label: "Title: A to Z" },
            { value: "title-desc", label: "Title: Z to A" },
          ]}
        />
      </div>

      {/* 5. Program Duration (Antd Select) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
          <ClockCircleFilled className="text-amber-600" /> Program Duration
        </label>
        <Select
          value={selectedDuration}
          onChange={(val) => setSelectedDuration(val)}
          className="w-full font-semibold rounded-xl"
          size="middle"
          options={durationOptions.map((d) => ({
            value: d.slug || "all",
            label: d.label,
          }))}
        />
      </div>

      {/* Student Assistance Counselor Box */}
      <div className="bg-gradient-to-br from-[#1C3569] to-[#0d1d3d] text-white p-4 rounded-2xl space-y-2 text-center shadow-md">
        <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">🎓 Need Expert Advice?</span>
        <p className="text-xs text-slate-200 font-medium m-0 leading-snug">
          Confused about course selection or university approvals? Talk to senior advisors for free!
        </p>
        <Button
          type="primary"
          onClick={() => {
            if (openFormModal) {
              openFormModal({
                title: "Request Free Counseling",
                subtitle: "Talk to senior advisors for free!",
                submitButtonText: "Submit Request",
              });
            }
          }}
          className="w-full bg-[#FFC107] hover:!bg-[#e5ac00] text-black font-bold text-xs h-9 rounded-xl border-none cursor-pointer mt-1"
        >
          <PhoneFilled /> Request Free Counseling
        </Button>
      </div>
    </div>
  );
}

export default function CourseListView({ initialCourses = [], initialUniversities = [] }) {
  const initialList = useMemo(() => {
    if (Array.isArray(initialCourses)) return initialCourses;
    if (initialCourses && Array.isArray(initialCourses.programs)) return initialCourses.programs;
    return [];
  }, [initialCourses]);

  const [programsList, setProgramsList] = useState(initialList);
  const [totalCount, setTotalCount] = useState(
    typeof initialCourses?.total === "number" ? initialCourses.total : initialList.length
  );
  const [totalPages, setTotalPages] = useState(
    typeof initialCourses?.totalPages === "number" ? initialCourses.totalPages : 1
  );
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const [isLoading, setIsLoading] = useState(false);

  // Search States
  const [searchInputValue, setSearchInputValue] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  const [activeCategoryTab, setActiveCategoryTab] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const formModalCtx = useContext(FormModalContext);
  const openFormModal = formModalCtx?.openFormModal ?? (() => {});

  const searchParams = useSearchParams();
  const isInitialMount = React.useRef(true);

  const selectedUnisKey = useMemo(() => selectedUniversities.join(","), [selectedUniversities]);

  // Synchronize URL query parameters (category, search, university, etc.) into component filter state
  useEffect(() => {
    if (!searchParams) return;
    const cat = searchParams.get("category");
    const subcat = searchParams.get("subcategory") || searchParams.get("subcourse");
    const q = searchParams.get("search");
    const uni = searchParams.get("university");

    if (cat && cat !== activeCategoryTab) {
      setActiveCategoryTab(cat);
    }
    if (subcat && subcat !== activeSubcategory) {
      setActiveSubcategory(subcat);
    }
    if (q && q !== appliedSearchTerm) {
      setSearchInputValue(q);
      setAppliedSearchTerm(q);
    }
    if (uni) {
      const parsed = uni.split(",").map((u) => u.trim());
      if (parsed.join(",") !== selectedUnisKey) {
        setSelectedUniversities(parsed);
      }
    }
  }, [searchParams]);

  // Live Mongoose Backend Fetch Effect (Guarded against infinite loop and redundant initial fetch)
  // Live Mongoose Backend Fetch Effect (Only fires when user changes filters after initial mount)
  useEffect(() => {
    // Skip fetch on initial mount because SSR initialCourses is ALREADY loaded with active searchParams!
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    getWebsiteCoursesFilter({
      search: appliedSearchTerm,
      category: activeCategoryTab,
      subcategory: activeSubcategory,
      university: selectedUniversities,
      duration: selectedDuration,
      sort: sortBy,
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    })
      .then((data) => {
        if (!isCancelled && data && Array.isArray(data.programs)) {
          setProgramsList(data.programs);
          setTotalCount(typeof data.total === "number" ? data.total : data.programs.length);
          setTotalPages(typeof data.totalPages === "number" ? data.totalPages : Math.ceil((data.total || data.programs.length) / ITEMS_PER_PAGE));
        }
      })
      .catch((err) => {
        console.error("Backend filter fetch error:", err);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [appliedSearchTerm, activeCategoryTab, activeSubcategory, selectedUnisKey, selectedDuration, sortBy, currentPage]);

  // Category Select Options - Master list + dynamic categories from ISR initialCourses / initialList
  const categoryTabs = useMemo(() => {
    const map = new Map();
    map.set("all", { label: "All Categories", slug: "all" });

    const masterCategories = [
      { slug: "doctorate", label: "Doctorate" },
      { slug: "master", label: "Master" },
      { slug: "bachelor", label: "Bachelor" },
      { slug: "certification", label: "Certification" },
      { slug: "diploma", label: "Diploma" },
      { slug: "management", label: "Management" },
    ];

    masterCategories.forEach((cat) => {
      map.set(cat.slug, { label: cat.label, slug: cat.slug });
    });

    const serverCategories = initialCourses?.categories || initialCourses?.tabs || [];
    if (Array.isArray(serverCategories)) {
      serverCategories.forEach((cat) => {
        const slug = cat.slug || cat._id || cat.name?.toLowerCase();
        const label = cat.name || cat.title || cat.label || slug;
        if (slug && slug !== "all") {
          const formatted = String(label).charAt(0).toUpperCase() + String(label).slice(1);
          map.set(slug.toLowerCase(), { label: formatted, slug: slug.toLowerCase() });
        }
      });
    }

    initialList.forEach((p) => {
      const catObj = p?.category;
      let label = "";
      let slug = "";

      if (typeof catObj === "object" && catObj !== null) {
        label = catObj.name || catObj.title || "";
        slug = catObj.slug || label.toLowerCase();
      } else if (typeof catObj === "string" && catObj.trim().length > 0) {
        label = catObj;
        slug = catObj.toLowerCase();
      }

      if (slug && slug !== "all" && !map.has(slug.toLowerCase())) {
        const formatted = String(label || slug).charAt(0).toUpperCase() + String(label || slug).slice(1);
        map.set(slug.toLowerCase(), { label: formatted, slug: slug.toLowerCase() });
      }
    });

    return Array.from(map.values());
  }, [initialCourses, initialList]);



  // Program Duration Select Options derived dynamically from ISR initialCourses & initialList
  const durationOptions = useMemo(() => {
    const map = new Map();
    map.set("all", { label: "All Durations", slug: "all" });

    const serverDurations = initialCourses?.durations || [];
    if (Array.isArray(serverDurations)) {
      serverDurations.forEach((d) => {
        const slug = d.slug || d._id || (d.months ? `${d.months}-months` : d.name?.toLowerCase());
        const label = d.name || d.title || d.label || (d.months ? `${d.months} Months` : slug);
        if (slug) {
          map.set(slug.toLowerCase(), { label: String(label), slug: slug.toLowerCase() });
        }
      });
    }

    initialList.forEach((p) => {
      const durObj = p?.duration;
      let label = "";
      let slug = "";

      if (typeof durObj === "object" && durObj !== null) {
        label = durObj.name || durObj.title || (durObj.months ? `${durObj.months} Months` : "");
        slug = durObj.slug || (durObj.months ? `${durObj.months}-months` : label.toLowerCase());
      } else if (typeof durObj === "string" && durObj.trim().length > 0) {
        label = durObj;
        slug = durObj.toLowerCase();
      } else if (p?.durationMonths || p?.durationYears) {
        const yrs = p.durationYears || (p.durationMonths ? Math.round(p.durationMonths / 12) : 0);
        if (yrs > 0) {
          slug = `${yrs}-year`;
          label = `${yrs} ${yrs === 1 ? "Year" : "Years"}`;
        }
      }

      if (slug && !map.has(slug.toLowerCase())) {
        map.set(slug.toLowerCase(), { label: label || slug, slug: slug.toLowerCase() });
      }
    });

    if (map.size === 1) {
      map.set("1-year", { label: "1 Year", slug: "1-year" });
      map.set("2-year", { label: "2 Years", slug: "2-year" });
      map.set("3-year", { label: "3 Years", slug: "3-year" });
    }

    return Array.from(map.values());
  }, [initialCourses, initialList]);



  // Filter & Sort Active Programs Result
  const processedPrograms = useMemo(() => {
    let result = [...programsList];

    // Additional Duration Filter
    if (selectedDuration !== "all") {
      result = result.filter((program) => {
        const durText = String(typeof program.duration === "object" ? program.duration?.title : (program.duration || "")).toLowerCase();
        if (selectedDuration === "1-year" && !durText.includes("1") && !durText.includes("12")) return false;
        if (selectedDuration === "2-year" && !durText.includes("2") && !durText.includes("24")) return false;
        if (selectedDuration === "3-year" && !durText.includes("3") && !durText.includes("36")) return false;
        return true;
      });
    }

    // Sort Logic
    if (sortBy === "title-asc") {
      result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else if (sortBy === "title-desc") {
      result.sort((a, b) => (b.title || "").localeCompare(a.title || ""));
    }

    return result;
  }, [programsList, selectedDuration, sortBy]);

  // Clear All Filters — also reset to page 1
  const handleClearFilters = () => {
    setSearchInputValue("");
    setAppliedSearchTerm("");
    setActiveCategoryTab("all");
    setActiveSubcategory("");
    setSelectedUniversities([]);
    setSelectedDuration("all");
    setSortBy("featured");
    setCurrentPage(1);
  };

  // When filters change, reset to page 1
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const activeFilterCount = (activeCategoryTab !== "all" ? 1 : 0) + selectedUniversities.length + (selectedDuration !== "all" ? 1 : 0) + (appliedSearchTerm ? 1 : 0);

  const handleGetBrochure = (program) => {
    if (program?.brochureUrl) {
      sessionStorage.setItem("brochureUrl", getAssetPath(program.brochureUrl));
    }
    openFormModal({
      title: `Download Brochure - ${program?.title || "Course"}`,
      subtitle: "Fill details to receive instant access to course brochure",
      defaultCourse: program?.title || "",
      submitButtonText: "Download Brochure",
    });
  };

  const filterSidebarProps = {
    activeFilterCount,
    handleClearFilters,
    searchInputValue,
    setSearchInputValue,
    setAppliedSearchTerm,
    activeCategoryTab,
    setActiveCategoryTab,
    categoryTabs,
    durationOptions,
    sortBy,
    setSortBy,
    selectedDuration,
    setSelectedDuration,
    openFormModal,
  };

  return (
    <WebsiteLayout py="py-4 sm:py-6" bg="#f8fafc">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-3 text-xs font-semibold" items={[
        { title: <Link href="/">Home</Link> },
        { title: "Browse Courses" }
      ]} />

      {/* Mobile Filter Button Bar (< lg screens) */}
      <div className="lg:hidden flex items-center gap-2 mb-6 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex-1 min-w-0">
          <Input.Search
            placeholder="Search course or university..."
            allowClear
            enterButton={<SearchOutlined className="text-white" />}
            value={searchInputValue}
            onChange={(e) => {
              setSearchInputValue(e.target.value);
              if (!e.target.value) setAppliedSearchTerm("");
            }}
            onSearch={(value) => setAppliedSearchTerm(value)}
            className="w-full"
          />
        </div>
        <Button
          type="primary"
          icon={<FilterOutlined />}
          onClick={() => setIsMobileDrawerOpen(true)}
          className="bg-[#1C3569] hover:!bg-[#0d1d3d] font-bold h-8 rounded-lg cursor-pointer shrink-0 text-xs px-3 border-none flex items-center gap-1"
        >
          Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>

      {/* Main Grid: Left Sidebar + Right Course Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Sidebar Filters (Desktop lg:col-span-3) */}
        <div className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs sticky top-6">
          <FilterSidebarContent {...filterSidebarProps} />
        </div>

        {/* Right Main Course Listing (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-6">

          {/* Active Filters Header Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#1C3569] text-white text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
                {totalCount} Courses Found
              </span>

              {/* Active Filters Badges List */}
              {activeFilterCount > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {activeCategoryTab !== "all" && (
                    <Tag
                      closable
                      onClose={() => setActiveCategoryTab("all")}
                      className="bg-amber-50 border-amber-200 text-amber-800 font-semibold text-xs px-2.5 py-0.5 rounded-lg flex items-center gap-1"
                    >
                      Category: {activeCategoryTab}
                    </Tag>
                  )}

                  {selectedDuration !== "all" && (
                    <Tag
                      closable
                      onClose={() => setSelectedDuration("all")}
                      className="bg-blue-50 border-blue-200 text-blue-800 font-semibold text-xs px-2.5 py-0.5 rounded-lg flex items-center gap-1"
                    >
                      Duration: {selectedDuration}
                    </Tag>
                  )}

                  {appliedSearchTerm && (
                    <Tag
                      closable
                      onClose={() => {
                        setSearchInputValue("");
                        setAppliedSearchTerm("");
                      }}
                      className="bg-purple-50 border-purple-200 text-purple-800 font-semibold text-xs px-2.5 py-0.5 rounded-lg flex items-center gap-1"
                    >
                      Search: {appliedSearchTerm}
                    </Tag>
                  )}
                </div>
              )}
            </div>

            {/* Reset All Filters Button */}
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl cursor-pointer transition-colors flex items-center gap-1 shrink-0"
              >
                <ReloadOutlined className="text-[10px]" /> Reset All ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Course Cards Grid */}
          {isLoading ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-xs flex flex-col items-center justify-center gap-3">
              <Spin indicator={<LoadingOutlined className="text-4xl text-[#1C3569]" spin />} />
              <p className="text-slate-600 font-bold text-sm m-0">Filtering Mongoose Database Courses...</p>
            </div>
          ) : processedPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
              {processedPrograms.map((item, index) => {
                const uniName = typeof item.university === "object" ? item.university?.name || "Partner University" : String(item.university || "Partner University");
                const rawLogo = typeof item.university === "object" ? (item.university?.logoSrc?.url || item.university?.logoUrl || item.logo) : item.logo;
                const logoUrl = getAssetPath(rawLogo, null);
                const providerName = (typeof item.tenant === "object" ? item.tenant?.name : null) || item.tenant || item.provider || item.partner || (typeof item.university === "object" ? item.university?.name : item.university) || "upGrad";
                const feeText = typeof item.fee === "object" ? item.fee?.title || `₹${item.fee?.amount || "1,20,000 INR"}` : (item.fee || "1,20,000 INR");
                const durationText = typeof item.duration === "object" ? item.duration?.title : (item.duration || "8 Months");

                const itemSlug = item.slug || item._id || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "");
                const courseDetailHref = itemSlug ? `/courses/${itemSlug}` : "/courses";

                return (
                  <div
                    key={`${item.title}-${uniName}-${index}`}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden relative flex flex-col justify-between group"
                  >
                    {/* Top Right Provider / Via Badge (Exact upGrad UI Corner Tab with Background & Matching Radius) */}
                    <div className="absolute top-0 right-0 bg-[#FAF6EC] border-b border-l border-[#E0D5C1] rounded-tr-2xl rounded-bl-2xl px-3 py-1 text-xs font-medium text-gray-700 flex items-center gap-1.5 z-10 shadow-2xs">
                      Via <span className="font-extrabold text-[#E52E2E] text-xs">{providerName}</span>
                    </div>

                    {/* Main Card Body (Left Circular Logo | Vertical Line | Right Details) */}
                    <div className="p-4 pt-8 flex items-center gap-3.5 relative min-h-[145px]">
                      {/* Left Column: Circular Logo & University Name */}
                      <div className="flex flex-col items-center justify-center shrink-0 w-24 sm:w-28 text-center">
                        <div className="w-12 h-12 min-[360px]:w-14 min-[360px]:h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center overflow-hidden mb-1.5 relative shrink-0 group-hover:scale-105 transition-transform">
                          {logoUrl ? (
                            <Image
                              src={logoUrl}
                              alt={uniName}
                              fill
                              sizes="64px"
                              unoptimized
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs uppercase">
                              {uniName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight text-center max-w-full line-clamp-2">
                          {uniName}
                        </span>
                      </div>

                      {/* Thin Vertical Line Separator */}
                      <div className="w-[1px] bg-slate-200/80 self-stretch my-1 shrink-0" />

                      {/* Right Column: Title, Duration & Fees */}
                      <div className="flex-1 flex flex-col justify-center space-y-1.5 min-w-0 pr-1">
                        {/* Course Title */}
                        <Link href={courseDetailHref} className="group-hover:text-blue-600 transition-colors">
                          <h3 className="text-sm sm:text-base font-extrabold text-[#1A237E] leading-snug line-clamp-2 m-0 tracking-tight">
                            {item.title}
                          </h3>
                        </Link>

                        {/* Duration */}
                        <div className="text-xs font-medium text-slate-600 flex items-center gap-1.5 mt-0.5">
                          <ClockCircleFilled className="text-slate-400 text-xs" />
                          <span>{durationText}</span>
                        </div>

                        {/* Fees (Bright Pink Text matching reference mockup) */}
                        <div className="text-xs sm:text-sm font-extrabold text-[#E91E63] mt-1 tracking-tight">
                          Fees : {feeText.includes("₹") || feeText.includes("INR") ? feeText : `₹${feeText}`}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Cream Action Links Bar (Matching Reference Mockup) */}
                    <div className="bg-[#FAF6EC] border-t border-[#F0E6D2] px-3.5 py-2.5 flex items-center justify-between text-xs font-bold text-slate-700">
                      <button
                        type="button"
                        onClick={() => handleGetBrochure(item)}
                        className="hover:text-blue-600 cursor-pointer transition-colors flex items-center gap-1 text-slate-700"
                      >
                        + Compare
                      </button>

                      <Link
                        href={courseDetailHref}
                        className="hover:text-blue-600 cursor-pointer transition-colors text-slate-700 font-bold"
                      >
                        Explore More
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          openFormModal({
                            title: "Apply / Book 1:1 Counselling",
                            subtitle: "Get expert guidance from senior counselors",
                            defaultCourse: item.title,
                            formNameOverride: `CourseListPage_${item.slug}`,
                            submitButtonText: "Submit Application",
                          });
                        }}
                        className="text-[#15803D] hover:text-green-700 font-extrabold cursor-pointer transition-colors flex items-center gap-0.5"
                      >
                        Apply Now <RightOutlined className="text-[10px]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs">
              <p className="text-slate-700 font-extrabold text-base m-0">No matching courses found in database for your active filters.</p>
              <p className="text-slate-400 text-xs mt-1">Try resetting your search query or university checkboxes.</p>
              <Button onClick={handleClearFilters} className="mt-4 font-bold rounded-xl bg-[#1C3569] text-[#A66E38] border-none h-10 px-6">
                Reset All Filters
              </Button>
            </div>
          )}

          {/* Ant Design Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex flex-col items-center gap-2 pt-6">
              <style>{`
                .course-pagination .ant-pagination-item {
                  border-radius: 10px;
                  border: 1.5px solid #e2e8f0;
                  font-weight: 700;
                  font-size: 13px;
                  min-width: 36px;
                  height: 36px;
                  line-height: 34px;
                  background: white;
                  transition: all 0.2s;
                }
                .course-pagination .ant-pagination-item:hover {
                  border-color: #1C3569;
                  background: #eef2ff;
                }
                .course-pagination .ant-pagination-item:hover a {
                  color: #1C3569;
                }
                .course-pagination .ant-pagination-item-active {
                  background: #1C3569 !important;
                  border-color: #1C3569 !important;
                  box-shadow: 0 2px 8px rgba(28,53,105,0.25);
                }
                .course-pagination .ant-pagination-item-active a {
                  color: white !important;
                }
                .course-pagination .ant-pagination-prev .ant-pagination-item-link,
                .course-pagination .ant-pagination-next .ant-pagination-item-link {
                  border-radius: 10px;
                  border: 1.5px solid #e2e8f0;
                  background: white;
                  height: 36px;
                  width: 36px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 13px;
                  transition: all 0.2s;
                }
                .course-pagination .ant-pagination-prev:hover .ant-pagination-item-link,
                .course-pagination .ant-pagination-next:hover .ant-pagination-item-link {
                  border-color: #1C3569;
                  background: #1C3569;
                  color: white;
                }
                .course-pagination .ant-pagination-disabled .ant-pagination-item-link {
                  background: #f8fafc !important;
                  border-color: #e2e8f0 !important;
                  color: #cbd5e1 !important;
                }
                .course-pagination .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-ellipsis,
                .course-pagination .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-ellipsis {
                  color: #94a3b8;
                  letter-spacing: 2px;
                }
                .course-pagination .ant-pagination-total-text {
                  color: #64748b;
                  font-size: 12px;
                  font-weight: 600;
                  margin-right: 8px;
                  line-height: 36px;
                }
              `}</style>
              <Pagination
                current={currentPage}
                total={totalCount}
                pageSize={ITEMS_PER_PAGE}
                onChange={(page) => setCurrentPage(page)}
                showTotal={(total, range) => `${range[0]}–${range[1]} of ${total} courses`}
                showSizeChanger={false}
                className="course-pagination"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Antd Filter Drawer */}
      <Drawer
        title={<span className="font-bold text-[#1C3569] text-base">Filter Options</span>}
        placement="left"
        onClose={() => setIsMobileDrawerOpen(false)}
        open={isMobileDrawerOpen}
        className="lg:hidden"
        style={{ width: "85%", maxWidth: 340 }}
      >
        <FilterSidebarContent {...filterSidebarProps} />
      </Drawer>
    </WebsiteLayout>
  );
}
