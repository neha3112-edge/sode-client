"use client";

import React from "react";
import Image from "next/image";

export default function SmuAbout({ about = {}, brand = {}, leader = null }) {
  const universityName = brand.name || "Sikkim Manipal University Online";
  const title = about.title || `About ${universityName}`;
  const imageSrc =
    about.image ||
    brand.aboutImage ||
    brand.campusImage ||
    "/assets/all_universities_images/all_universities_images/smu/finance-smu.png";
  const leaderData = leader || about.leader;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  const titleText = about.title || brand.aboutTitle || title;
  const titleLines = typeof titleText === "string" ? titleText.split("\n") : [titleText];

  return (
    <div id="about" className="w-full">
      <section className="w-full pt-16 sm:pt-20 md:pt-28 lg:pt-32 pb-0 bg-transparent overflow-visible relative select-none">
        <div className="w-full bg-[#006372] relative overflow-visible shadow-sm">
          <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-2 sm:px-6 lg:px-10 relative overflow-visible">
            <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between relative min-h-[380px] lg:min-h-[440px]">
              {imageSrc && (
                <div className="hidden md:block w-[260px] md:w-[300px] lg:w-[350px] xl:w-[380px] shrink-0 relative">
                  <div className="absolute bottom-0 left-0 w-full h-[460px] md:h-[520px] lg:h-[580px] xl:h-[620px] pointer-events-none z-10">
                    <Image
                      src={imageSrc}
                      alt={title}
                      fill
                      priority
                      className="object-contain object-bottom"
                      sizes="(max-width: 1024px) 350px, 390px"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1 py-12 sm:py-14 md:py-16 lg:py-20 text-center text-white max-w-4xl xl:max-w-5xl mx-auto px-2 sm:px-6 relative z-0 flex flex-col justify-center">
                <h2 className={brand.aboutTitleClassName || about.titleClassName || "text-[20px] min-[390px]:text-[21.5px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-semibold text-white tracking-normal leading-[1.3] m-0 mb-5 sm:mb-6 text-center"}>
                  {titleLines.map((line, idx) => (
                    <span
                      key={idx}
                      className={`block ${idx === 0 ? "whitespace-nowrap" : ""}`}
                    >
                      {line}
                    </span>
                  ))}
                </h2>
                {paragraphs.length > 0 && (
                  <div className={brand.aboutParagraphsClassName || about.paragraphsClassName || "text-[15px] sm:text-[16px] lg:text-[17px] text-white leading-[1.7] font-normal text-center tracking-normal space-y-6 sm:space-y-7 max-w-3xl xl:max-w-4xl mx-auto px-1 sm:px-4"}>
                    {paragraphs.map((p, idx) => (
                      <p
                        key={idx}
                        className={brand.aboutParagraphClassName || about.paragraphClassName || "m-0"}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {leaderData && (
        <section className="w-full bg-white py-10 sm:py-14 lg:py-20 border-b border-slate-100">
          <div className="max-w-[1536px] 2xl:max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center">
              <div className="lg:col-span-8 space-y-3.5 sm:space-y-4.5 text-center lg:text-left order-2 lg:order-1">
                <h2 className="text-[24px] sm:text-[28px] lg:text-[34px] font-bold text-black tracking-tight leading-[1.25] m-0 text-center lg:text-left">
                  <span className="block lg:inline">The Visionary Leader Behind </span>
                  <span className="block lg:inline">Sikkim Manipal University </span>
                  <span className="block lg:inline">Online</span>
                </h2>
                <p className="text-[15px] sm:text-[15.5px] lg:text-[16.5px] text-black leading-[1.75] font-normal max-w-4xl xl:max-w-5xl mx-auto lg:mx-0 text-center lg:text-left m-0 px-1 sm:px-0">
                  {leaderData.desc}
                </p>
                <div className="!mt-7 sm:!mt-8 space-y-1 text-center lg:text-left">
                  <h3 className={brand.leaderNameClassName || about.leaderNameClassName || "text-[16.5px] sm:text-[18px] font-medium text-[#006372] m-0"}>
                    {leaderData.name}
                  </h3>
                  <p className={brand.leaderDesignationClassName || about.leaderDesignationClassName || "text-[13.5px] sm:text-[14.5px] text-[#006372] font-medium m-0"}>
                    {leaderData.designation}
                  </p>
                </div>
              </div>
              {leaderData.image && (
                <div className="lg:col-span-4 flex justify-center lg:justify-end order-1 lg:order-2">
                  <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] aspect-[350/390] rounded-[20px] overflow-hidden bg-[#eef1f5] shadow-md border border-slate-100">
                    <Image
                      src={leaderData.image}
                      alt={leaderData.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 320px, 380px"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
