"use client";

import React from "react";
import { Building2, GraduationCap, Users, BookOpen } from "lucide-react";

export default function AmityStats() {
  const stats = [
    {
      number: "30+",
      label: "Year Excellence",
      icon: Building2,
      circleBg: "bg-[#ffc107]",
    },
    {
      number: "500+",
      label: "Hiring Partners",
      icon: GraduationCap,
      circleBg: "bg-[#2196f3]",
    },
    {
      number: "82K+",
      label: "Online Learners",
      icon: Users,
      circleBg: "bg-[#4caf50]",
    },
    {
      number: "60+",
      label: "In-Demand Specialization",
      icon: BookOpen,
      circleBg: "bg-[#e91e63]",
    },
  ];

  return (
    <section className="bg-[#08417b] py-6 sm:py-8 text-white border-y border-[#063366]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
          {stats.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="flex items-center gap-3.5 group">
                {/* Colored Circle Icon */}
                <div
                  className={`w-13 h-13 sm:w-15 sm:h-15 rounded-full ${st.circleBg} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>

                {/* Number & Label */}
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white leading-none tracking-tight">
                    {st.number}
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/95 font-medium leading-tight mt-1">
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
