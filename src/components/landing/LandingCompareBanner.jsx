"use client";

import React from "react";
import Image from "next/image";
import { Building2, MapPin, CheckCircle2, GraduationCap, Download } from "lucide-react";

const TABLE_HEADERS = [
  { icon: Building2, label: "University", w: "w-[24%]" },
  { icon: MapPin, label: "Location", w: "w-[22%]" },
  { icon: CheckCircle2, label: "Accreditation", w: "w-[18%]" },
  { icon: GraduationCap, label: "Advantage", w: "w-[20%]" },
  { icon: Download, label: "Download Brochure", w: "w-[16%]", center: true },
];

export const DEFAULT_COMPARE_COLLEGES = [
  ["Manipal University", "Jaipur, Rajasthan", "UGC | NAAC A+", "Certification Access"],
  ["Amity University", "Noida, Uttar Pradesh", "UGC | NAAC A+", "Industry Mentorship"],
  ["Lovely Professional University", "Phagwara, Punjab", "UGC | NAAC A++", "Virtual Job Fair"],
  ["Chandigarh University", "Ajitgarh, Punjab", "UGC | NAAC A+", "Harvard Certifications"],
  ["DY Patil University", "Pune, Maharashtra", "UGC | NAAC A++", "Certification with NYU"],
  ["Vivekananda Global University", "Jaipur, Rajasthan", "UGC | NAAC A+", "Certifications from EXIN"],
  ["Shoolini University", "Solan, Himachal Pradesh", "UGC | NAAC A+", "Pay After Placement"],
  ["Sharda University", "Greater Noida, Uttar Pradesh", "UGC | NAAC A+", "Renowned University"],
  ["Jain University", "Bangalore, Karnataka", "UGC | NAAC A++", "LinkedIn Courses Access"],
  ["Sikkim Manipal University", "Gangtok, Sikkim", "UGC | NAAC A+", "Scholarship Opportunity"],
  ["Vignan University", "Guntur, Andhra Pradesh", "UGC | NAAC A+", "Advance Certification"],
  ["UPES University", "Dehradun, Uttarakhand", "UGC | NAAC A", "Oil, Gas & Power", "View Sample Degree"],
  ["Amrita University", "Coimbatore, Tamil Nadu", "UGC | NAAC A++", "Certification Training"],
  ["Shobhit University", "Meerut, Uttar Pradesh", "UGC | NAAC A", "Affordable Fee", "View Sample Degree"],
  ["Mangalayatan University", "Aligarh, Uttar Pradesh", "UGC | NAAC A+", "Lowest Fee"],
  ["Uttaranchal University", "Dehradun, Uttarakhand", "UGC | NAAC A+", "Placement Assistance"],
  ["Suresh Gyan Vihar University", "Jaipur, Rajasthan", "UGC | NAAC A+", "Faculty Support"],
  ["Swami Vivekanand Subharti University", "Meerut, Uttar Pradesh", "UGC | NAAC A", "Lowest Fee"],
  ["Jamia Hamdard University", "New Delhi, Delhi", "UGC | NAAC A+", "Diploma Courses"],
  ["Aligarh Muslim University", "Aligarh, UP", "UGC | NAAC A+", "Industry Mentorship"],
  ["Centurion University", "Sitapur, Odisha", "UGC | NAAC A+", "Industry Mentorship"],
  ["KL University", "Vaddeswaram, Andhra Pradesh", "UGC | NAAC A++", "career advancement"],
  ["kalinga University", "Bhubaneswar, Odisha", "UGC | NAAC B+", "Expert Faculty"],
  ["Andhra University", "Visakhapatnam Andhra Pradesh", "UGC | NAAC A++", "Online Certification"],
  ["Kurukshetra University", "Kurukshetra, Haryana", "UGC | NAAC A++", "Live Interaction"],
  ["Bharathidasan University", "Tiruchirappalli, Tamil Nadu", "UGC | NAAC A+", "Practical Assessment"],
  ["Mizoram University", "Aizawl, Mizoram", "UGC | NAAC A+", "Expert Faculty"],
  ["OP. Jindal. University", "Sonipat, Haryana", "UGC | NAAC A", "Industry Mentorship"],
  ["Dr.MGR University", "Chennai, Tamilnadu", "UGC | NAAC A+", "Industry Mentorship"],
].map(([name, location, accreditation, advantage, actionText]) => ({
  name,
  location,
  accreditation,
  advantage,
  actionText: actionText || "Download Brochure",
}));

/**
 * Clean, Modular Compare Section
 * Supports:
 * - Galgotias College Comparison Table (table / galgotias)
 * - "Still Confused? Compare..." Interactive banner for all other universities
 */
