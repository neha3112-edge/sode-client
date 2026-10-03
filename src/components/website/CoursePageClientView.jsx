"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Carousel, Table } from "antd";
import { Container } from "@/components/common/Container";
import SafeHtmlRenderer from "@/components/website/SafeHtmlRenderer";
import { useBreadcrumb } from "@/context/BreadcrumbContext";
import { getAssetPath } from "@/lib/utils";
import { useFormModal } from "@/hooks/useFormModal";
import { useCompare } from "@/hooks/useCompare";
import Hero from "@/components/website/Hero";
import {
  Trophy,
  ShieldCheck,
  Clock,
  IndianRupee,
  Briefcase,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowDownCircle,
  MapPin,
  Award,
  Sparkles,
  PhoneCall,
  Mail,
  Headphones,
  Check,
  Building2,
  Users,
  Compass,
  TrendingUp,
  Layers,
  BookOpen,
  GraduationCap,
  HardHat,
  Database,
  Share2,
  ShoppingCart,
  Bookmark,
  Plus,
  Minus,
} from "lucide-react";

// =========================================================================
// 🎨 THEME COLOR PALETTE (Strictly Website-Client Brand Guidelines)
// =========================================================================
// Primary Navy: #1C3569
// Dark Deep Navy: #0C2340 / #0A1C33
// Bright Gold/Amber: #FFC107
// Amber Accent Text: #B45309
// Sky Accent: #0284C7
// Neutral Backgrounds: #F8FAFC, #FFFFFF, #F1F5F9
// =========================================================================

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("embed/")) return url;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([\w-]{11})/
  );
  if (match && match[1]) {
    return `https://www.youtube-nocookie.com/embed/${match[1]}?rel=0`;
  }
  return url;
}

function resolveMediaUrl(media) {
  if (!media) return null;
  if (typeof media === "string") return media;
  return media.url || media.path || media.link || media.fileUrl || null;
}

