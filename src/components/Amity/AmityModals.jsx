"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal, Form, Input, Select, Button, Checkbox, message } from "antd";
import { Download, Gift, Scale } from "lucide-react";
import { triggerFormConfetti } from "@/lib/confetti";
import { AMITY_COURSE_OPTIONS, AMITY_STATE_OPTIONS } from "./AmityLeadForm";

/* =========================================================
   1. BROCHURE MODAL (ANT DESIGN)
========================================================= */
export function AmityBrochureModal({
  isOpen,
  onClose,
  selectedCourse = "MBA",
  onOpenDisclaimer,
}) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({
        course: selectedCourse || "MBA",
        disclaimer: true,
      });
      triggerFormConfetti();
    }
  }, [isOpen, selectedCourse, form]);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const payload = {
        name: values.full_name,
        email: values.email,
        phone: values.phone.replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: "Amity University Online",
        source: "Amity",
        form_name: "Brochure Download Form",
        utm_source: searchParams.get("utm_source") || "Amity_Landing_Page",
        page_url: window.location.href,
      };

      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn(err);
      }

      message.success("Prospectus is being sent to your email & WhatsApp!");
      onClose();
      router.push("/thank-you");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={460}
      className="amity-modal rounded-3xl overflow-hidden"
    >
      <div className="pt-2">
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-3">
            <Download className="w-6 h-6 text-amber-700" />
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Download Amity Prospectus
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Enter your details to receive the syllabus, fee structure & admission guide.
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="space-y-1"
        >
          <Form.Item
            name="full_name"
            rules={[{ required: true, message: "Please enter your name" }]}
            className="mb-2.5"
          >
            <Input size="large" placeholder="Full Name *" className="rounded-xl text-sm" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email" },
            ]}
            className="mb-2.5"
          >
            <Input size="large" placeholder="Email Address *" className="rounded-xl text-sm" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please enter your 10-digit number" },
              { pattern: /^[0-9]{10}$/, message: "Must be a 10-digit number" },
            ]}
            className="mb-2.5"
          >
            <Input
              size="large"
              prefix={<span className="text-xs text-slate-500 font-semibold pr-1">🇮🇳 +91</span>}
              placeholder="10-digit Mobile Number *"
              maxLength={10}
              className="rounded-xl text-sm"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-2">
            <Form.Item
              name="course"
              rules={[{ required: true, message: "Select course" }]}
              className="mb-2.5"
            >
              <Select
                size="large"
                placeholder="Select Course"
                options={AMITY_COURSE_OPTIONS}
                className="w-full text-xs sm:text-sm"
              />
            </Form.Item>

            <Form.Item
              name="state"
              rules={[{ required: true, message: "Select state" }]}
              className="mb-2.5"
            >
              <Select
                size="large"
                placeholder="Select State"
                options={AMITY_STATE_OPTIONS}
                className="w-full text-xs sm:text-sm"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="disclaimer"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error("Please accept terms")),
              },
            ]}
            className="mb-3"
          >
            <Checkbox className="text-[11px] text-slate-600">
              I agree to receive prospectus.{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDisclaimer?.();
                }}
                className="text-blue-700 underline font-semibold cursor-pointer"
              >
                Disclaimer
              </span>
            </Checkbox>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            className="h-12! rounded-xl! bg-amber-500! hover:bg-amber-400! text-slate-950! font-black! text-sm! uppercase! tracking-wide! shadow-lg! shadow-amber-500/25! border-0! cursor-pointer!"
          >
            Download Prospectus
          </Button>
        </Form>
      </div>
    </Modal>
  );
}

