"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function SmuApprovals({ approvals = [], title, subtitle, brand = {} }) {
  const [index, setIndex] = useState(0);
  const total = approvals.length;

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, total]);

  const visibleApprovals = [
    approvals[index],
    approvals[(index + 1) % total],
    approvals[(index + 2) % total],
  ].filter(Boolean);

  const displayTitle = title || brand?.approvalsTitle || "Rankings & Accreditations";

  return (
    <section id="approval" className="w-full py-10 sm:py-14 bg-white border-b border-slate-100 select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight m-0">
            {displayTitle}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-[13px] text-slate-600 mt-2 leading-relaxed font-normal m-0">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous approval"
            className="absolute -left-2 sm:-left-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            {visibleApprovals.map((appr, idx) => {
              const data = normalizeApprovalItem(appr, idx);
              return (
                <div
                  key={data.id}
                  className="bg-white rounded-[12px] p-6 border border-slate-200/90 shadow-xs flex flex-col items-center text-center transition-all hover:shadow-md"
                >
                  <div className="relative w-24 h-20 mb-3 flex items-center justify-center">
                    <Image
                      src={data.image}
                      alt={data.title || "Approval"}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 m-0">
                    {data.title}
                  </h3>
                  {data.tag && (
                    <span className="mt-1.5 inline-block text-[11px] font-semibold text-[#074a76] bg-[#eef6fc] px-2.5 py-0.5 rounded-full">
                      {data.tag}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next approval"
            className="absolute -right-2 sm:-right-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
