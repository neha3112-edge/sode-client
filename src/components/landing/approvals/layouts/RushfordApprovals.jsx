"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function RushfordApprovals({ approvals = [], brand = {} }) {
  const sectionTitle = brand?.approvalsTitle || "Accreditation & Collaboration";
  const sectionSubtitle = brand?.approvalsSubtitle || "Rushford Business School, Switzerland";

  return (
    <section
      id="accreditations"
      className="certification w-full py-12 sm:py-16 bg-white text-center select-none scroll-mt-20"
      style={{ backgroundColor: brand?.approvalsBg || "#ffffff" }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <h2 className="text-[#111111] text-[24px] sm:text-[30px] lg:text-[34px] font-bold text-center m-0 tracking-tight mb-2">
          {sectionTitle}
        </h2>
        {sectionSubtitle && (
          <p className="text-[15px] sm:text-[17px] text-[#555555] mb-8 font-medium">
            {sectionSubtitle}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {approvals.map((item, idx) => {
            const data = normalizeApprovalItem(item, idx);
            return (
              <div
                key={data.id}
                className="bg-white p-5 rounded-[10px] border-2 border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-md"
              >
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                  <Image
                    src={data.image}
                    alt={data.title || "Approval"}
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h3 className="text-[#111111] text-[16px] font-bold mb-1.5 leading-snug">
                    {data.title}
                  </h3>
                  <p className="text-[#555555] text-[13px] leading-relaxed m-0">
                    {data.description}
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
