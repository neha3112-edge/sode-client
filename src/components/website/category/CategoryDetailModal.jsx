"use client";

import React from "react";
import { Modal } from "antd";
import { X } from "lucide-react";
import { CategoryIcon, PartnerLogoIcon, CourseIcon, formatTwoLineText, getItemSlug, isObjectId } from "./CategoryIcons";

export default function CategoryDetailModal({
  activeCategory,
  modalData,
  onClose,
  router,
}) {
  return (
    <Modal
      open={Boolean(activeCategory)}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      mask={{ closable: true }}
      keyboard={true}
      destroyOnHidden
      width={620}
      styles={{
        content: {
          padding: "16px",
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 25px 50px -12px rgba(15, 23, 42, 0.25)",
        },
        body: {
          padding: 0,
        },
      }}
    >
      {activeCategory && (
        <div className="flex flex-col text-left min-h-0">
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5 shrink-0 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                {modalData.isUniversity ? (
                  <PartnerLogoIcon partner={activeCategory} />
                ) : (
                  <CategoryIcon cat={activeCategory} />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight tracking-tight truncate m-0">
                  {activeCategory.label || activeCategory.name}
                </h3>
                <span className="text-xs text-slate-500 block mt-0.5 truncate">
                  {modalData.isUniversity
                    ? "Programs & Degrees Offered"
                    : (activeCategory.title || "Online Programs & Degrees")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center cursor-pointer border-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto max-h-[64vh] overscroll-contain pr-1 space-y-4 scrollbar-thin [scrollbar-color:#cbd5e1_transparent]">
            {/* 1. Category Sub-categories or Universities Grid */}
            {!modalData.isUniversity && (
              <div>
                {modalData.items && modalData.items.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                    {modalData.items.map((it, idx) => (
                      <div
                        key={`${it._id || it.slug || idx}-${idx}`}
                        onClick={() => {
                          onClose();
                          const parentCatSlug = getItemSlug(activeCategory);
                          const itemSlug = getItemSlug(it);

                          if (modalData.isUniversitiesModal) {
                            router.push(`/courses?university=${encodeURIComponent(itemSlug)}`);
                          } else if (parentCatSlug && parentCatSlug !== "all") {
                            router.push(`/courses?category=${encodeURIComponent(parentCatSlug)}&subcategory=${encodeURIComponent(itemSlug)}`);
                          } else if (it.targetUrl && !/[0-9a-fA-F]{24}/.test(it.targetUrl)) {
                            router.push(it.targetUrl);
                          } else if (it.targetUrl && itemSlug && !isObjectId(itemSlug)) {
                            router.push(it.targetUrl.replace(/[0-9a-fA-F]{24}/g, encodeURIComponent(itemSlug)));
                          } else {
                            router.push(`/courses?subcategory=${encodeURIComponent(itemSlug)}`);
                          }
                        }}
                        className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 min-[360px]:p-2 aspect-square flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 w-full shadow-2xs overflow-hidden"
                      >
                        <div className="flex-1 flex items-center justify-center w-full min-h-0 pt-0.5">
                          <div className="group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                            {modalData.isUniversitiesModal ? (
                              <PartnerLogoIcon partner={it} />
                            ) : (
                              <CategoryIcon cat={it} />
                            )}
                          </div>
                        </div>
                        <div className="h-7 min-[360px]:h-8 sm:h-8.5 flex items-center justify-center w-full min-w-0 px-0.5 pb-0.5 shrink-0">
                          <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[10.5px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight min-w-0 m-0">
                            {formatTwoLineText(it.name)}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl text-center flex flex-col items-center justify-center space-y-2 my-3">
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      🎓 Explore courses and specializations in {activeCategory.name}.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        router.push(`/courses?category=${encodeURIComponent(getItemSlug(activeCategory))}`);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer border-0"
                    >
                      Explore Category Courses
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 2. University Offered Courses Grid */}
            {modalData.isUniversity && (
              <div>
                {modalData.items && modalData.items.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                    {modalData.items.map((crs, idx) => (
                      <div
                        key={`${crs._id || crs.slug || idx}-${idx}`}
                        onClick={() => {
                          onClose();
                          const uniSlug = getItemSlug(modalData.category);
                          const crsSlug = getItemSlug(crs);
                          if (crs.isSubCourse || crs.itemType === "subcourse") {
                            const parentSlug = crs.parentCourseSlug || getItemSlug({ name: crs.parentCourseName, slug: crs.parentCourseSlug }) || crsSlug;
                            router.push(`/courses?university=${encodeURIComponent(uniSlug)}&course=${encodeURIComponent(parentSlug)}&subcourse=${encodeURIComponent(crsSlug)}`);
                          } else {
                            router.push(`/courses?university=${encodeURIComponent(uniSlug)}&course=${encodeURIComponent(crsSlug)}`);
                          }
                        }}
                        className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-1.5 min-[360px]:p-2 aspect-square flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group min-w-0 w-full shadow-2xs overflow-hidden"
                      >
                        <div className="flex-1 flex items-center justify-center w-full min-h-0 pt-0.5">
                          <div className="group-hover:scale-105 transition-transform flex items-center justify-center shrink-0">
                            <CourseIcon course={crs} />
                          </div>
                        </div>
                        <div className="h-7 min-[360px]:h-8 sm:h-8.5 flex items-center justify-center w-full min-w-0 px-0.5 pb-0.5 shrink-0">
                          <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[10.5px] font-medium text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight min-w-0 m-0 uppercase">
                            {formatTwoLineText(crs.name)}
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl text-center flex flex-col items-center justify-center space-y-2 my-3">
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      🎓 Explore degree programs and courses offered by {modalData.category?.name}.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        router.push(`/courses?university=${encodeURIComponent(getItemSlug(modalData.category))}`);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer border-0"
                    >
                      Explore University Courses
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
