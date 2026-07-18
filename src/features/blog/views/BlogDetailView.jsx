"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Tag, Button, Row, Col, Breadcrumb, Input, Form, Space } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, BookOutlined } from "@ant-design/icons";
import Link from "next/link";

const BLOG_DETAILS = {
  "understanding-ugc-deb-approvals": {
    title: "Understanding UGC-DEB Approvals for Distance Degrees",
    category: "Accreditation",
    date: "June 15, 2026",
    content: `When exploring online and distance education options in India, the term **UGC-DEB approved** is the single most critical factor to verify. 

UGC (University Grants Commission) is the apex body overseeing higher education, and the DEB (Distance Education Bureau) is its dedicated wing regulating distance and online learning.

### Why is UGC-DEB Approval Important?

1. **Government Recognition:** Degree certificates from unapproved universities are not valid for government job applications or public sector exams.
2. **Equivalence:** A distance degree is only considered equivalent to a regular day degree if it has UGC-DEB authorization.
3. **Foreign Evaluation:** If you plan to work or study abroad, agencies like WES evaluate degrees based on the UGC approval status of the granting university.

### How to Verify a University's Status

- Visit the official UGC-DEB website portal.
- Check the list of recognized institutions for the specific academic year.
- Note that approvals are granted on a year-to-year or program-to-program basis, so ensure your specific course (e.g. MBA or MCA) is listed for the current session.
`
  },
  "is-online-dba-worth-it": {
    title: "Is an Online DBA Worth It for Senior Professionals?",
    category: "Career Guidance",
    date: "May 28, 2026",
    content: `The Doctor of Business Administration (DBA) is a professional doctorate designed for corporate leaders, consultants, and entrepreneurs. Unlike a traditional PhD, which is highly academic and focuses on creating new theories, a DBA focuses on applying existing research and methods directly to complex business problems.

### Key Benefits of a DBA:

- **Executive Branding:** Using the "Doctor" title is highly prestigious in corporate boardrooms and consulting firms.
- **Applied Insights:** Apply advanced methodologies directly to your company's operational problems.
- **Career Growth:** Many senior executive roles prefer professionals with research-driven doctoral qualifications.

For senior managers who cannot afford to leave their full-time corporate roles, a 100% online DBA program offers the perfect balance.
`
  },
  "balancing-distance-studies-and-work": {
    title: "Tips for Balancing Distance Studies and a Full-Time Job",
    category: "Student Tips",
    date: "April 10, 2026",
    content: `Pursuing a degree while maintaining a full-time job is a highly rewarding yet challenging endeavor. 

Here are top time-management tips to stay on track:

### 1. Set a Study Routine
Don't wait for free time; actively schedule 1-2 hours of study time daily, or allocate 5-6 hours over the weekend. Consistency is more important than long study blocks.

### 2. Create a Dedicated Workspace
Have a quiet, organized space in your home free from distractions. This trains your brain to focus as soon as you sit down.

### 3. Leverage Digital Tools
Use mobile apps to read study material or watch lectures during your daily commute. Use digital calendars to track exam dates and project submissions.
`
  }
};

export default function BlogDetailView() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const blog = BLOG_DETAILS[slug] || BLOG_DETAILS["understanding-ugc-deb-approvals"];

  return (
    <div className="bg-[#f8fafc] py-12 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Breadcrumb items={[
            { title: <Link href="/">Home</Link> },
            { title: <Link href="/blog">Blog</Link> },
            { title: blog.title }
          ]} />
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.push("/blog")}
            className="w-fit flex items-center font-semibold rounded-lg h-9 text-slate-600 cursor-pointer"
          >
            Back to Blog
          </Button>
        </div>

        {/* Layout Grid */}
        <Row gutter={[32, 32]}>
          {/* Article Content */}
          <Col xs={24} lg={16}>
            <Card className="rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8" bordered={false}>
              <div className="flex items-center gap-3 mb-4">
                <Tag color="orange" className="font-semibold text-xs border-none rounded px-2.5 py-0.5 m-0">
                  {blog.category}
                </Tag>
                <span className="text-slate-400 text-xs font-semibold flex items-center gap-1">
                  <CalendarOutlined /> {blog.date}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 m-0 mb-6 leading-tight">
                {blog.title}
              </h1>

              <div className="h-px bg-slate-100 my-6" />

              {/* Text content formatted as paragraphs */}
              <div className="prose max-w-none text-slate-600 text-sm md:text-base leading-relaxed space-y-6">
                {blog.content.split("\n\n").map((para, i) => {
                  if (para.startsWith("###")) {
                    return <h3 key={i} className="text-xl font-bold text-slate-800 mt-6 mb-2">{para.replace("### ", "")}</h3>;
                  }
                  if (para.startsWith("-")) {
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-2">
                        {para.split("\n").map((li, j) => (
                          <li key={j}>{li.replace("- ", "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i} className="m-0">{para}</p>;
                })}
              </div>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            <Card className="sticky top-6 rounded-2xl border border-slate-100 shadow-lg p-6 bg-white" title={<span className="text-base font-bold text-[#1C3569] m-0 block">Get Career Counseling</span>} bordered={false}>
              <p className="text-xs text-slate-400 m-0 mb-4 leading-normal">Our academic counselors are available to answer your questions and help you choose the right course.</p>
              
              <Form layout="vertical" className="space-y-4" onSubmitCapture={(e) => e.preventDefault()}>
                <Form.Item label="Full Name" required className="m-0">
                  <Input placeholder="Enter your name" className="h-10 rounded-lg border-slate-200" />
                </Form.Item>
                
                <Form.Item label="Mobile Number" required className="m-0">
                  <Input placeholder="Enter 10-digit number" className="h-10 rounded-lg border-slate-200" />
                </Form.Item>

                <Button 
                  type="primary" 
                  htmlType="submit"
                  className="w-full bg-[#1C3569] hover:!bg-[#122449] border-none text-white font-bold h-11 rounded-xl cursor-pointer mt-4"
                >
                  Request Callback
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
