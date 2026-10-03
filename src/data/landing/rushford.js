import React from "react";
import Image from "next/image";

/**
 * Systematic Custom CSS for Rushford Business School Landing Page
 * Matched precisely to https://distanceeducationschool.com/rushford/
 */
export const rushfordCustomCss = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Anton&family=Montserrat:wght@400;600;700;800;900&display=swap');

  .landing-page--rushford {
    font-family: 'Outfit', sans-serif !important;
    scroll-behavior: smooth;
    color: #111111;
    background-color: #ffffff;
  }

  .landing-page--rushford header.navbar {
    background: #ffffff !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05) !important;
  }

  .landing-page--rushford .header_menu_list li a {
    font-family: 'Outfit', sans-serif !important;
    font-weight: 600 !important;
    font-size: 15px !important;
    color: #111111 !important;
    text-decoration: none !important;
    transition: color 0.2s ease !important;
  }
  .landing-page--rushford .header_menu_list li a:hover {
    color: #e0007a !important;
  }

  /* Hero Section */
  .landing-page--rushford #hero {
    background-image: url(/assets/all_universities_images/rushford/rushford_new_desktop_bg.png) !important;
    background-position: center top !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    padding: 30px 15px !important;
    min-height: auto !important;
    position: relative !important;
  }

  @media (max-width: 768px) {
    .landing-page--rushford #hero {
      background-position: center top !important;
      padding: 20px 10px !important;
    }
  }

  .landing-page--rushford #hero > div.absolute {
    display: none !important;
  }

  .landing-page--rushford #hero h1 {
    font-family: 'Anton', sans-serif !important;
    font-size: 65px !important;
    line-height: 1 !important;
    font-weight: 900 !important;
    letter-spacing: 0.5px !important;
    color: #e0007a !important;
    margin: 10px 0 !important;
  }

  @media (max-width: 640px) {
    .landing-page--rushford #hero h1 {
      font-size: 46px !important;
    }
  }

  /* Multicolor border */
  .landing-page--rushford .multicolor-border {
    height: 8px;
    background: linear-gradient(
      to right,
      #d77a85 25%,
      #ff0099 25% 50%,
      #ff5c57 50% 75%,
      #c2002f 75%
    );
  }

  /* Buttons */
  .landing-page--rushford .downloadBrochureBtn {
    background-color: #ffd23b !important;
    color: #e0007a !important;
    font-weight: 700 !important;
    border-radius: 8px !important;
    transition: all 0.2s ease !important;
  }
  .landing-page--rushford .downloadBrochureBtn:hover {
    background-color: #f5c72a !important;
  }

  .landing-page--rushford .enquireNowBtn {
    background-color: #0cb1ef !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    border-radius: 20px !important;
  }

  /* Compare section */
  .landing-page--rushford .compare_box {
    background-color: #17479e !important;
  }

  /* Footer bottom */
  .landing-page--rushford .mini-footer-bottom {
    background-color: #17479e !important;
  }
