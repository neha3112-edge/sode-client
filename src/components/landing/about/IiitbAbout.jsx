"use client";

import React from "react";
import Image from "next/image";

/**
 * IIIT Bangalore - Custom About Section
 * Matches reference layout: Blue background (#005a8d), tall building image,
 * white title with underline divider, white body copy,
 * and action buttons: "Request Call Back" (red) and "Get 1:1 FREE Counseling" (bordered).
 */
export default function IiitbAbout({ about = {}, brand = {}, onOpenApply }) {
  const title = about.title || "About IIIT Bangalore \nOnline Courses";
  const imageSrc =
    about.image ||
    brand.campusImage ||
    "/assets/all_universities_images/iiitb/iiit-b-about-image.webp";

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  return (
    <section
      id="about-section"
      className="about-section w-full relative select-none scroll-mt-20 bg-[#005a8d] text-white p-0 lg:pr-5 lg:pl-0 lg:py-0"
      style={{ backgroundColor: "#005a8d" }}
    >
      <div className="about-container w-full max-w-full lg:max-w-[1200px] lg:ml-0 lg:mr-auto mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 lg:gap-10 items-center px-4 py-8 lg:p-0">
        {/* Left Image */}
        {imageSrc && (
          <div className="about-image w-full flex items-center justify-center lg:justify-start">
            <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[500px] rounded-[6px] lg:rounded-none overflow-hidden">
              <Image
                src={imageSrc}
                alt={title.replace("\n", " ")}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
          </div>
        )}

        {/* Right Content */}
        <div className="about-content w-full text-left lg:py-6">
          <h2 className="text-[28px] sm:text-[30px] lg:text-[36px] font-extrabold tracking-tight m-0 mb-2.5 leading-[1.2] text-white whitespace-pre-line">
            {title}
          </h2>

          <div className="underline w-full lg:w-[80%] h-[1px] bg-white mb-4 lg:mb-5" />

          {paragraphs.length > 0 && (
            <div className="space-y-3.5 mb-5 text-[14px] lg:text-[15px] leading-[1.6] font-normal text-[#e8f1f8]">
              {paragraphs.map((p, idx) => (
                <p key={idx} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="about-actions flex flex-row items-center gap-2.5 sm:gap-3.5 pt-1 w-full">
            <button
              type="button"
              onClick={() => onOpenApply?.(null, "Request Call Back")}
              className="btn red flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3 py-2.5 sm:px-5 sm:py-3 bg-[#ba0000] hover:bg-[#990000] active:scale-95 text-white font-semibold text-[12px] sm:text-[14px] rounded-[6px] transition-all cursor-pointer shadow-none border-none select-none text-center whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" aria-hidden="true">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
              </svg>
              <span>Request Call Back</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenApply?.(null, "Get 1:1 FREE Counseling")}
              className="btn outline flex-1 sm:flex-initial inline-flex items-center justify-center px-2.5 py-2.5 sm:px-5 sm:py-3 bg-transparent hover:bg-white/10 active:scale-95 text-white font-semibold text-[11.5px] sm:text-[14px] rounded-[6px] border border-white transition-all cursor-pointer shadow-none select-none text-center whitespace-nowrap"
            >
              <span>Get 1:1 FREE Counseling</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
