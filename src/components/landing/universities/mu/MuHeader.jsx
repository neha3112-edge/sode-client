"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Container } from "@/components/common/Container";
import { muImg, MU_NAV_LINKS } from "./constants";

export default function MuHeader({ onOpenScholarship }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <style jsx>{`
        @keyframes headerShine {
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
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: headerShine 2.5s infinite;
          pointer-events: none;
        }
      `}</style>

      <header className="sticky top-0 z-50 w-full bg-white shadow-xs border-b border-gray-100 select-none">
        <Container>
          <div className="flex items-center justify-between h-[66px] sm:h-[72px]">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link href="/mu" className="flex items-center cursor-pointer no-underline">
                <Image
                  src={muImg("mangalayatan-logo-naac.webp")}
                  alt="Mangalayatan University Online"
                  width={240}
                  height={55}
                  priority
                  style={{ width: "auto", height: "auto" }}
                  className="w-auto h-[44px] sm:h-[50px] object-contain"
                />
              </Link>
            </div>

            {/* Right Action Button & Mobile Toggle - Mobile matches media_1794684611346_5ff22e7a.jpg */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenScholarship}
                className="header-coupon-shine hidden lg:inline-flex items-center gap-2 bg-[#25a244] hover:bg-[#1f8b39] text-white font-bold text-xs sm:text-sm py-2 px-3.5 sm:px-5 rounded-md shadow-sm hover:shadow transition-all cursor-pointer border-none"
              >
                <span className="relative w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <Image
                    src={muImg("gift.gif")}
                    alt="Gift"
                    width={20}
                    height={20}
                    className="object-cover rounded-full"
                    unoptimized
                  />
                </span>
                <span>Scholarship Coupon Code</span>
              </button>

              {/* Hamburger Button for Mobile - Only hamburger on mobile */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden p-1.5 text-[#193579] border-none bg-transparent cursor-pointer flex items-center justify-center text-2xl font-bold"
                aria-label="Open Navigation Menu"
              >
                <MenuOutlined className="text-2xl text-[#193579]" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Navigation */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="top"
        closeIcon={null}
        styles={{ body: { padding: 0 } }}
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <Image
            src={muImg("mangalayatan-logo-naac.webp")}
            alt="Mangalayatan University"
            width={160}
            height={40}
            style={{ width: "auto", height: "auto" }}
            className="w-auto h-8 object-contain"
          />
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="text-gray-500 hover:text-black border-none bg-transparent text-lg cursor-pointer p-1"
            aria-label="Close menu"
          >
            <CloseOutlined />
          </button>
        </div>

        <div className="py-2">
          {MU_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="block px-6 py-3 text-gray-800 hover:bg-gray-50 hover:text-[#193579] font-medium text-sm no-underline border-b border-gray-50"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="p-4 mt-2">
          <button
            type="button"
            onClick={() => {
              setDrawerOpen(false);
              onOpenScholarship?.();
            }}
            className="header-coupon-shine w-full inline-flex items-center justify-center gap-2 bg-[#25a244] hover:bg-[#1f8b39] text-white font-bold text-sm py-2.5 px-4 rounded-full shadow-sm border-none cursor-pointer"
          >
            <span className="relative w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 shadow-xs">
              <Image
                src={muImg("gift.gif")}
                alt="Gift"
                width={20}
                height={20}
                className="object-cover rounded-full"
                unoptimized
              />
            </span>
            <span>Scholarship Coupon Code</span>
          </button>
        </div>
      </Drawer>
    </>
  );
}

