"use client";

import React from "react";
import { Form, Input, InputNumber, Select, Switch, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function RatingForm({ isUpdateForm = false }) {
  const { data: userOptions = [], isLoading: isUsersLoading } =
    useGetDynamicOptionsQuery({
      entity: "user",
      endPoint: "options",
    });

  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="rating"
            label="Rating (0.5 to 5.0)"
            rules={[
              { required: true, message: "Please enter rating value" },
            ]}
          >
            <InputNumber
              min={0.5}
              max={5.0}
              step={0.5}
              className="w-full"
              placeholder="e.g. 4.5"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="status"
            label="Moderation Status"
            initialValue="approved"
            rules={[{ required: true, message: "Please select moderation status" }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="approved">Approved</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="title" label="Review Title">
            <Input placeholder="e.g. Highly recommend this course!" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="createdBy" label="User / Reviewer (Optional)">
            <Select
              placeholder="Select User"
              loading={isUsersLoading}
              allowClear
              showSearch
              optionFilterProp="children"
            >
              {Array.isArray(userOptions) &&
                userOptions.map((user) => (
                  <Select.Option key={user._id} value={user._id}>
                    {user.fullname || user.username || user.label}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="review"
        label="Review Text"
        rules={[
          { required: true, message: "Please enter review text" },
          { min: 10, message: "Review must be at least 10 characters" },
        ]}
      >
        <Input.TextArea rows={4} placeholder="Detailed course review or feedback..." />
      </Form.Item>

      <Form.Item name="rejectionReason" label="Rejection Reason (Optional)">
        <Input placeholder="Reason for rejecting this rating..." />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="isVerifiedPurchase"
            label="Verified Purchase"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
        </Col>

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
