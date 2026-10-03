"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Clean, Ultra-Compact & Modular Approvals Section
 * 100% JSON data-driven with exact UI preservation.
 */
export default function LandingApprovals({
  approvals = [],
  keyHighlights = [],
  universityName,
  brand = {},
  title = "Recognition and Approvals",
  bannerBg,
  showTags = false,
}) {
  if (!approvals || approvals.length === 0) return null;

  const layout = brand?.approvalsLayout || brand?.slug;
  const activeUni = universityName || brand?.name || "University Online";
  const activeTitle = brand?.approvalsTitle || title;
  const subtitle = brand?.approvalsSubtitle || brand?.approvalsDescription || null;

  if (layout === "table" || brand?.slug === "galgotias") {
    return <GalgotiasApprovalsTable keyHighlights={keyHighlights} brand={brand} />;
  }
  if (layout === "lpu-dark" || brand?.slug === "lpu" || brand?.shortName === "LPU") {
    return <LpuApprovals approvals={approvals} />;
  }
  if (layout === "split" || brand?.slug === "shoolini") {
    return <ShooliniSplitApprovals approvals={approvals} activeUniversity={activeUni} subtitle={subtitle} brand={brand} />;
  }
  if (layout === "vgu" || layout === "vgu-badges" || brand?.slug === "vgu") {
    return <VguPillApprovals approvals={approvals} brand={brand} />;
  }
  if (layout === "smu-carousel" || brand?.slug === "smu") {
    return (
      <SmuApprovalsCarousel
        approvals={approvals}
        title={brand?.approvalsTitle || `${activeUni} Rankings & Accreditations`}
        subtitle={subtitle}
        brand={brand}
      />
    );
  }
  if (layout === "slider" || brand?.slug === "manipal") {
    return <ApprovalsSlider approvals={approvals} activeUniversity={activeUni} activeTitle={activeTitle} subtitle={subtitle} brand={brand} showTags={showTags} />;
  }

  return <ClassicApprovalsGrid approvals={approvals} activeUniversity={activeUni} activeTitle={activeTitle} bannerBg={bannerBg} brand={brand} showTags={showTags} />;
}

