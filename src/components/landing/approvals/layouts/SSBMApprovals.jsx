"use client";

import React from "react";

export default function SSBMApprovals({ brand = {} }) {
  const accreditations = brand?.ssbmAccreditations || [
    {
      image: "/assets/all_universities_images/ssbm/acbsp-p.png",
      alt: "ACBSP",
      desktopMaxHeight: "54px",
      mobileMaxHeight: "78px",
    },
    {
      image: "/assets/all_universities_images/ssbm/chea-logo.png",
      alt: "CHEA",
      desktopMaxHeight: "40px",
      mobileMaxHeight: "52px",
    },
    {
      image: "/assets/all_universities_images/ssbm/bac.png",
      alt: "BAC",
      desktopMaxHeight: "48px",
      mobileMaxHeight: "64px",
    },
  ];
  const rankings = brand?.ssbmRankings || [
    {
      image: "/assets/all_universities_images/ssbm/ceoworld.png",
      alt: "CEOWorld Magazine",
      desktopMaxHeight: "36px",
      mobileMaxHeight: "48px",
    },
    {
      image: "/assets/all_universities_images/ssbm/postg.png",
      alt: "Postgrad",
      desktopMaxHeight: "26px",
      mobileMaxHeight: "36px",
    },
    {
      image: "/assets/all_universities_images/ssbm/swiss.png",
      alt: "Study in Switzerland",
      desktopMaxHeight: "38px",
      mobileMaxHeight: "52px",
    },
  ];

  return (
    <section
      id="accreditations"
      className="accreditation-container w-full py-10 sm:py-16 bg-[#f1f1f1] text-center select-none scroll-mt-20"
    >
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <h2 className="main-title text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold text-[#000000] mb-7 sm:mb-9 tracking-tight">
          Accreditations <span className="text-[#b32a25]">&</span>
          <br className="block sm:hidden" />
          <span className="text-[#b32a25]"> Rankings</span>
        </h2>

        <div className="content-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-[340px] md:max-w-none mx-auto">
          {/* Accreditations Box */}
          <fieldset className="border-box border-[1.5px] border-[#b32a25] rounded-[18px]  px-5 sm:px-8 py-7 sm:py-6 relative">
            <legend className="px-3.5 text-[16px] sm:text-[16px] font-bold text-[#111111] capitalize tracking-normal mx-auto ">
              Accreditations
            </legend>
            <div className="logo-group flex flex-col md:flex-row items-center justify-center md:justify-around gap-7 md:gap-6 h-auto md:h-[80px]">
              {accreditations.map((item, idx) => (
                <div
                  key={item.alt || idx}
                  className="w-full md:flex-1 flex items-center justify-center h-auto md:h-full py-1 md:py-0"
                >
                  <img
                    src={item.image}
                    alt={item.alt || `Accreditation ${idx + 1}`}
                    style={{
                      maxHeight: item.mobileMaxHeight || item.desktopMaxHeight || "54px",
                    }}
                    className="max-w-[85%] md:max-w-full w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </fieldset>

          {/* Rankings Box */}
          <fieldset className="border-box border-[1.5px] border-[#b32a25] rounded-[18px] px-5 sm:px-8 py-7 sm:py-6 relative">
            <legend className="px-3.5 text-[16px] sm:text-[16px] font-bold text-[#111111] capitalize tracking-normal mx-auto ">
              Rankings
            </legend>
            <div className="logo-group custom_img_group flex flex-col md:flex-row items-center justify-center md:justify-around gap-7 md:gap-6 h-auto md:h-[80px]">
              {rankings.map((item, idx) => (
                <div
                  key={item.alt || idx}
                  className="w-full md:flex-1 flex items-center justify-center h-auto md:h-full py-1 md:py-0"
                >
                  <img
                    src={item.image}
                    alt={item.alt || `Ranking ${idx + 1}`}
                    style={{
                      maxHeight: item.mobileMaxHeight || item.desktopMaxHeight || "40px",
                    }}
                    className="max-w-[85%] md:max-w-full w-auto object-contain"
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
