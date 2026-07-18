"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DisclaimerContent from "@/components/common/legal/DisclaimerContent";
import PrivacyContent from "@/components/common/legal/PrivacyContent";
import TermsContent from "@/components/common/legal/TermsContent";

const UNIVERSITIES = [
  "Golden Gate University",
  "Rushford University",
  "ESGCI Paris",
  "SSBM GENEVA",
  "IIIT Bangalore",
  "Liverpool Business School",
  "IIM Kozhikode",
  "MICA",
];

const PROGRAMS = [
  "Doctorate · DBA",
  "Master · MBA",
  "DBA + MBA Dual",
  "HR Analytics",
  "Data Science & AI",
  "Certifications",
  "Executive Programs",
];

export function Footer() {
  const [expertOpen, setExpertOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState(null);

  const openExpertForm = () => {
    setExpertOpen(true);
  };

  const closeExpertForm = () => {
    setExpertOpen(false);
  };

  const closeLegalDialog = () => {
    setActiveDialog(null);
  };

  return (
    <>
      <footer className="w-full">
        {/* =====================================================
            TOP CTA SECTION
        ====================================================== */}
        <section className="bg-[#1d3557] py-8 md:py-10" id="expert-counseling">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-extrabold text-[#f1dfa0] md:text-4xl">
                  Need clarification?
                </h3>
                <p className="mt-2 text-sm font-medium text-white md:text-[18px]">
                  Interact with experts, Get free consultation.
                </p>
              </div>

              <button
                type="button"
                onClick={openExpertForm}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-r from-[#EEC471] to-[#F1E2A3] px-8 py-3.5 text-base font-extrabold text-[#1d3557] shadow-md transition duration-300 hover:scale-[1.03] hover:shadow-xl"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <span>Talk to Experts</span>
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN FOOTER SECTION
        ====================================================== */}
        <section className="border-t border-[#A66E38]/20 bg-linear-to-r from-[#EEC471] to-[#F1E2A3] pb-8 pt-12 text-gray-800 md:pt-16">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
              {/* =================================================
                  COLUMN 1: LOGO, ADDRESS, SOCIALS AND MAP
              ================================================== */}
              <div className="flex flex-col items-start md:col-span-2 lg:col-span-4">
                <Image
                  src="/assets/images/sode_footer_logo.png"
                  alt="School of Online and Distance Education"
                  width={230}
                  height={100}
                  className="mb-5 h-auto w-[200px] object-contain md:w-[230px]"
                />

                <address className="max-w-[320px] not-italic text-[13px] leading-6 text-gray-700 md:text-[13.5px]">
                  B-63, B Block, Sector 2
                  <br />
                  Noida, Uttar Pradesh 201301
                </address>

                {/* Social Media Icons */}
                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/distanceeducationschool/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    title="Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M13.5 22v-9h3l.5-3.5h-3.5V7.25c0-1.01.28-1.7 1.75-1.7H17V2.42C16.7 2.38 15.67 2.3 14.45 2.3c-2.55 0-4.3 1.56-4.3 4.42V9.5H7.25V13h2.9v9h3.35Z" />
                    </svg>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href="https://x.com/distance_school"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    title="X"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[16px] w-[16px]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M18.9 2H22l-6.77 7.74L23 22h-6.09l-4.77-6.24L6.68 22H3.56l7.13-8.15L3.24 2h6.24l4.31 5.7L18.9 2Zm-1.09 17.84h1.72L8.54 4.05H6.69l11.12 15.79Z" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/distanceeducationschool/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    title="Instagram"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://in.linkedin.com/company/distanceeducationschool"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[17px] w-[17px]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M5.34 3.5A2.34 2.34 0 1 1 5.34 8.18 2.34 2.34 0 0 1 5.34 3.5ZM3.32 9.86h4.04V22H3.32V9.86ZM9.78 9.86h3.87v1.66h.06c.54-1.02 1.86-2.1 3.82-2.1 4.09 0 4.84 2.69 4.84 6.19V22h-4.03v-5.66c0-1.35-.03-3.09-1.88-3.09-1.88 0-2.17 1.47-2.17 2.99V22H9.78V9.86Z" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/channel/UCw9KLsERm_EzL2js_s7GbLQ/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    title="YouTube"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d3557] text-[#f4cc78] transition duration-300 hover:-translate-y-1 hover:bg-[#142943]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[18px] w-[18px]"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M23.5 6.2a3.03 3.03 0 0 0-2.13-2.14C19.49 3.55 12 3.55 12 3.55s-7.49 0-9.37.51A3.03 3.03 0 0 0 .5 6.2 31.48 31.48 0 0 0 0 12a31.48 31.48 0 0 0 .5 5.8 3.03 3.03 0 0 0 2.13 2.14c1.88.51 9.37.51 9.37.51s7.49 0 9.37-.51a3.03 3.03 0 0 0 2.13-2.14A31.48 31.48 0 0 0 24 12a31.48 31.48 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.23 3.6L9.6 15.6Z" />
                    </svg>
                  </a>

                  {/* Pinterest */}
                  <a
                    href="https://in.pinterest.com/distanceeducationschoolportal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                    title="Pinterest"
                  >
                    <Image
                      src="/assets/images/pinterest.png"
                      alt="Pinterest"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </a>
                </div>

                {/* Google Map */}
                <div className="mt-6 h-[130px] w-full max-w-[300px] overflow-hidden rounded-[10px] bg-white shadow-sm">
                  <iframe
                    title="SODE Counseling Services LLP location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4768637898865!2d77.31186327549909!3d28.585467775690503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5c84f62bb1f%3A0x2af499e58ca3717!2sSODE%20Counseling%20Services%20LLP!5e0!3m2!1sen!2sin!4v1783424979173!5m2!1sen!2sin"
                    width="300"
                    height="130"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="block h-full w-full border-0"
                  />
                </div>
              </div>

              {/* =================================================
                  TOP UNIVERSITIES
              ================================================== */}
              <div className="lg:col-span-3">
                <h4 className="mb-6 text-[14px] font-extrabold uppercase tracking-wider text-gray-900">
                  Top Universities
                </h4>

                <ul className="space-y-3.5 text-[14px] font-medium text-gray-700">
                  {UNIVERSITIES.map((university) => (
                    <li key={university}>
                      <a
                        href="#prestigious-institutions"
                        className="transition-colors hover:text-gray-950"
                      >
                        {university}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* =================================================
                  ONLINE PROGRAMS
              ================================================== */}
              <div className="lg:col-span-3">
                <h4 className="mb-6 text-[14px] font-extrabold uppercase tracking-wider text-gray-900">
                  Online Programs
                </h4>

                <ul className="space-y-3.5 text-[14px] font-medium text-gray-700">
                  {PROGRAMS.map((program) => (
                    <li key={program}>
                      <a
                        href="#premium-programs"
                        className="transition-colors hover:text-gray-950"
                      >
                        {program}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* =================================================
                  GET STARTED
              ================================================== */}
              <div className="lg:col-span-2">
                <h4 className="mb-6 text-[14px] font-extrabold uppercase tracking-wider text-gray-900">
                  Get Started
                </h4>

                <ul className="space-y-3.5 text-[14px] font-medium text-gray-700">
                  <li>
                    <a
                      href="#why-choose"
                      className="transition-colors hover:text-gray-950"
                    >
                      About Us
                    </a>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={openExpertForm}
                      className="cursor-pointer text-left transition-colors hover:text-gray-950"
                    >
                      Contact Us
                    </button>
                  </li>

                  <li>
                    <button
                      type="button"
                      onClick={openExpertForm}
                      className="cursor-pointer text-left transition-colors hover:text-gray-950"
                    >
                      Book Free Counseling
                    </button>
                  </li>

                  <li>
                    <a
                      href="#alumni-voices"
                      className="transition-colors hover:text-gray-950"
                    >
                      Alumni Voices
                    </a>
                  </li>

                  <li>
                    <a
                      href="#faqs"
                      className="transition-colors hover:text-gray-950"
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* =================================================
                COPYRIGHT SECTION
            ================================================== */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-[#A66E38]/25 pt-6 text-[13.5px] font-medium text-gray-700 md:flex-row">
              <p className="order-2 text-center md:order-1 md:text-left">
                Copyright 2026 SODE Counseling Services LLP | All Rights
                Reserved
              </p>

              <div className="order-1 flex flex-wrap items-center justify-center gap-2 md:order-2">
                <button
                  type="button"
                  onClick={() => setActiveDialog("disclaimer")}
                  className="cursor-pointer transition-colors hover:text-gray-950"
                >
                  Disclaimer
                </button>

                <span aria-hidden="true">|</span>

                <button
                  type="button"
                  onClick={() => setActiveDialog("privacy")}
                  className="cursor-pointer transition-colors hover:text-gray-950"
                >
                  Privacy
                </button>

                <span aria-hidden="true">|</span>

                <button
                  type="button"
                  onClick={() => setActiveDialog("terms")}
                  className="cursor-pointer transition-colors hover:text-gray-950"
                >
                  Terms &amp; Condition
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Legal content triggers directly when activeDialog has content */}
        {activeDialog && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <div className="relative max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
              <button
                type="button"
                onClick={closeLegalDialog}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 font-bold"
              >
                ✕
              </button>
              <div className="space-y-4">
                {activeDialog === "disclaimer" && (
                  <DisclaimerContent onClose={closeLegalDialog} />
                )}

                {activeDialog === "privacy" && (
                  <PrivacyContent onClose={closeLegalDialog} />
                )}

                {activeDialog === "terms" && (
                  <TermsContent onClose={closeLegalDialog} />
                )}
              </div>
            </div>
          </div>
        )}
      </footer>
    </>
  );
}

export default Footer;
