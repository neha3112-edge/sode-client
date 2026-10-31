"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rate, Modal, Carousel } from "antd";
import { useFormModal } from "@/hooks/useFormModal";
import {
  ArrowRightOutlined,
  PlusOutlined,
  MinusOutlined,
  StarFilled,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";

// --- Vector SVGs for Perfect Visual Alignment with Screenshot ---

function VisionIcon({ className = "w-16 h-16 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <circle cx="36" cy="36" r="24" fill="#072C50" fillOpacity="0.15" />
      <circle cx="36" cy="36" r="18" stroke="#072C50" strokeWidth="6" fill="#e0f2fe" />
      <circle cx="36" cy="36" r="8" fill="#072C50" />
      <circle cx="38" cy="34" r="3" fill="#ffffff" />
      <path d="M49 49L67 67" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function MissionIcon({ className = "w-16 h-16 shrink-0" }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <rect x="42" y="44" width="12" height="24" rx="2" fill="#072C50" />
      <rect x="56" y="52" width="12" height="16" rx="2" fill="#06b6d4" />
      <rect x="28" y="58" width="12" height="10" rx="2" fill="#eab308" />
      <path d="M48 20V44" stroke="#0284c7" strokeWidth="3" />
      <path d="M48 20L62 26L48 32V20Z" fill="#eab308" />
      <circle cx="28" cy="38" r="5" fill="#072C50" />
      <path d="M22 52L28 44L34 52" stroke="#072C50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
function StepDetailsIcon({ className = "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[#7c3aed]" }) {
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

function StepCounselorIcon({ className = "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[#ea580c]" }) {
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

function StepUniversityIcon({ className = "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[#0284c7]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2l10 5H2l10-5z" />
    </svg>
  );
}

function StepPaymentIcon({ className = "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[#d946ef]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="3" width="14" height="9" rx="1.5" transform="rotate(15 14 7.5)" />
      <path d="M2 13h4a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h4" />
      <path d="M13 19l2.5-2.5a2 2 0 0 1 2.8 0L20 18" />
    </svg>
  );
}

function StepConfirmIcon({ className = "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[#16a34a]" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

// 8 Feature icons
function FeatureIcon({ index = 0, className = "w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-slate-800 shrink-0" }) {
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
function getYouTubeEmbedUrl(url = "") {
  if (!url || typeof url !== "string") return null;
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=1&rel=0`;
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&rel=0`;
  const beMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (beMatch) return `https://www.youtube.com/embed/${beMatch[1]}?autoplay=1&rel=0`;
  return url;
}

function getYouTubeThumbnail(url = "") {
  if (!url || typeof url !== "string") return null;
  let videoId = null;
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) videoId = shortsMatch[1];
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) videoId = watchMatch[1];
  const beMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (beMatch) videoId = beMatch[1];
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
}

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

// Student Review Item Card for Carousel (Mobile & Desktop)
function StudentReviewCard({ rev, isMobile, onOpenModal }) {
  const initial = rev?.name ? rev.name.trim().charAt(0).toUpperCase() : "S";
  const avatarColors = [
    "bg-[#5D4037]", // brown
    "bg-[#4A148C]", // deep purple
    "bg-[#1565C0]", // royal blue
    "bg-[#00695C]", // teal
    "bg-[#AD1457]", // magenta
    "bg-[#E65100]", // deep orange
    "bg-[#37474F]", // blue grey
    "bg-[#2E7D32]", // dark green
  ];
  const charCode = initial.charCodeAt(0) || 0;
  const avatarBg = avatarColors[charCode % avatarColors.length];

  const fullText = rev?.text || rev?.review || rev?.comment || "";
  const maxLen = isMobile ? 120 : 90;
  const isLong = fullText.length > maxLen;
  const displayText = isLong ? fullText.slice(0, maxLen).trim() : fullText;

  return (
    <div className="h-full py-0.5">
      <div
        className={`bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between w-full ${
          isMobile
            ? "min-h-[140px]"
            : "aspect-[1.35/1] min-h-[155px] max-h-[175px]"
        }`}
      >
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2.5 min-w-0">
              {rev?.avatar ? (
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200/80"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className={`w-8 h-8 rounded-full ${avatarBg} text-white font-bold text-xs items-center justify-center shrink-0 shadow-2xs ${
                  rev?.avatar ? "hidden" : "flex"
                }`}
              >
                {initial}
              </div>
              <div className="min-w-0">
                <div className="text-xs sm:text-xs font-bold text-slate-800 leading-tight truncate">
                  {rev?.name}
                </div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                  {rev?.time || "Verified Student"}
                </div>
              </div>
            </div>
            <GoogleGIcon className="w-3.5 h-3.5 shrink-0 pt-0.5" />
          </div>

          <div className="flex text-amber-400 text-xs gap-0.5 mb-1.5">
            {[...Array(Math.min(5, Math.max(1, rev?.rating || 5)))].map((_, i) => (
              <StarFilled key={i} />
            ))}
          </div>

          <p className="text-xs text-slate-600 leading-[1.3] sm:leading-[1.35] font-normal m-0">
            &ldquo;{displayText}
            {isLong ? (
              <>
                ...{" "}
                <button
                  type="button"
                  onClick={() => onOpenModal?.(rev)}
                  className="inline text-[11px] sm:text-xs font-bold text-[#072C50] hover:underline cursor-pointer border-none bg-transparent p-0 align-baseline whitespace-nowrap"
                >
                  Read more
                </button>
              </>
            ) : (
              "&rdquo;"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AboutView({ initialAboutData = null, initialReviews = null }) {
  const { openFormModal } = useFormModal();
  const about = initialAboutData?.result || initialAboutData || {};

  // Extract reviews metadata & reviews list from About Us API payload (or fallback initialReviews)
  const reviewsMeta =
    about?.reviewsData ||
    about?.studentReviews ||
    (initialReviews && typeof initialReviews === "object" && !Array.isArray(initialReviews)
      ? initialReviews?.result || initialReviews
      : {});

  const reviewsList =
    Array.isArray(reviewsMeta?.reviews) && reviewsMeta.reviews.length > 0
      ? reviewsMeta.reviews
      : Array.isArray(initialReviews?.items) && initialReviews.items.length > 0
        ? initialReviews.items
        : Array.isArray(initialReviews) && initialReviews.length > 0
          ? initialReviews
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
              {
                name: "Pratik Sharma",
                time: "1 year ago",
                rating: 5,
                text: "The guidance for admission was wonderful. Very cooperative counsellors and smooth documentation.",
              },
            ];

  const [activeFaqKey, setActiveFaqKey] = useState("0");
  const mobileReviewCarouselRef = useRef(null);
  const desktopReviewCarouselRef = useRef(null);
  const [hoveredStepIdx, setHoveredStepIdx] = useState(null);
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [activeReviewModal, setActiveReviewModal] = useState(null);

  const handleOpenVideo = (item) => {
    const embedUrl = getYouTubeEmbedUrl(item?.videoUrl);
    if (embedUrl) {
      setActiveVideoModal({
        ...item,
        embedUrl,
        isShort: Boolean(item.videoUrl && item.videoUrl.includes("shorts")),
      });
    }
  };

  const bannerImgUrl = typeof about?.bannerImage === "string" ? about.bannerImage : (about?.bannerImage?.url || about?.bannerImage?.path || "");

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
    <div className="w-full bg-white font-sans text-slate-800">
      {/* ========================================================
          1. TOP HERO HEADER (COMPACT DARK BLUE BANNER)
      ======================================================== */}
      <div className="w-full bg-[#072C50] text-white pt-5 pb-11 sm:pt-6 sm:pb-13 md:pt-7 md:pb-15 px-4 relative">
        <div className="max-w-5xl lg:max-w-6xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase m-0 mb-1.5 leading-tight">
            {about?.introTitle || about?.heroTitle || "ABOUT US"}
          </h1>

          {about?.introDescription && (
            <p className="text-blue-100/90 text-xs sm:text-[13.5px] leading-[1.3] sm:leading-[1.35] max-w-5xl lg:max-w-6xl w-full mx-auto font-normal m-0 text-center">
              {about.introDescription}
            </p>
          )}
        </div>
      </div>

      {/* ========================================================
          2. OUR VISION & MISSION DUAL CARDS (FLOATING OVER HERO)
      ======================================================== */}
      {(about?.vision?.title || about?.mission?.title) && (
        <section className="relative z-10 max-w-5xl mx-auto px-4 -mt-7 sm:-mt-8 md:-mt-9 mb-2 sm:mb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
            {/* Vision Card */}
            {about?.vision?.title && (
              <div className="bg-white p-4.5 sm:p-5.5 rounded-2xl border border-slate-200/90 shadow-md hover:shadow-lg transition-shadow flex items-start gap-4">
                <VisionIcon />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold m-0 mb-2 leading-tight">
                    <span className="text-slate-400 font-bold">Our </span>
                    <span className="text-[#072C50] font-extrabold">Vision</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-[1.3] sm:leading-[1.35] font-normal m-0">
                    {about.vision.description}
                  </p>
                </div>
              </div>
            )}

            {/* Mission Card */}
            {about?.mission?.title && (
              <div className="bg-white p-4.5 sm:p-5.5 rounded-2xl border border-slate-200/90 shadow-md hover:shadow-lg transition-shadow flex items-start gap-4">
                <MissionIcon />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold m-0 mb-2 leading-tight">
                    <span className="text-slate-400 font-bold">Our </span>
                    <span className="text-[#072C50] font-extrabold">Mission</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-[1.3] sm:leading-[1.35] font-normal m-0">
                    {about.mission.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================
          2. OUR HAPPY STUDENTS (Video Testimonials & Reviews) (Screenshot 2)
      ======================================================== */}
      {(about?.happyStudentsTitle || videoReviews.length > 0 || reviews.length > 0) && (
        <section className="pt-2 sm:pt-3 pb-6 sm:pb-8 max-w-6xl mx-auto px-4">
          <div className="text-center mb-4 sm:mb-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight m-0">
              <span className="text-slate-400 font-extrabold">OUR </span>
              <span className="text-[#072C50] font-extrabold">HAPPY STUDENTS</span>
            </h2>
            <div className="w-full max-w-5xl mx-auto h-[1px] bg-slate-200 mt-2.5 sm:mt-3" />
          </div>

          {/* Student Video Reviews Grid */}
          {videoReviews.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {videoReviews.map((item, idx) => {
                const thumb = getYouTubeThumbnail(item.videoUrl);

                return (
                  <div
                    key={item._id || idx}
                    onClick={() => handleOpenVideo(item)}
                    className="group relative aspect-[9/13] sm:aspect-[9/12] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-slate-900 flex flex-col justify-end p-3 cursor-pointer select-none"
                  >
                    {thumb && (
                      <Image
                        src={thumb}
                        alt={item.studentName || "Student"}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Centered Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-white/85 group-hover:bg-white backdrop-blur-xs flex items-center justify-center text-slate-900 shadow-md group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 ml-0.5 fill-slate-900" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>

                    {/* Badges on Bottom */}
                    <div className="relative z-10 space-y-1">
                      {item.studentName && (
                        <div>
                          <h3 className="bg-[#072C50] text-white text-[11px] sm:text-xs font-bold px-2.5 py-0.5 rounded-xs inline-block m-0">
                            {item.studentName}
                          </h3>
                        </div>
                      )}
                      {item.course && (
                        <div>
                          <p className="bg-[#ffc107] text-slate-900 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-xs inline-block line-clamp-1 m-0">
                            {item.course}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Google Reviews Summary & Testimonial Carousel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center bg-slate-50/70 p-3.5 sm:p-4.5 rounded-2xl border border-slate-200/70">
            {/* Google Rating Summary Left Box */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <CapIcon className="w-5 h-5 text-[#072C50]" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-semibold text-slate-500 block">
                    {reviewsMeta?.scale || "Excellent"}
                  </span>
                  <span className="text-xs font-bold text-slate-900 block leading-tight">
                    {reviewsMeta?.companyName || "Distance Education School"}
                  </span>
                </div>
                <GoogleGIcon className="w-3.5 h-3.5 ml-1 self-start" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {reviewsMeta?.rating ? Number(reviewsMeta.rating).toFixed(1) : "4.7"}
                </span>
                <div className="flex text-amber-400 text-sm gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarFilled key={i} />
                  ))}
                </div>
              </div>

              <span className="text-[11px] text-slate-500 block font-normal">
                {reviewsMeta?.totalReviews
                  ? `Based on ${Number(reviewsMeta.totalReviews).toLocaleString()}+ verified reviews`
                  : "Based on 1,027+ verified reviews"}
              </span>

              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  href="/reviews"
                  className="bg-[#072C50] hover:bg-[#0c3966] text-white text-xs font-bold px-3.5 py-1.5 rounded-md shadow-xs transition-colors"
                >
                  See all reviews
                </Link>
                <a
                  href={
                    reviewsMeta?.googleReviewUrl ||
                    "https://search.google.com/local/writereview?placeid=ChIJH5Teux7kDDkRrAsKZz9s-_U"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-md border border-slate-200 shadow-2xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>review us on</span>
                  <GoogleGIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Reviews Carousel Right Side */}
            <div className="lg:col-span-8 min-w-0 overflow-hidden">
              {/* MOBILE CAROUSEL: 1 Single Clean Card per Slide (< sm) */}
              <div className="block sm:hidden">
                <div className="relative">
                  <Carousel
                    ref={mobileReviewCarouselRef}
                    dots={false}
                    infinite={reviewsList.length > 1}
                    autoplay={true}
                    autoplaySpeed={4500}
                    speed={600}
                    slidesToShow={1}
                    slidesToScroll={1}
                    swipeToSlide={true}
                    draggable={true}
                    className="about-reviews-carousel-mobile [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-slide]:h-auto [&_.slick-slide]:flex [&_.slick-slide>div]:h-full [&_.slick-slide>div]:w-full [&_.slick-slide]:px-1"
                  >
                    {reviewsList.map((rev, idx) => (
                      <StudentReviewCard
                        key={`m-${rev._id || idx}`}
                        rev={rev}
                        isMobile={true}
                        onOpenModal={setActiveReviewModal}
                      />
                    ))}
                  </Carousel>

                  {reviewsList.length > 1 && (
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => mobileReviewCarouselRef.current?.prev()}
                        aria-label="Previous review"
                        className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-[#072C50] flex items-center justify-center text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
                      >
                        <LeftOutlined />
                      </button>
                      <button
                        type="button"
                        onClick={() => mobileReviewCarouselRef.current?.next()}
                        aria-label="Next review"
                        className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-[#072C50] flex items-center justify-center text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
                      >
                        <RightOutlined />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* TABLET / DESKTOP CAROUSEL: 2-3 Cards per Slide (>= sm) */}
              <div className="hidden sm:block">
                <div className="relative">
                  <Carousel
                    ref={desktopReviewCarouselRef}
                    dots={false}
                    infinite={reviewsList.length > 3}
                    autoplay={true}
                    autoplaySpeed={4500}
                    speed={600}
                    slidesToShow={3}
                    slidesToScroll={1}
                    swipeToSlide={true}
                    draggable={true}
                    responsive={[
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 1,
                          infinite: reviewsList.length > 2,
                        },
                      },
                    ]}
                    className="about-reviews-carousel-desktop [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-slide]:h-auto [&_.slick-slide]:flex [&_.slick-slide>div]:h-full [&_.slick-slide>div]:w-full [&_.slick-slide]:px-1.5"
                  >
                    {reviewsList.map((rev, idx) => (
                      <StudentReviewCard
                        key={`d-${rev._id || idx}`}
                        rev={rev}
                        isMobile={false}
                        onOpenModal={setActiveReviewModal}
                      />
                    ))}
                  </Carousel>

                  {reviewsList.length > 1 && (
                    <div className="flex justify-end gap-2 mt-1 sm:mt-1.5">
                      <button
                        type="button"
                        onClick={() => desktopReviewCarouselRef.current?.prev()}
                        aria-label="Previous review"
                        className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-[#072C50] flex items-center justify-center text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
                      >
                        <LeftOutlined />
                      </button>
                      <button
                        type="button"
                        onClick={() => desktopReviewCarouselRef.current?.next()}
                        aria-label="Next review"
                        className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-[#072C50] flex items-center justify-center text-xs shadow-2xs cursor-pointer active:scale-95 transition-all"
                      >
                        <RightOutlined />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          3. ACHIEVEMENTS / STATS IN NUMBERS (Screenshot 3)
      ======================================================== */}
      {stats.length > 0 && (
        <section className="py-6 sm:py-8 max-w-6xl mx-auto px-4">
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
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#072C50] tracking-tight leading-none mb-1">
                    {item.value}
                  </div>
                )}

                {item.label && (
                  <div className="text-sm sm:text-base font-bold text-slate-900 mb-1">
                    {item.label}
                  </div>
                )}

                {item.description && (
                  <p className="text-xs text-slate-500 leading-[1.3] sm:leading-[1.35] font-normal m-0">
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
        <section className="w-full bg-[#072C50] py-6 sm:py-8 shadow-inner">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white m-0 tracking-tight leading-tight">
                {about.cta.title}
              </h3>
              {about.cta.subtitle && (
                <p className="text-slate-200 text-sm sm:text-base m-0 mt-0.5 sm:mt-1 font-normal leading-tight">
                  {about.cta.subtitle}
                </p>
              )}
            </div>

            {about.cta.buttonText && (
              <button
                type="button"
                onClick={() =>
                  openFormModal({
                    title: about.cta.buttonText || "Request a Call Back",
                    source: "About Us - CTA Banner",
                  })
                }
                data-modal="counselling-form-modal"
                style={{
                  background: "linear-gradient(180deg, #F6DE95 0%, #EEC471 100%)",
                  color: "#072C50",
                  borderColor: "rgba(238, 196, 113, 0.6)",
                }}
                className="hover:brightness-105 active:scale-95 text-[#072C50] text-xs sm:text-sm font-bold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md transition-all hover:scale-105 shrink-0 inline-block border cursor-pointer"
              >
                {about.cta.buttonText}
              </button>
            )}
          </div>
        </section>
      )}

      {/* ========================================================
          5. WHY CHOOSE DISTANCE EDUCATION SCHOOL? (Screenshot 4)
      ======================================================== */}
      {whyChooseFeatures.length > 0 && (
        <section className="py-8 sm:py-10 max-w-6xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1C3569] tracking-tight text-center m-0 mb-6 sm:mb-8">
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
                    className="grid grid-cols-2 divide-x divide-slate-200 py-4 sm:py-6 md:py-8 gap-3 sm:gap-6 md:gap-8"
                  >
                    {/* Column 1 */}
                    {item1 && (
                      <div className="flex items-start gap-2 sm:gap-3.5 md:gap-4 pr-1 sm:pr-0">
                        <FeatureIcon
                          index={rowIdx * 2}
                          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-slate-800 shrink-0 mt-0.5"
                        />
                        <div>
                          <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#072C50] m-0 mb-0.5 sm:mb-1 leading-snug">
                            {item1.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 leading-[1.3] sm:leading-[1.35] font-normal m-0">
                            {renderHighlightedText(
                              item1.description,
                              item1.highlightText
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Column 2 */}
                    {item2 && (
                      <div className="flex items-start gap-2 sm:gap-3.5 md:gap-4 pl-2.5 sm:pl-6 md:pl-8">
                        <FeatureIcon
                          index={rowIdx * 2 + 1}
                          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-slate-800 shrink-0 mt-0.5"
                        />
                        <div>
                          <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#072C50] m-0 mb-0.5 sm:mb-1 leading-snug">
                            {item2.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs md:text-sm text-slate-600 leading-[1.3] sm:leading-[1.35] font-normal m-0">
                            {renderHighlightedText(
                              item2.description,
                              item2.highlightText
                            )}
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
        <section className="pt-6 pb-3 sm:pt-8 sm:pb-4 max-w-6xl mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight m-0 inline-flex flex-wrap items-center justify-center gap-x-2">
              <span className="text-slate-400 font-bold">How We Support</span>{" "}
              <span className="relative inline-block text-slate-800 font-extrabold pb-1">
                Your
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-900 rounded-full"></span>
              </span>{" "}
              <span className="text-[#072C50] font-black">
                Admission Journey
              </span>
            </h2>
          </div>

          {/* 5 Interactive Step Cards with Signature Color & Height Zoom */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 mb-6 sm:mb-8 items-stretch">
            {supportJourneySteps.map((step, idx) => {
              const theme = stepThemes[idx % stepThemes.length];
              const isHovered = hoveredStepIdx === idx;
              const isLastOdd =
                idx === supportJourneySteps.length - 1 &&
                supportJourneySteps.length % 2 === 1;

              return (
                <div
                  key={step._id || idx}
                  onMouseEnter={() => setHoveredStepIdx(idx)}
                  onMouseLeave={() => setHoveredStepIdx(null)}
                  onClick={() => setHoveredStepIdx(idx)}
                  className={`group relative py-3 px-2 sm:py-4 sm:px-3.5 rounded-xl sm:rounded-2xl text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-out will-change-transform min-h-[135px] sm:min-h-[155px] ${
                    isLastOdd
                      ? "col-span-2 max-w-[calc(50%-0.3125rem)] mx-auto w-full sm:col-span-1 sm:max-w-none"
                      : ""
                  } ${
                    isHovered
                      ? `${theme.activeBg} ${theme.activeBorder} ${theme.shadow} border-2 scale-105 -translate-y-2 z-20`
                      : `bg-[#f8fafc] ${theme.hoverBg} border border-slate-200/80 ${theme.hoverBorder} shadow-2xs hover:shadow-xl hover:scale-105 hover:-translate-y-2 hover:z-20 z-0 scale-100 translate-y-0`
                  }`}
                >
                  <div
                    className={`mb-1.5 sm:mb-2.5 transition-transform duration-300 ${
                      isHovered
                        ? "scale-110 -translate-y-1"
                        : "group-hover:scale-110 group-hover:-translate-y-1"
                    }`}
                  >
                    {stepIcons[idx % stepIcons.length]}
                  </div>

                  {step.title && (
                    <h3 className="text-[13px] sm:text-[14.5px] font-bold sm:font-extrabold text-slate-900 m-0 mb-1 leading-snug">
                      {step.title}
                    </h3>
                  )}

                  {step.description && (
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-[1.3] sm:leading-[1.35] font-normal m-0 line-clamp-3">
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
              <button
                type="button"
                onClick={() =>
                  openFormModal({
                    title: about.journeyButtonText || "Get Help",
                    source: "About Us - Admission Journey",
                  })
                }
                data-modal="counselling-form-modal"
                className="bg-[#072C50] hover:bg-[#0c3966] active:scale-95 text-white text-xs sm:text-sm font-bold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md transition-all hover:scale-105 inline-flex items-center gap-1.5 cursor-pointer border-none"
              >
                <span>{about.journeyButtonText}</span>
                <ArrowRightOutlined className="text-xs" />
              </button>
            </div>
          )}
        </section>
      )}

      {/* ========================================================
          7. FAQS - FREQUENTLY ASKED QUESTIONS (Screenshot 5)
      ======================================================== */}
      {faqs.length > 0 && (
        <section className="pt-2 pb-8 sm:pt-3 sm:pb-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-5 sm:mb-6">
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

                  <div
                    className={
                      isOpen
                        ? "bg-[#edf5fd] px-6 py-4 text-xs sm:text-sm text-slate-700 leading-[1.3] sm:leading-[1.35] border-t border-slate-200/50"
                        : "sr-only"
                    }
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================
          8. VIDEO PLAYER MODAL FOR STUDENT REVIEWS
      ======================================================== */}
      {activeVideoModal && (
        <Modal
          open={Boolean(activeVideoModal)}
          onCancel={() => setActiveVideoModal(null)}
          footer={null}
          centered
          destroyOnClose
          width={activeVideoModal.isShort ? 380 : 760}
          className="p-0 [&_.ant-modal-content]:p-0! [&_.ant-modal-content]:rounded-2xl! [&_.ant-modal-content]:overflow-hidden! [&_.ant-modal-content]:bg-black!"
        >
          <div className="relative w-full bg-black flex flex-col items-center">
            <div className={`w-full relative ${activeVideoModal.isShort ? "aspect-[9/16] max-h-[80vh]" : "aspect-video"}`}>
              <iframe
                src={activeVideoModal.embedUrl}
                title={activeVideoModal.studentName || "Student Review"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </div>
            {(activeVideoModal.studentName || activeVideoModal.course) && (
              <div className="w-full p-3.5 bg-slate-900 text-white flex items-center justify-between gap-3 border-t border-white/10">
                <div>
                  <h4 className="text-sm font-bold text-white m-0">
                    {activeVideoModal.studentName}
                  </h4>
                  {activeVideoModal.course && (
                    <p className="text-xs text-amber-400 font-medium m-0">
                      {activeVideoModal.course}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer border-none transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* ========================================================
          9. STUDENT REVIEW FULL CONTENT MODAL (Matching Reviews Page)
      ======================================================== */}
      {activeReviewModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          onClick={() => setActiveReviewModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative border border-slate-100 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveReviewModal(null)}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer border-none shadow-xs text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-slate-800"
              aria-label="Close"
            >
              <svg className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pr-6">
              <div className="relative shrink-0">
                {activeReviewModal.avatar ? (
                  <img
                    src={activeReviewModal.avatar}
                    alt={activeReviewModal.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200/80"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm items-center justify-center shadow-2xs ${
                    activeReviewModal.avatar ? "hidden" : "flex"
                  }`}
                >
                  {activeReviewModal.name ? activeReviewModal.name.trim().charAt(0).toUpperCase() : "S"}
                </div>
              </div>

              <div className="min-w-0">
                <p className="font-bold text-slate-900 text-sm m-0 truncate">
                  {activeReviewModal.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex text-amber-400 text-xs gap-0.5">
                    {[...Array(Math.min(5, Math.max(1, activeReviewModal.rating || 5)))].map((_, i) => (
                      <StarFilled key={i} />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {activeReviewModal.time || "Verified Student"}
                  </span>
                </div>
              </div>
            </div>

            {/* Full Review Text */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-slate-700 text-xs sm:text-[13px] leading-relaxed">
              <p className="whitespace-pre-line m-0">&ldquo;{activeReviewModal.text}&rdquo;</p>
            </div>

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                <GoogleGIcon className="w-3.5 h-3.5" />
                Verified Google Review
              </span>
              <button
                type="button"
                onClick={() => setActiveReviewModal(null)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs transition cursor-pointer border-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