// -------------------------------------------------------------
// Layout: Galgotias Dual Tables
// -------------------------------------------------------------
function GalgotiasApprovalsTable({ keyHighlights, brand }) {
  const tableData = [
    { logo: "/assets/images/approvals/ugc_approval.png", title: "UGC Approval for Online Degrees and Learning Platform (UGC)", about: "Galgotias University is approved by the University Grants Commission (UGC), ensuring its programs meet national education standards." },
    { logo: "/assets/images/approvals/naac_a_plus.png", title: "National Assessment and Accreditation Council (NAAC A+)", about: "The university has received an A+ grade from the National Assessment and Accreditation Council (NAAC), highlighting its dedication to high-quality education." },
    { logo: "/assets/galgotias/aiu_logo.webp", title: "Association of Indian Universities", about: "Galgotias University is a member of the Association of Indian Universities (AIU), which supports academic collaboration and helps maintain equivalence of degrees across India." },
  ];

  const highlights = keyHighlights?.length > 0 ? keyHighlights : brand?.keyHighlights || [
    { feature: "University", details: "Galgotias Online University" },
    { feature: "Accreditation", details: "NAAC A+" },
    { feature: "Approval", details: "UGC-Entitled" },
    { feature: "Location", details: "Greater Noida, Uttar Pradesh, India" },
    { feature: "Establishment Year", details: "2011" },
    { feature: "Program Types", details: "Postgraduate Online Degree Programs" },
    { feature: "Focus Areas", details: "Industry-Oriented Education and Professional Development" },
    { feature: "Educational Expertise", details: "Over 10 Years" },
    { feature: "Learning Methodologies", details: "Innovative, Digital Learning Solutions for Flexibility" },
    { feature: "Growth Emphasis", details: "Growth-Oriented Learning for Career Progression" },
    { feature: "Learning Platform", details: "Convenient, Flexible Learning from Anywhere, Anytime" },
    { feature: "Support Services", details: "Expert Academic Guidance, Career Support, and Tech Help" },
    { feature: "Admission Process", details: "Online" },
    { feature: "Student Rating", details: "4.4/5 Stars" },
  ];

  return (
    <section id="approvals" className="pt-0 pb-10 sm:pb-14 bg-white">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28 space-y-10 sm:space-y-12">
        <div className="overflow-x-auto border border-slate-200 rounded-[6px] sm:rounded-[8px] shadow-xs">
          <table className="w-full border-collapse text-left min-w-[650px]">
            <thead>
              <tr className="bg-[#dff0fa] border-b border-slate-200">
                <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[14%] sm:w-[12%] border-r border-slate-200" />
                <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[36%] sm:w-[38%] border-r border-slate-200">Accreditations &amp; Approvals</th>
                <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[50%]">About</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 sm:px-6 align-middle border-r border-slate-200">
                    <div className="relative w-16 h-14 sm:w-20 sm:h-16 rounded-[4px] border border-slate-200 bg-white p-1.5 flex items-center justify-center shadow-xs mx-auto">
                      <Image src={row.logo} alt={row.title} width={65} height={52} className="object-contain max-h-full max-w-full" />
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 align-middle font-bold text-slate-900 text-[13.5px] sm:text-[14.5px] leading-snug border-r border-slate-200">{row.title}</td>
                  <td className="py-4 px-4 sm:px-6 align-middle text-slate-700 text-[13px] sm:text-[14px] leading-relaxed font-normal">{row.about}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-4 sm:pt-8">
          <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-black text-[#002b49] tracking-tight leading-tight m-0 mb-4 sm:mb-6">
            Key Highlights of Galgotias University Online
          </h2>
          <div className="overflow-x-auto border border-slate-200 rounded-[6px] sm:rounded-[8px] shadow-xs mt-3 sm:mt-4">
            <table className="w-full border-collapse text-left min-w-[600px]">
              <thead>
                <tr className="bg-[#dff0fa] border-b border-slate-200">
                  <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[30%] sm:w-[28%] border-r border-slate-200">Feature</th>
                  <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {highlights.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 align-middle font-bold text-slate-900 text-[13.5px] sm:text-[14.5px] border-r border-slate-200">{row.feature}</td>
                    <td className="py-3.5 px-4 sm:px-6 align-middle text-slate-700 text-[13px] sm:text-[14px] font-normal leading-relaxed">{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Layout: LPU Dark Badges
// -------------------------------------------------------------
function LpuApprovals({ approvals }) {
  return (
    <section id="approval" className="w-full bg-[#4d4d4d] text-white py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-[1360px] mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold tracking-tight m-0 mb-8 sm:mb-12">
          <span className="text-[#f58220]">LPU University </span>
          <span className="text-white">Accreditations & Approvals</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-12">
          {approvals.map((appr, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[130px] sm:min-w-[150px]">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center p-3 shadow-md">
                <Image src={appr.image} alt={appr.title || appr.text || "Approval"} fill className="object-contain p-2.5" sizes="128px" />
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm sm:text-base font-extrabold text-white leading-tight m-0">{appr.title || appr.text}</p>
                {appr.status && <p className="text-xs font-semibold text-slate-300 mt-0.5 m-0 uppercase tracking-wider">{appr.status}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Layout: Shoolini Split Box & Gradient Grid
// -------------------------------------------------------------
function ShooliniSplitApprovals({ approvals, activeUniversity, subtitle, brand }) {
  return (
    <section id="approval" className="w-full select-none p-0 overflow-hidden bg-[#010d2a]">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 bg-[#010d2a] text-white flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:pl-20 py-8 sm:py-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight m-0 mb-3 text-white">
            <span
              className="font-extrabold inline"
              style={{
                background: brand?.themeGradient || "linear-gradient(to right, #fd202a, #ff4be5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {activeUniversity}{" "}
            </span>
            <span className="text-white font-bold">Recognitions & Accreditations</span>
          </h2>
          {subtitle && <p className="text-[13px] sm:text-[14px] text-[#ecf0f1] font-normal leading-relaxed m-0">{subtitle}</p>}
        </div>

        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 xl:pr-16 flex items-center" style={{ background: "linear-gradient(to right, #fce8e8 0%, #fdf3f3 40%, #ffffff 100%)" }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 w-full">
            {approvals.map((item, idx) => (
              <div key={idx} className="flex flex-col items-start text-left">
                <div className="relative w-24 sm:w-28 h-12 sm:h-14 mb-2">
                  <Image src={item.image} alt={item.tag || item.title || "approval"} fill className="object-contain object-left" sizes="120px" />
                </div>
                <div className="text-[13px] sm:text-[13.5px] leading-tight">
                  <span className="font-extrabold text-[#fd202a] block">{item.tag || item.title}</span>
                  <span className="font-bold text-[#000000] block mt-0.5">{item.subtext || item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Layout: VGU 2-Column Pill Badges
// -------------------------------------------------------------
function VguPillApprovals({ approvals, brand = {} }) {
  const cfg = brand.approvalsConfig || {};
  const containerClass =
    cfg.containerClassName ||
    brand.approvalsContainerClassName ||
    "max-w-[1340px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32";
  const sectionTitle = brand.approvalsTitle || `${brand.name || "Vivekananda Global University"} Online Accreditation & Approval`;
  const sectionDescription =
    brand.approvalsDescription ||
    "Vivekananda Global University Online Courses are UGC-recognised and have top accreditations and approvals from the country's recognised statutory bodies.";

  const titleClass =
    cfg.titleClassName ||
    "text-[22px] sm:text-[26px] lg:text-[28px] font-normal leading-tight tracking-tight m-0";
  const buttonBg = cfg.buttonBg || cfg.buttonBackground || brand.primaryColor || "#811811";
  const buttonTextColor = cfg.buttonTextColor || cfg.buttonColor || "#ffffff";
  const buttonClass =
    cfg.buttonClassName ||
    "inline-flex items-center justify-center gap-2 hover:opacity-90 font-bold text-[13.5px] sm:text-[14px] px-6 py-2.5 rounded-[6px] shadow-xs active:scale-95 transition-all cursor-pointer border-none";

  return (
    <section id="approvals" className="w-full py-10 sm:py-14 bg-white border-b border-slate-200 select-none">
      <div className={containerClass}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 text-center sm:text-left">
            <h2
              className={titleClass}
              style={{ color: cfg.titleColor || brand.primaryColor || "#811811", ...cfg.titleStyle }}
            >
              {sectionTitle}
            </h2>
            <p className="mt-3.5 mb-6 text-[12.5px] sm:text-[13.5px] text-slate-700 leading-relaxed font-normal">{sectionDescription}</p>
            <button
              type="button"
              onClick={() => {
                const heroEl = document.getElementById("hero") || document.getElementById("banner");
                heroEl?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ backgroundColor: buttonBg, color: buttonTextColor, ...cfg.buttonStyle }}
              className={buttonClass}
            >
              <span>{cfg.buttonText || "Enquire Now"}</span>
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {approvals.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 px-4 py-3 bg-white rounded-[32px] border border-slate-700/60 shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                    <Image src={item.image} alt={item.text || "Approval"} fill className="object-contain" sizes="56px" />
                  </div>
                  <p className="text-[12px] sm:text-[12.5px] font-semibold text-slate-800 leading-snug m-0">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Layout: SMU Approvals Carousel (Matching exact reference design)
// -------------------------------------------------------------
function SmuApprovalsCarousel({ approvals, title, subtitle, brand }) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const items = approvals;
  const extendedItems = [...items, ...items, ...items];
  const [currentIndex, setCurrentIndex] = useState(items.length);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  useEffect(() => {
    if (isPaused || items.length === 0) return;
    const timer = setInterval(() => handleNext(), 3500);
    return () => clearInterval(timer);
  }, [isPaused, items.length, handleNext]);

  const handleTransitionEnd = () => {
    if (currentIndex >= items.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - items.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    } else if (currentIndex < items.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + items.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  };

  return (
    <section
      id="approvals"
      className="w-full py-12 sm:py-16 md:py-20 bg-white select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header & Description */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[34px] font-bold text-[#1f2937] tracking-tight leading-tight m-0">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[13px] sm:text-[14px] md:text-[14.5px] text-[#4b5563] max-w-[1020px] mx-auto mt-3.5 leading-relaxed font-normal m-0 text-center">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Slider */}
        <div className="relative px-6 sm:px-8 md:px-10">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute -left-1 sm:left-0 md:left-1 top-1/2 -translate-y-1/2 z-20 text-slate-800 hover:text-black transition-all p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
            aria-label="Previous approval"
          >
            <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute -right-1 sm:right-0 md:right-1 top-1/2 -translate-y-1/2 z-20 text-slate-800 hover:text-black transition-all p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90"
            aria-label="Next approval"
          >
            <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>

          {/* Carousel Track */}
          <div
            className="overflow-hidden"
            onTouchStart={(e) => {
              setIsPaused(true);
              touchStartX.current = e.targetTouches[0].clientX;
            }}
            onTouchMove={(e) => {
              touchEndX.current = e.targetTouches[0].clientX;
            }}
            onTouchEnd={() => {
              const diff = touchStartX.current - touchEndX.current;
              if (Math.abs(diff) > 40) {
                if (diff > 0) handleNext();
                else handlePrev();
              }
              setIsPaused(false);
            }}
          >
            <div
              className="flex items-center"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                transition: isTransitioning ? "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)" : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="shrink-0 px-2 sm:px-4 md:px-5 py-2"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <div className="flex flex-col items-center justify-between text-center h-full">
                    {/* Badge Image */}
                    <div className="relative w-full h-[140px] sm:h-[155px] md:h-[165px] flex items-center justify-center transition-transform duration-300 hover:scale-105">
                      <Image
                        src={item.image}
                        alt={item.text || "Approval"}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 260px, (max-width: 1024px) 220px, 240px"
                      />
                    </div>
                    {/* Caption */}
                    <div className="mt-4 sm:mt-5 md:mt-6 w-full max-w-[230px] mx-auto min-h-[46px] flex items-center justify-center">
                      <p className="text-[14.5px] sm:text-[15.5px] font-medium sm:font-semibold text-slate-800 leading-snug text-center m-0">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Layout: Reusable Approvals Infinite Slider (Manipal)
// -------------------------------------------------------------
function ApprovalsSlider({ approvals, activeUniversity, activeTitle, subtitle, brand, showTags }) {
  const primaryColor = brand?.primaryColor || "#002b49";
  const gridBg = brand?.approvalsGridBg || brand?.approvalsBg || "#ffffff";
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const items = approvals;
  const extendedItems = [...items, ...items, ...items];
  const [currentIndex, setCurrentIndex] = useState(items.length);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  useEffect(() => {
    if (isPaused || items.length === 0) return;
    const timer = setInterval(() => handleNext(), 2500);
    return () => clearInterval(timer);
  }, [isPaused, items.length, handleNext]);

  const handleTransitionEnd = () => {
    if (currentIndex >= items.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - items.length);
    } else if (currentIndex < items.length) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + items.length);
    }
  };

  const formatText = (text) => {
    if (!text) return null;
    const colonIdx = text.indexOf(":");
    if (colonIdx !== -1) {
      return (
        <>
          <span className="font-bold text-slate-900">{text.substring(0, colonIdx)}:</span>
          {text.substring(colonIdx + 1)}
        </>
      );
    }
    return text;
  };

  return (
    <section
      id="approvals"
      className="w-full py-10 sm:py-14 border-b border-slate-200/60 overflow-hidden"
      style={{ backgroundColor: gridBg }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-[#111827] tracking-tight m-0">
            {activeTitle?.toLowerCase().includes(activeUniversity?.toLowerCase()) ? (
              activeTitle
            ) : (
              <>
                {activeUniversity} <span style={{ color: primaryColor }}>{activeTitle}</span>
              </>
            )}
          </h2>
          {subtitle && <p className="text-xs sm:text-[14px] text-slate-600 max-w-3xl mx-auto mt-2.5 leading-relaxed font-normal">{subtitle}</p>}
        </div>

        <div className="relative group/carousel px-4 sm:px-8">
          <button type="button" onClick={handlePrev} className="absolute left-0 sm:-left-3 top-[35%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#f35a06] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90" aria-label="Previous approval">
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>
          <button type="button" onClick={handleNext} className="absolute right-0 sm:-right-3 top-[35%] -translate-y-1/2 z-20 text-slate-900 hover:text-[#f35a06] transition-colors p-1 bg-transparent border-none cursor-pointer flex items-center justify-center active:scale-90" aria-label="Next approval">
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5]" />
          </button>

          <div
            className="overflow-hidden"
            onTouchStart={(e) => { setIsPaused(true); touchStartX.current = e.targetTouches[0].clientX; }}
            onTouchMove={(e) => { touchEndX.current = e.targetTouches[0].clientX; }}
            onTouchEnd={() => {
              const diff = touchStartX.current - touchEndX.current;
              if (Math.abs(diff) > 40) {
                if (diff > 0) handleNext();
                else handlePrev();
              }
              setIsPaused(false);
            }}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                transition: isTransitioning ? "transform 500ms ease-in-out" : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedItems.map((item, idx) => (
                <div key={idx} className="shrink-0 px-2 sm:px-4 py-2" style={{ width: `${100 / visibleCount}%` }}>
                  <div className="flex flex-col items-center text-center h-full group">
                    <div className="relative w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] md:w-[165px] md:h-[165px] shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <Image src={item.image} alt={item.text || "Approval"} fill className="object-contain" sizes="180px" />
                    </div>
                    <div className="mt-3 sm:mt-4 max-w-[240px]">
                      {showTags && item.tag && (
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5" style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}>
                          {item.tag}
                        </span>
                      )}
                      <p className="text-[12px] sm:text-[13px] leading-snug text-slate-800 font-normal m-0 text-center">
                        {formatText(item.text)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// Layout: Classic Banner Grid (Amity)
// -------------------------------------------------------------
function ClassicApprovalsGrid({ approvals, activeUniversity, activeTitle, bannerBg, brand, showTags }) {
  const activeBannerBg = bannerBg || brand?.approvalsBannerBg || brand?.accentColor || "#ffd200";
  const headerTextColor = brand?.approvalsHeaderColor || "#000000";
  const gridBg = brand?.approvalsGridBg || brand?.approvalsBg || "#fff9db";

  return (
    <section id="approvals" className="w-full">
      <div className="w-full py-2.5 sm:py-3.5 px-4 text-center select-none shadow-xs" style={{ backgroundColor: activeBannerBg }}>
        <h3 className="m-0 text-[15px] sm:text-[18px] md:text-[21px] font-extrabold tracking-tight leading-tight" style={{ color: headerTextColor }}>
          {activeUniversity}
        </h3>
        <h2 className="m-0 mt-0.5 text-[17px] sm:text-[20px] md:text-[23px] font-extrabold tracking-tight leading-tight" style={{ color: headerTextColor }}>
          {activeTitle}
        </h2>
      </div>

      <div className="py-6 sm:py-9 border-b border-amber-200/50" style={{ backgroundColor: gridBg }}>
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 sm:gap-y-7 gap-x-4 sm:gap-x-6 lg:gap-x-8 items-center">
            {approvals.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 sm:gap-3.5 group">
                <div
                  className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-full border-2 bg-white flex items-center justify-center p-2 shrink-0 shadow-2xs transition-transform duration-200 group-hover:scale-105"
                  style={{
                    borderColor: item.borderColor || brand?.approvalsCircleBorder || brand?.accentColor || "#fdb913",
                  }}
                >
                  <Image src={item.image} alt={item.text || "Approval"} fill className="object-contain p-2" sizes="68px" />
                </div>
                <div className="flex-1 min-w-0">
                  {showTags && item.tag && (
                    <span className="inline-block text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded mb-1">
                      {item.tag}
                    </span>
                  )}
                  <p className="text-[11.5px] sm:text-[12px] lg:text-[12.5px] leading-snug text-[#1f2937] font-semibold m-0">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
