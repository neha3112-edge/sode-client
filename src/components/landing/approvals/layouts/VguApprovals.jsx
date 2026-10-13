"use client";

import React from "react";
import Image from "next/image";
import { normalizeApprovalItem } from "../ApprovalCard";

export default function VguApprovals({ approvals = [], brand = {} }) {
  const cfg = brand.approvalsConfig || {};
  const containerClass =
    cfg.containerClassName ||
    brand.approvalsContainerClassName ||
    "max-w-[1340px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32";
  const sectionTitle =
    brand.approvalsTitle ||
    `${brand.name || "Vivekananda Global University"} Online Accreditation & Approval`;
  const sectionDescription =
    brand.approvalsDescription ||
    "Vivekananda Global University Online Courses are UGC-recognised and have top accreditations and approvals from the country's recognised statutory bodies.";

  const titleClass =
    cfg.titleClassName ||
    "text-[22px] sm:text-[26px] lg:text-[28px] font-normal leading-tight tracking-tight m-0";
  const buttonBg = cfg.buttonBg || cfg.buttonBackground || brand.primaryColor || "#811811";
  const buttonTextColor = cfg.buttonTextColor || cfg.buttonColor || "#ffffff";
  const buttonText = cfg.buttonText || "Enquire Now";

  return (
    <section id="approval" className="w-full py-12 sm:py-16 bg-white border-b border-slate-200 scroll-mt-20">
      <div className={containerClass}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 space-y-4 text-left">
            <h2 className={titleClass} style={{ color: cfg.titleColor || "#811811" }}>
              {sectionTitle.includes(" Online") ? (
                <>
                  <strong className="font-bold text-[#811811]">
                    {sectionTitle.replace(/\s+Online.*$/i, " Online")}
                  </strong>
                  <br />
                  <span className="font-medium text-slate-800">Accreditation & Approval</span>
                </>
              ) : (
                <strong className="font-bold text-[#811811]">{sectionTitle}</strong>
              )}
            </h2>

            <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed font-normal m-0 max-w-md">
              {sectionDescription}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const heroEl = document.getElementById("hero") || document.getElementById("banner");
                  heroEl?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  backgroundColor: buttonBg,
                  color: buttonTextColor,
                }}
                className="font-bold text-[14px] px-8 py-2.5 rounded-[4px] shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer border-none"
              >
                {buttonText}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
              {approvals.map((appr, idx) => {
                const data = normalizeApprovalItem(appr, idx);
                return (
                  <div
                    key={data.id}
                    className="bg-white rounded-full p-2.5 sm:p-3 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex items-center gap-3 sm:gap-4 hover:shadow-md transition-all"
                  >
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full overflow-hidden bg-slate-50 flex items-center justify-center p-1">
                      <Image
                        src={data.image}
                        alt={data.title || data.tag || "Approval"}
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    </div>
                    <div className="min-w-0 pr-2 text-left">
                      <h3 className="text-[14px] sm:text-[15px] font-bold text-slate-900 leading-tight m-0 truncate">
                        {data.title || data.tag}
                      </h3>
                      <p className="text-[11px] sm:text-[11.5px] text-slate-500 font-medium mt-0.5 m-0 line-clamp-1">
                        {data.description || data.tag || "Approved"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
