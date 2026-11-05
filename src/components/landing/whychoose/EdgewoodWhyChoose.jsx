"use client";

import React from "react";
import Image from "next/image";

export default function EdgewoodWhyChoose({
  whyChoose = [],
  brand = {},
}) {
  const defaultItems = [
    {
      title: "Optional On-Campus Immersion",
      desc: "Experience U.S. campus learning through optional immersion, workshops, faculty meets, and academic resources onsite support.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Online Networking Gala",
      desc: "Join online networking galas to meet peers, alumni, mentors, and industry leaders worldwide and expand your professional network.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Stakeholder Influence",
      desc: "Build stakeholder influence by negotiating confidently, managing expectations, presenting data, and leading change initiatives effectively.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Conduct Applied Doctoral Research",
      desc: "Conduct applied doctoral research using evidence-based methods, solving business problems with measurable outcomes for organisations.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Expert Faculty",
      desc: "Learn from expert faculty who guide projects, share industry insights, and support academic progress personally to help learner gain the skills they need.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Nationally Recognized",
      desc: "Earn a nationally recognized U.S. qualification that enhances credibility, promotion prospects, and global mobility faster.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
  ];

  const items = Array.isArray(whyChoose) && whyChoose.length > 0 ? whyChoose : defaultItems;
  const title = brand.whyChooseTitle || "LEARNING OUTCOMES OF";
  const subtitle = brand.whyChooseSubtitle || "Edgewood University Online";

  return (
    <section id="whychoose" className="py-14 sm:py-20 px-4 sm:px-8 bg-[#b30000] text-white select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-[26px] sm:text-[32px] font-extrabold uppercase tracking-wide text-white m-0">
            {title}
          </h2>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-2">
            <div className="h-[1px] w-8 sm:w-14 bg-white/80" />
            <span className="text-[15px] sm:text-[16px] text-white font-medium">
              {subtitle}
            </span>
            <div className="h-[1px] w-8 sm:w-14 bg-white/80" />
          </div>
        </div>

        {/* 6 Grid Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-[1200px] mx-auto">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-start text-left gap-4">
              <div className="shrink-0 w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center p-2 shadow-sm">
                <Image
                  src={item.image || "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp"}
                  alt={item.title}
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-[17px] sm:text-[18px] font-bold text-white mb-2 leading-snug m-0">
                  {item.title}:
                </h3>
                <p className="text-[13.5px] sm:text-[14px] text-white/90 leading-relaxed m-0 font-normal">
                  {item.desc || item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

