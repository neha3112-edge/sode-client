"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { CheckCircle2, Phone, Download, ArrowRight, Clock, Award, ShieldCheck, ArrowLeft } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { THANK_YOU_UNIVERSITIES, DEFAULT_THANK_YOU } from "./thankYouConfig";

export default function LandingThankYouView({ universitySlug = "liverpool" }) {
  const searchParams = useSearchParams();
  const config = THANK_YOU_UNIVERSITIES[universitySlug] || DEFAULT_THANK_YOU;

  const isBrochure = searchParams.get("brochure") === "1" || searchParams.has("url");
  const brochureUrl = searchParams.get("url")
    ? decodeURIComponent(searchParams.get("url"))
    : config.defaultBrochure;

  const [downloadTriggered, setDownloadTriggered] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Trigger celebratory confetti on page mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.55 },
        colors: [config.primaryColor, "#00bcd4", "#22c55e", "#f59e0b"],
      });
    } catch {
      // safe fallback if canvas unsupported
    }
  }, [config.primaryColor]);

  // Auto-open brochure in new tab if brochure requested
  useEffect(() => {
    if (!isBrochure || !brochureUrl || downloadTriggered) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setDownloadTriggered(true);
          try {
            window.open(brochureUrl, "_blank");
          } catch {
            // Popup blocker prevented auto-open, user can click direct button
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBrochure, brochureUrl, downloadTriggered]);

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-[#1e293b] flex flex-col justify-between font-sans select-none antialiased">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER
      ───────────────────────────────────────────────────────────── */}
      <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-40 shadow-2xs">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo Area */}
          <Link href={config.backLink} className="flex items-center gap-3.5 no-underline">
            <div className="h-10 sm:h-12 flex items-center justify-start">
              <Image
                src={config.logo}
                alt={config.name}
                width={180}
                height={50}
                className="max-h-9 sm:max-h-11 w-auto object-contain"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </div>
          </Link>

          {/* Quick Help Contacts */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <Link
              href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Hi, I just submitted an application for ${config.name} on the website.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[13px] no-underline transition-all shadow-xs"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>WhatsApp</span>
            </Link>

            <Link
              href={`tel:${config.phone}`}
              className="inline-flex items-center gap-1.5 py-2 px-3.5 sm:px-4 rounded-lg bg-slate-900 hover:bg-black text-white font-bold text-[13px] no-underline transition-all shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{config.phoneDisplay}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN HERO CARD
      ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-[960px] w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center">
        {/* Success Card */}
        <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-10 text-center relative overflow-hidden">
          {/* Top Brand Accent Stripe */}
          <div
            className="absolute top-0 left-0 right-0 h-2"
            style={{ backgroundColor: config.primaryColor }}
          />

          {/* Checkmark Icon Badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-inner">
            <CheckCircle2 className="w-9 h-9 sm:w-12 sm:h-12 text-emerald-600 stroke-[2.5]" />
          </div>

          {/* Badge */}
          <span className="inline-block py-1 px-3.5 rounded-full bg-emerald-100/80 text-emerald-800 font-bold text-[11px] sm:text-[12px] tracking-wider uppercase mb-3">
            Submission Received Successfully
          </span>

          {/* Main Title */}
          <h1 className="text-[24px] sm:text-[32px] md:text-[36px] font-black text-slate-900 leading-tight m-0 mb-3">
            {config.headline}
          </h1>

          {/* Subtitle */}
          <p className="text-[14px] sm:text-[16px] text-slate-600 leading-relaxed max-w-[680px] mx-auto m-0 mb-7">
            {isBrochure
              ? `Your official curriculum brochure for ${config.name} is ready for you.`
              : `Thank you for taking the first step towards your career growth. Our expert academic counselors will get in touch with you shortly to guide you through admissions, specializations, and fee details.`}
          </p>

          {/* Brochure Box (Only if Brochure Flow) */}
          {isBrochure && (
            <div className="w-full max-w-[620px] mx-auto bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 mb-8 text-left">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <Download className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-bold text-slate-900 m-0 leading-snug">
                      Official University Brochure
                    </h3>
                    <p className="text-[12.5px] text-slate-500 m-0 mt-0.5">
                      {downloadTriggered
                        ? "Brochure has opened in a new tab"
                        : `Opening automatically in ${countdown}s...`}
                    </p>
                  </div>
                </div>

                <Link
                  href={brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-lg text-white font-bold text-[13px] sm:text-[13.5px] flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 no-underline shrink-0 w-full sm:w-auto"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </Link>
              </div>
            </div>
          )}

          {/* What Happens Next Section */}
          <div className="w-full pt-6 border-t border-slate-100 text-left">
            <h2 className="text-[16px] sm:text-[18px] font-extrabold text-slate-900 m-0 mb-4 text-center sm:text-left">
              What Happens Next?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-[12px] flex items-center justify-center">
                    1
                  </div>
                  <Clock className="w-4 h-4 text-blue-600" />
                  <h3 className="text-[14px] font-bold text-slate-800 m-0">15-Min Callback</h3>
                </div>
                <p className="text-[12.5px] text-slate-600 leading-snug m-0">
                  A certified senior academic counselor will connect with you to understand your career profile.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[12px] flex items-center justify-center">
                    2
                  </div>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-[14px] font-bold text-slate-800 m-0">Eligibility Check</h3>
                </div>
                <p className="text-[12.5px] text-slate-600 leading-snug m-0">
                  Instant verification of academic documents and work experience criteria for smooth admission.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-700 font-bold text-[12px] flex items-center justify-center">
                    3
                  </div>
                  <Award className="w-4 h-4 text-amber-600" />
                  <h3 className="text-[14px] font-bold text-slate-800 m-0">Fee &amp; Scholarships</h3>
                </div>
                <p className="text-[12.5px] text-slate-600 leading-snug m-0">
                  Assistance with special scholarship concessions, 0% interest EMI options, and seat reservation.
                </p>
              </div>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-100">
            <Link
              href={config.backLink}
              className="w-full sm:w-auto py-3 px-6 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[13.5px] flex items-center justify-center gap-2 no-underline transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {config.shortName}</span>
            </Link>

            <Link
              href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Hello, I have applied for ${config.name}. Please connect me with a counselor.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3 px-6 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-[13.5px] flex items-center justify-center gap-2 no-underline transition-all shadow-xs active:scale-95"
            >
              <FaWhatsapp className="w-4 h-4" />
              <span>Connect on WhatsApp</span>
            </Link>

            <Link
              href={`tel:${config.phone}`}
              className="w-full sm:w-auto py-3 px-6 rounded-lg text-white font-bold text-[13.5px] flex items-center justify-center gap-2 no-underline transition-all shadow-xs active:scale-95"
              style={{ backgroundColor: config.primaryColor }}
            >
              <Phone className="w-4 h-4" />
              <span>Call Counselor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────
          3. FOOTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="w-full bg-white border-t border-slate-200 py-4 px-4 text-center select-none text-[12px] sm:text-[13px] text-slate-500">
        <p className="m-0 leading-normal">
          &copy; {new Date().getFullYear()} Distance Education School. Official Marketing &amp; Student Support Partner for {config.name}.
        </p>
      </footer>
    </div>
  );
}

