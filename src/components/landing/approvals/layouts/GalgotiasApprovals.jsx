"use client";

import React from "react";
import Image from "next/image";

export default function GalgotiasApprovals({ keyHighlights, brand = {} }) {
  const tableData = brand?.approvalsTableData || [
    {
      logo: "/assets/images/approvals/ugc_approval.png",
      title: "UGC Approval for Online Degrees and Learning Platform (UGC)",
      about:
        "Galgotias University is approved by the University Grants Commission (UGC), ensuring its programs meet national education standards.",
    },
    {
      logo: "/assets/images/approvals/naac_a_plus.png",
      title: "National Assessment and Accreditation Council (NAAC A+)",
      about:
        "The university has received an A+ grade from the National Assessment and Accreditation Council (NAAC), highlighting its dedication to high-quality education.",
    },
    {
      logo: "/assets/galgotias/aiu_logo.webp",
      title: "Association of Indian Universities",
      about:
        "Galgotias University is a member of the Association of Indian Universities (AIU), which supports academic collaboration and helps maintain equivalence of degrees across India.",
    },
  ];

  const highlights =
    keyHighlights?.length > 0
      ? keyHighlights
      : brand?.keyHighlights || [
          { feature: "University", details: "Galgotias Online University" },
          { feature: "Accreditation", details: "NAAC A+" },
          { feature: "Approval", details: "UGC-Entitled" },
          { feature: "Location", details: "Greater Noida, Uttar Pradesh, India" },
          { feature: "Establishment Year", details: "2011" },
          { feature: "Program Types", details: "Postgraduate Online Degree Programs" },
          {
            feature: "Focus Areas",
            details: "Industry-Oriented Education and Professional Development",
          },
          { feature: "Educational Expertise", details: "Over 10 Years" },
          {
            feature: "Learning Methodologies",
            details: "Innovative, Digital Learning Solutions for Flexibility",
          },
        ];

  return (
    <section id="approval" className="w-full py-8 sm:py-12 bg-white text-slate-800 select-none scroll-mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-black text-[#002b49] tracking-tight leading-tight m-0 mb-4 sm:mb-6">
            Galgotias University Online Accreditations and Approvals
          </h2>
          <div className="overflow-x-auto border border-slate-200 rounded-[6px] sm:rounded-[8px] shadow-xs">
            <table className="w-full border-collapse text-left min-w-[640px]">
              <thead>
                <tr className="bg-[#dff0fa] border-b border-slate-200">
                  <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[15%] sm:w-[14%] border-r border-slate-200">
                    Approvals
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[30%] sm:w-[28%] border-r border-slate-200">
                    Title
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900">
                    About
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {tableData.map((row, idx) => (
                  <tr key={row.title || idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-4 sm:px-6 align-middle border-r border-slate-200">
                      <div className="relative w-16 h-12 sm:w-20 sm:h-14 flex items-center justify-center">
                        <Image
                          src={row.logo}
                          alt={row.title}
                          fill
                          className="object-contain max-h-full max-w-full"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-middle font-bold text-slate-900 text-[13.5px] sm:text-[14.5px] leading-snug border-r border-slate-200">
                      {row.title}
                    </td>
                    <td className="py-4 px-4 sm:px-6 align-middle text-slate-700 text-[13px] sm:text-[14px] leading-relaxed font-normal">
                      {row.about}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-8 sm:pt-10">
          <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-black text-[#002b49] tracking-tight leading-tight m-0 mb-4 sm:mb-6">
            Key Highlights of Galgotias University Online
          </h2>
          <div className="overflow-x-auto border border-slate-200 rounded-[6px] sm:rounded-[8px] shadow-xs mt-3 sm:mt-4">
            <table className="w-full border-collapse text-left min-w-[600px]">
              <thead>
                <tr className="bg-[#dff0fa] border-b border-slate-200">
                  <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900 w-[30%] sm:w-[28%] border-r border-slate-200">
                    Feature
                  </th>
                  <th className="py-3 px-4 sm:px-6 text-sm sm:text-[15px] font-bold text-slate-900">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {highlights.map((row, idx) => (
                  <tr key={row.feature || idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 align-middle font-bold text-slate-900 text-[13.5px] sm:text-[14.5px] border-r border-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 align-middle text-slate-700 text-[13px] sm:text-[14px] font-normal leading-relaxed">
                      {row.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
