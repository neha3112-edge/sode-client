"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { amityImg } from "./constants";

const { Header } = Layout;

export default function AmityHeader({ onOpenScholarship }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Courses", href: "#programmes" },
    { label: "Approvals", href: "#approvals" },
    { label: "About", href: "#about" },
    { label: "Advantage", href: "#advantage" },
    { label: "FAQs", href: "#faqs" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetId = href.replace(/^#/, "");

    // Allow Drawer closing animation to start and body scroll lock to release
    setTimeout(() => {
      const el =
        document.getElementById(targetId) ||
        (targetId === "programmes" && document.getElementById("program")) ||
        (targetId === "advantage" && document.getElementById("whychoose")) ||
        (targetId === "faqs" && document.getElementById("faq"));

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
        @keyframes amityBtnShine {
          0% { left: -75%; }
          100% { left: 135%; }
        }
        .amity-shining-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.45) 50%, rgba(255, 255, 255, 0) 100%);
          transform: skewX(-25deg);
          animation: amityBtnShine 2.5s infinite;
          pointer-events: none;
        }
      `}</style>

      {/* 100% Full-Width Header Background */}
      <Header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-0 h-auto leading-normal">
        {/* Content constrained inside Container */}
        <Container className="flex items-center justify-between h-15.5 sm:h-16.5 lg:h-17.5">
          {/* Left: Amity Logo */}
          <Link
            href="/amity"
            className="relative inline-flex items-center shrink-0"
          >
            <div className="relative w-38.75 sm:w-47.5 lg:w-53.75 h-10 sm:h-11.5 lg:h-12.5">
              <Image
                src={amityImg("Amity-online-logo.png")}
                alt="Amity University Online"
                fill
                priority
                sizes="(max-width: 640px) 155px, (max-width: 1024px) 190px, 215px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Right: Desktop Scholarship Coupon Button with Infinite Shine */}
          <div className="hidden md:flex items-center">
            <Button
              type="primary"
              onClick={onOpenScholarship}
              className="amity-shining-btn relative inline-flex items-center justify-center gap-2 text-white font-bold text-[13.5px] lg:text-[14px] h-9.5 lg:h-10.5 px-4 lg:px-5 rounded-lg border-none shadow-[0_8px_20px_rgba(46,204,113,0.38)] hover:shadow-[0_12px_24px_rgba(46,204,113,0.5)] transition-all cursor-pointer overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #2ecc71, #27ae60)",
                borderColor: "transparent",
              }}
            >
              {/* Perfectly Rounded Circular Icon Container */}
              <span className="w-5.5 h-5.5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs">
                <Image
                  src={amityImg("gift.gif")}
                  alt="gift"
                  width={22}
                  height={22}
                  unoptimized
                  className="w-full h-full object-cover rounded-full"
                />
              </span>
              <span>Scholarship Coupon Code</span>
            </Button>
          </div>

          {/* Right: Mobile Hamburger Icon (Shown on Mobile) */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#08417b] hover:bg-blue-50 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <MenuOutlined className="text-[20px]" />
            </button>
          </div>
        </Container>
      </Header>

      {/* Ant Design Drawer from Top */}
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
          {/* Top Bar with Logo on Left and [X] Light-Blue Square Box on Right */}
          <div className="flex items-center justify-between h-15.5 px-4 border-b border-gray-100">
            <Link
              href="/amity"
              onClick={() => setMobileMenuOpen(false)}
              className="relative inline-flex items-center shrink-0"
            >
              <div className="relative w-38.75 h-10">
                <Image
                  src={amityImg("Amity-online-logo.png")}
                  alt="Amity University Online"
                  fill
                  priority
                  sizes="155px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-sm bg-[#f0f5ff] flex items-center justify-center text-[#08417b] hover:bg-blue-100 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <CloseOutlined className="text-[17px]" />
            </button>
          </div>

          {/* Centered Navigation Links with Horizontal Dividers */}
          <div className="flex flex-col w-full">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="w-full text-center py-3.5 text-[15px] font-semibold text-[#112244] hover:text-[#08417b] hover:bg-gray-50 border-b border-gray-100 transition-colors cursor-pointer select-none"
              >
                {link.label}
              </a>
            ))}

            {/* Bottom: Scholarship Coupon Code Button with Infinite Shine */}
            <div className="py-4 px-5 flex justify-center">
              <Button
                type="primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenScholarship) onOpenScholarship();
                }}
                className="amity-shining-btn relative w-full max-w-75 inline-flex items-center justify-center gap-2 text-white font-bold text-[14px] h-11 rounded-lg border-none shadow-[0_6px_18px_rgba(46,204,113,0.4)] transition-all cursor-pointer overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #2ecc71, #27ae60)",
                  borderColor: "transparent",
                }}
              >
                {/* Perfectly Rounded Circular Icon Container */}
                <span className="w-5.5 h-5.5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <Image
                    src={amityImg("gift.gif")}
                    alt="gift"
                    width={22}
                    height={22}
                    unoptimized
                    className="w-full h-full object-cover rounded-full"
                  />
                </span>
                <span>Scholarship Coupon Code</span>
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
