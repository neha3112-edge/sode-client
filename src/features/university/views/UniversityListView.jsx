"use client";

import React, { useState } from "react";
import { Card, Tag, Input, Button, Row, Col, Space, Breadcrumb } from "antd";
import { SearchOutlined, CheckCircleFilled, StarFilled } from "@ant-design/icons";
import Link from "next/link";

const INITIAL_UNIVERSITIES = [
  {
    name: "Golden Gate University",
    slug: "golden-gate-university",
    location: "California, USA",
    type: "Global",
    approvals: ["WASC Accredited", "170+ Years Old"],
    rating: 4.8,
    reviews: 1240,
    logoBg: "#1C3569",
    featuredCourse: "Doctor of Business Administration (DBA)",
  },
  {
    name: "Subharti University",
    slug: "subharti-university",
    location: "Meerut, India",
    type: "State Private",
    approvals: ["UGC-DEB Approved", "NAAC A Grade"],
    rating: 4.5,
    reviews: 845,
    logoBg: "#E11D48",
    featuredCourse: "Distance MBA & BBA",
  },
  {
    name: "Mangalayatan University",
    slug: "mangalayatan-university",
    location: "Aligarh, India",
    type: "State Private",
    approvals: ["UGC-DEB Approved", "NAAC A+ Grade"],
    rating: 4.6,
    reviews: 620,
    logoBg: "#059669",
    featuredCourse: "Distance MCA & BCA",
  },
  {
    name: "Rushford Business School",
    slug: "rushford-business-school",
    location: "Geneva, Switzerland",
    type: "Global",
    approvals: ["EduQua Certified", "ACBSP Member"],
    rating: 4.7,
    reviews: 310,
    logoBg: "#4F46E5",
    featuredCourse: "Global MBA Programs",
  },
];

export default function UniversityListView({ initialUniversities }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const universities = initialUniversities || INITIAL_UNIVERSITIES;

  const filteredUniversities = universities.filter((uni) => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          uni.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || uni.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-[#f8fafc] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6" items={[
          { title: <Link href="/">Home</Link> },
          { title: "Universities" }
        ]} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1C3569] m-0">
            Partner Universities
          </h1>
          <p className="text-slate-500 mt-2 m-0 text-base">
            Compare and choose from UGC-DEB approved and top international accredited universities.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Input
            placeholder="Search universities by name or location..."
            prefix={<SearchOutlined className="text-slate-400" />}
            className="h-11 max-w-md rounded-xl border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex gap-2 flex-wrap">
            {["All", "Global", "State Private"].map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 h-9 font-semibold text-sm cursor-pointer transition-all ${
                  activeFilter === filter 
                    ? "bg-[#1C3569] text-white border-none shadow-sm hover:!bg-[#1C3569] hover:!text-white" 
                    : "border-slate-200 text-slate-600 hover:!border-slate-400 hover:!text-slate-800"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid List */}
        <Row gutter={[24, 24]}>
          {filteredUniversities.map((uni) => (
            <Col xs={24} sm={12} key={uni.slug}>
              <Card
                hoverable
                className="border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                styles={{ body: { padding: "24px", display: "flex", flexDirection: "column", flex: 1 } }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                    style={{ backgroundColor: uni.logoBg }}
                  >
                    {uni.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 m-0 leading-tight">
                      {uni.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-semibold mt-1 block">
                      {uni.location}
                    </span>
                  </div>
                </div>

                <div className="flex gap-1.5 flex-wrap mb-4">
                  {uni.approvals.map((app, i) => (
                    <Tag color="blue" key={i} className="font-semibold text-xs border-none rounded bg-blue-50 text-blue-700 px-2 py-0.5 m-0">
                      <CheckCircleFilled className="mr-1 text-[10px]" /> {app}
                    </Tag>
                  ))}
                </div>

                <div className="h-px bg-slate-100 my-4" />

                <div className="space-y-1 mb-6 flex-grow">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Featured Program</span>
                  <p className="text-sm font-semibold text-slate-700 m-0">
                    {uni.featuredCourse}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-1.5">
                    <StarFilled className="text-amber-500 text-sm" />
                    <span className="text-sm font-bold text-slate-700">{uni.rating}</span>
                    <span className="text-xs text-slate-400 font-medium">({uni.reviews})</span>
                  </div>

                  <Link href={`/universities/${uni.slug}`}>
                    <Button 
                      type="primary"
                      className="bg-[#1C3569] hover:!bg-[#122449] border-none font-semibold rounded-lg h-9 px-4 cursor-pointer"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {filteredUniversities.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm mt-8">
            <p className="text-slate-400 text-base font-medium">No universities found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