/* =========================================================
   2. SCHOLARSHIP COUPON MODAL (ANT DESIGN + CONFETTI)
========================================================= */
export function AmityScholarshipModal({ isOpen, onClose, onOpenDisclaimer }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({ course: "MBA", disclaimer: true });
      triggerFormConfetti({
        colors: ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#22c55e"],
      });
    }
  }, [isOpen, form]);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const payload = {
        name: values.full_name,
        email: values.email,
        phone: values.phone.replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: "Amity University Online",
        source: "Amity",
        form_name: "Scholarship Coupon Form",
        page_url: window.location.href,
      };

      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn(err);
      }

      message.success("Scholarship Coupon code unlocked!");
      onClose();
      router.push("/thank-you");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={460}
      className="amity-modal rounded-3xl overflow-hidden"
    >
      <div className="pt-2">
        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30">
            <Gift className="w-7 h-7 animate-bounce" />
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider">
            Limited Period Offer
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Get Scholarship Coupon Code
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Apply now to claim up to <span className="font-bold text-amber-600">30% Scholarship</span> on tuition fees.
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="space-y-1"
        >
          <Form.Item
            name="full_name"
            rules={[{ required: true, message: "Please enter your name" }]}
            className="mb-2.5"
          >
            <Input size="large" placeholder="Full Name *" className="rounded-xl text-sm" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email" },
            ]}
            className="mb-2.5"
          >
            <Input size="large" placeholder="Email Address *" className="rounded-xl text-sm" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please enter your 10-digit number" },
              { pattern: /^[0-9]{10}$/, message: "Must be a 10-digit number" },
            ]}
            className="mb-2.5"
          >
            <Input
              size="large"
              prefix={<span className="text-xs text-slate-500 font-semibold pr-1">🇮🇳 +91</span>}
              placeholder="10-digit Mobile Number *"
              maxLength={10}
              className="rounded-xl text-sm"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-2">
            <Form.Item
              name="course"
              rules={[{ required: true, message: "Select course" }]}
              className="mb-2.5"
            >
              <Select
                size="large"
                placeholder="Select Course"
                options={AMITY_COURSE_OPTIONS}
                className="w-full text-xs sm:text-sm"
              />
            </Form.Item>

            <Form.Item
              name="state"
              rules={[{ required: true, message: "Select state" }]}
              className="mb-2.5"
            >
              <Select
                size="large"
                placeholder="Select State"
                options={AMITY_STATE_OPTIONS}
                className="w-full text-xs sm:text-sm"
              />
            </Form.Item>
          </div>

          <Form.Item
            name="disclaimer"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error("Please accept terms")),
              },
            ]}
            className="mb-3"
          >
            <Checkbox className="text-[11px] text-slate-600">
              I agree to receive coupon code.{" "}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDisclaimer?.();
                }}
                className="text-blue-700 underline font-semibold cursor-pointer"
              >
                Disclaimer
              </span>
            </Checkbox>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            className="h-12! rounded-xl! bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950! font-black! text-sm! uppercase! tracking-wide! shadow-lg! shadow-amber-500/30! border-0! cursor-pointer!"
          >
            Unlock Scholarship Coupon
          </Button>
        </Form>
      </div>
    </Modal>
  );
}

