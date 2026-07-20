"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import SubcourseForm from "./form";
import { Tag } from "antd";

export default function SubcourseCmsIndex() {
  const entity = "subcourse";

  const dataTableColumns = [
    {
      title: "Subcourse Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          <div className="text-xs text-slate-400 font-mono">/{record.slug}</div>
        </div>
      ),
    },
    {
      title: "Parent Course",
      dataIndex: "course",
      key: "course",
      render: (course) => {
        const title = typeof course === "object" ? course?.title : course;
        return <span className="font-semibold text-slate-700">{title || "N/A"}</span>;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        const name = typeof category === "object" ? category?.name : category;
        return <Tag color="blue">{name || "N/A"}</Tag>;
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => {
        const text = typeof duration === "object" ? duration?.title : duration;
        return <span className="text-xs text-slate-600">{text || "N/A"}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "enabled",
      key: "enabled",
      width: 100,
      render: (enabled) => (
        <Tag color={enabled !== false ? "green" : "red"}>
          {enabled !== false ? "Active" : "Disabled"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 120,
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "Subcourses Management",
    DATATABLE_TITLE: "Subcourses List",
    ADD_NEW_ENTITY: "Add New Subcourse",
    ENTITY_NAME: "Subcourse",
    CREATE_ENTITY: "Save Subcourse",
    UPDATE_ENTITY: "Update Subcourse",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<SubcourseForm />}
      updateForm={<SubcourseForm isUpdateForm={true} />}
      config={config}
    />
  );
}
