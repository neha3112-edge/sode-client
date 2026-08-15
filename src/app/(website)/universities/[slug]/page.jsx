"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Breadcrumb, Button, Modal, Skeleton, Empty } from "antd";
import { SwapOutlined, ArrowLeftOutlined } from "@ant-design/icons";
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
} from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import { useCompare, useFormModal } from "@/context";
import { getUniversityBySlug } from "@/services/api";

const ICONS = {
  MapPin, Building2, ShieldCheck, GraduationCap, Download, PhoneCall, Compass,
  CheckCircle2, Award, Users, BookOpen, Laptop, Video, Network, FileText,
  Trophy, Sparkles, ChevronLeft, ChevronRight, Clock, ExternalLink, ArrowRight,
  Search, CreditCard, Rocket, FileCheck, MessageSquare, Quote, Star, Plus, Minus, HelpCircle
};

function DynamicIcon({ name, ...props }) {
  const Component = ICONS[name] || HelpCircle;
  return <Component {...props} />;
}

const NAV_SECTIONS = [
  { id: "section-about", label: "About" },
  { id: "section-features", label: "Key Features" },
  { id: "section-approvals", label: "Approvals" },
  { id: "section-courses", label: "Courses" },
  { id: "section-admission", label: "Admission Process" },
  { id: "section-learning-methodology", label: "Methodology" },
  { id: "section-certificate", label: "Certificate" },
  { id: "section-reviews", label: "Reviews" },
  { id: "section-explore", label: "Other Universities" },
  { id: "section-faqs", label: "FAQs" },
];

