"use client";

import React from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col } from "antd";

export default function FeeForm({ isUpdateForm = false }) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Fee Display Title"
            rules={[{ required: true, message: "Please enter fee display title" }]}
          >
            <Input placeholder="e.g. ₹1,50,000 or Free / Funded" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter slug" }]}
          >
            <Input placeholder="e.g. 1-50-000 or free-funded" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="amount"
            label="Numeric Amount"
            rules={[{ required: true, message: "Please enter numeric amount" }]}
            initialValue={0}
          >
            <InputNumber min={0} className="w-full" placeholder="e.g. 150000" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="currency"
            label="Currency"
            initialValue="INR"
            rules={[{ required: true, message: "Please select currency" }]}
          >
            <Select placeholder="Select Currency">
              <Select.Option value="INR">INR (₹)</Select.Option>
              <Select.Option value="USD">USD ($)</Select.Option>
              <Select.Option value="EUR">EUR (€)</Select.Option>
              <Select.Option value="GBP">GBP (£)</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Description / Fee Notes">
        <Input.TextArea rows={3} placeholder="Fee structure details, payment options..." />
      </Form.Item>

      <Row gutter={16} align="middle">
        <Col span={12}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="enabled"
            label="Active / Enabled"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
