"use strict";

import React from "react";
import { Form, Input, InputNumber, Select, Switch, Row, Col, Card, Button, AutoComplete } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

export default function ApiConfigForm({ isUpdateForm = false }) {
  const form = Form.useFormInstance();
  const availableVars = Form.useWatch("availableVariables", form) || [];
  
  const variableOptions = availableVars
    .filter(v => v && v.key)
    .map(v => ({
      value: v.key,
      label: v.description ? `${v.key} (${v.description})` : v.key
    }));

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
              <Input.Password 
                autoComplete="new-password" 
                data-lpignore="true" 
                data-1p-ignore="true"
                data-form-type="other"
                placeholder="e.g. a04b4291461f8b060559dfc965864c2c259..." 
              />
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
                      <AutoComplete
                        options={variableOptions}
                        placeholder="Value (e.g. {{full_name}}, {{email}} or static)"
                        filterOption={(inputValue, option) =>
                          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1 ||
                          (option.label && option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1)
                        }
                      />
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

      {/* 3.5️⃣ Available Dynamic Variables (Documentation for Admin) */}
      <Card title="Available Dynamic Variables" size="small" className="bg-slate-50 border-slate-200 mt-4">
        <label className="block text-xs font-bold text-slate-600 mb-2">
          Define variables that can be used in Headers or Body Parameters (+ Add Variable):
        </label>
        <p className="text-xs text-slate-500 mb-3">
          Document the payload keys that this API Config expects (e.g. <code>{`{{full_name}}`}</code>, <code>{`{{email}}`}</code>) so the admin knows what to use in the values above.
        </p>

        <Form.List name="availableVariables">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={12} className="mb-2 items-center">
                  <Col span={10}>
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      className="m-0"
                      rules={[{ required: true, message: "Variable key required" }]}
                    >
                      <Input placeholder="Variable Key (e.g. {{email}})" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item {...restField} name={[name, "description"]} className="m-0">
                      <Input placeholder="Description (e.g. Lead's email address)" />
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
                  className="border-purple-400 text-purple-700 hover:text-purple-800 font-semibold"
                >
                  + Add Available Variable
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
