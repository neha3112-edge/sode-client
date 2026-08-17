"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Select, Tag, Empty, Skeleton, Table } from "antd";
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
  DeleteOutlined,
  CloseOutlined,
  PhoneOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  DollarOutlined,
  BookOutlined,
  GlobalOutlined,
  TrophyOutlined,
  TeamOutlined,
  LaptopOutlined,
  VideoCameraOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

import { useCompare, useAppDrawer } from "@/context";
import {
  getUniversityOptions,
  getCourseOptions,
  getModeOptions,
  getWebsiteUniversitiesCompare,
} from "@/services/api";
import { getAssetPath } from "@/lib/utils";

function CompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    addToCompare,
    updateCompareList,
  } = useCompare();
  const { openFormModal } = useAppDrawer();

  const [allUniversities, setAllUniversities] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allModes, setAllModes] = useState([]);
  const [comparedData, setComparedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedMode, setSelectedMode] = useState("all");
  const [flyingLogo, setFlyingLogo] = useState(null);

  // 1. Fetch all universities, courses, and modes for dropdown selectors
  useEffect(() => {
    let isMounted = true;

    getUniversityOptions()
      .then((res) => {
        if (!isMounted) return;
        const uList = Array.isArray(res) ? res : res?.result || [];
        setAllUniversities(uList);
      })
      .catch((err) => console.error("Error fetching university options:", err));

    getCourseOptions()
      .then((res) => {
        if (!isMounted) return;
        const cList = Array.isArray(res) ? res : res?.result || [];
        setAllCourses(cList);
      })
      .catch((err) => console.error("Error fetching course options:", err));

    getModeOptions()
      .then((res) => {
        if (!isMounted) return;
        const mList = Array.isArray(res) ? res : res?.result || [];
        setAllModes(mList);
      })
      .catch((err) => console.error("Error fetching mode options:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Determine which identifiers to compare (prioritizing clean readable slugs)
  const currentIdentifiers = useMemo(() => {
    if (compareList && compareList.length > 0) {
      return compareList.map((item) => item.slug || item._id || item.id).filter(Boolean);
    }
    const urlIds = searchParams.get("universityid") || searchParams.get("ids") || searchParams.get("universities");
    if (urlIds) {
      return urlIds.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  }, [searchParams, compareList]);

  // Extract all available courses from compared universities
  const availableCourses = useMemo(() => {
    if (!comparedData || comparedData.length === 0) return [];
    const courseSet = new Set();
    comparedData.forEach((uni) => {
      if (uni.course_name) courseSet.add(uni.course_name.trim());
      (uni.coursesOffered || []).forEach((c) => {
        if (typeof c === "string" && c.trim()) courseSet.add(c.trim());
      });
      (uni.courseOfferings || []).forEach((o) => {
        if (o.course_name && typeof o.course_name === "string" && o.course_name.trim()) {
          courseSet.add(o.course_name.trim());
        }
      });
    });
    return Array.from(courseSet);
  }, [comparedData]);

  // Auto-detect course from compareList if navigated from courses page
  useEffect(() => {
    if (!compareList || compareList.length === 0 || allCourses.length === 0) return;
    const detected = [];
    for (const item of compareList) {
      const candidateNames = [
        item.programObj?.courseId?.name,
        item.programObj?.title,
        item.title,
        item.name,
      ].filter(Boolean);

      for (const rawName of candidateNames) {
        if (typeof rawName !== "string") continue;
        const matched = allCourses.find(
          (c) =>
            c.name?.toLowerCase() === rawName.toLowerCase() ||
            rawName.toLowerCase().startsWith(c.name?.toLowerCase() + " ") ||
            rawName.toLowerCase().includes(c.name?.toLowerCase())
        );
        if (matched && !detected.includes(matched.name)) {
          detected.push(matched.name);
        }
      }
    }
    if (detected.length > 0) {
      setSelectedCourses((prev) => (prev.length === 0 ? detected : prev));
    }
  }, [compareList, allCourses]);

  // 3. Fetch live comparison data from backend API ONLY when "Compare Now" is clicked
  const handleCompareNow = async () => {
    if (currentIdentifiers.length === 0) return;
    setLoading(true);
    try {
      const res = await getWebsiteUniversitiesCompare(currentIdentifiers);
      const data = Array.isArray(res) ? res : res?.result || [];
      setComparedData(data);

      // Update URL query parameters with clean university slugs
      const slugsToUse = (compareList && compareList.length > 0)
        ? compareList.map((u) => u.slug || u._id || u.id).filter(Boolean)
        : currentIdentifiers;

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("universityid", slugsToUse.join(","));
      router.replace(`?${newParams.toString()}`, { scroll: false });

      // Smooth scroll to the comparison matrix section
      setTimeout(() => {
        const el = document.getElementById("comparison-matrix-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error("❌ Failed to load live comparison data:", err);
    } finally {
      setLoading(false);
    }
  };

  const initialFetchDoneRef = useRef(false);

  // Initial fetch ONLY on page mount if URL already contains query parameters
  useEffect(() => {
    if (initialFetchDoneRef.current) return;
    const urlIds = searchParams.get("universityid") || searchParams.get("ids") || searchParams.get("universities");
    if (!urlIds) return;
    const ids = urlIds.split(",").map((s) => s.trim()).filter(Boolean);
    if (ids.length === 0) return;

    initialFetchDoneRef.current = true;
    setLoading(true);
    getWebsiteUniversitiesCompare(ids)
      .then((res) => {
        const data = Array.isArray(res) ? res : res?.result || [];
        setComparedData(data);
      })
      .catch((err) => console.error("❌ Failed to load comparison data on mount:", err))
      .finally(() => setLoading(false));
  }, [searchParams]);

  // Available universities (excluding currently selected ones & filtered by selectedMode)
  const availableUniversities = useMemo(() => {
    const selectedKeys = new Set([
      ...(compareList || []).map((u) => String(u._id || u.id || u.slug || "").toLowerCase()),
      ...(comparedData || []).map((u) => String(u._id || u.slug || "").toLowerCase()),
    ]);
    return (allUniversities || []).filter((u) => {
      const isSelected = selectedKeys.has(String(u._id || u.slug || "").toLowerCase());
      if (isSelected) return false;
      if (selectedMode && selectedMode !== "all") {
        const uMode = u.mode || u.education_mode || [];
        const modeArr = Array.isArray(uMode) ? uMode : [uMode];
        const hasMode = modeArr.some(
          (m) =>
            typeof m === "string" &&
            (m.toLowerCase() === selectedMode.toLowerCase() ||
              m.toLowerCase().includes(selectedMode.toLowerCase()))
        );
        if (modeArr.length > 0 && !hasMode) {
          return false;
        }
      }
      return true;
    });
  }, [allUniversities, compareList, comparedData, selectedMode]);

  // Rich Select Options with Logos for the in-slot university picker
  const universitySelectOptions = useMemo(() => {
    return availableUniversities.map((u) => {
      const rawLogo =
        (typeof u.logoSrc === "object" ? u.logoSrc?.url : u.logoSrc) ||
        (typeof u.logo === "object" ? u.logo?.url : u.logo) ||
        u.logoUrl ||
        null;

      return {
        value: String(u._id || u.slug),
        label: (
          <div className="flex items-center gap-2.5 py-1">
            <div className="relative w-7 h-7 rounded-lg border border-slate-200 bg-white p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
              {rawLogo ? (
                <Image
                  src={getAssetPath(rawLogo)}
                  alt={u.name || "Logo"}
                  fill
                  unoptimized
                  className="object-contain p-0.5"
                />
              ) : (
                <span className="text-[10px] font-extrabold text-[#1C3569]">
                  {u.name ? u.name.charAt(0) : "U"}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-800 truncate leading-tight">
                {u.name}
              </div>
              {u.location && (
                <div className="text-[10px] text-slate-400 font-medium truncate">
                  {u.location}
                </div>
              )}
            </div>
          </div>
        ),
        searchValue: `${u.name} ${u.location || ""}`,
        itemObj: u,
      };
    });
  }, [availableUniversities]);

  // Dynamic Dropdown options for Modes from ModeInfo API (No hardcoding)
  const modeSelectOptions = useMemo(() => {
    const list = (allModes || [])
      .filter((m) => m && m.name)
      .map((m) => ({
        value: m.name,
        label: `${m.name}`,
      }));

    return [
      { value: "all", label: "All Modes" },
      ...list,
    ];
  }, [allModes]);

  // Dropdown selector options for all master courses
  const courseSelectOptions = useMemo(() => {
    const list = (allCourses || [])
      .filter((c) => c && c.name)
      .map((c) => ({
        value: c.name,
        label: c.name,
      }));

    const existing = new Set(list.map((item) => item.value.toLowerCase()));
    (availableCourses || []).forEach((c) => {
      if (c && !existing.has(c.toLowerCase())) {
        list.push({ value: c, label: c });
        existing.add(c.toLowerCase());
      }
    });

    return [
      { value: "all", label: "All Courses" },
      ...list,
    ];
  }, [allCourses, availableCourses]);

  // Marquee Row 1 & 2 Universities (Selected universities DISAPPEAR from here, and REAPPEAR when removed)
  const marqueeRow1 = useMemo(() => {
    if (!availableUniversities || availableUniversities.length === 0) return [];
    const half = Math.ceil(availableUniversities.length / 2);
    const slice = availableUniversities.slice(0, half);
    return [...slice, ...slice, ...slice, ...slice];
  }, [availableUniversities]);

  const marqueeRow2 = useMemo(() => {
    if (!availableUniversities || availableUniversities.length === 0) return [];
    const half = Math.ceil(availableUniversities.length / 2);
    const slice = availableUniversities.slice(half);
    return [...slice, ...slice, ...slice, ...slice];
  }, [availableUniversities]);

  // Smooth "Fly-to-Slot" animation when a university is picked (Always flies from Top Marquee section)
  const triggerFlyAnimation = (uni, originElement, specificSlotIdx) => {
    if (!uni) return;
    const uniId = String(uni._id || uni.slug || uni.id);
    const activeList = compareList && compareList.length > 0 ? compareList : comparedData;
    const isAlreadyIn = activeList.some(
      (u) => String(u._id || u.id || u.slug) === uniId || u.slug === uni.slug
    );

    if (isAlreadyIn) {
      removeFromCompare(uni.slug || uni._id || uni.id);
      return;
    }

    if (activeList.length >= 3) {
      return;
    }

    const targetIdx =
      specificSlotIdx !== undefined && specificSlotIdx !== null
        ? specificSlotIdx
        : activeList.length;
    const targetSlotEl =
      typeof document !== "undefined"
        ? document.getElementById(`uni-slot-${targetIdx}`)
        : null;

    if (targetSlotEl) {
      let originRect = null;
      if (originElement) {
        originRect = originElement.getBoundingClientRect();
      } else if (typeof document !== "undefined") {
        // Find all clone instances of this university in the scrolling marquee
        const allClones = Array.from(
          document.querySelectorAll(`[data-uni-id="${uniId}"]`)
        );
        // Find the specific clone currently visible inside the viewport
        const visibleClone =
          allClones.find((el) => {
            const r = el.getBoundingClientRect();
            return r.left >= -50 && r.right <= window.innerWidth + 50;
          }) ||
          allClones.find((el) => {
            const r = el.getBoundingClientRect();
            return r.right > 0 && r.left < window.innerWidth;
          }) ||
          allClones[0];

        if (visibleClone) {
          originRect = visibleClone.getBoundingClientRect();
        } else {
          const heroMarquee = document.getElementById("marquee-hero-section");
          const heroRect = heroMarquee
            ? heroMarquee.getBoundingClientRect()
            : { top: 60, left: 0, width: window.innerWidth, height: 180 };
          originRect = {
            top: Math.max(heroRect.top + 30, 60),
            left: window.innerWidth / 2 - 70,
            width: 140,
            height: 55,
          };
        }
      }

      const targetRect = targetSlotEl.getBoundingClientRect();
      const startPos = originRect || {
        top: 80,
        left: typeof window !== "undefined" ? window.innerWidth / 2 - 60 : 200,
        width: 120,
        height: 50,
      };

      const rawLogo =
        (typeof uni.logoSrc === "object" ? uni.logoSrc?.url : uni.logoSrc) ||
        (typeof uni.logo === "object" ? uni.logo?.url : uni.logo) ||
        uni.logoUrl ||
        null;

      setFlyingLogo({
        logo: rawLogo,
        name: uni.name || uni.title,
        start: {
          top: startPos.top,
          left: startPos.left,
          width: startPos.width || 120,
          height: startPos.height || 50,
        },
        target: {
          top: targetRect.top + 16,
          left: targetRect.left + targetRect.width / 2 - 30,
          width: 60,
          height: 60,
        },
        isAnimating: false,
      });

      addToCompare(uni);

      // Trigger flight animation on next animation frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlyingLogo((prev) => (prev ? { ...prev, isAnimating: true } : null));
        });
      });

      setTimeout(() => {
        setFlyingLogo(null);
      }, 700);
    } else {
      addToCompare(uni);
    }
  };

  const handleLogoClick = (uni, e) => {
    triggerFlyAnimation(uni, e?.currentTarget);
  };

  // Ant Design Table Columns Definition
  const tableColumns = useMemo(() => {
    if (!comparedData || comparedData.length === 0) return [];

    const count = comparedData.length;
    const featureWidth = count <= 2 ? "20%" : count === 3 ? "17%" : "15%";
    const uniWidth = count <= 2 ? `${80 / count}%` : count === 3 ? `${83 / count}%` : `${85 / count}%`;

    const featureCol = {
      title: <span className="font-extrabold text-xs uppercase tracking-wider text-slate-700">Feature / Criteria</span>,
      dataIndex: "featureTitle",
      key: "featureTitle",
      width: featureWidth,
      className: "bg-slate-50/80 font-bold text-slate-700 text-xs px-2.5",
      render: (text, record) => (
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs py-0.5">
          <span className="shrink-0">{record.icon}</span>
          <span className="leading-snug">{record.featureTitle}</span>
        </div>
      ),
    };

    const universityCols = comparedData.map((uni, idx) => {
      const itemKey = uni._id || uni.slug || `col-${idx}`;
      const isOffering = uni.isCourseOffering || uni.type === "course_offering";
      const displayTitle = isOffering ? uni.title : uni.name;
      const displaySubTitle = isOffering ? (uni.uniName || uni.name) : null;

      return {
        title: (
          <div className="relative group flex flex-col items-center text-center space-y-1.5 py-1 px-1">
            <button
              onClick={() => removeFromCompare(uni.slug || uni._id)}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-200 hover:bg-red-500 text-slate-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10"
              title="Remove from Compare"
            >
              <CloseOutlined className="text-[9px]" />
            </button>

            <div className="w-12 h-12 rounded-xl border border-slate-200 bg-white p-1.5 flex items-center justify-center relative shadow-xs">
              {uni.logo ? (
                <Image
                  src={getAssetPath(uni.logo)}
                  alt={displayTitle || "Logo"}
                  fill
                  unoptimized
                  className="object-contain p-0.5"
                />
              ) : (
                <span className="text-base font-black text-[#1C3569]">
                  {displayTitle ? displayTitle.charAt(0) : "U"}
                </span>
              )}
            </div>

            <div className="space-y-0.5 max-w-[200px]">
              <h3 className="text-xs font-bold text-[#1C3569] m-0 line-clamp-2 leading-tight">
                {displayTitle}
              </h3>
              {displaySubTitle && (
                <p className="text-[11px] font-semibold text-teal-700 m-0 line-clamp-1">
                  {displaySubTitle}
                </p>
              )}
            </div>

            {uni.location && (
              <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full line-clamp-1">
                {uni.location}
              </span>
            )}
          </div>
        ),
        dataIndex: itemKey,
        key: itemKey,
        align: "center",
        width: uniWidth,
        className: "text-center text-xs font-medium align-middle py-2.5 px-1.5",
        render: (val, record) => record.renderCell(uni, idx),
      };
    });

    return [featureCol, ...universityCols];
  }, [comparedData, removeFromCompare]);

  // Helper to find course offering for a given university and course name
  const findCourseOffering = (uni, courseName) => {
    if (!uni) return null;

    if (uni.isCourseOffering || uni.type === "course_offering") {
      return {
        course_name: uni.course_name || uni.title,
        fee_per_semester: uni.fee_per_semester,
        fee_discount: uni.fee_discount || "Upto 20%",
        rating: uni.rating || 4.5,
        duration: uni.duration || "2 Years",
        eligibility: uni.eligibility || "Graduation / 10+2 from recognized board",
        specializations: uni.specializations || [],
      };
    }

    if (!courseName || courseName === "all") return null;
    const directOffering = (uni.courseOfferings || []).find(
      (o) =>
        o.course_name?.toLowerCase() === courseName.toLowerCase() ||
        o.course_slug?.toLowerCase() === courseName.toLowerCase()
    );
    if (directOffering) return directOffering;

    const isOfferedInList = (uni.coursesOffered || []).some(
      (c) => c?.toLowerCase() === courseName.toLowerCase()
    );
    if (isOfferedInList) {
      return {
        course_name: courseName,
        fee_per_semester: uni.avg_placement_package || null,
        fee_discount: "Upto 20%",
        rating: uni.rating || 4.5,
        duration: "2–3 Years",
        eligibility: "Graduation / 10+2 from recognized board",
        specializations: [],
      };
    }
    return null;
  };

  // Ant Design Table Data Source (Dynamic Course Points + 22 Matrix Points + Action Row)
  const tableDataSource = useMemo(() => {
    if (!comparedData || comparedData.length === 0) return [];

    const hasCoursesSelected = Array.isArray(selectedCourses) && selectedCourses.length > 0;
    const hasOfferingComparison = comparedData.some((u) => u.isCourseOffering || u.type === "course_offering");

    // Dynamic Course Level Comparison Rows (When courses are selected or comparing course offerings)
    const courseSpecificRows = [];

    if (hasCoursesSelected) {
      selectedCourses.forEach((cName) => {
        const suffix = selectedCourses.length > 1 ? ` (${cName})` : "";
        courseSpecificRows.push(
          {
            key: `course_status_${cName}`,
            icon: <BookOutlined className="text-[#009F93]" />,
            featureTitle: `Course Availability${suffix}`,
            renderCell: (uni) => {
              const off = findCourseOffering(uni, cName);
              return off ? (
                <Tag color="success" className="font-bold text-xs px-2.5 py-0.5 rounded-full m-0">
                  Offered
                </Tag>
              ) : (
                <Tag color="default" className="text-slate-400 font-semibold text-xs px-2.5 py-0.5 rounded-full m-0">
                  Not Offered
                </Tag>
              );
            },
          },
          {
            key: `course_fees_${cName}`,
            icon: <DollarOutlined className="text-emerald-600" />,
            featureTitle: `Fees per Semester${suffix}`,
            renderCell: (uni) => {
              const off = findCourseOffering(uni, cName);
              if (!off) return <span className="text-slate-400">-</span>;
              return off.fee_per_semester ? (
                <Tag color="success" className="font-extrabold text-xs px-2.5 py-0.5 rounded-full m-0">
                  {off.fee_per_semester}
                </Tag>
              ) : (
                <span className="text-slate-400">Contact for Fees</span>
              );
            },
          },
          {
            key: `course_discount_${cName}`,
            icon: <DollarOutlined className="text-orange-500" />,
            featureTitle: `Fees Discount${suffix}`,
            renderCell: (uni) => {
              const off = findCourseOffering(uni, cName);
              if (!off) return <span className="text-slate-400">-</span>;
              return (
                <Tag color="orange" className="font-bold text-[11px] px-2.5 py-0.5 rounded-full m-0">
                  {off.fee_discount || "Upto 20%"}
                </Tag>
              );
            },
          },
          {
            key: `course_rating_${cName}`,
            icon: <TrophyOutlined className="text-amber-500" />,
            featureTitle: `Course Rating${suffix}`,
            renderCell: (uni) => {
              const off = findCourseOffering(uni, cName);
              if (!off) return <span className="text-slate-400">-</span>;
              return (
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-xs">
                  ★ {off.rating || "4.5"} / 5
                </span>
              );
            },
          },
          {
            key: `course_duration_${cName}`,
            icon: <ClockCircleOutlined className="text-blue-600" />,
            featureTitle: `Course Duration${suffix}`,
            renderCell: (uni) => {
              const off = findCourseOffering(uni, cName);
              if (!off) return <span className="text-slate-400">-</span>;
              return <span className="font-bold text-slate-700">{off.duration || "2 Years"}</span>;
            },
          },
          {
            key: `course_eligibility_${cName}`,
            icon: <SafetyCertificateOutlined className="text-blue-600" />,
            featureTitle: `Course Eligibility${suffix}`,
            renderCell: (uni) => {
              const off = findCourseOffering(uni, cName);
              if (!off) return <span className="text-slate-400">-</span>;
              return <span className="text-slate-600 font-semibold text-[11px]">{off.eligibility || "Graduation / 10+2"}</span>;
            },
          },
          {
            key: `course_specializations_${cName}`,
            icon: <BookOutlined className="text-purple-600" />,
            featureTitle: `Course Specializations${suffix}`,
            renderCell: (uni) => {
              const off = findCourseOffering(uni, cName);
              if (!off) return <span className="text-slate-400">-</span>;
              const specs = off.specializations || [];
              if (specs.length === 0) return <span className="text-slate-500 font-medium">Standard / General</span>;
              return (
                <div className="flex flex-wrap items-center justify-center gap-1 max-w-[260px] mx-auto">
                  {specs.map((s, sIdx) => (
                    <Tag key={sIdx} color="purple" className="font-bold text-[10px] m-0">
                      {s}
                    </Tag>
                  ))}
                </div>
              );
            },
          }
        );
      });
    } else if (hasOfferingComparison) {
      courseSpecificRows.push(
        {
          key: "course_status",
          icon: <BookOutlined className="text-[#009F93]" />,
          featureTitle: "Course Availability",
          renderCell: (uni) => {
            const off = findCourseOffering(uni);
            return off ? (
              <Tag color="success" className="font-bold text-xs px-2.5 py-0.5 rounded-full m-0">
                Offered
              </Tag>
            ) : (
              <Tag color="default" className="text-slate-400 font-semibold text-xs px-2.5 py-0.5 rounded-full m-0">
                Not Offered
              </Tag>
            );
          },
        },
        {
          key: "course_fees",
          icon: <DollarOutlined className="text-emerald-600" />,
          featureTitle: "Fees per Semester",
          renderCell: (uni) => {
            const off = findCourseOffering(uni);
            if (!off) return <span className="text-slate-400">-</span>;
            return off.fee_per_semester ? (
              <Tag color="success" className="font-extrabold text-xs px-2.5 py-0.5 rounded-full m-0">
                {off.fee_per_semester}
              </Tag>
            ) : (
              <span className="text-slate-400">Contact for Fees</span>
            );
          },
        },
        {
          key: "course_discount",
          icon: <DollarOutlined className="text-orange-500" />,
          featureTitle: "Fees Discount",
          renderCell: (uni) => {
            const off = findCourseOffering(uni);
            if (!off) return <span className="text-slate-400">-</span>;
            return (
              <Tag color="orange" className="font-bold text-[11px] px-2.5 py-0.5 rounded-full m-0">
                {off.fee_discount || "Upto 20%"}
              </Tag>
            );
          },
        },
        {
          key: "course_rating",
          icon: <TrophyOutlined className="text-amber-500" />,
          featureTitle: "Course Rating",
          renderCell: (uni) => {
            const off = findCourseOffering(uni);
            if (!off) return <span className="text-slate-400">-</span>;
            return (
              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-xs">
                ★ {off.rating || "4.5"} / 5
              </span>
            );
          },
        },
        {
          key: "course_duration",
          icon: <ClockCircleOutlined className="text-blue-600" />,
          featureTitle: "Course Duration",
          renderCell: (uni) => {
            const off = findCourseOffering(uni);
            if (!off) return <span className="text-slate-400">-</span>;
            return <span className="font-bold text-slate-700">{off.duration || "2 Years"}</span>;
          },
        },
        {
          key: "course_eligibility",
          icon: <SafetyCertificateOutlined className="text-blue-600" />,
          featureTitle: "Course Eligibility",
          renderCell: (uni) => {
            const off = findCourseOffering(uni);
            if (!off) return <span className="text-slate-400">-</span>;
            return <span className="text-slate-600 font-semibold text-[11px]">{off.eligibility || "Graduation / 10+2"}</span>;
          },
        },
        {
          key: "course_specializations",
          icon: <BookOutlined className="text-purple-600" />,
          featureTitle: "Course Specializations",
          renderCell: (uni) => {
            const off = findCourseOffering(uni);
            if (!off) return <span className="text-slate-400">-</span>;
            const specs = off.specializations || [];
            if (specs.length === 0) return <span className="text-slate-500 font-medium">Standard / General</span>;
            return (
              <div className="flex flex-wrap items-center justify-center gap-1 max-w-[260px] mx-auto">
                {specs.map((s, sIdx) => (
                  <Tag key={sIdx} color="purple" className="font-bold text-[10px] m-0">
                    {s}
                  </Tag>
                ))}
              </div>
            );
          },
        }
      );
    }

    const universityRows = [
      // 2) University Ownership Type
      {
        key: "ownership_type",
        icon: <BankOutlined className="text-blue-600" />,
        featureTitle: "Ownership Type",
        renderCell: (uni) =>
          uni.institution_type ? (
            <Tag className="bg-blue-50 border-blue-200 text-blue-800 font-bold px-2.5 py-0.5 rounded-full m-0">
              {uni.institution_type}
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 3) University Location
      {
        key: "location",
        icon: <GlobalOutlined className="text-blue-600" />,
        featureTitle: "University Location",
        renderCell: (uni) => <span className="text-slate-600 font-semibold">{uni.location || "-"}</span>,
      },

      // 4) Year of Establishment
      {
        key: "established_year",
        icon: <ClockCircleOutlined className="text-blue-600" />,
        featureTitle: "Year of Establishment",
        renderCell: (uni) => <span className="font-bold text-slate-700">{uni.established_year || "-"}</span>,
      },

      // 5) Overall University Rating
      {
        key: "rating",
        icon: <TrophyOutlined className="text-amber-500" />,
        featureTitle: "Overall University Rating",
        renderCell: (uni) =>
          typeof uni.rating === "number" && uni.rating > 0 ? (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-xs">
              ★ {uni.rating} / 5
            </span>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 6) NIRF Ranking
      {
        key: "nirf_rank",
        icon: <TrophyOutlined className="text-purple-600" />,
        featureTitle: "NIRF Ranking",
        renderCell: (uni) =>
          uni.nirf_rank ? (
            <Tag color="purple" className="font-bold text-[11px] px-2.5 py-0.5 rounded-full m-0">
              {uni.nirf_rank}
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 7) Average Placement Package
      {
        key: "avg_placement_package",
        icon: <DollarOutlined className="text-emerald-600" />,
        featureTitle: "Average Placement Package",
        renderCell: (uni) =>
          uni.avg_placement_package ? (
            <Tag color="success" className="font-extrabold text-[11px] px-2.5 py-0.5 rounded-full m-0">
              {uni.avg_placement_package}
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 8) Placement Assistance
      {
        key: "placement_assistance",
        icon: <TrophyOutlined className="text-blue-600" />,
        featureTitle: "Placement Assistance",
        renderCell: (uni) =>
          uni.placement_assistance === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.placement_assistance === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 9) EMI Facility
      {
        key: "emi_available",
        icon: <CreditCardOutlined className="text-blue-600" />,
        featureTitle: "EMI Facility",
        renderCell: (uni) =>
          uni.emi_available === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.emi_available === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 10) Scholarship Opportunities
      {
        key: "scholarship_available",
        icon: <DollarOutlined className="text-blue-600" />,
        featureTitle: "Scholarship Opportunities",
        renderCell: (uni) =>
          uni.scholarship_available === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.scholarship_available === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 11) Mode of Education
      {
        key: "mode",
        icon: <BookOutlined className="text-blue-600" />,
        featureTitle: "Mode of Education",
        renderCell: (uni) => {
          const modeList = Array.isArray(uni.mode) ? uni.mode.join(", ") : uni.mode;
          return <span className="text-slate-700 font-semibold">{modeList || "-"}</span>;
        },
      },

      // 12) Examination Mode
      {
        key: "exam_mode",
        icon: <LaptopOutlined className="text-blue-600" />,
        featureTitle: "Examination Mode",
        renderCell: (uni) => <span className="text-slate-700 font-semibold">{uni.exam_mode || "-"}</span>,
      },

      // 13) Accreditations & Approvals
      {
        key: "approvals",
        icon: <SafetyCertificateOutlined className="text-blue-600" />,
        featureTitle: "Accreditations & Approvals",
        renderCell: (uni) => {
          const approvals = Array.isArray(uni.approvals) ? uni.approvals : [];
          const naac = uni.naac_rating || uni.naac;
          const nirf = uni.nirf_rank || uni.nirf;
          const naacLogo = uni.naac_rating_logo;
          const nirfLogo = uni.nirf_rank_logo;

          if (approvals.length === 0 && !naac && !nirf && !naacLogo && !nirfLogo) {
            return <span className="text-slate-400">-</span>;
          }

          return (
            <div className="flex flex-wrap items-center justify-center gap-1.5 w-full py-1">
              {/* NAAC Rating Logo or Badge */}
              {naacLogo ? (
                <div
                  title={`NAAC ${typeof naac === "object" ? naac.grade || naac.name : naac || "Rating"}`}
                  className="relative w-12 h-7 sm:w-16 sm:h-9 bg-white rounded-lg border border-slate-200 flex items-center justify-center hover:border-blue-400 transition-all duration-200 hover:scale-105 overflow-hidden p-0.5 shrink-0 shadow-2xs"
                >
                  <Image
                    src={getAssetPath(naacLogo)}
                    alt="NAAC"
                    fill
                    unoptimized
                    className="object-contain p-0.5"
                  />
                </div>
              ) : naac ? (
                <Tag color="gold" className="font-bold text-[10px] m-0">
                  NAAC {typeof naac === "object" ? naac.grade || naac.name : naac}
                </Tag>
              ) : null}

              {/* NIRF Ranking Logo or Badge */}
              {nirfLogo ? (
                <div
                  title={`NIRF ${typeof nirf === "object" ? nirf.rank || nirf.name : nirf || "Ranking"}`}
                  className="relative w-12 h-7 sm:w-16 sm:h-9 bg-white rounded-lg border border-slate-200 flex items-center justify-center hover:border-blue-400 transition-all duration-200 hover:scale-105 overflow-hidden p-0.5 shrink-0 shadow-2xs"
                >
                  <Image
                    src={getAssetPath(nirfLogo)}
                    alt="NIRF"
                    fill
                    unoptimized
                    className="object-contain p-0.5"
                  />
                </div>
              ) : nirf ? (
                <Tag color="blue" className="font-bold text-[10px] m-0">
                  NIRF {typeof nirf === "object" ? nirf.rank || nirf.name : nirf}
                </Tag>
              ) : null}

              {/* Approval Logos (AICTE, UGC, AIU, DEB, etc.) */}
              {approvals.map((a, i) => {
                const aName = typeof a === "object" ? a.name || a.code || a.title : a;
                const rawLogo = typeof a === "object" ? a.logo : null;
                const logoUrl = rawLogo ? getAssetPath(rawLogo) : null;

                if (logoUrl) {
                  return (
                    <div
                      key={i}
                      title={aName}
                      className="relative w-12 h-7 sm:w-16 sm:h-9 bg-white rounded-lg border border-slate-200 flex items-center justify-center hover:border-blue-400 transition-all duration-200 hover:scale-105 overflow-hidden p-0.5 shrink-0 shadow-2xs"
                    >
                      <Image
                        src={logoUrl}
                        alt={aName}
                        fill
                        unoptimized
                        className="object-contain p-0.5"
                      />
                    </div>
                  );
                }

                return (
                  <Tag
                    key={i}
                    color="blue"
                    className="font-bold text-[10px] m-0"
                  >
                    {aName}
                  </Tag>
                );
              })}
            </div>
          );
        },
      },

      // 14) Key University Highlights
      {
        key: "highlights",
        icon: <CheckCircleFilled className="text-emerald-600" />,
        featureTitle: "Key University Highlights",
        renderCell: (uni) => {
          const highlights = Array.isArray(uni.highlights) ? uni.highlights : [];
          if (highlights.length === 0) return <span className="text-slate-400">-</span>;

          return (
            <ul className="space-y-1.5 m-0 p-0 list-none text-[11px] text-slate-600 inline-block text-left max-w-[280px]">
              {highlights.map((item, hIdx) => (
                <li key={hIdx} className="flex items-start gap-1.5">
                  <CheckOutlined className="text-emerald-500 text-[10px] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        },
      },

      // 15) Courses offered
      {
        key: "coursesOffered",
        icon: <BookOutlined className="text-blue-600" />,
        featureTitle: "Courses offered",
        renderCell: (uni) => {
          const courses = Array.isArray(uni.coursesOffered) ? uni.coursesOffered : [];
          if (courses.length === 0) return <span className="text-slate-400">-</span>;

          return (
            <div className="flex flex-wrap items-center justify-center gap-1 max-w-[260px] mx-auto">
              {courses.map((cName, cIdx) => (
                <Tag key={cIdx} color="purple" className="font-bold text-[10px] m-0">
                  {cName}
                </Tag>
              ))}
            </div>
          );
        },
      },

      // 16) Learning Platform - LMS
      {
        key: "lms_available",
        icon: <LaptopOutlined className="text-blue-600" />,
        featureTitle: "Learning Platform - LMS",
        renderCell: (uni) =>
          uni.lms_available === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.lms_available === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 17) Live Classes Available
      {
        key: "live_classes",
        icon: <VideoCameraOutlined className="text-blue-600" />,
        featureTitle: "Live Classes Available",
        renderCell: (uni) =>
          uni.live_classes === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.live_classes === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 18) Study Material
      {
        key: "study_material",
        icon: <BookOutlined className="text-blue-600" />,
        featureTitle: "Study Material",
        renderCell: (uni) => {
          let matStr = uni.study_material || "-";
          if (matStr === "Both") matStr = "Both Digital and Printed";
          return <span className="text-slate-700 font-semibold">{matStr}</span>;
        },
      },

      // 19) Recorded Lectures
      {
        key: "recorded_lectures",
        icon: <VideoCameraOutlined className="text-purple-600" />,
        featureTitle: "Recorded Lectures",
        renderCell: (uni) =>
          uni.recorded_lectures === true ? (
            <Tag color="success" className="font-bold text-[10px] m-0">
              Yes
            </Tag>
          ) : uni.recorded_lectures === false ? (
            <Tag color="error" className="font-bold text-[10px] m-0">
              No
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 20) Alumni Network
      {
        key: "alumni_network",
        icon: <TeamOutlined className="text-blue-600" />,
        featureTitle: "Alumni Network",
        renderCell: (uni) => <span className="font-bold text-slate-700">{uni.alumni_network || "-"}</span>,
      },

      // 21) Student Ratings & Reviews
      {
        key: "student_reviews",
        icon: <TeamOutlined className="text-blue-600" />,
        featureTitle: "Student Ratings & Reviews",
        renderCell: (uni) =>
          uni.student_reviews ? (
            <Tag color="cyan" className="font-bold text-[11px] px-2.5 py-0.5 rounded-full m-0">
              {uni.student_reviews}
            </Tag>
          ) : (
            <span className="text-slate-400">-</span>
          ),
      },

      // 22) Placement Partners
      {
        key: "placement_partners",
        icon: <TeamOutlined className="text-emerald-600" />,
        featureTitle: "Placement Partners",
        renderCell: (uni) => {
          const partners = Array.isArray(uni.placement_partners) ? uni.placement_partners : [];
          if (partners.length === 0) return <span className="text-slate-400">-</span>;

          return (
            <div className="flex flex-wrap items-center justify-center gap-1 max-w-[280px] mx-auto">
              {partners.map((p, pIdx) => (
                <Tag key={pIdx} color="geekblue" className="font-bold text-[10px] m-0">
                  {typeof p === "object" ? p.name || p.title : p}
                </Tag>
              ))}
            </div>
          );
        },
      },

      // Actions Row
      {
        key: "actions",
        icon: <CheckCircleFilled className="text-blue-600" />,
        featureTitle: "Actions & Next Steps",
        renderCell: (uni) => (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 w-full max-w-[240px] mx-auto px-1">
            <Button
              type="primary"
              onClick={() => {
                openFormModal({
                  title: `Apply Now - ${uni.name}`,
                  subtitle: "Fill your details to get free expert 1:1 counseling",
                  defaultCourse: selectedCourses.length > 0 ? selectedCourses.join(", ") : uni.name,
                });
              }}
              className="bg-[#009F93] hover:bg-[#008278] border-none font-bold text-[11px] sm:text-xs rounded-xl h-7 sm:h-8 px-2.5 w-full sm:w-auto cursor-pointer"
            >
              Apply Now
            </Button>

            {uni.slug && (
              <Link href={`/universities/${uni.slug}`} className="w-full sm:w-auto">
                <Button className="bg-[#1C3569] text-white hover:bg-[#122449] border-none font-bold text-[11px] sm:text-xs rounded-xl h-7 sm:h-8 px-2.5 w-full cursor-pointer">
                  View Details
                </Button>
              </Link>
            )}
          </div>
        ),
      },
    ];

    return [...courseSpecificRows, ...universityRows];
  }, [comparedData, selectedCourses, openFormModal]);

  return (
    <div className="bg-[#f4f7f9] min-h-screen font-sans text-slate-800">
      {/* ── HERO SECTION WITH DEGREE4U MARQUEE (Selected universities disappear from here, reappear on remove) ── */}
      <div id="marquee-hero-section" className="bg-gradient-to-r from-[#1155cc] via-[#1b6ef3] to-[#1a8fff] pt-8 pb-36 md:pb-44 overflow-hidden relative">
        {/* Row 1: Right → Left */}
        <div
          className="overflow-hidden w-full relative py-2"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div className="marquee-ltr flex items-center gap-4">
            {marqueeRow1.map((uni, idx) => (
              <div
                key={`row1-${uni._id || uni.slug || idx}-${idx}`}
                data-uni-id={String(uni._id || uni.slug)}
                onClick={(e) => handleLogoClick(uni, e)}
                className="flex items-center justify-center bg-white rounded-xl border border-white/80 p-3 h-16 min-w-[170px] max-w-[220px] shrink-0 cursor-pointer transition-all hover:-translate-y-0.5 hover:border-blue-300"
                title={`${uni.name} (Click to add to comparison)`}
              >
                {uni.logo ? (
                  <div className="relative w-36 h-12">
                    <Image
                      src={getAssetPath(uni.logo)}
                      alt={uni.name || "University Logo"}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="font-bold text-xs text-[#1C3569] text-center line-clamp-1">
                    {uni.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Left → Right */}
        <div
          className="overflow-hidden w-full relative py-2 mt-2"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div className="marquee-rtl flex items-center gap-4">
            {marqueeRow2.map((uni, idx) => (
              <div
                key={`row2-${uni._id || uni.slug || idx}-${idx}`}
                data-uni-id={String(uni._id || uni.slug)}
                onClick={(e) => handleLogoClick(uni, e)}
                className="flex items-center justify-center bg-white rounded-xl border border-white/80 p-3 h-16 min-w-[170px] max-w-[220px] shrink-0 cursor-pointer transition-all hover:-translate-y-0.5 hover:border-blue-300"
                title={`${uni.name} (Click to add to comparison)`}
              >
                {uni.logo ? (
                  <div className="relative w-36 h-12">
                    <Image
                      src={getAssetPath(uni.logo)}
                      alt={uni.name || "University Logo"}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="font-bold text-xs text-[#1C3569] text-center line-clamp-1">
                    {uni.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN SELECTOR CARD (OVERLAYS HERO) ── */}
      <div className="-mt-28 md:-mt-32 max-w-5xl mx-auto px-4 relative z-20 mb-10">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0b5edd] m-0 mb-6">
            Compare Universities <span className="text-slate-800 font-bold">&amp; Choose Best Fit For you</span>
          </h1>

          {/* Course Controls Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Select
              mode="multiple"
              maxTagCount="responsive"
              showSearch
              allowClear
              value={selectedCourses}
              onChange={(vals) => setSelectedCourses(vals || [])}
              placeholder="Select Course to Compare (e.g. MBA, BBA, MCA)"
              className="w-full sm:w-80 text-left font-medium"
              options={courseSelectOptions.filter((opt) => opt.value !== "all")}
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
            />

            <Select
              value={selectedMode}
              onChange={setSelectedMode}
              className="w-full sm:w-56 text-left font-medium"
              options={modeSelectOptions}
            />
          </div>

          {/* University Slots Grid (3 slots with In-Slot Select Dropdown + Logos) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            {[0, 1, 2].map((slotIdx) => {
              const currentSlots = (compareList && compareList.length > 0) ? compareList : comparedData;
              const uni = currentSlots[slotIdx];
              if (uni) {
                const isOffering = uni.isCourseOffering || uni.type === "course_offering";
                const displayTitle = isOffering ? uni.title : uni.name;
                const displaySubTitle = isOffering ? (uni.uniName || uni.name) : null;
                const rawLogo =
                  (typeof uni.logoSrc === "object" ? uni.logoSrc?.url : uni.logoSrc) ||
                  (typeof uni.logo === "object" ? uni.logo?.url : uni.logo) ||
                  uni.logoUrl ||
                  null;
                const locStr =
                  uni.location ||
                  [uni.city?.name || uni.city, uni.state?.name || uni.state].filter(Boolean).join(", ");
                return (
                  <div
                    key={slotIdx}
                    id={`uni-slot-${slotIdx}`}
                    className="bg-white rounded-2xl border-2 border-blue-500 p-4 flex flex-col items-center justify-center relative min-h-35 group transition-all slot-dock-enter"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCompare(uni.slug || uni._id || uni.id);
                        setComparedData((prev) =>
                          prev.filter(
                            (u) =>
                              String(u._id || u.slug || "").toLowerCase() !==
                              String(uni._id || uni.slug || uni.id || "").toLowerCase()
                          )
                        );
                      }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-100 hover:bg-red-500 text-slate-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10"
                      title="Remove university"
                    >
                      <CloseOutlined className="text-[10px]" />
                    </button>

                    <div className="relative w-14 h-14 rounded-xl border border-slate-100 bg-white p-1.5 flex items-center justify-center mb-2 overflow-hidden">
                      {rawLogo ? (
                        <Image
                          src={getAssetPath(rawLogo)}
                          alt={displayTitle || "Logo"}
                          fill
                          unoptimized
                          className="object-contain p-1"
                        />
                      ) : (
                        <span className="text-lg font-black text-[#1C3569]">
                          {displayTitle ? displayTitle.charAt(0) : "U"}
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-[#1C3569] m-0 line-clamp-1">
                      {displayTitle}
                    </h4>
                    {displaySubTitle && (
                      <p className="text-[10px] font-semibold text-teal-700 m-0 line-clamp-1">
                        {displaySubTitle}
                      </p>
                    )}
                    {locStr && (
                      <span className="text-[9px] bg-slate-100 text-slate-500 font-semibold px-2 py-0.5 rounded-full mt-1.5 line-clamp-1">
                        {locStr}
                      </span>
                    )}
                  </div>
                );
              }

              return (
                <div
                  key={slotIdx}
                  id={`uni-slot-${slotIdx}`}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-center text-slate-400 bg-slate-50/60 transition-all min-h-[140px] gap-2"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base">
                    +
                  </div>
                  <Select
                    showSearch
                    placeholder="+ Select University"
                    value={null}
                    onChange={(val, option) => {
                      if (option?.itemObj) {
                        triggerFlyAnimation(option.itemObj, null, slotIdx);
                      }
                    }}
                    className="w-full max-w-52.5 text-left font-semibold"
                    options={universitySelectOptions}
                    optionFilterProp="searchValue"
                    filterOption={(input, option) =>
                      (option?.searchValue ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    styles={{
                      popup: {
                        root: {
                          maxHeight: 340,
                          overflowY: "auto",
                          borderRadius: 16,
                          padding: 4,
                        },
                      },
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <Button
              type="primary"
              disabled={currentIdentifiers.length === 0 || loading}
              loading={loading}
              onClick={handleCompareNow}
              className="bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer border-none h-10 px-5"
            >
              Compare Now
              <ArrowLeftOutlined className="rotate-180 text-xs" />
            </Button>

            {(currentIdentifiers.length > 0 || comparedData.length > 0) && (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  clearCompare();
                  setComparedData([]);
                }}
                className="font-bold rounded-xl cursor-pointer h-10 px-4"
              >
                Clear All ({currentIdentifiers.length || comparedData.length})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── COMPARISON MATRIX SECTION (Real 22 Features Table Layout) ── */}
      <div id="comparison-matrix-section" className="max-w-[1440px] mx-auto px-3 sm:px-5 md:px-6 py-6 space-y-4">
        {/* Comparison Table / Skeleton */}
        {loading ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-100 flex flex-col gap-4 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <Skeleton.Avatar active size="large" shape="square" style={{ borderRadius: 12 }} />
                    <div className="flex-1">
                      <Skeleton.Input active size="small" style={{ width: "80%", height: 18 }} />
                      <Skeleton.Input active size="small" style={{ width: "50%", height: 14, marginTop: 4 }} />
                    </div>
                  </div>
                  <Skeleton active paragraph={{ rows: 6, width: ["100%", "85%", "90%", "75%", "60%", "70%"] }} />
                  <Skeleton.Button active size="small" style={{ width: "100%", height: 36, borderRadius: 12, marginTop: "auto" }} />
                </div>
              ))}
            </div>
          </div>
        ) : comparedData.length > 0 ? (
          <div>
            {/* ── DESKTOP VIEW (Ant Design Full Matrix Table) ── */}
            <div className="hidden md:block">
              <Table
                columns={tableColumns}
                dataSource={tableDataSource}
                pagination={false}
                bordered
                size="small"
                scroll={{ x: "max-content" }}
                rowKey="key"
                className="comparison-matrix-table w-full"
              />
            </div>

            {/* ── MOBILE VIEW (Exact Degree4u Mobile Sectional UI) ── */}
            <div className="block md:hidden bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
              {/* Sticky / Top University Info Row */}
              <div
                className={`grid ${comparedData.length === 1
                  ? "grid-cols-1"
                  : comparedData.length === 2
                    ? "grid-cols-2"
                    : comparedData.length === 3
                      ? "grid-cols-3"
                      : "grid-cols-4"
                  } divide-x divide-slate-200 bg-white border-b border-slate-200`}
              >
                {comparedData.map((uni, idx) => {
                  const isOffering = uni.isCourseOffering || uni.type === "course_offering";
                  const displayTitle = isOffering ? uni.title : uni.name;
                  const displaySubTitle = isOffering ? (uni.uniName || uni.name) : null;
                  return (
                    <div
                      key={idx}
                      className="p-3 flex flex-col items-center text-center relative group min-h-[120px] justify-between"
                    >
                      <button
                        onClick={() => removeFromCompare(uni.slug || uni._id)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-100 hover:bg-red-500 text-slate-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10"
                        title="Remove"
                      >
                        <CloseOutlined className="text-[8px]" />
                      </button>

                      <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white p-1 flex items-center justify-center relative mb-1 shrink-0">
                        {uni.logo ? (
                          <Image
                            src={getAssetPath(uni.logo)}
                            alt={displayTitle || "Logo"}
                            fill
                            unoptimized
                            className="object-contain p-0.5"
                          />
                        ) : (
                          <span className="text-sm font-black text-[#1C3569]">
                            {displayTitle ? displayTitle.charAt(0) : "U"}
                          </span>
                        )}
                      </div>

                      <h4 className="text-[11px] font-bold text-[#1C3569] m-0 line-clamp-2 leading-tight">
                        {displayTitle}
                      </h4>
                      {displaySubTitle && (
                        <p className="text-[9px] font-semibold text-teal-700 m-0 line-clamp-1 mt-0.5">
                          {displaySubTitle}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Feature Sections (Centered Blue Header Bar + Side-by-Side Values) */}
              <div className="divide-y divide-slate-100">
                {tableDataSource.map((row) => (
                  <div key={row.key} className="w-full">
                    {/* Section Header: Blue bar with centered icon + uppercase title */}
                    <div className="bg-[#f0f5ff] py-2 px-3 text-center border-t border-b border-slate-200/90 flex items-center justify-center gap-1.5 text-blue-600 font-extrabold text-[11px] tracking-wider uppercase">
                      <span className="text-blue-600 shrink-0">{row.icon}</span>
                      <span>{row.featureTitle}</span>
                    </div>

                    {/* Section Values Grid: Side-by-side columns with vertical divider */}
                    <div
                      className={`grid ${comparedData.length === 1
                        ? "grid-cols-1"
                        : comparedData.length === 2
                          ? "grid-cols-2"
                          : comparedData.length === 3
                            ? "grid-cols-3"
                            : "grid-cols-4"
                        } divide-x divide-slate-200 bg-white text-center text-xs font-bold text-slate-800`}
                    >
                      {comparedData.map((uni, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 flex items-center justify-center min-h-[48px] overflow-hidden"
                        >
                          {row.renderCell ? row.renderCell(uni, idx) : "-"}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200/80 flex flex-col items-center justify-center space-y-4">
            <Empty
              description={
                <div className="space-y-1">
                  <p className="text-base font-bold text-slate-700 m-0">No Universities Selected</p>
                  <p className="text-xs text-slate-500 m-0">
                    Click on any university logo in the scrolling banner above or select from the dropdown to start comparing.
                  </p>
                </div>
              }
            />
          </div>
        )}
      </div>

      {/* ── CTA COUNSELING SECTION ── */}
      <div className="max-w-5xl mx-auto my-12 px-4">
        <div className="bg-gradient-to-br from-[#1C3569] via-[#1155cc] to-[#1a8fff] text-white rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold m-0 text-white italic">
              Still Have Confusion?
            </h2>
            <p className="text-sm md:text-base text-blue-100 max-w-xl mx-auto m-0 italic font-medium">
              You Need A Career Expert Who Will Guide You to choose Best fit for you
            </p>
            <div className="pt-4">
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  openFormModal({
                    title: "Book 1:1 Free Counseling",
                    subtitle: "Speak with an academic expert to choose the best university for your career",
                    defaultCourse: selectedCourses.length > 0 ? selectedCourses.join(", ") : "General Counseling",
                  });
                }}
                className="bg-white text-[#0b5edd] hover:bg-slate-100 font-extrabold text-sm md:text-base px-8 h-12 rounded-full border-none cursor-pointer inline-flex items-center gap-2"
              >
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <PhoneOutlined className="rotate-90" />
                </span>
                Book 1:1 Free Counseling
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── FLYING LOGO ANIMATION OVERLAY ── */}
      {flyingLogo && (
        <div
          style={{
            position: "fixed",
            zIndex: 99999,
            pointerEvents: "none",
            top: flyingLogo.isAnimating
              ? flyingLogo.target.top
              : flyingLogo.start.top,
            left: flyingLogo.isAnimating
              ? flyingLogo.target.left
              : flyingLogo.start.left,
            width: flyingLogo.isAnimating
              ? flyingLogo.target.width
              : flyingLogo.start.width,
            height: flyingLogo.isAnimating
              ? flyingLogo.target.height
              : flyingLogo.start.height,
            opacity: flyingLogo.isAnimating ? 1 : 0.95,
            transform: flyingLogo.isAnimating
              ? "scale(1) rotate(0deg)"
              : "scale(1.08) rotate(-3deg)",
            transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="rounded-2xl border-2 border-blue-500 bg-white p-2 flex items-center justify-center shadow-2xl backdrop-blur-md"
        >
          {flyingLogo.logo ? (
            <div className="relative w-full h-full">
              <Image
                src={getAssetPath(flyingLogo.logo)}
                alt={flyingLogo.name || "Flying Logo"}
                fill
                unoptimized
                className="object-contain p-1"
              />
            </div>
          ) : (
            <span className="text-base font-black text-[#1C3569]">
              {flyingLogo.name ? flyingLogo.name.charAt(0) : "U"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f7f9] flex items-center justify-center p-8">
          <Skeleton active paragraph={{ rows: 8 }} />
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  );
}
