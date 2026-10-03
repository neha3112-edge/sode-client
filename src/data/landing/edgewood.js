import React from "react";
import Image from "next/image";

/**
 * Systematic Custom CSS for Edgewood University Online Landing Page
 * Matched precisely to https://distanceeducationschool.com/edgewood/
 */
export const edgewoodCustomCss = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&family=Anton&display=swap');

  .landing-page--edgewood {
    font-family: 'Montserrat', sans-serif !important;
    scroll-behavior: smooth;
    color: #111111;
    background-color: #ffffff;
  }

  .landing-page--edgewood header.navbar {
    background: #ffffff !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05) !important;
  }

  .landing-page--edgewood .header_menu_list li a {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    color: #111111 !important;
    text-decoration: none !important;
    transition: color 0.2s ease !important;
  }

  .landing-page--edgewood .header_menu_list li a:hover {
    color: #F1BA00 !important;
  }

  /* Hero Section */
  .landing-page--edgewood #hero {
    background-image: url(/assets/all_universities_images/edgewood/edgewood_desktop_new_bg.png) !important;
    background-position: center top !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    padding: 30px 15px !important;
    min-height: auto !important;
    position: relative !important;
  }

  @media (max-width: 768px) {
    .landing-page--edgewood #hero {
      background-image: url(/assets/all_universities_images/edgewood/mobile_new_bg_main.png) !important;
      background-position: center top !important;
      padding: 20px 10px !important;
    }
  }

  .landing-page--edgewood #hero > div.absolute {
    display: none !important;
  }

  .landing-page--edgewood #hero h1 {
    font-family: 'Anton', sans-serif !important;
    font-size: 60px !important;
    line-height: 1 !important;
    font-weight: 900 !important;
    letter-spacing: 0.5px !important;
    color: #000000 !important;
    margin: 10px 0 !important;
  }

  @media (max-width: 640px) {
    .landing-page--edgewood #hero h1 {
      font-size: 40px !important;
    }
  }

  /* Buttons */
  .landing-page--edgewood .downloadBrochureBtn {
    background-color: #F1BA00 !important;
    color: #ff0000 !important;
    font-weight: 700 !important;
    border-radius: 6px !important;
    transition: all 0.2s ease !important;
  }
  .landing-page--edgewood .downloadBrochureBtn:hover {
    background-color: #d9a700 !important;
  }

  .landing-page--edgewood .enquireNowBtn {
    background-color: #F1BA00 !important;
    color: #000000 !important;
    font-weight: 700 !important;
    border-radius: 4px !important;
  }

  /* Compare section */
  .landing-page--edgewood .compare_box {
    background-color: #1a1a1a !important;
  }

  /* Footer bottom */
  .landing-page--edgewood .mini-footer-bottom {
    background-color: #1a1a1a !important;
  }
