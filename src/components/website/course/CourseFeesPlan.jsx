"use client";

import React, { useState } from "react";
import { Tag, Radio, ConfigProvider } from "antd";

export default function CourseFeesPlan({
  activeLedgerData,
  selectedPlanTab,
  setSelectedPlanTab,
  openFormModal,
}) {
  const [activeEmiSubTab, setActiveEmiSubTab] = useState(null);

  if (!activeLedgerData) return null;

  return (
    <div
      id="fee-structure"
      data-nav-label="Fee Structure"
      className="scroll-mt-20 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 space-y-4"
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
              setSelectedPlanTab("emi");
            },
          },
        ].map((card) => {
          const isSelected = selectedPlanTab === card.id;
          const isEmi = card.isEmi;

          return (
            <div
              key={card.id}
              onClick={card.onClick}
              className={`p-2 sm:p-3 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between space-y-1 ${isSelected
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

      {/* EMI Breakdown View - Exact Radio Group UI from yesterday */}
      {selectedPlanTab === "emi" && activeLedgerData.emi && (() => {
        const availableSubTabs = [
          { key: "semester", label: "Semester EMI", ledger: activeLedgerData.emi.semester },
          { key: "yearly", label: "Yearly EMI", ledger: activeLedgerData.emi.yearly },
          { key: "fullfees", label: "Fullfees EMI", ledger: activeLedgerData.emi.fullfees },
        ].filter((t) => t.ledger && t.ledger.available);

        const currentSubTabKey =
          activeEmiSubTab && activeLedgerData.emi[activeEmiSubTab]?.available
            ? activeEmiSubTab
            : (availableSubTabs[0]?.key || "fullfees");

        const currentEmi = activeLedgerData.emi[currentSubTabKey] || activeLedgerData.emi.summary;

        if (!currentEmi || !currentEmi.available) {
          return (
            <div className="mt-4 p-5 rounded-xl bg-amber-50/60 border border-amber-200/80 text-center text-amber-900 text-sm font-medium">
              No EMI options available for the selected course fee structure.
            </div>
          );
        }

        return (
          <div className="mt-4 rounded-xl bg-amber-50/60 border border-amber-200/80 overflow-hidden shadow-2xs">
            {/* Full-width top attached Radio Group */}
            {availableSubTabs.length > 1 && (
              <div className="w-full bg-white border-b border-amber-200/80">
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#b45309",
                    },
                  }}
                >
                  <Radio.Group
                    value={currentSubTabKey}
                    onChange={(e) => setActiveEmiSubTab(e.target.value)}
                    buttonStyle="solid"
                    size="middle"
                    className="w-full flex [&_.ant-radio-button-wrapper]:flex-1 [&_.ant-radio-button-wrapper]:text-center [&_.ant-radio-button-wrapper]:font-semibold [&_.ant-radio-button-wrapper]:!h-auto [&_.ant-radio-button-wrapper]:min-h-[46px] [&_.ant-radio-button-wrapper]:py-1.5 sm:[&_.ant-radio-button-wrapper]:py-2 [&_.ant-radio-button-wrapper]:px-1 [&_.ant-radio-button-wrapper]:flex [&_.ant-radio-button-wrapper]:items-center [&_.ant-radio-button-wrapper]:justify-center [&_.ant-radio-button-wrapper]:border-0 [&_.ant-radio-button-wrapper]:rounded-none [&_.ant-radio-button-wrapper]:!leading-tight [&_.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)]:!bg-[#b45309] [&_.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)]:!border-[#b45309] [&_.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)]:!text-white"
                  >
                    {availableSubTabs.map((tab) => (
                      <Radio.Button key={tab.key} value={tab.key} className="text-xs sm:text-sm !h-auto">
                        <div className="flex flex-col items-center justify-center text-center w-full py-0.5">
                          <span className="font-bold text-[10.5px] sm:text-xs md:text-sm leading-tight">
                            {tab.label}
                          </span>
                          <span className="opacity-90 font-medium text-[9.5px] sm:text-[11px] leading-tight mt-0.5 whitespace-nowrap">
                            {tab.ledger.formattedMinMonthlyEmi}
                          </span>
                        </div>
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                </ConfigProvider>
              </div>
            )}

            {/* Tenure Options Cards - Distinct Cards Spanning Full Width */}
            {Array.isArray(currentEmi.tenures) && currentEmi.tenures.length > 0 && (() => {
              const count = currentEmi.tenures.length;
              const gridColsClass =
                count === 1
                  ? "grid-cols-1"
                  : count === 2
                    ? "grid-cols-1 sm:grid-cols-2"
                    : count === 3
                      ? "grid-cols-1 sm:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

              return (
                <div className="p-3 sm:p-4 w-full">
                  <div className={`grid ${gridColsClass} gap-3 w-full`}>
                    {currentEmi.tenures.map((tenure, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xl border border-amber-200 p-3.5 sm:p-4 shadow-xs hover:shadow-md hover:border-amber-400 transition-all space-y-2.5 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1.5">
                            <span className="text-xs sm:text-sm font-extrabold text-amber-950 block">
                              {tenure.months} Months Tenure
                            </span>
                            {tenure.interestRatePct && Number(tenure.interestRatePct) > 0 ? (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-2xl bg-blue-100 text-blue-800 border border-blue-300/60">
                                {tenure.interestRatePct}% p.a. Interest
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                                0% Interest
                              </span>
                            )}
                          </div>
                          <span className="text-base sm:text-lg font-black text-gray-900 block">
                            {tenure.formattedMonthlyFee}
                          </span>
                        </div>

                        {(tenure.totalInterest > 0 || tenure.downPayment > 0 || tenure.interestAmount > 0) && (
                          <div className="pt-2 border-t border-gray-100 text-[11px] space-y-1 text-gray-600">
                            {(tenure.totalInterest > 0 || tenure.interestAmount > 0) && (
                              <div className="flex justify-between items-center text-amber-900 font-medium">
                                <span>Total Interest:</span>
                                <span className="font-bold">
                                  {tenure.formattedTotalInterest || `₹ ${(tenure.interestAmount || tenure.totalInterest).toLocaleString("en-IN")}`}
                                </span>
                              </div>
                            )}
                            {(tenure.totalPayableWithInterest > 0 || tenure.totalPayable > 0) && (
                              <div className="flex justify-between items-center text-gray-900 font-semibold">
                                <span>Total Payable:</span>
                                <span className="font-bold text-[#0C2B4E]">
                                  {tenure.formattedTotalPayableWithInterest || `₹ ${(tenure.totalPayable || tenure.totalPayableWithInterest).toLocaleString("en-IN")}`}
                                </span>
                              </div>
                            )}
                            {tenure.downPayment > 0 && (
                              <div className="flex justify-between items-center text-amber-800 font-medium">
                                <span>Downpayment:</span>
                                <span className="font-bold">{tenure.formattedDownPayment}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        );
      })()}

      {/* 💡 Divider & Additional Mandatory University Fees & Notes */}
      {activeLedgerData?.breakdown?.excludedSummary?.hasExcluded && (
        <div>
          <hr className="border-t border-gray-200 my-3" />
          <div className="p-3 rounded-xl border border-amber-200/90 bg-linear-to-br from-amber-50/70 via-orange-50/40 to-amber-50/50 shadow-2xs">
            {/* Clean Bullet Points */}
            <ul className="space-y-2 text-xs sm:text-[12.5px] text-amber-950 list-none p-0 m-0">
              {activeLedgerData.breakdown.excludedSummary.items?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                  <span className="text-amber-900/95 font-medium">{item.note}</span>
                </li>
              ))}

              {/* 3rd Bullet: Policy Notice */}
              <li className="flex items-start gap-2.5 leading-relaxed">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                <span className="text-amber-900/95 font-medium">
                  The payment plan fees shown above cover the core academic course package. Excluded and separate university fees (such as semester-wise examination fees and one-time registration fees) are collected directly by the university at their respective academic cycles and are not discounted by scholarships.
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
