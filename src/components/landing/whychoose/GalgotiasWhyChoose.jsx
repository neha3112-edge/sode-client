"use client";

import React from "react";

const GALGOTIAS_ICONS = [
  // Faculty
  <svg key="0" className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 2H7c-1.2 0-2 .8-2 2v16c0 1.2.8 2 2 2h12c1.2 0 2-.8 2-2V4c0-1.2-.8-2-2-2zm-7 8l-2-1.5L8 10V4h4v6zm7 10H7V4h1v8l3-2.25L14 12V4h5v16z" />
  </svg>,
  // Assistant / AI
  <svg key="1" className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="9" cy="7" r="2.5" />
    <path d="M12.5 13.5c-.8-.5-1.9-.8-3.5-.8-2.2 0-4.5 1.1-4.5 3.3V18h8v-4.5z" />
    <path d="M14 9h7c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1h-2v1.5h1.5v1h-6v-1H16V17h-2c-.6 0-1-.4-1-1v-6c0-.6.4-1 1-1zm6 6v-4h-5v4h5z" />
  </svg>,
  // Mediums / LMS
  <svg key="2" className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="6" r="2.5" />
    <path d="M21 17.5c-2.3-.9-4.8-.9-7.1-.2L12 18l-1.9-.7C7.8 16.6 5.3 16.6 3 17.5V11c2.3-.9 4.8-.9 7.1-.2L12 11.5l1.9-.7c2.3-.7 4.8-.7 7.1.2v6.5z" />
  </svg>,
  // Curriculum / Industry-aligned
  <svg key="3" className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a9 9 0 00-9 9v4a3 3 0 003 3h1a1 1 0 001-1v-5a1 1 0 00-1-1H5v-1a7 7 0 0114 0v1h-2a1 1 0 00-1 1v5a1 1 0 001 1h1a3 3 0 003-3v-4a9 9 0 00-9-9z" />
    <circle cx="15" cy="19" r="1.5" />
  </svg>,
  // Advisor / Mentor
  <svg key="4" className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
  </svg>,
  // Support / Generic
  <svg key="5" className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="10" cy="7" r="3" />
    <path d="M10 12c-3.3 0-6 1.8-6 4v2h8.2c-.1-.5-.2-1-.2-1.5 0-1.6.8-3.1 2.1-4.1-.9-.3-2.5-.4-4.1-.4z" />
    <path d="M18 13l-4 1.8v2.7c0 2.5 1.7 4.8 4 5.5 2.3-.7 4-3 4-5.5v-2.7L18 13z" />
  </svg>,
];

export default function GalgotiasWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const sectionTitle = brand.whyChooseTitle || `Advantages of ${brand.name || "Galgotias University Online"}`;
  const primaryColor = brand.primaryColor || "#002b49";

  return (
    <section id="whyChoose" className="py-12 sm:py-16 bg-white select-none">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28">
        <h2
          className="text-2xl sm:text-3xl lg:text-[32px] font-black text-center tracking-tight leading-tight m-0 mb-8 sm:mb-12"
          style={{ color: primaryColor }}
        >
          {sectionTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-hidden rounded-2xl">
          {whyChoose.map((item, idx) => {
            const isLightBlue = idx === 0 || idx === 2 || idx === 4;
            const icon = GALGOTIAS_ICONS[idx] || GALGOTIAS_ICONS[5];

            return (
              <div
                key={idx}
                className={`p-7 sm:p-9 lg:p-10 flex flex-col items-center text-center space-y-3 transition-colors ${
                  isLightBlue ? "bg-[#f0f7fd]" : "bg-white"
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center shrink-0" style={{ color: primaryColor }}>
                  {icon}
                </div>
                <h3
                  className="text-[16.5px] sm:text-[18px] font-bold m-0 tracking-tight leading-snug"
                  style={{ color: primaryColor }}
                >
                  {item.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] text-slate-700 leading-relaxed font-normal m-0 max-w-sm">
                  {item.desc || item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
