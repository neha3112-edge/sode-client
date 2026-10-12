"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Select, Tag, Empty, Table, Modal, Input } from "antd";
import {
  RightOutlined,
  SearchOutlined,
  ArrowRightOutlined,
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
  const { compareList, removeFromCompare, clearCompare, addToCompare } = useCompare();
  const { openFormModal } = useAppDrawer();

  // ── State ────────────────────────────────────────────────────────────────
  const allCourses = initialAllCourses?.length > 0 ? initialAllCourses : rawAllCourses || [];
  const allStates = initialAllStates?.length > 0 ? initialAllStates : rawAllStates || [];

  const [comparedData, setComparedData] = useState(initialComparedData);
  const [selectedCourse, setSelectedCourse] = useState(initialSelectedCourse || null);
  const [courseBasedUniversities, setCourseBasedUniversities] = useState(initialCourseUniversities);
  const [flyingLogo, setFlyingLogo] = useState(null);

  // ── Modal State ──────────────────────────────────────────────────────────
  const [isUniModalOpen, setIsUniModalOpen] = useState(false);
  const [modalUniversities, setModalUniversities] = useState(initialCourseUniversities || []);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSearch, setModalSearch] = useState("");

  // Sync server-delivered comparedData
  useEffect(() => {
    if (initialComparedData?.length > 0) setComparedData(initialComparedData);
  }, [initialComparedData]);

  // Keep modalUniversities synced if initialCourseUniversities provided
  useEffect(() => {
    if (initialCourseUniversities?.length > 0 && modalUniversities?.length === 0) {
      setModalUniversities(initialCourseUniversities);
    }
  }, [initialCourseUniversities]);



  // ── Identifiers ──────────────────────────────────────────────────────────
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

  // ── Course Select options (from API) ─────────────────────────────────────
  const courseSelectOptions = useMemo(() => {
    return (allCourses || [])
      .filter((c) => c?.name)
      .map((c) => ({ value: c.name, label: c.name }));
  }, [allCourses]);

  // ── Slot university options (from courseBasedUniversities) ───────────────
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

  // ── Helpers ──────────────────────────────────────────────────────────────


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

  // ── Modal Handlers ───────────────────────────────────────────────────────
  const openUniversityModal = async () => {
    setIsUniModalOpen(true);
    if (!modalUniversities || modalUniversities.length === 0) {
      setModalLoading(true);
      try {
        const res = await request.dynamicRead({
          entity: "universities",
          endPoint: "v1/compare",
          options: selectedCourse && selectedCourse !== "all" ? { course: selectedCourse } : {},
        });
        const unis = Array.isArray(res?.universities) ? res.universities : [];
        setModalUniversities(unis);
      } catch (err) {
        console.error("Failed to load universities for modal:", err);
      } finally {
        setModalLoading(false);
      }
    }
  };

  const isUniSelected = (uni) => {
    if (!uni) return false;
    const targetKeys = [uni._id, uni.id, uni.slug, uni.uniSlug, uni.name]
      .filter(Boolean)
      .map((k) => String(k).toLowerCase().trim());
    const pool = [...(compareList || []), ...(comparedData || [])];
    return pool.some((u) => {
      const uKeys = [u._id, u.id, u.slug, u.uniSlug, u.name]
        .filter(Boolean)
        .map((k) => String(k).toLowerCase().trim());
      return targetKeys.some((tk) => uKeys.includes(tk));
    });
  };

  const handleToggleFromModal = (uni) => {
    const uniId = uni.slug || uni._id || uni.id;
    if (isUniSelected(uni)) {
      handleRemoveUniversity(uniId);
    } else {
      const activeCount = Math.max(compareList?.length || 0, comparedData?.length || 0);
      if (activeCount >= 3) return;
      addToCompare(uni);
      const remaining = [
        ...(compareList || []).map((u) => u.slug || u._id || u.id),
        uniId,
      ].filter(Boolean);
      syncCompareUrl(remaining);
    }
  };

  const handleApplyCompareFromModal = async () => {
    setIsUniModalOpen(false);
    const activeList = compareList?.length > 0 ? compareList : comparedData;
    const slugs = activeList.map((u) => u.slug || u._id || u.id).filter(Boolean);
    if (slugs.length > 0) {
      syncCompareUrl(slugs);
      try {
        const options = { university: slugs.join(",") };
        if (selectedCourse && selectedCourse !== "all") options.course = selectedCourse;
        const res = await request.dynamicRead({
          entity: "universities",
          endPoint: "v1/compare",
          options,
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

  const filteredModalUniversities = useMemo(() => {
    if (!modalSearch) return modalUniversities || [];
    const q = modalSearch.toLowerCase().trim();
    return (modalUniversities || []).filter((u) => {
      const name = (u.name || "").toLowerCase();
      const city = (u.city || "").toLowerCase();
      const state = (typeof u.state === "object" ? u.state?.name : u.state || "").toLowerCase();
      return name.includes(q) || city.includes(q) || state.includes(q);
    });
  }, [modalUniversities, modalSearch]);




  // Fly-to-slot animation
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

  // ── Find course offering for a university ────────────────────────────────
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
    if (!courseName || courseName === "all") return (uni.courseOfferings || [])[0] || null;
    const target = courseName.trim().toLowerCase();
    const match = (uni.courseOfferings || []).find((o) => {
      if (!o) return false;
      const cn = (o.course_name || "").toLowerCase();
      const slug = (o.course_slug || o.course_master_slug || "").toLowerCase();
      const code = (o.course_code || "").toLowerCase();
      if (cn === target || code === target) return true;
      if (slug.endsWith(`/${target}`) || slug.endsWith(`-${target}`)) return true;
      if (cn.includes(`(${target})`) || cn.endsWith(` ${target}`)) return true;
      const words = cn.split(/[\s-]+/).filter(Boolean);
      const acronym = words.map((w) => w[0]).join("").toLowerCase();
      if (acronym === target) return true;
      const meaningful = words.filter((w) => !["of", "and", "in", "&"].includes(w)).map((w) => w[0]).join("").toLowerCase();
      if (meaningful === target) return true;
      return cn.includes(target);
    });
    if (match) return match;
    const inList = (uni.coursesOffered || []).some((c) => {
      const cl = (c || "").toLowerCase();
      return cl === target || cl.includes(`(${target})`) || cl.endsWith(` ${target}`);
    });
    if (inList) {
      const firstOffering = (uni.courseOfferings || [])[0];
      return {
        course_name: courseName,
        fee_per_semester: uni.fee_per_semester || firstOffering?.fee_per_semester || null,
        fee_discount: uni.fee_discount || firstOffering?.fee_discount || "Upto 20%",
        rating: uni.rating || firstOffering?.rating || 4.5,
        duration: uni.duration || firstOffering?.duration || "2–3 Years",
        eligibility: uni.eligibility || firstOffering?.eligibility || "Graduation / 10+2 from recognized board",
        specializations: firstOffering?.specializations || [],
      };
    }
    return null;
  };

  // ── Table Columns ────────────────────────────────────────────────────────
  const tableColumns = useMemo(() => {
    if (!comparedData?.length) return [];
    const count = comparedData.length;
    const fw = count <= 2 ? "20%" : "17%";
    const uw = count <= 2 ? `${80 / count}%` : `${83 / count}%`;

    const featureCol = {
      title: <span className="font-extrabold text-xs md:text-sm uppercase tracking-wider text-slate-700">Feature / Criteria</span>,
      dataIndex: "featureTitle",
      key: "featureTitle",
      width: fw,
      className: "bg-slate-50/80 font-bold text-slate-700 text-xs md:text-sm px-2.5 md:px-3.5",
      render: (_, record) => (
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-xs md:text-sm py-0.5">
          <span className="shrink-0">{record.icon}</span>
          <span className="leading-snug">{record.featureTitle}</span>
        </div>
      ),
    };

    const uniCols = comparedData.map((uni, idx) => ({
      title: (
        <div className="relative group flex flex-col items-center text-center space-y-1.5 py-1 px-1">
          <button
            onClick={() => handleRemoveUniversity(uni.slug || uni._id)}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-200 hover:bg-red-500 text-slate-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10"
          >
            <CloseOutlined className="text-[9px]" />
          </button>
          <div className="w-12 h-12 rounded-xl border border-gray-200 bg-white p-1.5 flex items-center justify-center relative">
            {uni.logo ? (
              <Image src={getAssetPath(uni.logo)} alt={uni.name || "Logo"} fill unoptimized className="object-contain p-0.5" />
            ) : (
              <span className="text-base font-semibold text-[#0C3058]">{(uni.name || "U")[0]}</span>
            )}
          </div>
          <div className="space-y-0.5 max-w-[200px]">
            <h3 className="text-xs md:text-sm font-semibold text-[#0C3058] m-0 line-clamp-2 leading-tight">
              {uni.isCourseOffering ? uni.title : uni.name}
            </h3>
            {uni.isCourseOffering && uni.uniName && (
              <p className="text-[11px] font-medium text-teal-700 m-0">{uni.uniName}</p>
            )}
          </div>
          {uni.location && (
            <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {uni.location}
            </span>
          )}
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

  // ── Table Rows ───────────────────────────────────────────────────────────
  const tableDataSource = useMemo(() => {
    if (!comparedData?.length) return [];
    const cName = selectedCourse && selectedCourse !== "all" ? selectedCourse : null;

    // Helper renderers
    const boolCell = (val) =>
      val === true ? <Tag color="success" className="font-bold text-[10px] m-0">Yes</Tag>
        : val === false ? <Tag color="error" className="font-bold text-[10px] m-0">No</Tag>
          : <span className="text-slate-400">-</span>;

    const tagCell = (val, color = "blue") =>
      val ? <Tag color={color} className="font-bold text-[11px] px-2.5 py-0.5 rounded-full m-0">{val}</Tag>
        : <span className="text-slate-400">-</span>;

    const listTags = (arr, color = "purple") =>
      arr?.length
        ? <div className="flex flex-wrap justify-center gap-1 max-w-[260px] mx-auto">
          {arr.map((s, i) => <Tag key={i} color={color} className="font-bold text-[10px] m-0">{typeof s === "object" ? s.name || s.title : s}</Tag>)}
        </div>
        : <span className="text-slate-400">-</span>;

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

    // Course-specific rows (only when a course is selected)
    const courseRows = cName
      ? [
        {
          key: `crs_avail`, icon: <BookOutlined className="text-[#009F93]" />, featureTitle: "Course Availability",
          renderCell: (uni) => { const off = findCourseOffering(uni, cName); return off ? <Tag color="success" className="font-bold text-xs px-2.5 py-0.5 rounded-full m-0">Offered</Tag> : <Tag color="default" className="text-slate-400 font-semibold text-xs px-2.5 py-0.5 rounded-full m-0">Not Offered</Tag>; }
        },
        {
          key: `crs_fees`, icon: <DollarOutlined className="text-emerald-600" />, featureTitle: "Fees per Semester",
          renderCell: (uni) => { const off = findCourseOffering(uni, cName); return off?.fee_per_semester ? <Tag color="success" className="font-extrabold text-xs px-2.5 py-0.5 rounded-full m-0">{off.fee_per_semester}</Tag> : <span className="text-slate-400">{off ? "Contact for Fees" : "-"}</span>; }
        },
        {
          key: `crs_disc`, icon: <DollarOutlined className="text-orange-500" />, featureTitle: "Fees Discount",
          renderCell: (uni) => { const off = findCourseOffering(uni, cName); return off ? <Tag color="orange" className="font-bold text-[11px] px-2.5 py-0.5 rounded-full m-0">{off.fee_discount || "Upto 20%"}</Tag> : <span className="text-slate-400">-</span>; }
        },
        {
          key: `crs_rating`, icon: <TrophyOutlined className="text-amber-500" />, featureTitle: "Course Rating",
          renderCell: (uni) => { const off = findCourseOffering(uni, cName); return off ? <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-xs">★ {off.rating || "4.5"} / 5</span> : <span className="text-slate-400">-</span>; }
        },
        {
          key: `crs_dur`, icon: <ClockCircleOutlined className="text-blue-600" />, featureTitle: "Course Duration",
          renderCell: (uni) => { const off = findCourseOffering(uni, cName); return off ? <span className="font-bold text-slate-700">{off.duration || "2 Years"}</span> : <span className="text-slate-400">-</span>; }
        },
        {
          key: `crs_elig`, icon: <SafetyCertificateOutlined className="text-blue-600" />, featureTitle: "Course Eligibility",
          renderCell: (uni) => { const off = findCourseOffering(uni, cName); return off ? <span className="text-slate-600 font-semibold text-[11px]">{off.eligibility || "Graduation / 10+2"}</span> : <span className="text-slate-400">-</span>; }
        },
        {
          key: `crs_spec`, icon: <BookOutlined className="text-purple-600" />, featureTitle: "Course Specializations",
          renderCell: (uni) => { const off = findCourseOffering(uni, cName); if (!off) return <span className="text-slate-400">-</span>; return off.specializations?.length ? listTags(off.specializations) : <span className="text-slate-500 font-medium">Standard / General</span>; }
        },
      ]
      : [];

    const uniRows = [
      { key: "ownership", icon: <BankOutlined className="text-blue-600" />, featureTitle: "Ownership Type", renderCell: (u) => listTags(Array.isArray(u.ownership_type) ? u.ownership_type : u.ownership_type ? [u.ownership_type] : [], "blue") },
      { key: "location", icon: <GlobalOutlined className="text-blue-600" />, featureTitle: "University Location", renderCell: (u) => <span className="text-slate-600 font-semibold">{u.location || "-"}</span> },
      { key: "est_year", icon: <ClockCircleOutlined className="text-blue-600" />, featureTitle: "Year of Establishment", renderCell: (u) => <span className="font-bold text-slate-700">{u.established_year || "-"}</span> },
      { key: "rating", icon: <TrophyOutlined className="text-amber-500" />, featureTitle: "Overall University Rating", renderCell: (u) => { const r = u.rating || u.avg_rating || 4.5; return <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold text-xs">★ {r} / 5</span>; } },
      { key: "nirf", icon: <TrophyOutlined className="text-purple-600" />, featureTitle: "NIRF Ranking", renderCell: (u) => tagCell(u.nirf_rank, "purple") },
      { key: "placement_pkg", icon: <DollarOutlined className="text-emerald-600" />, featureTitle: "Average Placement Package", renderCell: (u) => tagCell(u.avg_placement_package, "success") },
      { key: "placement", icon: <TrophyOutlined className="text-blue-600" />, featureTitle: "Placement Assistance", renderCell: (u) => boolCell(u.placement_assistance) },
      { key: "emi", icon: <CreditCardOutlined className="text-blue-600" />, featureTitle: "EMI Facility", renderCell: (u) => boolCell(u.emi_available) },
      { key: "scholarship", icon: <DollarOutlined className="text-blue-600" />, featureTitle: "Scholarship Opportunities", renderCell: (u) => boolCell(u.scholarship_available) },
      { key: "mode", icon: <BookOutlined className="text-blue-600" />, featureTitle: "Mode of Education", renderCell: (u) => <span className="text-slate-700 font-semibold">{(typeof u.mode === "object" ? u.mode?.name : u.mode) || "-"}</span> },
      { key: "exam_mode", icon: <LaptopOutlined className="text-blue-600" />, featureTitle: "Examination Mode", renderCell: (u) => listTags(Array.isArray(u.exam_mode) ? u.exam_mode : u.exam_mode ? [u.exam_mode] : [], "default") },
      {
        key: "approvals", icon: <SafetyCertificateOutlined className="text-blue-600" />, featureTitle: "Accreditations & Approvals",
        renderCell: (u) => {
          const naac = u.naac_rating; const nirf = u.nirf_rank;
          const apps = (Array.isArray(u.approvals) ? u.approvals : []).filter(Boolean);
          if (!naac && !nirf && !apps.length) return <span className="text-slate-400">-</span>;
          return (
            <div className="flex flex-wrap items-center justify-center gap-1 w-full py-1">
              {naac && <Tag color="gold" className="font-bold text-[10px] m-0">NAAC {typeof naac === "object" ? naac.grade || naac.name : naac}</Tag>}
              {nirf && <Tag color="blue" className="font-bold text-[10px] m-0">NIRF {typeof nirf === "object" ? nirf.rank || nirf.name : nirf}</Tag>}
              {apps.map((a, i) => {
                const name = typeof a === "object" ? a.name || a.code || a.title : a;
                const logo = typeof a === "object" ? getAssetPath(a.logo) : null;
                return logo
                  ? <div key={i} title={name} className="relative w-14 h-8 sm:w-20 sm:h-11 flex items-center justify-center hover:scale-105 shrink-0"><Image src={logo} alt={name} fill unoptimized className="object-contain" /></div>
                  : <Tag key={i} color="blue" className="font-bold text-[10px] m-0">{name}</Tag>;
              })}
            </div>
          );
        }
      },
      { key: "highlights", icon: <CheckCircleFilled className="text-emerald-600" />, featureTitle: "Key University Highlights", renderCell: (u) => bulletList(u.highlights, CheckOutlined, "text-emerald-500") },
      { key: "advantages", icon: <LikeOutlined className="text-emerald-600" />, featureTitle: "Advantages (Pros)", renderCell: (u) => bulletList(u.advantages, CheckOutlined, "text-emerald-500") },
      { key: "disadvantages", icon: <DislikeOutlined className="text-rose-500" />, featureTitle: "Disadvantages (Cons)", renderCell: (u) => bulletList(u.disadvantages, CloseOutlined, "text-rose-500") },
      { key: "courses", icon: <BookOutlined className="text-blue-600" />, featureTitle: "Courses Offered", renderCell: (u) => listTags(u.coursesOffered, "purple") },
      { key: "lms", icon: <LaptopOutlined className="text-blue-600" />, featureTitle: "Learning Platform - LMS", renderCell: (u) => boolCell(u.lms_available) },
      { key: "live_cls", icon: <VideoCameraOutlined className="text-blue-600" />, featureTitle: "Live Classes Available", renderCell: (u) => boolCell(u.live_classes) },
      { key: "study_mat", icon: <BookOutlined className="text-blue-600" />, featureTitle: "Study Material", renderCell: (u) => <span className="text-slate-700 font-semibold">{u.study_material === "Both" ? "Digital & Printed" : (u.study_material || "-")}</span> },
      { key: "recorded", icon: <VideoCameraOutlined className="text-purple-600" />, featureTitle: "Recorded Lectures", renderCell: (u) => boolCell(u.recorded_lectures) },
      { key: "placement_p", icon: <TeamOutlined className="text-emerald-600" />, featureTitle: "Placement Partners", renderCell: (u) => listTags(u.placement_partners, "geekblue") },
      {
        key: "actions", icon: <CheckCircleFilled className="text-blue-600" />, featureTitle: "Actions & Next Steps",
        renderCell: (uni) => (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 w-full max-w-[240px] mx-auto px-1">
            <Button type="primary" onClick={() => openFormModal({ title: `Apply Now - ${uni.name}`, subtitle: "Fill your details to get free expert 1:1 counseling", defaultCourse: selectedCourse || uni.name })} className="bg-[#00B4D8] hover:bg-[#0096C7] border-none font-semibold text-[11px] sm:text-xs rounded-xl h-7 sm:h-8 px-2.5 w-full sm:w-auto cursor-pointer">Apply Now</Button>
            {uni.slug && <Link href={`/universities/${uni.slug}`} className="w-full sm:w-auto"><Button className="bg-[#0C3058] text-white hover:bg-[#0a2540] border-none font-semibold text-[11px] sm:text-xs rounded-xl h-7 sm:h-8 px-2.5 w-full cursor-pointer">View Details</Button></Link>}
          </div>
        ),
      },
    ];

    return [...courseRows, ...uniRows];
  }, [comparedData, selectedCourse, openFormModal]);



  // ── JSX ──────────────────────────────────────────────────────────────────
  const currentSlots = compareList?.length > 0 ? compareList : comparedData;
  const hasSlots = currentIdentifiers.length > 0 || comparedData.length > 0;

  return (
    <div className="bg-[#F1F4F9] min-h-screen font-sans text-gray-800">

      {/* ── HERO ── */}
      <div className="bg-[#0F3759] pt-8 pb-14 sm:pb-20 overflow-hidden relative border-b border-gray-200 text-center text-white rounded-b-3xl">
        <div className="max-w-2xl mx-auto px-4 space-y-4 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold m-0 tracking-tight leading-[1.1]">
            <span className="text-[#FFB800] block">Compare Universities &amp;</span>
            <span className="text-white block">Choose Best For You!</span>
          </h1>

          {/* Course Selector */}
          <div className="max-w-2xl mx-auto pt-3">
            <Select
              showSearch
              size="large"
              allowClear
              value={selectedCourse}
              onChange={(val) => setSelectedCourse(val || null)}
              placeholder="Select Course to Compare.... MBA, MCA..."
              className="w-full rounded-4xl text-left font-normal text-gray-500 bg-white"
              options={courseSelectOptions}
              optionFilterProp="label"
              filterOption={(input, opt) => (opt?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            />
          </div>

        </div>
      </div>

      {/* ── SELECTOR CARD ── */}
      <div className="max-w-4xl mx-auto relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-3.5 sm:p-5 md:p-6 text-center">
          <p className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider m-0 mb-3 text-center">
            CHOOSE WHAT YOU WANT TO COMPARE
          </p>
          {hasSlots ? (
            <div>
              {/* 3 Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                {[0, 1, 2].map((slotIdx) => {
                  const uni = currentSlots[slotIdx];
                  if (uni) {
                    const isOffering = uni.isCourseOffering || uni.type === "course_offering";
                    const displayTitle = isOffering ? uni.title : uni.name;
                    const rawLogo = uni.logo || uni.logoSrc || uni.image || null;
                    const getClean = (val) => {
                      if (!val) return "";
                      if (typeof val === "object") return val.name || val.title || "";
                      const s = String(val).trim();
                      if (/^[0-9a-fA-F]{24}$/.test(s)) {
                        const found = allStates.find((st) => String(st._id || st.value) === s);
                        return found ? (found.name || "") : "";
                      }
                      return s;
                    };
                    const locStr = uni.location && !/^[0-9a-fA-F]{24}$/.test(uni.location)
                      ? uni.location
                      : [getClean(uni.city), getClean(uni.state)].filter(Boolean).join(", ");
                    return (
                      <div key={slotIdx} id={`uni-slot-${slotIdx}`} className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col items-center justify-center relative min-h-[140px] group transition-all">
                        <button onClick={() => handleRemoveUniversity(uni.slug || uni._id || uni.id)} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-100 hover:bg-red-500 text-slate-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10" title="Remove">
                          <CloseOutlined className="text-[10px]" />
                        </button>
                        <div className="relative w-32 h-12 rounded-lg border border-gray-200 bg-white p-1 flex items-center justify-center mb-2 overflow-hidden">
                          {rawLogo ? <Image src={getAssetPath(rawLogo)} alt={displayTitle || "Logo"} fill unoptimized className="object-contain" /> : <span className="text-sm font-semibold text-[#0C3058]">{displayTitle}</span>}
                        </div>
                        <h4 className="text-xs font-semibold text-[#0C3058] m-0 line-clamp-1">{displayTitle}</h4>
                        {isOffering && uni.uniName && <p className="text-[10px] font-medium text-teal-700 m-0 line-clamp-1">{uni.uniName}</p>}
                        {locStr && <span className="text-[9px] bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full mt-1.5 line-clamp-1">{locStr}</span>}
                      </div>
                    );
                  }
                  return (
                    <div key={slotIdx} id={`uni-slot-${slotIdx}`} className="border-2 border-dashed border-blue-200/90 rounded-2xl p-4 flex flex-col items-center justify-center text-gray-400 bg-white transition-all min-h-[140px] gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-base">+</div>
                      {slotSelectOptions.length > 0 && (
                        <Select
                          showSearch
                          placeholder="Select University"
                          value={null}
                          onChange={(_, option) => { if (option?.itemObj) triggerFlyAnimation(option.itemObj, slotIdx); }}
                          className="w-full max-w-[200px] text-left font-medium [&_.ant-select-selector]:rounded-xl!"
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
              <div className="mt-4 flex items-center justify-center">
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
            <div className="py-8 text-center space-y-3">
              <p className="text-slate-500 text-sm m-0">Pick up to 3 universities to compare features, fees, and rankings.</p>
              <div>
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
          )}
        </div>
      </div>

      {/* ── COMPARISON MATRIX ── */}
      <div id="comparison-matrix-section" className="max-w-[1440px] mx-auto px-3 sm:px-5 md:px-6 py-6 space-y-4">
        {comparedData.length > 0 ? (
          <div>
            {/* Desktop Table */}
            <div className="hidden md:block">
              <style>{`
                .cmp-table .ant-table-thead > tr > th { font-size:14px!important; font-weight:700!important; padding:10px 14px!important; }
                .cmp-table .ant-table-tbody > tr > td { padding:8px 14px!important; font-size:14px!important; vertical-align:middle!important; white-space:normal!important; word-break:break-word!important; }
                .cmp-table .ant-table-tbody > tr > td .ant-tag { font-size:12px!important; padding:2px 8px!important; }
                .cmp-table .ant-table-tbody > tr > td .ant-btn { font-size:13px!important; height:32px!important; }
              `}</style>
              <Table columns={tableColumns} dataSource={tableDataSource} pagination={false} bordered size="small" scroll={{ x: "max-content" }} rowKey="key" className="cmp-table w-full" />
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden bg-white rounded-2xl border border-slate-200/90 overflow-hidden">
              <div className={`grid grid-cols-${comparedData.length} divide-x divide-slate-200 bg-white border-b border-slate-200`}>
                {comparedData.map((uni, idx) => (
                  <div key={idx} className="p-3 flex flex-col items-center text-center relative min-h-[120px]">
                    <button onClick={() => handleRemoveUniversity(uni.slug || uni._id)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-100 hover:bg-red-500 text-slate-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none z-10">
                      <CloseOutlined className="text-[8px]" />
                    </button>
                    <div className="w-11 h-11 rounded-xl border border-slate-200 bg-white p-1 flex items-center justify-center relative mb-1">
                      {uni.logo ? <Image src={getAssetPath(uni.logo)} alt={uni.name || "Logo"} fill unoptimized className="object-contain p-0.5" /> : <span className="text-sm font-black text-[#1C3569]">{(uni.name || "U")[0]}</span>}
                    </div>
                    <h4 className="text-[11px] font-bold text-[#1C3569] m-0 line-clamp-2 leading-tight">{uni.isCourseOffering ? uni.title : uni.name}</h4>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-slate-100">
                {tableDataSource.map((row) => (
                  <div key={row.key}>
                    <div className="bg-[#f0f5ff] py-2 px-3 text-center border-t border-b border-slate-200 flex items-center justify-center gap-1.5 text-blue-600 font-extrabold text-[11px] tracking-wider uppercase">
                      <span className="shrink-0">{row.icon}</span>
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
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200/80">
            <Empty description={<div className="space-y-1"><p className="text-base font-bold text-slate-700 m-0">No Universities Selected</p><p className="text-xs text-slate-500 m-0">Select a course above and pick universities to compare.</p></div>} />
          </div>
        )}
      </div>
      {/* ── CTA ── */}
      <div className="max-w-5xl mx-auto my-12 px-4">
        <div className="bg-gradient-to-r from-[#0F3759] via-[#103D6D] to-[#154E8A] text-white rounded-2xl sm:rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-gray-200">
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
      </div>

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
        footer={null}
        width={960}
        centered
        destroyOnClose={false}
        closable={false}
      >
        {/* Header (Matching Screenshot) */}
        <div className="text-center pt-1 pb-2 relative">
          <button
            onClick={() => setIsUniModalOpen(false)}
            className="absolute top-0 right-0 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors border-none cursor-pointer"
            title="Close"
          >
            <CloseOutlined className="text-[11px]" />
          </button>
          <p className="text-[11px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase m-0">
            COMPARE TOP UNIVERSITIES WITH
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] tracking-tight mt-1 mb-2">
            ALL UNIVERSITIES
          </h2>
          <div className="flex items-center justify-center gap-3 w-full max-w-sm mx-auto mb-2">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
              SELECT ANY UNIVERSITY TO COMPARE
            </span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>
        </div>

        {/* Quick Search Input */}
        <div className="pb-3 px-1">
          <Input.Search
            placeholder="Search universities..."
            value={modalSearch}
            onChange={(e) => setModalSearch(e.target.value)}
            onSearch={(val) => setModalSearch(val)}
            allowClear
            className="w-full rounded-xl"
          />
        </div>

        {/* Universities List Grid (2 cols mobile, 4 cols desktop) */}
        <div className="max-h-[55vh] overflow-y-auto px-1 py-1">
          {modalLoading ? (
            <div className="flex items-center justify-center py-16 text-slate-400 text-sm gap-2">
              <span className="inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              Loading universities...
            </div>
          ) : filteredModalUniversities.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No universities found matching "{modalSearch}"
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
              {filteredModalUniversities.map((uni) => {
                const selected = isUniSelected(uni);
                const disabled = !selected && currentSlots.length >= 3;
                const rawLogo = uni.logo || uni.image || null;
                return (
                  <div
                    key={uni._id || uni.slug}
                    onClick={() => { if (!disabled) handleToggleFromModal(uni); }}
                    className={`p-2.5 sm:p-3 rounded-2xl border transition-all flex flex-col items-center justify-between min-h-[145px] sm:min-h-[155px] cursor-pointer bg-white relative group ${selected
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
                    <div className="pt-1 pb-0.5 text-center w-full">
                      <span className={`text-[11px] sm:text-xs font-bold transition-colors ${selected ? "text-[#009F93]" : "text-[#0C3058] group-hover:text-[#103D6D]"}`}>
                        {selected ? "✓ Added to Compare" : "+ Add to Compare"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer (Matching Screenshot) */}
        <div className="bg-[#F8FAFC] rounded-2xl p-4 flex items-center justify-between mt-4 border border-slate-100">
          <span className="text-xs sm:text-sm text-slate-700 font-medium">
            <strong className="font-extrabold text-slate-900">{currentSlots.length}</strong> universities selected
          </span>
          <button
            type="button"
            onClick={handleApplyCompareFromModal}
            disabled={currentSlots.length === 0}
            className={`font-semibold rounded-2xl h-10 px-6 border-none text-xs sm:text-sm inline-flex items-center gap-2 transition-all ${currentSlots.length > 0
              ? "bg-[#72CBE8] hover:bg-[#5bbad8] text-white cursor-pointer shadow-sm"
              : "bg-[#72CBE8]/50 text-white/80 cursor-not-allowed"
              }`}
          >
            Compare Now <ArrowRightOutlined className="text-xs" />
          </button>
        </div>
      </Modal>
    </div>
  );
}
