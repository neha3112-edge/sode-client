"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";

import SWRProvider from "@/components/providers/SWRProvider";
import JsonLd from "@/components/common/JsonLd";
import { ToolWizardProvider } from "@/components/tool/ToolWizardContext";
import { BreadcrumbProvider } from "@/context/BreadcrumbContext";

const CompareDrawerWidget = dynamic(() => import("@/components/website/CompareDrawerWidget"), { ssr: false });
const AutoEngineToolModal = dynamic(() => import("@/components/tool/AutoEngineToolModal"), { ssr: false });

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
            <BreadcrumbProvider>
              <ToolWizardProvider>
                <JsonLd />
                {children}
                <CompareDrawerWidget />
                <AutoEngineToolModal />
              </ToolWizardProvider>
            </BreadcrumbProvider>
          </SWRProvider>
        </App>
      </ConfigProvider>
    </AntdRegistry>
  );
}
