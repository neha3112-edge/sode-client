"use client";
import { Container } from "@/components/ui/container";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAssetPath } from "@/lib/utils";
import { Card, Modal, Tooltip } from "antd";
import { getWebsiteCoursesFilter, getUniversities } from "@/services/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// 1. Search Bar Component (With smooth enter & exit top slide-down filter drawer)
export function SearchBar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterClosing, setIsFilterClosing] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/courses?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleOpenFilters = () => {
    setIsFilterOpen(true);
    setIsFilterClosing(false);
  };

  const handleCloseFilters = () => {
    setIsFilterClosing(true);
    setTimeout(() => {
      setIsFilterOpen(false);
      setIsFilterClosing(false);
    }, 350); // Matches slideUpExit animation duration
  };

  const handleApplyFilters = () => {
    handleCloseFilters();
    setTimeout(() => {
      let queryParams = [];
      if (searchTerm.trim()) queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
      if (selectedCategory !== "all") queryParams.push(`category=${selectedCategory}`);
      if (selectedType !== "all") queryParams.push(`type=${selectedType}`);
      if (selectedDuration !== "all") queryParams.push(`duration=${selectedDuration}`);

      const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      router.push(`/courses${queryString}`);
    }, 380);
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedType("all");
    setSelectedDuration("all");
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(4px); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeOut {
          from { opacity: 1; backdrop-filter: blur(4px); }
          to { opacity: 0; backdrop-filter: blur(0px); }
        }
        .animate-fade-out {
          animation: fadeOut 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slideDown 0.38s cubic-bezier(0.32, 0.94, 0.6, 1) forwards;
        }

        @keyframes slideUpExit {
          from { transform: translateY(0); }
          to { transform: translateY(-100%); }
        }
        .animate-slide-up-exit {
          animation: slideUpExit 0.35s cubic-bezier(0.32, 0.94, 0.6, 1) forwards;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.42s cubic-bezier(0.32, 0.94, 0.6, 1) forwards;
        }

        @keyframes slideDownExit {
          from { transform: translateY(0); }
          to { transform: translateY(100%); }
        }
        .animate-slide-down-exit {
          animation: slideDownExit 0.38s cubic-bezier(0.32, 0.94, 0.6, 1) forwards;
        }

        @keyframes customScaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-custom-scale-up {
          animation: customScaleUp 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes customScaleDownExit {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to { opacity: 0; transform: scale(0.95) translateY(12px); }
        }
        .animate-custom-scale-down-exit {
          animation: customScaleDownExit 0.28s cubic-bezier(0.32, 0.94, 0.6, 1) forwards;
        }

        @keyframes radix-accordion-slide-down {
          from { height: 0; opacity: 0; }
          to { height: var(--radix-accordion-content-height); opacity: 1; }
        }
        @keyframes radix-accordion-slide-up {
          from { height: var(--radix-accordion-content-height); opacity: 1; }
          to { height: 0; opacity: 0; }
        }
        .overflow-hidden[data-state="open"] {
          animation: radix-accordion-slide-down 0.28s cubic-bezier(0.87, 0, 0.13, 1) forwards;
        }
        .overflow-hidden[data-state="closed"] {
          animation: radix-accordion-slide-up 0.22s cubic-bezier(0.87, 0, 0.13, 1) forwards;
        }
      ` }} />

      <div className="w-full bg-white py-4 md:py-6 px-4 border-b border-slate-50 relative z-40">
        <Container>
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programs, institutes or courses..."
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all shadow-xs"
              />
            </div>

            <button
              type="button"
              onClick={handleOpenFilters}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors shadow-xs cursor-pointer focus:outline-none"
              aria-label="Filter courses"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
            </button>
          </form>
        </Container>
      </div>

      {/* ── TOP SLIDE-DOWN DRAWER FOR FILTERS ── */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center">
          {/* Backdrop Blur Layer */}
          <div
            onClick={handleCloseFilters}
            className={`absolute inset-0 bg-slate-950/70 ${isFilterClosing ? "animate-fade-out" : "animate-fade-in"}`}
          />

          {/* Drawer Body (Slides down from top) */}
          <div className={`relative w-full bg-[#102441] border-b border-white/10 text-white rounded-b-3xl shadow-2xl p-6 md:p-8 z-10 max-h-[85vh] overflow-y-auto text-left ${isFilterClosing ? "animate-slide-up-exit" : "animate-slide-down"}`}>
            <Container className="max-w-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-wide">
                    Filter Programs
                  </h3>
                  <p className="text-[11px] text-white/50 mt-0.5">Narrow down programs matching your interests</p>
                </div>
                <button
                  onClick={handleCloseFilters}
                  className="text-white/60 hover:text-white cursor-pointer focus:outline-none transition-colors p-1.5 rounded-full hover:bg-white/5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter Options */}
              <div className="space-y-6">
                {/* 1. Category */}
                <div className="space-y-2">
                  <span className="text-[#EEC471] text-xs font-bold uppercase tracking-wider block">Course Category:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "all", label: "All Categories" },
                      { id: "management", label: "Management & MBA" },
                      { id: "data-science", label: "Data Science & AI" },
                      { id: "technology", label: "Technology & Coding" },
                      { id: "finance", label: "Finance & Commerce" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`cursor-pointer text-xs font-semibold px-3.5 py-2 rounded-lg transition-all ${selectedCategory === cat.id
                          ? "bg-[#EEC471] text-[#102441] font-bold"
                          : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Partner Type */}
                <div className="space-y-2">
                  <span className="text-[#EEC471] text-xs font-bold uppercase tracking-wider block">Institute Type:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "all", label: "All Partners" },
                      { id: "iims", label: "Indian Institutes of Management (IIMs)" },
                      { id: "iits", label: "Indian Institutes of Technology (IITs)" },
                      { id: "global", label: "Global B-Schools" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setSelectedType(t.id)}
                        className={`cursor-pointer text-xs font-semibold px-3.5 py-2 rounded-lg transition-all ${selectedType === t.id
                          ? "bg-[#EEC471] text-[#102441] font-bold"
                          : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Duration */}
                <div className="space-y-2">
                  <span className="text-[#EEC471] text-xs font-bold uppercase tracking-wider block">Program Duration:</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "all", label: "All Durations" },
                      { id: "short", label: "Short Term (< 6 Months)" },
                      { id: "medium", label: "Medium Term (6 - 12 Months)" },
                      { id: "long", label: "Long Term (12+ Months)" },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setSelectedDuration(d.id)}
                        className={`cursor-pointer text-xs font-semibold px-3.5 py-2 rounded-lg transition-all ${selectedDuration === d.id
                          ? "bg-[#EEC471] text-[#102441] font-bold"
                          : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-6 mt-8">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="cursor-pointer text-xs font-bold text-white/60 hover:text-white border border-white/10 bg-transparent px-5 py-2.5 rounded-xl hover:bg-white/5 transition-colors"
                >
                  Reset Filters
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="cursor-pointer text-xs font-bold bg-[#EEC471] text-[#102441] px-6 py-2.5 rounded-xl hover:scale-[1.01] transition-transform shadow-md"
                >
                  Apply Filters
                </button>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}

// 2. Your Learning Journey Component (Rendered 100% dynamically via MinIO S3 media icons / API props)
export function LearningJourney({ categories = [], steps = [] }) {
  // Find Learning Journey Parent Category dynamically from CMS/DB
  const journeyParent = (categories || []).find((c) => c.slug === "learning-journey");

  // Find step children dynamically from categories prop
  const stepsFromApi = (categories || []).filter(
    (c) => journeyParent && String(c.parentId) === String(journeyParent._id)
  ).sort((a, b) => (a.order || 0) - (b.order || 0));

  const colors = [
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-amber-500 to-orange-600",
    "from-purple-500 to-pink-600",
  ];

  const defaultMinioSteps = [
    {
      number: "1",
      title: "Explore",
      description: "Discover programs that fit your career goals",
      iconUrl: "http://172.236.183.64:9000/images/2026/07/23/469f571d39ddac029198cbf8f7678239.svg",
      color: "from-blue-500 to-indigo-600",
    },
    {
      number: "2",
      title: "Learn",
      description: "Join live classes & acquire modern skills",
      iconUrl: "http://172.236.183.64:9000/images/2026/07/23/d50bb8f6303fc62bd45d385606b18ea7.svg",
      color: "from-emerald-500 to-teal-600",
    },
    {
      number: "3",
      title: "Certify",
      description: "Earn globally recognized certifications",
      iconUrl: "http://172.236.183.64:9000/images/2026/07/23/2b3f5e6cbbf51a580da97fe905dedf82.svg",
      color: "from-amber-500 to-orange-600",
    },
    {
      number: "4",
      title: "Succeed",
      description: "Get placed & grow your career trajectory",
      iconUrl: "http://172.236.183.64:9000/images/2026/07/23/aa1a6f63d0654b8e608dac489054713e.svg",
      color: "from-purple-500 to-pink-600",
    },
  ];

  const stepsToRender = steps.length > 0
    ? steps
    : stepsFromApi.length > 0
      ? stepsFromApi.map((step, idx) => ({
        number: String(step.order || idx + 1),
        title: step.name || step.label,
        description: step.title || step.description,
        iconUrl: step.logoUrl || step.logoSrc || step.logo || step.imageSrc || step.image,
        color: colors[idx % colors.length],
      }))
      : defaultMinioSteps;

  return (
    <section className="w-full bg-[#f8fafc] py-12 md:py-16 border-b border-slate-100">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#102441]">
            {journeyParent?.name || journeyParent?.title || "Your Learning Journey"}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {journeyParent?.description || "Step-by-step career acceleration designed for your dynamic upskilling needs"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 max-w-5xl mx-auto relative">
          {stepsToRender.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 group">
              <span className={`absolute -top-3 left-6 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs bg-linear-to-r ${step.color || colors[idx % colors.length]} shadow-xs`}>
                {step.number || idx + 1}
              </span>

              <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform mb-4 mt-1 p-2.5 overflow-hidden">
                <SmartLogoAvatar
                  logoUrl={step.iconUrl || step.logoUrl || step.logo || step.icon}
                  altName={step.title}
                />
              </div>

              <h3 className="text-base font-bold text-[#102441] mb-1">
                {step.title}
              </h3>

              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Helper component to render circular avatar with image or gold wreath SVG fallback
function SmartLogoAvatar({ logoUrl, altName }) {
  const [imgError, setImgError] = useState(false);
  const iconUrl = getAssetPath(logoUrl, null);

  if (iconUrl && !imgError) {
    return (
      <img
        src={iconUrl}
        alt={altName || "Logo"}
        className="w-full h-full object-contain p-1"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs uppercase">
      {(altName || "U").charAt(0)}
    </div>
  );
}

// Helper component to render backend logo/icon or fallback letter badge
function PartnerLogoIcon({ partner }) {
  const [imgError, setImgError] = useState(false);

  let rawUrl = null;
  if (partner) {
    rawUrl = partner.logoUrl || partner.logoSrc || partner.logo || partner.imageSrc || partner.image;
    if (typeof rawUrl === "object" && rawUrl?.url) rawUrl = rawUrl.url;
  }
  const logoUrl = getAssetPath(rawUrl, null);

  if (logoUrl && !imgError) {
    return (
      <div className="w-full h-full relative shrink-0">
        <Image
          src={logoUrl}
          alt={partner?.name || "Partner Logo"}
          fill
          sizes="32px"
          unoptimized
          className="object-contain p-0.5"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs">
      {(partner?.name || "P").charAt(0)}
    </div>
  );
}

// 3. Partner Logos Section (Rendered 100% dynamically from backend API)
export function IimIitLogos({ categories = [], programs = [] }) {
  const router = useRouter();
  const [activePartner, setActivePartner] = useState(null);
  const [isPartnerClosing, setIsPartnerClosing] = useState(false);
  const [tempPartner, setTempPartner] = useState(null);
  const [partnerModalData, setPartnerModalData] = useState({ courses: [], universities: [] });

  // In-page expand toggles per parent block (by parent._id or slug)
  const [expandedBlocks, setExpandedBlocks] = useState({});

  const toggleExpandBlock = (blockId) => {
    setExpandedBlocks((prev) => ({
      ...prev,
      [blockId]: !prev[blockId],
    }));
  };

  // Find Root Showcase Category dynamically from DB (root category without parentId where showInMockup === true)
  const topRoot = (categories || []).find((c) => !c.parentId && c.showInMockup === true);
  const mainTitle = topRoot?.name || topRoot?.title;
  const mainDescription = topRoot?.description;

  // Find ALL Sub-Parent Showcase Categories dynamically via parentId relation (c.parentId === topRoot._id)
  const parentBlocks = (categories || [])
    .filter((c) => {
      if (!topRoot) return c.showInMockup === true && Boolean(c.parentId);
      return String(c.parentId) === String(topRoot._id);
    })
    .map((parent) => {
      const children = (categories || [])
        .filter((child) => child.parentId && String(child.parentId) === String(parent._id))
        .map((child) => ({
          ...child,
          name: child.name || child.label,
          code: child.code || child.shortCode || null,
          badge: child.badge || child.title || null,
        }));

      return {
        ...parent,
        title: parent.title || parent.name || parent.label,
        children,
      };
    })
    .filter((parent) => parent.children && parent.children.length > 0);

  const handleOpenPartner = (partner, type) => {
    const partnerWithType = { ...partner, type };
    setActivePartner(partnerWithType);
    setTempPartner(partnerWithType);
    setIsPartnerClosing(false);

    // Derive subchildren directly from SSR categories prop (0 extra API calls)
    const subchildren = (categories || []).filter(
      (c) => c.parentId && String(c.parentId) === String(partner._id)
    );

    // Filter courses for this partner instantly from SSR programs!
    const partnerPrograms = (programs || []).filter((p) => {
      if (!p) return false;
      const uName = (p.university?.name || p.name || "").toLowerCase();
      const pName = (partner.name || "").toLowerCase();
      const uSlug = (p.university?.slug || "").toLowerCase();
      const pSlug = (partner.slug || "").toLowerCase();

      const nameMatch = uName && pName && (uName.includes(pName) || pName.includes(uName));
      const slugMatch = uSlug && pSlug && (uSlug === pSlug);

      const catMatch = p.category && (String(p.category) === String(partner._id) || String(p.category.slug || p.category) === String(partner.slug));

      const catsMatch = Array.isArray(p.categories) && p.categories.some(
        (c) => String(c._id || c) === String(partner._id) || String(c.slug || c) === String(partner.slug)
      );

      return nameMatch || slugMatch || catMatch || catsMatch;
    });

    setPartnerModalData({
      children: (partner.children && partner.children.length > 0) ? partner.children : subchildren,
      courses: partnerPrograms,
      universities: partner.universities || [],
    });
  };

  const handleClosePartner = () => {
    setIsPartnerClosing(true);
    setTimeout(() => {
      setActivePartner(null);
      setTempPartner(null);
      setIsPartnerClosing(false);
    }, 380); // Matches the exit transition delay
  };

  const partnerToRender = activePartner || tempPartner;

  const accentBarColors = ["#EEC471", "#2563eb", "#10b981", "#9333ea", "#102441"];
  const [isMainExpanded, setIsMainExpanded] = useState(false);
  const [carouselApi, setCarouselApi] = useState(null);

  const allSubchildItems = parentBlocks.flatMap((block) =>
    block.children.map((child) => ({ ...child, blockSlug: block.slug }))
  );

  useEffect(() => {
    if (!carouselApi) return;
    let timerId = null;
    let intervalId = null;

    // Defer auto-scroll until browser main thread is idle (PageSpeed & Lighthouse 100/100 friendly)
    const startAutoScroll = () => {
      intervalId = setInterval(() => {
        if (!carouselApi) return;
        if (carouselApi.canScrollNext()) {
          carouselApi.scrollNext();
        } else {
          carouselApi.scrollTo(0);
        }
      }, 3500);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      timerId = window.requestIdleCallback(startAutoScroll, { timeout: 4000 });
    } else {
      timerId = setTimeout(startAutoScroll, 4000);
    }

    return () => {
      if (typeof window !== "undefined" && "cancelIdleCallback" in window && timerId) {
        window.cancelIdleCallback(timerId);
      } else {
        clearTimeout(timerId);
      }
      if (intervalId) clearInterval(intervalId);
    };
  }, [carouselApi]);

  return (
    <>
      {parentBlocks.length > 0 && (
        <section className="w-full bg-white py-8 md:py-12 border-b border-slate-100">
          <Container className="space-y-6">

            {/* ── STATE 1: INITIAL COLLAPSED CAROUSEL / SLIDER VIEW (SHADCN UI CAROUSEL) ── */}
            {!isMainExpanded ? (
              <div className="space-y-4">
                {/* Main Parent Header */}
                <div className="flex items-center justify-between mb-2 sm:mb-3 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-1 h-6 rounded-full inline-block shrink-0 bg-blue-500" />
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-xl font-semibold text-slate-900 tracking-tight leading-tight truncate">
                        {mainTitle}
                      </h2>
                      <p className="text-xs text-slate-500 truncate">
                        {mainDescription}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMainExpanded(true)}
                    className="text-xs font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1.5 bg-blue-50 px-2 py-1.5 rounded-full hover:bg-blue-100/80 transition-colors cursor-pointer shrink-0"
                  >
                    View All
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                {/* Shadcn UI Carousel Track (Ultra Compact 5-Card Mobile / 10-Card Desktop Layout) */}
                <div className="relative px-2 sm:px-8 py-1 max-w-6xl mx-auto">
                  <Carousel
                    setApi={setCarouselApi}
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full relative"
                  >
                    <CarouselContent className="-ml-1.5 sm:-ml-2.5 items-center">
                      {allSubchildItems.map((child, idx) => (
                        <CarouselItem
                          key={`${child._id || child.slug}-${idx}`}
                          className="pl-1.5 sm:pl-2.5 basis-1/4 min-[400px]:basis-1/5 sm:basis-1/6 md:basis-1/8 lg:basis-1/10"
                        >
                          <div
                            onClick={() => handleOpenPartner(child, child.blockSlug)}
                            className="w-full aspect-square bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl p-1 min-[360px]:p-1.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group shadow-2xs min-w-0 overflow-hidden"
                          >
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-0.5 sm:mb-1 shrink-0 p-0.5 group-hover:scale-105 transition-transform">
                              <PartnerLogoIcon partner={child} />
                            </div>
                            <Tooltip title={child.name} placement="top">
                              <h5 className="text-[8px] min-[360px]:text-[9px] sm:text-[10px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-[1.12] text-center w-full tracking-tighter sm:tracking-tight px-0.5 line-clamp-2 break-words">
                                {child.name}
                              </h5>
                            </Tooltip>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden sm:flex -left-4 top-1/2 -translate-y-1/2 border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-xs z-10" />
                    <CarouselNext className="hidden sm:flex -right-4 top-1/2 -translate-y-1/2 border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-xs z-10" />
                  </Carousel>
                </div>
              </div>
            ) : (
              /* ── STATE 2: EXPANDED VIEW - DIVIDED INTO SEPARATE SUB-PARENT CARDS WITH TITLES ── */
              <div className="space-y-6 animate-fade-in">
                {/* Main Header with Show Less Button */}
                <div className="flex items-center justify-between mb-2">
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight truncate">
                      {mainTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 truncate">
                      {mainDescription}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsMainExpanded(false)}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100/80 transition-colors cursor-pointer shrink-0"
                  >
                    Show Less
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3.5 h-3.5 rotate-180"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                {/* Separate Sub-Parent Cards stacked vertically */}
                {parentBlocks.map((block, bIdx) => {
                  const accentColor = accentBarColors[bIdx % accentBarColors.length];

                  return (
                    <div
                      key={block._id || block.slug}
                      className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-2xs hover:shadow-xs transition-all duration-200"
                    >
                      {/* Sub-Parent Title Header */}
                      <div className="flex items-center justify-between mb-3 gap-2">
                        <div className="flex items-center gap-2.5 truncate">
                          <span
                            className="w-1.5 h-5 rounded-full inline-block shrink-0"
                            style={{ backgroundColor: accentColor }}
                          />
                          <Tooltip title={block.title} placement="top">
                            <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight truncate">
                              {block.title}
                            </h3>
                          </Tooltip>
                        </div>
                      </div>

                      {/* Sub-Parent Cards Grid (Ultra Compact 5-Card Mobile / 10-Card Desktop) */}
                      <div className="grid grid-cols-4 min-[400px]:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5 sm:gap-2">
                        {block.children.map((child, idx) => (
                          <div
                            key={child._id || idx}
                            onClick={() => handleOpenPartner(child, block.slug)}
                            className="w-full aspect-square bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl p-1 min-[360px]:p-1.5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group shadow-2xs min-w-0 overflow-hidden"
                          >
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-0.5 sm:mb-1 shrink-0 p-0.5 group-hover:scale-105 transition-transform">
                              <PartnerLogoIcon partner={child} />
                            </div>
                            <Tooltip title={child.name} placement="top">
                              <h5 className="text-[8px] min-[360px]:text-[9px] sm:text-[10px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-[1.12] text-center w-full tracking-tighter sm:tracking-tight px-0.5 line-clamp-2 break-words">
                                {child.name}
                              </h5>
                            </Tooltip>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </Container>
        </section>
      )}

      {/* ── POPUP DIV OVERLAY MODAL FOR PARTNERS (DARK NAVY THEME) ── */}
      {partnerToRender !== null && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur Layer */}
          <div
            onClick={handleClosePartner}
            className={`fixed inset-0 bg-slate-950/80 backdrop-blur-md ${isPartnerClosing ? "animate-fade-out" : "animate-fade-in"}`}
          />

          {/* Modal Container */}
          <div
            className={`relative w-full max-w-4xl bg-[#0e213b] border border-[#1e385c] text-white rounded-[24px] shadow-2xl p-6 sm:p-7 z-10 max-h-[88vh] flex flex-col ${isPartnerClosing ? "animate-custom-scale-down-exit" : "animate-custom-scale-up"
              }`}
          >
            {(() => {
              const isIim = partnerToRender.type === "iim" || (partnerToRender.slug || "").includes("iim");

              const accentText = isIim ? "text-[#EEC471]" : "text-blue-400";
              const accentBorder = isIim ? "border-[#EEC471]/35" : "border-blue-400/35";

              const showHeaderBadge = partnerToRender.badge &&
                partnerToRender.badge.toLowerCase() !== (partnerToRender.name || "").toLowerCase();

              // Build list of items to render
              const displayItems = [];

              if (partnerToRender.children && partnerToRender.children.length > 0) {
                partnerToRender.children.forEach((child) => {
                  const uName = child.label || child.name || child.title;
                  const logo = child.logoUrl || child.logoSrc || child.logo || child.image;
                  displayItems.push({
                    id: child._id || child.slug,
                    name: uName,
                    logo: logo,
                    href: `/courses?category=${partnerToRender.slug}&search=${encodeURIComponent(uName)}`,
                  });
                });
              }

              if (partnerModalData.universities && partnerModalData.universities.length > 0) {
                partnerModalData.universities.forEach((uni) => {
                  const uName = uni.university?.name || uni.name || "Partner University";
                  const exists = displayItems.some((it) => it.name.toLowerCase() === uName.toLowerCase());
                  if (!exists) {
                    const logo = uni.university?.logoSrc?.url || uni.logoSrc?.url || uni.logoUrl || uni.logo;
                    displayItems.push({
                      id: uni._id,
                      name: uName,
                      logo: logo,
                      href: `/courses?category=${partnerToRender.slug}&university=${encodeURIComponent(uName)}`,
                    });
                  }
                });
              }

              if (partnerModalData.courses && partnerModalData.courses.length > 0) {
                partnerModalData.courses.forEach((p) => {
                  const mainName = p.title || p.name || p.university?.name;
                  const logo = p.university?.logoSrc?.url || p.logoSrc?.url || p.image?.url;
                  const exists = displayItems.some((it) => it.name.toLowerCase() === mainName.toLowerCase());
                  if (!exists) {
                    displayItems.push({
                      id: p._id || p.slug,
                      name: mainName,
                      logo: logo,
                      href: `/courses?category=${partnerToRender.slug}&search=${encodeURIComponent(p.title || p.name)}`,
                    });
                  }
                });
              }

              const hasItems = displayItems.length > 0;

              return (
                <div className="flex flex-col text-left min-h-0 flex-1">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between border-b border-[#1c365d] pb-4 mb-5 shrink-0 gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-12 h-12 rounded-full bg-[#162e4d] flex items-center justify-center border ${accentBorder} overflow-hidden p-1 shrink-0 shadow-inner`}>
                        <PartnerLogoIcon partner={partnerToRender} type={partnerToRender.type} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-white leading-tight tracking-tight truncate">
                          {partnerToRender.name}
                        </h3>
                        {showHeaderBadge && (
                          <span className={`text-xs ${accentText} font-semibold block mt-0.5 truncate`}>
                            {partnerToRender.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={handleClosePartner}
                      className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
                      aria-label="Close modal"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Modal Body - Clean Grid of Circular Logo + Title Name Only */}
                  <div className="flex-1 overflow-y-auto max-h-[64vh] overscroll-contain pr-1.5 space-y-6 [scrollbar-width:thin] [scrollbar-color:#213f68_transparent]">
                    {isPartnerLoading && !hasItems ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <div key={n} className="bg-[#162e4e] border border-[#213e66] p-4 rounded-2xl flex flex-col items-center text-center animate-pulse space-y-3">
                            <div className="w-16 h-16 rounded-full bg-white/10 shrink-0" />
                            <div className="h-3 bg-white/15 rounded w-3/4" />
                          </div>
                        ))}
                      </div>
                    ) : hasItems ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-1">
                        {displayItems.map((item) => (
                          <Link
                            key={item.id}
                            href={item.href}
                            className="bg-[#162e4e] hover:bg-[#1a375d] border border-[#213e66] hover:border-[#EEC471]/50 p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-lg active:scale-95"
                          >
                            {/* Circle Logo Avatar */}
                            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-white p-3 flex items-center justify-center overflow-hidden mb-3.5 shadow-md group-hover:scale-105 transition-transform shrink-0 relative">
                              <SmartLogoAvatar logoUrl={item.logo} altName={item.name} />
                            </div>

                            {/* Title Name ONLY */}
                            <Tooltip title={item.name} placement="top">
                              <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#EEC471] transition-colors leading-tight text-center truncate max-w-full">
                                {item.name}
                              </h5>
                            </Tooltip>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-[#162e4e] border border-[#213e66] p-8 rounded-2xl text-center flex flex-col items-center justify-center space-y-3 my-4">
                        <p className="text-xs sm:text-sm text-white/80 font-medium">
                          🎓 No programs available right now for {partnerToRender.name}.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}

// 4. Sticky Mobile Bottom Navigation Bar (Visible only on mobile screens)
export function MobileBottomNav() {
  const router = useRouter();
  const navItems = [
    {
      label: "Home",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
      active: true,
    },
    {
      label: "Programs",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      active: false,
    },
    {
      label: "Institutes",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
      ),
      active: false,
    },
    {
      label: "Counselling",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        </svg>
      ),
      active: false,
    },
    {
      label: "Profile",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      active: false,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999] bg-[#102441] border-t border-white/10 flex items-center justify-around py-2.5 px-2 text-white/70 shadow-2xl lg:hidden">
      {navItems.map((item, idx) => (
        <button
          key={idx}
          className={`flex flex-col items-center justify-center gap-0.5 cursor-pointer focus:outline-none transition-colors duration-150 ${item.active ? "text-[#EEC471]" : "hover:text-white"
            }`}
          onClick={() => {
            if (item.label === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
            else if (item.label === "Counselling") document.querySelector('button[class*="bg-linear-to-r"]')?.click();
            else router.push(`/${item.label.toLowerCase()}`);
          }}
        >
          {item.icon}
          <span className="text-[9px] font-bold tracking-wide">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}