export default function LandingCompareBanner({
  brand = {},
  collegeComparison,
  onOpenCompare,
  onOpenBrochure,
  onOpenApply,
}) {
  const isGalgotias =
    brand.slug === "galgotias" ||
    brand.heroStyle === "galgotias" ||
    brand.shortName === "Galgotias";

  const comparisonData = collegeComparison || brand.collegeComparison;
  const showTable = comparisonData || isGalgotias;

  if (showTable) {
    const tableTitle = comparisonData?.title || "Examine the Best Online Colleges for 2026 Admission";
    const collegesList = comparisonData?.colleges || DEFAULT_COMPARE_COLLEGES;

    return (
      <section id="compare" className="compare_Section py-10 sm:py-16 bg-white select-none w-full">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0">
              {tableTitle}
            </h2>
          </div>

          <div className="overflow-x-auto border border-[#cfe2f3] rounded-[6px] sm:rounded-[8px] shadow-xs bg-white">
            <table className="w-full border-collapse text-left min-w-[760px]">
              <thead>
                <tr className="bg-[#e1f0fa] border-b border-[#cfe2f3]">
                  {TABLE_HEADERS.map(({ icon: Icon, label, w, center }, i) => (
                    <th
                      key={i}
                      className={`py-3 px-3 sm:px-4 text-[12.5px] sm:text-[13.5px] font-bold text-slate-900 ${i < 4 ? "border-r border-[#cfe2f3]" : ""} ${center ? "text-center" : ""} ${w}`}
                    >
                      <span className={`inline-flex items-center gap-1.5 ${center ? "justify-center" : ""}`}>
                        <Icon className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                        <span>{label}</span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#cfe2f3] bg-white text-slate-800">
                {collegesList.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#f8fbfe] transition-colors">
                    <td className="py-3 px-3 sm:px-4 align-middle border-r border-[#cfe2f3]">
                      <button
                        type="button"
                        onClick={() => (onOpenBrochure || onOpenApply)?.(row.name)}
                        className="text-[#005bb8] hover:text-[#003d7a] hover:underline font-medium text-[13px] sm:text-[13.5px] text-left p-0 bg-transparent border-none cursor-pointer leading-snug"
                      >
                        {row.name}
                      </button>
                    </td>
                    <td className="py-3 px-3 sm:px-4 align-middle text-[12.5px] sm:text-[13px] text-slate-700 font-normal border-r border-[#cfe2f3]">
                      {row.location}
                    </td>
                    <td className="py-3 px-3 sm:px-4 align-middle text-[12.5px] sm:text-[13px] text-slate-800 font-normal border-r border-[#cfe2f3] whitespace-nowrap">
                      {row.accreditation}
                    </td>
                    <td className="py-3 px-3 sm:px-4 align-middle text-[12.5px] sm:text-[13px] text-slate-700 font-normal border-r border-[#cfe2f3]">
                      {row.advantage}
                    </td>
                    <td className="py-2.5 px-3 sm:px-4 align-middle text-center">
                      <button
                        type="button"
                        onClick={() =>
                          row.actionText?.includes("Degree") && onOpenApply
                            ? onOpenApply(row.name)
                            : (onOpenBrochure || onOpenApply)?.(row.name)
                        }
                        className="w-full max-w-[145px] inline-flex items-center justify-center border border-[#f58220] text-[#f58220] hover:bg-[#fff6ed] hover:text-[#d96a0d] active:scale-95 text-[11px] sm:text-[11.5px] font-semibold py-1.5 px-2 rounded-[4px] bg-white transition-all shadow-2xs cursor-pointer"
                      >
                        {row.actionText || "Download Brochure"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  const isSmu =
    brand.slug === "smu" ||
    brand.name?.toLowerCase().includes("sikkim") ||
    brand.name?.toLowerCase().includes("smu");

  const universityName =
    brand.compareUniversityName ||
    (isSmu
      ? "Sikkim Manipal University"
      : brand.shortName ||
        (brand.name ? brand.name.replace(/\s*Online\s*$/i, "") : "Amity University"));

  const bannerBg =
    brand.compareBannerBg ||
    brand.compareBannerColor ||
    (isSmu ? "#f05525" : brand.primaryColor || "#08417b");

  const arrowBorderColor =
    brand.compareArrowBorderColor ||
    (typeof bannerBg === "string" && bannerBg.includes("gradient")
      ? brand.primaryColor || "#fd202a"
      : bannerBg);

  return (
    <section id="compare" className="compare_Section bg-[#f6f8fa] pt-8 sm:pt-10 pb-10 sm:pb-12 select-none w-full">
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10">
        <div
          className="compare_box relative rounded-[16px] sm:rounded-[20px] px-6 sm:px-12 pt-8 pb-14 sm:pt-10 sm:pb-14 text-center text-white transition-colors flex flex-col items-center justify-center shadow-xs w-full"
          style={{ background: bannerBg }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight m-0">
            Still Confused?
          </h2>
          <h4 className="text-xs sm:text-sm lg:text-[15px] text-white/95 font-semibold tracking-normal mt-2 max-w-xs sm:max-w-xl mx-auto m-0 leading-snug px-1">
            Compare {universityName} with Top UGC-DEB Approved Universities
          </h4>

          <div className="absolute -bottom-8 sm:-bottom-9 left-1/2 -translate-x-1/2 z-10">
            <button
              type="button"
              onClick={() => onOpenCompare?.()}
              aria-label="Compare universities"
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md border-2"
              style={{ borderColor: arrowBorderColor }}
            >
              <div className="relative w-full h-full rounded-full flex items-center justify-center overflow-hidden p-1">
                <Image
                  src={brand.arrowGif || "/assets/images/arrow.gif"}
                  alt="Compare down arrow"
                  fill
                  className="object-cover rounded-full"
                  unoptimized
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


