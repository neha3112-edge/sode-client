"use client";

import React from "react";
import { Form, Input, Switch, Row, Col } from "antd";

export default function CountryForm({ isUpdateForm = false }) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Country Name"
            rules={[{ required: true, message: "Please enter country name" }]}
          >
            <Input placeholder="e.g. India, United States" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. india, united-states" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="desc" label="Description">
        <Input.TextArea rows={3} placeholder="Country summary or notes..." />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="enabled"
            label="Active"
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
