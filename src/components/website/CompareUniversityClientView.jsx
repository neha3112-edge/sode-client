"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Select, Tag, Empty, Table, Modal, Input } from "antd";
import {
  RightOutlined,
  SearchOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  EnvironmentOutlined,
  RiseOutlined,
  StarOutlined,
  CheckCircleFilled,
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
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";

import { useCompare } from "@/hooks/useCompare";
import { useFormModal as useAppDrawer } from "@/hooks/useFormModal";
import { request } from "@/services/request";

const getAssetPath = (obj) =>
  typeof obj === "string" ? obj : obj?.url || obj?.path || obj?.src || "";

export default function CompareUniversityClientView({
  initialComparedData = [],
  initialAllCourses = [],
  allCourses: rawAllCourses = [],
  initialAllStates = [],
  allStates: rawAllStates = [],
  initialAllApprovals = [],
  allApprovals: rawAllApprovals = [],
  initialCourseUniversities = [],
  initialCourseMessage = "",
  initialSelectedCourse = "",
  initialSelectedIds = "",
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { compareList, removeFromCompare, clearCompare, addToCompare, updateCompareList } = useCompare();
  const { openFormModal } = useAppDrawer();

  const allCourses = initialAllCourses?.length > 0 ? initialAllCourses : rawAllCourses || [];
  const allStates = initialAllStates?.length > 0 ? initialAllStates : rawAllStates || [];
  const allApprovals = initialAllApprovals?.length > 0 ? initialAllApprovals : rawAllApprovals || [];

  const [availableCourses, setAvailableCourses] = useState(allCourses);
  const [comparedData, setComparedData] = useState(initialComparedData);
  const [selectedCourse, setSelectedCourse] = useState(initialSelectedCourse || null);
  const [courseBasedUniversities, setCourseBasedUniversities] = useState(initialCourseUniversities);
  const [flyingLogo, setFlyingLogo] = useState(null);

  const [isUniModalOpen, setIsUniModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("all");
  const [selectedModalState, setSelectedModalState] = useState(null);
  const [selectedModalApproval, setSelectedModalApproval] = useState(null);
  const [modalUniversities, setModalUniversities] = useState(initialCourseUniversities || []);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const [modalSelectedUnis, setModalSelectedUnis] = useState([]);

  useEffect(() => {
    if (initialComparedData?.length > 0) setComparedData(initialComparedData);
  }, [initialComparedData]);

  useEffect(() => {
    if (initialAllCourses?.length > 0) {
      setAvailableCourses(initialAllCourses);
    } else {
      request.dynamicRead({
        entity: "universities",
        endPoint: "v1/compare",
        revalidate: 900,
      }).then((res) => {
        if (Array.isArray(res?.courses) && res.courses.length > 0) {
          setAvailableCourses(res.courses);
        }
      }).catch((e) => console.error("Failed to load compare courses:", e));
    }
  }, [initialAllCourses]);

  const handleCourseChange = (val) => {
    const newCourse = val || null;
    setSelectedCourse(newCourse);

    if (newCourse) {
      // Clear previously selected universities so slots and options refresh for this course
      clearCompare();
      setComparedData([]);
      setModalSelectedUnis([]);

      const targetUrl = `/tools/compare-universities?course=${encodeURIComponent(newCourse.toLowerCase())}`;
      router.replace(targetUrl, { scroll: false });
      window.history.replaceState(null, "", targetUrl);

      setModalLoading(true);
      request.dynamicRead({
        entity: "universities",
        endPoint: "v1/compare",
        options: { course: newCourse },
        revalidate: 900,
      }).then((res) => {
        const unis = Array.isArray(res?.universities) ? res.universities : [];
        setCourseBasedUniversities(unis);
        setModalUniversities(unis);
      }).catch((err) => {
        console.error("Failed to load course universities:", err);
      }).finally(() => {
        setModalLoading(false);
      });
    } else {
      router.replace("/tools/compare-universities", { scroll: false });
      window.history.replaceState(null, "", "/tools/compare-universities");
      request.dynamicRead({
        entity: "universities",
        endPoint: "v1/compare",
        revalidate: 900,
      }).then((res) => {
        const unis = Array.isArray(res?.universities) ? res.universities : [];
        setCourseBasedUniversities(unis);
        setModalUniversities(unis);
      }).catch((e) => console.error(e));
    }
  };

  const isFirstMount = useRef(true);
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      if (initialCourseUniversities?.length > 0) {
        if (modalUniversities?.length === 0) setModalUniversities(initialCourseUniversities);
        return;
      }
    }

    let isCancelled = false;
    const syncCourseData = async () => {
      setModalLoading(true);
      try {
        const options = selectedCourse && selectedCourse !== "all"
          ? { course: selectedCourse }
          : {};

        const res = await request.dynamicRead({
          entity: "universities",
          endPoint: "v1/compare",
          options,
          revalidate: 900,
        });

        if (!isCancelled) {
          const unis = Array.isArray(res?.universities) ? res.universities : [];
          setCourseBasedUniversities(unis);
          setModalUniversities(unis);
        }
      } catch (err) {
        console.error("Failed to sync course universities:", err);
      } finally {
        if (!isCancelled) setModalLoading(false);
      }
    };

    syncCourseData();

    // If universities are already in comparison, re-evaluate compare data with the new course
    if (comparedData.length > 0) {
      const slugs = comparedData.map((u) => u.slug || u._id || u.id).filter(Boolean);
      if (slugs.length > 0) {
        const compOptions = { university: slugs.join(",") };
        if (selectedCourse && selectedCourse !== "all") compOptions.course = selectedCourse;
        request.dynamicRead({
          entity: "universities",
          endPoint: "v1/compare",
          options: compOptions,
          revalidate: 900,
        }).then((res) => {
          if (!isCancelled) {
            const data = Array.isArray(res?.result) ? res.result : [];
            if (data.length > 0) setComparedData(data);
          }
        }).catch((e) => console.error(e));
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [selectedCourse]);

  const currentIdentifiers = useMemo(() => {
    if (compareList?.length > 0)
      return compareList.map((u) => u.slug || u._id || u.id).filter(Boolean);
    const urlIds =
      searchParams.get("university") ||
      searchParams.get("universityid") ||
      searchParams.get("ids") ||
      searchParams.get("universities");
    return urlIds ? urlIds.split(",").map((s) => s.trim()).filter(Boolean) : [];
  }, [searchParams, compareList]);

  const courseSelectOptions = useMemo(() => {
    return (availableCourses || [])
      .filter((c) => c?.name)
      .map((c) => ({ value: c.name, label: c.name }));
  }, [availableCourses]);

  const slotSelectOptions = useMemo(() => {
    const pool = courseBasedUniversities.length > 0
      ? courseBasedUniversities
      : [];
    const selectedKeys = new Set([
      ...(compareList || []).map((u) => String(u._id || u.id || u.slug || "").toLowerCase()),
      ...comparedData.map((u) => String(u._id || u.slug || "").toLowerCase()),
    ]);
    return pool
      .filter((u) => !selectedKeys.has(String(u._id || u.slug || "").toLowerCase()))
      .map((u) => ({
        value: String(u._id || u.slug),
        label: u.name,
        searchValue: u.name,
        itemObj: u,
      }));
  }, [courseBasedUniversities, compareList, comparedData]);


  const syncCompareUrl = (slugs) => {
    if (typeof window === "undefined") return;
    const slugsList = (slugs || []).filter(Boolean);
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete("universityid");
    newParams.delete("ids");
    newParams.delete("universities");
    newParams.delete("university");
    const otherQuery = newParams.toString();
    const uniParam = slugsList.length > 0 ? `university=${slugsList.join(",")}` : "";
    const fullQuery = [uniParam, otherQuery].filter(Boolean).join("&");
    const targetUrl = fullQuery
      ? `/tools/compare-universities?${fullQuery}`
      : "/tools/compare-universities";
    router.replace(targetUrl, { scroll: false });
    window.history.replaceState(null, "", targetUrl);
  };

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
    const remaining = (compareList || []).filter((item) => {
      const keys = [item._id, item.id, item.slug, item.name].filter(Boolean);
      return !keys.some((k) => String(k).toLowerCase().trim() === targetKey);
    });
    syncCompareUrl(remaining.map((u) => u.slug || u._id || u.id).filter(Boolean));
  };

  const openUniversityModal = async (mode = "all") => {
    setModalMode(mode);
    setSelectedModalState(null);
    setSelectedModalApproval(null);
    setModalSearch("");
    const currentActive = compareList?.length > 0 ? compareList : comparedData;
    setModalSelectedUnis([...currentActive]);
    setIsUniModalOpen(true);
    const hasApprovalsLoaded = (modalUniversities || []).some(
      (u) => (Array.isArray(u.approvals) && u.approvals.length > 0) || u.naac_rating || u.nirf_rank
    );
    if (!modalUniversities || modalUniversities.length === 0 || !hasApprovalsLoaded) {
      setModalLoading(true);
      try {
        const res = await request.dynamicRead({
          entity: "universities",
          endPoint: "v1/compare",
          options: selectedCourse && selectedCourse !== "all" ? { course: selectedCourse } : {},
          revalidate: 900,
        });
        const unis = Array.isArray(res?.universities) ? res.universities : [];
        if (unis.length > 0) {
          setCourseBasedUniversities(unis);
          setModalUniversities(unis);
        }
      } catch (err) {
        console.error("Failed to load universities for modal:", err);
      } finally {
        setModalLoading(false);
      }
    }
  };

  const isModalUniSelected = (uni) => {
    if (!uni) return false;
    const targetKeys = [uni._id, uni.id, uni.slug, uni.uniSlug, uni.name]
      .filter(Boolean)
      .map((k) => String(k).toLowerCase().trim());
    return modalSelectedUnis.some((u) => {
      const uKeys = [u._id, u.id, u.slug, u.uniSlug, u.name]
        .filter(Boolean)
        .map((k) => String(k).toLowerCase().trim());
      return targetKeys.some((tk) => uKeys.includes(tk));
    });
  };

  const handleToggleFromModal = (uni) => {
    if (!uni) return;
    const targetKeys = [uni._id, uni.id, uni.slug, uni.uniSlug, uni.name]
      .filter(Boolean)
      .map((k) => String(k).toLowerCase().trim());

    if (isModalUniSelected(uni)) {
      setModalSelectedUnis((prev) =>
        prev.filter((u) => {
          const uKeys = [u._id, u.id, u.slug, u.uniSlug, u.name]
            .filter(Boolean)
            .map((k) => String(k).toLowerCase().trim());
          return !targetKeys.some((tk) => uKeys.includes(tk));
        })
      );
    } else {
      if (modalSelectedUnis.length >= 3) return;
      setModalSelectedUnis((prev) => [...prev, uni]);
    }
  };

  const handleApplyCompareFromModal = async () => {
    setIsUniModalOpen(false);
    if (!modalSelectedUnis || modalSelectedUnis.length === 0) return;

    updateCompareList(modalSelectedUnis);
    setComparedData(modalSelectedUnis);

    const slugs = modalSelectedUnis.map((u) => u.slug || u._id || u.id).filter(Boolean);
    if (slugs.length > 0) {
      syncCompareUrl(slugs);
      try {
        const options = { university: slugs.join(",") };
        if (selectedCourse && selectedCourse !== "all") options.course = selectedCourse;
        const res = await request.dynamicRead({
          entity: "universities",
          endPoint: "v1/compare",
          options,
          revalidate: 900,
        });
        const data = Array.isArray(res?.result) ? res.result : [];
        if (data.length > 0) setComparedData(data);
        setTimeout(() => {
          document.getElementById("comparison-matrix-section")?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } catch (err) {
        console.error("Failed to compare:", err);
      }
    }
  };

  const doesUniMatchState = (uni, state) => {
    if (!uni || !state) return false;
    const sId = String(state._id || state.id || "").toLowerCase();
    const sSlug = String(state.slug || "").toLowerCase();
    const sName = String(state.name || state.title || state).toLowerCase().trim();

    const uStateObj = uni.state;
    const uStateId = String(typeof uStateObj === "object" ? uStateObj?._id || uStateObj?.id : uStateObj || "").toLowerCase();
    const uStateSlug = String(typeof uStateObj === "object" ? uStateObj?.slug : "").toLowerCase();
    const uStateName = String(typeof uStateObj === "object" ? uStateObj?.name : uStateObj || "").toLowerCase().trim();
    const uLoc = String(uni.location || "").toLowerCase().trim();

    if (sId && (uStateId === sId || uStateId.includes(sId))) return true;
    if (sSlug && (uStateSlug === sSlug || uLoc.includes(sSlug))) return true;
    if (sName && (uStateName === sName || uLoc.includes(sName) || uStateName.includes(sName))) return true;
    return false;
  };

  const doesUniMatchApproval = (uni, approval) => {
    if (!uni || !approval) return false;
    const aId = String(approval._id || approval.id || "").toLowerCase().trim();
    const aCode = String(approval.code || "").toLowerCase().trim();
    const aName = String(approval.name || approval.title || approval).toLowerCase().trim();
    const aSlug = String(approval.slug || "").toLowerCase().trim();

    const apps = Array.isArray(uni.approvals) ? uni.approvals : (uni.approvals ? [uni.approvals] : []);
    const hasInApprovals = apps.some((app) => {
      if (!app) return false;
      const isStr = typeof app === "string";
      const isHex = isStr && /^[0-9a-fA-F]{24}$/.test(app);

      const curId = String((!isStr ? app._id || app.id : isHex ? app : "") || "").toLowerCase().trim();
      const curCode = String((!isStr ? app.code : "") || "").toLowerCase().trim();
      const curName = String((!isStr ? app.name || app.title || app.code : !isHex ? app : "") || "").toLowerCase().trim();
      const curSlug = String((!isStr ? app.slug : "") || "").toLowerCase().trim();

      if (aId && curId && (curId === aId || curId.includes(aId) || aId.includes(curId))) return true;
      if (aCode && (curCode === aCode || curName === aCode || curName.includes(aCode) || aCode.includes(curName))) return true;
      if (aName && (curName === aName || curCode === aName || curName.includes(aName) || aName.includes(curName))) return true;
      if (aSlug && curSlug && curSlug === aSlug) return true;
      return false;
    });

    if (hasInApprovals) return true;

    if (aCode.includes("naac") || aName.includes("naac")) {
      const naacVal = String(typeof uni.naac_rating === "object" ? uni.naac_rating?.grade || uni.naac_rating?.name : uni.naac_rating || "").toLowerCase().trim();
      if (naacVal && naacVal !== "na") return true;
    }
    if (aCode.includes("nirf") || aName.includes("nirf")) {
      const nirfVal = String(typeof uni.nirf_rank === "object" ? uni.nirf_rank?.rank || uni.nirf_rank?.name : uni.nirf_rank || "").toLowerCase().trim();
      if (nirfVal && nirfVal !== "na") return true;
    }
    return false;
  };

  const stateList = useMemo(() => {
    const map = new Map();
    (allStates || []).forEach((st) => {
      const name = typeof st === "object" ? st?.name : st;
      const id = typeof st === "object" ? st?._id || st?.id || st?.slug : st;
      if (name && !map.has(name.toLowerCase())) {
        map.set(name.toLowerCase(), {
          _id: id,
          name: name,
          slug: (typeof st === "object" ? st?.slug : "") || name.toLowerCase().replace(/\s+/g, "-"),
        });
      }
    });

    const uniPool = modalUniversities?.length > 0 ? modalUniversities : courseBasedUniversities;
    const countMap = new Map();

    uniPool.forEach((u) => {
      let stName = "";
      if (typeof u.state === "object" && u.state?.name) {
        stName = u.state.name;
      } else if (typeof u.state === "string" && u.state.trim() && !/^[0-9a-fA-F]{24}$/.test(u.state)) {
        stName = u.state.trim();
      } else if (u.location && !/^[0-9a-fA-F]{24}$/.test(u.location)) {
        const parts = u.location.split(",").map((s) => s.trim());
        stName = parts[parts.length - 1] || parts[0];
      }

      if (stName) {
        const key = stName.toLowerCase();
        countMap.set(key, (countMap.get(key) || 0) + 1);
        if (!map.has(key)) {
          map.set(key, {
            _id: key,
            name: stName,
            slug: key.replace(/\s+/g, "-"),
          });
        }
      }
    });

    return Array.from(map.values())
      .map((st) => ({
        ...st,
        count: countMap.get(st.name.toLowerCase()) || 0,
      }))
      .filter((st) => (selectedCourse ? st.count > 0 : true))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [allStates, modalUniversities, courseBasedUniversities, selectedCourse]);

  const approvalList = useMemo(() => {
    const map = new Map();
    (allApprovals || []).forEach((app) => {
      const name = typeof app === "object" ? app?.name || app?.title || app?.code : app;
      const code = typeof app === "object" ? app?.code || app?.name : app;
      const id = typeof app === "object" ? app?._id || app?.id : app;
      const logo = typeof app === "object" ? app?.logo || app?.image : null;
      if (name && !map.has(name.toLowerCase())) {
        map.set(name.toLowerCase(), {
          _id: id,
          name: name,
          code: code || name,
          logo: logo ? getAssetPath(logo) : null,
          slug: (typeof app === "object" ? app?.slug : "") || name.toLowerCase().replace(/\s+/g, "-"),
        });
      }
    });

    if (map.size === 0) return [];

    const uniPool = modalUniversities?.length > 0 ? modalUniversities : courseBasedUniversities;
    const countMap = new Map();

    uniPool.forEach((u) => {
      const apps = Array.isArray(u.approvals) ? u.approvals : [];
      apps.forEach((a) => {
        const aName = typeof a === "object" ? a?.name || a?.title || a?.code : a;
        if (aName) {
          const key = aName.toLowerCase();
          if (map.has(key)) {
            countMap.set(key, (countMap.get(key) || 0) + 1);
          }
        }
      });
    });

    return Array.from(map.values())
      .map((app) => ({
        ...app,
        count: countMap.get(app.name.toLowerCase()) || countMap.get((app.code || "").toLowerCase()) || 0,
      }))
      .filter((app) => (selectedCourse ? app.count > 0 : true))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [allApprovals, modalUniversities, courseBasedUniversities, selectedCourse]);

  const filteredStates = useMemo(() => {
    if (!modalSearch) return stateList;
    const q = modalSearch.toLowerCase().trim();
    return stateList.filter((st) => st.name.toLowerCase().includes(q));
  }, [stateList, modalSearch]);

  const filteredApprovals = useMemo(() => {
    if (!modalSearch) return approvalList;
    const q = modalSearch.toLowerCase().trim();
    return approvalList.filter((app) =>
      app.name.toLowerCase().includes(q) || (app.code || "").toLowerCase().includes(q)
    );
  }, [approvalList, modalSearch]);

  const displayedModalUniversities = useMemo(() => {
    let pool = modalUniversities || [];

    if (modalMode === "trending") {
      pool = pool.filter((u) => u.is_trending || u.trending || u.isPopular || u.popular || (u.rating >= 4.3));
      if (pool.length === 0) pool = (modalUniversities || []).slice(0, 16);
    } else if (modalMode === "recommended") {
      pool = pool.filter((u) => u.is_recommended || u.recommended || (u.rating >= 4.4));
      if (pool.length === 0) pool = (modalUniversities || []).slice(0, 16);
    } else if (modalMode === "state" && selectedModalState) {
      pool = pool.filter((u) => doesUniMatchState(u, selectedModalState));
    } else if (modalMode === "accreditation" && selectedModalApproval) {
      pool = pool.filter((u) => doesUniMatchApproval(u, selectedModalApproval));
    }

    if (!modalSearch) return pool;
    const q = modalSearch.toLowerCase().trim();
    return pool.filter((u) => {
      const name = (u.name || "").toLowerCase();
      const city = (u.city || "").toLowerCase();
      const state = (typeof u.state === "object" ? u.state?.name : u.state || "").toLowerCase();
      return name.includes(q) || city.includes(q) || state.includes(q);
    });
  }, [modalUniversities, modalMode, selectedModalState, selectedModalApproval, modalSearch]);

  const triggerFlyAnimation = (uni, slotIdx) => {
    if (!uni) return;
    const uniId = String(uni._id || uni.slug || uni.id);
    const activeList = compareList?.length > 0 ? compareList : comparedData;
    const isAlreadyIn = activeList.some(
      (u) => String(u._id || u.id || u.slug) === uniId || u.slug === uni.slug
    );
    if (isAlreadyIn) {
      handleRemoveUniversity(uni.slug || uni._id || uni.id);
      return;
    }
    if (activeList.length >= 3) return;
    const targetSlotEl =
      typeof document !== "undefined"
        ? document.getElementById(`uni-slot-${slotIdx ?? activeList.length}`)
        : null;
    if (targetSlotEl) {
      const targetRect = targetSlotEl.getBoundingClientRect();
      const rawLogo = uni.logo || uni.image || null;
      setFlyingLogo({
        logo: rawLogo,
        name: uni.name,
        start: { top: window.innerHeight / 2 - 30, left: window.innerWidth / 2 - 30, width: 60, height: 60 },
        target: { top: targetRect.top + 16, left: targetRect.left + targetRect.width / 2 - 30, width: 60, height: 60 },
        isAnimating: false,
      });
      addToCompare(uni);
      requestAnimationFrame(() => requestAnimationFrame(() =>
        setFlyingLogo((prev) => prev ? { ...prev, isAnimating: true } : null)
      ));
      setTimeout(() => setFlyingLogo(null), 700);
    } else {
      addToCompare(uni);
    }
  };

  const findCourseOffering = (uni, courseName) => {
    if (!uni) return null;

    if (uni.isCourseOffering || uni.type === "course_offering") {
      const firstSub = (uni.courses || [])[0];
      return {
        course_name: uni.course_name || uni.title || firstSub?.name || "Selected Program",
        fee_per_semester: uni.fee_per_semester || firstSub?.fee_per_semester || null,
        full_course_fee: uni.full_course_fee || firstSub?.full_course_fee || null,
        fee_discount: uni.fee_discount || "Upto 20%",
        rating: uni.rating || 4.5,
        duration: uni.duration || firstSub?.duration || "2–3 Years",
        eligibility: uni.eligibility || firstSub?.eligibility || "Graduation / 10+2 from recognized board",
        specializations: uni.specializations?.length ? uni.specializations : (firstSub?.specializations || []),
      };
    }

    const coursesList = Array.isArray(uni.courses) && uni.courses.length > 0
      ? uni.courses
      : Array.isArray(uni.courseOfferings) && uni.courseOfferings.length > 0
        ? uni.courseOfferings
        : [];

    if (!courseName || courseName === "all") {
      const first = coursesList[0];
      if (first) {
        return {
          course_name: first.name || first.course_name || "General Program",
          fee_per_semester: first.fee_per_semester || null,
          full_course_fee: first.full_course_fee || null,
          fee_discount: first.fee_discount || "Upto 20%",
          rating: first.rating || uni.rating || 4.5,
          duration: first.duration || "2–3 Years",
          eligibility: first.eligibility || "Graduation / 10+2",
          specializations: first.specializations || [],
        };
      }
      return null;
    }

    const target = courseName.trim().toLowerCase();
    const wordRegex = new RegExp(`(^|[^a-z0-9])${target}([^a-z0-9]|$)`, "i");

    const match = coursesList.find((o) => {
      if (!o) return false;
      const cn = String(o.name || o.course_name || o.title || "").toLowerCase().trim();
      const slug = String(o.slug || o.course_slug || o.course_master_slug || "").toLowerCase().trim();
      const code = String(o.code || o.course_code || "").toLowerCase().trim();

      if (cn === target || slug === target || code === target) return true;
      if (slug.endsWith(`/${target}`) || slug.endsWith(`-${target}`) || slug.includes(`-${target}-`)) return true;
      if (cn.includes(`(${target})`) || wordRegex.test(cn)) return true;

      const words = cn.split(/[\s-]+/).filter(Boolean);
      const acronym = words.map((w) => w[0]).join("").toLowerCase();
      if (acronym === target) return true;
      const meaningful = words.filter((w) => !["of", "and", "in", "&"].includes(w)).map((w) => w[0]).join("").toLowerCase();
      if (meaningful === target) return true;
      return false;
    });

    if (match) {
      return {
        course_name: match.name || match.course_name || courseName,
        fee_per_semester: match.fee_per_semester || null,
        full_course_fee: match.full_course_fee || null,
        fee_discount: match.fee_discount || "Upto 20%",
        rating: match.rating || uni.rating || 4.5,
        duration: match.duration || "2–3 Years",
        eligibility: match.eligibility || "Graduation / 10+2",
        specializations: match.specializations || [],
      };
    }

    const inOffered = (uni.coursesOffered || []).some((c) => {
      const cl = String(typeof c === "object" ? c.name : c || "").toLowerCase();
      return cl === target || cl.includes(`(${target})`) || wordRegex.test(cl);
    });
    if (inOffered && coursesList[0]) {
      const first = coursesList[0];
      return {
        course_name: courseName,
        fee_per_semester: first?.fee_per_semester || null,
        full_course_fee: first?.full_course_fee || null,
        fee_discount: first?.fee_discount || "Upto 20%",
        rating: first?.rating || uni.rating || 4.5,
        duration: first?.duration || "2–3 Years",
        eligibility: first?.eligibility || "Graduation / 10+2",
        specializations: first?.specializations || [],
      };
    }

    return null;
  };

  const tableColumns = useMemo(() => {
    if (!comparedData?.length) return [];
    const count = comparedData.length;
    const fw = count <= 2 ? "20%" : "17%";
    const uw = count <= 2 ? `${80 / count}%` : `${83 / count}%`;

    const featureCol = {
      title: <span className="font-semibold text-xs uppercase tracking-wider text-slate-700">Feature / Criteria</span>,
      dataIndex: "featureTitle",
      key: "featureTitle",
      width: fw,
      className: "bg-slate-50/80 font-medium text-slate-700 text-xs px-2.5 py-1.5",
      render: (_, record) => (
        <span className="font-medium text-slate-700 text-xs leading-snug">
          {record.featureTitle}
        </span>
      ),
    };

    const uniCols = comparedData.map((uni, idx) => ({
      title: (
        <div className="relative group flex flex-col items-center text-center gap-1 py-0.5 px-1">
          <button
            onClick={() => handleRemoveUniversity(uni.slug || uni._id)}
            className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-200 hover:bg-red-500 text-slate-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10"
          >
            <CloseOutlined className="text-[8px] sm:text-[9px]" />
          </button>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-gray-200 bg-white p-1 flex items-center justify-center relative">
            {uni.logo ? (
              <Image src={getAssetPath(uni.logo)} alt={uni.name || "Logo"} fill unoptimized className="object-contain p-0.5" />
            ) : (
              <span className="text-sm font-semibold text-[#0C3058]">{(uni.name || "U")[0]}</span>
            )}
          </div>
          <div className="max-w-[180px]">
            <h3 className="text-xs sm:text-[13px] font-semibold text-[#0C3058] m-0 line-clamp-2 leading-tight">
              {uni.isCourseOffering ? uni.title : uni.name}
            </h3>
            {uni.isCourseOffering && uni.uniName && (
              <p className="text-[10px] font-medium text-teal-700 m-0 leading-tight mt-0.5">{uni.uniName}</p>
            )}
          </div>
        </div>
      ),
      dataIndex: uni._id || uni.slug || `col-${idx}`,
      key: uni._id || uni.slug || `col-${idx}`,
      align: "center",
      width: uw,
      className: "text-center text-xs md:text-sm font-medium align-middle py-2.5 px-1.5 md:px-3.5",
      render: (_, record) => record.renderCell(uni, idx),
    }));

    return [featureCol, ...uniCols];
  }, [comparedData]);

  const tableDataSource = useMemo(() => {
    if (!comparedData?.length) return [];
    const cName = selectedCourse && selectedCourse !== "all" ? selectedCourse : null;

    const boolCell = (val) =>
      val === true ? <span className="text-[11px] text-emerald-600 font-semibold">Yes</span>
        : val === false ? <span className="text-[11px] text-slate-500 font-medium">No</span>
          : <span className="text-slate-400 text-[11px]">-</span>;

    const tagCell = (val) =>
      val ? <span className="text-[11px] text-slate-600 font-medium">{val}</span>
        : <span className="text-slate-400 text-[11px]">-</span>;

    const listTags = (arr) => {
      const uniqueArr = Array.from(new Set(
        (arr || []).map((s) => typeof s === "object" ? s.name || s.title : s).filter(Boolean)
      ));
      return uniqueArr.length
        ? <span className="text-[11px] text-slate-600 font-medium leading-relaxed max-w-[280px] inline-block text-center">{uniqueArr.join(", ")}</span>
        : <span className="text-slate-400 text-[11px]">-</span>;
    };

    const bulletList = (arr, icon, iconClass) =>
      arr?.length
        ? <ul className="space-y-1.5 m-0 p-0 list-none text-[11px] text-slate-600 inline-block text-left max-w-[280px]">
          {arr.map((item, i) => (
            <li key={i} className="flex items-start gap-1.5">
              {React.createElement(icon, { className: `${iconClass} text-[10px] mt-0.5 shrink-0` })}
              <span>{item}</span>
            </li>
          ))}
        </ul>
        : <span className="text-slate-400">-</span>;

    const courseRows = cName
      ? [
        {
          key: `crs_name`,
          icon: <BookOutlined className="text-blue-600" />,
          featureTitle: `Selected Course`,
          renderCell: (uni) => {
            const off = findCourseOffering(uni, cName);
            return off?.course_name ? (
              <span className="font-semibold text-[#0C3058] text-[11px] leading-snug">{off.course_name}</span>
            ) : (
              <span className="text-slate-600 font-medium text-[11px]">{cName.toUpperCase()}</span>
            );
          },
        },
        {
          key: `crs_avail`,
          icon: <CheckCircleFilled className="text-emerald-500" />,
          featureTitle: "Course Availability",
          renderCell: (uni) => {
            const off = findCourseOffering(uni, cName);
            return off ? (
              <span className="text-[11px] text-emerald-600 font-semibold">Offered</span>
            ) : (
              <span className="text-[11px] text-slate-400 font-medium">Not Offered</span>
            );
          },
        },
        {
          key: `crs_fees`,
          icon: <DollarOutlined className="text-emerald-600" />,
          featureTitle: "Fees per Semester",
          renderCell: (uni) => {
            const off = findCourseOffering(uni, cName);
            if (off?.fee_per_semester) {
              return <span className="text-[11px] text-emerald-700 font-semibold">{off.fee_per_semester}</span>;
            }
            if (off?.full_course_fee) {
              return <span className="text-[11px] text-emerald-700 font-semibold">{off.full_course_fee}</span>;
            }
            return <span className="text-slate-400 font-medium text-[11px]">{off ? "Available on Inquiry" : "-"}</span>;
          },
        },
        {
          key: `crs_full_fees`,
          icon: <CreditCardOutlined className="text-blue-600" />,
          featureTitle: "Total / Full Course Fee",
          renderCell: (uni) => {
            const off = findCourseOffering(uni, cName);
            return off?.full_course_fee ? (
              <span className="text-slate-600 font-medium text-[11px]">{off.full_course_fee}</span>
            ) : (
              <span className="text-slate-400 font-medium text-[11px]">{off ? "Available on Inquiry" : "-"}</span>
            );
          },
        },
        {
          key: `crs_disc`,
          icon: <DollarOutlined className="text-orange-500" />,
          featureTitle: "Fees Discount & Scholarships",
          renderCell: (uni) => {
            const off = findCourseOffering(uni, cName);
            return off ? (
              <span className="text-[11px] text-slate-600 font-medium">
                {off.fee_discount || "Upto 20% Available"}
              </span>
            ) : (
              <span className="text-slate-400 text-[11px]">-</span>
            );
          },
        },
        {
          key: `crs_spec`,
          icon: <BookOutlined className="text-purple-600" />,
          featureTitle: "Specializations Offered",
          renderCell: (uni) => {
            const off = findCourseOffering(uni, cName);
            if (!off) return <span className="text-slate-400 text-[11px]">-</span>;
            return off.specializations?.length ? (
              listTags(off.specializations)
            ) : (
              <span className="text-slate-600 font-medium text-[11px]">Standard / Core Specialization</span>
            );
          },
        },
        {
          key: `crs_dur`,
          icon: <ClockCircleOutlined className="text-blue-600" />,
          featureTitle: "Course Duration",
          renderCell: (uni) => {
            const off = findCourseOffering(uni, cName);
            return off?.duration ? (
              <span className="font-medium text-slate-600 text-[11px]">{off.duration}</span>
            ) : (
              <span className="text-slate-600 font-medium text-[11px]">{off ? "2–3 Years" : "-"}</span>
            );
          },
        },
        {
          key: `crs_elig`,
          icon: <SafetyCertificateOutlined className="text-blue-600" />,
          featureTitle: "Eligibility Criteria",
          renderCell: (uni) => {
            const off = findCourseOffering(uni, cName);
            return off?.eligibility ? (
              <span className="text-slate-600 font-medium text-[11px] leading-snug">{off.eligibility}</span>
            ) : (
              <span className="text-slate-600 font-medium text-[11px]">{off ? "10+2 / Graduation from recognized board" : "-"}</span>
            );
          },
        },
        {
          key: `crs_rating`,
          icon: <TrophyOutlined className="text-amber-500" />,
          featureTitle: "Course Rating",
          renderCell: (uni) => {
            const off = findCourseOffering(uni, cName);
            return off ? (
              <span className="text-[11px] text-amber-600 font-semibold">
                ★ {off.rating || "4.5"} / 5
              </span>
            ) : (
              <span className="text-slate-400 text-[11px]">-</span>
            );
          },
        },
      ]
      : [
        {
          key: `courses_offered`,
          icon: <BookOutlined className="text-blue-600" />,
          featureTitle: "Courses Offered",
          renderCell: (u) => {
            const coursesList = (u.courses || []).map((c) => c?.name || c).filter(Boolean);
            const fallback = Array.isArray(u.coursesOffered) ? u.coursesOffered : [];
            const allC = coursesList.length > 0 ? coursesList : fallback;
            return allC.length > 0 ? listTags(allC) : <span className="text-slate-400 text-[11px]">-</span>;
          },
        },
      ];

    const uniRows = [
      { key: "ownership", icon: <BankOutlined className="text-blue-600" />, featureTitle: "Ownership Type", renderCell: (u) => listTags(Array.isArray(u.ownership_type) ? u.ownership_type : u.ownership_type ? [u.ownership_type] : []) },
      { key: "location", icon: <GlobalOutlined className="text-blue-600" />, featureTitle: "University Location", renderCell: (u) => <span className="text-slate-600 font-medium text-[11px]">{u.location || "-"}</span> },
      { key: "est_year", icon: <ClockCircleOutlined className="text-blue-600" />, featureTitle: "Year of Establishment", renderCell: (u) => <span className="font-medium text-slate-600 text-[11px]">{u.established_year || "-"}</span> },
      { key: "rating", icon: <TrophyOutlined className="text-amber-500" />, featureTitle: "Overall University Rating", renderCell: (u) => { const r = u.rating || u.avg_rating || 4.5; return <span className="text-[11px] text-amber-600 font-semibold">★ {r} / 5</span>; } },
      {
        key: "naac",
        icon: <SafetyCertificateOutlined className="text-blue-600" />,
        featureTitle: "NAAC Grade",
        renderCell: (u) => {
          const naac = u.naac_rating;
          const grade = typeof naac === "object" ? naac?.grade || naac?.name : naac;
          return grade ? (
            <span className="text-[11px] text-slate-700 font-semibold">{grade}</span>
          ) : (
            <span className="text-slate-400 text-[11px]">-</span>
          );
        },
      },
      {
        key: "nirf",
        icon: <TrophyOutlined className="text-purple-600" />,
        featureTitle: "NIRF Ranking",
        renderCell: (u) => {
          const nirf = u.nirf_rank;
          const rank = typeof nirf === "object" ? nirf?.rank || nirf?.name : nirf;
          return rank ? (
            <span className="text-[11px] text-slate-700 font-semibold">{rank}</span>
          ) : (
            <span className="text-slate-400 text-[11px]">-</span>
          );
        },
      },
      { key: "placement_pkg", icon: <DollarOutlined className="text-emerald-600" />, featureTitle: "Average Placement Package", renderCell: (u) => tagCell(u.avg_placement_package) },
      { key: "placement", icon: <TrophyOutlined className="text-blue-600" />, featureTitle: "Placement Assistance", renderCell: (u) => boolCell(u.placement_assistance) },
      { key: "emi", icon: <CreditCardOutlined className="text-blue-600" />, featureTitle: "EMI Facility", renderCell: (u) => boolCell(u.emi_available) },
      { key: "scholarship", icon: <DollarOutlined className="text-blue-600" />, featureTitle: "Scholarship Opportunities", renderCell: (u) => boolCell(u.scholarship_available) },
      { key: "mode", icon: <BookOutlined className="text-blue-600" />, featureTitle: "Mode of Education", renderCell: (u) => <span className="text-slate-600 font-medium text-[11px]">{(typeof u.mode === "object" ? u.mode?.name : u.mode) || "-"}</span> },
      { key: "exam_mode", icon: <LaptopOutlined className="text-blue-600" />, featureTitle: "Examination Mode", renderCell: (u) => listTags(Array.isArray(u.exam_mode) ? u.exam_mode : u.exam_mode ? [u.exam_mode] : []) },
      {
        key: "approvals",
        icon: <SafetyCertificateOutlined className="text-blue-600" />,
        featureTitle: "Accreditations & Approvals",
        renderCell: (u) => {
          const apps = (Array.isArray(u.approvals) ? u.approvals : []).filter(Boolean);
          if (!apps.length) return <span className="text-slate-400 text-[11px]">-</span>;
          const logoApps = apps.filter((a) => typeof a === "object" && getAssetPath(a.logo));
          const textApps = apps
            .filter((a) => typeof a !== "object" || !getAssetPath(a.logo))
            .map((a) => (typeof a === "object" ? a.name || a.code || a.title : a))
            .filter(Boolean);

          return (
            <div className="flex flex-wrap items-center justify-center">
              {logoApps.map((a, i) => {
                const name = a.name || a.code || a.title;
                const logo = getAssetPath(a.logo);
                return (
                  <div
                    key={i}
                    title={name}
                    className="relative w-12 h-8 sm:w-14 sm:h-9 flex items-center justify-center shrink-0"
                  >
                    <Image
                      src={logo}
                      alt={name}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                );
              })}
              {textApps.map((text, i) => (
                <span
                  key={i}
                  className="inline-flex items-center justify-center h-8 sm:h-9 px-2 text-[10px]"
                >
                  {text}
                </span>
              ))}
            </div>
          );
        },
      },
      { key: "highlights", icon: <CheckCircleFilled className="text-emerald-600" />, featureTitle: "Key University Highlights", renderCell: (u) => bulletList(u.highlights, CheckOutlined, "text-emerald-500") },
      { key: "advantages", icon: <LikeOutlined className="text-emerald-600" />, featureTitle: "Advantages", renderCell: (u) => bulletList(u.advantages, CheckOutlined, "text-emerald-500") },
      { key: "disadvantages", icon: <DislikeOutlined className="text-rose-500" />, featureTitle: "Disadvantages", renderCell: (u) => bulletList(u.disadvantages, CloseOutlined, "text-rose-500") },
      { key: "lms", icon: <LaptopOutlined className="text-blue-600" />, featureTitle: "Learning Platform - LMS", renderCell: (u) => boolCell(u.lms_available) },
      { key: "live_cls", icon: <VideoCameraOutlined className="text-blue-600" />, featureTitle: "Live Classes Available", renderCell: (u) => boolCell(u.live_classes) },
      { key: "study_mat", icon: <BookOutlined className="text-blue-600" />, featureTitle: "Study Material", renderCell: (u) => <span className="text-slate-600 font-medium text-[11px]">{u.study_material === "Both" ? "Digital & Printed" : (u.study_material || "-")}</span> },
      { key: "recorded", icon: <VideoCameraOutlined className="text-purple-600" />, featureTitle: "Recorded Lectures", renderCell: (u) => boolCell(u.recorded_lectures) },
      { key: "placement_p", icon: <TeamOutlined className="text-emerald-600" />, featureTitle: "Placement Partners", renderCell: (u) => listTags(u.placement_partners) },
    ];

    return [...courseRows, ...uniRows];
  }, [comparedData, selectedCourse, openFormModal]);



  // ── JSX ──────────────────────────────────────────────────────────────────
  const currentSlots = compareList?.length > 0 ? compareList : comparedData;
  const hasSlots = Boolean(currentSlots?.length > 0 && currentSlots.some(Boolean));

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* ── HERO & SELECTOR GROUP ── */}
      <div className="relative">
        {/* Dark Blue Curved Backdrop */}
        <div className="absolute inset-x-0 top-0 h-60 sm:h-65 bg-[#0F3759] border-b border-gray-200" />
        {/* Content Container (Natural Flow - No -mt needed) */}
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Header Title & Search Input */}
          <div className="max-w-2xl mx-auto text-center text-white space-y-4 p-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold m-0 tracking-tight leading-[1.1]">
              <span className="text-[#FFB800] block">Compare Universities &amp;</span>
              <span className="text-white block">Choose Best For You!</span>
            </h1>
            {/* Course Selector */}
            <div className="max-w-2xl mx-auto mt-2">
              <Select
                showSearch
                size="large"
                allowClear
                value={selectedCourse}
                onChange={handleCourseChange}
                placeholder="Select Course to Compare.... MBA, MCA..."
                className="w-full rounded-4xl text-left font-normal text-gray-500 bg-white"
                options={courseSelectOptions}
                optionFilterProp="label"
                filterOption={(input, opt) => (opt?.label ?? "").toLowerCase().includes(input.toLowerCase())}
              />
            </div>
          </div>

          {/* Selector Card (Clean card with normal padding and margin) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-2 sm:p-4 text-center">
            <p className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider m-0 text-center">
              CHOOSE WHAT YOU WANT TO COMPARE
            </p>
            {hasSlots ? (
              <div>
                {/* 3 Slots */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-4 my-2 sm:my-4">
                  {[0, 1, 2].map((slotIdx) => {
                    const uni = currentSlots[slotIdx];
                    if (uni) {
                      const isOffering = uni.isCourseOffering || uni.type === "course_offering";
                      const displayTitle = isOffering ? uni.title : uni.name;
                      const rawImage = uni.image || uni.imageUrl || uni.imageSrc || uni.coursepageimage || uni.bannerImg || null;
                      return (
                        <div key={slotIdx} id={`uni-slot-${slotIdx}`} className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-1.5 pt-4 sm:p-4 sm:pt-4 flex flex-col items-center justify-center relative group transition-all">
                          <button onClick={() => handleRemoveUniversity(uni.slug || uni._id || uni.id)} className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-100 hover:bg-red-500 text-slate-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10" title="Remove">
                            <CloseOutlined className="text-[7px] sm:text-[9px]" />
                          </button>
                          <div className="relative w-full max-w-[75px] sm:max-w-40 md:max-w-45 h-8 sm:h-12 md:h-14 flex items-center justify-center mb-1 sm:mb-2">
                            {rawImage ? (
                              <Image
                                src={getAssetPath(rawImage)}
                                alt={displayTitle || "Image"}
                                fill
                                unoptimized
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-xs sm:text-sm font-semibold text-[#0C3058]">{displayTitle}</span>
                            )}
                          </div>
                          <h4 className="text-[10px] sm:text-xs font-semibold text-[#0C3058] m-0 leading-snug text-center w-full px-0.5 break-words">{displayTitle}</h4>
                          {isOffering && uni.uniName && <p className="text-[9px] sm:text-[10px] font-medium text-teal-700 m-0 leading-snug text-center w-full px-0.5 mt-0.5 break-words">{uni.uniName}</p>}
                        </div>
                      );
                    }
                    return (
                      <div key={slotIdx} id={`uni-slot-${slotIdx}`} className="border border-dashed border-blue-200/90 rounded-xl sm:rounded-2xl p-1.5 sm:p-4 flex flex-col items-center justify-center text-gray-400 bg-white transition-all min-h-[90px] sm:min-h-[140px] gap-1 sm:gap-2.5">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs sm:text-base">+</div>
                        {slotSelectOptions.length > 0 && (
                          <Select
                            showSearch
                            placeholder="Select"
                            value={null}
                            onChange={(_, option) => { if (option?.itemObj) triggerFlyAnimation(option.itemObj, slotIdx); }}
                            className="w-full max-w-[90px] sm:max-w-50 text-left font-medium [&_.ant-select-selector]:rounded-xl! text-[10px] sm:text-sm"
                            options={slotSelectOptions}
                            optionFilterProp="searchValue"
                            filterOption={(input, opt) => (opt?.searchValue ?? "").toLowerCase().includes(input.toLowerCase())}
                            styles={{ popup: { root: { maxHeight: 300, overflowY: "auto", borderRadius: 16, padding: 4 } } }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Show Me All Universities to Compare button */}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={openUniversityModal}
                    className="inline-flex items-center gap-1.5 text-sm md:text-base text-slate-700 hover:text-blue-600 transition-colors font-normal cursor-pointer bg-transparent border-none py-1.5 px-3 group"
                  >
                    <span className="text-slate-600 group-hover:text-blue-600">
                      Show Me <strong className="font-bold text-[#0C3058] group-hover:text-blue-700">All Universities</strong> to Compare
                    </span>
                    <RightOutlined className="text-xs text-slate-500 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2 pb-1">
                {/* 4 Category Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 my-3 sm:my-4">
                  {/* 1. Trending Universities */}
                  <div
                    onClick={() => openUniversityModal("trending")}
                    className="p-3 sm:p-5 rounded-2xl border border-blue-200 bg-blue-50/20 hover:border-blue-500 hover:bg-blue-50/40 hover:shadow-md cursor-pointer transition-all flex flex-col items-center justify-between text-center group min-h-[140px] sm:min-h-[160px]"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-1 sm:mb-2">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 group-hover:scale-105 transition-transform" viewBox="0 0 48 48" fill="none">
                        <rect x="6" y="26" width="8" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" />
                        <rect x="20" y="18" width="8" height="24" rx="2" stroke="currentColor" strokeWidth="2.5" />
                        <rect x="34" y="10" width="8" height="32" rx="2" stroke="currentColor" strokeWidth="2.5" />
                        <path d="M8 20L22 10L36 4M36 4H26M36 4V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[11px] sm:text-sm font-bold text-[#0C3058] group-hover:text-blue-700 tracking-wide m-0 mb-1 leading-tight">
                        TRENDING UNIVERSITIES
                      </h4>
                      <p className="text-[9.5px] sm:text-[11px] text-slate-400 m-0 leading-tight">
                        Compare with popular and in-demand universities.
                      </p>
                    </div>
                  </div>

                  {/* 2. Recommended Universities */}
                  <div
                    onClick={() => openUniversityModal("recommended")}
                    className="p-3 sm:p-5 rounded-2xl border border-amber-200 bg-amber-50/20 hover:border-amber-500 hover:bg-amber-50/40 hover:shadow-md cursor-pointer transition-all flex flex-col items-center justify-between text-center group min-h-[140px] sm:min-h-[160px]"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-1 sm:mb-2">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 group-hover:scale-105 transition-transform" viewBox="0 0 48 48" fill="none">
                        <path d="M12 14l1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4L12 14z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M24 7l1.5 3 3.5.5-2.5 2.5.6 3.5-3.1-1.6-3.1 1.6.6-3.5-2.5-2.5 3.5-.5L24 7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M36 14l1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4L36 14z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M14 26v16h-6a2 2 0 01-2-2V28a2 2 0 012-2h6zm4 16h16a3 3 0 003-2.6l2-10a3 3 0 00-3-3.4H28v-6a4 4 0 00-4-4l-6 10v16z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[11px] sm:text-sm font-bold text-[#0C3058] group-hover:text-amber-700 tracking-wide m-0 mb-1 leading-tight">
                        RECOMMENDED UNIVERSITIES
                      </h4>
                      <p className="text-[9.5px] sm:text-[11px] text-slate-400 m-0 leading-tight">
                        Compare with popular and in-demand universities.
                      </p>
                    </div>
                  </div>

                  {/* 3. State Wise Universities */}
                  <div
                    onClick={() => openUniversityModal("state")}
                    className="p-3 sm:p-5 rounded-2xl border border-rose-200 bg-rose-50/20 hover:border-rose-500 hover:bg-rose-50/40 hover:shadow-md cursor-pointer transition-all flex flex-col items-center justify-between text-center group min-h-[140px] sm:min-h-[160px]"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-1 sm:mb-2">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500 group-hover:scale-105 transition-transform" viewBox="0 0 48 48" fill="none">
                        <path d="M24 6C16.268 6 10 12.268 10 20c0 9.844 12.7 20.563 13.234 21.027a1.167 1.167 0 001.532 0C25.3 40.563 38 29.844 38 20c0-7.732-6.268-14-14-14z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="24" cy="20" r="5" stroke="currentColor" strokeWidth="2.5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[11px] sm:text-sm font-bold text-[#0C3058] group-hover:text-rose-700 tracking-wide m-0 mb-1 leading-tight">
                        STATE WISE UNIVERSITIES
                      </h4>
                      <p className="text-[9.5px] sm:text-[11px] text-slate-400 m-0 leading-tight">
                        Compare with popular and in-demand universities.
                      </p>
                    </div>
                  </div>

                  {/* 4. Accreditation Wise Universities */}
                  <div
                    onClick={() => openUniversityModal("accreditation")}
                    className="p-3 sm:p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 hover:border-emerald-500 hover:bg-emerald-50/40 hover:shadow-md cursor-pointer transition-all flex flex-col items-center justify-between text-center group min-h-[140px] sm:min-h-[160px]"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-1 sm:mb-2">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500 group-hover:scale-105 transition-transform" viewBox="0 0 48 48" fill="none">
                        <path d="M24 6l3 3 4.2-.8 1.6 4 4.1 1.2.2 4.3 3.4 2.6-1.3 4.1 2.1 3.7-2.6 3.4.8 4.2-3.8 2.1-.7 4.2-4.3.7-2.1 3.7-4.1-1.3-3.4 2.7-.2-4.3-4.1-1.2-1.6-4-4.2.8-3-3 .8-4.2-2.1-3.7 2.6-3.4-.8-4.2 3.8-2.1.7-4.2 4.3-.7 2.1-3.7 4.1 1.3 3.4-2.7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M17 24l5 5 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[11px] sm:text-sm font-bold text-[#0C3058] group-hover:text-emerald-700 tracking-wide m-0 mb-1 leading-tight">
                        ACCREDITATION WISE UNIVERSITIES
                      </h4>
                      <p className="text-[9.5px] sm:text-[11px] text-slate-400 m-0 leading-tight">
                        Compare with popular and in-demand universities.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full border-t border-slate-100 my-4" />

                {/* Show Me All Universities to Compare button */}
                <div>
                  <button
                    type="button"
                    onClick={() => openUniversityModal("all")}
                    className="inline-flex items-center gap-1.5 text-sm md:text-base text-slate-700 hover:text-blue-600 transition-colors font-normal cursor-pointer bg-transparent border-none py-1.5 px-3 group"
                  >
                    <span className="text-slate-600 group-hover:text-blue-600">
                      Show Me <strong className="font-bold text-[#0C3058] group-hover:text-blue-700">All Universities</strong> to Compare
                    </span>
                    <RightOutlined className="text-xs text-slate-500 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── COMPARISON MATRIX ── */}
      <div id="comparison-matrix-section" className="max-w-7xl mx-auto p-5">
        {comparedData.length > 0 ? (
          <div>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl overflow-hidden shadow-md">
              <Table columns={tableColumns} dataSource={tableDataSource} pagination={false} bordered size="small" scroll={{ x: "max-content" }} rowKey="key" className="w-full" />
              {/* Single Centered Footer Row of Buttons */}
              <div className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 border-t border-slate-200">
                <Button
                  size="small"
                  type="primary"
                  onClick={() => openFormModal({ title: `Apply Now - ${comparedData.map((u) => u.name).filter(Boolean).join(" vs ")}`, subtitle: "Fill your details to get free expert 1:1 counseling", defaultCourse: selectedCourse || "General Counseling" })}
                  className="bg-[#00B4D8] hover:bg-[#0096C7] border-none font-semibold text-[11px] sm:text-xs rounded-xl cursor-pointer"
                >
                  Apply Now
                </Button>
                {comparedData[0]?.slug && (
                  <Link href={`/universities/${comparedData[0].slug}`}>
                    <Button
                      size="small"
                      className="bg-[#0C3058] text-white hover:bg-[#0a2540] border-none font-semibold text-[11px] sm:text-xs rounded-xl cursor-pointer"
                    >
                      View Details
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden bg-white rounded-2xl border border-slate-200/90 overflow-hidden">
              <div className={`grid grid-cols-${comparedData.length} divide-x divide-slate-200 bg-white border-b border-slate-200`}>
                {comparedData.map((uni, idx) => (
                  <div key={idx} className="p-2 flex flex-col items-center text-center relative min-h-[85px] gap-1">
                    <button onClick={() => handleRemoveUniversity(uni.slug || uni._id)} className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-100 hover:bg-red-500 text-slate-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10">
                      <CloseOutlined className="text-[7px]" />
                    </button>
                    <div className="w-8 h-8 rounded-lg border border-slate-200 bg-white p-0.5 flex items-center justify-center relative">
                      {uni.logo ? <Image src={getAssetPath(uni.logo)} alt={uni.name || "Logo"} fill unoptimized className="object-contain p-0.5" /> : <span className="text-xs font-bold text-[#1C3569]">{(uni.name || "U")[0]}</span>}
                    </div>
                    <h4 className="text-[11px] font-bold text-[#1C3569] m-0 line-clamp-2 leading-tight">{uni.isCourseOffering ? uni.title : uni.name}</h4>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-slate-100">
                {tableDataSource.map((row) => (
                  <div key={row.key}>
                    <div className="bg-[#f0f5ff] py-2 px-3 text-center border-t border-b border-slate-200 text-slate-700 font-medium text-[11px] tracking-wider uppercase">
                      <span>{row.featureTitle}</span>
                    </div>
                    <div className={`grid grid-cols-${comparedData.length} divide-x divide-slate-200 bg-white text-center text-xs font-bold text-slate-800`}>
                      {comparedData.map((uni, idx) => (
                        <div key={idx} className="p-2.5 flex items-center justify-center min-h-[48px] overflow-hidden">
                          {row.renderCell ? row.renderCell(uni, idx) : "-"}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Single Centered Footer Row of Buttons on Mobile */}
              <div className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-50 border-t border-slate-200">
                <Button
                  size="small"
                  type="primary"
                  onClick={() => openFormModal({ title: `Apply Now - ${comparedData.map((u) => u.name).filter(Boolean).join(" vs ")}`, subtitle: "Fill your details to get free expert 1:1 counseling", defaultCourse: selectedCourse || "General Counseling" })}
                  className="bg-[#00B4D8] hover:bg-[#0096C7] border-none font-semibold text-[11px] sm:text-xs rounded-xl cursor-pointer"
                >
                  Apply Now
                </Button>
                {comparedData[0]?.slug && (
                  <Link href={`/universities/${comparedData[0].slug}`}>
                    <Button
                      size="small"
                      className="bg-[#0C3058] text-white hover:bg-[#0a2540] border-none font-semibold text-[11px] sm:text-xs rounded-xl cursor-pointer"
                    >
                      View Details
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200/80">
            <Empty description={<div className="space-y-1"><p className="text-base font-bold text-slate-700 m-0">No Universities Selected</p><p className="text-xs text-slate-500 m-0">Select a course above and pick universities to compare.</p></div>} />
          </div>
        )}
      </div>
      {/* ── CTA ── */}
      {/* <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-[#0F3759] via-[#103D6D] to-[#154E8A] text-white rounded-2xl sm:rounded-3xl p-8 md:p-6 text-center relative overflow-hidden border border-gray-200">
          <div className="relative z-10 space-y-3">
            <h2 className="text-2xl md:text-3xl font-semibold m-0 text-white">Still Have Confusion?</h2>
            <p className="text-sm md:text-base text-blue-100 max-w-xl mx-auto m-0 font-normal">You Need A Career Expert Who Will Guide You to choose Best fit for you</p>
            <div className="pt-4">
              <Button type="primary" size="large" onClick={() => openFormModal({ title: "Book 1:1 Free Counseling", subtitle: "Speak with an academic expert to choose the best university for your career", defaultCourse: selectedCourse || "General Counseling" })} className="bg-[#00B4D8] hover:bg-[#0096C7] text-white font-semibold text-sm md:text-base px-8 h-11 rounded-xl border-none cursor-pointer inline-flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center"><PhoneOutlined className="rotate-90 text-xs" /></span>
                Book 1:1 Free Counseling
              </Button>
            </div>
          </div>
        </div>
      </div> */}

      {/* ── FLY ANIMATION ── */}
      {flyingLogo && (
        <div
          style={{
            position: "fixed", zIndex: 99999, pointerEvents: "none",
            top: flyingLogo.isAnimating ? flyingLogo.target.top : flyingLogo.start.top,
            left: flyingLogo.isAnimating ? flyingLogo.target.left : flyingLogo.start.left,
            width: flyingLogo.isAnimating ? flyingLogo.target.width : flyingLogo.start.width,
            height: flyingLogo.isAnimating ? flyingLogo.target.height : flyingLogo.start.height,
            opacity: flyingLogo.isAnimating ? 1 : 0.95,
            transform: flyingLogo.isAnimating ? "scale(1)" : "scale(1.08) rotate(-3deg)",
            transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="rounded-2xl border-2 border-blue-500 bg-white p-2 flex items-center justify-center shadow-2xl"
        >
          {flyingLogo.logo
            ? <div className="relative w-full h-full"><Image src={getAssetPath(flyingLogo.logo)} alt={flyingLogo.name || "Logo"} fill unoptimized className="object-contain p-1" /></div>
            : <span className="text-base font-black text-[#1C3569]">{flyingLogo.name ? flyingLogo.name[0] : "U"}</span>
          }
        </div>
      )}

      {/* ── ALL UNIVERSITIES MODAL ── */}
      <Modal
        open={isUniModalOpen}
        onCancel={() => setIsUniModalOpen(false)}
        width={960}
        centered
        destroyOnHidden={false}
        closable={false}
        footer={
          <div className="flex items-center justify-end w-full">
            <button
              type="button"
              onClick={handleApplyCompareFromModal}
              disabled={modalSelectedUnis.length === 0}
              className={`font-medium rounded-2xl py-1.5 px-3 border-none text-xs sm:text-sm inline-flex items-center gap-1.5 transition-all ${modalSelectedUnis.length > 0
                ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                : "bg-blue-100 text-blue-700 cursor-not-allowed"
                }`}
            >
              Compare Now <ArrowRightOutlined className="text-[10px]" />
            </button>
          </div>
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 pb-2">
          {modalMode === "state" && selectedModalState ? (
            <button
              type="button"
              onClick={() => { setSelectedModalState(null); setModalSearch(""); }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-rose-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-xl border-none cursor-pointer transition-colors"
            >
              <ArrowLeftOutlined className="text-[10px]" /> Back to States
            </button>
          ) : modalMode === "accreditation" && selectedModalApproval ? (
            <button
              type="button"
              onClick={() => { setSelectedModalApproval(null); setModalSearch(""); }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-emerald-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-xl border-none cursor-pointer transition-colors"
            >
              <ArrowLeftOutlined className="text-[10px]" /> Back to Accreditations
            </button>
          ) : (
            <div className="w-7 shrink-0" />
          )}

          <div className="flex items-center justify-center gap-2 flex-1 max-w-sm mx-auto text-center">
            {modalMode === "state" && selectedModalState ? (
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0C3058] truncate">
                Universities in {selectedModalState.name}
              </span>
            ) : modalMode === "accreditation" && selectedModalApproval ? (
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0C3058] truncate">
                Universities with {selectedModalApproval.code || selectedModalApproval.name}
              </span>
            ) : (
              <>
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {modalMode === "state"
                    ? "SELECT STATE TO COMPARE"
                    : modalMode === "accreditation"
                      ? "SELECT ACCREDITATION TO COMPARE"
                      : modalMode === "trending"
                        ? "TRENDING UNIVERSITIES"
                        : modalMode === "recommended"
                          ? "RECOMMENDED UNIVERSITIES"
                          : "SELECT ANY UNIVERSITY TO COMPARE"}
                </span>
                <div className="h-px bg-slate-200 flex-1" />
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsUniModalOpen(false)}
            className="w-7 h-7 text-gray-700 hover:text-slate-900 flex items-center justify-center transition-colors border-none bg-transparent cursor-pointer p-0 shrink-0"
            title="Close"
          >
            <CloseOutlined className="text-sm" />
          </button>
        </div>

        {/* Quick Search Input */}
        <div className="pb-3 px-1">
          <Input.Search
            placeholder={
              modalMode === "state" && !selectedModalState
                ? "Search states (e.g. Delhi, Maharashtra)..."
                : modalMode === "accreditation" && !selectedModalApproval
                  ? "Search accreditations (e.g. UGC, NAAC, AICTE)..."
                  : modalMode === "state" && selectedModalState
                    ? `Search universities in ${selectedModalState.name}...`
                    : modalMode === "accreditation" && selectedModalApproval
                      ? `Search universities with ${selectedModalApproval.code || selectedModalApproval.name}...`
                      : "Search universities..."
            }
            value={modalSearch}
            onChange={(e) => setModalSearch(e.target.value)}
            onSearch={(val) => setModalSearch(val)}
            allowClear
            className="w-full rounded-xl"
          />
        </div>

        {/* Modal Body: States, Accreditations, or Universities */}
        <div className="max-h-[55vh] overflow-y-auto px-1 py-1">
          {modalLoading ? (
            <div className="flex items-center justify-center py-16 text-slate-400 text-sm gap-2">
              <span className="inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Loading...
            </div>
          ) : modalMode === "state" && !selectedModalState ? (
            /* States Selection Grid */
            filteredStates.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No states found matching "{modalSearch}"
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                {filteredStates.map((st) => {
                  const rawLogo = st.logo || null;
                  return (
                    <div
                      key={st._id || st.slug || st.name}
                      onClick={() => { setSelectedModalState(st); setModalSearch(""); }}
                      className="p-2 sm:p-2.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col items-center justify-between min-h-36.25 sm:min-h-38.75 cursor-pointer bg-white relative group"
                    >
                      <div className="relative w-full h-14 sm:h-16 flex items-center justify-center p-1">
                        {rawLogo ? (
                          <Image src={getAssetPath(rawLogo)} alt={st.name} fill unoptimized className="object-contain" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                            <EnvironmentOutlined className="text-lg" />
                          </div>
                        )}
                      </div>
                      <h4 className="text-[11px] sm:text-xs font-semibold text-[#0C3058] group-hover:text-blue-600 text-center line-clamp-2 leading-snug px-1 min-h-[28px] sm:min-h-[32px] flex items-center justify-center m-0 mt-1">
                        {st.name}
                      </h4>
                      <div className="w-full border-t border-slate-100 my-1" />
                      <div className="text-center w-full">
                        <span className="text-[11px] sm:text-xs font-semibold text-blue-500 group-hover:text-blue-600 transition-colors">
                          {st.count > 0 ? `${st.count} Universities` : "Explore"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : modalMode === "accreditation" && !selectedModalApproval ? (
            /* Accreditations Selection Grid */
            filteredApprovals.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                {modalSearch ? `No accreditations found matching "${modalSearch}"` : "No accreditations available for comparison."}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                {filteredApprovals.map((app) => {
                  const rawLogo = app.logo || app.image || null;
                  return (
                    <div
                      key={app._id || app.slug || app.name}
                      onClick={() => { setSelectedModalApproval(app); setModalSearch(""); }}
                      className="p-2 sm:p-2.5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all flex flex-col items-center justify-between min-h-36.25 sm:min-h-38.75 cursor-pointer bg-white relative group"
                    >
                      <div className="relative w-full h-14 sm:h-16 flex items-center justify-center p-1">
                        {rawLogo ? (
                          <Image src={getAssetPath(rawLogo)} alt={app.name || app.code} fill unoptimized className="object-contain" />
                        ) : (
                          <span className="text-base sm:text-lg font-bold text-[#0C3058] bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1">
                            {app.code || (app.name || "A").slice(0, 4)}
                          </span>
                        )}
                      </div>
                      <h4 className="text-[11px] sm:text-xs font-semibold text-[#0C3058] group-hover:text-blue-600 text-center line-clamp-2 leading-snug px-1 min-h-[28px] sm:min-h-[32px] flex items-center justify-center m-0 mt-1">
                        {app.code || app.name}
                      </h4>
                      <div className="w-full border-t border-slate-100 my-1" />
                      <div className="text-center w-full">
                        <span className="text-[11px] sm:text-xs font-semibold text-blue-500 group-hover:text-blue-600 transition-colors">
                          {app.count > 0 ? `${app.count} Universities` : "Explore"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* Universities Grid (State Universities, Accreditation Universities, Trending, Recommended, All) */
            displayedModalUniversities.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                No universities found {modalSearch ? `matching "${modalSearch}"` : "for this category"}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                {displayedModalUniversities.map((uni) => {
                  const selected = isModalUniSelected(uni);
                  const disabled = !selected && modalSelectedUnis.length >= 3;
                  const rawLogo = uni.logo || uni.image || null;
                  return (
                    <div
                      key={uni._id || uni.slug}
                      onClick={() => { if (!disabled) handleToggleFromModal(uni); }}
                      className={`p-2 sm:p-2.5 rounded-2xl border transition-all flex flex-col items-center justify-between min-h-36.25 sm:min-h-38.75 cursor-pointer bg-white relative group ${selected
                        ? "border-blue-500 shadow-sm"
                        : disabled
                          ? "border-slate-200 opacity-40 cursor-not-allowed"
                          : "border-slate-200 hover:border-blue-400 hover:shadow-sm"
                        }`}
                    >
                      {/* Logo */}
                      <div className="relative w-full h-14 sm:h-16 flex items-center justify-center p-1">
                        {rawLogo ? (
                          <Image src={getAssetPath(rawLogo)} alt={uni.name || "University Logo"} fill unoptimized className="object-contain" />
                        ) : (
                          <span className="text-xl font-bold text-[#0C3058]">{(uni.name || "U")[0]}</span>
                        )}
                      </div>
                      {/* University Name */}
                      <h4 className="text-[11px] sm:text-xs font-semibold text-[#0C3058] text-center line-clamp-2 leading-snug px-1 min-h-[28px] sm:min-h-[32px] flex items-center justify-center m-0 mt-1">
                        {uni.name}
                      </h4>

                      {/* Divider */}
                      <div className="w-full border-t border-slate-100 my-1" />

                      {/* Bottom Action Text */}
                      <div className="text-center w-full">
                        <span className={`text-[11px] sm:text-xs font-semibold transition-colors ${selected ? "text-green-700" : "text-blue-500 group-hover:text-blue-600"}`}>
                          {selected ? "✓ Added to Compare" : "+ Add to Compare"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>
      </Modal>
    </div>
  );
}
