"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import LandingLeadForm from "../../LandingLeadForm";
import { amityImg } from "./constants";

export const AMITY_COURSES = [
  { value: "MBA", label: "MBA" },
  { value: "MCA", label: "MCA" },
  { value: "MCOM", label: "MCOM" },
  { value: "MA", label: "MA" },
  { value: "MSC", label: "MSC" },
  { value: "BBA", label: "BBA" },
  { value: "BCA", label: "BCA" },
  { value: "BCOM", label: "BCOM" },
  { value: "BA", label: "BA" },
];

export default function AmityHero({
  onOpenBrochure,
  onOpenDisclaimer,
}) {
  return (
    <>
      <style>{`
        .amity-hero-banner-bg {
          background-image: url('${amityImg("Mobile-bg-amity.webp")}');
          background-position: center top;
          background-size: cover;
          background-repeat: no-repeat;
        }
        @media (min-width: 1024px) {
          .amity-hero-banner-bg {
            background-image: url('${amityImg("amity-bg-final.webp")}');
            background-position: center top;
            background-size: cover;
          }
        }
      `}</style>

      <section
        id="hero"
        className="amity-hero-banner-bg relative w-full py-4 sm:py-6 lg:py-6 flex items-center"
      >
        <Container className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 w-full">
          {/* Left Column: Exact match to Target Image */}
          <div className="w-full lg:w-92.5 xl:w-97.5 shrink-0 pt-2 lg:pt-0 text-left">
            {/* 1. Hashtag */}
            <p className="text-[#111111] text-[15px] sm:text-[16px] font-medium mb-1 leading-tight tracking-normal">
              #YourFutureBeginsHere
            </p>

            {/* 2. Heading with Impact font */}
            <h1
              className="text-[#08417b] text-[32px] sm:text-[38px] font-medium leading-none tracking-[-0.03em] whitespace-nowrap mb-1.5"
              style={{
                fontFamily:
                  'Impact, "impace", Haettenschweiler, "Arial Narrow Bold", sans-serif',
              }}
            >
              Amity University Online
            </h1>

            {/* 3. Subtitle / Tagline */}
            <p className="text-[#222222] text-[17px] sm:text-[18px] font-normal mb-5 leading-snug">
              Learn from Anywhere, Grow Everywhere
            </p>

            {/* 4. Course Box with Yellow Pill Badge */}
            <div className="relative mb-5 w-fit max-w-full sm:max-w-85">
              <span className="absolute -top-3 left-2.5 z-10 inline-block bg-[#fbcb12] text-[#08417b] font-bold text-[13px] px-3.5 py-0.5 rounded-full shadow-xs select-none">
                Online Degree Courses :
              </span>
              <div className="w-full border-2 border-[#08417b] bg-white rounded-md pt-3.5 pb-2.5 px-3.5 shadow-sm">
                <div className="text-[#08417b] font-bold text-[17px] sm:text-[18px] leading-tight tracking-normal">
                  MBA | MCA | MCOM | MA | MSC
                  <br />
                  | BBA | BCA | BCOM | BA
                </div>
              </div>
            </div>

            {/* 5. Download Brochure Button */}
            <div className="mb-2">
              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#000000] hover:bg-[#08417b] hover:text-white border-2 border-[#08417b] rounded-[5px] py-2 px-5 font-medium text-[15px] leading-normal transition-all duration-200 shadow-xs cursor-pointer select-none"
              >
                <span>Download Brochure</span>
                <svg
                  className="w-3.5 h-3.5 fill-current shrink-0"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24z" />
                </svg>
              </button>
            </div>

            {/* 6. Mobile Student Image (Only visible on Mobile screens) */}
            <div className="w-full my-5 rounded-[20px] overflow-hidden lg:hidden shadow-sm">
              <Image
                src={amityImg("university.webp")}
                alt="Amity Student"
                width={500}
                height={320}
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="w-full h-auto object-cover rounded-[20px]"
              />
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="w-full lg:w-85 xl:w-87.5 shrink-0 mt-2 lg:mt-0">
            <LandingLeadForm
              formName="Amity Hero Form"
              title="Enquire Now"
              subtitle="Academic Experts will assist you!"
              universityName="Amity University Online"
              brand={{
                name: "Amity University Online",
                slug: "amity",
                primaryColor: "#08417b",
                accentColor: "#ffd508",
              }}
              courses={AMITY_COURSES}
              phoneText="+91 7065 7777 55"
              phoneHref="tel:07065777755"
              primaryColor="#08417b"
              accentColor="#ffd508"
              buttonText="Submit"
              onOpenDisclaimer={onOpenDisclaimer}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