export default function UniversityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const { isInCompare, toggleCompare } = useCompare();
  const { openFormModal } = useFormModal();

  const [universityData, setUniversityData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (slug) {
      setLoading(true);
      getUniversityBySlug(slug)
        .then((res) => {
          if (!isMounted) return;
          if (res) {
            setUniversityData(res);
          } else {
            setUniversityData(null);
          }
        })
        .catch((err) => {
          console.error("Error fetching university by slug:", err);
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
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);

  const [activeSection, setActiveSection] = useState("section-about");
  const [showTopBar, setShowTopBar] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const navContainerRef = useRef(null);
  const tabRefs = useRef({});
  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const checkNavScroll = useCallback(() => {
    const el = navContainerRef.current;
    if (el) {
      const scrollLeft = Math.ceil(el.scrollLeft);
      const clientWidth = el.clientWidth;
      const scrollWidth = el.scrollWidth;

      setCanScrollLeft(scrollLeft > 3);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 3);
    }
  }, []);

  useEffect(() => {
    checkNavScroll();
    const el = navContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkNavScroll, { passive: true });
      window.addEventListener("resize", checkNavScroll);
      return () => {
        el.removeEventListener("scroll", checkNavScroll);
        window.removeEventListener("resize", checkNavScroll);
      };
    }
  }, [showTopBar, checkNavScroll]);

  const scrollNavTabs = (direction) => {
    const el = navContainerRef.current;
    if (el) {
      const scrollAmount = direction === "left" ? -220 : 220;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkNavScroll, 50);
      setTimeout(checkNavScroll, 200);
      setTimeout(checkNavScroll, 400);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 320) {
        setShowTopBar(true);
      } else {
        setShowTopBar(false);
      }

      if (!isManualScrollingRef.current) {
        const offset = 120;
        const sectionElements = NAV_SECTIONS.map((sec) =>
          document.getElementById(sec.id)
        ).filter(Boolean);

        let currentSection = NAV_SECTIONS[0].id;
        for (let i = 0; i < sectionElements.length; i++) {
          const el = sectionElements[i];
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            currentSection = el.id;
          }
        }
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      const scrollAmount = direction === "left" ? -360 : 360;
      courseSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleBrochureClick = () => {
    openFormModal({
      title: `Download Official Brochure - ${data?.banner?.name || "University"}`,
      subtitle: "Enter your details to receive the comprehensive course guide on WhatsApp.",
      isBrochureForm: true,
      defaultCourse: `${data?.banner?.name || "University"} Programs`,
    });
  };

  const handleCounselingClick = () => {
    openFormModal({
      title: "Get 100% Free Counseling",
      subtitle: `Speak with ${data?.banner?.name || "University"} admissions expert for course selection & fees.`,
      defaultCourse: `${data?.banner?.name || "University"} Programs`,
      submitButtonText: "Book Free Session",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Shimmer University Hero Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <Skeleton.Avatar active size={96} shape="square" style={{ borderRadius: 16 }} />
              <div className="flex-1 space-y-3 w-full">
                <Skeleton.Input active size="small" style={{ width: 140, height: 22, borderRadius: 12 }} />
                <Skeleton active paragraph={{ rows: 2, width: ["85%", "55%"] }} title={false} />
                <div className="flex gap-2 pt-1">
                  <Skeleton.Button active size="small" style={{ width: 80, height: 24, borderRadius: 12 }} />
                  <Skeleton.Button active size="small" style={{ width: 90, height: 24, borderRadius: 12 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Shimmer Content Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <Skeleton active paragraph={{ rows: 8, width: ["100%", "95%", "90%", "85%", "100%", "90%", "75%", "60%"] }} />
            </div>
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <Skeleton active paragraph={{ rows: 5, width: ["100%", "100%", "100%", "100%", "100%"] }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-8 text-center space-y-4">
        <Empty description={<span className="font-bold text-slate-700 text-base">University Details Not Found</span>} />
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/universities")}
          className="bg-[#1C3569] font-bold rounded-xl h-10 px-6 cursor-pointer border-none"
        >
          Explore All Universities
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-6 md:py-10 px-3 sm:px-6 md:px-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

        {/* Navigation & Header Controls */}
        <div className="hidden md:flex sm:flex-row sm:items-center justify-between gap-4">
          <Breadcrumb
            items={[
              { title: <Link href="/" className="text-slate-600 hover:text-blue-600">Home</Link> },
              { title: <Link href="/universities" className="text-slate-600 hover:text-blue-600">Universities</Link> },
              { title: <span className="font-semibold text-slate-900">{data.name || data.banner?.name}</span> },
            ]}
          />
          <div className="inline-flex items-center gap-2.5">
            <Button
              type={isInCompare(slug) ? "default" : "dashed"}
              onClick={() => toggleCompare({ ...data.banner, slug, name: data.name })}
              icon={<SwapOutlined className={isInCompare(slug) ? "text-amber-600" : ""} />}
              className={`font-semibold rounded-xl h-9 px-3.5 text-xs cursor-pointer ${
                isInCompare(slug)
                  ? "border-amber-500 bg-amber-50 text-amber-800 font-bold"
                  : "border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {isInCompare(slug) ? "In Compare Bucket ✓" : "+ Add to Compare"}
            </Button>

            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push("/universities")}
              className="flex items-center font-semibold rounded-xl h-9 px-3.5 text-xs text-slate-700 border-slate-300 hover:text-blue-600 cursor-pointer"
            >
              Back to List
            </Button>
          </div>
        </div>

        {/* BANNER SECTION */}
        {data.banner && (
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-[#0f3a5d]">
            <div className="relative h-64 sm:h-72 md:h-80 lg:h-90 w-full overflow-hidden bg-slate-300">
              {data.banner.bgImage && (
                <Image
                  src={getAssetPath(data.banner.bgImage)}
                  alt={data.banner.name || "Campus Banner"}
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
              )}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#0f3a5d]/10 to-[#0f3a5d]" />

              {data.banner.logoImage && (
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-white p-2 rounded-2xl shadow-xl border border-slate-100/90 max-w-52.5 sm:max-w-75 md:max-w-72.5 h-16 sm:h-12 md:h-20 w-32">
                  <Image
                    src={getAssetPath(data.banner.logoImage)}
                    alt={data.banner.logoAlt || "University Logo"}
                    fill
                    unoptimized
                    className="object-contain p-1"
                  />
                </div>
              )}
            </div>

            <div className="bg-[#0f3a5d] text-white px-6 py-6 md:px-10 md:py-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-3.5 max-w-3xl">
                  <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-white tracking-tight leading-none m-0">
                      {data.banner.name}
                    </h1>
                    <p className="text-slate-200 text-sm sm:text-base font-normal mt-2 m-0 opacity-90">
                      {data.banner.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-3">
                    {(data.banner.details || []).map((detail, idx) => (
                      <div key={detail.id || idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
                        <DynamicIcon name={detail.icon || "MapPin"} className="w-5 h-5 text-white shrink-0" />
                        <span><strong className="font-bold text-[#EEDE9F]">{detail.label}:</strong> {detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row lg:flex-row items-stretch sm:items-center gap-2 md:gap-3.5 shrink-0 pt-2 lg:pt-0">
                  <button
                    onClick={handleBrochureClick}
                    className="bg-[#00aeed] hover:bg-[#009bd4] text-white font-medium md:font-bold text-xs sm:text-sm px-3 py-2 md:px-8 md:py-3.5 rounded-full flex items-center justify-center gap-0.5 md:gap-2.5 shadow-lg transition-all duration-200 cursor-pointer border-none active:scale-[0.98]"
                  >
                    <span>Get Broucher</span>
                    <Download className="w-4 h-4 stroke-[2.5]" />
                  </button>
                  <button
                    onClick={handleCounselingClick}
                    className="bg-[#123656] hover:bg-[#184268] border border-white/90 hover:border-white text-white font-medium md:font-bold text-xs sm:text-sm px-3 py-2 md:px-8 md:py-3.5 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Get Free Counseling</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FIXED TOP BAR */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md transition-all duration-300 transform ${
            showTopBar
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 relative">
            {canScrollLeft && (
              <button
                onClick={() => scrollNavTabs("left")}
                aria-label="Scroll Tabs Left"
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#0c3058] shadow-md border border-slate-200 flex items-center justify-center hover:bg-blue-50 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scrollNavTabs("right")}
                aria-label="Scroll Tabs Right"
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#0c3058] shadow-md border border-slate-200 flex items-center justify-center hover:bg-blue-50 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}

            <div
              ref={navContainerRef}
              className="flex items-center gap-1 sm:gap-3 overflow-x-auto scrollbar-none scroll-smooth whitespace-nowrap py-0.5 px-2"
            >
              {NAV_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    ref={(el) => (tabRefs.current[sec.id] = el)}
                    onClick={() => scrollToSection(sec.id)}
                    className={`relative px-3.5 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold transition-colors duration-200 cursor-pointer shrink-0 border-none bg-transparent select-none ${
                      isActive ? "text-[#0c3058]" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>{sec.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-[#0c3058] rounded-t-full transition-all duration-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 2: ABOUT */}
        {data.aboutSection && (
          <div id="section-about" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
                <DynamicIcon name={data.aboutSection.icon || "Compass"} className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
                {data.aboutSection.title}
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 text-xs md:text-base leading-relaxed">
              {(data.aboutSection.paragraphs || []).map((p, idx) => (
                <p key={idx} className="m-0">{p}</p>
              ))}
            </div>

            {data.aboutSection.whyChooseList && data.aboutSection.whyChooseList.length > 0 && (
              <div id="section-why-choose" className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-base md:text-lg font-bold text-[#0c3058]">
                  {data.aboutSection.whyChooseTitle || "Why Professionals Choose Us"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.aboutSection.whyChooseList.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 px-3.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs sm:text-sm text-slate-700 font-medium hover:border-blue-200 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-100/70 text-[#0c3058] flex items-center justify-center shrink-0">
                        <DynamicIcon name={item.icon || "Trophy"} className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: HIGHLIGHTS */}
        {data.highlightsSection && (
          <div id="section-features" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
                <DynamicIcon name={data.highlightsSection.icon || "Sparkles"} className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
                {data.highlightsSection.title || "University Highlights"}
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-125">
                  <thead>
                    <tr className="bg-[#0c3058] text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4 md:px-6 w-2/5 border-r border-white/10">{data.highlightsSection.headers?.[0] || "Particular"}</th>
                      <th className="py-3.5 px-4 md:px-6 w-3/5">{data.highlightsSection.headers?.[1] || "Details"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {(data.highlightsSection.rows || []).map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/70" : "bg-slate-50/50 hover:bg-slate-50/80"}>
                        <td className="py-3.5 px-4 md:px-6 font-bold text-[#0c3058] border-r border-slate-100">{row.particular}</td>
                        <td className="py-3.5 px-4 md:px-6 font-medium text-slate-700 leading-relaxed">{row.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: APPROVALS */}
        {data.accreditationsSection && (
          <div id="section-approvals" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
                <DynamicIcon name={data.accreditationsSection.icon || "ShieldCheck"} className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
                {data.accreditationsSection.title || "Approvals & Accreditations"}
              </h2>
            </div>
            {data.accreditationsSection.description && (
              <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0">
                {data.accreditationsSection.description}
              </p>
            )}
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-4 pt-6">
              {(data.accreditationsSection.logos || []).map((logo, idx) => (
                <div
                  key={logo.id || idx}
                  className="bg-slate-50/80 p-2 sm:p-3 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-center justify-center h-20 md:h-24"
                >
                  <Image
                    src={getAssetPath(logo.image)}
                    alt={logo.alt || "Accreditation"}
                    width={80}
                    height={50}
                    unoptimized
                    className="max-h-16 sm:max-h-26 max-w-full object-contain block"
                    style={{ width: "auto", height: "auto" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: COURSES OFFERED */}
        {data.coursesSection && (
          <div id="section-courses" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
                <DynamicIcon name={data.coursesSection.icon || "GraduationCap"} className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
                {data.coursesSection.title || "Courses Offered"}
              </h2>
            </div>
            {data.coursesSection.description && (
              <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0">
                {data.coursesSection.description}
              </p>
            )}

            <div className="relative pt-4 group">
              <button
                onClick={() => scrollCourses("left")}
                aria-label="Previous Course"
                className="absolute -left-5 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white hover:bg-[#0c3058] text-[#0c3058] hover:text-white flex items-center justify-center shadow-lg border border-slate-200 transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
              <button
                onClick={() => scrollCourses("right")}
                aria-label="Next Course"
                className="absolute -right-5 md:-right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white hover:bg-[#0c3058] text-[#0c3058] hover:text-white flex items-center justify-center shadow-lg border border-slate-200 transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>

              <div
                ref={courseSliderRef}
                className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory px-1"
              >
                {(data.coursesSection.list || []).map((course, idx) => (
                  <div
                    key={course.id || idx}
                    className="w-full min-w-70 sm:min-w-77.5 lg:w-[calc(33.333%-14px)] snap-start shrink-0 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      {course.image && (
                        <Image
                          src={getAssetPath(course.image)}
                          alt={course.title || "Course"}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}
                      <div className="absolute top-3 left-3 bg-[#0c3058] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                        {course.badge || "Top Rated"}
                      </div>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                      <div>
                        <h3 className="font-extrabold text-base text-[#0c3058] line-clamp-2 m-0 leading-snug min-h-12">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-3 mt-2 m-0 leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                        <div className="flex items-center gap-2 font-medium">
                          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                          <span><strong className="font-bold text-[#0c3058]">Duration:</strong> {course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium">
                          <Laptop className="w-4 h-4 text-blue-600 shrink-0" />
                          <span><strong className="font-bold text-[#0c3058]">Format:</strong> {course.mode}</span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleCounselingClick}
                            className="flex-1 bg-[#00aeed] hover:bg-[#0096c7] text-white font-medium md:font-bold text-xs py-2.5 px-2 md:px-3 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer border-none shadow-sm active:scale-[0.98]"
                          >
                            <span>Apply Now</span>
                            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                          <button
                            onClick={() => setSelectedCourseModal(course)}
                            className="flex-1 bg-[#0c3058] hover:bg-[#154477] text-white font-medium md:font-bold text-xs py-2.5 px-2 md:px-3 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer border-none shadow-sm active:scale-[0.98]"
                          >
                            <span>Quick View</span>
                            <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => router.push(`/courses/${course.slug}`)}
                            className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#0c3058] font-bold text-xs py-2.5 px-2.5 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer border border-slate-200/80 active:scale-[0.98]"
                          >
                            <span>Full Page</span>
                            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                          <button
                            onClick={handleBrochureClick}
                            className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#0c3058] font-bold text-xs py-2.5 px-2.5 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer border border-slate-200/80 active:scale-[0.98]"
                          >
                            <span>Brochure</span>
                            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: ADMISSION PROCESS */}
        {data.admissionProcessSection && (
          <div id="section-admission" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
                <DynamicIcon name={data.admissionProcessSection.icon || "FileCheck"} className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
                {data.admissionProcessSection.title || "Admission Process"}
              </h2>
            </div>
            {data.admissionProcessSection.description && (
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {data.admissionProcessSection.description}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {(data.admissionProcessSection.steps || []).map((item, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border ${item.theme?.bg || "bg-blue-50/50"} ${item.theme?.border || "border-blue-200"} shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group p-5 text-center`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-11 h-11 rounded-full bg-white shadow-md border-2 ${item.theme?.badgeBorder || "border-blue-500 text-blue-600"} flex items-center justify-center font-black text-base transition-transform group-hover:scale-110`}
                    >
                      {item.step}
                    </div>
                    <h3 className="font-extrabold text-sm text-[#0c3058] mt-4 mb-2 leading-snug">{item.title}</h3>
                    <p className="text-[11.5px] text-slate-600 leading-relaxed m-0">{item.description}</p>
                  </div>
                  <div className={`h-1.5 w-full rounded-full mt-5 ${item.theme?.accentBg || "bg-blue-500"} transition-all duration-300`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 7: METHODOLOGY */}
        {data.methodologySection && (
          <div id="section-learning-methodology" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
                <DynamicIcon name={data.methodologySection.icon || "Laptop"} className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
                {data.methodologySection.title || "Learning Methodology"}
              </h2>
            </div>
            {data.methodologySection.description && (
              <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0">
                {data.methodologySection.description}
              </p>
            )}

            <div className="space-y-4 pt-2">
              <h3 className="text-base md:text-lg font-bold text-[#0c3058] pt-2">{data.methodologySection.featuresTitle || "Key Learning Features"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 pt-1">
                {(data.methodologySection.features || []).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium py-1">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="leading-snug">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: CERTIFICATE */}
        {data.certificateSection && (
          <div id="section-certificate" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
                <DynamicIcon name={data.certificateSection.icon || "Award"} className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-md md:text-2xl font-extrabold text-[#0c3058] m-0">
                {data.certificateSection.title || "Degree & Executive Certificate"}
              </h2>
            </div>
            {data.certificateSection.description && (
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-3">
                {data.certificateSection.description}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-center space-y-4 order-2 md:order-1">
                <div className="space-y-4">
                  <h3 className="text-base md:text-lg font-bold text-[#0c3058]">{data.certificateSection.benefitsTitle || "Certificate Benefits"}</h3>
                  <div className="space-y-2.5">
                    {(data.certificateSection.benefits || []).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {data.certificateSection.sampleImage && (
                <div className="lg:col-span-5 order-1 md:order-2">
                  <div
                    onClick={() => setIsCertificateModalOpen(true)}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-200 p-2 sm:p-3 w-full text-center overflow-hidden transition-all cursor-pointer group relative"
                  >
                    <Image
                      src={getAssetPath(data.certificateSection.sampleImage)}
                      alt="Certificate Sample"
                      width={600}
                      height={400}
                      unoptimized
                      className="w-full h-auto max-h-75 object-contain rounded-lg block group-hover:scale-[1.02] transition-transform duration-300"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 9: REVIEWS */}
        {data.reviewsSection && (
          <div id="section-reviews" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
                <DynamicIcon name={data.reviewsSection.icon || "MessageSquare"} className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
                {data.reviewsSection.title}
              </h2>
            </div>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
              {data.reviewsSection.description}
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="relative pt-2 group">
                <div ref={reviewSliderRef} className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory px-1">
                  {(data.reviewsSection.testimonials || []).map((review, idx) => (
                    <div
                      key={review.id || idx}
                      className="w-full min-w-72.5 sm:min-w-85 lg:w-[calc(50%-10px)] snap-start shrink-0 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 md:p-6 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-400" />
                            ))}
                          </div>
                          <Quote className="w-6 h-6 text-blue-200 rotate-180" />
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed m-0">&quot;{review.quote}&quot;</p>
                      </div>

                      <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-3">
                        <div>
                          <h4 className="font-extrabold text-sm text-[#0c3058] m-0">{review.author}</h4>
                          <span className="text-xs text-slate-500 font-medium block">— {review.role}</span>
                        </div>
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                          {review.course}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: EXPLORE OTHER UNIVERSITIES */}
        {data.exploreUniversitiesSection && (
          <div id="section-explore" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
                <DynamicIcon name={data.exploreUniversitiesSection.icon || "Building2"} className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
                {data.exploreUniversitiesSection.title || "Explore Other Top Institutions"}
              </h2>
            </div>
            {data.exploreUniversitiesSection.description && (
              <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0">
                {data.exploreUniversitiesSection.description}
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-2">
              {(data.exploreUniversitiesSection.universities || []).map((u, idx) => (
                <Link
                  key={u.id || idx}
                  href={`/universities/${u.slug}`}
                  className="bg-slate-50 hover:bg-blue-50/60 p-4 rounded-2xl border border-slate-200/80 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col items-center text-center space-y-2 group"
                >
                  <div className="w-12 h-12 relative flex items-center justify-center">
                    {u.logo ? (
                      <Image
                        src={getAssetPath(u.logo)}
                        alt={u.name}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center text-sm">
                        {u.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-bold text-[#0c3058] group-hover:text-blue-700 line-clamp-1">
                    {u.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 10: FAQS */}
        {data.faqSection && (
          <div id="section-faqs" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <DynamicIcon name={data.faqSection.icon || "HelpCircle"} className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
                {data.faqSection.title || "Frequently Asked Questions"}
              </h2>
            </div>

            <div className="space-y-3 pt-1">
              {(data.faqSection.faqs || []).map((faq, idx) => {
                const isOpen = openFaqIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen ? "bg-[#F0F8FF] border-blue-200/90 shadow-xs" : "bg-white border-slate-200/80 hover:border-blue-200"
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-3 md:p-4 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                    >
                      <span className={`text-sm font-bold leading-snug ${isOpen ? "text-[#0c3058]" : "text-slate-800"}`}>
                        {faq.question}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                          isOpen ? "bg-[#0c3058] text-white" : "bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {isOpen ? <Minus className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                      </div>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100 border-t border-blue-100/60 mt-1" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 md:px-5 pb-5 pt-3 text-xs md:text-sm text-slate-800 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {data.certificateSection?.sampleImage && (
        <Modal
          open={isCertificateModalOpen}
          onCancel={() => setIsCertificateModalOpen(false)}
          footer={null}
          centered
          width={900}
          aria-label="Certificate Full Preview"
          className="certificate-preview-modal"
        >
          <div className="p-2 pt-6 pb-2 text-center">
            <Image
              src={getAssetPath(data.certificateSection.sampleImage)}
              alt="Executive Education Certificate Full View"
              width={800}
              height={600}
              unoptimized
              className="w-full h-auto max-h-[82vh] object-contain rounded-xl shadow-md mx-auto block"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </Modal>
      )}

      {/* COURSE OFFERING DETAILS MODAL */}
      <Modal
        open={Boolean(selectedCourseModal)}
        onCancel={() => setSelectedCourseModal(null)}
        footer={null}
        centered
        width={800}
        title={null}
        aria-label="Course Offering Quick Details"
        className="course-offering-detail-modal"
      >
        {selectedCourseModal && (
          <div className="p-4 sm:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="inline-block bg-[#0c3058] text-white text-xs font-bold px-3 py-1 rounded-full mb-1">
                  {selectedCourseModal.badge || "Top Rated"}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-[#0c3058] m-0">
                  {selectedCourseModal.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium m-0">
                  Offered by <strong className="text-blue-900">{data.name}</strong>
                </p>
              </div>
            </div>

            {/* Badges Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong className="text-[#0c3058]">Duration:</strong> {selectedCourseModal.duration || "Flexible"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong className="text-[#0c3058]">Format:</strong> {selectedCourseModal.mode || "Online"}</span>
              </div>
              {selectedCourseModal.eligibility && (
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                  <span><strong className="text-[#0c3058]">Eligibility:</strong> {selectedCourseModal.eligibility}</span>
                </div>
              )}
            </div>

            {/* Overview / Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-extrabold text-[#0c3058] uppercase tracking-wider m-0">Course Overview</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed m-0 whitespace-pre-line">
                {selectedCourseModal.content || selectedCourseModal.description || "Detailed curriculum & learning objectives for this program."}
              </p>
            </div>

            {/* Key Highlights */}
            {Array.isArray(selectedCourseModal.keyHighlights) && selectedCourseModal.keyHighlights.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-extrabold text-[#0c3058] uppercase tracking-wider m-0">Program Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCourseModal.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Syllabus / Modules */}
            {Array.isArray(selectedCourseModal.modules) && selectedCourseModal.modules.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-extrabold text-[#0c3058] uppercase tracking-wider m-0">Syllabus & Modules</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedCourseModal.modules.map((m, idx) => (
                    <div key={idx} className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-xl space-y-1">
                      <h4 className="text-xs font-bold text-[#0c3058] m-0">{idx + 1}. {m.title}</h4>
                      {m.description && <p className="text-[11.5px] text-slate-600 m-0">{m.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedCourseModal(null);
                  handleCounselingClick();
                }}
                className="w-full sm:w-auto bg-[#00aeed] hover:bg-[#0096c7] text-white font-bold text-xs py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-none shadow-sm active:scale-95"
              >
                <span>Apply for this Course</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={() => {
                  const slugToNav = selectedCourseModal.slug;
                  setSelectedCourseModal(null);
                  router.push(`/courses/${slugToNav}`);
                }}
                className="w-full sm:w-auto bg-[#0c3058] hover:bg-[#154477] text-white font-bold text-xs py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-none shadow-sm active:scale-95"
              >
                <span>Full Dedicated Page</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
