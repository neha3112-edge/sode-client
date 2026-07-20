"use client";

import React, { useState } from "react";
import { Card, Tag, Input, Button, Row, Col, Space, Breadcrumb } from "antd";
import { SearchOutlined, BookOutlined, ClockCircleFilled } from "@ant-design/icons";
import Link from "next/link";

import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

const INITIAL_COURSES = [
  {
    title: "Master of Business Administration (MBA)",
    slug: "distance-mba",
    level: "Post Graduate",
    duration: "2 Years",
    category: "pg",
    description: "Highly sought after dynamic management degree with dual specializations in Finance, Marketing, HR, etc.",
    jobs: ["Product Manager", "Consultant", "HR Executive"],
  },
  {
    title: "Doctor of Business Administration (DBA)",
    slug: "online-dba",
    level: "Doctorate",
    duration: "3 Years",
    category: "doctorate",
    description: "International doctoral degree for senior executives focusing on applied corporate research.",
    jobs: ["Research Director", "Chief Strategy Officer", "Academician"],
  },
  {
    title: "Bachelor of Business Administration (BBA)",
    slug: "distance-bba",
    level: "Under Graduate",
    duration: "3 Years",
    category: "ug",
    description: "Foundational business administration degree offering knowledge of core corporate operations.",
    jobs: ["Management Trainee", "Business Analyst", "Sales Manager"],
  },
  {
    title: "Master of Computer Applications (MCA)",
    slug: "online-mca",
    level: "Post Graduate",
    duration: "2 Years",
    category: "pg",
    description: "Specialized computer applications and software engineering degree designed for IT professionals.",
    jobs: ["Software Engineer", "Systems Analyst", "IT Lead"],
  },
  {
    title: "Bachelor of Computer Applications (BCA)",
    slug: "online-bca",
    level: "Under Graduate",
    duration: "3 Years",
    category: "ug",
    description: "Comprehensive software development and applications base degree with practical coding curriculum.",
    jobs: ["Web Developer", "Programmer Analyst", "Support Engineer"],
  },
];

export default function CourseListView({ initialCourses }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const courses = Array.isArray(initialCourses) && initialCourses.length > 0 ? initialCourses : INITIAL_COURSES;

  const filteredCourses = courses.filter((course) => {
    const titleText = (course?.title || "").toLowerCase();
    const descText = (course?.description || "").toLowerCase();
    const query = searchTerm.toLowerCase();
    const matchesSearch = titleText.includes(query) || descText.includes(query);

    const cat = course?.category;
    const catSlug = typeof cat === "object" ? (cat?.slug || cat?.name || "").toLowerCase() : String(cat || "").toLowerCase();
    const matchesCategory =
      activeCategory === "all" ||
      catSlug === activeCategory ||
      catSlug.includes(activeCategory) ||
      activeCategory.includes(catSlug);

    return matchesSearch && matchesCategory;
  });

  const { data: rawCategoryOptions = [] } = useGetDynamicOptionsQuery({
    entity: "category",
    endPoint: "options",
  });

  const categoryButtons = [
    { label: "All Levels", value: "all" },
    ...(Array.isArray(rawCategoryOptions) && rawCategoryOptions.length > 0
      ? rawCategoryOptions.map((c) => ({
        label: c.name || c.label,
        value: (c.slug || c.name || "").toLowerCase(),
      }))
      : [
        { label: "UG (Undergrad)", value: "ug" },
        { label: "PG (Postgrad)", value: "pg" },
        { label: "Doctorate", value: "doctorate" },
        { label: "Executive", value: "executive" },
        { label: "Certification", value: "certification" },
      ]),
  ];

  return (
    <div className="bg-[#f8fafc] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6" items={[
          { title: <Link href="/">Home</Link> },
          { title: "Courses" }
        ]} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1C3569] m-0">
            Distance & Online Courses
          </h1>
          <p className="text-slate-500 mt-2 m-0 text-base">
            Explore UGC recognized, career-oriented undergraduate, postgraduate, and executive degrees.
          </p>
        </div>

        {/* Search & Categories */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Input
            placeholder="Search courses by title or keyword..."
            prefix={<SearchOutlined className="text-slate-400" />}
            className="h-11 max-w-md rounded-xl border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex gap-2 flex-wrap">
            {categoryButtons.map((cat) => (
              <Button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`rounded-full px-5 h-9 font-semibold text-sm cursor-pointer transition-all ${activeCategory === cat.value
                    ? "bg-[#1C3569] text-white border-none shadow-sm hover:!bg-[#1C3569] hover:!text-white"
                    : "border-slate-200 text-slate-600 hover:!border-slate-400 hover:!text-slate-800"
                  }`}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <Row gutter={[24, 24]}>
          {filteredCourses.map((course) => (
            <Col xs={24} sm={12} key={course.slug}>
              <Card
                hoverable
                className="border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                styles={{ body: { padding: "24px", display: "flex", flexDirection: "column", flex: 1 } }}
              >
                <div className="flex justify-between items-start mb-3">
                  <Tag color="blue" className="font-semibold text-xs border-none rounded bg-blue-50 text-blue-700 px-2 py-0.5 m-0">
                    {course.level}
                  </Tag>
                  <span className="text-slate-400 text-xs font-bold flex items-center gap-1">
                    <ClockCircleFilled /> {typeof course?.duration === "object" ? course?.duration?.title : course?.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 m-0 mb-2 leading-snug">
                  {course.title}
                </h3>

                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">
                  {course.description}
                </p>

                <div className="h-px bg-slate-100 my-4" />

                <div className="mb-6">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Target Career Roles</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {(course.jobs || ["Management Lead", "Career Expert"]).map((job, idx) => (
                      <Tag key={idx} className="bg-slate-50 text-slate-600 border-slate-200 text-xs font-semibold rounded px-2 m-0">
                        {job}
                      </Tag>
                    ))}
                  </div>
                </div>

                <Link href={`/courses/${course.slug}`} className="mt-auto block">
                  <Button
                    type="primary"
                    className="w-full bg-[#1C3569] hover:!bg-[#122449] border-none font-semibold rounded-xl h-10 cursor-pointer"
                  >
                    View Course Details
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm mt-8">
            <p className="text-slate-400 text-base font-medium">No courses found matching your search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
