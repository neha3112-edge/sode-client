"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { Skeleton } from "antd";

export default function CoursesLoading() {
  return (
    <div className="bg-[#f8fafc] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-7xl mx-auto space-y-6">
        {/* Header Breadcrumb Skeleton */}
        <div className="flex justify-between items-center bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <Skeleton.Input active size="small" className="w-40 h-5" />
          <Skeleton.Input active size="small" className="w-32 h-8 rounded-xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Skeleton */}
          <div className="hidden lg:block bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <Skeleton.Input active size="small" className="w-28 h-6" />
            <Skeleton active paragraph={{ rows: 4, width: ["100%", "80%", "90%", "70%"] }} title={false} />
            <Skeleton active paragraph={{ rows: 4, width: ["100%", "75%", "85%", "60%"] }} title={false} />
            <Skeleton.Button active size="large" className="w-full h-10 rounded-xl" />
          </div>

          {/* Course Cards Skeleton List */}
          <div className="lg:col-span-3 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start shadow-2xs"
              >
                <div className="w-28 sm:w-32 border border-slate-100 rounded-xl p-3 bg-slate-50/50 shrink-0 flex flex-col items-center justify-center space-y-2">
                  <Skeleton.Avatar active size={64} shape="square" className="rounded-xl" />
                  <Skeleton.Input active size="small" className="w-16 h-3" />
                </div>
                <div className="flex-1 space-y-3 w-full">
                  <Skeleton.Input active size="small" className="w-2/3 h-5" />
                  <div className="flex flex-wrap gap-4">
                    <Skeleton.Input active size="small" className="w-24 h-3.5" />
                    <Skeleton.Input active size="small" className="w-24 h-3.5" />
                    <Skeleton.Input active size="small" className="w-28 h-3.5" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Skeleton.Button active size="small" className="w-24 h-9 rounded-lg" />
                    <Skeleton.Button active size="small" className="w-32 h-9 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
