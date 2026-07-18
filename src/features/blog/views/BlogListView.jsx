"use client";

import React from "react";
import { Card, Tag, Row, Col, Breadcrumb, Button } from "antd";
import { CalendarOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";

const INITIAL_BLOGS = [
  {
    title: "Understanding UGC-DEB Approvals for Distance Degrees",
    slug: "understanding-ugc-deb-approvals",
    category: "Accreditation",
    date: "June 15, 2026",
    excerpt: "Learn why UGC-DEB approvals are critical when choosing a distance MBA or MCA degree in India, and how to verify university statuses.",
  },
  {
    title: "Is an Online DBA Worth It for Senior Professionals?",
    slug: "is-online-dba-worth-it",
    category: "Career Guidance",
    date: "May 28, 2026",
    excerpt: "Explore the value of a Doctor of Business Administration (DBA) degree, salary increases, and how it differs from a traditional academic PhD.",
  },
  {
    title: "Tips for Balancing Distance Studies and a Full-Time Job",
    slug: "balancing-distance-studies-and-work",
    category: "Student Tips",
    date: "April 10, 2026",
    excerpt: "A practical guide to time management, setting study hours, and leveraging online resources to successfully complete your degree while working.",
  },
];

export default function BlogListView({ initialBlogs }) {
  const blogs = initialBlogs || INITIAL_BLOGS;

  return (
    <div className="bg-[#f8fafc] py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6" items={[
          { title: <Link href="/">Home</Link> },
          { title: "Blogs" }
        ]} />

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1C3569] m-0">
            Education Blog & News
          </h1>
          <p className="text-slate-500 mt-2 m-0 text-base">
            Expert academic counseling, career advice, and updates on online and distance education.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <Row gutter={[24, 24]}>
          {blogs.map((blog) => (
            <Col xs={24} sm={12} md={8} key={blog.slug}>
              <Card
                hoverable
                className="border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                styles={{ body: { padding: "24px", display: "flex", flexDirection: "column", flex: 1 } }}
              >
                <div className="flex justify-between items-center mb-3">
                  <Tag color="orange" className="font-semibold text-xs border-none rounded px-2.5 py-0.5 m-0">
                    {blog.category}
                  </Tag>
                  <span className="text-slate-400 text-xs font-semibold flex items-center gap-1">
                    <CalendarOutlined /> {blog.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-800 m-0 mb-2 leading-snug hover:text-blue-600">
                  {blog.title}
                </h3>
                
                <p className="text-slate-500 text-xs leading-relaxed mb-6 flex-grow">
                  {blog.excerpt}
                </p>

                <Link href={`/blog/${blog.slug}`} className="mt-auto block">
                  <Button 
                    type="link" 
                    className="text-[#1C3569] font-bold p-0 flex items-center gap-1 hover:text-blue-600 cursor-pointer"
                  >
                    Read Article <ArrowRightOutlined className="text-xs" />
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
