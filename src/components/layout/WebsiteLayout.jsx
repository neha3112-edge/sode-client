"use client";

import React from "react";
import { Layout } from "antd";
import Container from "@/components/common/Container";

const { Content: AntContent } = Layout;

/**
 * WebsiteLayout - Centralized Ant Design Layout Wrapper for SODE Website Pages
 * Manages standardized top/bottom page padding, background colors, and max-width containers using Ant Design.
 */
export function WebsiteLayout({
  children,
  className = "",
  hasContainer = true,
  py = "py-4 sm:py-6",
  bg = "#f8fafc",
}) {
  return (
    <Layout className="w-full min-h-screen font-sans" style={{ background: bg }}>
      <AntContent className={`w-full ${py} ${className}`} style={{ background: bg }}>
        {hasContainer ? <Container>{children}</Container> : children}
      </AntContent>
    </Layout>
  );
}

export default WebsiteLayout;
