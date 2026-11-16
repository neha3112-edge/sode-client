"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import { Menu, X } from "lucide-react";
import { edgewoodImg, EDGEWOOD_NAV_LINKS } from "./constants";

export default function EdgewoodHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs select-none">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px] sm:h-[76px]">
            {/* Left: SODE Logo - Free natural size */}
            <Link href="/edgewood" className="flex items-center py-1">
              <Image
                src={edgewoodImg("new_sode_tm_logo.png")}
                alt="School of Distance Education"
                width={708}
                height={655}
                priority
                className="h-[48px] sm:h-[56px] w-auto object-contain block"
                style={{ width: "auto", height: "auto", maxHeight: "58px" }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
              {EDGEWOOD_NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-neutral-800 hover:text-[#b2171e] text-[14.5px] font-semibold transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Hamburger Menu Button (Blue Rounded Square matching screenshot) */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="w-9 h-9 rounded-[8px] bg-[#0b3c66] flex items-center justify-center text-white border-none cursor-pointer shadow-xs active:scale-95 transition-transform"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-5 h-5 text-white stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (opens from top) */}
      <Drawer
        placement="top"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        size={260}
        closable={false}
        styles={{
          body: {
            padding: "16px 20px 24px 20px",
            backgroundColor: "#ffffff",
          },
        }}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <Image
            src={edgewoodImg("new_sode_tm_logo.png")}
            alt="School of Distance Education"
            width={708}
            height={655}
            className="h-[46px] w-auto object-contain block"
            style={{ width: "auto", height: "auto", maxHeight: "48px" }}
          />
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 rounded-md text-neutral-600 hover:bg-neutral-100 border-none bg-transparent cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col py-3">
          {EDGEWOOD_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsDrawerOpen(false)}
              className="py-2.5 px-3 text-[15px] font-semibold text-neutral-800 hover:bg-neutral-50 hover:text-[#b2171e] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Drawer>
    </>
  );
}

