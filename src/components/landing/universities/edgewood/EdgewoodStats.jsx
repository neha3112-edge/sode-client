"use client";

import React from "react";
import { GraduationCap, Users, Award, BookOpen } from "lucide-react";
import { EDGEWOOD_STATS } from "./constants";

export default function EdgewoodStats() {
  const getIcon = (type) => {
    switch (type) {
      case "cap":
        return <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#b2171e]" />;
      case "users":
        return <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#b2171e]" />;
      case "cert":
        return <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#b2171e]" />;
      case "dual":
        return <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#b2171e]" />;
      default:
        return <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#b2171e]" />;
    }
  };

  return (
    <section className="w-full bg-[#b2171e] py-5 sm:py-6 text-white select-none shadow-inner">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {EDGEWOOD_STATS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 sm:gap-4 justify-start sm:justify-center"
            >
              {/* White Circle Icon */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md">
                {getIcon(item.icon)}
              </div>

              {/* Text content */}
              <div className="text-left">
                <div className="text-[20px] sm:text-[24px] font-black leading-none text-white">
                  {item.value}
                </div>
                <div className="text-[12px] sm:text-[13.5px] font-medium text-white/90 leading-tight mt-1">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

