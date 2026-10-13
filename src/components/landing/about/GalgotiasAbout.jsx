"use client";

import React from "react";

export default function GalgotiasAbout({ about = {}, brand = {} }) {
  const title = about.title || `About ${brand.name || "Galgotias University Online"}`;
  const accTitle =
    about.accreditationsTitle ||
    `${brand.name || "Galgotias University Online"} Accreditations, Approvals and Ranking`;

  const accDesc =
    about.accreditationsDesc ||
    `${brand.name || "Galgotias University Online"} is recognized for its strong commitment to quality education and academic excellence. It has established itself as one of the top private universities in India, focusing on research, innovation, and skill development.`;

  const defaultParagraphs = [
    `Galgotias Online is a pioneering initiative by Galgotias University, dedicated to providing individuals with a robust platform for elective online learning. This initiative empowers participants to enhance their competencies, cultivate expertise, and refine skills across diverse disciplines and career paths. The Online degree program allows students to study at their own pace while still receiving a high-quality education that connects to real-world situations. Students learn from experts who work in their field, work together with other students, and practice what they learn through real examples and hands-on projects.`,
    `Galgotias University Online provides a state-of-the-art learning management system (LMS) that allows students to access course materials, submit assignments, and participate in discussions from anywhere in the world. The program doesn't just teach job skills. It also teaches students how to be good leaders, make the right choices, and communicate well with others. This helps create complete professionals who can handle the challenges of today's work world.`,
  ];

  const paragraphs =
    Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean).length > 0
      ? [about.p1, about.p2, about.p3, about.text1, about.text2, about.text3].filter(Boolean)
      : defaultParagraphs;

  const primaryColor = brand.primaryColor || "#002b49";

  return (
    <section id="about" className="pt-10 sm:pt-14 pb-2 sm:pb-3 bg-white select-none">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28 space-y-6 sm:space-y-8 text-left">
        <div className="space-y-4">
          <h2
            className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight leading-tight m-0"
            style={{ color: primaryColor }}
          >
            {title}
          </h2>
          <div className="space-y-3.5 text-[14px] sm:text-[15.5px] text-slate-700 leading-relaxed font-normal">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="m-0">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h2
            className="text-2xl sm:text-3xl lg:text-[30px] font-black tracking-tight leading-tight m-0"
            style={{ color: primaryColor }}
          >
            {accTitle}
          </h2>
          <p className="text-[14px] sm:text-[15.5px] text-slate-700 leading-relaxed font-normal m-0">
            {accDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
