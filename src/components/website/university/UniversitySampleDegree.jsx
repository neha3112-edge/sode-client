"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "antd";
import { Eye, CheckCircle2 } from "lucide-react";
import { getAssetPath } from "@/lib/utils";

export default function UniversitySampleDegree({
  sampleDegreeData,
  uniName,
}) {
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  if (!sampleDegreeData || (!sampleDegreeData.imageUrl && !sampleDegreeData.title)) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-6 sm:p-10">
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
                sizes="(max-width: 1024px) 100vw, 460px"
                className="object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* View Button Overlay */}
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
                  className="bg-blue-50/50 border border-blue-100/80 rounded-xl p-2 sm:p-2.5 flex flex-col items-center justify-center text-center shadow-2xs"
                >
                  <CheckCircle2 size={16} className="text-[#0077B6] mb-1 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-800 leading-tight">
                    {pt}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Full Size Certificate Modal */}
      {sampleDegreeData.imageUrl && (
        <Modal
          open={isCertificateModalOpen}
          onCancel={() => setIsCertificateModalOpen(false)}
          footer={null}
          centered
          width={800}
          title={
            <span className="text-sm font-bold text-[#0D3B66]">
              {sampleDegreeData.title || `Sample Degree - ${uniName}`}
            </span>
          }
        >
          <div className="relative w-full h-[60vh] min-h-[350px]">
            <Image
              src={getAssetPath(sampleDegreeData.imageUrl)}
              alt={sampleDegreeData.title || "Degree Certificate"}
              fill
              className="object-contain"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
