"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Checkbox, Input, Button, Drawer, Tag, Breadcrumb, Radio, Spin, Select } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  CloseCircleFilled,
  DownloadOutlined,
  RightOutlined,
  EnvironmentFilled,
  ReloadOutlined,
  ThunderboltFilled,
  BookOutlined,
  PhoneFilled,
  ClockCircleFilled,
  SortAscendingOutlined,
  LoadingOutlined
} from "@ant-design/icons";

import FormWrapper from "@/components/forms/FormWrapper";
import { getAssetPath } from "@/lib/utils";
import { getWebsiteCoursesFilter } from "@/services/api";
import { useSearchParams } from "next/navigation";
import Container from "@/components/ui/container";

// Reusable Sidebar Filter Component defined OUTSIDE to maintain stable React DOM identity
function FilterSidebarContent({
  activeFilterCount,
  handleClearFilters,
  searchInputValue,
  setSearchInputValue,
  setAppliedSearchTerm,
  sortBy,
  setSortBy,
  selectedDuration,
  setSelectedDuration,
  courseOptions,
  selectedCourses,
  setSelectedCourses,
  courseSearchText,
  setCourseSearchText,
  filteredCourseOptions,
  universityOptions,
  selectedUniversities,
  setSelectedUniversities,
  uniSearchText,
  setUniSearchText,
  filteredUniversityOptions,
  setSelectedProgram,
  setActiveModal,
}) {
  return (
    <div className="space-y-6 text-slate-800">
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

      {/* 1. Global Search Box with Antd Input.Search */}
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

      {/* 2. Sort By Control in Sidebar */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
          <SortAscendingOutlined className="text-amber-600" /> Sort Results By
        </label>
        <Select
          value={sortBy}
          onChange={(val) => setSortBy(val)}
          className="w-full font-semibold rounded-xl"
          options={[
            { value: "featured", label: "Featured First" },
            { value: "title-asc", label: "Title: A to Z" },
            { value: "title-desc", label: "Title: Z to A" },
          ]}
        />
      </div>

      {/* 3. Filter by Duration */}
      <div className="border-t border-slate-100 pt-4">
        <h4 className="font-bold text-xs uppercase tracking-wider text-[#1C3569] mb-3 flex items-center gap-1">
          <ClockCircleFilled className="text-amber-600" /> Program Duration
        </h4>
        <Radio.Group
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
          className="flex flex-col gap-2"
        >
          <Radio value="all" className="text-xs font-semibold text-slate-700">All Durations</Radio>
          <Radio value="1-year" className="text-xs font-semibold text-slate-700">1 Year (Executive / Certifications)</Radio>
          <Radio value="2-year" className="text-xs font-semibold text-slate-700">2 Years (Master's / MBA / MCA)</Radio>
          <Radio value="3-year" className="text-xs font-semibold text-slate-700">3 Years (Doctorate / DBA / UG)</Radio>
        </Radio.Group>
      </div>

      {/* 4. Filter by Course Titles (With Search) */}
      <div className="border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#1C3569] m-0">
            Filter by Course ({courseOptions.length})
          </h4>
          {selectedCourses.length > 0 && (
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
              {selectedCourses.length} selected
            </span>
          )}
        </div>

        <Input
          placeholder="Search course title..."
          size="small"
          prefix={<SearchOutlined className="text-slate-300 text-xs" />}
          value={courseSearchText}
          onChange={(e) => setCourseSearchText(e.target.value)}
          className="mb-2 rounded-lg text-xs"
        />

        <div className="max-h-44 overflow-y-auto no-scrollbar space-y-1 pr-1">
          <Checkbox.Group
            value={selectedCourses}
            onChange={(val) => setSelectedCourses(val)}
            className="flex flex-col gap-1.5"
          >
            {filteredCourseOptions.map((item) => (
              <Checkbox key={item.title} value={item.title} className="text-xs font-medium text-slate-700">
                <span className="flex items-center justify-between w-full gap-2">
                  <span className="truncate max-w-[170px]">{item.title}</span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                    {item.count}
                  </span>
                </span>
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      </div>

      {/* 5. Filter by University (With Search) */}
      <div className="border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-xs uppercase tracking-wider text-[#1C3569] m-0">
            Filter by University ({universityOptions.length})
          </h4>
          {selectedUniversities.length > 0 && (
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
              {selectedUniversities.length} selected
            </span>
          )}
        </div>

        <Input
          placeholder="Search university..."
          size="small"
          prefix={<SearchOutlined className="text-slate-300 text-xs" />}
          value={uniSearchText}
          onChange={(e) => setUniSearchText(e.target.value)}
          className="mb-2 rounded-lg text-xs"
        />

        <div className="max-h-44 overflow-y-auto no-scrollbar space-y-1 pr-1">
          <Checkbox.Group
            value={selectedUniversities}
            onChange={(val) => setSelectedUniversities(val)}
            className="flex flex-col gap-1.5"
          >
            {filteredUniversityOptions.map((uni) => (
              <Checkbox key={uni.slug} value={uni.slug} className="text-xs font-medium text-slate-700">
                <span className="flex items-center justify-between w-full gap-2">
                  <span className="truncate max-w-[170px]">{uni.name}</span>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                    {uni.count}
                  </span>
                </span>
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
      </div>

      {/* Student Assistance Counselor Box */}
      <div className="bg-gradient-to-br from-[#1C3569] to-[#0d1d3d] text-white p-4 rounded-2xl space-y-2 text-center shadow-md">
        <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">🎓 Need Expert Advice?</span>
        <p className="text-xs text-slate-200 font-medium m-0 leading-snug">
          Confused about course selection or university approvals? Talk to senior advisors for free!
        </p>
        <Button
          type="primary"
          onClick={() => { setSelectedProgram({ title: "General Inquiry" }); setActiveModal("apply"); }}
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
  const [totalCount, setTotalCount] = useState(initialList.length);
  const [isLoading, setIsLoading] = useState(false);

  // Search States
  const [searchInputValue, setSearchInputValue] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  const [activeCategoryTab, setActiveCategoryTab] = useState("all");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [uniSearchText, setUniSearchText] = useState("");
  const [courseSearchText, setCourseSearchText] = useState("");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Brochure & Apply Modal State
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const searchParams = useSearchParams();
  const isInitialMount = React.useRef(true);

  const selectedUnisKey = useMemo(() => selectedUniversities.join(","), [selectedUniversities]);
  const selectedCoursesKey = useMemo(() => selectedCourses.join(","), [selectedCourses]);

  // Synchronize URL query parameters (category, search, university, etc.) into component filter state
  useEffect(() => {
    if (!searchParams) return;
    const cat = searchParams.get("category");
    const q = searchParams.get("search");
    const uni = searchParams.get("university");

    if (cat && cat !== activeCategoryTab) {
      setActiveCategoryTab(cat);
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
  useEffect(() => {
    // Skip fetch on initial mount if SSR initialList is already loaded with default filters
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (!appliedSearchTerm && activeCategoryTab === "all" && !selectedCoursesKey && !selectedUnisKey && selectedDuration === "all" && sortBy === "featured") {
        return;
      }
    }

    let isCancelled = false;
    setIsLoading(true);

    getWebsiteCoursesFilter({
      search: appliedSearchTerm,
      category: activeCategoryTab,
      university: selectedUniversities,
      course: selectedCourses,
      duration: selectedDuration,
      sort: sortBy,
    })
      .then((data) => {
        if (!isCancelled && data && Array.isArray(data.programs)) {
          setProgramsList(data.programs);
          setTotalCount(typeof data.total === "number" ? data.total : data.programs.length);
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
  }, [appliedSearchTerm, activeCategoryTab, selectedCoursesKey, selectedUnisKey, selectedDuration, sortBy]);

  // Category Tabs metadata
  const categoryTabs = useMemo(() => {
    const map = new Map();
    map.set("all", { label: "All Programs", count: initialList.length, slug: "all" });

    initialList.forEach((p) => {
      const catObj = p?.category;
      let label = "Other";
      let slug = "other";

      if (typeof catObj === "object" && catObj !== null) {
        label = catObj.name || catObj.title || "Other";
        slug = catObj.slug || label.toLowerCase();
      } else if (typeof catObj === "string" && catObj.trim().length > 0) {
        label = catObj;
        slug = catObj.toLowerCase();
      }

      const existing = map.get(slug) || { label, count: 0, slug };
      existing.count += 1;
      map.set(slug, existing);
    });

    return Array.from(map.values());
  }, [initialList]);

  // Unique course options with counts
  const courseOptions = useMemo(() => {
    const map = new Map();
    initialList.forEach((p) => {
      if (p?.title) {
        const count = map.get(p.title) || 0;
        map.set(p.title, count + 1);
      }
    });
    return Array.from(map.entries()).map(([title, count]) => ({ title, count })).sort((a, b) => b.count - a.count);
  }, [initialList]);

  const filteredCourseOptions = useMemo(() => {
    if (!courseSearchText.trim()) return courseOptions;
    const q = courseSearchText.toLowerCase();
    return courseOptions.filter((c) => c.title.toLowerCase().includes(q));
  }, [courseOptions, courseSearchText]);

  // Unique university options with counts
  const universityOptions = useMemo(() => {
    const map = new Map();
    initialList.forEach((p) => {
      const u = p?.university;
      let name = "Partner University";
      let slug = "university";

      if (typeof u === "object" && u !== null && u.name) {
        name = u.name;
        slug = u.slug || u.name;
      } else if (typeof u === "string") {
        name = u;
        slug = u;
      }

      const existing = map.get(slug) || { name, slug, count: 0 };
      existing.count += 1;
      map.set(slug, existing);
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [initialList]);

  const filteredUniversityOptions = useMemo(() => {
    if (!uniSearchText.trim()) return universityOptions;
    const q = uniSearchText.toLowerCase();
    return universityOptions.filter((u) => u.name.toLowerCase().includes(q));
  }, [universityOptions, uniSearchText]);

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

  // Clear All Filters
  const handleClearFilters = () => {
    setSearchInputValue("");
    setAppliedSearchTerm("");
    setActiveCategoryTab("all");
    setSelectedCourses([]);
    setSelectedUniversities([]);
    setSelectedDuration("all");
    setSortBy("featured");
    setUniSearchText("");
    setCourseSearchText("");
  };

  const activeFilterCount = (activeCategoryTab !== "all" ? 1 : 0) + selectedCourses.length + selectedUniversities.length + (selectedDuration !== "all" ? 1 : 0) + (appliedSearchTerm ? 1 : 0);

  const handleGetBrochure = (program) => {
    sessionStorage.setItem("brochureUrl", getAssetPath(program.brochureUrl));
    setSelectedProgram(program);
    setActiveModal("brochure");
  };

  const filterSidebarProps = {
    activeFilterCount,
    handleClearFilters,
    searchInputValue,
    setSearchInputValue,
    setAppliedSearchTerm,
    sortBy,
    setSortBy,
    selectedDuration,
    setSelectedDuration,
    courseOptions,
    selectedCourses,
    setSelectedCourses,
    courseSearchText,
    setCourseSearchText,
    filteredCourseOptions,
    universityOptions,
    selectedUniversities,
    setSelectedUniversities,
    uniSearchText,
    setUniSearchText,
    filteredUniversityOptions,
    setSelectedProgram,
    setActiveModal,
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pt-28 sm:pt-24 lg:pt-24 pb-12 font-sans">
      <Container>
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4 text-xs font-semibold" items={[
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Sidebar Filters (Desktop lg:col-span-3) */}
          <div className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs sticky top-28">
            <FilterSidebarContent {...filterSidebarProps} />
          </div>

          {/* Right Main Course Listing (lg:col-span-9) */}
          <div className="lg:col-span-9 space-y-6">

            {/* Course Cards Grid: 2 Cards per row on Desktop (md:grid-cols-2), 1 Card on Mobile (grid-cols-1) */}
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
                  const providerName = item.provider || item.partner || (index % 2 === 0 ? "upGrad" : "TimesPro");
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
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-slate-200/80 bg-white p-1.5 shadow-xs flex items-center justify-center overflow-hidden mb-1.5 relative shrink-0 group-hover:scale-105 transition-transform">
                            {logoUrl ? (
                              <Image
                                src={logoUrl}
                                alt={uniName}
                                fill
                                sizes="(max-width: 640px) 56px, 64px"
                                className="object-contain p-1 rounded-full"
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
                          onClick={() => { setSelectedProgram(item); setActiveModal("apply"); }}
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

        {/* Enquiry Form Modal */}
        {selectedProgram && (
          <FormWrapper
            isModal
            isOpen={!!activeModal}
            title={activeModal === "brochure" ? "Download Course Brochure" : "Apply / Book 1:1 Counselling"}
            subtitle={activeModal === "brochure" ? "Enter your details to download brochure PDF" : "Get expert guidance from senior counselors"}
            onClose={() => { setActiveModal(null); setSelectedProgram(null); }}
            isBrochureForm={activeModal === "brochure"}
            brochureUrl={activeModal === "brochure" ? getAssetPath(selectedProgram.brochureUrl) : ""}
            defaultCourse={selectedProgram.title}
          />
        )}
      </Container>
    </div>
  );
}
