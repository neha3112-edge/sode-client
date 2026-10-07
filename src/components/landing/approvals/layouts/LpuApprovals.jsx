"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function LpuApprovals({ approvals = [], brand = {} }) {
  const title = brand?.approvalsTitle || "Accreditations & Approvals";
  const uniName = brand?.name || "LPU University";

  return (
    <section id="approval" className="w-full bg-[#4d4d4d] text-white py-12 sm:py-16 px-4 sm:px-6 scroll-mt-20">
      <div className="max-w-[1360px] mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold tracking-tight m-0 mb-8 sm:mb-12">
          <span className="text-[#f58220]">{uniName} </span>
          <span className="text-white">{title}</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-12">
          {approvals.map((appr, idx) => {
            const data = normalizeApprovalItem(appr, idx);
            return (
              <div key={data.id} className="flex flex-col items-center min-w-[130px] sm:min-w-[150px]">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center p-3 shadow-md">
                  <Image
                    src={data.image}
                    alt={data.title || "Approval"}
                    fill
                    className="object-contain p-2.5"
                    sizes="128px"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm sm:text-base font-extrabold text-white leading-tight m-0">
                    {data.title}
                  </p>
                  {data.tag && (
                    <p className="text-xs font-semibold text-slate-300 mt-0.5 m-0 uppercase tracking-wider">
                      {data.tag}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
