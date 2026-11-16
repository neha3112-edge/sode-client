"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { cuImg, CU_NAV_LINKS } from "./constants";

export default function CuHeader({ onOpenScholarship }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <style jsx>{`
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
          animation: headerCouponShine 2.5s infinite;
          pointer-events: none;
        }
      `}</style>

      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-xs select-none">
        <Container>
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            {/* Logo */}
            <Link href="/cu" className="flex items-center">
              <div className="relative w-[180px] sm:w-[220px] h-[40px] sm:h-[48px]">
                <Image
                  src={cuImg("cu-online1.png")}
                  alt="Chandigarh University Online"
                  fill
                  priority
                  sizes="(max-width: 640px) 180px, 220px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            {/* Desktop Navigation Links - Hidden for CU as per reference screenshot */}
            <div className="hidden" />

            {/* Right Action: Scholarship Coupon Button (rounded-md with infinite shine and full rounded gif) */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenScholarship}
                className="header-coupon-shine hidden sm:inline-flex items-center gap-2 bg-[#25a244] hover:bg-[#1f8b39] text-white font-bold text-xs sm:text-[13px] py-2 px-4 sm:px-5 rounded-md shadow-sm hover:shadow transition-all cursor-pointer border-none"
              >
                <span className="relative w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs p-0.5">
                  <Image
                    src={cuImg("gift.gif")}
                    alt="Scholarship Gift"
                    width={18}
                    height={18}
                    className="object-contain rounded-full"
                    unoptimized
                  />
                </span>
                <span>Scholarship Coupon Code</span>
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-gray-700 hover:text-[#d11c1f] cursor-pointer bg-transparent border-none focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <MenuOutlined className="text-xl" />
              </button>
            </div>
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
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="relative w-[150px] h-[34px]">
              <Image
                src={cuImg("cu-online1.png")}
                alt="CU Online"
                fill
                sizes="150px"
                className="object-contain object-left"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 text-gray-500 hover:text-gray-900 bg-transparent border-none cursor-pointer"
            >
              <CloseOutlined className="text-base" />
            </button>
          </div>

          <nav className="flex flex-col p-4 space-y-3">
            {CU_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 hover:text-[#d11c1f] font-medium text-base py-1.5 border-b border-gray-50 no-underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

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
                  src={cuImg("gift.gif")}
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
