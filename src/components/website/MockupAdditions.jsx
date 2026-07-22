"use client";
import { Container } from "@/components/ui/container";
import React, { useState } from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import { Tooltip } from "antd";
import { getWebsiteCoursesFilter, getUniversities } from "@/services/api";

// 1. Search Bar Component (With smooth enter & exit top slide-down filter drawer)
export function SearchBar() {
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
    window.location.href = `/courses?search=${encodeURIComponent(searchTerm)}`;
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
      window.location.href = `/courses${queryString}`;
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

// 2. Your Learning Journey Component
export function LearningJourney() {
  const steps = [
    {
      number: "1",
      title: "Explore",
      description: "Discover programs that fit your career goals",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-600",
    },
    {
      number: "2",
      title: "Learn",
      description: "Join live classes & acquire modern skills",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84a50.58 50.58 0 0 0-2.657.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M12 13.489v3.692m-5.462-6.52c.074-.5.194-.997.358-1.487m10.208 1.487a12.096 12.096 0 0 1-.358-1.487" />
        </svg>
      ),
      color: "from-emerald-500 to-teal-600",
    },
    {
      number: "3",
      title: "Certify",
      description: "Earn globally recognized certifications",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 3.068 1.593 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      color: "from-amber-500 to-orange-600",
    },
    {
      number: "4",
      title: "Succeed",
      description: "Get placed & grow your career trajectory",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.61 3.89a14.98 14.98 0 00-6.16 12.12A14.98 14.98 0 009.61 19.89l3.52-3.52" />
        </svg>
      ),
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-12 md:py-16 border-b border-slate-100">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-10 px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#102441]">
            Your Learning Journey
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Step-by-step career acceleration designed for your dynamic upskilling needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 max-w-5xl mx-auto relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 group">
              <span className={`absolute -top-3 left-6 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs bg-linear-to-r ${step.color} shadow-xs`}>
                {step.number}
              </span>

              <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform mb-4 mt-1">
                {step.icon}
              </div>

              <h3 className="text-base font-bold text-[#102441] mb-1">
                {step.title}
              </h3>

              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                {step.description}
              </p>

              {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 translate-x-1/2 z-10 text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Helper component to render backend logo/icon or fallback code badge
function PartnerLogoIcon({ partner, type }) {
  const [imgError, setImgError] = useState(false);

  let rawUrl = null;
  if (partner) {
    rawUrl = partner.logoUrl || partner.logoSrc || partner.logo || partner.imageSrc || partner.image;
  }
  const logoUrl = getAssetPath(rawUrl, null);

  const isIim = type === "iim";
  const textClass = isIim ? "text-[#102441] font-serif" : "text-blue-700 font-sans";

  if (logoUrl && !imgError) {
    return (
      <img
        src={logoUrl}
        alt={partner.name || "Partner Logo"}
        className="w-8 h-8 object-contain rounded-full"
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <span className={`text-xs font-bold ${textClass}`}>
      {partner?.code || "UNI"}
    </span>
  );
}

// 3. Partner Logos Section (Rendered 100% dynamically for ALL Parent & Sub-Categories from backend API)
export function IimIitLogos({ categories = [] }) {
  const [activePartner, setActivePartner] = useState(null);
  const [isPartnerClosing, setIsPartnerClosing] = useState(false);
  const [tempPartner, setTempPartner] = useState(null);
  const [partnerModalData, setPartnerModalData] = useState({ courses: [], universities: [] });
  const [isPartnerLoading, setIsPartnerLoading] = useState(false);

  // In-page expand toggles per parent block (by parent._id or slug)
  const [expandedBlocks, setExpandedBlocks] = useState({});

  const toggleExpandBlock = (blockId) => {
    setExpandedBlocks((prev) => ({
      ...prev,
      [blockId]: !prev[blockId],
    }));
  };

  // Helper to generate initials code (e.g. "IIM Ahmedabad" -> "IIMA", "IIT Delhi" -> "IITD")
  const getCode = (name) => {
    if (!name) return "UNI";
    const clean = name.replace(/[^a-zA-Z\s]/g, "");
    const parts = clean.split(/\s+/);
    if (parts.length >= 2) {
      const first = parts[0].toUpperCase();
      const second = parts[1];
      if (first === "IIM" || first === "IIT" || first === "MIT" || first === "LBS") {
        return first + (second ? second[0].toUpperCase() : "");
      }
    }
    return parts.map((p) => p[0]).join("").toUpperCase().substring(0, 4);
  };

  // Find ALL Parent Categories from API that have children linked to them
  const parentBlocks = (categories || [])
    .filter((c) => !c.parentId && c.slug !== "all")
    .map((parent) => {
      const children = (categories || [])
        .filter((child) => child.parentId && String(child.parentId) === String(parent._id))
        .map((child) => ({
          ...child,
          name: child.label || child.name,
          code: getCode(child.label || child.name),
          badge: child.title || "Executive Program",
        }));

      return {
        ...parent,
        title: parent.title || parent.label || parent.name,
        children,
      };
    })
    .filter((parent) => parent.children.length > 0);

  const handleOpenPartner = async (partner, type) => {
    const partnerWithType = { ...partner, type };
    setActivePartner(partnerWithType);
    setTempPartner(partnerWithType);
    setIsPartnerClosing(false);
    setIsPartnerLoading(true);
    setPartnerModalData({ courses: [], universities: [] });

    try {
      const slug = partner.slug || partner.name;
      const [coursesRes, unisRes] = await Promise.all([
        getWebsiteCoursesFilter({ category: slug, limit: 10 }),
        getUniversities({ category: slug, limit: 6 }),
      ]);

      setPartnerModalData({
        courses: coursesRes?.programs || [],
        universities: Array.isArray(unisRes) ? unisRes : [],
      });
    } catch (err) {
      console.error("❌ Error loading partner details:", err);
    } finally {
      setIsPartnerLoading(false);
    }
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

  // Accent bar colors for different parent blocks (gold, blue, emerald, purple, dark navy)
  const accentBarColors = ["#EEC471", "#2563eb", "#10b981", "#9333ea", "#102441"];

  return (
    <>
      {parentBlocks.length > 0 && (
        <section className="w-full bg-white py-12 md:py-16 border-b border-slate-100">
          <Container className="space-y-12">

            {parentBlocks.map((block, bIdx) => {
              const blockId = String(block._id || block.slug);
              const isExpanded = !!expandedBlocks[blockId];
              const visibleChildren = isExpanded ? block.children : block.children.slice(0, 5);
              const accentColor = accentBarColors[bIdx % accentBarColors.length];

              return (
                <div key={blockId} className="space-y-6">
                  <div className="flex items-center justify-between px-4 max-w-5xl mx-auto gap-2">
                    <div className="flex items-center gap-3 truncate max-w-[70%] sm:max-w-none">
                      <span
                        className="w-1.5 h-6 rounded-full inline-block shrink-0"
                        style={{ backgroundColor: accentColor }}
                      />
                      <Tooltip title={block.title} placement="top">
                        <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight truncate">
                          {block.title}
                        </h3>
                      </Tooltip>
                    </div>

                    {block.children.length > 5 && (
                      <button
                        onClick={() => toggleExpandBlock(blockId)}
                        className="text-[11px] sm:text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap bg-blue-50 px-2.5 py-1 rounded-full hover:bg-blue-100/70"
                      >
                        {isExpanded ? "Show Less" : "View All"}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-nowrap overflow-x-auto no-scrollbar sm:grid sm:grid-cols-5 gap-3 sm:gap-4 px-4 max-w-5xl mx-auto pb-2 scroll-smooth">
                    {visibleChildren.map((child, idx) => (
                      <div
                        key={child._id || idx}
                        onClick={() => handleOpenPartner(child, block.slug)}
                        className="w-[120px] sm:w-auto shrink-0 py-1 px-1 flex flex-col items-center text-center transition-all duration-200 cursor-pointer active:scale-95 group"
                      >
                        <div className="w-12 h-12 rounded-full bg-slate-100/80 flex items-center justify-center mb-2 overflow-hidden p-1 group-hover:scale-105 transition-transform">
                          <PartnerLogoIcon partner={child} type={block.slug} />
                        </div>
                        <Tooltip title={child.name} placement="top">
                          <span className="text-xs md:text-sm font-bold text-slate-900 leading-tight block group-hover:text-blue-600 transition-colors truncate max-w-full">
                            {child.name}
                          </span>
                        </Tooltip>
                        <Tooltip title={child.badge} placement="bottom">
                          <span className="text-[10px] md:text-xs text-slate-500 font-medium mt-1 truncate max-w-full block">
                            {child.badge}
                          </span>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

          </Container>
        </section>
      )}

      {/* ── CENTERED POPUP MODAL FOR PARTNERS (CLEAN CIRCULAR LOGO + TITLE ONLY) ── */}
      {partnerToRender !== null && (() => {
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
            const logo = getAssetPath(child.logoUrl || child.logoSrc || child.logo || child.image, "/assets/images/iim-logo.jpg");
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
              const logo = getAssetPath(uni.university?.logoSrc?.url || uni.logoSrc?.url, "/assets/images/iim-logo.jpg");
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
            const mainName = p.university?.name || p.title;
            const logo = getAssetPath(p.university?.logoSrc?.url || p.logoSrc?.url || p.image?.url, "/assets/images/iim-logo.jpg");
            const exists = displayItems.some((it) => it.name.toLowerCase() === mainName.toLowerCase());
            if (!exists) {
              displayItems.push({
                id: p._id || p.slug,
                name: mainName,
                logo: logo,
                href: `/courses?category=${partnerToRender.slug}&search=${encodeURIComponent(p.title)}`,
              });
            }
          });
        }

        const hasItems = displayItems.length > 0;

        return (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4">
            <div
              onClick={handleClosePartner}
              className={`absolute inset-0 bg-slate-950/75 ${isPartnerClosing ? "animate-fade-out" : "animate-fade-in"}`}
            />
            <div className={`relative w-full max-w-2xl bg-[#102441] border border-white/10 text-white rounded-2xl shadow-2xl p-4 sm:p-6 z-10 max-h-[85vh] overflow-hidden text-left flex flex-col ${isPartnerClosing ? "animate-custom-scale-down-exit" : "animate-custom-scale-up"}`}>
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full bg-white/10 flex items-center justify-center border ${accentBorder} overflow-hidden p-1 shrink-0`}>
                    <PartnerLogoIcon partner={partnerToRender} type={partnerToRender.type} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                      {partnerToRender.name}
                    </h3>
                    {showHeaderBadge && (
                      <span className={`text-[10px] sm:text-xs ${accentText} font-semibold block mt-0.5`}>
                        {partnerToRender.badge}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleClosePartner}
                  className="text-white/60 hover:text-white cursor-pointer focus:outline-none transition-colors p-1.5 rounded-full hover:bg-white/5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body - Clean Grid of Circular Logo + Title Name Only */}
              <div className="flex-1 overflow-y-auto pr-1">
                {isPartnerLoading && !hasItems ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-4">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div key={n} className="flex flex-col items-center text-center animate-pulse space-y-2">
                        <div className="w-16 h-16 rounded-full bg-white/10 shrink-0" />
                        <div className="h-3 bg-white/15 rounded w-3/4" />
                      </div>
                    ))}
                  </div>
                ) : hasItems ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 p-2 sm:p-4">
                    {displayItems.map((item) => (
                      <a
                        key={item.id}
                        href={item.href}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-200 group cursor-pointer shadow-xs hover:shadow-md active:scale-95"
                      >
                        {/* Circle Logo Avatar */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-3 flex items-center justify-center overflow-hidden mb-3 shadow-md group-hover:scale-105 transition-transform shrink-0">
                          <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                        </div>

                        {/* Title Name ONLY */}
                        <Tooltip title={item.name} placement="top">
                          <h5 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#EEC471] transition-colors leading-tight text-center truncate max-w-full">
                            {item.name}
                          </h5>
                        </Tooltip>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center text-xs text-white/70">
                    🎓 No programs available right now for {partnerToRender.name}.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}

// 4. Sticky Mobile Bottom Navigation Bar (Visible only on mobile screens)
export function MobileBottomNav() {
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
            else window.location.href = `/${item.label.toLowerCase()}`;
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