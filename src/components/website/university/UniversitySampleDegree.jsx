"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "antd";
import { Eye, Check } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export default function UniversitySampleDegree({
  sampleDegreeData,
  uniName,
  openFormModal,
}) {
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  if (!sampleDegreeData || (!sampleDegreeData.imageUrl && !sampleDegreeData.title)) {
    return null;
  }

  return (
    <div
      id="sample-degree"
      data-nav-label="Sample Degree"
      className="scroll-mt-20 bg-white rounded-2xl shadow-xs border border-gray-100 p-6 sm:p-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
        <div className="lg:col-span-6 flex justify-center w-full">
          {sampleDegreeData.imageUrl ? (
            <div
              onClick={() => setIsCertificateModalOpen(true)}
              className="w-full max-w-115 aspect-460/340 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 bg-white relative shadow-md shadow-gray-300 group"
            >
              <Image
                src={getAssetPath(sampleDegreeData.imageUrl)}
                alt={sampleDegreeData.title || `Sample Degree ${uniName}`}
                fill
                priority
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* View Button Overlay on Side */}
              <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 z-10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCertificateModalOpen(true);
                  }}
                  className="bg-[#0C2B4E]/90 hover:bg-[#0C2B4E] text-white px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-semibold flex items-center gap-1 shadow-sm backdrop-blur-xs transition-all cursor-pointer hover:scale-105 active:scale-95 border border-white/25 leading-none"
                  title="Click to view full degree certificate"
                >
                  <Eye size={11.5} className="shrink-0" />
                  <span>View</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-6 space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start">
          {sampleDegreeData.title && (
            <h2 className="text-2xl sm:text-[28px] font-bold text-[#0D3B66] tracking-tight m-0 leading-tight">
              {sampleDegreeData.title}
            </h2>
          )}

          {sampleDegreeData.description && (
            <p className="text-xs sm:text-sm text-gray-600 leading-tight font-normal mt-2 max-w-lg mx-auto lg:mx-0">
              {sampleDegreeData.description}
            </p>
          )}

          {sampleDegreeData.points?.length > 0 && (
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-2 max-w-lg mx-auto lg:mx-0 w-full">
              {sampleDegreeData.points.map((pt, pIdx) => (
                <div
                  key={pIdx}
                  className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 rounded-lg"
                >
                  <span className="w-4 h-4 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span className="text-[11px] sm:text-[12.5px] font-bold text-gray-900 leading-tight">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="pt-3 w-full flex justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => {
                openFormModal &&
                  openFormModal({
                    title: `${sampleDegreeData.title || "Get Degree Details"} - ${uniName}`,
                    subtitle: "Get free syllabus & enrollment guidance",
                    defaultCourse: uniName,
                    submitButtonText: sampleDegreeData.ctaText || "Get Degree",
                  });
              }}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs sm:text-sm px-5 py-2 sm:py-2.5 rounded-lg border-none cursor-pointer transition-all active:scale-95 shadow-xs inline-flex items-center justify-center"
            >
              {sampleDegreeData.ctaText || "Get Degree"}
            </button>
          </div>
        </div>
      </div>

      {sampleDegreeData?.imageUrl && (
        <Modal
          open={isCertificateModalOpen}
          onCancel={() => setIsCertificateModalOpen(false)}
          footer={null}
          width={720}
          centered
        >
          <div className="pt-2 text-center">
            <h3 className="text-base sm:text-lg font-bold text-[#0C2B4E] m-0 mb-1">
              {sampleDegreeData.title || `Sample Degree Certificate - ${uniName}`}
            </h3>
            {sampleDegreeData.description && (
              <p className="text-xs text-gray-500 max-w-lg mx-auto mb-3">
                {sampleDegreeData.description}
              </p>
            )}
            <div className="relative w-full h-[380px] sm:h-[520px] max-h-[75vh] flex items-center justify-center mt-2">
              <Image
                src={getAssetPath(sampleDegreeData.imageUrl)}
                alt={sampleDegreeData.title || `Sample Degree Certificate - ${uniName}`}
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-contain rounded-lg"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
