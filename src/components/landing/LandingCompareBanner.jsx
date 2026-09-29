"use client";

import React from "react";
import Image from "next/image";
import {
  Building2,
  MapPin,
  CheckCircle2,
  GraduationCap,
  Download,
  FileText,
} from "lucide-react";

export default function LandingCompareBanner({
  brand = {},
  collegeComparison,
  onOpenCompare,
  onOpenBrochure,
  onOpenApply,
}) {
  const isSmu =
    brand.slug === "smu" ||
    brand.name?.toLowerCase().includes("sikkim") ||
    brand.name?.toLowerCase().includes("smu");

  const isGalgotias =
    brand.slug === "galgotias" ||
    brand.heroStyle === "galgotias" ||
    brand.shortName === "Galgotias";

  const comparisonData = collegeComparison || brand.collegeComparison;

  const defaultColleges = [
    {
      name: "Manipal University",
      location: "Jaipur, Rajasthan",
      accreditation: "UGC | NAAC A+",
      advantage: "Certification Access",
      actionText: "Download Brochure",
    },
    {
      name: "Amity University",
      location: "Noida, Uttar Pradesh",
      accreditation: "UGC | NAAC A+",
      advantage: "Industry Mentorship",
      actionText: "Download Brochure",
    },
    {
      name: "Lovely Professional University",
      location: "Phagwara, Punjab",
      accreditation: "UGC | NAAC A++",
      advantage: "Virtual Job Fair",
      actionText: "Download Brochure",
    },
    {
      name: "Chandigarh University",
      location: "Ajitgarh, Punjab",
      accreditation: "UGC | NAAC A+",
      advantage: "Harvard Certifications",
      actionText: "Download Brochure",
    },
    {
      name: "DY Patil University",
      location: "Pune, Maharashtra",
      accreditation: "UGC | NAAC A++",
      advantage: "Certification with NYU",
      actionText: "Download Brochure",
    },
    {
      name: "Vivekananda Global University",
      location: "Jaipur, Rajasthan",
      accreditation: "UGC | NAAC A+",
      advantage: "Certifications from EXIN",
      actionText: "Download Brochure",
    },
    {
      name: "Shoolini University",
      location: "Solan, Himachal Pradesh",
      accreditation: "UGC | NAAC A+",
      advantage: "Pay After Placement",
      actionText: "Download Brochure",
    },
    {
      name: "Sharda University",
      location: "Greater Noida, Uttar Pradesh",
      accreditation: "UGC | NAAC A+",
      advantage: "Renowned University",
      actionText: "Download Brochure",
    },
    {
      name: "Jain University",
      location: "Bangalore, Karnataka",
      accreditation: "UGC | NAAC A++",
      advantage: "LinkedIn Courses Access",
      actionText: "Download Brochure",
    },
    {
      name: "Sikkim Manipal University",
      location: "Gangtok, Sikkim",
      accreditation: "UGC | NAAC A+",
      advantage: "Scholarship Opportunity",
      actionText: "Download Brochure",
    },
    {
      name: "Vignan University",
      location: "Guntur, Andhra Pradesh",
      accreditation: "UGC | NAAC A+",
      advantage: "Advance Certification",
      actionText: "Download Brochure",
    },
    {
      name: "UPES University",
      location: "Dehradun, Uttarakhand",
      accreditation: "UGC | NAAC A",
      advantage: "Oil, Gas & Power",
      actionText: "View Sample Degree",
    },
    {
      name: "Amrita University",
      location: "Coimbatore, Tamil Nadu",
      accreditation: "UGC | NAAC A++",
      advantage: "Certification Training",
      actionText: "Download Brochure",
    },
    {
      name: "Shobhit University",
      location: "Meerut, Uttar Pradesh",
      accreditation: "UGC | NAAC A",
      advantage: "Affordable Fee",
      actionText: "View Sample Degree",
    },
    {
      name: "Mangalayatan University",
      location: "Aligarh, Uttar Pradesh",
      accreditation: "UGC | NAAC A+",
      advantage: "Lowest Fee",
      actionText: "Download Brochure",
    },
    {
      name: "Uttaranchal University",
      location: "Dehradun, Uttarakhand",
      accreditation: "UGC | NAAC A+",
      advantage: "Placement Assistance",
      actionText: "Download Brochure",
    },
    {
      name: "Suresh Gyan Vihar University",
      location: "Jaipur, Rajasthan",
      accreditation: "UGC | NAAC A+",
      advantage: "Faculty Support",
      actionText: "Download Brochure",
    },
    {
      name: "Swami Vivekanand Subharti University",
      location: "Meerut, Uttar Pradesh",
      accreditation: "UGC | NAAC A",
      advantage: "Lowest Fee",
      actionText: "Download Brochure",
    },
    {
      name: "Jamia Hamdard University",
      location: "New Delhi, Delhi",
      accreditation: "UGC | NAAC A+",
      advantage: "Diploma Courses",
      actionText: "Download Brochure",
    },
    {
      name: "Aligarh Muslim University",
      location: "Aligarh, UP",
      accreditation: "UGC | NAAC A+",
      advantage: "Industry Mentorship",
      actionText: "Download Brochure",
    },
    {
      name: "Centurion University",
      location: "Sitapur, Odisha",
      accreditation: "UGC | NAAC A+",
      advantage: "Industry Mentorship",
      actionText: "Download Brochure",
    },
    {
      name: "KL University",
      location: "Vaddeswaram, Andhra Pradesh",
      accreditation: "UGC | NAAC A++",
      advantage: "career advancement",
      actionText: "Download Brochure",
    },
    {
      name: "kalinga University",
      location: "Bhubaneswar, Odisha",
      accreditation: "UGC | NAAC B+",
      advantage: "Expert Faculty",
      actionText: "Download Brochure",
    },
    {
      name: "Andhra University",
      location: "Visakhapatnam Andhra Pradesh",
      accreditation: "UGC | NAAC A++",
      advantage: "Online Certification",
      actionText: "Download Brochure",
    },
    {
      name: "Kurukshetra University",
      location: "Kurukshetra, Haryana",
      accreditation: "UGC | NAAC A++",
      advantage: "Live Interaction",
      actionText: "Download Brochure",
    },
    {
      name: "Bharathidasan University",
      location: "Tiruchirappalli, Tamil Nadu",
      accreditation: "UGC | NAAC A+",
      advantage: "Practical Assessment",
      actionText: "Download Brochure",
    },
    {
      name: "Mizoram University",
      location: "Aizawl, Mizoram",
      accreditation: "UGC | NAAC A+",
      advantage: "Expert Faculty",
      actionText: "Download Brochure",
    },
    {
      name: "OP. Jindal. University",
      location: "Sonipat, Haryana",
      accreditation: "UGC | NAAC A",
      advantage: "Industry Mentorship",
      actionText: "Download Brochure",
    },
    {
      name: "Dr.MGR University",
      location: "Chennai, Tamilnadu",
      accreditation: "UGC | NAAC A+",
      advantage: "Industry Mentorship",
      actionText: "Download Brochure",
    },
  ];

  // Check if we should render the table layout
  const showTable = comparisonData || isGalgotias;

  if (showTable) {
    const tableTitle =
      comparisonData?.title ||
      "Examine the Best Online Colleges for 2026 Admission";
    const collegesList = comparisonData?.colleges || defaultColleges;

    return (
      <section
        id="compare"
        className="compare_Section py-10 sm:py-16 bg-white select-none w-full"
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24">
          {/* Centered Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold text-[#002b49] tracking-tight leading-tight m-0">
              {tableTitle}
            </h2>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-[#cfe2f3] rounded-[6px] sm:rounded-[8px] shadow-xs bg-white">
            <table className="w-full border-collapse text-left min-w-[760px]">
              <thead>
                <tr className="bg-[#e1f0fa] border-b border-[#cfe2f3]">
                  {/* Col 1: University */}
                  <th className="py-3 px-3 sm:px-4 text-[12.5px] sm:text-[13.5px] font-bold text-slate-900 border-r border-[#cfe2f3] w-[24%]">
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                      <span>University</span>
                    </span>
                  </th>

                  {/* Col 2: Location */}
                  <th className="py-3 px-3 sm:px-4 text-[12.5px] sm:text-[13.5px] font-bold text-slate-900 border-r border-[#cfe2f3] w-[22%]">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                      <span>Location</span>
                    </span>
                  </th>

                  {/* Col 3: Accreditation */}
                  <th className="py-3 px-3 sm:px-4 text-[12.5px] sm:text-[13.5px] font-bold text-slate-900 border-r border-[#cfe2f3] w-[18%]">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                      <span>Accreditation</span>
                    </span>
                  </th>

                  {/* Col 4: Advantage */}
                  <th className="py-3 px-3 sm:px-4 text-[12.5px] sm:text-[13.5px] font-bold text-slate-900 border-r border-[#cfe2f3] w-[20%]">
                    <span className="inline-flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                      <span>Advantage</span>
                    </span>
                  </th>

                  {/* Col 5: Download Brochure */}
                  <th className="py-3 px-3 sm:px-4 text-[12.5px] sm:text-[13.5px] font-bold text-slate-900 text-center w-[16%]">
                    <span className="inline-flex items-center justify-center gap-1.5">
                      <Download className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                      <span>Download Brochure</span>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#cfe2f3] bg-white text-slate-800">
                {collegesList.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#f8fbfe] transition-colors"
                  >
                    {/* University Name */}
                    <td className="py-3 px-3 sm:px-4 align-middle border-r border-[#cfe2f3]">
                      <button
                        type="button"
                        onClick={() => {
                          if (onOpenBrochure) onOpenBrochure(row.name);
                          else if (onOpenApply) onOpenApply(row.name);
                        }}
                        className="text-[#005bb8] hover:text-[#003d7a] hover:underline font-medium text-[13px] sm:text-[13.5px] text-left p-0 bg-transparent border-none cursor-pointer leading-snug"
                      >
                        {row.name}
                      </button>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-3 sm:px-4 align-middle text-[12.5px] sm:text-[13px] text-slate-700 font-normal border-r border-[#cfe2f3]">
                      {row.location}
                    </td>

                    {/* Accreditation */}
                    <td className="py-3 px-3 sm:px-4 align-middle text-[12.5px] sm:text-[13px] text-slate-800 font-normal border-r border-[#cfe2f3] whitespace-nowrap">
                      {row.accreditation}
                    </td>

                    {/* Advantage */}
                    <td className="py-3 px-3 sm:px-4 align-middle text-[12.5px] sm:text-[13px] text-slate-700 font-normal border-r border-[#cfe2f3]">
                      {row.advantage}
                    </td>

                    {/* Action Button */}
                    <td className="py-2.5 px-3 sm:px-4 align-middle text-center">
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            row.actionText?.includes("Degree") &&
                            onOpenApply
                          ) {
                            onOpenApply(row.name);
                          } else if (onOpenBrochure) {
                            onOpenBrochure(row.name);
                          } else if (onOpenApply) {
                            onOpenApply(row.name);
                          }
                        }}
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

  const universityName =
    brand.compareUniversityName ||
    (isSmu
      ? "Sikkim Manipal University"
      : brand.shortName ||
        (brand.name
          ? brand.name.replace(/\s*Online\s*$/i, "")
          : "Amity University"));

  const bannerBg =
    brand.compareBannerBg ||
    brand.compareBannerColor ||
    (isSmu ? "#f05525" : brand.primaryColor || "#08417b");

  return (
    <section
      id="compare"
      className="compare_Section bg-[#f6f8fa] pt-8 sm:pt-10 pb-10 sm:pb-12 select-none w-full"
    >
      <div className="w-full px-3 sm:px-6 lg:px-8 xl:px-10">
        <div
          className="compare_box relative rounded-[16px] sm:rounded-[20px] px-6 sm:px-12 pt-8 pb-14 sm:pt-10 sm:pb-14 text-center text-white transition-colors flex flex-col items-center justify-center shadow-xs w-full"
          style={{ background: bannerBg }}
        >
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight m-0">
            Still Confused?
          </h2>

          {/* Subtitle */}
          <h4 className="text-xs sm:text-sm lg:text-[15px] text-white/95 font-semibold tracking-normal mt-2 max-w-xs sm:max-w-xl mx-auto m-0 leading-snug px-1">
            Compare {universityName} with Top UGC-DEB Approved Universities
          </h4>

          {/* Centered Overlapping Circular Button */}
          <div className="absolute -bottom-8 sm:-bottom-9 left-1/2 -translate-x-1/2 z-10">
            <button
              type="button"
              onClick={() => onOpenCompare?.()}
              aria-label="Compare universities"
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md border-2"
              style={{ borderColor: bannerBg }}
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
