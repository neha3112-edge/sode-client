"use client";

import React from "react";
import { esgciImg } from "./constants";

export default function EsgciAbout({ onOpenScholarship }) {
  return (
    <section
      id="about"
      className="about-section w-full relative select-none overflow-hidden bg-black text-white py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      <style jsx>{`
        .about-section {
          background-color: #000000;
          background-image: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.94) 0%,
              rgba(0, 0, 0, 0.88) 100%
            ),
            url('${esgciImg("about-us.webp")}');
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
        }
        @media (min-width: 1024px) {
          .about-section {
            background-image: linear-gradient(
                to right,
                #000000 0%,
                #000000 42%,
                rgba(0, 0, 0, 0.85) 54%,
                rgba(0, 0, 0, 0.15) 80%,
                rgba(0, 0, 0, 0) 100%
              ),
              url('${esgciImg("about-us.webp")}');
            background-size: cover;
            background-position: center right;
            background-repeat: no-repeat;
          }
        }
      `}</style>

      <div className="max-w-[1360px] mx-auto text-left relative z-10">
        <div className="max-w-[560px] xl:max-w-[600px] flex flex-col items-start">
          {/* Section Heading */}
          <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-black uppercase tracking-tight text-white m-0 mb-3 sm:mb-4">
            ABOUT US
          </h2>

          {/* About Paragraph */}
          <p className="text-white/90 text-[12px] sm:text-[12.5px] lg:text-[13px] leading-[1.6] m-0 mb-5 sm:mb-6 font-normal">
            ESGCI (Ecoles Supérieur de Gestion – Commerce International) was founded in 1986 in Paris. It is a famous management school known for its global approach. About 20% of its students come from 65 countries. Recognized by the French government, ESGCI offers high-quality training through its Qualiopi certification. The school is part of Galileo Global Education, a large group with over 200,000 students across 91 campuses in 13 countries. Other top schools in the group include Paris School of Business, Cours Florent, and Istituto Marangoni.
          </p>

          {/* Yellow Request Call Back CTA Button */}
          <div>
            <button
              type="button"
              onClick={onOpenScholarship}
              className="px-6 py-2.5 bg-[#ffd200] hover:bg-[#e6bd00] text-black rounded-[4px] text-[13px] sm:text-[13.5px] font-bold shadow-sm active:scale-98 transition-all border-none cursor-pointer"
            >
              Request Call Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
