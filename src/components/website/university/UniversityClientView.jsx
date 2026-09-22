"use client";

import React, { useState, useMemo } from "react";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useCompare } from "@/hooks/useCompare";
import { useFormModal } from "@/hooks/useFormModal";
import { getAssetPath } from "@/lib/utils";

import UniversityHero from "./UniversityHero";
import UniversityAbout from "./UniversityAbout";
import UniversityAccreditations from "./UniversityAccreditations";
import UniversityKeyHighlights from "./UniversityKeyHighlights";
import UniversityCoursesSection from "./UniversityCoursesSection";
import UniversityWhyChoose from "./UniversityWhyChoose";
import UniversitySampleDegree from "./UniversitySampleDegree";
import UniversityPeerUniversities from "./UniversityPeerUniversities";
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
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen } = useCompare();

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
    if (dec >= 0.1 && dec < 0.8) return base + 0.5;
    if (dec >= 0.8) return base + 1;
    return base;
  }, [numericRating]);

  const displayRatingText = useMemo(() => {
    const raw = uni?.avg_rating ?? data?.avg_rating ?? uni?.rating ?? data?.rating;
    if (raw !== undefined && raw !== null && String(raw).trim() !== "") {
      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) return `${parsed}/5`;
      return `${raw}/5`;
    }
    return "4.8/5";
  }, [uni?.avg_rating, data?.avg_rating, uni?.rating, data?.rating]);

  const highlightsData = useMemo(() => {
    if (Array.isArray(uni.key_highlights) && uni.key_highlights.length > 0) {
      return {
        title: uni.key_highlights[0].title,
        items: Array.isArray(uni.key_highlights[0].items) ? uni.key_highlights[0].items : [],
      };
    }
    return {
      title: `Key Highlights of ${uniName}`,
      items: [],
    };
  }, [uni.key_highlights, uniName]);

  const locationText =
    uni.location ||
    [uni?.city?.name || data?.city?.name, uni?.state?.name || data?.state?.name]
      .filter(Boolean)
      .join(", ") ||
    highlightsData.items.find((h) => h.feature?.toLowerCase() === "location")?.details ||
    "";

  const establishedText =
    getSafeText(uni?.established_year?.year || uni?.established_year?.name || uni?.established_year) ||
    highlightsData.items.find((h) => h.feature?.toLowerCase().includes("establishment"))?.details ||
    "";

  const accreditationsList = useMemo(() => {
    if (Array.isArray(uni.accreditations) && uni.accreditations.length > 0) {
      return uni.accreditations.map((acc) => ({
        title: acc.name,
        logo: acc.logo?.url || (typeof acc.logo === "string" ? acc.logo : null),
        description: acc.description || "",
      }));
    }
    return [];
  }, [uni.accreditations]);

  const approvalsSummary = useMemo(() => {
    const found = accreditationsList.find((a) => /ugc/i.test(a.title));
    return found ? (found.title.includes("DEB") ? found.title : `${found.title}-DEB`) : "UGC-DEB";
  }, [accreditationsList]);

  const coursesList = useMemo(() => {
    if (Array.isArray(uni.courses) && uni.courses.length > 0) {
      return uni.courses.map((c, idx) => ({
        ...c,
        _id: c._id || `c-${idx}`,
        title: c.title || c.name || "",
        name: c.name || c.title || "",
        slug: c.slug || `${slug || uni.slug}/${(c.title || c.name || "").toLowerCase().replace(/\s+/g, "-")}`,
        logo: c.logo || null,
        fees: c.fees || "",
        duration: c.duration || "",
        description: c.description || c.overview || c.desc || "",
        overview: c.overview || c.description || "",
        admissionDeadline: c.admissionDeadline || uni.admissionDeadline || uni.admission_deadline || "",
        banner: c.banner || c.coursepageimage || c.bannerImage || null,
        specializationsCount: c.specializationsCount || c.subcourses?.length || 0,
        subcourses: Array.isArray(c.subcourses) ? c.subcourses : [],
      }));
    }
    return [];
  }, [uni.courses, slug, uni.slug, uni.admissionDeadline, uni.admission_deadline]);

  const coursePills = useMemo(() => {
    const seen = new Set();
    const result = [];
    for (const c of coursesList) {
      const title = (c.title || c.name || "").trim();
      const upper = title.toUpperCase();
      if (upper && !seen.has(upper)) {
        seen.add(upper);
        result.push({
          title: upper,
          slug: c.slug || `${slug || uni.slug || ""}/${title.toLowerCase().replace(/\s+/g, "-")}`,
        });
      }
    }
    return result;
  }, [coursesList, slug, uni.slug]);

  const filteredCourses = useMemo(() => {
    if (activeCourseFilter === "ALL") return coursesList;
    return coursesList.filter(
      (c) => c.title.toUpperCase() === activeCourseFilter.toUpperCase()
    );
  }, [coursesList, activeCourseFilter]);

  const whyChooseSection = useMemo(() => {
    if (Array.isArray(uni.why_choose_us) && uni.why_choose_us.length > 0) {
      const first = uni.why_choose_us[0];
      return {
        title: first.title || `Why Choose ${uniName}`,
        items: (first.items || []).map((item) => ({
          title: item.title,
          description: item.description,
          iconUrl: item.icon?.url || (typeof item.icon === "string" ? item.icon : null),
        })),
      };
    }
    return {
      title: `Why Choose ${uniName}`,
      items: [],
    };
  }, [uni.why_choose_us, uniName]);

  const sampleDegreeData = useMemo(() => {
    if (Array.isArray(uni.sample_degree) && uni.sample_degree.length > 0) {
      const deg = uni.sample_degree[0];
      const autoPoints = (accreditationsList || []).map((a) => a.title).filter(Boolean);
      const points = Array.isArray(deg.points) && deg.points.length > 0
        ? deg.points
        : autoPoints;

      return {
        title: deg.title || "",
        description: deg.description || "",
        imageUrl: deg.image?.url || (typeof deg.image === "string" ? deg.image : null),
        points: points,
        ctaText: deg.cta_text || "Get Degree",
        ctaLink: deg.cta_link || null,
      };
    }
    return null;
  }, [uni.sample_degree, accreditationsList]);

  const topPeerUniversities = useMemo(() => {
    const list = uni.top_ugc_deb_universities || uni.ugc_deb_universities;
    if (Array.isArray(list) && list.length > 0) {
      return list;
    }
    return [];
  }, [uni.top_ugc_deb_universities, uni.ugc_deb_universities]);

  const faqSection = useMemo(() => {
    if (Array.isArray(uni.faqs) && uni.faqs.length > 0) {
      const allItems = uni.faqs.flatMap((sec) => (Array.isArray(sec.items) ? sec.items : []));
      const first = uni.faqs[0];
      return {
        title: first?.title || `Frequently Asked Questions (FAQs) - ${uniName}`,
        items: allItems.length > 0 ? allItems : (Array.isArray(first?.items) ? first.items : []),
      };
    }
    return {
      title: `Frequently Asked Questions (FAQs) - ${uniName}`,
      items: [],
    };
  }, [uni.faqs, uniName]);

  const handleUniversityCompare = () => {
    const uniPayload = {
      _id: uni._id || data._id || slug,
      name: uniName,
      slug: slug || uni.slug || data.slug,
      logo: rawLogo,
      city: locationText,
      state: "",
      naac_rating: { grade: "" },
      nirf_rank: { rank: "" },
      established_year: establishedText,
      approvals: (accreditationsList || []).map((a) => ({ name: a.title })),
    };
    toggleCompare(uniPayload);
    setIsCompareDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased font-sans pb-16">
      {/* Hero Header Section */}
      <UniversityHero
        uniName={uniName}
        heroBannerUrl={heroBannerUrl}
        mobileHeroBannerUrl={mobileHeroBannerUrl}
        logoUrl={logoUrl}
        starRatingValue={starRatingValue}
        displayRatingText={displayRatingText}
        coursePills={coursePills}
        openFormModal={openFormModal}
        handleUniversityCompare={handleUniversityCompare}
        isInCompare={isInCompare(uni._id || data._id || slug)}
        locationText={locationText}
        establishedText={establishedText}
        approvalsSummary={approvalsSummary}
        admissionDeadline={uni.admission_deadline}
        admissionStatus={uni.admission_status}
      />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-0 space-y-6 pt-6">
        {/* About Section */}
        {uni.description && (
          <UniversityAbout
            aboutTitle={`About ${uniName}`}
            aboutText={uni.description}
            uniName={uniName}
          />
        )}

        {/* Accreditations Section */}
        <UniversityAccreditations
          accreditationsList={accreditationsList}
          uniName={uniName}
        />

        {/* Key Highlights Table */}
        <UniversityKeyHighlights
          highlightsData={highlightsData}
        />

        {/* Courses Section with Modal */}
        <UniversityCoursesSection
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

        {/* Why Choose Section */}
        <UniversityWhyChoose
          whyChooseSection={whyChooseSection}
          uniName={uniName}
        />

        {/* Sample Degree Section */}
        <UniversitySampleDegree
          sampleDegreeData={sampleDegreeData}
          uniName={uniName}
          openFormModal={openFormModal}
        />

        {/* Top Peer Universities Section */}
        <UniversityPeerUniversities
          topUniversities={topPeerUniversities}
          openFormModal={openFormModal}
        />

        {/* FAQ Accordion Section */}
        <UniversityFaq
          faqSection={faqSection}
          uniName={uniName}
        />
      </div>
    </div>
  );
}

export default UniversityClientView;
