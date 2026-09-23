"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import { Button, Checkbox, Col, Collapse, Form, Input, message, Row, Select } from "antd";
import { ChevronDown, X } from "lucide-react";
import { FaAngleDoubleRight, FaArrowRight, FaDownload, FaHourglassHalf, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import styles from "./page.module.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const LOCAL = "/amitylp";
const PHONE = "07065777755";
const WHATSAPP = "https://api.whatsapp.com/send/?phone=+917065777755&text=I%20want%20to%20Download%20Amity%20Online%20Brochure";

const courseOptions = ["MBA", "MCA", "MCOM", "MA", "MSC", "BBA", "BCA", "BCOM", "BA"];

const stateOptions = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Jammu and Kashmir", "Puducherry", "Lakshadweep", "Ladakh",
  "Chandigarh", "Andaman and Nicobar Islands", "Dadra and Nagar Haveli and Daman and Diu",
];

const approvals = [
  ["Ugc-approval.png", "Approved by the University Grants Commission of India"],
  ["NaacA+-approval.png", "NAAC Accredited with A+ Grade"],
  ["NIRF-Approval.png", "Ranked 32nd in NIRF (National Institutional Ranking Framework)"],
  ["AICTE-Approval.png", "Approved by All India Council for Technical Education"],
  ["THE-approval.png", "Recognised by The World University Rankings (THE)"],
  ["QS-approval.png", "Ranked by QS (Quacquarelli Symonds)"],
  ["WES-Approval.png", "Recognised by World Education Services (WES)"],
  ["WASc-approval.png", "Accredited by Western Association of Schools and Colleges (WASC)"],
];

const courses = [
  {
    name: "MBA",
    type: "Post Graduation",
    title: "Master of Business Administration",
    image: "MBA-amity.png",
    months: "24 Months",
    description:
      "Amity University Online provides an online 2-year MBA program. Amity University MBA online program is crafted to help learners develop leadership, and business skills for successful careers or entrepreneurship.",
  },
  {
    name: "MCA",
    type: "Post Graduation",
    title: "Master of Computer Application",
    image: "MCA-amity.png",
    months: "24 Months",
    description:
      "The Amity University online MCA program provides learning in advanced technologies and tools. The MCA Online Course Amity provides specializations in Blockchain and many other in collaboration with eCornell and TCS iON.",
  },
  {
    name: "MCOM",
    type: "Post Graduation",
    title: "Master of Commerce",
    image: "MCOM-amity.png",
    months: "24 Months",
    description:
      "Amity University Online M.com offers a rock foundation in 3 aspects - Commerce, Finance, and Technology. Amity University Online M.com offers a specialization in Financial Management, with many more providing strong career opportunities.",
  },
  {
    name: "MA",
    type: "Post Graduation",
    title: "Master of Arts",
    image: "MA-amity.png",
    months: "24 Months",
    description:
      "Amity University Online MA program offers learning on solving real-world issues. The Online MA program provides specializations in two fields: Public Policy & Governance and Journalism & Mass Communication (JMC).",
  },
  {
    name: "MSC",
    type: "Post Graduation",
    title: "Master of Science",
    image: "msc-main-img.webp",
    months: "24 Months",
    description:
      "Amity University's online MSC program offers learning on big data technologies. The Online MSC program focuses on Data Science, Data Visualization, AI, ML, and many more fields to open doors to a wide range of opportunities for students.",
  },
  {
    name: "BBA",
    type: "Graduation",
    title: "Bachelor of Business Administration",
    image: "BBA-amity.png",
    months: "36 Months",
    description:
      "In Amity University online BBA program, students learn topics like managerial economics and many more in-depth. The Amity online BBA Program provides an in-depth study of theoretical and functional areas of BBA.",
  },
  {
    name: "BCA",
    type: "Graduation",
    title: "Bachelor of Computer Application",
    image: "BCA-amity.png",
    months: "36 Months",
    description:
      "Amity University Online BCA is a 3-year program that provides knowledge of computer skills in programming, software development, and managing digital data through its online BCA program with top in-demand market areas.",
  },
  {
    name: "BCOM",
    type: "Graduation",
    title: "Bachelor of Commerce",
    image: "BCOM-amity.png",
    months: "36 Months",
    description:
      "Amity University Online offers a 3-year B.COM program providing a solid base in accounting, taxation, business operations, marketing, fund management, and advertising. Amity online B.COM builds students' overall financial knowledge.",
  },
  {
    name: "BA",
    type: "Graduation",
    title: "Bachelor of Arts",
    image: "BA-amity.png",
    months: "36 Months",
    description:
      "Amity University Online BA is a 3-year program that offers the necessary skills required in different work cultures-critical and innovative thinking, communication, humanities, and understanding of different languages.",
  },
];

