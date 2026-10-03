"use client";

import React from "react";
import { BookOpen, GraduationCap, Clock, CreditCard } from "lucide-react";

const FEES_HEADERS = [
  { icon: BookOpen, label: "Course" },
  { icon: GraduationCap, label: "Degree Type" },
  { icon: Clock, label: "Duration" },
  { label: "₹Fee" },
  { icon: CreditCard, label: "EMI Available", last: true },
];

export default function LandingEmiSection({
  brand = {},
  feesAndEmi = {},
}) {
  const isGalgotias =
    brand.slug === "galgotias" ||
    brand.emiLayout === "galgotias" ||
    brand.heroStyle === "galgotias";

  if (!isGalgotias && !feesAndEmi.feesTitle) return null;

  const tableData = feesAndEmi.coursesFeesTable || [];
  const emiPoints = feesAndEmi.emiPoints || [];
  const scholarships = feesAndEmi.scholarshipsTable || [];

  return (
    <section id="emi" className="py-10 sm:py-14 bg-white select-none">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-28">
        {/* Top Section: Fees for 2026 */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0">
            {feesAndEmi.feesTitle || "Galgotias Online Degree Courses Fees for 2026"}
          </h2>

          <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal mt-3 mb-6 max-w-6xl">
            {feesAndEmi.feesDescription ||
              "Galgotias University Online offers a range of online degree courses designed to enhance career skills and academic knowledge. The university provides education in multiple disciplines, including Arts, Commerce, Management, IT, and more."}
          </p>

          {/* Fees Table */}
          {tableData.length > 0 && (
            <div className="w-full overflow-x-auto border border-[#cfe2f3] rounded-[2px]">
              <table className="w-full border-collapse text-left text-[13px] sm:text-[14px]">
                <thead>
                  <tr className="bg-[#e1f0fa] border-b border-[#cfe2f3] text-[#002b49] font-bold">
                    {FEES_HEADERS.map(({ icon: Icon, label, last }, idx) => (
                      <th
                        key={idx}
                        className={`py-3 sm:py-3.5 px-4 sm:px-6 whitespace-nowrap ${
                          last ? "" : "border-r border-[#cfe2f3]"
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          {Icon && <Icon className="w-4 h-4 text-[#002b49] stroke-[2.2]" />}
                          <span>{label}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cfe2f3]">
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fbfe] transition-colors">
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 border-r border-[#cfe2f3] font-bold text-[#005bb8]">
                        {row.course}
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 border-r border-[#cfe2f3] text-slate-800 font-normal">
                        {row.degreeType}
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 border-r border-[#cfe2f3] text-slate-800 font-normal">
                        {row.duration}
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 border-r border-[#cfe2f3] font-bold text-[#d81b60]">
                        {row.fee}
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-slate-800 font-normal">
                        {row.emiAvailable}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bottom Section: EMI Details */}
        <div className="mt-10 sm:mt-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002b49] tracking-tight leading-tight m-0">
            {feesAndEmi.emiTitle || "Galgotias Online EMI Details"}
          </h2>

          <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal mt-3 mb-5 max-w-6xl">
            {feesAndEmi.emiDescription ||
              "Galgotias University Online offers flexible EMI options with no-cost EMI for a variety of programs. EMI ranges differ for both postgraduate (PG) and undergraduate (UG) courses."}
          </p>

          {emiPoints.length > 0 && (
            <ul className="space-y-1.5 text-[13.5px] sm:text-[14px] text-slate-700 font-normal list-none p-0 m-0">
              {emiPoints.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-slate-900 font-black text-base leading-none mt-0.5 select-none">
                    •
                  </span>
                  <span>
                    <strong className="text-slate-900 font-bold">{item.bold}</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <p className="text-[13px] sm:text-[13.5px] text-slate-800 font-normal mt-5 m-0">
            <strong className="font-bold text-slate-900">Note:</strong>{" "}
            {feesAndEmi.emiNote ||
              "EMI costs may change, so it's advisable to check the official university website for the latest EMI details."}
          </p>
        </div>

        {/* Section 3: Scholarships */}
        <div className="mt-10 sm:mt-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002b49] tracking-tight leading-tight m-0">
            {feesAndEmi.scholarshipsTitle || "Galgotias University Scholarships"}
          </h2>

          <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal mt-3 mb-5 max-w-6xl">
            {feesAndEmi.scholarshipsDescription ||
              "Galgotias Online offers scholarships for students, including merit-based, need-based, and special tuition fee reductions."}
          </p>

          <h3 className="text-lg sm:text-xl font-bold text-[#002b49] tracking-tight m-0 mb-3.5">
            {feesAndEmi.scholarshipCategoriesTitle || "Scholarship Categories"}
          </h3>

          {scholarships.length > 0 && (
            <div className="w-full overflow-x-auto border border-[#cfe2f3] rounded-[2px]">
              <table className="w-full border-collapse text-left text-[13px] sm:text-[14px]">
                <thead>
                  <tr className="bg-[#e1f0fa] border-b border-[#cfe2f3] text-[#002b49] font-bold">
                    <th className="py-3 sm:py-3.5 px-4 sm:px-6 border-r border-[#cfe2f3] w-2/3">
                      Scholarship Type
                    </th>
                    <th className="py-3 sm:py-3.5 px-4 sm:px-6 w-1/3">Fee Waiver</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cfe2f3]">
                  {scholarships.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#f8fbfe] transition-colors">
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 border-r border-[#cfe2f3] font-bold text-slate-900">
                        {item.type}
                      </td>
                      <td className="py-3 sm:py-3.5 px-4 sm:px-6 text-slate-800 font-normal">
                        {item.waiver}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <p className="text-[13px] sm:text-[13.5px] text-slate-800 font-normal mt-4 m-0">
            <strong className="font-bold text-slate-900">Note:</strong>{" "}
            {feesAndEmi.scholarshipsNote ||
              "Scholarship percentage may vary. Kindly visit the official website to confirm the latest scholarship details."}
          </p>
        </div>

        {/* Section 4: Last Date of Admission */}
        <div className="mt-10 sm:mt-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002b49] tracking-tight leading-tight m-0">
            {feesAndEmi.admissionLastDateTitle || "Last Date of Admission in Galgotias Online"}
          </h2>

          <p className="text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal mt-3 m-0 max-w-6xl">
            {feesAndEmi.admissionLastDateDescription ||
              "Galgotias Online offers admission twice a year. The first round starts in January, and the second round happens in July. The entire admission process, from registration to final confirmation, is done online."}
          </p>
        </div>
      </div>
    </section>
  );
}


