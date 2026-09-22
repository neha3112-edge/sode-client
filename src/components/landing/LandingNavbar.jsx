"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, FileText } from "lucide-react";
import { Button } from "antd";

export default function LandingNavbar({ brand = {}, onOpenApply, onOpenBrochure }) {
  const {
    name = "University Online",
    phone = "1800-102-3434",
    phoneDisplay = "1800-102-3434",
    logo,
    sodeLogo = "/assets/images/sode_logo_official.webp",
  } = brand;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Logos: University & Platform */}
        <div className="flex items-center gap-3 sm:gap-5">
          {logo && (
            <Link href="#hero" className="inline-flex items-center" aria-label={name}>
              <div className="relative h-9 sm:h-11 w-32 sm:w-40">
                <Image src={logo} alt={name} fill priority className="object-contain object-left" sizes="160px" />
              </div>
            </Link>
          )}
          <div className="h-6 w-px bg-slate-300 hidden sm:block" />
          <Link href="/" className="hidden sm:inline-flex items-center" aria-label="SODE Home">
            <div className="relative h-6 sm:h-8 w-24 sm:w-28">
              <Image src={sodeLogo} alt="SODE" fill priority className="object-contain object-left" sizes="112px" />
            </div>
          </Link>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${phone.replace(/\D/g, "")}`}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold no-underline transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-700" />
            <span>{phoneDisplay}</span>
          </a>

          <Button
            type="default"
            size="middle"
            icon={<FileText className="w-3.5 h-3.5" />}
            onClick={() => onOpenBrochure?.()}
            className="!hidden md:!inline-flex !items-center !text-xs !font-semibold !rounded-md"
          >
            Brochure
          </Button>

          <Button
            type="primary"
            size="middle"
            onClick={() => onOpenApply?.()}
            className="!bg-[#ffd200] hover:!bg-[#ffc107] !text-[#08417b] !font-bold !text-xs sm:!text-sm !rounded-md !border-none !shadow-xs"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </header>
  );
}