`;

export const edgewoodData = {
  slug: "edgewood",
  meta: {
    title: "Edgewood College DBA upGrad | Edgewood University Online DBA & MBA Programs",
    description: "Edgewood College DBA upGrad program. Edgewood University online DBA and Edgewood College online MBA with specializations in Finance and Leadership. Explore Edgewood University upGrad, Edgewood and upGrad programs, eligibility, duration, and admission details.",
    keywords: "Edgewood University Online DBA, Edgewood College DBA upGrad, Online DBA Programs, Edgewood University MBA, DBA in Finance, DBA in Leadership, Edgewood upGrad",
    canonicalUrl: "https://distanceeducationschool.com/edgewood/",
    openGraph: {
      title: "Edgewood University Online DBA | Edgewood College DBA upGrad",
      description: "Edgewood University Online DBA and MBA+DBA programs. HLC-accredited, ACBSP-approved, PwC certified. 24-month program.",
      url: "https://distanceeducationschool.com/edgewood/",
      siteName: "Distance Education School",
      images: [
        {
          url: "https://distanceeducationschool.com/assets/all_universities_images/edgewood/edgewood-university-black.png",
          width: 800,
          height: 600,
          alt: "Edgewood University Online DBA",
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: "https://distanceeducationschool.com/edgewood/",
    },
  },
  customCss: edgewoodCustomCss,

  // Brand Configuration
  brand: {
    name: "Edgewood University Online",
    slug: "edgewood",
    primaryColor: "#F1BA00",
    themeColor: "#F1BA00",
    accentColor: "#F1BA00",
    fontFamily: "Montserrat",
    showSodeLogo: true,
    sodeIcon: "/assets/all_universities_images/edgewood/new_sode_tm_logo.png",
    hideMangLogo: true,
    showCouponBtn: false,
    hideNavbarBadge: true,
    sodeLogoContainerStyle: {
      width: "160px",
      height: "56px",
      minWidth: "120px",
    },
    callGif: "/assets/all_universities_images/edgewood/call_icon.gif",
    giftGif: "/assets/all_universities_images/edgewood/gift.gif",

    navLinks: [
      { label: "Courses", href: "#courses" },
      { label: "Approvals", href: "#accreditations" },
      { label: "About", href: "#about" },
      { label: "FAQ", href: "#faqs" },
    ],

    sectionOrder: [
      "stats",
      "programmes",
      "about",
      "approvals",
      "degree",
      "whyChoose",
      "admissionProcess",
      "faqs",
      "compareBanner",
    ],

    // Hero Section Configuration
    hero: {
      backgroundImage: "/assets/all_universities_images/edgewood/edgewood_desktop_new_bg.png",
      mobileBackgroundImage: "/assets/all_universities_images/edgewood/mobile_new_bg_main.png",
      mobileStudentImage: "/assets/all_universities_images/edgewood/edgewood_mobile_new_img.png",
      noOverlay: true,
      minHeight: "480px",

      welcomeText: (
        <Image
          src="/assets/all_universities_images/edgewood/edgewood-university-black.png"
          alt="Edgewood University"
          width={160}
          height={50}
          className="h-[36px] sm:h-[44px] w-auto object-contain"
        />
      ),
      welcomeContainerClassName: "!mb-2 !mt-0 !text-left",
      welcomeBadgeClassName: "!bg-transparent !p-0 !min-w-0 !shadow-none !border-none !rounded-none !block",

      hashtagText: (
        <span key="edgewood-hashtag" className="inline-block px-3 py-1 bg-black text-white text-[12px] font-semibold rounded-[5px]">
          Learn Business Leadership Skills With
        </span>
      ),
      hashtagStyle: {
        fontFamily: "'Montserrat', sans-serif",
        marginTop: "6px",
        marginBottom: "2px",
      },

      headlineText: "DBA  MBA + DBA",
      headingFont: "'Anton', sans-serif",
      headingClassName: "!whitespace-pre-line !leading-[1] font-black text-[50px] sm:text-[60px] text-[#000000]",
      headingStyle: {
        fontFamily: "'Anton', sans-serif",
        color: "#000000",
        fontSize: "60px",
        lineHeight: "1",
        fontWeight: "900",
        marginTop: "6px",
        marginBottom: "6px",
      },

      taglineText: (
        <span key="edgewood-tagline">
          By <u className="font-semibold">Edgewood University</u> via <u className="font-semibold">upGrad</u>
        </span>
      ),
      taglineStyle: {
        fontFamily: "'Montserrat', sans-serif",
        color: "#000000",
        fontSize: "15px",
        fontWeight: "500",
        lineHeight: "1.3",
        marginTop: "2px",
        marginBottom: "8px",
      },

      highlightBox: {
        text: "Globally recognised U.S. accreditation (HLC)\nNo GMAT/GRE + flexible pay-per-month model",
        className: "!w-full !p-0 !bg-transparent !text-black !text-[15px] sm:text-[17px] !font-semibold !text-left !shadow-none !m-0",
        style: {
          fontFamily: "'Montserrat', sans-serif",
          backgroundColor: "transparent",
          color: "#000000",
          border: "none",
          padding: 0,
          fontSize: "15px",
          fontWeight: "600",
          textAlign: "left",
          lineHeight: "1.5",
          display: "block",
          marginTop: "6px",
          marginBottom: "8px",
          whiteSpace: "pre-line",
        },
      },

      coursesStrip: [
        <div key="edgewood-pills" className="grid grid-cols-2 gap-2 max-w-[420px] my-3">
          <span key="edgewood-online" className="border-2 border-black py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            100% Online
          </span>
          <span key="edgewood-hlc" className="border-2 border-black py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            HLC Accredited
          </span>
          <span key="edgewood-pwc" className="border-2 border-black py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            PwC Certificate
          </span>
          <span key="edgewood-gmat" className="border-2 border-black py-2 px-3 rounded-[5px] text-[#000] font-semibold text-[12.5px] sm:text-[13px] text-center bg-white/70">
            No GMAT/GRE
          </span>
        </div>,
      ],

      brochureButtonText: "Download Brochure",
      buttonStyle: {
        fontFamily: "'Montserrat', sans-serif",
        background: "#F1BA00",
        backgroundColor: "#F1BA00",
        color: "#ff0000",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "700",
        padding: "10px 22px",
        border: "none",
      },

      cardStyle: "white",
      formBackground: "#ffffff",
      formCardType: "white",
      enquireTitle: "Admission Open",
      enquireSubtitle: "Academic Experts will assist you!",
      enquireColor: "#1a1a1a",
      enquireSubtitleColor: "#333333",
      phoneBadgeBg: "#F1BA00",
      phoneBadgeBackground: "#F1BA00",
      phoneBadgeStyle: {
        background: "#F1BA00",
        backgroundColor: "#F1BA00",
        color: "#000000",
        borderRadius: "9999px",
        padding: "3px 14px",
        fontSize: "12px",
      },
      submitBtnBg: "#F1BA00",
      submitButtonBackground: "#F1BA00",
      submitButtonRadius: "6px",
      submitButtonTextColor: "#000000",
    },

    // Stats Section (same as Liverpool grey layout)
    statsLayout: "liverpool",

    // Programmes Section (same as Liverpool card grid layout)
    programmesLayout: "liverpool",
    programmesTitle: "Courses Offered",
    programmesSubtitle: "By Edgewood University Online",

    // About Section (use rushford layout — two-column text + image)
    aboutLayout: "rushford",
    aboutTitle: "About Edgewood University Online",

    // Approvals Section (use rushford/card layout)
    approvalsLayout: "rushford",
    approvalsTitle: "Accreditation Of",
    approvalsSubtitle: "Edgewood University Online",

    // Degree Layout
    degreeLayout: "imageLeft",
    degreeTitleColor: "#111111",
    degreeBtnBg: "#F1BA00",
    degreeBtnTextColor: "#000000",

    // Why Choose
    whyChooseLayout: "rushford",
    whyChooseTitle: "Learning Outcomes Of",
    whyChooseSubtitle: "Edgewood University Online",
    whyChooseImage: "/assets/all_universities_images/edgewood/about-bg-image-edgewood.webp",

    // Admission Process
    admissionProcessId: "apply-steps",
    admissionTitle: "How to Apply for Edgewood University Online Courses",
    admissionSubtitle:
      "Students can easily enrol in Edgewood University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",

    // FAQ
    faqLayout: "ggu",
    faqTitle: "FAQ-Frequently Asked Question",
    faqAccentColor: "#F1BA00",
    faqDefaultOpenIndex: 0,

    // Compare Banner
    compareBannerBg: "#1a1a1a",
    compareUniversityName: "Edgewood University",
    compareSubtitle: "Compare Edgewood University with Top World Renowned Universities",
    compareSectionBg: "bg-white",
    arrowGif: "/assets/all_universities_images/edgewood/arrow.gif",

    // Footer
    footerLogo: "/assets/all_universities_images/edgewood/new-des-logo.webp",
    footerSectionBg: "bg-white",
    footerBottomBg: "#1a1a1a",

    // CTAs
    phone: "tel:07065777755",
    phoneDisplay: "+91 7065 7777 55",
    whatsappNumber: "917065777755",
    whatsappText: "I want to download the Edgewood University Online Program brochure",
  },

  // Stats (4 column grey-box layout)
  stats: [
    {
      icon: "graduation",
      label: "95+ Years",
      value: "Years of legacy",
    },
    {
      icon: "users",
      label: "5 Lakh+",
      value: "Enrollments",
    },
    {
      icon: "user",
      label: "PwC",
      value: "Certificate",
    },
    {
      icon: "book",
      label: "Dual",
      value: "Degree",
    },
  ],

  // Programmes / Courses
  programmes: [
    {
      id: "online-dba",
      title: "Edgewood University Online DBA:",
      description:
        "The Online DBA accredited by HLC introduces learners to board dynamics, strategic finance, decision-making, and digital transformation. This 24-month program prepares professionals for the Dr. title, with real-time project exposure and top faculty, following a 5-day campus immersion and the Online Networking Gala for Network and Career Growth.",
      image: "/assets/all_universities_images/edgewood/online-dba-edgewood.webp",
      duration: "24 Months",
      eligibility: "Bachelor's + Master's Degree with relevant experience",
    },
    {
      id: "mba-dba",
      title: "Edgewood University Online MBA + DBA:",
      description:
        "The Dual degree is in demand nowadays. Many students plan to study an online MBA + DBA as their career pathway. The student can complete the degree in 2.5 years, which combines executive skills an MBA student needs with applied research and the respected 'Dr' title.",
      image: "/assets/all_universities_images/edgewood/dbamba-edgewood.webp",
      duration: "24 Months",
      eligibility: "Bachelor's Degree",
    },
  ],

  // About Section
  about: {
    title: "About Edgewood University Online",
    paragraphs: [
      "Edgewood University Online is a US-based university that was established in 1927, and the university is located in Madison. With 95+ years of excellence, the university is one that offers career-focused learning.",
      "The university has the approval of ACBSP and HLC, which make sure the education provided by Edgewood University Online is globally competitive. The university offers a dual program in Edgewood University Online MBA + DBA, and the university also provides a management degree, the Edgewood University Online MBA.",
      "Through their flexible programs, students get an industry-relevant curriculum, faculty support, and a learning model built for working professionals.",
    ],
    buttonText: "Get FREE Career Counseling",
    image: "/assets/all_universities_images/edgewood/edegewood-about-image.webp",
  },

  // Approvals & Accreditation
  approvals: [
    {
      id: "hlc",
      title: "HLC",
      description:
        "Edgewood University Online program is approved by the HLC, which is a trusted U.S. regional approval authority. This approval supports MBA+DBA program's credibility.",
      image: "/assets/all_universities_images/edgewood/hlc-approval-edgewood.webp",
    },
    {
      id: "wes",
      title: "WES",
      description:
        "The Edgewood University Online MBA + DBA is approved by the WES, which helps learners validate their US qualification for education and career development across countries.",
      image: "/assets/all_universities_images/edgewood/WES.webp",
    },
    {
      id: "acbsp",
      title: "ACBSP",
      description:
        "ACBSP approval ensures that the quality of the education has a strong academic value. The Edgewood University Online MBA has this approval, which shows their credibility.",
      image: "/assets/all_universities_images/edgewood/acbsp-approval-edgewood.webp",
    },
  ],

  // Degree Info (Certificate Section)
  degreeInfo: {
    title: "Sample Certification\nEdgewood University Online",
    description:
      "Edgewood University Online offers two certifications after completion of their degree: PwC and the certificate of Edgewood University. These two certificates help students prepare for top-board level roles. In the partnership of PwC India, it teaches strategic thinking, handling stakeholders, governance, and compliance through live lecture which teaches students real-world expertise guidance.",
    features: [
      { desc: "Globally recognized HLC-accredited U.S. degree" },
      { desc: "PwC Board Advisory Certificate included" },
      { desc: "5-day optional campus immersion in the USA" },
      { desc: "Online Networking Gala for career and network growth" },
    ],
    image: "/assets/all_universities_images/edgewood/sample-certficate-edgewood.webp",
    images: ["/assets/all_universities_images/edgewood/sample-certficate-edgewood.webp"],
    buttonText: "Get Degree",
  },

  // Why Choose / Learning Outcomes
  whyChoose: [
    {
      title: "Optional On-Campus Immersion",
      desc: "Experience U.S. campus learning through optional immersion, workshops, faculty meets, and academic resources onsite support.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Online Networking Gala",
      desc: "Join online networking galas to meet peers, alumni, mentors, and industry leaders worldwide and expand your professional network.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Stakeholder Influence",
      desc: "Build stakeholder influence by negotiating confidently, managing expectations, presenting data, and leading change initiatives effectively.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Conduct Applied Doctoral Research",
      desc: "Conduct applied doctoral research using evidence-based methods, solving business problems with measurable outcomes for organisations.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Expert Faculty",
      desc: "Learn from expert faculty who guide projects, share industry insights, and support academic progress personally to help learner gain the skills they need.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
    {
      title: "Nationally Recognized",
      desc: "Earn a nationally recognized U.S. qualification that enhances credibility, promotion prospects, and global mobility faster.",
      image: "/assets/all_universities_images/edgewood/learning-outcome-edgewood-icon.webp",
    },
  ],

  // Courses list for dropdowns
  courses: [
    "DBA in Finance",
    "DBA in Leadership",
    "MBA + DBA in Finance",
    "MBA + DBA in Leadership",
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

  // FAQs
  faqs: [
    {
      q: "What is the duration of the Edgewood University Online DBA?",
      question: "What is the duration of the Edgewood University Online DBA?",
      a: "The Edgewood University Online DBA can be completed in as little as 24 months, depending on your pace.",
      answer: "The Edgewood University Online DBA can be completed in as little as 24 months, depending on your pace.",
    },
    {
      q: "Is the Edgewood University Online DBA accredited?",
      question: "Is the Edgewood University Online DBA accredited?",
      a: "The Edgewood University Online DBA is HLC-accredited, which supports its academic credibility in the U.S.",
      answer: "The Edgewood University Online DBA is HLC-accredited, which supports its academic credibility in the U.S.",
    },
    {
      q: "How long does the Edgewood University Online MBA+DBA take to complete?",
      question: "How long does the Edgewood University Online MBA+DBA take to complete?",
      a: "The Edgewood University Online MBA+DBA can be completed in around 2.5 years, combining both degrees in one structured path.",
      answer: "The Edgewood University Online MBA+DBA can be completed in around 2.5 years, combining both degrees in one structured path.",
    },
    {
      q: "Does the MBA part of Edgewood University's Online MBA+DBA have business accreditation?",
      question: "Does the MBA part of Edgewood University's Online MBA+DBA have business accreditation?",
      a: "Yes. The MBA included in the Edgewood University Online MBA+DBA is ACBSP-accredited, which reflects quality standards in business education.",
      answer: "Yes. The MBA included in the Edgewood University Online MBA+DBA is ACBSP-accredited, which reflects quality standards in business education.",
    },
    {
      q: "Which is better: Edgewood University Online MBA or MBA+DBA?",
      question: "Which is better: Edgewood University Online MBA or MBA+DBA?",
      a: "Choose Edgewood University Online MBA for leadership and career growth. Choose MBA+DBA if you want advanced expertise, applied research skills, and the 'Dr.' title.",
      answer: "Choose Edgewood University Online MBA for leadership and career growth. Choose MBA+DBA if you want advanced expertise, applied research skills, and the 'Dr.' title.",
    },
  ],

  // Modals
  scholarshipModal: {
    modalBg: "#ffffff",
    titleText: "Get Scholarship Coupon Code",
    titleColor: "#1a1a1a",
    submitButtonBg: "#F1BA00",
    submitButtonTextColor: "#000000",
  },
  compareModal: {
    modalBg: "#ffffff",
    titleText: "Compare Universities",
    titleColor: "#1a1a1a",
    submitButtonBg: "#F1BA00",
    submitButtonTextColor: "#000000",
  },
};
