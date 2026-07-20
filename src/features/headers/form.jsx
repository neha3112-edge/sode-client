"use client";

import React from "react";
import { Form, Input, Switch, InputNumber, Row, Col } from "antd";

export default function HeaderForm({ isUpdateForm = false }) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="label"
            label="Navigation Label"
            rules={[{ required: true, message: "Please enter label" }]}
          >
            <Input placeholder="e.g. Programs, About Us, Contact" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="href"
            label="Target Link / URL (href)"
            rules={[{ required: true, message: "Please enter target link" }]}
          >
            <Input placeholder="e.g. /courses, /about-us" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="slug"
            label="Slug"
            rules={[{ required: true, message: "Please enter slug" }]}
          >
            <Input placeholder="e.g. programs, about-us" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="enabled"
        label="Active / Enabled"
        valuePropName="checked"
        initialValue={true}
      >
        <Switch />
      </Form.Item>
    </>
  );
}
