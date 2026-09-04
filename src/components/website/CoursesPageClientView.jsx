"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  RotateCcw,
  SlidersHorizontal,
  ChevronUp,
  ChevronDown,
  Landmark,
  Plus,
  Check,
  Search,
  ArrowLeft,
  X,
} from "lucide-react";
import { Select, Drawer, Pagination, Modal, Slider, ConfigProvider } from "antd";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import { getAssetPath } from "@/lib/utils";
import WebsiteLayout from "@/components/layout/WebsiteLayout";
import { request } from "@/services/request";

// Sidebar Filter Component matching exact mockup design
function FilterSidebarContent({
  hideHeader = false,
  activeFilterCount,
  handleClearFilters,
  activeCategoryTab,
  setActiveCategoryTab,
  selectedCourse,
  setSelectedCourse,
  selectedSubCourse,
  setSelectedSubCourse,
  selectedDuration,
  setSelectedDuration,
  activeSubcategory,
  setActiveSubcategory,
  selectedFee,
  setSelectedFee,
  selectedUniversities,
  setSelectedUniversities,
  feeRange = [0, 1000000],
  setFeeRange,
  durationRange = [3, 48],
  setDurationRange,
  categorySelectOptions = [],
  subcategorySelectOptions = [],
  courseSelectOptions = [],
  subcourseSelectOptions = [],
  universityOptions = [],
  setCurrentPage,
}) {
  const currentCategoryValue =
    Array.isArray(activeCategoryTab)
      ? activeCategoryTab[0] || "all"
      : activeCategoryTab || "all";

  return (
    <div className="space-y-5">
      {/* Header: Title + Clear Filters */}
      {!hideHeader && (
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-900" />
            <span className="text-sm font-bold text-gray-900">Filter</span>
          </div>
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filter</span>
          </button>
        </div>
      )}

      {/* Row 1: Category Select */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1 text-xs font-semibold text-gray-700">
          <BookOpen className="w-3 h-3 text-gray-700" />
          <span>Category</span>
        </label>
        <Select
          showSearch
          placeholder="All Categories"
          value={currentCategoryValue}
          onChange={(val) => {
            if (val === "all") {
              setActiveCategoryTab("all");
            } else {
              setActiveCategoryTab(val);
            }
            if (typeof setCurrentPage === "function") setCurrentPage(1);
          }}
          className="w-full"
          options={categorySelectOptions}
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>

      {/* Row 2: Sub Category Select */}
      <div className="space-y-1.5 pt-1">
        <label className="flex items-center gap-1 text-xs font-semibold text-gray-700">
          <BookOpen className="w-3 h-3 text-gray-700" />
          <span>Sub Category</span>
        </label>
        <Select
          showSearch
          placeholder="All Sub Categories"
          value={
            Array.isArray(activeSubcategory) && activeSubcategory.length > 0
              ? activeSubcategory[0]
              : "all"
          }
          onChange={(val) => {
            setActiveSubcategory(val === "all" ? [] : [val]);
            if (typeof setCurrentPage === "function") setCurrentPage(1);
          }}
          className="w-full"
          options={subcategorySelectOptions}
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>

      {/* Row 3: Course Select */}
      <div className="space-y-1.5 pt-1">
        <label className="flex items-center gap-1 text-xs font-semibold text-gray-700">
          <BookOpen className="w-3 h-3 text-gray-700" />
          <span>Course</span>
        </label>
        <Select
          showSearch
          placeholder="All Courses"
          value={selectedCourse || "all"}
          onChange={(val) => {
            if (setSelectedCourse) setSelectedCourse(val === "all" ? "" : val);
            if (typeof setCurrentPage === "function") setCurrentPage(1);
          }}
          className="w-full"
          options={courseSelectOptions}
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>

      {/* Row 4: Sub Course / Specialization Select */}
      <div className="space-y-1.5 pt-1">
        <label className="flex items-center gap-1 text-xs font-semibold text-gray-700">
          <BookOpen className="w-3 h-3 text-gray-700" />
          <span>Sub Course</span>
        </label>
        <Select
          showSearch
          placeholder="All Sub Courses"
          value={selectedSubCourse || "all"}
          onChange={(val) => {
            if (setSelectedSubCourse) setSelectedSubCourse(val === "all" ? "" : val);
            if (typeof setCurrentPage === "function") setCurrentPage(1);
          }}
          className="w-full"
          options={subcourseSelectOptions}
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>

      {/* Row 5: Institute Dropdown */}
      <div className="space-y-1.5 pt-1">
        <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
          <Landmark className="w-3.5 h-3.5 text-gray-700" />
          <span>Institute</span>
        </label>
        <Select
          showSearch
          placeholder="All Institute"
          value={
            selectedUniversities && selectedUniversities.length > 0
              ? selectedUniversities[0]
              : "all"
          }
          onChange={(val) => {
            if (val === "all") setSelectedUniversities([]);
            else setSelectedUniversities([val]);
            if (typeof setCurrentPage === "function") setCurrentPage(1);
          }}
          className="w-full"
          options={universityOptions}
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>

      {/* Sliders Container wrapped in Website Dark Blue Theme */}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0a2540",
            colorPrimaryBorder: "#0a2540",
            colorPrimaryHover: "#06182c",
            colorPrimaryBorderHover: "#06182c",
          },
          components: {
            Slider: {
              trackBg: "#0a2540",
              trackHoverBg: "#06182c",
              handleColor: "#0a2540",
              handleActiveColor: "#06182c",
              dotBorderColor: "#0a2540",
              handleActiveOutlineColor: "rgba(10, 37, 64, 0.2)",
            },
          },
        }}
      >
        {/* Row 4: Fees Range Slider */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
              <span className="font-bold text-xs text-gray-700">₹</span>
              <span>Fees Range</span>
            </label>
            <span className="text-[11px] font-bold text-[#0a2540] bg-[#0a2540]/10 px-2 py-0.5 rounded-md border border-[#0a2540]/20">
              {feeRange[0] === 0 && feeRange[1] >= 1000000
                ? "All Fees"
                : `₹${(feeRange[0] / 1000).toFixed(0)}k - ₹${feeRange[1] >= 1000000 ? "10L+" : `${(feeRange[1] / 100000).toFixed(1)}L`}`}
            </span>
          </div>
          <Slider
            range
            min={0}
            max={1000000}
            step={25000}
            value={feeRange}
            onChange={(val) => {
              if (setFeeRange) setFeeRange(val);
              if (typeof setCurrentPage === "function") setCurrentPage(1);
            }}
            tooltip={{
              formatter: (val) => `₹ ${Number(val).toLocaleString("en-IN")}`,
            }}
            styles={{
              track: { backgroundColor: "#0a2540" },
              tracks: { backgroundColor: "#0a2540" },
              handle: { borderColor: "#0a2540", backgroundColor: "#0a2540" },
            }}
            className="my-2"
          />
          <div className="flex justify-between text-[10px] font-medium text-gray-400">
            <span>₹0</span>
            <span>₹5L</span>
            <span>₹10L+</span>
          </div>
        </div>

        {/* Row 5: Duration Range Slider */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
              <Clock className="w-3.5 h-3.5 text-gray-700" />
              <span>Duration</span>
            </label>
            <span className="text-[11px] font-bold text-[#0a2540] bg-[#0a2540]/10 px-2 py-0.5 rounded-md border border-[#0a2540]/20">
              {durationRange[0] <= 3 && durationRange[1] >= 48
                ? "All Durations"
                : `${durationRange[0]} Mo - ${durationRange[1] >= 48 ? "48+ Mo" : `${durationRange[1]} Mo`}`}
            </span>
          </div>
          <Slider
            range
            min={3}
            max={48}
            step={3}
            value={durationRange}
            onChange={(val) => {
              if (setDurationRange) setDurationRange(val);
              if (typeof setCurrentPage === "function") setCurrentPage(1);
            }}
            tooltip={{
              formatter: (val) => `${val} Months`,
            }}
            styles={{
              track: { backgroundColor: "#0a2540" },
              tracks: { backgroundColor: "#0a2540" },
              handle: { borderColor: "#0a2540", backgroundColor: "#0a2540" },
            }}
            className="my-2"
          />
          <div className="flex justify-between text-[10px] font-medium text-gray-400">
            <span>3 Mos</span>
            <span>24 Mos</span>
            <span>48+ Mos</span>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
}

function CoursesContent({
  initialCoursesData = { programs: [], total: 0, totalPages: 1, page: 1 },
  initialCategories: initialCategoriesProp = [],
  initialUniversities: initialUniversitiesProp = [],
}) {
  const [coursesData, setCoursesData] = useState(initialCoursesData);
  const [initialCategories, setInitialCategories] = useState(initialCategoriesProp);
  const [initialUniversities, setInitialUniversities] = useState(initialUniversitiesProp);
  const [coursesOptionsList, setCoursesOptionsList] = useState([]);
  const [subcoursesOptionsList, setSubcoursesOptionsList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const searchParams = useSearchParams();
  const initialCat = searchParams?.get("category") || "all";
  const initialSubcat = searchParams?.get("subcategory") || searchParams?.get("subCategory") || searchParams?.get("subcourse") || "";
  const initialSubcatArr = initialSubcat ? initialSubcat.split(",").map((s) => s.trim()) : [];
  const initialCourse = searchParams?.get("course") || searchParams?.get("courseId") || "";
  const initialSubCourse = searchParams?.get("subCourse") || searchParams?.get("subcourseId") || "";
  const initialQuery = searchParams?.get("search") || "";
  const initialUnis = searchParams?.get("university") ? searchParams.get("university").split(",").map((u) => u.trim()) : [];

  const [appliedSearchTerm, setAppliedSearchTerm] = useState(initialQuery);
  const [activeCategoryTab, setActiveCategoryTab] = useState(initialCat);
  const [activeSubcategory, setActiveSubcategory] = useState(initialSubcatArr);
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [selectedSubCourse, setSelectedSubCourse] = useState(initialSubCourse);
  const [selectedUniversities, setSelectedUniversities] = useState(initialUnis);
  const [feeRange, setFeeRange] = useState([0, 1000000]);
  const [durationRange, setDurationRange] = useState([3, 48]);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedFee, setSelectedFee] = useState("all");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [specializationModalData, setSpecializationModalData] = useState(null);

  // Mobile Filter Draft State
  const [draftCategoryTab, setDraftCategoryTab] = useState(initialCat);
  const [draftSubcategory, setDraftSubcategory] = useState(initialSubcatArr);
  const [draftSelectedCourse, setDraftSelectedCourse] = useState(initialCourse);
  const [draftSelectedSubCourse, setDraftSelectedSubCourse] = useState(initialSubCourse);
  const [draftUniversities, setDraftUniversities] = useState(initialUnis);
  const [draftFeeRange, setDraftFeeRange] = useState([0, 1000000]);
  const [draftDurationRange, setDraftDurationRange] = useState([3, 48]);

  useEffect(() => {
    if (isMobileDrawerOpen) {
      setDraftCategoryTab(activeCategoryTab);
      setDraftSubcategory(activeSubcategory);
      setDraftSelectedCourse(selectedCourse);
      setDraftSelectedSubCourse(selectedSubCourse);
      setDraftUniversities(selectedUniversities);
      setDraftFeeRange(feeRange);
      setDraftDurationRange(durationRange);
    }
  }, [isMobileDrawerOpen, activeCategoryTab, activeSubcategory, selectedCourse, selectedSubCourse, selectedUniversities, feeRange, durationRange]);

  const handleApplyMobileFilters = () => {
    setActiveCategoryTab(draftCategoryTab);
    setActiveSubcategory(draftSubcategory);
    setSelectedCourse(draftSelectedCourse);
    setSelectedSubCourse(draftSelectedSubCourse);
    setSelectedUniversities(draftUniversities);
    setFeeRange(draftFeeRange);
    setDurationRange(draftDurationRange);
    setCurrentPage(1);
    setIsMobileDrawerOpen(false);
  };

  const handleResetMobileFilters = () => {
    setDraftCategoryTab("all");
    setDraftSubcategory([]);
    setDraftSelectedCourse("");
    setDraftSelectedSubCourse("");
    setDraftUniversities([]);
    setDraftFeeRange([0, 1000000]);
    setDraftDurationRange([3, 48]);
  };

  const { openFormModal } = useFormModal();
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen } = useCompare();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      request.dynamicList({ entity: "category", endPoint: "v1/list", revalidate: 900 }),
      request.dynamicList({ entity: "universities", endPoint: "v1/list", options: { items: 100 }, revalidate: 300 }),
      request.dynamicList({ entity: "courses", endPoint: "v1/options", revalidate: 300 }),
      request.dynamicList({ entity: "subcourses", endPoint: "v1/options", revalidate: 300 }),
    ])
      .then(([categoriesRes, unisRes, coursesRes, subcoursesRes]) => {
        if (!isMounted) return;
        setInitialCategories(categoriesRes?.categories || categoriesRes?.result || []);
        setInitialUniversities(unisRes?.result || unisRes || []);
        setCoursesOptionsList(coursesRes?.result || coursesRes || []);
        setSubcoursesOptionsList(subcoursesRes?.result || subcoursesRes || []);
      })
      .catch((err) => {
        console.error("Error loading initial filter options:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const cat = searchParams?.get("category");
    const subcat = searchParams?.get("subcategory") || searchParams?.get("subCategory") || searchParams?.get("subcourse");
    const crs = searchParams?.get("course") || searchParams?.get("courseId");
    const q = searchParams?.get("search") || searchParams?.get("q");
    const uni = searchParams?.get("university") || searchParams?.get("universityId");

    if (cat !== null && cat !== undefined) {
      setActiveCategoryTab(cat || "all");
    }
    if (subcat !== null && subcat !== undefined) {
      setActiveSubcategory(subcat ? subcat.split(",").map((s) => s.trim()) : []);
    }
    if (crs !== null && crs !== undefined) {
      setSelectedCourse(crs || "");
    }
    if (q !== null && q !== undefined) {
      setAppliedSearchTerm(q);
    }
    if (uni) {
      setSelectedUniversities(uni.split(",").map((u) => u.trim()));
    }
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    const isDefault =
      activeCategoryTab === "all" &&
      (!activeSubcategory || activeSubcategory.length === 0) &&
      !selectedCourse &&
      !selectedSubCourse &&
      (!selectedUniversities || selectedUniversities.length === 0) &&
      feeRange[0] === 0 &&
      feeRange[1] >= 1000000 &&
      durationRange[0] <= 3 &&
      durationRange[1] >= 48 &&
      !appliedSearchTerm &&
      currentPage === 1;

    if (isDefault && initialCoursesData?.programs?.length > 0) {
      setCoursesData(initialCoursesData);
      return;
    }

    let isMounted = true;

    const resolveToId = (val, list = []) => {
      if (!val || val === "all") return "";
      if (/^[0-9a-fA-F]{24}$/.test(String(val))) return String(val);
      const targetStr = String(val).trim().toLowerCase();
      const found = (list || []).find((item) => {
        if (!item) return false;
        const s = String(item.slug || "").trim().toLowerCase();
        const v = String(item.value || "").trim().toLowerCase();
        const n = String(item.name || item.title || item.label || "").trim().toLowerCase();
        return s === targetStr || v === targetStr || n === targetStr;
      });
      return found?._id || found?.id || (found?.value && /^[0-9a-fA-F]{24}$/.test(found.value) ? found.value : val);
    };

    const allFlatCategories = [
      ...(initialCategories || []),
      ...(initialCategories || []).flatMap((c) => c.children || []),
      ...(initialCategories || []).flatMap((c) => c.courses || []),
      ...(initialCategories || []).flatMap((c) => c.universities || []),
    ];

    const allFlatUniversities = [
      ...(initialUniversities || []),
    ];

    const resolvedCategoryIds = Array.isArray(activeCategoryTab)
      ? activeCategoryTab.map((c) => resolveToId(c, allFlatCategories)).filter(Boolean)
      : (resolveToId(activeCategoryTab, allFlatCategories) ? [resolveToId(activeCategoryTab, allFlatCategories)] : []);
    const resolvedSubcategoryIds = Array.isArray(activeSubcategory)
      ? activeSubcategory.map((s) => resolveToId(s, allFlatCategories)).filter(Boolean)
      : (resolveToId(activeSubcategory, allFlatCategories) ? [resolveToId(activeSubcategory, allFlatCategories)] : []);
    const resolvedCourseId = resolveToId(selectedCourse, [...coursesOptionsList, ...allFlatCategories]);
    const resolvedSubCourseId = resolveToId(selectedSubCourse, [...subcoursesOptionsList, ...allFlatCategories]);
    const resolvedUniversityIds = (selectedUniversities || []).map((u) => resolveToId(u, allFlatUniversities)).filter(Boolean);

    request.dynamicList({
      entity: "courses",
      endPoint: "v1/list",
      options: {
        page: currentPage,
        items: ITEMS_PER_PAGE,
        category: resolvedCategoryIds,
        subcategory: resolvedSubcategoryIds,
        course: resolvedCourseId,
        subcourse: resolvedSubCourseId,
        university: resolvedUniversityIds,
        minFee: feeRange[0] > 0 ? feeRange[0] : undefined,
        maxFee: feeRange[1] < 1000000 ? feeRange[1] : undefined,
        minDuration: durationRange[0] > 3 ? durationRange[0] : undefined,
        maxDuration: durationRange[1] < 48 ? durationRange[1] : undefined,
        search: appliedSearchTerm,
      },
      revalidate: 300,
    })
      .then((res) => {
        if (!isMounted) return;
        const programs = res?.result || res?.programs || [];
        setCoursesData({
          programs,
          total: res?.pagination?.total ?? programs.length,
          totalPages: res?.pagination?.pages ?? 1,
          page: res?.pagination?.page ?? 1,
        });
      })
      .catch((err) => {
        console.error("Error fetching website university offerings filter:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [
    currentPage,
    activeCategoryTab,
    activeSubcategory,
    selectedCourse,
    selectedSubCourse,
    selectedUniversities,
    feeRange,
    durationRange,
    appliedSearchTerm,
    initialCategories,
    initialUniversities,
    coursesOptionsList,
    subcoursesOptionsList,
    initialCoursesData,
  ]);

  const initialList = useMemo(() => {
    return Array.isArray(coursesData.programs) ? coursesData.programs : [];
  }, [coursesData.programs]);

  // Process cards returned directly from backend UniversityOffering API
  const processedPrograms = useMemo(() => {
    const list = [];
    (initialList || []).forEach((item, index) => {
      if (!item) return;

      const isOffering = Boolean(item.universityId || item.courseId);

      if (isOffering) {
        const uni = item.universityId || {};
        const course = item.courseId || {};
        const subcourse = item.subCourseId || {};

        const uniName = uni.name || "Partner University";
        const courseName = course.name || "";
        const subcourseName = subcourse.name || "";
        const fullDisplayName = item.displayName || course.displayName || course.displayNames?.[0]?.name || "";
        const effectiveCourseName = (course.showDisplayName || item.showDisplayName) && fullDisplayName ? fullDisplayName : courseName;

        let cardTitle = item.title || effectiveCourseName || item.name || "Course";

        const displayName = fullDisplayName;

        const fees = item.fees || {};
        const duration = item.duration || {};
        const partnerObj = uni.viaPartner || item.viaPartner || (Array.isArray(item.partner) && item.partner.length > 0 ? item.partner[0] : null);
        const isPartnerActive = Boolean(partnerObj && partnerObj.name && (partnerObj.show === true || partnerObj.showOnWebsite === true));
        const providerName = isPartnerActive ? partnerObj.name : null;

        const rawLogo =
          uni.logo?.url ||
          uni.logo?.path ||
          uni.logoSrc?.url ||
          uni.logoSrc ||
          uni.logo;
        const logoUrl = getAssetPath(rawLogo, null);

        let durationText = null;
        if (typeof duration === "string" && duration.trim()) {
          durationText = duration;
        } else if (duration?.name) {
          durationText = duration.name;
        } else if (duration?.months) {
          durationText = `${duration.months} Months`;
        } else if (item.duration) {
          durationText = typeof item.duration === "string" ? item.duration : (item.duration.name || (item.duration.months ? `${item.duration.months} Months` : null));
        } else if (item.durationMonths) {
          durationText = `${item.durationMonths} Months`;
        }

        let feeText = null;
        if (fees?.amount) {
          feeText = `₹ ${Number(fees.amount).toLocaleString("en-IN")} INR`;
        } else if (fees?.name) {
          feeText = fees.name.includes("₹") ? `${fees.name} INR` : `₹ ${fees.name} INR`;
        } else if (item.fullFee) {
          feeText = item.fullFee.includes("₹") ? `${item.fullFee} INR` : `₹ ${item.fullFee} INR`;
        } else if (item.amount) {
          feeText = `₹ ${Number(item.amount).toLocaleString("en-IN")} INR`;
        }

        const slugify = (text) =>
          (text || "")
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[\s_]+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+|-+$/g, "");

        const parts = [uniName, courseName, subcourseName].filter(Boolean);
        let itemSlug = slugify(parts.join("-")) || subcourse.slug || course.slug || item.slug || item._id;
        const courseDetailHref = itemSlug ? `/courses/${encodeURIComponent(itemSlug)}` : "/courses";

        list.push({
          ...item,
          _uniqueKey: `${item._id || item.slug || cardTitle || "program"}-${index}`,
          title: cardTitle,
          cardTitle,
          displayName,
          uniName,
          uniObj: uni,
          courseObj: course,
          subcourseObj: subcourse,
          logoUrl,
          providerName,
          durationText,
          feeText,
          courseDetailHref,
        });
      } else {
        list.push({
          ...item,
          _uniqueKey: `${item._id || item.slug || "custom"}-${index}`,
        });
      }
    });

    return list;
  }, [initialList]);

  const totalCount = coursesData.total ?? processedPrograms.length;
  const totalPages = coursesData.totalPages ?? (Math.ceil(totalCount / ITEMS_PER_PAGE) || 1);

  const categorySelectOptions = useMemo(() => {
    const map = new Map();
    map.set("all", { value: "all", slug: "all", label: "All Categories" });

    const slugify = (t) => (t || "").toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^\w-]+/g, "");

    (initialCategories || []).forEach((c) => {
      if (!c) return;
      // Exclude FEATURED_SECTION, keep only top categories
      if (c.categoryType === "FEATURED_SECTION") return;
      const name = c.name || c.title || c.label;
      const slug = c.slug || slugify(name) || String(c._id || "");
      if (name && slug && !map.has(slug)) {
        map.set(slug, { value: slug, slug, label: name });
      }
    });

    return Array.from(map.values());
  }, [initialCategories]);

  const subcategoryList = useMemo(() => {
    const map = new Map();
    const addSub = (item) => {
      if (!item) return;
      const label = item.name || item.title || item.label;
      const slug = item.slug || String(item._id || "");
      const id = String(item._id || "");
      if (label && (slug || id)) {
        const key = slug || id;
        if (!map.has(key)) {
          map.set(key, { label, value: slug || id, slug: slug || id, id });
        }
      }
    };

    // If a parent category is selected, extract its children
    const selectedCat = Array.isArray(activeCategoryTab) ? activeCategoryTab[0] : activeCategoryTab;
    if (selectedCat && selectedCat !== "all") {
      const target = String(selectedCat).toLowerCase();
      const foundParent = (initialCategories || []).find(
        (c) =>
          (c.slug && c.slug.toLowerCase() === target) ||
          String(c._id) === selectedCat ||
          (c.name && c.name.toLowerCase() === target)
      );
      if (foundParent && Array.isArray(foundParent.children)) {
        foundParent.children.forEach(addSub);
      }
    } else {
      // Otherwise list all subcategories / children present in backend categories
      (initialCategories || []).forEach((c) => {
        if (Array.isArray(c?.children)) {
          c.children.forEach(addSub);
        }
      });
    }

    return Array.from(map.values());
  }, [initialCategories, activeCategoryTab]);

  const subcategorySelectOptions = useMemo(() => {
    const map = new Map();
    map.set("all", { value: "all", slug: "all", label: "All Sub Categories" });

    (subcategoryList || []).forEach((sub) => {
      if (!sub) return;
      const key = sub.value || sub.slug || sub.id;
      if (key && !map.has(key)) {
        map.set(key, { value: key, slug: sub.slug || key, label: sub.label });
      }
    });

    return Array.from(map.values());
  }, [subcategoryList]);

  const durationList = useMemo(() => [
    { label: "All Durations", value: "all" },
    { label: "0 - 6 Months", value: "0-6-months" },
    { label: "6 - 12 Months", value: "6-12-months" },
    { label: "1 - 2 Years", value: "1-2-years" },
    { label: "2 - 3 Years", value: "2-3-years" },
    { label: "3+ Years", value: "3-plus-years" },
  ], []);

  const feeList = useMemo(() => [
    { label: "All Fee Ranges", value: "all" },
    { label: "0 to 1 Lac", value: "0-1-lakh" },
    { label: "1 to 1.5 Lac", value: "1-1.5-lakh" },
    { label: "1.5 to 3 Lac", value: "1.5-3-lac" },
    { label: "3 to 5 Lac", value: "3-5-lac" },
    { label: "Above 5 Lac", value: "above-5-lac" },
  ], []);

  const universityOptions = useMemo(() => {
    const map = new Map();
    map.set("all", { value: "all", slug: "all", label: "All Institute" });

    const addUni = (uni) => {
      if (!uni) return;
      const name = uni.name || uni.title || uni.label || "";
      const slug = uni.slug || (typeof uni.value === "string" && uni.value.includes("-") ? uni.value : "") || "";
      const id = String(uni._id || (typeof uni.value === "string" && /^[0-9a-fA-F]{24}$/.test(uni.value) ? uni.value : ""));

      if (name && (slug || id)) {
        const key = slug || id;
        if (!map.has(key)) {
          map.set(key, { value: slug || id, slug: slug || id, id, label: name });
        }
      }
    };

    if (Array.isArray(initialUniversities)) initialUniversities.forEach(addUni);

    return Array.from(map.values());
  }, [initialUniversities]);

  const courseSelectOptions = useMemo(() => {
    const list = [{ value: "all", label: "All Courses" }];
    const seen = new Set();
    (coursesOptionsList || []).forEach((c) => {
      if (!c) return;
      const val = c.slug || String(c._id || "");
      const fullDisplay = c.displayNames?.[0]?.name || c.displayName;
      const effectiveName = c.showDisplayName && fullDisplay ? fullDisplay : (c.name || c.title || val);
      const label = effectiveName;
      if (val && !seen.has(val)) {
        seen.add(val);
        list.push({ value: val, label, id: String(c._id) });
      }
    });
    return list;
  }, [coursesOptionsList]);

  const subcourseSelectOptions = useMemo(() => {
    const list = [{ value: "all", label: "All Sub Courses" }];
    const seen = new Set();
    (subcoursesOptionsList || []).forEach((sc) => {
      if (!sc) return;
      const val = sc.slug || String(sc._id || "");
      const label = sc.name || sc.title || val;
      if (val && !seen.has(val)) {
        seen.add(val);
        list.push({ value: val, label, id: String(sc._id) });
      }
    });
    return list;
  }, [subcoursesOptionsList]);

  const handleClearFilters = () => {
    setAppliedSearchTerm("");
    setActiveCategoryTab("all");
    setSelectedCourse("");
    setSelectedSubCourse("");
    setActiveSubcategory([]);
    setSelectedUniversities([]);
    setSelectedDuration("all");
    setSelectedFee("all");
    setFeeRange([0, 1000000]);
    setDurationRange([3, 48]);
    setCurrentPage(1);

    if (router && pathname) {
      router.replace(pathname, { scroll: false });
    }
  };

  const activeFilterCount =
    (activeCategoryTab && activeCategoryTab !== "all" ? 1 : 0) +
    (activeSubcategory && activeSubcategory.length > 0 ? activeSubcategory.length : 0) +
    (selectedCourse ? 1 : 0) +
    (selectedSubCourse ? 1 : 0) +
    (selectedUniversities && selectedUniversities.length > 0 ? 1 : 0) +
    (feeRange[0] > 0 || feeRange[1] < 1000000 ? 1 : 0) +
    (durationRange[0] > 3 || durationRange[1] < 48 ? 1 : 0);

  const filterProps = {
    activeFilterCount,
    handleClearFilters,
    activeCategoryTab,
    setActiveCategoryTab,
    selectedCourse,
    setSelectedCourse,
    selectedSubCourse,
    setSelectedSubCourse,
    feeRange,
    setFeeRange,
    durationRange,
    setDurationRange,
    activeSubcategory,
    setActiveSubcategory,
    selectedFee,
    setSelectedFee,
    selectedUniversities,
    setSelectedUniversities,
    categorySelectOptions,
    subcategorySelectOptions,
    courseSelectOptions,
    subcourseSelectOptions,
    universityOptions,
    setCurrentPage,
  };

  return (
    <WebsiteLayout py="py-4 sm:py-6" bg="#F1F4F9">
      {/* Top Mobile Filter Bar (Visible only on mobile screen) */}
      <div className="lg:hidden flex items-center gap-2 mb-4 bg-white p-2.5 rounded-2xl border border-gray-200">
        <div className="flex-1 grid grid-cols-2 gap-2 min-w-0">
          <Select
            showSearch
            value={
              selectedCourse && selectedCourse !== "all"
                ? selectedCourse
                : Array.isArray(activeCategoryTab)
                  ? activeCategoryTab[0] || "all"
                  : activeCategoryTab || "all"
            }
            onChange={(val) => {
              if (val === "all") {
                setSelectedCourse("");
                setActiveCategoryTab("all");
              } else {
                setSelectedCourse(val);
                setActiveCategoryTab(val);
              }
              setCurrentPage(1);
            }}
            options={categorySelectOptions}
            className="w-full"
            placeholder="Category"
            optionFilterProp="label"
          />
          <Select
            showSearch
            value={
              Array.isArray(activeSubcategory) && activeSubcategory.length > 0
                ? activeSubcategory[0]
                : "all"
            }
            onChange={(val) => {
              setActiveSubcategory(val === "all" ? [] : [val]);
              setCurrentPage(1);
            }}
            options={subcategorySelectOptions}
            className="w-full"
            placeholder="Sub Category"
            optionFilterProp="label"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="bg-[#0a2540] hover:bg-[#06182c] text-white p-2 rounded-xl flex items-center justify-center shrink-0 cursor-pointer border-none"
          aria-label="Open Filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Grid: Left Filter Sidebar + Right Cards Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ── LEFT FILTER SIDEBAR (DESKTOP) ── */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3 bg-white p-5 rounded-2xl border border-gray-200 sticky top-6">
          <FilterSidebarContent {...filterProps} />
        </div>

        {/* ── RIGHT COURSE CARDS LISTING ── */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-4">
          {processedPrograms.length > 0 ? (
            <div className="space-y-3">
              {processedPrograms.map((item, index) => {
                const uniName = item.uniName || "Institute";
                const cardTitle = item.cardTitle || item.title || "Course Program";
                const logoUrl = item.logoUrl;
                const providerName = item.providerName || null;
                const durationText = item.durationText || null;
                const feeText = item.feeText || null;
                const courseDetailHref = item.courseDetailHref || `/courses`;

                return (
                  <div
                    key={item._uniqueKey || `${cardTitle}-${index}`}
                    className="bg-white rounded-2xl border border-gray-200 p-2.5 sm:p-4 sm:px-5 hover:border-gray-300 transition-all relative overflow-hidden group"
                  >
                    {/* Top Right Corner Pinned Provider Badge */}
                    {Boolean(providerName) && (
                      <div className="absolute top-0 right-0 z-10 pointer-events-none">
                        <span className="bg-[#FFF0F3] border-b border-l border-[#FFE4E6] text-gray-700 text-[10px] sm:text-[11px] font-medium px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-bl-xl rounded-tr-2xl inline-flex items-center gap-1">
                          Via <span className="font-bold text-[#E52E2E]">{providerName}</span>
                        </span>
                      </div>
                    )}

                    {/* Desktop Card Layout */}
                    <div className="hidden sm:flex items-center gap-5">
                      {/* Left: University Logo + Name */}
                      <div className="w-28 sm:w-32 flex flex-col items-center justify-center text-center pr-4 border-r border-gray-200 shrink-0">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-1.5 flex items-center justify-center bg-white relative mb-1.5">
                          {logoUrl ? (
                            <Image
                              src={logoUrl}
                              alt={uniName}
                              fill
                              sizes="64px"
                              loading={index < 3 ? "eager" : "lazy"}
                              priority={index === 0}
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs uppercase">
                              {uniName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-bold text-[#0a2540] line-clamp-2 leading-tight">
                          {uniName}
                        </span>
                      </div>

                      {/* Right: Details & Actions */}
                      <div className="flex-1 min-w-0 space-y-2.5">

                        {/* Title & Full Display Name Underneath */}
                        <Link
                          href={courseDetailHref}
                          className="hover:text-blue-600 transition-colors block text-left no-underline group"
                        >
                          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-1 m-0">
                            {cardTitle}
                          </h3>
                          {item.displayName && item.displayName.toLowerCase() !== cardTitle.toLowerCase() && (
                            <span className="text-[11.5px] sm:text-xs font-normal text-gray-500 block leading-tight mt-0.5 tracking-tight">
                              {item.displayName}
                            </span>
                          )}
                        </Link>

                        {/* Fee & Duration Row */}
                        {(feeText || durationText) && (
                          <div className="flex items-center gap-5 text-xs font-semibold text-gray-700">
                            {feeText && (
                              <div className="flex items-center gap-1.5 text-gray-800">
                                <span className="text-gray-700 font-bold">₹</span>
                                <span>{feeText.replace(/^₹\s*/, "")}</span>
                              </div>
                            )}
                            {durationText && (
                              <div className="flex items-center gap-1.5 text-gray-600">
                                <Clock className="w-3.5 h-3.5 text-gray-500" />
                                <span>{durationText}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Actions Row: Specializations | Know More | Apply Now | + Add to Compare */}
                        <div className="flex items-center gap-2.5 pt-0.5">
                          {Array.isArray(item.subcourses) && item.subcourses.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setSpecializationModalData(item)}
                              className="bg-blue-50 hover:bg-blue-100 text-[#0B3B7E] border border-blue-200 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Specializations ({item.specializationsCount || item.subcourses.length})</span>
                            </button>
                          )}

                          <Link
                            href={courseDetailHref}
                            className="bg-[#0a2540] hover:bg-[#06182c] text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors inline-flex items-center justify-center no-underline"
                          >
                            Know More
                          </Link>

                          <button
                            type="button"
                            onClick={() => {
                              openFormModal({
                                title: "Apply for Course",
                                subtitle: cardTitle,
                                defaultCourse: cardTitle,
                                formNameOverride: `CourseCard_${item.slug || uniName}`,
                                submitButtonText: "Apply Now",
                              });
                            }}
                            className="bg-[#F4D068] hover:bg-[#ebc557] text-gray-900 text-xs font-bold px-4 py-1.5 rounded-lg transition-colors border-none cursor-pointer inline-flex items-center justify-center"
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
                                logoUrl: logoUrl,
                                feeText: feeText,
                                durationText: durationText,
                              };
                              toggleCompare(targetItem);
                              setIsCompareDrawerOpen(true);
                            }}
                            className="text-xs font-semibold text-gray-800 hover:text-blue-600 flex items-center gap-1 cursor-pointer bg-transparent border-none p-0 transition-colors ml-2"
                          >
                            {isInCompare(item._id || item.slug || cardTitle) ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-teal-600" />
                                <span className="text-teal-600">Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5 text-gray-800" />
                                <span>Add to Compare</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Card Layout */}
                    <div className="flex sm:hidden flex-col gap-2.5">
                      {/* Mobile Top Row: Uni Logo + Uni Name & Provider Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full border border-gray-200 p-1 flex items-center justify-center bg-white relative shrink-0">
                            {logoUrl ? (
                              <Image
                                src={logoUrl}
                                alt={uniName}
                                fill
                                sizes="36px"
                                loading={index < 3 ? "eager" : "lazy"}
                                priority={index === 0}
                                className="object-contain p-0.5"
                              />
                            ) : (
                              <span className="text-xs font-bold text-blue-600">
                                {uniName.charAt(0)}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-[#0a2540]">
                            {uniName}
                          </span>
                        </div>
                      </div>

                      {/* Title & Full Display Name Underneath */}
                      <Link href={courseDetailHref} className="no-underline block">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-1 m-0">
                          {cardTitle}
                        </h3>
                        {item.displayName && item.displayName.toLowerCase() !== cardTitle.toLowerCase() && (
                          <span className="text-[10px] sm:text-[11px] font-normal text-gray-500 block leading-tight mt-0.5 tracking-tight">
                            {item.displayName}
                          </span>
                        )}
                      </Link>

                      {/* Fee & Duration */}
                      {(feeText || durationText) && (
                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-700">
                          {feeText && (
                            <div className="flex items-center gap-1 text-gray-800">
                              <span>₹</span>
                              <span>{feeText.replace(/^₹\s*/, "")}</span>
                            </div>
                          )}
                          {durationText && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <Clock className="w-3 h-3 text-gray-500" />
                              <span>{durationText}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Mobile Action Buttons - Single Row */}
                      <div className="pt-2.5 border-t border-gray-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                        {Array.isArray(item.subcourses) && item.subcourses.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setSpecializationModalData(item)}
                            className="flex-1 min-w-max bg-blue-50 hover:bg-blue-100 text-[#0B3B7E] border border-blue-200 text-[11px] font-bold py-2 px-2.5 rounded-lg transition-colors flex items-center justify-center cursor-pointer whitespace-nowrap"
                          >
                            <span>Specializations ({item.specializationsCount || item.subcourses.length})</span>
                          </button>
                        )}
                        <Link
                          href={courseDetailHref}
                          className="flex-1 min-w-max bg-[#0a2540] text-white text-[11px] font-semibold py-2 px-2.5 rounded-lg text-center no-underline whitespace-nowrap flex items-center justify-center"
                        >
                          Know More
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            openFormModal({
                              title: "Apply for Course",
                              subtitle: cardTitle,
                              defaultCourse: cardTitle,
                              formNameOverride: `CourseCard_${item.slug || uniName}`,
                              submitButtonText: "Apply Now",
                            });
                          }}
                          className="flex-1 min-w-max bg-[#F4D068] text-gray-900 text-[11px] font-bold py-2 px-2.5 rounded-lg border-none cursor-pointer whitespace-nowrap flex items-center justify-center"
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
                              logoUrl: logoUrl,
                              feeText: feeText,
                              durationText: durationText,
                            };
                            toggleCompare(targetItem);
                            setIsCompareDrawerOpen(true);
                          }}
                          className="min-w-max px-2.5 py-2 text-[11px] font-bold text-gray-700 flex items-center justify-center gap-1 cursor-pointer bg-transparent border border-gray-200 rounded-lg whitespace-nowrap shrink-0"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Compare</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 space-y-4">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-xl">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 m-0">No Programs Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto m-0">
                We couldn&apos;t find any programs matching your selected criteria. Try adjusting your filters.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="bg-[#0a2540] hover:bg-[#06182c] text-white font-bold text-xs py-2 px-5 rounded-lg border-none cursor-pointer"
              >
                Reset All Filters
              </button>
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
          <div className="flex items-center justify-between w-full pr-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-900" />
              <h3 className="font-bold text-base text-gray-900 m-0">Filters</h3>
            </div>
            <button
              type="button"
              onClick={handleResetMobileFilters}
              className="text-xs font-bold text-red-500 hover:text-red-600 cursor-pointer bg-transparent border-none p-0"
            >
              Reset
            </button>
          </div>
        }
        placement="bottom"
        onClose={() => setIsMobileDrawerOpen(false)}
        open={isMobileDrawerOpen}
        className="lg:hidden"
        footer={
          <div className="flex items-center gap-3 p-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(false)}
              className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm bg-white hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleApplyMobileFilters}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#0a2540] hover:bg-[#06182c] text-white font-bold text-sm border-none cursor-pointer transition-colors shadow-sm"
            >
              Apply Filter
            </button>
          </div>
        }
        styles={{
          wrapper: { height: "70vh" },
          section: {
            height: "70vh",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
          },
          body: { padding: "16px 20px 24px" },
          footer: { padding: "8px 16px" },
        }}
      >
        <FilterSidebarContent
          hideHeader
          activeCategoryTab={draftCategoryTab}
          setActiveCategoryTab={setDraftCategoryTab}
          activeSubcategory={draftSubcategory}
          setActiveSubcategory={setDraftSubcategory}
          selectedCourse={draftSelectedCourse}
          setSelectedCourse={setDraftSelectedCourse}
          selectedSubCourse={draftSelectedSubCourse}
          setSelectedSubCourse={setDraftSelectedSubCourse}
          selectedUniversities={draftUniversities}
          setSelectedUniversities={setDraftUniversities}
          feeRange={draftFeeRange}
          setFeeRange={setDraftFeeRange}
          durationRange={draftDurationRange}
          setDurationRange={setDraftDurationRange}
          categorySelectOptions={categorySelectOptions}
          subcategorySelectOptions={subcategorySelectOptions}
          courseSelectOptions={courseSelectOptions}
          subcourseSelectOptions={subcourseSelectOptions}
          universityOptions={universityOptions}
          handleClearFilters={handleResetMobileFilters}
          setCurrentPage={setCurrentPage}
        />
      </Drawer>

      {/* ── SPECIALIZATIONS MODAL ── */}
      <Modal
        open={Boolean(specializationModalData)}
        onCancel={() => setSpecializationModalData(null)}
        footer={null}
        width={620}
        centered
        closable={false}
        destroyOnHidden
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
        {specializationModalData && (
          <div className="flex flex-col text-left min-h-0">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5 shrink-0 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {specializationModalData.logoUrl ? (
                  <div className="w-10 h-10 rounded-full border border-slate-200 p-1 flex items-center justify-center relative shrink-0 bg-white shadow-2xs">
                    <Image
                      src={specializationModalData.logoUrl}
                      alt={specializationModalData.uniName}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-[#0B3B7E] font-bold flex items-center justify-center text-xs shrink-0 border border-blue-100 uppercase">
                    {specializationModalData.uniName?.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight tracking-tight truncate m-0">
                    {specializationModalData.title} Specializations ({specializationModalData.specializationsCount || specializationModalData.subcourses?.length || 0})
                  </h3>
                  <span className="text-xs text-slate-500 block mt-0.5 truncate">
                    {specializationModalData.uniName}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSpecializationModalData(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer border-0 shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Grid - 3 Cards Mobile / 5 Cards Desktop Grid Layout */}
            <div className="flex-1 overflow-y-auto max-h-[64vh] overscroll-contain pr-0.5 space-y-4 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                {(specializationModalData.subcourses || []).map((sc, idx) => (
                  <div
                    key={sc._id || idx}
                    onClick={() => {
                      const uniSlug = specializationModalData.uniObj?.slug || specializationModalData.uniName?.toLowerCase().replace(/\s+/g, '-');
                      const subSlug = sc.slug || sc.name?.toLowerCase().replace(/\s+/g, '-');
                      setSpecializationModalData(null);
                      router.push(`/courses?university=${encodeURIComponent(uniSlug)}&subcategory=${encodeURIComponent(subSlug)}`);
                    }}
                    className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 min-[360px]:p-2 aspect-square flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 w-full shadow-2xs overflow-hidden"
                  >
                    <div className="flex-1 flex items-center justify-center w-full min-h-0 pt-0.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0B3B7E] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="h-7 min-[360px]:h-8 sm:h-8.5 flex items-center justify-center w-full min-w-0 px-0.5 pb-0.5 shrink-0">
                      <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[10.5px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight min-w-0 m-0 uppercase leading-tight line-clamp-2">
                        {sc.name}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </WebsiteLayout>
  );
}

export default function CoursesPageClientView(props) {
  return (
    <Suspense fallback={null}>
      <CoursesContent {...props} />
    </Suspense>
  );
}
