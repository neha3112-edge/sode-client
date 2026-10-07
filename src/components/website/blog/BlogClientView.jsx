"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Form, Input, message, Table } from "antd";
import { Container } from "@/components/common/Container";
import SafeHtmlRenderer from "@/components/website/SafeHtmlRenderer";
import FormWrapper from "@/components/forms/FormWrapper";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { getAssetPath } from "@/lib/utils";
import { CalendarIcon, Check, ChevronDown, ChevronRight, ChevronUp, Minus, Plus, ThumbsDown, ThumbsUp, User } from "lucide-react";

// 📚 Structured Sections (Directly drives the page content & Table of Contents)
const DUMMY_BLOG_SECTIONS = [
  {
    id: "what-is-online-mba",
    title: "What Is an Online MBA?",
    paragraphs: [
      "An Online MBA is a postgraduate management degree delivered primarily through online learning platforms. Students generally access lectures, study materials, assignments and other learning resources digitally. Depending on the university, students may also have access to live classes, recorded lectures, discussion forums, academic support and online examinations or other assessment methods. An Online MBA can allow learners to continue their professional or personal commitments while pursuing higher education.",
    ],
  },
  {
    id: "who-can-pursue",
    title: "Who Can Pursue an Online MBA?",
    intro: "An Online MBA may be considered by:",
    checklist: [
      "Working professionals looking to develop management skills",
      "Graduates planning to build a career in business management",
      "Professionals seeking career advancement",
      "Entrepreneurs looking to strengthen business knowledge",
      "Learners interested in management specializations",
      "Professionals looking for flexible postgraduate education",
    ],
    outro: "The exact eligibility requirements depend on the university and programme.",
  },
  {
    id: "eligibility",
    title: "Online MBA Eligibility",
    intro:
      "In general, applicants are expected to have a bachelor's degree from a recognized institution. Some universities may have additional requirements relating to:",
    checklist: [
      "Minimum qualifying marks",
      "Work experience",
      "Entrance examinations",
      "Specific undergraduate qualifications",
      "English-language requirements",
      "Other university-specific conditions",
    ],
    note: "Important: Eligibility should always be verified from the university's current official admission information before applying.",
  },
  {
    id: "duration",
    title: "Online MBA Duration",
    paragraphs: [
      "The duration of an Online MBA generally depends on the university and programme structure. Many programmes are structured around approximately 2 years, while the maximum permitted completion period may be longer depending on the university's academic regulations. Students should check the official programme structure before admission because duration and academic requirements can differ between universities.",
    ],
  },
  {
    id: "fees",
    title: "Online MBA Fees",
    paragraphs: [
      "Online MBA fees vary significantly depending on the university, programme structure and specialization. When comparing fees, learners should look beyond the headline tuition fee and check whether the total cost includes:",
    ],
    checklist: [
      "Tuition fees",
      "Examination fees",
      "Registration fees",
      "Learning resources",
      "Technology/platform charges",
      "Other applicable charges",
    ],
    table: {
      type: "fee",
      headers: ["Fee Component", "Example Amount"],
      rows: [
        { name: "Registration Fee", amount: "₹1,000" },
        { name: "Tuition Fee", amount: "₹75,000" },
        { name: "Examination Fee", amount: "₹5,000" },
        { name: "Learning Resources", amount: "Included" },
        { name: "Estimated Total", amount: "₹81,000", isTotal: true },
      ],
      note: "Demo Note: The figures above are sample values for layout testing only and should not be presented as actual university fees.",
    },
  },
  {
    id: "specializations",
    title: "Popular Online MBA Specializations",
    intro:
      "Students can choose a specialization based on their career interests and professional goals. Some commonly available areas include:",
    columnsList: [
      [
        "Finance",
        "Marketing",
        "Human Resource Management",
        "Operations Management",
        "Business Analytics",
      ],
      [
        "International Business",
        "Information Technology",
        "Supply Chain Management",
        "Project Management",
        "Healthcare Management",
      ],
    ],
  },
  {
    id: "benefits",
    title: "Benefits of an Online MBA",
    intro:
      "An Online MBA can offer several advantages for learners who need flexibility.",
    numberedList: [
      {
        title: "1. Flexible Learning",
        desc: "Students can access learning materials through online platforms and manage their studies around their schedules.",
      },
      {
        title: "2. Suitable for Working Professionals",
        desc: "Professionals may be able to continue working while pursuing their postgraduate education.",
      },
      {
        title: "3. Multiple Specializations",
        desc: "Depending on the university, learners can choose a specialization aligned with their career interests.",
      },
      {
        title: "4. Digital Learning Environment",
        desc: "Online programmes typically use digital platforms for learning materials, classes, assignments and academic communication.",
      },
      {
        title: "5. Career Development",
        desc: "Management education can help learners develop knowledge in areas such as leadership, finance, marketing, operations and business strategy.",
      },
    ],
  },
  {
    id: "compare-factors",
    title: "Compare Before Choosing an Online MBA",
    intro:
      "Before selecting an Online MBA programme, compare the following factors:",
    twoColBullets: [
      [
        "University recognition and entitlement",
        "Programme eligibility",
        "Duration",
        "Total fees",
        "Curriculum",
        "Specializations",
      ],
      [
        "Learning platform",
        "Examination process",
        "Student support",
        "Admission process",
        "Career-related support",
        "University policies",
      ],
    ],
    outro:
      "Learners should verify current programme information through the university's official sources before making an admission decision.",
  },
  {
    id: "specialization-poll",
    title: "Which Online MBA Specialization Interests You Most?",
    poll: {
      question: "Which Online MBA specialization are you most interested in?",
      options: [
        "Finance",
        "Human Resources",
        "Operations",
        "Marketing",
        "Business Analytics",
        "International Business",
      ],
      footnote:
        "*Thanks for sharing your preference. Your selection can help us understand which management areas interest you most.",
    },
  },
  {
    id: "online-mba-comparison",
    title: "Online MBA Comparison Table",
    table: {
      type: "comparison",
      headers: ["Factor", "What to Check"],
      rows: [
        { factor: "Eligibility", check: "Bachelor's degree and university-specific requirements" },
        { factor: "Duration", check: "Programme duration and maximum completion period" },
        { factor: "Fees", check: "Total programme cost and additional charges" },
        { factor: "Specialization", check: "Available management specialization" },
        { factor: "Learning Mode", check: "Live classes, recorded content and study materials" },
        { factor: "Examination", check: "Examination format and assessment process" },
        { factor: "Recognition", check: "Current university/programme status" },
        { factor: "Student Support", check: "Academic and technical assistance" },
        { factor: "Admission", check: "Application and document requirements" },
      ],
    },
  },
  {
    id: "how-to-choose",
    title: "How to Choose the Right Online MBA?",
    paragraphs: [
      "Choosing an Online MBA should involve more than comparing universities based only on fees. Start by identifying your career objective and preferred specialization. Then compare eligible programmes based on recognition, curriculum, duration, total cost, learning format and academic support. You should also verify the latest programme information directly through the university's official website before submitting an application.",
    ],
    ctaButton: {
      text: "Compare Universities",
      href: "/courses",
    },
  },
  {
    id: "admission-process",
    title: "Online MBA Admission Process",
    orderedSteps: [
      "Select a suitable programme.",
      "Check eligibility requirements.",
      "Review programme fees and structure.",
      "Complete the application form.",
      "Submit the required documents.",
      "Complete the applicable admission formalities.",
      "Receive confirmation from the university.",
      "Begin the programme according to the university's academic schedule.",
    ],
    importantNotice: {
      title: "Important",
      desc: "Degree4U / Distance Education School provides information and counselling assistance. Final admission, eligibility, registration, academic decisions, examinations and degree-related matters remain subject to the respective university's rules and official processes.",
    },
  },
];

