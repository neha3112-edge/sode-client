"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import { formatAdmissionDeadline } from "@/lib/utils";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { openWhatsAppBrochure } from "@/lib/whatsappBrochure";

const getMediaUrl = (obj) => (typeof obj === "string" ? obj : obj?.url || obj?.path || obj?.src || null);

const extractFeeText = (val) => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number") return `₹ ${Number(val).toLocaleString("en-IN")}`;
  if (typeof val === "object") {
    const defaultPlan = val.defaultPlan || (val.ledger?.semester ? "semester" : (val.ledger?.yearly ? "yearly" : "fullfees"));

    if (defaultPlan === "fullfees" || (!val.ledger?.semester && !val.ledger?.yearly)) {
      const full = val.ledger?.fullfees;
      if (full?.formattedBasePayable) return String(full.formattedBasePayable);
      if (full?.formattedPayable) return String(full.formattedPayable);
      if (val.formattedBasePayable) return String(val.formattedBasePayable);
      if (val.formattedNetPayable) return String(val.formattedNetPayable);
      if (val.formattedActualFees) return String(val.formattedActualFees);
      if (val.basePayable) return `₹ ${Number(val.basePayable).toLocaleString("en-IN")}`;
      if (val.netPayable) return `₹ ${Number(val.netPayable).toLocaleString("en-IN")}`;
      if (val.actualFees) return `₹ ${Number(val.actualFees).toLocaleString("en-IN")}`;
      if (val.amount) return `₹ ${Number(val.amount).toLocaleString("en-IN")}`;
      if (val.name) return String(val.name);
    }

    if (defaultPlan === "yearly" && val.ledger?.yearly) {
      const yr = val.ledger.yearly;
      if (yr.formattedBasePayable) return String(yr.formattedBasePayable);
      if (yr.formattedPayable) return String(yr.formattedPayable);
    }

    if (defaultPlan === "semester" && val.ledger?.semester) {
      const sem = val.ledger.semester;
      if (sem.formattedBasePayable) return String(sem.formattedBasePayable);
      if (sem.formattedPayable) return String(sem.formattedPayable);
      if (val.formattedSemesterFees) return String(val.formattedSemesterFees);
      if (val.semesterFees) return `₹ ${Number(val.semesterFees).toLocaleString("en-IN")} / Semester`;
      if (val.formattedPerSemesterPayable) return String(val.formattedPerSemesterPayable);
      if (val.perSemesterPayable) return `₹ ${Number(val.perSemesterPayable).toLocaleString("en-IN")} / Semester`;
    }

    if (val.ledger?.semester?.formattedBasePayable) return String(val.ledger.semester.formattedBasePayable);
    if (val.formattedSemesterFees && !val.formattedSemesterFees.includes("NaN")) return String(val.formattedSemesterFees);
    if (val.formattedBasePayable) return String(val.formattedBasePayable);
    if (val.formattedNetPayable) return String(val.formattedNetPayable);
    if (val.formattedActualFees) return String(val.formattedActualFees);
    if (val.basePayable) return `₹ ${Number(val.basePayable).toLocaleString("en-IN")}`;
    if (val.netPayable) return `₹ ${Number(val.netPayable).toLocaleString("en-IN")}`;
    if (val.actualFees) return `₹ ${Number(val.actualFees).toLocaleString("en-IN")}`;
    if (val.amount) return `₹ ${Number(val.amount).toLocaleString("en-IN")}`;
    if (val.name) return String(val.name);
  }
  return "";
};
import CourseHero from "./CourseHero";
import CourseQuickFacts from "./CourseQuickFacts";
import CourseAbout from "./CourseAbout";
import CourseKeyHighlights from "./CourseKeyHighlights";
import CourseFeesPlan from "./CourseFeesPlan";
import CourseCurriculum from "./CourseCurriculum";
import CourseApprovals from "./CourseApprovals";
import CourseSpecializations from "./CourseSpecializations";
import CourseCareerOpportunities from "./CourseCareerOpportunities";
import CourseAlternativeUniversities from "./CourseAlternativeUniversities";
import CourseFaq from "./CourseFaq";
import CourseStickyNav from "./CourseStickyNav";

