import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getAssetPath } from "@/lib/utils";

export function Header({ siteLogo }) {
  const logoPath = getAssetPath(siteLogo || "/assets/images/new_sode_tm_logo.png");

  return (
    <section className="w-full bg-white border-b border-slate-100">
      <Container className="flex items-center justify-between h-14 sm:h-16">
        {/* 1. LOGO ON THE LEFT */}
        <Link href="/" className="flex items-center py-1">
          <div className="relative h-11 w-28 sm:h-13 sm:w-34 md:h-14 md:w-38 flex items-center">
            <Image
              src={logoPath}
              alt="SODE Logo"
              fill
              sizes="160px"
              priority
              className="object-contain object-left cursor-pointer"
            />
          </div>
        </Link>
      </Container>
    </section>
  );
}

export default Header;