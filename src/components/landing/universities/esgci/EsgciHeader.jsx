"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import { Menu, X } from "lucide-react";
import { esgciImg, ESGCI_NAV_LINKS } from "./constants";

export default function EsgciHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs select-none">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px] sm:h-[76px]">
            {/* Left: SODE Logo - Free natural size */}
            <Link href="/esgci" className="flex items-center py-1">
              <Image
                src={esgciImg("new_sode_tm_logo.png")}
                alt="Distance Education School - SODE"
                width={708}
                height={655}
                priority
                className="h-[48px] sm:h-[56px] w-auto object-contain block"
                style={{ width: "auto", height: "auto", maxHeight: "58px" }}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 lg:space-x-8">
              {ESGCI_NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-neutral-800 hover:text-[#04903c] text-[15px] font-semibold transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Mobile Hamburger Menu Button (Blue Rounded Square matching live site) */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="w-9 h-9 rounded-[6px] bg-[#08417b] flex items-center justify-center text-white border-none cursor-pointer shadow-xs active:scale-95 transition-transform"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <Drawer
        title={
          <div className="flex items-center justify-between w-full py-1">
            <Image
              src={esgciImg("new_sode_tm_logo.png")}
              alt="SODE Logo"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
            />
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-full text-neutral-500 hover:text-black border-none bg-transparent cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        }
        placement="right"
        closable={false}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        size={260}
      >
        <div className="flex flex-col space-y-4 pt-2">
          {ESGCI_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsDrawerOpen(false)}
              className="text-[16px] font-semibold text-neutral-800 hover:text-[#04903c] py-2 border-b border-gray-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Drawer>
    </>
  );
}

