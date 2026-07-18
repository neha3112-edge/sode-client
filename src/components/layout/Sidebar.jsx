"use client"; // Next.js Client Component के लिए जरूरी है

import React, { useMemo, useState } from "react";
import { Layout, Menu, Badge, Tooltip, Dropdown, Avatar, Spin } from "antd";
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
import { useUiStore } from "@/store/zustand/store";

const { Sider } = Layout;

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const activeItem = pathname;
  const { collapsed, setCollapsed } = useUiStore();
  const [openDropdown, setOpenDropdown] = useState({});

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

  // ✅ ANTD ITEMS STRUCTURE BUILDER
  const getAntdItems = (menuItems = []) =>
    menuItems.map((item) => {
      // 🌟 FIXED: की (key) हमेशा एक विशिष्ट पहचान होनी चाहिए
      const key = item.path || item._id;
      const hasChildren = item.children?.length > 0;

      const content = (
        <span className="flex items-center gap-1 text-gray-600 w-full font-normal">
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

      // 🌟 FIXED: Ant Design Menu को रेंडर करने के लिए सटीक लिंक मैपिंग
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
      // 🌟 सुरक्षा फ़िल्टर: डिफ़ॉल्ट रूप से यदि फ़ील्ड न हो तो ट्रू मानें
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

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="md"
      onBreakpoint={(broken) => setCollapsed(broken)}
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
      <Spin spinning={isLoading} description="Sidebar loading">
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
          className="border-none text-gray-600 [&_.ant-menu-item-group-title]:text-xs [&_.ant-menu-item-group-title]:font-medium [&_.ant-menu-item-group-title]:tracking-wider [&_.ant-menu-item-group-title]:text-gray-500"
          style={{
            background: "#ffffff",
            height: "calc(100vh - 160px)",
            overflowY: "auto",
          }}
        />
      </Spin>
    </Sider>
  );
}
