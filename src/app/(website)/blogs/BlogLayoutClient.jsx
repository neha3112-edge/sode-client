"use client";

import React from "react";
import { ConfigProvider } from "antd";

export default function BlogLayoutClient({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        },
      }}
    >
      <div className="blog-poppins-layout font-poppins min-h-screen">
        {children}
      </div>
    </ConfigProvider>
  );
}
