"use strict";

import React from "react";
import { Descriptions, Tag, Typography, Card, Badge, Alert } from "antd";
import moment from "moment";

import { useSelector } from "react-redux";

const { Text } = Typography;

export default function ApiLogForm({ currentRecord, form }) {
  const reduxCurrent = useSelector((state) => state?.crud?.current);
  const item = currentRecord || reduxCurrent || form?.getFieldsValue?.() || {};

  const isSuccess = item.status === "success" || (item.statusCode >= 200 && item.statusCode < 300);
  const methodColor =
    item.method === "GET"
      ? "blue"
      : item.method === "POST"
      ? "green"
      : item.method === "PUT" || item.method === "PATCH"
      ? "orange"
      : "red";

  const statusColor = isSuccess ? "success" : item.status === "timeout" ? "warning" : "error";

  const formattedReqBody =
    item.requestBody && typeof item.requestBody === "object"
      ? JSON.stringify(item.requestBody, null, 2)
      : typeof item.requestBody === "string" && item.requestBody
      ? item.requestBody
      : "{}";

  const formattedResBody =
    item.responseBody && typeof item.responseBody === "object"
      ? JSON.stringify(item.responseBody, null, 2)
      : typeof item.responseBody === "string" && item.responseBody
      ? item.responseBody
      : "{}";

  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Banner Alert */}
      <Alert
        title={
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm">
              API Execution: {item.configKey ? `'${item.configKey}'` : "Dynamic Request"}
            </span>
            <Tag color={statusColor} className="font-extrabold uppercase px-2 py-0.5">
              {item.status || (isSuccess ? "SUCCESS" : "FAILED")} ({item.statusCode || 500})
            </Tag>
          </div>
        }
        description={
          <div className="text-xs text-slate-600 mt-1 font-mono break-all">
            {item.method || "POST"} {item.endpoint || "-"}
          </div>
        }
        type={isSuccess ? "success" : "error"}
        showIcon
        className="rounded-xl border border-slate-200 shadow-2xs"
      />

      {/* Execution Details Table */}
      <Card size="small" title="📌 Request & Execution Metadata" className="rounded-xl border-slate-200 shadow-2xs">
        <Descriptions column={2} size="small" bordered className="text-xs">
          <Descriptions.Item label="HTTP Method">
            <Tag color={methodColor} className="font-bold">{item.method || "POST"}</Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Status Code">
            <Tag color={isSuccess ? "cyan" : "error"} className="font-bold">
              {item.statusCode || "-"}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Latency / Duration">
            <span className="font-bold text-slate-800">{item.responseTimeMs ? `${item.responseTimeMs} ms` : "0 ms"}</span>
          </Descriptions.Item>

          <Descriptions.Item label="Config Key">
            <Text code className="text-xs">{item.configKey || "crm_lead_api"}</Text>
          </Descriptions.Item>

          <Descriptions.Item label="Caller IP">
            <span className="font-mono text-xs text-slate-600">{item.ipAddress || "127.0.0.1"}</span>
          </Descriptions.Item>

          <Descriptions.Item label="Timestamp">
            <span className="text-xs font-semibold text-slate-700">
              {item.createdAt ? moment(item.createdAt).format("DD-MM-YYYY HH:mm:ss") : "-"}
            </span>
          </Descriptions.Item>

          <Descriptions.Item label="User Agent" span={2}>
            <span className="text-[11px] font-mono text-slate-500 break-all">{item.userAgent || "-"}</span>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Error Details */}
      {item.errorMessage && (
        <Card size="small" title="❌ Error Details" className="rounded-xl border-red-200 bg-red-50/50">
          <div className="text-xs text-red-700 font-bold mb-1">{item.errorMessage}</div>
          {item.errorStack && (
            <pre className="bg-red-950 text-red-300 p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto max-h-32">
              {item.errorStack}
            </pre>
          )}
        </Card>
      )}

      {/* Request Payload JSON Viewer */}
      <Card size="small" title="📤 Sent Request Payload (JSON)" className="rounded-xl border-slate-200">
        <pre className="bg-slate-900 text-amber-300 p-3 rounded-xl text-xs font-mono overflow-x-auto max-h-48 scrollbar-thin">
          {formattedReqBody}
        </pre>
      </Card>

      {/* Response Payload JSON Viewer */}
      <Card size="small" title="📥 Received Response Payload (JSON)" className="rounded-xl border-slate-200">
        <pre className="bg-slate-950 text-emerald-400 p-3 rounded-xl text-xs font-mono overflow-x-auto max-h-56 scrollbar-thin">
          {formattedResBody}
        </pre>
      </Card>
    </div>
  );
}
