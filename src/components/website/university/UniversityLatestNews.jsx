"use client";

import React from "react";

export default function UniversityLatestNews({ news = [] }) {
  if (!Array.isArray(news) || news.length === 0) return null;

  return (
    <div className="bg-[#ebf4ff] border border-blue-200/80 rounded-3xl p-6 sm:p-7 shadow-xs">
      <h3 className="text-xl sm:text-2xl font-extrabold text-[#112959] text-center tracking-tight">
        Latest News
      </h3>
      <div className="border-b border-blue-200/80 my-4" />

      <div className="space-y-4">
        {news.map((item, idx) => (
          <div
            key={item._id || idx}
            className="text-xs sm:text-[13px] md:text-[13.5px] font-semibold text-[#163366] leading-relaxed"
          >
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-blue-700 transition-colors inline"
              >
                {item.title}
              </a>
            ) : (
              <span>{item.title}</span>
            )}
            {item.isNewBadge !== false && (
              <span className="inline-flex items-center px-2 py-0.5 ml-2 text-[10px] sm:text-[11px] font-bold text-white uppercase bg-gradient-to-r from-amber-500 to-orange-500 rounded-[4px] shadow-[0_2px_8px_rgba(245,158,11,0.45)] align-middle">
                New
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

