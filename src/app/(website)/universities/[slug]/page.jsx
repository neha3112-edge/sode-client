"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Breadcrumb, Button, Modal, Skeleton, Empty, Tabs } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  MapPin,
  Building2,
  ShieldCheck,
  GraduationCap,
  Download,
  PhoneCall,
  Compass,
  CheckCircle2,
  Award,
  Users,
  BookOpen,
  Laptop,
  Video,
  Network,
  FileText,
  Trophy,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  ArrowRight,
  Search,
  CreditCard,
  Rocket,
  FileCheck,
  MessageSquare,
  Quote,
  Star,
  Plus,
  Minus,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import { useFormModal } from "@/hooks/useFormModal";
import { request } from "@/services/request";

const ICONS = {
  MapPin,
  Building2,
  ShieldCheck,
  GraduationCap,
  Download,
  PhoneCall,
  Compass,
  CheckCircle2,
  Award,
  Users,
  BookOpen,
  Laptop,
  Video,
  Network,
  FileText,
  Trophy,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  ArrowRight,
  Search,
  CreditCard,
  Rocket,
  FileCheck,
  MessageSquare,
  Quote,
  Star,
  Plus,
  Minus,
  HelpCircle,
  TrendingUp,
};

function DynamicIcon({ name, className = "w-5 h-5", ...props }) {
  const cleanName = (name || "").replace(/Outlined$/, "").replace(/Filled$/, "");
  const Component = ICONS[cleanName] || ICONS[name] || Trophy;
  return <Component className={className} {...props} />;
}

// 🛡️ Helper to guarantee a safe string/number for React children
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
    return fallback;
  }
  return fallback;
};

