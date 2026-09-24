"use client";

import React, { useState, useMemo } from "react";
import { useFormModal } from "@/hooks/useFormModal";
import { getAssetPath, formatAdmissionDeadline } from "@/lib/utils";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
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
  const { openFormModal } = useFormModal();
  const [selectedPlanTab, setSelectedPlanTab] = useState("semester");
  const courseData = initialData || {};

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
      breakdown,
      formattedActualFees: promoData?.formattedActualFees || full?.formattedGross || null,
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
    courseData?.coursepageimage ||
    courseData?.bannerImage ||
    courseData?.banner ||
    courseData?.universityId?.coursepageimage?.url ||
    courseData?.universityId?.bannerImg?.url
  );
  const mobileHeroBannerSrc = getAssetPath(
    courseData?.bannerImageMobile ||
    courseData?.mobileBannerImage ||
    courseData?.universityId?.mobileBannerImg?.url ||
    courseData?.coursepageimage ||
    courseData?.bannerImage ||
    courseData?.banner ||
    courseData?.universityId?.bannerImg?.url
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
        (typeof uni.logo === "string" ? uni.logo : null) ||
        uni.logoSrc?.url ||
        uni.logoSrc ||
        item.logo?.url ||
        item.logo?.path ||
        (typeof item.logo === "string" ? item.logo : null) ||
        item.logoUrl;
      const logoUrl = rawLogo ? getAssetPath(rawLogo, null) : null;

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

      const uniLocation =
        uni.city && uni.state
          ? `${uni.city}, ${uni.state}`
          : uni.location || uni.city || uni.state || item.location || "";

      list.push({
        ...item,
        _uniqueKey: `${item._id || item.slug || cardTitle || "program"}-${index}`,
        title: cardTitle,
        cardTitle,
        displayName,
        uniName: uName,
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
      list.push({ id: "about", label: "Overview" });
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
      list.push({ id: "specializations", label: "Specialisations" });
    }
    if (
      courseData?.careerOpportunity &&
      (courseData.careerOpportunity.jobRoles?.length > 0 ||
        courseData.careerOpportunity.highlights?.highestPackage ||
        courseData.careerOpportunity.highlights?.averagePackage)
    ) {
      list.push({ id: "career-opportunities", label: "Career & Scope" });
    }
    if (
      courseData?.careerOpportunity?.hiringPartners &&
      courseData.careerOpportunity.hiringPartners.length > 0
    ) {
      list.push({ id: "top-recruiters", label: "Top Recruiters" });
    }
    if (processedPrograms && processedPrograms.length > 0) {
      list.push({ id: "alternative", label: "Alternative Universities" });
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

        {/* 5. Specialisations */}
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
