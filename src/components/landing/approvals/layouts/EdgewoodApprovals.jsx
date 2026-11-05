"use client";

import React from "react";
import Image from "next/image";

export default function EdgewoodApprovals({
  approvals = [],
  title = "ACCREDITATION OF",
  subtitle = "Edgewood University Online",
  brand = {},
}) {
  const defaultApprovals = [
    {
      id: "hlc",
      title: "HLC",
      description:
        "Edgewood University Online program is approved by the HLC, which is a trusted U.S. regional approval authority. This approval support MBA+DBA program's credibility.",
      image: "/assets/all_universities_images/edgewood/hlc-approval-edgewood.webp",
    },
    {
      id: "wes",
      title: "WES",
      description:
        "The Edgewood University Online MBA + DBA is approved by the WES, which help learniver validate their US qualification for education and career development across countries.",
      image: "/assets/all_universities_images/edgewood/WES.webp",
    },
    {
      id: "acbsp",
      title: "ACBSP",
      description:
        "ACBSP approval ensures that the quality of the education has a strong academic value. The Edgewood University Online MBA has this approval, which shows their credibility.",
      image: "/assets/all_universities_images/edgewood/acbsp-approval-edgewood.webp",
    },
  ];

  const approvalsList =
    Array.isArray(approvals) && approvals.length > 0 ? approvals : defaultApprovals;

  const headerTitle = brand.approvalsTitle || title;
  const headerSubtitle = brand.approvalsSubtitle || subtitle;

  return (
    <section id="accreditations" className="accreditation-section py-10 sm:py-14 px-4 sm:px-5 bg-white select-none scroll-mt-20 text-center">
      <div className="max-w-[1200px] mx-auto">
        <div className="accreditation-header mb-[30px] text-center">
          <h2 className="text-[26px] sm:text-[28px] font-extrabold text-[#ba0000] tracking-[1px] uppercase m-0 leading-tight">
            {headerTitle}
          </h2>
          <p className="text-[20px] sm:text-[22px] font-extrabold text-[#444444] mt-[5px] m-0 leading-tight">
            {headerSubtitle}
          </p>
        </div>

        <div className="accreditation-container grid grid-cols-1 md:grid-cols-3 gap-[25px] max-w-[1200px] mx-auto justify-center">
          {approvalsList.map((item, idx) => (
            <div
              key={item.id || idx}
              className="accreditation-card flex-1 py-10 px-6 border-2 border-[#e0e0e0] rounded-[25px] bg-white transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)] flex flex-col items-center text-center"
            >
              <div className="logo-box h-[120px] w-full flex items-center justify-center mb-[25px]">
                {item.image && (
                  <div className="relative w-full h-[95px] max-w-[240px] flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.title || "Accreditation Logo"}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                  </div>
                )}
              </div>

              <h3 className="text-[18px] font-extrabold text-[#002147] mb-[15px] leading-[1.3] text-center m-0">
                {item.title}
              </h3>

              <p className="text-[14px] text-[#666666] leading-[1.6] m-0 text-center">
                {item.description || item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

