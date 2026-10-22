"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
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
  CheckCircle2,
  Download,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Select, Drawer, Pagination, Modal, Slider, ConfigProvider } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import { formatAdmissionDeadline } from "@/lib/utils";
import { openWhatsAppBrochure } from "@/lib/whatsappBrochure";
import { FaCalendar, FaClock } from "react-icons/fa";
import { getFullSpecName, getCleanSpecName } from "./CourseSpecializations";

const getMediaUrl = (obj) => (typeof obj === "string" ? obj : obj?.url || obj?.path || obj?.src || null);

const extractFeeText = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return `₹ ${Number(val).toLocaleString("en-IN")}`;
  if (typeof val === "object") {
    if (val.formattedSemesterFees) return String(val.formattedSemesterFees);
    if (val.semesterFees) return `₹ ${Number(val.semesterFees).toLocaleString("en-IN")} / Semester`;
    if (val.formattedPerSemesterPayable) return String(val.formattedPerSemesterPayable);
    if (val.perSemesterPayable) return `₹ ${Number(val.perSemesterPayable).toLocaleString("en-IN")} / Semester`;
    if (val.formattedNetPayable) return String(val.formattedNetPayable);
    if (val.netPayable) return `₹ ${Number(val.netPayable).toLocaleString("en-IN")}`;
    if (val.formattedBasePayable) return String(val.formattedBasePayable);
    if (val.basePayable) return `₹ ${Number(val.basePayable).toLocaleString("en-IN")}`;
    if (val.formattedActualFees) return String(val.formattedActualFees);
    if (val.actualFees) return `₹ ${Number(val.actualFees).toLocaleString("en-IN")}`;
    if (val.amount) return `₹ ${Number(val.amount).toLocaleString("en-IN")}`;
    if (val.name) return String(val.name);
  }
  return "";
};

const extractDurationText = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return `${val} Months`;
  if (typeof val === "object") {
    if (val.name) return String(val.name);
    if (val.months) return `${val.months} Months`;
  }
  return "";
};

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
          value={
            (() => {
              if (!selectedCourse || selectedCourse === "all") return "all";
              const target = String(selectedCourse).trim().toLowerCase();
              const targetSlug = target.replace(/[^a-z0-9]+/g, "-");
              const found = courseSelectOptions.find(
                (opt) =>
                  String(opt.value).toLowerCase() === target ||
                  String(opt.id || "").toLowerCase() === target ||
                  String(opt.label || "").toLowerCase() === target ||
                  String(opt.label || "").toLowerCase().replace(/[^a-z0-9]+/g, "-") === targetSlug
              );
              return found ? found.value : selectedCourse;
            })()
          }
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
          value={
            (() => {
              if (!selectedSubCourse || selectedSubCourse === "all") return "all";
              const target = String(selectedSubCourse).trim().toLowerCase();
              const targetSlug = target.replace(/[^a-z0-9]+/g, "-");
              const found = subcourseSelectOptions.find(
                (opt) =>
                  String(opt.value).toLowerCase() === target ||
                  String(opt.id || "").toLowerCase() === target ||
                  String(opt.label || "").toLowerCase() === target ||
                  String(opt.label || "").toLowerCase().replace(/[^a-z0-9]+/g, "-") === targetSlug
              );
              return found ? found.value : selectedSubCourse;
            })()
          }
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

