"use client";

import React from "react";
import { Form, Input, Switch, InputNumber, Row, Col } from "antd";

export default function DurationForm({ isUpdateForm = false }) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="title"
            label="Duration Title"
            rules={[{ required: true, message: "Please enter duration title" }]}
          >
            <Input placeholder="e.g. 12 Months (1 Year), 24 Months (2 Years)" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. 12-months, 24-months, 3-years" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="months"
            label="Number of Months"
            initialValue={12}
            rules={[{ required: true, message: "Please enter number of months" }]}
          >
            <InputNumber min={1} max={120} className="w-full" placeholder="e.g. 12, 24, 36" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Description / Notes">
        <Input.TextArea rows={3} placeholder="Duration details or notes..." />
      </Form.Item>

      <Row gutter={16} align="middle">
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
