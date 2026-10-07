"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function LiverpoolApprovals({ approvals = [], brand = {} }) {
  const heading = brand?.approvalsTitle || "APPROVALS & RECOGNITION";
  const subHeading = brand?.approvalsSubtitle || "OF ONLINE LIVERPOOL BUSINESS SCHOOL";

  return (
    <section id="certification" className="w-full py-12 sm:py-16 bg-white select-none scroll-mt-20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <h2 className="text-[24px] sm:text-[30px] font-bold text-left text-[#111111] mb-8 leading-tight m-0">
          {heading} <br />
          <span className="text-[#00408d]">{subHeading}</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {approvals.map((appr, idx) => {
            const data = normalizeApprovalItem(appr, idx);
            return (
              <div
                key={data.id}
                className="b1 flex items-center justify-center p-4 bg-white rounded-[8px] border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-full max-w-[280px] h-[90px]">
                  <Image
                    src={data.image}
                    alt={data.title || `Approval ${idx + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
