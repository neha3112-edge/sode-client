"use client";

import React from "react";

export default function GalgotiasApprovals({ brand = {} }) {
  const items = [
    {
      img: "/assets/galgotias/ugc.webp",
      title: "UGC Entitled",
      desc: "Recognized by the University Grants Commission",
    },
    {
      img: "/assets/galgotias/naacA+.webp",
      title: "NAAC A+",
      desc: "Accredited by the National Assessment and Accreditation Council",
    },
    {
      img: "/assets/galgotias/NBA.webp",
      title: "NBA Accredited",
      desc: "National Board of Accreditation (NBA)",
    },
    {
      img: "/assets/galgotias/NIRF.webp",
      title: "NIRF Ranking",
      desc: "Ranked by National Institutional Ranking Framework (NIRF)",
    },
    {
      img: "/assets/galgotias/QS.webp",
      title: "QS Ranking",
      desc: "Globally ranked by QS World University Rankings",
    },
    {
      img: "/assets/galgotias/THE.webp",
      title: "THE Ranking",
      desc: "Ranked by the Times Higher Education Asia University Rankings",
    },
  ];

  return (
    <section id="approvals" className="py-8 sm:py-10 bg-[#f9bc08] select-none scroll-mt-20">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <h1 className="text-[22px] sm:text-[26px] md:text-[28px] font-bold text-center text-[#111111] mb-8 sm:mb-10 m-0">
          Accreditations & Approvals of Galgotias University online
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5 sm:gap-4 text-left">
              <div className="w-[72px] h-[72px] sm:w-[80px] sm:h-[80px] rounded-full bg-white p-2.5 shrink-0 flex items-center justify-center shadow-xs">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-[#811811] font-bold text-[18px] sm:text-[20px] m-0 mb-1 leading-snug">
                  {item.title}
                </h2>
                <p className="text-black text-[13px] sm:text-[14px] leading-[1.3] m-0 font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
