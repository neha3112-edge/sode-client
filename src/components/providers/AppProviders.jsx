"use client";

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";

import SWRProvider from "@/components/providers/SWRProvider";
import CompareDrawerWidget from "@/components/website/CompareDrawerWidget";
import JsonLd from "@/components/common/JsonLd";

/**
 * AppProviders - Consolidated System Wrapper for SODE Application
 */
export default function AppProviders({ children }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "var(--font-roboto), sans-serif",
            colorPrimary: "#1d4ed8",
          },
        }}
      >
        <App>
          <SWRProvider>
            <JsonLd />
            {children}
            <CompareDrawerWidget />
          </SWRProvider>
        </App>
      </ConfigProvider>
    </AntdRegistry>
  );
}
