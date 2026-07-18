import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import RolesForm from "./forms/RoleForm";
import { Tag, Space, Switch } from "antd";

export default function Index() {
  const entity = "role";
  const readColumns = [
    {
      title: "Enabled",
      dataIndex: "enabled",
      width: 70,
      key: "newTab",
      render: (value) => <Switch checked={value} disabled />,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actions) => (
        <Space>
          {(actions || []).map((action, index) => (
            <Tag color="blue" key={index}>
              {action}
            </Tag>
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
  const dataTableColumns = [
    {
      title: "Enabled",
      dataIndex: "enabled",
      width: 70,
      key: "newTab",
      render: (value) => <Switch checked={value} disabled />,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actions) => (
        <Space>
          {(actions || []).map((action, index) => (
            <Tag color="blue" key={index}>
              {action}
            </Tag>
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

  const labels = {
    PANEL_TITLE: "Roles",
    DATATABLE_TITLE: "Roles",
    ADD_NEW_ENTITY: "Add New Role",
    ENTITY_NAME: "Role",
    CREATE_ENTITY: "Save",
    UPDATE_ENTITY: "Update",
  };

  const configPage = {
    entity,
    ...labels,
  };

  const config = {
    ...configPage,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<RolesForm />}
      updateForm={<RolesForm isUpdateForm={true} />}
      config={config}
    />
  );
}
