"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rate } from "antd";
import {
  ArrowRightOutlined,
  PlusOutlined,
  MinusOutlined,
  StarFilled,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { getAssetPath } from "@/lib/utils";

// --- Vector SVGs for Perfect Visual Alignment with Screenshot ---

function VisionIcon({ className = "w-16 h-16 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <circle cx="36" cy="36" r="24" fill="#0073b1" fillOpacity="0.15" />
      <circle cx="36" cy="36" r="18" stroke="#0073b1" strokeWidth="6" fill="#e0f2fe" />
      <circle cx="36" cy="36" r="8" fill="#0073b1" />
      <circle cx="38" cy="34" r="3" fill="#ffffff" />
      <path d="M49 49L67 67" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function MissionIcon({ className = "w-16 h-16 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <rect x="42" y="44" width="12" height="24" rx="2" fill="#0073b1" />
      <rect x="56" y="52" width="12" height="16" rx="2" fill="#06b6d4" />
      <rect x="28" y="58" width="12" height="10" rx="2" fill="#eab308" />
      <path d="M48 20V44" stroke="#0284c7" strokeWidth="3" />
      <path d="M48 20L62 26L48 32V20Z" fill="#eab308" />
      <circle cx="28" cy="38" r="5" fill="#0073b1" />
      <path d="M22 52L28 44L34 52" stroke="#0073b1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CapIcon({ className = "w-6 h-6 text-white" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18C5 19.94 8.13 22 12 22C15.87 22 19 19.94 19 17.18V13.18L12 17L5 13.18Z" />
    </svg>
  );
}

function HeadsetIcon({ className = "w-6 h-6 text-white" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2a7 7 0 0 1 14 0v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z" />
    </svg>
  );
}

function UniversityIcon({ className = "w-6 h-6 text-white" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7V9H22V7L12 2M4 11V18H6V11H4M9 11V18H11V11H9M13 11V18H15V11H13M18 11V18H20V11H18M2 20V22H22V20H2Z" />
    </svg>
  );
}

function UsersIcon({ className = "w-6 h-6 text-white" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

// 5 Admission Journey Step SVGs
function StepDetailsIcon({ className = "w-10 h-10 text-[#7c3aed]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="13" y2="13" />
      <line x1="8" y1="17" x2="11" y2="17" />
      <path d="M18 13.5l2.5-2.5a1.5 1.5 0 0 0-2.12-2.12L16 11.38V15h3.62l.38-.38z" />
    </svg>
  );
}

function StepCounselorIcon({ className = "w-10 h-10 text-[#ea580c]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10a6 6 0 0 0-12 0v2a6 6 0 0 0 12 0v-2z" />
      <path d="M9 10a3 3 0 0 1 6 0" />
      <path d="M6 12H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1" />
      <path d="M18 12h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1" />
      <path d="M19 16v1a3 3 0 0 1-3 3h-2" />
      <circle cx="13" cy="20" r="1" fill="currentColor" />
      <path d="M4 22v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1" />
    </svg>
  );
}

function StepUniversityIcon({ className = "w-10 h-10 text-[#0284c7]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2l10 5H2l10-5z" />
    </svg>
  );
}

function StepPaymentIcon({ className = "w-10 h-10 text-[#d946ef]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="3" width="14" height="9" rx="1.5" transform="rotate(15 14 7.5)" />
      <path d="M2 13h4a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h4" />
      <path d="M13 19l2.5-2.5a2 2 0 0 1 2.8 0L20 18" />
    </svg>
  );
}

function StepConfirmIcon({ className = "w-10 h-10 text-[#16a34a]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

// 8 Feature icons
function FeatureIcon({ index = 0, className = "w-7 h-7 text-slate-800 shrink-0" }) {
  const icons = [
    // 0: Top Online Universities
    <svg key="0" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2l10 5H2l10-5z" /></svg>,
    // 1: Dedicated Support
    <svg key="1" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><circle cx="9" cy="10" r="1" /><circle cx="12" cy="10" r="1" /><circle cx="15" cy="10" r="1" /></svg>,
    // 2: UGC-Entitled Degree
    <svg key="2" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>,
    // 3: 100% Free Career Guidance
    <svg key="3" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    // 4: Affordable Fees
    <svg key="4" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M14.5 9h-4.5a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 1 0 3h-4.5" /><path d="M12 7v10" /></svg>,
    // 5: Comparison Tool
    <svg key="5" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M5 6l7-3 7 3M5 6v6a7 7 0 0 0 14 0V6" /></svg>,
    // 6: Direct University Admission
    <svg key="6" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
    // 7: Eligibility Checker
    <svg key="7" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
  ];
  return icons[index % icons.length];
}

// Google Review G Multi-Color SVG
function GoogleGIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.26 21.36 7.35 24 12 24z" />
      <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.13z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.27 6.58l4.01 3.13c.95-2.83 3.6-4.96 6.72-4.96z" />
    </svg>
  );
}

// Helper to highlight pink text within feature descriptions
function renderHighlightedText(fullText = "", highlight = "") {
  if (!highlight || !fullText) return fullText;
  const parts = fullText.split(new RegExp(`(${highlight})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={i} className="text-[#e91e63] font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export function AboutView({ initialAboutData = null, initialReviews = [] }) {
  const about = initialAboutData?.result || initialAboutData || {};
  const reviews = Array.isArray(initialReviews?.items)
    ? initialReviews.items
    : Array.isArray(initialReviews)
      ? initialReviews
      : [];

  const [activeFaqKey, setActiveFaqKey] = useState("0");
  const [reviewSliderIndex, setReviewSliderIndex] = useState(0);
  const [hoveredStepIdx, setHoveredStepIdx] = useState(null);

  const bannerImgUrl = getAssetPath(about?.bannerImage, "");

  const stats = Array.isArray(about?.stats) ? about.stats : [];
  const videoReviews = Array.isArray(about?.videoReviews) ? about.videoReviews : [];
  const whyChooseFeatures = Array.isArray(about?.whyChooseFeatures) ? about.whyChooseFeatures : [];
  const supportJourneySteps = Array.isArray(about?.supportJourneySteps) ? about.supportJourneySteps : [];
  const faqs = Array.isArray(about?.faqs) ? about.faqs : [];

  const statIcons = [
    <CapIcon key="cap" />,
    <HeadsetIcon key="headset" />,
    <UniversityIcon key="uni" />,
    <UsersIcon key="users" />,
  ];

  const statColors = ["bg-[#06b6d4]", "bg-[#f97316]", "bg-[#eab308]", "bg-[#0ea5e9]"];

  const stepThemes = [
    {
      // 0: Submit Your Details (Purple)
      activeBg: "bg-[#ede9fe]",
      activeBorder: "border-[#c4b5fd]",
      shadow: "shadow-xl shadow-purple-500/15",
      hoverBg: "hover:bg-[#ede9fe]",
      hoverBorder: "hover:border-[#c4b5fd]",
    },
    {
      // 1: Get Expert Guidance (Orange)
      activeBg: "bg-[#ffedd5]",
      activeBorder: "border-[#fdba74]",
      shadow: "shadow-xl shadow-orange-500/15",
      hoverBg: "hover:bg-[#ffedd5]",
      hoverBorder: "hover:border-[#fdba74]",
    },
    {
      // 2: Choose University (Sky Blue)
      activeBg: "bg-[#bae6fd]",
      activeBorder: "border-[#7dd3fc]",
      shadow: "shadow-xl shadow-sky-500/15",
      hoverBg: "hover:bg-[#bae6fd]",
      hoverBorder: "hover:border-[#7dd3fc]",
    },
    {
      // 3: Fee Payment (Magenta / Pink matching screenshot)
      activeBg: "bg-[#f5b8fc]",
      activeBorder: "border-[#f0abfc]",
      shadow: "shadow-xl shadow-fuchsia-500/20",
      hoverBg: "hover:bg-[#f5b8fc]",
      hoverBorder: "hover:border-[#f0abfc]",
    },
    {
      // 4: Confirmation (Emerald Green)
      activeBg: "bg-[#dcfce7]",
      activeBorder: "border-[#86efac]",
      shadow: "shadow-xl shadow-emerald-500/15",
      hoverBg: "hover:bg-[#dcfce7]",
      hoverBorder: "hover:border-[#86efac]",
    },
  ];

  const stepIcons = [
    <StepDetailsIcon key="0" />,
    <StepCounselorIcon key="1" />,
    <StepUniversityIcon key="2" />,
    <StepPaymentIcon key="3" />,
    <StepConfirmIcon key="4" />,
  ];

  return (
    <div className="w-full min-h-screen bg-white font-sans text-slate-800">
      {/* ========================================================
          1. HERO TEAM BANNER: FULL-WIDTH COMPACT HEIGHT
      ======================================================== */}
      {bannerImgUrl && (
        <section className="w-full overflow-hidden">
          <Image
            src={bannerImgUrl}
            alt={about.heroTitle || "About Us"}
            width={2001}
            height={571}
            priority
            sizes="100vw"
            className="w-full h-auto block"
          />
        </section>
      )}

      {/* ========================================================
          ABOUT US STORY & VISION / MISSION (Screenshot 1)
      ======================================================== */}
      <section className="w-full bg-linear-to-b from-[#f8fbfe] via-white to-white py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight m-0 mb-4 uppercase">
            {about?.introTitle || about?.heroTitle || "ABOUT US"}
          </h1>

          {about?.introDescription && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal m-0 mb-6 max-w-3xl mx-auto text-center">
              {about.introDescription}
            </p>
          )}

          {about?.introButtonText && (
            <div className="flex justify-center mb-10">
              <Link
                href={about.introButtonLink || "/contact-us"}
                className="bg-[#0073b1] hover:bg-[#005f94] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-md shadow-xs transition-all hover:shadow hover:-translate-y-0.5 inline-block"
              >
                {about.introButtonText}
              </Link>
            </div>
          )}

          {/* Our Vision & Our Mission Dual Cards (Screenshot 1) */}
          {(about?.vision?.title || about?.mission?.title) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left pt-4">
              {/* Vision Card */}
              {about?.vision?.title && (
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/80 transition-colors">
                  <VisionIcon />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold m-0 mb-2 leading-tight">
                      <span className="text-slate-400 font-bold">Our </span>
                      <span className="text-[#0073b1] font-extrabold">Vision</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal m-0">
                      {about.vision.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Mission Card */}
              {about?.mission?.title && (
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50/80 transition-colors">
                  <MissionIcon />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold m-0 mb-2 leading-tight">
                      <span className="text-slate-400 font-bold">Our </span>
                      <span className="text-[#0073b1] font-extrabold">Mission</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal m-0">
                      {about.mission.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          2. OUR HAPPY STUDENTS (Video Testimonials & Reviews) (Screenshot 2)
      ======================================================== */}
      {(about?.happyStudentsTitle || videoReviews.length > 0 || reviews.length > 0) && (
        <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight m-0">
              <span className="text-slate-400 font-extrabold">OUR </span>
              <span className="text-[#0073b1] font-extrabold">HAPPY STUDENTS</span>
            </h2>
            <div className="w-full max-w-5xl mx-auto h-[1px] bg-slate-200 mt-6" />
          </div>

          {/* Student Video Reviews Grid */}
          {videoReviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {videoReviews.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-[9/13] sm:aspect-[9/12] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-slate-900 flex flex-col justify-end p-3 cursor-pointer"
                >
                  {item.thumbnailUrl && (
                    <Image
                      src={getAssetPath(item.thumbnailUrl)}
                      alt={item.studentName || "Student"}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Centered Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/80 group-hover:bg-white backdrop-blur-xs flex items-center justify-center text-slate-900 shadow-md group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 ml-0.5 fill-slate-900" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>

                  {/* Badges on Bottom */}
                  <div className="relative z-10 space-y-1">
                    {item.studentName && (
                      <div>
                        <span className="bg-[#0073b1] text-white text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-xs inline-block">
                          {item.studentName}
                        </span>
                      </div>
                    )}
                    {item.course && (
                      <div>
                        <span className="bg-[#ffc107] text-slate-900 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-xs inline-block line-clamp-1">
                          {item.course}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Google Reviews Summary & Testimonial Carousel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50/60 p-6 sm:p-8 rounded-2xl border border-slate-100">
            {/* Google Rating Summary Left Box */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <CapIcon className="w-6 h-6 text-[#0073b1]" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-semibold text-slate-500 block">Excellent</span>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    Distance Education School
                  </span>
                </div>
                <GoogleGIcon className="w-4 h-4 ml-1 self-start" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900">4.7</span>
                <div className="flex text-amber-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <StarFilled key={i} />
                  ))}
                </div>
              </div>

              <span className="text-xs text-slate-500 block font-normal">
                Based on 1,027+ verified reviews
              </span>

              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  href="/reviews"
                  className="bg-[#0073b1] hover:bg-[#005f94] text-white text-xs font-bold px-4 py-2 rounded-md shadow-xs transition-colors"
                >
                  See all reviews
                </Link>
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-2 rounded-md border border-slate-200 shadow-2xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>review us on</span>
                  <GoogleGIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Reviews Cards List Right Side */}
            <div className="lg:col-span-8 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(reviews.length > 0
                  ? reviews.slice(reviewSliderIndex, reviewSliderIndex + 3)
                  : [
                    {
                      name: "Manjula Shekar",
                      time: "6 months ago",
                      rating: 5,
                      text: "Distance Education School provided clear guidance on choosing the right online MBA program with UGC approvals.",
                    },
                    {
                      name: "Mandeep Khatkare",
                      time: "8 months ago",
                      rating: 5,
                      text: "The admission process was smooth and completely transparent. Highly recommend their free counseling service.",
                    },
                    {
                      name: "Sowmya Latha",
                      time: "10 months ago",
                      rating: 5,
                      text: "Great experience! The counselors were patient and helped me compare university fees and curriculum thoroughly.",
                    },
                  ]
                ).map((rev, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                            {rev.name ? rev.name.charAt(0) : "S"}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-800 leading-tight">
                              {rev.name}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {rev.time || "Verified Student"}
                            </div>
                          </div>
                        </div>
                        <GoogleGIcon className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex text-amber-400 text-xs mb-2">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <StarFilled key={i} />
                        ))}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal m-0 line-clamp-3">
                        &quot;{rev.text || rev.review || rev.content}&quot;
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              {reviews.length > 3 && (
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setReviewSliderIndex((prev) => Math.max(0, prev - 1))}
                    disabled={reviewSliderIndex === 0}
                    className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-xs text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                  >
                    <LeftOutlined />
                  </button>
                  <button
                    onClick={() =>
                      setReviewSliderIndex((prev) =>
                        Math.min(reviews.length - 3, prev + 1)
                      )
                    }
                    disabled={reviewSliderIndex >= reviews.length - 3}
                    className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center text-xs text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                  >
                    <RightOutlined />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          3. ACHIEVEMENTS / STATS IN NUMBERS (Screenshot 3)
      ======================================================== */}
      {stats.length > 0 && (
        <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((item, idx) => (
              <div key={idx} className="flex flex-col items-start text-left">
                <div
                  className={`w-12 h-12 rounded-full ${statColors[idx % statColors.length]
                    } flex items-center justify-center shadow-xs mb-3`}
                >
                  {statIcons[idx % statIcons.length]}
                </div>

                {item.value && (
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0055A5] tracking-tight leading-none mb-1">
                    {item.value}
                  </div>
                )}

                {item.label && (
                  <div className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                    {item.label}
                  </div>
                )}

                {item.description && (
                  <p className="text-xs text-slate-500 leading-relaxed font-normal m-0">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================
          4. CTA BANNER (Screenshot 3)
      ======================================================== */}
      {about?.cta?.title && (
        <section className="w-full bg-[#0073b1] py-8 sm:py-10">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white m-0 tracking-tight">
                {about.cta.title}
              </h3>
              {about.cta.subtitle && (
                <p className="text-blue-100 text-sm sm:text-base m-0 mt-1 font-normal">
                  {about.cta.subtitle}
                </p>
              )}
            </div>

            {about.cta.buttonText && (
              <Link
                href={about.cta.buttonLink || "/contact-us"}
                className="bg-[#ffc107] hover:bg-[#ffb300] text-slate-900 text-sm sm:text-base font-extrabold px-8 py-3.5 rounded-full shadow-md transition-all hover:scale-105 shrink-0 inline-block"
              >
                {about.cta.buttonText}
              </Link>
            )}
          </div>
        </section>
      )}

      {/* ========================================================
          5. WHY CHOOSE DISTANCE EDUCATION SCHOOL? (Screenshot 4)
      ======================================================== */}
      {whyChooseFeatures.length > 0 && (
        <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C3569] tracking-tight text-center m-0 mb-12">
            {about?.whyChooseTitle || "Why Choose Distance Education School?"}
          </h2>

          <div className="border-y border-slate-200 divide-y divide-slate-200">
            {/* Split 8 features into pairs of 2 per row */}
            {Array.from({ length: Math.ceil(whyChooseFeatures.length / 2) }).map(
              (_, rowIdx) => {
                const item1 = whyChooseFeatures[rowIdx * 2];
                const item2 = whyChooseFeatures[rowIdx * 2 + 1];

                return (
                  <div
                    key={rowIdx}
                    className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 py-6 sm:py-8 gap-6 md:gap-8"
                  >
                    {/* Column 1 */}
                    {item1 && (
                      <div className="flex items-start gap-4">
                        <FeatureIcon index={rowIdx * 2} />
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-[#0073b1] m-0 mb-1 leading-snug">
                            {item1.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal m-0">
                            {renderHighlightedText(item1.description, item1.highlightText)}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Column 2 */}
                    {item2 && (
                      <div className="flex items-start gap-4 md:pl-8 pt-6 md:pt-0">
                        <FeatureIcon index={rowIdx * 2 + 1} />
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-[#0073b1] m-0 mb-1 leading-snug">
                            {item2.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal m-0">
                            {renderHighlightedText(item2.description, item2.highlightText)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </section>
      )}

      {/* ========================================================
          6. HOW WE SUPPORT YOUR ADMISSION JOURNEY (Screenshot 5)
      ======================================================== */}
      {supportJourneySteps.length > 0 && (
        <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight m-0 inline-flex flex-wrap items-center justify-center gap-x-2">
              <span className="text-slate-400 font-bold">How We Support</span>
              <span className="relative inline-block text-slate-800 font-extrabold pb-1">
                Your
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-900 rounded-full"></span>
              </span>
              <span className="text-[#0073b1] font-black">
                Admission Journey
              </span>
            </h2>
          </div>

          {/* 5 Interactive Step Cards with Signature Color & Height Zoom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12 items-stretch py-4">
            {supportJourneySteps.map((step, idx) => {
              const theme = stepThemes[idx % stepThemes.length];
              const isHovered = hoveredStepIdx === idx;

              return (
                <div
                  key={step._id || idx}
                  onMouseEnter={() => setHoveredStepIdx(idx)}
                  onMouseLeave={() => setHoveredStepIdx(null)}
                  onClick={() => setHoveredStepIdx(idx)}
                  className={`group relative p-6 rounded-2xl text-center flex flex-col items-center justify-start cursor-pointer transition-all duration-300 ease-out will-change-transform ${isHovered
                    ? `${theme.activeBg} ${theme.activeBorder} ${theme.shadow} border-2 scale-105 -translate-y-3 z-20 min-h-[265px]`
                    : `bg-[#f8fafc] ${theme.hoverBg} border border-slate-200/80 ${theme.hoverBorder} shadow-2xs hover:shadow-xl hover:scale-105 hover:-translate-y-3 hover:z-20 z-0 scale-100 translate-y-0 min-h-[250px]`
                    }`}
                >
                  <div
                    className={`mb-4 transition-transform duration-300 ${isHovered
                      ? "scale-110 -translate-y-1"
                      : "group-hover:scale-110 group-hover:-translate-y-1"
                      }`}
                  >
                    {stepIcons[idx % stepIcons.length]}
                  </div>

                  {step.title && (
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 m-0 mb-2.5 leading-snug">
                      {step.title}
                    </h3>
                  )}

                  {step.description && (
                    <p className="text-xs text-slate-600 leading-relaxed font-normal m-0">
                      {step.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Center Get Help Button */}
          {about?.journeyButtonText && (
            <div className="flex justify-center">
              <Link
                href={about.journeyButtonLink || "/contact-us"}
                className="bg-[#073b64] hover:bg-[#052c4c] text-white text-sm sm:text-base font-bold px-8 py-3 rounded-full shadow-md transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                <span>{about.journeyButtonText}</span>
                <ArrowRightOutlined />
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ========================================================
          7. FAQS - FREQUENTLY ASKED QUESTIONS (Screenshot 5)
      ======================================================== */}
      {faqs.length > 0 && (
        <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#072C50] m-0 mb-4">
              {about?.faqsTitle || "FAQs – Frequently Asked Questions"}
            </h2>
            <div className="w-full h-[1px] bg-slate-200" />
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqKey === String(idx);

              return (
                <div key={idx} className="rounded-xl overflow-hidden shadow-2xs">
                  <button
                    onClick={() => setActiveFaqKey(isOpen ? null : String(idx))}
                    className="w-full bg-[#e8ecef] hover:bg-slate-200/80 text-left px-5 py-4 font-bold text-slate-800 text-xs sm:text-sm md:text-base flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span className="text-slate-700 text-sm shrink-0">
                      {isOpen ? <MinusOutlined /> : <PlusOutlined />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="bg-[#edf5fd] px-6 py-4 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
