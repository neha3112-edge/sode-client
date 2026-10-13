"use client";

import React from "react";
import Image from "next/image";

export default function SmuAbout({ about = {}, brand = {}, leader = null }) {
  const universityName = brand.name || "Sikkim Manipal University Online";
  const title = about.title || `About ${universityName}`;
  const imageSrc = about.image || brand.campusImage || "/assets/images/smu_hero_model.webp";
  const leaderData = leader || about.leader;

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean);

  return (
    <div id="about" className="w-full">
      <section className="w-full pt-10 sm:pt-14 pb-0 bg-transparent overflow-visible relative select-none">
        <div className="w-full bg-[#006372] relative overflow-visible">
          <div className="max-w-[1240px] xl:max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-8">
              {imageSrc && (
                <div className="w-[200px] sm:w-[230px] md:w-[260px] lg:w-[280px] shrink-0 -mt-10 sm:-mt-12 md:-mt-16 lg:-mt-20 relative z-10 self-center md:self-end">
                  <div className="relative w-full h-[280px] sm:h-[320px] md:h-[350px] lg:h-[380px]">
                    <Image
                      src={imageSrc}
                      alt={title}
                      fill
                      priority
                      className="object-contain object-bottom"
                      sizes="(max-width: 768px) 230px, 280px"
                    />
                  </div>
                </div>
              )}
              <div className="flex-1 py-8 sm:py-10 md:py-12 text-center text-white space-y-3.5 max-w-4xl mx-auto px-2">
                <h2 className="text-[22px] sm:text-[26px] lg:text-[30px] font-bold text-white tracking-tight leading-tight m-0 text-center">
                  {title}
                </h2>
                {paragraphs.length > 0 && (
                  <div className="space-y-3 text-[12px] sm:text-[12.5px] lg:text-[13px] text-white/95 leading-[1.65] font-normal text-center">
                    {paragraphs.map((p, idx) => (
                      <p key={idx} className="m-0 max-w-3xl mx-auto">
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
        <section className="w-full bg-white py-10 sm:py-14 lg:py-16">
          <div className="max-w-[1240px] xl:max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-8 space-y-4 sm:space-y-5 text-left">
                <h2 className="text-[22px] sm:text-[25px] lg:text-[28px] xl:text-[29px] font-bold text-[#111827] tracking-tight leading-[1.25]">
                  {leaderData.sectionTitle || (
                    <>The Visionary Leader Behind {universityName}</>
                  )}
                </h2>
                <p className="text-[13px] sm:text-[13.5px] lg:text-[14px] text-[#475467] leading-[1.7] font-normal max-w-2xl">
                  {leaderData.desc}
                </p>
                <div className="pt-3 sm:pt-4 space-y-0.5">
                  <h3 className="text-[15px] sm:text-[16px] font-bold text-[#074a76]">
                    {leaderData.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#074a76] font-medium m-0">
                    {leaderData.designation}
                  </p>
                </div>
              </div>
              {leaderData.image && (
                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[350px] aspect-[350/392] rounded-[16px] sm:rounded-[20px] overflow-hidden bg-[#eef1f5] shadow-xs">
                    <Image
                      src={leaderData.image}
                      alt={leaderData.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 320px, 350px"
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
