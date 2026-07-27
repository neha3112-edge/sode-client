"use client";

import React from "react";
import { Card, Switch, Form, Divider, Button, Select, Space } from "antd";
import { SettingOutlined, BellOutlined, SafetyCertificateOutlined } from "@ant-design/icons";

export default function SettingsPage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 0" }}>
      <Card
        title={<span className="text-xl font-bold text-gray-800"><SettingOutlined className="mr-2" />Account Settings</span>}
        className="shadow-md rounded-2xl"
        bordered={false}
      >
        <Form layout="vertical" initialValues={{ language: "en", theme: "light" }}>
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <BellOutlined /> Notification Settings
          </h3>
          <Form.Item label="Email Notifications" valuePropName="checked" className="m-0">
            <div className="flex justify-between items-center w-full py-2">
              <span className="text-gray-500 text-sm">Receive email updates about system activities</span>
              <Switch defaultChecked />
            </div>
          </Form.Item>

          <Divider />

          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mt-4">
            <SafetyCertificateOutlined /> Security Settings
          </h3>
          <Form.Item label="Two-Factor Authentication" valuePropName="checked" className="m-0">
            <div className="flex justify-between items-center w-full py-2">
              <span className="text-gray-500 text-sm">Enable two-factor authentication (2FA) for your account</span>
              <Switch />
            </div>
          </Form.Item>

          <Divider />

          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mt-4">
            Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="language" label="Interface Language">
              <Select>
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="es">Español</Select.Option>
                <Select.Option value="hi">हिन्दी</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="theme" label="Theme">
              <Select>
                <Select.Option value="light">Light Mode</Select.Option>
                <Select.Option value="dark">Dark Mode</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="primary" className="bg-blue-600">
              Save Changes
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