export default function UniversityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = params?.slug;
  const slug = typeof rawSlug === "string" ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] : "";

  const { openFormModal } = useFormModal();

  const [universityData, setUniversityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      setLoading(true);
      request.dynamicRead({ entity: "universities", endPoint: "v1/list", id: slug, revalidate: 900 })
        .then((res) => {
          if (!isMounted) return;
          const data = res?.result || res;
          if (data) {
            setUniversityData(data);
            if (data.slug && data.slug !== slug && typeof window !== "undefined") {
              window.history.replaceState(null, "", `/universities/${data.slug}`);
            }
          } else {
            setUniversityData(null);
          }
        })
        .catch((err) => {
          console.error("Error fetching university page by slug:", err);
          if (isMounted) setUniversityData(null);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    } else {
      setLoading(false);
    }
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const data = universityData;

  const courseSliderRef = useRef(null);
  const reviewSliderRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("section-about");
  const [showTopBar, setShowTopBar] = useState(false);

  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const uni = (data && typeof data.universityId === "object" ? data.universityId : data) || {};
  const uniName = getSafeText(uni.name || data?.tagline, "University");
  const uniLogoUrl = uni.image?.url || uni.image || uni.logo?.url || uni.logo
    ? getAssetPath(uni.image?.url || uni.image || uni.logo?.url || uni.logo)
    : null;
  const heroBannerUrl = data?.heroMedia?.url || data?.heroMedia || uni.bannerImg?.url || uni.bannerImg || uni.image?.url || uni.image
    ? getAssetPath(data?.heroMedia?.url || data?.heroMedia || uni.bannerImg?.url || uni.bannerImg || uni.image?.url || uni.image)
    : "";

  const locationText = getSafeText(
    [
      data?.city?.name || uni?.city?.name,
      data?.state?.name || uni?.state?.name,
      data?.country?.name || uni?.country?.name,
    ]
      .filter(Boolean)
      .join(", "),
    "India"
  );

  const naacText =
    data?.naac_rating?.grade ||
      data?.naac_rating?.name ||
      uni?.naac_rating?.grade ||
      uni?.naac_rating?.name
      ? `NAAC ${data?.naac_rating?.grade || data?.naac_rating?.name || uni?.naac_rating?.grade || uni?.naac_rating?.name}`
      : "";

  const nirfText = data?.nirf_rank?.rank
    ? `NIRF Rank #${data.nirf_rank.rank}`
    : uni?.nirf_rank?.rank
      ? `NIRF Rank #${uni.nirf_rank.rank}`
      : uni?.nirf_rank?.title
        ? `NIRF: ${uni.nirf_rank.title}`
        : "";

  const rankingText = [naacText, nirfText].filter(Boolean).join(" • ");

  const establishedText = getSafeText(
    data?.established_year?.year ||
    data?.established_year ||
    uni?.established_year?.year ||
    uni?.established_year,
    ""
  );

  const modesText = Array.isArray(data?.mode) && data.mode.length > 0
    ? data.mode.map((m) => (typeof m === "object" ? m.name : m)).filter(Boolean).join(" • ")
    : (data?.mode?.name || uni?.mode?.name || "");

  // Approvals & Accreditations list from DB
  const rawAccreditations = Array.isArray(data?.approvalsSection?.accreditations) && data.approvalsSection.accreditations.length > 0
    ? data.approvalsSection.accreditations
    : [];

  const rawApprovals = Array.isArray(data?.approvalsSection?.approvals) && data.approvalsSection.approvals.length > 0
    ? data.approvalsSection.approvals
    : Array.isArray(uni?.approvals) && uni.approvals.length > 0
      ? uni.approvals
      : [];

  const displayApprovalsList = rawAccreditations.length > 0
    ? rawAccreditations
    : rawApprovals.map((a) => ({
      title: typeof a === "object" ? a.name || a.title || a.code || "Approval" : a,
      description: typeof a === "object" ? a.description || a.title || a.name || "" : "",
      logo: typeof a === "object" ? a.logo : null,
    }));

  // Dynamic offerings list (actual courses linked to this university)
  const offeringsList = Array.isArray(data?.offerings) && data.offerings.length > 0
    ? data.offerings
    : Array.isArray(data?.courses) && data.courses.length > 0
      ? data.courses
      : [];

  const totalCoursesText = getSafeText(
    data?.totalCoursesCount,
    offeringsList.length ? `${offeringsList.length}+ Programmes` : "10+ Programmes"
  );

  // Dynamic Factsheet facts with populated data fallback
  const dynamicFacts = Array.isArray(data?.factsheetSection?.facts) && data.factsheetSection.facts.length > 0
    ? data.factsheetSection.facts
    : [
      { label: "University Name", value: uniName },
      ...(locationText ? [{ label: "Location", value: locationText }] : []),
      ...(establishedText ? [{ label: "Established Year", value: establishedText }] : []),
      ...(naacText ? [{ label: "NAAC Accreditation", value: naacText }] : []),
      ...(nirfText ? [{ label: "NIRF Ranking", value: nirfText }] : []),
      ...(displayApprovalsList.length > 0 ? [{ label: "Recognitions & Approvals", value: displayApprovalsList.map(a => a.title).join(", ") }] : []),
      ...(offeringsList.length > 0 ? [{ label: "Total Programmes", value: `${offeringsList.length}+ Degree & Diploma Programmes` }] : []),
      ...(modesText ? [{ label: "Mode of Learning", value: modesText }] : []),
    ];

  // Dynamic Navigation Sections
  const dynamicNavSections = [
    ...(data?.aboutSection?.enabled !== false && data?.aboutSection?.description ? [{ id: "section-about", label: getSafeText(data.aboutSection.title, "About") }] : []),
    ...(dynamicFacts.length > 0 ? [{ id: "section-factsheet", label: getSafeText(data?.factsheetSection?.title, "Factsheet") }] : []),
    ...(displayApprovalsList.length > 0 ? [{ id: "section-approvals", label: getSafeText(data?.approvalsSection?.title, "Approvals") }] : []),
    ...(offeringsList.length > 0 ? [{ id: "section-courses", label: "Programmes Offered" }] : []),
    ...(data?.whyChooseSection?.enabled !== false && data?.whyChooseSection?.advantages?.length > 0 ? [{ id: "section-advantages", label: getSafeText(data.whyChooseSection.title, "Why Choose") }] : []),
    ...(data?.learningMethodologySection?.enabled !== false && data?.learningMethodologySection?.features?.length > 0 ? [{ id: "section-learning-methodology", label: getSafeText(data.learningMethodologySection.title, "Methodology") }] : []),
    ...(data?.certificateSection?.enabled !== false ? [{ id: "section-certificate", label: getSafeText(data?.certificateSection?.title, "Certificate") }] : []),
    ...(data?.testimonialsSection?.enabled !== false && data?.testimonialsSection?.testimonials?.length > 0 ? [{ id: "section-reviews", label: getSafeText(data.testimonialsSection.title, "Reviews") }] : []),
    ...(data?.faqSection?.enabled !== false && data?.faqSection?.faqs?.length > 0 ? [{ id: "section-faqs", label: getSafeText(data?.faqSection?.title, "FAQs") }] : []),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 320) {
        setShowTopBar(true);
      } else {
        setShowTopBar(false);
      }

      if (!isManualScrollingRef.current && dynamicNavSections.length > 0) {
        const offset = 120;
        const sectionElements = dynamicNavSections.map((sec) =>
          document.getElementById(sec.id)
        ).filter(Boolean);

        let currentSection = dynamicNavSections[0]?.id || "";
        for (let i = 0; i < sectionElements.length; i++) {
          const el = sectionElements[i];
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            currentSection = el.id;
          }
        }
        if (currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dynamicNavSections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      setActiveSection(id);
      isManualScrollingRef.current = true;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      scrollTimeoutRef.current = setTimeout(() => {
        isManualScrollingRef.current = false;
      }, 700);
    }
  };

  const scrollCourses = (direction) => {
    if (courseSliderRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      courseSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const certificateImgUrl = data?.certificateSection?.certificateImage?.url
    ? getAssetPath(data.certificateSection.certificateImage.url)
    : data?.certificateSection?.certificateImage
      ? getAssetPath(data.certificateSection.certificateImage)
      : "";

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {loading ? (
          <div className="space-y-6">
            <Skeleton active avatar paragraph={{ rows: 6 }} className="bg-white p-8 rounded-3xl" />
            <Skeleton active paragraph={{ rows: 10 }} className="bg-white p-8 rounded-3xl" />
          </div>
        ) : !data ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <Empty description="University landing page not found" />
            <Button
              type="primary"
              onClick={() => router.push("/universities")}
              className="mt-4 bg-[#0C3058]"
            >
              Browse All Universities
            </Button>
          </div>
        ) : (
          <>
            {/* Breadcrumb + Back Button */}
            <div className="hidden md:flex flex-wrap items-center justify-between gap-4">
              <Breadcrumb
                className="text-xs sm:text-sm font-semibold text-slate-500"
                items={[
                  { title: <Link href="/" className="hover:text-blue-600">Home</Link> },
                  { title: <Link href="/universities" className="hover:text-blue-600">Universities</Link> },
                  { title: <span className="text-slate-800 font-bold">{uniName}</span> },
                ]}
              />
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push("/universities")}
                className="bg-white border-slate-300 rounded-lg text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50"
              >
                Back to Universities
              </Button>
            </div>

            {/* 1. HERO BANNER CARD */}
            <div className="bg-linear-to-r from-[#0B2545] via-[#0F3759] to-[#134074] rounded-3xl overflow-hidden shadow-xl text-white relative">
              {/* Background campus banner image with gradient overlay */}
              {heroBannerUrl && (
                <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity">
                  <Image
                    src={heroBannerUrl}
                    alt={uniName}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}

              <div className="relative z-10 p-6 sm:p-8 lg:p-10 space-y-6">
                {/* University Logo Card */}
                {uniLogoUrl && (
                  <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-lg border border-slate-100">
                    <div className="relative w-12 h-9 flex items-center justify-center">
                      <Image
                        src={uniLogoUrl}
                        alt={uniName}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                    <span className="font-extrabold text-sm text-[#0C3058] tracking-tight">
                      {uniName}
                    </span>
                  </div>
                )}

                <div>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight m-0">
                    {uniName}
                  </h1>
                  {data?.tagline && (
                    <p className="text-blue-200 text-sm sm:text-base font-medium mt-2 m-0 max-w-3xl">
                      {getSafeText(data.tagline)}
                    </p>
                  )}
                </div>

                {/* Meta Highlights Pill Tags */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-200 pt-2">
                  {locationText && (
                    <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
                      <MapPin className="w-4 h-4 text-[#FFD166]" /> {locationText}
                    </span>
                  )}
                  {rankingText && (
                    <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
                      <Trophy className="w-4 h-4 text-[#FFD166]" /> {rankingText}
                    </span>
                  )}
                  {establishedText && (
                    <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
                      <Building2 className="w-4 h-4 text-[#FFD166]" /> Est. {establishedText}
                    </span>
                  )}
                  {totalCoursesText && (
                    <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
                      <GraduationCap className="w-4 h-4 text-[#FFD166]" /> {totalCoursesText}
                    </span>
                  )}
                  {modesText && (
                    <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15">
                      <Laptop className="w-4 h-4 text-[#FFD166]" /> {modesText}
                    </span>
                  )}
                </div>

                {/* Hero Highlight Bullets */}
                {Array.isArray(data?.heroBullets) && data.heroBullets.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {data.heroBullets.map((bullet, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-xl text-white border border-white/10 shadow-2xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{getSafeText(bullet)}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      openFormModal &&
                        openFormModal({
                          title: `Enquire Now - ${uniName}`,
                          subtitle: "Speak directly with senior academic counselors",
                          defaultCourse: uniName,
                          submitButtonText: "Enquire Now",
                        });
                    }}
                    className="bg-[#00B4D8] hover:bg-[#0096C7] text-white border-none font-bold text-sm px-6 py-5 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    size="large"
                    onClick={() => {
                      openFormModal &&
                        openFormModal({
                          title: `Download Brochure - ${uniName}`,
                          subtitle: "Fill details to receive instant digital brochure",
                          defaultCourse: uniName,
                          submitButtonText: "Download Brochure",
                        });
                    }}
                    className="bg-transparent hover:bg-white/10 text-white border-2 border-white/80 font-bold text-sm px-6 py-5 rounded-xl cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Download Brochure</span>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* FIXED TOP STICKY BAR (Ant Design Tabs) */}
            <div
              className={`fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300 transform ${showTopBar
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-full opacity-0 pointer-events-none"
                }`}
            >
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
                <Tabs
                  activeKey={activeSection}
                  onChange={(key) => scrollToSection(key)}
                  tabBarGutter={24}
                  className="[&_.ant-tabs-nav]:mb-0 [&_.ant-tabs-tab-btn]:font-medium [&_.ant-tabs-tab-btn]:text-sm [&_.ant-tabs-tab-btn]:text-slate-700 [&_.ant-tabs-tab-btn]:hover:text-[#0c3058] [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:text-[#0c3058]! [&_.ant-tabs-ink-bar]:bg-[#0c3058]! [&_.ant-tabs-ink-bar]:h-0.75 [&_.ant-tabs-nav-wrap]:py-1.5"
                  items={dynamicNavSections.map((sec) => ({
                    key: sec.id,
                    label: sec.label,
                  }))}
                />
              </div>
            </div>

            {/* 2. ABOUT UNIVERSITY SECTION */}
            {data?.aboutSection && (
              <div
                id="section-about"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#EBF4FF] shrink-0">
                      <Compass className="w-5 h-5 text-[#0C3058]" />
                    </span>
                    {getSafeText(data.aboutSection.title, `About ${uniName}`)}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base mt-4 m-0 font-normal">
                    {getSafeText(data.aboutSection.description)}
                  </p>
                </div>

                {data.aboutSection.keyHighlights && data.aboutSection.keyHighlights.length > 0 && (
                  <div className="pt-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#0C3058] mb-4">
                      Institutional Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {data.aboutSection.keyHighlights.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors"
                        >
                          <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-100/70 text-[#0C3058] shrink-0 mt-0.5">
                            <DynamicIcon name={item.icon || "Trophy"} className="w-4 h-4 stroke-[2.5]" />
                          </span>
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-sm m-0 leading-tight">
                              {getSafeText(item.title)}
                            </h4>
                            {item.description && (
                              <p className="text-xs text-slate-500 m-0 mt-1 leading-snug">
                                {getSafeText(item.description)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. UNIVERSITY FACTSHEET (KEY INFO TABLE) */}
            {dynamicFacts && dynamicFacts.length > 0 && (
              <div
                id="section-factsheet"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#E8F5E9] shrink-0">
                      <Sparkles className="w-5 h-5 text-emerald-600" />
                    </span>
                    {getSafeText(data?.factsheetSection?.title, "University Factsheet")}
                  </h2>
                  {data?.factsheetSection?.description && (
                    <p className="text-slate-600 text-sm sm:text-base mt-2 m-0 font-medium">
                      {getSafeText(data.factsheetSection.description)}
                    </p>
                  )}
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-125">
                      <thead>
                        <tr className="bg-[#0C3058] text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                          <th className="py-3.5 px-4 md:px-6 w-2/5 border-r border-white/10">
                            Particular
                          </th>
                          <th className="py-3.5 px-4 md:px-6 w-3/5">
                            Details
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                        {dynamicFacts.map((fact, idx) => (
                          <tr
                            key={idx}
                            className={
                              idx % 2 === 0
                                ? "bg-white hover:bg-slate-50/70"
                                : "bg-slate-50/60 hover:bg-slate-50/90"
                            }
                          >
                            <td className="py-3 px-4 md:px-6 font-bold text-slate-800 border-r border-slate-100">
                              {getSafeText(fact.label)}
                            </td>
                            <td className="py-3 px-4 md:px-6 text-slate-600 font-medium">
                              {getSafeText(fact.value)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 4. APPROVALS & ACCREDITATIONS */}
            {displayApprovalsList && displayApprovalsList.length > 0 && (
              <div
                id="section-approvals"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FFF8E1] shrink-0">
                      <ShieldCheck className="w-5 h-5 text-amber-500" />
                    </span>
                    {getSafeText(data?.approvalsSection?.title, "Approvals & Accreditations")}
                  </h2>
                  {data?.approvalsSection?.description && (
                    <p className="text-slate-600 text-sm sm:text-base mt-2 m-0 font-medium">
                      {getSafeText(data.approvalsSection.description)}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 pt-2">
                  {displayApprovalsList.map((acc, idx) => {
                    const accTitle = getSafeText(acc.title || acc.name || acc.code, "Approval");
                    const accDesc = getSafeText(acc.description, "");
                    const accLogo = acc.logo?.url || acc.logo ? getAssetPath(acc.logo?.url || acc.logo) : null;

                    return (
                      <div
                        key={idx}
                        className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center justify-center text-center space-y-1.5"
                      >
                        {accLogo ? (
                          <div className="relative w-12 h-9 mb-1">
                            <Image src={accLogo} alt={accTitle} fill unoptimized className="object-contain" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100/70 text-[#0C3058] flex items-center justify-center font-bold text-xs">
                            <CheckCircle2 className="w-4 h-4 text-[#0C3058]" />
                          </div>
                        )}
                        <span className="font-extrabold text-xs text-slate-800 leading-tight">
                          {accTitle}
                        </span>
                        {accDesc && accDesc !== accTitle && (
                          <span className="text-[10px] text-slate-500 line-clamp-1">
                            {accDesc}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. PROGRAMMES OFFERED (DYNAMIC COURSES LINKED TO THIS UNIVERSITY) */}
            {offeringsList.length > 0 && (
              <div
                id="section-courses"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 flex items-center gap-2.5">
                      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#EBF4FF] shrink-0">
                        <GraduationCap className="w-5 h-5 text-[#0C3058]" />
                      </span>
                      Programmes Offered ({offeringsList.length})
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1 m-0">
                      Explore top online and executive programmes offered by {uniName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scrollCourses("left")}
                      aria-label="Previous Course"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0C3058] text-slate-700 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scrollCourses("right")}
                      aria-label="Next Course"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0C3058] text-slate-700 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div
                  ref={courseSliderRef}
                  className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory px-1"
                >
                  {offeringsList.map((off, idx) => {
                    const courseTitle = getSafeText(
                      off.courseId?.title || off.courseId?.name || off.title,
                      "Executive Programme"
                    );
                    const subTitle = getSafeText(
                      off.subCourseId?.title || off.subCourseId?.name,
                      ""
                    );
                    const fullCourseTitle = subTitle
                      ? `${courseTitle} (${subTitle})`
                      : courseTitle;
                    const courseImg =
                      off.heroMedia?.url ||
                      off.heroMedia ||
                      off.courseId?.image?.url ||
                      off.courseId?.image ||
                      heroBannerUrl;
                    const durationStr = getSafeText(
                      off.duration,
                      "12 - 24 Months"
                    );
                    const feeVal = off.fees?.fullFee || off.fees?.semesterFee;
                    const feeStr = feeVal
                      ? `₹${Number(feeVal).toLocaleString("en-IN")}`
                      : "Flexible EMI Available";
                    const targetCourseSlug = getSafeText(off.slug, "");

                    return (
                      <div
                        key={off._id || idx}
                        className="w-full min-w-72 sm:min-w-85 lg:w-[calc(33.333%-14px)] snap-start shrink-0 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                      >
                        <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                          {courseImg ? (
                            <Image
                              src={getAssetPath(courseImg)}
                              alt={fullCourseTitle}
                              fill
                              unoptimized
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full bg-linear-to-br from-blue-900 to-indigo-950 flex items-center justify-center p-4 text-center">
                              <span className="text-white font-bold text-sm">{fullCourseTitle}</span>
                            </div>
                          )}
                          <div className="absolute top-3 left-3 bg-[#0C3058] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                            {getSafeText(off.courseId?.category?.[0] || off.courseId?.category, "Executive Programme")}
                          </div>
                        </div>

                        <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                          <div>
                            <h3 className="font-extrabold text-base text-[#0C3058] line-clamp-2 m-0 leading-snug min-h-12">
                              {fullCourseTitle}
                            </h3>
                            {off.overviewDescription && (
                              <p className="text-xs text-slate-600 line-clamp-2 mt-2 m-0 leading-relaxed font-normal">
                                {getSafeText(off.overviewDescription)}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700 font-medium">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                              <span>
                                <strong className="font-bold text-slate-800">Duration:</strong>{" "}
                                {durationStr}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>
                                <strong className="font-bold text-slate-800">Fee:</strong> {feeStr}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                type="primary"
                                onClick={() => {
                                  if (targetCourseSlug) {
                                    router.push(`/courses/${targetCourseSlug}`);
                                  } else {
                                    openFormModal &&
                                      openFormModal({
                                        title: `Apply Now - ${fullCourseTitle}`,
                                        defaultCourse: fullCourseTitle,
                                        submitButtonText: "Apply Now",
                                      });
                                  }
                                }}
                                className="flex-1 bg-[#00B4D8] hover:bg-[#0096C7] text-white border-none font-bold text-xs py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                              >
                                <span>Explore Course</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                onClick={() => {
                                  openFormModal &&
                                    openFormModal({
                                      title: `Download Brochure - ${fullCourseTitle}`,
                                      subtitle: "Receive full curriculum & syllabus",
                                      defaultCourse: fullCourseTitle,
                                      submitButtonText: "Download Brochure",
                                    });
                                }}
                                className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#0C3058] border-slate-200 font-bold text-xs py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-1"
                              >
                                <span>Brochure</span>
                                <Download className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 6. WHY CHOOSE / THE ADVANTAGE */}
            {data?.whyChooseSection?.advantages && data.whyChooseSection.advantages.length > 0 && (
              <div
                id="section-advantages"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#EDE7F6] shrink-0">
                      <Trophy className="w-5 h-5 text-purple-600" />
                    </span>
                    {getSafeText(data.whyChooseSection.title, `Why Choose ${uniName}?`)}
                  </h2>
                  {data.whyChooseSection.description && (
                    <p className="text-slate-600 text-sm sm:text-base mt-2 m-0 font-medium">
                      {getSafeText(data.whyChooseSection.description)}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {data.whyChooseSection.advantages.map((adv, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-2 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-[#0C3058] flex items-center justify-center shadow-2xs">
                        <DynamicIcon name={adv.icon || "Rocket"} className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <h3 className="font-extrabold text-sm text-[#0C3058] m-0 leading-tight">
                        {getSafeText(adv.title)}
                      </h3>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed m-0">
                        {getSafeText(adv.description)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. LEARNING METHODOLOGY */}
            {data?.learningMethodologySection?.features && data.learningMethodologySection.features.length > 0 && (
              <div
                id="section-learning-methodology"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#E0F2FE] shrink-0">
                      <Laptop className="w-5 h-5 text-sky-600" />
                    </span>
                    {getSafeText(data.learningMethodologySection.title, "Learning Methodology & Pedagogy")}
                  </h2>
                  {data.learningMethodologySection.description && (
                    <p className="text-slate-600 text-sm sm:text-base mt-2 m-0 font-medium">
                      {getSafeText(data.learningMethodologySection.description)}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                  {data.learningMethodologySection.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-medium leading-snug"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{getSafeText(feat)}</span>
                    </div>
                  ))}
                </div>

                {data.learningMethodologySection.note && (
                  <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-[#0C3058] font-medium flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>{getSafeText(data.learningMethodologySection.note)}</span>
                  </div>
                )}
              </div>
            )}

            {/* 8. PRESTIGIOUS DEGREE / CERTIFICATE PREVIEW */}
            {data?.certificateSection && (
              <div
                id="section-certificate"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#EBF4FF] shrink-0">
                      <Award className="w-5 h-5 text-[#0C3058]" />
                    </span>
                    {getSafeText(data.certificateSection.title, `Prestigious Certificate from ${uniName}`)}
                  </h2>
                  {data.certificateSection.description && (
                    <p className="text-slate-600 text-sm sm:text-base mt-2 m-0 font-medium">
                      {getSafeText(data.certificateSection.description)}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-center">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
                    <h3 className="text-base font-extrabold text-[#0C3058] m-0">
                      {getSafeText(data.certificateSection.certificateTitle, "Earn Executive Alumni Status")}
                    </h3>
                    {data.certificateSection.certificateDescription && (
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed m-0">
                        {getSafeText(data.certificateSection.certificateDescription)}
                      </p>
                    )}

                    {data.certificateSection.keyBenefits && data.certificateSection.keyBenefits.length > 0 && (
                      <ul className="space-y-2.5 pt-2 list-none p-0 m-0">
                        {data.certificateSection.keyBenefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                            <span>{getSafeText(benefit)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {certificateImgUrl && (
                    <div
                      onClick={() => setIsCertificateModalOpen(true)}
                      className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center justify-center overflow-hidden shadow-xs cursor-pointer group"
                    >
                      <Image
                        src={certificateImgUrl}
                        alt="Sample Degree Certificate"
                        width={480}
                        height={320}
                        unoptimized
                        className="w-full h-auto object-contain rounded-xl max-h-72 shadow-sm transition-transform duration-300 group-hover:scale-102"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 9. ALUMNI TESTIMONIALS & REVIEWS */}
            {data?.testimonialsSection && (
              <div
                id="section-reviews"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 flex items-center gap-2.5">
                      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#FFF3E0] shrink-0">
                        <MessageSquare className="w-5 h-5 text-amber-500" />
                      </span>
                      {getSafeText(data.testimonialsSection.title, "Student & Alumni Reviews")}
                    </h2>
                    {data.testimonialsSection.description && (
                      <p className="text-slate-500 text-xs sm:text-sm mt-1 m-0">
                        {getSafeText(data.testimonialsSection.description)}
                      </p>
                    )}
                  </div>

                  {data.testimonialsSection.stats && data.testimonialsSection.stats.length > 0 && (
                    <div className="flex items-center gap-4">
                      {data.testimonialsSection.stats.map((stat, idx) => (
                        <div key={idx} className="bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 text-center">
                          <span className="font-extrabold text-[#0C3058] text-sm block">
                            {getSafeText(stat.value)}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {getSafeText(stat.label)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {data.testimonialsSection.testimonials && data.testimonialsSection.testimonials.length > 0 && (
                  <div
                    ref={reviewSliderRef}
                    className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory px-1"
                  >
                    {data.testimonialsSection.testimonials.map((review, idx) => (
                      <div
                        key={idx}
                        className="w-full min-w-72 sm:min-w-85 lg:w-[calc(33.333%-14px)] snap-start shrink-0 bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {[...Array(review.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-400" />
                              ))}
                            </div>
                            <Quote className="w-5 h-5 text-slate-300 rotate-180" />
                          </div>
                          <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed m-0 font-normal">
                            &quot;{getSafeText(review.review || review.quote)}&quot;
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-3">
                          <div>
                            <h4 className="font-extrabold text-sm text-[#0C3058] m-0">
                              {getSafeText(review.name)}
                            </h4>
                            <span className="text-xs text-slate-500 font-medium block">
                              {getSafeText(review.role)} {review.company ? `• ${getSafeText(review.company)}` : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 10. FREQUENTLY ASKED QUESTIONS (FAQS) */}
            {data?.faqSection?.faqs && data.faqSection.faqs.length > 0 && (
              <div
                id="section-faqs"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C3058] m-0 border-b border-slate-200 pb-3 flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#E8F5E9] shrink-0">
                      <HelpCircle className="w-5 h-5 text-emerald-600" />
                    </span>
                    {getSafeText(data.faqSection.title, `Frequently Asked Questions about ${uniName}`)}
                  </h2>
                </div>

                <div className="space-y-3 pt-2">
                  {data.faqSection.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
                          ? "border-[#0C3058] shadow-sm bg-blue-50/40"
                          : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer bg-transparent border-none outline-none"
                        >
                          <span
                            className={`text-sm font-bold leading-snug transition-colors ${isOpen ? "text-[#0C3058]" : "text-slate-800"
                              }`}
                          >
                            {getSafeText(faq.question)}
                          </span>
                          <span
                            className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 transition-colors ${isOpen ? "bg-[#0C3058] text-white" : "bg-slate-100 text-slate-500"
                              }`}
                          >
                            {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100/80 font-normal">
                            {getSafeText(faq.answer)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* CERTIFICATE FULL PREVIEW MODAL */}
      <Modal
        open={isCertificateModalOpen}
        onCancel={() => setIsCertificateModalOpen(false)}
        footer={null}
        width={750}
        centered
      >
        <div className="p-4 text-center space-y-4">
          <h3 className="text-lg font-bold text-[#0C3058] m-0">
            Sample Degree & Certificate Preview - {uniName}
          </h3>
          {certificateImgUrl && (
            <div className="bg-slate-50 p-2 rounded-2xl border border-slate-200">
              <Image
                src={certificateImgUrl}
                alt="Sample Degree Certificate"
                width={800}
                height={550}
                unoptimized
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
