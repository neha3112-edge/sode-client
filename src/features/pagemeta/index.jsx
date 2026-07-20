"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import PageMetaForm from "./form";
import { Tag, Switch } from "antd";

export default function PageMetaCmsIndex() {
  const entity = "pagemeta";

  const dataTableColumns = [
    {
      title: "Active",
      dataIndex: "enabled",
      width: 70,
      key: "enabled",
      render: (value) => <Switch checked={value} disabled size="small" />,
    },
    {
      title: "Page Name",
      dataIndex: "pageName",
      key: "pageName",
      render: (text, record) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{text}</div>
          <Tag color="cyan" className="font-mono text-xs">{record.pagePath}</Tag>
        </div>
      ),
    },
    {
      title: "Meta Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-medium text-slate-700 text-xs">{text}</span>,
    },
    {
      title: "Meta Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div className="text-xs text-slate-500 max-w-xs truncate" title={text}>
          {text}
        </div>
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
    PANEL_TITLE: "SEO Page Meta Management",
    DATATABLE_TITLE: "Page Meta Tags List",
    ADD_NEW_ENTITY: "Add Page Meta",
    ENTITY_NAME: "Page Meta",
    CREATE_ENTITY: "Save Meta",
    UPDATE_ENTITY: "Update Meta",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<PageMetaForm />}
      updateForm={<PageMetaForm isUpdateForm={true} />}
      config={config}
    />
  );
}
