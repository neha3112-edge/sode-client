"use client";

import React from "react";
import Image from "next/image";
import LandingContainer from "../LandingContainer";

export default function VguWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const cfg = brand.whyChooseConfig || {};
  const headerBg = brand.primaryColor || "#811811";
  const rawTitle =
    brand.whyChooseTitle ||
    `Why ${brand.name || "Vivekananda Global University Online"} is a Smart Choice for learners?`;

  // Render title matching reference: 3 lines on mobile (Image 2), 2 lines on desktop
  const renderTitle = () => {
    if (typeof rawTitle === "string" && rawTitle.includes("Vivekananda Global")) {
      return (
        <>
          {/* Mobile view lines matching Image 2 */}
          <span className="sm:hidden">
            <span className="block">Why Vivekananda Global</span>
            <span className="block">University Online is a Smart</span>
            <span className="block">Choice for learners?</span>
          </span>
          {/* Desktop / Tablet view lines */}
          <span className="hidden sm:block">
            <span className="block">Why Vivekananda Global University Online is a</span>
            <span className="block">Smart Choice for learners?</span>
          </span>
        </>
      );
    }
    if (typeof rawTitle === "string" && rawTitle.includes("\n")) {
      const lines = rawTitle.split("\n");
      return lines.map((line, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <br />}
          <span>{line}</span>
        </React.Fragment>
      ));
    }
    return rawTitle;
  };

  return (
    <section id="advantage" className="py-9 sm:py-12 bg-white border-b border-slate-200 select-none scroll-mt-20">
      <div id="Resources" className="sr-only"></div>
      <LandingContainer>
        <div className="flex justify-center mb-5 sm:mb-6 px-3">
          <div
            className={cfg.badgeClassName || "text-white px-4 sm:px-8 py-3.5 sm:py-4 text-center shadow-md w-full max-w-[360px] sm:max-w-[540px] lg:max-w-[620px] mx-auto rounded-[12px] sm:rounded-[14px]"}
            style={{
              backgroundColor: headerBg,
              borderRadius: "12px",
              ...cfg.badgeStyle,
            }}
          >
            <h2
              className={cfg.headerTitleClassName || "text-[17.5px] sm:text-[21px] lg:text-[24px] font-medium text-white tracking-[0.6px] leading-[1.32] m-0"}
              style={{ letterSpacing: "0.6px", fontWeight: 500 }}
            >
              {renderTitle()}
            </h2>
          </div>
        </div>

        {brand.whyChooseDescription && (
          <p className="text-center text-[12.5px] sm:text-[13px] text-[#4b5563] leading-[1.65] max-w-[1050px] mx-auto mb-8 sm:mb-10 font-normal px-4">
            Vivekananda Global University Online is the most trusted university by students because of its recognised approvals and job-ready curriculum. VGU University courses are <br className="hidden md:inline" />
            offered online with expert faculty, helpful resources like LMS that help students get strong knowledge and necessary skills, and a smooth Vivekananda Global University <br className="hidden md:inline" />
            course admissions process.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-12 gap-y-7 sm:gap-y-8 max-w-5xl mx-auto">
          {whyChoose.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group px-2">
              {item.image && (
                <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] mb-3 sm:mb-3.5 flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>
              )}
              <h3 className={cfg.titleClassName || "text-[17px] sm:text-[18px] font-medium text-slate-900 m-0 tracking-tight leading-snug mb-1.5"}>
                {item.title}
              </h3>
              <p className={cfg.descClassName || "text-[12.5px] sm:text-[13px] text-slate-600 leading-relaxed font-normal m-0 max-w-[310px]"}>
                {item.desc || item.description}
              </p>
            </div>
          ))}
        </div>
      </LandingContainer>
    </section>
  );
}

