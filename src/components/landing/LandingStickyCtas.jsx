"use client";

import React from "react";
import { Phone, Download, Sparkles, Scale } from "lucide-react";
import { Button } from "antd";

export default function LandingStickyCtas({
  brand = {},
  onOpenApply,
  onOpenBrochure,
  onOpenScholarship,
  onOpenCompare,
}) {
  const phone = brand.phone || "1800-102-3434";

  return (
    <>
      {/* Floating Desktop Widgets (Right Edge) */}
      <div className="fixed bottom-6 right-6 z-30 hidden lg:flex flex-col gap-2.5">
        <Button
          type="primary"
          icon={<Sparkles className="w-3.5 h-3.5" />}
          onClick={() => onOpenScholarship?.()}
          className="!bg-[#e91e63] hover:!bg-[#d81b60] !text-white !font-bold !h-10 !px-4 !rounded-full !shadow-lg !border-none flex items-center gap-1.5"
        >
          Check Scholarship
        </Button>
        <Button
          type="default"
          icon={<Scale className="w-3.5 h-3.5" />}
          onClick={() => onOpenCompare?.()}
          className="!bg-white hover:!bg-slate-50 !text-[#08417b] !font-bold !h-10 !px-4 !rounded-full !shadow-lg !border !border-slate-300 flex items-center gap-1.5"
        >
          Compare
        </Button>
      </div>

      {/* Sticky Bottom Bar on Mobile/Tablet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-2 sm:p-3 shadow-lg flex items-center gap-2">
        <a
          href={`tel:${phone.replace(/\D/g, "")}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs no-underline border border-slate-200 active:bg-slate-200"
        >
          <Phone className="w-3.5 h-3.5 text-blue-600" />
          <span>Call Now</span>
        </a>

        <Button
          type="default"
          icon={<Download className="w-3.5 h-3.5" />}
          onClick={() => onOpenBrochure?.()}
          className="!flex-1 !h-10 !text-xs !font-bold !rounded-lg"
        >
          Brochure
        </Button>

        <Button
          type="primary"
          onClick={() => onOpenApply?.()}
          className="!flex-1 !h-10 !bg-[#ffd200] hover:!bg-[#ffc107] !text-[#08417b] !font-bold !text-xs !rounded-lg !border-none !shadow-xs"
        >
          Apply Now
        </Button>
      </div>
    </>
  );
}
