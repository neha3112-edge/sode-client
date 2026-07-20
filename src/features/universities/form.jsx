"use client";

import React from "react";
import { Form, Input, Select, Switch, InputNumber, Row, Col, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function UniversityForm({ isUpdateForm = false }) {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="University Name"
            rules={[{ required: true, message: "Please enter university name" }]}
          >
            <Input placeholder="e.g. Golden Gate University" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. golden-gate-university" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="logoSrc"
            label="University Logo Path / URL"
            rules={[{ required: true, message: "Please enter logo path" }]}
          >
            <Input placeholder="e.g. /assets/images/ggu-logo.jpg" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="imageSrc"
            label="Campus Image Path / URL"
            rules={[{ required: true, message: "Please enter campus image path" }]}
          >
            <Input placeholder="e.g. /assets/images/ggu-image.png" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="courses" label="Courses Offered (Type & press Enter)">
            <Select
              mode="tags"
              placeholder="Type course name and press Enter"
              style={{ width: "100%" }}
              tokenSeparators={[","]}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="brochureUrl" label="Brochure PDF Path / URL">
            <Input placeholder="e.g. /assets/pdf/ggu_main_brochure.pdf" />
          </Form.Item>
        </Col>
      </Row>

      {/* Paragraphs List */}
      <Form.Item label="University Paragraphs / Overview">
        <Form.List name="paragraphs">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={name}
                    className="mb-0 flex-1 min-w-[320px] md:min-w-[450px]"
                    rules={[{ required: true, message: "Please enter paragraph text" }]}
                  >
                    <Input.TextArea
                      rows={2}
                      placeholder={`Paragraph ${index + 1} details...`}
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} className="text-red-500 hover:text-red-700 cursor-pointer text-lg" />
                </Space>
              ))}
              <Form.Item className="mb-0">
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Paragraph
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="metaTitle" label="SEO Meta Title">
            <Input placeholder="e.g. Rushford Business School | Online DBA & Executive Programs" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="metaDescription" label="SEO Meta Description">
            <Input.TextArea rows={2} placeholder="Meta description for search engines..." />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="metaKeywords" label="SEO Keywords">
            <Input placeholder="e.g. Rushford, Rushford Business School, Switzerland DBA" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="ogImage" label="Social Preview Image (OG Image)">
            <Input placeholder="e.g. /assets/images/rushford-image.png" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="featured"
            label="Featured"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </Col>

        <Col span={6}>
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
