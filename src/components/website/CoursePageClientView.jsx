"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel, Table } from "antd";
import { Container } from "@/components/common/Container";
import SafeHtmlRenderer from "@/components/website/SafeHtmlRenderer";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { getAssetPath } from "@/lib/utils";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import Hero from "@/components/website/Hero";
import CourseStickyNav from "@/components/website/course/CourseStickyNav";
import { Video } from "@/components/common/Video";
import {
  Award,
  Trophy,
  ShieldCheck,
  Clock,
  ChevronDown,
  ArrowDownCircle,
  MapPin,
  Check,
  Building2,
  Plus,
  Minus,
} from "lucide-react";

// =========================================================================
// 🎨 THEME COLOR PALETTE (Strictly Website-Client Brand Guidelines)
// =========================================================================
// Primary Navy: #1C3569
// Dark Deep Navy: #0C2340 / #0A1C33
// Bright Gold/Amber: #FFC107
// Amber Accent Text: #B45309
// Sky Accent: #0284C7
// Neutral Backgrounds: #F8FAFC, #FFFFFF, #F1F5F9
// =========================================================================

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("embed/")) return url;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
  );
  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0`;
  }
  return url;
}

function getYouTubeVideoId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
  );
  return match && match[1] ? match[1] : null;
}

function isDirectVideoFile(url) {
  if (!url || typeof url !== "string") return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url) || url.includes("/video/") || url.includes("/uploads/video");
}

function resolveMediaUrl(media) {
  if (!media) return null;
  if (typeof media === "string") return media;
  return media.url || media.path || media.link || media.fileUrl || null;
}

export default function CoursePageClientView({ page, slug, heroData = null }) {
  const { openFormModal } = useFormModal();
  const { isInCompare, toggleCompare, setIsCompareDrawerOpen } = useCompare();

  // Active Semester Tab State
  const [activeSemester, setActiveSemester] = useState(1);

  // Active FAQ Accordion State (open first by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Visible Universities in Top Universities Section (Initial 5, expands 5-by-5, then collapses back to 5)
  const [visibleUnisCount, setVisibleUnisCount] = useState(5);

  // Visible Overview Highlights Table Rows (Initial 5, expands 5-by-5, then collapses back to 5)
  const [visibleOverviewCount, setVisibleOverviewCount] = useState(5);

  // Visible Comparison Table Rows (Initial 5, expands 5-by-5, then collapses back to 5)
  const [visibleComparisonCount, setVisibleComparisonCount] = useState(5);

  // Visible Syllabus Subjects Table Rows (Initial 5, expands 5-by-5, then collapses back to 5)
  const [visibleSyllabusCount, setVisibleSyllabusCount] = useState(5);

  // Visible Career Experience Level Rows (Initial 5, expands 5-by-5, then collapses back to 5)
  const [visibleCareerLevelCount, setVisibleCareerLevelCount] = useState(5);

  // Visible Career Job Roles Table Rows (Initial 5, expands 5-by-5, then collapses back to 5)
  const [visibleJobRolesCount, setVisibleJobRolesCount] = useState(5);

  // Core identifiers
  const pageTitle = page?.pageTitle || page?.title || "";
  const cleanCourseName = pageTitle.replace(/^online\s+/i, "");
  const cleanOnlineTitle = pageTitle
    ? pageTitle.toLowerCase().startsWith("online")
      ? pageTitle
      : `Online ${pageTitle}`
    : "";
  const shortTitle = page?.shortTitle || "";
  const courseCode = page?.course?.code || "";

  // Breadcrumbs
  useBreadcrumb(
    {
      items: [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: pageTitle },
      ],
      backButton: {
        label: "Courses",
        href: "/courses",
      },
    },
    [pageTitle]
  );

  // Execute custom JavaScript if present
  useEffect(() => {
    if (!page?.js) return;
    try {
      const scriptFn = new Function(page.js);
      scriptFn();
    } catch (err) {
      console.error("[CoursePage] Error executing custom JS:", err);
    }
  }, [page?.js]);

  // Responsive slides count for partner universities carousel (strictly 3 on mobile, 7/8 on desktop)
  const [partnerSlidesToShow, setPartnerSlidesToShow] = useState(7);

  useEffect(() => {
    const updateSlides = () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 1200;
      if (width <= 768) {
        setPartnerSlidesToShow(3);
      } else if (width <= 900) {
        setPartnerSlidesToShow(5);
      } else if (width <= 1150) {
        setPartnerSlidesToShow(6);
      } else if (width <= 1380) {
        setPartnerSlidesToShow(7);
      } else {
        setPartnerSlidesToShow(8);
      }
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  // Open enquiry modal helper
  const handleOpenLead = (customTitle, customSub) => {
    openFormModal({
      title: customTitle || `Enquire About ${pageTitle}`,
      subtitle: customSub || "Get 1:1 free academic counselling and fee structure",
      submitButtonText: "Get Free Consultation",
    });
  };

  // -------------------------------------------------------------------------
  // 1️⃣ DATA RESOLUTION (Strictly Database Driven - No Static Dummy Data)
  // -------------------------------------------------------------------------
  const hero = page?.hero || {};
  const quickStats = page?.quickStats || {};
  const accreditations = page?.accreditations || {};
  const overview = page?.overview || {};
  const whyChoose = page?.whyChoose || {};
  const eligibility = page?.eligibilitySection || {};
  const admissionProcess = page?.admissionProcess || {};
  const modeComparison = page?.modeComparison || {};
  const specializations = page?.specializations || {};
  const syllabus = page?.syllabus || {};
  const topUniversities = page?.topUniversities || {};
  const careerScope = page?.careerScope || {};
  const recruitersSection = page?.recruitersSection || {};
  const mistakesToAvoid = page?.mistakesToAvoid || {};
  const faqSection = page?.faqSection || {};

  // Quick Stats Values (Database Driven)
  const approvalsDisplay = quickStats.approvalsText || "";
  const durationDisplay = quickStats.durationText || "";
  const eligibilityDisplay = quickStats.eligibilityText || "";
  const feeDisplay = quickStats.semesterFeeText || "";

  const hasQuickStats =
    quickStats.enabled !== false &&
    Boolean(approvalsDisplay || durationDisplay || eligibilityDisplay || feeDisplay);

  // Dynamic Section Lists (Strictly from Backend Data)
  const accreditationItems = accreditations.items || [];
  const overviewTable = overview.highlightsTable || [];
  const whyChooseCards = whyChoose.cards || [];
  const eligibilityCards = eligibility.cards || [];
  const admissionSteps = admissionProcess.steps || [];
  const comparisonRows = modeComparison.rows || [];
  const specializationsList = specializations.items || [];
  const syllabusData = syllabus.semesters || [];
  const universitiesList = topUniversities.universitiesList || [];
  const experienceLevels = careerScope.experienceLevels || [];
  const jobRolesList = (
    Array.isArray(careerScope.jobRolesMatrix) && careerScope.jobRolesMatrix.length > 0
      ? careerScope.jobRolesMatrix
      : careerScope.jobRoles || []
  ).map((j) => ({
    role: j.role || j.title || "",
    desc: j.description || j.desc || "",
    salary: j.salaryRange || j.salary || "",
  }));
  const recruitersList =
    recruitersSection.recruiters && recruitersSection.recruiters.length > 0
      ? recruitersSection.recruiters
      : recruitersSection.customRecruiters || [];
  const mistakesList = mistakesToAvoid.items || [];
  const faqsList = faqSection.faqs || [];

  // Current active semester data
  const currentSemesterData =
    syllabusData.find((s) => s.semesterNumber === activeSemester) || syllabusData[0] || null;

  // ── Partner Universities for Carousel Strip (Dynamic from API hero.partnerLogos or topUniversities) ──
  const partnerList = useMemo(() => {
    const candidates = [
      hero?.partnerLogos,
      heroData?.partnerLogos,
      universitiesList,
      page?.offeringUniversities,
    ];

    let validList = [];
    for (const candidate of candidates) {
      if (Array.isArray(candidate) && candidate.length > 0) {
        const filtered = candidate.filter((item) => {
          const src =
            resolveMediaUrl(item?.image) ||
            resolveMediaUrl(item?.imageUrl) ||
            resolveMediaUrl(item?.logo) ||
            resolveMediaUrl(item?.logoData) ||
            resolveMediaUrl(item?.imageData) ||
            null;
          return !!src;
        });
        if (filtered.length > 0) {
          validList = filtered;
          break;
        }
      }
    }

    if (validList.length === 0) return [];
    if (validList.length < 15) {
      return [...validList, ...validList, ...validList];
    }
    return validList;
  }, [hero?.partnerLogos, heroData?.partnerLogos, universitiesList, page?.offeringUniversities]);

  // ── Fixed Action Buttons for Hero Section (Standardized Across Course Pages) ──
  const heroButtons = useMemo(() => {
    return [
      {
        text: "Book 1:1 Counseling",
        url: "#counseling-modal",
        variant: "amber",
        icon: "counseling",
        isModal: true,
      },
      {
        text: "Listen Podcast",
        url: "#podcast",
        variant: "outline",
        icon: "podcast",
        isModal: false,
      },
    ];
  }, []);

  // ── Ant Design Table Memoized Configurations (100% Mobile Responsive, No Scrolling) ──
  const overviewTableColumns = useMemo(
    () => [
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: "36%",
        onCell: () => ({ className: "font-bold text-gray-900" }),
      },
      {
        title: "Details",
        dataIndex: "details",
        key: "details",
        width: "64%",
        onCell: () => ({ className: "text-gray-800 font-normal" }),
        render: (text) => {
          if (typeof text === "string" && text.includes("Read More")) {
            const parts = text.split("Read More");
            return (
              <span>
                {parts[0]}
                <a
                  href="#specializations"
                  className="text-[#0077B6] hover:text-[#0C2B4E] font-semibold underline underline-offset-2 ml-1 cursor-pointer"
                >
                  Read More
                </a>
                {parts[1] || ""}
              </span>
            );
          }
          return text;
        },
      },
    ],
    []
  );

  const overviewDataSource = useMemo(() => {
    const list = [...(overviewTable || [])].sort((a, b) => {
      // Dynamic rows (isDynamic === true) always on top, static rows (isDynamic === false) at bottom
      const aDyn = a?.isDynamic !== false;
      const bDyn = b?.isDynamic !== false;
      if (aDyn && !bDyn) return -1;
      if (!aDyn && bDyn) return 1;
      return 0;
    });

    return list.map((row, idx) => ({
      key: row.category || idx,
      category: row.category,
      details: row.details,
    }));
  }, [overviewTable]);

  const modeComparisonColumns = useMemo(
    () => [
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: "25%",
        onCell: () => ({ className: "font-bold text-gray-900" }),
      },
      {
        title:
          (typeof modeComparison.columns?.col1 === "object"
            ? modeComparison.columns?.col1?.text
            : modeComparison.columns?.col1) ||
          cleanOnlineTitle ||
          "Online",
        dataIndex: "online",
        key: "online",
        width: "25%",
        onCell: () => ({ className: "text-[#0F2A4A] font-semibold bg-blue-50/40" }),
      },
      {
        title:
          (typeof modeComparison.columns?.col2 === "object"
            ? modeComparison.columns?.col2?.text
            : modeComparison.columns?.col2) ||
          (cleanCourseName ? `Regular ${cleanCourseName}` : "Regular"),
        dataIndex: "regular",
        key: "regular",
        width: "25%",
        onCell: () => ({ className: "text-gray-700" }),
      },
      {
        title:
          (typeof modeComparison.columns?.col3 === "object"
            ? modeComparison.columns?.col3?.text
            : modeComparison.columns?.col3) ||
          (cleanCourseName ? `Distance ${cleanCourseName}` : "Distance"),
        dataIndex: "distance",
        key: "distance",
        width: "25%",
        onCell: () => ({ className: "text-gray-700" }),
      },
    ],
    [modeComparison.columns, cleanOnlineTitle, cleanCourseName]
  );

  const modeComparisonDataSource = useMemo(
    () =>
      (comparisonRows || []).map((row, idx) => ({
        key: row.category || idx,
        category: row.category,
        online: row.online,
        regular: row.regular,
        distance: row.distance,
      })),
    [comparisonRows]
  );

  const syllabusColumns = useMemo(
    () => [
      {
        title: "Subject Name",
        dataIndex: "subjectName",
        key: "subjectName",
        width: "42%",
        onCell: () => ({ className: "font-bold text-gray-900" }),
      },
      {
        title: "Focus Area",
        dataIndex: "focusArea",
        key: "focusArea",
        width: "58%",
        onCell: () => ({ className: "text-gray-800 font-normal" }),
      },
    ],
    []
  );

  const syllabusDataSource = useMemo(
    () =>
      (currentSemesterData?.subjects || []).map((subj, idx) => ({
        key: subj.subjectName || subj.name || idx,
        subjectName: subj.subjectName || subj.name || "",
        focusArea: subj.focusArea || subj.description || "",
      })),
    [currentSemesterData]
  );

  const careerLevelColumns = useMemo(
    () => [
      {
        title: "Experience Level",
        dataIndex: "level",
        key: "level",
        width: "28%",
        onCell: () => ({ className: "font-bold text-gray-900" }),
      },
      {
        title: "Job Roles",
        dataIndex: "jobRoles",
        key: "jobRoles",
        width: "44%",
        onCell: () => ({ className: "text-gray-800 font-normal" }),
      },
      {
        title: "Expected Salary (p.a.)",
        dataIndex: "salaryRange",
        key: "salaryRange",
        width: "28%",
        onCell: () => ({ className: "font-bold text-[#0F2A4A]" }),
      },
    ],
    []
  );

  const careerLevelDataSource = useMemo(
    () =>
      (experienceLevels || []).map((lvl, idx) => ({
        key: lvl.level || idx,
        level: lvl.level,
        jobRoles: lvl.jobRoles,
        salaryRange: lvl.salaryRange,
      })),
    [experienceLevels]
  );

  const careerJobRoleColumns = useMemo(
    () => [
      {
        title: "Job Role",
        dataIndex: "role",
        key: "role",
        width: "28%",
        onCell: () => ({ className: "font-bold text-gray-900" }),
      },
      {
        title: "Role Description",
        dataIndex: "desc",
        key: "desc",
        width: "44%",
        onCell: () => ({ className: "text-gray-600 leading-relaxed font-normal" }),
      },
      {
        title: "Salary Range in India",
        dataIndex: "salary",
        key: "salary",
        width: "28%",
        onCell: () => ({ className: "font-bold text-[#0F2A4A]" }),
      },
    ],
    []
  );

  const careerJobRoleDataSource = useMemo(
    () =>
      (jobRolesList || []).map((job, idx) => ({
        key: job.role || idx,
        role: job.role,
        desc: job.desc,
        salary: job.salary,
      })),
    [jobRolesList]
  );

  // Check if Hero has any media (video or banner/thumbnail image)
  const heroVideoUrl = hero.videoUrl || "";
  const isDirectVideo = isDirectVideoFile(heroVideoUrl);
  const ytVideoId = !isDirectVideo ? getYouTubeVideoId(heroVideoUrl) : null;
  const ytThumbnail = ytVideoId ? `https://i.ytimg.com/vi/${ytVideoId}/hqdefault.jpg` : null;
  const heroImageSrc = resolveMediaUrl(hero.videoThumbnail || hero.bannerImage);
  const videoPosterSrc = heroImageSrc || ytThumbnail;
  const hasHeroMedia = Boolean(heroVideoUrl || heroImageSrc);

  // Dynamic Available Sections for Sticky Tabs Navigation (Strictly Based on Active Data)
  const availableSections = useMemo(() => {
    const list = [];
    if (accreditations.enabled !== false && accreditationItems && accreditationItems.length > 0) {
      list.push({ id: "accreditations", label: "Accreditations" });
    }
    if (overview.enabled !== false && (Boolean(overview.description) || overviewTable.length > 0)) {
      list.push({ id: "overview", label: "Highlights" });
    }
    if (whyChoose.enabled !== false && whyChooseCards && whyChooseCards.length > 0) {
      list.push({ id: "why-choose", label: "Why Choose Us" });
    }
    if (eligibility.enabled !== false && eligibilityCards && eligibilityCards.length > 0) {
      list.push({ id: "eligibility", label: "Eligibility" });
    }
    if (admissionProcess.enabled !== false && admissionSteps && admissionSteps.length > 0) {
      list.push({ id: "admission-process", label: "Admission Process" });
    }
    if (modeComparison.enabled !== false && comparisonRows && comparisonRows.length > 0) {
      list.push({ id: "mode-comparison", label: "Mode Comparison" });
    }
    if (specializations.enabled !== false && specializationsList && specializationsList.length > 0) {
      list.push({ id: "specializations", label: "Specialisations" });
    }
    if (syllabus.enabled !== false && syllabusData && syllabusData.length > 0) {
      list.push({ id: "syllabus", label: "Syllabus" });
    }
    if (topUniversities.enabled !== false && universitiesList && universitiesList.length > 0) {
      list.push({ id: "top-universities", label: "Top Universities" });
    }
    if (
      careerScope.enabled !== false &&
      ((experienceLevels && experienceLevels.length > 0) ||
        (jobRolesList && jobRolesList.length > 0) ||
        Boolean(careerScope.jobRolesDescription) ||
        Boolean(careerScope.salaryTrend))
    ) {
      list.push({ id: "career-scope", label: "Career & Scope" });
    }
    if (recruitersSection.enabled !== false && recruitersList && recruitersList.length > 0) {
      list.push({ id: "recruiters", label: "Top Recruiters" });
    }
    if (mistakesToAvoid.enabled !== false && mistakesList && mistakesList.length > 0) {
      list.push({ id: "mistakes-to-avoid", label: "Mistakes to Avoid" });
    }
    if (faqSection.enabled !== false && faqsList && faqsList.length > 0) {
      list.push({ id: "faqs", label: "FAQs" });
    }
    return list;
  }, [
    accreditations.enabled,
    accreditationItems,
    overview.enabled,
    overview.description,
    overviewTable.length,
    whyChoose.enabled,
    whyChooseCards,
    eligibility.enabled,
    eligibilityCards,
    admissionProcess.enabled,
    admissionSteps,
    modeComparison.enabled,
    comparisonRows,
    specializations.enabled,
    specializationsList,
    syllabus.enabled,
    syllabusData,
    topUniversities.enabled,
    universitiesList,
    careerScope.enabled,
    experienceLevels,
    jobRolesList,
    careerScope.jobRolesDescription,
    careerScope.salaryTrend,
    recruitersSection.enabled,
    recruitersList,
    mistakesToAvoid.enabled,
    mistakesList,
    faqSection.enabled,
    faqsList,
  ]);

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 antialiased min-h-screen">
      {/* ── Custom CSS from builder / editor ── */}
      {page?.css && (
        <style
          id={`course-page-css-${page._id || "style"}`}
          dangerouslySetInnerHTML={{ __html: page.css }}
        />
      )}

      {/* =====================================================================
          1️⃣ HERO SECTION (Database Driven - No Static Mockups)
      ===================================================================== */}
      {hero.enabled !== false && hero.heroType !== "none" && (
        <>
          {hero.heroType === "hero_ref" && hero.heroRef ? (
            <Hero initialHeroData={hero.heroRef} />
          ) : hero.heroType === "custom" && hero.customHtml ? (
            <div className="w-full">
              <SafeHtmlRenderer html={hero.customHtml} />
            </div>
          ) : (
            <section
              style={{ backgroundColor: hero.backgroundColor || "#102A45" }}
              className="relative overflow-hidden text-white pt-8 pb-10 md:pt-12 md:pb-12"
            >
              {hero.backgroundImage && (
                <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
                  <Image
                    src={getAssetPath(resolveMediaUrl(hero.backgroundImage))}
                    alt=""
                    fill
                    priority
                    unoptimized
                    className="object-cover object-center opacity-30"
                  />
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                </div>
              )}
              <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Left Content Column (Order-2 on mobile so video shows first, order-1 on desktop) */}
                  <div className={`${hasHeroMedia ? "lg:col-span-7" : "lg:col-span-12"} flex flex-col items-center text-center lg:items-start lg:text-left z-10 order-2 lg:order-1`}>
                    {/* Full Degree Subtitle in parentheses */}
                    {shortTitle && (
                      <p className="text-slate-300 text-sm sm:text-base font-normal tracking-wide mb-1.5 text-center lg:text-left">
                        {shortTitle.startsWith("(") ? shortTitle : `(${shortTitle})`}
                      </p>
                    )}

                    {/* Main Heading H1 */}
                    <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight mb-4 text-center lg:text-left">
                      {hero.title || pageTitle}{" "}
                      {hero.titleHighlight && (
                        <span className="text-[#F5D061]">{hero.titleHighlight}</span>
                      )}
                    </h1>

                    {/* Hero Subtitle Description */}
                    {(hero.description || hero.subtitle) && (
                      <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal text-center lg:text-left">
                        {hero.description || hero.subtitle}
                      </p>
                    )}

                    {/* Primary Action Buttons (Database Driven with heroButtons) */}
                    {heroButtons.length > 0 && (
                      <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 flex-wrap">
                        {heroButtons.map((btn, idx) => {
                          const isModal = btn.isModal;
                          const variant = btn.variant || "green";
                          const variantClasses =
                            variant === "green"
                              ? "bg-[#22C55E] hover:bg-[#16a34a] text-white"
                              : variant === "amber" || variant === "gold"
                                ? "bg-[#F5D061] hover:bg-[#ebc44f] text-[#102A45]"
                                : variant === "blue"
                                  ? "bg-[#0284C7] hover:bg-[#0369a1] text-white"
                                  : variant === "dark"
                                    ? "bg-[#0f172a] hover:bg-[#1e293b] text-white"
                                    : variant === "outline"
                                      ? "bg-transparent hover:bg-white/10 text-white border border-white/80"
                                      : "bg-[#F5D061] hover:bg-[#ebc44f] text-[#102A45]";

                          if (isModal) {
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleOpenLead(btn.text || "Counseling", `Course: ${pageTitle}`)}
                                className={`px-4 sm:px-5 py-2 sm:py-2.5 font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-all duration-200 cursor-pointer text-center inline-flex items-center justify-center whitespace-nowrap gap-1.5 ${variantClasses}`}
                              >
                                <span>{btn.text}</span>
                              </button>
                            );
                          }

                          return (
                            <a
                              key={idx}
                              href={btn.url || "#"}
                              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-1.5 cursor-pointer text-center whitespace-nowrap ${variantClasses}`}
                            >
                              {btn.icon === "podcast" && <ArrowDownCircle className="w-4 h-4 shrink-0" />}
                              <span>{btn.text}</span>
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Right Media Column (Order-1 on mobile to show video on top, order-2 on desktop) */}
                  {hasHeroMedia && (
                    <div className="lg:col-span-5 flex justify-center z-10 w-full order-1 lg:order-2">
                      {heroVideoUrl ? (
                        <div className="w-full max-w-lg lg:max-w-none">
                          <Video
                            src={heroVideoUrl}
                            poster={videoPosterSrc}
                            title={pageTitle}
                            preload="none"
                            controls
                            playsInline
                            className="w-full h-full object-cover rounded-xl"
                            containerClassName="relative w-full aspect-video rounded-xl overflow-hidden bg-[#0c1e30] border border-white/10 shadow-2xl"
                          />
                        </div>
                      ) : heroImageSrc ? (
                        <div
                          className="w-full max-w-lg lg:max-w-none rounded-xl overflow-hidden shadow-2xl relative aspect-video bg-[#0c1e30] border border-white/10 group cursor-pointer"
                          onClick={() => handleOpenLead(hero.counselingBtnText || "Book 1:1 Counseling", `Course: ${pageTitle}`)}
                        >
                          <Image
                            src={getAssetPath(heroImageSrc)}
                            alt={hero.title || pageTitle}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="w-12 sm:w-16 h-8 sm:h-11 bg-[#FF0000] rounded-lg sm:rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" viewBox="0 0 24 24">
                                <polygon points="5 3 19 12 5 21 5 3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </Container>
            </section>
          )}
        </>
      )}

      {/* =====================================================================
          2️⃣ PARTNER UNIVERSITIES STRIP (Shown only if showPartners is true & has logos)
      ===================================================================== */}
      {partnerList && partnerList.length > 0 && (
        <section className="w-full bg-[#F6E3A3] py-1.5 sm:py-2 px-1 sm:px-2 border-b border-amber-300/40 overflow-hidden">
          <style>{`
            .partner-antd-carousel .slick-slide > div {
              padding: 0 4px;
            }
            @media (min-width: 640px) {
              .partner-antd-carousel .slick-slide > div {
                padding: 0 5px;
              }
            }
            .partner-antd-carousel .slick-slide {
              height: inherit;
            }

            /* Ant Design Table Mobile-Fit & Crystal Clear Header Typography */
            .course-antd-table {
              width: 100% !important;
            }
            .course-antd-table .ant-table-wrapper {
              width: 100% !important;
            }
            .course-antd-table table {
              table-layout: fixed !important;
              width: 100% !important;
            }
            .course-antd-table .ant-table {
              overflow-x: visible !important;
              background: #ffffff !important;
            }
            .course-antd-table .ant-table-container {
              border-radius: 8px !important;
              overflow: hidden !important;
            }
            .course-antd-table .ant-table-content {
              overflow-x: visible !important;
            }
            .course-antd-table .ant-table-thead > tr > th,
            .course-antd-table .ant-table-thead > tr > th.ant-table-cell,
            .course-antd-table .ant-table-thead > tr > th *,
            .course-antd-table .ant-table-thead th .ant-table-cell-content {
              background-color: #0C2B4E !important;
              color: #ffffff !important;
              -webkit-text-fill-color: #ffffff !important;
              font-weight: 700 !important;
              font-size: 11px !important;
              line-height: 1.35 !important;
              letter-spacing: 0.025em !important;
              font-family: inherit !important;
              text-shadow: none !important;
              opacity: 1 !important;
            }
            .course-antd-table .ant-table-thead > tr > th {
              padding: 8px 8px !important;
              white-space: normal !important;
              word-break: break-word !important;
              border-bottom: none !important;
              border-right: 1px solid rgba(255, 255, 255, 0.15) !important;
            }
            @media (min-width: 640px) {
              .course-antd-table .ant-table-thead > tr > th,
              .course-antd-table .ant-table-thead > tr > th.ant-table-cell,
              .course-antd-table .ant-table-thead > tr > th *,
              .course-antd-table .ant-table-thead th .ant-table-cell-content {
                font-size: 13px !important;
              }
              .course-antd-table .ant-table-thead > tr > th {
                padding: 10px 14px !important;
              }
            }
            .course-antd-table .ant-table-thead > tr > th:last-child {
              border-right: none !important;
            }
            .course-antd-table .ant-table-thead > tr > th::before {
              display: none !important;
            }
            .course-antd-table .ant-table-tbody > tr > td {
              padding: 6px 7px !important;
              font-size: 10.5px !important;
              white-space: normal !important;
              word-break: break-word !important;
              vertical-align: middle !important;
              border-bottom: 1px solid #e2e8f0 !important;
              border-right: 1px solid #f1f5f9 !important;
            }
            @media (min-width: 640px) {
              .course-antd-table .ant-table-tbody > tr > td {
                padding: 8px 14px !important;
                font-size: 12.5px !important;
              }
            }
            .course-antd-table .ant-table-tbody > tr > td:last-child {
              border-right: none !important;
            }
            .course-antd-table .ant-table-tbody > tr:hover > td {
              background-color: #f8fafc !important;
            }
            .course-antd-table-alt .ant-table-thead > tr > th,
            .course-antd-table-alt .ant-table-thead > tr > th.ant-table-cell,
            .course-antd-table-alt .ant-table-thead > tr > th * {
              background-color: #0C2B4E !important;
              color: #ffffff !important;
              -webkit-text-fill-color: #ffffff !important;
              font-weight: 700 !important;
            }
          `}</style>
          <Container>
            <Carousel
              key={`partner-carousel-${partnerSlidesToShow}`}
              autoplay={true}
              autoplaySpeed={2500}
              speed={600}
              pauseOnHover={false}
              dots={false}
              infinite={true}
              draggable={true}
              swipeToSlide={true}
              slidesToShow={partnerSlidesToShow}
              slidesToScroll={1}
              responsive={[
                { breakpoint: 1920, settings: { slidesToShow: 8, slidesToScroll: 1 } },
                { breakpoint: 1600, settings: { slidesToShow: 8, slidesToScroll: 1 } },
                { breakpoint: 1380, settings: { slidesToShow: 7, slidesToScroll: 1 } },
                { breakpoint: 1150, settings: { slidesToShow: 6, slidesToScroll: 1 } },
                { breakpoint: 900, settings: { slidesToShow: 5, slidesToScroll: 1 } },
                { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                { breakpoint: 640, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                { breakpoint: 480, settings: { slidesToShow: 3, slidesToScroll: 1 } },
              ]}
              className="w-full partner-antd-carousel"
            >
              {partnerList.map((uni, idx) => {
                const imageSrc = resolveMediaUrl(
                  uni.image || uni.imageUrl || uni.logo || uni.logoData || uni.imageData
                );
                if (!imageSrc) return null;

                return (
                  <div key={`partner-${uni._id || uni.slug || idx}-${idx}`} className="py-1">
                    <div className="flex items-center justify-center h-12 sm:h-14 w-full">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={getAssetPath(imageSrc)}
                          alt={uni.name || uni.title || "University Logo"}
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 640px) 140px, 200px"
                          unoptimized
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </Container>
        </section>
      )}

      {/* =====================================================================
          3️⃣ QUICK STATS BAR (Rendered only if at least 1 stat has data)
      ===================================================================== */}
      {hasQuickStats && (
        <section className="w-full bg-white border-b border-slate-200 shadow-xs py-2 sm:py-3">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 md:gap-0 divide-y-0 md:divide-x divide-slate-200">
              {/* 1. Approvals */}
              {approvalsDisplay && (
                <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 bg-slate-50/60 md:bg-transparent rounded-lg md:rounded-none flex-1 min-w-[140px]">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] shrink-0" />
                  <div className="leading-tight min-w-0">
                    <span className="block text-[10px] sm:text-xs text-slate-500 font-medium">Approvals</span>
                    <span className="block text-xs sm:text-sm font-bold text-slate-900 truncate">{approvalsDisplay}</span>
                  </div>
                </div>
              )}

              {/* 2. Duration */}
              {durationDisplay && (
                <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 bg-slate-50/60 md:bg-transparent rounded-lg md:rounded-none flex-1 min-w-[140px]">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] shrink-0" />
                  <div className="leading-tight min-w-0">
                    <span className="block text-[10px] sm:text-xs text-slate-500 font-medium">Duration</span>
                    <span className="block text-xs sm:text-sm font-bold text-slate-900 truncate">{durationDisplay}</span>
                  </div>
                </div>
              )}

              {/* 3. Eligibility */}
              {eligibilityDisplay && (
                <div className="flex items-center gap-2.5 px-2.5 sm:px-4 py-1.5 bg-slate-50/60 md:bg-transparent rounded-lg md:rounded-none flex-1 min-w-[140px]">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] shrink-0" />
                  <div className="leading-tight min-w-0">
                    <span className="block text-[10px] sm:text-xs text-slate-500 font-medium">Eligibility</span>
                    <span className="block text-xs sm:text-sm font-bold text-slate-900 truncate">{eligibilityDisplay}</span>
                  </div>
                </div>
              )}

              {/* 4. Semester Fees */}
              {feeDisplay && (
                <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 bg-slate-50/60 md:bg-transparent rounded-lg md:rounded-none flex-1 min-w-[140px]">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] shrink-0 fill-[#0284C7]/20" />
                  <div className="leading-tight min-w-0">
                    <span className="block text-[10px] sm:text-xs text-slate-500 font-medium">Semester Fees</span>
                    <span className="block text-xs sm:text-sm font-bold text-slate-900 truncate">{feeDisplay}</span>
                  </div>
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Auto Sticky Tabs Header based on present dynamic sections */}
      <CourseStickyNav
        containerId="course-page-content-sections"
        sections={availableSections}
        courseName={cleanOnlineTitle || pageTitle}
      />

      {/* =====================================================================
          MAIN CONTENT AREA (White Island Cards on Soft Slate #F4F6F9)
      ===================================================================== */}
      <div className="w-full bg-[#F0F4F8] py-5 sm:py-10">
        <Container>
          <div id="course-page-content-sections" className="space-y-6">
            {/* =====================================================================
              3️⃣ RANKINGS & ACCREDITATIONS (Shown only if accreditationItems has data)
          ===================================================================== */}
            {accreditations.enabled !== false && accreditationItems && accreditationItems.length > 0 && (
              <div
                id="accreditations"
                data-nav-label="Accreditations"
                className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-5 sm:p-7 mb-6 scroll-mt-20 text-center"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight mb-2">
                  {accreditations.title || (pageTitle ? `Rankings & Accreditations for ${pageTitle}` : "Rankings & Accreditations")}
                </h2>
                {accreditations.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                    {accreditations.subtitle}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-start md:justify-center gap-1.5 sm:gap-2.5 md:gap-3 w-full">
                  {accreditationItems.map((item, idx) => {
                    const logoSrc = resolveMediaUrl(item.logo || item.icon);
                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-xl border border-gray-200 flex flex-col p-1.5 sm:p-3 items-center justify-between text-center aspect-[4/4.6] sm:aspect-square shadow-2xs hover:border-blue-300 transition-colors overflow-hidden shrink-0 w-[calc((100%-12px)/3)] sm:w-[calc((100%-20px)/3)] md:w-[calc((100%-60px)/6)]"
                      >
                        <div className="flex-1 min-h-0 w-full relative">
                          {logoSrc ? (
                            <Image
                              src={getAssetPath(logoSrc)}
                              alt={item.title || "Accreditation"}
                              fill
                              sizes="(max-width: 768px) 64px, 80px"
                              className="object-contain"
                              unoptimized
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
                              {item.title}
                            </h3>
                          </div>
                          <div className="w-full h-[22px] sm:h-[26px] flex items-start justify-center mt-0.5">
                            {item.subtitle || item.description ? (
                              <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600 leading-tight m-0 line-clamp-2 w-full text-center">
                                {item.subtitle || item.description}
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

            {/* =====================================================================
              4️⃣ OVERVIEW & KEY HIGHLIGHTS (Shown only if description or table has data)
          ===================================================================== */}
            {overview.enabled !== false && (Boolean(overview.description) || overviewTable.length > 0) && (
              <div
                id="overview"
                data-nav-label="Highlights"
                className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                  {overview.title || "Overview & Key Highlights"}
                </h2>
                {overview.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-5">
                    {overview.subtitle}
                  </p>
                )}

                {/* Thin Divider Line */}
                <div className="w-full max-w-2xl mx-auto h-[1px] bg-slate-200 mb-6" />

                {overview.description && (
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center max-w-4xl mx-auto mb-8">
                    <SafeHtmlRenderer html={overview.description} />
                  </div>
                )}

                {/* Highlights Comparison Table */}
                {overviewTable.length > 0 && (
                  <>
                    <div className="max-w-5xl mx-auto overflow-hidden border border-gray-200 shadow-2xs rounded-lg">
                      <Table
                        columns={overviewTableColumns}
                        dataSource={overviewDataSource.slice(0, visibleOverviewCount)}
                        pagination={false}
                        size="small"
                        bordered
                        className="course-antd-table w-full"
                      />
                    </div>

                    {/* View More / View Less Buttons for Overview Table */}
                    {overviewDataSource.length > 5 && (
                      <div className="flex items-center justify-center gap-3 mt-5">
                        {visibleOverviewCount < overviewDataSource.length ? (
                          <button
                            type="button"
                            onClick={() =>
                              setVisibleOverviewCount((prev) =>
                                Math.min(prev + 5, overviewDataSource.length)
                              )
                            }
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                          >
                            <span>View More</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setVisibleOverviewCount(5)}
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                          >
                            <span>View Less</span>
                            <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* =====================================================================
              5️⃣ WHY CHOOSE COURSE (Shown only if whyChooseCards has data)
          ===================================================================== */}
            {whyChoose.enabled !== false && whyChooseCards && whyChooseCards.length > 0 && (
              <div
                id="why-choose"
                data-nav-label="Why Choose Us"
                className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20 space-y-5 sm:space-y-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                  {whyChoose.title || (cleanOnlineTitle ? `Why Choose ${cleanOnlineTitle}?` : "Why Choose?")}
                </h2>
                {whyChoose.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                    {whyChoose.subtitle}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
                  {whyChooseCards.map((card, idx) => {
                    const iconSrc = resolveMediaUrl(card.icon || card.mediaIcon);
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-blue-100/80 bg-blue-50/20 p-4 sm:p-5 text-center hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-2.5 sm:space-y-3 shadow-2xs"
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white text-[#0D5CAD] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                          {iconSrc ? (
                            <Image
                              src={getAssetPath(iconSrc)}
                              alt={card.title || "Icon"}
                              width={28}
                              height={28}
                              className="object-contain"
                              unoptimized
                            />
                          ) : (
                            <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-[#0077B6]" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                            {card.title}
                          </h3>
                          {card.description && (
                            <p className="text-xs text-gray-600 leading-relaxed font-normal">
                              {card.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =====================================================================
              6️⃣ ELIGIBILITY CRITERIA (Shown only if eligibilityCards has data)
          ===================================================================== */}
            {eligibility.enabled !== false && eligibilityCards && eligibilityCards.length > 0 && (
              <div
                id="eligibility"
                data-nav-label="Eligibility"
                className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20 space-y-5 sm:space-y-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                  {eligibility.title || (cleanOnlineTitle ? `Eligibility Criteria for ${cleanOnlineTitle}` : "Eligibility Criteria")}
                </h2>
                {eligibility.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                    {eligibility.subtitle}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 gap-5 md:gap-0 py-2">
                  {eligibilityCards.map((card, idx) => {
                    const iconSrc = resolveMediaUrl(card.icon || card.mediaIcon);
                    return (
                      <div key={idx} className="flex flex-col items-center text-center px-3 sm:px-6 pt-4 md:pt-0 space-y-2.5">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white text-[#0D5CAD] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                          {iconSrc ? (
                            <Image
                              src={getAssetPath(iconSrc)}
                              alt={card.title || "Icon"}
                              width={28}
                              height={28}
                              className="object-contain"
                              unoptimized
                            />
                          ) : (
                            <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#0077B6]" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-snug">
                            {card.title}
                          </h4>
                          {card.description && (
                            <p className="text-xs text-gray-600 leading-relaxed font-normal">
                              {card.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =====================================================================
              7️⃣ ONLINE MBA ADMISSION PROCESS (Shown only if admissionSteps has data)
          ===================================================================== */}
            {admissionProcess.enabled !== false && admissionSteps && admissionSteps.length > 0 && (
              <div
                id="admission-process"
                data-nav-label="Admission Process"
                className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 mb-6 scroll-mt-20"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                  {admissionProcess.title || (cleanOnlineTitle ? `${cleanOnlineTitle} Admission Process` : "Admission Process")}
                </h2>
                {(admissionProcess.subtitle || admissionProcess.subTitle) && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-8">
                    {admissionProcess.subtitle || admissionProcess.subTitle}
                  </p>
                )}

                {/* Stepper Cards with Arrows */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 items-stretch w-full">
                  {admissionSteps.map((step, idx) => {
                    const stepNum = step.stepNumber || step.order || idx + 1;
                    const stepTitle = step.title || "";
                    const stepDesc = step.description || step.desc || "";
                    const iconUrl = resolveMediaUrl(step.icon);

                    return (
                      <div key={idx} className="relative flex flex-col h-full">
                        <div className="w-full h-full rounded-xl p-2.5 sm:p-3.5 text-center flex flex-col items-center justify-start bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                          {/* Large icon circle */}
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 bg-sky-50 border-2 border-sky-300 mb-2 sm:mb-3">
                            {iconUrl ? (
                              <Image
                                src={getAssetPath(iconUrl)}
                                alt={stepTitle || "Step"}
                                width={24}
                                height={24}
                                className="object-contain"
                                unoptimized
                              />
                            ) : (
                              <span className="font-bold text-sky-600 text-sm sm:text-base">
                                {stepNum}
                              </span>
                            )}
                          </div>

                          {/* Title with Step Number in front */}
                          <h4 className="font-bold text-[10.5px] sm:text-[11.5px] text-[#0F2A4A] leading-snug mb-1 sm:mb-1.5">
                            <span className="text-[#1C3569] font-bold mr-1">{stepNum}.</span>
                            {stepTitle}
                          </h4>

                          {/* Description */}
                          {stepDesc && (
                            <p className="text-[8.5px] sm:text-[9.5px] text-gray-500 leading-relaxed font-normal">
                              {stepDesc}
                            </p>
                          )}
                        </div>

                        {/* Arrow between cards - centered vertically to the card and horizontally in the gap */}
                        {idx < admissionSteps.length - 1 && (
                          <div
                            className={`absolute top-1/2 -translate-y-1/2 left-[calc(100%+7px)] -translate-x-1/2 z-10 text-sky-400 pointer-events-none items-center justify-center ${
                              idx === 2 ? "hidden lg:flex" : "hidden md:flex"
                            }`}
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =====================================================================
              8️⃣ MODE COMPARISON TABLE (Shown only if comparisonRows has data)
          ===================================================================== */}
            {modeComparison.enabled !== false && comparisonRows && comparisonRows.length > 0 && (
              <div
                id="mode-comparison"
                data-nav-label="Mode Comparison"
                className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                  {modeComparison.title || (cleanOnlineTitle ? `${cleanOnlineTitle} vs. Regular vs. Distance` : "Mode Comparison")}
                </h2>
                {modeComparison.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                    {modeComparison.subtitle}
                  </p>
                )}

                {/* Comparison Table */}
                <div className="max-w-5xl mx-auto overflow-hidden border border-gray-200 shadow-2xs rounded-lg">
                  <Table
                    columns={modeComparisonColumns}
                    dataSource={modeComparisonDataSource.slice(0, visibleComparisonCount)}
                    pagination={false}
                    size="small"
                    bordered
                    className="course-antd-table w-full"
                  />
                </div>

                {/* View More / View Less Buttons for Mode Comparison Table */}
                {modeComparisonDataSource.length > 5 && (
                  <div className="flex items-center justify-center gap-3 mt-5">
                    {visibleComparisonCount < modeComparisonDataSource.length ? (
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleComparisonCount((prev) =>
                            Math.min(prev + 5, modeComparisonDataSource.length)
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                      >
                        <span>View More</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setVisibleComparisonCount(5)}
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                      >
                        <span>View Less</span>
                        <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* =====================================================================
              9️⃣ POPULAR SPECIALIZATIONS SECTION (Shown only if specializationsList has data)
          ===================================================================== */}
            {specializations.enabled !== false && specializationsList && specializationsList.length > 0 && (
              <div
                id="specializations"
                data-nav-label="Specialisations"
                className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-3 sm:p-6 mb-5 sm:mb-6 scroll-mt-20"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-1.5 sm:mb-2">
                  {specializations.title || (cleanOnlineTitle ? `Popular ${cleanOnlineTitle} Specializations` : "Popular Specializations")}
                </h2>
                {specializations.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-4 sm:mb-6">
                    {specializations.subtitle}
                  </p>
                )}

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-3">
                  {specializationsList.map((spec, idx) => {
                    const isHighlighted = !!spec.highlighted;

                    return (
                      <div
                        key={idx}
                        onClick={() => handleOpenLead(`Specialization: ${spec.name}`, `Enquire for ${spec.name} in ${pageTitle}`)}
                        className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg border flex items-center transition-all cursor-pointer shadow-2xs min-h-[42px] sm:min-h-[48px] ${isHighlighted
                          ? "border-[#00BCD4] bg-cyan-50/20 text-[#00838F]"
                          : "border-slate-200 bg-white hover:border-slate-300 text-slate-800"
                          }`}
                      >
                        <span className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-2 ${isHighlighted ? "text-[#00838F]" : "text-slate-800"}`}>
                          {spec.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =====================================================================
              🔟 ONLINE MBA SYLLABUS SEMESTER WISE (Shown only if syllabusData has data)
          ===================================================================== */}
            {syllabus.enabled !== false && syllabusData && syllabusData.length > 0 && (
              <div
                id="syllabus"
                data-nav-label="Syllabus"
                className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 mb-6 scroll-mt-20"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                  {syllabus.title || (cleanOnlineTitle ? `${cleanOnlineTitle} Syllabus Semester Wise` : "Syllabus Semester Wise")}
                </h2>
                {syllabus.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                    {syllabus.subtitle}
                  </p>
                )}

                {/* Semester Pill Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
                  {syllabusData.map((sem) => {
                    const isActive = activeSemester === sem.semesterNumber;
                    return (
                      <button
                        key={sem.semesterNumber}
                        type="button"
                        onClick={() => {
                          setActiveSemester(sem.semesterNumber);
                          setVisibleSyllabusCount(5);
                        }}
                        className={`px-4 sm:px-7 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-150 cursor-pointer ${isActive
                          ? "bg-[#0F2A4A] text-white shadow-xs"
                          : "bg-[#EAF2FA] text-[#0F2A4A] hover:bg-slate-200"
                          }`}
                      >
                        {sem.semesterTitle || `Semester ${sem.semesterNumber}`}
                      </button>
                    );
                  })}
                </div>

                {/* Active Semester Subjects Table */}
                <div className="max-w-5xl mx-auto overflow-hidden border border-gray-200 shadow-2xs rounded-lg">
                  <Table
                    columns={syllabusColumns}
                    dataSource={syllabusDataSource.slice(0, visibleSyllabusCount)}
                    pagination={false}
                    size="small"
                    bordered
                    className="course-antd-table w-full"
                  />
                </div>

                {/* View More / View Less Buttons for Syllabus Table */}
                {syllabusDataSource.length > 5 && (
                  <div className="flex items-center justify-center gap-3 mt-5">
                    {visibleSyllabusCount < syllabusDataSource.length ? (
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleSyllabusCount((prev) =>
                            Math.min(prev + 5, syllabusDataSource.length)
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                      >
                        <span>View More</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setVisibleSyllabusCount(5)}
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                      >
                        <span>View Less</span>
                        <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* =====================================================================
              1️⃣1️⃣ TOP UNIVERSITIES OFFERING ONLINE MBA IN INDIA (Shown only if universitiesList has data)
          ===================================================================== */}
            {topUniversities.enabled !== false && universitiesList && universitiesList.length > 0 && (
              <div
                id="top-universities"
                data-nav-label="Top Universities"
                className="scroll-mt-20 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 mb-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                  {topUniversities.title || (cleanOnlineTitle ? `Top Universities Offering ${cleanOnlineTitle} in India` : "Top Universities")}
                </h2>
                {topUniversities.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6 sm:mb-8">
                    {topUniversities.subtitle}
                  </p>
                )}

                {/* University Cards Grid (Strictly Backend Data, 5-by-5 Incremental Display) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {universitiesList.slice(0, visibleUnisCount).map((uni, idx) => {
                    const inCmp = typeof isInCompare === "function" ? isInCompare(uni._id || uni.slug || uni.name) : false;
                    const coursesOfferedText = uni.programsCount
                      ? `${uni.programsCount} Programs`
                      : uni.coursesCount
                        ? `${uni.coursesCount}+ Programs`
                        : (uni.city || uni.state || "Recognized University");
                    const uniHref = uni.slug ? `/universities/${uni.slug}` : "#";
                    const uniLogo = resolveMediaUrl(uni.logo || uni.image);

                    return (
                      <div
                        key={idx}
                        className="bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-400 p-2 sm:p-2.5 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative group min-w-0 shadow-2xs"
                      >
                        {/* Circular Logo Container */}
                        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full p-1 flex items-center justify-center bg-white relative my-0.5 shrink-0 overflow-hidden border border-gray-100">
                          {uniLogo ? (
                            <Image
                              src={getAssetPath(uniLogo)}
                              alt={uni.name || "University"}
                              fill
                              sizes="56px"
                              className="object-contain"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 font-semibold flex items-center justify-center text-xs uppercase">
                              {uni.name ? uni.name.charAt(0) : "U"}
                            </div>
                          )}
                        </div>

                        {/* University Name, Location & Fee */}
                        <div className="w-full space-y-0.5 my-0.5">
                          <div className="min-h-7 sm:min-h-8 flex items-center justify-center">
                            <Link
                              href={uniHref}
                              className="text-xs sm:text-[12.5px] font-semibold text-[#0a2540] hover:text-blue-600 line-clamp-2 leading-tight m-0 w-full text-center no-underline transition-colors"
                            >
                              {uni.name}
                            </Link>
                          </div>

                          {/* 📍 Location  ₹ Fee — flex center, no wrap */}
                          {(uni.location || uni.feeText || uni.customFee) && (
                            <div className="flex items-center justify-center gap-1 w-full overflow-hidden">
                              {uni.location && (
                                <span className="flex items-center gap-0.5 text-[9px] text-gray-500 font-normal min-w-0">
                                  <MapPin className="w-2 h-2 text-[#4A90D9] shrink-0" />
                                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">{uni.location}</span>
                                </span>
                              )}
                              {uni.location && (uni.feeText || uni.customFee) && (
                                <span className="text-gray-300 text-[8px] shrink-0">·</span>
                              )}
                              {(uni.feeText || uni.customFee) && (
                                <span className="text-[9px] font-bold text-[#1C3569] shrink-0 whitespace-nowrap">
                                  {(uni.feeText || uni.customFee || '')
                                    .replace(/\/\s*Sem(ester)?/i, '/Sem')
                                    .replace(/\/\s*Year/i, '/Yr')}
                                </span>
                              )}
                            </div>
                          )}
                          {!uni.location && !uni.feeText && !uni.customFee && (
                            <span className="text-[9px] text-gray-500 text-center w-full block">{coursesOfferedText}</span>
                          )}
                        </div>

                        {/* Full-width Add to Compare Pill */}
                        <button
                          type="button"
                          onClick={() => {
                            toggleCompare(uni);
                            setIsCompareDrawerOpen && setIsCompareDrawerOpen(true);
                          }}
                          className={`w-full py-1 px-2 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all flex items-center justify-center gap-1 border cursor-pointer mt-1 ${inCmp
                            ? "bg-teal-50 text-teal-700 border-teal-600 shadow-2xs"
                            : "bg-white text-[#0a2540] border-gray-200 hover:bg-gray-50 hover:border-gray-300"
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

                        {/* Action Buttons: Apply Now & Know More */}
                        <div className="w-full grid grid-cols-2 gap-1.5 mt-1.5 items-center">
                          <button
                            type="button"
                            onClick={() => {
                              openFormModal &&
                                openFormModal({
                                  title: `Apply to ${uni.name}`,
                                  subtitle: pageTitle,
                                  defaultCourse: pageTitle,
                                  university: uni.name,
                                  formNameOverride: `CourseCard_${uni.slug || uni.name}`,
                                  submitButtonText: "Apply Now",
                                });
                            }}
                            className="w-full bg-[#F4D068] hover:bg-[#ebc557] text-gray-900 text-[11px] sm:text-xs font-semibold py-1.5 px-1 rounded-md sm:rounded-lg border-none cursor-pointer transition-colors active:scale-95 flex items-center justify-center text-center whitespace-nowrap leading-none"
                          >
                            Apply Now
                          </button>
                          <Link
                            href={uniHref}
                            className="w-full bg-white hover:bg-gray-50 text-[#0a2540] hover:text-blue-600 border border-gray-200 text-[11px] sm:text-xs font-semibold py-1.5 px-1 rounded-md sm:rounded-lg text-center no-underline transition-colors flex items-center justify-center whitespace-nowrap leading-none"
                          >
                            Know More
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* View More / View Less Buttons (Initial 5, opens +5 each click, then collapses back to 5) */}
                {universitiesList.length > 5 && (
                  <div className="flex items-center justify-center gap-3 mt-6">
                    {visibleUnisCount < universitiesList.length ? (
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleUnisCount((prev) =>
                            Math.min(prev + 5, universitiesList.length)
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                      >
                        <span>View More</span>
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setVisibleUnisCount(5)}
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                      >
                        <span>View Less</span>
                        <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* =====================================================================
              1️⃣2️⃣ CAREER SCOPE & SALARY EXPECTATIONS (Shown only if data exists)
          ===================================================================== */}
            {careerScope.enabled !== false &&
              ((experienceLevels && experienceLevels.length > 0) ||
                (jobRolesList && jobRolesList.length > 0) ||
                Boolean(careerScope.jobRolesDescription) ||
                Boolean(careerScope.salaryTrend)) && (
                <div
                  id="career-scope"
                  data-nav-label="Career & Scope"
                  className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                    {careerScope.title || "Career Scope & Salary Expectations"}
                  </h2>
                  {careerScope.subtitle && (
                    <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                      {careerScope.subtitle}
                    </p>
                  )}

                  {/* Table 1: Experience Level vs Job Roles vs Expected Salary */}
                  {experienceLevels.length > 0 && (
                    <>
                      <div className="max-w-5xl mx-auto overflow-hidden border border-gray-200 shadow-2xs rounded-lg mb-6">
                        <Table
                          columns={careerLevelColumns}
                          dataSource={careerLevelDataSource.slice(0, visibleCareerLevelCount)}
                          pagination={false}
                          size="small"
                          bordered
                          className="course-antd-table w-full"
                        />
                      </div>

                      {/* View More / View Less Buttons for Career Level Table */}
                      {careerLevelDataSource.length > 5 && (
                        <div className="flex items-center justify-center gap-3 -mt-2 mb-6">
                          {visibleCareerLevelCount < careerLevelDataSource.length ? (
                            <button
                              type="button"
                              onClick={() =>
                                setVisibleCareerLevelCount((prev) =>
                                  Math.min(prev + 5, careerLevelDataSource.length)
                                )
                              }
                              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                            >
                              <span>View More</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setVisibleCareerLevelCount(5)}
                              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                            >
                              <span>View Less</span>
                              <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* Sub-paragraph */}
                  {(careerScope.jobRolesDescription || careerScope.salaryTrend) && (
                    <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto my-6">
                      {careerScope.jobRolesDescription || careerScope.salaryTrend}
                    </p>
                  )}

                  {/* Table 2: Job Role vs Role Description vs Salary Range in India */}
                  {jobRolesList.length > 0 && (
                    <>
                      <div className="max-w-5xl mx-auto overflow-hidden border border-gray-200 shadow-2xs rounded-lg">
                        <Table
                          columns={careerJobRoleColumns}
                          dataSource={careerJobRoleDataSource.slice(0, visibleJobRolesCount)}
                          pagination={false}
                          size="small"
                          bordered
                          className="course-antd-table w-full"
                        />
                      </div>

                      {/* View More / View Less Buttons (Initial 5, opens +5 each click, then collapses back to 5) */}
                      {careerJobRoleDataSource.length > 5 && (
                        <div className="flex items-center justify-center gap-3 mt-6">
                          {visibleJobRolesCount < careerJobRoleDataSource.length ? (
                            <button
                              type="button"
                              onClick={() =>
                                setVisibleJobRolesCount((prev) =>
                                  Math.min(prev + 5, careerJobRoleDataSource.length)
                                )
                              }
                              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                            >
                              <span>View More</span>
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setVisibleJobRolesCount(5)}
                              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 hover:text-blue-700 transition-colors text-xs font-semibold border border-blue-200/60 cursor-pointer shadow-2xs active:scale-95"
                            >
                              <span>View Less</span>
                              <ChevronDown className="w-3.5 h-3.5 rotate-180" />
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

            {/* =====================================================================
              1️⃣3️⃣ TOP HIRING RECRUITERS (Shown only if recruitersList has data)
          ===================================================================== */}
            {recruitersSection.enabled !== false && recruitersList && recruitersList.length > 0 && (
              <div
                id="recruiters"
                data-nav-label="Top Recruiters"
                className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 mb-6 scroll-mt-20"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                  {recruitersSection.title || "Top Hiring Recruiters"}
                </h2>
                {recruitersSection.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-8">
                    {recruitersSection.subtitle}
                  </p>
                )}

                {/* Recruiters Grid - 2 cols mobile, 3 sm, 6 md */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3.5">
                  {recruitersList.map((recruiter, idx) => {
                    const logoSrc = resolveMediaUrl(recruiter.logo || recruiter.icon);
                    const rName = recruiter.name || "";

                    return (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-lg p-1.5 sm:p-2.5 flex items-center justify-center h-12 sm:h-14 bg-white shadow-2xs hover:border-blue-300 hover:shadow-sm transition-all duration-200"
                      >
                        {logoSrc ? (
                          <div className="relative w-full h-8 flex items-center justify-center">
                            <Image
                              src={getAssetPath(logoSrc)}
                              alt={rName || "Recruiter"}
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <span className="font-bold text-slate-800 text-xs sm:text-sm truncate px-1 text-center">
                            {rName}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =====================================================================
              1️⃣4️⃣ COMMON MISTAKES TO AVOID (Shown only if mistakesList has data)
          ===================================================================== */}
            {mistakesToAvoid.enabled !== false && mistakesList && mistakesList.length > 0 && (
              <div
                id="mistakes-to-avoid"
                data-nav-label="Mistakes to Avoid"
                className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20 space-y-5 sm:space-y-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                  {mistakesToAvoid.title || "Common Mistakes to Avoid"}
                </h2>
                {mistakesToAvoid.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                    {mistakesToAvoid.subtitle}
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6">
                  {mistakesList.map((mstk, idx) => {
                    const iconSrc = resolveMediaUrl(mstk.icon || mstk.mediaIcon);
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-red-100/80 bg-red-50/20 p-4 sm:p-5 text-center hover:border-red-300 hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-2.5 sm:space-y-3 shadow-2xs"
                      >
                        {iconSrc ? (
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center p-1 bg-red-50 border border-red-200">
                            <Image
                              src={getAssetPath(iconSrc)}
                              alt={mstk.title || "Mistake"}
                              width={24}
                              height={24}
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-2xs">
                            ✕
                          </div>
                        )}
                        <div className="space-y-1">
                          <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-snug">
                            {mstk.title}
                          </h4>
                          {mstk.description && (
                            <p className="text-xs text-gray-600 leading-relaxed font-normal">
                              {mstk.description}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =====================================================================
              1️⃣5️⃣ FREQUENTLY ASKED QUESTIONS (Shown only if faqsList has data)
          ===================================================================== */}
            {faqSection.enabled !== false && faqsList && faqsList.length > 0 && (
              <div
                id="faqs"
                data-nav-label="FAQs"
                className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20 space-y-5 sm:space-y-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                  {faqSection.title || (pageTitle ? `FAQs on ${pageTitle}` : "Frequently Asked Questions")}
                </h2>
                {faqSection.subtitle && (
                  <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-5">
                    {faqSection.subtitle}
                  </p>
                )}

                <div className="space-y-2.5 sm:space-y-3 max-w-5xl mx-auto">
                  {faqsList.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    const cleanQuestion = (faq.question || "").replace(/^q\d*[\.\:\s]*/i, "").trim();
                    return (
                      <div
                        key={idx}
                        className={`rounded-xl border transition-all duration-200 overflow-hidden ${isOpen
                          ? "border-blue-400 bg-blue-200/30 shadow-2xs"
                          : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                          className="w-full flex items-center justify-between gap-3 p-2.5 sm:p-3 text-left cursor-pointer bg-transparent border-none outline-none"
                        >
                          <span
                            className={`text-xs sm:text-[14px] font-semibold leading-snug ${isOpen ? "text-[#0C2B4E]" : "text-gray-900"
                              }`}
                          >
                            Q{idx + 1}. {cleanQuestion}
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
                            <SafeHtmlRenderer html={faq.answer} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* 16. Raw HTML Fallback if legacy content provided */}
      {page?.content && (
        <section className="py-12 bg-white border-t border-slate-200">
          <Container>
            <SafeHtmlRenderer html={page.content} />
          </Container>
        </section>
      )}
    </div>
  );
}