const DUMMY_FAQS = [
  {
    question: "Is Online BA from Sikkim Manipal University valid and recognized?",
    answer:
      "Yes. The Online BA is valid when pursued under a programme and academic session entitled by the UGC for online delivery at Sikkim Manipal University.",
  },
  {
    question: "What is the eligibility criteria for Online BA at Sikkim Manipal University?",
    answer:
      "Candidates should have passed 10+2 or equivalent in any stream from a recognized board/institution.",
  },
  {
    question: "What learning facilities are provided to Online BA students at Sikkim Manipal University?",
    answer:
      "Students are provided with a dedicated learning management system (LMS), recorded video lectures, e-learning content, digital library access, and live faculty interaction.",
  },
  {
    question: "What career opportunities are available after completing an Online BA from SMU?",
    answer:
      "Graduates can explore opportunities across media, public relations, content development, administration, corporate communications, or prepare for government exams and higher studies.",
  },
  {
    question: "Does Sikkim Manipal University provide placement assistance after completing an Online BA?",
    answer:
      "Yes, Sikkim Manipal University provides placement assistance, career development sessions, and connects students with verified corporate job openings.",
  },
];

function formatBlogDate(dateStr) {
  if (!dateStr) return "September 4, 2026";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "September 4, 2026";
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "September 4, 2026";
  }
}

