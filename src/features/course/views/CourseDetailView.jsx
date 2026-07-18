"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Tag, Button, Row, Col, Space, Descriptions, Breadcrumb, Input, Form, Select, Alert } from "antd";
import { 
  ArrowLeftOutlined, 
  BookOutlined,
  ClockCircleFilled,
  ProfileOutlined,
  DollarOutlined,
  CompassOutlined,
  CarryOutOutlined
} from "@ant-design/icons";
import Link from "next/link";

const COURSE_DETAILS = {
  "distance-mba": {
    title: "Master of Business Administration (MBA)",
    level: "Post Graduate",
    duration: "2 Years (4 Semesters)",
    description: "Our distance MBA program is designed to provide students with a comprehensive understanding of business management principles. This course prepares professionals to take on leadership and management roles in multinational corporations, local enterprises, or start their own business ventures.",
    eligibility: "Bachelor's degree in any discipline from a recognized university with a minimum of 50% aggregate marks.",
    syllabus: [
      "Semester 1: Principles of Management, Managerial Economics, Financial Accounting, Organizational Behavior.",
      "Semester 2: Marketing Management, Human Resource Management, Financial Management, Operations Research.",
      "Semester 3: Specialization Core (Finance/HR/Marketing), Strategic Management, Management Information Systems.",
      "Semester 4: Electives, Project Work, Business Ethics & Corporate Governance."
    ],
    careers: "Business Consultant, HR Manager, Brand Manager, Sales Director, Investment Banker."
  },
  "online-dba": {
    title: "Doctor of Business Administration (DBA)",
    level: "Doctorate",
    duration: "3 Years (6 Semesters)",
    description: "The online DBA program is a premium, research-oriented doctoral degree designed for senior business executives, consultants, and educators. The program emphasizes applied research to solve actual corporate and organizational leadership challenges.",
    eligibility: "Master's degree or MBA from a recognized institution with at least 5 years of corporate managerial experience.",
    syllabus: [
      "Year 1: Quantitative Research Methods, Qualitative Methodologies, Applied Business Theory, Literature Review.",
      "Year 2: Research Proposal Development, Academic Writing, Pilot Study, Research Colloquium.",
      "Year 3: Dissertation Research, Data Collection & Analysis, Final Dissertation Defense."
    ],
    careers: "Research Director, Chief Strategy Officer, Academic Professor, Senior Executive Consultant."
  },
  "distance-bba": {
    title: "Bachelor of Business Administration (BBA)",
    level: "Under Graduate",
    duration: "3 Years (6 Semesters)",
    description: "The BBA program is an ideal launchpad for students seeking a professional career in business management. The curriculum covers foundational elements of marketing, finance, HR, and business law, providing a strong base for corporate employment.",
    eligibility: "10+2 / Higher Secondary pass in any stream from a recognized educational board.",
    syllabus: [
      "Year 1: Business Communication, Microeconomics, Business Mathematics, Computer Applications.",
      "Year 2: Corporate Accounting, Business Statistics, Marketing Principles, Organizational Behavior.",
      "Year 3: Business Law, Entrepreneurship, Project Management, Elective Specializations."
    ],
    careers: "Management Trainee, Customer Relationship Officer, Sales Executive, Junior Analyst."
  },
  "online-mca": {
    title: "Master of Computer Applications (MCA)",
    level: "Post Graduate",
    duration: "2 Years (4 Semesters)",
    description: "The online MCA program is designed to develop professional skills in software design, application development, and database administration. Ideal for graduates looking to build a high-growth career in tech.",
    eligibility: "BCA/B.Sc. Computer Science or Graduate with Mathematics in 12th/Graduation from a recognized university.",
    syllabus: [
      "Semester 1: Advanced Software Engineering, Database Systems, Java Programming, Data Structures.",
      "Semester 2: Cloud Computing, Web Technologies, Artificial Intelligence, Mobile App Development.",
      "Semester 3: Machine Learning, Big Data Analytics, Cyber Security, Computer Networks.",
      "Semester 4: Advanced Electives, Major Industry Project, Seminar."
    ],
    careers: "Software Developer, Technical Architect, Database Administrator, System Analyst."
  },
  "online-bca": {
    title: "Bachelor of Computer Applications (BCA)",
    level: "Under Graduate",
    duration: "3 Years (6 Semesters)",
    description: "The BCA program provides solid training in software application development, programming languages, and web design. It equips students with the requisite knowledge to secure core developer and IT support positions.",
    eligibility: "10+2 / Higher Secondary pass in any stream (Mathematics preferred) from a recognized educational board.",
    syllabus: [
      "Year 1: Programming in C, Computer Fundamentals, Web Technology, Mathematics.",
      "Year 2: Object Oriented Programming in C++, Operating Systems, DBMS, Software Engineering.",
      "Year 3: Java Programming, Computer Graphics, Network Security, Project Work."
    ],
    careers: "Junior Programmer, Web Developer, Software Tester, Network Support Associate."
  }
};

