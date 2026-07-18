"use client"; // Next.js Client Component के लिए जरूरी है

import { Layout, Button, theme } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useLogoutMutation } from "@/store/redux/auth/action";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/app"; // ⚡ FIXED: Zustand हटाया, अपना App Context हुक इम्पोर्ट किया

const { Header: AntdHeader } = Layout;

export default function AuthHeader() {
  const router = useRouter();

  // ⚡ FIXED: App Context से स्टेट (isNavMenuClose) और एक्शन्स निकाले
  const { state, appContextAction } = useAppContext();
  const collapsed = state.isNavMenuClose;

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
        {/* 🌟 FIXED: अब बटन क्लिक करने पर आपका कॉन्टेक्स्ट रिड्यूसर एक्शन (collapse) ट्रिगर होगा */}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => appContextAction.navMenu.collapse()} // ⚡ स्टेट टॉगल करने के लिए
          style={{ fontSize: "16px", width: 64, height: 64 }}
          className="cursor-pointer"
        />
        <h1 className="text-base font-bold text-zinc-800 ml-2 select-none">
          Admin Area
        </h1>
      </div>

      <Button
        type="text"
        danger
        icon={<LogoutOutlined />}
        loading={isLogoutLoading}
        onClick={handleSignOut}
        className="flex items-center gap-1 font-bold text-xs cursor-pointer"
      >
        {isLogoutLoading ? "Logging out..." : "Logout"}
      </Button>
    </AntdHeader>
  );
}
