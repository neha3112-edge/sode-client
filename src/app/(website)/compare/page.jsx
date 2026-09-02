"use client";

import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Select, Tag, Empty, Skeleton, Table, Modal } from "antd";
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
  RightOutlined,
} from "@ant-design/icons";

import { useCompare } from "@/hooks/useCompare";
import { useFormModal as useAppDrawer } from "@/hooks/useFormModal";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";

function CompareContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    addToCompare,
  } = useCompare();
  const { openFormModal } = useAppDrawer();

  const [allUniversities, setAllUniversities] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allModes, setAllModes] = useState([]);
  const [comparedData, setComparedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [baseUniversityObj, setBaseUniversityObj] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedMode, setSelectedMode] = useState("all");
  const [flyingLogo, setFlyingLogo] = useState(null);

  // 1. Fetch all universities, courses, and modes for dropdown selectors
  useEffect(() => {
    let isMounted = true;

    request.dynamicOptions({ entity: "universities", endPoint: "v1/options" })
      .then((res) => {
        if (!isMounted) return;
        const uList = Array.isArray(res?.result) ? res.result : Array.isArray(res) ? res : [];
        setAllUniversities(uList);
      })
      .catch((err) => console.error("Error fetching university options:", err));

    request.dynamicOptions({ entity: "courses", endPoint: "v1/options" })
      .then((res) => {
        if (!isMounted) return;
        const cList = Array.isArray(res?.result) ? res.result : Array.isArray(res) ? res : [];
        setAllCourses(cList);
      })
      .catch((err) => console.error("Error fetching course options:", err));

    request.dynamicOptions({ entity: "modeinfo", endPoint: "v1/options" })
      .then((res) => {
        if (!isMounted) return;
        const mList = Array.isArray(res?.result) ? res.result : Array.isArray(res) ? res : [];
        setAllModes(mList);
      })
      .catch((err) => console.error("Error fetching mode options:", err));

    // Fetch dynamic categories configured with showOnCompare in CRM
    request.dynamicList({ entity: "category", endPoint: "v1/list" })
      .then((res) => {
        if (!isMounted) return;
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res?.result) ? res.result : [];
        const compareCats = list.filter((c) => c.showOnCompare);
        if (compareCats.length > 0) {
          setDbCompareCategories(compareCats);
        }
      })
      .catch((err) => console.log("Category list fetch:", err));

    // Fetch all states for State Wise selection
    request.dynamicOptions({ entity: "states", endPoint: "v1/options" })
      .then((res) => {
        if (!isMounted) return;
        const sList = Array.isArray(res?.result) ? res.result : Array.isArray(res) ? res : [];
        if (sList.length > 0) {
          setAllStates(sList);
        }
      })
      .catch((err) => console.log("States options fetch:", err));

    // Fetch dynamic approvals / accreditations
    request.dynamicOptions({ entity: "approvals", endPoint: "v1/options" })
      .then((res) => {
        if (!isMounted) return;
        const aList = Array.isArray(res?.result) ? res.result : Array.isArray(res) ? res : [];
        if (aList.length > 0) setAllApprovals(aList);
      })
      .catch((err) => console.log("Approvals options fetch:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  const [dbCompareCategories, setDbCompareCategories] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allApprovals, setAllApprovals] = useState([]);
  const [isTrendingModalOpen, setIsTrendingModalOpen] = useState(false);
  const [isRecommendedModalOpen, setIsRecommendedModalOpen] = useState(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [isAccreditationModalOpen, setIsAccreditationModalOpen] = useState(false);
  const [isAllUniversitiesModalOpen, setIsAllUniversitiesModalOpen] = useState(false);
  const [selectedStateObj, setSelectedStateObj] = useState(null);
  const [selectedAccreditationObj, setSelectedAccreditationObj] = useState(null);
  const [allUnisSearchText, setAllUnisSearchText] = useState("");

  // All Universities with showInModal !== false (filtered by search if any)
  const modalUniversitiesList = useMemo(() => {
    const valid = (allUniversities || []).filter((u) => u.showInModal !== false && u.removed !== true);
    if (!allUnisSearchText.trim()) return valid;
    const q = allUnisSearchText.toLowerCase().trim();
    return valid.filter((u) => {
      const name = (u.name || "").toLowerCase();
      const code = (u.code || "").toLowerCase();
      const city = (u.city?.name || u.city || "").toString().toLowerCase();
      const state = (u.state?.name || u.state || "").toString().toLowerCase();
      return name.includes(q) || code.includes(q) || city.includes(q) || state.includes(q);
    });
  }, [allUniversities, allUnisSearchText]);

  // Universities of the selected state inside State Modal
  const stateUniversitiesList = useMemo(() => {
    if (!selectedStateObj) return [];
    const stId = (selectedStateObj._id || "").toString();
    const stName = (selectedStateObj.name || "").toString().toLowerCase().trim();
    const stCode = (selectedStateObj.code || "").toString().toLowerCase().trim();

    return (allUniversities || []).filter((u) => {
      if (u.removed === true || u.showInModal === false) return false;
      const uStateId = (u.state?._id || (typeof u.state === "string" ? u.state : "")).toString();
      const uStateName = (u.state?.name || (typeof u.state === "string" ? u.state : "")).toString().toLowerCase().trim();
      const uStateCode = (u.state?.code || "").toString().toLowerCase().trim();

      return (
        (stId && uStateId === stId) ||
        (stName && (uStateName === stName || uStateName.includes(stName))) ||
        (stCode && (uStateCode === stCode || uStateName.includes(stCode)))
      );
    });
  }, [selectedStateObj, allUniversities]);

  // Universities of the selected accreditation inside Accreditation Modal
  const accreditationUniversitiesList = useMemo(() => {
    if (!selectedAccreditationObj) return [];
    const q = (selectedAccreditationObj.code || selectedAccreditationObj.name || "").toString().toLowerCase().trim();
    const accId = (selectedAccreditationObj._id || selectedAccreditationObj.id || "").toString();

    return (allUniversities || []).filter((u) => {
      if (u.removed === true || u.showInModal === false) return false;

      // 1. Check approvals array (by ID, code, or name)
      const approvals = Array.isArray(u.approvals) ? u.approvals : [];
      const hasApproval = approvals.some((a) => {
        if (!a) return false;
        if (typeof a === "object") {
          const aId = (a._id || a.id || "").toString();
          const aCode = (a.code || "").toString().toLowerCase().trim();
          const aName = (a.name || a.title || "").toString().toLowerCase().trim();
          return (accId && aId === accId) || (q && (aCode.includes(q) || aName.includes(q) || q.includes(aCode)));
        }
        const str = String(a).toLowerCase().trim();
        return (accId && str === accId) || (q && str.includes(q));
      });

      // 2. Check NAAC rating if approval is NAAC
      const naac = (u.naac_rating?.grade || u.naac_rating?.name || "").toString().toLowerCase();
      const isNaacMatch = q.includes("naac") && Boolean(naac && naac !== "na" && naac !== "none");

      // 3. Check NIRF rank if approval is NIRF
      const nirf = (u.nirf_rank?.rank || u.nirf_rank?.name || "").toString().toLowerCase();
      const isNirfMatch = q.includes("nirf") && Boolean(nirf && nirf !== "na" && nirf !== "none");

      return hasApproval || isNaacMatch || isNirfMatch;
    });
  }, [selectedAccreditationObj, allUniversities]);

  // 1. Dynamic Trending Universities List from DB
  const trendingUniversitiesList = useMemo(() => {
    const list = (allUniversities || []).filter((u) => {
      const uCats = Array.isArray(u.category) ? u.category : [u.category].filter(Boolean);
      const isTrendingCat = uCats.some((c) => {
        const cSlug = typeof c === "object" ? c?.slug || "" : c.toString();
        const cName = typeof c === "object" ? c?.name || "" : "";
        return cSlug.includes("trending") || cName.toLowerCase().includes("trending");
      });
      return isTrendingCat || u.isTrending || u.isTop || u.isPopular;
    });
    return list.length > 0 ? list : (allUniversities || []).slice(0, 16);
  }, [allUniversities]);

  // 2. Dynamic Recommended Universities List from DB
  const recommendedUniversitiesList = useMemo(() => {
    const list = (allUniversities || []).filter((u) => {
      const uCats = Array.isArray(u.category) ? u.category : [u.category].filter(Boolean);
      const isRecCat = uCats.some((c) => {
        const cSlug = typeof c === "object" ? c?.slug || "" : c.toString();
        const cName = typeof c === "object" ? c?.name || "" : "";
        return cSlug.includes("recommend") || cName.toLowerCase().includes("recommend");
      });
      return isRecCat || u.isFeatured || u.isRecommended;
    });
    return list.length > 0 ? list : (allUniversities || []).slice(3, 19);
  }, [allUniversities]);

  // 3. Dynamic Accreditation & Approvals List from DB (Strictly the 6 target items)
  const dynamicAccreditationList = useMemo(() => {
    const targetCatId = "6a8c7bb3ff17d3e593bd59fe";
    const allowedCodes = ["WES", "AICTE", "NAAC", "UGC", "NIRF", "AACSB"];

    const filtered = (allApprovals || []).filter((a) => {
      const catId = typeof a.category === "object" ? a.category?._id || a.category?.id : a.category;
      const catSlug = typeof a.category === "object" ? a.category?.slug || "" : "";
      const isTargetCat = (catId && catId.toString() === targetCatId) || catSlug.includes("accredit");
      const isAllowedCode = allowedCodes.some((code) => {
        const aCode = (a.code || "").toUpperCase();
        const aName = (a.name || "").toUpperCase();
        return aCode === code || aName.startsWith(code) || aName.includes(code);
      });
      return isTargetCat || isAllowedCode;
    });

    const orderMap = { WES: 0, AICTE: 1, NAAC: 2, UGC: 3, NIRF: 4, AACSB: 5 };
    const sorted = [...filtered].sort((a, b) => {
      const getRank = (item) => {
        const code = (item.code || "").toUpperCase();
        const name = (item.name || "").toUpperCase();
        for (const [k, v] of Object.entries(orderMap)) {
          if (code === k || name.includes(k)) return v;
        }
        return 99;
      };
      return getRank(a) - getRank(b);
    });

    return sorted.slice(0, 6);
  }, [allApprovals]);

  // Helper to check if a university is already added to comparison
  const isUniAdded = (uni) => {
    if (!uni) return false;
    const targetKeys = [uni._id, uni.id, uni.slug, uni.name]
      .filter(Boolean)
      .map((k) => String(k).toLowerCase().trim());
    const pool = [...(compareList || []), ...(comparedData || [])];
    return pool.some((u) => {
      const uKeys = [u._id, u.id, u.slug, u.name]
        .filter(Boolean)
        .map((k) => String(k).toLowerCase().trim());
      return targetKeys.some((tk) => uKeys.includes(tk));
    });
  };

  // Handle toggle add/remove university from modal
  const handleToggleUniversityFromModal = (uni) => {
    if (isUniAdded(uni)) {
      handleRemoveUniversity(uni.slug || uni._id || uni.id);
    } else {
      addToCompare(uni);
    }
  };

  // Compute states with university counts and clean human-readable names
  const computedStatesList = useMemo(() => {
    const stateMap = new Map();
    const idToStateMap = new Map();

    // 1. Build lookup from database states
    (allStates || []).forEach((s) => {
      const id = (s._id || s.value || "").toString();
      const rawName = (s.name || s.label || s.title || "").toString().trim();
      const isHex = /^[0-9a-fA-F]{24}$/.test(rawName);
      const cleanName = isHex ? "" : rawName;

      if (id && cleanName) {
        idToStateMap.set(id, { _id: id, name: cleanName, code: s.code || "", logo: s.logo });
        stateMap.set(cleanName.toLowerCase(), {
          _id: id,
          name: cleanName,
          code: s.code || "",
          logo: s.logo,
          count: 0,
        });
      }
    });

    // 2. Count universities per state using ID lookup and clean name mapping
    (allUniversities || []).forEach((u) => {
      let stateName = "";
      let stateId = "";
      let stateCode = "";

      if (u.state && typeof u.state === "object") {
        stateName = u.state.name || "";
        stateId = u.state._id || "";
        stateCode = u.state.code || "";
      } else if (typeof u.state === "string") {
        if (/^[0-9a-fA-F]{24}$/.test(u.state)) {
          const matched = idToStateMap.get(u.state);
          if (matched) {
            stateName = matched.name;
            stateId = matched._id;
            stateCode = matched.code;
          }
        } else {
          stateName = u.state;
        }
      }

      if (!stateName && u.billing_address?.state) {
        stateName = u.billing_address.state;
      }

      // Ignore raw 24-char hex ObjectIDs
      if (/^[0-9a-fA-F]{24}$/.test(stateName)) {
        stateName = "";
      }

      if (stateName && stateName.trim().length > 1) {
        const key = stateName.toLowerCase().trim();
        if (!stateMap.has(key)) {
          stateMap.set(key, {
            _id: stateId || key,
            name: stateName.trim(),
            code: stateCode || "",
            count: 0,
          });
        }
        stateMap.get(key).count += 1;
      }
    });

    const list = Array.from(stateMap.values());
    return list.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [allStates, allUniversities]);

  // Determine which identifiers to compare (prioritizing clean readable slugs)
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
      const res = await request.dynamicRead({
        entity: "universities",
        endPoint: "v1/compare",
        options: { universityid: currentIdentifiers.join(",") },
      });
      const data = Array.isArray(res?.result) ? res.result : Array.isArray(res) ? res : [];
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
    request.dynamicRead({
      entity: "universities",
      endPoint: "v1/compare",
      options: { universityid: ids.join(",") },
    })
      .then((res) => {
        const data = Array.isArray(res?.result) ? res.result : Array.isArray(res) ? res : [];
        setComparedData(data);
      })
      .catch((err) => console.error("❌ Failed to load comparison data on mount:", err))
      .finally(() => setLoading(false));
  }, [searchParams]);

  // Remove single university and synchronize URL cleanly
  const handleRemoveUniversity = (identifier) => {
    if (!identifier) return;
    const targetKey = String(identifier).toLowerCase().trim();
    removeFromCompare(identifier);
    setComparedData((prev) =>
      prev.filter((u) => {
        const keys = [u._id, u.id, u.slug, u.name].filter(Boolean);
        return !keys.some((k) => String(k).toLowerCase().trim() === targetKey);
      })
    );

    const remainingItems = (compareList || []).filter((item) => {
      const keys = [item._id, item.id, item.slug, item.name].filter(Boolean);
      return !keys.some((k) => String(k).toLowerCase().trim() === targetKey);
    });

    const remainingSlugs = remainingItems.map((u) => u.slug || u._id || u.id).filter(Boolean);

    if (typeof window !== "undefined") {
      const newParams = new URLSearchParams(window.location.search);
      if (remainingSlugs.length > 0) {
        newParams.set("universityid", remainingSlugs.join(","));
        const newQuery = newParams.toString();
        router.replace(`?${newQuery}`, { scroll: false });
      } else {
        newParams.delete("universityid");
        newParams.delete("ids");
        newParams.delete("universities");
        const newQuery = newParams.toString();
        router.replace(newQuery ? `?${newQuery}` : "/compare", { scroll: false });
      }
    }
  };

  // Clear all universities from slots, table, recommendations, and URL
  const handleClearAll = () => {
    clearCompare();
    setComparedData([]);
    setBaseUniversityObj(null);

    if (typeof window !== "undefined") {
      const newParams = new URLSearchParams(window.location.search);
      newParams.delete("universityid");
      newParams.delete("ids");
      newParams.delete("universities");
      const newQuery = newParams.toString();
      router.replace(newQuery ? `?${newQuery}` : "/compare", { scroll: false });
    }
  };

  // Determine Primary / Base University for modal labels
  const activeBaseUniversity = useMemo(() => {
    if (compareList && compareList.length > 0) return compareList[0];
    if (comparedData && comparedData.length > 0) return comparedData[0];
    return null;
  }, [compareList, comparedData]);

  // Available universities (excluding currently selected ones & filtered by selectedCourses & selectedMode)
  const availableUniversities = useMemo(() => {
    const selectedKeys = new Set([
      ...(compareList || []).map((u) => String(u._id || u.id || u.slug || "").toLowerCase()),
      ...(comparedData || []).map((u) => String(u._id || u.slug || "").toLowerCase()),
    ]);

    // 1. Determine allowed university IDs from selectedCourses
    let allowedUniversityIds = null;
    if (selectedCourses && selectedCourses.length > 0) {
      const activeCoursesLower = selectedCourses
        .filter((c) => c && c !== "all")
        .map((c) => String(c).toLowerCase().trim());

      if (activeCoursesLower.length > 0) {
        const idSet = new Set();
        (allCourses || []).forEach((c) => {
          const cName = String(c.name || c.title || "").toLowerCase().trim();
          if (
            activeCoursesLower.includes(cName) ||
            activeCoursesLower.some((sel) => cName.includes(sel) || sel.includes(cName))
          ) {
            (c.universityIds || []).forEach((uId) => idSet.add(String(uId)));
          }
        });
        allowedUniversityIds = idSet;
      }
    }

    return (allUniversities || []).filter((u) => {
      const isSelected = selectedKeys.has(String(u._id || u.slug || "").toLowerCase());
      if (isSelected) return false;

      // Filter by Course if a course is actively selected
      if (allowedUniversityIds && allowedUniversityIds.size > 0) {
        const uId = String(u._id || u.id || "");
        if (!allowedUniversityIds.has(uId)) {
          return false;
        }
      }

      // Filter by Mode if selected
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
  }, [allUniversities, allCourses, compareList, comparedData, selectedCourses, selectedMode]);

  // Rich Select Options with Logos for the in-slot university picker
  const universitySelectOptions = useMemo(() => {
    return availableUniversities.map((u) => {
      const rawLogo =
        (typeof u.image === "object" ? u.image?.url : u.image) ||
        (typeof u.logoSrc === "object" ? u.logoSrc?.url : u.logoSrc) ||
        (typeof u.logo === "object" ? u.logo?.url : u.logo) ||
        u.logoUrl ||
        null;

      return {
        value: String(u._id || u.slug),
        label: (
          <div className="flex items-center gap-2.5 py-1">
            <div className="relative w-7 h-7 rounded-lg border border-gray-200 bg-white p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
              {rawLogo ? (
                <Image
                  src={getAssetPath(rawLogo)}
                  alt={u.name || "Logo"}
                  fill
                  unoptimized
                  className="object-contain p-0.5"
                />
              ) : (
                <span className="text-[10px] font-semibold text-[#0C3058]">
                  {u.name ? u.name.charAt(0) : "U"}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-gray-800 truncate leading-tight">
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
      handleRemoveUniversity(uni.slug || uni._id || uni.id);
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
        const allClones = Array.from(
          document.querySelectorAll(`[data-uni-id="${uniId}"]`)
        );
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
              onClick={() => handleRemoveUniversity(uni.slug || uni._id)}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-200 hover:bg-red-500 text-slate-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10"
              title="Remove from Compare"
            >
              <CloseOutlined className="text-[9px]" />
            </button>

            <div className="w-12 h-12 rounded-xl border border-gray-200 bg-white p-1.5 flex items-center justify-center relative">
              {uni.logo ? (
                <Image
                  src={getAssetPath(uni.logo)}
                  alt={displayTitle || "Logo"}
                  fill
                  unoptimized
                  className="object-contain p-0.5"
                />
              ) : (
                <span className="text-base font-semibold text-[#0C3058]">
                  {displayTitle ? displayTitle.charAt(0) : "U"}
                </span>
              )}
            </div>

            <div className="space-y-0.5 max-w-[200px]">
              <h3 className="text-xs font-semibold text-[#0C3058] m-0 line-clamp-2 leading-tight">
                {displayTitle}
              </h3>
              {displaySubTitle && (
                <p className="text-[11px] font-medium text-teal-700 m-0 line-clamp-1">
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
  }, [comparedData]);

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
      {
        key: "ownership_type",
        icon: <BankOutlined className="text-blue-600" />,
        featureTitle: "Ownership Type",
        renderCell: (uni) => {
          const raw = uni.ownership_type || uni.institution_type;
          const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
          return list.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-1">
              {list.map((item, idx) => (
                <Tag key={idx} className="bg-blue-50 border-blue-200 text-blue-800 font-bold px-2 py-0.5 rounded-full m-0 text-xs">
                  {item}
                </Tag>
              ))}
            </div>
          ) : (
            <span className="text-slate-400">-</span>
          );
        },
      },
      {
        key: "location",
        icon: <GlobalOutlined className="text-blue-600" />,
        featureTitle: "University Location",
        renderCell: (uni) => <span className="text-slate-600 font-semibold">{uni.location || "-"}</span>,
      },
      {
        key: "established_year",
        icon: <ClockCircleOutlined className="text-blue-600" />,
        featureTitle: "Year of Establishment",
        renderCell: (uni) => <span className="font-bold text-slate-700">{uni.established_year || "-"}</span>,
      },
      {
        key: "rating",
        icon: <TrophyOutlined className="text-amber-500" />,
        featureTitle: "Overall University Rating",
        renderCell: (uni) => {
          const ratingVal = typeof uni.rating === "number" && uni.rating > 0
            ? uni.rating
            : (typeof uni.avg_rating === "number" && uni.avg_rating > 0 ? uni.avg_rating : 4.5);
          return (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-xs">
              ★ {ratingVal} / 5
            </span>
          );
        },
      },
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
      {
        key: "mode",
        icon: <BookOutlined className="text-blue-600" />,
        featureTitle: "Mode of Education",
        renderCell: (uni) => {
          const modeList = Array.isArray(uni.mode) ? uni.mode.join(", ") : uni.mode;
          return <span className="text-slate-700 font-semibold">{modeList || "-"}</span>;
        },
      },
      {
        key: "exam_mode",
        icon: <LaptopOutlined className="text-blue-600" />,
        featureTitle: "Examination Mode",
        renderCell: (uni) => {
          const raw = uni.exam_mode;
          const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
          return list.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-1">
              {list.map((item, idx) => (
                <Tag key={idx} className="bg-slate-50 border-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded-full m-0 text-xs">
                  {item}
                </Tag>
              ))}
            </div>
          ) : (
            <span className="text-slate-400">-</span>
          );
        },
      },
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
      {
        key: "alumni_network",
        icon: <TeamOutlined className="text-blue-600" />,
        featureTitle: "Alumni Network",
        renderCell: (uni) => <span className="font-bold text-slate-700">{uni.alumni_network || "-"}</span>,
      },
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
              className="bg-[#00B4D8] hover:bg-[#0096C7] border-none font-semibold text-[11px] sm:text-xs rounded-xl h-7 sm:h-8 px-2.5 w-full sm:w-auto cursor-pointer"
            >
              Apply Now
            </Button>

            {uni.slug && (
              <Link href={`/universities/${uni.slug}`} className="w-full sm:w-auto">
                <Button className="bg-[#0C3058] text-white hover:bg-[#0a2540] border-none font-semibold text-[11px] sm:text-xs rounded-xl h-7 sm:h-8 px-2.5 w-full cursor-pointer">
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
    <div className="bg-[#F1F4F9] min-h-screen font-sans text-gray-800">
      {/* ── HERO BANNER HEADER ── */}
      <div className="bg-[#0F3759] pt-8 pb-14 sm:pb-20 overflow-hidden relative border-b border-gray-200 text-center text-white rounded-b-3xl">
        <div className="max-w-2xl mx-auto px-4 space-y-4 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold m-0 tracking-tight leading-tight">
            <span className="text-[#FFD166]">Compare Universities &amp;</span>{" "}
            <span className="text-white">Choose Best For You!</span>
          </h1>

          {/* Course Selector Dropdown inside Hero */}
          <div className="max-w-lg mx-auto pt-1">
            <Select
              mode="multiple"
              maxTagCount="responsive"
              showSearch
              size="large"
              allowClear
              value={selectedCourses}
              onChange={(vals) => setSelectedCourses(vals || [])}
              placeholder="Select Course to Compare.... MBA, MCA..."
              className="w-full rounded-2xl text-left font-normal text-balance text-gray-500 bg-white"
              options={courseSelectOptions.filter((opt) => opt.value !== "all")}
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
              }
            />
          </div>
        </div>
      </div>

      {/* ── MAIN SELECTOR CARD ── */}
      <div className="-mt-8 sm:-mt-10 max-w-5xl mx-auto px-3 sm:px-4 relative z-20 mb-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-3.5 sm:p-5 md:p-6 text-center relative">
          <div className="relative mb-3 sm:mb-4">
            <p className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider m-0 text-center">
              CHOOSE WHAT YOU WANT TO COMPARE
            </p>
          </div>

          {/* If universities are selected, show active comparison slots & action buttons */}
          {(currentIdentifiers.length > 0 || comparedData.length > 0) ? (
            <div>
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
                      (typeof uni.image === "object" ? uni.image?.url : uni.image) ||
                      (typeof uni.logo === "object" ? uni.logo?.url : uni.logo) ||
                      uni.logoUrl ||
                      null;
                    const getCleanVal = (val) => {
                      if (!val) return "";
                      if (typeof val === "object") return val.name || val.title || val.label || "";
                      const s = String(val).trim();
                      if (/^[0-9a-fA-F]{24}$/.test(s)) {
                        const found = (allStates || []).find((st) => String(st._id || st.value) === s);
                        return found ? (found.name || found.label || found.title || "") : "";
                      }
                      return s;
                    };

                    const resolvedCity = getCleanVal(uni.city);
                    const resolvedState = getCleanVal(uni.state);
                    const locStr =
                      (typeof uni.location === "string" && !/^[0-9a-fA-F]{24}$/.test(uni.location))
                        ? uni.location
                        : [resolvedCity, resolvedState].filter(Boolean).join(", ");
                    return (
                      <div
                        key={slotIdx}
                        id={`uni-slot-${slotIdx}`}
                        className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col items-center justify-center relative min-h-35 group transition-all slot-dock-enter"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveUniversity(uni.slug || uni._id || uni.id);
                          }}
                          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-100 hover:bg-red-500 text-slate-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10"
                          title="Remove university"
                        >
                          <CloseOutlined className="text-[10px]" />
                        </button>

                        <div className="relative w-32 h-12 rounded-lg border border-gray-200 bg-white p-1 flex items-center justify-center mb-2 overflow-hidden">
                          {rawLogo ? (
                            <Image
                              src={getAssetPath(rawLogo)}
                              alt={displayTitle || "Logo"}
                              fill
                              unoptimized
                              className="object-contain"
                            />
                          ) : (
                            <span className="text-sm font-semibold text-[#0C3058]">
                              {displayTitle}
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs font-semibold text-[#0C3058] m-0 line-clamp-1">
                          {displayTitle}
                        </h4>
                        {displaySubTitle && (
                          <p className="text-[10px] font-medium text-teal-700 m-0 line-clamp-1">
                            {displaySubTitle}
                          </p>
                        )}
                        {locStr && (
                          <span className="text-[9px] bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full mt-1.5 line-clamp-1">
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
                      className="border-2 border-dashed border-blue-200/90 rounded-2xl p-4 flex flex-col items-center justify-center text-gray-400 bg-white transition-all min-h-[140px] gap-2.5"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base">
                        +
                      </div>
                      <Select
                        showSearch
                        placeholder="Select University"
                        value={null}
                        onChange={(val, option) => {
                          if (option?.itemObj) {
                            triggerFlyAnimation(option.itemObj, null, slotIdx);
                          }
                        }}
                        className="w-full max-w-[200px] text-left font-medium [&_.ant-select-selector]:rounded-xl! [&_.ant-select-selector]:border-gray-200!"
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
                  className="bg-[#00B4D8] hover:bg-[#0096C7] text-white font-semibold rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer border-none h-10 px-5"
                >
                  Compare Now
                  <ArrowLeftOutlined className="rotate-180 text-xs" />
                </Button>

                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleClearAll}
                  className="font-semibold rounded-xl cursor-pointer h-10 px-4"
                >
                  Clear All ({currentIdentifiers.length || comparedData.length})
                </Button>
              </div>
            </div>
          ) : (
            /* ── 4 DISCOVERY HELPER CARDS (100% Dynamic from DB via showOnCompare) ── */
            <div className="mt-4 mb-2">
              {dbCompareCategories && dbCompareCategories.length > 0 ? (
                <div className="grid grid-cols-2 gap-3.5 sm:gap-5 text-center">
                  {dbCompareCategories.slice(0, 4).map((cat, idx) => {
                    const bgColors = ["#F6F9FF", "#FFFDF5", "#FFF8F8", "#F4FDF8"];
                    const borderColors = ["#DCE7F9", "#FDE8B5", "#FCDADA", "#D0F4E2"];
                    const cardBg = bgColors[idx % bgColors.length];
                    const cardBorder = borderColors[idx % borderColors.length];
                    const rawLogo = cat.logo?.url || cat.logo?.path || (typeof cat.logo === "string" ? cat.logo : null);

                    return (
                      <div
                        key={cat._id || idx}
                        onClick={() => {
                          const catName = (cat.name || "").toLowerCase();
                          const catSlug = (cat.slug || "").toLowerCase();

                          if (catSlug.includes("state") || catName.includes("state")) {
                            setIsStateModalOpen(true);
                          } else if (catSlug.includes("recommend") || catName.includes("recommend")) {
                            setIsRecommendedModalOpen(true);
                          } else if (catSlug.includes("accredit") || catName.includes("accredit")) {
                            setIsAccreditationModalOpen(true);
                          } else {
                            setIsTrendingModalOpen(true);
                          }
                        }}
                        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
                        className="border rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center flex flex-col items-center justify-center cursor-pointer transition-all hover:border-blue-400 hover:scale-[1.01] min-h-[160px] sm:min-h-[190px]"
                      >
                        <div className="mb-2.5 flex items-center justify-center">
                          {rawLogo ? (
                            <div className="relative w-11 h-11 sm:w-13 sm:h-13">
                              <Image
                                src={getAssetPath(rawLogo)}
                                alt={cat.name || "Category Logo"}
                                fill
                                unoptimized
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white/80 border border-gray-200 flex items-center justify-center font-bold text-[#0C3058] text-base">
                              {(cat.name || "C")[0]}
                            </div>
                          )}
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0C3058] tracking-wider uppercase m-0 leading-tight">
                          {cat.name}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-gray-400 font-normal m-0 mt-1.5 leading-snug max-w-[180px]">
                          {cat.description || "Compare with popular and in-demand universities."}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              {/* Bottom Separator & Button: Show Me All Universities to Compare */}
              <div className="w-full h-px bg-gray-100 mt-6 mb-4" />
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAllUnisSearchText("");
                    setIsAllUniversitiesModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-sm sm:text-base font-normal text-gray-600 hover:text-[#00B4D8] transition-colors cursor-pointer bg-transparent border-none"
                >
                  <span>Show Me <strong className="text-[#0C3058] font-bold">All Universities</strong> to Compare</span>
                  <RightOutlined className="text-xs font-bold text-[#0C3058]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── COMPARISON MATRIX SECTION ── */}
      <div id="comparison-matrix-section" className="max-w-[1440px] mx-auto px-3 sm:px-5 md:px-6 py-6 space-y-4">
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

            <div className="block md:hidden bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
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
                        onClick={() => handleRemoveUniversity(uni.slug || uni._id)}
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

              <div className="divide-y divide-slate-100">
                {tableDataSource.map((row) => (
                  <div key={row.key} className="w-full">
                    <div className="bg-[#f0f5ff] py-2 px-3 text-center border-t border-b border-slate-200/90 flex items-center justify-center gap-1.5 text-blue-600 font-extrabold text-[11px] tracking-wider uppercase">
                      <span className="text-blue-600 shrink-0">{row.icon}</span>
                      <span>{row.featureTitle}</span>
                    </div>

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
        <div className="bg-linear-to-r from-[#0F3759] via-[#103D6D] to-[#154E8A] text-white rounded-2xl sm:rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-gray-200">
          <div className="relative z-10 space-y-3">
            <h2 className="text-2xl md:text-3xl font-semibold m-0 text-white">
              Still Have Confusion?
            </h2>
            <p className="text-sm md:text-base text-blue-100 max-w-xl mx-auto m-0 font-normal">
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
                className="bg-[#00B4D8] hover:bg-[#0096C7] text-white font-semibold text-sm md:text-base px-8 h-11 rounded-xl border-none cursor-pointer inline-flex items-center gap-2"
              >
                <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center">
                  <PhoneOutlined className="rotate-90 text-xs" />
                </span>
                Book 1:1 Free Counseling
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 📈 1. TRENDING UNIVERSITIES SELECTION MODAL ── */}
      <Modal
        open={isTrendingModalOpen}
        onCancel={() => setIsTrendingModalOpen(false)}
        width={620}
        closable={false}
        centered
        styles={{
          content: {
            padding: 0,
            borderRadius: 24,
            overflow: "hidden",
          },
          body: {
            padding: 0,
            backgroundColor: "#FFFFFF",
          },
          footer: {
            margin: 0,
            padding: 0,
            borderTop: "1px solid #F1F5F9",
            backgroundColor: "#F8FAFC",
          },
        }}
        footer={
          <div className="px-5 py-3 bg-slate-50 flex items-center justify-between gap-3 w-full">
            <div className="text-xs text-gray-500 font-medium text-left">
              <span className="font-bold text-[#0C3058]">{currentIdentifiers.length}</span> {(currentIdentifiers.length === 1 ? "university" : "universities")} selected
            </div>
            <button
              type="button"
              disabled={currentIdentifiers.length === 0}
              onClick={() => {
                setIsTrendingModalOpen(false);
                handleCompareNow();
              }}
              className="bg-[#00B4D8] hover:bg-[#0096C7] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-xl px-5 py-2.5 transition-all inline-flex items-center gap-1.5 cursor-pointer border-none shadow-sm hover:shadow-md ml-auto"
            >
              <span>Compare Now</span>
              <ArrowLeftOutlined className="rotate-180 text-xs" />
            </button>
          </div>
        }
        title={
          <div className="pt-5 pb-3 px-5 text-center relative border-b border-gray-100 bg-white">
            <button
              onClick={() => setIsTrendingModalOpen(false)}
              className="absolute right-4 top-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer border-none transition-all text-xs font-semibold"
              title="Close"
            >
              ✕
            </button>
            <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-widest m-0">
              COMPARE {baseUniversityObj?.name ? `${baseUniversityObj.name.toUpperCase()} WITH` : activeBaseUniversity?.name ? `${activeBaseUniversity.name.toUpperCase()} WITH` : "TOP UNIVERSITIES WITH"}
            </p>
            <h3 className="text-sm sm:text-base font-bold text-[#0C3058] uppercase tracking-wide m-0 mt-0.5">
              TRENDING UNIVERSITIES
            </h3>
            <div className="flex items-center justify-center gap-2.5 mt-2.5">
              <div className="h-px bg-gray-200 flex-1 max-w-[50px]" />
              <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                SELECT TRENDING UNIVERSITY TO COMPARE
              </span>
              <div className="h-px bg-gray-200 flex-1 max-w-[50px]" />
            </div>
          </div>
        }
      >
        <div className="bg-[#FFFFFF]">
          <div
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {trendingUniversitiesList.length === 0 ? (
              <div className="py-10 text-center bg-white rounded-2xl border border-dashed border-gray-200 p-6">
                <p className="text-gray-500 font-medium m-0">No trending universities available</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5 p-1">
                {trendingUniversitiesList.map((uni) => {
                  const rawLogo = uni.logo?.url || uni.logo?.path || (typeof uni.logo === "string" ? uni.logo : null);
                  const isAdded = isUniAdded(uni);
                  return (
                    <div
                      key={uni._id || uni.id}
                      onClick={() => handleToggleUniversityFromModal(uni)}
                      className={`bg-white border rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between cursor-pointer transition-all hover:scale-[1.02] text-center min-h-[125px] sm:min-h-[135px] shadow-2xs hover:shadow-md ${isAdded
                          ? "border-blue-400 bg-blue-50/20 ring-1 ring-blue-300"
                          : "border-gray-200/90 hover:border-blue-400"
                        }`}
                    >
                      <div className="w-full h-14 sm:h-16 flex items-center justify-center relative px-2 mb-1.5">
                        {rawLogo ? (
                          <Image
                            src={getAssetPath(rawLogo)}
                            alt={uni.name}
                            fill
                            unoptimized
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-xs sm:text-sm font-bold text-[#0C3058] line-clamp-2">
                            {uni.name}
                          </span>
                        )}
                      </div>

                      <div className="w-full pt-2 border-t border-gray-100/90 flex items-center justify-center">
                        {isAdded ? (
                          <span className="text-xs sm:text-[13px] font-bold text-[#00B4D8] inline-flex items-center gap-1">
                            Added <span className="text-[11px]">✅</span>
                          </span>
                        ) : (
                          <span className="text-xs sm:text-[13px] font-semibold text-[#00B4D8] hover:text-[#0096C7] inline-flex items-center gap-1">
                            + Add to Compare
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* ── 🌟 2. RECOMMENDED UNIVERSITIES SELECTION MODAL ── */}
      <Modal
        open={isRecommendedModalOpen}
        onCancel={() => setIsRecommendedModalOpen(false)}
        width={620}
        closable={false}
        centered
        styles={{
          content: {
            padding: 0,
            borderRadius: 24,
            overflow: "hidden",
          },
          body: {
            padding: 0,
            backgroundColor: "#FFFFFF",
          },
          footer: {
            margin: 0,
            padding: 0,
            borderTop: "1px solid #F1F5F9",
            backgroundColor: "#F8FAFC",
          },
        }}
        footer={
          <div className="px-5 py-3 bg-slate-50 flex items-center justify-between gap-3 w-full">
            <div className="text-xs text-gray-500 font-medium text-left">
              <span className="font-bold text-[#0C3058]">{currentIdentifiers.length}</span> {(currentIdentifiers.length === 1 ? "university" : "universities")} selected
            </div>
            <button
              type="button"
              disabled={currentIdentifiers.length === 0}
              onClick={() => {
                setIsRecommendedModalOpen(false);
                handleCompareNow();
              }}
              className="bg-[#00B4D8] hover:bg-[#0096C7] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-xl px-5 py-2.5 transition-all inline-flex items-center gap-1.5 cursor-pointer border-none shadow-sm hover:shadow-md ml-auto"
            >
              <span>Compare Now</span>
              <ArrowLeftOutlined className="rotate-180 text-xs" />
            </button>
          </div>
        }
        title={
          <div className="pt-5 pb-3 px-5 text-center relative border-b border-gray-100 bg-white">
            <button
              onClick={() => setIsRecommendedModalOpen(false)}
              className="absolute right-4 top-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer border-none transition-all text-xs font-semibold"
              title="Close"
            >
              ✕
            </button>
            <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-widest m-0">
              COMPARE {baseUniversityObj?.name ? `${baseUniversityObj.name.toUpperCase()} WITH` : activeBaseUniversity?.name ? `${activeBaseUniversity.name.toUpperCase()} WITH` : "TOP UNIVERSITIES WITH"}
            </p>
            <h3 className="text-sm sm:text-base font-bold text-[#0C3058] uppercase tracking-wide m-0 mt-0.5">
              RECOMMENDED UNIVERSITIES
            </h3>
            <div className="flex items-center justify-center gap-2.5 mt-2.5">
              <div className="h-px bg-gray-200 flex-1 max-w-[50px]" />
              <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                SELECT RECOMMENDED UNIVERSITY TO COMPARE
              </span>
              <div className="h-px bg-gray-200 flex-1 max-w-[50px]" />
            </div>
          </div>
        }
      >
        <div className="bg-[#FFFFFF]">
          <div
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {recommendedUniversitiesList.length === 0 ? (
              <div className="py-10 text-center bg-white rounded-2xl border border-dashed border-gray-200 p-6">
                <p className="text-gray-500 font-medium m-0">No recommended universities available</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5 p-1">
                {recommendedUniversitiesList.map((uni) => {
                  const rawLogo = uni.logo?.url || uni.logo?.path || (typeof uni.logo === "string" ? uni.logo : null);
                  const isAdded = isUniAdded(uni);
                  return (
                    <div
                      key={uni._id || uni.id}
                      onClick={() => handleToggleUniversityFromModal(uni)}
                      className={`bg-white border rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between cursor-pointer transition-all hover:scale-[1.02] text-center min-h-[125px] sm:min-h-[135px] shadow-2xs hover:shadow-md ${isAdded
                          ? "border-blue-400 bg-blue-50/20 ring-1 ring-blue-300"
                          : "border-gray-200/90 hover:border-blue-400"
                        }`}
                    >
                      <div className="w-full h-14 sm:h-16 flex items-center justify-center relative px-2 mb-1.5">
                        {rawLogo ? (
                          <Image
                            src={getAssetPath(rawLogo)}
                            alt={uni.name}
                            fill
                            unoptimized
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-xs sm:text-sm font-bold text-[#0C3058] line-clamp-2">
                            {uni.name}
                          </span>
                        )}
                      </div>

                      <div className="w-full pt-2 border-t border-gray-100/90 flex items-center justify-center">
                        {isAdded ? (
                          <span className="text-xs sm:text-[13px] font-bold text-[#00B4D8] inline-flex items-center gap-1">
                            Added <span className="text-[11px]">✅</span>
                          </span>
                        ) : (
                          <span className="text-xs sm:text-[13px] font-semibold text-[#00B4D8] hover:text-[#0096C7] inline-flex items-center gap-1">
                            + Add to Compare
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* ── 📍 3. STATE WISE UNIVERSITIES SELECTION MODAL ── */}
      <Modal
        open={isStateModalOpen}
        onCancel={() => {
          setIsStateModalOpen(false);
          setSelectedStateObj(null);
        }}
        width={620}
        closable={false}
        centered
        styles={{
          content: {
            padding: 0,
            borderRadius: 24,
            overflow: "hidden",
          },
          body: {
            padding: 0,
            backgroundColor: "#FFFFFF",
          },
          footer: {
            margin: 0,
            padding: 0,
            borderTop: "1px solid #F1F5F9",
            backgroundColor: "#F8FAFC",
          },
        }}
        footer={
          selectedStateObj ? (
            <div className="px-5 py-3 bg-slate-50 flex items-center justify-between gap-3 w-full">
              <div className="text-xs text-gray-500 font-medium text-left">
                <span className="font-bold text-[#0C3058]">{currentIdentifiers.length}</span> {(currentIdentifiers.length === 1 ? "university" : "universities")} selected
              </div>
              <button
                type="button"
                disabled={currentIdentifiers.length === 0}
                onClick={() => {
                  setIsStateModalOpen(false);
                  setSelectedStateObj(null);
                  handleCompareNow();
                }}
                className="bg-[#00B4D8] hover:bg-[#0096C7] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-xl px-5 py-2.5 transition-all inline-flex items-center gap-1.5 cursor-pointer border-none shadow-sm hover:shadow-md ml-auto"
              >
                <span>Compare Now</span>
                <ArrowLeftOutlined className="rotate-180 text-xs" />
              </button>
            </div>
          ) : null
        }
        title={
          <div className="pt-5 pb-3 px-5 text-center relative border-b border-gray-100 bg-white">
            {selectedStateObj && (
              <button
                onClick={() => setSelectedStateObj(null)}
                className="absolute left-4 top-4 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0C3058] flex items-center gap-1 cursor-pointer border-none transition-all text-xs font-semibold"
                title="Back to States"
              >
                <span>←</span>
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsStateModalOpen(false);
                setSelectedStateObj(null);
              }}
              className="absolute right-4 top-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer border-none transition-all text-xs font-semibold"
              title="Close"
            >
              ✕
            </button>
            <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-widest m-0">
              COMPARE {baseUniversityObj?.name ? `${baseUniversityObj.name.toUpperCase()} WITH` : activeBaseUniversity?.name ? `${activeBaseUniversity.name.toUpperCase()} WITH` : "TOP UNIVERSITIES WITH"}
            </p>
            <h3 className="text-sm sm:text-base font-bold text-[#0C3058] uppercase tracking-wide m-0 mt-0.5">
              {selectedStateObj ? `${selectedStateObj.name.toUpperCase()} UNIVERSITIES` : "STATEWISE UNIVERSITIES"}
            </h3>
            <div className="flex items-center justify-center gap-2.5 mt-2.5">
              <div className="h-px bg-gray-200 flex-1 max-w-[50px]" />
              <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                {selectedStateObj ? `SELECT UNIVERSITIES IN ${selectedStateObj.name.toUpperCase()}` : "SELECT STATE TO COMPARE"}
              </span>
              <div className="h-px bg-gray-200 flex-1 max-w-[50px]" />
            </div>
          </div>
        }
      >
        <div className="bg-[#FFFFFF]">
          {selectedStateObj ? (
            /* ── Step 2: Universities of Selected State (2 cols mobile, 3 cols desktop) ── */
            <div
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {stateUniversitiesList.length === 0 ? (
                <div className="py-10 text-center bg-white rounded-2xl border border-dashed border-gray-200 p-6">
                  <p className="text-gray-500 font-medium m-0 text-xs">
                    No universities found in {selectedStateObj.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedStateObj(null)}
                    className="mt-3 text-xs font-semibold text-[#00B4D8] hover:underline bg-transparent border-none cursor-pointer"
                  >
                    ← Choose another state
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5 p-1">
                  {stateUniversitiesList.map((uni) => {
                    const rawLogo = uni.logo?.url || uni.logo?.path || (typeof uni.logo === "string" ? uni.logo : null);
                    const isAdded = isUniAdded(uni);
                    return (
                      <div
                        key={uni._id || uni.id}
                        onClick={() => handleToggleUniversityFromModal(uni)}
                        className={`bg-white border rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between cursor-pointer transition-all hover:scale-[1.02] text-center min-h-[125px] sm:min-h-[135px] shadow-2xs hover:shadow-md ${isAdded
                            ? "border-blue-400 bg-blue-50/20 ring-1 ring-blue-300"
                            : "border-gray-200/90 hover:border-blue-400"
                          }`}
                      >
                        <div className="w-full h-14 sm:h-16 flex items-center justify-center relative px-2 mb-1.5">
                          {rawLogo ? (
                            <Image
                              src={getAssetPath(rawLogo)}
                              alt={uni.name}
                              fill
                              unoptimized
                              className="object-contain"
                            />
                          ) : (
                            <span className="text-xs sm:text-sm font-bold text-[#0C3058] line-clamp-2">
                              {uni.name}
                            </span>
                          )}
                        </div>

                        <div className="w-full pt-2 border-t border-gray-100/90 flex items-center justify-center">
                          {isAdded ? (
                            <span className="text-xs sm:text-[13px] font-bold text-[#00B4D8] inline-flex items-center gap-1">
                              Added <span className="text-[11px]">✅</span>
                            </span>
                          ) : (
                            <span className="text-xs sm:text-[13px] font-semibold text-[#00B4D8] hover:text-[#0096C7] inline-flex items-center gap-1">
                              + Add to Compare
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* ── Step 1: All States Grid (3 cols mobile, 4 cols desktop) ── */
            <div
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {computedStatesList.length === 0 ? (
                <div className="py-10 text-center bg-white rounded-2xl border border-dashed border-gray-200 p-6">
                  <p className="text-gray-500 font-medium m-0">No states available</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 sm:gap-3 p-1">
                  {computedStatesList.map((st) => {
                    const rawLogo = st.logo?.url || st.logo?.path || (typeof st.logo === "string" ? st.logo : null);
                    return (
                      <div
                        key={st._id}
                        onClick={() => setSelectedStateObj(st)}
                        className="bg-white hover:bg-slate-50/80 border border-gray-200/90 hover:border-blue-400 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-[1.03] text-center aspect-square group shadow-2xs hover:shadow-md"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center mb-1 shrink-0">
                          {rawLogo ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={getAssetPath(rawLogo)}
                                alt={st.name}
                                fill
                                unoptimized
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <span className="text-lg">🏛️</span>
                          )}
                        </div>
                        <h4 className="text-[10px] sm:text-[11px] font-semibold text-[#0C3058] m-0 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                          {st.name}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>

      {/* ── 🎖️ 4. ACCREDITATION WISE UNIVERSITIES SELECTION MODAL ── */}
      <Modal
        open={isAccreditationModalOpen}
        onCancel={() => {
          setIsAccreditationModalOpen(false);
          setSelectedAccreditationObj(null);
        }}
        width={620}
        closable={false}
        centered
        styles={{
          content: {
            padding: 0,
            borderRadius: 24,
            overflow: "hidden",
          },
          body: {
            padding: 0,
            backgroundColor: "#FFFFFF",
          },
          footer: {
            margin: 0,
            padding: 0,
            borderTop: "1px solid #F1F5F9",
            backgroundColor: "#F8FAFC",
          },
        }}
        footer={
          selectedAccreditationObj ? (
            <div className="px-5 py-3 bg-slate-50 flex items-center justify-between gap-3 w-full">
              <div className="text-xs text-gray-500 font-medium text-left">
                <span className="font-bold text-[#0C3058]">{currentIdentifiers.length}</span> {(currentIdentifiers.length === 1 ? "university" : "universities")} selected
              </div>
              <button
                type="button"
                disabled={currentIdentifiers.length === 0}
                onClick={() => {
                  setIsAccreditationModalOpen(false);
                  setSelectedAccreditationObj(null);
                  handleCompareNow();
                }}
                className="bg-[#00B4D8] hover:bg-[#0096C7] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-xl px-5 py-2.5 transition-all inline-flex items-center gap-1.5 cursor-pointer border-none shadow-sm hover:shadow-md ml-auto"
              >
                <span>Compare Now</span>
                <ArrowLeftOutlined className="rotate-180 text-xs" />
              </button>
            </div>
          ) : null
        }
        title={
          <div className="pt-5 pb-3 px-5 text-center relative border-b border-gray-100 bg-white">
            {selectedAccreditationObj && (
              <button
                onClick={() => setSelectedAccreditationObj(null)}
                className="absolute left-4 top-4 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0C3058] flex items-center gap-1 cursor-pointer border-none transition-all text-xs font-semibold"
                title="Back to Accreditations"
              >
                <span>←</span>
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsAccreditationModalOpen(false);
                setSelectedAccreditationObj(null);
              }}
              className="absolute right-4 top-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer border-none transition-all text-xs font-semibold"
              title="Close"
            >
              ✕
            </button>
            <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-widest m-0">
              COMPARE {baseUniversityObj?.name ? `${baseUniversityObj.name.toUpperCase()} WITH` : activeBaseUniversity?.name ? `${activeBaseUniversity.name.toUpperCase()} WITH` : "TOP UNIVERSITIES WITH"}
            </p>
            <h3 className="text-sm sm:text-base font-bold text-[#0C3058] uppercase tracking-wide m-0 mt-0.5">
              {selectedAccreditationObj ? `${selectedAccreditationObj.name.toUpperCase()}` : "ACCREDITATION WISE UNIVERSITIES"}
            </h3>
            <div className="flex items-center justify-center gap-2.5 mt-2.5">
              <div className="h-px bg-gray-200 flex-1 max-w-[50px]" />
              <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                {selectedAccreditationObj ? `SELECT UNIVERSITIES WITH ${selectedAccreditationObj.name.toUpperCase()}` : "SELECT ACCREDITATION TO COMPARE"}
              </span>
              <div className="h-px bg-gray-200 flex-1 max-w-[50px]" />
            </div>
          </div>
        }
      >
        <div className="bg-[#FFFFFF]">
          {selectedAccreditationObj ? (
            /* ── Step 2: Universities of Selected Accreditation (2 cols mobile, 3 cols desktop) ── */
            <div
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {accreditationUniversitiesList.length === 0 ? (
                <div className="py-10 text-center bg-white rounded-2xl border border-dashed border-gray-200 p-6">
                  <p className="text-gray-500 font-medium m-0 text-xs">
                    No universities found with {selectedAccreditationObj.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSelectedAccreditationObj(null)}
                    className="mt-3 text-xs font-semibold text-[#00B4D8] hover:underline bg-transparent border-none cursor-pointer"
                  >
                    ← Choose another accreditation
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5 p-1">
                  {accreditationUniversitiesList.map((uni) => {
                    const rawLogo = uni.logo?.url || uni.logo?.path || (typeof uni.logo === "string" ? uni.logo : null);
                    const isAdded = isUniAdded(uni);
                    return (
                      <div
                        key={uni._id || uni.id}
                        onClick={() => handleToggleUniversityFromModal(uni)}
                        className={`bg-white border rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between cursor-pointer transition-all hover:scale-[1.02] text-center min-h-[125px] sm:min-h-[135px] shadow-2xs hover:shadow-md ${isAdded
                            ? "border-blue-400 bg-blue-50/20 ring-1 ring-blue-300"
                            : "border-gray-200/90 hover:border-blue-400"
                          }`}
                      >
                        <div className="w-full h-14 sm:h-16 flex items-center justify-center relative px-2 mb-1.5">
                          {rawLogo ? (
                            <Image
                              src={getAssetPath(rawLogo)}
                              alt={uni.name}
                              fill
                              unoptimized
                              className="object-contain"
                            />
                          ) : (
                            <span className="text-xs sm:text-sm font-bold text-[#0C3058] line-clamp-2">
                              {uni.name}
                            </span>
                          )}
                        </div>

                        <div className="w-full pt-2 border-t border-gray-100/90 flex items-center justify-center">
                          {isAdded ? (
                            <span className="text-xs sm:text-[13px] font-bold text-[#00B4D8] inline-flex items-center gap-1">
                              Added <span className="text-[11px]">✅</span>
                            </span>
                          ) : (
                            <span className="text-xs sm:text-[13px] font-semibold text-[#00B4D8] hover:text-[#0096C7] inline-flex items-center gap-1">
                              + Add to Compare
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* ── Step 1: 6 Accreditation Approvals Grid (2 cols mobile, 3 cols desktop) ── */
            <div
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5 p-1">
                {dynamicAccreditationList.map((acc) => {
                  const rawLogo = acc.logo?.url || acc.logo?.path || (typeof acc.logo === "string" ? acc.logo : null);
                  return (
                    <div
                      key={acc._id || acc.id}
                      onClick={() => setSelectedAccreditationObj(acc)}
                      className="bg-white hover:bg-slate-50/80 border border-gray-200/90 hover:border-blue-400 rounded-2xl p-3.5 sm:p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-[1.03] text-center aspect-[1/1.05] group shadow-2xs hover:shadow-md"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2.5 shrink-0">
                        {rawLogo ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={getAssetPath(rawLogo)}
                              alt={acc.name}
                              fill
                              unoptimized
                              className="object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center text-2xl">
                            {acc.icon || "🎖️"}
                          </div>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-[13px] font-semibold text-[#0C3058] m-0 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                        {acc.name}
                      </h4>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* ── 🏫 5. ALL UNIVERSITIES SELECTION MODAL (showInModal: true) ── */}
      <Modal
        open={isAllUniversitiesModalOpen}
        onCancel={() => {
          setIsAllUniversitiesModalOpen(false);
          setAllUnisSearchText("");
        }}
        width={620}
        closable={false}
        centered
        styles={{
          content: {
            padding: 0,
            borderRadius: 24,
            overflow: "hidden",
          },
          body: {
            padding: 0,
            backgroundColor: "#FFFFFF",
          },
          footer: {
            margin: 0,
            padding: 0,
            borderTop: "1px solid #F1F5F9",
            backgroundColor: "#F8FAFC",
          },
        }}
        footer={
          <div className="px-5 py-3 bg-slate-50 flex items-center justify-between gap-3 w-full">
            <div className="text-xs text-gray-500 font-medium text-left">
              <span className="font-bold text-[#0C3058]">{currentIdentifiers.length}</span> {(currentIdentifiers.length === 1 ? "university" : "universities")} selected
            </div>
            <button
              type="button"
              disabled={currentIdentifiers.length === 0}
              onClick={() => {
                setIsAllUniversitiesModalOpen(false);
                handleCompareNow();
              }}
              className="bg-[#00B4D8] hover:bg-[#0096C7] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold rounded-xl px-5 py-2.5 transition-all inline-flex items-center gap-1.5 cursor-pointer border-none shadow-sm hover:shadow-md ml-auto"
            >
              <span>Compare Now</span>
              <ArrowLeftOutlined className="rotate-180 text-xs" />
            </button>
          </div>
        }
        title={
          <div className="pt-5 pb-3 px-5 text-center relative border-b border-gray-100 bg-white">
            <button
              onClick={() => {
                setIsAllUniversitiesModalOpen(false);
                setAllUnisSearchText("");
              }}
              className="absolute right-4 top-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer border-none transition-all text-xs font-semibold"
              title="Close"
            >
              ✕
            </button>
            <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-widest m-0">
              COMPARE {baseUniversityObj?.name ? `${baseUniversityObj.name.toUpperCase()} WITH` : activeBaseUniversity?.name ? `${activeBaseUniversity.name.toUpperCase()} WITH` : "TOP UNIVERSITIES WITH"}
            </p>
            <h3 className="text-sm sm:text-base font-bold text-[#0C3058] uppercase tracking-wide m-0 mt-0.5">
              ALL UNIVERSITIES ({modalUniversitiesList.length})
            </h3>
            <div className="flex items-center justify-center gap-2.5 mt-2.5">
              <div className="h-px bg-gray-200 flex-1 max-w-[50px]" />
              <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                SELECT ANY UNIVERSITY TO COMPARE
              </span>
              <div className="h-px bg-gray-200 flex-1 max-w-[50px]" />
            </div>
          </div>
        }
      >
        <div className="bg-[#FFFFFF]">
          <div
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {modalUniversitiesList.length === 0 ? (
              <div className="py-10 text-center bg-white rounded-2xl border border-dashed border-gray-200 p-6">
                <p className="text-gray-500 font-medium m-0 text-xs">No universities found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5 p-1">
                {modalUniversitiesList.map((uni) => {
                  const rawLogo = uni.logo?.url || uni.logo?.path || (typeof uni.logo === "string" ? uni.logo : null);
                  const isAdded = isUniAdded(uni);
                  return (
                    <div
                      key={uni._id || uni.id}
                      onClick={() => handleToggleUniversityFromModal(uni)}
                      className={`bg-white border rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between cursor-pointer transition-all hover:scale-[1.02] text-center min-h-[125px] sm:min-h-[135px] shadow-2xs hover:shadow-md ${isAdded
                          ? "border-blue-400 bg-blue-50/20 ring-1 ring-blue-300"
                          : "border-gray-200/90 hover:border-blue-400"
                        }`}
                    >
                      <div className="w-full h-14 sm:h-16 flex items-center justify-center relative px-2 mb-1.5">
                        {rawLogo ? (
                          <Image
                            src={getAssetPath(rawLogo)}
                            alt={uni.name}
                            fill
                            unoptimized
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-xs sm:text-sm font-bold text-[#0C3058] line-clamp-2">
                            {uni.name}
                          </span>
                        )}
                      </div>

                      <div className="w-full pt-2 border-t border-gray-100/90 flex items-center justify-center">
                        {isAdded ? (
                          <span className="text-xs sm:text-[13px] font-bold text-[#00B4D8] inline-flex items-center gap-1">
                            Added <span className="text-[11px]">✅</span>
                          </span>
                        ) : (
                          <span className="text-xs sm:text-[13px] font-semibold text-[#00B4D8] hover:text-[#0096C7] inline-flex items-center gap-1">
                            + Add to Compare
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Modal>
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
