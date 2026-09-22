"use client";

import React, { useState, useMemo } from "react";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useFormModal } from "@/hooks/useFormModal";
import { getAssetPath } from "@/lib/utils";
import UniversityHero from "./UniversityHero";
import UniversityHighlights from "./UniversityHighlights";
import UniversityAbout from "./UniversityAbout";
import UniversityWhyChoose from "./UniversityWhyChoose";
import UniversityAccreditations from "./UniversityAccreditations";
import UniversityCourses from "./UniversityCourses";
import UniversitySampleDegree from "./UniversitySampleDegree";
import UniversityPeerUnis from "./UniversityPeerUnis";
import UniversityFaq from "./UniversityFaq";

const getSafeText = (val, fallback = "") => {
  if (val === null || val === undefined) return fallback;
  if (typeof val === "string" || typeof val === "number") return String(val);
  if (typeof val === "object") {
    if (val.title && typeof val.title === "string") return val.title;
    if (val.name && typeof val.name === "string") return val.name;
    if (val.label && typeof val.label === "string") return val.label;
    if (val.value && typeof val.value === "string") return val.value;
    if (val.text && typeof val.text === "string") return val.text;
    if (val.year) return String(val.year);
  }
  return fallback;
};

export function UniversityClientView({ initialData, slug }) {
  const { openFormModal } = useFormModal();
  const [activeCourseFilter, setActiveCourseFilter] = useState("ALL");
  const [visibleCoursesCount, setVisibleCoursesCount] = useState(6);

  const data = initialData || {};
  const uni =
    (data && typeof data.result === "object" ? data.result : null) ||
    (data && typeof data.universityId === "object" ? data.universityId : null) ||
    data ||
    {};

  const uniName = uni.name || data.name || data.tagline || "University";

  useBreadcrumb(
    {
      items: [
        { label: "Home", href: "/" },
        { label: "Universities", href: "/universities" },
        { label: `${uniName}` },
      ],
      backButton: {
        label: "Back to Universities",
        href: "/universities",
      },
    },
    [uniName]
  );

  const rawBanner = uni.bannerImg?.url || null;
  const heroBannerUrl = rawBanner ? getAssetPath(rawBanner) : null;
  const rawMobileBanner = uni.mobileBannerImg?.url || null;
  const mobileHeroBannerUrl = rawMobileBanner ? getAssetPath(rawMobileBanner) : heroBannerUrl;
  const rawLogo = data.logo?.url || null;
  const logoUrl = rawLogo ? getAssetPath(rawLogo) : null;

  const numericRating = useMemo(() => {
    const raw = uni?.avg_rating ?? data?.avg_rating ?? uni?.rating ?? data?.rating ?? 4.8;
    const parsed = parseFloat(raw);
    return !isNaN(parsed) && parsed > 0 ? Math.min(5, Math.max(0, parsed)) : 4.8;
  }, [uni?.avg_rating, data?.avg_rating, uni?.rating, data?.rating]);

  const starRatingValue = useMemo(() => {
    const dec = numericRating % 1;
    const base = Math.floor(numericRating);
    if (dec >= 0.1 && dec < 0.8) {
      return base + 0.5;
    }
    if (dec >= 0.8) {
      return base + 1;
    }
    return base;
  }, [numericRating]);

  const locationText = useMemo(() => {
    const city = getSafeText(uni.city || data.city);
    const state = getSafeText(uni.state || data.state);
    if (city && state) return `${city}, ${state}`;
    return city || state || "Online / Distance";
  }, [uni.city, data.city, uni.state, data.state]);

  const establishedYear = useMemo(() => {
    return getSafeText(uni.established || data.established || uni.established_year || data.established_year);
  }, [uni.established, data.established, uni.established_year, data.established_year]);

  const approvalsList = useMemo(() => {
    return Array.isArray(uni.approvals) && uni.approvals.length > 0
      ? uni.approvals
      : Array.isArray(data.approvals)
        ? data.approvals
        : [];
  }, [uni.approvals, data.approvals]);

  const approvalsSummary = useMemo(() => {
    if (approvalsList.length > 0) {
      const names = approvalsList
        .map((a) => (typeof a === "string" ? a : a.name || a.code || a.title || ""))
        .filter(Boolean);
      if (names.length > 0) {
        return names.slice(0, 3).join(" • ");
      }
    }
    return "UGC-DEB";
  }, [approvalsList]);

  const coursesList = useMemo(() => {
    const list = Array.isArray(data.courses)
      ? data.courses
      : Array.isArray(uni.courses)
        ? uni.courses
        : [];
    return list;
  }, [data.courses, uni.courses]);

  const filteredCourses = useMemo(() => {
    if (activeCourseFilter === "ALL") return coursesList;
    return coursesList.filter((c) => {
      const type = (c.programType || c.degreeType || c.level || "").toUpperCase();
      return type.includes(activeCourseFilter);
    });
  }, [coursesList, activeCourseFilter]);

  const whyChooseList = useMemo(() => {
    return Array.isArray(data.whyChooseUs) && data.whyChooseUs.length > 0
      ? data.whyChooseUs
      : Array.isArray(uni.whyChooseUs) && uni.whyChooseUs.length > 0
        ? uni.whyChooseUs
        : [];
  }, [data.whyChooseUs, uni.whyChooseUs]);

  const sampleDegreeData = useMemo(() => {
    return data.sampleDegree || uni.sampleDegree || null;
  }, [data.sampleDegree, uni.sampleDegree]);

  const topUniversities = useMemo(() => {
    return Array.isArray(data.topUniversities) && data.topUniversities.length > 0
      ? data.topUniversities
      : Array.isArray(uni.topUniversities) && uni.topUniversities.length > 0
        ? uni.topUniversities
        : [];
  }, [data.topUniversities, uni.topUniversities]);

  const faqSection = useMemo(() => {
    const items = Array.isArray(data.faqs) && data.faqs.length > 0
      ? data.faqs
      : Array.isArray(uni.faqs) && uni.faqs.length > 0
        ? uni.faqs
        : [];
    return {
      title: data.faqTitle || uni.faqTitle || `FAQs on ${uniName}`,
      items,
    };
  }, [data.faqs, uni.faqs, data.faqTitle, uni.faqTitle, uniName]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased font-sans pb-16">
      <div className="pt-4 space-y-6 max-w-6xl mx-auto px-3 sm:px-4 md:px-0 mb-6">
        <UniversityHero
          uniName={uniName}
          data={data}
          uni={uni}
          heroBannerUrl={heroBannerUrl}
          mobileHeroBannerUrl={mobileHeroBannerUrl}
          logoUrl={logoUrl}
          starRatingValue={starRatingValue}
          numericRating={numericRating}
          openFormModal={openFormModal}
        />

        <UniversityHighlights
          locationText={locationText}
          establishedYear={establishedYear}
          approvalsSummary={approvalsSummary}
          coursesCount={coursesList.length}
          naacGrade={uni.naac_grade || data.naac_grade}
        />
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-0 space-y-6 pt-2">
        <UniversityAbout
          aboutTitle={data.aboutTitle || uni.aboutTitle}
          aboutText={uni.description || data.description || uni.about || data.about}
          uniName={uniName}
        />

        <UniversityAccreditations
          approvalsList={approvalsList}
          uniName={uniName}
        />

        <UniversityWhyChoose
          whyChooseList={whyChooseList}
          uniName={uniName}
        />

        <UniversityCourses
          coursesList={coursesList}
          filteredCourses={filteredCourses}
          activeCourseFilter={activeCourseFilter}
          setActiveCourseFilter={setActiveCourseFilter}
          visibleCoursesCount={visibleCoursesCount}
          setVisibleCoursesCount={setVisibleCoursesCount}
          uniName={uniName}
          slug={slug}
          uni={uni}
          logoUrl={logoUrl}
          heroBannerUrl={heroBannerUrl}
          openFormModal={openFormModal}
        />

        <UniversitySampleDegree
          sampleDegreeData={sampleDegreeData}
          uniName={uniName}
        />

        <UniversityPeerUnis
          topUniversities={topUniversities}
          openFormModal={openFormModal}
        />

        <UniversityFaq
          faqSection={faqSection}
          uniName={uniName}
        />
      </div>
    </div>
  );
}

export default UniversityClientView;
