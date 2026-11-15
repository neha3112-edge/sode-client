"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { vguImg } from "./constants";

export const VGU_NAV_LINKS = [
  { label: "Programmes", href: "#programs" },
  { label: "Accreditation", href: "#approvals" },
  { label: "About VGU", href: "#about" },
  { label: "Why Choose VGU", href: "#whychoose" },
  { label: "Admission Process", href: "#process" },
  { label: "FAQs", href: "#faqs" },
];

export default function VguHeader({ onOpenScholarship }) {
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
      {/* Infinite diagonal shine animation matching CU, Amity & MU */}
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

      <header className="sticky top-0 z-50 bg-white shadow-xs border-b border-gray-100/80 transition-all select-none">
        <Container className="flex items-center justify-between py-2.5 sm:py-3.5">
          {/* VGU Brand Logo */}
          <Link href="/vgu" className="inline-flex items-center">
            <div className="relative w-[190px] sm:w-[220px] md:w-[250px] h-[44px] sm:h-[50px] md:h-[54px]">
              <Image
                src={vguImg("vgu-logo.webp")}
                alt="Vivekananda Global University Online"
                fill
                priority
                sizes="(max-width: 640px) 190px, 250px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Right Action on Desktop: Green Scholarship Coupon Code Button */}
          <div className="hidden md:flex items-center">
            <button
              type="button"
              onClick={onOpenScholarship}
              className="header-coupon-shine inline-flex items-center gap-2 bg-[#25a244] hover:bg-[#1f8b39] text-white font-bold text-xs sm:text-sm py-2 sm:py-2.5 px-3.5 sm:px-5 rounded-md shadow-sm border-none cursor-pointer transition-all active:scale-95"
            >
              <span className="relative w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs p-0.5">
                <Image
                  src={vguImg("gift.gif")}
                  alt="Scholarship Gift"
                  width={18}
                  height={18}
                  className="object-contain rounded-full"
                  unoptimized
                />
              </span>
              <span>Scholarship Coupon Code</span>
            </button>
          </div>

          {/* Right Action on Mobile: Hamburger Menu Button (3 blue horizontal bars matching reference) */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-[#08417b] hover:bg-blue-50/70 rounded-md transition-colors cursor-pointer border-none bg-transparent focus:outline-none"
              aria-label="Open Navigation Menu"
            >
              <svg
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#08417b"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        placement="top"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        styles={{ body: { padding: 0 } }}
        closable={false}
      >
        <div className="flex flex-col h-full bg-white select-none">
          {/* Drawer Top Header with Logo and Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="relative w-[150px] h-[36px]">
              <Image
                src={vguImg("vgu-logo.webp")}
                alt="VGU Online"
                fill
                sizes="150px"
                className="object-contain object-left"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-[#08417b] hover:bg-blue-50 rounded-md bg-transparent border-none cursor-pointer transition-colors"
              aria-label="Close menu"
            >
              <CloseOutlined className="text-lg" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col p-4 space-y-2">
            {VGU_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-800 hover:text-[#811811] font-semibold text-sm py-2.5 px-2 rounded-md hover:bg-red-50/50 border-b border-gray-50 no-underline transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Drawer Bottom Action: Scholarship Button */}
          <div className="p-4 mt-auto border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScholarship?.();
              }}
              className="header-coupon-shine w-full inline-flex items-center justify-center gap-2 bg-[#25a244] hover:bg-[#1f8b39] text-white font-bold text-sm py-2.5 px-4 rounded-md shadow-sm cursor-pointer border-none"
            >
              <span className="relative w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs p-0.5">
                <Image
                  src={vguImg("gift.gif")}
                  alt="Scholarship Gift"
                  width={18}
                  height={18}
                  className="object-contain rounded-full"
                  unoptimized
                />
              </span>
              <span>Scholarship Coupon Code</span>
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
}