const steps = [
  { no: 1, tone: "orange", title: "Submit Form", text: "Fill in and submit your application form online" },
  { no: 2, tone: "blue", title: "Expert's Counseling", text: "You will receive a call from our expert counselor" },
  { no: 3, tone: "pink", title: "Choose University", text: "Select the course & university according to your interest" },
  { no: 4, tone: "green", title: "Online Payment", text: "You need to make a smooth online fee submission" },
  { no: 5, tone: "purple", title: "Document Submit", text: "You need to upload all the required verified documents." },
  { no: 6, tone: "orange", title: "Admission Confirm", text: "Get Confirmation on your Email & Whatsapp" },
];

const whyChoose = [
  [
    "International Recognition",
    "Amity Online is India's only university accredited by WASC (USA). Its degrees are WES-recognized in the USA and Canada, enabling global education.",
  ],
  [
    "QS Ranked Online MBA",
    "Amity offers India's only Online MBA ranked in the Asia Pacific Top 10 by QS, ensuring strong global recognition.",
  ],
  [
    "Industry-Ready Certifications",
    "Amity University Online includes top in-demand industry certificates and programs. Amity online programs from Amity University enhance students' skills and knowledge.",
  ],
  [
    "AI-Powered Career Discovery Platform",
    "Amity University online curriculum helps in building a strong resume for market-standard with AI-Powered Career Discovery Platform access to mock interviews, tools related to resumes, and jobs.",
  ],
];

const faqs = [
  [
    "Are the Amity University online programs recognized by UGC?",
    "Yes, Amity Online degrees are recognized by UGC and approved by AICTE (for applicable courses). They are fully recognized and have the same value as traditional degrees.",
  ],
  [
    "What kind of online courses does Amity University online offer?",
    "Amity University Online offers various degrees and certifications. The main programs are the UG, PG in a wide range of fields, including MBA, MCA, M.COM, MA, BA, BBA, and many more, and certificates/diplomas under Amity online programs.",
  ],
  [
    "Is the entrance exam required to take admission in Amity University online?",
    "No, any student doesn't need to give any entrance exam. Admission is based on eligibility criteria.",
  ],
  [
    "What is the approximate duration of Amity University's online degree programs?",
    "Amity University online UG programs offer several types of online courses. 3-year UG course, 2-year PG courses, and 24-month duration certification under Amity Online programs.",
  ],
  [
    "What placement support do students receive after completing an online degree at Amity University online?",
    "The university hosts virtual job fairs and also provides placement assistance through its 500+ hiring partners and career support services.",
  ],
];

