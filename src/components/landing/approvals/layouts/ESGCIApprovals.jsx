"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function ESGCIApprovals({ approvals = [], brand = {} }) {
  const sectionTitle = brand?.approvalsTitle || "APPROVALS AND ACCREDITATION";

  return (
    <section
      id="certification"
      className="certification w-full py-12 sm:py-16  text-center select-none scroll-mt-20"
      style={{ backgroundColor: brand?.approvalsBg }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <h2
          className="text-[#111111] text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-center m-0 uppercase tracking-tight mb-8"
          style={{ color: brand?.approvalsHeaderColor || "#111111" }}
        >
          {sectionTitle}
        </h2>
        <div className="b2-info grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {approvals.map((item, idx) => {
            const data = normalizeApprovalItem(item, idx);
            return (
              <div
                key={data.id}
                className="b1 bg-white p-6 rounded-[8px] border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col items-center text-center transition-all hover:-translate-y-1"
              >
                <div className="relative w-full h-20 mb-4 flex items-center justify-center">
                  <Image
                    src={data.image}
                    alt={data.title || "Approval"}
                    fill
                    className="object-contain"
                    sizes="180px"
                  />
                </div>
                <h3 className="text-[#111111] text-[16px] font-bold mb-2 leading-snug">
                  {data.title}
                </h3>
                <p className="text-[#555555] text-[13px] leading-relaxed m-0 font-normal">
                  {data.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
