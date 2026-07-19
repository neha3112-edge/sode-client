"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import CourseForm from "./form";
import { Tag, Switch, Space } from "antd";

export default function CoursesCmsIndex() {
  const entity = "course";

  const categoryColors = {
    doctorate: "purple",
    certification: "blue",
    executive: "gold",
    master: "green",
  };

  const dataTableColumns = [
    {
      title: "Active",
      dataIndex: "enabled",
      width: 70,
      key: "enabled",
      render: (value) => <Switch checked={value} disabled size="small" />,
    },
    {
      title: "Course Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-slate-400 font-mono">{record.slug}</div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color={categoryColors[category] || "default"} className="capitalize font-semibold">
          {category}
        </Tag>
      ),
    },
    {
      title: "University",
      dataIndex: "university",
      key: "university",
      render: (text) => <span className="font-semibold text-slate-700">{text}</span>,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Featured",
      dataIndex: "featured",
      key: "featured",
      render: (featured) => (
        featured ? (
          <Tag color="volcano" className="font-bold">Featured</Tag>
        ) : (
          <Tag color="default">Standard</Tag>
        )
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
    PANEL_TITLE: "Courses CMS Management",
    DATATABLE_TITLE: "All Courses List",
    ADD_NEW_ENTITY: "Add New Course",
    ENTITY_NAME: "Course",
    CREATE_ENTITY: "Save Course",
    UPDATE_ENTITY: "Update Course",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<CourseForm />}
      updateForm={<CourseForm isUpdateForm={true} />}
      config={config}
    />
  );
}
