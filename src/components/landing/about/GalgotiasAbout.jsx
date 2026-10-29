"use client";

import React from "react";

export default function GalgotiasAbout({ brand = {}, onOpenApply }) {
  return (
    <div id="about" className="w-full select-none scroll-mt-20">
      {/* Full Width Image with seamless bottom gradient to black */}
      <div className="relative overflow-hidden w-full">
        <img
          src="/assets/galgotias/galgotia-about.webp"
          alt="Galgotias University"
          className="w-full h-auto object-cover block"
        />
        <div
          className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
          }}
        />
      </div>

      {/* Full Width Black Content Container */}
      <div id="abt-ct" className="w-full bg-black text-center text-white pt-2 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1140px] mx-auto">
          <h2 className="text-[26px] sm:text-[32px] md:text-[34px] font-bold text-white m-0 leading-tight">
            About <br />
            <span className="text-[#FFD508]">Galgotias University Online</span>
          </h2>
          <p className="text-[13.5px] sm:text-[14px] text-white/95 leading-[1.65] my-4 sm:my-5 max-w-[960px] mx-auto font-normal">
            Galgotias University is located in Uttar Pradesh. It is a reputed institute known for its excellent education across various fields. It is a NAAC A+ accredited university offering accessible education through different modes. Galgotias University, under its CDOE (Centre of Online and Distance Education), is dedicated to delivering education, committed to the needs of its learners and working professionals. The CDOE of the university is UGC -DEB entitled making Galgotias University online courses relevant to modern-day workforces. delivering quality education through advanced digital learning methods. As a learner, if one plans on upgrading their career, now is the right time to explore Galgotias University online admission process and start your journey with Galgotias online.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenApply?.(null, "Apply Now")}
              className="b2 inline-flex items-center justify-center bg-[#BC1820] hover:bg-[#a0131a] text-white font-semibold text-[14px] sm:text-[15px] px-8 sm:px-9 py-2.5 rounded-full border-none cursor-pointer shadow-md transition-all active:scale-95"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
