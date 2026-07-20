"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import FaqForm from "./form";
import { Tag, Switch } from "antd";

export default function FaqCmsIndex() {
  const entity = "faq";

  const dataTableColumns = [
    {
      title: "Active",
      dataIndex: "enabled",
      width: 70,
      key: "enabled",
      render: (value) => <Switch checked={value} disabled size="small" />,
    },
    {
      title: "Order",
      dataIndex: "order",
      width: 70,
      key: "order",
      render: (val) => <span className="font-bold text-blue-600">{val || 0}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 120,
      key: "category",
      render: (text) => (
        <Tag color="blue" className="capitalize text-xs font-semibold">
          {text || "general"}
        </Tag>
      ),
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text) => (
        <div className="font-bold text-slate-800 text-sm max-w-md line-clamp-2">
          {text}
        </div>
      ),
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      render: (text) => (
        <div className="text-xs text-slate-500 max-w-lg line-clamp-2" title={text}>
          {text}
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 110,
      render: (date) => (date ? moment(date).format("DD-MM-YYYY") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "Website FAQs Management",
    DATATABLE_TITLE: "Frequently Asked Questions",
    ADD_NEW_ENTITY: "Add New FAQ",
    ENTITY_NAME: "FAQ",
    CREATE_ENTITY: "Save FAQ",
    UPDATE_ENTITY: "Update FAQ",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<FaqForm />}
      updateForm={<FaqForm isUpdateForm={true} />}
      config={config}
    />
  );
}
