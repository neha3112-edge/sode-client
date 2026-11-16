"use client";

import React from "react";
import { PhoneCall } from "lucide-react";

export default function IiitbNeedClarification({ onOpenApply }) {
  return (
    <section className="w-full bg-[#005a8d] py-7 sm:py-8 text-white select-none">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Text */}
          <div>
            <h3 className="text-[20px] sm:text-[24px] font-black text-white m-0 leading-tight">
              Need clarification?
            </h3>
            <p className="text-white/90 text-[13px] sm:text-[14px] m-0 mt-1 font-normal">
              Interact with experts, Get free consultation.
            </p>
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={() => onOpenApply?.("Need Clarification", "Talk to Experts")}
            className="py-3 px-7 rounded-full bg-white hover:bg-neutral-100 text-[#005a8d] font-bold text-[13.5px] sm:text-[14px] flex items-center justify-center gap-2 border-none shadow-md cursor-pointer active:scale-98 transition-all shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Talk to Experts</span>
          </button>
        </div>
      </div>
    </section>
  );
}

