"use client";

import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import { Card, Row, Col, Tag, Breadcrumb, Button } from "antd";
import { ArrowRightOutlined, HeartFilled, StarFilled, GlobalOutlined, SmileFilled } from "@ant-design/icons";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <Header />
      
      <main className="flex-1 py-12 px-4 md:px-8 max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6" items={[
          { title: <Link href="/">Home</Link> },
          { title: "About Us" }
        ]} />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Tag color="#1C3569" className="font-semibold text-xs border-none rounded-full px-3 py-1">
            Who We Are
          </Tag>
          <h1 className="text-4xl md:text-5xl font-black text-[#1C3569] m-0 tracking-tight leading-tight">
            Empowering Careers Through Distance Education
          </h1>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed m-0">
            DistanceEducationSchool.com is India's leading online education counseling and guidance portal, helping millions of students explore and compare accredited programs.
          </p>
        </div>

        {/* Story Section */}
        <Row gutter={[32, 32]} className="items-center mb-16">
          <Col xs={24} md={12} className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1C3569] m-0">
              Our Mission & Philosophy
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0">
              We believe that quality higher education should not be constrained by geography, finance, or time. Our platform brings together recognized universities across India and the globe to offer UG, PG, and doctoral programs suited for both students and working professionals.
            </p>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0">
              With expert 1-on-1 counseling, we guide students through enrollment procedures, accreditations, and fee structure details to ensure they make informed choices.
            </p>
            <div className="pt-2">
              <Link href="/courses">
                <Button 
                  type="primary"
                  className="bg-[#1C3569] hover:!bg-[#122449] border-none font-bold rounded-xl h-11 px-6 cursor-pointer flex items-center gap-2"
                >
                  Explore Offered Courses <ArrowRightOutlined />
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Card className="border-none rounded-3xl bg-gradient-to-br from-[#1C3569] to-[#005382] text-white p-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,193,7,0.1),transparent_40%)]" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-xl font-bold text-[#FFC107] m-0">Why We Are Different</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <SmileFilled className="text-[#FFC107] text-lg mt-0.5" />
                    <div>
                      <h4 className="text-white font-bold text-base m-0">100% Free Counseling</h4>
                      <p className="text-slate-300 text-xs mt-0.5 m-0 leading-relaxed">No consultation or guidance fees charged from students.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <StarFilled className="text-[#FFC107] text-lg mt-0.5" />
                    <div>
                      <h4 className="text-white font-bold text-base m-0">Accredited Partner Universities</h4>
                      <p className="text-slate-300 text-xs mt-0.5 m-0 leading-relaxed">We list only UGC-DEB recognized or internationally accredited universities.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <GlobalOutlined className="text-[#FFC107] text-lg mt-0.5" />
                    <div>
                      <h4 className="text-white font-bold text-base m-0">Global Learning Support</h4>
                      <p className="text-slate-300 text-xs mt-0.5 m-0 leading-relaxed">Assistance in choosing domestic as well as global degrees.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </main>

      <Footer />
    </div>
  );
}
