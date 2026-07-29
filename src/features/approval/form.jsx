"use client";

import React from "react";
import { Form, Input, Switch, InputNumber, Row, Col, Select } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function ApprovalForm({ isUpdateForm = false }) {
  const { data: mediaData, isLoading: loadingMedia } =
    useGetDynamicOptionsQuery({ entity: "media" });

  const formatOptions = (data) => {
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.result)
      ? data.result
      : [];
    return list.map((item) => ({
      label: item.name || item.title || item.fileName || item._id,
      value: String(item._id || item.value || item.id),
    }));
  };

  const mediaOptions = formatOptions(mediaData);

  const singleObjProp = (val) => ({
    value: typeof val === "object" && val !== null ? val._id || val.id || val : val,
  });
  const singleObjEvent = (val) =>
    typeof val === "object" && val !== null ? val._id || val.id || val : val;

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Approval / Accreditation Name"
            rules={[{ required: true, message: "Please enter approval name" }]}
          >
            <Input placeholder="e.g. UGC-DEB, AICTE, WES Accredited" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="slug"
            label="URL Slug"
            rules={[{ required: true, message: "Please enter URL slug" }]}
          >
            <Input placeholder="e.g. ugc-deb, aicte, wes-accredited" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="logoSrc"
            label="Logo Asset (Media)"
            getValueFromEvent={singleObjEvent}
            getValueProps={singleObjProp}
          >
            <Select
              placeholder="Select Approval Logo Media"
              loading={loadingMedia}
              allowClear
              showSearch
              optionFilterProp="label"
              options={mediaOptions}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="order" label="Sort Order" initialValue={0}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="description" label="Description / Details">
        <Input.TextArea rows={3} placeholder="Details about this approval..." />
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
