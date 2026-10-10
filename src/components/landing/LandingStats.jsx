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
  // ==========================================
  // SSBM Layout: Black Achievement Bar with Solid White Icons and Red Numbers (#c11f28)
  // ==========================================
  if (isSsbmLayout) {
    return (
      <section id="stats" aria-label="Key Achievements" className="achievement bg-black text-white py-6 sm:py-8 select-none">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="ach grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            {stats.map((st, idx) => (
              <div key={idx} className="ac1 p-3 sm:p-4 flex flex-col items-center justify-center">
                <div className="text-white mb-2 flex items-center justify-center">
                  {st.icon === "users" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-[38px] h-[38px] fill-white shrink-0">
                      <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3zM609.3 512l-137.8 0c5.4-9.4 8.6-20.3 8.6-32c0-70.7-39.3-132.3-97.1-164.2c16.3-5 33.7-7.8 51.7-7.8l91.4 0c78.8 0 142.6 63.8 142.6 142.6c0 16.4-13.3 29.7-29.7 29.7zM448 208a80 80 0 1 1 0-160 80 80 0 1 1 0 160z"/>
                    </svg>
                  ) : st.icon === "globe" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[38px] h-[38px] fill-white shrink-0">
                      <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 64C221.7 64 190.1 74.4 163.7 92.1C184.7 113.8 198.6 142.4 202.9 174.5C216.5 167.8 231.8 164 248 164C270.1 164 288 181.9 288 204C288 214.6 283.8 224.2 277 231.3C275.4 233 273.7 234.6 271.8 236C265 241.1 256.4 244 248 244C234.7 244 224 233.3 224 220C224 213.4 221.3 207.4 216.9 203.1C212.6 198.7 206.6 196 200 196C186.7 196 176 206.7 176 220C176 233.3 186.7 244 200 244C206.6 244 212.6 246.7 216.9 251.1C221.3 255.4 224 261.4 224 268C224 281.3 213.3 292 200 292C186.7 292 176 281.3 176 268C176 261.4 173.3 255.4 168.9 251.1C164.6 246.7 158.6 244 152 244C138.7 244 128 254.7 128 268C128 281.3 138.7 292 152 292C158.6 292 164.6 294.7 168.9 299.1C173.3 303.4 176 309.4 176 316C176 338.1 193.9 356 216 356C238.1 356 256 373.9 256 396C256 418.1 273.9 436 296 436C318.1 436 336 453.9 336 476C397.6 461.3 446.4 416.7 467.5 358C459.1 352.9 448 350 436 350C405.1 350 380 324.9 380 294C380 263.1 405.1 238 436 238C448 238 459.1 240.9 467.5 246C466.5 197.8 444.6 154.7 408.8 124.9C405.4 126.9 401.3 128 397 128C380.4 128 367 114.6 367 98C367 90.5 369.8 83.7 374.3 78.5C338.9 69.1 301.7 64 256 64z"/>
                    </svg>
                  ) : st.icon === "trophy" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-[38px] h-[38px] fill-white shrink-0">
                      <path d="M400 0H176c-26.5 0-48 21.5-48 48v32H48C21.5 80 0 101.5 0 128v48c0 70.7 57.3 128 128 128h11.2c28.3 40.8 72.4 69.3 124.8 77.2V432h-48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144c17.7 0 32-14.3 32-32s-14.3-32-32-32h-48v-50.8c52.4-7.9 96.5-36.4 124.8-77.2H448c70.7 0 128-57.3 128-128v-48c0-26.5-21.5-48-48-48h-80V48c0-26.5-21.5-48-48-48zM128 240c-35.3 0-64-28.7-64-64v-32h64v96zm320-96h64v32c0 35.3-28.7 64-64 64v-96z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-[38px] h-[38px] fill-white shrink-0">
                      <path d="M316.9 18C311.6 7 300.4 0 288 0s-23.6 7-28.8 18L195 150.3 31.4 174.2c-12 1.8-21.5 10.9-24.3 22.7s2.5 24.1 13.5 32.5l118.4 90.7-28 163c-2 12 3 24.2 12.8 31.3s22.4 7.6 33.1 2L288 439.6l131.1 76.8c10.7 6.3 23.3 5.1 33.1-2s14.8-19.3 12.8-31.3l-28-163 118.4-90.7c11-8.4 16.3-20.7 13.5-32.5s-12.3-20.9-24.3-22.7L381 150.3 316.9 18z"/>
                    </svg>
                  )}
                </div>
                <h1 className="text-[34px] sm:text-[38px] font-bold text-[#c11f28] m-0 mb-1 leading-tight">
                  {st.value || st.number || st.stat}
                </h1>
                <h3 className="text-[16px] sm:text-[17px] font-semibold text-white m-0 tracking-normal">
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
