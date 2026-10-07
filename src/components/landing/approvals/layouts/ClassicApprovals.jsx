"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function ClassicApprovals({
  approvals = [],
  activeTitle,
  bannerBg,
  brand = {},
  showTags = false,
}) {
  const cfg = brand?.approvalsConfig || {};
  const bg =
    cfg.background ||
    bannerBg ||
    brand?.approvalsBg ||
    brand?.primaryColor ||
    "#002147";

  return (
    <section
      id="approval"
      className="py-12 sm:py-16 text-white select-none scroll-mt-20"
      style={{ backgroundColor: bg }}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white tracking-tight mb-8 sm:mb-12 m-0">
          {activeTitle || brand?.approvalsTitle || "Recognitions & Accreditations"}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 sm:gap-8 justify-center">
          {approvals.map((appr, idx) => {
            const data = normalizeApprovalItem(appr, idx);
            return (
              <div
                key={data.id}
                className="bg-white/95 rounded-[12px] p-5 sm:p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow text-slate-900 text-center"
              >
                <div className="relative w-20 h-16 sm:w-24 sm:h-18 mb-3">
                  <Image
                    src={data.image}
                    alt={data.title || data.tag || "Approval"}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 m-0 line-clamp-2">
                  {data.title}
                </h3>
                {showTags && data.tag && (
                  <span className="mt-1.5 inline-block text-[11px] font-semibold text-[#074a76] bg-[#eef6fc] px-2.5 py-0.5 rounded-full">
                    {data.tag}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