export default function CoursesPageClientView({
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
  const isInitialMount = useRef(true);
  const ITEMS_PER_PAGE = 10;

  const searchParams = useSearchParams();
  const initialCat = searchParams?.get("category") || "all";
  const initialSubcat = searchParams?.get("subcategory") || searchParams?.get("subCategory") || "";
  const initialSubcatArr = initialSubcat ? initialSubcat.split(",").map((s) => s.trim()) : [];
  const initialCourse = searchParams?.get("course") || searchParams?.get("courseId") || "";
  const initialSubCourse = searchParams?.get("subCourse") || searchParams?.get("subcourseId") || searchParams?.get("subcourse") || searchParams?.get("specialization") || searchParams?.get("specializationId") || "";
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
  const [selectedSpecDetail, setSelectedSpecDetail] = useState(null);
  const [specFullData, setSpecFullData] = useState(null);
  const [loadingSpecDetail, setLoadingSpecDetail] = useState(false);
  const [activeSpecSem, setActiveSpecSem] = useState(0);

  const handleOpenSpecDetail = async (sc, parentData) => {
    setSelectedSpecDetail(sc);
    setSpecFullData(null);
    setLoadingSpecDetail(true);
    setActiveSpecSem(0);

    try {
      let slugPath = "";
      if (parentData?.courseDetailHref && parentData.courseDetailHref.startsWith("/universities/")) {
        slugPath = parentData.courseDetailHref.replace(/^\/universities\//, "").split("#")[0].split("?")[0];
      } else if (parentData?.coursePageSlug) {
        slugPath = parentData.coursePageSlug.split("#")[0].split("?")[0];
      } else if (parentData?.uniSlug && parentData?.courseSlug) {
        slugPath = `${parentData.uniSlug}/${parentData.courseSlug}`;
      } else if (parentData?.slug && parentData.slug.includes("/")) {
        slugPath = parentData.slug;
      }

      let detailResult = null;
      if (slugPath) {
        const res = await request.dynamicRead({
          entity: "courses",
          endPoint: "v1/list",
          id: slugPath,
          revalidate: 300,
        });
        detailResult = res?.result || res;
      }

      if (!detailResult || !Array.isArray(detailResult.subCourses)) {
        const uSlug = parentData?.uniSlug || parentData?.uniObj?.slug || parentData?.universitySlug;
        const cSlug = parentData?.courseSlug || parentData?.courseObj?.slug;
        if (uSlug && cSlug) {
          const res2 = await request.dynamicRead({
            entity: "courses",
            endPoint: "v1/list",
            id: `${uSlug}/${cSlug}`,
            revalidate: 300,
          });
          detailResult = res2?.result || res2;
        }
      }

      if (detailResult && Array.isArray(detailResult.subCourses)) {
        const subSlug = (sc.slug || sc.name || "").toLowerCase().trim();
        const scIdStr = String(sc._id || sc.id || "");
        const matched = detailResult.subCourses.find((item) => {
          if (!item) return false;
          if (scIdStr && (String(item._id) === scIdStr || String(item.id) === scIdStr)) return true;
          if (item.slug && item.slug.toLowerCase().trim() === subSlug) return true;
          const iName = (item.name || "").toLowerCase().trim();
          if (iName === subSlug || iName.includes(subSlug) || subSlug.includes(iName)) return true;
          return false;
        });
        if (matched) {
          setSpecFullData(matched);
        }
      }
    } catch (e) {
      console.error("Error fetching course detail curriculum:", e);
    } finally {
      setLoadingSpecDetail(false);
    }
  };

  const handleCloseSpecModal = () => {
    setSpecializationModalData(null);
    setSelectedSpecDetail(null);
    setSpecFullData(null);
    setLoadingSpecDetail(false);
    setActiveSpecSem(0);
  };

  const handleBackToSpecList = () => {
    setSelectedSpecDetail(null);
    setSpecFullData(null);
    setLoadingSpecDetail(false);
    setActiveSpecSem(0);
  };

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
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen, compareList } = useCompare();

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
    const subcat = searchParams?.get("subcategory") || searchParams?.get("subCategory");
    const crs = searchParams?.get("course") || searchParams?.get("courseId");
    const subCourse = searchParams?.get("subCourse") || searchParams?.get("subcourseId") || searchParams?.get("subcourse") || searchParams?.get("specialization") || searchParams?.get("specializationId");
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
    if (subCourse !== null && subCourse !== undefined) {
      setSelectedSubCourse(subCourse || "");
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
    // Skip duplicate client-side fetch on initial page mount (SSR already loaded initialCoursesData)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

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
      const targetSlug = targetStr.replace(/[^a-z0-9]+/g, '-');
      const found = (list || []).find((item) => {
        const id = String(item._id || item.id || "").toLowerCase();
        const s = String(item.slug || "").trim().toLowerCase();
        const v = String(item.value || "").trim().toLowerCase();
        const n = String(item.name || item.title || item.label || "").trim().toLowerCase();
        const nSlug = n.replace(/[^a-z0-9]+/g, '-');
        return id === targetStr || s === targetStr || v === targetStr || n === targetStr || s === targetSlug || nSlug === targetSlug || nSlug === targetStr;
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

        const uniName = uni.name || item.uniName || "Partner University";
        const courseName = item.title || course.name || "";
        const subcourseName = subcourse.name || "";
        const fullDisplayName = item.displayName || course.displayName || "";
        const effectiveCourseName = (course.showDisplayName || item.showDisplayName) && fullDisplayName ? fullDisplayName : courseName;

        let cardTitle = item.title || effectiveCourseName || "Course";

        const displayName = fullDisplayName;

        const fees = item.fees || {};
        const duration = item.duration || {};
        const partnerObj = uni.viaPartner || item.viaPartner || (Array.isArray(item.partner) && item.partner.length > 0 ? item.partner[0] : null);
        const isPartnerActive = Boolean(partnerObj && partnerObj.name && (partnerObj.show === true || partnerObj.showOnWebsite === true));
        const providerName = isPartnerActive ? partnerObj.name : null;

        const rawLogo = uni.logo || uni.logoSrc || null;
        const logoUrl = getMediaUrl(rawLogo);

        let durationText = extractDurationText(duration) || extractDurationText(item.duration) || (item.durationMonths ? `${item.durationMonths} Months` : null);

        let feeText = extractFeeText(fees) || (item.fullFee ? (typeof item.fullFee === "string" && item.fullFee.includes("₹") ? `${item.fullFee} INR` : `₹ ${item.fullFee} INR`) : (item.amount ? `₹ ${Number(item.amount).toLocaleString("en-IN")} INR` : null));

        const slugify = (text) =>
          (text || "")
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[\s_]+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+|-+$/g, "");

        const uniSlug = uni?.slug || slugify(uniName);
        const courseSlug = item.courseSlug || course?.slug || slugify(course?.shortName || course?.name || courseName);
        const subcourseSlug = item.subCourseSlug || subcourse?.slug || (subcourse?.name ? slugify(subcourse.name) : "");

        let courseDetailHref = "/courses";
        if (item.coursePageSlug && item.coursePageSlug.includes("/")) {
          courseDetailHref = `/universities/${item.coursePageSlug}`;
        } else if (item.slug && item.slug.includes("/")) {
          courseDetailHref = `/universities/${item.slug}`;
        } else if (uniSlug && courseSlug && subcourseSlug) {
          courseDetailHref = `/universities/${encodeURIComponent(uniSlug)}/${encodeURIComponent(courseSlug)}/${encodeURIComponent(subcourseSlug)}`;
        } else if (uniSlug && courseSlug) {
          courseDetailHref = `/universities/${encodeURIComponent(uniSlug)}/${encodeURIComponent(courseSlug)}`;
        } else if (courseSlug && subcourseSlug) {
          courseDetailHref = `/courses/${encodeURIComponent(courseSlug)}/${encodeURIComponent(subcourseSlug)}`;
        } else if (courseSlug) {
          courseDetailHref = `/courses/${encodeURIComponent(courseSlug)}`;
        } else if (item.slug) {
          courseDetailHref = item.slug.includes("/")
            ? `/universities/${item.slug}`
            : `/courses/${encodeURIComponent(item.slug)}`;
        }

        const rawCourseImage =
          item.courseImage ||
          item.coursepageimage ||
          uni.courseImage ||
          uni.coursepageimage ||
          uni.bannerImg ||
          uni.image ||
          null;
        const courseImageUrl = getMediaUrl(rawCourseImage);

        const overviewText =
          item.overview ||
          item.description ||
          course.description ||
          uni.description ||
          "";

        const rawAdmissionDeadline =
          item.admissionDeadline ||
          uni.admissionDeadline ||
          uni.admission_deadline ||
          null;

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
          courseImageUrl,
          courseImage: rawCourseImage,
          coursepageimage: item.coursepageimage || uni.coursepageimage,
          overview: overviewText,
          description: overviewText,
          admissionDeadline: rawAdmissionDeadline,
          providerName,
          durationText,
          feeText,
          courseDetailHref,
          courseSlug,
          uniSlug,
          universitySlug: uniSlug,
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
      const cleanSlug = (c.slug && !/^[0-9a-fA-F]{24}$/.test(c.slug))
        ? c.slug
        : (c.name ? c.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') : String(c._id || ""));
      const val = cleanSlug;
      const fullDisplay = c.displayName || c.name || "";
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
                const rawHref = item.courseDetailHref || `/courses`;
                const courseDetailHref =
                  rawHref.startsWith("/courses/") && rawHref.split("/").length > 3
                    ? rawHref.replace("/courses/", "/universities/")
                    : rawHref;

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
                              onClick={() => {
                                setSelectedSpecDetail(null);
                                setSpecFullData(null);
                                setSpecializationModalData(item);
                              }}
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

                          {(() => {
                            const rawSlug = item.uniSlug || item.universitySlug || item.slug || item._id;
                            const uniIdentifier = typeof rawSlug === "string" && rawSlug.includes("/") ? rawSlug.split("/")[0] : rawSlug;
                            const inCmp = (compareList || []).some((cmp) => {
                              const cmpKeys = [cmp._id, cmp.id, cmp.slug, cmp.uniSlug, cmp.universitySlug, cmp.name, cmp.uniName]
                                .map((k) => String(k || "").toLowerCase().trim())
                                .filter(Boolean);
                              const cardKeys = [item._id, item.id, item.slug, item.uniSlug, uniIdentifier, uniName]
                                .map((k) => String(k || "").toLowerCase().trim())
                                .filter(Boolean);
                              return cmpKeys.some((ck) => cardKeys.includes(ck));
                            });

                            return (
                              <button
                                type="button"
                                onClick={() => {
                                  if (inCmp) {
                                    const slugs = (compareList || [])
                                      .map((u) => u.uniSlug || (u.slug && !u.slug.includes("/") ? u.slug : null) || u.slug?.split("/")[0] || u._id || u.id)
                                      .filter(Boolean);
                                    const currentSlug = uniIdentifier;
                                    const combinedSlugs = Array.from(new Set([...slugs, currentSlug])).filter(Boolean).slice(0, 3);
                                    const cleanCrs = (cardTitle || item.name || "")
                                      .replace(/^online\s+/i, "")
                                      .replace(/\s+course$/i, "")
                                      .trim();
                                    router.push(
                                      `/tools/compare-universities?university=${encodeURIComponent(combinedSlugs.join(","))}${cleanCrs ? `&course=${encodeURIComponent(cleanCrs)}` : ""}`
                                    );
                                  } else {
                                    const targetItem = {
                                      _id: uniIdentifier || item._id,
                                      id: uniIdentifier || item._id,
                                      slug: uniIdentifier,
                                      uniSlug: uniIdentifier,
                                      name: uniName,
                                      title: cardTitle,
                                      uniName: uniName,
                                      courseName: cardTitle,
                                      course: cardTitle,
                                      logoUrl: logoUrl,
                                      logoSrc: logoUrl,
                                      feeText: feeText,
                                      durationText: durationText,
                                    };
                                    toggleCompare(targetItem);
                                    setIsCompareDrawerOpen(true);
                                  }
                                }}
                                className={`border text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer ml-1 ${inCmp
                                    ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-100 font-bold"
                                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white text-gray-800"
                                  }`}
                              >
                                {inCmp ? (
                                  <>
                                    <CheckOutlined className="text-teal-600 text-xs" />
                                    <span className="text-teal-700">Compare Now</span>
                                  </>
                                ) : (
                                  <>
                                    <PlusOutlined className="text-gray-700 text-xs" />
                                    <span>Add to Compare</span>
                                  </>
                                )}
                              </button>
                            );
                          })()}
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

                      {/* Title & Full Display Name Underneath — using <p> not <h3> to avoid duplicate headings in DOM (SEO) */}
                      <Link href={courseDetailHref} className="no-underline block">
                        <p className="text-xs sm:text-sm font-bold text-gray-900 leading-snug line-clamp-1 m-0">
                          {cardTitle}
                        </p>
                        {item.displayName && item.displayName.toLowerCase() !== cardTitle.toLowerCase() && (
                          <span className="text-[10px] sm:text-[11px] font-normal text-gray-500 block leading-tight mt-0.5 tracking-tight">
                            {item.displayName}
                          </span>
                        )}
                      </Link>

                      {/* Fee & Duration + Compare */}
                      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-gray-700">
                        <div className="flex items-center gap-3">
                          {feeText && (
                            <div className="flex items-center gap-1 text-gray-800 font-bold">
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

                        {/* Mobile Compare Button - In Line With Fee & Duration */}
                        {(() => {
                          const rawSlug = item.uniSlug || item.universitySlug || item.slug || item._id;
                          const uniIdentifier = typeof rawSlug === "string" && rawSlug.includes("/") ? rawSlug.split("/")[0] : rawSlug;
                          const inCmp = (compareList || []).some((cmp) => {
                            const cmpKeys = [cmp._id, cmp.id, cmp.slug, cmp.uniSlug, cmp.universitySlug, cmp.name, cmp.uniName]
                              .map((k) => String(k || "").toLowerCase().trim())
                              .filter(Boolean);
                            const cardKeys = [item._id, item.id, item.slug, item.uniSlug, uniIdentifier, uniName]
                              .map((k) => String(k || "").toLowerCase().trim())
                              .filter(Boolean);
                            return cmpKeys.some((ck) => cardKeys.includes(ck));
                          });

                          return (
                            <button
                              type="button"
                              onClick={() => {
                                if (inCmp) {
                                  const slugs = (compareList || [])
                                    .map((u) => u.uniSlug || (u.slug && !u.slug.includes("/") ? u.slug : null) || u.slug?.split("/")[0] || u._id || u.id)
                                    .filter(Boolean);
                                  const currentSlug = uniIdentifier;
                                  const combinedSlugs = Array.from(new Set([...slugs, currentSlug])).filter(Boolean).slice(0, 3);
                                  const cleanCrs = (cardTitle || item.name || "")
                                    .replace(/^online\s+/i, "")
                                    .replace(/\s+course$/i, "")
                                    .trim();
                                  router.push(
                                    `/tools/compare-universities?university=${encodeURIComponent(combinedSlugs.join(","))}${cleanCrs ? `&course=${encodeURIComponent(cleanCrs)}` : ""}`
                                  );
                                } else {
                                  const targetItem = {
                                    _id: uniIdentifier || item._id,
                                    id: uniIdentifier || item._id,
                                    slug: uniIdentifier,
                                    uniSlug: uniIdentifier,
                                    name: uniName,
                                    title: cardTitle,
                                    uniName: uniName,
                                    courseName: cardTitle,
                                    course: cardTitle,
                                    logoUrl: logoUrl,
                                    logoSrc: logoUrl,
                                    feeText: feeText,
                                    durationText: durationText,
                                  };
                                  toggleCompare(targetItem);
                                  setIsCompareDrawerOpen(true);
                                }
                              }}
                              className={`border text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors inline-flex items-center justify-center gap-1 cursor-pointer shrink-0 self-center ${inCmp
                                  ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-100 font-bold"
                                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 bg-white text-gray-700"
                                }`}
                            >
                              {inCmp ? (
                                <>
                                  <CheckOutlined className="text-teal-600 text-[10px]" />
                                  <span className="text-teal-700 font-semibold">Compare Now</span>
                                </>
                              ) : (
                                <>
                                  <PlusOutlined className="text-gray-600 text-[10px]" />
                                  <span>Compare</span>
                                </>
                              )}
                            </button>
                          );
                        })()}
                      </div>

                      {/* Mobile Action Buttons - Single Row */}
                      <div className="pt-2.5 border-t border-gray-200 flex items-center gap-1.5">
                        {Array.isArray(item.subcourses) && item.subcourses.length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedSpecDetail(null);
                              setSpecFullData(null);
                              setSpecializationModalData(item);
                            }}
                            className="flex-1 min-w-0 bg-blue-50 hover:bg-blue-100 text-[#0B3B7E] border border-blue-200 text-[11px] font-bold py-2 px-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer whitespace-nowrap"
                          >
                            <span>Specializations ({item.specializationsCount || item.subcourses.length})</span>
                          </button>
                        )}
                        <Link
                          href={courseDetailHref}
                          className="flex-1 min-w-0 bg-[#0a2540] text-white text-[11px] font-semibold py-2 px-2 rounded-lg text-center no-underline whitespace-nowrap flex items-center justify-center"
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
                          className="flex-1 min-w-0 bg-[#F4D068] text-gray-900 text-[11px] font-bold py-2 px-2 rounded-lg border-none cursor-pointer whitespace-nowrap flex items-center justify-center"
                        >
                          Apply Now
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 pb-2 px-1">
              <span className="text-xs font-semibold text-slate-500 text-center sm:text-left">
                Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalCount)}–{Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} courses
              </span>
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
                responsive
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
        onCancel={handleCloseSpecModal}
        footer={null}
        width={selectedSpecDetail ? 1150 : 940}
        centered
        closable={false}
        destroyOnHidden
        styles={{
          content: {
            padding: "20px 24px",
            borderRadius: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
            overflow: "hidden",
            maxHeight: "88vh",
          },
          body: {
            padding: 0,
          },
        }}
      >
        {specializationModalData && (() => {
          const modalUniName = specializationModalData.uniName || "University";
          const modalLogoUrl = specializationModalData.logoUrl;
          const modalCourseTitle =
            specializationModalData.cardTitle ||
            specializationModalData.title ||
            "Course Program";

          const modalCourseImage =
            specializationModalData.courseImageUrl ||
            getMediaUrl(specializationModalData.courseImage) ||
            getMediaUrl(specializationModalData.coursepageimage) ||
            getMediaUrl(specializationModalData.uniObj?.courseImage) ||
            getMediaUrl(specializationModalData.uniObj?.coursepageimage) ||
            getMediaUrl(specializationModalData.uniObj?.bannerImg) ||
            getMediaUrl(specializationModalData.uniObj?.image) ||
            null;

          const rawOverview =
            specializationModalData.overview ||
            specializationModalData.description ||
            specializationModalData.courseObj?.description ||
            specializationModalData.uniObj?.description ||
            "";
          const modalOverview =
            String(rawOverview)
              .replace(/<[^>]*>/g, " ")
              .replace(/\s+/g, " ")
              .trim() ||
            `${modalUniName} ${modalCourseTitle} is a comprehensive program designed for graduates and working professionals seeking advanced business and industry-ready leadership knowledge.`;

          const rawDeadline =
            specializationModalData.admissionDeadline ||
            specializationModalData.uniObj?.admissionDeadline ||
            specializationModalData.uniObj?.admission_deadline;
          const modalDeadline = rawDeadline ? formatAdmissionDeadline(rawDeadline) : null;

          const subcourses = Array.isArray(specializationModalData.subcourses)
            ? specializationModalData.subcourses
            : [];
          const specCount = specializationModalData.specializationsCount || subcourses.length;

          if (selectedSpecDetail) {
            // ── VIEW 2: FULL SPECIALIZATION DETAILS WITH CURRICULUM (EXACT COURSE PAGE MODAL) ──
            const cleanSpecTitle = getCleanSpecName(selectedSpecDetail.name, modalCourseTitle);
            const detailTitle = getFullSpecName(selectedSpecDetail.name, modalCourseTitle);

            const itemDuration =
              extractDurationText(specFullData?.duration) ||
              extractDurationText(selectedSpecDetail?.duration) ||
              extractDurationText(specializationModalData.durationText) ||
              "";

            const rawDeadline =
              specFullData?.admissionDeadline ||
              selectedSpecDetail?.admissionDeadline ||
              specializationModalData.admissionDeadline ||
              "";
            const itemDeadline = rawDeadline ? formatAdmissionDeadline(rawDeadline) : "";

            const rawDesc =
              specFullData?.description ||
              selectedSpecDetail?.description ||
              modalOverview;
            const itemDesc = typeof rawDesc === "string" ? rawDesc.trim() : "";

            const itemFeesFormatted =
              extractFeeText(specFullData?.fees) ||
              extractFeeText(specFullData?.fee) ||
              extractFeeText(selectedSpecDetail?.fees) ||
              extractFeeText(selectedSpecDetail?.fee) ||
              extractFeeText(specializationModalData.feeText) ||
              "";

            const specDesktopBannerRaw =
              specFullData?.bannerImage ||
              specFullData?.bannerImg ||
              specFullData?.banner ||
              specFullData?.image ||
              selectedSpecDetail?.bannerImage ||
              selectedSpecDetail?.bannerImg ||
              selectedSpecDetail?.banner ||
              selectedSpecDetail?.image ||
              specializationModalData.courseImageUrl ||
              specializationModalData.courseImage ||
              specializationModalData.coursepageimage ||
              specializationModalData.uniObj?.bannerImg ||
              specializationModalData.uniObj?.image ||
              modalCourseImage ||
              "";
            const specDesktopBanner = specDesktopBannerRaw ? (getMediaUrl(specDesktopBannerRaw) || "") : "";

            const specMobileBannerRaw =
              specFullData?.bannerImageMobile ||
              specFullData?.mobileBannerImg ||
              selectedSpecDetail?.bannerImageMobile ||
              selectedSpecDetail?.mobileBannerImg ||
              specializationModalData.mobileBannerImage ||
              specializationModalData.mobileBannerImg ||
              specializationModalData.uniObj?.mobileBannerImg ||
              specializationModalData.uniObj?.mobileBannerImage ||
              specDesktopBannerRaw;
            const specMobileBanner = specMobileBannerRaw ? (getMediaUrl(specMobileBannerRaw) || specDesktopBanner) : specDesktopBanner;

            const specCurriculum = (() => {
              if (Array.isArray(specFullData?.curriculum) && specFullData.curriculum.length > 0) {
                return specFullData.curriculum
                  .filter((c) => c && Array.isArray(c.subjects) && c.subjects.length > 0)
                  .map((c, idx) => ({
                    semester: c.semesterName || `Semester ${idx + 1}`,
                    subjects: c.subjects,
                  }));
              }
              return [];
            })();

            const activeCurriculum = specCurriculum[activeSpecSem] || specCurriculum[0];

            return (
              <div className="relative text-left max-h-[82vh] overflow-y-auto pr-1 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
                {/* Top Bar with Back Button & Close Button */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 gap-2">
                  <button
                    type="button"
                    onClick={handleBackToSpecList}
                    className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full text-xs font-bold text-[#0B2546] bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-0 shrink-0"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Specializations</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCloseSpecModal}
                    className="w-8 h-8 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer border-0 ml-auto shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row items-stretch gap-5 sm:gap-6">
                  {/* Left Column: Portrait Banner Card */}
                  <div className="relative w-full md:w-80 lg:w-88 shrink-0 h-36 sm:h-44 md:h-auto min-h-36 sm:min-h-44 md:min-h-[350px] md:max-h-[460px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 shadow-xs flex items-stretch">
                    {specDesktopBanner && (
                      <Image
                        src={specDesktopBanner}
                        alt={detailTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, 370px"
                        className={`object-cover object-center ${specMobileBanner && specMobileBanner !== specDesktopBanner ? "hidden md:block" : "block"
                          }`}
                      />
                    )}

                    {specMobileBanner && specMobileBanner !== specDesktopBanner && (
                      <Image
                        src={specMobileBanner}
                        alt={detailTitle}
                        fill
                        sizes="100vw"
                        className="object-cover object-center block md:hidden"
                      />
                    )}

                    {!specDesktopBanner && !specMobileBanner && (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <span className="text-slate-400 font-bold text-sm">No Image</span>
                      </div>
                    )}

                    {(selectedSpecDetail?.logo || (modalLogoUrl && !modalUniName?.toLowerCase().includes("manipal"))) && (
                      <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 bg-white rounded-xl shadow-md p-1.5 sm:p-2.5 flex flex-col items-center justify-center text-center min-w-[64px] sm:min-w-[74px] max-w-[80px] sm:max-w-[90px]">
                        <div className="relative w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center">
                          <Image
                            src={getMediaUrl(selectedSpecDetail?.logo) || modalLogoUrl}
                            alt={selectedSpecDetail?.logo ? cleanSpecTitle : (modalUniName || "University")}
                            fill
                            sizes="36px"
                            className="object-contain"
                          />
                        </div>
                        <span className="text-[8.5px] sm:text-[9.5px] font-bold text-gray-900 leading-tight mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
                          {selectedSpecDetail?.logo ? cleanSpecTitle : modalUniName}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Content */}
                  <div className="flex-1 flex flex-col justify-start text-left gap-3 sm:gap-3.5">
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-[25px] font-black text-[#0C2B4E] tracking-tight leading-tight mb-2.5">
                        {detailTitle}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 font-medium mb-2.5">
                        {itemDuration && (
                          <div className="flex items-center gap-1.5">
                            <FaClock className="w-3 h-3 text-[#072C50] shrink-0" />
                            <span>{itemDuration}</span>
                          </div>
                        )}
                        {itemFeesFormatted && (
                          <span className="font-bold text-gray-500">{itemFeesFormatted}</span>
                        )}
                        {itemDeadline && (
                          <div className="flex items-center gap-1.5">
                            <FaCalendar className="w-3 h-3 text-[#072C50] shrink-0" />
                            <span className="text-red-500">
                              Admission Deadline : <strong className="font-semibold text-gray-500">{itemDeadline}</strong>
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-0 font-normal">
                        {itemDesc}
                      </p>
                    </div>

                    {/* Course Curriculum Section */}
                    {specCurriculum.length > 0 && (
                      <div>
                        <div className="flex items-center gap-3 mb-2.5">
                          <h4 className="text-sm sm:text-base font-bold text-[#0C2B4E] m-0 tracking-tight shrink-0">
                            Course Curriculum
                          </h4>
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
                          <div className="col-span-12 md:col-span-3 grid grid-cols-3 md:flex md:flex-col gap-2">
                            {specCurriculum.map((sem, sIdx) => {
                              const isActive = activeSpecSem === sIdx;
                              return (
                                <button
                                  key={sIdx}
                                  type="button"
                                  onClick={() => setActiveSpecSem(sIdx)}
                                  className={`w-full py-1.5 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer border-none ${isActive
                                    ? "bg-[#0C2B4E] text-white shadow-sm md:w-full"
                                    : "bg-[#EEF3FA] text-[#475569] hover:bg-[#dde7f5] md:w-[88%]"
                                    }`}
                                >
                                  <span className="flex items-center justify-between w-full">
                                    <span>{sem.semester}</span>
                                    {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          <div className="col-span-12 md:col-span-9 bg-gradient-to-br from-blue-50/50 via-blue-50/30 to-slate-50/40 border border-blue-100/80 rounded-2xl p-3.5 sm:p-4 min-h-[135px] flex items-start">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 w-full">
                              {(activeCurriculum?.subjects || []).map((sub, subIdx) => (
                                <div key={subIdx} className="flex items-start gap-2 text-xs text-gray-700 leading-snug">
                                  <span className="text-gray-900 font-bold shrink-0 leading-none mt-0.5">•</span>
                                  <span className="font-medium text-gray-800 line-clamp-1">
                                    {typeof sub === "string" ? sub : sub.name || ""}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bottom Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const title = detailTitle;
                          const specSlug =
                            selectedSpecDetail?.slug ||
                            (selectedSpecDetail?.name
                              ? selectedSpecDetail.name
                                  .toLowerCase()
                                  .replace(/^online\s+[a-z0-9+-]+\s+in\s+/i, "")
                                  .replace(/^distance\s+[a-z0-9+-]+\s+in\s+/i, "")
                                  .replace(/[^a-z0-9]+/g, "-")
                                  .replace(/^-|-$/g, "")
                              : "");
                          const baseCourseSlug = specializationModalData?.slug || "courses";
                          const fullSlug = specSlug && !baseCourseSlug.toLowerCase().includes(specSlug)
                            ? `${baseCourseSlug.replace(/\/+$/, "")}/${specSlug}`
                            : baseCourseSlug;

                          handleCloseSpecModal();
                          openWhatsAppBrochure({
                            title,
                            slug: fullSlug,
                          });
                        }}
                        className="flex-1 min-w-0 bg-[#0C2B4E] hover:bg-[#071c33] text-white text-[11px] sm:text-xs md:text-sm font-bold py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-sm border-none active:scale-95"
                      >
                        <span className="truncate">Download Brochure</span>
                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const title = detailTitle;
                          handleCloseSpecModal();
                          openFormModal({
                            title: "Get 100% FREE Counseling",
                            subtitle: title,
                            defaultCourse: title,
                            formNameOverride: `CounselingModal_${specializationModalData.slug || modalUniName}_${selectedSpecDetail.slug || selectedSpecDetail.name}`,
                            submitButtonText: "Get 100% FREE Counseling",
                          });
                        }}
                        className="flex-1 min-w-0 bg-white hover:bg-gray-50 text-[#0C2B4E] border border-[#0C2B4E] text-[10.5px] min-[380px]:text-[11.5px] sm:text-xs md:text-sm font-bold py-2.5 sm:py-3 px-1.5 sm:px-4 rounded-xl flex items-center justify-center text-center transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        <span className="truncate">Get 100% FREE Counseling</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // ── VIEW 1: SPECIALIZATIONS GRID OVERVIEW (INITIAL MODAL STATE) ──
          return (
            <div className="relative text-left">
              {/* Close Button Top-Right */}
              <button
                type="button"
                onClick={handleCloseSpecModal}
                className="absolute top-0 right-0 z-20 w-8 h-8 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer border-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col md:flex-row gap-5 lg:gap-6 items-stretch">
                {/* Left Column: Campus / Course Image with University Badge */}
                <div className="w-full md:w-[320px] lg:w-[340px] shrink-0 relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto bg-slate-100 flex items-center justify-center self-stretch min-h-[260px]">
                  {modalCourseImage ? (
                    <Image
                      src={modalCourseImage}
                      alt={modalUniName}
                      fill
                      sizes="(max-width: 768px) 100vw, 340px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <span className="text-slate-400 font-bold text-sm">No Image</span>
                    </div>
                  )}

                  {/* Floating University Card in top-left */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-white/95 backdrop-blur-xs rounded-xl shadow-lg border border-white/80 p-2 sm:p-2.5 flex flex-col items-center justify-center min-w-[76px] max-w-[105px] text-center">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 relative flex items-center justify-center">
                      {modalLogoUrl ? (
                        <Image
                          src={modalLogoUrl}
                          alt={modalUniName}
                          fill
                          sizes="40px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-blue-50 text-[#0B3B7E] font-bold flex items-center justify-center text-xs uppercase">
                          {modalUniName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-[10.5px] font-bold text-[#0B2546] leading-tight mt-1 line-clamp-2">
                      {modalUniName}
                    </span>
                  </div>
                </div>

                {/* Right Column: Details, Specializations, CTAs */}
                <div className="flex-1 min-w-0 flex flex-col justify-between gap-3 pt-1 md:pt-0">
                  <div className="space-y-2.5">
                    {/* Course Title & University Name */}
                    <div>
                      <h2 className="text-2xl sm:text-[26px] font-black text-[#0B2546] leading-tight m-0 tracking-tight">
                        {modalCourseTitle}
                      </h2>
                      {modalUniName && (
                        <p className="text-xs sm:text-[13px] font-medium text-gray-700 m-0 mt-0.5">
                          ({modalUniName})
                        </p>
                      )}
                    </div>

                    {/* Meta row: Duration, Fee, Admission Deadline */}
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-700 font-medium">
                      {specializationModalData.durationText && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          <span className="font-normal text-gray-800">{extractDurationText(specializationModalData.durationText)}</span>
                        </div>
                      )}
                      {specializationModalData.feeText && (
                        <div className="flex items-center gap-1">
                          <span className="font-normal text-gray-800">{extractFeeText(specializationModalData.feeText)}</span>
                        </div>
                      )}
                      {modalDeadline && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          <span className="text-red-500 font-bold">Admission Deadline :</span>
                          <span className="font-normal text-gray-800">{modalDeadline}</span>
                        </div>
                      )}
                    </div>

                    {/* Overview paragraph */}
                    <p className="text-xs sm:text-[12.5px] text-gray-600 leading-[1.35] sm:leading-normal line-clamp-3 m-0">
                      {modalOverview}
                    </p>

                    {/* Middle: Specializations Grid */}
                    <div className="pt-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-[#0B2546] mb-2">
                        {specCount} Specializations Available
                      </h4>
                      <div className="max-h-[160px] sm:max-h-[175px] overflow-y-auto pr-1 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                          {subcourses.map((sc, idx) => (
                            <button
                              key={sc._id || idx}
                              type="button"
                              onClick={() => {
                                // Transition in-place inside the modal without leaving the page!
                                handleOpenSpecDetail(sc, specializationModalData);
                              }}
                              className="group bg-[#F4F9FD] hover:bg-[#EAF3FA] border border-[#DCEDF9] hover:border-sky-300 rounded-full px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 sm:gap-2 text-left cursor-pointer transition-all duration-150 min-w-0 w-full"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 group-hover:text-sky-600 shrink-0" />
                              <span className="text-[11px] sm:text-xs font-medium text-slate-700 group-hover:text-slate-900 truncate">
                                {sc.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Action Buttons */}
                  <div className="flex items-center gap-3 pt-2 mt-auto">
                    <button
                      type="button"
                      onClick={() => {
                        handleCloseSpecModal();
                        openWhatsAppBrochure({
                          title: modalCourseTitle,
                          slug: specializationModalData?.slug || "courses",
                        });
                      }}
                      className="bg-[#0B2546] hover:bg-[#06182c] text-white text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 flex-1 shadow-sm transition-all cursor-pointer border-none"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Brochure</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleCloseSpecModal();
                        openFormModal({
                          title: "Get 100% FREE Counseling",
                          subtitle: modalCourseTitle,
                          defaultCourse: modalCourseTitle,
                          formNameOverride: `CounselingModal_${specializationModalData.slug || modalUniName}`,
                          submitButtonText: "Get 100% FREE Counseling",
                        });
                      }}
                      className="bg-white hover:bg-slate-50 border border-[#0B2546] text-[#0B2546] text-xs sm:text-sm font-bold py-2.5 px-4 rounded-xl flex items-center justify-center flex-1 transition-all cursor-pointer"
                    >
                      <span>Get 100% FREE Counseling</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </Modal>
    </WebsiteLayout>
  );
}

