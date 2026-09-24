"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Form, Input, Select, Checkbox, message } from "antd";
import {
  Phone,
  Download,
  ChevronDown,
  X,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { STATE_OPTIONS } from "@/constants/stateOptions";

export default function LPULandingView({ data = {} }) {
  const router = useRouter();
  const {
    brand = {},
    courses = [],
    approvals = [],
    stats = [],
    pgProgrammes = [],
    ugProgrammes = [],
    about = {},
    degreeInfo = {},
    pedagogy = {},
    placement = {},
    partners = {},
    admissionSteps = [],
    faqs = [],
  } = data;

  // Modal States
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isScholarshipOpen, setIsScholarshipOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: "" });
  const [selectedCourse, setSelectedCourse] = useState("MBA");

  // Accordion state for FAQs
  const [activeFaq, setActiveFaq] = useState(0);

  const stateOptions = STATE_OPTIONS.map((st) =>
    typeof st === "string" ? { value: st, label: st } : st
  );

  // Forms
  const [heroForm] = Form.useForm();
  const [counselingForm] = Form.useForm();
  const [brochureForm] = Form.useForm();
  const [scholarshipForm] = Form.useForm();
  const [compareForm] = Form.useForm();

  const [loading, setLoading] = useState(false);

  // Scroll trigger for scholarship modal (once per session after 1200px)
  useEffect(() => {
    let triggered = false;
    const handleScroll = () => {
      if (!triggered && window.scrollY > 1200) {
        triggered = true;
        const key = "lpu_scholarship_seen";
        if (!sessionStorage.getItem(key)) {
          setIsScholarshipOpen(true);
          sessionStorage.setItem(key, "true");
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generic Lead Submission Handler
  const handleLeadSubmit = async (values, formType, autoDownloadPdf = false) => {
    setLoading(true);
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const leadPayload = {
        name: values.full_name,
        email: values.email,
        phone: values.phone.replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: "LPU Online",
        source: "LPU",
        form_name: formType,
        utm_source: searchParams.get("utm_source") || "LPU_LP",
        utm_medium: searchParams.get("utm_medium") || "Direct",
        utm_campaign: searchParams.get("utm_campaign") || "Online_Admission_2026",
        utm_term: searchParams.get("utm_term") || "",
        utm_content: searchParams.get("utm_content") || "",
        page_url: window.location.href,
      };

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      message.success("Thank you! Our expert counselor will contact you shortly.");

      if (autoDownloadPdf) {
        const link = document.createElement("a");
        link.href = "/assets/lpu/LPU_University_Brochure_compressed.pdf";
        link.download = "LPU_University_Brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setIsCounselingOpen(false);
      setIsBrochureOpen(false);
      setIsScholarshipOpen(false);
      setIsCompareOpen(false);

      router.push("/thank-you");
    } catch {
      message.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openBrochureModal = (courseCode) => {
    if (courseCode) {
      setSelectedCourse(courseCode);
      brochureForm.setFieldsValue({ course: courseCode });
    }
    setIsBrochureOpen(true);
  };

  const openCounselingModal = (courseCode) => {
    if (courseCode) {
      setSelectedCourse(courseCode);
      counselingForm.setFieldsValue({ course: courseCode });
    }
    setIsCounselingOpen(true);
  };

  return (
    <div className="lpu-landing-page min-h-screen bg-white text-slate-800 font-sans selection:bg-[#f58220] selection:text-white">
      <style jsx global>{`
        @keyframes shineSweep {
          0% {
            left: -100%;
          }
          40%, 100% {
            left: 160%;
          }
        }
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.6);
          }
          70% {
            box-shadow: 0 0 0 14px rgba(46, 204, 113, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(46, 204, 113, 0);
          }
        }
      `}</style>
      {/* ============================================================== */}
      {/* 1. TOP NAVBAR                                                 */}
      {/* ============================================================== */}
      <nav className="w-full bg-white shadow-xs border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Dual Logos: SODE + Separator + LPU */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="https://distanceeducationschool.com/lpu/" className="block">
              <img
                src="/assets/lpu/sode-icon.png"
                alt="Distance Education School"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </a>
            <div className="h-8 sm:h-9 w-px bg-slate-300" />
            <a href="https://distanceeducationschool.com/lpu/" className="block">
              <img
                src="/assets/lpu/lpu-logo.png"
                alt="Lovely Professional University"
                className="h-9 sm:h-11 w-auto object-contain"
              />
            </a>
          </div>

          {/* Scholarship Coupon Code Button */}
          <div className="bg-[#eefcf4] p-1 sm:p-1.5 rounded-xl flex items-center shadow-xs">
            <button
              type="button"
              onClick={() => setIsScholarshipOpen(true)}
              className="relative overflow-hidden border-none text-white font-bold text-xs sm:text-sm px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 animate-[pulseGlow_2.5s_infinite]"
              style={{
                background: "linear-gradient(135deg, #2ecc71, #27ae60)",
                boxShadow: "0 8px 20px rgba(46, 204, 113, 0.45)",
              }}
            >
              {/* Shine highlight reflection */}
              <span
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-[25deg] pointer-events-none animate-[shineSweep_2.8s_infinite]"
              />

              {/* White circular badge for gift icon */}
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center p-0.5 shrink-0 shadow-xs relative z-10">
                <img
                  src="/assets/lpu/gift.gif"
                  alt="Coupon"
                  className="w-full h-full object-contain rounded-full"
                />
              </span>

              {/* Button text */}
              <span className="text-white font-bold text-xs sm:text-sm tracking-wide select-none drop-shadow-xs relative z-10 whitespace-nowrap">
                Scholarship Coupon Code
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ============================================================== */}
      {/* 2. HERO SECTION                                               */}
      {/* ============================================================== */}
      <section
        id="hero-section"
        className="relative bg-[#fff8f2] py-8 sm:py-12 border-b border-orange-100 overflow-hidden"
        style={{
          backgroundImage: "url('/assets/lpu/new-desktop-front-bg.webp')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading, Strips, Fees, CTA */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#4d4d4d] tracking-tight leading-tight">
                  <span className="underline decoration-[#f58220] underline-offset-8 decoration-4">
                    LPU Online
                  </span>
                  <br />
                  <span className="text-slate-800">Career ka </span>
                  <span className="text-[#f58220]">Turning Point</span>
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-700 mt-3">
                  LPU Online & Distance Education Courses
                </p>
              </div>

              {/* Orange Course Banners */}
              <div className="space-y-1.5 pt-1">
                <div className="bg-[#f58220] text-white font-extrabold text-sm sm:text-lg md:text-xl px-3 sm:px-4 py-1.5 rounded-xs shadow-xs inline-block tracking-wide">
                  MBA | MCA | MA | MSc Maths
                </div>
                <div className="bg-[#f58220] text-white font-extrabold text-sm sm:text-lg md:text-xl px-3 sm:px-4 py-1.5 rounded-xs shadow-xs inline-block tracking-wide">
                  MCOM | BCA | BBA | BA
                </div>
              </div>

              {/* Pricing & Zero Cost EMI Stats */}
              <div className="flex items-center gap-6 pt-2">
                <div>
                  <p className="text-xs font-semibold text-[#f58220] uppercase tracking-wider">
                    Fees Starting at
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    ₹20,000/- Sem
                  </h3>
                </div>

                <div className="h-10 w-[1.5px] bg-slate-300" />

                <div>
                  <p className="text-xs font-semibold text-[#f58220] uppercase tracking-wider">
                    Zero Cost
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                    EMI Available
                  </h3>
                </div>
              </div>

              {/* Download Brochure Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openBrochureModal("MBA")}
                  className="bg-[#4d4d4d] hover:bg-[#333333] active:bg-[#1a1a1a] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer border-none"
                >
                  <span>Download Brochure</span>
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Hero Free Counseling Lead Form */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-[390px] bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.12)] border border-slate-100 p-5 sm:p-6">
                <div className="text-center pb-2">
                  <h3 className="text-xl font-black text-[#f58220] m-0">Free Counseling</h3>
                  <p className="text-xs text-slate-600 font-medium mt-1">
                    Have Doubt? Talk FREE to Our Expert
                  </p>

                  <a
                    href="tel:07065777755"
                    className="mt-2.5 mx-auto py-1 px-4 rounded-full bg-[#f58220] hover:bg-[#e07115] text-white font-bold text-xs inline-flex items-center justify-center gap-1.5 shadow-xs transition-all w-fit"
                  >
                    <Phone className="w-3 h-3 fill-white text-white" />
                    <span>+91 7065 7777 55</span>
                  </a>
                </div>

                <Form
                  form={heroForm}
                  layout="vertical"
                  onFinish={(val) => handleLeadSubmit(val, "Hero Enquiry Form")}
                  initialValues={{ disclaimer: true }}
                  requiredMark={false}
                  className="space-y-2.5 pt-2"
                >
                  <Form.Item
                    name="full_name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                    className="!mb-2"
                  >
                    <Input
                      size="large"
                      placeholder="Enter Your Name"
                      className="rounded bg-[#f9f9f9] border-slate-200 text-xs sm:text-sm !py-2"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[{ required: true, type: "email", message: "Please enter valid email" }]}
                    className="!mb-2"
                  >
                    <Input
                      size="large"
                      placeholder="Enter Your Email"
                      className="rounded bg-[#f9f9f9] border-slate-200 text-xs sm:text-sm !py-2"
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        pattern: /^[6-9]\d{9}$/,
                        message: "Enter valid 10-digit number",
                      },
                    ]}
                    className="!mb-2"
                  >
                    <div className="flex rounded border border-slate-200 bg-[#f9f9f9] overflow-hidden focus-within:border-[#f58220]">
                      <div className="flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-slate-700 border-r border-slate-200 bg-slate-100 shrink-0">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <Input
                        size="large"
                        placeholder="Enter your phone number"
                        maxLength={10}
                        className="!border-none !shadow-none !rounded-none bg-[#f9f9f9] text-xs sm:text-sm !py-2"
                      />
                    </div>
                  </Form.Item>

                  <Form.Item
                    name="course"
                    rules={[{ required: true, message: "Please select your course" }]}
                    className="!mb-2"
                  >
                    <Select
                      placeholder="Select Your Course"
                      options={courses}
                      size="large"
                      className="w-full text-xs sm:text-sm"
                    />
                  </Form.Item>

                  <Form.Item
                    name="state"
                    rules={[{ required: true, message: "Please select your state" }]}
                    className="!mb-2"
                  >
                    <Select
                      placeholder="Select Your State"
                      options={stateOptions}
                      size="large"
                      showSearch
                      optionFilterProp="label"
                      className="w-full text-xs sm:text-sm"
                    />
                  </Form.Item>

                  <Form.Item
                    name="disclaimer"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(new Error("Please agree to disclaimer")),
                      },
                    ]}
                    className="!mb-3"
                  >
                    <div className="flex items-start gap-2 pt-1">
                      <Checkbox className="mt-0.5" />
                      <span className="text-[10px] text-slate-600 leading-tight">
                        I consent to receive university updates via email and mobile number.{" "}
                        <button
                          type="button"
                          onClick={() => setLegalModal({ isOpen: true, type: "disclaimer" })}
                          className="text-[#011bfe] underline cursor-pointer font-medium"
                        >
                          Disclaimer
                        </button>
                      </span>
                    </div>
                  </Form.Item>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 rounded bg-[#f58220] hover:bg-[#e07115] text-white font-extrabold text-sm tracking-wide shadow transition-colors cursor-pointer border-none"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. HERO BOTTOM ADMISSIONS STRIP                               */}
      {/* ============================================================== */}
      <section className="bg-[#f9f9f9] border-y border-slate-200 py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-base sm:text-xl font-bold text-slate-800 m-0">
                Admissions are Open!{" "}
                <span className="text-[#f58220]">LPU Online Degree Courses</span> - 2026 Batch
              </p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => openCounselingModal("MBA")}
                className="bg-[#f58220] hover:bg-[#e07115] active:bg-[#cc630f] text-white font-bold text-sm px-8 py-2.5 rounded-full shadow transition-all cursor-pointer border-none"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. EXPLORE PROGRAM SECTION                                    */}
      {/* ============================================================== */}
      <section id="program" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Post-Graduate Programs */}
          <div>
            <div className="pb-6">
              <h2 className="text-3xl sm:text-4xl text-[#cccccc] font-black tracking-tight leading-none m-0">
                Explore Program
              </h2>
              <p className="text-lg sm:text-2xl text-[#f58220] font-black mt-1">
                Post-Graduate Programs of LPU Online
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pgProgrammes?.map((prog) => (
                <div
                  key={prog.code}
                  className="bg-white rounded-lg p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 transition-shadow hover:shadow-md"
                >
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-32 sm:w-36 h-32 sm:h-36 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 text-left space-y-1 w-full">
                    <h2 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight leading-none m-0">
                      {prog.code}
                    </h2>
                    <h3 className="text-xs font-bold text-slate-900 pt-1 pb-1.5 border-b border-slate-200 block w-full m-0 tracking-normal">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-700 pt-1 leading-relaxed m-0">
                      {prog.desc}
                    </p>
                    <div className="pt-2.5">
                      <button
                        type="button"
                        onClick={() => openBrochureModal(prog.code)}
                        className="bg-[#f58220] hover:bg-[#e07115] text-white font-bold text-xs sm:text-[13px] px-5 py-2 rounded-md shadow-xs inline-flex items-center gap-2 cursor-pointer border-none transition-colors"
                      >
                        <span>Download Brochure</span>
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Undergraduate Programs */}
          <div>
            <div className="pb-6">
              <p className="text-lg sm:text-2xl text-[#f58220] font-black m-0">
                Undergraduate Programs of LPU Online
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ugProgrammes?.map((prog) => (
                <div
                  key={prog.code}
                  className="bg-white rounded-lg p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.07)] border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 transition-shadow hover:shadow-md"
                >
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-32 sm:w-36 h-32 sm:h-36 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 text-left space-y-1 w-full">
                    <h2 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight leading-none m-0">
                      {prog.code}
                    </h2>
                    <h3 className="text-xs font-bold text-slate-900 pt-1 pb-1.5 border-b border-slate-200 block w-full m-0 tracking-normal">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-700 pt-1 leading-relaxed m-0">
                      {prog.desc}
                    </p>
                    <div className="pt-2.5">
                      <button
                        type="button"
                        onClick={() => openBrochureModal(prog.code)}
                        className="bg-[#f58220] hover:bg-[#e07115] text-white font-bold text-xs sm:text-[13px] px-5 py-2 rounded-md shadow-xs inline-flex items-center gap-2 cursor-pointer border-none transition-colors"
                      >
                        <span>Download Brochure</span>
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. ACCREDITATIONS & APPROVALS SECTION                         */}
      {/* ============================================================== */}
      <section id="approval" className="bg-[#4d4d4d] text-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center space-y-10 sm:space-y-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight m-0">
            <span className="text-[#f58220]">LPU University </span>
            <span className="text-white">Accreditations & Approvals</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-start justify-center">
            {approvals?.map((appr, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                {/* Large White Circular Badge */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full bg-white flex items-center justify-center p-3.5 sm:p-5 shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={appr.image}
                    alt={appr.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Badge Label */}
                <div className="mt-3.5 text-center">
                  <p className="text-xs sm:text-sm lg:text-base font-extrabold text-white tracking-wide m-0">
                    {appr.title}
                  </p>
                  <p className="text-[11px] sm:text-xs lg:text-sm font-semibold text-slate-300 mt-0.5 tracking-wider m-0">
                    {appr.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. ABOUT LPU ONLINE UNIVERSITY                                */}
      {/* ============================================================== */}
      <section id="about" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#cccccc] tracking-tight m-0">
              {about.subtitle}
            </h2>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 m-0">
              {about.titlePrefix}{" "}
              <span className="text-[#f58220]">{about.titleHighlight}</span>
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 pt-1">
              {about.subName}
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-5xl">
            <p>{about.p1}</p>
            <p>{about.p2}</p>
          </div>

          {/* Counter Numbers */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 text-center">
              {stats?.map((st, idx) => (
                <div
                  key={idx}
                  className={`space-y-1 ${
                    idx < 3 ? "md:border-r md:border-slate-300" : ""
                  }`}
                >
                  <h2 className="text-3xl sm:text-5xl font-black text-[#f58220] m-0">
                    {st.number}
                  </h2>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 m-0">
                    {st.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. GET UGC ENTITLED ONLINE DEGREE                             */}
      {/* ============================================================== */}
      <section id="Degreeinfo" className="bg-[#fff8f2] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Sample Certificate */}
            <div className="lg:col-span-4 flex justify-center">
              <img
                src={degreeInfo.image}
                alt="LPU Sample Degree Certificate"
                className="w-full max-w-[340px] h-auto object-contain shadow-md rounded-lg border border-orange-200"
              />
            </div>

            {/* Right Column: Degree Values 2x2 */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#f58220] m-0">
                  {degreeInfo.title}
                </h2>
                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mt-1 m-0">
                  {degreeInfo.subtitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {degreeInfo.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {degreeInfo.features?.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-[#f58220] bg-white p-4 rounded shadow-[0_0_4px_rgba(245,130,32,0.15)] space-y-1"
                  >
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 m-0">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed m-0">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openCounselingModal("MBA")}
                  className="bg-black hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-7 py-3 rounded shadow transition-all cursor-pointer border-none"
                >
                  Get FREE Career Assistance
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. LEARNING PEDAGOGY AT LPU ONLINE                            */}
      {/* ============================================================== */}
      <section id="learning" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4d4d4d] m-0">
              {pedagogy.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {pedagogy.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {pedagogy.items?.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 border-b-[3px] border-b-[#f58220] rounded-md p-6 shadow-sm hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-contain"
                  />
                  <h3 className="text-base font-bold text-[#f58220] m-0">{item.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. PLACEMENT SUPPORT SERVICES AT LPU ONLINE                   */}
      {/* ============================================================== */}
      <section id="placement" className="bg-[#f9f9f9] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#4d4d4d] m-0">
              {placement.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {placement.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
            {placement.items?.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-md p-6 shadow-sm space-y-3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-contain"
                />
                <h3 className="text-base font-bold text-slate-900 m-0">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed m-0">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. PLACEMENT & HIRING PARTNERS                               */}
      {/* ============================================================== */}
      <section id="hiring-partner" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-3xl font-extrabold text-[#cccccc] m-0">
                {partners.titlePrefix}
              </h2>
              <h3 className="text-2xl font-bold text-[#f58220] m-0">
                {partners.titleHighlight}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {partners.desc}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openCounselingModal("MBA")}
                  className="bg-black hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded shadow inline-flex items-center gap-1 cursor-pointer border-none"
                >
                  <span>Apply Now</span>
                  <span>»</span>
                </button>
              </div>
            </div>

            {/* Right Banner Image */}
            <div className="lg:col-span-7 flex justify-center">
              <img
                src={partners.desktopImg}
                alt="LPU Hiring Partners"
                className="w-full h-auto object-contain hidden sm:block rounded-lg shadow-xs"
              />
              <img
                src={partners.mobileImg}
                alt="LPU Hiring Partners Mobile"
                className="w-full h-auto object-contain sm:hidden rounded-lg shadow-xs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. ENROLLMENT PROCESS SECTION                                */}
      {/* ============================================================== */}
      <section id="admission-process" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-2 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 m-0">
              What is the enrollment process of{" "}
              <span className="text-[#f58220]">LPU Online?</span>
            </h2>
            <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed font-normal m-0 pt-1">
              The admission process of LPU Online is quite simple, quick, and completely
              student-friendly. It is designed to ensure a seamless enrollment experience for
              learners applying to online degree programs. Here’s a step-by-step guide to enrolling
              in an online course at the university.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {admissionSteps?.map((step, idx) => {
              const defaultStyles = [
                { themeColor: "#ff7a00", cardBg: "bg-[#fff8f0]" },
                { themeColor: "#0066cc", cardBg: "bg-[#f0f7ff]" },
                { themeColor: "#ff2a6d", cardBg: "bg-[#fff0f5]" },
                { themeColor: "#16a34a", cardBg: "bg-[#f0faf3]" },
                { themeColor: "#8b5cf6", cardBg: "bg-[#f7f2ff]" },
                { themeColor: "#ff7a00", cardBg: "bg-[#fff8f0]" },
              ];
              const fallback = defaultStyles[idx % defaultStyles.length];
              const themeColor = step.themeColor || fallback.themeColor;
              const cardBg = step.cardBg || fallback.cardBg;
              const num = step.num || idx + 1;

              return (
                <div
                  key={num}
                  className={`${cardBg} rounded-2xl p-3.5 sm:p-4 pt-5 pb-5 sm:pt-6 sm:pb-6 text-center flex flex-col items-center justify-start h-full transition-all duration-300 hover:-translate-y-1 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md border-0 border-b-4`}
                  style={{ borderBottomColor: themeColor }}
                >
                  {/* Circular Number Badge */}
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 bg-white flex items-center justify-center font-bold text-base sm:text-lg mb-3.5 sm:mb-4 shrink-0 shadow-2xs select-none"
                    style={{ borderColor: themeColor, color: themeColor }}
                  >
                    {num}
                  </div>

                  {/* Step Title */}
                  <h3 className="text-[13px] sm:text-[14px] font-bold text-slate-900 mb-1.5 leading-snug m-0">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-[11px] sm:text-[11.5px] text-slate-600 leading-relaxed font-normal m-0">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 12. FAQ SECTION                                               */}
      {/* ============================================================== */}
      <section id="fAQ" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left FAQ Title Box */}
            <div className="lg:col-span-4">
              <div className="bg-[#fff8f2] p-8 sm:p-12 rounded-lg text-center flex flex-col justify-center items-center h-full border border-orange-100">
                <h2 className="text-5xl sm:text-6xl font-black text-[#f58220] m-0">FAQ</h2>
                <h3 className="text-base sm:text-lg font-bold text-slate-800 mt-2 m-0">
                  Frequently Asked Question
                </h3>
              </div>
            </div>

            {/* Right Accordion */}
            <div className="lg:col-span-8 space-y-3">
              {faqs?.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="rounded overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                      className="w-full bg-[#f1f1f1] hover:bg-[#e8e8e8] border-l-4 border-[#f58220] p-4 text-left font-bold text-xs sm:text-sm text-slate-800 rounded-r flex justify-between items-center cursor-pointer transition-colors"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-600 shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-[#f58220]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white border border-t-0 border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed rounded-b">
                        <p className="m-0">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 13. STILL CONFUSED / COMPARE SECTION                          */}
      {/* ============================================================== */}
      <section id="compare-universities" className="bg-[#f6f8fa] pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto relative">
          <div className="bg-[#f58220] rounded-[20px] pt-10 sm:pt-12 pb-14 sm:pb-16 px-6 text-center shadow-sm relative">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight m-0">
              Still Confused?
            </h2>
            <h4 className="text-sm sm:text-base font-semibold text-white/95 mt-2.5 m-0">
              Compare LPU Online with Top UGC-DEB Approved Universities
            </h4>

            {/* Overlapping Arrow Button */}
            <div className="absolute -bottom-8 sm:-bottom-9 left-1/2 -translate-x-1/2 z-10">
              <button
                type="button"
                onClick={() => setIsCompareOpen(true)}
                className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-white p-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 transition-all cursor-pointer border-none flex items-center justify-center"
              >
                <img
                  src="/assets/lpu/arrow.gif"
                  alt="Compare Universities"
                  className="w-full h-full rounded-full object-contain"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 14. MINI FOOTER                                               */}
      {/* ============================================================== */}
      <footer className="bg-[#f6f8fa] pt-16 sm:pt-20 pb-0 text-center relative border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4 pb-8 sm:pb-10">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setIsCompareOpen(true)}
              className="border-none bg-transparent cursor-pointer block max-w-[420px] sm:max-w-[480px] w-[85%] mx-auto"
            >
              <img
                src="/assets/lpu/new-des-logo.webp"
                alt="Distance Education School"
                className="w-full h-auto object-contain mx-auto"
              />
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-500 max-w-4xl mx-auto leading-relaxed m-0 px-2">
            SODE Counselling Services LLP act as a marketing agency. All university names, logos,
            and trademarks mentioned are used for informational purposes only. We are not a
            university or an admission authority. Users are encouraged to verify information on the
            official website of the University before making decisions.
            <br />
            <br />
            <button
              type="button"
              onClick={() => setLegalModal({ isOpen: true, type: "disclaimer" })}
              className="text-slate-800 underline hover:text-[#f58220] cursor-pointer font-medium"
            >
              Disclaimer
            </button>{" "}
            |{" "}
            <button
              type="button"
              onClick={() => setLegalModal({ isOpen: true, type: "terms" })}
              className="text-slate-800 underline hover:text-[#f58220] cursor-pointer font-medium"
            >
              Terms & Conditions
            </button>{" "}
            |{" "}
            <button
              type="button"
              onClick={() => setLegalModal({ isOpen: true, type: "privacy" })}
              className="text-slate-800 underline hover:text-[#f58220] cursor-pointer font-medium"
            >
              Privacy Policy
            </button>
          </p>
        </div>

        {/* Navy Blue Copyright Bottom Bar */}
        <div className="bg-[#0b3c66] text-white text-xs sm:text-[13px] py-2.5 pb-16 sm:pb-2.5 px-4 text-center font-normal">
          © 2026 SODE Counseling Services LLP
        </div>
      </footer>

      {/* ============================================================== */}
      {/* 15. FLOATING RIGHT WIDGETS & MOBILE CTAs                       */}
      {/* ============================================================== */}
      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] sm:hidden">
        <div className="max-w-md mx-auto flex items-center justify-center gap-2">
          {/* WhatsApp Button */}
          <a
            href={brand.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#25d366] text-white font-bold text-xs py-2 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Get Brochure</span>
          </a>

          {/* Apply Now Button */}
          <button
            type="button"
            onClick={() => openCounselingModal("MBA")}
            className="flex-1 bg-[#f58220] text-white font-bold text-xs py-2 px-3 rounded-full shadow-sm cursor-pointer border-none"
          >
            Apply Now »
          </button>
        </div>
      </div>

      {/* Floating Call Widget (Right side) */}
      <a
        href="tel:07065777755"
        className="fixed bottom-[85px] sm:bottom-[90px] right-3 sm:right-5 z-40 block cursor-pointer hover:scale-105 active:scale-95 transition-transform"
      >
        <img
          src="/assets/lpu/call_icon.gif"
          alt="Call Support"
          className="w-13 h-13 sm:w-16 sm:h-16 rounded-full object-contain shadow-[0_15px_35px_rgba(0,0,0,0.4),0_0_35px_rgba(46,204,113,0.9)]"
        />
      </a>

      {/* Floating Coupon Widget (Right side below call icon) */}
      <button
        type="button"
        onClick={() => setIsScholarshipOpen(true)}
        className="fixed bottom-[15px] sm:bottom-[18px] right-3 sm:right-5 z-40 border-none bg-transparent cursor-pointer hover:scale-105 active:scale-95 transition-transform"
      >
        <img
          src="/assets/lpu/gift.gif"
          alt="Scholarship Gift"
          className="w-13 h-13 sm:w-15 sm:h-15 rounded-full object-contain shadow-[0_10px_25px_rgba(0,0,0,0.3),0_0_20px_rgba(46,204,113,0.6)]"
        />
      </button>

      {/* ============================================================== */}
      {/* 16. MODALS                                                     */}
      {/* ============================================================== */}

      {/* 16.1 Free Counseling / Apply Now Modal */}
      {isCounselingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsCounselingOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer border-none bg-transparent"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-3">
              <h3 className="text-xl font-black text-[#f58220] m-0">Free Counseling</h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Have Doubt? Talk FREE to Our Expert
              </p>
              <a
                href="tel:07065777755"
                className="mt-2 mx-auto py-1 px-4 rounded-full bg-[#f58220] text-white text-xs font-bold flex items-center justify-center gap-1.5 w-fit shadow-xs"
              >
                <Phone className="w-3 h-3 fill-white" /> +91 7065 7777 55
              </a>
            </div>

            <Form
              form={counselingForm}
              layout="vertical"
              onFinish={(val) => handleLeadSubmit(val, "Apply Now Modal")}
              initialValues={{ course: selectedCourse, disclaimer: true }}
              requiredMark={false}
              className="space-y-2.5 pt-2"
            >
              <Form.Item
                name="full_name"
                rules={[{ required: true, message: "Please enter your name" }]}
                className="!mb-2"
              >
                <Input
                  size="large"
                  placeholder="Enter Your Name"
                  className="rounded bg-[#f9f9f9] border-slate-200 text-xs sm:text-sm !py-2"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, type: "email", message: "Please enter valid email" }]}
                className="!mb-2"
              >
                <Input
                  size="large"
                  placeholder="Enter Your Email"
                  className="rounded bg-[#f9f9f9] border-slate-200 text-xs sm:text-sm !py-2"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Enter valid 10-digit number" }]}
                className="!mb-2"
              >
                <div className="flex rounded border border-slate-200 bg-[#f9f9f9] overflow-hidden focus-within:border-[#f58220]">
                  <div className="flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-slate-700 border-r border-slate-200 bg-slate-100 shrink-0">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <Input
                    size="large"
                    placeholder="Enter your phone number"
                    maxLength={10}
                    className="!border-none !shadow-none !rounded-none bg-[#f9f9f9] text-xs sm:text-sm !py-2"
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="course"
                rules={[{ required: true, message: "Please select course" }]}
                className="!mb-2"
              >
                <Select
                  placeholder="Select Your Course"
                  options={courses}
                  size="large"
                  className="w-full text-xs sm:text-sm"
                />
              </Form.Item>

              <Form.Item
                name="state"
                rules={[{ required: true, message: "Please select state" }]}
                className="!mb-2"
              >
                <Select
                  placeholder="Select Your State"
                  options={stateOptions}
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  className="w-full text-xs sm:text-sm"
                />
              </Form.Item>

              <Form.Item
                name="disclaimer"
                valuePropName="checked"
                rules={[{ validator: (_, val) => (val ? Promise.resolve() : Promise.reject(new Error("Accept disclaimer"))) }]}
                className="!mb-3"
              >
                <div className="flex items-start gap-2 pt-1">
                  <Checkbox className="mt-0.5" />
                  <span className="text-[10px] text-slate-600 leading-tight">
                    I consent to receive university updates via email and mobile number.{" "}
                    <button
                      type="button"
                      onClick={() => setLegalModal({ isOpen: true, type: "disclaimer" })}
                      className="text-[#011bfe] underline cursor-pointer"
                    >
                      Disclaimer
                    </button>
                  </span>
                </div>
              </Form.Item>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded bg-[#f58220] hover:bg-[#e07115] text-white font-extrabold text-sm tracking-wide shadow transition-colors cursor-pointer border-none"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </Form>
          </div>
        </div>
      )}

      {/* 16.2 Download Brochure Modal */}
      {isBrochureOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsBrochureOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer border-none bg-transparent"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-3">
              <h3 className="text-xl font-black text-[#0066cc] m-0">Download Brochure</h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Enter your details to get official LPU curriculum & fee brochure instantly!
              </p>
            </div>

            <Form
              form={brochureForm}
              layout="vertical"
              onFinish={(val) => handleLeadSubmit(val, "Download Brochure Modal", true)}
              initialValues={{ course: selectedCourse, disclaimer: true }}
              requiredMark={false}
              className="space-y-2.5 pt-2"
            >
              <Form.Item
                name="full_name"
                rules={[{ required: true, message: "Please enter your name" }]}
                className="!mb-2"
              >
                <Input
                  size="large"
                  placeholder="Enter Your Name"
                  className="rounded bg-[#f9f9f9] border-slate-200 text-xs sm:text-sm !py-2"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, type: "email", message: "Please enter valid email" }]}
                className="!mb-2"
              >
                <Input
                  size="large"
                  placeholder="Enter Your Email"
                  className="rounded bg-[#f9f9f9] border-slate-200 text-xs sm:text-sm !py-2"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Enter valid 10-digit number" }]}
                className="!mb-2"
              >
                <div className="flex rounded border border-slate-200 bg-[#f9f9f9] overflow-hidden focus-within:border-[#0066cc]">
                  <div className="flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-slate-700 border-r border-slate-200 bg-slate-100 shrink-0">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <Input
                    size="large"
                    placeholder="Enter your phone number"
                    maxLength={10}
                    className="!border-none !shadow-none !rounded-none bg-[#f9f9f9] text-xs sm:text-sm !py-2"
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="course"
                rules={[{ required: true, message: "Please select course" }]}
                className="!mb-2"
              >
                <Select
                  placeholder="Select Your Course"
                  options={courses}
                  size="large"
                  className="w-full text-xs sm:text-sm"
                />
              </Form.Item>

              <Form.Item
                name="state"
                rules={[{ required: true, message: "Please select state" }]}
                className="!mb-2"
              >
                <Select
                  placeholder="Select Your State"
                  options={stateOptions}
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  className="w-full text-xs sm:text-sm"
                />
              </Form.Item>

              <Form.Item
                name="disclaimer"
                valuePropName="checked"
                rules={[{ validator: (_, val) => (val ? Promise.resolve() : Promise.reject(new Error("Accept disclaimer"))) }]}
                className="!mb-3"
              >
                <div className="flex items-start gap-2 pt-1">
                  <Checkbox className="mt-0.5" />
                  <span className="text-[10px] text-slate-600 leading-tight">
                    I consent to receive university updates via email and mobile number.{" "}
                    <button
                      type="button"
                      onClick={() => setLegalModal({ isOpen: true, type: "disclaimer" })}
                      className="text-[#011bfe] underline cursor-pointer"
                    >
                      Disclaimer
                    </button>
                  </span>
                </div>
              </Form.Item>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded bg-[#0066cc] hover:bg-[#0052a3] text-white font-extrabold text-sm tracking-wide shadow transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{loading ? "Downloading..." : "Download Brochure"}</span>
              </button>
            </Form>
          </div>
        </div>
      )}

      {/* 16.3 Scholarship Coupon Code Modal */}
      {isScholarshipOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsScholarshipOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer border-none bg-transparent"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-3">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-orange-100 flex items-center justify-center">
                <img src="/assets/lpu/gift.gif" alt="Coupon" className="w-8 h-8 object-contain" />
              </div>
              <h3 className="text-xl font-black text-[#f58220] m-0">
                Get Scholarship Coupon Code
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Academic Experts will assist you with fee waiver & scholarship codes!
              </p>
            </div>

            <Form
              form={scholarshipForm}
              layout="vertical"
              onFinish={(val) => handleLeadSubmit(val, "Scholarship Coupon Modal")}
              initialValues={{ course: selectedCourse, disclaimer: true }}
              requiredMark={false}
              className="space-y-2.5 pt-2"
            >
              <Form.Item
                name="full_name"
                rules={[{ required: true, message: "Please enter your name" }]}
                className="!mb-2"
              >
                <Input
                  size="large"
                  placeholder="Enter Your Name"
                  className="rounded bg-[#f9f9f9] border-slate-200 text-xs sm:text-sm !py-2"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, type: "email", message: "Please enter valid email" }]}
                className="!mb-2"
              >
                <Input
                  size="large"
                  placeholder="Enter Your Email"
                  className="rounded bg-[#f9f9f9] border-slate-200 text-xs sm:text-sm !py-2"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Enter valid 10-digit number" }]}
                className="!mb-2"
              >
                <div className="flex rounded border border-slate-200 bg-[#f9f9f9] overflow-hidden focus-within:border-[#f58220]">
                  <div className="flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-slate-700 border-r border-slate-200 bg-slate-100 shrink-0">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <Input
                    size="large"
                    placeholder="Enter your phone number"
                    maxLength={10}
                    className="!border-none !shadow-none !rounded-none bg-[#f9f9f9] text-xs sm:text-sm !py-2"
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="course"
                rules={[{ required: true, message: "Please select course" }]}
                className="!mb-2"
              >
                <Select
                  placeholder="Select Your Course"
                  options={courses}
                  size="large"
                  className="w-full text-xs sm:text-sm"
                />
              </Form.Item>

              <Form.Item
                name="state"
                rules={[{ required: true, message: "Please select state" }]}
                className="!mb-2"
              >
                <Select
                  placeholder="Select Your State"
                  options={stateOptions}
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  className="w-full text-xs sm:text-sm"
                />
              </Form.Item>

              <Form.Item
                name="disclaimer"
                valuePropName="checked"
                rules={[{ validator: (_, val) => (val ? Promise.resolve() : Promise.reject(new Error("Accept disclaimer"))) }]}
                className="!mb-3"
              >
                <div className="flex items-start gap-2 pt-1">
                  <Checkbox className="mt-0.5" />
                  <span className="text-[10px] text-slate-600 leading-tight">
                    I consent to receive university updates via email and mobile number.{" "}
                    <button
                      type="button"
                      onClick={() => setLegalModal({ isOpen: true, type: "disclaimer" })}
                      className="text-[#011bfe] underline cursor-pointer"
                    >
                      Disclaimer
                    </button>
                  </span>
                </div>
              </Form.Item>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded bg-[#f58220] hover:bg-[#e07115] text-white font-extrabold text-sm tracking-wide shadow transition-colors cursor-pointer border-none"
              >
                {loading ? "Generating..." : "Get Scholarship Code"}
              </button>
            </Form>
          </div>
        </div>
      )}

      {/* 16.4 Compare Modal */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsCompareOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer border-none bg-transparent"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pb-3">
              <h3 className="text-xl font-black text-slate-900 m-0">
                Compare Top Universities
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Compare LPU Online with Amity, Manipal, Chandigarh & other UGC-DEB institutes
              </p>
            </div>

            <Form
              form={compareForm}
              layout="vertical"
              onFinish={(val) => handleLeadSubmit(val, "Compare Universities Modal")}
              initialValues={{ course: selectedCourse, disclaimer: true }}
              requiredMark={false}
              className="space-y-2.5 pt-2"
            >
              <Form.Item
                name="full_name"
                rules={[{ required: true, message: "Please enter your name" }]}
                className="!mb-2"
              >
                <Input
                  size="large"
                  placeholder="Enter Your Name"
                  className="rounded bg-[#f9f9f9] border-slate-200 text-xs sm:text-sm !py-2"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, type: "email", message: "Please enter valid email" }]}
                className="!mb-2"
              >
                <Input
                  size="large"
                  placeholder="Enter Your Email"
                  className="rounded bg-[#f9f9f9] border-slate-200 text-xs sm:text-sm !py-2"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: "Enter valid 10-digit number" }]}
                className="!mb-2"
              >
                <div className="flex rounded border border-slate-200 bg-[#f9f9f9] overflow-hidden focus-within:border-[#f58220]">
                  <div className="flex items-center gap-1 px-2.5 py-2 text-xs font-semibold text-slate-700 border-r border-slate-200 bg-slate-100 shrink-0">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <Input
                    size="large"
                    placeholder="Enter your phone number"
                    maxLength={10}
                    className="!border-none !shadow-none !rounded-none bg-[#f9f9f9] text-xs sm:text-sm !py-2"
                  />
                </div>
              </Form.Item>

              <Form.Item
                name="course"
                rules={[{ required: true, message: "Please select course" }]}
                className="!mb-2"
              >
                <Select
                  placeholder="Select Your Course"
                  options={courses}
                  size="large"
                  className="w-full text-xs sm:text-sm"
                />
              </Form.Item>

              <Form.Item
                name="state"
                rules={[{ required: true, message: "Please select state" }]}
                className="!mb-2"
              >
                <Select
                  placeholder="Select Your State"
                  options={stateOptions}
                  size="large"
                  showSearch
                  optionFilterProp="label"
                  className="w-full text-xs sm:text-sm"
                />
              </Form.Item>

              <Form.Item
                name="disclaimer"
                valuePropName="checked"
                rules={[{ validator: (_, val) => (val ? Promise.resolve() : Promise.reject(new Error("Accept disclaimer"))) }]}
                className="!mb-3"
              >
                <div className="flex items-start gap-2 pt-1">
                  <Checkbox className="mt-0.5" />
                  <span className="text-[10px] text-slate-600 leading-tight">
                    I consent to receive university updates via email and mobile number.{" "}
                    <button
                      type="button"
                      onClick={() => setLegalModal({ isOpen: true, type: "disclaimer" })}
                      className="text-[#011bfe] underline cursor-pointer"
                    >
                      Disclaimer
                    </button>
                  </span>
                </div>
              </Form.Item>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded bg-[#f58220] hover:bg-[#e07115] text-white font-extrabold text-sm tracking-wide shadow transition-colors cursor-pointer border-none"
              >
                {loading ? "Comparing..." : "Compare Now"}
              </button>
            </Form>
          </div>
        </div>
      )}

      {/* 16.5 Legal Modals: Disclaimer, Terms, Privacy Policy */}
      {legalModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setLegalModal({ isOpen: false, type: "" })}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer border-none bg-transparent"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModal.type === "disclaimer" && (
              <div className="space-y-4 text-slate-700">
                <h2 className="text-xl sm:text-2xl font-black text-center text-slate-900 pb-2 border-b border-slate-200">
                  Disclaimer
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed">
                  This information is provided by <b>DistanceEducationSchool.com</b>, under the legal
                  entity of <b>SODE Counselling Services LLP</b>, registered with the Ministry of
                  Corporate Affairs, with the main objective of providing information, guidance, and
                  counselling services about UGC-DEB-approved universities. We do not act as a
                  university or an admission authority.
                </p>
                <h4 className="font-bold text-sm text-slate-900 pt-2">Essential Points:</h4>
                <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1.5 leading-relaxed text-slate-600">
                  <li>All university names, logos, and trademarks used are for informational purposes only.</li>
                  <li>Our role is to provide updates, information, and guidance on universities regarding their distance or online education programs.</li>
                  <li>We do not charge students any fees for counselling or guidance on university applications.</li>
                  <li>We do not issue degrees, mark sheets, or certificates in the name of any university.</li>
                  <li>Our aim is to offer free and unbiased counselling to help students choose the right path.</li>
                  <li>We respect the integrity and reputation of all listed universities and do not engage in any activity that damages their credibility.</li>
                  <li>Users are encouraged to verify information from official university portals before making decisions.</li>
                  <li>Our services are transparent, legal, and purely for student support.</li>
                </ul>
              </div>
            )}

            {legalModal.type === "terms" && (
              <div className="space-y-4 text-slate-700">
                <h2 className="text-xl sm:text-2xl font-black text-center text-slate-900 pb-2 border-b border-slate-200">
                  Terms and Conditions
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed">
                  This page outlines the terms and conditions that apply when you access or use
                  services provided on this platform, operated by SODE Counselling Services LLP under
                  DistanceEducationSchool.com.
                </p>
                <h4 className="font-bold text-sm text-slate-900 pt-2">1. Our Role</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  We provide information and counselling services only. We are not a university and
                  do not collect any university fees directly. All academic or admission-related
                  payments must be made to the respective university.
                </p>
                <h4 className="font-bold text-sm text-slate-900 pt-2">2. Unauthorised Use or Fraud</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  If you suspect any unauthorised transaction linked to a service on our platform,
                  report it immediately. We will coordinate with the respective payment partner for
                  further action.
                </p>
                <h4 className="font-bold text-sm text-slate-900 pt-2">3. Updates to These Terms</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  These terms may be updated as services evolve. Continued use of this platform
                  implies your agreement to the latest version of these terms.
                </p>
              </div>
            )}

            {legalModal.type === "privacy" && (
              <div className="space-y-4 text-slate-700">
                <h2 className="text-xl sm:text-2xl font-black text-center text-slate-900 pb-2 border-b border-slate-200">
                  Privacy Policy
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed">
                  All information on this platform is provided by DistanceEducationSchool.com, under
                  the legal name of SODE Counselling Services LLP. We are an educational counselling
                  platform that helps students find trusted distance and online courses from
                  UGC-DEB-approved universities.
                </p>
                <h4 className="font-bold text-sm text-slate-900 pt-2">1. No Personal Data Collected by Default</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  You can freely browse our website without sharing any personal information. We do
                  not collect your name, phone number, or email address unless you choose to fill out
                  a form or contact us directly.
                </p>
                <h4 className="font-bold text-sm text-slate-900 pt-2">2. Data Sharing</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  We share your details only with trusted university partners, and only for the purpose
                  of counselling or admission. We do not sell or share data with third-party advertisers.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
