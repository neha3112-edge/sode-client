"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Download,
  MapPin,
  Building2,
  BadgeCheck,
  User,
  GraduationCap,
  Briefcase,
  ShoppingCart,
  Database,
  UserCog,
  Award,
  Plus,
  Minus,
  Check,
  BookOpen,
  X,
  ChevronDown,
} from "lucide-react";
import { Modal, Tag, Radio, ConfigProvider } from "antd";
import { FaBuilding, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import { getAssetPath } from "@/lib/utils";
import { useBreadcrumb } from "@/context/BreadcrumbContext";

const SPEC_ICONS = [Briefcase, BookOpen, GraduationCap, Award, Database, UserCog, ShoppingCart];

export default function CourseClientView({
  initialData = null,
  initialCourses = [],
  slug = "",
}) {
  const { openFormModal } = useFormModal();
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen } = useCompare();
  const [openFaq, setOpenFaq] = useState(0);

  const [selectedPlanTab, setSelectedPlanTab] = useState("semester");
  const [activeEmiSubTab, setActiveEmiSubTab] = useState("fullfees");
  const courseData = initialData || {};

  const activeLedgerData = useMemo(() => {
    const rawLedger = courseData?.ledger || courseData?.feesLedger?.ledger;
    const promoData = courseData?.feesLedger || courseData;

    if (!rawLedger) return null;

    const full = rawLedger.fullfees || rawLedger.FULLFEES;
    const year = rawLedger.yearly || rawLedger.YEARLY;
    const sem = rawLedger.semester || rawLedger.SEMESTER;
    const emi = promoData?.emi || rawLedger?.emi || courseData?.emi;

    const hasSpecificPaymentTypes = Boolean(emi?.hasSpecificPaymentTypes);

    const fullEmi = hasSpecificPaymentTypes ? (full?.emi || emi?.fullfees || null) : null;
    const yearEmi = hasSpecificPaymentTypes ? (year?.emi || emi?.yearly || null) : null;
    const semEmi = hasSpecificPaymentTypes ? (sem?.emi || emi?.semester || null) : null;

    const availableSummary =
      (fullEmi?.available ? fullEmi : null) ||
      (yearEmi?.available ? yearEmi : null) ||
      (semEmi?.available ? semEmi : null) ||
      (emi?.summary?.available ? emi.summary : null) ||
      (emi?.available ? emi : null);

    return {
      fullfees: full ? { ...full, emi: fullEmi } : null,
      yearly: year ? { ...year, emi: yearEmi } : null,
      semester: sem ? { ...sem, emi: semEmi } : null,
      emi: {
        fullfees: fullEmi,
        yearly: yearEmi,
        semester: semEmi,
        summary: availableSummary,
        hasSpecificPaymentTypes,
      },
      scholarship: promoData?.scholarship || null,
      coupon: promoData?.coupon || null,
      appliedPromoCode: promoData?.appliedPromoCode || null,
    };
  }, [courseData]);

  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedSpecModal, setSelectedSpecModal] = useState(null);
  const specializationSectionRef = useRef(null);

  const rawCourses = useMemo(() => {
    if (Array.isArray(courseData?.topUniversities) && courseData.topUniversities.length > 0) {
      return courseData.topUniversities;
    }
    if (Array.isArray(initialCourses) && initialCourses.length > 0) {
      return initialCourses;
    }
    return [];
  }, [courseData?.topUniversities, initialCourses]);

  const universityName =
    courseData?.universityName ||
    courseData?.universityId?.name ||
    courseData?.university?.name ||
    "";
  const displayCourseTitle = courseData?.name || "Course Details";
  const heroBannerSrc = getAssetPath(
    courseData?.bannerImage || courseData?.banner || courseData?.universityId?.bannerImg?.url
  );
  const universityLogoSrc = courseData?.logo
    ? getAssetPath(courseData.logo)
    : courseData?.universityId?.logo
      ? getAssetPath(courseData.universityId.logo)
      : null;

  const approvalsList = useMemo(() => {
    return Array.isArray(courseData?.approvals) ? courseData.approvals : [];
  }, [courseData]);

  const approvalsSummary = useMemo(() => {
    const found = approvalsList.find((a) => {
      const name = typeof a === "string" ? a : (a.name || a.code || a.title || "");
      return /ugc/i.test(name);
    });
    if (found) {
      const name = typeof found === "string" ? found : (found.name || found.code || found.title || "");
      return name.includes("DEB") ? name : `${name}-DEB`;
    }
    return "UGC-DEB";
  }, [approvalsList]);

  const highlightsList = useMemo(() => {
    if (Array.isArray(courseData?.keyHighlights) && courseData.keyHighlights.length > 0) {
      return courseData.keyHighlights.map((item) => ({
        _id: item._id,
        label: item.label || item.category || item.title || "Category",
        value: item.value || item.details || item.description || "N/A",
      }));
    }
    const list = [];
    if (universityName) list.push({ label: "University", value: universityName });
    if (courseData?.name) {
      list.push({
        label: "Program Name",
        value: courseData.fullName ? `${courseData.name} (${courseData.fullName})` : courseData.name,
      });
    }
    if (courseData?.eligibility) list.push({ label: "Eligibility", value: courseData.eligibility });
    if (courseData?.fees) {
      const feeLabel = courseData.paymentType?.name
        ? `${courseData.paymentType.name} Fee`
        : "Course Fee";
      list.push({
        label: feeLabel,
        value: courseData.fees.startsWith("₹") ? courseData.fees : `₹ ${courseData.fees}`,
      });
      if (courseData?.fullFee && courseData.fullFee !== courseData.fees) {
        list.push({
          label: "Full Course Fee",
          value: courseData.fullFee.startsWith("₹") ? courseData.fullFee : `₹ ${courseData.fullFee}`,
        });
      }
    }
    if (courseData?.duration) list.push({ label: "Duration", value: courseData.duration });
    list.push({ label: "Mode of Study", value: "Online" });
    if (approvalsSummary) list.push({ label: "Ranking & Approvals", value: approvalsSummary });
    if (courseData?.admissionDeadline) list.push({ label: "Admission Deadline", value: courseData.admissionDeadline });
    return list;
  }, [courseData, universityName, approvalsSummary]);

  const specializations = useMemo(() => {
    return Array.isArray(courseData?.subCourses) ? courseData.subCourses : [];
  }, [courseData]);

  const curriculumList = useMemo(() => {
    if (Array.isArray(courseData?.curriculum) && courseData.curriculum.length > 0) {
      return courseData.curriculum
        .filter((c) => c && (c.semesterName || (Array.isArray(c.subjects) && c.subjects.length > 0)))
        .map((c, idx) => ({
          semester: c.semesterName || `Semester ${idx + 1}`,
          subjects: Array.isArray(c.subjects) ? c.subjects : [],
        }));
    }
    if (Array.isArray(courseData?.syllabus) && courseData.syllabus.length > 0) {
      return courseData.syllabus
        .filter((s) => s && (s.semester || (Array.isArray(s.subjects) && s.subjects.length > 0)))
        .map((s, idx) => ({
          semester: s.semester || `Semester ${idx + 1}`,
          subjects: Array.isArray(s.subjects) ? s.subjects : [],
        }));
    }
    return [];
  }, [courseData]);

  const faqList = useMemo(() => {
    return Array.isArray(courseData?.faqs) ? courseData.faqs : [];
  }, [courseData]);

  const processedPrograms = useMemo(() => {
    const list = [];
    const currentUniName = (universityName || "").toLowerCase().trim();
    const currentUniSlug = (courseData?.universitySlug || "").toLowerCase().trim();
    const sourceList = Array.isArray(rawCourses) ? rawCourses : [];

    sourceList.forEach((item, index) => {
      if (!item) return;

      const uni = item.universityId || item.university || {};
      const uName = uni.name || item.uniName || item.name || "Partner University";
      const uSlug = (uni.slug || "").toLowerCase().trim();
      const uNameLower = uName.toLowerCase().trim();

      if (currentUniName && uNameLower === currentUniName) return;
      if (currentUniSlug && uSlug === currentUniSlug) return;

      const course = item.courseId || item.course || {};
      const subcourse = item.subCourseId || item.subcourse || {};

      const courseName = course.name || item.courseName || "";
      const fullDisplayName =
        item.displayName || course.displayName || course.displayNames?.[0]?.name || "";
      const effectiveCourseName =
        (course.showDisplayName || item.showDisplayName) && fullDisplayName
          ? fullDisplayName
          : courseName;

      const cardTitle = item.title || effectiveCourseName || item.name || "Course Program";
      const displayName = fullDisplayName;

      const fees = item.fees || {};
      const duration = item.duration || {};
      const partnerObj =
        uni.viaPartner ||
        item.viaPartner ||
        (Array.isArray(item.partner) && item.partner.length > 0 ? item.partner[0] : null);
      const isPartnerActive = Boolean(
        partnerObj && partnerObj.name && (partnerObj.show === true || partnerObj.showOnWebsite === true)
      );
      const providerName = isPartnerActive ? partnerObj.name : null;

      const rawLogo =
        uni.logo?.url ||
        uni.logo?.path ||
        uni.logoSrc?.url ||
        uni.logoSrc ||
        uni.logo ||
        item.logoUrl;
      const logoUrl = getAssetPath(rawLogo, null);

      let durationText = null;
      if (typeof duration === "string" && duration.trim()) {
        durationText = duration;
      } else if (duration?.name) {
        durationText = duration.name;
      } else if (duration?.months) {
        durationText = `${duration.months} Months`;
      } else if (item.duration) {
        durationText =
          typeof item.duration === "string"
            ? item.duration
            : item.duration.name || (item.duration.months ? `${item.duration.months} Months` : null);
      } else if (item.durationMonths) {
        durationText = `${item.durationMonths} Months`;
      }

      let feeText = null;
      if (fees?.semesterFees) {
        feeText = `₹ ${Number(fees.semesterFees).toLocaleString("en-IN")} / Semester`;
      } else if (fees?.formattedSemesterFees) {
        feeText = fees.formattedSemesterFees;
      } else if (fees?.perSemesterPayable) {
        feeText = `₹ ${Number(fees.perSemesterPayable).toLocaleString("en-IN")} / Semester`;
      } else if (fees?.amount) {
        feeText = `₹ ${Number(fees.amount).toLocaleString("en-IN")} INR`;
      } else if (fees?.name) {
        feeText = fees.name.includes("₹") ? `${fees.name} INR` : `₹ ${fees.name} INR`;
      } else if (item.fullFee) {
        feeText = item.fullFee.includes("₹") ? `${item.fullFee} INR` : `₹ ${item.fullFee} INR`;
      } else if (item.amount) {
        feeText = `₹ ${Number(item.amount).toLocaleString("en-IN")} INR`;
      } else if (item.fee) {
        feeText = `${item.fee} INR`;
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

      const uniSlug = uni?.slug || slugify(uName);
      const courseSlug = course?.slug || slugify(course?.shortName || course?.name || courseName);
      const subcourseSlug = subcourse?.slug || (subcourse?.name ? slugify(subcourse.name) : "");

      let courseDetailHref = "/courses";
      if (uniSlug && courseSlug && subcourseSlug) {
        courseDetailHref = `/university/${encodeURIComponent(uniSlug)}/${encodeURIComponent(courseSlug)}/${encodeURIComponent(subcourseSlug)}`;
      } else if (uniSlug && courseSlug) {
        courseDetailHref = `/university/${encodeURIComponent(uniSlug)}/${encodeURIComponent(courseSlug)}`;
      } else if (courseSlug && subcourseSlug) {
        courseDetailHref = `/courses/${encodeURIComponent(courseSlug)}/${encodeURIComponent(subcourseSlug)}`;
      } else if (courseSlug) {
        courseDetailHref = `/courses/${encodeURIComponent(courseSlug)}`;
      } else if (item.slug) {
        courseDetailHref = item.slug.includes("/")
          ? `/university/${item.slug}`
          : `/courses/${encodeURIComponent(item.slug)}`;
      }

      list.push({
        ...item,
        _uniqueKey: `${item._id || item.slug || cardTitle || "program"}-${index}`,
        title: cardTitle,
        cardTitle,
        displayName,
        uniName: uName,
        logoUrl,
        providerName,
        durationText,
        feeText,
        courseDetailHref,
        subcourses: item.subcourses || [],
      });
    });

    return list;
  }, [rawCourses, universityName, courseData?.universitySlug]);

  const handleOpenLead = (actionType = "Download Brochure", specName = null) => {
    const courseTitleForLead = specName
      ? `${courseData?.name || "Course"} (${specName})`
      : courseData?.name || "Course";

    openFormModal({
      course: courseTitleForLead,
      university: universityName || "Partner University",
      action: actionType,
    });
  };



  useBreadcrumb(
    {
      items: [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        {
          label: `${displayCourseTitle}${courseData?.fullName ? ` (${courseData.fullName})` : ""}`.trim(),
        },
      ],
      backButton: {
        label: "Back to Courses",
        href: "/courses",
      },
    },
    [displayCourseTitle, courseData?.fullName]
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased font-sans pb-16">
      {/* Top Hero and Quick Facts */}
      <div className="pt-4 space-y-6 max-w-6xl mx-auto px-3 sm:px-4 md:px-0 mb-6">
        {/* Original Course Hero Banner Section */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-[#0C2B4E] flex flex-col md:grid md:grid-cols-12 min-h-80 md:min-h-90">
          {/* Mobile Image (Top) / Desktop Image (Right) */}
          <div className="order-1 md:order-2 md:col-span-6 relative w-full h-64 sm:h-72 md:h-full overflow-hidden rounded-b-4xl md:rounded-l-4xl">
            {heroBannerSrc ? (
              <Image
                src={heroBannerSrc}
                alt={displayCourseTitle}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                priority
              />
            ) : (
              <div className="w-full h-full bg-[#0C2B4E]" />
            )}

            {/* University Logo with Compact White Background */}
            {universityLogoSrc && (
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-white rounded-xl shadow-md p-1.5 sm:p-2 border border-gray-100 flex items-center justify-center">
                <div className="relative w-11 h-11 sm:w-16 sm:h-16">
                  <Image
                    src={universityLogoSrc}
                    alt={universityName || "University Logo"}
                    fill
                    sizes="(max-width: 640px) 44px, 64px"
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="order-2 md:order-1 md:col-span-6 text-white p-5 sm:p-7 md:py-9 md:px-9 flex flex-col justify-center space-y-4 md:space-y-5">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white m-0 leading-tight">
                {courseData?.name || "Online Course"}
              </h1>
              {courseData?.fullName && (
                <p className="text-sm sm:text-base text-blue-100/90 font-medium m-0">
                  ( {courseData.fullName} )
                </p>
              )}
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm font-medium text-white/95">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {courseData?.duration && (
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-amber-400 shrink-0" />
                    <span>{courseData.duration}</span>
                  </div>
                )}
                {courseData?.fees && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold text-sm sm:text-base">₹</span>
                    <span>
                      {courseData.fees.replace(/^₹\s*/, "")}
                    </span>
                  </div>
                )}
              </div>

              {courseData?.admissionDeadline && (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-white">
                  <Clock size={16} className="text-amber-400 shrink-0" />
                  <span>Admission Deadline : {courseData.admissionDeadline}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 pt-2 w-full">
              <button
                type="button"
                onClick={() => handleOpenLead("Download Brochure")}
                className="flex-1 sm:flex-initial bg-[#E5A93C] hover:bg-[#D4982B] text-gray-950 font-bold px-2.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 text-center leading-tight whitespace-nowrap"
              >
                <span>Download Brochure</span>
                <Download size={14} className="shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => handleOpenLead("Get 100% FREE Counseling")}
                className="flex-1 sm:flex-initial bg-transparent border border-white/80 hover:bg-white/10 text-white font-semibold px-2.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center text-center leading-tight whitespace-nowrap"
              >
                Get 100% FREE Counseling
              </button>
            </div>
          </div>
        </div>

        {/* Quick Facts Bar with Solid Icons & UGC-DEB */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-3.5 sm:p-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-3.5 sm:gap-y-4 lg:gap-y-0">
            {/* Location */}
            <div className="flex items-center gap-2.5 sm:gap-3 pl-2.5 sm:pl-6 lg:justify-center pr-2 border-r border-gray-200">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <FaMapMarkerAlt size={22} className="fill-white" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">Location</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug line-clamp-2 sm:truncate">
                  {courseData?.location || universityName || "Online"}
                </span>
              </div>
            </div>

            {/* Established */}
            <div className="flex items-center gap-2.5 sm:gap-3 pl-3.5 sm:pl-6 lg:justify-center pr-2 lg:border-r border-gray-200">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <FaBuilding size={17} />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">Established</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug line-clamp-2 sm:truncate">
                  {courseData?.established || "—"}
                </span>
              </div>
            </div>

            {/* Approvals */}
            <div className="flex items-center gap-2.5 sm:gap-3 pl-2.5 sm:pl-6 lg:justify-center pr-2 border-r border-gray-200">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <BadgeCheck size={22} className="fill-white text-[#0077B6]" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">Approvals</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug line-clamp-2 sm:truncate">
                  {approvalsSummary || "UGC-DEB"}
                </span>
              </div>
            </div>

            {/* Eligibility */}
            <div className="flex items-center gap-2.5 sm:gap-3 pl-3.5 sm:pl-6 lg:justify-center pr-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                {courseData?.admissionDeadline ? (
                  <FaCalendar size={17} />
                ) : (
                  <User size={18} className="fill-white text-[#0077B6]" />
                )}
              </div>
              <div className="min-w-0">
                {courseData?.admissionDeadline ? (
                  <>
                    <span className="text-[11px] sm:text-xs text-red-500 font-medium block leading-none mb-1">
                      Admission deadline
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight truncate">
                      {courseData.admissionDeadline}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">
                      Eligibility
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight truncate">
                      {courseData?.eligibility || "10+2 / Graduation"}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area Sections */}
      <div className="space-y-6 max-w-6xl mx-auto px-3 sm:px-4 md:px-0">
        {/* 1. About / Course Overview */}
        {(courseData?.overview || courseData?.description) && (
          <div
            id="about"
            className="scroll-mt-16 bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-10 space-y-4 text-center"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight m-0 text-center">
              {courseData.overviewTitle || `${courseData.name || "Course"} Overview`}
            </h2>
            <div className="w-full max-w-4xl mx-auto h-px bg-gray-200/80 my-2" />
            <div className="space-y-4 text-xs sm:text-[13.5px] text-gray-700 leading-relaxed max-w-5xl mx-auto font-normal text-center">
              <p className="m-0">{courseData.overview || courseData.description}</p>
            </div>
          </div>
        )}

        {/* 2. Key Highlights Table Card */}
        {highlightsList.length > 0 && (
          <div
            id="key-highlights"
            className="scroll-mt-16 bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-10 space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 text-center">
              Key Highlights of {courseData?.name || "Course"} {universityName ? `at ${universityName} ` : ""}2026
            </h2>

            <div className="overflow-hidden border border-gray-200 shadow-2xs max-w-5xl mx-auto rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0C2B4E] text-white text-xs sm:text-sm font-bold tracking-wide">
                      <th className="py-2.5 sm:py-3 px-4 sm:px-6 w-[32%] sm:w-70 border-r border-white/20">
                        Category
                      </th>
                      <th className="py-2.5 sm:py-3 px-4 sm:px-6">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-[13.5px] bg-white">
                    {highlightsList.map((row, idx) => (
                      <tr
                        key={row._id || idx}
                        className="bg-white hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="py-2.5 px-4 sm:px-6 font-bold text-gray-900 border-r border-gray-200 whitespace-nowrap">
                          {row.label}
                        </td>
                        <td className="py-2.5 px-4 sm:px-6 text-gray-800 font-normal">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. Fee Structure & Dynamic 3-Plan Ledger Selector */}
        {activeLedgerData && (
          <div
            id="fee-structure"
            className="scroll-mt-16 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 space-y-4"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-5 sm:mb-6 m-0">
              Fee Structure & Flexible Payment Plans
            </h2>

            {/* Side-by-Side Plan & EMI Comparison Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
              {[
                {
                  id: "semester",
                  title: "Semester-wise",
                  badge: activeLedgerData.semester?.discountPercentage > 0 ? {
                    text: activeLedgerData.semester?.badgeText || (
                      activeLedgerData.scholarship || activeLedgerData.semester?.discountType === "SCHOLARSHIP"
                        ? `${activeLedgerData.semester.discountPercentage}% SCHOLARSHIP`
                        : `${activeLedgerData.semester.discountPercentage}% OFF`
                    ),
                    color: activeLedgerData.semester?.badgeColor || "success",
                  } : null,
                  hasDiscount: Boolean(
                    (activeLedgerData.semester?.discountPercentage > 0 ||
                      (activeLedgerData.semester?.grossFee &&
                        activeLedgerData.semester?.netPayable &&
                        activeLedgerData.semester.grossFee > activeLedgerData.semester.netPayable)) &&
                    activeLedgerData.semester?.formattedGross &&
                    activeLedgerData.semester?.formattedGross !== activeLedgerData.semester?.formattedPayable
                  ),
                  grossFee: activeLedgerData.semester?.formattedGross,
                  payableFee: activeLedgerData.semester?.formattedBasePayable || activeLedgerData.semester?.formattedPayable || "₹ 16,320 / Sem",
                  extraOff: activeLedgerData.semester?.extraOff,
                  subtitle: `${activeLedgerData.semester?.totalSemesters || 6} Semesters • Installments`,
                  onClick: () => setSelectedPlanTab("semester"),
                },
                {
                  id: "yearly",
                  title: "Yearly Plan",
                  badge: activeLedgerData.yearly?.discountPercentage > 0 ? {
                    text: activeLedgerData.yearly?.badgeText || (
                      activeLedgerData.scholarship || activeLedgerData.yearly?.discountType === "SCHOLARSHIP"
                        ? `${activeLedgerData.yearly.discountPercentage}% SCHOLARSHIP`
                        : `${activeLedgerData.yearly.discountPercentage}% OFF`
                    ),
                    color: activeLedgerData.yearly?.badgeColor || "success",
                  } : null,
                  hasDiscount: Boolean(
                    (activeLedgerData.yearly?.discountPercentage > 0 ||
                      (activeLedgerData.yearly?.grossFee &&
                        activeLedgerData.yearly?.netPayable &&
                        activeLedgerData.yearly.grossFee > activeLedgerData.yearly.netPayable)) &&
                    activeLedgerData.yearly?.formattedGross &&
                    activeLedgerData.yearly?.formattedGross !== activeLedgerData.yearly?.formattedPayable
                  ),
                  grossFee: activeLedgerData.yearly?.formattedGross,
                  payableFee: activeLedgerData.yearly?.formattedBasePayable || activeLedgerData.yearly?.formattedPayable || "₹ 30,720 / Year",
                  extraOff: activeLedgerData.yearly?.extraOff,
                  subtitle: `${activeLedgerData.yearly?.totalYears || 3} Annual Installments`,
                  onClick: () => setSelectedPlanTab("yearly"),
                },
                {
                  id: "fullfees",
                  title: "Full Fees",
                  badge: activeLedgerData.fullfees?.discountPercentage > 0 ? {
                    text: activeLedgerData.fullfees?.badgeText || (
                      activeLedgerData.scholarship || activeLedgerData.fullfees?.discountType === "SCHOLARSHIP"
                        ? `${activeLedgerData.fullfees.discountPercentage}% SCHOLARSHIP`
                        : `MAX SAVINGS ${activeLedgerData.fullfees.discountPercentage}%`
                    ),
                    color: activeLedgerData.fullfees?.badgeColor || (activeLedgerData.scholarship ? "success" : "warning"),
                  } : null,
                  hasDiscount: Boolean(
                    (activeLedgerData.fullfees?.discountPercentage > 0 ||
                      (activeLedgerData.fullfees?.grossFee &&
                        activeLedgerData.fullfees?.netPayable &&
                        activeLedgerData.fullfees.grossFee > activeLedgerData.fullfees.netPayable)) &&
                    activeLedgerData.fullfees?.formattedGross &&
                    activeLedgerData.fullfees?.formattedGross !== activeLedgerData.fullfees?.formattedPayable
                  ),
                  grossFee: activeLedgerData.fullfees?.formattedGross,
                  payableFee: activeLedgerData.fullfees?.formattedBasePayable || activeLedgerData.fullfees?.formattedPayable || "₹ 80,640",
                  extraOff: activeLedgerData.fullfees?.extraOff,
                  subtitle: "One-time lump sum • Max discount",
                  onClick: () => setSelectedPlanTab("fullfees"),
                },
                {
                  id: "emi",
                  isEmi: true,
                  title: (activeLedgerData.emi?.summary?.hasInterest && Number(activeLedgerData.emi?.summary?.interestRate) > 1) ? "Standard EMI" : "No-Cost EMI",
                  badge: {
                    text: (activeLedgerData.emi?.summary?.hasInterest && Number(activeLedgerData.emi?.summary?.interestRate) > 1) ? "EASY FINANCING" : "NO-COST EMI",
                    color: (activeLedgerData.emi?.summary?.hasInterest && Number(activeLedgerData.emi?.summary?.interestRate) > 1) ? "geekblue" : "orange",
                  },
                  hasDiscount: false,
                  grossFee: null,
                  payableFee: activeLedgerData.emi?.summary?.formattedMinMonthlyEmi ? `Starting ${activeLedgerData.emi.summary.formattedMinMonthlyEmi}` : "Bank & NBFC EMI",
                  subtitle: activeLedgerData.emi?.summary?.planName || "Bank & NBFC Financing",
                  onClick: () => {
                    setSelectedPlanTab("emi");
                    if (!activeLedgerData.emi?.hasSpecificPaymentTypes) {
                      setActiveEmiSubTab(null);
                    } else if (!activeLedgerData.emi?.[activeEmiSubTab]?.available) {
                      if (activeLedgerData.emi?.fullfees?.available) setActiveEmiSubTab("fullfees");
                      else if (activeLedgerData.emi?.yearly?.available) setActiveEmiSubTab("yearly");
                      else if (activeLedgerData.emi?.semester?.available) setActiveEmiSubTab("semester");
                    }
                  },
                },
              ].map((card) => {
                const isSelected = selectedPlanTab === card.id;
                const isEmi = card.isEmi;

                return (
                  <div
                    key={card.id}
                    onClick={card.onClick}
                    className={`p-2 sm:p-3 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between space-y-1 ${isSelected
                      ? isEmi
                        ? "border-amber-600 bg-amber-50/40 shadow-md ring-1 ring-amber-500/20"
                        : "border-[#0C2B4E] bg-blue-50/40 shadow-md ring-1 ring-[#0C2B4E]/10"
                      : isEmi
                        ? "border-amber-200 bg-amber-50/20 hover:border-amber-300 hover:shadow-xs"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs"
                      }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-1 min-w-0">
                        <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-tight truncate ${isEmi ? "text-amber-900" : "text-[#0C2B4E]"}`}>
                          {card.title}
                        </span>
                        {card.badge && (
                          <Tag
                            color={card.badge.color}
                            className="m-0 text-[8px] sm:text-[10px] font-semibold rounded-2xl whitespace-nowrap shrink-0 px-1 sm:px-1.5 leading-tight"
                          >
                            {card.badge.text}
                          </Tag>
                        )}
                      </div>
                      <div className="flex items-baseline gap-1 sm:gap-2 pt-0.5 sm:pt-1 flex-wrap">
                        {card.hasDiscount && card.grossFee && (
                          <span className="text-xs sm:text-[15px] font-bold text-gray-600 line-through decoration-red-600 decoration-2">
                            {card.grossFee}
                          </span>
                        )}
                        <span className={`text-sm sm:text-lg font-bold ${isEmi ? "text-amber-950" : "text-gray-900"}`}>
                          {card.payableFee}
                        </span>
                      </div>
                      {card.extraOff && card.extraOff.hasExtraOff ? (
                        <div className="pt-0.5">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8.5px] sm:text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                            🏷️ {card.extraOff.badgeText} • {card.extraOff.finalPayableText || `Pay ${card.extraOff.formattedFinalPayable}`}
                          </span>
                        </div>
                      ) : (
                        <p className={`text-[9.5px] sm:text-[11px] m-0 ${isEmi ? "text-amber-800/80 truncate" : "text-gray-500 truncate"}`}>
                          {card.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Non-EMI Plan Extra Off / Scholarship Details Banner */}
            {selectedPlanTab !== "emi" && activeLedgerData[selectedPlanTab] && activeLedgerData[selectedPlanTab]?.extraOff?.hasExtraOff && (
              <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-50/70 via-blue-50/40 to-emerald-50/60 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[#0C2B4E]">
                      {activeLedgerData[selectedPlanTab].label || (selectedPlanTab === "fullfees" ? "Fullfees (One-Time)" : selectedPlanTab === "yearly" ? "Yearly Plan" : "Semester-wise")}
                    </span>
                    {activeLedgerData[selectedPlanTab].badgeText && (
                      <Tag color="success" className="m-0 text-[10px] font-bold">
                        {activeLedgerData[selectedPlanTab].badgeText}
                      </Tag>
                    )}
                    <Tag color="gold" className="m-0 text-[10px] font-bold">
                      🔥 {activeLedgerData[selectedPlanTab].extraOff.badgeText}
                    </Tag>
                  </div>
                  <p className="text-emerald-800 text-[11.5px] sm:text-xs m-0 font-medium leading-relaxed">
                    Approved <strong>{activeLedgerData[selectedPlanTab].discountPercentage}% Scholarship</strong> ({activeLedgerData[selectedPlanTab].formattedDiscount} off) + <strong>{activeLedgerData[selectedPlanTab].extraOff.badgeText}</strong> applied! Final net payable: <span className="font-extrabold text-emerald-950 underline">{activeLedgerData[selectedPlanTab].extraOff.formattedFinalPayable}</span>
                  </p>
                </div>
                <div className="shrink-0 bg-white border border-emerald-300 px-3.5 py-1.5 rounded-lg text-right shadow-2xs">
                  <div className="text-[10px] uppercase font-extrabold text-emerald-700 tracking-wider">Final Net Fee</div>
                  <div className="text-base sm:text-lg font-black text-emerald-950">
                    {activeLedgerData[selectedPlanTab].extraOff.formattedFinalPayable}
                  </div>
                </div>
              </div>
            )}

            {/* EMI Breakdown View */}
            {selectedPlanTab === "emi" && activeLedgerData.emi && (() => {
              const hasSpecific = Boolean(activeLedgerData.emi.hasSpecificPaymentTypes);
              const availableSubTabs = hasSpecific ? [
                { key: "fullfees", label: "Full Course EMI", ledger: activeLedgerData.emi.fullfees },
                { key: "yearly", label: "Yearly EMI", ledger: activeLedgerData.emi.yearly },
                { key: "semester", label: "Semester EMI", ledger: activeLedgerData.emi.semester },
              ].filter(t => t.ledger && t.ledger.available) : [];

              const currentSubTabKey = hasSpecific && activeEmiSubTab && activeLedgerData.emi[activeEmiSubTab]?.available
                ? activeEmiSubTab
                : (availableSubTabs[0]?.key || null);

              const currentEmi = (currentSubTabKey && activeLedgerData.emi[currentSubTabKey]) || activeLedgerData.emi.summary;

              if (!currentEmi || !currentEmi.available) {
                return (
                  <div className="mt-4 p-5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-center text-amber-900 text-sm font-medium">
                    No EMI options available for the selected course fee structure.
                  </div>
                );
              }

              return (
                <div className="mt-4 rounded-xl bg-amber-50/60 border border-amber-200/80 overflow-hidden shadow-2xs">
                  {/* Full-width top attached Radio Group - Only shown when specific payment types are configured in EMI Plan */}
                  {hasSpecific && availableSubTabs.length > 1 && (
                    <div className="w-full bg-white border-b border-amber-200/80">
                      <ConfigProvider
                        theme={{
                          token: {
                            colorPrimary: "#b45309",
                          },
                        }}
                      >
                        <Radio.Group
                          value={currentSubTabKey}
                          onChange={(e) => setActiveEmiSubTab(e.target.value)}
                          buttonStyle="solid"
                          size="middle"
                          className="w-full flex [&_.ant-radio-button-wrapper]:flex-1 [&_.ant-radio-button-wrapper]:text-center [&_.ant-radio-button-wrapper]:font-semibold [&_.ant-radio-button-wrapper]:!h-auto [&_.ant-radio-button-wrapper]:min-h-[46px] [&_.ant-radio-button-wrapper]:py-1.5 sm:[&_.ant-radio-button-wrapper]:py-2 [&_.ant-radio-button-wrapper]:px-1 [&_.ant-radio-button-wrapper]:flex [&_.ant-radio-button-wrapper]:items-center [&_.ant-radio-button-wrapper]:justify-center [&_.ant-radio-button-wrapper]:border-0 [&_.ant-radio-button-wrapper]:rounded-none [&_.ant-radio-button-wrapper]:!leading-tight [&_.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)]:!bg-[#b45309] [&_.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)]:!border-[#b45309] [&_.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)]:!text-white"
                        >
                          {availableSubTabs.map((tab) => (
                            <Radio.Button key={tab.key} value={tab.key} className="text-xs sm:text-sm !h-auto">
                              <div className="flex flex-col items-center justify-center text-center w-full py-0.5">
                                <span className="font-bold text-[10.5px] sm:text-xs md:text-sm leading-tight">
                                  {tab.label}
                                </span>
                                <span className="opacity-90 font-medium text-[9.5px] sm:text-[11px] leading-tight mt-0.5 whitespace-nowrap">
                                  {tab.ledger.formattedMinMonthlyEmi}
                                </span>
                              </div>
                            </Radio.Button>
                          ))}
                        </Radio.Group>
                      </ConfigProvider>
                    </div>
                  )}

                  {/* Tenure Options Cards - Distinct Cards Spanning Full Width */}
                  {Array.isArray(currentEmi.tenures) && currentEmi.tenures.length > 0 && (() => {
                    const count = currentEmi.tenures.length;
                    const gridColsClass = count === 1
                      ? "grid-cols-1"
                      : count === 2
                        ? "grid-cols-1 sm:grid-cols-2"
                        : count === 3
                          ? "grid-cols-1 sm:grid-cols-3"
                          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

                    return (
                      <div className="p-3 sm:p-4 w-full">
                        <div className={`grid ${gridColsClass} gap-3 w-full`}>
                          {currentEmi.tenures.map((tenure, idx) => (
                            <div
                              key={idx}
                              className="bg-white rounded-xl border border-amber-200 p-3.5 sm:p-4 shadow-xs hover:shadow-md hover:border-amber-400 transition-all space-y-2.5 flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1.5">
                                  <span className="text-xs sm:text-sm font-extrabold text-amber-950 block">
                                    {tenure.months} Months Tenure
                                  </span>
                                  {tenure.interestRatePct && Number(tenure.interestRatePct) > 0 ? (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-2xl bg-blue-100 text-blue-800 border border-blue-300/60">
                                      {tenure.interestRatePct}% p.a. Interest
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                                      0% Interest
                                    </span>
                                  )}
                                </div>
                                <span className="text-base sm:text-lg font-black text-gray-900 block">
                                  {tenure.formattedMonthlyFee}
                                </span>
                              </div>

                              {(tenure.totalInterest > 0 || tenure.downPayment > 0) && (
                                <div className="pt-2 border-t border-gray-100 text-[11px] space-y-1 text-gray-600">
                                  {tenure.totalInterest > 0 && (
                                    <div className="flex justify-between items-center text-amber-900 font-medium">
                                      <span>Total Interest:</span>
                                      <span className="font-bold">{tenure.formattedTotalInterest}</span>
                                    </div>
                                  )}
                                  {tenure.totalPayableWithInterest > 0 && tenure.totalInterest > 0 && (
                                    <div className="flex justify-between items-center text-gray-900 font-semibold">
                                      <span>Total Payable:</span>
                                      <span className="font-bold text-[#0C2B4E]">{tenure.formattedTotalPayableWithInterest}</span>
                                    </div>
                                  )}
                                  {tenure.downPayment > 0 && (
                                    <div className="flex justify-between items-center text-amber-800 font-medium">
                                      <span>Downpayment:</span>
                                      <span className="font-bold">{tenure.formattedDownPayment}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              );
            })()}
          </div>
        )}

        {/* 4. Syllabus / Updated Course Curriculum */}
        {curriculumList.length > 0 && (
          <div
            id="syllabus"
            className="scroll-mt-16 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-3 sm:mb-4 m-0">
              {courseData?.name || "Course"} Course Updated Syllabus 2026 {universityName ? `at ${universityName}` : ""}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {curriculumList.map((sem, idx) => {
                const rawLabel = sem.semester || `Semester ${idx + 1}`;
                const numMatch = rawLabel.match(/\d+/);
                const semesterTitle = numMatch ? `Semester ${numMatch[0]}` : rawLabel;

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-2xs flex flex-col items-center hover:border-[#08AEAA] transition-colors h-[320px] sm:h-[350px]"
                  >
                    <div className="bg-[#0C3A66] text-white px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3 shadow-xs shrink-0">
                      {semesterTitle}
                    </div>

                    <div className="w-full h-px bg-gray-100 mb-3 sm:mb-4 shrink-0" />

                    <ul className="w-full text-left space-y-2 sm:space-y-2.5 text-xs sm:text-[13px] text-gray-700 m-0 p-0 list-none flex-1 overflow-y-auto pr-1.5 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
                      {sem.subjects.map((sub, sIdx) => {
                        const subName = typeof sub === "string" ? sub : (sub.name || "");

                        return (
                          <li key={sIdx} className="flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                            <span className="text-gray-900 font-bold shrink-0">•</span>
                            <span className="text-gray-700 break-words">{subName}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. Approvals / Rankings & Accreditations */}
        {approvalsList.length > 0 && (
          <div
            id="approvals"
            className="scroll-mt-16 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 text-center"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-4">
              {courseData?.approvalsTitle || (universityName ? `Rankings & Accreditations of ${universityName}` : "Rankings & Accreditations")}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 w-full">
              {approvalsList.map((item, idx) => {
                const logoSrc = item.logo || item.image ? getAssetPath(item.logo || item.image) : null;
                const title = item.name || item.code || "Accredited";
                const desc = item.description || `Approved by ${title}`;

                return (
                  <div
                    key={item._id || idx}
                    className="bg-white rounded-xl border border-gray-200 flex flex-col p-1.5 sm:p-3 items-center justify-between text-center aspect-[4/4.6] sm:aspect-square shadow-2xs hover:border-blue-300 transition-colors overflow-hidden shrink-0 w-[calc((100%-12px)/3)] sm:w-[calc((100%-20px)/3)] md:w-[calc((100%-60px)/6)]"
                  >
                    <div className="flex-1 min-h-0 w-full relative">
                      {logoSrc ? (
                        <Image
                          src={logoSrc}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 64px, 80px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Award className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div className="w-full shrink-0 flex flex-col items-center justify-start text-center pt-1">
                      <div className="w-full h-4 sm:h-5 flex items-center justify-center">
                        <h3 className="text-[10px] sm:text-[11.5px] md:text-[12.5px] font-bold text-gray-900 m-0 tracking-tight leading-tight line-clamp-1 w-full text-center">
                          {title}
                        </h3>
                      </div>
                      <div className="w-full h-[22px] sm:h-[26px] flex items-start justify-center mt-0.5">
                        {desc ? (
                          <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600 leading-tight m-0 line-clamp-2 w-full text-center">
                            {desc}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. Admission / Course Specialisations */}
        {specializations.length > 0 && (
          <div
            id="admission"
            ref={specializationSectionRef}
            className="scroll-mt-16 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 relative transition-all"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-5 sm:mb-7 m-0">
              {universityName ? `${universityName} ` : ""}{courseData?.name || "Course"} Specialisations
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4">
              {specializations.map((item, idx) => {
                const IconComponent = SPEC_ICONS[idx % SPEC_ICONS.length];
                const specTitle = item.name || "Specialization";

                return (
                  <div
                    key={item._id || idx}
                    onClick={() => setSelectedSpecModal(item)}
                    className="bg-white rounded-xl border border-gray-200 p-2.5 sm:p-3.5 md:p-4 flex items-center gap-2 sm:gap-3.5 cursor-pointer hover:border-[#08AEAA] hover:shadow-xs transition-all group"
                  >
                    <IconComponent className="text-[#0C3A66] group-hover:text-[#08AEAA] shrink-0 w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 transition-colors" />
                    <span className="text-[11px] sm:text-xs md:text-[13.5px] font-bold text-gray-900 group-hover:text-[#08AEAA] tracking-tight leading-snug transition-colors">
                      {specTitle}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Specialization Details Modal */}
            {selectedSpecModal && (() => {
              const specTitle = selectedSpecModal.name || "Specialization";
              const modalTitle = specTitle.toLowerCase().includes(" in ")
                ? specTitle
                : `${courseData?.name ? `${courseData.name} in ` : ""}${specTitle}`;
              const itemDuration = selectedSpecModal.duration || courseData?.duration;
              const itemFees = selectedSpecModal.fees || selectedSpecModal.fee || courseData?.fees;
              const itemDeadline = selectedSpecModal.admissionDeadline || courseData?.admissionDeadline;
              const itemDesc = selectedSpecModal.description?.trim() || "";

              return (
                <Modal
                  open={Boolean(selectedSpecModal)}
                  onCancel={() => setSelectedSpecModal(null)}
                  footer={null}
                  width={720}
                  centered
                  className="max-w-[95vw]"
                >
                  <div className="pt-2 pb-1 space-y-4">
                    {/* Header */}
                    <div className="border-b border-gray-100 pb-2.5 pr-8 sm:pr-10">
                      {universityName && (
                        <span className="text-[11px] font-bold text-[#08AEAA] uppercase tracking-wider block mb-1">
                          {universityName}
                        </span>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                        <h3 className="text-base sm:text-xl font-bold text-[#0D3B66] m-0 tracking-tight leading-snug break-words flex-1 min-w-0">
                          {modalTitle}
                        </h3>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 shrink-0">
                          {itemDuration && (
                            <div className="inline-flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200 text-xs font-semibold text-gray-700">
                              <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <span>{itemDuration}</span>
                            </div>
                          )}
                          {itemFees && (
                            <div className="inline-flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200 text-xs font-semibold text-gray-700">
                              <span className="text-gray-400 font-normal">Fee:</span>
                              <span className="text-[#0D3B66] font-bold">
                                {typeof itemFees === "string" ? itemFees : `₹ ${itemFees}`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Body: Banner + Details */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                      <div className="relative w-full sm:w-56 aspect-video sm:aspect-4/3 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                        {heroBannerSrc ? (
                          <Image
                            src={heroBannerSrc}
                            alt={modalTitle}
                            fill
                            sizes="(max-width: 640px) 100vw, 240px"
                            className="object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#0C2B4E] flex items-center justify-center text-white/40">
                            <GraduationCap className="w-12 h-12" />
                          </div>
                        )}

                        {universityLogoSrc && (
                          <div className="absolute top-2.5 left-2.5 z-10 bg-white/95 rounded-lg shadow-sm p-1.5 border border-gray-100 flex items-center justify-center">
                            <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                              <Image
                                src={universityLogoSrc}
                                alt={universityName || "University Logo"}
                                fill
                                sizes="32px"
                                className="object-contain"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-3 text-left w-full">
                        {itemDesc && (
                          <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed m-0">
                            {itemDesc}
                          </p>
                        )}

                        {itemDeadline && (
                          <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200 text-xs text-gray-600 w-fit">
                            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span>
                              Deadline: <strong className="text-gray-900">{itemDeadline}</strong>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Specialization Semester-Wise Curriculum */}
                    {Array.isArray(selectedSpecModal.curriculum) && selectedSpecModal.curriculum.length > 0 && (
                      <div className="pt-3 border-t border-gray-100 text-left">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs sm:text-[13px] font-bold text-[#0D3B66] uppercase tracking-wider m-0">
                            {specTitle} Curriculum
                          </h4>
                          <span className="text-[11px] text-gray-500 font-medium">
                            {selectedSpecModal.curriculum.reduce((acc, sem) => acc + (sem.subjects?.length || 0), 0)} Total Subjects
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
                          {selectedSpecModal.curriculum.map((sem, sIdx) => (
                            <div key={sIdx} className="bg-gray-50/90 rounded-xl p-2.5 border border-gray-200/80">
                              <div className="text-[11.5px] font-bold text-[#0C3A66] mb-1.5 pb-1 border-b border-gray-200 flex items-center justify-between">
                                <span>{sem.semesterName || `Semester ${sIdx + 1}`}</span>
                                <span className="text-[10px] text-gray-500 font-semibold">{sem.subjects?.length || 0} subjects</span>
                              </div>
                              <ul className="space-y-1 text-xs text-gray-700 m-0 p-0 list-none">
                                {(sem.subjects || []).map((sub, subIdx) => (
                                  <li key={subIdx} className="flex items-start gap-1.5 leading-snug">
                                    <span className="text-[#08AEAA] font-bold shrink-0">•</span>
                                    <span>{typeof sub === "string" ? sub : (sub.name || "")}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTAs */}
                    <div className="w-full flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5 pt-2 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => {
                          const title = modalTitle;
                          setSelectedSpecModal(null);
                          handleOpenLead("Download Brochure", title);
                        }}
                        className="w-full sm:flex-1 bg-[#0C2B4E] hover:bg-[#081f38] text-white text-xs sm:text-sm font-semibold py-2.5 px-3 sm:px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap border-none"
                      >
                        <span>Download Brochure</span>
                        <Download className="w-3.5 h-3.5 shrink-0" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const title = modalTitle;
                          setSelectedSpecModal(null);
                          handleOpenLead("Free Counseling", title);
                        }}
                        className="w-full sm:flex-1 bg-white hover:bg-gray-50 text-[#0C2B4E] border border-[#0C2B4E] text-xs sm:text-sm font-semibold py-2.5 px-3 sm:px-4 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
                      >
                        Get 100% FREE Counseling
                      </button>
                    </div>
                  </div>
                </Modal>
              );
            })()}
          </div>
        )}

        {/* 7. Alternative / Top Universities Offering Course Cards Section */}
        {processedPrograms.length > 0 && (
          <div
            id="alternative"
            className="scroll-mt-16 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-6 sm:mb-8 m-0">
              Top Universities Offering {courseData?.name || "Online Courses"}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 auto-rows-fr">
              {processedPrograms.slice(0, visibleCount).map((item, index) => {
                const uName = item.uniName || "Partner University";
                const cardTitle = item.cardTitle || item.title || "Course Program";
                const logoUrl = item.logoUrl;
                const providerName = item.providerName || null;
                const durationText = item.durationText || null;
                const feeText = item.feeText || null;
                const rawHref = item.courseDetailHref || `/courses`;
                const courseDetailHref =
                  rawHref.startsWith("/courses/") && rawHref.split("/").length > 3
                    ? rawHref.replace("/courses/", "/university/")
                    : rawHref;
                const inCmp = isInCompare(item._id || item.slug || cardTitle);

                return (
                  <div
                    key={item._uniqueKey || `${cardTitle}-${index}`}
                    className={`bg-gray-50 rounded-xl border border-gray-200 hover:border-[#08AEAA] p-2 sm:p-2.5 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative group min-w-0 w-full h-full shadow-2xs ${index === 5 && visibleCount === 6 ? "flex lg:hidden" : "flex"
                      }`}
                  >
                    {/* Top Right Corner Pinned Provider Badge */}
                    {Boolean(providerName) && (
                      <div className="absolute top-0 right-0 z-10 pointer-events-none">
                        <span className="bg-[#FFF0F3] border-b border-l border-[#FFE4E6] text-[#E52E2E] text-[8.5px] sm:text-[9.5px] font-bold px-1.5 py-0.5 rounded-bl-lg rounded-tr-xl">
                          {providerName}
                        </span>
                      </div>
                    )}

                    {/* University Logo */}
                    <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full p-1 flex items-center justify-center relative mt-2.5 sm:mt-3 mb-1.5 sm:mb-2 shrink-0">
                      {logoUrl ? (
                        <Link href={courseDetailHref} className="relative w-full h-full block">
                          <Image
                            src={logoUrl}
                            alt={uName}
                            fill
                            sizes="(max-width: 768px) 48px, 60px"
                            className="object-contain p-0.5 transition-transform group-hover:scale-105"
                          />
                        </Link>
                      ) : (
                        <Link href={courseDetailHref} className="w-full h-full rounded-full bg-teal-50 text-[#08AEAA] font-bold flex items-center justify-center text-xs uppercase no-underline">
                          {uName.charAt(0)}
                        </Link>
                      )}
                    </div>

                    {/* University Name & Fee/Duration */}
                    <div className="w-full flex-1 flex flex-col justify-center">
                      <div className="flex items-center justify-center">
                        <Link
                          href={courseDetailHref}
                          className="text-xs sm:text-[13px] font-semibold text-[#0a2540] hover:text-[#08AEAA] line-clamp-2 leading-tight m-0 w-full text-center no-underline transition-colors"
                        >
                          {uName}
                        </Link>
                      </div>

                      <div className="min-h-9 flex items-center justify-center gap-1 sm:gap-1.5 text-center w-full whitespace-nowrap overflow-hidden pt-0.5">
                        {feeText ? (
                          <span className="text-[11.5px] sm:text-[13px] font-bold text-[#0D3B66] tracking-tight shrink-0">
                            {feeText.replace(/\s*\/\s*Semester/i, " / Sem").replace(/\s*INR$/, "")}
                          </span>
                        ) : null}
                        {feeText && durationText && (
                          <span className="text-gray-300 text-xs shrink-0">•</span>
                        )}
                        {durationText ? (
                          <div className="text-[10.5px] sm:text-[11.5px] text-gray-500 font-normal flex items-center gap-0.5 sm:gap-1 shrink-0">
                            <Clock className="w-3 h-3 shrink-0 text-gray-400" />
                            <span>{durationText}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Action Buttons with Divider and Compare */}
                    <div className="w-full mt-auto pt-1.5">
                      <div className="w-full grid grid-cols-2 gap-1.5 items-center">
                        <button
                          type="button"
                          onClick={() => {
                            openFormModal({
                              title: "Apply for Course",
                              subtitle: cardTitle,
                              defaultCourse: cardTitle,
                              university: uName,
                              formNameOverride: `CourseCard_${item.slug || uName}`,
                              submitButtonText: "Apply Now",
                            });
                          }}
                          className="w-full bg-[#F4D068] hover:bg-[#ebc557] text-gray-900 text-[11px] sm:text-xs font-semibold py-2 px-1 rounded-md sm:rounded-lg border-none cursor-pointer transition-colors active:scale-95 flex items-center justify-center text-center whitespace-nowrap leading-none"
                        >
                          Apply Now
                        </button>
                        <Link
                          href={courseDetailHref}
                          className="w-full bg-[#0D3B66] hover:bg-[#072440] text-white border-none text-[11px] sm:text-xs font-semibold py-2 px-1 rounded-md sm:rounded-lg text-center no-underline transition-colors flex items-center justify-center whitespace-nowrap leading-none"
                        >
                          Know More
                        </Link>
                      </div>

                      <hr className="w-full border-t border-gray-200 my-1.5" />

                      <button
                        type="button"
                        onClick={() => {
                          const targetItem = {
                            _id: item._id || item.slug,
                            slug: item.slug || item._id,
                            title: cardTitle,
                            uniName: uName,
                            logoUrl: logoUrl,
                            feeText: feeText,
                            durationText: durationText,
                          };
                          toggleCompare(targetItem);
                          setIsCompareDrawerOpen(true);
                        }}
                        className={`w-full py-1 text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer mt-1 border-none bg-transparent min-h-[22px] ${inCmp
                          ? "text-[#08AEAA] font-bold"
                          : "text-gray-600 hover:text-[#0D3B66]"
                          }`}
                      >
                        {inCmp ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#08AEAA] shrink-0 stroke-[2.5]" />
                            <span>Added to Compare</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-gray-500 shrink-0 stroke-2" />
                            <span>Add to Compare</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More / View Less Button */}
            {processedPrograms.length > 5 && (
              <div className="flex justify-center mt-4 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((prev) =>
                      prev >= processedPrograms.length ? 6 : processedPrograms.length
                    )
                  }
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
                >
                  <span>
                    {visibleCount >= processedPrograms.length ? "View Less" : "View More"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${visibleCount >= processedPrograms.length
                      ? "rotate-180"
                      : "group-hover:translate-y-0.5"
                      }`}
                  />
                </button>
              </div>
            )}
          </div>
        )}

        {/* 8. FAQs Section */}
        {faqList.length > 0 && (
          <div
            id="faqs"
            className="scroll-mt-16 bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8 space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 text-center">
              FAQs on {courseData?.name || "Course"} {universityName ? `at ${universityName}` : ""}
            </h2>

            <div className="space-y-3 max-w-5xl mx-auto">
              {faqList.map((faq, idx) => {
                const isOpen = openFaq === idx;
                const question = faq.question || faq.q || "";
                const answer = faq.answer || faq.a || "";

                return (
                  <div
                    key={faq._id || idx}
                    className={`rounded-xl border border-gray-300 transition-all duration-200 overflow-hidden ${isOpen
                      ? "border-blue-400 bg-blue-200/30 shadow-2xs"
                      : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-4 p-2 sm:p-2.5 text-left cursor-pointer bg-transparent border-none outline-none"
                    >
                      <span
                        className={`text-xs sm:text-[14px] font-semibold leading-snug ${isOpen ? "text-[#0C2B4E]" : "text-gray-900"
                          }`}
                      >
                        Q{idx + 1}. {question}
                      </span>
                      <span
                        className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 transition-colors ${isOpen
                          ? "bg-[#0C2B4E] text-white"
                          : "bg-gray-300 text-gray-500"
                          }`}
                      >
                        {isOpen ? <Minus size={10} /> : <Plus size={10} />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="p-3 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal border-t border-blue-100/60 whitespace-pre-line">
                        {answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
