"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import UniversityForm from "./form";
import { Tag, Switch, Space } from "antd";

export default function UniversitiesCmsIndex() {
  const entity = "university";

  const dataTableColumns = [
    {
      title: "Active",
      dataIndex: "enabled",
      width: 70,
      key: "enabled",
      render: (value) => <Switch checked={value} disabled size="small" />,
    },
    {
      title: "University Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="font-medium text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-slate-400 font-mono">{record.slug}</div>
        </div>
      ),
    },
    {
      title: "Courses Offered",
      dataIndex: "courses",
      key: "courses",
      render: (courses) => (
        <Space size={[0, 4]} wrap>
          {(courses || []).map((course, index) => (
            <Tag color="blue" key={index} className="font-medium">
              {course}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      render: (featured) =>
        featured ? (
          <Tag color="gold" className="font-bold">
            Featured
          </Tag>
        ) : (
          <Tag color="default">Standard</Tag>
        ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "Universities CMS Management",
    DATATABLE_TITLE: "All Universities List",
    ADD_NEW_ENTITY: "Add New University",
    ENTITY_NAME: "University",
    CREATE_ENTITY: "Save University",
    UPDATE_ENTITY: "Update University",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<UniversityForm />}
      updateForm={<UniversityForm isUpdateForm={true} />}
      config={config}
    />
  );
}
