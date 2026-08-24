"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { Skeleton } from "antd";

export default function CategoryLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      <main className="flex-1">
        {/* ── HERO BANNER SKELETON ── */}
        <section className="bg-white border-b border-gray-200 py-10 md:py-14 text-center">
          <Container className="max-w-4xl mx-auto space-y-4 flex flex-col items-center">
            <Skeleton.Input active size="small" className="w-36 h-7 rounded-full" />
            <Skeleton active paragraph={{ rows: 2, width: ["70%", "45%"] }} title={false} />
          </Container>
        </section>

        {/* ── CHILD CATEGORIES GRID SKELETON ── */}
        <section className="py-8 md:py-12 bg-gray-50 border-b border-gray-200">
          <Container>
            <div className="max-w-5xl mx-auto space-y-6">
              <Skeleton.Input active size="small" className="w-48 h-7 rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 p-5 rounded-2xl space-y-3"
                  >
                    <Skeleton.Input active size="small" className="w-24 h-5 rounded-md" />
                    <Skeleton active paragraph={{ rows: 2, width: ["85%", "60%"] }} title={false} />
                    <div className="pt-3 border-t border-gray-100 flex justify-between">
                      <Skeleton.Input active size="small" className="w-20 h-3.5" />
                      <Skeleton.Input active size="small" className="w-6 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── CATEGORY COURSES SKELETON ── */}
        <section className="py-8 md:py-12 bg-white">
          <Container>
            <div className="max-w-5xl mx-auto space-y-6">
              <Skeleton.Input active size="small" className="w-44 h-7 rounded-lg" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 p-5 rounded-2xl space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <Skeleton.Avatar active size={52} shape="square" className="rounded-xl shrink-0" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton.Input active size="small" className="w-full h-4" />
                        <Skeleton.Input active size="small" className="w-3/5 h-3" />
                      </div>
                    </div>
                    <Skeleton active paragraph={{ rows: 3, width: ["100%", "80%", "65%"] }} title={false} />
                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                      <Skeleton.Input active size="small" className="w-18 h-4" />
                      <Skeleton.Button active size="small" className="w-20 h-7 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
}