export default function BlogClientView({
  initialData,
  initialPopularBlogs = [],
  slug: propSlug,
}) {
  const [tocOpen, setTocOpen] = useState(true);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const [selectedPoll, setSelectedPoll] = useState("Business Analytics");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [articleHelpful, setArticleHelpful] = useState("yes");
  const [commentsList, setCommentsList] = useState([
    {
      id: 1,
      name: "Pradeep Kumar",
      text: "Yes you Are Right, MBA Scope Is Increasing Gradually. Pls post a Blog On MCA Career Scope",
    },
    {
      id: 2,
      name: "Maheshwar Singh",
      text: "Yes you Are Right, MBA Scope Is Increasing Gradually. Pls post a Blog On MCA Career Scope",
    },
    {
      id: 3,
      name: "Aamir Khan",
      text: "Pls post a Blog On BCA Career Opportunities",
    },
  ]);

  // ── Ant Design Comment Form State & Handler ──
  const [commentForm] = Form.useForm();
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const handleCommentSubmit = async (values) => {
    setCommentSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      if (values?.name && values?.comment) {
        setCommentsList((prev) => [
          {
            id: Date.now(),
            name: values.name,
            text: values.comment,
          },
          ...prev,
        ]);
      }
      message.success("Thank you! Your comment has been submitted successfully.");
      commentForm.resetFields();
    } catch {
      message.error("Failed to submit comment. Please try again.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  // ── Ant Design Table Memoized Columns Configuration (Exact CoursePage Styling) ──
  const feeTableColumns = useMemo(
    () => [
      {
        title: "Fee Component",
        dataIndex: "name",
        key: "name",
        width: "50%",
        align: "center",
        onCell: (record) => ({
          className: record?.isTotal
            ? "font-bold text-gray-900 bg-slate-50 text-center"
            : "font-semibold text-gray-900 text-center",
        }),
      },
      {
        title: "Example Amount",
        dataIndex: "amount",
        key: "amount",
        width: "50%",
        align: "center",
        onCell: (record) => ({
          className: record?.isTotal
            ? "font-bold text-[#0F2A4A] bg-slate-50 text-center"
            : "font-medium text-gray-800 text-center",
        }),
      },
    ],
    []
  );

  const comparisonTableColumns = useMemo(
    () => [
      {
        title: "Factor",
        dataIndex: "factor",
        key: "factor",
        width: "35%",
        align: "center",
        onCell: () => ({
          className: "font-bold text-gray-900 text-center",
        }),
      },
      {
        title: "What to Check",
        dataIndex: "check",
        key: "check",
        width: "65%",
        align: "center",
        onCell: () => ({
          className: "text-gray-700 font-normal text-center",
        }),
      },
    ],
    []
  );

  const blog = initialData?.blogId || initialData || {};
  const pageTitle = blog?.title || blog?.headline || "";
  const showBreadcrumbs = blog?.showBreadcrumbs !== false;

  // Set up Breadcrumbs dynamically
  useBreadcrumb(
    showBreadcrumbs && pageTitle
      ? {
        items: [
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: pageTitle },
        ],
        backButton: {
          label: "Blogs",
          href: "/blogs",
        },
      }
      : { hidden: true },
    [pageTitle, showBreadcrumbs]
  );

  // Execute custom JavaScript from CMS if present
  useEffect(() => {
    if (!blog?.js) return;
    try {
      const scriptFn = new Function(blog.js);
      scriptFn();
    } catch (err) {
      console.error("[Blog] Error executing custom JS:", err);
    }
  }, [blog?.js]);

  // 📑 Dynamic Table of Contents (Directly generated from the sections rendered on the page)
  const finalHeadings = useMemo(() => {
    const list = DUMMY_BLOG_SECTIONS.map((sec) => ({
      id: sec.id,
      text: sec.title,
      level: 2,
    }));
    list.push({
      id: "faqs",
      text: "Frequently Asked Questions (FAQs)",
      level: 2,
    });
    return list;
  }, []);

  const allFaqs = useMemo(() => {
    if (Array.isArray(blog?.faqs) && blog.faqs.length > 0) return blog.faqs;
    if (Array.isArray(initialData?.faqs) && initialData.faqs.length > 0) return initialData.faqs;
    return DUMMY_FAQS;
  }, [blog?.faqs, initialData?.faqs]);

  // 🏷️ Display Tags (from blog or fallback matching reference design)
  const displayTags = useMemo(() => {
    if (Array.isArray(blog?.tags) && blog.tags.length > 0) {
      return blog.tags.join(" | ");
    }
    if (typeof blog?.tags === "string" && blog.tags.trim()) {
      return blog.tags.split(",").map((t) => t.trim()).join(" | ");
    }
    return "Online MBA | Online Education | MBA Courses | Online Degree | Management Courses | Higher Education";
  }, [blog?.tags]);

  // Scroll spy to highlight active heading in TOC like course nav
  useEffect(() => {
    if (!finalHeadings || finalHeadings.length === 0) return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      let cur = "";
      for (const h of finalHeadings) {
        const el = document.getElementById(h.id);
        if (el && el.offsetTop <= scrollPos) {
          cur = h.id;
        }
      }
      if (cur) setActiveHeadingId(cur);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [finalHeadings]);

  if (!blog || (!blog.content && !blog.title)) {
    return null;
  }

  const rawImage =
    blog.coverImage ||
    blog.featuredImage ||
    blog.bannerImage ||
    blog.hero?.bannerImage;
  const blogImageUrl = rawImage ? getAssetPath(rawImage) : null;

  const formattedDate = formatBlogDate(blog.publishedAt || blog.createdAt);
  const authorName =
    blog.author?.fullname || blog.author?.name || "Amritanjali Singh";

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 pb-16">
      {/* ── Ant Design Table CSS (Strictly matching CoursePageClientView.jsx) ── */}
      <style>{`
        /* Ant Design Table Mobile-Fit & Crystal Clear Header Typography */
        .course-antd-table {
          width: 100% !important;
        }
        .course-antd-table .ant-table-wrapper {
          width: 100% !important;
        }
        .course-antd-table table {
          table-layout: fixed !important;
          width: 100% !important;
        }
        .course-antd-table .ant-table {
          overflow-x: visible !important;
          background: #ffffff !important;
        }
        .course-antd-table .ant-table-container {
          border-radius: 8px !important;
          overflow: hidden !important;
        }
        .course-antd-table .ant-table-content {
          overflow-x: visible !important;
        }
        .course-antd-table .ant-table-thead > tr > th,
        .course-antd-table .ant-table-thead > tr > th.ant-table-cell,
        .course-antd-table .ant-table-thead > tr > th *,
        .course-antd-table .ant-table-thead th .ant-table-cell-content {
          background-color: #0C2B4E !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 11px !important;
          line-height: 1.35 !important;
          letter-spacing: 0.025em !important;
          font-family: inherit !important;
          text-shadow: none !important;
          opacity: 1 !important;
        }
        .course-antd-table .ant-table-thead > tr > th {
          padding: 8px 8px !important;
          white-space: normal !important;
          word-break: break-word !important;
          border-bottom: none !important;
          border-right: 1px solid rgba(255, 255, 255, 0.15) !important;
        }
        @media (min-width: 640px) {
          .course-antd-table .ant-table-thead > tr > th,
          .course-antd-table .ant-table-thead > tr > th.ant-table-cell,
          .course-antd-table .ant-table-thead > tr > th *,
          .course-antd-table .ant-table-thead th .ant-table-cell-content {
            font-size: 13px !important;
          }
          .course-antd-table .ant-table-thead > tr > th {
            padding: 10px 14px !important;
          }
        }
        .course-antd-table .ant-table-thead > tr > th:last-child {
          border-right: none !important;
        }
        .course-antd-table .ant-table-thead > tr > th::before {
          display: none !important;
        }
        .course-antd-table .ant-table-tbody > tr > td {
          padding: 6px 7px !important;
          font-size: 10.5px !important;
          white-space: normal !important;
          word-break: break-word !important;
          vertical-align: middle !important;
          border-bottom: 1px solid #e2e8f0 !important;
          border-right: 1px solid #f1f5f9 !important;
        }
        @media (min-width: 640px) {
          .course-antd-table .ant-table-tbody > tr > td {
            padding: 8px 14px !important;
            font-size: 12.5px !important;
          }
        }
        .course-antd-table .ant-table-tbody > tr > td:last-child {
          border-right: none !important;
        }
        .course-antd-table .ant-table-tbody > tr:hover > td {
          background-color: #f8fafc !important;
        }
        .course-antd-table-alt .ant-table-thead > tr > th,
        .course-antd-table-alt .ant-table-thead > tr > th.ant-table-cell,
        .course-antd-table-alt .ant-table-thead > tr > th * {
          background-color: #0C2B4E !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          font-weight: 700 !important;
        }
      `}</style>

      <Container className="pt-6">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/90 shadow-xs p-6">
          <h1 className="text-2xl sm:text-3xl text-gray-900 font-bold mb-3">
            {pageTitle}
          </h1>
          {/* ✍️ Byline & Meta Bar (Written by & Published) */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs sm:text-[14px] text-slate-600 mb-2">
            <div className="flex items-center gap-1">
              <User className="size-3.5" />
              <span className="font-normal text-xs text-slate-600">{authorName}</span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarIcon className="size-3.5" />
              <span className="font-normal text-xs text-slate-600">{formattedDate}</span>
            </div>
          </div>
          {/* 🖼️ Featured Cover Image Banner */}
          {blogImageUrl && (
            <div className="relative w-full h-52 sm:h-64 md:h-72 lg:h-80 rounded overflow-hidden mb-6">
              <Image
                src={blogImageUrl}
                alt={pageTitle}
                fill
                priority
                unoptimized
                className="object-cover"
              />
            </div>
          )}
          {/* 📄 Content Section 1 (Introduction & Opening Paragraphs) */}
          <p>Welcome to the world of online learning, where education meets flexibility and accessibility. In today’s fast-paced life, acquiring knowledge and upgrading skills has become more convenient than ever before. With the rise of digital platforms, accessing quality education is just a click away. Whether you are a working professional looking to enhance your career prospects or a student seeking to pursue higher education, online learning has opened up a world of opportunities.</p>

          {/* 📑 Table of Contents (Dynamically mapped to the sections below) */}
          {finalHeadings.length > 0 && (
            <div className="my-6 sm:my-8 rounded-2xl bg-white border border-gray-200 p-4 shadow-2xs w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-xl font-bold text-[#0D3B66] m-0">
                  Table of Contents
                </h2>
                <button
                  type="button"
                  onClick={() => setTocOpen(!tocOpen)}
                  className="text-[#0D3B66] hover:text-blue-700 p-1 rounded-md transition-colors cursor-pointer"
                  aria-label="Toggle Table of Contents"
                >
                  {tocOpen ? (
                    <ChevronUp size={20} strokeWidth={2.4} />
                  ) : (
                    <ChevronDown size={20} strokeWidth={2.4} />
                  )}
                </button>
              </div>

              {tocOpen && (
                <ul className="space-y-2.5 text-sm sm:text-[14.5px] font-medium list-none p-0 m-0">
                  {finalHeadings.map((h, i) => (
                    <li key={h.id || i} className="flex items-start gap-2 leading-snug">
                      <span className="text-blue-500 font-bold select-none text-[17px] leading-none shrink-0">
                        »
                      </span>
                      <a
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(h.id);
                          if (el) {
                            const y =
                              el.getBoundingClientRect().top +
                              window.pageYOffset -
                              85;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }
                        }}
                        className="text-gray-700 text-sm hover:text-blue-800 transition-colors hover:underline cursor-pointer"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* 📄 Content Section 2 (Mappeable Sections as requested) */}
          <div className="space-y-10 text-slate-700 text-sm sm:text-[15px] leading-relaxed mt-8">
            {DUMMY_BLOG_SECTIONS.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-24 space-y-3.5">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0D3B66] m-0 tracking-tight">
                  {sec.title}
                </h2>

                {sec.paragraphs?.map((p, idx) => (
                  <p key={idx} className="m-0 text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.intro && <p className="m-0 text-slate-700">{sec.intro}</p>}

                {sec.checklist && (
                  <ul className="space-y-0.5 list-none p-0 mt-2 mb-2">
                    {sec.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-slate-700">
                        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-[3.5px] bg-[#22C55E] text-white shrink-0 mt-1 shadow-2xs">
                          <Check size={9} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.table && (
                  <div className="my-4 w-full">
                    <div className="w-full overflow-hidden border border-gray-200 shadow-2xs rounded-lg">
                      <Table
                        columns={
                          sec.table.type === "comparison"
                            ? comparisonTableColumns
                            : feeTableColumns
                        }
                        dataSource={sec.table.rows.map((row, idx) => ({
                          ...row,
                          key: row.factor || row.name || idx,
                        }))}
                        pagination={false}
                        size="small"
                        bordered
                        className="course-antd-table w-full"
                      />
                    </div>
                    {sec.table.note && (
                      <p className="text-xs text-slate-500 mt-2 italic m-0">
                        {sec.table.note}
                      </p>
                    )}
                  </div>
                )}

                {sec.columnsList && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 pt-1">
                    {sec.columnsList.map((col, cIdx) => (
                      <ul key={cIdx} className="space-y-2 list-none p-0 m-0">
                        {col.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-snug">
                            <span className="text-blue-500 font-bold select-none text-[17px] leading-none shrink-0 mt-0.5">
                              »
                            </span>
                            <span className="text-gray-700 text-sm hover:text-blue-800 transition-colors">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                )}

                {sec.numberedList && (
                  <div className="space-y-3 pt-1">
                    {sec.numberedList.map((item, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <h4 className="font-bold text-slate-900 m-0 text-sm sm:text-base">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 m-0 text-sm sm:text-[14.5px]">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {sec.twoColBullets && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 pt-1">
                    {sec.twoColBullets.map((col, cIdx) => (
                      <ul key={cIdx} className="space-y-1 list-disc list-inside text-slate-700 p-0 m-0">
                        {col.map((item, idx) => (
                          <li key={idx} className="leading-snug">
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                )}

                {sec.poll && (
                  <div className="rounded-xl border border-blue-400 bg-white p-5 sm:p-6 my-4 shadow-2xs">
                    <h3 className="text-base sm:text-lg font-bold text-[#0D3B66] mb-4 m-0">
                      {sec.poll.question}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {sec.poll.options.map((opt) => {
                        const isSelected = selectedPoll === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setSelectedPoll(opt)}
                            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border text-xs sm:text-sm font-medium transition-all cursor-pointer ${isSelected
                              ? "border-blue-600 bg-blue-50/60 text-blue-900"
                              : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                              }`}
                          >
                            <span
                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 border ${isSelected ? "border-blue-600 bg-blue-600" : "border-slate-300 bg-slate-200"
                                }`}
                            >
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-slate-500 mt-4 m-0">
                      {sec.poll.footnote}
                    </p>
                  </div>
                )}

                {sec.ctaButton && (
                  <div className="pt-3 flex justify-center">
                    <Link
                      href={sec.ctaButton.href || "/courses"}
                      className="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-[#F4D068] hover:bg-[#ebc557] text-[#0C2B4E] text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer no-underline active:scale-95"
                    >
                      {sec.ctaButton.text}
                    </Link>
                  </div>
                )}

                {sec.orderedSteps && (
                  <ol className="space-y-1.5 list-none p-0 m-0 text-slate-700 text-sm sm:text-[14.5px]">
                    {sec.orderedSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-4 leading-relaxed">
                        <span className="text-slate-600 font-medium select-none min-w-[20px] text-right">
                          {idx + 1}.
                        </span>
                        <span className="text-slate-800">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {sec.importantNotice && (
                  <div className="space-y-1.5 pt-4">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base m-0">
                      {sec.importantNotice.title}
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed m-0">
                      {sec.importantNotice.desc}
                    </p>
                  </div>
                )}

                {sec.note && <p className="text-xs text-slate-700 font-bold mt-2 m-0">{sec.note}</p>}
                {sec.outro && <p className="text-sm text-slate-600 mt-2 m-0">{sec.outro}</p>}
              </section>
            ))}
          </div>
        </div>

        {/* =====================================================================
            1️⃣5️⃣ FREQUENTLY ASKED QUESTIONS (Exact Course Page Standalone Card)
        ===================================================================== */}
        {allFaqs && allFaqs.length > 0 && (
          <div
            id="faqs"
            data-nav-label="FAQs"
            className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 md:p-8 mt-6 scroll-mt-20 space-y-5 sm:space-y-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
              Frequently Asked Questions (FAQs)
            </h2>

            <div className="space-y-2.5 sm:space-y-3 max-w-5xl mx-auto">
              {allFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                const cleanQuestion = (faq.question || faq.q || "")
                  .replace(/^q\d*[\.\:\s]*/i, "")
                  .trim();
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${isOpen
                      ? "border-blue-400 bg-blue-200/30 shadow-2xs"
                      : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between gap-3 p-2.5 sm:p-3 text-left cursor-pointer bg-transparent border-none outline-none"
                    >
                      <span
                        className={`text-xs sm:text-[14px] font-semibold leading-snug ${isOpen ? "text-[#0C2B4E]" : "text-gray-900"
                          }`}
                      >
                        Q{idx + 1}. {cleanQuestion}
                      </span>
                      <span
                        className={`flex items-center justify-center w-4 h-4 rounded-full shrink-0 transition-colors ${isOpen
                          ? "bg-[#0C2B4E] text-white"
                          : "bg-gray-300 text-gray-500"
                          }`}
                      >
                        {isOpen ? <Minus size={10} /> : <Plus size={10} />}
                      </span>
                    </button>
                    <div
                      className={
                        isOpen
                          ? "p-3 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal border-t border-blue-100/60"
                          : "sr-only"
                      }
                    >
                      <SafeHtmlRenderer html={faq.answer || faq.a || ""} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
            👍 WAS THIS ARTICLE HELPFUL? (Helpful Feedback Card)
        ===================================================================== */}
        <div className="bg-[#f0f7ff] rounded-xl border border-blue-100 p-4 sm:p-5 mt-6">
          <h3 className="text-base sm:text-[17px] font-bold text-[#0D3B66] m-0 mb-3 tracking-tight">
            Was This Article Helpful?
          </h3>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setArticleHelpful("yes")}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all border cursor-pointer active:scale-95 ${articleHelpful === "yes"
                ? "bg-white border-emerald-500 text-gray-800 shadow-2xs"
                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
            >
              <ThumbsUp size={14} className="text-emerald-600 fill-emerald-600" />
              <span>Yes</span>
            </button>

            <button
              type="button"
              onClick={() => setArticleHelpful("no")}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-semibold transition-all border cursor-pointer active:scale-95 ${articleHelpful === "no"
                ? "bg-white border-slate-400 text-gray-800 shadow-2xs"
                : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
            >
              <ThumbsDown size={14} className="text-slate-500 fill-slate-500" />
              <span>No</span>
            </button>
          </div>
          <p className="text-[11.5px] sm:text-xs text-slate-500 mt-3 m-0 font-normal">
            {articleHelpful === "no"
              ? "*Thanks for your feedback! We'll work to improve it."
              : "*Thanks! We're glad this article helped."}
          </p>
        </div>

        {/* =====================================================================
            💬 ADD COMMENTS SECTION
        ===================================================================== */}
        <div id="add-comments" className="mt-6 scroll-mt-20">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight m-0 mb-3">
            Add Comments
          </h2>

          <div className="bg-[#f8f9fa] rounded-2xl border border-gray-200/90 p-4 sm:p-6 space-y-4">
            {/* Scrollable list of comments */}
            <div className="bg-white rounded-xl border border-gray-200/80 p-4 max-h-[190px] overflow-y-auto space-y-3 shadow-2xs">
              {commentsList.map((cmt, idx) => (
                <div
                  key={cmt.id || idx}
                  className={`flex items-start gap-3 ${idx !== commentsList.length - 1 ? "pb-3 border-b border-gray-100" : ""
                    }`}
                >
                  <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                    <User size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="text-xs sm:text-[13px] font-bold text-gray-900 m-0">
                      {cmt.name}
                    </h5>
                    <p className="text-[11.5px] sm:text-xs text-slate-500 mt-0.5 m-0 leading-relaxed font-normal">
                      {cmt.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Leave a Comment Form */}
            <div className="pt-1">
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 m-0 mb-2">
                Leave a Comment
              </h4>

              <Form
                form={commentForm}
                layout="vertical"
                onFinish={handleCommentSubmit}
                className="space-y-3"
              >
                <Form.Item
                  name="comment"
                  rules={[{ required: true, message: "Please enter your comment" }]}
                  className="mb-3"
                >
                  <Input.TextArea
                    rows={4}
                    placeholder=""
                    className="rounded-lg border border-gray-200 bg-white hover:border-blue-400 focus:border-blue-600 text-xs sm:text-sm p-3 resize-none shadow-2xs"
                  />
                </Form.Item>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-5">
                    <Form.Item
                      name="name"
                      rules={[{ required: true, message: "Please enter your name" }]}
                      className="mb-0"
                    >
                      <Input
                        placeholder="Enter Your Name*"
                        className="rounded-lg border-gray-200 h-10 text-xs sm:text-sm bg-white"
                      />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-4">
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Please enter a valid email address" },
                      ]}
                      className="mb-0"
                    >
                      <Input
                        placeholder="Enter Your Email*"
                        className="rounded-lg border-gray-200 h-10 text-xs sm:text-sm bg-white"
                      />
                    </Form.Item>
                  </div>

                  <div className="sm:col-span-3">
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={commentSubmitting}
                      className="w-full h-10 bg-[#003884] hover:bg-[#07244D] text-white font-bold rounded-lg border-none text-xs sm:text-sm shadow-xs transition-colors cursor-pointer flex items-center justify-center active:scale-95"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>

          {/* Tags Bar directly below Add Comments card */}
          <div className="mt-4 bg-[#f8f9fa] rounded-lg border border-gray-200 px-4 py-2.5 text-xs sm:text-[13px] text-slate-700">
            <span className="font-bold text-gray-900">Tags: </span>
            <span className="text-slate-600">{displayTags}</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
