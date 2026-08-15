"use client";

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";

import StoreProvider from "@/app/storeProvider";
import SWRProvider from "@/components/providers/SWRProvider";
import { AppContextProvider } from "@/context";
import CompareDrawerWidget from "@/components/website/CompareDrawerWidget";
import JsonLd from "@/components/common/JsonLd";
import AntdMessageBridge from "@/components/layout/AntdMessageBridge";

/**
 * AppProviders - Consolidated System Wrapper for SODE Application
 * Wraps Antd Design System, Redux Store, SWR & Master AppContextProvider from `@/context`.
 */
export default function AppProviders({ children }) {
  return (
    <AntdRegistry>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "var(--font-montserrat), sans-serif",
            colorPrimary: "#1d4ed8",
          },
        }}
      >
        <App>
          <AntdMessageBridge />
          <StoreProvider>
            <SWRProvider>
              <AppContextProvider>
                <JsonLd />
                {children}
                <CompareDrawerWidget />
              </AppContextProvider>
            </SWRProvider>
          </StoreProvider>
        </App>
      </ConfigProvider>
    </AntdRegistry>
  );
}
