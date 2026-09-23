"use client";

import React from "react";
import { BookOpen } from "lucide-react";

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

export default function LandingStats({ stats = [] }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="bg-[#08417b] py-8 sm:py-12 lg:py-14 text-white border-y border-[#063366] transition-colors">
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