const legalContent = {
  disclaimer: {
    title: "Disclaimer",
    blocks: [
      ["p", "SODE Counselling Services LLP acts as a marketing agency. All university names, logos, and trademarks mentioned are used for informational purposes only."],
      ["p", "We are not a university or an admission authority. SODE does not offer any degree, diploma, or certificate on its own and does not collect university fees directly."],
      ["h5", "1. Information Purpose"],
      ["p", "All the information shared on this platform, including course details, fees, eligibility, and specializations, is for general informational purposes only. It may change without prior notice."],
      ["h5", "2. Verify With the University"],
      ["p", "Users are encouraged to verify all information on the official website of the university before making any decision. Course and fee details are subject to change at the university's discretion."],
      ["h5", "3. No Guarantee of Admission"],
      ["p", "Admission, eligibility, and fee approvals are decided solely by the respective university. SODE only provides counselling and application assistance."],
      ["h5", "4. Contact Us"],
      ["p", "For any support, email us at: support@distanceeducationschool.com"],
    ],
  },
  terms: {
    title: "Terms and Conditions",
    blocks: [
      ["p", "This page outlines the terms and conditions that apply when you access or use services provided on this platform, operated by SODE Counselling Services LLP under DistanceEducationSchool.com."],
      ["p", "We help students and working professionals explore distance and online education options offered by UGC-DEB-approved universities. These terms outline how we support the process, particularly when payments and third-party tools are involved."],
      ["h5", "1. Our Role"],
      ["p", "We provide information and counselling services only. We are not a university and do not collect any university fees directly. All academic or admission-related payments must be made to the respective university."],
      ["h5", "2. Unauthorised Use or Fraud"],
      ["p", "If you suspect any unauthorised transaction linked to a service on our platform, report it immediately. We will coordinate with the respective payment partner for further action."],
      ["h5", "3. Updates to These Terms"],
      ["p", "These terms may be updated as services evolve. Continued use of this platform implies your agreement to the latest version of these terms."],
      ["h5", "4. Contact Us"],
      ["p", "For support, email us at: support@distanceeducationschool.com"],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    blocks: [
      ["p", "All information on this platform is provided by DistanceEducationSchool.com, under the legal name of SODE Counselling Services LLP. We are an educational counselling platform that helps students find trusted distance and online courses from UGC-DEB-approved universities. Our goal is to provide accurate information and personalised support to help you choose the right program."],
      ["h5", "1. No Personal Data Collected by Default"],
      ["p", "You can freely browse our website without sharing any personal information. We do not collect your name, phone number, or email address unless you choose to fill out a form or contact us directly."],
      ["h5", "2. How We Use It"],
      ["p", "Your information is used to:"],
      ["ul", ["Guide you in choosing the right university or course", "Provide counselling support", "Share admission-related updates"]],
      ["p", "We may send you important updates (like admission deadlines or university alerts) via WhatsApp and email. You can opt out anytime."],
      ["h5", "3. Scope"],
      ["p", "This privacy policy applies to visitors who access this specific platform operated under DistanceEducationSchool.com by SODE Counselling Services LLP. It covers how we collect, use, and protect data when you explore course information, compare universities, or fill out enquiry forms on this platform. This policy applies only to the information collected through this platform and does not cover any data collected on the main website or other external sites."],
      ["h5", "4. Data Sharing"],
      ["p", "We share your details only with trusted university partners, and only for the purpose of counselling or admission. We do not sell or share data with third-party advertisers."],
      ["h5", "5. External Links"],
      ["p", "Our website may include links to official university portals. We are not responsible for the content or privacy policies of those external sites. We recommend visiting the official university website for new updates."],
      ["h5", "6. Cookies and Analytics"],
      ["p", "Our website uses cookies to improve the user experience. These help us understand how visitors use our site (e.g., most viewed pages, time spent, etc.). These cookies do not identify you personally."],
    ],
  },
};

function LeadForm({ compact = false, onSuccess }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          form_name: compact ? "Amity Landing Page Footer Form" : "Amity Landing Page",
          source: "SODE",
          page_url: window.location.href,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Unable to submit form");
      message.success("Thank you. Our academic expert will contact you shortly.");
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      message.error(error.message || "Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={submit}
      className={`${styles.leadForm} ${compact ? styles.compactForm : ""}`}
    >
      {!compact && <div className={styles.formTitle}>Enquire Now</div>}
      {!compact && <div className={styles.formSubtitle}>Academic Experts will assist you!</div>}
      {!compact && (
        <div className={styles.callPillSection}>
          <a className={styles.callPill} href={`tel:${PHONE}`}>
            <FaPhoneAlt size={13} /> +91 7065 7777 55
          </a>
        </div>
      )}

      <Row gutter={[10, 0]}>
        <Col xs={24} md={compact ? 8 : 24}>
          <Form.Item name="name" rules={[{ required: true, message: "Enter your name" }]}>
            <Input placeholder="Enter Your Name" />
          </Form.Item>
        </Col>
        <Col xs={24} md={compact ? 8 : 24}>
          <Form.Item name="email" rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
            <Input placeholder="Enter Your Email" />
          </Form.Item>
        </Col>
        <Col xs={24} md={compact ? 8 : 24}>
          <Form.Item name="phone" rules={[{ required: true, message: "Enter your mobile number" }]}>
            <Input addonBefore="+91" maxLength={10} placeholder="Enter 10-digit Mobile Number" />
          </Form.Item>
        </Col>
        <Col xs={24} md={compact ? 8 : 24}>
          <Form.Item name="course" rules={[{ required: true, message: "Select a course" }]}>
            <Select
              placeholder="Select Your Course"
              options={courseOptions.map((course) => ({ value: course, label: course }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={compact ? 8 : 24}>
          <Form.Item name="state" rules={[{ required: true, message: "Select your state" }]}>
            <Select
              showSearch
              placeholder="Select Your State"
              options={stateOptions.map((state) => ({ value: state, label: state }))}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="consent"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error("Please accept the consent")),
          },
        ]}
      >
        <Checkbox>
          I consent to receive university updates via email and mobile number. <u>Disclaimer</u>
        </Checkbox>
      </Form.Item>

      <Button htmlType="submit" type="primary" loading={loading} block>
        Submit
      </Button>
    </Form>
  );
}

