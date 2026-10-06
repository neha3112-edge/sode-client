"use client";

import React from "react";
import { BookOpen, Users, Globe, Trophy, Star } from "lucide-react";

function BuildingIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16H4zm10-9h4a2 2 0 0 1 2 2v7h-6v-9zM8 6H6v2h2V6zm0 4H6v2h2v-2zm0 4H6v2h2v-2zm4-8h-2v2h2V6zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2zm6 2h-2v2h2v-2zm0 4h-2v2h2v-2z" />
    </svg>
  );
}

function StudentCapIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 8.5l11 5.5 8.5-4.25V15h2V8.5L12 3zm-6 9.87v3.25c0 2.5 3.13 4.88 6 4.88s6-2.38 6-4.88v-3.25L12 16l-6-3.13z" />
    </svg>
  );
}

function LearnersIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function OpenBookIcon({ className }) {
  return (
    <BookOpen className={className} strokeWidth={2.5} />
  );
}

const ICON_MAP = {
  building: BuildingIcon,
  graduation: StudentCapIcon,
  users: LearnersIcon,
  book: OpenBookIcon,
};

export default function LandingStats({ stats = [], brand = {} }) {
  if (!stats || stats.length === 0) return null;

  const isEsgciLayout =
    brand.statsLayout === "esgci" ||
    brand.slug === "esgci";

  const isGguLayout =
    !isEsgciLayout &&
    (brand.statsLayout === "ggu" ||
      brand.slug === "ggu");

  const isSmuLayout =
    !isEsgciLayout &&
    !isGguLayout &&
    (brand.statsLayout === "smu-clean" ||
      brand.slug === "smu" ||
      brand.name?.toLowerCase().includes("sikkim") ||
      brand.name?.toLowerCase().includes("smu"));

  const isRushfordLayout =
    !isEsgciLayout &&
    (brand.statsLayout === "rushford" || brand.slug === "rushford");

  const isLiverpoolLayout =
    !isEsgciLayout &&
    !isRushfordLayout &&
    (brand.statsLayout === "liverpool" || brand.slug === "liverpool");

  const isIimLayout =
    brand.statsLayout === "iim" || brand.slug === "iim";

  const isSsbmLayout =
    !isEsgciLayout &&
    !isRushfordLayout &&
    !isLiverpoolLayout &&
    !isIimLayout &&
    (brand.statsLayout === "ssbm" || brand.slug === "ssbm");

  const isIiitbLayout =
    !isEsgciLayout &&
    !isRushfordLayout &&
    !isLiverpoolLayout &&
    !isIimLayout &&
    !isSsbmLayout &&
    (brand.statsLayout === "iiitb" || brand.slug === "iiitb");

  // ==========================================
  // IIITB Layout: Dark Box with 4 Column Highlights (.HighLights #stats)
  // ==========================================
  if (isIiitbLayout) {
    return (
      <div id="stats" className="HighLights bg-[#2b2b2b] text-white py-12 px-4 sm:px-6 select-none scroll-mt-20">
        <div className="container max-w-[1140px] mx-auto">
          <div className="ach grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((st, idx) => (
              <div key={idx} className="ac1 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <StudentCapIcon className="w-6 h-6 text-[#002147]" />
                </div>
                <div className="inner_arc1_grid text-left">
                  <h3 className="text-[26px] sm:text-[30px] font-bold text-white m-0 leading-tight">
                    {st.value || st.stat}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-white/90 m-0 mt-0.5 leading-snug">
                    {st.label || st.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SSBM Layout: Black Achievement Bar with Red Numbers (#c11f28)
  // ==========================================
  if (isSsbmLayout) {
    return (
      <section id="stats" aria-label="Key Achievements" className="achievement bg-black text-white py-6 sm:py-8 select-none">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="ach grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            {stats.map((st, idx) => (
              <div key={idx} className="ac1 p-4 flex flex-col items-center justify-center">
                <div className="text-white mb-2 flex items-center justify-center">
                  {st.icon === "users" ? (
                    <Users className="w-8 h-8 text-white" />
                  ) : st.icon === "globe" ? (
                    <Globe className="w-8 h-8 text-white" />
                  ) : st.icon === "trophy" ? (
                    <Trophy className="w-8 h-8 text-white" />
                  ) : (
                    <Star className="w-8 h-8 text-white" />
                  )}
                </div>
                <h1 className="text-[30px] sm:text-[36px] font-bold text-[#c11f28] m-0 mb-1 leading-tight">
                  {st.value || st.number || st.stat}
                </h1>
                <h3 className="text-[16px] sm:text-[18px] font-normal text-white m-0 tracking-tight">
                  {st.label || st.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // IIM Kozhikode Layout: Yellow/Gold Ribbon (#FFE5B2) with 4 Achievement Items
  // ==========================================
  if (isIimLayout) {
    return (
      <div id="stats" className="achievement">
        <div className="container">
          <div className="ach">
            {stats.map((st, idx) => (
              <div key={idx} className="ac1">
                {st.icon && (
                  <img
                    src={st.icon}
                    alt={st.label}
                  />
                )}
                <div>
                  <h3>{st.number || st.value}</h3>
                  <p>{st.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Liverpool Layout: Grey Box with 4 Column Stats (#online-mba-details)
  // ==========================================
  if (isLiverpoolLayout) {
    return (
      <div id="online-mba-details" className="achievement py-6 bg-[#F5F5F5] select-none">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="ach grid grid-cols-2 md:grid-cols-4 gap-4 text-[#68676A]">
            {stats.map((st, idx) => (
              <div key={idx} className="ac1 p-3 text-center flex flex-col items-center justify-center">
                <div className="mb-2">
                  {st.icon === "user" ? (
                    <svg className="w-8 h-8 text-[#00408d] fill-current" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  ) : st.icon === "clock" ? (
                    <svg className="w-8 h-8 text-[#00408d] fill-current" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                  ) : st.icon === "graduation" ? (
                    <svg className="w-8 h-8 text-[#00408d] fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.45 13.47L12 18.12l8.55-4.65V18l-8.55 4.67L3.45 18v-4.53z"/></svg>
                  ) : (
                    <svg className="w-8 h-8 text-[#00408d] fill-current" viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>
                  )}
                </div>
                <h3 className="text-[17px] sm:text-[19px] font-bold text-[#68676A] mb-1 m-0 tracking-tight">
                  {st.label || st.title}
                </h3>
                <p className="text-[13px] sm:text-[13.5px] text-[#68676A] leading-snug m-0">
                  {st.value || st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Rushford Layout: 4 Colored Blocks (#D07786, #E0007A, #F85454, #C80536)
  // ==========================================
  if (isRushfordLayout) {
    const bgColors = ["#D07786", "#E0007A", "#F85454", "#C80536"];
    return (
      <section id="stats" aria-label="Key Highlights" className="achievement text-white select-none">
        <div className="w-full">
          <div className="ach grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((st, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 flex items-center gap-4 text-white"
                style={{ backgroundColor: st.bg || bgColors[idx % bgColors.length] }}
              >
                <div className="shrink-0">
                  {st.icon === "user" ? (
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  ) : st.icon === "clock" ? (
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                  ) : st.icon === "graduation" ? (
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.45 13.47L12 18.12l8.55-4.65V18l-8.55 4.67L3.45 18v-4.53z"/></svg>
                  ) : st.icon === "rupee" ? (
                    <span className="text-[32px] font-bold">₹</span>
                  ) : (
                    <span className="text-[32px] font-bold">★</span>
                  )}
                </div>
                <div>
                  <h3 className="text-[20px] font-bold text-white m-0 mb-1 leading-snug">
                    {st.label || st.title}
                  </h3>
                  <p className="text-[13.5px] text-white/95 leading-snug m-0 font-normal">
                    {st.value || st.desc || st.number}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // ESGCI Layout: Black Achievement Bar (#000000)
  // ==========================================
  if (isEsgciLayout) {
    return (
      <section id="stats" aria-label="Key Highlights" className="achievement bg-black text-white py-6 sm:py-8 select-none">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="ach grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            {stats.map((st, idx) => (
              <div key={idx} className="ac1 p-4 flex flex-col items-center justify-center">
                {st.icon === "user" ? (
                  <svg className="w-7 h-7 text-[#04903c] mb-2 fill-current" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                ) : st.icon === "clock" ? (
                  <svg className="w-7 h-7 text-[#04903c] mb-2 fill-current" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                ) : st.icon === "graduation" ? (
                  <svg className="w-7 h-7 text-[#04903c] mb-2 fill-current" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.45 13.47L12 18.12l8.55-4.65V18l-8.55 4.67L3.45 18v-4.53z"/></svg>
                ) : st.icon === "rupee" ? (
                  <span className="text-[26px] font-bold text-[#04903c] mb-1">₹</span>
                ) : (
                  <span className="text-[26px] font-bold text-[#04903c] mb-1">★</span>
                )}
                <h3 className="text-[18px] sm:text-[19px] font-bold text-[#04903c] m-0 mb-1 tracking-tight">
                  {st.label || st.title}
                </h3>
                <p className="text-[13px] sm:text-[13.5px] text-white/90 leading-snug m-0 font-normal">
                  {st.value || st.desc || st.number}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // GGU Layout: Navy Box with Stat Highlights
  // ==========================================
  if (isGguLayout) {
    return (
      <section id="stats" aria-label="Key Statistics" className="achievement py-8 sm:py-12 bg-white select-none">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
          <div className="ach bg-[#003468] rounded-[8px] sm:rounded-[10px] py-6 sm:py-7 px-2 sm:px-4 text-white grid grid-cols-2 md:grid-cols-4 shadow-md items-center">
            {stats.map((st, idx) => (
              <div
                key={idx}
                className={`ac1 relative px-3 sm:px-5 py-3 sm:py-4 text-center flex flex-col items-center justify-center ${
                  idx % 2 === 0 ? "border-r border-white/20 md:border-r-0" : ""
                } ${
                  idx < 2 ? "border-b border-white/20 md:border-b-0" : ""
                }`}
              >
                <span className="block text-[32px] sm:text-[40px] lg:text-[46px] font-bold text-white tracking-tight leading-none">
                  {st.value || st.number}
                </span>
                <p className="text-[12px] sm:text-[13px] lg:text-[13.5px] text-white/90 font-medium mt-2 leading-snug m-0">
                  {st.label}
                </p>

                {/* Vertical Divider Line between stats on Desktop (after item 0, 1, 2) */}
                {idx < stats.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[65%] bg-white/30 pointer-events-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // SMU Layout: Clean Gold Numbers on White Background
  // ==========================================
  if (isSmuLayout) {
    return (
      <section className="w-full bg-white py-10 sm:py-14 lg:py-16 select-none">
        <div className="max-w-[1240px] xl:max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 text-center">
            {stats.map((st, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center space-y-1.5"
              >
                <div className="text-[32px] sm:text-[38px] lg:text-[44px] font-bold text-[#ffb100] tracking-tight leading-none">
                  {st.number}
                </div>
                <p className="text-[13px] sm:text-[14px] text-[#212529] font-medium leading-snug m-0">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // Classic Blue Banner (Amity, etc.)
  // ==========================================
  return (
    <section
      className="py-8 sm:py-12 lg:py-14 text-white border-y border-white/10 transition-colors"
      style={{
        background: brand.statsBg || brand.primaryColor || "#08417b",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 items-center justify-center">
          {stats.map((st, idx) => {
            const IconComponent = ICON_MAP[st.iconType] || BuildingIcon;
            const circleBg = st.circleBg || "bg-[#ffc107]";
            return (
              <div key={idx} className="flex items-center gap-2.5 sm:gap-4 group justify-start">
                {/* Colorful Circle */}
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-[70px] lg:h-[70px] rounded-full ${circleBg} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}
                >
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-white drop-shadow-xs" />
                </div>

                {/* Number & Label */}
                <div className="flex flex-col min-w-0">
                  <h3 className="text-[20px] sm:text-[26px] lg:text-[32px] font-extrabold text-white leading-tight tracking-tight m-0 truncate">
                    {st.number}
                  </h3>
                  <p className="text-[11px] sm:text-[12.5px] lg:text-[13px] text-white/95 font-medium leading-snug mt-0.5 m-0 line-clamp-2">
                    {st.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
