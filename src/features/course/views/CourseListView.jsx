"use client";

import React, { useState, useEffect, useMemo, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input, Button, Drawer, Tag, Breadcrumb, Spin, Select, Pagination } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  ControlOutlined,
  RightOutlined,
  ReloadOutlined,
  BookOutlined,
  PhoneFilled,
  ClockCircleFilled,
  SortAscendingOutlined,
  LoadingOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";

const SliderFilterIcon = (props) => (
  <span className="anticon inline-flex items-center justify-center">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
      <circle cx="8" cy="6" r="2.5" fill="currentColor" />
      <circle cx="16" cy="12" r="2.5" fill="currentColor" />
      <circle cx="10" cy="18" r="2.5" fill="currentColor" />
    </svg>
  </span>
);

import { FormModalContext } from "@/context/FormModalContext";
import { useCompare } from "@/context/CompareContext";
import { getAssetPath } from "@/lib/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import WebsiteLayout from "@/components/layout/WebsiteLayout";

// Reusable Sidebar Filter Component matching Image 2 UI mockup
function FilterSidebarContent({
  hideHeader = false,
  onApplyFilter,
  activeFilterCount,
  handleClearFilters,
  activeCategoryTab,
  setActiveCategoryTab,
  categorySelectOptions = [],
  subcategoryList = [],
  durationList = [],
  feeList = [],
  selectedDuration,
  setSelectedDuration,
  selectedFee,
  setSelectedFee,
  selectedUniversities,
  setSelectedUniversities,
  universityOptions = [],
  activeSubcategory,
  setActiveSubcategory,
  setCurrentPage,
}) {
  const handleCategoryPillClick = (val) => {
    if (activeSubcategory === val) {
      setActiveSubcategory("");
    } else {
      setActiveSubcategory(val);
    }
  };

  const isCategoryPillActive = (val) => {
    return activeSubcategory === val;
  };

  const handleDurationPillClick = (val) => {
    if (selectedDuration === val) {
      setSelectedDuration("all");
    } else {
      setSelectedDuration(val);
    }
  };

  return (
    <div className="space-y-5 text-slate-800">
      {/* Sidebar Header */}
      {!hideHeader && (
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-extrabold text-base text-[#1C3569] m-0 flex items-center gap-2">
            <SliderFilterIcon className="text-[#1C3569]" /> Filter
          </h3>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md border-none"
            >
              <ReloadOutlined className="text-[10px]" /> Reset
            </button>
          )}
        </div>
      )}

      {/* 1. Course (Antd Select Dropdown) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          Course
        </label>
        <Select
          showSearch
          value={activeCategoryTab ? activeCategoryTab.toLowerCase() : "all"}
          onChange={(val) => {
            setActiveCategoryTab(val);
          }}
          className="w-full font-semibold rounded-xl"
          size="middle"
          options={categorySelectOptions}
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>

      {/* 2. Category Tags using Antd CheckableTag */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {subcategoryList.map((pill) => {
            const active = isCategoryPillActive(pill.value);
            return (
              <Tag.CheckableTag
                key={pill.value}
                checked={active}
                onChange={() => handleCategoryPillClick(pill.value)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${active
                  ? "!bg-[#1C3569] !text-white border-[#1C3569]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#1C3569] hover:text-[#1C3569]"
                  }`}
              >
                {pill.label}
              </Tag.CheckableTag>
            );
          })}
        </div>
      </div>

      {/* 3. Duration Tags using Antd CheckableTag */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">
          Duration
        </label>
        <div className="flex flex-wrap gap-1.5">
          {durationList.map((pill) => {
            const active = selectedDuration === pill.value;
            return (
              <Tag.CheckableTag
                key={pill.value}
                checked={active}
                onChange={() => handleDurationPillClick(pill.value)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${active
                  ? "!bg-[#1C3569] !text-white border-[#1C3569]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#1C3569] hover:text-[#1C3569]"
                  }`}
              >
                {pill.label}
              </Tag.CheckableTag>
            );
          })}
        </div>
      </div>

      {/* 4. Fees Range Tags using Antd CheckableTag */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">
          Fees Range
        </label>
        <div className="flex flex-wrap gap-1.5">
          {feeList.map((pill) => {
            const active = selectedFee === pill.value;
            return (
              <Tag.CheckableTag
                key={pill.value}
                checked={active}
                onChange={() => setSelectedFee(pill.value)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${active
                  ? "!bg-[#1C3569] !text-white border-[#1C3569]"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#1C3569] hover:text-[#1C3569]"
                  }`}
              >
                {pill.label}
              </Tag.CheckableTag>
            );
          })}
        </div>
      </div>

      {/* 5. Institute Dropdown (Antd Select) */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-slate-700">
          Institute
        </label>
        <Select
          showSearch
          value={selectedUniversities[0] || "all"}
          onChange={(val) => {
            if (val === "all") {
              setSelectedUniversities([]);
            } else {
              setSelectedUniversities([val]);
            }
          }}
          className="w-full font-semibold rounded-xl"
          size="middle"
          options={universityOptions}
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>

      {/* Apply Filter Button & Reset */}
      <div className="pt-4 space-y-2.5">
        <Button
          type="primary"
          onClick={onApplyFilter}
          className="w-full bg-[#1C3569] hover:!bg-[#0d1d3d] text-white font-bold h-10 rounded-xl cursor-pointer border-none"
        >
          Apply Filter
        </Button>
        <button
          type="button"
          onClick={handleClearFilters}
          className="w-full text-center text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer flex items-center justify-center gap-1 py-1 border-none bg-transparent"
        >
          <ReloadOutlined className="text-[10px]" /> Reset Filter
        </button>
      </div>
    </div>
  );
}

// Dynamic Accreditation display helper based on University name
const getAccreditation = (uniName) => {
  const name = String(uniName || "").toLowerCase();
  if (name.includes("iim") || name.includes("iit") || name.includes("iiit") || name.includes("indian institute")) {
    return "AICTE NAAC A+, UGC";
  }
  if (name.includes("edgewood") || name.includes("golden gate")) {
    return "WASC, DEAC, CHEA Approved";
  }
  if (name.includes("esgci") || name.includes("paris") || name.includes("geneva") || name.includes("rushford") || name.includes("liverpool")) {
    return "AACSB, EFMD, AMBA Member / State Accredited";
  }
  return "UGC, DEB, NAAC A+ Approved";
};

export default function CourseListView({
  initialCourses = [],
  initialCategories = [],
  initialCategoryTree = [],
  initialUniversities = [],
  initialDurations = [],
  initialFees = [],
}) {
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

  // Dynamic Options States initialized directly from Server-Side ISR Props
  const [dbCategories, setDbCategories] = useState(initialCategories);
  const [dbCategoryTree, setDbCategoryTree] = useState(initialCategoryTree);
  const [dbDurations, setDbDurations] = useState(initialDurations);
  const [dbFees, setDbFees] = useState(initialFees);
  const [dbUniversities, setDbUniversities] = useState(initialUniversities);

  useEffect(() => {
    if (Array.isArray(initialCategories) && initialCategories.length > 0) {
      setDbCategories(initialCategories);
    }
    if (Array.isArray(initialCategoryTree) && initialCategoryTree.length > 0) {
      setDbCategoryTree(initialCategoryTree);
    }
    if (Array.isArray(initialDurations) && initialDurations.length > 0) {
      setDbDurations(initialDurations);
    }
    if (Array.isArray(initialFees) && initialFees.length > 0) {
      setDbFees(initialFees);
    }
    if (Array.isArray(initialUniversities) && initialUniversities.length > 0) {
      setDbUniversities(initialUniversities);
    }
  }, [initialCategories, initialCategoryTree, initialDurations, initialFees, initialUniversities]);

  // Search States
  const [searchInputValue, setSearchInputValue] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");

  const [activeCategoryTab, setActiveCategoryTab] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedFee, setSelectedFee] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const formModalCtx = useContext(FormModalContext);
  const openFormModal = formModalCtx?.openFormModal ?? (() => { });

  const { toggleCompare, isInCompare, setIsCompareDrawerOpen } = useCompare();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = React.useRef(true);

  const selectedUnisKey = useMemo(() => selectedUniversities.join(","), [selectedUniversities]);

  // Synchronize URL query parameters
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

  // Live interactive filter effect — fetches from Next.js API Route /api/website/courses
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    const q = new URLSearchParams();
    if (appliedSearchTerm) q.set("search", appliedSearchTerm);
    if (activeCategoryTab && activeCategoryTab !== "all") q.set("category", activeCategoryTab);
    if (activeSubcategory) q.set("subcategory", activeSubcategory);
    if (selectedUniversities.length > 0) q.set("university", selectedUniversities.join(","));
    if (selectedDuration && selectedDuration !== "all") q.set("duration", selectedDuration);
    if (selectedFee && selectedFee !== "all") q.set("fee", selectedFee);
    if (sortBy) q.set("sort", sortBy);
    q.set("page", String(currentPage));
    q.set("limit", String(ITEMS_PER_PAGE));

    fetch(`/api/website/courses?${q.toString()}`)
      .then((res) => res.json())
      .then((json) => {
        if (isCancelled) return;
        const data = json?.result ?? json;
        const progs = Array.isArray(data?.programs) ? data.programs : (Array.isArray(data) ? data : []);
        setProgramsList(progs);
        setTotalCount(typeof data?.total === "number" ? data.total : progs.length);
        setTotalPages(typeof data?.totalPages === "number" ? data.totalPages : Math.ceil((data?.total || progs.length) / ITEMS_PER_PAGE));
      })
      .catch((err) => console.error("[CourseListView] filter error:", err))
      .finally(() => { if (!isCancelled) setIsLoading(false); });

    return () => { isCancelled = true; };
  }, [appliedSearchTerm, activeCategoryTab, activeSubcategory, selectedUnisKey, selectedDuration, selectedFee, sortBy, currentPage]);

  // 🎯 Course Filter Options (Select Dropdown) - Exact list from reference image
  const categorySelectOptions = useMemo(() => {
    return [
      { value: "all", label: "All Categories" },
      { value: "doctorate", label: "Doctorate" },
      { value: "master", label: "Master" },
      { value: "bachelor", label: "Bachelor" },
      { value: "certification", label: "Certification" },
      { value: "diploma", label: "Diploma" },
      { value: "management", label: "Management" },
      { value: "dual-master-doctorate", label: "Master+Doctorate (Dual)" },
    ];
  }, []);

  // 🎯 Category Filter Tag Pills - Exact list from reference image
  const subcategoryList = useMemo(() => {
    return [
      { label: "Management", value: "management" },
      { label: "AI Courses", value: "ai-courses" },
      { label: "Machine Learning", value: "machine-learning" },
      { label: "HR", value: "hr" },
      { label: "Banking", value: "banking" },
      { label: "Finance", value: "finance" },
      { label: "Leadership", value: "leadership" },
      { label: "Data Science", value: "data-science" },
    ];
  }, []);

  // 🎯 Duration Filter Pills - Clean range keys supported by backend filter
  const durationList = useMemo(() => {
    return [
      { label: "06 Month", value: "06-month" },
      { label: "06-12 Months", value: "06-12-months" },
      { label: "12-36 Months", value: "12-36-months" },
    ];
  }, []);

  // 🎯 Fee Range Filter Pills - Clean range keys supported by backend filter
  const feeList = useMemo(() => {
    return [
      { label: "All", value: "all" },
      { label: "0-1 Lakh", value: "0-1-lakh" },
      { label: "1-2 Lakh", value: "1-2-lakh" },
      { label: "2-5 Lakh", value: "2-5-lakh" },
      { label: "5-10 Lakh", value: "5-10-lakh" },
      { label: "Above 10 Lakh", value: "above-10-lakh" },
    ];
  }, []);

  // Institute Dropdown Options
  const universityOptions = useMemo(() => {
    const map = new Map();
    map.set("all", { value: "all", label: "All Institutes" });

    dbUniversities.forEach((uni) => {
      const name = uni.label || uni.name || uni.title || "";
      const slug = uni.value || uni.slug || uni._id || "";
      if (name && slug) {
        map.set(String(slug), { value: String(slug), label: name });
      }
    });

    if (Array.isArray(initialUniversities)) {
      initialUniversities.forEach((uni) => {
        const name = uni.name || uni.title || "";
        const slug = uni.slug || uni._id || "";
        if (name && slug) {
          map.set(String(slug), { value: String(slug), label: name });
        }
      });
    }

    initialList.forEach((p) => {
      const uni = p?.university;
      if (uni && typeof uni === "object") {
        const name = uni.name || uni.title || "";
        const slug = uni.slug || uni._id || "";
        if (name && slug) {
          map.set(String(slug), { value: String(slug), label: name });
        }
      } else if (uni && typeof uni === "string" && uni.trim()) {
        const clean = uni.trim();
        map.set(clean.toLowerCase(), { value: clean.toLowerCase(), label: clean });
      }
    });

    if (map.size <= 1) {
      map.set("iim-nagpur", { value: "iim-nagpur", label: "IIM Nagpur" });
      map.set("edgewood-university", { value: "edgewood-university", label: "Edgewood University" });
      map.set("esgci-paris", { value: "esgci-paris", label: "ESGCI Paris" });
      map.set("rushford-business-school", { value: "rushford-business-school", label: "Rushford Business School" });
    }

    return Array.from(map.values());
  }, [dbUniversities, initialUniversities, initialList]);

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

  // Clear All Filters — reset state & remove query parameters from URL address bar
  const handleClearFilters = () => {
    setSearchInputValue("");
    setAppliedSearchTerm("");
    setActiveCategoryTab("all");
    setActiveSubcategory("");
    setSelectedUniversities([]);
    setSelectedDuration("all");
    setSelectedFee("all");
    setSortBy("featured");
    setCurrentPage(1);

    if (router && pathname) {
      router.replace(pathname, { scroll: false });
    }
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  // When filters change, reset to page 1
  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const activeFilterCount = (activeCategoryTab !== "all" ? 1 : 0) + selectedUniversities.length + (selectedDuration !== "all" ? 1 : 0) + (selectedFee !== "all" ? 1 : 0) + (appliedSearchTerm ? 1 : 0);

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

  // Desktop & Mobile Draft Filter States
  const [draftCategoryTab, setDraftCategoryTab] = useState(activeCategoryTab);
  const [draftSubcategory, setDraftSubcategory] = useState(activeSubcategory);
  const [draftUniversities, setDraftUniversities] = useState(selectedUniversities);
  const [draftDuration, setDraftDuration] = useState(selectedDuration);
  const [draftFee, setDraftFee] = useState(selectedFee);

  const handleOpenMobileDrawer = () => {
    setDraftCategoryTab(activeCategoryTab);
    setDraftSubcategory(activeSubcategory);
    setDraftUniversities(selectedUniversities);
    setDraftDuration(selectedDuration);
    setDraftFee(selectedFee);
    setIsMobileDrawerOpen(true);
  };

  const handleApplyFilters = () => {
    setActiveCategoryTab(draftCategoryTab);
    setActiveSubcategory(draftSubcategory);
    setSelectedUniversities(draftUniversities);
    setSelectedDuration(draftDuration);
    setSelectedFee(draftFee);
    setCurrentPage(1);
    setIsMobileDrawerOpen(false);
  };

  const handleClearMobileDraftFilters = () => {
    setDraftCategoryTab("all");
    setDraftSubcategory("");
    setDraftUniversities([]);
    setDraftDuration("all");
    setDraftFee("all");
  };

  const desktopFilterSidebarProps = {
    activeFilterCount,
    handleClearFilters: () => {
      handleClearMobileDraftFilters();
      handleClearFilters();
    },
    onApplyFilter: handleApplyFilters,
    activeCategoryTab: draftCategoryTab,
    setActiveCategoryTab: setDraftCategoryTab,
    activeSubcategory: draftSubcategory,
    setActiveSubcategory: setDraftSubcategory,
    selectedUniversities: draftUniversities,
    setSelectedUniversities: setDraftUniversities,
    selectedDuration: draftDuration,
    setSelectedDuration: setDraftDuration,
    selectedFee: draftFee,
    setSelectedFee: setDraftFee,
    categorySelectOptions,
    subcategoryList,
    durationList,
    feeList,
    universityOptions,
    setCurrentPage,
  };

  const mobileFilterSidebarProps = {
    ...desktopFilterSidebarProps,
    onApplyFilter: handleApplyFilters,
  };

  return (
    <WebsiteLayout py="py-4 sm:py-6" bg="#f8fafc">
      {/* Breadcrumb + Back Button */}
      <div className="flex items-center justify-between mb-3 gap-4">
        <Breadcrumb className="text-xs font-semibold" items={[
          { title: <Link href="/">Home</Link> },
          { title: "Browse Courses" }
        ]} />
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/")}
          className="bg-white border-slate-300 rounded-lg text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50"
        >
          Back to Home
        </Button>
      </div>

      {/* Mobile Filter & Select Bar (< lg screens) */}
      <div className="lg:hidden flex items-center gap-2 mb-6 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex-1 grid grid-cols-2 gap-2 min-w-0">
          <Select
            showSearch
            value={activeCategoryTab}
            onChange={(val) => {
              setActiveCategoryTab(val);
              setCurrentPage(1);
            }}
            options={categorySelectOptions}
            className="w-full text-xs font-semibold"
            placeholder="Degree / Category"
            size="middle"
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
          <Select
            showSearch
            value={selectedUniversities[0] || "all"}
            onChange={(val) => {
              if (val === "all") setSelectedUniversities([]);
              else setSelectedUniversities([val]);
              setCurrentPage(1);
            }}
            options={universityOptions}
            className="w-full text-xs font-semibold"
            placeholder="Institute"
            size="middle"
            optionFilterProp="label"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>
        <Button
          type="primary"
          icon={<SliderFilterIcon />}
          onClick={handleOpenMobileDrawer}
          className="bg-[#1C3569] hover:!bg-[#0d1d3d] font-bold h-8 rounded-lg cursor-pointer shrink-0 text-xs px-3 border-none flex items-center gap-1"
        >
          {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
        </Button>
      </div>

      {/* Main Grid: Left Sidebar + Right Course Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Sidebar Filters (Desktop lg:col-span-3) */}
        <div className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs sticky top-6">
          <FilterSidebarContent {...desktopFilterSidebarProps} />
        </div>

        {/* Right Main Course Listing (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-6">

          {/* Active Filters Header Bar */}
          <div className="hidden md:flex bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex-wrap items-center justify-between gap-3">
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

          {/* Course Cards Stack (Single Column as in Image 1 & Image 2) */}
          {isLoading ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-xs flex flex-col items-center justify-center gap-3">
              <Spin indicator={<LoadingOutlined className="text-4xl text-[#1C3569]" spin />} />
              <span className="text-slate-500 font-semibold text-xs animate-pulse">Filtering programs...</span>
            </div>
          ) : processedPrograms.length > 0 ? (
            <div className="space-y-4">
              {(() => {
                const displayList = [];
                processedPrograms.forEach((program) => {
                  if (program.university) {
                    displayList.push(program);
                  } else {
                    const offerings = Array.isArray(program.universityOfferings) ? program.universityOfferings : [];
                    if (offerings.length > 0) {
                      offerings.forEach((offering, oIdx) => {
                        const subItems = Array.isArray(offering?.subcourses) && offering.subcourses.length > 0
                          ? offering.subcourses
                          : (Array.isArray(offering?.subcourseOfferings) && offering.subcourseOfferings.length > 0
                            ? offering.subcourseOfferings
                            : null);

                        if (subItems) {
                          subItems.forEach((subOff, sIdx) => {
                            displayList.push({
                              ...program,
                              _uniqueKey: `${program._id || program.slug}-offering-${oIdx}-suboff-${sIdx}`,
                              activeOffering: offering,
                              activeSubOffering: subOff,
                              activeSubcourse: subOff.subcourse || subOff,
                            });
                          });
                        } else {
                          const rawSub = offering?.subcourse || offering?.subcourses || program?.subcourses || program?.subcourse || [];
                          const subcourses = Array.isArray(rawSub) ? rawSub : (rawSub ? [rawSub] : []);

                          if (subcourses.length > 0) {
                            subcourses.forEach((sub, sIdx) => {
                              displayList.push({
                                ...program,
                                _uniqueKey: `${program._id || program.slug}-offering-${oIdx}-sub-${sIdx}`,
                                activeOffering: offering,
                                activeSubOffering: null,
                                activeSubcourse: sub,
                              });
                            });
                          } else {
                            displayList.push({
                              ...program,
                              _uniqueKey: `${program._id || program.slug}-offering-${oIdx}`,
                              activeOffering: offering,
                              activeSubOffering: null,
                              activeSubcourse: null,
                            });
                          }
                        }
                      });
                    } else {
                      const rawSub = program?.subcourses || program?.subcourse || [];
                      const subcourses = Array.isArray(rawSub) ? rawSub : (rawSub ? [rawSub] : []);
                      if (subcourses.length > 0) {
                        subcourses.forEach((sub, sIdx) => {
                          displayList.push({
                            ...program,
                            _uniqueKey: `${program._id || program.slug}-sub-${sIdx}`,
                            activeOffering: null,
                            activeSubcourse: sub,
                          });
                        });
                      } else {
                        displayList.push(program);
                      }
                    }
                  }
                });

                return displayList.map((item, index) => {
                  const offering = item.activeOffering || null;
                  const subcourseObj = item.activeSubcourse || null;

                  const uniObj =
                    item.university ||
                    offering?.university ||
                    (Array.isArray(item.university) && item.university.length > 0
                      ? item.university[0]
                      : typeof item.university === "object" && item.university !== null
                        ? item.university
                        : null);

                  const uniName = uniObj?.name || (typeof item.university === "string" ? item.university : "Partner University");

                  let subcourseName = "";
                  if (item.subcourse) {
                    subcourseName = item.subcourse.title || item.subcourse.name || "";
                  } else {
                    const subcourseItem = Array.isArray(subcourseObj) ? subcourseObj[0] : subcourseObj;
                    let rawSubName = "";
                    if (typeof subcourseItem === "object" && subcourseItem !== null) {
                      rawSubName = subcourseItem?.title || subcourseItem?.name || subcourseItem?.label || subcourseItem?.slug || "";
                    } else if (typeof subcourseItem === "string") {
                      rawSubName = subcourseItem;
                    }

                    subcourseName = rawSubName && rawSubName === rawSubName.toLowerCase()
                      ? rawSubName.split(/[-_\s]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
                      : rawSubName;
                  }

                  const rawCourseTitle = item.title || "Course";
                  let cardTitle = rawCourseTitle;

                  let shouldAppendSubcourse = false;
                  if (subcourseName && !item.university) {
                    if (!cardTitle.toLowerCase().includes(subcourseName.toLowerCase())) {
                      shouldAppendSubcourse = true;
                    }
                  }

                  if (shouldAppendSubcourse) {
                    cardTitle = `${cardTitle} - ${subcourseName}`;
                  }

                  const rawLogo =
                    uniObj?.logoSrc?.url ||
                    uniObj?.logoSrc ||
                    uniObj?.logoUrl ||
                    (typeof item.logo === "object" ? item.logo?.url : item.logo);
                  const logoUrl = getAssetPath(rawLogo, null);

                  const workspaceObj =
                    Array.isArray(uniObj?.workspaceId) && uniObj.workspaceId.length > 0
                      ? uniObj.workspaceId[0]
                      : typeof uniObj?.workspaceId === "object" && uniObj?.workspaceId !== null
                        ? uniObj.workspaceId
                        : null;

                  const providerName =
                    (typeof offering?.workspace === "object" ? offering?.workspace?.name : null) ||
                    workspaceObj?.name ||
                    (typeof item.tenant === "object" ? item.tenant?.name : null) ||
                    item.tenant ||
                    item.provider ||
                    item.partner ||
                    "upGrad";

                  const durationText =
                    offering?.duration?.title ||
                    (typeof item.duration === "object" ? item.duration?.title : item.duration) ||
                    item.durationText ||
                    (item.durationMonths ? `${item.durationMonths} Month` : "Flexible");

                  const rawFee = item.fees || item.fee;
                  const feeText =
                    offering?.fee?.title ||
                    (offering?.fee?.amount ? `₹${Number(offering.fee.amount).toLocaleString("en-IN")}` : null) ||
                    (typeof rawFee === "object" && rawFee
                      ? (rawFee.title || (rawFee.amount ? `₹${Number(rawFee.amount).toLocaleString("en-IN")}` : "Contact for Fee"))
                      : (rawFee || "Contact for Fee"));

                  // Use subcourse title slug when a subcourse is active, so the detail page shows correct subcourse content
                  const activeSubTitle = subcourseObj?.title || subcourseObj?.name || "";
                  const parentTitle = item.title || "";
                  const subcourseSlug = activeSubTitle && activeSubTitle.trim().toLowerCase() !== parentTitle.trim().toLowerCase()
                    ? activeSubTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
                    : null;
                  const itemSlug = subcourseSlug || item.slug || item._id || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "");
                  const courseDetailHref = itemSlug ? `/courses/${itemSlug}` : "/courses";

                  return (
                    <div
                      key={item._uniqueKey || `${item.title}-${uniName}-${index}`}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden relative group p-4 sm:p-5"
                    >
                      {/* Top Right Provider / Via Badge (Exact upGrad / TimesPRO Corner Tab with Cream Background) */}
                      <div className="absolute top-0 right-0 bg-[#FAF6EC] border-b border-l border-[#E0D5C1] rounded-tr-2xl rounded-bl-2xl px-3 py-1 text-xs font-medium text-gray-700 flex items-center gap-1.5 z-10 shadow-2xs">
                        Via <span className="font-extrabold text-[#E52E2E] text-xs">{providerName}</span>
                      </div>

                      {/* 🖥️ Desktop View (Image 1): Row Layout for sm screens and above */}
                      <div className="hidden sm:flex gap-5 items-start pt-1">
                        {/* Left University Logo Box */}
                        <div className="w-28 sm:w-32 border border-slate-200/90 rounded-xl p-3 bg-white shrink-0 flex flex-col items-center justify-center text-center shadow-xs">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0">
                            {logoUrl ? (
                              <Image
                                src={logoUrl}
                                alt={uniName}
                                fill
                                sizes="80px"
                                unoptimized
                                className="object-contain"
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-sm uppercase">
                                {uniName.charAt(0)}
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-bold text-slate-800 mt-2 line-clamp-2 w-full text-center leading-tight">
                            {uniName}
                          </span>
                        </div>

                        {/* Right Column: Title, Subcourse Badge, Metadata & Action Buttons */}
                        <div className="flex-1 min-w-0 space-y-3 pt-1">
                          {/* Course Title & Subcourse */}
                          <Link href={courseDetailHref} className="hover:text-blue-600 transition-colors block">
                            <h3 className="text-base sm:text-lg font-bold text-[#0B2545] leading-snug line-clamp-2 m-0 tracking-tight">
                              {cardTitle}
                            </h3>
                          </Link>

                          {/* Inline Metadata Row: Fees | Duration | Accredited */}
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-medium text-slate-500">
                            <div>
                              Fees : <span className="text-[#D81B60] font-bold">{feeText.includes("₹") || feeText.includes("INR") ? feeText : `${feeText} INR`}</span>
                            </div>
                            <div>
                              Duration : <span className="text-[#D81B60] font-bold">{durationText}</span>
                            </div>
                            <div>
                              Accredited : <span className="text-[#D81B60] font-bold">{getAccreditation(uniName)}</span>
                            </div>
                          </div>

                          {/* Action Buttons Row */}
                          <div className="flex flex-wrap items-center gap-3 pt-1">
                            <Link
                              href={courseDetailHref}
                              className="bg-[#0B2545] hover:bg-[#061830] text-[#FFFFFF] border-none rounded-lg text-xs font-medium h-9 px-5 cursor-pointer flex items-center justify-center text-center transition-colors no-underline"
                            >
                              View More
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
                              className="bg-[#009F93] hover:bg-[#008278] text-white border-none rounded-lg text-xs font-medium h-9 px-5 cursor-pointer flex items-center justify-center text-center transition-colors"
                            >
                              Apply Now
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                const targetUni = uniObj || (typeof item.university === "object" ? item.university : null);
                                if (targetUni) {
                                  toggleCompare(targetUni);
                                  setIsCompareDrawerOpen(true);
                                }
                              }}
                              className={`font-medium rounded-lg text-xs h-9 px-4 cursor-pointer flex items-center justify-center gap-1 transition-colors border ${isInCompare(uniObj?.slug || item.university?.slug)
                                ? "bg-teal-50 text-[#009F93] border-[#009F93]"
                                : "bg-white text-[#009F93] border-[#009F93] hover:bg-teal-50"
                                }`}
                            >
                              {isInCompare(uniObj?.slug || item.university?.slug) ? "✓ Added" : "+ Add to Compare"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* 📱 Mobile View (Image 2): Compact Layout for screens < sm */}
                      <div className="flex sm:hidden flex-col gap-3 pt-1">
                        {/* Top Row: Left Logo Box | Right Title & Metadata */}
                        <div className="flex gap-3 items-start">
                          {/* Left Logo Box */}
                          <div className="w-18 h-18 border border-slate-200/90 rounded-xl p-1.5 bg-white shrink-0 flex flex-col items-center justify-center text-center shadow-xs">
                            <div className="relative w-10 h-10 shrink-0">
                              {logoUrl ? (
                                <Image
                                  src={logoUrl}
                                  alt={uniName}
                                  fill
                                  sizes="40px"
                                  unoptimized
                                  className="object-contain"
                                />
                              ) : (
                                <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs uppercase">
                                  {uniName.charAt(0)}
                                </div>
                              )}
                            </div>
                            <span className="text-[9px] font-bold text-slate-800 line-clamp-1 w-full text-center leading-none mt-1">
                              {uniName}
                            </span>
                          </div>

                          {/* Right Column: Title & Fees/Duration */}
                          <div className="flex-1 min-w-0 space-y-2">
                            <Link href={courseDetailHref} className="hover:text-blue-600 transition-colors block pr-12 pt-2">
                              <h3 className="text-xs font-bold text-[#0B2545] leading-snug line-clamp-2 m-0">
                                {cardTitle}
                              </h3>
                            </Link>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] font-medium text-slate-500">
                              <div>
                                Fees : <span className="text-[#D81B60] font-bold">{feeText.includes("₹") || feeText.includes("INR") ? feeText : `${feeText} INR`}</span>
                              </div>
                              <div>
                                Duration : <span className="text-[#D81B60] font-bold">{durationText}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Row: 3 Buttons Row */}
                        <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-slate-200">
                          <Link
                            href={courseDetailHref}
                            className="bg-[#0B2545] text-white font-thin text-[11px] h-8 rounded-lg flex items-center justify-center text-center transition-colors no-underline"
                          >
                            View More
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
                            className="bg-[#009F93] text-white font-thin text-[11px] h-8 rounded-lg flex items-center justify-center text-center transition-colors border-none"
                          >
                            Apply Now
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const targetUni = uniObj || (typeof item.university === "object" ? item.university : null);
                              if (targetUni) {
                                toggleCompare(targetUni);
                                setIsCompareDrawerOpen(true);
                              }
                            }}
                            className={`font-thin text-[10px] h-8 rounded-lg flex items-center justify-center text-center transition-colors border ${isInCompare(uniObj?.slug || item.university?.slug)
                              ? "bg-teal-50 text-[#009F93] border-[#009F93]"
                              : "bg-white text-[#009F93] border-[#009F93]"
                              }`}
                          >
                            {isInCompare(uniObj?.slug || item.university?.slug) ? "✓ Added" : "+ Add to Compare"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-xs flex flex-col items-center justify-center gap-3">
              <span className="text-slate-400 font-bold text-base">No programs found matching filters.</span>
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-xl border-none cursor-pointer mt-1"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Ant Design Pagination */}
          {!isLoading && totalPages > 1 && (
            <div className="flex flex-col items-center justify-center w-full pt-6">
              <style>{`
                .course-pagination {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-wrap: wrap;
                  gap: 4px;
                  max-width: 100%;
                }
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
                @media (max-width: 640px) {
                  .course-pagination .ant-pagination-total-text {
                    display: none;
                  }
                  .course-pagination .ant-pagination-item {
                    min-width: 30px;
                    height: 30px;
                    line-height: 28px;
                    font-size: 12px;
                    margin-inline-end: 3px !important;
                  }
                  .course-pagination .ant-pagination-prev .ant-pagination-item-link,
                  .course-pagination .ant-pagination-next .ant-pagination-item-link {
                    height: 30px;
                    width: 30px;
                    font-size: 12px;
                  }
                }
              `}</style>
              <Pagination
                current={currentPage}
                total={totalCount}
                pageSize={ITEMS_PER_PAGE}
                onChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                showTotal={(total, range) => `${range[0]}–${range[1]} of ${total} courses`}
                showSizeChanger={false}
                showLessItems={true}
                className="course-pagination"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Antd Filter Drawer (Opens from Top) */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#1C3569] text-base">Filter Options</span>
            <button
              type="button"
              onClick={handleClearMobileDraftFilters}
              className="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 px-2.5 py-1 rounded-lg border-none cursor-pointer"
            >
              Reset All
            </button>
          </div>
        }
        placement="top"
        onClose={() => setIsMobileDrawerOpen(false)}
        open={isMobileDrawerOpen}
        className="lg:hidden"
        style={{ height: "85vh", borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
        footer={
          <div className="flex items-center gap-3 p-2 bg-white">
            <Button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="flex-1 font-bold h-10 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handleApplyFilters}
              className="flex-1 font-bold h-10 rounded-xl bg-[#1C3569] hover:!bg-[#0d1d3d] border-none"
            >
              Apply Filters
            </Button>
          </div>
        }
      >
        <FilterSidebarContent {...mobileFilterSidebarProps} hideHeader={true} />
      </Drawer>
    </WebsiteLayout>
  );
}
