import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import SidebarForm from "./forms/SidebarForm";
import { Tag, Space, Switch } from "antd";

import * as LucideIcons from "lucide-react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";

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

const renderIcon = (icon) => {
  if (!icon) return "-";
  if (icon.library) {
    const IconSet = iconLibraries[icon.library] || LucideIcons;
    if (IconSet) {
      const IconComponent = IconSet[icon.name] || LucideIcons[icon.name];
      if (IconComponent) {
        return <IconComponent size={18} />;
      }
    }
  }
  if (icon.name && LucideIcons[icon.name]) {
    const IconComponent = LucideIcons[icon.name];
    return <IconComponent size={18} />;
  }
  return "-";
};

export default function Index() {
  const entity = "sidebar";

  const readColumns = [
    {
      title: "Enabled",
      dataIndex: "enabled",
      key: "enabled",
      width: 70,
      render: (value) => <Switch checked={value} disabled />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Section Order",
      dataIndex: "sectionOrder",
      key: "sectionOrder",
    },
    {
      title: "Item Order",
      dataIndex: "itemOrder",
      key: "itemOrder",
    },
    {
      title: "Icon",
      key: "icon",
      render: (_, record) => (
        <span className="flex items-center gap-2 font-medium text-slate-700">
          <span className="text-blue-500 flex items-center justify-center">
            {renderIcon(record.icon)}
          </span>
        </span>
      ),
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
    },
    {
      title: "Parent",
      key: "parentId",
      render: (_, record) => record.parentId?.title || "-",
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "New Tab",
      dataIndex: "newTab",
      key: "newTab",
      render: (value) => <Switch checked={value} disabled />,
    },
    {
      title: "Badge",
      key: "badge",
      render: (_, record) =>
        record.badge?.value ? (
          <Tag color={record.badge.color || "blue"}>{record.badge.value}</Tag>
        ) : (
          "-"
        ),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (roles) => (
        <Space wrap>
          {(roles || []).map((role) => (
            <Tag key={role._id}>{role.name}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
  ];

  const dataTableColumns = [...readColumns];

  const labels = {
    PANEL_TITLE: "Sidebar",
    DATATABLE_TITLE: "Sidebar",
    ADD_NEW_ENTITY: "Add New Sidebar Item",
    ENTITY_NAME: "Sidebar Item",
    CREATE_ENTITY: "Save",
    UPDATE_ENTITY: "Update",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<SidebarForm />}
      updateForm={<SidebarForm isUpdateForm={true} />}
      config={config}
    />
  );
}
