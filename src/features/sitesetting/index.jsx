"use client";

import React from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import SiteSettingForm from "./form";
import { Tag, Switch, Space } from "antd";

export default function SiteSettingCmsIndex() {
  const entity = "sitesetting";

  const dataTableColumns = [
    {
      title: "Active",
      dataIndex: "enabled",
      width: 70,
      key: "enabled",
      render: (value) => <Switch checked={value} disabled size="small" />,
    },
    {
      title: "Site Name",
      dataIndex: "siteName",
      key: "siteName",
      render: (text) => <span className="font-bold text-slate-800">{text}</span>,
    },
    {
      title: "Base URL",
      dataIndex: "siteUrl",
      key: "siteUrl",
      render: (text) => <span className="font-mono text-xs text-blue-600">{text}</span>,
    },
    {
      title: "GTM ID",
      dataIndex: "gtmId",
      key: "gtmId",
      render: (text) => <Tag color="purple">{text}</Tag>,
    },
    {
      title: "Google Ads IDs",
      dataIndex: "googleAdsIds",
      key: "googleAdsIds",
      render: (ids) => (
        <Space size={[0, 4]} wrap>
          {(ids || []).map((id, index) => (
            <Tag color="cyan" key={index} className="font-mono text-xs">
              {id}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Global CTA",
      dataIndex: "showGlobalCta",
      key: "showGlobalCta",
      render: (value) => <Switch checked={value} disabled size="small" />,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => (date ? moment(date).format("DD-MM-YYYY HH:mm") : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "Global Website Settings (CMS)",
    DATATABLE_TITLE: "Website Layout Settings",
    ADD_NEW_ENTITY: "Add Site Setting",
    ENTITY_NAME: "Site Setting",
    CREATE_ENTITY: "Save Setting",
    UPDATE_ENTITY: "Update Setting",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <CrudModule
      createForm={<SiteSettingForm />}
      updateForm={<SiteSettingForm isUpdateForm={true} />}
      config={config}
    />
  );
}
