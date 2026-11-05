"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function UuWhyChoose({ whyChoose = [], brand = {}, onOpenApply }) {
  const title = brand.whyChooseTitle || `${brand.name || "Uttaranchal University"} Benefits in the`;
  const highlight = brand.whyChooseHighlight || "Online Degree Programs";
  const description =
    brand.whyChooseDescription ||
    "Uttaranchal University Online courses are UGC-Entitled offers the convenience & flexibility of online education with the equivalency of a conventional, on-campus degree. Through Uttaranchal University Online, leading international faculty, it offer world-class education in a true sense.";
  const studentImage = brand.whyChooseStudentImage || "/assets/all_universities_images/uu/image-2nd.webp";
  const btnText = brand.whyChooseButtonText || brand.whyChooseBtnText || "Apply Now";
  const bg = brand.whyChooseBg || brand.primaryColor || "#0A3C7D";
  const accentColor = brand.accentColor || "#62B239";

  // Exact 6 items matching reference site
  const resolvedItems = whyChoose.length > 0 ? whyChoose : [
    {
      title: "Online Live Lectures",
      image: "/assets/all_universities_images/uu/Live-Lectures-uttranchal.webp",
    },
    {
      title: "Personalised Mentorship",
      image: "/assets/all_universities_images/uu/mentorship.png",
    },
    {
      title: "Recorded Video Content",
      image: "/assets/all_universities_images/uu/recorded-Video-Content.webp",
    },
    {
      title: "Placement Support",
      image: "/assets/all_universities_images/uu/placements-support.webp",
    },
    {
      title: "Learning Flexibility",
      image: "/assets/all_universities_images/uu/learning-Flexibility.webp",
    },
    {
      title: "International Collaborations",
      image: "/assets/all_universities_images/uu/international-collaboration.webp",
    },
  ];

  return (
    <section
      id="whychoose"
      data-section="whychoose"
      className="w-full select-none py-8 sm:py-10 md:py-12 scroll-mt-20 text-white"
      style={{
        backgroundColor: bg,
        fontFamily: "'Poppins', var(--font-poppins), sans-serif",
      }}
    >
      <div className="uu-container w-full mx-auto box-border">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-y-6 md:gap-y-0">
          {/* Spacer on Desktop/Laptop to match Bootstrap col-md-1 (8.33%) */}
          <div className="hidden md:block md:col-span-1" />

          {/* Left: Student Image (Bootstrap col-md-5 equivalent) */}
          <div className="col-span-1 md:col-span-5 flex justify-center md:justify-start">
            <div className="relative w-full max-w-[320px] sm:max-w-[350px] md:max-w-[365px] lg:max-w-[380px]">
              <Image
                src={studentImage}
                alt={title}
                width={503}
                height={600}
                className="w-full h-auto rounded-[20px] object-cover"
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 350px, 380px"
                priority
              />
            </div>
          </div>

          {/* Right: Content Column (Bootstrap col-md-6 equivalent) */}
          <div className="col-span-1 md:col-span-6 flex flex-col justify-center text-left pl-0 md:pl-3 lg:pl-5">
            {/* Heading: Exact font, size, weight, tracking, leading matching Image 1 */}
            <h2
              className="text-[20px] sm:text-[23px] md:text-[25px] lg:text-[28px] font-semibold text-white tracking-normal leading-[1.2] m-0 mb-3 text-left"
              style={{
                fontFamily: "'Poppins', var(--font-poppins), sans-serif",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#ffffff",
              }}
            >
              {/* Mobile (< sm): 3 lines */}
              <span className="block sm:hidden">
                <span className="block">Uttaranchal University</span>
                <span className="block">
                  Benefits in the{" "}
                  <span style={{ color: accentColor }}>Online Degree</span>
                </span>
                <span className="block" style={{ color: accentColor }}>
                  Programs
                </span>
              </span>

              {/* Laptop & Desktop (>= sm): exact 2 lines from reference Image 1 */}
              <span className="hidden sm:inline">
                Uttaranchal University Benefits in
                <br className="hidden sm:block" />
                the{" "}
                <span style={{ color: accentColor }}>Online Degree Programs</span>
              </span>
            </h2>

            {/* Paragraph: Exact 13px font, line-height 1.5, justified on desktop */}
            {description && (
              <p
                className="whychoose-desc text-[12.5px] sm:text-[13px] text-white font-normal leading-[1.5] md:text-justify m-0 mb-4 sm:mb-5 max-w-[500px]"
                style={{
                  fontFamily: "'Poppins', var(--font-poppins), sans-serif",
                  fontSize: "13px",
                  lineHeight: 1.5,
                  color: "#ffffff",
                }}
              >
                {description}
              </p>
            )}

            {/* 2-Column Features Grid: 3 rows x 2 columns matching Image 1 & 2 */}
            <div className="grid grid-cols-2 gap-x-3 sm:gap-x-6 lg:gap-x-8 gap-y-2.5 sm:gap-y-3 mb-4 sm:mb-5 max-w-[500px]">
              {resolvedItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  {item.image && (
                    <div className="relative w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] shrink-0 flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={28}
                        height={28}
                        className="w-full h-full object-contain"
                        sizes="32px"
                      />
                    </div>
                  )}
                  <span
                    className="whychoose-item-title text-[11.5px] sm:text-[12.5px] lg:text-[13px] font-medium text-white leading-tight truncate sm:whitespace-nowrap"
                    style={{
                      fontFamily: "'Poppins', var(--font-poppins), sans-serif",
                      fontWeight: 500,
                      color: "#ffffff",
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Apply Now Button: Exact 1:1 match with Image 1 & 2 (100px width, 25px height, 12px font) */}
            <div>
              <button
                type="button"
                onClick={() => onOpenApply?.()}
                className="whychoose-apply-btn inline-flex items-center gap-2 px-[22px] py-[7px] text-white font-medium text-[12px] rounded-[5px] transition-colors border-none cursor-pointer select-none active:scale-95 shadow-none"
                style={{
                  backgroundColor: accentColor,
                  fontFamily: "'Poppins', var(--font-poppins), sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                }}
              >
                <span>{btnText}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
