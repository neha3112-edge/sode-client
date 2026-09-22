"use client";

import React from "react";
import { Building2, GraduationCap, Users, BookOpen } from "lucide-react";

const ICON_MAP = {
  building: Building2,
  graduation: GraduationCap,
  users: Users,
  book: BookOpen,
};

export default function LandingStats({ stats = [] }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="bg-[#08417b] py-6 sm:py-8 text-white border-y border-[#063366]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
          {stats.map((st, idx) => {
            const Icon = ICON_MAP[st.iconType] || Building2;
            const circleBg = st.circleBg || "bg-[#ffc107]";
            return (
              <div key={idx} className="flex items-center gap-3.5 group">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${circleBg} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-none tracking-tight">
                    {st.number}
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/90 font-medium leading-tight mt-1">
                    {st.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
