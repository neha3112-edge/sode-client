"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Carousel } from "antd";

// Dummy data for counselors (API ready structure)
const defaultCounselors = [
  {
    id: 1,
    name: "Sneha Sen",
    designation: "Sr. Academic Counselor",
    experience: "11+ Years Experience",
    skill: "Skill Development Expert",
    studentsCounseled: "4000+ Students Guided",
    image: "/counselors/counselor-3.jpg",
    bgColor: "bg-[#1D72B8]",
    whatsapp: "https://wa.me/919999999999",
  },
  {
    id: 2,
    name: "Neha Raj",
    designation: "Sr. Academic Counselor",
    experience: "10+ Years Experience",
    skill: "Career & Skill Guidance",
    studentsCounseled: "3000+ Students Guided",
    image: "/counselors/counselor-1.jpg",
    bgColor: "bg-[#1D72B8]",
    whatsapp: "https://wa.me/919999999999",
  },
  {
    id: 3,
    name: "Rahul Verma",
    designation: "Sr. Academic Counselor",
    experience: "8+ Years Experience",
    skill: "Online Degree Specialist",
    studentsCounseled: "2500+ Students Guided",
    image: "/counselors/counselor-2.jpg",
    bgColor: "bg-[#1D72B8]",
    whatsapp: "https://wa.me/919999999999",
  },
  {
    id: 4,
    name: "Pooja Sharma",
    designation: "Sr. Academic Counselor",
    experience: "10+ Years Experience",
    skill: "MBA & Higher Ed Advisor",
    studentsCounseled: "3500+ Students Guided",
    image: "/counselors/counselor-3.jpg",
    bgColor: "bg-[#1D72B8]",
    whatsapp: "https://wa.me/919999999999",
  },
  {
    id: 5,
    name: "Amit Patel",
    designation: "Sr. Academic Counselor",
    experience: "9+ Years Experience",
    skill: "Executive Education Mentor",
    studentsCounseled: "2800+ Students Guided",
    image: "/counselors/counselor-2.jpg",
    bgColor: "bg-[#1D72B8]",
    whatsapp: "https://wa.me/919999999999",
  },
  {
    id: 6,
    name: "Ananya Iyer",
    designation: "Sr. Academic Counselor",
    experience: "7+ Years Experience",
    skill: "UG & PG Course Advisor",
    studentsCounseled: "2200+ Students Guided",
    image: "/counselors/counselor-1.jpg",
    bgColor: "bg-[#1D72B8]",
    whatsapp: "https://wa.me/919999999999",
  },
];

