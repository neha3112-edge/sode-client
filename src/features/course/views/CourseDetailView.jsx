"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Tag, Button, Row, Col, Descriptions, Breadcrumb, Spin } from "antd";
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
import { getCourseBySlug } from "@/services/api";
import FormWrapper from "@/components/forms/FormWrapper";

export default function CourseDetailView({ slug: propSlug, initialCourse }) {
  const params = useParams();
  const router = useRouter();
  const slug = propSlug || params?.slug;

  const [course, setCourse] = useState(initialCourse || null);
  const [loading, setLoading] = useState(!initialCourse);

  useEffect(() => {
    if (!initialCourse && slug) {
      setLoading(true);
      getCourseBySlug(slug)
        .then((data) => {
          setCourse(data);
        })
        .finally(() => setLoading(false));
    }
  }, [slug, initialCourse]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spin size="large" tip="Loading course details from server..." />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center p-8">
        <h2 className="text-2xl font-bold text-slate-800">Course Not Found</h2>
        <p className="text-slate-500">The requested course could not be retrieved from the database.</p>
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.push("/")}>
          Return to Home
        </Button>
      </div>
    );
  }

  const universityName = typeof course.university === "object" ? course.university?.name : (course.university || "Partner University");

  return (
    <div className="bg-[#f8fafc] py-12 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb items={[
            { title: <Link href="/">Home</Link> },
            { title: <Link href="/#courses">Courses</Link> },
            { title: course.title || "Course Details" }
          ]} />
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.push("/#courses")}
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
              {course.level || "Executive / Distance Degree"}
            </Tag>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold m-0 text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-amber-200 font-bold text-sm md:text-base m-0">
              🎓 Offered in Academic Partnership with {universityName}
            </p>
            
            <div className="flex items-center gap-4 flex-wrap pt-1">
              <span className="text-slate-300 text-sm font-semibold flex items-center gap-1.5">
                <ClockCircleFilled className="text-[#FFC107]" /> Course Duration: {course.duration || "2 Years"}
              </span>
              <span className="text-slate-300 text-sm font-semibold flex items-center gap-1.5">
                <BookOutlined className="text-[#FFC107]" /> Mode: 100% Online / Distance Learning
              </span>
            </div>
          </div>
        </Card>

        {/* Content & Sidebar Grid */}
        <Row gutter={[32, 32]}>
          {/* Main Details */}
          <Col xs={24} lg={16} className="space-y-8">
            {/* Overview */}
            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6" title={<span className="text-lg font-bold text-slate-800"><BookOutlined className="mr-2 text-blue-600" />Course Overview</span>} variant="borderless">
              <p className="text-slate-600 leading-relaxed text-sm md:text-base m-0">
                {course.description || "Comprehensive distance learning program engineered to build real-world leadership, analytical thinking, and strategic business capabilities."}
              </p>
            </Card>

            {/* Syllabus */}
            {Array.isArray(course.syllabus) && course.syllabus.length > 0 && (
              <Card className="rounded-2xl border border-slate-100 shadow-sm p-6" title={<span className="text-lg font-bold text-slate-800"><ProfileOutlined className="mr-2 text-emerald-600" />Syllabus &amp; Curriculum Outline</span>} variant="borderless">
                <div className="space-y-4">
                  {course.syllabus.map((sem, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl">
                      <span className="font-bold text-slate-800 block mb-1 text-sm md:text-base">
                        {sem.includes(":") ? sem.split(":")[0] : `Module ${idx + 1}`}
                      </span>
                      <p className="text-slate-500 text-xs md:text-sm m-0 leading-relaxed">
                        {sem.includes(":") ? sem.split(":")[1] : sem}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Eligibility & Career */}
            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6" title={<span className="text-lg font-bold text-slate-800"><CompassOutlined className="mr-2 text-violet-600" />Eligibility &amp; Career Opportunities</span>} variant="borderless">
              <Descriptions column={1} className="[&_.ant-descriptions-item]:pb-4">
                <Descriptions.Item label={<span className="font-bold text-slate-600"><CarryOutOutlined className="mr-2" />Eligibility Criteria</span>}>
                  <span className="text-slate-600 text-sm">{course.eligibility || "Bachelor's degree or equivalent from a recognized university."}</span>
                </Descriptions.Item>
                <Descriptions.Item label={<span className="font-bold text-slate-600"><DollarOutlined className="mr-2" />Career Prospects</span>}>
                  <span className="text-slate-600 text-sm">{course.careers || "Senior Executive Roles, Management Consultant, Business Analyst, Strategy Director."}</span>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          {/* Sidebar Inquiry FormWrapper */}
          <Col xs={24} lg={8}>
            <div className="sticky top-6 rounded-2xl shadow-lg bg-white overflow-hidden border border-slate-100 p-2">
              <FormWrapper
                title="Apply / Book 1:1 Counselling"
                subtitle={`Get expert guidance for ${course.title}`}
                defaultCourse={course.title}
                formNameOverride={`CourseDetailPage_${course.slug}`}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
