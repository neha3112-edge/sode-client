"use client";

import React from "react";
import { Header } from "@/components/website/Header";
import { Footer } from "@/components/website/Footer";
import { Card, Input, Form, Button, Breadcrumb, Row, Col, Space } from "antd";
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <Header />
      
      <main className="flex-1 py-12 px-4 md:px-8 max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6" items={[
          { title: <Link href="/">Home</Link> },
          { title: "Contact Us" }
        ]} />

        {/* Section Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1C3569] m-0">
            Get in Touch
          </h1>
          <p className="text-slate-500 mt-2 m-0 text-base">
            Have questions about admissions, fees, or university eligibility? Contact our counseling desk.
          </p>
        </div>

        {/* Layout Grid */}
        <Row gutter={[32, 32]}>
          {/* Contact Form */}
          <Col xs={24} md={14}>
            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6 bg-white" title={<span className="text-lg font-bold text-slate-800">Send us a Message</span>} bordered={false}>
              <Form layout="vertical" className="space-y-4" onSubmitCapture={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Form.Item label="Your Name" required className="m-0">
                    <Input placeholder="Enter your full name" className="h-11 rounded-lg border-slate-200" />
                  </Form.Item>
                  <Form.Item label="Email Address" className="m-0">
                    <Input placeholder="Enter your email" type="email" className="h-11 rounded-lg border-slate-200" />
                  </Form.Item>
                </div>
                
                <Form.Item label="Mobile Number" required className="m-0">
                  <Input placeholder="Enter 10-digit mobile number" className="h-11 rounded-lg border-slate-200" />
                </Form.Item>

                <Form.Item label="Subject" className="m-0">
                  <Input placeholder="e.g. Admission queries, Verification, Fees" className="h-11 rounded-lg border-slate-200" />
                </Form.Item>

                <Form.Item label="Message" className="m-0">
                  <Input.TextArea rows={4} placeholder="Type your detailed query here..." className="rounded-lg border-slate-200" />
                </Form.Item>

                <Button 
                  type="primary" 
                  htmlType="submit"
                  className="bg-[#1C3569] hover:!bg-[#122449] border-none text-white font-bold h-11 px-8 rounded-xl cursor-pointer mt-4"
                >
                  Submit Inquiry
                </Button>
              </Form>
            </Card>
          </Col>

          {/* Contact Details Sidebar */}
          <Col xs={24} md={10} className="space-y-6">
            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6 bg-white" title={<span className="text-lg font-bold text-slate-800">Contact Information</span>} bordered={false}>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1C3569] flex items-center justify-center flex-shrink-0">
                    <PhoneOutlined className="text-lg" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Call Counselors</span>
                    <a href="tel:+917065777755" className="text-base font-bold text-slate-800 hover:text-blue-600 block mt-0.5">+91 7065 7777 55</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1C3569] flex items-center justify-center flex-shrink-0">
                    <MailOutlined className="text-lg" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email Support</span>
                    <a href="mailto:info@distanceeducationschool.com" className="text-base font-bold text-slate-800 hover:text-blue-600 block mt-0.5">info@distanceeducationschool.com</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1C3569] flex items-center justify-center flex-shrink-0">
                    <EnvironmentOutlined className="text-lg" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Corporate Office</span>
                    <p className="text-slate-600 text-sm mt-0.5 m-0 leading-relaxed">Noida Sector 62, Delhi NCR, India</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1C3569] flex items-center justify-center flex-shrink-0">
                    <ClockCircleOutlined className="text-lg" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Working Hours</span>
                    <p className="text-slate-600 text-sm mt-0.5 m-0 leading-relaxed">Mon - Sat: 9:30 AM to 6:30 PM (IST)</p>
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
