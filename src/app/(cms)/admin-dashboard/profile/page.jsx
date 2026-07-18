"use client";

import React from "react";
import { Card, Avatar, Descriptions, Tag, Space, Button } from "antd";
import { UserOutlined, MailOutlined, KeyOutlined } from "@ant-design/icons";

export default function ProfilePage() {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 0" }}>
      <Card
        title={<span className="text-xl font-bold text-gray-800">My Profile</span>}
        className="shadow-md rounded-2xl"
        bordered={false}
      >
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 pb-6 border-b border-gray-100">
          <Avatar
            size={96}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#2563eb" }}
          />
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800 m-0">Abhishek Jadon</h2>
            <p className="text-gray-500 mt-1">Administrator</p>
            <Space size="middle" className="mt-2">
              <Tag color="blue">Super Admin</Tag>
              <Tag color="green">Active</Tag>
            </Space>
          </div>
        </div>

        <div className="mt-6">
          <Descriptions title="Account Information" column={1} bordered={false}>
            <Descriptions.Item label={<span className="font-semibold text-gray-600"><MailOutlined className="mr-2" />Email</span>}>
              admin@sode.com
            </Descriptions.Item>
            <Descriptions.Item label={<span className="font-semibold text-gray-600"><UserOutlined className="mr-2" />Username</span>}>
              abhishek.jadon
            </Descriptions.Item>
            <Descriptions.Item label={<span className="font-semibold text-gray-600"><KeyOutlined className="mr-2" />Role Permission Group</span>}>
              Administrator (Full Access)
            </Descriptions.Item>
          </Descriptions>
        </div>

        <div className="mt-6 flex justify-end">
          <Button type="primary" className="bg-blue-600">
            Edit Profile
          </Button>
        </div>
      </Card>
    </div>
  );
}
