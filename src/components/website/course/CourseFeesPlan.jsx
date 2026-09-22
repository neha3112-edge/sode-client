"use client";

import React from "react";
import { Tag } from "antd";

export default function CourseFeesPlan({
  activeLedgerData,
  selectedPlanTab,
  setSelectedPlanTab,
  openFormModal,
}) {
  if (!activeLedgerData) return null;

  return (
    <div
      id="fee-structure"
      className="scroll-mt-16 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 space-y-4"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-5 sm:mb-6 m-0">
        Fee Structure & Flexible Payment Plans
      </h2>

      {/* Side-by-Side Plan & EMI Comparison Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {[
          {
            id: "semester",
            title: "Semester-wise",
            badge: activeLedgerData.semester?.discountPercentage > 0 ? {
              text: activeLedgerData.semester?.badgeText || (
                activeLedgerData.scholarship || activeLedgerData.semester?.discountType === "SCHOLARSHIP"
                  ? `${activeLedgerData.semester.discountPercentage}% SCHOLARSHIP`
                  : `${activeLedgerData.semester.discountPercentage}% OFF`
              ),
              color: activeLedgerData.semester?.badgeColor || "success",
            } : null,
            hasDiscount: Boolean(
              Number(activeLedgerData.semester?.discountFees || activeLedgerData.semester?.totalDiscountFees || 0) > 0
            ),
            grossFee: activeLedgerData.semester?.formattedGross,
            payableFee: activeLedgerData.semester?.formattedBasePayable || activeLedgerData.semester?.formattedPayable || "₹ 16,320 / Sem",
            extraOff: activeLedgerData.semester?.extraOff,
            subtitle: `${activeLedgerData.semester?.totalSemesters || 6} Semesters • Installments`,
            onClick: () => setSelectedPlanTab("semester"),
          },
          {
            id: "yearly",
            title: "Yearly Plan",
            badge: activeLedgerData.yearly?.discountPercentage > 0 ? {
              text: activeLedgerData.yearly?.badgeText || (
                activeLedgerData.scholarship || activeLedgerData.yearly?.discountType === "SCHOLARSHIP"
                  ? `${activeLedgerData.yearly.discountPercentage}% SCHOLARSHIP`
                  : `${activeLedgerData.yearly.discountPercentage}% OFF`
              ),
              color: activeLedgerData.yearly?.badgeColor || "success",
            } : null,
            hasDiscount: Boolean(
              Number(activeLedgerData.yearly?.discountFees || activeLedgerData.yearly?.totalDiscountFees || 0) > 0
            ),
            grossFee: activeLedgerData.yearly?.formattedGross,
            payableFee: activeLedgerData.yearly?.formattedBasePayable || activeLedgerData.yearly?.formattedPayable || "₹ 30,720 / Year",
            extraOff: activeLedgerData.yearly?.extraOff,
            subtitle: `${activeLedgerData.yearly?.totalYears || 3} Annual Installments`,
            onClick: () => setSelectedPlanTab("yearly"),
          },
          {
            id: "fullfees",
            title: "Full Fees",
            badge: activeLedgerData.fullfees?.discountPercentage > 0 ? {
              text: activeLedgerData.fullfees?.badgeText || (
                activeLedgerData.scholarship || activeLedgerData.fullfees?.discountType === "SCHOLARSHIP"
                  ? `${activeLedgerData.fullfees.discountPercentage}% SCHOLARSHIP`
                  : `MAX SAVINGS ${activeLedgerData.fullfees.discountPercentage}%`
              ),
              color: activeLedgerData.fullfees?.badgeColor || (activeLedgerData.scholarship ? "success" : "warning"),
            } : null,
            hasDiscount: Boolean(
              Number(activeLedgerData.fullfees?.discountFees || activeLedgerData.fullfees?.totalDiscountFees || 0) > 0
            ),
            grossFee: activeLedgerData.fullfees?.formattedGross,
            payableFee: activeLedgerData.fullfees?.formattedBasePayable || activeLedgerData.fullfees?.formattedPayable || "₹ 80,640",
            extraOff: activeLedgerData.fullfees?.extraOff,
            subtitle: "One-time lump sum • Max discount",
            onClick: () => setSelectedPlanTab("fullfees"),
          },
          {
            id: "emi",
            isEmi: true,
            title: (activeLedgerData.emi?.summary?.hasInterest && Number(activeLedgerData.emi?.summary?.interestRate) > 1) ? "Standard EMI" : "No-Cost EMI",
            badge: {
              text: (activeLedgerData.emi?.summary?.hasInterest && Number(activeLedgerData.emi?.summary?.interestRate) > 1) ? "EASY FINANCING" : "NO-COST EMI",
              color: (activeLedgerData.emi?.summary?.hasInterest && Number(activeLedgerData.emi?.summary?.interestRate) > 1) ? "geekblue" : "orange",
            },
            hasDiscount: false,
            payableFee: activeLedgerData.emi?.summary?.formattedMinMonthlyEmi ? `Starting ${activeLedgerData.emi.summary.formattedMinMonthlyEmi}` : "Bank & NBFC EMI",
            subtitle: activeLedgerData.emi?.yearly?.available
              ? "Yearly Plan EMI"
              : activeLedgerData.emi?.fullfees?.available
                ? "Full Course EMI"
                : activeLedgerData.emi?.semester?.available
                  ? "Semester EMI"
                  : (activeLedgerData.emi?.summary?.planName || "Bank & NBFC Financing"),
            onClick: () => {
              openFormModal("Apply for No-Cost EMI");
            },
          },
        ].map((card) => {
          const isSelected = selectedPlanTab === card.id;
          const isEmi = card.isEmi;

          return (
            <div
              key={card.id}
              onClick={card.onClick}
              className={`p-2 sm:p-3 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between space-y-1 ${
                isSelected
                  ? isEmi
                    ? "border-amber-600 bg-amber-50/40 shadow-md ring-1 ring-amber-500/20"
                    : "border-[#0C2B4E] bg-blue-50/40 shadow-md ring-1 ring-[#0C2B4E]/10"
                  : isEmi
                    ? "border-amber-200 bg-amber-50/20 hover:border-amber-300 hover:shadow-xs"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-xs"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-1 min-w-0">
                  <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-tight truncate ${isEmi ? "text-amber-900" : "text-[#0C2B4E]"}`}>
                    {card.title}
                  </span>
                  {card.badge && (
                    <Tag
                      color={card.badge.color}
                      className="m-0 text-[8px] sm:text-[10px] font-semibold rounded-2xl whitespace-nowrap shrink-0 px-1 sm:px-1.5 leading-tight"
                    >
                      {card.badge.text}
                    </Tag>
                  )}
                </div>
                <div className="flex items-baseline gap-1 sm:gap-2 pt-0.5 sm:pt-1 flex-wrap">
                  {card.hasDiscount && card.grossFee && (
                    <span className="text-xs sm:text-[15px] font-bold text-gray-600 line-through decoration-red-600 decoration-2">
                      {card.grossFee}
                    </span>
                  )}
                  <span className={`text-sm sm:text-lg font-bold ${isEmi ? "text-amber-950" : "text-gray-900"}`}>
                    {card.payableFee}
                  </span>
                </div>
                {card.extraOff && card.extraOff.hasExtraOff ? (
                  <div className="pt-0.5">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8.5px] sm:text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                      🏷️ {card.extraOff.badgeText} • {card.extraOff.finalPayableText || (card.extraOff.formattedFinalPayable ? `Pay ${card.extraOff.formattedFinalPayable}` : "")}
                    </span>
                  </div>
                ) : (
                  <p className={`text-[9.5px] sm:text-[11px] m-0 ${isEmi ? "text-amber-800/80 truncate" : "text-gray-500 truncate"}`}>
                    {card.subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Non-EMI Plan Extra Off Banner */}
      {selectedPlanTab !== "emi" && activeLedgerData[selectedPlanTab] && activeLedgerData[selectedPlanTab]?.extraOff?.hasExtraOff && (
        <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-50/70 via-blue-50/40 to-emerald-50/60 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-[#0C2B4E]">
                {activeLedgerData[selectedPlanTab].label || (selectedPlanTab === "fullfees" ? "Fullfees (One-Time)" : selectedPlanTab === "yearly" ? "Yearly Plan" : "Semester-wise")}
              </span>
              {activeLedgerData[selectedPlanTab].badgeText && (
                <Tag color="success" className="m-0 text-[10px] font-bold">
                  {activeLedgerData[selectedPlanTab].badgeText}
                </Tag>
              )}
              <Tag color="gold" className="m-0 text-[10px] font-bold">
                🔥 {activeLedgerData[selectedPlanTab].extraOff.badgeText}
              </Tag>
            </div>
            <p className="text-emerald-800 text-[11.5px] sm:text-xs m-0 font-medium leading-relaxed">
              Approved <strong>{activeLedgerData[selectedPlanTab].discountPercentage}% Scholarship</strong> ({activeLedgerData[selectedPlanTab].formattedDiscount} off) + <strong>{activeLedgerData[selectedPlanTab].extraOff.badgeText}</strong> applied! Final net payable: <span className="font-extrabold text-emerald-950 underline">{activeLedgerData[selectedPlanTab].extraOff.formattedFinalPayable}</span>
            </p>
          </div>
          <div className="shrink-0 bg-white border border-emerald-300 px-3.5 py-1.5 rounded-lg text-right shadow-2xs">
            <div className="text-[10px] uppercase font-extrabold text-emerald-700 tracking-wider">Final Net Fee</div>
            <div className="text-base sm:text-lg font-black text-emerald-950">
              {activeLedgerData[selectedPlanTab].extraOff.formattedFinalPayable}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