function CounselorCard({ counselor, isMobile = false }) {
  return (
    <div
      className={`bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md border border-slate-200/80 flex items-stretch transition-all duration-200 text-left h-full overflow-hidden ${
        isMobile ? "max-w-sm mx-auto min-h-[160px]" : "mx-auto max-w-lg lg:max-w-none"
      }`}
    >
      {/* Left: Full-Bleed Image touching top, bottom, and left edges */}
      <div
        className={`relative ${
          isMobile ? "w-[110px] min-[380px]:w-[125px]" : "w-[120px] sm:w-[135px] md:w-[145px]"
        } shrink-0 self-stretch ${counselor.bgColor || "bg-[#1D72B8]"}`}
      >
        <Image
          src={counselor.image}
          alt={counselor.name}
          fill
          unoptimized
          sizes="(max-width: 768px) 140px, 180px"
          className="object-cover object-top"
        />
      </div>

      {/* Right: Counselor Details */}
      <div className={`flex-1 min-w-0 ${isMobile ? "p-3" : "p-3.5 sm:p-4 md:p-4.5"} flex flex-col justify-center`}>
        <h4 className={`${isMobile ? "text-[14.5px]" : "text-[15px] sm:text-[16px]"} font-bold text-slate-900 m-0 leading-tight truncate`}>
          {counselor.name}
        </h4>

        <p className="text-[11px] text-slate-500 font-medium m-0 mt-0.5 truncate">
          ({counselor.designation})
        </p>

        {/* Experience Badge */}
        <div className="my-1 sm:my-1.5">
          <span className="inline-block px-2 py-0.5 rounded-md bg-[#FFF8E7] text-[#9A6B00] border border-[#FFE29A] text-[10px] sm:text-[10.5px] font-semibold leading-normal truncate max-w-full">
            {counselor.experience}
          </span>
        </div>

        {/* Highlights */}
        <div className="space-y-1 my-1 sm:my-1.5">
          <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] text-slate-600 font-medium min-w-0">
            {/* Shield with check */}
            <svg
              className="w-3.5 h-3.5 text-slate-700 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate">{counselor.skill}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] text-slate-600 font-medium min-w-0">
            {/* Graduation Cap */}
            <svg
              className="w-3.5 h-3.5 text-slate-700 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a10.99 10.99 0 00-.25 2.348c0 .888.106 1.752.308 2.583A5.002 5.002 0 002.5 17a1 1 0 102 0 3.003 3.003 0 013-3h5a3.003 3.003 0 013 3 1 1 0 102 0 5.002 5.002 0 00-2.808-4.019c.202-.83.308-1.695.308-2.583 0-.8-.09-1.584-.25-2.348l2.644-1.132a1 1 0 000-1.84l-7-3zM7 9.5a5.98 5.98 0 013-.807c1.1 0 2.126.3 3 .807v1.892c-.874-.44-1.888-.692-3-.692-1.112 0-2.126.252-3 .692V9.5z" />
            </svg>
            <span className="truncate">{counselor.studentsCounseled}</span>
          </div>
        </div>

        {/* Connect Now Button */}
        <div className="mt-1.5 sm:mt-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1D72B8] hover:bg-[#155A94] text-white text-[11px] sm:text-xs font-bold transition-all shadow-xs cursor-pointer border-0 active:scale-98 select-none"
          >
            <span>Connect Now</span>
            {/* WhatsApp Icon */}
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <svg className="w-2 h-2 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.78 14.18c-.24.68-1.39 1.3-1.92 1.38-.49.08-1.11.12-3.18-.75-2.64-1.1-4.32-3.79-4.45-3.96-.13-.18-1.07-1.42-1.07-2.71 0-1.29.68-1.92.92-2.18.24-.26.53-.33.71-.33.18 0 .36 0 .51.01.16.01.38-.06.59.45.22.53.75 1.83.82 1.97.07.14.11.31.02.49-.09.18-.13.29-.26.44-.13.15-.28.34-.4.46-.13.13-.27.28-.12.54.16.26.69 1.14 1.48 1.85 1.02.91 1.88 1.19 2.14 1.33.27.13.42.11.58-.07.16-.18.68-.79.86-1.06.18-.26.36-.22.61-.13.24.09 1.55.73 1.81.86.27.13.44.2.51.31.07.11.07.64-.17 1.32z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CareerExpertsSection({
  title = "Meet Our Career Experts",
  subtitle = "Get 100% FREE Personalized Guidance",
  pretitle = "GUIDANCE THAT BUILDS YOUR FUTURE",
  counselors = defaultCounselors,
  className = "mt-12 sm:mt-16 md:mt-20",
}) {
  const carouselRef = useRef(null);

  return (
    <div
      className={`w-full ${className} text-center select-none`}
      suppressHydrationWarning
    >
      {/* Header Title */}
      <div className="max-w-2xl mx-auto mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-[10.5px] sm:text-xs font-bold tracking-[0.2em] text-[#3B82F6] uppercase mb-1.5">
          <span className="w-4 h-px bg-[#3B82F6]/60 inline-block" />
          <span>{pretitle}</span>
          <span className="w-4 h-px bg-[#3B82F6]/60 inline-block" />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A2540] tracking-tight m-0 leading-tight">
          Meet Our <span className="text-[#0B57D0]">Career Experts</span>
        </h2>

        <p className="text-xs sm:text-sm font-semibold text-slate-500 m-0 mt-1.5">
          {subtitle}
        </p>
      </div>

      {/* ── MOBILE: 1 SINGLE CARD ONLY (slidesToShow={1}) ── */}
      <div className="w-full relative block md:hidden">
        <Carousel
          autoplay={true}
          autoplaySpeed={3500}
          infinite={true}
          pauseOnHover={true}
          draggable={true}
          swipeToSlide={true}
          dots={true}
          slidesToShow={1}
          slidesToScroll={1}
          className="[&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-dots]:relative! [&_.slick-dots]:mt-5! [&_.slick-dots]:mb-0! [&_.slick-dots_li]:w-2! [&_.slick-dots_li]:h-2! [&_.slick-dots_li]:mx-1! [&_.slick-dots_li_button]:w-2! [&_.slick-dots_li_button]:h-2! [&_.slick-dots_li_button]:rounded-full! [&_.slick-dots_li_button]:bg-slate-300! [&_.slick-dots_li.slick-active]:w-5! [&_.slick-dots_li.slick-active_button]:w-5! [&_.slick-dots_li.slick-active_button]:rounded-full! [&_.slick-dots_li.slick-active_button]:bg-[#0B57D0]!"
        >
          {counselors.map((counselor, idx) => (
            <div key={`m-${counselor.id || idx}`} className="px-1.5 py-1.5 h-full">
              <CounselorCard counselor={counselor} isMobile={true} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* ── DESKTOP: 3 CARDS (slidesToShow={3}) ── */}
      <div className="w-full relative hidden md:block">
        <Carousel
          ref={carouselRef}
          autoplay={true}
          autoplaySpeed={3500}
          infinite={true}
          pauseOnHover={true}
          draggable={true}
          swipeToSlide={true}
          dots={true}
          slidesToShow={3}
          slidesToScroll={1}
          className="[&_.slick-list]:-mx-2! sm:[&_.slick-list]:-mx-3! [&_.slick-track]:flex [&_.slick-track]:items-stretch [&_.slick-dots]:relative! [&_.slick-dots]:mt-6! [&_.slick-dots]:mb-0! [&_.slick-dots_li]:w-2! [&_.slick-dots_li]:h-2! [&_.slick-dots_li]:mx-1! [&_.slick-dots_li_button]:w-2! [&_.slick-dots_li_button]:h-2! [&_.slick-dots_li_button]:rounded-full! [&_.slick-dots_li_button]:bg-slate-300! [&_.slick-dots_li.slick-active]:w-5! [&_.slick-dots_li.slick-active_button]:w-5! [&_.slick-dots_li.slick-active_button]:rounded-full! [&_.slick-dots_li.slick-active_button]:bg-[#0B57D0]!"
        >
          {counselors.map((counselor, idx) => (
            <div key={`d-${counselor.id || idx}`} className="px-2 sm:px-3 py-2 h-full">
              <CounselorCard counselor={counselor} isMobile={false} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Big Bottom CTA Button */}
      <div className="mt-8 sm:mt-10 flex justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 rounded-full bg-gradient-to-r from-[#0E9F6E] to-[#057A55] hover:from-[#057A55] hover:to-[#046c4e] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer border-0 select-none group active:scale-98"
        >
          {/* Calendar Icon */}
          <svg
            className="w-5 h-5 text-white shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          <span>Schedule Personalised Counseling</span>

          {/* Right Circle Arrow */}
          <span className="w-6 h-6 rounded-full bg-white text-[#0E9F6E] flex items-center justify-center font-extrabold text-xs group-hover:translate-x-0.5 transition-transform shrink-0">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
