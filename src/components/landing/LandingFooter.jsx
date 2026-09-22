"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LandingFooter({
  brand = {},
  onOpenDisclaimer,
  onOpenTerms,
  onOpenPrivacy,
  onOpenCompare,
}) {
  const universityName = brand.name || "University Online";
  const sodeLogo = brand.sodeLogo || "/assets/images/sode_logo_official.webp";

  return (
    <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center group" aria-label="SODE Home">
              <div className="relative h-6 w-24">
                <Image
                  src={sodeLogo}
                  alt="SODE - School of Online and Distance Education"
                  fill
                  className="object-contain object-left group-hover:opacity-90 transition-opacity"
                  sizes="96px"
                />
              </div>
            </Link>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-semibold">{universityName} Dedicated Partner Page</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400 flex-wrap justify-center">
            <button type="button" onClick={() => onOpenDisclaimer?.()} className="hover:text-amber-400 underline cursor-pointer">
              Disclaimer
            </button>
            <button type="button" onClick={() => onOpenTerms?.()} className="hover:text-amber-400 underline cursor-pointer">
              Terms & Conditions
            </button>
            <button type="button" onClick={() => onOpenPrivacy?.()} className="hover:text-amber-400 underline cursor-pointer">
              Privacy Policy
            </button>
            <button type="button" onClick={() => onOpenCompare?.()} className="hover:text-amber-400 underline cursor-pointer">
              Compare Universities
            </button>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed text-center sm:text-left m-0">
          Disclaimer: SODE is an authorized information and counseling platform providing guidance to students. All university names, logos, degrees, and trademarks belong to their respective institutions. Fee structures, syllabus, and examination schedules are subject to university revisions.
        </p>

        <div className="text-[11px] text-slate-600 text-center sm:text-left pt-2 border-t border-slate-900">
          © {new Date().getFullYear()} SODE & {universityName}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
