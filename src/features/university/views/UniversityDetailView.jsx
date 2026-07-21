"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Tag, Button, Row, Col, Space, Descriptions, Breadcrumb, Input, Form, Select, Alert } from "antd";
import { 
  StarFilled, 
  CheckCircleFilled, 
  ArrowLeftOutlined, 
  FileTextOutlined,
  DollarOutlined,
  FileProtectOutlined,
  SwapOutlined
} from "@ant-design/icons";
import { Building2, MapPin, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";

const UNI_DETAILS = {
  "golden-gate-university": {
    name: "Golden Gate University",
    location: "California, USA",
    logoBg: "#1C3569",
    description: "Golden Gate University (GGU) has been catering to working professionals since 1901. Located in San Francisco, California, GGU is widely recognized for its high-quality professional degrees in business, law, taxation, and technology.",
    rating: 4.8,
    reviews: 1240,
    approvals: ["WASC Accredited", "120+ Years Old", "US News Ranked"],
    fees: "$3,000 - $12,000 per year",
    eligibility: "Bachelor's / Master's degree with 50% minimum marks (experience preferred for DBA)",
    courses: [
      { name: "Doctor of Business Administration (DBA)", duration: "3 Years" },
      { name: "Global Master of Business Administration (MBA)", duration: "18 Months" },
      { name: "M.Sc. in Business Analytics", duration: "18 Months" },
    ]
  },
  "subharti-university": {
    name: "Swami Vivekanand Subharti University",
    location: "Meerut, Uttar Pradesh, India",
    logoBg: "#E11D48",
    description: "Subharti University is a top State Private University in Northern India offering high-quality distance education courses approved by the UGC-DEB. The university focuses on making education accessible and affordable to all segments of society.",
    rating: 4.5,
    reviews: 845,
    approvals: ["UGC-DEB Approved", "NAAC A Grade", "Government recognized"],
    fees: "₹15,000 - ₹45,000 per year",
    eligibility: "12th Pass for UG / Graduate for PG programs",
    courses: [
      { name: "Master of Business Administration (Distance MBA)", duration: "2 Years" },
      { name: "Bachelor of Business Administration (Distance BBA)", duration: "3 Years" },
      { name: "Bachelor of Arts (Distance BA)", duration: "3 Years" },
      { name: "Master of Arts (Distance MA)", duration: "2 Years" },
    ]
  },
  "mangalayatan-university": {
    name: "Mangalayatan University",
    location: "Aligarh, Uttar Pradesh, India",
    logoBg: "#059669",
    description: "Mangalayatan University Aligarh is a premier state private university accredited with an 'A+' grade by NAAC. The online and distance learning programs are designed to provide learners with academic flexibility and career-relevant qualifications.",
    rating: 4.6,
    reviews: 620,
    approvals: ["UGC-DEB Approved", "NAAC A+ Grade", "AICTE Approved"],
    fees: "₹18,000 - ₹55,000 per year",
    eligibility: "12th Pass for UG / Graduate with minimum 45% marks for PG",
    courses: [
      { name: "Online MCA", duration: "2 Years" },
      { name: "Online MBA", duration: "2 Years" },
      { name: "Online BCA", duration: "3 Years" },
      { name: "Online BBA", duration: "3 Years" },
    ]
  },
  "rushford-business-school": {
    name: "Rushford Business School",
    location: "Geneva, Switzerland",
    logoBg: "#4F46E5",
    description: "Rushford Business School is a leading business school in Europe offering professional online degrees certified by EduQua. With a focus on research, practical study cases, and networking, Rushford degrees carry premium corporate validation.",
    rating: 4.7,
    reviews: 310,
    approvals: ["EduQua Certified", "ACBSP Member", "Swiss Accredited"],
    fees: "€2,500 - €8,000 per year",
    eligibility: "Graduation with at least 50% marks (work experience is valued)",
    courses: [
      { name: "Global MBA (Swiss Degree)", duration: "18 Months" },
      { name: "M.Sc. in Clinical Research & Pharmacovigilance", duration: "18 Months" },
      { name: "Doctor of Business Administration (DBA)", duration: "3 Years" },
    ]
  }
};

export default function UniversityDetailView({ slug: propSlug, initialUniversity }) {
  const { isInCompare, toggleCompare } = useCompare();
  const params = useParams();
  const router = useRouter();
  const slug = propSlug || params?.slug;

  const uni = initialUniversity || UNI_DETAILS[slug] || UNI_DETAILS["golden-gate-university"];

  return (
    <div className="bg-[#f8fafc] py-12 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb items={[
            { title: <Link href="/">Home</Link> },
            { title: <Link href="/universities">Universities</Link> },
            { title: uni.name }
          ]} />
          <div className="flex items-center gap-2">
            <Button
              type={isInCompare(slug) ? "default" : "dashed"}
              onClick={() => toggleCompare({ ...uni, slug })}
              icon={<SwapOutlined className={isInCompare(slug) ? "text-amber-600" : ""} />}
              className={`font-semibold rounded-lg h-9 px-3 text-xs cursor-pointer ${
                isInCompare(slug) ? "border-amber-500 bg-amber-50 text-amber-700 font-bold" : "border-slate-300 text-slate-700"
              }`}
            >
              {isInCompare(slug) ? "In Compare Bucket ✓" : "+ Add to Compare"}
            </Button>

            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => router.push("/universities")}
              className="w-fit flex items-center font-semibold rounded-lg h-9 text-slate-600 cursor-pointer"
            >
              Back to Universities
            </Button>
          </div>
        </div>

        {/* Hero Card */}
        <Card className="bg-gradient-to-br from-[#1C3569] via-[#17305e] to-[#005382] text-white border-none rounded-3xl shadow-xl p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,193,7,0.12),transparent_40%)]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-black/10 flex-shrink-0"
              style={{ backgroundColor: uni.logoBg, border: "2px solid rgba(255,255,255,0.2)" }}
            >
              {uni.name.charAt(0)}
            </div>
            
            <div className="text-center md:text-left flex-grow space-y-3">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold m-0 text-white">
                {uni.name}
              </h1>
              <p className="text-slate-300 text-sm md:text-base flex items-center justify-center md:justify-start gap-1.5 m-0">
                <MapPin className="text-[#FFC107] text-base" /> {uni.location}
              </p>
              <div className="flex justify-center md:justify-start gap-2 flex-wrap pt-1">
                {uni.approvals.map((app, i) => (
                  <Tag color="#FFC107" key={i} className="text-black font-semibold text-xs border-none rounded px-2.5 py-0.5 m-0">
                    <CheckCircleFilled className="mr-1 text-[10px]" /> {app}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-[#FFC107] text-lg font-bold">
                <StarFilled />
                <span>{uni.rating}</span>
              </div>
              <span className="text-slate-300 text-xs mt-1 font-medium">{uni.reviews} Reviews</span>
            </div>
          </div>
        </Card>

        {/* Content & Sidebar Grid */}
        <Row gutter={[32, 32]}>
          {/* Main Details */}
          <Col xs={24} lg={16} className="space-y-8">
            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6" title={<span className="text-lg font-bold text-slate-800"><FileTextOutlined className="mr-2 text-blue-600" />About University</span>} variant="borderless">
              <p className="text-slate-600 leading-relaxed text-sm md:text-base m-0">
                {uni.description}
              </p>
            </Card>

            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6" title={<span className="text-lg font-bold text-slate-800"><FileProtectOutlined className="mr-2 text-emerald-600" />Accreditations & Approvals</span>} variant="borderless">
              <Alert 
                title="Recognized & Validated"
                description="This institution is fully approved by regulatory bodies (such as UGC-DEB in India or WASC/EduQua internationally), ensuring the certificates are 100% valid for government, private sector, and higher education globally."
                type="success"
                showIcon
                className="mb-4 rounded-xl font-medium"
              />
            </Card>

            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6" title={<span className="text-lg font-bold text-slate-800"><GraduationCap className="mr-2 text-violet-600 w-5 h-5 inline-block" />Offered Courses</span>} variant="borderless">
              <div className="divide-y divide-slate-100">
                {uni.courses.map((course, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                    <div>
                      <h4 className="text-base font-bold text-slate-800 m-0">{course.name}</h4>
                      <span className="text-xs text-slate-400 font-semibold mt-1 block">Category: Distance/Online</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                        {course.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6" title={<span className="text-lg font-bold text-slate-800"><DollarOutlined className="mr-2 text-amber-600" />Eligibility & Fees</span>} variant="borderless">
              <Descriptions column={1} bordered={false} className="[&_.ant-descriptions-item]:pb-4">
                <Descriptions.Item label={<span className="font-bold text-slate-600">Course Fees</span>}>
                  <span className="font-semibold text-slate-800">{uni.fees}</span>
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-bold text-slate-600">Eligibility Criteria</span>}>
                  <span className="text-slate-600">{uni.eligibility}</span>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          {/* Sidebar Inquiry Form */}
          <Col xs={24} lg={8}>
            <Card className="sticky top-6 rounded-2xl border border-slate-100 shadow-lg p-6 bg-white" title={<span className="text-base font-bold text-[#1C3569] m-0 block">Inquire About Admission</span>} variant="borderless">
              <Form layout="vertical" className="space-y-4" onSubmitCapture={(e) => e.preventDefault()}>
                <Form.Item label="Your Name" required className="m-0">
                  <Input placeholder="Enter your full name" className="h-10 rounded-lg border-slate-200" />
                </Form.Item>
                
                <Form.Item label="Mobile Number" required className="m-0">
                  <Input placeholder="Enter 10-digit number" className="h-10 rounded-lg border-slate-200" />
                </Form.Item>
                
                <Form.Item label="Select Course" required className="m-0">
                  <Select placeholder="Choose your desired program" className="h-10 rounded-lg border-slate-200" options={
                    uni.courses.map(c => ({ value: c.name, label: c.name }))
                  } />
                </Form.Item>

                <Form.Item label="Message / Query" className="m-0">
                  <Input.TextArea rows={3} placeholder="Ask about fees, admissions, dynamic class schedules..." className="rounded-lg border-slate-200" />
                </Form.Item>

                <Button 
                  type="primary" 
                  htmlType="submit"
                  className="w-full bg-[#1C3569] hover:!bg-[#122449] border-none text-white font-bold h-11 rounded-xl cursor-pointer mt-4"
                >
                  Send Inquiry Now
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
