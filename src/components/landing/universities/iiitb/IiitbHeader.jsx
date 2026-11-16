"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Drawer } from "antd";
import { Menu, X } from "lucide-react";
import { IIITB_NAV_LINKS, iiitbImg } from "./constants";

export default function IiitbHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_15px_rgba(0,0,0,0.06)] border-b border-gray-100 transition-all">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px] sm:h-[76px]">
          {/* Logo */}
          <Link href="/iiitb" className="flex items-center shrink-0">
            <Image
              src={iiitbImg("new_sode_tm_logo.png")}
              alt="SODE - Distance Education School"
              width={260}
              height={58}
              priority
              className="h-[46px] sm:h-[54px] w-auto object-contain"
              style={{ maxHeight: "56px" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
            {IIITB_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[14.5px] font-semibold text-neutral-800 hover:text-[#01519a] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors border-none bg-transparent cursor-pointer"
          >
            <Menu className="w-6 h-6 text-neutral-800" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        closeIcon={<X className="w-5 h-5 text-neutral-700" />}
        styles={{ wrapper: { width: 280, maxWidth: "85vw" }, body: { padding: "1.5rem" } }}
      >
        <div className="flex flex-col space-y-5 pt-2">
          {IIITB_NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[16px] font-semibold text-neutral-800 hover:text-[#01519a] transition-colors no-underline py-1.5 border-b border-gray-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Drawer>
    </header>
  );
}

