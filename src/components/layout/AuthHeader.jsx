"use client";

import { Layout, Button, theme } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useLogoutMutation } from "@/redux/auth/action";
import { useRouter } from "next/navigation";
import { useUiStore } from "@/store/zustand/store"; // 🆕 Zustand Store कनेक्ट किया

const { Header: AntdHeader } = Layout;

export default function AuthHeader() {
  const router = useRouter();

  // 🚀 Zustand से स्टेट और टॉगल फ़ंक्शन निकाला
  const { collapsed, toggleCollapsed } = useUiStore();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [triggerLogout, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleSignOut = async () => {
    await triggerLogout();
    router.push("/login");
  };

  return (
    <AntdHeader
      style={{
        background: colorBgContainer,
        padding: "0 24px 0 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      className="h-16 border-b border-zinc-200"
    >
      <div className="flex items-center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={toggleCollapsed} // 🚀 सीधे Zustand का Action ट्रिगर किया
          style={{ fontSize: "16px", width: 64, height: 64 }}
        />
        <h1 className="text-base font-bold text-zinc-800 ml-2">Admin Area</h1>
      </div>

      <Button
        type="text"
        danger
        icon={<LogoutOutlined />}
        loading={isLogoutLoading}
        onClick={handleSignOut}
        className="flex items-center gap-1 font-bold text-xs"
      >
        {isLogoutLoading ? "Logging out..." : "Logout"}
      </Button>
    </AntdHeader>
  );
}
