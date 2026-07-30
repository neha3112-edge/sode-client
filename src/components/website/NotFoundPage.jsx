"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { QuestionCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";

export default function NotFoundPage({
  title = "Page Not Found",
  message = "We couldn't find the page you're looking for. It might have been moved, renamed, or is currently unavailable.",
  buttonText = "Explore All Courses",
  redirectUrl = "/courses",
}) {
  const router = useRouter();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F4F6F9] px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden text-center relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0C3058] via-[#00B4D8] to-[#0C3058]"></div>
        <div className="p-10 flex flex-col items-center">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <QuestionCircleOutlined className="text-5xl text-[#00B4D8]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0C3058] mb-3">
            {title}
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">{message}</p>
          <Button
            type="primary"
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push(redirectUrl)}
            className="bg-[#0C3058] hover:bg-[#1a4b82] text-white border-none rounded-xl font-bold h-12 px-8 w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-300"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
