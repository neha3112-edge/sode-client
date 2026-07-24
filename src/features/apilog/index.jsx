"use strict";

import React, { useState, useEffect, useMemo } from "react";
import CrudModule from "@/module/crud";
import moment from "moment";
import ApiLogForm from "./form";
import { Tag, Tooltip, Card, Row, Col, Statistic, Progress } from "antd";
import {
  ThunderboltFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  ClockCircleFilled,
  DashboardOutlined,
  ReloadOutlined
} from "@ant-design/icons";

import { useGetDynamicListQuery } from "@/store/redux/dynamic/action";

export default function ApiLogCmsIndex() {
  const entity = "apilog";

  const { data: logsData } = useGetDynamicListQuery({
    entity: "apilog",
    endPoint: "list",
    options: { items: 500 },
  });

  const logsList = useMemo(() => {
    if (!logsData) return [];
    if (Array.isArray(logsData)) return logsData;
    return logsData.items || logsData.result || logsData.data || [];
  }, [logsData]);

  // Compute Analytics Metrics dynamically
  const analytics = useMemo(() => {
    const total = logsList.length;
    if (total === 0) {
      return {
        total: 0,
        successCount: 0,
        failedCount: 0,
        successRate: "100.0",
        failedRate: "0.0",
        avgLatency: 0,
        pendingCount: 0,
      };
    }

    let successCount = 0;
    let failedCount = 0;
    let pendingCount = 0;
    let totalLatency = 0;

    logsList.forEach((log) => {
      const isSuccess = log.status === "success" || (log.statusCode >= 200 && log.statusCode < 300);
      if (isSuccess) {
        successCount++;
      } else if (log.status === "pending") {
        pendingCount++;
      } else {
        failedCount++;
      }
      totalLatency += Number(log.responseTimeMs || 0);
    });

    const successRate = ((successCount / total) * 100).toFixed(1);
    const failedRate = ((failedCount / total) * 100).toFixed(1);
    const avgLatency = Math.round(totalLatency / total);

    return {
      total,
      successCount,
      failedCount,
      pendingCount,
      successRate,
      failedRate,
      avgLatency,
    };
  }, [logsList]);

  const dataTableColumns = [
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      width: 90,
      render: (method) => {
        const color =
          method === "GET"
            ? "blue"
            : method === "POST"
            ? "green"
            : method === "PUT" || method === "PATCH"
            ? "orange"
            : method === "DELETE"
            ? "red"
            : "default";
        return <Tag color={color} className="font-medium">{method || "GET"}</Tag>;
      },
    },
    {
      title: "Endpoint & Key",
      dataIndex: "endpoint",
      key: "endpoint",
      render: (endpoint, record) => (
        <div>
          <div className="font-medium text-slate-800 text-xs font-mono truncate max-w-[240px]" title={endpoint}>
            {endpoint}
          </div>
          {record.configKey && (
            <div className="text-[11px] text-slate-500 font-medium font-mono">key: {record.configKey}</div>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status, record) => {
        const isSuccess = status === "success" || (record.statusCode >= 200 && record.statusCode < 300);
        const color = isSuccess
          ? "green"
          : status === "failed"
          ? "red"
          : status === "timeout"
          ? "magenta"
          : "orange";
        return <Tag color={color} className="font-medium">{status ? status.toUpperCase() : "PENDING"}</Tag>;
      },
    },
    {
      title: "Code",
      dataIndex: "statusCode",
      key: "statusCode",
      width: 80,
      render: (code) => {
        if (!code) return <span className="text-slate-400 text-xs font-medium">-</span>;
        const is2xx = code >= 200 && code < 300;
        const is4xx5xx = code >= 400;
        return (
          <Tag color={is2xx ? "cyan" : is4xx5xx ? "error" : "warning"} className="font-medium">
            {code}
          </Tag>
        );
      },
    },
    {
      title: "Latency",
      dataIndex: "responseTimeMs",
      key: "responseTimeMs",
      width: 90,
      render: (ms) => (
        <span className="text-xs font-medium text-slate-700">
          {typeof ms === "number" ? `${ms}ms` : "-"}
        </span>
      ),
    },
    {
      title: "Error Trace",
      dataIndex: "errorMessage",
      key: "errorMessage",
      render: (msg) => (
        msg ? (
          <Tooltip title={msg}>
            <span className="text-xs text-red-600 font-medium truncate max-w-[180px] block">
              {msg}
            </span>
          </Tooltip>
        ) : (
          <span className="text-xs text-emerald-600 font-medium">Clean Execution</span>
        )
      ),
    },
    {
      title: "Caller IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: 110,
      render: (ip) => <span className="text-xs text-slate-600 font-medium font-mono">{ip || "127.0.0.1"}</span>,
    },
    {
      title: "Timestamp",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      render: (date) => (date ? <span className="text-xs text-slate-700 font-medium">{moment(date).format("DD-MM-YYYY HH:mm:ss")}</span> : "-"),
    },
  ];

  const readColumns = [...dataTableColumns];

  const labels = {
    PANEL_TITLE: "API Logs & Realtime Analytics",
    DATATABLE_TITLE: "API Execution Logs Stream",
    ADD_NEW_ENTITY: "New Log Entry",
    ENTITY_NAME: "API Log Record",
    CREATE_ENTITY: "Save Log",
    UPDATE_ENTITY: "Update Log",
  };

  const config = {
    entity,
    ...labels,
    dataTableColumns,
    readColumns,
  };

  return (
    <div className="-mt-6 -mx-6 mb-6 space-y-6">
      {/* 📊 4-CARD ANALYTICS DASHBOARD OVERVIEW */}
      <div className="bg-linear-to-r from-slate-900 via-slate-800 to-indigo-950 p-5 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <DashboardOutlined className="text-xl text-amber-400" />
            <h2 className="text-lg font-medium text-white tracking-tight m-0">
              API Execution Analytics & Health Dashboard
            </h2>
          </div>
          <Tag color="gold" className="font-medium px-3 py-1 text-xs uppercase rounded-full border-none">
            Realtime Stream
          </Tag>
        </div>

        <Row gutter={[16, 16]}>
          {/* Card 1: Total API Requests */}
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="bg-white/10 border-white/10 backdrop-blur-md rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-300 uppercase tracking-wider block mb-1">
                    Total API Requests
                  </span>
                  <div className="text-2xl font-semibold text-white">
                    {analytics.total}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">
                  <ThunderboltFilled />
                </div>
              </div>
              <div className="mt-2 text-[11px] text-slate-300 font-medium">
                Log items recorded in database
              </div>
            </Card>
          </Col>

          {/* Card 2: Success Requests & Rate */}
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="bg-white/10 border-white/10 backdrop-blur-md rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-emerald-300 uppercase tracking-wider block mb-1">
                    Success Rate
                  </span>
                  <div className="text-2xl font-semibold text-emerald-400">
                    {analytics.successRate}%
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                  <CheckCircleFilled />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-medium">
                <span className="text-emerald-300">{analytics.successCount} Successful</span>
                <Progress percent={Number(analytics.successRate)} size="small" showInfo={false} strokeColor="#10b981" className="w-20 m-0" />
              </div>
            </Card>
          </Col>

          {/* Card 3: Failed Requests & Rate */}
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="bg-white/10 border-white/10 backdrop-blur-md rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-rose-300 uppercase tracking-wider block mb-1">
                    Failure Rate
                  </span>
                  <div className="text-2xl font-semibold text-rose-400">
                    {analytics.failedRate}%
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-lg">
                  <CloseCircleFilled />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs font-medium">
                <span className="text-rose-300">{analytics.failedCount} Failed</span>
                <Progress percent={Number(analytics.failedRate)} size="small" showInfo={false} strokeColor="#f43f5e" className="w-20 m-0" />
              </div>
            </Card>
          </Col>

          {/* Card 4: Avg Response Time / Latency */}
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="bg-white/10 border-white/10 backdrop-blur-md rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-amber-300 uppercase tracking-wider block mb-1">
                    Avg Latency
                  </span>
                  <div className="text-2xl font-semibold text-amber-400">
                    {analytics.avgLatency} <span className="text-xs font-normal">ms</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg">
                  <ClockCircleFilled />
                </div>
              </div>
              <div className="mt-2 text-[11px] text-amber-200/80 font-medium">
                Average execution time per request
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* 📋 DATATABLE CRUD MODULE */}
      <div className="px-6">
        <CrudModule
          createForm={<ApiLogForm />}
          updateForm={<ApiLogForm />}
          config={config}
        />
      </div>
    </div>
  );
}
