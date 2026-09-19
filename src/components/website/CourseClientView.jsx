"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  CreditCard,
  Download,
  MapPin,
  Building,
  Building2,
  ShieldCheck,
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
} from "lucide-react";
import { Carousel, Tag } from "antd";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import { Container } from "@/components/common/Container";
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

    const fullEmi = full?.emi || emi?.fullfees || (emi?.available && !emi.fullfees ? emi : null);
    const yearEmi = year?.emi || emi?.yearly || (emi?.available && !emi.yearly ? emi : null);
    const semEmi = sem?.emi || emi?.semester || (emi?.available && !emi.semester ? emi : null);

    const availableSummary =
      (fullEmi?.available ? fullEmi : null) ||
      (yearEmi?.available ? yearEmi : null) ||
      (semEmi?.available ? semEmi : null) ||
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
      },
      scholarship: promoData?.scholarship || null,
      coupon: promoData?.coupon || null,
      appliedPromoCode: promoData?.appliedPromoCode || null,
    };
  }, [courseData]);
  const [visibleCount, setVisibleCount] = useState(6);

  const [activeSpecIndex, setActiveSpecIndex] = useState(null);
  const carouselRef = useRef(null);
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

  const universityName = courseData?.universityName || "";
  const displayCourseTitle = courseData?.name || "Course Details";
  const heroBannerSrc = getAssetPath(courseData?.bannerImage);
  const universityLogoSrc = courseData?.logo ? getAssetPath(courseData.logo) : null;

  const approvalsList = useMemo(() => {
    return Array.isArray(courseData?.approvals) ? courseData.approvals : [];
  }, [courseData]);

  const approvalsSummary = useMemo(() => {
    if (approvalsList.length > 0) {
      return approvalsList
        .map((a) => a.name || a.code || (typeof a === "string" ? a : ""))
        .filter(Boolean)
        .join(" | ");
    }
    return "";
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
      const uniName = uni.name || item.uniName || item.name || "Partner University";
      const uSlug = (uni.slug || "").toLowerCase().trim();
      const uNameLower = uniName.toLowerCase().trim();

      // Exclude the current university where the user already is
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

      const uniSlug = uni?.slug || slugify(uniName);
      const courseSlug = course?.slug || slugify(course?.shortName || course?.name || courseName);
      const subcourseSlug = subcourse?.slug || (subcourse?.name ? slugify(subcourse.name) : "");

      let courseDetailHref = "/courses";
      if (uniSlug && courseSlug && subcourseSlug) {
        courseDetailHref = `/courses/${encodeURIComponent(uniSlug)}/${encodeURIComponent(courseSlug)}/${encodeURIComponent(subcourseSlug)}`;
      } else if (uniSlug && courseSlug) {
        courseDetailHref = `/courses/${encodeURIComponent(uniSlug)}/${encodeURIComponent(courseSlug)}`;
      } else if (courseSlug && subcourseSlug) {
        courseDetailHref = `/courses/${encodeURIComponent(courseSlug)}/${encodeURIComponent(subcourseSlug)}`;
      } else if (courseSlug) {
        courseDetailHref = `/courses/${encodeURIComponent(courseSlug)}`;
      } else if (item.slug) {
        courseDetailHref = `/courses/${encodeURIComponent(item.slug)}`;
      }

      list.push({
        ...item,
        _uniqueKey: `${item._id || item.slug || cardTitle || "program"}-${index}`,
        title: cardTitle,
        cardTitle,
        displayName,
        uniName,
        logoUrl,
        providerName,
        durationText,
        feeText,
        courseDetailHref,
        subcourses: item.subcourses || [],
      });
    });

    return list;
  }, [rawCourses]);

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

  useBreadcrumb({
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
  }, [displayCourseTitle, courseData?.fullName]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased font-sans pb-10">
      <div className="pt-4 space-y-6 max-w-6xl mx-auto px-3 sm:px-4 md:px-0">
        {/* Hero Banner Section */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-[#0C2B4E] flex flex-col md:grid md:grid-cols-12 min-h-80 md:min-h-90">
          {/* Mobile Image (Top) / Desktop Image (Right) */}
          <div className="order-1 md:order-2 md:col-span-6 relative w-full h-64 sm:h-72 md:h-full overflow-hidden rounded-b-4xl md:rounded-l-4xl">
            <Image
              src={heroBannerSrc}
              alt={displayCourseTitle}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />

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
                onClick={() => handleOpenLead("Download Broucher")}
                className="flex-1 sm:flex-initial bg-[#E5A93C] hover:bg-[#D4982B] text-gray-950 font-bold px-2.5 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 text-center leading-tight whitespace-nowrap"
              >
                <span>Download Broucher</span>
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

        {/* Quick Facts Bar */}
        <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Location */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <MapPin size={22} className="text-[#0D5CAD] fill-[#0D5CAD] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-gray-600 font-medium block">Location</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight truncate">
                  {courseData?.location || "Online"}
                </span>
              </div>
            </div>

            {/* Established */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <Building2 size={22} className="text-[#0D5CAD] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-gray-600 font-medium block">Established</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight truncate">
                  {courseData?.established || "N/A"}
                </span>
              </div>
            </div>

            {/* Approvals */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <BadgeCheck size={22} className="text-white fill-[#0D5CAD] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-gray-600 font-medium block">Approvals :</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight line-clamp-2">
                  {approvalsSummary || "UGC / AICTE Approved"}
                </span>
              </div>
            </div>

            {/* Eligibility */}
            <div className="flex items-start gap-2.5 sm:gap-3">
              <User size={22} className="text-[#0D5CAD] fill-[#0D5CAD] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-gray-600 font-medium block">Eligibility</span>
                <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight line-clamp-2">
                  {courseData?.eligibility || "10+2 / Graduation"}
                </span>
              </div>
            </div>
          </div>
        </div>



        {/* Course Overview */}
        {(courseData?.overview || courseData?.description) && (
          <div className="bg-white rounded-xl border border-gray-200/90 p-6 sm:p-4 text-center space-y-3 shadow-xs">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight m-0">
                {courseData.overviewTitle || `${courseData.name} Course Overview`}
              </h2>
              <div className="w-full max-w-2xl mx-auto h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-4xl mx-auto m-0 text-center">
              {courseData.overview || courseData.description}
            </p>
          </div>
        )}

        {/* Fee Structure & Dynamic 3-Plan Ledger Selector */}
        {activeLedgerData && (
          <div className="bg-white rounded-xl border border-gray-200/90 p-4 sm:p-4 md:p-6 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-center">
              <div>
                <div className="flex items-center justify-center">
                  <h2 className="text-xl sm:text-xl font-extrabold text-[#0C2B4E] tracking-tight m-0">
                    Fee Structure & Flexible Payment Plans
                  </h2>
                </div>
              </div>
            </div>

            {/* Side-by-Side Plan & EMI Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  payableFee: activeLedgerData.semester?.formattedPayable || "₹ 16,320 / Sem",
                  subtitle: `${activeLedgerData.semester?.totalSemesters || 6} Semesters • Installments`,
                  onClick: () => setSelectedPlanTab("semester"),
                },
                {
                  id: "yearly",
                  title: "Yearly (Annual)",
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
                  payableFee: activeLedgerData.yearly?.formattedPayable || "₹ 30,720 / Year",
                  subtitle: `${activeLedgerData.yearly?.totalYears || 3} Annual Installments`,
                  onClick: () => setSelectedPlanTab("yearly"),
                },
                {
                  id: "fullfees",
                  title: "Fullfees (One-Time)",
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
                  payableFee: activeLedgerData.fullfees?.formattedPayable || "₹ 80,640",
                  subtitle: "One-time lump sum • Max discount",
                  onClick: () => setSelectedPlanTab("fullfees"),
                },
                {
                  id: "emi",
                  isEmi: true,
                  title: activeLedgerData.emi?.summary?.hasInterest ? "Standard EMI Plan" : "No-Cost EMI Plan",
                  badge: {
                    text: activeLedgerData.emi?.summary?.hasInterest ? "EASY FINANCING" : "0% INTEREST",
                    color: activeLedgerData.emi?.summary?.hasInterest ? "geekblue" : "orange",
                  },
                  hasDiscount: false,
                  grossFee: null,
                  payableFee: activeLedgerData.emi?.summary?.formattedMinMonthlyEmi ? `Starting ${activeLedgerData.emi.summary.formattedMinMonthlyEmi}` : "Bank & NBFC EMI",
                  subtitle: activeLedgerData.emi?.summary?.planName || "Bank & NBFC Financing",
                  onClick: () => {
                    setSelectedPlanTab("emi");
                    if (!activeLedgerData.emi?.[activeEmiSubTab]?.available) {
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
                    className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between space-y-1 ${isSelected
                      ? isEmi
                        ? "border-amber-600 bg-amber-50/40 shadow-md ring-1 ring-amber-500/20"
                        : "border-[#0C2B4E] bg-blue-50/40 shadow-md ring-1 ring-[#0C2B4E]/10"
                      : isEmi
                        ? "border-amber-200 bg-amber-50/20 hover:border-amber-300 hover:shadow-xs"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs"
                      }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-1.5 min-w-0">
                        <span className={`text-[11px] sm:text-xs font-semibold uppercase tracking-tight whitespace-nowrap ${isEmi ? "text-amber-900" : "text-[#0C2B4E]"}`}>
                          {card.title}
                        </span>
                        {card.badge && (
                          <Tag
                            color={card.badge.color}
                            className="m-0 text-[9.5px] sm:text-[10px] font-semibold rounded-2xl whitespace-nowrap shrink-0"
                          >
                            {card.badge.text}
                          </Tag>
                        )}
                      </div>
                      <div className="flex items-baseline gap-2 pt-1 flex-wrap">
                        {card.hasDiscount && card.grossFee && (
                          <span className="text-[15px] font-bold text-gray-600 line-through decoration-red-600 decoration-2">
                            {card.grossFee}
                          </span>
                        )}
                        <span className={`text-lg font-bold ${isEmi ? "text-amber-950" : "text-gray-900"}`}>
                          {card.payableFee}
                        </span>
                      </div>
                      <p className={`text-[11px] m-0 ${isEmi ? "text-amber-800/80 truncate" : "text-gray-500"}`}>
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* EMI Breakdown View */}
            {selectedPlanTab === "emi" && activeLedgerData.emi && (() => {
              const availableSubTabs = [
                { key: "fullfees", label: "Full Course EMI", ledger: activeLedgerData.emi.fullfees },
                { key: "yearly", label: "Yearly EMI", ledger: activeLedgerData.emi.yearly },
                { key: "semester", label: "Semester EMI", ledger: activeLedgerData.emi.semester },
              ].filter(t => t.ledger && t.ledger.available);

              const currentSubTabKey = activeEmiSubTab && activeLedgerData.emi[activeEmiSubTab]?.available
                ? activeEmiSubTab
                : (availableSubTabs[0]?.key || "fullfees");

              const currentEmi = activeLedgerData.emi[currentSubTabKey] || activeLedgerData.emi.summary;

              if (!currentEmi || !currentEmi.available) {
                return (
                  <div className="mt-4 p-5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-center text-amber-900 text-sm font-medium">
                    No EMI options available for the selected course fee structure.
                  </div>
                );
              }

              return (
                <div className="mt-4 p-4 sm:p-5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-4">
                  {/* Payment Type EMI Sub-Tabs */}
                  {availableSubTabs.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-amber-200/60">
                      <span className="text-xs font-bold text-amber-950 mr-2">Select EMI Payment Plan:</span>
                      {availableSubTabs.map((tab) => (
                        <button
                          key={tab.key}
                          type="button"
                          onClick={() => setActiveEmiSubTab(tab.key)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${currentSubTabKey === tab.key
                            ? "bg-amber-700 text-white shadow-xs"
                            : "bg-white text-amber-900 border border-amber-300 hover:bg-amber-100"
                            }`}
                        >
                          {tab.label} ({tab.ledger.formattedMinMonthlyEmi})
                        </button>
                      ))}
                    </div>
                  )}


                  {/* Tenure Options Cards */}
                  {Array.isArray(currentEmi.tenures) && currentEmi.tenures.length > 0 && (
                    <div>
                      <span className="text-xs font-bold text-amber-950 block mb-2">Available Monthly Tenure Options:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {currentEmi.tenures.map((tenure, idx) => (
                          <div key={idx} className="bg-white rounded-xl border border-amber-200 p-3.5 shadow-2xs space-y-2 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-xs font-extrabold text-amber-900 block">{tenure.months} Months Tenure</span>
                                {tenure.interestRatePct && Number(tenure.interestRatePct) > 0 ? (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300/60">
                                    {tenure.interestRatePct}% p.a. Interest
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                                    0% Interest
                                  </span>
                                )}
                              </div>
                              <span className="text-base font-black text-gray-900 block">{tenure.formattedMonthlyFee}</span>
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
                  )}
                </div>
              );
            })()}


          </div>
        )}

        {/* Rankings & Accreditations */}
        {approvalsList.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 sm:mb-7 m-0">
              {courseData?.approvalsTitle || (universityName ? `Rankings & Accreditations of ${universityName}` : "Rankings & Accreditations")}
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-2 sm:gap-3.5 md:gap-4">
              {approvalsList.map((item, idx) => {
                const logoSrc = item.logo || item.image ? getAssetPath(item.logo || item.image) : null;
                const title = item.name || item.code || "Accredited";
                const desc = item.description || `Approved by ${title}`;

                return (
                  <div
                    key={item._id || idx}
                    className="bg-white rounded-xl border border-gray-200 p-2 sm:p-2.5 md:p-3 flex flex-col items-center justify-center text-center aspect-square shadow-2xs hover:border-blue-300 transition-colors"
                  >
                    <div className="h-8 sm:h-10 md:h-11 flex items-center justify-center relative w-full mb-1 shrink-0">
                      {logoSrc ? (
                        <Image
                          src={logoSrc}
                          alt={title}
                          width={60}
                          height={50}
                          className="object-contain max-h-7 sm:max-h-9 md:max-h-10 w-auto"
                        />
                      ) : (
                        <Award className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                      )}
                    </div>
                    <h3 className="text-[10.5px] sm:text-xs md:text-[13px] font-bold text-gray-900 m-0 tracking-tight leading-tight line-clamp-2 w-full">
                      {title}
                    </h3>
                    <p className="text-[8.5px] sm:text-[9.5px] md:text-[10.5px] text-gray-500 leading-tight m-0 line-clamp-2 w-full mt-0.5">
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Key Highlights Table Card */}
        {highlightsList.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-5 sm:mb-7 m-0">
              Key Highlights of {courseData?.name || "Course"} {universityName ? `at ${universityName} ` : ""}2026
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border border-gray-300 border-collapse">
                <thead>
                  <tr className="bg-[#102A45] text-white font-bold">
                    <th className="py-2.5 px-4 sm:px-5 w-[25%] sm:w-[22%] border-r border-white/20">Category</th>
                    <th className="py-2.5 px-4 sm:px-5">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300 text-gray-700 bg-white">
                  {highlightsList.map((row, idx) => (
                    <tr key={row._id || idx} className="border-b border-gray-300 hover:bg-gray-50/40 transition-colors">
                      <td className="py-2.5 px-4 sm:px-5 font-bold text-gray-900 border-r border-gray-300">
                        {row.label}
                      </td>
                      <td className="py-2.5 px-4 sm:px-5">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Course Specialisations */}
        {specializations.length > 0 && (
          <div
            ref={specializationSectionRef}
            className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 relative transition-all"
          >
            {activeSpecIndex === null ? (
              <>
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
                        onClick={() => {
                          setActiveSpecIndex(idx);
                          specializationSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                        }}
                        className="bg-white rounded-xl border border-gray-200 p-2.5 sm:p-3.5 md:p-4 flex items-center gap-2 sm:gap-3.5 cursor-pointer hover:border-blue-400 transition-colors"
                      >
                        <IconComponent className="text-[#205493] shrink-0 w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />
                        <span className="text-[11px] sm:text-xs md:text-[13.5px] font-bold text-gray-900 tracking-tight leading-snug">
                          {specTitle}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="relative">
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setActiveSpecIndex(null)}
                  className="absolute top-0 right-0 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
                  title="Close preview"
                  aria-label="Close specialization view"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                {/* Ant Design Carousel with dots and smooth slide navigation */}
                <Carousel
                  ref={carouselRef}
                  arrows={false}
                  dots={false}
                  infinite={true}
                  draggable={true}
                  swipe={true}
                  initialSlide={activeSpecIndex}
                  afterChange={(current) => setActiveSpecIndex(current)}
                  className="specialization-carousel w-full"
                >
                  {specializations.map((item, idx) => {
                    const specTitle = item.name || "Specialization";
                    const modalTitle = specTitle.toLowerCase().includes(" in ")
                      ? specTitle
                      : `${courseData?.name ? `${courseData.name} in ` : ""}${specTitle}`;
                    const itemDuration = item.duration || courseData?.duration;
                    const itemFees = item.fees || item.fee || courseData?.fees;
                    const itemDeadline = item.admissionDeadline || courseData?.admissionDeadline;
                    const itemDesc =
                      item.description?.trim() ||
                      `${modalTitle} specialization under ${courseData?.name || "this program"}${universityName ? ` at ${universityName}` : ""}. Equips learners with specialized industry knowledge and professional competencies.`;

                    return (
                      <div key={item._id || idx} className="outline-none">
                        <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-5 sm:gap-6 pt-1">
                          {/* Left: Dynamic Banner Image with University Badge */}
                          <div className="relative w-full max-w-65 sm:w-65 sm:max-w-none aspect-square shrink-0 rounded-2xl overflow-hidden shadow-none">
                            <Image
                              src={heroBannerSrc}
                              alt={modalTitle || displayCourseTitle}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover object-center rounded-2xl"
                              priority={idx === 0}
                            />

                            {/* University Logo Badge on Image */}
                            {universityLogoSrc && (
                              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 bg-white rounded-xl shadow-md p-1.5 sm:p-2 border border-gray-100 flex items-center justify-center">
                                <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center">
                                  <Image
                                    src={universityLogoSrc}
                                    alt={universityName || "University Logo"}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-contain"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right: Content details */}
                          <div className="flex-1 flex flex-col justify-between space-y-3.5 text-left py-1 w-full">
                            <div className="space-y-1">
                              <h3 className="text-xl sm:text-2xl font-bold text-[#0D3B66] m-0 tracking-tight leading-snug">
                                {modalTitle}
                              </h3>
                              <p className="text-xs sm:text-[13px] text-gray-500 font-medium m-0">
                                {specTitle}
                              </p>
                              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed m-0 font-normal pt-1">
                                {itemDesc}
                              </p>
                            </div>

                            <div className="space-y-2 text-xs sm:text-[13px] text-[#0D3B66] font-medium pt-1">
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                {itemDuration && (
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-[#0D3B66] shrink-0" />
                                    <span className="text-gray-800">{itemDuration}</span>
                                  </div>
                                )}
                                {itemFees && (
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[#0D3B66] font-bold text-sm">₹</span>
                                    <span className="text-gray-800">
                                      {itemFees.replace(/^₹\s*/, "")}
                                    </span>
                                  </div>
                                )}
                              </div>
                              {itemDeadline && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-[#0D3B66] shrink-0" />
                                  <span className="text-gray-800">
                                    Admission Deadline : {itemDeadline}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div className="w-full flex items-center gap-2 sm:gap-3 pt-2">
                              <button
                                type="button"
                                onClick={() => {
                                  handleOpenLead("Download Brochure", modalTitle);
                                }}
                                className="flex-1 bg-[#0C2B4E] hover:bg-[#081f38] text-white text-[10px] sm:text-sm font-semibold py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
                              >
                                <span>Download Broucher</span>
                                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  handleOpenLead("Free Counseling", modalTitle);
                                }}
                                className="flex-1 bg-white hover:bg-gray-50 text-[#0C2B4E] border border-[#0C2B4E] text-[10px] sm:text-sm font-semibold py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
                              >
                                Get 100% FREE Counseling
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>

                {/* All Available Specialisations Underneath */}
                <div className="mt-6 sm:mt-7">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#0D3B66] text-center m-0 mb-4 sm:mb-5 tracking-tight">
                    {universityName ? `${universityName} ` : ""}{courseData?.name || "Course"} Specialisations
                  </h4>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4">
                    {specializations.map((item, idx) => {
                      const IconComponent = SPEC_ICONS[idx % SPEC_ICONS.length];
                      const specTitle = item.name || "Specialization";
                      const isSelected = activeSpecIndex === idx;

                      return (
                        <div
                          key={item._id || idx}
                          onClick={() => {
                            setActiveSpecIndex(idx);
                            carouselRef.current?.goTo(idx);
                          }}
                          className={`rounded-xl border p-2.5 sm:p-3.5 md:p-4 flex items-center gap-2 sm:gap-3.5 cursor-pointer transition-all ${isSelected
                            ? "bg-blue-50/70 border-blue-600 ring-1 ring-blue-500 shadow-xs"
                            : "bg-white border-gray-200 hover:border-blue-400"
                            }`}
                        >
                          <IconComponent className={`shrink-0 w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 ${isSelected ? "text-blue-700" : "text-[#205493]"}`} />
                          <span className={`text-[11px] sm:text-xs md:text-[13.5px] font-bold tracking-tight leading-snug ${isSelected ? "text-blue-900 font-semibold" : "text-gray-900"}`}>
                            {specTitle}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Online Course Updated Syllabus (Exact Screenshot Match) */}
        {curriculumList.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-5 sm:mb-8 m-0">
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
                    className="bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-2xs flex flex-col items-center hover:border-blue-300 transition-colors"
                  >
                    <div className="bg-[#0066CC] text-white px-5 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 shadow-xs">
                      {semesterTitle}
                    </div>

                    <div className="w-full h-px bg-gray-100 mb-3 sm:mb-4" />

                    <ul className="w-full text-left space-y-2 sm:space-y-2.5 text-[11px] sm:text-[13px] text-gray-700 m-0 p-0 list-none flex-1">
                      {sem.subjects.map((sub, sIdx) => {
                        const subName = typeof sub === "string" ? sub : (sub.name || "");
                        return (
                          <li key={sIdx} className="flex items-start gap-1.5 sm:gap-2 leading-relaxed">
                            <span className="text-gray-900 font-bold shrink-0">•</span>
                            <span className="text-gray-700">{subName}</span>
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

        {/* Top Universities Offering Course Cards Section */}
        {processedPrograms.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-6 sm:mb-8 m-0">
              Top Universities Offering {courseData?.name || "Online Courses"}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {processedPrograms.slice(0, visibleCount).map((item, index) => {
                const uName = item.uniName || "Partner University";
                const cardTitle = item.cardTitle || item.title || "Course Program";
                const logoUrl = item.logoUrl;
                const providerName = item.providerName || null;
                const durationText = item.durationText || null;
                const feeText = item.feeText || null;
                const courseDetailHref = item.courseDetailHref || `/courses`;

                return (
                  <div
                    key={item._uniqueKey || `${cardTitle}-${index}`}
                    className={`bg-white rounded-xl sm:rounded-2xl border border-gray-200 hover:border-blue-400 p-2.5 sm:p-3.5 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative group min-w-0 shadow-2xs ${index === 5 && visibleCount === 6 ? "flex lg:hidden" : "flex"
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
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full p-1 sm:p-1.5 flex items-center justify-center bg-white border border-gray-100 shadow-2xs relative my-1 shrink-0">
                      {logoUrl ? (
                        <Image
                          src={logoUrl}
                          alt={uName}
                          fill
                          sizes="(max-width: 768px) 48px, 64px"
                          loading={index < 5 ? "eager" : "lazy"}
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs uppercase">
                          {uName.charAt(0)}
                        </div>
                      )}
                    </div>

                    {/* University Name & Fee/Duration grouped tightly */}
                    <div className="w-full space-y-1 my-1">
                      <h4 className="text-[11px] sm:text-xs font-bold text-[#0a2540] line-clamp-2 leading-tight m-0 w-full text-center">
                        {uName}
                      </h4>

                      {(feeText || durationText) && (
                        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-center w-full flex-wrap pt-0.5">
                          {feeText && (
                            <span className="text-[11px] sm:text-xs font-extrabold text-[#0D3B66] tracking-tight">
                              {feeText.replace(/\s*INR$/, "")}
                            </span>
                          )}
                          {feeText && durationText && (
                            <span className="text-gray-300 text-[10px]">•</span>
                          )}
                          {durationText && (
                            <div className="text-[10px] sm:text-[11px] text-gray-500 font-medium flex items-center gap-1 shrink-0">
                              <Clock className="w-2.5 h-2.5 shrink-0 text-gray-400" />
                              <span>{durationText}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Full-width Compare Button */}
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
                      className={`w-full py-1.5 px-2 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-2.5 border ${isInCompare(item._id || item.slug || cardTitle)
                        ? "bg-teal-50 border-teal-300 text-teal-700 font-bold"
                        : "bg-gray-50/90 hover:bg-gray-100 border-gray-200 text-gray-700 hover:text-[#0D3B66]"
                        }`}
                    >
                      {isInCompare(item._id || item.slug || cardTitle) ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>Added to Compare</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          <span>Add to Compare</span>
                        </>
                      )}
                    </button>

                    {/* Action Buttons in Flex Row */}
                    <div className="w-full flex items-center gap-1.5 sm:gap-2 mt-1.5">
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
                        className="flex-1 bg-[#F4D068] hover:bg-[#ebc557] text-gray-900 text-[10px] sm:text-xs font-bold py-1.5 px-1 rounded-md sm:rounded-lg border-none cursor-pointer transition-colors shadow-2xs active:scale-95 flex items-center justify-center whitespace-nowrap"
                      >
                        Apply Now
                      </button>
                      <Link
                        href={courseDetailHref}
                        className="flex-1 bg-white hover:bg-gray-50 text-[#0a2540] hover:text-blue-600 border border-gray-200 text-[10px] sm:text-xs font-semibold py-1.5 px-1 rounded-md sm:rounded-lg text-center no-underline transition-colors flex items-center justify-center shadow-2xs whitespace-nowrap"
                      >
                        Know More
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View More Button */}
            {visibleCount < processedPrograms.length && (
              <div className="flex justify-center mt-3 pt-1">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
                >
                  <span>View More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* FAQs Section */}
        {faqList.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-6 sm:p-8 text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 sm:mb-7 m-0">
              FAQs on {courseData?.name || "Course"} {universityName ? `at ${universityName}` : ""}
            </h2>

            <div className="space-y-3">
              {faqList.map((faq, idx) => {
                const isOpen = openFaq === idx;
                const question = faq.question || faq.q || "";
                const answer = faq.answer || faq.a || "";

                return (
                  <div
                    key={faq._id || idx}
                    className="bg-[#F1F3F6] rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left cursor-pointer transition-colors"
                    >
                      <span className="font-bold text-[#0D3B66] text-xs sm:text-sm tracking-tight pr-4">
                        {question}
                      </span>
                      <span className="text-[#0D3B66] shrink-0 flex items-center justify-center">
                        {isOpen ? (
                          <Minus size={20} className="stroke-[3]" />
                        ) : (
                          <Plus size={20} className="stroke-[3]" />
                        )}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-[13px] text-gray-600 leading-relaxed whitespace-pre-line">
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