/* =========================================================
   3. COMPARE UNIVERSITIES MODAL (ANT DESIGN)
========================================================= */
export function AmityCompareModal({ isOpen, onClose, onOpenDisclaimer }) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({ course: "MBA", disclaimer: true });
    }
  }, [isOpen, form]);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const payload = {
        name: values.full_name,
        email: values.email,
        phone: values.phone.replace(/\D/g, "").slice(-10),
        course: values.course,
        state: values.state,
        university: "Amity University Online",
        source: "Amity",
        form_name: "Compare University Form",
        page_url: window.location.href,
      };

      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn(err);
      }

      onClose();
      window.open("https://distanceeducationschool.com/compare-university/", "_blank");
      router.push("/thank-you");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={460}
      className="amity-modal rounded-3xl overflow-hidden"
    >
      <div className="pt-2">
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center mx-auto mb-3">
            <Scale className="w-6 h-6 text-blue-700" />
          </div>
          <h3 className="text-xl font-black text-slate-900">
            Compare Amity Online with Top Universities
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Compare fees, accreditations, approvals, and curriculum side-by-side.
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="space-y-1"
        >
          <Form.Item
            name="full_name"
            rules={[{ required: true, message: "Please enter your name" }]}
            className="mb-2.5"
          >
            <Input size="large" placeholder="Full Name *" className="rounded-xl text-sm" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email" },
            ]}
            className="mb-2.5"
          >
            <Input size="large" placeholder="Email Address *" className="rounded-xl text-sm" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: "Please enter your 10-digit number" },
              { pattern: /^[0-9]{10}$/, message: "Must be a 10-digit number" },
            ]}
            className="mb-2.5"
          >
            <Input
              size="large"
              prefix={<span className="text-xs text-slate-500 font-semibold pr-1">🇮🇳 +91</span>}
              placeholder="10-digit Mobile Number *"
              maxLength={10}
              className="rounded-xl text-sm"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-2">
            <Form.Item
              name="course"
              rules={[{ required: true, message: "Select course" }]}
              className="mb-2.5"
            >
              <Select
                size="large"
                placeholder="Select Course"
                options={AMITY_COURSE_OPTIONS}
                className="w-full text-xs sm:text-sm"
              />
            </Form.Item>

            <Form.Item
              name="state"
              rules={[{ required: true, message: "Select state" }]}
              className="mb-2.5"
            >
              <Select
                size="large"
                placeholder="Select State"
                options={AMITY_STATE_OPTIONS}
                className="w-full text-xs sm:text-sm"
              />
            </Form.Item>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            className="h-12! rounded-xl! bg-blue-900! hover:bg-blue-800! text-white! font-black! text-sm! uppercase! tracking-wide! shadow-lg! shadow-blue-900/20! border-0! cursor-pointer!"
          >
            Compare Now
          </Button>
        </Form>
      </div>
    </Modal>
  );
}

/* =========================================================
   4. LEGAL POPUPS (ANT DESIGN MODAL)
========================================================= */
export function AmityLegalModal({ isOpen, onClose, type = "disclaimer" }) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      className="amity-modal rounded-3xl"
    >
      <div className="pt-2">
        {type === "disclaimer" && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-xl font-black text-slate-900">Disclaimer</h3>
            </div>
            <p>
              This information is provided by DistanceEducationSchool.com / SODE, under the legal entity of{" "}
              <strong>SODE Counselling Services LLP</strong>, registered with the Ministry of Corporate Affairs,
              with the primary objective of providing guidance and counselling regarding UGC-DEB approved
              universities. We do not act as a university or an admission authority.
            </p>
            <h4 className="font-bold text-slate-900 pt-2">Essential Guidelines:</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>All university names, logos, and trademarks are used for informational purposes only.</li>
              <li>We do not charge students any hidden fees for counselling or university guidance.</li>
              <li>We do not issue degrees or mark sheets in the name of any university.</li>
              <li>Users are encouraged to verify official details on the university website before enrolling.</li>
            </ul>
          </div>
        )}

        {type === "terms" && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-xl font-black text-slate-900">Terms and Conditions</h3>
            </div>
            <p>
              These terms govern the use of counselling support provided on this platform operated by SODE
              Counselling Services LLP under DistanceEducationSchool.com.
            </p>
            <h4 className="font-bold text-slate-900">1. Role & Services</h4>
            <p className="text-slate-600">
              We provide informational guidance and educational advisory only. All academic and university fee
              transactions are paid directly to the respective university.
            </p>
            <h4 className="font-bold text-slate-900">2. Updates to Terms</h4>
            <p className="text-slate-600">
              Terms are subject to periodic review. Continued access constitutes acceptance of the latest terms.
            </p>
          </div>
        )}

        {type === "privacy" && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="text-center pb-3 border-b border-slate-200">
              <h3 className="text-xl font-black text-slate-900">Privacy Policy</h3>
            </div>
            <p>
              SODE Counselling Services LLP is committed to protecting your privacy. We collect information solely
              to provide personalized academic guidance and updates about university programs.
            </p>
            <h4 className="font-bold text-slate-900">Data Usage & Protection</h4>
            <p className="text-slate-600">
              Your contact details are shared only with official authorized university counseling partners for
              admission assistance. We do not sell user data to third-party marketing agencies.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
