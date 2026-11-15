"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { shooliniImg } from "./constants";

export const SHOOLINI_NAV_LINKS = [
  { label: "Programs", href: "#programs" },
  { label: "Approvals", href: "#approvals" },
  { label: "Pay After Placement", href: "#about" },
  { label: "Why Trust", href: "#why-trust" },
  { label: "Recruiters", href: "#recruiters" },
  { label: "Admission Process", href: "#process" },
  { label: "FAQs", href: "#faq" },
];

export default function ShooliniHeader({ onOpenScholarship }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace(/^#/, "");
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const headerOffset = 64;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 150);
  };

  return (
    <>
      {/* Infinite diagonal shine animation */}
      <style>{`
        @keyframes headerCouponShine {
          0% {
            left: -75%;
          }
          100% {
            left: 135%;
          }
        }
        .header-coupon-shine {
          position: relative;
          overflow: hidden;
        }
        .header-coupon-shine::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.45) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: headerCouponShine 2.8s infinite;
          pointer-events: none;
        }
      `}</style>

      <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-gray-100 transition-all select-none">
        <Container className="flex items-center justify-between py-2.5 sm:py-3.5">
          {/* Shoolini University Brand Logo */}
          <Link href="/shoolini" className="inline-flex items-center">
            <div className="relative w-[180px] sm:w-[220px] md:w-[250px] h-[44px] sm:h-[50px] md:h-[54px]">
              <Image
                src={shooliniImg("main-new-logo.webp")}
                alt="Shoolini University Online"
                fill
                priority
                sizes="(max-width: 640px) 180px, 250px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Right Action on Desktop: Green Scholarship Coupon Code Button */}
          <div className="hidden md:flex items-center">
            <button
              type="button"
              onClick={onOpenScholarship}
              className="header-coupon-shine inline-flex items-center gap-2 bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs sm:text-sm py-2 sm:py-2.5 px-4 sm:px-5 rounded-md shadow-sm border-none cursor-pointer transition-all active:scale-95"
            >
              <span className="relative w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs p-0.5">
                <Image
                  src={shooliniImg("gift.gif")}
                  alt="Coupon"
                  width={20}
                  height={20}
                  className="object-contain rounded-full"
                  unoptimized
                />
              </span>
              <span className="tracking-wide">Scholarship Coupon Code</span>
            </button>
          </div>

          {/* Mobile Right: 3-bar Hamburger Icon */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle navigation menu"
              className="inline-flex flex-col items-center justify-center w-10 h-10 rounded-md border border-gray-200 text-gray-800 hover:bg-gray-50 focus:outline-hidden"
            >
              <span className="block w-5 h-0.5 bg-[#fd202a] mb-1"></span>
              <span className="block w-5 h-0.5 bg-[#fd202a] mb-1"></span>
              <span className="block w-5 h-0.5 bg-[#fd202a]"></span>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Navigation from Top */}
      <Drawer
        placement="top"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        closable={false}
        styles={{ body: { padding: 0 } }}
      >
        <div className="w-full bg-white flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="relative w-[150px] h-[40px]">
              <Image
                src={shooliniImg("main-new-logo.webp")}
                alt="Shoolini University Online"
                fill
                sizes="150px"
                className="object-contain object-left"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer border-none"
              aria-label="Close menu"
            >
              <CloseOutlined className="text-sm" />
            </button>
          </div>

          <div className="p-4 border-b border-gray-100 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScholarship?.();
              }}
              className="w-full max-w-sm header-coupon-shine flex items-center justify-center gap-2 bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs py-2.5 px-4 rounded-full shadow-xs border-none cursor-pointer"
            >
              <span className="relative w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs p-0.5">
                <Image
                  src={shooliniImg("gift.gif")}
                  alt="Coupon"
                  width={20}
                  height={20}
                  className="object-contain rounded-full"
                  unoptimized
                />
              </span>
              <span>Scholarship Coupon Code</span>
            </button>
          </div>

          <nav className="flex flex-col w-full py-2">
            {SHOOLINI_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="w-full text-center py-3 text-sm font-semibold text-gray-800 hover:text-[#fd202a] hover:bg-[#fff5f5] border-b border-gray-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Drawer>
    </>
  );
}

