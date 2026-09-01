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
} from "lucide-react";
import { Select, Drawer, Pagination } from "antd";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import { getAssetPath } from "@/lib/utils";
import WebsiteLayout from "@/components/layout/WebsiteLayout";
import { request } from "@/services/request";

// Sidebar Filter Component matching exact mockup design
function FilterSidebarContent({
  activeFilterCount,
  handleClearFilters,
  activeCategoryTab,
  setActiveCategoryTab,
  selectedCourse,
  setSelectedCourse,
  selectedDuration,
  setSelectedDuration,
  activeSubcategory,
  setActiveSubcategory,
  selectedFee,
  setSelectedFee,
  selectedUniversities,
  setSelectedUniversities,
  categorySelectOptions = [],
  subcategoryList = [],
  durationList = [],
  feeList = [],
  universityOptions = [],
  setCurrentPage,
}) {
  const [showAllSubcategories, setShowAllSubcategories] = useState(true);

  const isSubcategoryActive = (val) => {
    if (!activeSubcategory) return false;
    const target = String(val).toLowerCase();
    if (Array.isArray(activeSubcategory)) {
      return activeSubcategory.some((s) => String(s).toLowerCase() === target);
    }
    return String(activeSubcategory).toLowerCase() === target;
  };

  const handleSubcategoryPillClick = (val) => {
    let current = Array.isArray(activeSubcategory)
      ? [...activeSubcategory]
      : activeSubcategory
        ? [activeSubcategory]
        : [];

    const exists = current.some((s) => String(s).toLowerCase() === String(val).toLowerCase());
    if (exists) {
      current = current.filter((s) => String(s).toLowerCase() !== String(val).toLowerCase());
    } else {
      current.push(val);
    }
    setActiveSubcategory(current);
    setCurrentPage(1);
  };

  const displayedSubcategories = showAllSubcategories
    ? subcategoryList
    : subcategoryList.slice(0, 8);

  const currentCourseSelectValue =
    selectedCourse && selectedCourse !== "all"
      ? selectedCourse
      : Array.isArray(activeCategoryTab)
        ? activeCategoryTab[0] || "all"
        : activeCategoryTab || "all";

  return (
    <div className="space-y-5">
      {/* Header: Title + Clear Filters */}
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

      {/* Row 1: Course Select */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1 text-xs font-semibold text-gray-700">
          <BookOpen className="w-3 h-3 text-gray-700" />
          <span>Course</span>
        </label>
        <Select
          showSearch
          placeholder="Course"
          value={currentCourseSelectValue}
          onChange={(val) => {
            if (val === "all") {
              if (setSelectedCourse) setSelectedCourse("");
              setActiveCategoryTab("all");
            } else {
              if (setSelectedCourse) setSelectedCourse(val);
              setActiveCategoryTab(val);
            }
            setCurrentPage(1);
          }}
          className="w-full text-xs font-semibold rounded-lg"
          options={categorySelectOptions}
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>

      {/* Section 2: Sub Category Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <span className="text-xs font-bold text-gray-900">Sub Category</span>
          <button
            type="button"
            onClick={() => setShowAllSubcategories(!showAllSubcategories)}
            className="text-[11px] font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-0.5 cursor-pointer bg-transparent border-none p-0"
          >
            <span>{showAllSubcategories ? "Show Less" : "Show All"}</span>
            {showAllSubcategories ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        </div>

        {/* Subcategory Pills */}
        <div className="flex flex-wrap gap-1.5">
          {displayedSubcategories.map((pill) => {
            const active =
              isSubcategoryActive(pill.value) ||
              isSubcategoryActive(pill.slug) ||
              isSubcategoryActive(pill.id);
            return (
              <button
                key={pill.value || pill.slug}
                type="button"
                onClick={() => handleSubcategoryPillClick(pill.value || pill.slug)}
                className={`px-3 py-1.5 text-[11px] font-medium rounded-full border transition-all cursor-pointer text-center select-none ${active
                  ? "bg-[#0a2540] text-white border-[#0a2540]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 4: Institute Dropdown */}
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
            setCurrentPage(1);
          }}
          className="w-full text-xs font-semibold rounded-lg"
          options={universityOptions}
          optionFilterProp="label"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
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

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const searchParams = useSearchParams();
  const initialCat = searchParams?.get("category") || "all";
  const initialSubcat = searchParams?.get("subcategory") || searchParams?.get("subCategory") || searchParams?.get("subcourse") || "";
  const initialSubcatArr = initialSubcat ? initialSubcat.split(",").map((s) => s.trim()) : [];
  const initialCourse = searchParams?.get("course") || searchParams?.get("courseId") || "";
  const initialQuery = searchParams?.get("search") || "";
  const initialUnis = searchParams?.get("university") ? searchParams.get("university").split(",").map((u) => u.trim()) : [];

  const [appliedSearchTerm, setAppliedSearchTerm] = useState(initialQuery);
  const [activeCategoryTab, setActiveCategoryTab] = useState(initialCat);
  const [activeSubcategory, setActiveSubcategory] = useState(initialSubcatArr);
  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [selectedUniversities, setSelectedUniversities] = useState(initialUnis);
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [selectedFee, setSelectedFee] = useState("all");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const { openFormModal } = useFormModal();
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen } = useCompare();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      (!initialCategoriesProp || initialCategoriesProp.length === 0) ||
      (!initialUniversitiesProp || initialUniversitiesProp.length === 0)
    ) {
      let isMounted = true;
      Promise.all([
        request.dynamicList({ entity: "category", endPoint: "v1/list", revalidate: 900 }),
        request.dynamicList({ entity: "universities", endPoint: "v1/list", options: { items: 100 }, revalidate: 300 }),
      ])
        .then(([categoriesRes, unisRes]) => {
          if (!isMounted) return;
          setInitialCategories(categoriesRes?.categories || categoriesRes?.result || []);
          setInitialUniversities(unisRes?.result || unisRes || []);
        })
        .catch((err) => {
          console.error("Error loading initial filter options:", err);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [initialCategoriesProp, initialUniversitiesProp]);

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
      (!selectedUniversities || selectedUniversities.length === 0) &&
      selectedDuration === "all" &&
      selectedFee === "all" &&
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
      return found?._id || found?.id || (found?.value && /^[0-9a-fA-F]{24}$/.test(found.value) ? found.value : "");
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
    const resolvedCourseId = resolveToId(selectedCourse, allFlatCategories);
    const resolvedUniversityIds = (selectedUniversities || []).map((u) => resolveToId(u, allFlatUniversities)).filter(Boolean);
    const resolvedDuration = Array.isArray(selectedDuration)
      ? selectedDuration.filter((d) => d && d !== "all")
      : (selectedDuration && selectedDuration !== "all" ? selectedDuration : "all");
    const resolvedFee = Array.isArray(selectedFee)
      ? selectedFee.filter((f) => f && f !== "all")
      : (selectedFee && selectedFee !== "all" ? selectedFee : "all");

    request.dynamicList({
      entity: "university-offerings",
      endPoint: "v1/list",
      options: {
        page: currentPage,
        items: ITEMS_PER_PAGE,
        category: resolvedCategoryIds,
        subcategory: resolvedSubcategoryIds,
        course: resolvedCourseId,
        university: resolvedUniversityIds,
        duration: resolvedDuration,
        fee: resolvedFee,
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
    selectedUniversities,
    selectedDuration,
    selectedFee,
    appliedSearchTerm,
    initialCategories,
    initialUniversities,
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
        const fees = item.fees || {};
        const duration = item.duration || {};
        const partner = Array.isArray(item.partner) && item.partner.length > 0
          ? item.partner[0]
          : (item.partner || null);

        const uniName = uni.name || "Partner University";
        const courseName = course.name || "";
        const subcourseName = subcourse.name || "";

        let cardTitle = item.title || courseName || item.name || "Course";

        const rawLogo =
          uni.logo?.url ||
          uni.logo?.path ||
          uni.logoSrc?.url ||
          uni.logoSrc ||
          uni.logo;
        const logoUrl = getAssetPath(rawLogo, null);

        const providerName = partner?.name || "upGrad";

        let durationText = "8 Months";
        if (duration.months) {
          durationText = `${duration.months} Months`;
        } else if (duration.name) {
          durationText = duration.name;
        } else if (item.durationMonths) {
          durationText = `${item.durationMonths} Months`;
        }

        let feeText = "₹ 1,20,000 INR";
        if (fees.amount) {
          feeText = `₹ ${Number(fees.amount).toLocaleString("en-IN")} INR`;
        } else if (fees.name) {
          feeText = fees.name.includes("₹") ? fees.name : `₹ ${fees.name} INR`;
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
        });
      } else {
        list.push({
          ...item,
          _uniqueKey: item._id || item.slug || String(Math.random()),
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
      const name = c.name || c.title || c.label;
      const slug = c.slug || slugify(name) || String(c._id || "");
      if (name && slug && !map.has(slug)) {
        map.set(slug, { value: slug, slug, label: name });
      }

      if (Array.isArray(c.courses)) {
        c.courses.forEach((crs) => {
          const crsName = crs.name || crs.title;
          const crsSlug = crs.slug || slugify(crsName) || String(crs._id || "");
          if (crsName && crsSlug && !map.has(crsSlug)) {
            map.set(crsSlug, { value: crsSlug, slug: crsSlug, label: crsName });
          }
        });
      }

      if (Array.isArray(c.children)) {
        c.children.forEach((ch) => {
          const chName = ch.name || ch.title;
          const chSlug = ch.slug || slugify(chName) || String(ch._id || "");
          if (chName && chSlug && !map.has(chSlug)) {
            map.set(chSlug, { value: chSlug, slug: chSlug, label: chName });
          }
        });
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

  const handleClearFilters = () => {
    setAppliedSearchTerm("");
    setActiveCategoryTab("all");
    setSelectedCourse("");
    setActiveSubcategory([]);
    setSelectedUniversities([]);
    setSelectedDuration("all");
    setSelectedFee("all");
    setCurrentPage(1);

    if (router && pathname) {
      router.replace(pathname, { scroll: false });
    }
  };

  const activeFilterCount =
    (activeCategoryTab && activeCategoryTab !== "all" ? 1 : 0) +
    (activeSubcategory && activeSubcategory.length > 0 ? activeSubcategory.length : 0) +
    (selectedUniversities && selectedUniversities.length > 0 ? 1 : 0) +
    (selectedDuration && selectedDuration !== "all" ? 1 : 0) +
    (selectedFee && selectedFee !== "all" ? 1 : 0);

  const filterProps = {
    activeFilterCount,
    handleClearFilters,
    activeCategoryTab,
    setActiveCategoryTab,
    selectedCourse,
    setSelectedCourse,
    selectedDuration,
    setSelectedDuration,
    activeSubcategory,
    setActiveSubcategory,
    selectedFee,
    setSelectedFee,
    selectedUniversities,
    setSelectedUniversities,
    categorySelectOptions,
    subcategoryList,
    durationList,
    feeList,
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
            className="w-full text-xs font-semibold"
            placeholder="Course"
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
            options={[
              { label: "All Subcategory", value: "all" },
              ...subcategoryList.map((s) => ({ label: s.label, value: s.value || s.slug })),
            ]}
            className="w-full text-xs font-semibold"
            placeholder="Subcategory"
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
                const providerName = item.providerName || "upGrad";
                const durationText = item.durationText || "8 Months";
                const feeText = item.feeText || "₹ 1,20,000 INR";
                const courseDetailHref = item.courseDetailHref || `/courses`;

                return (
                  <div
                    key={item._uniqueKey || `${cardTitle}-${index}`}
                    className="bg-white rounded-2xl border border-gray-200 p-3.5 sm:p-4 sm:px-5 hover:border-gray-300 transition-all relative overflow-hidden group"
                  >
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
                        {/* Top Row: Provider Badge */}
                        <div className="flex items-center justify-end -mb-1">
                          <span className="bg-[#FFF0F3] border border-[#FFE4E6] text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            Via{" "}
                            <span className="font-bold text-[#E52E2E]">
                              {providerName}
                            </span>
                          </span>
                        </div>

                        {/* Title */}
                        <Link
                          href={courseDetailHref}
                          className="hover:text-blue-600 transition-colors block text-left no-underline"
                        >
                          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-2 m-0">
                            {cardTitle}
                          </h3>
                        </Link>

                        {/* Actions Row: Know More | Apply Now | + Add to Compare */}
                        <div className="flex items-center gap-2.5 pt-0.5">
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

                        <span className="bg-[#FFF0F3] border border-[#FFE4E6] text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                          Via <span className="font-bold text-[#E52E2E]">{providerName}</span>
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={courseDetailHref} className="no-underline block">
                        <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-2 m-0">
                          {cardTitle}
                        </h3>
                      </Link>

                      {/* Mobile Action Buttons */}
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                        <Link
                          href={courseDetailHref}
                          className="flex-1 bg-[#0a2540] text-white text-[11px] font-semibold py-1.5 rounded-lg text-center no-underline"
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
                          className="flex-1 bg-[#F4D068] text-gray-900 text-[11px] font-bold py-1.5 rounded-lg border-none cursor-pointer"
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
                          className="px-2 py-1.5 text-[11px] font-bold text-gray-700 flex items-center justify-center gap-0.5 cursor-pointer bg-transparent border border-gray-200 rounded-lg"
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
              onClick={handleClearFilters}
              className="text-xs font-bold text-red-500 cursor-pointer bg-transparent border-none p-0"
            >
              Reset
            </button>
          </div>
        }
        placement="bottom"
        onClose={() => setIsMobileDrawerOpen(false)}
        open={isMobileDrawerOpen}
        className="lg:hidden"
        styles={{
          wrapper: { height: "85vh" },
          section: {
            height: "85vh",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
          },
          body: { padding: "16px 20px 24px" },
        }}
      >
        <FilterSidebarContent hideHeader {...filterProps} />
      </Drawer>
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
