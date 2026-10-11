"use client";

import React from "react";
import Image from "next/image";

const CU_APPROVALS = [
  {
    image: "/assets/cu/naac-approvals.png",
    title: "National Assessment and Accreditation Council (NAAC A+)",
  },
  {
    image: "/assets/cu/ugc-approvals.png",
    title: "University Grants Commission (UGC)",
  },
  {
    image: "/assets/cu/nirf-approvals.png",
    title: "National Institutional Ranking Framework (NIRF)",
  },
  {
    image: "/assets/cu/WES-approvals.png",
    title: "World Education Services (WES)",
  },
];

export default function CuApprovals({ approvals = [], brand = {} }) {
  const list = approvals.length >= 4 ? approvals : CU_APPROVALS;

  return (
    <section id="approvals" className="py-12 sm:py-16 bg-[#e6e6e6] select-none scroll-mt-20">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[28px] sm:text-[36px] font-bold text-[#d11c1f] m-0 mb-8 sm:mb-10 leading-tight">
          CU Online <span className="text-black font-bold">Awards & Recognition</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-md sm:max-w-none mx-auto">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[22px] p-4 sm:p-5 lg:p-6 shadow-[0_4px_18px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center min-h-[195px] sm:min-h-[215px] lg:min-h-[230px] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="relative w-full h-24 sm:h-28 lg:h-[105px] flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title || item.text || "Approval"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <p className="text-xs sm:text-[13.5px] font-medium text-slate-800 m-0 mt-2 sm:mt-2.5 leading-snug max-w-[220px]">
                {item.title || item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
