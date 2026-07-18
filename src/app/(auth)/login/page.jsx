"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Button, Divider, Input, Form, message as antdMessage } from "antd";
import {
  FacebookFilled,
  GoogleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLoginMutation } from "@/redux/auth/action";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [loginForm] = Form.useForm();

  // RTK Mutation Hook
  const [triggerLogin, { isLoading: isLoginLoading, isSuccess }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push("/admin-dashboard");
    }
  }, [isSuccess, router]);

  const handleLogin = async (values) => {
    try {
      // 🎯 FIXED: अब Antd Form सीधे 'username' कैप्चर करता है और पेलोड में पास करता है
      await triggerLogin({ loginData: values }).unwrap();
    } catch (error) {
      console.error("Login component submission error:", error);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-zinc-50 font-sans text-black">
      {/* =========================================================
          LEFT PANEL: BRAND INFORMATIVE UI
      ========================================================= */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-linear-to-br from-[#1C3569] via-[#17305e] to-[#005382] p-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#FFC107]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FFC107] backdrop-blur-md">
            SODE Control Engine v2.0
          </div>
        </div>

        <div className="relative z-10 max-w-xl my-auto">
          <h1 className="text-4xl font-black text-white leading-tight md:text-5xl">
            Unified Management &amp;{" "}
            <span className="text-[#FFC107]">CRM Systems</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/80">
            Access secure analytics streams, track prospective student
            applications, manage global partner institution programs, and
            configure structural configurations instantly.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-3xl font-black text-white">99.9%</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">
                Uptime Reliability
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#FFC107]">Real-time</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-white/50">
                Data Synchronization
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs font-medium text-white/40">
          <p>© 2026 SODE Counseling Services LLP</p>
          <div className="flex gap-4">
            <a href="#terms" className="hover:text-white transition">
              Terms
            </a>
            <a href="#privacy" className="hover:text-white transition">
              Privacy
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================
          RIGHT PANEL: FORMS & SOCIAL AUTHENTICATION
      ========================================================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white">
        <div className="w-full max-w-md flex flex-col items-center">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/assets/images/new_sode_tm_logo.png"
              alt="SODE Logo"
              width={85}
              height={85}
              priority
              className="object-contain"
            />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
              Admin Portal Login
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Sign in to access SODE Control Center
            </p>
          </div>

          {/* Antd Login Form Integration */}
          <Form
            form={loginForm}
            layout="vertical"
            onFinish={handleLogin}
            requiredMark={false}
            className="w-full space-y-1 ant-form-custom-styles"
          >
            {/* 🎯 FIXED: Field changed from Email to Username (accepts user/email/phone) */}
            <Form.Item
              label={
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Username / Email / Phone
                </span>
              }
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter your username, email or phone number.",
                },
              ]}
            >
              <Input
                size="medium"
                placeholder="abhijadon"
                prefix={<UserOutlined className="text-zinc-400 mr-1" />}
                className="rounded-xl h-12 bg-zinc-50 border-zinc-200 focus:bg-white"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Password
                </span>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password.",
                },
              ]}
            >
              <Input.Password
                size="medium"
                placeholder="••••••••"
                prefix={<LockOutlined className="text-zinc-400 mr-1" />}
                className="rounded-xl h-12 bg-zinc-50 border-zinc-200"
              />
            </Form.Item>

            <Form.Item className="mb-0 pt-2">
              <Button
                htmlType="submit"
                loading={isLoginLoading}
                size="large"
                className="w-full border-none text-white font-medium tracking-wide shadow-md bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <Divider className="my-6 text-zinc-400 text-xs font-medium uppercase tracking-widest">
            Or Continue With
          </Divider>

          {/* Social Login Buttons Section */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button
              icon={<GoogleOutlined />}
              onClick={() =>
                antdMessage.info("Google SSO initialization setup flow...")
              }
              className="h-11 rounded-xl font-bold border-zinc-200 text-zinc-700 flex items-center justify-center gap-2"
            >
              Google
            </Button>
            <Button
              icon={<FacebookFilled className="text-[#1877F2]" />}
              onClick={() =>
                antdMessage.info(
                  "Facebook Authentication sequence setup flow...",
                )
              }
              className="h-11 rounded-xl font-bold border-zinc-200 text-zinc-700 flex items-center justify-center gap-2"
            >
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