export function CourseClientView({
  initialData = null,
  initialCourses = [],
  slug = "",
}) {
  if (!initialData || (!initialData.name && !initialData.title && !initialData._id)) {
    notFound();
  }

  const router = useRouter();
  const { openFormModal } = useFormModal();
  const { toggleCompare, addToCompare, compareList, isInCompare, setIsCompareDrawerOpen } = useCompare();
  const courseData = initialData || {};

  const paymentTypeName = (courseData?.paymentType?.name || courseData?.payment_type?.name || "").toLowerCase();
  const isYearlyPayment = paymentTypeName.includes("year") || paymentTypeName.includes("annual");
  const isSemesterPayment = paymentTypeName.includes("sem");
  const isFullfeesPayment = paymentTypeName.includes("full") || paymentTypeName.includes("one") || paymentTypeName.includes("lump");

  const initialPlanTab = useMemo(() => {
    if (courseData?.ledger?.semester) return "semester";
    if (courseData?.ledger?.yearly) return "yearly";
    if (courseData?.ledger?.fullfees) return "fullfees";
    if (courseData?.defaultPlan) return courseData.defaultPlan;
    return "fullfees";
  }, [courseData]);

  const [selectedPlanTab, setSelectedPlanTab] = useState(initialPlanTab);

  useEffect(() => {
    setSelectedPlanTab(initialPlanTab);
  }, [initialPlanTab]);

  const activeLedgerData = useMemo(() => {
    const rawLedger = courseData?.ledger || courseData?.feesLedger?.ledger;
    const promoData = courseData?.feesLedger || courseData;

    if (!rawLedger) return null;

    const full = rawLedger.fullfees || rawLedger.FULLFEES;
    const year = rawLedger.yearly || rawLedger.YEARLY;
    const sem = rawLedger.semester || rawLedger.SEMESTER;
    const emi = promoData?.emi || rawLedger?.emi || courseData?.emi;

    const fullEmi = full?.emi?.available ? full.emi : (emi?.fullfees?.available ? emi.fullfees : null);
    const yearEmi = year?.emi?.available ? year.emi : (emi?.yearly?.available ? emi.yearly : null);
    const semEmi = sem?.emi?.available ? sem.emi : (emi?.semester?.available ? emi.semester : null);

    const hasSpecificPaymentTypes = Boolean(
      emi?.hasSpecificPaymentTypes ||
      Boolean(fullEmi?.available || yearEmi?.available || semEmi?.available)
    );

    const availableSummary =
      (isYearlyPayment && yearEmi) ||
      (isSemesterPayment && semEmi) ||
      (fullEmi?.available ? fullEmi : null) ||
      (yearEmi?.available ? yearEmi : null) ||
      (semEmi?.available ? semEmi : null) ||
      (emi?.summary?.available ? emi.summary : null) ||
      (emi?.available ? emi : null);

    const breakdown =
      promoData?.breakdown ||
      rawLedger?.fullfees?.breakdown ||
      rawLedger?.yearly?.breakdown ||
      rawLedger?.semester?.breakdown ||
      courseData?.fees?.breakdown ||
      courseData?.feesLedger?.breakdown ||
      null;

    return {
      fullfees: full ? { ...full, emi: fullEmi } : null,
      yearly: year ? { ...year, emi: yearEmi } : null,
      semester: sem ? { ...sem, emi: semEmi } : null,
      paymentTypeName: courseData?.paymentType?.name || promoData?.paymentTypeName || "",
      durationMonths: Number(courseData?.durationMonths || 0),
      totalSemesters: Number(courseData?.totalSemesters || 0),
      totalYears: Number(courseData?.totalYears || 0),
      breakdown,
      formattedActualFees: promoData?.formattedActualFees || full?.formattedGross || null,
      emi: {
        fullfees: fullEmi,
        yearly: year ? yearEmi : null,
        semester: sem ? semEmi : null,
        summary: availableSummary,
        hasSpecificPaymentTypes,
      },
      scholarship: promoData?.scholarship || null,
      coupon: promoData?.coupon || null,
      appliedPromoCode: promoData?.appliedPromoCode || null,
    };
  }, [courseData, isYearlyPayment, isSemesterPayment, isFullfeesPayment]);

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
  const heroBannerSrc = getMediaUrl(
    courseData?.coursepageimage ||
    courseData?.bannerImage ||
    courseData?.banner ||
    courseData?.universityId?.coursepageimage ||
    courseData?.universityId?.bannerImg
  );
  const mobileHeroBannerSrc = getMediaUrl(
    courseData?.bannerImageMobile ||
    courseData?.mobileBannerImage ||
    courseData?.universityId?.mobileBannerImg ||
    courseData?.coursepageimage ||
    courseData?.bannerImage ||
    courseData?.banner ||
    courseData?.universityId?.bannerImg
  );
  const universityLogoSrc = courseData?.logo
    ? getMediaUrl(courseData.logo)
    : courseData?.universityId?.logo
      ? getMediaUrl(courseData.universityId.logo)
      : null;

  const currentUniSlug = useMemo(() => {
    return (
      courseData?.universitySlug ||
      courseData?.universityId?.slug ||
      courseData?.university?.slug ||
      (typeof slug === "string" ? slug.split("/")[0] : "") ||
      ""
    ).toLowerCase().trim();
  }, [courseData, slug]);

  const currentCourseName = useMemo(() => {
    return courseData?.name || courseData?.title || displayCourseTitle || "";
  }, [courseData, displayCourseTitle]);



  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__CURRENT_PAGE_COURSES__ = [currentCourseName];
      window.__CURRENT_PAGE_UNIVERSITY__ = universityName;
    }
    return () => {
      if (typeof window !== "undefined") {
        window.__CURRENT_PAGE_COURSES__ = null;
        window.__CURRENT_PAGE_UNIVERSITY__ = null;
      }
    };
  }, [currentCourseName, universityName]);

  const approvalsList = useMemo(() => {
    return Array.isArray(courseData?.approvals) ? courseData.approvals : [];
  }, [courseData]);

  const approvalsSummary = useMemo(() => {
    if (!approvalsList || approvalsList.length === 0) return "";

    const getName = (a) => (typeof a === "string" ? a : (a?.name || a?.code || a?.title || "")).trim();

    // 1. UGC / UGC-DEB
    const ugcItem = approvalsList.find((a) => /ugc/i.test(getName(a)));
    if (ugcItem) {
      const name = getName(ugcItem);
      return name.toUpperCase().includes("DEB") ? name : `${name}-DEB`;
    }

    // 2. AICTE
    const aicteItem = approvalsList.find((a) => /aicte/i.test(getName(a)));
    if (aicteItem) {
      return getName(aicteItem);
    }

    // 3. Any other approval/accreditation (NIRF, NAAC, etc.)
    const otherItem = approvalsList.find((a) => Boolean(getName(a)));
    if (otherItem) {
      return getName(otherItem);
    }

    return "";
  }, [approvalsList]);

  const highlightsList = useMemo(() => {
    if (Array.isArray(courseData?.keyHighlights) && courseData.keyHighlights.length > 0) {
      return courseData.keyHighlights
        .filter((item) => item && (item.label || item.category || item.title))
        .map((item) => {
          const rawVal = item.value || item.details || item.description;
          let finalVal = rawVal;
          if (!finalVal || finalVal === "N/A" || finalVal === "") {
            const lbl = (item.label || item.category || item.title || "").toLowerCase();
            if (lbl.includes("fee")) {
              finalVal = courseData?.fees || courseData?.fullFee || "Affordable EMI & Installments Available";
            } else if (lbl.includes("specializ")) {
              finalVal = Array.isArray(courseData?.subCourses) && courseData?.subCourses.length > 0
                ? `${courseData.subCourses.length} Specializations Available`
                : "Core / General Program";
            } else {
              finalVal = "Available on Request";
            }
          }
          return {
            _id: item._id,
            label: item.label || item.category || item.title || "Category",
            value: finalVal,
          };
        });
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
    if (courseData?.admissionDeadline) list.push({ label: "Admission Deadline", value: formatAdmissionDeadline(courseData.admissionDeadline) });
    return list;
  }, [courseData, universityName, approvalsSummary]);

  const specializations = useMemo(() => {
    return Array.isArray(courseData?.subCourses) ? courseData.subCourses : [];
  }, [courseData]);

  const targetSpecSlug = useMemo(() => {
    if (!slug) return "";
    const parts = String(slug).split("/").filter(Boolean);
    return parts.length >= 3 ? parts[2] : "";
  }, [slug]);

  const curriculumList = useMemo(() => {
    if (Array.isArray(courseData?.curriculum) && courseData.curriculum.length > 0) {
      return courseData.curriculum
        .filter((c) => c && (c.semesterName || (Array.isArray(c.subjects) && c.subjects.length > 0) || (Array.isArray(c.electives) && c.electives.length > 0)))
        .map((c, idx) => ({
          semester: c.semesterName || `Semester ${idx + 1}`,
          subjects: Array.isArray(c.subjects) ? c.subjects : [],
          electives: Array.isArray(c.electives) ? c.electives : [],
        }));
    }
    if (Array.isArray(courseData?.syllabus) && courseData.syllabus.length > 0) {
      return courseData.syllabus
        .filter((s) => s && (s.semester || (Array.isArray(s.subjects) && s.subjects.length > 0)))
        .map((s, idx) => ({
          semester: s.semester || `Semester ${idx + 1}`,
          subjects: Array.isArray(s.subjects) ? s.subjects : [],
          electives: [],
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

      const rawLogo = uni.logo || uni.logoSrc || item.logo || item.logoUrl || null;
      const logoUrl = rawLogo ? getMediaUrl(rawLogo) : null;

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

      let feeText = extractFeeText(fees) || (item.fullFee ? (item.fullFee.includes("₹") ? `${item.fullFee} INR` : `₹ ${item.fullFee} INR`) : (item.amount ? `₹ ${Number(item.amount).toLocaleString("en-IN")} INR` : (item.fee ? `${item.fee} INR` : null)));

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
      const courseSlug = item.courseSlug || course?.slug || slugify(course?.shortName || course?.name || courseName);
      const subcourseSlug = item.subCourseSlug || subcourse?.slug || (subcourse?.name ? slugify(subcourse.name) : "");

      let courseDetailHref = item.courseDetailHref || "/courses";
      if (!item.courseDetailHref) {
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
      }

      const uniLocation =
        uni.city && uni.state
          ? `${uni.city}, ${uni.state}`
          : uni.location || uni.city || uni.state || item.location || "";

      list.push({
        ...item,
        _uniqueKey: `${item._id || uniSlug || cardTitle || "program"}-${index}`,
        title: cardTitle,
        cardTitle,
        displayName,
        uniName: uName,
        uniSlug: uniSlug,
        slug: uniSlug,
        universitySlug: uniSlug,
        logoUrl,
        location: uniLocation,
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
    let courseTitleForLead = courseData?.name || "Course";
    if (specName) {
      const cleanSpec = String(specName).trim();
      if (
        cleanSpec.toLowerCase().startsWith(courseTitleForLead.toLowerCase()) ||
        cleanSpec.toLowerCase().includes(" in ")
      ) {
        courseTitleForLead = cleanSpec;
      } else {
        courseTitleForLead = `${courseTitleForLead} in ${cleanSpec}`;
      }
    }

    if (actionType === "Download Brochure") {
      let effectiveSlug = slug || courseData?.slug || `${universityName || "course"}/${courseTitleForLead}`;
      if (specName) {
        const specSlug = String(specName)
          .toLowerCase()
          .replace(/^online\s+[a-z0-9+-]+\s+in\s+/i, "")
          .replace(/^distance\s+[a-z0-9+-]+\s+in\s+/i, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        if (specSlug && !effectiveSlug.toLowerCase().includes(specSlug)) {
          effectiveSlug = `${effectiveSlug.replace(/\/+$/, "")}/${specSlug}`;
        }
      }
      openWhatsAppBrochure({
        title: `${courseTitleForLead}${universityName ? ` - ${universityName}` : ""}`,
        slug: effectiveSlug,
      });
      return;
    }

    openFormModal({
      course: courseTitleForLead,
      university: universityName || "UPES",
      university_name: universityName || "UPES",
      action: actionType,
      title: actionType,
    });
  };

  useEffect(() => {
    const pageCourseName = courseData?.name || courseData?.title || "";
    if (typeof window !== "undefined") {
      window.__CURRENT_PAGE_COURSE__ = pageCourseName;
      window.__CURRENT_PAGE_UNIVERSITY__ = universityName || "";
    }
    return () => {
      if (typeof window !== "undefined") {
        window.__CURRENT_PAGE_COURSE__ = null;
        window.__CURRENT_PAGE_UNIVERSITY__ = null;
      }
    };
  }, [courseData?.name, courseData?.title, universityName]);

  useBreadcrumb(
    {
      items: [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        ...(universityName && (courseData?.universitySlug || courseData?.universityId?.slug)
          ? [{ label: universityName, href: `/university/${courseData.universitySlug || courseData.universityId?.slug}` }]
          : universityName
            ? [{ label: universityName }]
            : []),
        {
          label: `${displayCourseTitle}${courseData?.fullName ? ` (${courseData.fullName})` : ""}`.trim(),
        },
      ],
      backButton: {
        label: "Back to Courses",
        href: "/courses",
      },
    },
    [displayCourseTitle, courseData?.fullName, universityName, courseData?.universitySlug, courseData?.universityId?.slug]
  );

  const availableSections = useMemo(() => {
    const list = [];
    if (courseData?.overview || courseData?.description) {
      list.push({ id: "overview", label: "Overview" });
    }
    if (highlightsList && highlightsList.length > 0) {
      list.push({ id: "key-highlights", label: "Highlights" });
    }
    if (activeLedgerData) {
      list.push({ id: "fee-structure", label: "Fee Structure" });
    }
    if (curriculumList && curriculumList.length > 0) {
      list.push({ id: "syllabus", label: "Syllabus" });
    }
    if (approvalsList && approvalsList.length > 0) {
      list.push({ id: "approvals", label: "Accreditations" });
    }
    if (specializations && specializations.length > 0) {
      list.push({ id: "specializations", label: "Specializations" });
    }
    if (
      courseData?.careerOpportunity &&
      (courseData.careerOpportunity.jobRoles?.length > 0 ||
        courseData.careerOpportunity.highlights?.highestPackage ||
        courseData.careerOpportunity.highlights?.averagePackage)
    ) {
      list.push({ id: "career-opportunities", label: "Career Opportunities" });
    }
    if (processedPrograms && processedPrograms.length > 0) {
      const altLabel =
        courseData?.top_universities_title ||
        courseData?.peer_universities_title ||
        (processedPrograms[0]?.sectionTitle) ||
        "Top Universities";
      list.push({ id: "alternative", label: altLabel });
    }
    if (faqList && faqList.length > 0) {
      list.push({ id: "faqs", label: "FAQs" });
    }
    return list;
  }, [
    courseData?.overview,
    courseData?.description,
    courseData?.careerOpportunity,
    highlightsList,
    activeLedgerData,
    curriculumList,
    approvalsList,
    specializations,
    processedPrograms,
    faqList,
  ]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased font-sans pb-16">
      {/* Top Hero and Quick Facts */}
      <div className="pt-4 space-y-6 max-w-6xl mx-auto px-3 sm:px-4 md:px-0 mb-6">
        <CourseHero
          courseData={courseData}
          displayCourseTitle={displayCourseTitle}
          universityName={universityName}
          heroBannerSrc={heroBannerSrc}
          mobileHeroBannerSrc={mobileHeroBannerSrc}
          universityLogoSrc={universityLogoSrc}
          handleOpenLead={handleOpenLead}
        />

        <CourseQuickFacts
          courseData={courseData}
          universityName={universityName}
          approvalsSummary={approvalsSummary}
        />
      </div>

      {/* Auto Sticky Tabs Header based on present sections */}
      <CourseStickyNav
        sections={availableSections}
        courseName={displayCourseTitle}
      />

      {/* Main Content Area Sections */}
      <div
        id="course-content-sections"
        className="space-y-6 max-w-6xl mx-auto px-3 sm:px-4 md:px-0"
      >
        {/* 1. About / Course Overview */}
        <CourseAbout courseData={courseData} />

        {/* 2. Key Highlights */}
        <CourseKeyHighlights
          courseData={courseData}
          universityName={universityName}
          highlightsList={highlightsList}
        />

        {/* 3. Fee Structure */}
        <CourseFeesPlan
          activeLedgerData={activeLedgerData}
          selectedPlanTab={selectedPlanTab}
          setSelectedPlanTab={setSelectedPlanTab}
          openFormModal={openFormModal}
        />

        {/* 3. Syllabus */}
        <CourseCurriculum
          curriculumList={curriculumList}
          courseData={courseData}
          universityName={universityName}
        />

        {/* 4. Approvals */}
        <CourseApprovals
          approvalsList={approvalsList}
          courseData={courseData}
          universityName={universityName}
        />
        <CourseSpecializations
          specializations={specializations}
          courseData={courseData}
          universityName={universityName}
          universityLogoSrc={universityLogoSrc}
          heroBannerSrc={heroBannerSrc}
          activeLedgerData={activeLedgerData}
          handleOpenLead={handleOpenLead}
          targetSpecSlug={targetSpecSlug}
        />

        {/* 6. Career Opportunities */}
        <CourseCareerOpportunities
          careerData={courseData?.careerOpportunity}
          courseName={displayCourseTitle}
          universityName={universityName}
          handleOpenLead={handleOpenLead}
        />

        {/* 7. Alternative Universities */}
        <CourseAlternativeUniversities
          processedPrograms={processedPrograms}
          courseData={courseData}
          currentUniSlug={currentUniSlug}
          currentUniName={universityName}
          currentUniLogo={universityLogoSrc}
        />

        {/* 8. FAQs */}
        <CourseFaq
          faqList={faqList}
          courseData={courseData}
          universityName={universityName}
        />
      </div>
    </div>
  );
}

export default CourseClientView;