export default function AmityLandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [legal, setLegal] = useState(null);
  const openForm = () => setModalOpen(true);

  return (
    <main className={`${styles.page} ${poppins.variable}`}>
      {/* ============ HEADER ============ */}
      <header className={styles.topbar}>
        <a href="#top" className={styles.brand} aria-label="SODE Amity University Online">
          <img src={`${LOCAL}/sode-favicon.png`} alt="SODE" className={styles.sodeLogo} />
          <img
            src={`${LOCAL}/Amity-online-logo.png`}
            alt="Amity University Online"
            className={styles.amityLogo}
          />
        </a>
        <div className={styles.admission}>
          Admission Open <strong>2026</strong>
        </div>
      </header>

      {/* ============ HERO / BANNER ============ */}
      <section className={styles.banner} id="top">
        <div className={styles.bannerGrid}>
          <div className={styles.bannerCopy}>
            <p className={styles.hashtag}>#YourFutureBeginsHere</p>
            <h2 className={styles.bannerTitle}>Amity University Online</h2>
            <p className={styles.bannerAbout}>Learn from Anywhere, Grow Everywhere</p>
            <span className={styles.yellowLabel}>Online Degree Courses :</span>
            <div className={styles.highlightCourse}>
              <h2>MBA | MCA | MCOM | MA | MSC | BBA | BCA | BCOM | BA</h2>
            </div>
            <button type="button" className={styles.brochureBtn} onClick={openForm}>
              Download Brochure &nbsp;
              <FaDownload />
            </button>
          </div>

          <div className={styles.bannerModel}>
            <img src={`${LOCAL}/new_university_img.png`} alt="Amity University Online" />
          </div>

          <div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ============ RECOGNITION & APPROVALS ============ */}
      <section className={styles.approvals} id="approvals">
        <div className={styles.approvalHead}>
          <h2>
            Amity University Online
            <br /> Recognition and Approvals
          </h2>
        </div>
        <div className={styles.approvalGrid}>
          {approvals.map(([image, text]) => (
            <div className={styles.approvalBox} key={image}>
              <img src={`${LOCAL}/${image}`} alt={text} />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PROGRAMMES / DEGREE COURSES ============ */}
      <section className={styles.programmes} id="programmes">
        <h2 className={styles.programmeHeading}>
          Amity University
          <br />
          Online Degree Courses
        </h2>
        <div className={styles.programmeRow}>
          {courses.map((course) => (
            <article className={styles.programCard} key={course.name}>
              <span className={styles.programLabel}>{course.type}</span>
              <img
                src={`${LOCAL}/${course.image}`}
                alt={`${course.name} online degree course`}
                loading="lazy"
              />
              <div className={styles.programBody}>
                <h3>{course.name}</h3>
                <h4>{course.title}</h4>
                <p>{course.description}</p>
                <hr />
                <div className={styles.infoBox}>
                  <button type="button" onClick={openForm}>
                    Get Brochure <FaDownload />
                  </button>
                  <p>
                    <FaHourglassHalf /> {course.months}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className={styles.aboutSection} id="about">
        <div className={styles.aboutGrid}>
          <img src={`${LOCAL}/Amity-About.png`} alt="About Amity University Online" loading="lazy" />
          <div className={styles.aboutCopy}>
            <h2>About Amity University Online</h2>
            <p>
              Amity University Online is India&apos;s first UGC-approved online university. This
              university offers a total of 24 bachelor&apos;s and master&apos;s degree programs with a
              wide range of specializations. Amity University Uttar Pradesh, &apos;A+&apos; NAAC grade,
              and is recognized by WES, AIU, making it eligible to conduct online courses in different
              fields. Amity University Online Degree Programs offers an in-demand, up-to-date
              curriculum. It follows the anytime, anywhere mantra for course content, providing all
              content, live &amp; recorded lectures.
            </p>
            <p>
              The university also gives career support, expert mentorship, and placement assistance.
              With flexible learning options, EMI-based fee payment, and a strong academic reputation,
              it offers to its students.
            </p>
            <button type="button" className={styles.aboutBtn} onClick={openForm}>
              Apply Now &nbsp;
              <FaArrowRight />
            </button>
          </div>
        </div>
        <hr />
      </section>

      {/* ============ ACHIEVEMENTS ============ */}
      <section className={styles.achievement}>
        <div className={styles.achievementGrid}>
          {[
            ["Number-1-amity.png", "30+", "Year Excellence"],
            ["Number-2-amity.png", "500+", "Hiring Partners"],
            ["Number-3-amity.png", "82K+", "Online Learners"],
            ["Number-4-amity.png", "60+", "In-Demand Specialization"],
          ].map(([image, value, label]) => (
            <div className={styles.achieveBox} key={label}>
              <img src={`${LOCAL}/${image}`} alt={label} loading="lazy" />
              <div>
                <h3>{value}</h3>
                <p>{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ WHY CHOOSE ============ */}
      <section className={styles.whyChoose} id="whychoose">
        <h2>Why Choose Amity University Online for Degree Courses</h2>
        <div className={styles.whyGrid}>
          <div>
            <div className={styles.whyTextGrid}>
              {whyChoose.map(([title, text]) => (
                <div className={styles.whyItem} key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <button type="button" className={styles.applyYellow} onClick={openForm}>
              Apply Now <FaArrowRight />
            </button>
          </div>
          <div className={styles.whyImage}>
            <img
              src={`${LOCAL}/Why-choose-amity.png`}
              alt="Why choose Amity University Online for degree courses"
              loading="lazy"
            />
            <button type="button" className={styles.applyYellow} onClick={openForm}>
              Apply Now <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* ============ HOW TO APPLY ============ */}
      <section className={styles.applySection}>
        <h2>How to Apply for Amity University Online Courses</h2>
        <p className={styles.sectionDesc}>
          The admission process for Amity University course admissions is very simple and
          user-friendly. Here&apos;s a step-by-step guide to enrolling in a degree course at the
          university :
        </p>
        <div className={styles.stepsWrapper}>
          {steps.map((step) => (
            <div className={`${styles.stepCard} ${styles[step.tone]}`} key={step.no}>
              <div className={styles.stepNumber}>{step.no}</div>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className={styles.faqSection} id="faqs">
        <h2>Frequently Asked Questions</h2>
        <Collapse
          bordered={false}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (isActive ? <X size={16} /> : <ChevronDown size={18} />)}
          items={faqs.map(([question, answer], index) => ({
            key: index,
            label: `Q${index + 1}. ${question}`,
            children: <p>{answer}</p>,
          }))}
        />
      </section>

      {/* ============ FOOTER FORM ============ */}
      <section className={styles.footerForm} id="ftr-frm">
        <div className={styles.footerFormInner}>
          <h3 className={styles.footerFormTitle}>Have Questions?</h3>
          <p className={styles.footerFormText}>
            Don&apos;t hesitate to contact us. Our academic experts are here to assist you!
          </p>
          <LeadForm compact />
        </div>
      </section>

      {/* ============ COMPARE UNIVERSITY ============ */}
      <div className={styles.compareSection}>
        <div className={styles.compareBox}>
          <h2>Still Confused?</h2>
          <h4>Compare Amity University with Top UGC-DEB Approved Universities</h4>
          <button
            type="button"
            className={styles.compareBtn}
            onClick={openForm}
            aria-label="Compare universities"
          >
            <img src={`${LOCAL}/arrow.gif`} alt="" />
          </button>
        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <footer className={styles.miniFooter}>
        <div className={styles.footerLogoWrap}>
          <a href="#top">
            <img src={`${LOCAL}/new-des-logo.webp`} alt="Distance Education School - SODE" />
          </a>
        </div>
        <div className={styles.footerBar}>
          <p>
            SODE Counselling Services LLP acts as a marketing agency. All university names, logos, and
            trademarks mentioned are used for informational purposes only. We are not a university or
            an admission authority. Users are encouraged to verify information on the official website
            of the University before making decisions.
            <br />
            <br />
            <button type="button" className={styles.legalLink} onClick={() => setLegal("disclaimer")}>
              Disclaimer
            </button>{" "}
            |{" "}
            <button type="button" className={styles.legalLink} onClick={() => setLegal("terms")}>
              Terms &amp; Conditions
            </button>{" "}
            |{" "}
            <button type="button" className={styles.legalLink} onClick={() => setLegal("privacy")}>
              Privacy Policy
            </button>
          </p>
        </div>
        <div className={styles.footerBottom}>© 2026 SODE Counseling Services LLP</div>
      </footer>

      {/* ============ FLOATING BUTTONS ============ */}
      <button
        type="button"
        className={styles.couponBtn}
        onClick={openForm}
        aria-label="Get scholarship details"
      >
        <img src={`${LOCAL}/gift.gif`} alt="" />
      </button>
      <a className={styles.callFix} href={`tel:${PHONE}`} aria-label={`Call +91 7065 7777 55`}>
        <img src={`${LOCAL}/call_icon.gif`} alt="" />
      </a>

      {/* ============ MOBILE STICKY BUTTONS ============ */}
      <div className={styles.stickyBar}>
        <a className={styles.wpBtn} href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          <FaWhatsapp /> Get Brochure
        </a>
        <button type="button" className={styles.applyBtn} onClick={openForm}>
          Apply Now <FaAngleDoubleRight />
        </button>
      </div>

      {/* ============ ENQUIRY MODAL ============ */}
      {modalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setModalOpen(false)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <button
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <LeadForm onSuccess={() => setModalOpen(false)} />
          </div>
        </div>
      )}

      {/* ============ LEGAL MODAL (Disclaimer / Terms / Privacy) ============ */}
      {legal && (
        <div className={styles.modalBackdrop} onClick={() => setLegal(null)}>
          <div className={styles.legalModal} onClick={(event) => event.stopPropagation()}>
            <button className={styles.legalClose} onClick={() => setLegal(null)} aria-label="Close">
              &times;
            </button>
            <h2>{legalContent[legal].title}</h2>
            <hr />
            {legalContent[legal].blocks.map((block, index) =>
              block[0] === "h5" ? (
                <h5 key={index}>{block[1]}</h5>
              ) : block[0] === "ul" ? (
                <ul key={index}>
                  {block[1].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p key={index}>{block[1]}</p>
              )
            )}
          </div>
        </div>
      )}
    </main>
  );
}







