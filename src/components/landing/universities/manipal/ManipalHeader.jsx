"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { manipalImg } from "./constants";

const { Header } = Layout;

export default function ManipalHeader({ onOpenScholarship }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Approvals", href: "#approvals" },
    { label: "Key Features", href: "#features" },
    { label: "Programs", href: "#programs" },
    { label: "About", href: "#about" },
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
        @keyframes manipalBtnShine {
          0% { left: -75%; }
          100% { left: 135%; }
        }
        .manipal-shining-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.45) 50%, rgba(255, 255, 255, 0) 100%);
          transform: skewX(-25deg);
          animation: manipalBtnShine 2.5s infinite;
          pointer-events: none;
        }
      `}</style>

      {/* 100% Full-Width Header Background */}
      <Header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.06)] p-0 h-auto leading-normal">
        <Container className="flex items-center justify-between h-15.5 sm:h-16.5 lg:h-17.5">
          {/* Left: Manipal Online Logo */}
          <Link
            href="/manipal"
            className="relative inline-flex items-center shrink-0"
          >
            <div className="relative w-36 sm:w-44 lg:w-48 h-10 sm:h-11 lg:h-12">
              <Image
                src={manipalImg("manipal-logo.webp")}
                alt="Manipal University Online"
                fill
                priority
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 192px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Right: Desktop Scholarship Coupon Button with Infinite Shine */}
          <div className="hidden md:flex items-center">
            <Button
              type="primary"
              onClick={onOpenScholarship}
              className="manipal-shining-btn relative inline-flex items-center justify-center gap-2 text-white font-bold text-[13.5px] lg:text-[14px] h-9.5 lg:h-10.5 px-4 lg:px-5 rounded-lg border-none shadow-[0_8px_20px_rgba(46,204,113,0.38)] hover:shadow-[0_12px_24px_rgba(46,204,113,0.5)] transition-all cursor-pointer overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #2ecc71, #27ae60)",
                borderColor: "transparent",
              }}
            >
              <span className="relative w-5.5 h-5.5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs">
                <Image
                  src={manipalImg("gift.gif")}
                  alt="gift"
                  fill
                  sizes="22px"
                  unoptimized
                  className="object-cover rounded-full"
                />
              </span>
              <span>Scholarship Coupon Code</span>
            </Button>
          </div>

          {/* Right: Mobile Hamburger Icon */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-[#ee3024] hover:bg-orange-50 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <MenuOutlined className="text-[20px]" />
            </button>
          </div>
        </Container>
      </Header>

      {/* Ant Design Drawer from Top for Mobile Navigation */}
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
          <div className="flex items-center justify-between h-15.5 px-4 border-b border-gray-100">
            <Link
              href="/manipal"
              onClick={() => setMobileMenuOpen(false)}
              className="relative inline-flex items-center shrink-0"
            >
              <div className="relative w-36 h-10">
                <Image
                  src={manipalImg("manipal-logo.webp")}
                  alt="Manipal University Online"
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
              className="w-9 h-9 rounded-sm bg-orange-50 flex items-center justify-center text-[#ee3024] hover:bg-orange-100 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <CloseOutlined className="text-[17px]" />
            </button>
          </div>

          <div className="flex flex-col w-full">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="w-full text-center py-3.5 text-[15px] font-semibold text-[#112244] hover:text-[#ee3024] hover:bg-orange-50/50 border-b border-gray-100 transition-colors cursor-pointer select-none"
              >
                {link.label}
              </a>
            ))}

            <div className="py-4 px-5 flex justify-center">
              <Button
                type="primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenScholarship) onOpenScholarship();
                }}
                className="manipal-shining-btn relative w-full max-w-75 inline-flex items-center justify-center gap-2 text-white font-bold text-[14px] h-11 rounded-lg border-none shadow-[0_6px_18px_rgba(46,204,113,0.4)] transition-all cursor-pointer overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #2ecc71, #27ae60)",
                  borderColor: "transparent",
                }}
              >
                <span className="relative w-5.5 h-5.5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <Image
                    src={manipalImg("gift.gif")}
                    alt="gift"
                    fill
                    sizes="22px"
                    unoptimized
                    className="object-cover rounded-full"
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