export default function CourseDetailView({ slug: propSlug }) {
  const params = useParams();
  const router = useRouter();
  const slug = propSlug || params?.slug;

  const course = COURSE_DETAILS[slug] || COURSE_DETAILS["distance-mba"];

  return (
    <div className="bg-[#f8fafc] py-12 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb items={[
            { title: <Link href="/">Home</Link> },
            { title: <Link href="/courses">Courses</Link> },
            { title: course.title }
          ]} />
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.push("/courses")}
            className="w-fit flex items-center font-semibold rounded-lg h-9 text-slate-600 cursor-pointer"
          >
            Back to Courses
          </Button>
        </div>

        {/* Hero Card */}
        <Card className="bg-gradient-to-br from-[#1C3569] via-[#17305e] to-[#005382] text-white border-none rounded-3xl shadow-xl p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,193,7,0.12),transparent_40%)]" />
          <div className="relative z-10 space-y-4">
            <Tag color="#FFC107" className="text-black font-bold uppercase tracking-wider px-3 py-0.5 border-none rounded-full text-xs m-0">
              {course.level}
            </Tag>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold m-0 text-white leading-tight">
              {course.title}
            </h1>
            
            <div className="flex items-center gap-4 flex-wrap pt-1">
              <span className="text-slate-300 text-sm font-semibold flex items-center gap-1.5">
                <ClockCircleFilled className="text-[#FFC107]" /> Course Duration: {course.duration}
              </span>
              <span className="text-slate-300 text-sm font-semibold flex items-center gap-1.5">
                <BookOutlined className="text-[#FFC107]" /> Mode: 100% Online / Distance
              </span>
            </div>
          </div>
        </Card>

        {/* Content & Sidebar Grid */}
        <Row gutter={[32, 32]}>
          {/* Main Details */}
          <Col xs={24} lg={16} className="space-y-8">
            {/* Overview */}
            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6" title={<span className="text-lg font-bold text-slate-800"><BookOutlined className="mr-2 text-blue-600" />Course Overview</span>} bordered={false}>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base m-0">
                {course.description}
              </p>
            </Card>

            {/* Syllabus */}
            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6" title={<span className="text-lg font-bold text-slate-800"><ProfileOutlined className="mr-2 text-emerald-600" />Syllabus Outline</span>} bordered={false}>
              <div className="space-y-4">
                {course.syllabus.map((sem, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl">
                    <span className="font-bold text-slate-800 block mb-1 text-sm md:text-base">
                      {sem.split(":")[0]}
                    </span>
                    <p className="text-slate-500 text-xs md:text-sm m-0 leading-relaxed">
                      {sem.split(":")[1]}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Eligibility & Career */}
            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6" title={<span className="text-lg font-bold text-slate-800"><CompassOutlined className="mr-2 text-violet-600" />Eligibility & Careers</span>} bordered={false}>
              <Descriptions column={1} bordered={false} className="[&_.ant-descriptions-item]:pb-4">
                <Descriptions.Item label={<span className="font-bold text-slate-600"><CarryOutOutlined className="mr-2" />Eligibility Criteria</span>}>
                  <span className="text-slate-600 text-sm">{course.eligibility}</span>
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-bold text-slate-600"><DollarOutlined className="mr-2" />Career Opportunities</span>}>
                  <span className="text-slate-600 text-sm">{course.careers}</span>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          {/* Sidebar Inquiry Form */}
          <Col xs={24} lg={8}>
            <Card className="sticky top-6 rounded-2xl border border-slate-100 shadow-lg p-6 bg-white" title={<span className="text-base font-bold text-[#1C3569] m-0 block">Apply / Get Details</span>} bordered={false}>
              <Form layout="vertical" className="space-y-4" onSubmitCapture={(e) => e.preventDefault()}>
                <Form.Item label="Your Name" required className="m-0">
                  <Input placeholder="Enter your full name" className="h-10 rounded-lg border-slate-200" />
                </Form.Item>
                
                <Form.Item label="Mobile Number" required className="m-0">
                  <Input placeholder="Enter 10-digit number" className="h-10 rounded-lg border-slate-200" />
                </Form.Item>
                
                <Form.Item label="Desired University" className="m-0">
                  <Select placeholder="Optional: Choose university" className="h-10 rounded-lg border-slate-200" options={[
                    { value: "GGU", label: "Golden Gate University, USA" },
                    { value: "Subharti", label: "Subharti University" },
                    { value: "Mangalayatan", label: "Mangalayatan University" },
                    { value: "Rushford", label: "Rushford Business School" },
                  ]} />
                </Form.Item>

                <Form.Item label="Message" className="m-0">
                  <Input.TextArea rows={3} placeholder="Write your questions..." className="rounded-lg border-slate-200" />
                </Form.Item>

                <Button 
                  type="primary" 
                  htmlType="submit"
                  className="w-full bg-[#1C3569] hover:!bg-[#122449] border-none text-white font-bold h-11 rounded-xl cursor-pointer mt-4"
                >
                  Request Call Back
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
