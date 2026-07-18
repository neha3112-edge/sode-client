"use client";

import { Layout, theme } from "antd";
import Sidebar from "@/components/layout/Sidebar";
import AuthHeader from "@/components/layout/AuthHeader";
import DrawerPage from "@/components/shared/Drawer"; // 🆕 ग्लोबल ड्रॉर इम्पोर्ट किया

const { Content } = Layout;

export default function AdminDashboardLayout({ children }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout style={{ minHeight: "100vh" }}>
        <AuthHeader />
        <Content
          className={`m-2 max-h-screen overflow-auto`}
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
      <DrawerPage />
    </Layout>
  );
}
