"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { lpuImg } from "./constants";

export default function LpuHeader({ onOpenScholarship }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Courses", href: "#program" },
    { label: "Approvals", href: "#approvals" },
    { label: "About", href: "#about" },
    { label: "Why LPU", href: "#pedagogy" },
    { label: "Degree", href: "#degree" },
    { label: "Placements", href: "#placement" },
    { label: "Process", href: "#process" },
    { label: "FAQs", href: "#faqs" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace(/^#/, "");
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        const headerOffset = 64;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 150);
  };

  return (
    <>
      {/* Infinite Shine Keyframes */}
      <style>{`
        @keyframes lpuBtnShine {
          0% { left: -75%; }
          100% { left: 135%; }
        }
        .lpu-shining-btn {
          position: relative;
          overflow: hidden;
        }
        .lpu-shining-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.45) 50%, rgba(255, 255, 255, 0) 100%);
          transform: skewX(-25deg);
          animation: lpuBtnShine 2.5s infinite;
          pointer-events: none;
        }
      `}</style>

      <header className="w-full bg-white border-b border-gray-100 py-2.5 sm:py-3 sticky top-0 z-40 select-none shadow-xs">
        <Container className="flex items-center justify-between">
          {/* Left: LPU Online Logo */}
          <Link href="/lpu" className="relative inline-flex items-center">
            <div className="relative w-36 sm:w-44 md:w-52 h-10 sm:h-12">
              <Image
                src={lpuImg("lpu-logo.png")}
                alt="LPU Online Logo"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 144px, 208px"
              />
            </div>
          </Link>

          {/* Right on Desktop: Scholarship Coupon Code Button with Shine */}
          <div className="hidden md:flex items-center">
            <button
              type="button"
              onClick={onOpenScholarship}
              className="lpu-shining-btn relative text-white text-[13px] lg:text-[14px] font-bold px-4 lg:px-5 py-2 rounded-lg shadow-[0_6px_18px_rgba(46,204,113,0.38)] hover:shadow-[0_10px_22px_rgba(46,204,113,0.5)] transition-all flex items-center gap-2 cursor-pointer border-none overflow-hidden select-none"
              style={{
                background: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
              }}
            >
              <span className="relative w-5.5 h-5.5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs z-10">
                <Image
                  src={lpuImg("gift.gif")}
                  alt="gift"
                  width={22}
                  height={22}
                  unoptimized
                  className="object-cover rounded-full"
                />
              </span>
              <span className="relative z-10">Scholarship Coupon Code</span>
            </button>
          </div>

          {/* Right on Mobile: Blue Hamburger Menu Icon matching media_1793967878007_f0b43605.jpg */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#08417b] hover:bg-blue-50 transition-colors cursor-pointer bg-transparent border-none p-0"
              aria-label="Open menu"
            >
              <MenuOutlined className="text-[22px] stroke-[2]" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Navigation Drawer */}
      <Drawer
        placement="top"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        closable={false}
        styles={{
          body: { padding: 0 },
          header: { display: "none" },
        }}
      >
        <div className="w-full bg-white">
          <div className="flex items-center justify-between h-15 px-4 border-b border-gray-100">
            <Link
              href="/lpu"
              onClick={() => setMobileMenuOpen(false)}
              className="relative inline-flex items-center"
            >
              <div className="relative w-36 h-10">
                <Image
                  src={lpuImg("lpu-logo.png")}
                  alt="LPU Online Logo"
                  fill
                  priority
                  sizes="144px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-sm bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer border-none"
              aria-label="Close menu"
            >
              <CloseOutlined className="text-[16px]" />
            </button>
          </div>

          <div className="flex flex-col w-full">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="w-full text-center py-3.5 text-[14.5px] font-semibold text-[#112244] hover:text-[#f58220] hover:bg-orange-50/50 border-b border-gray-100 transition-colors cursor-pointer select-none no-underline"
              >
                {link.label}
              </a>
            ))}

            <div className="py-4 px-5 flex justify-center">
              <Button
                type="primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenScholarship?.();
                }}
                className="lpu-shining-btn relative w-full max-w-[280px] inline-flex items-center justify-center gap-2 text-white font-bold text-[13.5px] h-10.5 rounded-lg border-none shadow-md cursor-pointer overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #2ecc71, #27ae60)",
                }}
              >
                <span className="relative w-5.5 h-5.5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs z-10">
                  <Image
                    src={lpuImg("gift.gif")}
                    alt="gift"
                    width={22}
                    height={22}
                    unoptimized
                    className="object-cover rounded-full"
                  />
                </span>
                <span className="relative z-10">Scholarship Coupon Code</span>
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
