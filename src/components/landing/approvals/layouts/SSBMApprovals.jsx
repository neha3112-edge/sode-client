"use client";

import React from "react";
import Image from "next/image";

export default function SSBMApprovals({ brand = {} }) {
  const accreditations = brand?.ssbmAccreditations || [
    { image: "/assets/all_universities_images/ssbm/acbsp-p.png", alt: "ACBSP" },
    { image: "/assets/all_universities_images/ssbm/chea-logo.png", alt: "CHEA" },
    { image: "/assets/all_universities_images/ssbm/bac.png", alt: "BAC" },
  ];
  const rankings = brand?.ssbmRankings || [
    { image: "/assets/all_universities_images/ssbm/ceoworld.png", alt: "CEOWorld Magazine" },
    { image: "/assets/all_universities_images/ssbm/postg.png", alt: "Postgrad" },
    { image: "/assets/all_universities_images/ssbm/swiss.png", alt: "Study in Switzerland" },
  ];

  return (
    <section
      id="accreditations"
      className="certification w-full py-12 sm:py-16 bg-[#f9f9f9] text-center select-none scroll-mt-20"
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <fieldset className="border border-slate-300 rounded-[8px] p-6 pt-4 text-center bg-white shadow-xs">
            <legend className="px-4 text-[17px] sm:text-[19px] font-bold text-[#111111] uppercase tracking-wide">
              Accreditations
            </legend>
            <div className="grid grid-cols-3 gap-4 items-center justify-center py-2">
              {accreditations.map((item, idx) => (
                <div key={item.alt || idx} className="relative w-full h-[65px] flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.alt || `Accreditation ${idx + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 30vw, 160px"
                  />
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="border border-slate-300 rounded-[8px] p-6 pt-4 text-center bg-white shadow-xs">
            <legend className="px-4 text-[17px] sm:text-[19px] font-bold text-[#111111] uppercase tracking-wide">
              Rankings
            </legend>
            <div className="grid grid-cols-3 gap-4 items-center justify-center py-2">
              {rankings.map((item, idx) => (
                <div key={item.alt || idx} className="relative w-full h-[65px] flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.alt || `Ranking ${idx + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 30vw, 160px"
                  />
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  );
}