export default function CoursePageClientView({ page, slug, heroData = null }) {
  const { openFormModal } = useFormModal();
  const { isInCompare, toggleCompare, setIsCompareDrawerOpen } = useCompare();

  // Active Semester Tab State
  const [activeSemester, setActiveSemester] = useState(1);

  // Active FAQ Accordion State (open first by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Core identifiers with smart fallbacks
  const pageTitle = page?.pageTitle || page?.title || "Online MBA Course";
  const cleanCourseName = pageTitle.replace(/^online\s+/i, "");
  const cleanOnlineTitle = pageTitle.toLowerCase().startsWith("online") ? pageTitle : `Online ${pageTitle}`;
  const degreeName = page?.degreeName || "Master of Business Administration (Online MBA)";
  const shortTitle = page?.shortTitle || "(Master of Business Administration)";
  const courseCode = page?.course?.code || "MBA";

  // Breadcrumbs
  useBreadcrumb(
    {
      items: [
        { label: "Home", href: "/" },
        { label: "Courses", href: "/courses" },
        { label: pageTitle },
      ],
      backButton: {
        label: "Courses",
        href: "/courses",
      },
    },
    [pageTitle]
  );

  // Execute custom JavaScript if present
  useEffect(() => {
    if (!page?.js) return;
    try {
      const scriptFn = new Function(page.js);
      scriptFn();
    } catch (err) {
      console.error("[CoursePage] Error executing custom JS:", err);
    }
  }, [page?.js]);

  // Open enquiry modal helper
  const handleOpenLead = (customTitle, customSub) => {
    openFormModal({
      title: customTitle || `Enquire About ${pageTitle}`,
      subtitle: customSub || "Get 1:1 free academic counselling and fee structure",
      submitButtonText: "Get Free Consultation",
    });
  };

  // -------------------------------------------------------------------------
  // 1️⃣ DATA RESOLUTION (Database Values with Matching PDF Defaults)
  // -------------------------------------------------------------------------
  const hero = page?.hero || {};
  const quickStats = page?.quickStats || {};
  const accreditations = page?.accreditations || {};
  const overview = page?.overview || {};
  const whyChoose = page?.whyChoose || {};
  const eligibility = page?.eligibilitySection || {};
  const admissionProcess = page?.admissionProcess || {};
  const modeComparison = page?.modeComparison || {};
  const specializations = page?.specializations || {};
  const syllabus = page?.syllabus || {};
  const topUniversities = page?.topUniversities || {};
  const careerScope = page?.careerScope || {};
  const recruitersSection = page?.recruitersSection || {};
  const mistakesToAvoid = page?.mistakesToAvoid || {};
  const faqSection = page?.faqSection || {};

  // Quick Stats Values
  const approvalsDisplay =
    quickStats.approvalsText ||
    (Array.isArray(quickStats.approvals) && quickStats.approvals.length > 0
      ? quickStats.approvals.map((a) => a.name || a.code).join(", ")
      : "UGC-DEB, AICTE");

  const durationDisplay =
    quickStats.durationText || quickStats.duration?.name || "2 Years (4 Semesters)";

  const eligibilityDisplay =
    quickStats.eligibilityText || quickStats.eligibility?.name || "Graduation with 50% Marks";

  const feeDisplay =
    quickStats.semesterFeeText ||
    (quickStats.fees?.amount ? `₹${quickStats.fees.amount.toLocaleString()} / Sem` : "₹24,500 to ₹50,000 INR");

  const expectedSalaryDisplay = quickStats.expectedSalaryText || "₹6 LPA to ₹15 LPA";

  // Accreditations list
  const accreditationItems =
    accreditations.items && accreditations.items.length > 0
      ? accreditations.items
      : [
        {
          title: "UGC-DEB",
          subtitle: "The UGC-DEB has released the official list of approved online..",
          code: "ugc",
        },
        {
          title: "NAAC A+",
          subtitle: "National Assessment and Accreditation Council",
          code: "naac",
        },
        {
          title: "WASC",
          subtitle: "Western Association of Schools and Colleges",
          code: "wasc",
        },
        {
          title: "QS Ranking",
          subtitle: "QS Ranking",
          code: "qs",
        },
        {
          title: "NIRF 22nd",
          subtitle: "National Institutional Ranking Framework",
          code: "nirf",
        },
        {
          title: "WES",
          subtitle: "World Education Services",
          code: "wes",
        },
      ];

  // Overview highlights table
  const overviewTable =
    overview.highlightsTable && overview.highlightsTable.length > 0
      ? overview.highlightsTable
      : [
        { category: "Degree Name", details: "Master of Business Administration (Online MBA)" },
        { category: "Degree Level", details: "Master's Degree" },
        { category: "Course Duration", details: "2 Years (4 Semesters)" },
        { category: "Eligibility Criteria", details: "Bachelor's Degree with minimum 50% marks (45% for reserved categories)" },
        { category: "Key Approvals", details: "UGC-DEB, AICTE, NAAC (A+ or A++), NIRF Top 100" },
        { category: "Popular Specializations", details: "Finance, Marketing, HR, Business Analytics, Operations, IT, Read More." },
        { category: "Learning Format", details: "100% Online (Live & Recorded Lectures via LMS)" },
        { category: "Exam Pattern", details: "Online Remote-Proctored Examinations" },
        { category: "Total Program Fee", details: "₹1,00,000 to ₹3,00,000 (Total Course Fee)" },
        { category: "Semester-wise Fee", details: "₹24,500 to ₹50,000" },
        { category: "Career Outcomes", details: "Corporate Leadership, Strategic Management, Entrepreneurship" },
      ];

  // Why Choose Cards
  const whyChooseCards =
    whyChoose.cards && whyChoose.cards.length > 0
      ? whyChoose.cards
      : [
        {
          title: "Flexible Learning",
          description: "Access live and recorded sessions and study materials at any time, without the need to relocate or leave your job.",
          iconType: "shield",
        },
        {
          title: "Equal Recognition:",
          description: "Degrees from UGC-DEB and AICTE-recognized universities are valued equally to traditional on-campus MBAs in both the job market and government",
          iconType: "shield",
        },
        {
          title: "Cost-Effective:",
          description: "Online MBAs may cost up to 50% less than traditional programs, with no commuting or campus fees.",
          iconType: "shield",
        },
        {
          title: "Career Growth",
          description: "Apply new concepts in your current role to support advancement and increase earning potential.",
          iconType: "shield",
        },
        {
          title: "Lorem Ipsum",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966",
          iconType: "monitor",
        },
        {
          title: "Lorem Ipsum",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966",
          iconType: "shield",
        },
      ];

  // Eligibility Cards
  const eligibilityCards =
    eligibility.cards && eligibility.cards.length > 0
      ? eligibility.cards
      : [
        {
          title: "Academic Qualification:",
          description: "A bachelor's degree from a recognized university with at least 50% aggregate marks is required. Reserved categories are eligible for a 5% relaxation.",
        },
        {
          title: "Entrance Exams:",
          description: "Most universities offer direct admission based on graduation marks. Entrance exams such as CAT, MAT, or CMAT are optional or not required for most programs.",
        },
        {
          title: "Work Experience:",
          description: "Work experience is preferred for executive tracks but not mandatory for standard Online MBA programs.",
        },
      ];

  // Admission Steps
  const admissionSteps =
    admissionProcess.steps && admissionProcess.steps.length > 0
      ? admissionProcess.steps
      : [
        {
          stepNumber: 1,
          title: "Form Submission",
          description: "Fill out the online application form on our portal with your personal and academic details.",
        },
        {
          stepNumber: 2,
          title: "Document Verification",
          description: "Upload digital copies of your graduation marksheet, government ID proof, and photographs.",
        },
        {
          stepNumber: 3,
          title: "Fee Payment & EMI",
          description: "Pay your semester registration fee securely online or choose 0% interest flexible EMI options.",
        },
        {
          stepNumber: 4,
          title: "Enrollment & LMS Access",
          description: "Receive your official University Student ID, enrollment letter, and LMS login to start attending lectures.",
        },
      ];

  // Mode Comparison Rows
  const comparisonRows =
    modeComparison.rows && modeComparison.rows.length > 0
      ? modeComparison.rows
      : [
        {
          category: "Learning Mode",
          online: "LMS, interactive live & recorded lectures",
          regular: "Physical classroom daily attendance",
          distance: "Printed study material & offline weekend centers",
        },
        {
          category: "Flexibility",
          online: "High (Study anytime, anywhere at self-pace)",
          regular: "Low (Fixed daily class schedule)",
          distance: "Moderate (Self-paced, offline study)",
        },
        {
          category: "Fee Structure",
          online: "₹40,000 to ₹1,50,000 total program fee",
          regular: "₹4,00,000 to ₹25,00,000 total program fee",
          distance: "₹30,000 to ₹80,000 total fee",
        },
        {
          category: "Interaction",
          online: "Virtual live discussion forums, 1:1 doubt clearing",
          regular: "Direct face-to-face faculty interaction",
          distance: "Minimal to zero interaction",
        },
        {
          category: "Degree Value",
          online: "High (UGC-DEB approved, equal to regular MBA)",
          regular: "High (Standard on-campus recognized degree)",
          distance: "Moderate recognition",
        },
      ];

  // Specializations (Screenshot 1: 12 items in 3 cols)
  const specializationsList =
    specializations.items && specializations.items.length > 0
      ? specializations.items
      : [
        { name: "General", icon: "building" },
        { name: "Business Analytics", icon: "book" },
        { name: "Construction Project Management", icon: "cap" },
        { name: "Data Science", icon: "bookmark", highlighted: true },
        { name: "Digital Entrepreneurship", icon: "database" },
        { name: "Digital Marketing", icon: "share" },
        { name: "Dual Specialization", icon: "cart" },
        { name: "Entreprenuership & Leadership Management", icon: "briefcase" },
        { name: "Global Finance Market", icon: "book" },
        { name: "Hospitality Management", icon: "cap" },
        { name: "Human Resource Analytics", icon: "ribbon" },
        { name: "Insurance Management", icon: "database" },
      ];

  // Syllabus Semesters (Screenshot 1)
  const syllabusData =
    syllabus.semesters && syllabus.semesters.length > 0
      ? syllabus.semesters
      : [
        {
          semesterNumber: 1,
          semesterTitle: "Semester 1",
          subjects: [
            { subjectName: "Management Concepts", focusArea: "Core management theory and practices" },
            { subjectName: "Business Communication", focusArea: "Professional communication and reporting skills" },
            { subjectName: "Organizational Behavior", focusArea: "Workplace psychology and team dynamics" },
            { subjectName: "Financial Accounting", focusArea: "Financial statements and accounting fundamentals" },
            { subjectName: "Managerial Economics", focusArea: "Micro and macroeconomic business decision making" },
          ],
        },
        {
          semesterNumber: 2,
          semesterTitle: "Semester 2",
          subjects: [
            { subjectName: "Marketing Management", focusArea: "Market segmentation, positioning strategies, and pricing models" },
            { subjectName: "Human Resource Management", focusArea: "Strategic talent acquisition, employee retention, and labor law" },
            { subjectName: "Financial Management", focusArea: "Capital structure, working capital optimization, and dividend decisions" },
            { subjectName: "Operations Management", focusArea: "Process analysis, inventory modeling, and total quality management" },
            { subjectName: "Business Analytics & Research", focusArea: "Hypothesis testing, quantitative analysis, and analytics models" },
          ],
        },
        {
          semesterNumber: 3,
          semesterTitle: "Semester 3",
          subjects: [
            { subjectName: "Strategic Management", focusArea: "Competitive strategy, Porter's frameworks, and board governance" },
            { subjectName: "Business Law & Ethics", focusArea: "Corporate contract laws, intellectual property, and regulatory standards" },
            { subjectName: "Major Specialization Elective I", focusArea: "Advanced analytical and functional principles in chosen domain" },
            { subjectName: "Major Specialization Elective II", focusArea: "Case studies, hands-on modeling, and industry applications" },
            { subjectName: "Cross-Functional Elective", focusArea: "Interdisciplinary cross-skilling in emerging digital technologies" },
          ],
        },
        {
          semesterNumber: 4,
          semesterTitle: "Semester 4",
          subjects: [
            { subjectName: "Entrepreneurship & Innovation", focusArea: "Business model canvas, startup incubation, and venture pitch decks" },
            { subjectName: "Advanced Elective III", focusArea: "Industry immersion modules, executive strategy, and real-world lab" },
            { subjectName: "Advanced Elective IV", focusArea: "Global trends, future-ready business methodologies, and industry lectures" },
            { subjectName: "Comprehensive Capstone Project", focusArea: "Real-world consulting or enterprise problem research dissertation" },
          ],
        },
      ];

  // Top Universities (Screenshot 2: 5 items)
  const universitiesList =
    topUniversities.universitiesList && topUniversities.universitiesList.length > 0
      ? topUniversities.universitiesList
      : [
        {
          name: "Manipal University",
          programsCount: "10+ Programs",
          type: "manipal",
          slug: "online-manipal",
        },
        {
          name: "Uttaranchal University",
          programsCount: "10+ Programs",
          type: "uttaranchal",
          slug: "uttaranchal-university",
        },
        {
          name: "Lovely Professional University",
          programsCount: "10+ Programs",
          type: "lpu",
          slug: "lpu-online",
        },
        {
          name: "Mangalayatan University",
          programsCount: "10+ Programs",
          type: "mangalayatan",
          slug: "mangalayatan-university",
        },
        {
          name: "Chandigarh University",
          programsCount: "10+ Programs",
          type: "chandigarh",
          slug: "chandigarh-university",
        },
        {
          name: "Jamia Hamdard university",
          programsCount: "10+ Programs",
          type: "jamia",
          slug: "jamia-hamdard-university",
        },
      ];

  // Career Scope Matrix (Screenshot 2 Table 1)
  const experienceLevels =
    careerScope.experienceLevels && careerScope.experienceLevels.length > 0
      ? careerScope.experienceLevels
      : [
        { level: "Entry-Level", jobRoles: "Business Analyst, Marketing Executive, Financial Analyst", salaryRange: "₹5 LPA to ₹8 LPA" },
        { level: "Mid-Level", jobRoles: "Project Manager, Product Manager, HR Manager, Operations Manager", salaryRange: "₹8 LPA to ₹14 LPA" },
        { level: "Senior-Level", jobRoles: "Chief Financial Officer (CFO), Director of Marketing, Strategy Consultant", salaryRange: "₹15 LPA to ₹30+ LPA" },
      ];

  // Career Roles Matrix (Screenshot 2 Table 2)
  const jobRolesList = [
    { role: "Marketing Manager", desc: "Plans marketing campaigns, develops strategies, and helps businesses reach target customers.", salary: "₹6–15 LPA" },
    { role: "Financial Analyst", desc: "Analyzes financial data, prepares reports, and supports business decisions and financial planning.", salary: "₹5–12 LPA" },
    { role: "HR Manager", desc: "Manages employee relations, supports hiring, and helps maintain a productive workplace environment.", salary: "₹6–14 LPA" },
    { role: "Business Analyst", desc: "Studies business processes, identifies improvements, and helps teams make better business decisions.", salary: "₹6–14 LPA" },
    { role: "Sales Manager", desc: "Leads sales teams, manages targets, and develops strategies to increase revenue and customer growth.", salary: "₹5–12 LPA" },
  ];

  // Recruiters (Screenshot 3: 12 logos in 2 rows)
  const recruitersList = [
    { name: "wipro", type: "wipro" },
    { name: "TATA STEEL", type: "tatasteel" },
    { name: "pwc", type: "pwc" },
    { name: "cisco", type: "cisco" },
    { name: "Apple", type: "apple" },
    { name: "Flipkart", type: "flipkart" },
    { name: "Google", type: "google" },
    { name: "HCLTech", type: "hcltech" },
    { name: "amazon", type: "amazon" },
    { name: "SIEMENS", type: "siemens" },
    { name: "KPMG", type: "kpmg" },
    { name: "accenture", type: "accenture" },
  ];

  // Common Mistakes (Screenshot 4: 3 items)
  const mistakesList =
    mistakesToAvoid.items && mistakesToAvoid.items.length > 0
      ? mistakesToAvoid.items
      : [
        {
          title: "Choosing Unaccredited Institutes:",
          description: "Ensure UGC-DEB approval before enrolling.",
        },
        {
          title: "Poor Time Management:",
          description: "Skipping weekly recorded lectures leads to exam stress.",
        },
        {
          title: "Ignoring Portal Notifications:",
          description: "Missed exam deadlines or assignment submissions impact final grades.",
        },
      ];

  // FAQs (Screenshot 4: 5 accordion items)
  const faqsList =
    faqSection.faqs && faqSection.faqs.length > 0
      ? faqSection.faqs
      : [
        {
          question: "Q1. Is an Online MBA Degree from Manipal University Recognized?",
          answer: "Yes, the Online MBA Course from Manipal University is UGC-DEB approved and holds NAAC A+ accreditation, making it valid and widely accepted by employers across industries.",
        },
        {
          question: "Q1. Is an Online MBA Degree from Manipal University Recognized?",
          answer: "Yes, an online MBA holds the exact same validity as on-campus degrees under UGC regulations for corporate jobs, civil service examinations, and overseas opportunities.",
        },
        {
          question: "Q1. Is an Online MBA Degree from Manipal University Recognized?",
          answer: "All courses are approved by UGC-DEB, AICTE, and accredited with top NAAC grades, ensuring standard curriculum rigor and global recognition.",
        },
        {
          question: "Q1. Is an Online MBA Degree from Manipal University Recognized?",
          answer: "The program is 100% online with interactive live classes, digital study materials, dedicated mentor support, and remote-proctored online examinations.",
        },
        {
          question: "Q1. Is an Online MBA Degree from Manipal University Recognized?",
          answer: "Students receive comprehensive placement assistance, job portal access, resume critique, and interview opportunities with leading MNCs and Fortune 500 companies.",
        },
      ];

  // Current active semester data
  const currentSemesterData =
    syllabusData.find((s) => s.semesterNumber === activeSemester) || syllabusData[0];

  // ── Partner Carousel Responsive State (Shows 2 cols on mobile) ──
  const [partnerSlidesCount, setPartnerSlidesCount] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w < 768) {
        setPartnerSlidesCount(2);
      } else if (w < 1024) {
        setPartnerSlidesCount(3);
      } else if (w < 1280) {
        setPartnerSlidesCount(4);
      } else {
        setPartnerSlidesCount(5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Ant Design Table Memoized Configurations (100% Mobile Responsive, No Scrolling) ──
  const overviewTableColumns = useMemo(
    () => [
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: "36%",
        onCell: () => ({ className: "font-bold text-gray-900" }),
      },
      {
        title: "Details",
        dataIndex: "details",
        key: "details",
        width: "64%",
        onCell: () => ({ className: "text-gray-800 font-normal" }),
        render: (text) => {
          if (typeof text === "string" && text.includes("Read More")) {
            const parts = text.split("Read More");
            return (
              <span>
                {parts[0]}
                <a
                  href="#specializations"
                  className="text-[#0077B6] hover:text-[#0C2B4E] font-semibold underline underline-offset-2 ml-1 cursor-pointer"
                >
                  Read More
                </a>
                {parts[1] || ""}
              </span>
            );
          }
          return text;
        },
      },
    ],
    []
  );

  const overviewDataSource = useMemo(
    () =>
      (overviewTable || []).map((row, idx) => ({
        key: row.category || idx,
        category: row.category,
        details: row.details,
      })),
    [overviewTable]
  );

  const modeComparisonColumns = useMemo(
    () => [
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: "25%",
        onCell: () => ({ className: "font-bold text-gray-900" }),
      },
      {
        title: "Online MBA",
        dataIndex: "online",
        key: "online",
        width: "25%",
        onCell: () => ({ className: "text-[#0F2A4A] font-semibold bg-blue-50/40" }),
      },
      {
        title: "Regular MBA",
        dataIndex: "regular",
        key: "regular",
        width: "25%",
        onCell: () => ({ className: "text-gray-700" }),
      },
      {
        title: "Distance MBA",
        dataIndex: "distance",
        key: "distance",
        width: "25%",
        onCell: () => ({ className: "text-gray-700" }),
      },
    ],
    []
  );

  const modeComparisonDataSource = useMemo(
    () => [
      {
        key: "1",
        category: "Learning Mode",
        online: "LMS, live & recorded lectures",
        regular: "Physical classroom attendance",
        distance: "Printed study material & offline centers",
      },
      {
        key: "2",
        category: "Flexibility",
        online: "High (Study anytime/anywhere)",
        regular: "Low (Fixed daily schedule)",
        distance: "Moderate (Self-paced, offline study)",
      },
      {
        key: "3",
        category: "Fee Structure",
        online: "₹40,000 to ₹1,50,000 total",
        regular: "₹4,00,000 to ₹25,00,000 total",
        distance: "₹30,000 to ₹80,000 total",
      },
      {
        key: "4",
        category: "Interaction",
        online: "Virtual forums, live chats",
        regular: "Direct face-to-face",
        distance: "Minimal to none",
      },
      {
        key: "5",
        category: "Degree Value",
        online: "High (UGC-DEB approved)",
        regular: "High",
        distance: "Moderate",
      },
    ],
    []
  );

  const syllabusColumns = useMemo(
    () => [
      {
        title: "Subject Name",
        dataIndex: "subjectName",
        key: "subjectName",
        width: "42%",
        onCell: () => ({ className: "font-bold text-gray-900" }),
      },
      {
        title: "Focus Area",
        dataIndex: "focusArea",
        key: "focusArea",
        width: "58%",
        onCell: () => ({ className: "text-gray-800 font-normal" }),
      },
    ],
    []
  );

  const syllabusDataSource = useMemo(
    () =>
      (currentSemesterData?.subjects || []).map((subj, idx) => ({
        key: subj.subjectName || idx,
        subjectName: subj.subjectName,
        focusArea: subj.focusArea,
      })),
    [currentSemesterData]
  );

  const careerLevelColumns = useMemo(
    () => [
      {
        title: "Experience Level",
        dataIndex: "level",
        key: "level",
        width: "28%",
        onCell: () => ({ className: "font-bold text-gray-900" }),
      },
      {
        title: "Job Roles",
        dataIndex: "jobRoles",
        key: "jobRoles",
        width: "44%",
        onCell: () => ({ className: "text-gray-800 font-normal" }),
      },
      {
        title: "Expected Salary (p.a.)",
        dataIndex: "salaryRange",
        key: "salaryRange",
        width: "28%",
        onCell: () => ({ className: "font-bold text-[#0F2A4A]" }),
      },
    ],
    []
  );

  const careerLevelDataSource = useMemo(
    () =>
      (experienceLevels || []).map((lvl, idx) => ({
        key: lvl.level || idx,
        level: lvl.level,
        jobRoles: lvl.jobRoles,
        salaryRange: lvl.salaryRange,
      })),
    [experienceLevels]
  );

  const careerJobRoleColumns = useMemo(
    () => [
      {
        title: "Job Role",
        dataIndex: "role",
        key: "role",
        width: "28%",
        onCell: () => ({ className: "font-bold text-gray-900" }),
      },
      {
        title: "Role Description",
        dataIndex: "desc",
        key: "desc",
        width: "44%",
        onCell: () => ({ className: "text-gray-600 leading-relaxed font-normal" }),
      },
      {
        title: "Salary Range in India",
        dataIndex: "salary",
        key: "salary",
        width: "28%",
        onCell: () => ({ className: "font-bold text-[#0F2A4A]" }),
      },
    ],
    []
  );

  const careerJobRoleDataSource = useMemo(
    () =>
      (jobRolesList || []).map((job, idx) => ({
        key: job.role || idx,
        role: job.role,
        desc: job.desc,
        salary: job.salary,
      })),
    [jobRolesList]
  );

  return (
    <div className="w-full bg-[#F8FAFC] text-slate-800 antialiased min-h-screen">
      {/* ── Custom CSS from builder / editor ── */}
      {page?.css && (
        <style
          id={`course-page-css-${page._id || "style"}`}
          dangerouslySetInnerHTML={{ __html: page.css }}
        />
      )}

      {/* =====================================================================
          1️⃣ HERO SECTION (CustomPage-Grade Modular Hero Engine)
      ===================================================================== */}
      {hero.enabled !== false && hero.heroType !== "none" && (
        <>
          {hero.heroType === "hero_ref" && hero.heroRef ? (
            <Hero initialHeroData={hero.heroRef} />
          ) : hero.heroType === "custom" && hero.customHtml ? (
            <div className="w-full">
              <SafeHtmlRenderer html={hero.customHtml} />
            </div>
          ) : (
            <section
              style={{ backgroundColor: hero.backgroundColor || "#102A45" }}
              className="relative overflow-hidden text-white pt-8 pb-10 md:pt-12 md:pb-12"
            >
              {hero.backgroundImage && (
                <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
                  <Image
                    src={getAssetPath(resolveMediaUrl(hero.backgroundImage))}
                    alt=""
                    fill
                    priority
                    unoptimized
                    className="object-cover object-center opacity-30"
                  />
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                </div>
              )}
              <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Left Content Column */}
                  <div className="lg:col-span-7 flex flex-col items-start z-10">
                    {/* Full Degree Subtitle in parentheses */}
                    <p className="text-slate-300 text-sm sm:text-base font-normal tracking-wide mb-1.5">
                      {shortTitle?.startsWith("(") ? shortTitle : `(${shortTitle || "Master of Business Administration"})`}
                    </p>

                    {/* Main Heading H1 */}
                    <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight mb-4">
                      {hero.title || pageTitle}{" "}
                      {hero.titleHighlight && (
                        <span className="text-[#F5D061]">{hero.titleHighlight}</span>
                      )}
                    </h1>

                    {/* Hero Subtitle Description */}
                    <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-xl font-normal">
                      {hero.description ||
                        hero.subtitle ||
                        `Grow your career in 2026 with a leading Online MBA program in India offering flexible and affordable learning. An online MBA from a recognized university develops essential management and leadership skills. Choose a UGC-DEB-approved program to secure a stronger professional future.`}
                    </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-row items-center gap-2.5 sm:gap-3 flex-wrap">
                {Array.isArray(hero.buttons) && hero.buttons.filter((b) => b?.enabled !== false).length > 0 ? (
                  hero.buttons
                    .filter((b) => b?.enabled !== false)
                    .map((btn, idx) => {
                      const isModal = btn.isModal;
                      const variant = btn.variant || "green";
                      const variantClasses =
                        variant === "green"
                          ? "bg-[#22C55E] hover:bg-[#16a34a] text-white"
                          : variant === "amber" || variant === "gold"
                          ? "bg-[#F5D061] hover:bg-[#ebc44f] text-[#102A45]"
                          : variant === "blue"
                          ? "bg-[#0284C7] hover:bg-[#0369a1] text-white"
                          : variant === "dark"
                          ? "bg-[#0f172a] hover:bg-[#1e293b] text-white"
                          : variant === "outline"
                          ? "bg-transparent hover:bg-white/10 text-white border border-white/80"
                          : "bg-[#F5D061] hover:bg-[#ebc44f] text-[#102A45]";

                      if (isModal) {
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleOpenLead(btn.text || "Counseling", `Course: ${pageTitle}`)}
                            className={`px-4 sm:px-5 py-2 sm:py-2.5 font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-all duration-200 cursor-pointer text-center inline-flex items-center justify-center whitespace-nowrap gap-1.5 ${variantClasses}`}
                          >
                            <span>{btn.text}</span>
                          </button>
                        );
                      }

                      return (
                        <a
                          key={idx}
                          href={btn.url || "#"}
                          className={`px-3.5 sm:px-4 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-1.5 cursor-pointer text-center whitespace-nowrap ${variantClasses}`}
                        >
                          {btn.icon === "podcast" && <ArrowDownCircle className="w-4 h-4 shrink-0" />}
                          <span>{btn.text}</span>
                        </a>
                      );
                    })
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleOpenLead("Book 1:1 Counseling", `Select course: ${pageTitle}`)}
                      className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#F5D061] hover:bg-[#ebc44f] text-[#102A45] font-bold text-xs sm:text-sm rounded-lg shadow-xs transition-all duration-200 cursor-pointer text-center inline-flex items-center justify-center whitespace-nowrap"
                    >
                      {hero.counselingBtnText || "Book 1:1 Counseling"}
                    </button>

                    {hero.podcastUrl ? (
                      <a
                        href={hero.podcastUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-transparent hover:bg-white/10 text-white font-semibold text-xs sm:text-sm rounded-lg border border-white/80 transition-all duration-200 inline-flex items-center justify-center gap-1.5 cursor-pointer text-center whitespace-nowrap"
                      >
                        <ArrowDownCircle className="w-4 h-4 text-white shrink-0" />
                        <span>{hero.podcastTitle || "Listen Podcast"}</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenLead("Listen to Course Podcast", `Get audio guide for ${pageTitle}`)}
                        className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-transparent hover:bg-white/10 text-white font-semibold text-xs sm:text-sm rounded-lg border border-white/80 transition-all duration-200 inline-flex items-center justify-center gap-1.5 cursor-pointer text-center whitespace-nowrap"
                      >
                        <ArrowDownCircle className="w-4 h-4 text-white shrink-0" />
                        <span>Listen Podcast</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right Video Mockup Column */}
            <div className="lg:col-span-5 flex justify-center z-10">
              <div
                className="w-full max-w-lg lg:max-w-none rounded-xl overflow-hidden shadow-2xl relative aspect-video bg-[#0c1e30] border border-white/10 group cursor-pointer"
                onClick={() => handleOpenLead("Course Video Guide", `Watch video guide for ${pageTitle}`)}
              >
                {hero.videoUrl ? (
                  <iframe
                    src={getYouTubeEmbedUrl(hero.videoUrl)}
                    title={pageTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <>
                    {/* YouTube Top Bar */}
                    <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-3 py-2 bg-gradient-to-b from-black/80 to-transparent">
                      <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium truncate pr-2">
                        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          🎓
                        </div>
                        <span className="truncate">All About Online & Distance MBA Complete Information</span>
                      </div>
                      <div className="flex items-center gap-3 text-white text-xs shrink-0">
                        <div className="flex flex-col items-center">
                          <Clock className="w-4 h-4" />
                          <span className="text-[9px]">Watch Later</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z" />
                          </svg>
                          <span className="text-[9px]">Share</span>
                        </div>
                      </div>
                    </div>

                    {/* Thumbnail Content matching Screenshot */}
                    <div className="relative w-full h-full flex items-center justify-between px-4 sm:px-6 bg-gradient-to-r from-[#0c243e] via-[#091b2e] to-[#040d17]">
                      {/* Left text banners */}
                      <div className="flex flex-col items-start z-10 max-w-[62%] sm:max-w-[55%]">
                        <span className="inline-block bg-[#0284C7] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-sm mb-1">
                          All About
                        </span>
                        <span className="text-white text-xs sm:text-sm font-semibold mb-0.5">
                          Online & Distance
                        </span>
                        <span className="text-2xl sm:text-5xl font-black text-[#22C55E] tracking-tight leading-none mb-1">
                          MBA
                        </span>
                        <span className="inline-block bg-[#FACC15] text-[#111827] text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-sm">
                          Complete Information
                        </span>
                        <span className="text-[9px] sm:text-[10px] text-slate-300 mt-1.5 sm:mt-2 font-medium">
                          Duration, Fees, Specialisation, Top Universities
                        </span>
                      </div>

                      {/* Center Red Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className="w-12 sm:w-16 h-8 sm:h-11 bg-[#FF0000] rounded-lg sm:rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white ml-0.5" viewBox="0 0 24 24">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>

                      {/* Right Educator Avatar graphic */}
                      <div className="absolute right-0 bottom-0 top-0 w-32 sm:w-52 flex items-end justify-center pointer-events-none">
                        <div className="relative w-full h-full flex items-end justify-center">
                          <div className="w-32 sm:w-36 h-48 sm:h-56 relative rounded-t-full bg-gradient-to-b from-purple-200/20 to-transparent flex items-center justify-center">
                            <div className="absolute bottom-0 w-28 sm:w-32 h-40 bg-[#162a45] rounded-t-3xl border-t-2 border-purple-400 flex flex-col items-center pt-2">
                              <div className="w-12 h-14 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center">
                                <span className="text-xl">👩‍💼</span>
                              </div>
                              <div className="w-16 h-16 bg-[#581C87] mt-1 rounded-t-lg" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* YouTube Bottom Left Link */}
                      <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-white">
                        <span>Watch on</span>
                        <span className="font-bold flex items-center gap-0.5">
                          <span className="w-3 h-2 bg-red-600 rounded-xs flex items-center justify-center">
                            <span className="w-0 h-0 border-y-[2px] border-y-transparent border-l-[4px] border-l-white ml-0.5" />
                          </span>
                          YouTube
                        </span>
                      </div>
                    </div>
                  </>
                )}
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  )}

      {/* =====================================================================
          2️⃣ PARTNER UNIVERSITIES STRIP (Warm Gold/Cream Background #F6E3A3 - Antd Infinite Carousel)
      ===================================================================== */}
      <section className="w-full bg-[#F6E3A3] py-2.5 sm:py-3.5 px-1.5 sm:px-4 border-b border-amber-300/40 overflow-hidden">
        <style>{`
          .partner-antd-carousel .slick-slide > div {
            padding: 0 3px;
          }
          @media (min-width: 640px) {
            .partner-antd-carousel .slick-slide > div {
              padding: 0 4px;
            }
          }
          .partner-antd-carousel .slick-slide {
            height: inherit;
          }

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
        <div className="max-w-7xl mx-auto px-1 sm:px-0">
          <Carousel
            key={`partner-carousel-${partnerSlidesCount}`}
            autoplay={true}
            autoplaySpeed={2500}
            speed={600}
            pauseOnHover={false}
            dots={false}
            infinite={true}
            draggable={true}
            swipeToSlide={true}
            slidesToShow={partnerSlidesCount}
            slidesToScroll={1}
            responsive={[
              { breakpoint: 1280, settings: { slidesToShow: 4, slidesToScroll: 1 } },
              { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
              { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
              { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            ]}
            className="w-full partner-antd-carousel"
          >
            {[
              {
                id: "lpu-1",
                logo: (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="4" fill="white" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                ),
                content: (
                  <div className="leading-tight text-left min-w-0">
                    <div className="font-extrabold text-[10px] sm:text-xs md:text-sm text-slate-900 tracking-tight truncate">
                      <span className="text-orange-600">LPU</span>Online
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-slate-500 font-medium truncate">Same Degree, Now Online.</div>
                    <div className="text-[7px] sm:text-[8px] text-slate-400 truncate">Entitled by UGC</div>
                  </div>
                ),
              },
              {
                id: "manipal-1",
                logo: (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-orange-600" viewBox="0 0 24 24">
                      <path d="M12 2C9 5 8 7.5 8 10c0 2.5 1.8 4 4 4s4-1.5 4-4c0-2.5-1-5-4-8zm-6 9c-1.5 1.5-2 3-2 4.5 0 3 2.5 5.5 6 5.5s6-2.5 6-5.5c0-1.5-.5-3-2-4.5-1 2-2.5 3-4 3s-3-1-4-3z" />
                    </svg>
                  </div>
                ),
                content: (
                  <div className="leading-tight text-left min-w-0">
                    <div className="text-[8px] sm:text-[10px] text-orange-600 font-semibold tracking-wide truncate">Online</div>
                    <div className="font-extrabold text-[10px] sm:text-xs md:text-sm text-slate-900 tracking-tight truncate">MANIPAL</div>
                    <div className="text-[7px] sm:text-[8px] text-slate-400 truncate">UGC Entitled & NAAC A+</div>
                  </div>
                ),
              },
              {
                id: "smu-1",
                logo: (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 shrink-0">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-700" />
                  </div>
                ),
                content: (
                  <div className="leading-tight text-left min-w-0">
                    <div className="font-extrabold text-[10px] sm:text-xs text-red-800 tracking-wider truncate">SMU</div>
                    <div className="text-[8px] sm:text-[9px] font-bold text-slate-700 uppercase tracking-tight truncate">SIKKIM MANIPAL UNIV.</div>
                    <div className="text-[7px] sm:text-[8px] text-slate-400 truncate">(Under Sec 2(f) UGC Act)</div>
                  </div>
                ),
              },
              {
                id: "amity-1",
                logo: (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0F2A4A] flex items-center justify-center text-yellow-400 shrink-0 border border-yellow-400/50">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  </div>
                ),
                content: (
                  <div className="leading-tight text-left min-w-0">
                    <div className="font-black text-[10px] sm:text-xs text-[#0F2A4A] tracking-wider uppercase truncate">AMITY</div>
                    <div className="text-[8px] sm:text-[9px] font-bold text-[#0F2A4A] uppercase tracking-tight truncate">UNIVERSITY ONLINE</div>
                    <div className="text-[7px] sm:text-[8px] text-sky-700 font-semibold uppercase truncate">UGC-DEB APPROVED</div>
                  </div>
                ),
              },
              {
                id: "lpu-2",
                logo: (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="4" fill="white" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                ),
                content: (
                  <div className="leading-tight text-left min-w-0">
                    <div className="font-extrabold text-[10px] sm:text-xs md:text-sm text-slate-900 tracking-tight truncate">
                      <span className="text-orange-600">LPU</span>Online
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-slate-500 font-medium truncate">Same Degree, Now Online.</div>
                    <div className="text-[7px] sm:text-[8px] text-slate-400 truncate">Entitled by UGC</div>
                  </div>
                ),
              },
              {
                id: "manipal-2",
                logo: (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-orange-600" viewBox="0 0 24 24">
                      <path d="M12 2C9 5 8 7.5 8 10c0 2.5 1.8 4 4 4s4-1.5 4-4c0-2.5-1-5-4-8zm-6 9c-1.5 1.5-2 3-2 4.5 0 3 2.5 5.5 6 5.5s6-2.5 6-5.5c0-1.5-.5-3-2-4.5-1 2-2.5 3-4 3s-3-1-4-3z" />
                    </svg>
                  </div>
                ),
                content: (
                  <div className="leading-tight text-left min-w-0">
                    <div className="text-[8px] sm:text-[10px] text-orange-600 font-semibold tracking-wide truncate">Online</div>
                    <div className="font-extrabold text-[10px] sm:text-xs md:text-sm text-slate-900 tracking-tight truncate">MANIPAL</div>
                    <div className="text-[7px] sm:text-[8px] text-slate-400 truncate">UGC Entitled & NAAC A+</div>
                  </div>
                ),
              },
              {
                id: "smu-2",
                logo: (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 shrink-0">
                    <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-700" />
                  </div>
                ),
                content: (
                  <div className="leading-tight text-left min-w-0">
                    <div className="font-extrabold text-[10px] sm:text-xs text-red-800 tracking-wider truncate">SMU</div>
                    <div className="text-[8px] sm:text-[9px] font-bold text-slate-700 uppercase tracking-tight truncate">SIKKIM MANIPAL UNIV.</div>
                    <div className="text-[7px] sm:text-[8px] text-slate-400 truncate">(Under Sec 2(f) UGC Act)</div>
                  </div>
                ),
              },
              {
                id: "amity-2",
                logo: (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0F2A4A] flex items-center justify-center text-yellow-400 shrink-0 border border-yellow-400/50">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                  </div>
                ),
                content: (
                  <div className="leading-tight text-left min-w-0">
                    <div className="font-black text-[10px] sm:text-xs text-[#0F2A4A] tracking-wider uppercase truncate">AMITY</div>
                    <div className="text-[8px] sm:text-[9px] font-bold text-[#0F2A4A] uppercase tracking-tight truncate">UNIVERSITY ONLINE</div>
                    <div className="text-[7px] sm:text-[8px] text-sky-700 font-semibold uppercase truncate">UGC-DEB APPROVED</div>
                  </div>
                ),
              },
            ].map((item, idx) => (
              <div key={`partner-${item.id}-${idx}`} className="py-1 px-1">
                <div className="bg-white rounded-xl shadow-xs px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 flex items-center gap-2 sm:gap-2.5 h-13 sm:h-14 border border-amber-200/60 transition-transform duration-200 hover:scale-[1.02] w-full min-w-0">
                  <div className="shrink-0">{item.logo}</div>
                  <div className="min-w-0 flex-1 text-left">{item.content}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* =====================================================================
          3️⃣ QUICK STATS BAR (Pure White with Vertical Divider Lines)
      ===================================================================== */}
      <section className="w-full bg-white border-b border-slate-200 shadow-xs py-2 sm:py-3">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-0 divide-y-0 md:divide-x divide-slate-200">
            {/* 1. Approvals */}
            <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 bg-slate-50/60 md:bg-transparent rounded-lg md:rounded-none">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] shrink-0 fill-[#0284C7]/20" />
              <div className="leading-tight min-w-0">
                <span className="block text-[10px] sm:text-xs text-slate-500 font-medium">Approvals</span>
                <span className="block text-xs sm:text-sm font-bold text-slate-900 truncate">{approvalsDisplay || "UGC-DEB,AICTE"}</span>
              </div>
            </div>

            {/* 2. Duration */}
            <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 bg-slate-50/60 md:bg-transparent rounded-lg md:rounded-none">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] shrink-0 fill-[#0284C7]/20" />
              <div className="leading-tight min-w-0">
                <span className="block text-[10px] sm:text-xs text-slate-500 font-medium">Duration</span>
                <span className="block text-xs sm:text-sm font-bold text-slate-900 truncate">{durationDisplay || "2 Years"}</span>
              </div>
            </div>

            {/* 3. Eligibility */}
            <div className="flex items-center gap-2.5 px-2.5 sm:px-4 py-1.5 bg-slate-50/60 md:bg-transparent rounded-lg md:rounded-none">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] shrink-0" />
              <div className="leading-tight min-w-0">
                <span className="block text-[10px] sm:text-xs text-slate-500 font-medium">Eligibility</span>
                <span className="block text-xs sm:text-sm font-bold text-slate-900 truncate">{eligibilityDisplay || "Graduation with 50% Marks"}</span>
              </div>
            </div>

            {/* 4. Semester Fees */}
            <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 bg-slate-50/60 md:bg-transparent rounded-lg md:rounded-none">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#0284C7] shrink-0 fill-[#0284C7]/20" />
              <div className="leading-tight min-w-0">
                <span className="block text-[10px] sm:text-xs text-slate-500 font-medium">Semester Fees</span>
                <span className="block text-xs sm:text-sm font-bold text-slate-900 truncate">{feeDisplay || "₹ 24,500 to ₹ 50,500 INR"}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================================
          MAIN CONTENT AREA (White Island Cards on Soft Slate #F4F6F9)
      ===================================================================== */}
      <div className="w-full bg-[#F0F4F8] py-5 sm:py-10">
        <Container>
          {/* =====================================================================
              3️⃣ RANKINGS & ACCREDITATIONS (Screenshot 1)
          ===================================================================== */}
          {accreditations.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-7 mb-6 scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-5">
                {accreditations.title || `Rankings & Accreditations for ${pageTitle}`}
              </h2>

              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3.5">
                {accreditationItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl p-1.5 sm:p-3 flex flex-col items-center justify-between text-center aspect-[4/4.6] sm:aspect-square shadow-2xs hover:border-blue-300 transition-colors overflow-hidden"
                  >
                    <div className="h-12 sm:h-16 flex items-center justify-center">
                      {item.code === "ugc" ? (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-pink-200 bg-pink-50/50 flex flex-col items-center justify-center p-0.5 sm:p-1">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-[#BE185D] flex items-center justify-center">
                            <span className="text-[6px] sm:text-[7px] font-bold text-[#BE185D]">ज्ञान</span>
                          </div>
                          <span className="text-[5px] sm:text-[6px] text-[#BE185D] font-bold mt-0.5 leading-none">ज्ञान-विज्ञान विमुक्तये</span>
                        </div>
                      ) : item.code === "naac" ? (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 flex flex-col items-center justify-center text-white shadow-xs p-0.5 sm:p-1">
                          <span className="text-[11px] sm:text-xs font-black leading-none">A+</span>
                          <span className="text-[7px] sm:text-[8px] font-bold tracking-tight mt-0.5">NAAC</span>
                        </div>
                      ) : item.code === "wasc" ? (
                        <div className="w-12 sm:w-16 h-10 sm:h-12 flex flex-col items-center justify-center">
                          <span className="text-xs sm:text-sm font-black text-[#1E3A8A] tracking-wider leading-none">WASC</span>
                          <span className="text-[5px] sm:text-[6px] text-slate-500 font-semibold text-center leading-tight mt-0.5 sm:mt-1">Senior College</span>
                        </div>
                      ) : item.code === "qs" ? (
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-[#EA580C] flex items-center justify-center text-white shadow-xs">
                          <span className="text-sm sm:text-base font-black tracking-tight">QS</span>
                        </div>
                      ) : item.code === "nirf" ? (
                        <div className="w-12 sm:w-16 h-10 sm:h-12 flex flex-col items-center justify-center">
                          <span className="text-sm sm:text-base font-black text-[#1E3A8A] tracking-wide leading-none">nirf</span>
                          <div className="flex gap-0.5 mt-0.5 sm:mt-1">
                            <div className="w-2 sm:w-2.5 h-1 bg-[#EA580C] rounded-xs" />
                            <div className="w-2 sm:w-2.5 h-1 bg-white border border-slate-300 rounded-xs" />
                            <div className="w-2 sm:w-2.5 h-1 bg-[#16A34A] rounded-xs" />
                          </div>
                        </div>
                      ) : item.code === "wes" ? (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#059669] flex items-center justify-center text-[#059669]">
                          <span className="text-[10px] sm:text-xs font-black tracking-wider">(WES)</span>
                        </div>
                      ) : item.logo ? (
                        <Image
                          src={resolveMediaUrl(item.logo) || "/placeholder.jpg"}
                          alt={item.title}
                          width={44}
                          height={44}
                          className="object-contain max-h-10 sm:max-h-12"
                        />
                      ) : (
                        <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-[#0F2A4A]" />
                      )}
                    </div>
                    <div className="w-full">
                      <h4 className="font-bold text-[10px] sm:text-xs text-slate-900 mb-0.5 sm:mb-1 line-clamp-1">{item.title}</h4>
                      <p className="text-[8px] sm:text-[10px] text-slate-500 font-normal leading-tight line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              4️⃣ OVERVIEW & KEY HIGHLIGHTS (Screenshot 1 & 2 - Combined Card)
          ===================================================================== */}
          {overview.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-5">
                {overview.title || "Overview & Key Highlights"}
              </h2>

              {/* Thin Divider Line */}
              <div className="w-full max-w-2xl mx-auto h-[1px] bg-slate-200 mb-6" />

              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed text-center max-w-4xl mx-auto mb-8">
                {overview.description ? (
                  <SafeHtmlRenderer html={overview.description} />
                ) : (
                  <p>
                    An Online MBA (Master of Business Administration) is a flexible, 2-year postgraduate degree program that teaches business management, leadership, and operational strategies entirely through digital learning platforms. It follows the same core curriculum as a traditional full-time MBA, including finance, marketing, human resources, data analytics, and strategic management, but delivers coursework through live virtual lectures, recorded modules, and an online learning management system (LMS).
                  </p>
                )}
              </div>

              {/* Highlights Comparison Table */}
              <div className="max-w-5xl mx-auto overflow-hidden border border-gray-200 shadow-2xs rounded-lg">
                <Table
                  columns={overviewTableColumns}
                  dataSource={overviewDataSource}
                  pagination={false}
                  size="small"
                  bordered
                  className="course-antd-table w-full"
                />
              </div>
            </div>
          )}

          {/* =====================================================================
              5️⃣ WHY CHOOSE AN ONLINE MBA? (Screenshot 3)
          ===================================================================== */}
          {whyChoose.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20 space-y-5 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-4 sm:mb-6">
                {whyChoose.title || `Why Choose an Online MBA?`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                {whyChoose.subtitle ||
                  "An Online MBA combines academic rigor with complete schedule flexibility, making it an ideal choice for professionals seeking career growth without taking a break from work."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
                {whyChooseCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-blue-100/80 bg-blue-50/20 p-4 sm:p-5 text-center hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-2.5 sm:space-y-3 shadow-2xs"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white text-[#0D5CAD] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                      {card.iconType === "monitor" ? (
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-none stroke-[#0077B6] stroke-2" viewBox="0 0 24 24">
                          <rect x="2" y="3" width="20" height="14" rx="2" />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-[#0077B6]" viewBox="0 0 24 24">
                          <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h10.5a6.5 6.5 0 0 1-.5-2.5c0-1.28.37-2.47 1-3.48-.96-.02-2.02-.02-3-.02zm9-1l-5 2.22v3.78c0 3.1 2.14 5.99 5 6.7 2.86-.71 5-3.6 5-6.7v-3.78L18 12z" />
                        </svg>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              6️⃣ ELIGIBILITY CRITERIA (Screenshot 4)
          ===================================================================== */}
          {eligibility.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20 space-y-5 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-4 sm:mb-6">
                {eligibility.title || `Eligibility Criteria for Online MBA`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                {eligibility.subtitle ||
                  "Admission to an online MBA program is accessible and straightforward, designed to welcome fresh graduates and working professionals through flexible entry criteria."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 gap-5 md:gap-0 py-2">
                {eligibilityCards.map((card, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center px-3 sm:px-6 pt-4 md:pt-0 space-y-2.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white text-[#0D5CAD] flex items-center justify-center shrink-0 border border-blue-100 shadow-2xs">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-[#0077B6]" viewBox="0 0 24 24">
                        <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-2.67 0-8 1.34-8 4v2h10.5a6.5 6.5 0 0 1-.5-2.5c0-1.28.37-2.47 1-3.48-.96-.02-2.02-.02-3-.02zm9-1l-5 2.22v3.78c0 3.1 2.14 5.99 5 6.7 2.86-.71 5-3.6 5-6.7v-3.78L18 12z" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-snug">
                        {card.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              7️⃣ ONLINE MBA ADMISSION PROCESS (Screenshot 5)
          ===================================================================== */}
          {admissionProcess.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 mb-6 scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                {admissionProcess.title || `Online MBA Admission Process`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-8">
                {admissionProcess.subtitle ||
                  "The online MBA admission procedure is streamlined and digital, enabling candidates to secure enrollment smoothly through:"}
              </p>

              {/* 6 Stepper Cards with Arrows */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5 items-stretch w-full">
                {[
                  {
                    num: 1,
                    title: "Fill Out the Application Form",
                    desc: "Complete the online application form with your basic details.",
                    icon: (
                      <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    ),
                  },
                  {
                    num: 2,
                    title: "Course Selection",
                    desc: "Choose your preferred MBA program and specialization.",
                    icon: (
                      <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                    ),
                  },
                  {
                    num: 3,
                    title: "Document Submission",
                    desc: "Upload the required documents as per the guidelines.",
                    icon: (
                      <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M9 15l2 2 4-4" />
                      </svg>
                    ),
                  },
                  {
                    num: 4,
                    title: "Fee Payment",
                    desc: "Make the payment online to confirm your application.",
                    icon: (
                      <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    ),
                  },
                  {
                    num: 5,
                    title: "Verification",
                    desc: "Our team will verify your documents and details.",
                    icon: (
                      <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <polyline points="17 11 19 13 23 9" />
                      </svg>
                    ),
                  },
                  {
                    num: 6,
                    title: "Enrollment & Access",
                    desc: "Once verified, you'll receive your admission confirmation and access to the learning platform.",
                    icon: (
                      <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    ),
                  },
                ].map((step, idx) => (
                  <div key={idx} className="relative flex">
                    <div className="w-full rounded-xl p-2.5 sm:p-3.5 text-center flex flex-col items-center bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">

                      {/* Large icon circle */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 bg-sky-50 border-2 border-sky-300 mb-2 sm:mb-3">
                        <span className="text-sky-500 scale-90 sm:scale-100">{step.icon}</span>
                      </div>

                      {/* Title with Step Number in front */}
                      <h4 className="font-bold text-[10.5px] sm:text-[11.5px] text-[#0F2A4A] leading-snug mb-1 sm:mb-1.5">
                        <span className="text-[#1C3569] font-bold mr-1">{step.num}.</span>
                        {step.title}
                      </h4>

                      {/* Description */}
                      <p className="text-[8.5px] sm:text-[9.5px] text-gray-500 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>

                    {/* Arrow between cards */}
                    {idx < 5 && (
                      <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-sky-400">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              8️⃣ MODE COMPARISON TABLE (Screenshot 5)
          ===================================================================== */}
          {modeComparison.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                {modeComparison.title || `Online MBA vs. Regular MBA vs. Distance MBA`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                {modeComparison.subtitle ||
                  "Comparing key learning formats helps prospective students choose the right MBA pathway based on their lifestyle, budget, and professional goals."}
              </p>

              {/* Comparison Table */}
              <div className="max-w-5xl mx-auto overflow-hidden border border-gray-200 shadow-2xs rounded-lg">
                <Table
                  columns={modeComparisonColumns}
                  dataSource={modeComparisonDataSource}
                  pagination={false}
                  size="small"
                  bordered
                  className="course-antd-table w-full"
                />
              </div>
            </div>
          )}
          {/* =====================================================================
              9️⃣ POPULAR SPECIALIZATIONS SECTION (Screenshot 1)
          ===================================================================== */}
          {specializations.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-3 sm:p-6 mb-5 sm:mb-6 scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-1.5 sm:mb-2">
                {specializations.title || `Popular Online MBA Specializations`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-4 sm:mb-6">
                {specializations.subtitle ||
                  "Choose an online MBA specialization aligned with market demand and your career ambitions to build targeted leadership and functional skills."}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-3">
                {specializationsList.map((spec, idx) => {
                  const isHighlighted = spec.highlighted || spec.name === "Data Science";
                  return (
                    <div
                      key={idx}
                      onClick={() => handleOpenLead(`Specialization: ${spec.name}`, `Enquire for ${spec.name} in ${pageTitle}`)}
                      className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg border flex items-center gap-1.5 sm:gap-2.5 transition-all cursor-pointer shadow-2xs min-h-[42px] sm:min-h-[48px] ${isHighlighted
                        ? "border-[#00BCD4] bg-cyan-50/20 text-[#00838F]"
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-800"
                        }`}
                    >
                      <div className="shrink-0 flex items-center justify-center">
                        {spec.icon === "building" && <Building2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isHighlighted ? "text-[#00BCD4]" : "text-slate-700"}`} />}
                        {spec.icon === "book" && <BookOpen className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isHighlighted ? "text-[#00BCD4]" : "text-slate-700"}`} />}
                        {spec.icon === "cap" && <GraduationCap className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isHighlighted ? "text-[#00BCD4]" : "text-slate-700"}`} />}
                        {spec.icon === "bookmark" && <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00BCD4]" />}
                        {spec.icon === "database" && <Database className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isHighlighted ? "text-[#00BCD4]" : "text-slate-700"}`} />}
                        {spec.icon === "share" && <Share2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isHighlighted ? "text-[#00BCD4]" : "text-slate-700"}`} />}
                        {spec.icon === "cart" && <ShoppingCart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isHighlighted ? "text-[#00BCD4]" : "text-slate-700"}`} />}
                        {spec.icon === "briefcase" && <Briefcase className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isHighlighted ? "text-[#00BCD4]" : "text-slate-700"}`} />}
                        {spec.icon === "ribbon" && <Award className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isHighlighted ? "text-[#00BCD4]" : "text-slate-700"}`} />}
                        {!spec.icon && <Layers className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isHighlighted ? "text-[#00BCD4]" : "text-slate-700"}`} />}
                      </div>
                      <span className={`text-[11px] sm:text-xs font-bold leading-tight line-clamp-2 ${isHighlighted ? "text-[#00838F]" : "text-slate-800"}`}>
                        {spec.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =====================================================================
              🔟 ONLINE MBA SYLLABUS SEMESTER WISE (Screenshot 1)
          ===================================================================== */}
          {syllabus.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 mb-6 scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                {syllabus.title || `Online MBA Syllabus Semester Wise`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                {syllabus.subtitle ||
                  "The Online MBA curriculum spans four semesters, balancing foundational business management principles with advanced specialization courses and capstone projects."}
              </p>

              {/* Semester Pill Tabs matching Screenshot */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
                {syllabusData.map((sem) => {
                  const isActive = activeSemester === sem.semesterNumber;
                  return (
                    <button
                      key={sem.semesterNumber}
                      type="button"
                      onClick={() => setActiveSemester(sem.semesterNumber)}
                      className={`px-4 sm:px-7 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm transition-all duration-150 cursor-pointer ${isActive
                        ? "bg-[#0F2A4A] text-white shadow-xs"
                        : "bg-[#EAF2FA] text-[#0F2A4A] hover:bg-slate-200"
                        }`}
                    >
                      {sem.semesterTitle || `Semester ${sem.semesterNumber}`}
                    </button>
                  );
                })}
              </div>

              {/* Active Semester Subjects Table */}
              <div className="max-w-5xl mx-auto overflow-hidden border border-gray-200 shadow-2xs rounded-lg">
                <Table
                  columns={syllabusColumns}
                  dataSource={syllabusDataSource}
                  pagination={false}
                  size="small"
                  bordered
                  className="course-antd-table w-full"
                />
              </div>
            </div>
          )}

          {/* =====================================================================
              1️⃣1️⃣ TOP UNIVERSITIES OFFERING ONLINE MBA IN INDIA (Screenshot 2)
          ===================================================================== */}
          {topUniversities.enabled !== false && (
            <div className="scroll-mt-20 bg-white rounded-xl border border-gray-200/90 shadow-xs p-5 sm:p-7 md:p-8 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                {topUniversities.title || `Top Universities Offering Online MBA in India`}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6 sm:mb-8">
                {topUniversities.subtitle ||
                  "Compare India's top-ranked online MBA institutions by fee estimates, geographic location, and official regulatory approvals to find your best fit."}
              </p>

              {/* University Cards Grid (Exact CSS from CourseAlternativeUniversities) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {universitiesList.map((uni, idx) => {
                  const inCmp = typeof isInCompare === "function" ? isInCompare(uni._id || uni.slug || uni.name) : false;
                  const coursesOfferedText = uni.programsCount || `${uni.coursesCount || 10}+ Programs`;
                  const uniHref = uni.slug ? `/universities/${uni.slug}` : "#";

                  return (
                    <div
                      key={idx}
                      className={`bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-400 p-2 sm:p-2.5 hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative group min-w-0 shadow-2xs ${idx === 5 ? "flex lg:hidden" : "flex"
                        }`}
                    >
                      {/* Circular Logo Container without border */}
                      <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full p-1 flex items-center justify-center bg-white relative my-0.5 shrink-0 overflow-hidden">
                        {uni.logo ? (
                          <Image
                            src={getAssetPath(uni.logo)}
                            alt={uni.name}
                            fill
                            sizes="56px"
                            className="object-contain"
                          />
                        ) : uni.type === "manipal" ? (
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                            <svg className="w-5 h-5 fill-orange-600" viewBox="0 0 24 24">
                              <path d="M12 2C9 5 8 7.5 8 10c0 2.5 1.8 4 4 4s4-1.5 4-4c0-2.5-1-5-4-8zm-6 9c-1.5 1.5-2 3-2 4.5 0 3 2.5 5.5 6 5.5s6-2.5 6-5.5c0-1.5-.5-3-2-4.5-1 2-2.5 3-4 3s-3-1-4-3z" />
                            </svg>
                          </div>
                        ) : uni.type === "uttaranchal" ? (
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V5s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke="#0284C7" fill="#E0F2FE" />
                            </svg>
                          </div>
                        ) : uni.type === "lpu" ? (
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xs">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                              <circle cx="12" cy="12" r="4" fill="white" />
                              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                        ) : uni.type === "mangalayatan" ? (
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
                            <svg className="w-5 h-5 fill-amber-600" viewBox="0 0 24 24">
                              <path d="M12 2c1.1 0 2 .9 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm-4.9 6.1l1.4 1.4a2 2 0 0 1 0 2.8 2 2 0 0 1-2.8 0L4.3 10.9a2 2 0 0 1 0-2.8 2 2 0 0 1 2.8 0zm9.8 0a2 2 0 0 1 2.8 0 2 2 0 0 1 0 2.8l-1.4 1.4a2 2 0 0 1-2.8 0 2 2 0 0 1 0-2.8l1.4-1.4zM12 10a5 5 0 0 1 5 5v5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-5a5 5 0 0 1 5-5z" />
                            </svg>
                          </div>
                        ) : uni.type === "chandigarh" ? (
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-100 flex items-center justify-center border border-red-200">
                            <span className="text-red-700 font-black text-[10px]">CU</span>
                          </div>
                        ) : uni.type === "jamia" ? (
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-200">
                            <ShieldCheck className="w-5 h-5 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="w-full h-full rounded-full bg-blue-50 text-blue-600 font-semibold flex items-center justify-center text-xs uppercase">
                            {uni.name ? uni.name.charAt(0) : "U"}
                          </div>
                        )}
                      </div>

                      {/* University Name & Courses Count */}
                      <div className="w-full space-y-0.5 my-0.5">
                        <div className="min-h-7 sm:min-h-8 flex items-center justify-center">
                          <Link
                            href={uniHref}
                            className="text-xs sm:text-[12.5px] font-semibold text-[#0a2540] hover:text-blue-600 line-clamp-2 leading-tight m-0 w-full text-center no-underline transition-colors"
                          >
                            {uni.name}
                          </Link>
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-gray-500 font-normal flex items-center justify-center">
                          <span className="truncate">{coursesOfferedText}</span>
                        </div>
                      </div>

                      {/* Full-width Add to Compare Pill */}
                      <button
                        type="button"
                        onClick={() => {
                          toggleCompare(uni);
                          setIsCompareDrawerOpen && setIsCompareDrawerOpen(true);
                        }}
                        className={`w-full py-1 px-2 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all flex items-center justify-center gap-1 border cursor-pointer mt-1 ${inCmp
                          ? "bg-teal-50 text-teal-700 border-teal-600 shadow-2xs"
                          : "bg-white text-[#0a2540] border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                          }`}
                      >
                        {inCmp ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 stroke-2" />
                            <span>Added to Compare</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 text-gray-500 shrink-0 stroke-2" />
                            <span>Add to Compare</span>
                          </>
                        )}
                      </button>

                      {/* Action Buttons: Apply Now & Know More */}
                      <div className="w-full grid grid-cols-2 gap-1.5 mt-1.5 items-center">
                        <button
                          type="button"
                          onClick={() => {
                            openFormModal &&
                              openFormModal({
                                title: `Apply to ${uni.name}`,
                                subtitle: pageTitle,
                                defaultCourse: pageTitle,
                                university: uni.name,
                                formNameOverride: `CourseCard_${uni.slug || uni.name}`,
                                submitButtonText: "Apply Now",
                              });
                          }}
                          className="w-full bg-[#F4D068] hover:bg-[#ebc557] text-gray-900 text-[11px] sm:text-xs font-semibold py-1.5 px-1 rounded-md sm:rounded-lg border-none cursor-pointer transition-colors active:scale-95 flex items-center justify-center text-center whitespace-nowrap leading-none"
                        >
                          Apply Now
                        </button>
                        <Link
                          href={uniHref}
                          className="w-full bg-white hover:bg-gray-50 text-[#0a2540] hover:text-blue-600 border border-gray-200 text-[11px] sm:text-xs font-semibold py-1.5 px-1 rounded-md sm:rounded-lg text-center no-underline transition-colors flex items-center justify-center whitespace-nowrap leading-none"
                        >
                          Know More
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View More Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={() => handleOpenLead("View More Universities", "Explore all partner universities")}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 text-[#0077B6] hover:bg-blue-100 transition-colors text-xs font-semibold border-none cursor-pointer"
                >
                  <span>View More</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              1️⃣2️⃣ CAREER SCOPE & SALARY EXPECTATIONS (Screenshot 2)
          ===================================================================== */}
          {careerScope.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                {careerScope.title || "Career Scope & Salary Expectations"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                {careerScope.subtitle ||
                  "Earning an online MBA significantly elevates your earning potential, preparing graduates for high-paying leadership roles in modern corporate sectors."}
              </p>

              {/* Table 1: Experience Level vs Job Roles vs Expected Salary */}
              <div className="max-w-5xl mx-auto overflow-hidden border border-gray-200 shadow-2xs rounded-lg mb-6">
                <Table
                  columns={careerLevelColumns}
                  dataSource={careerLevelDataSource}
                  pagination={false}
                  size="small"
                  bordered
                  className="course-antd-table w-full"
                />
              </div>

              {/* Sub-paragraph matching Screenshot */}
              <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto my-6">
                Earning an online MBA significantly elevates your earning potential, preparing graduates for high-paying leadership roles in modern corporate sectors.
              </p>

              {/* Table 2: Job Role vs Role Description vs Salary Range in India */}
              <div className="max-w-5xl mx-auto overflow-hidden border border-gray-200 shadow-2xs rounded-lg">
                <Table
                  columns={careerJobRoleColumns}
                  dataSource={careerJobRoleDataSource}
                  pagination={false}
                  size="small"
                  bordered
                  className="course-antd-table w-full"
                />
              </div>

              {/* View More Pill Button */}
              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => handleOpenLead("Explore Career Paths", "Get 1:1 career guidance for Online MBA")}
                  className="bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-semibold text-xs px-4 py-1.5 rounded-full inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>View More</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* =====================================================================
              1️⃣3️⃣ TOP HIRING RECRUITERS (Screenshot 3)
          ===================================================================== */}
          {recruitersSection.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200/90 p-4 sm:p-6 mb-6 scroll-mt-20">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-2">
                {recruitersSection.title || "Top Hiring Recruiters"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-8">
                {recruitersSection.subtitle ||
                  "Leading multinational corporations and top Indian conglomerates actively hire Online MBA graduates across consulting, finance, IT, and retail sectors."}
              </p>

              {/* Recruiters Grid - 2 cols mobile, 3 sm, 6 md */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3.5">
                {recruitersList.map((recruiter, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-1.5 sm:p-2.5 flex items-center justify-center h-12 sm:h-14 bg-white shadow-2xs hover:border-blue-300 hover:shadow-sm transition-all duration-200"
                  >
                    {recruiter.type === "wipro" && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold">🌸</span>
                        <span className="font-bold text-slate-800 text-xs sm:text-sm">wipro</span>
                      </div>
                    )}
                    {recruiter.type === "tatasteel" && (
                      <span className="font-extrabold text-[#00529B] tracking-wider text-xs sm:text-sm">
                        TATA STEEL
                      </span>
                    )}
                    {recruiter.type === "pwc" && (
                      <div className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 bg-orange-600 rounded-xs" />
                        <span className="font-black text-slate-800 text-xs sm:text-sm">pwc</span>
                      </div>
                    )}
                    {recruiter.type === "cisco" && (
                      <div className="flex flex-col items-center">
                        <div className="flex items-end gap-0.5 h-2.5 mb-0.5">
                          <span className="w-0.5 h-1.5 bg-[#049FD9]" />
                          <span className="w-0.5 h-2.5 bg-[#049FD9]" />
                          <span className="w-0.5 h-1 bg-[#049FD9]" />
                          <span className="w-0.5 h-2.5 bg-[#049FD9]" />
                          <span className="w-0.5 h-1.5 bg-[#049FD9]" />
                        </div>
                        <span className="font-bold text-[#049FD9] text-xs">cisco</span>
                      </div>
                    )}
                    {recruiter.type === "apple" && (
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 fill-slate-900" viewBox="0 0 170 170">
                          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.71-7.83-12.04-14.26-6.19-9.18-11.05-19.8-14.57-31.86-3.52-12.07-5.28-23.49-5.28-34.28 0-14.35 3.65-26.24 10.96-35.67 7.31-9.43 16.51-14.28 27.6-14.54 4.79 0 10.22 1.25 16.29 3.76 6.07 2.5 10.05 3.82 11.94 3.94 1.57-.12 5.86-1.52 12.87-4.18 7.02-2.67 13.06-3.88 18.13-3.65 13.57.65 24.32 5.25 32.26 13.79-11.83 7.18-17.61 17.02-17.33 29.53.28 10.02 4.13 18.29 11.56 24.8 7.42 6.51 16.14 10.15 26.15 10.93-2.18 6.53-4.8 13.1-7.87 19.7zm-29.23-118.8c0 6.64-2.4 12.92-7.21 17.84-4.81 4.92-10.74 7.9-17.8 7.9-.26-.88-.39-1.84-.39-2.88 0-6.64 2.53-12.88 7.59-17.72 5.06-4.84 11.03-7.58 17.92-7.22.09.68.14 1.37.14 2.08z" />
                        </svg>
                        <span className="font-semibold text-slate-900 text-xs">Apple</span>
                      </div>
                    )}
                    {recruiter.type === "flipkart" && (
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[#2874F0] text-xs">Flipkart</span>
                        <span className="text-[10px] bg-yellow-400 text-blue-900 px-1 rounded-xs font-black">🛍</span>
                      </div>
                    )}
                    {recruiter.type === "google" && (
                      <div className="font-bold text-xs sm:text-sm tracking-tight flex items-center">
                        <span className="text-[#4285F4]">G</span>
                        <span className="text-[#EA4335]">o</span>
                        <span className="text-[#FBBC05]">o</span>
                        <span className="text-[#4285F4]">g</span>
                        <span className="text-[#34A853]">l</span>
                        <span className="text-[#EA4335]">e</span>
                      </div>
                    )}
                    {recruiter.type === "hcltech" && (
                      <span className="font-black text-[#0066B2] text-xs sm:text-sm">
                        HCLTech
                      </span>
                    )}
                    {recruiter.type === "amazon" && (
                      <div className="flex flex-col items-center leading-none">
                        <span className="font-black text-slate-900 text-xs sm:text-sm">amazon</span>
                        <span className="text-amber-500 font-black text-[9px] -mt-0.5">⌣</span>
                      </div>
                    )}
                    {recruiter.type === "siemens" && (
                      <span className="font-black text-[#00646E] tracking-widest text-xs sm:text-sm">
                        SIEMENS
                      </span>
                    )}
                    {recruiter.type === "kpmg" && (
                      <span className="font-black text-white bg-[#00338D] px-2 py-0.5 rounded-xs tracking-wider text-xs">
                        KPMG
                      </span>
                    )}
                    {recruiter.type === "accenture" && (
                      <span className="font-bold text-slate-900 text-xs">
                        accenture<span className="text-purple-600 font-black ml-0.5">&gt;</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              1️⃣4️⃣ COMMON MISTAKES TO AVOID (Screenshot 4)
          ===================================================================== */}
          {mistakesToAvoid.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20 space-y-5 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-4 sm:mb-6">
                {mistakesToAvoid.title || "Common Mistakes to Avoid"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 text-center max-w-2xl mx-auto mb-6">
                {mistakesToAvoid.subtitle ||
                  "Maximize your Online MBA investment and academic success by avoiding critical errors in university selection, study scheduling, and portal tracking."}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6">
                {mistakesList.map((mstk, idx) => (
                  <div key={idx} className="rounded-xl border border-red-100/80 bg-red-50/20 p-4 sm:p-5 text-center hover:border-red-300 hover:shadow-md transition-all duration-200 flex flex-col items-center space-y-2.5 sm:space-y-3 shadow-2xs">
                    {/* Red Cross Icon */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-2xs">
                      ✕
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm sm:text-base text-gray-900 leading-snug">
                        {mstk.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal">
                        {mstk.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =====================================================================
              1️⃣5️⃣ FREQUENTLY ASKED QUESTIONS (Screenshot 4)
          ===================================================================== */}
          {faqSection.enabled !== false && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4 sm:p-6 md:p-8 mb-6 scroll-mt-20 space-y-5 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0D3B66] tracking-tight text-center mb-4 sm:mb-5">
                {faqSection.title || `FAQs on Online MBA Degree at Manipal University`}
              </h2>

              <div className="space-y-2.5 sm:space-y-3 max-w-5xl mx-auto">
                {faqsList.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  const cleanQuestion = (faq.question || "").replace(/^q\d*[\.\:\s]*/i, "").trim();
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
                      {isOpen && (
                        <div className="p-3 text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal border-t border-blue-100/60 whitespace-pre-line">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </div>


      {/* 17. Raw HTML Fallback if legacy content provided */}
      {page?.content && (
        <section className="py-12 bg-white border-t border-slate-200">
          <Container>
            <SafeHtmlRenderer html={page.content} />
          </Container>
        </section>
      )}
    </div>
  );
}
