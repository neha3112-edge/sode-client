"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Input, Button, Drawer, Tag, Breadcrumb, Select, Pagination, Skeleton } from "antd";
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
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { useFormModal, useCompare } from "@/context";
import { getAssetPath } from "@/lib/utils";
import WebsiteLayout from "@/components/layout/WebsiteLayout";
import {
  getWebsiteCoursesFilter,
  getWebsiteCategories,
  getUniversities,
  getWebsiteDurationOptions,
  getWebsiteFeeOptions,
  getWebsiteUniversityOptions,
} from "@/services/api";

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

// Reusable Sidebar Filter Component
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
  isLoadingData = false,
}) {
  const handleCategoryPillClick = (val) => {
    if (isCategoryPillActive(val)) {
      setActiveSubcategory("");
    } else {
      setActiveSubcategory(val);
    }
  };

  const isCategoryPillActive = (val) => {
    if (!activeSubcategory) return false;
    const a = String(activeSubcategory).toLowerCase().replace(/[^a-z0-9]/g, "");
    const v = String(val).toLowerCase().replace(/[^a-z0-9]/g, "");
    return a === v || a.includes(v) || v.includes(a);
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
      {!hideHeader && (
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-extrabold text-base text-[#1C3569] m-0 flex items-center gap-2">
            <SliderFilterIcon className="text-[#1C3569]" /> Filter
          </h3>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer bg-transparent border-none p-0"
            >
              Reset All
            </button>
          )}
        </div>
      )}

        {/* 1. Course Select */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Course</label>
          <Select
            showSearch
            value={activeCategoryTab ? activeCategoryTab.toLowerCase() : "all"}
            onChange={(val) => {
              setActiveCategoryTab(val);
              setCurrentPage(1);
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

        {/* 2. Category CheckableTags */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Category</label>
          <div className="flex flex-wrap gap-1.5">
            {subcategoryList.map((pill) => {
              const active = isCategoryPillActive(pill.value);
              return (
                <Tag.CheckableTag
                  key={pill.value}
                  checked={active}
                  onChange={() => {
                    handleCategoryPillClick(pill.value);
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${active
                      ? "bg-[#1C3569]! text-white! border-[#1C3569]"
                      : "bg-white text-slate-500 border-slate-200 hover:border-[#1C3569] hover:text-[#1C3569]"
                    }`}
                >
                  {pill.label}
                </Tag.CheckableTag>
              );
            })}
          </div>
        </div>

        {/* 3. Duration Filter */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Duration</label>
          <div className="flex flex-wrap gap-1.5">
            {durationList.map((pill) => {
              const active = selectedDuration === pill.value;
              return (
                <Tag.CheckableTag
                  key={pill.value}
                  checked={active}
                  onChange={() => {
                    handleDurationPillClick(pill.value);
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${active
                      ? "bg-[#1C3569]! text-white! border-[#1C3569]"
                      : "bg-white text-slate-500 border-slate-200 hover:border-[#1C3569] hover:text-[#1C3569]"
                    }`}
                >
                  {pill.label}
                </Tag.CheckableTag>
              );
            })}
          </div>
        </div>

        {/* 4. Fee Range */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Fee Range</label>
          <Select
            value={selectedFee}
            onChange={(val) => {
              setSelectedFee(val);
              setCurrentPage(1);
            }}
            className="w-full font-semibold rounded-xl"
            size="middle"
            options={feeList.map((f) => ({ value: f.value, label: f.label }))}
          />
        </div>

        {/* 5. Institute Dropdown */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Institute</label>
          <Select
            showSearch
            value={selectedUniversities[0] || "all"}
            onChange={(val) => {
              if (val === "all") setSelectedUniversities([]);
              else setSelectedUniversities([val]);
              setCurrentPage(1);
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

        <div className="pt-4">
          <Button
            type="primary"
            onClick={onApplyFilter}
            className="w-full bg-[#1C3569] hover:bg-[#0d1d3d]! text-white font-bold h-10 rounded-xl cursor-pointer border-none"
          >
            Apply Filter
          </Button>
        </div>
      </div>
    );
  };

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

function CoursesContent() {
  const [coursesData, setCoursesData] = useState({ programs: [], total: 0, totalPages: 1, page: 1 });
  const [initialCategories, setInitialCategories] = useState([]);
  const [initialCategoryTree, setInitialCategoryTree] = useState([]);
  const [initialUniversities, setInitialUniversities] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const searchParams = useSearchParams();
  const initialCat = searchParams?.get("category") || "all";
  const initialSubcat = searchParams?.get("subcategory") || searchParams?.get("subcourse") || "";
  const initialQuery = searchParams?.get("search") || "";
  const initialUnis = searchParams?.get("university") ? searchParams.get("university").split(",").map((u) => u.trim()) : [];

  const [searchInputValue, setSearchInputValue] = useState(initialQuery);
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(initialQuery);

  const [activeCategoryTab, setActiveCategoryTab] = useState(initialCat);
  const [activeSubcategory, setActiveSubcategory] = useState(initialSubcat);
  const [selectedUniversities, setSelectedUniversities] = useState(initialUnis);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedFee, setSelectedFee] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const { openFormModal } = useFormModal();
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen } = useCompare();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getWebsiteCategories(),
      getUniversities({ limit: 100 }),
    ])
      .then(([categoriesRes, unisRes]) => {
        if (!isMounted) return;
        setInitialCategories(categoriesRes?.categories || categoriesRes?.result || []);
        setInitialCategoryTree(categoriesRes?.tree || []);
        setInitialUniversities(unisRes?.result || unisRes || []);
      })
      .catch((err) => {
        console.error("Error loading initial filter options:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingData(true);

    getWebsiteCoursesFilter({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      category: activeCategoryTab,
      subcategory: activeSubcategory,
      university: selectedUniversities,
      duration: selectedDuration,
      fee: selectedFee,
      search: appliedSearchTerm,
      sort: sortBy,
    })
      .then((res) => {
        if (!isMounted) return;
        setCoursesData(res || { programs: [], total: 0, totalPages: 1, page: 1 });
      })
      .catch((err) => {
        console.error("Error fetching website university offerings filter:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingData(false);
      });

    return () => {
      isMounted = false;
    };
  }, [
    currentPage,
    activeCategoryTab,
    activeSubcategory,
    selectedUniversities,
    selectedDuration,
    selectedFee,
    appliedSearchTerm,
    sortBy,
  ]);

  const initialList = useMemo(() => {
    return Array.isArray(coursesData.programs) ? coursesData.programs : [];
  }, [coursesData.programs]);

  // Process cards returned directly from backend UniversityOffering API
  const processedPrograms = useMemo(() => {
    const list = [];
    (initialList || []).forEach((item, index) => {
      if (!item) return;

      // Check if item is a direct UniversityOffering document
      const isOffering = Boolean(item.universityId || item.courseId);

      if (isOffering) {
        const uni = item.universityId || {};
        const course = item.courseId || {};
        const subcourse = item.subCourseId || {};
        const fees = item.fees || {};
        const duration = item.duration || {};
        const partner = Array.isArray(item.partner) && item.partner.length > 0
          ? item.partner[0]
          : (item.partner || null);

        const uniName = uni.name || "Partner University";
        const courseName = course.name || "";
        const subcourseName = subcourse.name || "";

        let cardTitle = courseName;
        if (subcourseName && !cardTitle.toLowerCase().includes(subcourseName.toLowerCase())) {
          cardTitle = `${cardTitle} - ${subcourseName}`;
        }
        if (!cardTitle) cardTitle = item.title || item.name || "Course";

        const rawLogo =
          uni.logo?.url ||
          uni.logo?.path ||
          uni.logoSrc?.url ||
          uni.logoSrc ||
          uni.logo;
        const logoUrl = getAssetPath(rawLogo, null);

        const providerName = partner?.name || "upGrad";

        let durationText = "Flexible";
        if (duration.months) {
          durationText = `${duration.months} Months`;
        } else if (duration.name) {
          durationText = duration.name;
        } else if (item.durationMonths) {
          durationText = `${item.durationMonths} Month`;
        }

        let feeText = "Contact for Fee";
        if (fees.amount) {
          feeText = `₹${Number(fees.amount).toLocaleString("en-IN")}`;
        } else if (fees.name) {
          feeText = fees.name.includes("₹") ? fees.name : `₹${fees.name}`;
        }

        const itemSlug = subcourse.slug || course.slug || course._id || item._id;
        const courseDetailHref = itemSlug ? `/courses/${encodeURIComponent(itemSlug)}` : "/courses";

        list.push({
          ...item,
          _uniqueKey: item._id || `${courseName}-${uniName}-${index}`,
          title: cardTitle,
          cardTitle,
          uniName,
          uniObj: uni,
          courseObj: course,
          subcourseObj: subcourse,
          logoUrl,
          providerName,
          durationText,
          feeText,
          courseDetailHref,
          accreditation: Array.isArray(uni.approvals) && uni.approvals.length > 0
            ? uni.approvals.map((a) => (typeof a === "object" ? a.name || a.code : a)).filter(Boolean).join(", ")
            : getAccreditation(uniName),
        });
      } else if (item.university) {
        list.push({
          ...item,
          _uniqueKey: item._id || item.slug || String(Math.random()),
        });
      } else {
        const offerings = Array.isArray(item.universityOfferings) ? item.universityOfferings : [];
        if (offerings.length > 0) {
          offerings.forEach((offering, oIdx) => {
            const subItems = Array.isArray(offering?.subcourses) && offering.subcourses.length > 0
              ? offering.subcourses
              : (Array.isArray(offering?.subcourseOfferings) && offering.subcourseOfferings.length > 0
                ? offering.subcourseOfferings
                : null);

            if (subItems) {
              subItems.forEach((subOff, sIdx) => {
                list.push({
                  ...item,
                  _uniqueKey: `${item._id || item.slug}-offering-${oIdx}-suboff-${sIdx}`,
                  activeOffering: offering,
                  activeSubOffering: subOff,
                  activeSubcourse: subOff.subcourse || subOff,
                });
              });
            } else {
              list.push({
                ...item,
                _uniqueKey: `${item._id || item.slug}-offering-${oIdx}`,
                activeOffering: offering,
                activeSubOffering: null,
                activeSubcourse: null,
              });
            }
          });
        } else {
          list.push({
            ...item,
            _uniqueKey: item._id || item.slug || String(Math.random()),
            activeOffering: null,
            activeSubOffering: null,
            activeSubcourse: null,
          });
        }
      }
    });

    if (sortBy === "title-asc") {
      list.sort((a, b) => (a.title || a.cardTitle || "").localeCompare(b.title || b.cardTitle || ""));
    } else if (sortBy === "title-desc") {
      list.sort((a, b) => (b.title || b.cardTitle || "").localeCompare(a.title || a.cardTitle || ""));
    }

    return list;
  }, [initialList, sortBy]);

  const totalCount = coursesData.total ?? processedPrograms.length;
  const totalPages = coursesData.totalPages ?? (Math.ceil(totalCount / ITEMS_PER_PAGE) || 1);

  const categorySelectOptions = useMemo(() => [
    { value: "all", label: "All Categories" },
    { value: "doctorate", label: "Doctorate" },
    { value: "master", label: "Master" },
    { value: "bachelor", label: "Bachelor" },
    { value: "certification", label: "Certification" },
    { value: "diploma", label: "Diploma" },
    { value: "management", label: "Management" },
    { value: "dual-master-doctorate", label: "Master+Doctorate (Dual)" },
  ], []);

  const subcategoryList = useMemo(() => [
    { label: "Management", value: "management" },
    { label: "AI Courses", value: "ai-courses" },
    { label: "Machine Learning", value: "machine-learning" },
    { label: "HR", value: "hr" },
    { label: "Banking", value: "banking" },
    { label: "Finance", value: "finance" },
    { label: "Leadership", value: "leadership" },
    { label: "Data Science", value: "data-science" },
  ], []);

  const durationList = useMemo(() => [
    { label: "06 Month", value: "06-month" },
    { label: "06-12 Months", value: "06-12-months" },
    { label: "12-36 Months", value: "12-36-months" },
  ], []);

  const feeList = useMemo(() => [
    { label: "All", value: "all" },
    { label: "0-1 Lakh", value: "0-1-lakh" },
    { label: "1-2 Lakh", value: "1-2-lakh" },
    { label: "2-5 Lakh", value: "2-5-lakh" },
    { label: "5-10 Lakh", value: "5-10-lakh" },
    { label: "Above 10 Lakh", value: "above-10-lakh" },
  ], []);

  const universityOptions = useMemo(() => {
    const map = new Map();
    map.set("all", { value: "all", label: "All Institutes" });

    const addUni = (uni) => {
      if (!uni) return;
      const name = typeof uni === "string" ? uni.trim() : (uni.label || uni.name || uni.title || "");
      const slug = typeof uni === "string"
        ? uni.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-")
        : (uni.slug || (typeof uni.value === "string" && uni.value.includes("-") ? uni.value : "") || uni.slug || uni._id || uni.value || "");

      if (name && slug) {
        const key = name.trim().toLowerCase();
        const existing = map.get(key);
        if (!existing || (existing.value && existing.value.length > 20 && String(slug).includes("-"))) {
          map.set(key, { value: String(slug), label: name });
        }
      }
    };

    if (Array.isArray(initialUniversities)) initialUniversities.forEach(addUni);
    if (Array.isArray(initialList)) {
      initialList.forEach((p) => {
        if (p?.universityId) addUni(p.universityId);
        if (p?.university) addUni(p.university);
        if (Array.isArray(p?.universityOfferings)) {
          p.universityOfferings.forEach((off) => addUni(off?.university));
        }
      });
    }

    return Array.from(map.values());
  }, [initialUniversities, initialList]);

  const [draftCategoryTab, setDraftCategoryTab] = useState(activeCategoryTab);
  const [draftSubcategory, setDraftSubcategory] = useState(activeSubcategory);
  const [draftUniversities, setDraftUniversities] = useState(selectedUniversities);
  const [draftDuration, setDraftDuration] = useState(selectedDuration);
  const [draftFee, setDraftFee] = useState(selectedFee);

  const handleClearFilters = () => {
    setSearchInputValue("");
    setAppliedSearchTerm("");
    setActiveCategoryTab("all");
    setActiveSubcategory("");
    setSelectedUniversities([]);
    setSelectedDuration("all");
    setSelectedFee("all");

    setDraftCategoryTab("all");
    setDraftSubcategory("");
    setDraftUniversities([]);
    setDraftDuration("all");
    setDraftFee("all");

    setSortBy("featured");
    setCurrentPage(1);

    if (router && pathname) {
      router.replace(pathname, { scroll: false });
    }
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

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

  const activeFilterCount =
    (activeCategoryTab !== "all" ? 1 : 0) +
    (activeSubcategory ? 1 : 0) +
    selectedUniversities.length +
    (selectedDuration !== "all" ? 1 : 0) +
    (selectedFee !== "all" ? 1 : 0) +
    (appliedSearchTerm ? 1 : 0);

  const desktopFilterSidebarProps = {
    activeFilterCount,
    handleClearFilters,
    onApplyFilter: () => { },
    activeCategoryTab,
    setActiveCategoryTab: (val) => {
      setActiveCategoryTab(val);
      setCurrentPage(1);
    },
    activeSubcategory,
    setActiveSubcategory: (val) => {
      setActiveSubcategory(val);
      setCurrentPage(1);
    },
    selectedUniversities,
    setSelectedUniversities: (val) => {
      setSelectedUniversities(val);
      setCurrentPage(1);
    },
    selectedDuration,
    setSelectedDuration: (val) => {
      setSelectedDuration(val);
      setCurrentPage(1);
    },
    selectedFee,
    setSelectedFee: (val) => {
      setSelectedFee(val);
      setCurrentPage(1);
    },
    categorySelectOptions,
    subcategoryList,
    durationList,
    feeList,
    universityOptions,
    setCurrentPage,
    isLoadingData,
  };

  const mobileFilterSidebarProps = {
    ...desktopFilterSidebarProps,
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
    onApplyFilter: handleApplyFilters,
    handleClearFilters: () => {
      handleClearMobileDraftFilters();
      handleClearFilters();
    },
  };

  return (
    <WebsiteLayout py="py-4 sm:py-6" bg="#f8fafc">
      {/* Back Button + Breadcrumb */}
      <div className="flex items-center gap-2.5 mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center justify-center text-slate-500 hover:text-[#1C3569] transition-colors cursor-pointer p-0 shrink-0 -translate-y-[1.5px]"
          title="Go Back"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
        </button>
        <Breadcrumb className="text-xs font-semibold leading-none" items={[
          { title: <Link href="/">Home</Link> },
          { title: "Browse Courses" }
        ]} />
      </div>

      {/* Mobile Filter Bar */}
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
          className="bg-[#1C3569] hover:bg-[#0d1d3d]! font-bold h-8 rounded-lg cursor-pointer shrink-0 text-xs px-3 border-none flex items-center gap-1"
        >
          {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs sticky top-6">
          <FilterSidebarContent {...desktopFilterSidebarProps} />
        </div>

        {/* Right Main Course Listing */}
        <div className="lg:col-span-9 space-y-6">
          {/* Active Filters Bar */}
          <div className="hidden md:flex bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#1C3569] text-white text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
                {totalCount} Courses Found
              </span>

              {activeFilterCount > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {activeCategoryTab !== "all" && (
                    <Tag
                      closable
                      onClose={() => setActiveCategoryTab("all")}
                      className="bg-blue-50 text-blue-700 border-blue-200 rounded-lg text-xs font-medium px-2 py-0.5"
                    >
                      Degree: {categorySelectOptions.find((c) => c.value === activeCategoryTab)?.label || activeCategoryTab}
                    </Tag>
                  )}
                  {activeSubcategory && (
                    <Tag
                      closable
                      onClose={() => setActiveSubcategory("")}
                      className="bg-blue-50 text-blue-700 border-blue-200 rounded-lg text-xs font-medium px-2 py-0.5"
                    >
                      Category: {subcategoryList.find((c) => c.value === activeSubcategory)?.label || activeSubcategory}
                    </Tag>
                  )}
                  {selectedUniversities.map((uni) => (
                    <Tag
                      key={uni}
                      closable
                      onClose={() => setSelectedUniversities(selectedUniversities.filter((u) => u !== uni))}
                      className="bg-emerald-50 text-emerald-700 border-emerald-200 rounded-lg text-xs font-medium px-2 py-0.5"
                    >
                      {universityOptions.find((u) => u.value === uni)?.label || uni}
                    </Tag>
                  ))}
                  {selectedDuration !== "all" && (
                    <Tag
                      closable
                      onClose={() => setSelectedDuration("all")}
                      className="bg-purple-50 text-purple-700 border-purple-200 rounded-lg text-xs font-medium px-2 py-0.5"
                    >
                      Duration: {durationList.find((d) => d.value === selectedDuration)?.label || selectedDuration}
                    </Tag>
                  )}
                  {selectedFee !== "all" && (
                    <Tag
                      closable
                      onClose={() => setSelectedFee("all")}
                      className="bg-amber-50 text-amber-700 border-amber-200 rounded-lg text-xs font-medium px-2 py-0.5"
                    >
                      Fee: {feeList.find((f) => f.value === selectedFee)?.label || selectedFee}
                    </Tag>
                  )}
                  {appliedSearchTerm && (
                    <Tag
                      closable
                      onClose={() => {
                        setSearchInputValue("");
                        setAppliedSearchTerm("");
                      }}
                      className="bg-slate-100 text-slate-700 border-slate-300 rounded-lg text-xs font-medium px-2 py-0.5"
                    >
                      Search: &ldquo;{appliedSearchTerm}&rdquo;
                    </Tag>
                  )}
                </div>
              )}
            </div>

            {/* Clear All Filters Button */}
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer bg-transparent border-none p-0 flex items-center gap-1"
              >
                <ReloadOutlined className="text-[10px]" /> Clear All
              </button>
            )}
          </div>

          {/* Course Cards / Skeleton Shimmer */}
          {isLoadingData ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start shadow-2xs"
                >
                  <div className="w-28 sm:w-32 border border-slate-100 rounded-xl p-3 bg-slate-50/50 shrink-0 flex flex-col items-center justify-center">
                    <Skeleton.Avatar active size={64} shape="square" style={{ borderRadius: 12 }} />
                    <Skeleton.Input active size="small" style={{ width: 70, height: 12, marginTop: 8 }} />
                  </div>
                  <div className="flex-1 space-y-3 w-full">
                    <Skeleton.Input active size="small" style={{ width: "65%", height: 20 }} />
                    <div className="flex flex-wrap gap-4">
                      <Skeleton.Input active size="small" style={{ width: 100, height: 14 }} />
                      <Skeleton.Input active size="small" style={{ width: 100, height: 14 }} />
                      <Skeleton.Input active size="small" style={{ width: 120, height: 14 }} />
                    </div>
                    <div className="flex gap-3 pt-1">
                      <Skeleton.Button active size="small" style={{ width: 100, height: 36, borderRadius: 8 }} />
                      <Skeleton.Button active size="small" style={{ width: 140, height: 36, borderRadius: 8 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : processedPrograms.length > 0 ? (
            <div className="space-y-4">
              {(() => {
                const paginatedItems = processedPrograms;

                return paginatedItems.map((item, index) => {
                  const uniName = item.uniName || item.university?.name || (typeof item.university === "string" ? item.university : "Partner University");
                  const cardTitle = item.cardTitle || item.title || item.name || "Course";
                  const logoUrl = item.logoUrl || getAssetPath(item.logoSrc || item.logo?.url || item.logo, null);
                  const providerName = item.providerName || "upGrad";
                  const durationText = item.durationText || "Flexible";
                  const feeText = item.feeText || "Contact for Fee";
                  const courseDetailHref = item.courseDetailHref || `/courses/${encodeURIComponent(item.slug || item._id || "")}`;
                  const accreditation = item.accreditation || getAccreditation(uniName);

                  return (
                    <div
                      key={item._uniqueKey || `${item.title}-${uniName}-${index}`}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden relative group p-4 sm:p-5"
                    >
                      {/* Top Right Provider Badge */}
                      <div className="absolute top-0 right-0 bg-[#FAF6EC] border-b border-l border-[#E0D5C1] rounded-tr-2xl rounded-bl-2xl px-3 py-1 text-xs font-medium text-gray-700 flex items-center gap-1.5 z-10 shadow-2xs">
                        Via <span className="font-extrabold text-[#E52E2E] text-xs">{providerName}</span>
                      </div>

                      {/* Desktop View */}
                      <div className="hidden sm:flex gap-5 items-start pt-1">
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

                        <div className="flex-1 min-w-0 space-y-3 pt-1">
                          <Link href={courseDetailHref} className="hover:text-blue-600 transition-colors block">
                            <h3 className="text-base sm:text-lg font-bold text-[#0B2545] leading-snug line-clamp-2 m-0 tracking-tight">
                              {cardTitle}
                            </h3>
                          </Link>

                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-medium text-slate-500">
                            <div>
                              Fees : <span className="text-[#D81B60] font-bold">{feeText.includes("₹") || feeText.includes("INR") ? feeText : `${feeText} INR`}</span>
                            </div>
                            <div>
                              Duration : <span className="text-[#D81B60] font-bold">{durationText}</span>
                            </div>
                            <div>
                              Accredited : <span className="text-[#D81B60] font-bold">{accreditation}</span>
                            </div>
                          </div>

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
                                const targetItem = {
                                  _id: item._id || item.slug,
                                  slug: item.slug || item._id,
                                  title: cardTitle,
                                  uniName: uniName,
                                  uniSlug: item.uniObj?.slug || item.university?.slug || "",
                                  logoUrl: logoUrl,
                                  feeText: feeText,
                                  durationText: durationText,
                                  university: item.uniObj || item.university,
                                };
                                toggleCompare(targetItem);
                                setIsCompareDrawerOpen(true);
                              }}
                              className={`font-medium rounded-lg text-xs h-9 px-4 cursor-pointer flex items-center justify-center gap-1 transition-colors border ${isInCompare(item._id || item.slug || cardTitle)
                                  ? "bg-teal-50 text-[#009F93] border-[#009F93]"
                                  : "bg-white text-[#009F93] border-[#009F93] hover:bg-teal-50"
                                }`}
                            >
                              {isInCompare(item._id || item.slug || cardTitle) ? "✓ Added" : "+ Add to Compare"}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Mobile View */}
                      <div className="flex sm:hidden flex-col gap-3 pt-1">
                        <div className="flex gap-3 items-start">
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
                              const targetItem = {
                                _id: item._id || item.slug,
                                slug: item.slug || item._id,
                                title: cardTitle,
                                uniName: uniName,
                                uniSlug: item.uniObj?.slug || item.university?.slug || "",
                                logoUrl: logoUrl,
                                feeText: feeText,
                                durationText: durationText,
                                university: item.uniObj || item.university,
                              };
                              toggleCompare(targetItem);
                              setIsCompareDrawerOpen(true);
                            }}
                            className={`rounded-lg text-[11px] h-8 flex items-center justify-center transition-colors border ${isInCompare(item._id || item.slug || cardTitle)
                                ? "bg-teal-50 text-[#009F93] border-[#009F93] font-bold"
                                : "bg-white text-[#009F93] border-[#009F93] font-thin"
                              }`}
                          >
                            {isInCompare(item._id || item.slug || cardTitle) ? "✓ Added" : "+ Compare"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                <SearchOutlined />
              </div>
              <h3 className="text-xl font-bold text-slate-800 m-0">No Programs Found</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto m-0">
                We couldn&apos;t find any programs matching your selected criteria. Try adjusting your filters or search terms.
              </p>
              <Button
                type="primary"
                onClick={handleClearFilters}
                className="bg-[#1C3569] font-bold h-10 px-6 rounded-xl border-none cursor-pointer"
              >
                Reset All Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-6 pb-2">
              <Pagination
                current={currentPage}
                total={totalCount}
                pageSize={ITEMS_PER_PAGE}
                onChange={(page) => {
                  setCurrentPage(page);
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                showSizeChanger={false}
                className="font-semibold"
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Filter */}
      <Drawer
        title={
          <div className="flex items-center justify-between w-full pr-6">
            <h3 className="font-extrabold text-base text-[#1C3569] m-0 flex items-center gap-2">
              <SliderFilterIcon className="text-[#1C3569]" /> All Filters
            </h3>
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleClearMobileDraftFilters}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer bg-transparent border-none p-0"
              >
                Reset
              </button>
            )}
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
              className="flex-1 font-bold h-10 rounded-xl bg-[#1C3569] hover:bg-[#0d1d3d]! border-none"
            >
              Apply Filters
            </Button>
          </div>
        }
      >
        <FilterSidebarContent hideHeader {...mobileFilterSidebarProps} />
      </Drawer>
    </WebsiteLayout>
  );
}

export default function CoursesPage() {
  return (
    <Suspense
      fallback={
        <WebsiteLayout activeTab="courses" title="Loading Courses | SODE">
          <div className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Skeleton.Avatar active size="large" shape="square" style={{ borderRadius: 8 }} />
                    <div className="flex-1">
                      <Skeleton.Input active size="small" style={{ width: "80%", height: 18 }} />
                      <Skeleton.Input active size="small" style={{ width: "45%", height: 14, marginTop: 4 }} />
                    </div>
                  </div>
                  <Skeleton active paragraph={{ rows: 3, width: ["100%", "90%", "70%"] }} />
                  <div className="pt-3 border-t border-slate-100 flex justify-between items-center mt-auto">
                    <Skeleton.Input active size="small" style={{ width: 80, height: 16 }} />
                    <Skeleton.Button active size="small" style={{ width: 75, height: 28, borderRadius: 8 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WebsiteLayout>
      }
    >
      <CoursesContent />
    </Suspense>
  );
}
