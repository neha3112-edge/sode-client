import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import SidebarForm from "@/forms/Sidebar";
import { Tag, Space, Switch } from "antd";

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
      render: (_, record) =>
        record.icon ? `${record.icon.library}:${record.icon.name}` : "-",
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