`;

export const rushfordData = {
  slug: "rushford",
  meta: {
    title: "Rushford Business School Online DBA | Online DBA Programs & Doctorate in Business Administration Online",
    description: "Rushford Business School Online DBA program. Doctorate in Business Administration Online 8+ specializations, Finance, Marketing, HR, Data Science, Business Analytics, etc. DBA degree online, eligibility, fees & admission process.",
    keywords: "Rushford Business School Online DBA, Online DBA Programs, Doctorate in Business Administration Online, Rushford DBA fees, Rushford DBA eligibility, Rushford Switzerland",
    canonicalUrl: "https://distanceeducationschool.com/rushford/",
    openGraph: {
      title: "Rushford Business School Online DBA | Doctorate in Business Administration",
      description: "Rushford Business School Online DBA program. 8+ specializations, 100% online, 180 ECTS credits, PwC Board Advisory certification.",
      url: "https://distanceeducationschool.com/rushford/",
      siteName: "Distance Education School",
      images: [
        {
          url: "https://distanceeducationschool.com/rushford/assets/img/rushford-logo.webp",
          width: 800,
          height: 600,
          alt: "Rushford Business School Online DBA",
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: "https://distanceeducationschool.com/rushford/",
    },
  },
  customCss: rushfordCustomCss,

  // Brand Configuration
  brand: {
    name: "Rushford Business School",
    slug: "rushford",
    primaryColor: "#17479e",
    themeColor: "#17479e",
    accentColor: "#ffd23b",
    fontFamily: "Outfit",
    showSodeLogo: true,
    sodeIcon: "/assets/all_universities_images/rushford/new_sode_tm_logo.png",
    hideMangLogo: true, // Only SODE logo in navbar on Rushford live site
    showCouponBtn: false, // No scholarship pill in navbar
    hideNavbarBadge: true,
    sodeLogoContainerStyle: {
      width: "160px",
      height: "56px",
      minWidth: "120px",
    },
    callGif: "/assets/all_universities_images/rushford/call_icon.gif",
    giftGif: "/assets/all_universities_images/rushford/gift.gif",

    // Navbar Links matching https://distanceeducationschool.com/rushford/
    navLinks: [
      { label: "Courses", href: "#courses" },
      { label: "Approvals", href: "#accreditations" },
      { label: "About", href: "#about" },
      { label: "FAQ", href: "#faqs" },
    ],

    // Section Order matching live Rushford site
    sectionOrder: [
      "stats",
      "programmes",
      "about",
      "approvals",
      "degree",
      "offersAndPlacement",
      "whyChoose",
      "admissionProcess",
      "faqs",
      "compareBanner",
    ],

    // Hero Section Configuration
    hero: {
      backgroundImage: "/assets/all_universities_images/rushford/rushford_new_desktop_bg.png",
      mobileBackgroundImage: "/assets/all_universities_images/rushford/rushford_new_desktop_bg.png",
      mobileStudentImage: "/assets/all_universities_images/rushford/rushford_new_mobile.png",
      noOverlay: true,
      minHeight: "480px",

      welcomeText: (
        <Image
          src="/assets/all_universities_images/rushford/rushford_new_logo.png"
          alt="Rushford"
          width={180}
          height={55}
          className="h-[36px] sm:h-[46px] w-auto object-contain"
        />
      ),
      welcomeContainerClassName: "!mb-2 !mt-0 !text-left",
      welcomeBadgeClassName: "!bg-transparent !p-0 !min-w-0 !shadow-none !border-none !rounded-none !block",

      hashtagText: (
        <span className="inline-block px-3 py-1 bg-[#17479e] text-white text-[12px] font-semibold rounded-[5px]">
          Doctorate of Business Administration
        </span>
      ),
      hashtagStyle: {
        fontFamily: "'Outfit', sans-serif",
        marginTop: "6px",
        marginBottom: "2px",
      },

      headlineText: "ONLINE DBA",
      headingFont: "'Anton', sans-serif",
      headingClassName: "!whitespace-pre-line !leading-[1] font-black text-[50px] sm:text-[65px] text-[#e0007a]",
      headingStyle: {
        fontFamily: "'Anton', sans-serif",
        color: "#e0007a",
        fontSize: "65px",
        lineHeight: "1",
        fontWeight: "900",
        marginTop: "6px",
        marginBottom: "6px",
      },

      taglineText: (
        <span>
          By <u className="font-semibold">Rushford Business School</u> via <u className="font-semibold">upGrad</u>
        </span>
      ),
      taglineStyle: {
        fontFamily: "'Outfit', sans-serif",
        color: "#000000",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "1.3",
        marginTop: "2px",
        marginBottom: "8px",
      },

      highlightBox: {
        text: "Earn a Doctorate Title\nalong with Management Expertise",
        className: "!w-full !p-0 !bg-transparent !text-black !text-[19px] sm:text-[21px] !font-bold !text-left !shadow-none !m-0",
        style: {
          fontFamily: "'Outfit', sans-serif",
          backgroundColor: "transparent",
          color: "#000000",
          border: "none",
          padding: 0,
          fontSize: "20px",
          fontWeight: "700",
          textAlign: "left",
          lineHeight: "1.25",
          display: "block",
          marginTop: "6px",
          marginBottom: "8px",
          whiteSpace: "pre-line",
        },
      },

      coursesStrip: [
        <div key="rushford-pills" className="grid grid-cols-2 gap-2 max-w-[420px] my-3">
          <span className="border-2 border-[#16459a] py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            100% Online
          </span>
          <span className="border-2 border-[#16459a] py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            08+ Specialization
          </span>
          <span className="border-2 border-[#16459a] py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            1:1 Thesis Mentorship
          </span>
          <span className="border-2 border-[#16459a] py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            No Cost EMI
          </span>
        </div>,
      ],

      brochureButtonText: "Download Brochure",
      buttonStyle: {
        fontFamily: "'Outfit', sans-serif",
        background: "#ffd23b",
        backgroundColor: "#ffd23b",
        color: "#e0007a",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: "700",
        padding: "10px 24px",
      },

      cardStyle: "white",
      formBackground: "#ffffff",
      formCardType: "white",
      enquireTitle: "Admission Open",
      enquireSubtitle: "Academic Experts will assist you!",
      enquireColor: "#17479e",
      enquireSubtitleColor: "#333333",
      phoneBadgeBg: "#17479e",
      phoneBadgeBackground: "#17479e",
      phoneBadgeStyle: {
        background: "#17479e",
        backgroundColor: "#17479e",
        color: "#ffffff",
        borderRadius: "9999px",
        padding: "3px 14px",
        fontSize: "12px",
      },
      submitBtnBg: "#17479e",
      submitButtonBackground: "#17479e",
      submitButtonRadius: "6px",
      submitButtonTextColor: "#ffffff",
    },

    // Stats Section (4 Colored blocks)
    statsLayout: "rushford",

    // Programmes Section (DBA Specialisations)
    programmesLayout: "rushford",
    programmesTitle: "DBA Specialisations At",
    programmesSubtitle: "Rushford Business School",

    // About Section
    aboutLayout: "rushford",
    aboutTitle: "ABOUT US",

    // Approvals Section
    approvalsLayout: "rushford",
    approvalsTitle: "Accreditation & Collaboration",
    approvalsSubtitle: "Rushford Business School, Switzerland",

    // Degree Layout
    degreeLayout: "imageLeft",
    degreeTitleColor: "#111111",
    degreeBtnBg: "#0cb1ef",
    degreeBtnTextColor: "#ffffff",

    // Offers & Placement (Microsoft Copilot Section)
    offersLayout: "rushford-copilot",

    // Why Choose (Endless Benefits)
    whyChooseLayout: "rushford",
    whyChooseTitle: "Endless Benefits of the online DBA program",
    whyChooseSubtitle: "at Rushford Business School",
    whyChooseImage: "/assets/all_universities_images/rushford/whychosse.webp",

    // Admission Process
    admissionProcessId: "apply-steps",
    admissionTitle: "How to Apply for Rushford University Online Courses",
    admissionSubtitle:
      "Students can easily enrol in Rushford University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",

    // FAQ Configuration
    faqLayout: "ggu",
    faqTitle: "FAQs about the Rushford Online DBA Course",
    faqAccentColor: "#17479e",
    faqDefaultOpenIndex: 0,

    // Compare Banner
    compareBannerBg: "#17479e",
    compareUniversityName: "Rushford University",
    compareSubtitle: "Compare Rushford University with Top World Renowned Universities",
    compareSectionBg: "bg-white",
    arrowGif: "/assets/all_universities_images/rushford/arrow.gif",

    // Footer Configuration
    footerLogo: "/assets/all_universities_images/rushford/new-des-logo.webp",
    footerSectionBg: "bg-white",
    footerBottomBg: "#17479e",

    // Floating Sticky and CTA
    phone: "tel:07065777755",
    phoneDisplay: "+91 7065 7777 55",
    whatsappNumber: "917065777755",
    whatsappText: "I want to download the Rushford Business School Online Program brochure",
  },

  // Key Statistics / Highlights (4 colored blocks)
  stats: [
    {
      icon: "user",
      label: "Eligibility",
      value: "Master’s or Bachelor’s with 3 years of experience",
      bg: "#D07786",
    },
    {
      icon: "clock",
      label: "Duration",
      value: "36 Months - complete 15hrs/week",
      bg: "#E0007A",
    },
    {
      icon: "graduation",
      label: "Level",
      value: "Expert Doctorate Degree as DBA",
      bg: "#F85454",
    },
    {
      icon: "rupee",
      label: "Fees",
      value: "Approx Total of Rs. 6,50,000 (No taxes)",
      bg: "#C80536",
    },
  ],

  // Programmes / Specialisations (#courses)
  programmes: [
    {
      id: "general-dba",
      title: "Doctorate of Business Administration",
      description:
        "Industry-aligned Curriculum that gives complete knowledge to excel in the business administration field.",
      image: "/assets/all_universities_images/rushford/gebneralirushford.webp",
    },
    {
      id: "intl-business",
      title: "DBA in International Business",
      description:
        "Focuses on global trade, cross-border strategies, and international business leadership.",
      image: "/assets/all_universities_images/rushford/international-business-rushford.webp",
    },
    {
      id: "healthcare-mgmt",
      title: "DBA in Healthcare Management",
      description:
        "Get leadership expertise in the administration of hospitals, clinics, and healthcare systems.",
      image: "/assets/all_universities_images/rushford/healthcare-management-rushford.webp",
    },
    {
      id: "hr-mgmt",
      title: "DBA in Human Resource Management",
      description:
        "Enhances the human resource management in workforce planning, talent development, & HR strategies.",
      image: "/assets/all_universities_images/rushford/human-resource-management-rushford.webp",
    },
    {
      id: "supply-chain",
      title: "DBA in Supply Chain Management",
      description:
        "Builds advanced knowledge and skills in logistics, operations, and supply chain efficiency.",
      image: "/assets/all_universities_images/rushford/supplychain-management-rushford.webp",
    },
    {
      id: "finance",
      title: "DBA in Finance",
      description:
        "Covers essential sectors such as corporate finance, investment, and effective risk management.",
      image: "/assets/all_universities_images/rushford/finance-rushford.webp",
    },
    {
      id: "data-science",
      title: "DBA in Data Science",
      description:
        "Uses data-driven research to create innovative business strategies to boost the growth of the organisation.",
      image: "/assets/all_universities_images/rushford/data-science-rushford.webp",
    },
    {
      id: "marketing",
      title: "DBA in Marketing",
      description:
        "Emphasizes on consumer insights, digital marketing, and brand management strategies.",
      image: "/assets/all_universities_images/rushford/marketing-rushford.webp",
    },
    {
      id: "business-analytics",
      title: "DBA in Business Analytics",
      description:
        "Develop advanced analytics skills for data-informed decision-making processes for business growth.",
      image: "/assets/all_universities_images/rushford/business-analytics-rushford.webp",
    },
  ],

  // About Section Data
  about: {
    title: "ABOUT US",
    paragraphs: [
      "Rushford Business School offers a globally recognized Doctor of Business Administration (DBA) fully in online learning mode. It is a recognised doctorate degree valid worldwide. The DBA program helps to equip learners with high-level knowledge, research, and analytical skills.",
      "With a 5-star QS rating for teaching and online learning, Rushford Business School in Switzerland stands out for its 50+ programs, 45+ nationalities, 2 campuses, 25+ subject areas, and a strong network of 9k+ alumni. Rushford continues to inspire future leaders through innovation, excellence, and global impact.",
    ],
    buttonText: "Request Call Back",
    image: "/assets/all_universities_images/rushford/rushford-campus-buiding.webp",
  },

  // Approvals & Accreditation Data
  approvals: [
    {
      id: "qs-rating",
      title: "5 Star QS Rating",
      description:
        "It holds 4 stars for overall and 5 stars for online learning and teaching in the QS rating system.",
      image: "/assets/all_universities_images/rushford/approva-01-rusford.webp",
    },
    {
      id: "eduqua",
      title: "EDUQUA Certified",
      description:
        "Rushford is certified by EduQua, ensuring the quality education standards in Switzerland.",
      image: "/assets/all_universities_images/rushford/eduqua.webp",
    },
    {
      id: "acbsp",
      title: "ACBSP Member",
      description:
        "Rushford is a member of the Accreditation Council for Business Schools & Programs.",
      image: "/assets/all_universities_images/rushford/acbsp-rushford.webp",
    },
    {
      id: "bga",
      title: "BGA MP",
      description:
        "It is a member of the Business Graduates Association, which provides global recognition.",
      image: "/assets/all_universities_images/rushford/bga-member.webp",
    },
    {
      id: "iacbe",
      title: "IACBE Educational",
      description:
        "Rushford is an IACBE-accredited institution that proves accountability of its programs.",
      image: "/assets/all_universities_images/rushford/iacbe-rushford.webp",
    },
    {
      id: "aacsb",
      title: "AACSB Member",
      description:
        "Rushford is a member of AACSB, advancing global quality in business education.",
      image: "/assets/all_universities_images/rushford/aacsb-rushford.webp",
    },
  ],

  // Degree Info (Sample Degree + PwC Board Advisory)
  degreeInfo: {
    title: "Get a DBA Completion Certificate with PwC Board Advisory",
    description:
      "Rushford offers a PwC Directorship & Board Advisory Certificate that helps professionals prepare for top board-level roles. In partnership with PwC India, it teaches strategic thinking, handling stakeholders, governance, and compliance through live classes, real-world practice, and expert guidance, building confidence to succeed in a business career.",
    images: [
      "/assets/all_universities_images/rushford/certificate.webp",
      "/assets/all_universities_images/rushford/rushford_sample_Degree.webp",
    ],
    image: "/assets/all_universities_images/rushford/certificate.webp",
    buttonText: "Get Degree",
  },

  // Offers and Placements (Microsoft Copilot Section)
  offersAndPlacements: {
    type: "copilot",
    title: "Get 1 Month FREE Microsoft Copilot Pro with Rushford DBA",
    description:
      "Get 1 month of FREE Microsoft Copilot Pro with the DBA at Rushford Business School. Access AI tools like Word, Excel, PowerPoint, Teams, and Business Chat to boost productivity, improve insights, and apply learning instantly. Offer exclusively available for DBA aspirants.",
    image: "/assets/all_universities_images/rushford/copilot-rusford.webp",
  },

  // Why Choose / Endless Benefits
  whyChoose: [
    {
      title: "Expertise in Business",
      desc: "Gain advanced research, analytical, and leadership skills for global business excellence.",
      image: "/assets/all_universities_images/rushford/expertise.webp",
    },
    {
      title: "Global Career Opportunity",
      desc: "International opportunities in senior leadership roles with higher salary growth in management.",
      image: "/assets/all_universities_images/rushford/growth.webp",
    },
    {
      title: "Learning Approach",
      desc: "Access live faculty sessions, real-world projects, and alumni benefits worldwide.",
      image: "/assets/all_universities_images/rushford/modern-learning.webp",
    },
    {
      title: "180 ECTS European Credits",
      desc: "Internationally recognized accreditation and global value with Earn 180 ECTS credits.",
      image: "/assets/all_universities_images/rushford/credit.webp",
    },
  ],

  // Courses list for dropdowns
  courses: [
    "General",
    "International Business",
    "Healthcare Management",
    "Human Resource Management",
    "Supply Chain Management",
    "Finance",
    "Data Science",
    "Marketing",
    "Business Analytics",
  ],

  // Admission Process Steps
  admissionSteps: [
    {
      num: 1,
      title: "Submit Form",
      desc: "Fill in and submit your application form online",
      themeColor: "#ff7a00",
      borderColor: "#ff7a00",
      cardBg: "#fff8f0",
    },
    {
      num: 2,
      title: "Expert's Counseling",
      desc: "You will receive a call from our expert counselor",
      themeColor: "#0066cc",
      borderColor: "#0066cc",
      cardBg: "#f0f7ff",
    },
    {
      num: 3,
      title: "Choose University",
      desc: "Select the course & university according to your interest",
      themeColor: "#ff2a6d",
      borderColor: "#ff2a6d",
      cardBg: "#fff0f5",
    },
    {
      num: 4,
      title: "Online Payment",
      desc: "You need to make a smooth online fee submission",
      themeColor: "#16a34a",
      borderColor: "#16a34a",
      cardBg: "#f0faf3",
    },
    {
      num: 5,
      title: "Document Submit",
      desc: "You need to upload all the required verified documents.",
      themeColor: "#8b5cf6",
      borderColor: "#8b5cf6",
      cardBg: "#f7f2ff",
    },
    {
      num: 6,
      title: "Admission Confirm",
      desc: "Get Confirmation on your Email & Whatsapp",
      themeColor: "#ff7a00",
      borderColor: "#ff7a00",
      cardBg: "#fff8f0",
    },
  ],

  // Frequently Asked Questions
  faqs: [
    {
      q: "Is Rushford Online DBA Program Globally Recognised?",
      question: "Is Rushford Online DBA Program Globally Recognised?",
      a: "Yes, the Rushford Online DBA is internationally recognized and accredited, making it valuable for global careers.",
      answer: "Yes, the Rushford Online DBA is internationally recognized and accredited, making it valuable for global careers.",
    },
    {
      q: "What are the specialisations available in the Rushford DBA Program?",
      question: "What are the specialisations available in the Rushford DBA Program?",
      a: "The Online DBA program at Rushford Business School has 9 specialisations, including Finance, Marketing, Data Science, Healthcare, HR, and more.",
      answer: "The Online DBA program at Rushford Business School has 9 specialisations, including Finance, Marketing, Data Science, Healthcare, HR, and more.",
    },
    {
      q: "What is the online DBA course duration at Rushford Business School?",
      question: "What is the online DBA course duration at Rushford Business School?",
      a: "The Rushford DBA course duration is 36 months (Commitment of 15hrs/week), depending on research and thesis progress.",
      answer: "The Rushford DBA course duration is 36 months (Commitment of 15hrs/week), depending on research and thesis progress.",
    },
    {
      q: "How many credits will I earn in the Rushford Online DBA program?",
      question: "How many credits will I earn in the Rushford Online DBA program?",
      a: "Students earn 180 ECTS credits, aligned with European higher education standards and international recognition.",
      answer: "Students earn 180 ECTS credits, aligned with European higher education standards and international recognition.",
    },
    {
      q: "Is an MBA degree required for the Rushford online DBA Course?",
      question: "Is an MBA degree required for the Rushford online DBA Course?",
      a: "No, an MBA is not mandatory. Applicants with a master’s degree or bachelor’s degree with 3 years of experience are eligible.",
      answer: "No, an MBA is not mandatory. Applicants with a master’s degree or bachelor’s degree with 3 years of experience are eligible.",
    },
  ],

  // Modals
  scholarshipModal: {
    modalBg: "#ffffff",
    titleText: "Get Scholarship Coupon Code",
    titleColor: "#17479e",
    submitButtonBg: "#17479e",
  },
  compareModal: {
    modalBg: "#ffffff",
    titleText: "Compare Universities",
    titleColor: "#17479e",
    submitButtonBg: "#17479e",
  },
};
