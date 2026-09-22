"use client";

import React from "react";
import Image from "next/image";

export default function AmityApprovals() {
  const approvalsList = [
    {
      image: "/assets/images/approvals/ugc_approval.png",
      text: "Approved by the University Grants Commission of India",
    },
    {
      image: "/assets/images/approvals/naac_a_plus.png",
      text: "NAAC Accredited with A+ Grade",
    },
    {
      image: "/assets/images/approvals/nirf_ranking.png",
      text: "Ranked 32nd in NIRF (National Institutional Ranking Framework)",
    },
    {
      image: "/assets/images/approvals/aicte_approval.png",
      text: "Approved by All India Council for Technical Education",
    },
    {
      image: "/assets/images/approvals/the_ranking.png",
      text: "Recognised by The World University Rankings (THE)",
    },
    {
      image: "/assets/images/approvals/qs_ranking.png",
      text: "Ranked by QS (Quacquarelli Symonds)",
    },
    {
      image: "/assets/images/approvals/wes_recognition.png",
      text: "Recognised by World Education Services (WES)",
    },
    {
      image: "/assets/images/approvals/wasc_accreditation.png",
      text: "Accredited by Western Association of Schools and Colleges (WASC)",
    },
  ];

  return (
    <section id="approvals" className="py-7 sm:py-9 bg-[#fffef5] border-b border-amber-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 sm:gap-y-7 gap-x-5 lg:gap-x-7 items-center">
          {approvalsList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5 group">
              {/* Official Circular Badge Logo */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 shadow-2xs rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-200">
                <Image
                  src={item.image}
                  alt={item.text}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>

              {/* Description Text */}
              <p className="text-xs sm:text-[13px] font-medium text-slate-800 leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
