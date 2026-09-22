"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, FileText } from "lucide-react";
import { Button } from "antd";
import LandingContainer from "./LandingContainer";

export default function LandingNavbar({ brand = {}, onOpenApply, onOpenBrochure }) {
  const {
    name = "Amity University Online",
    logo = "/assets/images/amity_online_logo.png",
    primaryColor = "#08417b",
  } = brand;

  return (
    <header className="navbar sticky top-0 z-50 bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
      <LandingContainer className="top-navbar h-[66px] sm:h-[72px] flex items-center justify-between">
        {/* Left: SODE Icon + Divider + University Logo */}
        <div className="logo flex items-center">
          <Link href="/" className="des_logo flex items-center shrink-0" aria-label="SODE Home">
            <div className="relative w-9 sm:w-11 h-9 sm:h-11">
              <Image
                src="/assets/images/sode_icon.png"
                alt="SODE"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 640px) 36px, 44px"
              />
            </div>
          </Link>

          {/* Thin Vertical Divider */}
          <div className="h-8 sm:h-10 w-[1px] bg-[#d1d5db] mx-2.5 sm:mx-4 shrink-0" />

          {/* University Online Logo */}
          <Link href="#hero" className="mang_logo flex items-center" aria-label={name}>
            <div className="relative w-32 sm:w-44 h-8 sm:h-10">
              <Image
                src={logo}
                alt={name}
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 128px, 176px"
              />
            </div>
          </Link>
        </div>

        {/* Right: Admission Open 2026 */}
        <div className="header_heading">
          <h2
            className="text-[15px] sm:text-xl md:text-2xl font-bold tracking-tight m-0 text-right"
            style={{ color: primaryColor || "#08417b" }}
          >
            Admission Open 2026
          </h2>
        </div>
      </LandingContainer>
    </header>
  );
}
