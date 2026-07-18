"use client"; // Next.js Client Component के लिए जरूरी है

import React, { useMemo, useState } from "react";
import { Layout, Menu, Badge, Tooltip, Dropdown, Avatar } from "antd";
import { useRouter, usePathname } from "next/navigation";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

import * as LucideIcons from "lucide-react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";

import { useGetDynamicListQuery } from "@/redux/dynamic/action";
import { useAppContext } from "@/context/app";

const { Sider } = Layout;

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const activeItem = pathname;
  const [openDropdown, setOpenDropdown] = useState({});

  // ⚡ Context से स्टेट और एक्शन्स निकालना
  const { state, appContextAction } = useAppContext();
  const collapsed = state.isNavMenuClose;

  // ⚡ RTK Query से सीधे डायनेमिक ट्री डेटा फ़ेच करना
  const { data: sidebarData, isLoading } = useGetDynamicListQuery({
    entity: "sidebar",
    endPoint: "tree",
    options: { items: 500 },
  });

  const dataSource = Array.isArray(sidebarData)
    ? sidebarData
    : sidebarData?.items || sidebarData?.result || [];

  // ✅ ICON LIBRARIES MAP
  const iconLibraries = {
    lucide: LucideIcons,
    fa: FaIcons,
    "react-fa": FaIcons,
    md: MdIcons,
    ai: AiIcons,
    bi: BiIcons,
    fi: FiIcons,
    hi: HiIcons,
    ri: RiIcons,
    gi: GiIcons,
  };

  // ✅ RENDER ICON MULTI-LIBRARY SYSTEM
  const renderIcon = (icon) => {
    if (!icon) return null;
    if (icon.library) {
      const IconSet = iconLibraries[icon.library];
      if (IconSet) {
        const IconComponent = IconSet[icon.name];
        if (IconComponent) {
          return <IconComponent size={16} />;
        }
      }
    }
    if (icon.name) {
      return <i className={icon.name} />;
    }
    return null;
  };

  const handleClick = (item) => {
    if (item.newTab) {
      window.open(item.path, "_blank");
    } else {
      router.push(item.path);
    }
  };

  // ✅ ANTD ITEMS STRUCTURE BUILDER
  const getAntdItems = (menuItems = []) =>
    menuItems.map((item) => {
      const key = item.path || item._id;
      const hasChildren = item.children?.length > 0;

      const content = (
        <span className="flex items-center gap-2 text-gray-600 w-full font-medium">
          {renderIcon(item.icon)}
          {!collapsed && <span className="truncate">{item.title}</span>}
          {!collapsed && item.badge?.value && (
            <Badge
              count={item.badge.value}
              style={{
                backgroundColor: item.badge.color || "#ff4d4f",
                marginLeft: "auto",
              }}
            />
          )}
        </span>
      );

      const label = hasChildren ? (
        content
      ) : item.path ? (
        <Link href={item.path} target={item.newTab ? "_blank" : "_self"}>
          {content}
        </Link>
      ) : (
        content
      );

      if (hasChildren) {
        return {
          key,
          label: collapsed ? (
            <Tooltip title={item.title} placement="right">
              {content}
            </Tooltip>
          ) : (
            label
          ),
          children: getAntdItems(item.children),
        };
      }

      return {
        key,
        label: collapsed ? (
          <Tooltip title={item.title} placement="right">
            {label}
          </Tooltip>
        ) : (
          label
        ),
      };
    });

  // ✅ GROUP ITEMS BY SECTION
  const menuConfigStructure = useMemo(() => {
    const grouped = {};
    dataSource.forEach((item) => {
      if (item.enabled === false || item.removed === true) return;
      const section = item.section || "General";
      if (!grouped[section]) {
        grouped[section] = [];
      }
      grouped[section].push(item);
    });

    return Object.keys(grouped).map((section) => ({
      key: `section-${section}`,
      type: "group",
      label: !collapsed ? section : null,
      children: getAntdItems(grouped[section]),
    }));
  }, [dataSource, collapsed]);

  // ✅ BOTTOM PROFILE DROPDOWN MENU
  const profileMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link href="/admin-dashboard/profile">My Profile</Link>,
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: <Link href="/admin-dashboard/settings">Account Settings</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined className="text-red-500" />,
      label: <span className="text-red-500 font-medium">Logout</span>,
      onClick: () => console.log("User logged out"),
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="md"
      onBreakpoint={(broken) => {
        if (broken) appContextAction.navMenu.close();
        else appContextAction.navMenu.open();
      }}
      className="bg-white border-r border-gray-200"
      style={{
        background: "#ffffff",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      {/* BRAND LOGO AREA */}
      <div className="h-16 flex items-center justify-center border-b border-zinc-100 px-4 overflow-hidden">
        {collapsed ? (
          <Image
            src="/assets/images/sode-icon.png"
            alt="SODE Icon"
            width={32}
            height={32}
            className="object-contain"
          />
        ) : (
          <Image
            src="/assets/images/SODE-LOGO.png"
            alt="SODE Logo"
            width={140}
            height={40}
            className="object-contain"
          />
        )}
      </div>

      {/* DYNAMIC API SIDEBAR MENU */}
      {isLoading ? (
        <div className="p-4 space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-9 bg-gray-200 rounded w-full"></div>
          <div className="h-9 bg-gray-200 rounded w-full"></div>
        </div>
      ) : (
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[activeItem]}
          openKeys={collapsed ? [] : Object.keys(openDropdown)}
          onOpenChange={(keys) => {
            const nextOpen = {};
            keys.forEach((k) => (nextOpen[k] = true));
            setOpenDropdown(nextOpen);
          }}
          items={menuConfigStructure}
          className="border-none text-gray-600 mt-4 [&_.ant-menu-item-group-title]:text-xs [&_.ant-menu-item-group-title]:font-bold [&_.ant-menu-item-group-title]:tracking-wider [&_.ant-menu-item-group-title]:text-gray-400"
          style={{
            background: "#ffffff",
            height: "calc(100vh - 160px)",
            overflowY: "auto",
          }}
        />
      )}

      {/* USER PROFILE BOX AT BOTTOM */}
      <div
        className="p-3 border-t border-gray-100 bg-white"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <Dropdown
          menu={{ items: profileMenuItems }}
          placement="topRight"
          trigger={["click"]}
          arrow
        >
          <div
            className={
              collapsed
                ? "flex items-center justify-center cursor-pointer p-1 bg-transparent"
                : "flex items-center justify-between cursor-pointer p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200"
            }
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar
                size={40}
                style={{
                  backgroundColor: "#2563eb",
                  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.15)",
                }}
                icon={<UserOutlined />}
              />
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-800 truncate tracking-wide leading-tight">
                    Abhishek Jadon
                  </span>
                  <span className="text-xs text-gray-500 truncate mt-0.5 leading-none">
                    admin@sode.com
                  </span>
                </div>
              )}
            </div>
            {!collapsed && (
              <SettingOutlined className="text-gray-400 hover:text-gray-700 text-base ml-2 flex-shrink-0 transition-colors" />
            )}
          </div>
        </Dropdown>
      </div>
    </Sider>
  );
}
