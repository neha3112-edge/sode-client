export const uuData = {
  slug: "uu",
  meta: {
    title: "Uttaranchal University Online Courses | Online MBA, MCA, UG, & PG Degree",
    description:
      "Online UU UGC-approved degree. Uttaranchal University online MBA, MCA, and distance courses. View Sample Degree & Online Admission Process. Online UU NAAC A+, AICTE-approved, & AIU. Live lectures, anytime learning, & placements support for students.",
    keywords: [
      "Uttaranchal University Online",
      "Online UU",
      "Uttaranchal University Online MBA",
      "Uttaranchal Online MCA",
      "Uttaranchal University Online Courses",
      "Uttaranchal Distance Education",
      "UU Online Degree",
      "Uttaranchal University Admission 2026",
    ],
  },
  brand: {
    name: "Uttaranchal University Online",
    shortName: "Uttaranchal University",
    slug: "uu",
    headline: "UTTARANCHAL UNIVERSITY ONLINE",
    phone: "+91 7065 7777 55",
    phoneDisplay: "+91 7065 7777 55",
    officialUrl: "https://uuo.ac.in",
    logo: "/assets/all_universities_images/uu/uttranchal-logo.png",
    sodeIcon: "/assets/all_universities_images/uu/sode-icon.png",
    sodeLogo: "/assets/all_universities_images/uu/new-des-logo.webp",
    arrowGif: "/assets/all_universities_images/uu/arrow.gif",
    giftGif: "/assets/all_universities_images/uu/gift.gif",
    callGif: "/assets/all_universities_images/uu/call_icon.gif",
    primaryColor: "#0A3C7D",
    accentColor: "#62B239",
    themeBg: "bg-[#0A3C7D]",
    themeGradient: "linear-gradient(to right, #0A3C7D, #17479E)",
    themeBorder: "border-[#62B239]",
    goldColor: "#62B239",
    fontFamily: "Montserrat",
    badgeText: "Admissions Open 2026",

    // Global Green Scholarship Coupon Button
    showCouponBtn: true,
    showCouponButton: true,
    couponButtonText: "Scholarship Coupon Code",
    couponBtnBg: "#22c55e",
    couponButtonColor: "#22c55e",
    showSodeLogo: true,
    footerBg: "#010d2a",

    // Custom CSS Overrides specifically for Uttaranchal University (loaded from JSON)
    customCss: `
      /* Uttaranchal University Custom Styles & Overrides (JSON Configured) */
      @import url('https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;500;600;700;800;900&family=Oswald:wght@500;600;700&display=swap');

      .landing-page--uu {
        font-family: 'Montserrat', sans-serif !important;
      }

      .landing-page--uu #hero h1 {
        font-family: 'Anton', 'Oswald', sans-serif !important;
        letter-spacing: 0.5px !important;
        text-transform: uppercase !important;
        font-weight: 700 !important;
        font-size: 26px !important;
        line-height: 1.1 !important;
        white-space: nowrap !important;
      }

      @media (max-width: 639px) {
        .landing-page--uu #hero h1 {
          font-size: 20px !important;
          white-space: normal !important;
        }
      }

      .landing-page--uu .sp {
        color: #62B239 !important;
      }

      .landing-page--uu #program h2 {
        color: #003399 !important;
        font-weight: 700 !important;
      }

      .landing-page--uu #program .card-box-cnt h2,
      .landing-page--uu #program h3 {
        color: #17479E !important;
      }

      .landing-page--uu #whychoose {
        background-color: #0A3C7D !important;
        color: #ffffff !important;
      }

      .landing-page--uu #whychoose h2,
      .landing-page--uu #whychoose h3 {
        color: #ffffff !important;
      }

      .landing-page--uu #whychoose p {
        color: rgba(255, 255, 255, 0.9) !important;
      }

      .landing-page--uu #whychoose button {
        background: #62B239 !important;
        color: #ffffff !important;
      }

      .landing-page--uu #degree h2 {
        color: #003399 !important;
      }

      .landing-page--uu #degree button {
        background: #62B239 !important;
        color: #ffffff !important;
      }

      .landing-page--uu .landing-lead-card {
        border-radius: 12px !important;
        box-shadow: 0 14px 36px rgba(0, 0, 0, 0.22) !important;
      }

      /* ── UU MOBILE RESPONSIVE ── */

      /* Hero: stack form below content on mobile */
      @media (max-width: 767px) {
        .landing-page--uu #hero {
          background-image: none !important;
          background-color: #0A3C7D !important;
          background-position: center top !important;
          padding: 16px 14px 28px !important;
        }
        .landing-page--uu #hero div.-z-20 {
          display: none !important;
        }
        .landing-page--uu .hero-info-col {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          text-align: left !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        .landing-page--uu #hero h1 {
          font-size: 26px !important;
          line-height: 1.15 !important;
          text-align: left !important;
          margin-bottom: 6px !important;
        }
        .landing-page--uu .hero-info-col p {
          text-align: left !important;
        }
        .landing-page--uu .hero-brochure-btn {
          display: inline-flex !important;
          background: #cc1d1d !important;
          border-radius: 8px !important;
          padding: 10px 22px !important;
          margin-top: 10px !important;
          margin-bottom: 16px !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          color: #ffffff !important;
          align-self: flex-start !important;
        }
        .landing-page--uu .hero-mobile-image-wrapper {
          width: 100% !important;
          height: 200px !important;
          border-radius: 16px !important;
          overflow: hidden !important;
          margin-bottom: 14px !important;
          position: relative !important;
          z-index: 10 !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
        }
        .landing-page--uu .hero-form-col {
          width: 100% !important;
          align-items: center !important;
          z-index: 20 !important;
          position: relative !important;
        }
        .landing-page--uu .hero-form-col .landing-card {
          width: 100% !important;
          max-width: 360px !important;
          border-radius: 12px !important;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
          background: #ffffff !important;
        }
      }

      /* Programmes Section: 1-col on phone */
      @media (max-width: 639px) {
        .landing-page--uu #program {
          padding: 40px 12px !important;
        }
        .landing-page--uu #program h2 {
          font-size: 22px !important;
        }
      }

      /* Approvals: auto columns on phone */
      @media (max-width: 639px) {
        .landing-page--uu #certification,
        .landing-page--uu #accreditations {
          padding: 36px 12px !important;
        }
        .landing-page--uu #certification h2,
        .landing-page--uu #accreditations h2 {
          font-size: 20px !important;
        }
      }

      /* Why Choose section: full-width cards on phone */
      @media (max-width: 767px) {
        .landing-page--uu #whychoose {
          padding: 40px 16px !important;
        }
        .landing-page--uu #whychoose h2 {
          font-size: 22px !important;
        }
        .landing-page--uu #whychoose .grid {
          gap: 14px !important;
        }
      }

      /* About Section: single col on mobile */
      @media (max-width: 767px) {
        .landing-page--uu #about {
          padding: 40px 16px !important;
        }
        .landing-page--uu #about h2 {
          font-size: 22px !important;
        }
      }

      /* Degree Section */
      @media (max-width: 767px) {
        .landing-page--uu #degree {
          padding: 36px 16px !important;
        }
        .landing-page--uu #degree h2 {
          font-size: 20px !important;
          white-space: normal !important;
        }
      }

      /* Admission Process */
      @media (max-width: 639px) {
        .landing-page--uu .apply-section,
        .landing-page--uu [id="admission"] {
          padding: 36px 12px !important;
        }
        .landing-page--uu .apply-section h2 {
          font-size: 20px !important;
        }
      }

      /* FAQ */
      @media (max-width: 639px) {
        .landing-page--uu .faq-section {
          padding: 36px 12px !important;
        }
        .landing-page--uu .faq-section h2 {
          font-size: 20px !important;
        }
      }

      /* Footer sticky bottom bar: bigger text */
      @media (max-width: 767px) {
        .landing-page--uu .footer_sticky_buttons {
          gap: 8px !important;
          padding: 10px 12px !important;
        }
        .landing-page--uu .footer_sticky_buttons a,
        .landing-page--uu .footer_sticky_buttons button {
          font-size: 12px !important;
          padding: 9px 10px !important;
        }
      }

      /* Overview section */
      @media (max-width: 639px) {
        .landing-page--uu .overview-section {
          padding: 36px 12px !important;
        }
        .landing-page--uu .overview_lists {
          grid-template-columns: 1fr 1fr !important;
          gap: 10px !important;
        }
        .landing-page--uu .overview_list_inner {
          padding: 10px !important;
        }
        .landing-page--uu .overview_list_inner h3 {
          font-size: 13px !important;
        }
        .landing-page--uu .overview_list_inner p {
          font-size: 11px !important;
        }
      }
    `,

    // Section sequence exactly matching https://distanceeducationschool.com/uu/
    sectionOrder: [
      "programmes",
      "approvals",
      "whyChoose",
      "about",
      "degree",
      "admissionProcess",
      "faqs",
      "compareBanner",
    ],

    // =========================================================================
    // 🎯 HERO SECTION CONFIGURATION & CSS (Yahan se Hero Section customize karein)
    // =========================================================================
    hero: {
      // 1. Background & Theme Settings
      sectionBg: "#0A3C7D",
      backgroundColor: "#0A3C7D",
      backgroundImage: "/assets/all_universities_images/uu/UTTRANCHAL-BG.webp",
      mobileBackgroundImage: "none",
      mobileStudentImage: "/assets/all_universities_images/uu/university.webp",
      backgroundPosition: "60% center",
      backgroundSize: "cover",
      desktopBgStyle: {
        backgroundPosition: "60% center",
        backgroundSize: "cover",
      },
      isDarkTheme: true,
      darkOverlay: false,
      noOverlay: true,

      // 2. 📏 HERO SECTION HEIGHT & PADDING (Height kam/zyada karne ke liye)
      minHeight: "390px", // Total Hero Section Minimum Height
      containerClassName: "max-w-[1360px] py-2 sm:py-3 lg:py-3.5", // Vertical Spacing (py)
      contentClassName: "w-full lg:w-auto lg:max-w-[480px] shrink-0",
      contentStyle: {
        maxWidth: "480px",
      },

      // 3. 🔤 HEADING TEXT SIZE & FONT (Title / Heading Style)
      headlineHtml: 'UTTARANCHAL UNIVERSITY <span style="color: #62B239;">ONLINE</span>',
      headlineText: "UTTARANCHAL UNIVERSITY ONLINE",
      headingFont: "'Anton', sans-serif",
      headingClassName: "text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-bold leading-tight tracking-wide text-white whitespace-normal md:whitespace-nowrap uppercase mt-0 mb-1",
      headingStyle: {
        fontFamily: "'Anton', sans-serif",
        color: "#ffffff",
        fontSize: "26px", // Heading Text Size (reduced to fit on single line)
        lineHeight: "1.1",
        fontWeight: "700",
        letterSpacing: "0.5px",
        marginTop: "0px",
        marginBottom: "5px",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      },

      // 4. 📚 COURSES STRIP (BBA | BCA | BA | MBA | MCA)
      coursesBeforeTagline: true,
      coursesFirst: true,
      coursesStrip: [
        "BBA | BCA | BA | MBA | MCA",
      ],
      hideCourseBox: true,
      courseStripClassName: "text-[17px] sm:text-[19px] lg:text-[21px] font-bold text-white tracking-normal leading-tight",
      courseStripStyle: {
        color: "#ffffff",
        fontSize: "21px", // Courses Line Text Size
        fontWeight: "700",
        letterSpacing: "0.3px",
        marginTop: "0px",
        marginBottom: "6px",
      },

      // 5. 📝 TAGLINE TEXT & SIZE
      taglineText:
        "Enhance your skills and pursue your passion with Uttaranchal University Online's diverse online education programs designed for success.",
      taglineClassName: "text-[12px] sm:text-[12.5px] text-white/95 font-normal leading-snug max-w-[390px]",
      taglineStyle: {
        color: "#ffffff",
        fontSize: "12.5px", // Tagline Text Size
        fontWeight: "400",
        lineHeight: "1.35",
        marginTop: "0px",
        marginBottom: "12px",
        maxWidth: "390px",
      },

      // 6. 🔴 GET BROCHURE BUTTON STYLING (Global Button used in other LPs)
      brochureButtonText: "Get Brochure",
      buttonGradient: "linear-gradient(270deg, #ff6600 0%, #ee3024 100%)",
      buttonRadius: "rounded-[6px]",

      // 7. 📋 ENQUIRE LEAD FORM STYLING
      cardStyle: "white",
      formBackground: "#ffffff",
      formCardType: "white",
      hideTermsCheckbox: true, // Image 1 ki tarah compact form bina extra checkbox ke
      enquireTitle: "Enquire Now",
      enquireSubtitle: "Academic Experts will assist you!",
      enquireColor: "#0A3C7D",
      enquireSubtitleColor: "#0A3C7D",
      phoneBadgeBg: "#0A3C7D",
      phoneBadgeStyle: {
        background: "#0A3C7D",
        backgroundColor: "#0A3C7D",
        color: "#ffffff",
        borderRadius: "9999px",
      },
      submitBtnBg: "#62B239",
      submitButtonBackground: "#62B239",
      submitButtonRadius: "6px",
    },

    // Approvals Configuration
    approvalsLayout: "uu",
    approvalsTitle: "Online UU",
    approvalsHighlight: "Approvals & Recognition",
    approvalsSubtitle:
      "Uttaranchal University Online UGC-approved online degree programs provide the convenience and flexibility of online learning while maintaining the equivalency of traditional on-campus degrees. Uttaranchal University Online courses are delivered by distinguished international faculty, offering a truly world-class education experience.",
    approvalsHeaderColor: "#003399",
    approvalsBorderColor: "#62B239",
    approvalsBg: "#ffffff",

    // Programmes Configuration
    programmesLayout: "uu",
    programmesTitle: "Uttaranchal University Online Degree Courses",
    programmesBg: "#ffffff",
    programmeBtnBg: "#62B239",
    programmeBtnTextColor: "#ffffff",

    // Why Choose / Benefits Configuration
    whyChooseLayout: "uu",
    whyChooseTitle: "Uttaranchal University Benefits in the",
    whyChooseHighlight: "Online Degree Programs",
    whyChooseStudentImage: "/assets/all_universities_images/uu/image-2nd.webp",
    whyChooseBg: "#0A3C7D",
    whyChooseBtnText: "Apply Now",
    whyChooseDescription:
      "Uttaranchal University Online courses are UGC-Entitled offers the convenience & flexibility of online education with the equivalency of a conventional, on-campus degree. Through Uttaranchal University Online, leading international faculty, it offer world-class education in a true sense.",

    // About Configuration
    aboutLayout: "uu",
    aboutTitleGradient: false,
    aboutButtonBg: "#62B239",

    // Sample Degree Configuration
    degreeLayout: "uu",
    degreeTitleColor: "#111111",
    degreeBtnBg: "#0A3C7D",
    degreeBtnTextColor: "#ffffff",

    // Admission Process Configuration
    admissionTitle: "How To Apply For Uttaranchal University Online Courses",
    admissionSubtitle:
      "Students can easily enrol in Uttaranchal University Online courses. Candidates can conveniently apply by selecting their desired program. Follow these steps to secure admission in the university.",
    admissionHeadingColor: "#003399",

    // FAQ Configuration
    faqLayout: "uu",
    faqTitle: "FAQ | Frequently Asked Question",
    faqHeaderColor: "#003399",

    // Compare Banner Configuration
    compareBannerBg: "linear-gradient(270deg, #0A3C7D 0%, #17479E 100%)",
    footerDisclaimer:
      "SODE Counselling Services LLP act as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only. We are not a university or an admission authority. Users are encouraged to verify information on the official website of the University before making decisions.",
  },

  courses: [
    { value: "BA", label: "BA - Bachelor of Arts" },
    { value: "BBA", label: "BBA - Bachelor of Business Administration" },
    { value: "BCA", label: "BCA - Bachelor of Computer Application" },
    { value: "MBA", label: "MBA - Master of Business Administration" },
    { value: "MCA", label: "MCA - Master of Computer Application" },
  ],

  programmes: [
    {
      id: "ba",
      code: "BA",
      title: "Bachelor of Arts",
      duration: "3 Years",
      level: "Undergraduate",
      image: "/assets/all_universities_images/uu/ba-uttaranchal.webp",
      description:
        "Uttaranchal University Online offers an online BA program that covers diverse areas such as literature, history, sociology, and many more.",
    },
    {
      id: "bba",
      code: "BBA",
      title: "Bachelor of Business Administration",
      duration: "3 Years",
      level: "Undergraduate",
      image: "/assets/all_universities_images/uu/bba-uttaranchal.webp",
      description:
        "Uttaranchal University Online offers an online BBA program that covers key areas like management, marketing, and many more.",
    },
    {
      id: "bca",
      code: "BCA",
      title: "Bachelor of Computer Application",
      duration: "3 Years",
      level: "Undergraduate",
      image: "/assets/all_universities_images/uu/bca-uttaranchal.webp",
      description:
        "Uttaranchal University Online offers an online BCA program that focuses on programming, IT skills, and many more.",
    },
    {
      id: "mba",
      code: "MBA",
      title: "Master of Business Administration",
      duration: "2 Years",
      level: "Postgraduate",
      image: "/assets/all_universities_images/uu/mba-uttaranchal.webp",
      description:
        "Uttaranchal University's Online MBA program delves into finance, business strategy, and many more.",
    },
    {
      id: "mca",
      code: "MCA",
      title: "Master of Computer Application",
      duration: "2 Years",
      level: "Postgraduate",
      image: "/assets/all_universities_images/uu/mca-uttaranchal.webp",
      description:
        "Uttaranchal University's Online MCA program offers courses in coding, IT infrastructure, and many more.",
    },
  ],

  approvals: [
    {
      name: "NAAC A+",
      image: "/assets/all_universities_images/uu/naac-a+.webp",
      desc: "NAAC A+ Accredited",
    },
    {
      name: "AICTE",
      image: "/assets/all_universities_images/uu/aicte.webp",
      desc: "AICTE Approved",
    },
    {
      name: "AIU",
      image: "/assets/all_universities_images/uu/aiu.webp",
      desc: "Association of Indian Universities",
    },
    {
      name: "ISO",
      image: "/assets/all_universities_images/uu/iso.webp",
      desc: "ISO Certified 9001:2015",
    },
    {
      name: "QS World",
      image: "/assets/all_universities_images/uu/qs.png",
      desc: "QS World University Ranked",
    },
    {
      name: "WURI",
      image: "/assets/all_universities_images/uu/wuri.webp",
      desc: "WURI Ranked",
    },
  ],

  whyChoose: [
    {
      title: "Online Live Lectures",
      desc: "Attend interactive live lectures delivered by leading faculty members.",
      image: "/assets/all_universities_images/uu/Live-Lectures-uttranchal.webp",
    },
    {
      title: "Personalised Mentorship",
      desc: "Get one-on-one personalized guidance and mentorship throughout your course.",
      image: "/assets/all_universities_images/uu/mentorship.png",
    },
    {
      title: "Recorded Video Content",
      desc: "Access 24/7 self-paced high-quality recorded lectures anytime.",
      image: "/assets/all_universities_images/uu/recorded-Video-Content.webp",
    },
    {
      title: "Placement Support",
      desc: "Comprehensive career counseling, resume building, and job placement assistance.",
      image: "/assets/all_universities_images/uu/placements-support.webp",
    },
    {
      title: "Learning Flexibility",
      desc: "Study at your own schedule without disrupting your professional career.",
      image: "/assets/all_universities_images/uu/learning-Flexibility.webp",
    },
    {
      title: "International Collaborations",
      desc: "Global exposure through distinguished international curriculum and faculty.",
      image: "/assets/all_universities_images/uu/international-collaboration.webp",
    },
  ],

  about: {
    badge: "About",
    title: "Uttaranchal University Online",
    image: "/assets/all_universities_images/uu/about-Uttaranchal.webp",
    paragraphs: [
      "In line with the Uttaranchal University Act, 2012, Uttaranchal University Online opened its doors in 2013. Uttaranchal University Online was the first university in the Dehradun state of Uttarakhand to be awarded an A+ by the UGC and NAAC.",
      "Online UU offers its courses in online and distance modes. Online UU offers its online courses in undergraduate and postgraduate programs like BA, BCA, BBA, MCA, and MBA with high-quality education meeting the market demands.",
    ],
    buttonText: "Apply Now",
    whyChooseTitle: "Why Choose",
    whyChooseHighlight: "Uttaranchal University Online?",
    features: [
      {
        title: "Engagement",
        desc: "Uttaranchal University online offers top tier support to its students and mentorship for personalised learning",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-1.webp",
      },
      {
        title: "Student-Friendly Study",
        desc: "Uttaranchal University's online, user friendly, learner centric LMS, live and interactive sessions, and well-designed self learning materials.",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-2.webp",
      },
      {
        title: "Curriculum by Experts",
        desc: "Uttaranchal University's online research-intensive curriculum is drafted by its expert members of faculty and industry leaders.",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-3.webp",
      },
      {
        title: "Globally Accepted",
        desc: "Uttaranchal University's online programs under its curriculum are globally accepted. Uttaranchal University's fee is also affordable for all its programs.",
        icon: "/assets/all_universities_images/uu/icon-uttaranchal-4.webp",
      },
    ],
  },

  degreeInfo: {
    highlight: "UGC Approved",
    line1: "Uttaranchal University",
    line2: "Online Degree",
    title: "UGC Approved\nUttaranchal University\nOnline Degree",
    description:
      "Online degrees from Online UU are recognized by UGC & AICTE and are accepted by the government, education institutions, and corporates.",
    buttonText: "Get Degree",
    image: "/assets/all_universities_images/uu/sample-degree-uttarancha1.webp",
  },

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
      themeColor: "#22c55e",
      borderColor: "#22c55e",
      cardBg: "#f0fdf4",
    },
    {
      num: 5,
      title: "Document Submit",
      desc: "You need to upload all the required verified documents.",
      themeColor: "#9333ea",
      borderColor: "#9333ea",
      cardBg: "#faf5ff",
    },
    {
      num: 6,
      title: "Admission Confirm",
      desc: "Get Confirmation on your Email & Whatsapp",
      themeColor: "#f97316",
      borderColor: "#f97316",
      cardBg: "#fff8f0",
    },
  ],

  faqs: [
    {
      q: "When did Online UU, under which Act, come into existence?",
      a: "Uttaranchal University online was established under Act No. 11 of 2013 and established in 2013.",
    },
    {
      q: "Is Uttaranchal University's online fee affordable for students?",
      a: "Yes, Uttaranchal University Online fees are affordable and offer flexible installment options with easy education loans.",
    },
    {
      q: "Where is the Online UU situated?",
      a: "Uttaranchal University is located in Dehradun, Uttarakhand, India.",
    },
    {
      q: "Is the Online UU degree valid?",
      a: "Yes, Online UU degrees are UGC-Entitled and recognized worldwide for government jobs, private employment, and higher studies.",
    },
    {
      q: "How can a student get more information about Online UU?",
      a: "Students can connect with academic advisors through the online enquiry form or call +91 7065 7777 55.",
    },
  ],
};
