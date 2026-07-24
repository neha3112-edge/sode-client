"use strict";

import React from "react";
import { Form, Input, InputNumber, Select, Switch, Row, Col, Card, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

export default function ApiConfigForm({ isUpdateForm = false }) {
  return (
    <div className="space-y-4">
      {/* 1️⃣ Basic Configuration */}
      <Card title="Basic API Configuration" size="small" className="bg-slate-50 border-slate-200">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Configuration Name"
              rules={[{ required: true, message: "Please enter API config name" }]}
            >
              <Input placeholder="e.g. CRM Lead Creation API" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="key"
              label="API Key Identifier (Slug)"
              rules={[{ required: true, message: "Please enter API key slug" }]}
            >
              <Input placeholder="e.g. crm_lead_api" disabled={isUpdateForm} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item name="method" label="HTTP Method" initialValue="POST">
              <Select
                options={[
                  { value: "POST", label: "POST" },
                  { value: "GET", label: "GET" },
                  { value: "PUT", label: "PUT" },
                  { value: "DELETE", label: "DELETE" },
                  { value: "PATCH", label: "PATCH" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item name="baseUrl" label="Base URL">
              <Input placeholder="e.g. https://new.crm.api.mysode.com" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="endpoint" label="API Endpoint Path">
              <Input placeholder="e.g. /api/lead/apicreated" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="triggerEvent" label="Trigger Event / Action" initialValue="lead_submission">
              <Select
                options={[
                  { value: "lead_submission", label: "Form Lead Submission" },
                  { value: "brochure_request", label: "Brochure Download Request" },
                  { value: "counseling_form", label: "Counseling Form Request" },
                  { value: "user_registration", label: "User Registration" },
                  { value: "manual", label: "Manual Webhook Trigger" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="environment" label="Environment" initialValue="production">
              <Select
                options={[
                  { value: "production", label: "Production" },
                  { value: "staging", label: "Staging" },
                  { value: "development", label: "Development" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* 2️⃣ Dynamic Headers List (With + Add Header Button) */}
      <Card title="Request Headers" size="small" className="bg-slate-50 border-slate-200">
        <Row gutter={16} className="mb-2">
          <Col span={8}>
            <Form.Item name="authType" label="Auth Type" initialValue="apiKey">
              <Select
                options={[
                  { value: "apiKey", label: "API Key (x-api-key)" },
                  { value: "bearer", label: "Bearer Token" },
                  { value: "basic", label: "Basic Auth" },
                  { value: "none", label: "None" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item name="apiKey" label="x-api-key / Authorization Value">
              <Input.Password placeholder="e.g. a04b4291461f8b060559dfc965864c2c259..." />
            </Form.Item>
          </Col>
        </Row>

        <label className="block text-xs font-bold text-slate-600 mb-2">
          Custom HTTP Headers (+ Add Header):
        </label>

        <Form.List name="headers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={12} className="mb-2 items-center">
                  <Col span={10}>
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      className="m-0"
                      rules={[{ required: true, message: "Header key required" }]}
                    >
                      <Input placeholder="Header Key (e.g. Content-Type, x-api-key)" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item {...restField} name={[name, "value"]} className="m-0">
                      <Input placeholder="Header Value (e.g. application/json)" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item className="m-0 mt-2">
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  className="border-blue-300 text-blue-600 hover:text-blue-700"
                >
                  + Add Header Parameter
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>

      {/* 3️⃣ Dynamic Body Parameters List (With + Add Body Parameter Button) */}
      <Card title="Request Body Parameters" size="small" className="bg-slate-50 border-slate-200">
        <label className="block text-xs font-bold text-slate-600 mb-2">
          Body Parameters List (+ Add Parameter for Request Body):
        </label>

        <Form.List name="bodyParams">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={12} className="mb-2 items-center">
                  <Col span={10}>
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      className="m-0"
                      rules={[{ required: true, message: "Parameter key required" }]}
                    >
                      <Input placeholder="Parameter Key (e.g. name, email, phone, course)" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item {...restField} name={[name, "value"]} className="m-0">
                      <Input placeholder="Parameter Value (e.g. abhishekte, SODE, Organic, Telangana)" />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item className="m-0 mt-2">
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  className="border-green-400 text-green-700 hover:text-green-800 font-semibold"
                >
                  + Add Body Parameter
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>

      {/* 4️⃣ Advanced Settings */}
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="timeout" label="Timeout (ms)" initialValue={10000}>
            <InputNumber className="w-full" min={500} max={60000} step={1000} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="retryCount" label="Retry Count" initialValue={3}>
            <InputNumber className="w-full" min={0} max={10} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="cacheTtl" label="Cache TTL (Sec)" initialValue={300}>
            <InputNumber className="w-full" min={0} max={86400} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={2} placeholder="Enter API configuration description..." />
      </Form.Item>

      <Form.Item name="enabled" label="Status" valuePropName="checked" initialValue={true}>
        <Switch checkedChildren="Active" unCheckedChildren="Disabled" />
      </Form.Item>
    </div>
  );
}
