"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Layout, theme, Spin } from "antd";
import Sidebar from "@/components/cms/Sidebar";
import AuthHeader from "@/components/cms/AuthHeader";
import { AppContextProvider } from "@/context/app";

const { Content } = Layout;

export default function AdminDashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = window.localStorage.getItem("isLoggedIn");
      const auth = window.localStorage.getItem("auth");

      if (!isLoggedIn || !auth) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
        setIsCheckingAuth(false);
      }
    }
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-50">
        <Spin size="large" description="Verifying Session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
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
  );
}
