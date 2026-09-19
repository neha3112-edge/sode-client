"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Modal, Rate } from "antd";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { useCompare } from "@/hooks/useCompare";
import { useFormModal } from "@/hooks/useFormModal";
import { getAssetPath } from "@/lib/utils";
import {
  MapPin,
  Building2,
  BadgeCheck,
  GraduationCap,
  Download,
  CheckCircle2,
  Clock,
  Plus,
  Minus,
  ChevronDown,
  Check,
  Award,
} from "lucide-react";
import { FaBuilding, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";

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

export default function UniversityClientView({ initialData, slug }) {
  const { openFormModal } = useFormModal();
  const { toggleCompare, isInCompare, setIsCompareDrawerOpen } = useCompare();
  const [selectedCourseSpec, setSelectedCourseSpec] = useState(null);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [activeCourseFilter, setActiveCourseFilter] = useState("ALL");
  const [visibleTopUnis, setVisibleTopUnis] = useState(6);
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

  const displayRatingText = useMemo(() => {
    const raw = uni?.avg_rating ?? data?.avg_rating ?? uni?.rating ?? data?.rating;
    if (raw !== undefined && raw !== null && String(raw).trim() !== "") {
      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) {
        return `${parsed}/5`;
      }
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
        _id: c._id || `c-${idx}`,
        title: c.title || c.name || "",
        name: c.name || c.title || "",
        slug: c.slug || `${slug || uni.slug}/${(c.title || c.name || "").toLowerCase().replace(/\s+/g, "-")}`,
        logo: c.logo || null,
        fees: c.fees || "",
        duration: c.duration || "",
        specializationsCount: c.specializationsCount || c.subcourses?.length || 0,
        subcourses: Array.isArray(c.subcourses) ? c.subcourses : [],
      }));
    }
    return [];
  }, [uni.courses, slug, uni.slug]);

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
        title: first.title || `Why Choose Online ${uniName}`,
        items: (first.items || []).map((item) => ({
          title: item.title,
          description: item.description,
          iconUrl: item.icon?.url || (typeof item.icon === "string" ? item.icon : null),
        })),
      };
    }
    return {
      title: `Why Choose Online ${uniName}`,
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

  const isUgcDebApproved = topPeerUniversities.length > 0;

  const faqSection = useMemo(() => {
    if (Array.isArray(uni.faqs) && uni.faqs.length > 0) {
      const first = uni.faqs[0];
      return {
        title: first.title || `FAQs on Online Degree at ${uniName}`,
        items: Array.isArray(first.items) ? first.items : [],
      };
    }
    return {
      title: `FAQs on Online Degree at ${uniName}`,
      items: [],
    };
  }, [uni.faqs, uniName]);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? -1 : idx));
  };

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
      <div className="relative w-full">
        <div className="relative w-full h-56 sm:h-74 overflow-hidden">
          {heroBannerUrl ? (
            <Image
              src={heroBannerUrl}
              alt={uniName}
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
            />
          ) : null}
        </div>

        <div className="relative -mt-16 sm:-mt-24 z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-0">
          <div className="rounded-3xl overflow-hidden border border-transparent">
            <div className="bg-[#0C3A66] text-white px-3.5 py-3.5 sm:px-7 sm:py-5.5">
              <div className="flex flex-row items-center gap-2.5 sm:gap-4">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-3xl bg-white p-1 sm:p-1 flex flex-col items-center justify-center text-center shrink-0">
                  {logoUrl ? (
                    <div className="relative w-full h-10 sm:h-16">
                      <Image
                        src={logoUrl}
                        alt={uniName}
                        fill
                        sizes="96px"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold text-base sm:text-lg">
                      🎓
                    </div>
                  )}
                  <span className="hidden sm:block text-[10px] font-medium text-gray-800 leading-tight line-clamp-2">
                    {uniName}
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center gap-1 sm:gap-1.5">
                  <h1 className="text-base sm:text-2xl md:text-[28px] font-extrabold text-white tracking-tight leading-tight m-0 truncate sm:whitespace-normal">
                    {uniName}
                  </h1>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="flex items-center shrink-0">
                      <Rate
                        disabled
                        allowHalf
                        value={starRatingValue}
                        style={{
                          fontSize: 15,
                          color: "#fbbf24",
                          "--ant-rate-star-bg": "rgba(255, 255, 255, 0.35)",
                          "--ant-rate-star-color": "#fbbf24",
                        }}
                        className="leading-none [&_.ant-rate-star]:!mr-1 [&_.ant-rate-star-second]:!text-white/35 [&_.ant-rate-star-zero_.ant-rate-star-first]:!text-white/35 [&_.ant-rate-star-full_.ant-rate-star-second]:!text-amber-400 [&_.ant-rate-star-full_.ant-rate-star-first]:!text-amber-400 [&_.ant-rate-star-half_.ant-rate-star-first]:!text-amber-400"
                      />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-xs sm:text-[13px] font-bold text-white leading-none">
                        {displayRatingText}
                      </span>
                      <span className="text-[7.5px] sm:text-[8.5px] font-semibold text-white/70 uppercase tracking-wider mt-0.5">
                        Student Rating
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-3 mt-1">
                    {coursePills.length > 0 && (
                      <div className="overflow-x-auto no-scrollbar py-0.5 max-w-full">
                        <div className="grid grid-cols-6 sm:grid-cols-7 gap-1 sm:gap-1.5 w-fit">
                          {coursePills.map((cp) => (
                            <Link
                              key={cp.title}
                              href={`/courses/${cp.slug || encodeURIComponent(cp.title.toLowerCase())}`}
                              className="text-[9.5px] sm:text-xs font-semibold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-all cursor-pointer whitespace-nowrap text-center border bg-white/20 text-white border-white/20 hover:bg-white hover:text-[#0C3A66] no-underline inline-flex items-center justify-center shadow-2xs"
                            >
                              {cp.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0 ml-auto self-start -mt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          openFormModal &&
                            openFormModal({
                              title: `Download Brochure - ${uniName}`,
                              subtitle: "Fill details to receive instant digital brochure",
                              defaultCourse: uniName,
                              submitButtonText: "Get Brochure",
                            });
                        }}
                        className="whitespace-nowrap bg-[#00B4D8] hover:bg-[#0096C7] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-full border-none cursor-pointer flex items-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0"
                      >
                        <span>Get Brochure</span>
                        <Download size={14} className="stroke-[2.5]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          openFormModal &&
                            openFormModal({
                              title: `Get Counseling - ${uniName}`,
                              subtitle: "Speak directly with academic counselors",
                              defaultCourse: uniName,
                              submitButtonText: "Get Counseling",
                            });
                        }}
                        className="whitespace-nowrap bg-transparent hover:bg-white/10 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-full border border-white cursor-pointer flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
                      >
                        <span>Get Counseling</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleUniversityCompare}
                        className={`whitespace-nowrap font-semibold text-xs sm:text-sm px-4 py-2 rounded-full cursor-pointer flex items-center gap-1.5 transition-all active:scale-95 shrink-0 ${isInCompare(uni._id || data._id || slug)
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-xs"
                          : "bg-transparent hover:bg-white/10 text-white border border-white"
                          }`}
                      >
                        <span>
                          {isInCompare(uni._id || data._id || slug)
                            ? "In Compare"
                            : "+ Add to Compare"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:flex sm:items-center sm:gap-3 shrink-0 mt-3 sm:mt-4 pt-1 lg:hidden">
                <button
                  type="button"
                  onClick={() => {
                    openFormModal &&
                      openFormModal({
                        title: `Download Brochure - ${uniName}`,
                        subtitle: "Fill details to receive instant digital brochure",
                        defaultCourse: uniName,
                        submitButtonText: "Get Brochure",
                      });
                  }}
                  className="whitespace-nowrap bg-[#00B4D8] hover:bg-[#0096C7] text-white font-bold text-[10.5px] sm:text-sm px-2 sm:px-5 py-2 sm:py-2.5 rounded-full border-none cursor-pointer flex items-center justify-center gap-1 shadow-sm transition-all active:scale-95"
                >
                  <span className="truncate">Brochure</span>
                  <Download size={13} className="stroke-[2.5] shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    openFormModal &&
                      openFormModal({
                        title: `Get Counseling - ${uniName}`,
                        subtitle: "Speak directly with academic counselors",
                        defaultCourse: uniName,
                        submitButtonText: "Get Counseling",
                      });
                  }}
                  className="whitespace-nowrap bg-transparent hover:bg-white/10 text-white font-semibold text-[10.5px] sm:text-sm px-2 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/80 cursor-pointer flex items-center justify-center gap-1 transition-all active:scale-95 text-center"
                >
                  <span className="truncate">Counseling</span>
                </button>

                <button
                  type="button"
                  onClick={handleUniversityCompare}
                  className={`whitespace-nowrap font-semibold text-[10.5px] sm:text-sm px-2 sm:px-5 py-2 sm:py-2.5 rounded-full cursor-pointer flex items-center justify-center gap-1 transition-all active:scale-95 ${isInCompare(uni._id || data._id || slug)
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-xs"
                    : "bg-transparent hover:bg-white/10 text-white border border-white/80"
                    }`}
                >
                  <span className="truncate">
                    {isInCompare(uni._id || data._id || slug) ? "In Compare" : "+ Compare"}
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-white p-3.5 sm:p-5 grid grid-cols-2 lg:grid-cols-4 gap-y-3.5 sm:gap-y-4 lg:gap-y-0">
              <div className="flex items-center gap-2.5 sm:gap-3 pl-2.5 sm:pl-6 lg:justify-center pr-2 border-r border-gray-200">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <FaMapMarkerAlt size={22} className="fill-white" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">Location</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug line-clamp-2 sm:truncate">
                    {locationText || "India"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 pl-3.5 sm:pl-6 lg:justify-center pr-2 lg:border-r border-gray-200">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <FaBuilding size={17} />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] sm:text-xs text-gray-500 font-medium block leading-none mb-1">Established</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-snug line-clamp-2 sm:truncate">
                    {establishedText || "—"}
                  </span>
                </div>
              </div>

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

              <div className="flex items-center gap-2.5 sm:gap-3 pl-3.5 sm:pl-6 lg:justify-center pr-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0077B6] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  {uni.admission_deadline ? <FaCalendar size={17} /> : <GraduationCap size={17} />}
                </div>
                <div className="min-w-0">
                  {uni.admission_deadline ? (
                    <>
                      <span className="text-[11px] sm:text-xs text-red-500 font-medium block leading-none mb-1">
                        Admission deadline
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight truncate">
                        {uni.admission_deadline}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] sm:text-xs text-red-700 font-medium block leading-none mb-1">
                        Admission Status
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 block leading-tight truncate">
                        {uni.admission_status || "Admissions Open"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-0 space-y-6 pt-6">
        {uni.description ? (
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-10 space-y-4 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight m-0 text-center">
              About {uniName}
            </h2>

            <div className="w-full max-w-4xl mx-auto h-px bg-gray-200/80 my-2" />

            <div
              dangerouslySetInnerHTML={{ __html: uni.description }}
              className="space-y-4 text-xs sm:text-[13.5px] text-gray-700 leading-relaxed max-w-5xl mx-auto font-normal text-center"
            />
          </div>
        ) : null}

        {accreditationsList.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-4">
              Rankings & Accreditations of {uniName}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3 w-full">
              {accreditationsList.map((acc, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 flex flex-col p-1.5 sm:p-3 items-center justify-between text-center aspect-[4/4.6] sm:aspect-square shadow-2xs hover:border-blue-300 transition-colors overflow-hidden shrink-0 w-[calc((100%-12px)/3)] sm:w-[calc((100%-20px)/3)] md:w-[calc((100%-60px)/6)]"
                >
                  <div className="flex-1 min-h-0 w-full relative">
                    {acc.logo ? (
                      <Image
                        src={getAssetPath(acc.logo)}
                        alt={acc.title}
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
                        {acc.title}
                      </h3>
                    </div>
                    <div className="w-full h-[22px] sm:h-[26px] flex items-start justify-center mt-0.5">
                      {acc.description ? (
                        <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600 leading-tight m-0 line-clamp-2 w-full text-center">
                          {acc.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {highlightsData.items.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xs border border-gray-200 p-6 sm:p-10 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 text-center">
              {highlightsData.title}
            </h2>

            <div className="overflow-hidden border border-gray-200 shadow-2xs max-w-5xl mx-auto rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0C2B4E] text-white text-xs sm:text-sm font-bold tracking-wide">
                      <th className="py-2.5 sm:py-3 px-4 sm:px-6 w-[32%] sm:w-70 border-r border-white/20">
                        Feature
                      </th>
                      <th className="py-2.5 sm:py-3 px-4 sm:px-6">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-[13.5px] bg-white">
                    {highlightsData.items.map((row, idx) => (
                      <tr
                        key={idx}
                        className="bg-white hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="py-2.5 px-4 sm:px-6 font-bold text-gray-900 border-r border-gray-200 whitespace-nowrap">
                          {row.feature}
                        </td>
                        <td className="py-2.5 px-4 sm:px-6 text-gray-800 font-normal">
                          {row.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {coursesList.length > 0 && (
          <div id="university-courses-section" className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 scroll-mt-20">
            <div className="flex flex-col items-center justify-center mb-3 sm:mb-5">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight text-center m-0">
                {uniName} Courses
              </h2>
              {activeCourseFilter !== "ALL" && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500 font-medium">
                    Filter: <span className="font-bold text-[#0D3B66]">{activeCourseFilter}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveCourseFilter("ALL")}
                    className="text-xs text-[#08AEAA] hover:underline font-bold cursor-pointer border-none bg-transparent p-0"
                  >
                    Clear Filter (Show All {coursesList.length} Courses)
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 auto-rows-fr">
              {filteredCourses.slice(0, visibleCoursesCount).map((item, index) => {
                const cardTitle = item.title || item.name || "";
                const durationText = item.duration || "";
                const feeText = typeof item.fees === "string"
                  ? item.fees
                  : item.fees?.formattedSemesterFees ||
                  (item.fees?.semesterFees ? `₹ ${Number(item.fees.semesterFees).toLocaleString("en-IN")} / Semester` : null) ||
                  item.fees?.formattedPerSemesterPayable ||
                  item.fees?.formattedActualFees ||
                  item.fees?.formattedNetPayable ||
                  "";
                const courseDetailHref = `/courses/${item.slug || encodeURIComponent(cardTitle.toLowerCase())}`;
                const specCount = item.specializationsCount || item.subcourses?.length || 0;
                const inCmp = isInCompare(item._id || item.slug || cardTitle);
                const courseRawLogo = item.logo?.url || item.logo?.path || (typeof item.logo === "string" ? item.logo : null);
                const courseLogoUrl = courseRawLogo ? getAssetPath(courseRawLogo) : null;
                const displayCourseLogo = courseLogoUrl || logoUrl;

                return (
                  <div
                    key={item._id || item.slug || `${cardTitle}-${index}`}
                    className={`bg-gray-50 rounded-xl border border-gray-200 hover:border-[#08AEAA] p-2 sm:p-2.5 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative group min-w-0 w-full h-full shadow-2xs ${index === 5 && visibleCoursesCount === 6 ? "flex lg:hidden" : "flex"
                      }`}
                  >
                    {specCount > 0 && (
                      <div className="absolute top-0 left-0 z-10">
                        <button
                          type="button"
                          onClick={() => setSelectedCourseSpec(item)}
                          className="bg-[#08AEAA] hover:bg-[#079995] text-white text-[9px] sm:text-[10px] font-bold px-2.5 sm:px-3 py-1 rounded-tl-xl rounded-br-xl cursor-pointer transition-colors border-none flex items-center gap-1 shadow-2xs leading-none"
                        >
                          {String(specCount).padStart(2, "0")} Specialisation
                        </button>
                      </div>
                    )}

                    <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full p-1 flex items-center justify-center relative mt-2.5 sm:mt-3 mb-1.5 sm:mb-2 shrink-0">
                      {displayCourseLogo ? (
                        <Link href={courseDetailHref} className="relative w-full h-full block">
                          <Image
                            src={displayCourseLogo}
                            alt={cardTitle || uniName}
                            fill
                            sizes="(max-width: 768px) 48px, 60px"
                            className="object-contain p-0.5 transition-transform group-hover:scale-105"
                          />
                        </Link>
                      ) : (
                        <Link href={courseDetailHref} className="w-full h-full rounded-full bg-teal-50 text-[#08AEAA] font-bold flex items-center justify-center text-xs uppercase no-underline">
                          {(cardTitle || uniName).charAt(0)}
                        </Link>
                      )}
                    </div>

                    <div className="w-full flex-1 flex flex-col justify-center">
                      <div className="flex items-center justify-center">
                        <Link
                          href={courseDetailHref}
                          className="text-xs sm:text-[13px] font-semibold text-[#0a2540] hover:text-[#08AEAA] line-clamp-2 leading-tight m-0 w-full text-center no-underline transition-colors"
                        >
                          {cardTitle}
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

                    <div className="w-full mt-auto pt-1.5">
                      <div className="w-full grid grid-cols-2 gap-1.5 items-center">
                        <button
                          type="button"
                          onClick={() => {
                            openFormModal &&
                              openFormModal({
                                title: "Apply for Course",
                                subtitle: `${cardTitle} - ${uniName}`,
                                defaultCourse: `${cardTitle} - ${uniName}`,
                                university: uniName,
                                formNameOverride: `CourseCard_${item.slug || uniName}`,
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
                            uniName: uniName,
                            logoUrl: displayCourseLogo || logoUrl,
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

            {(visibleCoursesCount < filteredCourses.length || (filteredCourses.length > 5 && visibleCoursesCount === 6)) && (
              <div className={`justify-center mt-4 pt-1 ${visibleCoursesCount >= filteredCourses.length ? "hidden lg:flex" : "flex"}`}>
                <button
                  type="button"
                  onClick={() => setVisibleCoursesCount((prev) => prev + 5)}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
                >
                  <span>View More</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {whyChooseSection.items.length > 0 && (
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-7 text-center">
              {whyChooseSection.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {whyChooseSection.items.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-blue-100/80 bg-blue-50/20 p-5 text-center hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-3 shadow-2xs"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white text-[#0D5CAD] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs relative overflow-hidden">
                    {item.iconUrl ? (
                      <Image
                        src={getAssetPath(item.iconUrl)}
                        alt={item.title}
                        fill
                        sizes="56px"
                        className="object-contain p-2.5"
                      />
                    ) : (
                      <CheckCircle2 size={26} className="text-[#0077B6]" />
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-gray-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {sampleDegreeData && (sampleDegreeData.imageUrl || sampleDegreeData.title) && (
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
              <div className="lg:col-span-6 flex justify-center w-full">
                {sampleDegreeData.imageUrl ? (
                  <div
                    onClick={() => setIsCertificateModalOpen(true)}
                    className="w-full max-w-115 aspect-460/340 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200 bg-white relative shadow-md shadow-gray-300"
                  >
                    <Image
                      src={getAssetPath(sampleDegreeData.imageUrl)}
                      alt={sampleDegreeData.title || `Sample Degree ${uniName}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 460px"
                      className="object-contain rounded-xl"
                    />
                  </div>
                ) : null}
              </div>

              <div className="lg:col-span-6 space-y-4 text-left">
                {sampleDegreeData.title && (
                  <h2 className="text-2xl sm:text-[28px] font-bold text-[#0D3B66] tracking-tight m-0 leading-tight">
                    {sampleDegreeData.title}
                  </h2>
                )}

                {sampleDegreeData.description && (
                  <p className="text-xs sm:text-sm text-gray-600 leading-tight font-normal mt-2 max-w-lg">
                    {sampleDegreeData.description}
                  </p>
                )}

                {sampleDegreeData.points?.length > 0 && (
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-2 max-w-lg">
                    {sampleDegreeData.points.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-center gap-1.5 sm:gap-2 rounded-lg"
                      >
                        <span className="w-4 h-4 rounded-full bg-green-600 text-white flex items-center justify-center">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span className="text-[11px] sm:text-[12.5px] font-bold text-gray-900 leading-tight">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      openFormModal &&
                        openFormModal({
                          title: `${sampleDegreeData.title || "Get Degree Details"} - ${uniName}`,
                          subtitle: "Get free syllabus & enrollment guidance",
                          defaultCourse: uniName,
                          submitButtonText: sampleDegreeData.ctaText || "Get Degree",
                        });
                    }}
                    className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-lg border-none cursor-pointer transition-all active:scale-95 shadow-sm inline-flex items-center justify-center"
                  >
                    {sampleDegreeData.ctaText || "Get Degree"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isUgcDebApproved && (
          <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-6 sm:mb-8 m-0">
              Top Online UGC-DEB Approved Universities
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {topPeerUniversities.slice(0, visibleTopUnis).map((peer, index) => {
                const inCmp = isInCompare(peer._id || peer.slug || peer.name);
                const peerLogo = peer.logo?.url || peer.logoUrl;

                return (
                  <div
                    key={peer._id || peer.slug || `${peer.name}-${index}`}
                    className={`bg-white rounded-xl border border-gray-200 hover:border-blue-400 p-2 sm:p-2.5 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative group min-w-0 shadow-2xs ${index === 5 && visibleTopUnis === 6 ? "flex lg:hidden" : "flex"
                      }`}
                  >
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full p-1 flex items-center justify-center bg-white border border-gray-100 shadow-2xs relative my-0.5 shrink-0 overflow-hidden">
                      {peerLogo ? (
                        <Image
                          src={getAssetPath(peerLogo)}
                          alt={peer.name}
                          fill
                          sizes="56px"
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 font-semibold flex items-center justify-center text-xs uppercase">
                          {peer.initial || (peer.name && peer.name.charAt(0)) || "U"}
                        </div>
                      )}
                    </div>

                    <div className="w-full space-y-0.5 my-0.5">
                      <div className="min-h-7 sm:min-h-8 flex items-center justify-center">
                        <h4 className="text-xs sm:text-[12.5px] font-semibold text-[#0a2540] line-clamp-2 leading-tight m-0 w-full text-center">
                          {peer.name}
                        </h4>
                      </div>
                      {peer.location && (
                        <div className="text-[10px] sm:text-[11px] text-gray-500 font-normal flex items-center justify-center gap-1 shrink-0">
                          <MapPin size={11} className="text-red-500 shrink-0" />
                          <span className="line-clamp-1">{peer.location}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        toggleCompare({
                          _id: peer._id || peer.slug,
                          name: peer.name,
                          title: peer.name,
                          uniName: peer.name,
                          slug: peer.slug,
                          city: peer.location,
                          logoUrl: peerLogo,
                        });
                        setIsCompareDrawerOpen(true);
                      }}
                      className={`w-full py-1.5 px-1.5 rounded-md sm:rounded-lg text-[10.5px] sm:text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-1.5 border ${inCmp
                        ? "bg-teal-50 border-teal-300 text-teal-700"
                        : "bg-gray-50/90 hover:bg-gray-100 border-gray-200 text-gray-700 hover:text-[#0D3B66]"
                        }`}
                    >
                      {inCmp ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 stroke-2" />
                          <span>Added to Compare</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-gray-500 shrink-0 stroke-2" />
                          <span>Add to Compare</span>
                        </>
                      )}
                    </button>

                    <div className="w-full grid grid-cols-2 gap-1.5 mt-1.5 items-center">
                      <button
                        type="button"
                        onClick={() => {
                          openFormModal &&
                            openFormModal({
                              title: `Apply to ${peer.name}`,
                              subtitle: "Get free admission counseling",
                              defaultCourse: peer.name,
                              university: peer.name,
                              formNameOverride: `PeerUni_${peer.slug}`,
                              submitButtonText: "Apply Now",
                            });
                        }}
                        className="w-full bg-[#F4D068] hover:bg-[#ebc557] text-gray-900 text-[11px] sm:text-xs font-semibold py-1.5 px-1 rounded-md sm:rounded-lg border-none cursor-pointer transition-colors active:scale-95 flex items-center justify-center text-center whitespace-nowrap leading-none"
                      >
                        Apply Now
                      </button>
                      <Link
                        href={`/universities/${peer.slug}`}
                        className="w-full bg-white hover:bg-gray-50 text-[#0a2540] hover:text-blue-600 border border-gray-200 text-[11px] sm:text-xs font-semibold py-1.5 px-1 rounded-md sm:rounded-lg text-center no-underline transition-colors flex items-center justify-center whitespace-nowrap leading-none"
                      >
                        Know More
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {(visibleTopUnis < topPeerUniversities.length || (topPeerUniversities.length > 5 && visibleTopUnis === 6)) && (
              <div className={`justify-center mt-4 pt-1 ${visibleTopUnis >= topPeerUniversities.length ? "hidden lg:flex" : "flex"}`}>
                <button
                  type="button"
                  onClick={() =>
                    setVisibleTopUnis((prev) =>
                      prev >= topPeerUniversities.length ? 6 : topPeerUniversities.length
                    )
                  }
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-bold text-[#0B3B7E] bg-blue-50/80 hover:bg-blue-100 border border-blue-200/80 transition-all cursor-pointer shadow-none group"
                >
                  <span>
                    {visibleTopUnis >= topPeerUniversities.length ? "View Less" : "View More"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${visibleTopUnis >= topPeerUniversities.length ? "rotate-180" : "group-hover:translate-y-0.5"
                      }`}
                  />
                </button>
              </div>
            )}
          </div>
        )}

        {faqSection.items.length > 0 && (
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-5 text-center">
              {faqSection.title}
            </h2>

            <div className="space-y-3 max-w-5xl mx-auto">
              {faqSection.items.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border border-gray-300 transition-all duration-200 overflow-hidden ${isOpen
                      ? "border-blue-400 bg-blue-200/30 shadow-2xs"
                      : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between gap-4 p-2 sm:p-2.5 text-left cursor-pointer bg-transparent border-none outline-none"
                    >
                      <span
                        className={`text-xs sm:text-[14px] font-semibold leading-snug ${isOpen ? "text-[#0C2B4E]" : "text-gray-900"
                          }`}
                      >
                        Q{idx + 1}. {faq.question}
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
                      <div className="p-3 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal border-t border-blue-100/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Modal
        open={Boolean(selectedCourseSpec)}
        onCancel={() => setSelectedCourseSpec(null)}
        footer={null}
        centered
        width={780}
        className="specialization-antd-modal"
        styles={{
          content: {
            padding: "24px",
            borderRadius: "20px",
            overflow: "hidden",
          },
          body: {
            padding: "0px",
          },
        }}
      >
        {selectedCourseSpec && (
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-5 sm:gap-6 pt-1">
            <div className="relative w-full max-w-65 sm:w-65 sm:max-w-none aspect-square shrink-0 rounded-2xl overflow-hidden shadow-sm bg-gray-100">
              {heroBannerUrl || selectedCourseSpec.banner ? (
                <Image
                  src={getAssetPath(selectedCourseSpec.banner || heroBannerUrl)}
                  alt={selectedCourseSpec.title || uniName}
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  className="object-cover object-center rounded-2xl"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-[#0C2B4E] to-[#0077B6] rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-16 h-16 text-white/40" />
                </div>
              )}

              {logoUrl && (
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 bg-white rounded-xl shadow-md p-1.5 sm:p-2 border border-gray-100 flex items-center justify-center">
                  <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center">
                    <Image
                      src={getAssetPath(logoUrl)}
                      alt={uniName}
                      fill
                      sizes="44px"
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between space-y-3.5 text-left py-1 w-full min-w-0">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0D3B66] m-0 tracking-tight leading-snug">
                  {selectedCourseSpec.title || selectedCourseSpec.name} Specializations
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed m-0 font-normal line-clamp-2">
                  {selectedCourseSpec.description ||
                    `${selectedCourseSpec.title || "Course"} specializations offered at ${uniName}. Equips learners with specialized industry knowledge and professional competencies.`}
                </p>
              </div>

              {selectedCourseSpec.subcourses && selectedCourseSpec.subcourses.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block">
                    Available Specializations ({selectedCourseSpec.subcourses.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                    {selectedCourseSpec.subcourses.map((sub, idx) => {
                      const subName = typeof sub === "string" ? sub : sub.name || "";
                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50/80 text-[#0C2B4E] border border-blue-100"
                        >
                          <CheckCircle2 size={12} className="text-blue-600 shrink-0" />
                          <span>{subName}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="space-y-2 text-xs sm:text-[13px] text-[#0D3B66] font-medium pt-1 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  {selectedCourseSpec.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0D3B66] shrink-0" />
                      <span className="text-gray-800">{selectedCourseSpec.duration}</span>
                    </div>
                  )}
                  {selectedCourseSpec.fees && (() => {
                    const semFee = typeof selectedCourseSpec.fees === "object"
                      ? selectedCourseSpec.fees?.formattedSemesterFees ||
                      (selectedCourseSpec.fees?.semesterFees ? `₹ ${Number(selectedCourseSpec.fees.semesterFees).toLocaleString("en-IN")} / Semester` : null)
                      : null;
                    const fullFee = typeof selectedCourseSpec.fees === "string"
                      ? selectedCourseSpec.fees
                      : selectedCourseSpec.fees?.formattedActualFees || selectedCourseSpec.fees?.formattedNetPayable || "";
                    const modalFeeText = semFee || fullFee;
                    if (!modalFeeText) return null;
                    return (
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#0D3B66] font-bold text-sm">₹</span>
                        <span className="text-gray-800">
                          {modalFeeText.replace(/^₹\s*/, "")}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="w-full flex items-center gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const cTitle = selectedCourseSpec.title || selectedCourseSpec.name;
                    setSelectedCourseSpec(null);
                    openFormModal &&
                      openFormModal({
                        title: `Download Brochure - ${cTitle}`,
                        subtitle: `${uniName} - Specializations`,
                        defaultCourse: `${cTitle} - ${uniName}`,
                        university: uniName,
                        submitButtonText: "Download Brochure",
                      });
                  }}
                  className="flex-1 bg-[#0C2B4E] hover:bg-[#081f38] text-white text-[10px] sm:text-sm font-semibold py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap border-none"
                >
                  <span>Download Brochure</span>
                  <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const cTitle = selectedCourseSpec.title || selectedCourseSpec.name;
                    setSelectedCourseSpec(null);
                    openFormModal &&
                      openFormModal({
                        title: `Get Counseling - ${cTitle}`,
                        subtitle: `${uniName} - Specializations Guidance`,
                        defaultCourse: `${cTitle} - ${uniName}`,
                        university: uniName,
                        submitButtonText: "Get Free Counseling",
                      });
                  }}
                  className="flex-1 bg-white hover:bg-gray-50 text-[#0C2B4E] border border-[#0C2B4E] text-[10px] sm:text-sm font-semibold py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 whitespace-nowrap"
                >
                  Get 100% FREE Counseling
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {sampleDegreeData?.imageUrl && (
        <Modal
          open={isCertificateModalOpen}
          onCancel={() => setIsCertificateModalOpen(false)}
          footer={null}
          width={720}
          centered
        >
          <div className="p-4 text-center space-y-3">
            <h3 className="text-base font-bold text-[#0C2B4E] m-0">
              {sampleDegreeData.title || `Sample Degree Certificate - ${uniName}`}
            </h3>
            {sampleDegreeData.description && (
              <p className="text-xs text-gray-500">
                {sampleDegreeData.description}
              </p>
            )}
            <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-200 flex items-center justify-center">
              <div className="relative w-full h-[320px] sm:h-[480px] max-h-[75vh]">
                <Image
                  src={getAssetPath(sampleDegreeData.imageUrl)}
                  alt={sampleDegreeData.title || `Sample Degree Certificate - ${uniName}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-contain rounded-xl shadow-md"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
