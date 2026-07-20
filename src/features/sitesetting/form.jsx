"use client";

import React from "react";
import { Form, Input, Switch, Select, Row, Col } from "antd";

export default function SiteSettingForm({ isUpdateForm = false }) {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="siteName"
            label="Site Name"
            rules={[{ required: true, message: "Please enter site name" }]}
          >
            <Input placeholder="e.g. SODE" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="siteUrl"
            label="Site Base URL"
            rules={[{ required: true, message: "Please enter site URL" }]}
          >
            <Input placeholder="e.g. https://sode.co.in" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="gtmId" label="Google Tag Manager ID (GTM ID)">
            <Input placeholder="e.g. GTM-567GP8S9" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="googleAdsIds" label="Google Ads IDs (Type & press Enter)">
            <Select
              mode="tags"
              placeholder="e.g. AW-17917271919"
              style={{ width: "100%" }}
              tokenSeparators={[","]}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="faviconIco" label="Favicon ICO Path">
            <Input placeholder="e.g. /assets/images/favicon.ico" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="faviconSvg" label="Favicon SVG Path">
            <Input placeholder="e.g. /assets/images/favicon.svg" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="favicon96" label="Favicon 96x96 PNG Path">
            <Input placeholder="e.g. /assets/images/favicon-96x96.png" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="appleTouchIcon" label="Apple Touch Icon Path">
            <Input placeholder="e.g. /assets/images/apple-touch-icon.png" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="webmanifest" label="Android Webmanifest Path">
            <Input placeholder="e.g. /assets/images/site.webmanifest" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="ogImage" label="Default Social Share Image (OG Image)">
            <Input placeholder="e.g. https://sode.co.in/assets/images/sode-homepage-og-card-image.png" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="showGlobalCta"
            label="Show Floating Scholarship & Bottom CTA"
            valuePropName="checked"
            initialValue={true}
          >
            <Switch />
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

      <Form.Item name="headerScript" label="Custom Header Analytics Code / HTML Script">
        <Input.TextArea rows={3} placeholder="<!-- Custom head code -->" />
      </Form.Item>

      <Form.Item name="footerScript" label="Custom Footer Chat / Tracking Script">
        <Input.TextArea rows={3} placeholder="<!-- Custom footer code -->" />
      </Form.Item>
    </Form>
  );
}
