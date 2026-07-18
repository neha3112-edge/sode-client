"use client";

import { Layout, theme } from "antd";
import Sidebar from "@/components/layout/Sidebar";
import AuthHeader from "@/components/layout/AuthHeader";
import { AppContextProvider } from "@/context/app";
import StoreProvider from "@/app/storeProvider";

const { Content } = Layout;

export default function AdminDashboardLayout({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <StoreProvider>
      <AppContextProvider>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout style={{ minHeight: "100vh" }}>
            <AuthHeader />
            <Content
              className="m-2 max-h-screen overflow-auto p-6"
              style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </AppContextProvider>
    </StoreProvider>
  );
}
