"use client";

import React from "react";
import { User, Clock, GraduationCap, IndianRupee } from "lucide-react";
import { ESGCI_STATS } from "./constants";

const ICON_MAP = {
  user: User,
  clock: Clock,
  cap: GraduationCap,
  rupee: IndianRupee,
};

export default function EsgciStats() {
  return (
    <section className="w-full bg-black text-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          {ESGCI_STATS.map((item) => {
            const Icon = ICON_MAP[item.type] || User;
            return (
              <div
                key={item.label}
                className="flex flex-col items-center justify-start px-2 sm:px-4"
              >
                {/* Yellow Icon */}
                <div className="text-[#ffd200] mb-2 sm:mb-2.5">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                </div>

                {/* Label */}
                <h3 className="text-[#ffd200] font-bold text-[14px] sm:text-[16px] m-0 mb-1">
                  {item.label}
                </h3>

                {/* Value */}
                <p className="text-white/90 text-[12.5px] sm:text-[13.5px] font-normal leading-snug m-0 max-w-[220px]">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

