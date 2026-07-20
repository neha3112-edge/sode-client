"use client";

import React from "react";
import { Form, Input, Switch, Row, Col } from "antd";

export default function PageMetaForm({ isUpdateForm = false }) {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="pageName"
            label="Page Name"
            rules={[{ required: true, message: "Please enter page name" }]}
          >
            <Input placeholder="e.g. Home Page / Courses Page" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="pagePath"
            label="Page Route Path"
            rules={[{ required: true, message: "Please enter page route path" }]}
          >
            <Input placeholder="e.g. / or /courses or /about" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="title"
        label="SEO Meta Title Tag"
        rules={[{ required: true, message: "Please enter meta title" }]}
      >
        <Input placeholder="e.g. SODE | Certifications & Online Degree Courses" />
      </Form.Item>

      <Form.Item
        name="description"
        label="SEO Meta Description Tag"
        rules={[{ required: true, message: "Please enter meta description" }]}
      >
        <Input.TextArea
          rows={3}
          placeholder="Accredited distance & online MBA, BBA, MCA, DBA programs..."
        />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="keywords" label="SEO Keywords">
            <Input placeholder="e.g. online mba, distance education, dba, iim, iit" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="canonicalUrl" label="Canonical URL">
            <Input placeholder="e.g. https://sode.edu.in/courses" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="ogTitle" label="OpenGraph Title (Social)">
            <Input placeholder="Social share title preview..." />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="ogImage" label="OpenGraph Image Path / URL">
            <Input placeholder="e.g. /assets/images/og-home.png" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="ogDescription" label="OpenGraph Description">
        <Input.TextArea rows={2} placeholder="Social share description..." />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="twitterCard" label="Twitter Card Type" initialValue="summary_large_image">
            <Input placeholder="summary_large_image" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="enabled"
            label="Active Status"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
