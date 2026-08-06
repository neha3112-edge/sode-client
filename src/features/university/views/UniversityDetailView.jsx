"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Breadcrumb, Button, Tooltip, Carousel, Modal } from "antd";
import { SwapOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import {
  MapPin,
  Building2,
  ShieldCheck,
  GraduationCap,
  Download,
  PhoneCall,
  Compass,
  CheckCircle2,
  Award,
  Users,
  BookOpen,
  Laptop,
  Video,
  Network,
  FileText,
  Trophy,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  ArrowRight,
  Search,
  CreditCard,
  Rocket,
  FileCheck,
  MessageSquare,
  Quote,
  Star,
  Plus,
  Minus,
  HelpCircle,
} from "lucide-react";
import { getAssetPath } from "@/lib/utils";
import { useCompare } from "@/context/CompareContext";
import { useFormModal } from "@/context/FormModalContext";

/* =========================================================================
   SINGLE UNIVERSITY STATIC JSON DATA (Banner & About Section Data)
   ========================================================================= */
const SINGLE_UNIVERSITY_DATA = {
  slug: "iim-kozhikode",
  banner: {
    bgImage: "/media/images/2026/08/06/a486553107692d7a397f55f57e802ad8.webp",
    logoImage: "/media/images/2026/08/06/3946f55f9b6d03ebe489c38c698fd231.webp",
    logoAlt: "Indian Institute of Management Kozhikode",
    name: "IIM-Kozhikode",
    subtitle: "Indian Institute Of Management Kozhikode",
    details: [
      {
        id: "location",
        icon: "MapPin",
        label: "Location",
        value: "Kozhikode, Kerala",
      },
      {
        id: "established",
        icon: "Building2",
        label: "Established",
        value: "1987",
      },
      {
        id: "approvals",
        icon: "ShieldCheck",
        label: "Approvals",
        value: "AMBA, EQUIS",
      },
      {
        id: "courses",
        icon: "GraduationCap",
        label: "Courses",
        value: "Certification",
      },
    ],
    buttons: [
      {
        id: "brochure",
        text: "Get Broucher",
        type: "cyan",
        icon: "Download",
        action: "download_brochure",
      },
      {
        id: "counseling",
        text: "Get FREE Counseling",
        type: "navy_outline",
        icon: "PhoneCall",
        action: "open_counseling",
      },
    ],
  },
  aboutSection: {
    title: "About IIM Kozhikode",
    icon: "Compass",
    paragraphs: [
      "Established in 1996, the Indian Institute of Management Kozhikode (IIM Kozhikode) is one of India's premier management institutions, renowned for its academic excellence, innovative teaching methodologies, and impactful research. As one of the leading Indian Institutes of Management, the institute has consistently contributed to developing future business leaders and decision-makers.",
      "Located in the scenic city of Kozhikode, Kerala, IIM Kozhikode offers a diverse portfolio of management programmes ranging from postgraduate education to executive development and professional certification courses. The institute has earned recognition for integrating technology-driven learning with practical business insights, enabling professionals to enhance their skills without interrupting their careers.",
      "Through its Executive Education initiatives, IIM Kozhikode provides industry-relevant certification programmes designed to address emerging business challenges. The Professional Certificate Programme in HR Management and Analytics and the Professional Certificate Programme in AI for Business Professionals are examples of this commitment, focusing on strategic leadership, data-driven decision-making, and digital transformation.",
    ],
    whyChooseTitle: "Why Professionals Choose IIM Kozhikode",
    whyChooseList: [
      { text: "Premier management institute in India", icon: "Trophy" },
      { text: "Experienced faculty with industry expertise", icon: "Users" },
      { text: "Industry-oriented curriculum", icon: "BookOpen" },
      { text: "Flexible online learning format", icon: "Laptop" },
      { text: "Interactive live sessions", icon: "Video" },
      { text: "Executive alumni networking opportunities (where applicable)", icon: "Network" },
      { text: "Practical case-based learning", icon: "FileText" },
      { text: "Strong reputation among employers", icon: "Building2" },
    ],
  },
  highlightsSection: {
    title: "University Highlights",
    icon: "Sparkles",
    headers: ["Particular", "Details"],
    rows: [
      { particular: "University Name", details: "Indian Institute of Management Kozhikode" },
      { particular: "Established", details: "1996" },
      { particular: "Institute Type", details: "Autonomous Management Institute" },
      { particular: "Location", details: "Kozhikode, Kerala" },
      { particular: "Learning Mode", details: "Live Online" },
      { particular: "Programme Category", details: "Executive Education" },
      { particular: "Online Courses Available", details: "Professional Certificate Programmes" },
      { particular: "Best for", details: "Working Professionals" },
      { particular: "Learning Resources", details: "Live Classes, Case Studies, Assignments, Digital Learning Platform" },
      { particular: "Certification", details: "Executive Education Certificate" },
    ],
  },
  accreditationsSection: {
    title: "Approvals & Accreditations",
    icon: "ShieldCheck",
    description: "IIM Kozhikode enjoys a strong reputation for academic excellence and quality management education. Its executive education programmes are designed and delivered under the institute's academic standards, ensuring participants receive high-quality professional learning.",
    logos: [
      {
        id: 1,
        image: "/media/images/2026/07/20/2e7de252e6d345b86571c142c055aed8.png",
        alt: "IIM Kozhikode Accreditation Logo 1",
      },
      {
        id: 2,
        image: "/media/images/2026/07/20/7a8fea0dd6d84fefec059ef5150d4425.png",
        alt: "IIM Kozhikode Accreditation Logo 2",
      },
      {
        id: 3,
        image: "/media/images/2026/07/20/e16c87c225ddd029f593e6ac77855398.png",
        alt: "IIM Kozhikode Accreditation Logo 3",
      },
    ],
  },
  coursesSection: {
    title: "Courses Offered",
    icon: "GraduationCap",
    description: "IIM Kozhikode currently offers specialised online professional certificate programmes designed to meet the growing demand for analytical, technological, and strategic business skills.",
    list: [
      {
        id: 1,
        title: "Professional Certificate Programme in HR Management and Analytics",
        image: "/media/images/2026/08/06/a486553107692d7a397f55f57e802ad8.webp",
        description: "This programme is designed for HR professionals, business managers, and aspiring HR leaders who want to leverage analytics to make strategic workforce decisions.",
        duration: "Approximately 6 Months",
        mode: "Live Online Sessions",
        badge: "Top Rated",
        slug: "hr-management-analytics",
      },
      {
        id: 2,
        title: "Professional Certificate Programme in AI for Business Professionals",
        image: "/media/images/2026/08/06/a486553107692d7a397f55f57e802ad8.webp",
        description: "Artificial Intelligence is rapidly transforming how organisations make decisions, optimise operations, and drive innovation. This programme equips professionals with the knowledge to understand, evaluate, and apply AI technologies in real-world business scenarios.",
        duration: "Approximately 6 Months",
        mode: "Live Online Sessions",
        badge: "High Demand",
        slug: "ai-for-business-professionals",
      },
      {
        id: 3,
        title: "Senior Management Programme (SMP) - Executive Leadership",
        image: "/media/images/2026/08/06/a486553107692d7a397f55f57e802ad8.webp",
        description: "Designed for senior executives and business heads seeking to sharpen strategic vision, drive organizational transformation, and master cross-functional leadership in competitive global markets.",
        duration: "Approximately 1 Year",
        mode: "Live Virtual + Campus Immersion",
        badge: "Executive",
        slug: "senior-management-programme",
      },
      {
        id: 4,
        title: "Professional Certificate Programme in FinTech & Digital Banking",
        image: "/media/images/2026/08/06/a486553107692d7a397f55f57e802ad8.webp",
        description: "Gain cutting-edge expertise in Blockchain, AI in Banking, Open Financial Systems, and Digital Payments to lead financial innovation in modern banking enterprises.",
        duration: "Approximately 9 Months",
        mode: "Live Online Sessions",
        badge: "Trending",
        slug: "fintech-digital-banking",
      },
    ],
  },
  admissionProcessSection: {
    title: "Admission Process",
    icon: "FileCheck",
    description: "Enrolling in an IIM Kozhikode Online Professional Certificate Programme is designed to be simple and convenient. Interested candidates can complete the admission process online by following the steps below.",
    steps: [
      {
        step: "1",
        title: "Explore the Programme",
        description: "Review the programme curriculum, eligibility criteria, learning outcomes, duration, and fee structure to choose the certification that best aligns with your career goals.",
        icon: "Search",
        theme: {
          bg: "bg-orange-50/50 hover:bg-orange-50/90",
          border: "border-orange-200/80 hover:border-orange-300",
          badgeBorder: "border-orange-500 text-orange-600",
          accentBg: "bg-gradient-to-r from-orange-400 to-amber-500",
          shadow: "hover:shadow-orange-100",
        },
      },
      {
        step: "2",
        title: "Submit Your Application",
        description: "Complete the online application form with your personal, academic, and professional details.",
        icon: "FileText",
        theme: {
          bg: "bg-blue-50/50 hover:bg-blue-50/90",
          border: "border-blue-200/80 hover:border-blue-300",
          badgeBorder: "border-blue-500 text-blue-600",
          accentBg: "bg-gradient-to-r from-blue-500 to-cyan-500",
          shadow: "hover:shadow-blue-100",
        },
      },
      {
        step: "3",
        title: "Document Verification",
        description: "Upload the required documents for verification. The admissions team reviews your application to ensure eligibility.",
        icon: "ShieldCheck",
        theme: {
          bg: "bg-pink-50/50 hover:bg-pink-50/90",
          border: "border-pink-200/80 hover:border-pink-300",
          badgeBorder: "border-pink-500 text-pink-600",
          accentBg: "bg-gradient-to-r from-pink-500 to-rose-500",
          shadow: "hover:shadow-pink-100",
        },
      },
      {
        step: "4",
        title: "Admission Confirmation",
        description: "Eligible candidates receive an admission offer along with payment instructions and batch details.",
        icon: "CheckCircle2",
        theme: {
          bg: "bg-emerald-50/50 hover:bg-emerald-50/90",
          border: "border-emerald-200/80 hover:border-emerald-300",
          badgeBorder: "border-emerald-500 text-emerald-600",
          accentBg: "bg-gradient-to-r from-emerald-500 to-teal-500",
          shadow: "hover:shadow-emerald-100",
        },
      },
      {
        step: "5",
        title: "Fee Payment",
        description: "Pay the programme fee through the available payment options. EMI facilities may be available for eligible applicants.",
        icon: "CreditCard",
        theme: {
          bg: "bg-purple-50/50 hover:bg-purple-50/90",
          border: "border-purple-200/80 hover:border-purple-300",
          badgeBorder: "border-purple-500 text-purple-600",
          accentBg: "bg-gradient-to-r from-purple-500 to-indigo-500",
          shadow: "hover:shadow-purple-100",
        },
      },
      {
        step: "6",
        title: "Start Learning",
        description: "Once enrolled, you'll receive access to the learning platform, programme schedule, study resources, and live online sessions.",
        icon: "Rocket",
        theme: {
          bg: "bg-amber-50/50 hover:bg-amber-50/90",
          border: "border-amber-200/80 hover:border-amber-300",
          badgeBorder: "border-amber-500 text-amber-600",
          accentBg: "bg-gradient-to-r from-amber-500 to-yellow-500",
          shadow: "hover:shadow-amber-100",
        },
      },
    ],
  },
  methodologySection: {
    title: "Learning Methodology",
    icon: "BookOpen",
    description: "IIM Kozhikode's Executive Education programmes are designed to provide an engaging and flexible learning experience for working professionals. The curriculum combines academic excellence with practical business applications to ensure participants gain knowledge that can be immediately applied in the workplace.",
    featuresTitle: "Key Learning Features",
    features: [
      { text: "Live online classes conducted by experienced faculty", icon: "Video" },
      { text: "Interactive classroom discussions", icon: "Users" },
      { text: "Real-world business case studies", icon: "FileText" },
      { text: "Industry-oriented assignments", icon: "BookOpen" },
      { text: "Digital learning platform with study resources", icon: "Laptop" },
      { text: "Collaborative peer learning", icon: "Network" },
      { text: "Practical business applications", icon: "Building2" },
      { text: "Capstone projects (where applicable)", icon: "Trophy" },
      { text: "Continuous assessments and quizzes", icon: "Award" },
      { text: "Dedicated learner support", icon: "PhoneCall" },
    ],
    outro: "The programmes encourage participants to apply concepts to real business scenarios, helping them develop strategic thinking and problem-solving skills.",
  },
  certificateSection: {
    title: "Executive Education Certificate from IIM Kozhikode",
    icon: "Award",
    description: "Upon successful completion of the programme and fulfilment of the academic requirements, participants receive a Professional Certificate issued by IIM Kozhikode under its Executive Education initiatives. The certificate demonstrates that the learner has completed a structured programme from one of India's leading management institutions.",
    benefitsTitle: "Certificate Benefits",
    benefits: [
      "Recognition from a premier management institute",
      "Demonstrates professional upskilling",
      "Enhances career credibility",
      "Strengthens professional profile",
      "Valuable addition to resumes and LinkedIn profiles",
      "Reflects commitment to continuous learning",
    ],
    note: "Note: The certificate is awarded upon successful completion of all programme requirements. The exact certificate format and award criteria are governed by IIM Kozhikode's programme policies.",
    sampleImage: "/media/images/2026/08/03/f954d0e53a0f766ca384fdda96e1de01.webp",
  },
  reviewsSection: {
    title: "Student Reviews & Testimonials",
    icon: "MessageSquare",
    description: "Professionals who pursue executive education programmes from IIM Kozhikode often appreciate the balance between academic rigor and practical business learning. The programmes are designed to fit the schedules of working professionals while maintaining high academic standards.",
    valuesTitle: "What Learners Value",
    values: [
      "Industry-focused curriculum",
      "Experienced faculty members",
      "Interactive live sessions",
      "Practical business case studies",
      "Flexible online learning",
      "Networking with professionals from diverse industries",
    ],
    testimonialsTitle: "Sample Testimonials",
    testimonials: [
      {
        id: 1,
        quote: "The programme helped me understand how analytics can improve HR decision-making. The live sessions and case studies made the learning experience highly practical.",
        author: "Rahul Sharma",
        role: "HR Professional",
        rating: 5,
        course: "HR Management & Analytics",
        avatar: "/media/images/2026/07/30/15126164a42947040644b380a66f9994.png",
      },
      {
        id: 2,
        quote: "The AI for Business programme provided valuable insights into how AI can transform business operations. The curriculum was relevant and easy to relate to my day-to-day work.",
        author: "Ananya Verma",
        role: "Senior Business Manager",
        rating: 5,
        course: "AI for Business Professionals",
        avatar: "/media/images/2026/07/30/15126164a42947040644b380a66f9994.png",
      },
      {
        id: 3,
        quote: "Learning from IIM Kozhikode faculty while continuing my full-time job was an excellent experience. The programme offered both flexibility and quality.",
        author: "Vikram Nair",
        role: "Working Professional",
        rating: 5,
        course: "Executive Leadership (SMP)",
        avatar: "/media/images/2026/07/30/15126164a42947040644b380a66f9994.png",
      },
      {
        id: 4,
        quote: "The case-based teaching methodology and peer discussions gave me a broader strategic perspective that accelerated my career growth immensely.",
        author: "Pooja Deshmukh",
        role: "Product Manager",
        rating: 5,
        course: "FinTech & Digital Banking",
        avatar: "/media/images/2026/07/30/15126164a42947040644b380a66f9994.png",
      },
      {
        id: 5,
        quote: "Exceptional curriculum structure and seamless online learning LMS. Applying the concepts at my current workplace yielded immediate results.",
        author: "Siddharth Mehta",
        role: "Operations Lead",
        rating: 5,
        course: "HR Management & Analytics",
        avatar: "/media/images/2026/07/30/15126164a42947040644b380a66f9994.png",
      },
    ],
  },
  exploreUniversitiesSection: {
    title: "Explore Other Top IIM/IIT Offering Online Certification Programmes",
    icon: "Building2",
    description: "If you're exploring executive education and professional certification programmes, you may also consider other leading management institutions in India.",
    universities: [
      { id: 1, name: "IIM Bangalore", slug: "iim-bangalore", logo: "/media/images/2026/07/24/477e80ccb685b4a0590e8475bc8fbd9e.png" },
      { id: 2, name: "IIM Udaipur", slug: "iim-udaipur", logo: "/media/images/2026/07/24/7bf70b1cae940ecb3d98cc859ad4585c.png" },
      { id: 3, name: "IIM Lucknow", slug: "iim-lucknow", logo: "/media/images/2026/07/24/6eb0fc06ff81fa2a7016eeb41f5b4219.png" },
      { id: 4, name: "IIM Nagpur", slug: "iim-nagpur", logo: "/media/images/2026/07/24/8d4efc2dc939b737dfd186a3be88c4c8.png" },
      { id: 5, name: "IIM Indore", slug: "iim-indore", logo: "/media/images/2026/07/24/45f90623ce605ff8017abcdb72243702.png" },
      { id: 6, name: "Edgewood University", slug: "edgewood-university", logo: "/media/images/2026/07/24/d4592e843e80a6204a545f4c17f09813.png" },
      { id: 7, name: "ESGCI, Paris", slug: "esgci-paris", logo: "/media/images/2026/07/24/91c655cad758b7da0c09b8e68724a9e7.png" },
      { id: 8, name: "Golden Gate University", slug: "golden-gate-university", logo: "/media/images/2026/07/24/f81cb5b6cb8db725d08c7b7b4803c1dc.png" },
      { id: 9, name: "Liverpool Business School", slug: "liverpool-business-school", logo: "/media/images/2026/07/24/d700ca488bb887d24e5a91c3822ce222.png" },
    ],
  },
  faqSection: {
    title: "Frequently Asked Questions",
    icon: "HelpCircle",
    faqs: [
      {
        question: "1. Is IIM Kozhikode a recognised management institute?",
        answer: "Yes. IIM Kozhikode is one of India's premier management institutions and is widely recognised for its academic excellence and executive education programmes.",
      },
      {
        question: "2. Are these programmes conducted online?",
        answer: "Yes. Both Professional Certificate Programmes are delivered in an online learning format, making them suitable for working professionals.",
      },
      {
        question: "3. Who should apply for these programmes?",
        answer: "These programmes are ideal for working professionals, managers, entrepreneurs, consultants, and individuals looking to upgrade their professional skills.",
      },
      {
        question: "4. Will I receive a certificate from IIM Kozhikode?",
        answer: "Yes. Eligible participants who successfully complete the programme receive an Executive Education Certificate from IIM Kozhikode, subject to the programme's completion requirements.",
      },
      {
        question: "5. What is the duration of these programmes?",
        answer: "The duration varies by programme and batch. Applicants should check the latest programme details before applying.",
      },
      {
        question: "6. Are live classes recorded?",
        answer: "Programme-specific policies regarding recorded sessions may vary. Candidates should refer to the latest programme guidelines.",
      },
      {
        question: "7. Is EMI available?",
        answer: "Yes. EMI or flexible payment options may be available depending on the programme and payment partner.",
      },
      {
        question: "8. Can working professionals attend these programmes?",
        answer: "Absolutely. The programmes are specifically designed to accommodate the schedules of working professionals.",
      },
      {
        question: "9. What is the admission process?",
        answer: "Candidates need to submit an online application, complete document verification, and pay the programme fee after receiving admission confirmation.",
      },
      {
        question: "10. Will these programmes help in career growth?",
        answer: "Yes. The programmes focus on enhancing practical business skills, strategic thinking, and leadership capabilities, which can support career advancement and professional development.",
      },
    ],
  },
};

// Dynamic Icon Helper
const ICON_MAP = {
  MapPin,
  Building2,
  ShieldCheck,
  GraduationCap,
  Download,
  PhoneCall,
  Compass,
  CheckCircle2,
  Award,
  Users,
  BookOpen,
  Laptop,
  Video,
  Network,
  FileText,
  Trophy,
  Sparkles,
  Search,
  CreditCard,
  Rocket,
  FileCheck,
  MessageSquare,
  Quote,
  Star,
  HelpCircle,
};

function DynamicIcon({ name, className = "w-5 h-5" }) {
  const Component = ICON_MAP[name] || HelpCircle;
  return <Component className={className} />;
}

function formatTwoLineText(name) {
  if (!name || typeof name !== "string") return name;
  const words = name.trim().split(/\s+/);
  if (words.length <= 1) return name;

  const mid = Math.ceil(words.length / 2);
  const line1 = words.slice(0, mid).join(" ");
  const line2 = words.slice(mid).join(" ");

  return (
    <span className="flex flex-col items-center justify-center leading-tight">
      <span className="block truncate max-w-full">{line1}</span>
      <span className="block truncate max-w-full mt-0.5">{line2}</span>
    </span>
  );
}

function PartnerLogoIcon({ partner }) {
  const [imgError, setImgError] = useState(false);

  let rawUrl = null;
  if (partner) {
    rawUrl =
      partner.logoUrl ||
      partner.logoSrc ||
      partner.logo ||
      partner.imageSrc ||
      partner.image ||
      partner.badge ||
      partner.icon;

    if (typeof rawUrl === "object") {
      rawUrl = rawUrl.url || rawUrl.src || rawUrl.path || null;
    }
  }

  const logoUrl = rawUrl ? getAssetPath(rawUrl, null) : null;
  const nameToDisplay =
    partner?.name ||
    partner?.title ||
    partner?.label ||
    partner?.fullname ||
    "U";

  if (logoUrl && !imgError) {
    return (
      <div className="w-8 h-8 min-[360px]:w-9 min-[360px]:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 relative shrink-0">
        <Image
          src={logoUrl}
          alt={nameToDisplay}
          fill
          sizes="48px"
          unoptimized
          className="object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-xs sm:text-sm shadow-xs border border-blue-100">
      {nameToDisplay.charAt(0).toUpperCase()}
    </div>
  );
}

const NAV_SECTIONS = [
  { id: "section-about", label: "About" },
  { id: "section-features", label: "Key Features" },
  { id: "section-approvals", label: "Approvals" },
  { id: "section-courses", label: "Courses" },
  { id: "section-admission", label: "Admission Process" },
  { id: "section-learning-methodology", label: "Methodology" },
  { id: "section-certificate", label: "Certificate" },
  { id: "section-reviews", label: "Reviews" },
  { id: "section-explore", label: "Other IIMs" },
  { id: "section-faqs", label: "FAQs" },
];

export default function UniversityDetailView({ slug: propSlug }) {
  const params = useParams();
  const router = useRouter();
  const slug = propSlug || params?.slug || "iim-kozhikode";
  const { isInCompare, toggleCompare } = useCompare();
  const { openFormModal } = useFormModal();

  // Pure static JSON data
  const data = SINGLE_UNIVERSITY_DATA;

  const courseSliderRef = useRef(null);
  const reviewSliderRef = useRef(null);
  const exploreSliderRef = useRef(null);
  const [dynamicUniversities, setDynamicUniversities] = useState([]);
  const [slidesToShowCount, setSlidesToShowCount] = useState(8);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);

  // Active section for ScrollSpy & Sticky Tab Navigation
  const [activeSection, setActiveSection] = useState("section-about");
  const [showTopBar, setShowTopBar] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const navContainerRef = useRef(null);
  const tabRefs = useRef({});
  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const checkNavScroll = useCallback(() => {
    const el = navContainerRef.current;
    if (el) {
      const scrollLeft = Math.ceil(el.scrollLeft);
      const clientWidth = el.clientWidth;
      const scrollWidth = el.scrollWidth;

      setCanScrollLeft(scrollLeft > 3);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 3);
    }
  }, []);

  useEffect(() => {
    checkNavScroll();
    const el = navContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkNavScroll, { passive: true });
      window.addEventListener("resize", checkNavScroll);
      return () => {
        el.removeEventListener("scroll", checkNavScroll);
        window.removeEventListener("resize", checkNavScroll);
      };
    }
  }, [showTopBar, checkNavScroll]);

  const scrollNavTabs = (direction) => {
    const el = navContainerRef.current;
    if (el) {
      const scrollAmount = direction === "left" ? -220 : 220;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkNavScroll, 50);
      setTimeout(checkNavScroll, 200);
      setTimeout(checkNavScroll, 400);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Show top bar only after scrolling past hero banner (~320px)
      if (scrollPosition > 320) {
        setShowTopBar(true);
      } else {
        setShowTopBar(false);
      }

      // Only update activeSection via ScrollSpy if user is manually scrolling
      if (!isManualScrollingRef.current) {
        const offset = 120;
        const sectionElements = NAV_SECTIONS.map((sec) =>
          document.getElementById(sec.id)
        ).filter(Boolean);

        let currentSection = NAV_SECTIONS[0].id;
        for (let i = 0; i < sectionElements.length; i++) {
          const el = sectionElements[i];
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset) {
            currentSection = el.id;
          }
        }
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeTabEl = tabRefs.current[activeSection];
    if (activeTabEl && navContainerRef.current) {
      activeTabEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setTimeout(checkNavScroll, 350);
    }
  }, [activeSection]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      // Instantly switch active blue line to clicked tab!
      setActiveSection(id);
      isManualScrollingRef.current = true;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      scrollTimeoutRef.current = setTimeout(() => {
        isManualScrollingRef.current = false;
      }, 700);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      if (w < 640) {
        setSlidesToShowCount(3);
      } else if (w < 768) {
        setSlidesToShowCount(5);
      } else if (w < 1024) {
        setSlidesToShowCount(6);
      } else if (w < 1280) {
        setSlidesToShowCount(7);
      } else {
        setSlidesToShowCount(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollCourses = (direction) => {
    if (courseSliderRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      courseSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollReviews = (direction) => {
    if (reviewSliderRef.current) {
      const scrollAmount = direction === "left" ? -450 : 450;
      reviewSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const scrollExplore = (direction) => {
    if (exploreSliderRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      exploreSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // CTA button triggers
  const handleBrochureClick = () => {
    openFormModal({
      title: `Download Official Brochure - ${data.banner.name}`,
      subtitle: "Enter your details to receive the comprehensive course guide on WhatsApp.",
      isBrochureForm: true,
      brochureUrl: data.banner.buttons.find((b) => b.id === "brochure")?.brochureUrl || "",
      defaultCourse: `${data.banner.name} Programs`,
    });
  };

  const handleCounselingClick = () => {
    openFormModal({
      title: "Get 100% Free Counseling",
      subtitle: `Speak with ${data.banner.name} admissions expert for course selection & fees.`,
      defaultCourse: `${data.banner.name} Programs`,
      submitButtonText: "Book Free Session",
    });
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-6 md:py-10 px-3 sm:px-6 md:px-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

        {/* Navigation & Header Controls */}
        <div className="hidden md:flex sm:flex-row sm:items-center justify-between gap-4">
          <Breadcrumb
            items={[
              { title: <Link href="/" className="text-slate-600 hover:text-blue-600">Home</Link> },
              { title: <Link href="/universities" className="text-slate-600 hover:text-blue-600">Universities</Link> },
              { title: <span className="font-semibold text-slate-900">{data.banner.name}</span> },
            ]}
          />
          <div className="inline-flex items-center gap-2.5">
            <Button
              type={isInCompare(slug) ? "default" : "dashed"}
              onClick={() => toggleCompare({ ...data.banner, slug })}
              icon={<SwapOutlined className={isInCompare(slug) ? "text-amber-600" : ""} />}
              className={`font-semibold rounded-xl h-9 px-3.5 text-xs cursor-pointer ${isInCompare(slug)
                ? "border-amber-500 bg-amber-50 text-amber-800 font-bold"
                : "border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600"
                }`}
            >
              {isInCompare(slug) ? "In Compare Bucket ✓" : "+ Add to Compare"}
            </Button>

            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push("/universities")}
              className="flex items-center font-semibold rounded-xl h-9 px-3.5 text-xs text-slate-700 border-slate-300 hover:text-blue-600 cursor-pointer"
            >
              Back to List
            </Button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BANNER SECTION                                             */}
        {/* ========================================================= */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-[#0f3a5d]">
          {/* Main Campus Background Image Container */}
          <div className="relative h-64 sm:h-72 md:h-[320px] lg:h-[360px] w-full overflow-hidden bg-slate-300">
            <img
              src={getAssetPath(data.banner.bgImage)}
              alt={data.banner.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f3a5d]/10 to-[#0f3a5d]" />

            {/* Top-Left Floating White Logo Card */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-white p-2 rounded-2xl shadow-xl border border-slate-100/90 max-w-[210px] sm:max-w-[300px] md:max-w-[290px]">
              <img
                src={getAssetPath(data.banner.logoImage)}
                alt={data.banner.logoAlt}
                className="h-16 sm:h-12 md:h-20 w-auto object-contain block"
              />
            </div>
          </div>

          {/* Bottom Ocean-Blue Content Section */}
          <div className="bg-[#0f3a5d] text-white px-6 py-6 md:px-10 md:py-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

              {/* Left Column: Heading, Subtitle & Metadata Grid */}
              <div className="space-y-3.5 max-w-3xl">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-white tracking-tight leading-none m-0">
                    {data.banner.name}
                  </h1>
                  <p className="text-slate-200 text-sm sm:text-base font-normal mt-2 m-0 opacity-90">
                    {data.banner.subtitle}
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-3">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
                    <MapPin className="w-5 h-5 text-white shrink-0" />
                    <span>
                      <strong className="font-bold text-[#EEDE9F]">Location:</strong> Kozhikode, Kerala
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
                    <ShieldCheck className="w-5 h-5 text-white shrink-0" />
                    <span>
                      <strong className="font-bold text-[#EEDE9F]">Approvals :</strong> AMBA, EQUIS
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
                    <Building2 className="w-5 h-5 text-white shrink-0" />
                    <span>
                      <strong className="font-bold text-[#EEDE9F]">Established:</strong> 1987
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white font-medium">
                    <GraduationCap className="w-5 h-5 text-white shrink-0" />
                    <span>
                      <strong className="font-bold text-[#EEDE9F]">Courses :</strong> Certification
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Action Buttons */}
              <div className="flex flex-row lg:flex-row items-stretch sm:items-center gap-2 md:gap-3.5 shrink-0 pt-2 lg:pt-0">
                <button
                  onClick={handleBrochureClick}
                  className="bg-[#00aeed] hover:bg-[#009bd4] text-white font-medium md:font-bold text-xs sm:text-sm px-3 py-2 md:px-8 md:py-3.5 rounded-full flex items-center justify-center gap-0.5 md:gap-2.5 shadow-lg transition-all duration-200 cursor-pointer border-none active:scale-[0.98]"
                >
                  <span>Get Broucher</span>
                  <Download className="w-4 h-4 stroke-[2.5]" />
                </button>

                <button
                  onClick={handleCounselingClick}
                  className="bg-[#123656] hover:bg-[#184268] border border-white/90 hover:border-white text-white font-medium md:font-bold text-xs sm:text-sm px-3 py-2 md:px-8 md:py-3.5 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-[0.98]"
                >
                  <span>Get Free Counseling</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ANIMATED FIXED TOP BAR (HIDDEN INITIALLY, SLIDES DOWN ON SCROLL) */}
        {/* ========================================================= */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-md transition-all duration-300 transform ${showTopBar
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
            }`}
        >
          <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 relative">
            {/* Left Scroll Arrow (Visible if content is scrolled right) */}
            {canScrollLeft && (
              <button
                onClick={() => scrollNavTabs("left")}
                aria-label="Scroll Tabs Left"
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#0c3058] shadow-md border border-slate-200 flex items-center justify-center hover:bg-blue-50 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}

            {/* Right Scroll Arrow (Visible if content available to scroll on right) */}
            {canScrollRight && (
              <button
                onClick={() => scrollNavTabs("right")}
                aria-label="Scroll Tabs Right"
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#0c3058] shadow-md border border-slate-200 flex items-center justify-center hover:bg-blue-50 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}

            <div
              ref={navContainerRef}
              className="flex items-center gap-1 sm:gap-3 overflow-x-auto scrollbar-none scroll-smooth whitespace-nowrap py-0.5 px-2"
            >
              {NAV_SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;

                return (
                  <button
                    key={sec.id}
                    ref={(el) => (tabRefs.current[sec.id] = el)}
                    onClick={() => scrollToSection(sec.id)}
                    className={`relative px-3.5 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold transition-colors duration-200 cursor-pointer shrink-0 border-none bg-transparent select-none ${isActive
                      ? "text-[#0c3058]"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    <span>{sec.label}</span>
                    {/* Active Underline Line Indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0c3058] rounded-t-full transition-all duration-300" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 2: ABOUT IIM KOZHIKODE CARD                        */}
        {/* ========================================================= */}
        <div id="section-about" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
              <DynamicIcon name={data.aboutSection.icon} className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
              {data.aboutSection.title}
            </h2>
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-4 text-slate-600 text-xs md:text-base leading-relaxed">
            {data.aboutSection.paragraphs.map((p, idx) => (
              <p key={idx} className="m-0">
                {p}
              </p>
            ))}
          </div>

          {/* Why Choose Sub-Section */}
          <div id="section-why-choose" className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-[#0c3058]">
              {data.aboutSection.whyChooseTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.aboutSection.whyChooseList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 px-3.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs sm:text-sm text-slate-700 font-medium hover:border-blue-200 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-100/70 text-[#0c3058] flex items-center justify-center shrink-0">
                    <DynamicIcon name={item.icon} className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 3: UNIVERSITY HIGHLIGHTS TABLE CARD               */}
        {/* ========================================================= */}
        <div id="section-features" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
              <DynamicIcon name={data.highlightsSection.icon} className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
              {data.highlightsSection.title}
            </h2>
          </div>

          {/* Highlights Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-[#0c3058] text-white text-xs sm:text-sm font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4 md:px-6 w-2/5 border-r border-white/10">
                      {data.highlightsSection.headers[0]}
                    </th>
                    <th className="py-3.5 px-4 md:px-6 w-3/5">
                      {data.highlightsSection.headers[1]}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {data.highlightsSection.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/70" : "bg-slate-50/50 hover:bg-slate-50/80"}
                    >
                      <td className="py-3.5 px-4 md:px-6 font-bold text-[#0c3058] border-r border-slate-100">
                        {row.particular}
                      </td>
                      <td className="py-3.5 px-4 md:px-6 font-medium text-slate-700 leading-relaxed">
                        {row.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 4: APPROVALS & ACCREDITATIONS CARD                */}
        {/* ========================================================= */}
        <div id="section-approvals" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
              <DynamicIcon name={data.accreditationsSection.icon} className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
              {data.accreditationsSection.title}
            </h2>
          </div>

          {/* Description Paragraph */}
          <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0">
            {data.accreditationsSection.description}
          </p>

          {/* Accreditation Logos Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-8 gap-4 pt-6">
            {data.accreditationsSection.logos.map((logo) => (
              <div
                key={logo.id}
                className="bg-slate-50/80 p-2 sm:p-3 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex items-center justify-center h-20 md:h-24"
              >
                <img
                  src={getAssetPath(logo.image)}
                  alt={logo.alt}
                  className="max-h-16 sm:max-h-26 max-w-full object-contain block"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 5: COURSES OFFERED CARD & SLIDER                  */}
        {/* ========================================================= */}
        <div id="section-courses" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
              <DynamicIcon name={data.coursesSection.icon} className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
              {data.coursesSection.title}
            </h2>
          </div>

          {/* Subtitle Description */}
          <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0">
            {data.coursesSection.description}
          </p>

          {/* Courses Slider Container (Floating Left & Right Arrows on edges) */}
          <div className="relative pt-4 group">
            {/* Left Slider Navigation Arrow */}
            <button
              onClick={() => scrollCourses("left")}
              aria-label="Previous Course"
              className="absolute -left-5 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white hover:bg-[#0c3058] text-[#0c3058] hover:text-white flex items-center justify-center shadow-lg border border-slate-200 transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Right Slider Navigation Arrow */}
            <button
              onClick={() => scrollCourses("right")}
              aria-label="Next Course"
              className="absolute -right-5 md:-right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white hover:bg-[#0c3058] text-[#0c3058] hover:text-white flex items-center justify-center shadow-lg border border-slate-200 transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.5]" />
            </button>

            <div
              ref={courseSliderRef}
              className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory px-1"
            >
              {data.coursesSection.list.map((course) => (
                <div
                  key={course.id}
                  className="w-full min-w-[280px] sm:min-w-[310px] lg:w-[calc(33.333%-14px)] snap-start shrink-0 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  {/* Course Image Banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={getAssetPath(course.image)}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#0c3058] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                      {course.badge}
                    </div>
                  </div>

                  {/* Course Details Body */}
                  <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                    <div>
                      <h3 className="font-extrabold text-base text-[#0c3058] line-clamp-2 m-0 leading-snug min-h-[48px]">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 mt-2 m-0 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Course Pointers */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                      <div className="flex items-center gap-2 font-medium">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        <span><strong className="font-bold text-[#0c3058]">Duration:</strong> {course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 font-medium">
                        <Laptop className="w-4 h-4 text-blue-600 shrink-0" />
                        <span><strong className="font-bold text-[#0c3058]">Format:</strong> {course.mode}</span>
                      </div>
                    </div>

                    {/* Action Buttons (Flex 50-50 for Apply & View, Full Width for Download Brochure) */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCounselingClick}
                          className="flex-1 bg-[#00aeed] hover:bg-[#0096c7] text-white font-medium md:font-bold text-xs py-2.5 px-2 md:px-3 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer border-none shadow-sm active:scale-[0.98]"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>

                        <button
                          onClick={() => router.push(`/courses/${course.slug}`)}
                          className="flex-1 bg-[#0c3058] hover:bg-[#154477] text-white font-medium md:font-bold text-xs py-2.5 px-2 md:px-3 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer border-none shadow-sm active:scale-[0.98]"
                        >
                          <span>View Course</span>
                          <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>

                      <button
                        onClick={handleBrochureClick}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-[#0c3058] font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-200/80 active:scale-[0.98]"
                      >
                        <span>Download brochure</span>
                        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 6: ADMISSION PROCESS (6 Steps in Single Row Grid) */}
        {/* ========================================================= */}
        <div id="section-admission" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
              <DynamicIcon name={data.admissionProcessSection.icon} className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
              {data.admissionProcessSection.title}
            </h2>
          </div>

          {/* Subtitle Description */}
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {data.admissionProcessSection.description}
          </p>

          {/* 6 Colorful Step Boxes in a Single Row Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {data.admissionProcessSection.steps.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border ${item.theme.bg} ${item.theme.border} ${item.theme.shadow} shadow-sm hover:shadow-lg hover:-translate-y-1.3 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group p-5 text-center`}
              >
                <div className="flex flex-col items-center">
                  {/* Top Circular Step Badge with Border Ring */}
                  <div
                    className={`w-11 h-11 rounded-full bg-white shadow-md border-2 ${item.theme.badgeBorder} flex items-center justify-center font-black text-base transition-transform group-hover:scale-110`}
                  >
                    {item.step}
                  </div>

                  {/* Centered Step Title */}
                  <h3 className="font-extrabold text-sm text-[#0c3058] mt-4 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Centered Step Description */}
                  <p className="text-[11.5px] text-slate-600 leading-relaxed m-0">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Color Accent Strip */}
                <div className={`h-1.5 w-full rounded-full mt-5 ${item.theme.accentBg} transition-all duration-300`} />
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 7: LEARNING METHODOLOGY CARD                      */}
        {/* ========================================================= */}
        <div id="section-learning-methodology" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
              <DynamicIcon name={data.methodologySection.icon} className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
              {data.methodologySection.title}
            </h2>
          </div>

          {/* Intro Description */}
          <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0">
            {data.methodologySection.description}
          </p>

          {/* Key Learning Features Clean List */}
          <div className="space-y-4 pt-2">
            <h3 className="text-base md:text-lg font-bold text-[#0c3058] pt-2">
              {data.methodologySection.featuresTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 pt-1">
              {data.methodologySection.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium py-1"
                >
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="leading-snug">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outro Callout Note Box */}
          <div className="bg-[#0c3058]/5 border border-[#0c3058]/10 p-3 sm:p-4 rounded-2xl flex items-center gap-3.5">
            <div className=" hidden w-8 h-8 rounded-lg bg-[#0c3058] text-white md:inline-flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#0c3058] leading-relaxed m-0">
              {data.methodologySection.outro}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 8: EXECUTIVE EDUCATION CERTIFICATE CARD           */}
        {/* ========================================================= */}
        <div id="section-certificate" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
              <DynamicIcon name={data.certificateSection.icon} className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-md md:text-2xl font-extrabold text-[#0c3058] m-0">
              {data.certificateSection.title}
            </h2>
          </div>

          {/* Intro Description */}
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-3">
            {data.certificateSection.description}
          </p>

          {/* 2-Column Split Layout (Left: Certificate Benefits, Right: Sample Certificate Frame) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Left Column (7 cols): Benefits list */}
            <div className="lg:col-span-7 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-center space-y-4 order-2 md:order-1">
              <div className="space-y-4">
                <h3 className="text-base md:text-lg font-bold text-[#0c3058]">
                  {data.certificateSection.benefitsTitle}
                </h3>

                <div className="space-y-2.5">
                  {data.certificateSection.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note Footer */}
              <div className="pt-3 border-t border-slate-200/70">
                <p className="text-xs text-slate-700 italic leading-relaxed m-0">
                  <strong className="font-bold text-slate-900 not-italic mr-1">Note:</strong>
                  {data.certificateSection.note.replace(/^Note:\s*/i, "")}
                </p>
              </div>
            </div>

            {/* Right Column (5 cols): Certificate Image Card Preview */}
            <div className="lg:col-span-5 order-1 md:order-2">
              <div
                onClick={() => setIsCertificateModalOpen(true)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-200 p-2 sm:p-3 w-full text-center overflow-hidden transition-all cursor-pointer group relative"
                title="Click to view full image"
              >
                <img
                  src={getAssetPath(data.certificateSection.sampleImage)}
                  alt="IIM Kozhikode Executive Education Certificate"
                  className="w-full h-auto max-h-[300px] object-contain rounded-lg block group-hover:scale-[1.02] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#0c3058]/0 group-hover:bg-[#0c3058]/15 transition-colors flex items-center justify-center rounded-xl">
                  <span className="opacity-0 group-hover:opacity-100 bg-[#0c3058] text-white text-xs font-bold px-3.5 py-2 rounded-full shadow-lg transition-opacity duration-300 flex items-center gap-1.5">
                    <Search className="w-4 h-4 stroke-[2.5]" /> Click to view full image
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 9: STUDENT REVIEWS & TESTIMONIALS CARD            */}
        {/* ========================================================= */}
        <div id="section-reviews" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
              <DynamicIcon name={data.reviewsSection.icon} className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
              {data.reviewsSection.title}
            </h2>
          </div>

          {/* Intro Description */}
          <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4">
            {data.reviewsSection.description}
          </p>

          {/* Subheading & 3 Pointers Per Row Grid */}
          <div className="space-y-3 pt-2">
            <h3 className="text-base md:text-lg font-bold text-[#0c3058] mb-1">
              {data.reviewsSection.valuesTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2.5 pt-1">
              {data.reviewsSection.values.map((val, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-medium py-0.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Slider (2 Slides in Single View on Desktop) */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-base md:text-lg font-bold text-[#0c3058] mb-0">
              {data.reviewsSection.testimonialsTitle}
            </h3>

            {/* Slider Track with Floating Nav Arrows */}
            <div className="relative pt-2 group">
              <button
                onClick={() => scrollReviews("left")}
                aria-label="Previous Review"
                className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white hover:bg-[#0c3058] text-[#0c3058] hover:text-white flex items-center justify-center shadow-lg border border-slate-200 transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
              </button>

              <button
                onClick={() => scrollReviews("right")}
                aria-label="Next Review"
                className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white hover:bg-[#0c3058] text-[#0c3058] hover:text-white flex items-center justify-center shadow-lg border border-slate-200 transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 stroke-[2.5]" />
              </button>

              <div
                ref={reviewSliderRef}
                className="flex gap-5 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 snap-x snap-mandatory px-1"
              >
                {data.reviewsSection.testimonials.map((review) => (
                  <div
                    key={review.id}
                    className="w-full min-w-[290px] sm:min-w-[340px] lg:w-[calc(50%-10px)] snap-start shrink-0 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all space-y-4"
                  >
                    <div className="space-y-3">
                      {/* Rating Stars & Quote Icon */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-400" />
                          ))}
                        </div>
                        <Quote className="w-6 h-6 text-blue-200 rotate-180" />
                      </div>

                      {/* Quote Text */}
                      <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed m-0">
                        "{review.quote}"
                      </p>
                    </div>

                    {/* Author & Role Footer with User Avatar */}
                    <div className="pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-xs bg-slate-100">
                          <img
                            src={getAssetPath(review.avatar || review.avatarUrl || "/media/images/2026/07/30/15126164a42947040644b380a66f9994.png")}
                            alt={review.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-[#0c3058] m-0">
                            {review.author}
                          </h4>
                          <span className="text-xs text-slate-500 font-medium block">
                            — {review.role}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg w-fit">
                        {review.course}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 10: EXPLORE OTHER TOP IIM/IIT INSTITUTIONS CARD    */}
        {/* ========================================================= */}
        <div id="section-explore" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0c3058] flex items-center justify-center shrink-0">
              <DynamicIcon name={data.exploreUniversitiesSection.icon} className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-md md:text-2xl font-extrabold text-[#0c3058] m-0">
              {data.exploreUniversitiesSection.title}
            </h2>
          </div>

          {/* Intro Description */}
          <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0">
            {data.exploreUniversitiesSection.description}
          </p>

          {/* Antd Carousel University Logo Slider (Pure Static JSON Data) */}
          <div className="pt-2 max-w-full">
            <Carousel
              key={slidesToShowCount}
              autoplay
              dots={false}
              draggable={true}
              touchMove={true}
              swipeToSlide={true}
              slidesToShow={slidesToShowCount}
              slidesToScroll={1}
              className="w-full relative cursor-grab active:cursor-grabbing"
            >
              {data.exploreUniversitiesSection.universities.map((item) => (
                <div key={item.id} className="px-1.5 py-1">
                  <div
                    onClick={() => item.slug && router.push(`/universities/${item.slug}`)}
                    className="w-full aspect-square bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl sm:rounded-2xl p-1.5 min-[360px]:p-2 sm:p-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group shadow-2xs min-w-0"
                  >
                    <div className="mb-1 sm:mb-1.5 group-hover:scale-105 transition-transform flex items-center justify-center h-10 w-full shrink-0">
                      <img
                        src={getAssetPath(item.logo)}
                        alt={item.name}
                        className="max-h-12 max-w-[100%] object-contain block"
                      />
                    </div>
                    <Tooltip title={item.name} placement="top">
                      <h5 className="text-[9.5px] min-[360px]:text-[10px] sm:text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 transition-colors text-center w-full tracking-tight px-0.5 pt-2 min-w-0 m-0">
                        {formatTwoLineText(item.name)}
                      </h5>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SECTION 11: FREQUENTLY ASKED QUESTIONS (FAQ CARD)         */}
        {/* ========================================================= */}
        <div id="section-faqs" className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 shadow-sm space-y-6">
          {/* Section Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <DynamicIcon name={data.faqSection.icon} className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#0c3058] m-0">
              {data.faqSection.title}
            </h2>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3 pt-1">
            {data.faqSection.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                    ? "bg-[#F0F8FF] border-blue-200/90 shadow-xs"
                    : "bg-white border-slate-200/80 hover:border-blue-200"
                    }`}
                >
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-3 md:p-4 flex items-center justify-between text-left gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className={`text-sm font-bold leading-snug ${isOpen ? "text-[#0c3058]" : "text-slate-800"
                      }`}>
                      {faq.question}
                    </span>

                    {/* Expand/Collapse Circle Icon Badge */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${isOpen
                        ? "bg-[#0c3058] text-white"
                        : "bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {/* Answer Content Container with Smooth Height & Opacity Slide Transition */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${isOpen
                      ? "grid-rows-[1fr] opacity-100 border-t border-blue-100/60 mt-1"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 md:px-5 pb-5 pt-3 text-xs md:text-sm text-slate-800 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Full Certificate Preview Modal Popup */}
      <Modal
        open={isCertificateModalOpen}
        onCancel={() => setIsCertificateModalOpen(false)}
        footer={null}
        centered
        width={900}
        aria-label="Certificate Full Preview"
        className="certificate-preview-modal"
      >
        <div className="p-2 pt-6 pb-2 text-center">
          <img
            src={getAssetPath(data.certificateSection.sampleImage)}
            alt="IIM Kozhikode Executive Education Certificate Full View"
            className="w-full h-auto max-h-[82vh] object-contain rounded-xl shadow-md mx-auto block"
          />
        </div>
      </Modal>
    </div>
  );
}
