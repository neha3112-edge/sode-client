"use client";

import React from "react";
import { Container } from "@/components/common/Container";
import { Skeleton } from "antd";

export default function CategoryLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <main className="flex-1">
        {/* ── HERO BANNER SKELETON ── */}
        <section className="bg-linear-to-b from-[#102441] to-[#0a1424] text-white py-14 md:py-20 px-4 text-center relative overflow-hidden border-b border-slate-800">
          <Container className="max-w-4xl mx-auto space-y-4 flex flex-col items-center">
            <Skeleton.Input active size="small" style={{ width: 140, height: 24, borderRadius: 20 }} />
            <Skeleton active paragraph={{ rows: 2, width: ["80%", "50%"] }} title={false} />
          </Container>
        </section>

        {/* ── CHILD CATEGORIES GRID SKELETON ── */}
        <section className="py-12 md:py-16 bg-white border-b border-slate-100">
          <Container>
            <div className="max-w-5xl mx-auto space-y-6">
              <Skeleton.Input active size="small" style={{ width: 220, height: 28, borderRadius: 8 }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200/80 p-5 rounded-2xl space-y-3"
                  >
                    <Skeleton.Input active size="small" style={{ width: 80, height: 18, borderRadius: 6 }} />
                    <Skeleton active paragraph={{ rows: 2, width: ["90%", "70%"] }} title={false} />
                    <div className="pt-3 border-t border-slate-200/60 flex justify-between">
                      <Skeleton.Input active size="small" style={{ width: 100, height: 14 }} />
                      <Skeleton.Input active size="small" style={{ width: 20, height: 14 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── CATEGORY COURSES SKELETON ── */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="max-w-5xl mx-auto space-y-6">
              <Skeleton.Input active size="small" style={{ width: 200, height: 28, borderRadius: 8 }} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <Skeleton.Avatar active size={56} shape="square" style={{ borderRadius: 12 }} />
                      <div className="flex-1">
                        <Skeleton.Input active size="small" style={{ width: "90%", height: 18 }} />
                        <Skeleton.Input active size="small" style={{ width: "60%", height: 14, marginTop: 4 }} />
                      </div>
                    </div>
                    <Skeleton active paragraph={{ rows: 3, width: ["100%", "85%", "70%"] }} title={false} />
                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                      <Skeleton.Input active size="small" style={{ width: 80, height: 16 }} />
                      <Skeleton.Button active size="small" style={{ width: 80, height: 32, borderRadius: 8 }} />
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
