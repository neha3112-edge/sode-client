import React from "react";
import { Form, Input, Select, Switch, Row, Col } from "antd";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

export default function UserForm({ isUpdateForm = false }) {
    // Dropdown options via RTK Query using 'options' endPoint
    const { data: rolesData = [], isLoading: loadingRoles } =
        useGetDynamicOptionsQuery({ entity: "role", endPoint: "options" });
    const { data: workspacesData = [], isLoading: loadingWorkspaces } =
        useGetDynamicOptionsQuery({ entity: "workspace", endPoint: "options" });
    const { data: usersData = [], isLoading: loadingUsers } =
        useGetDynamicOptionsQuery({ entity: "user", endPoint: "options" });

    const roles = Array.isArray(rolesData)
        ? rolesData
        : Array.isArray(rolesData?.result)
        ? rolesData.result
        : Array.isArray(rolesData?.items)
        ? rolesData.items
        : [];

    const workspaces = Array.isArray(workspacesData)
        ? workspacesData
        : Array.isArray(workspacesData?.result)
        ? workspacesData.result
        : Array.isArray(workspacesData?.items)
        ? workspacesData.items
        : [];

    const users = Array.isArray(usersData)
        ? usersData
        : Array.isArray(usersData?.result)
        ? usersData.result
        : Array.isArray(usersData?.items)
        ? usersData.items
        : [];

    return (
        <>
            <Row gutter={16}>
                {/* Full Name */}
                <Col span={12}>
                    <Form.Item
                        label="Full Name"
                        name="fullname"
                        rules={[{ required: true, message: "Please enter full name" }]}
                    >
                        <Input placeholder="John Doe" />
                    </Form.Item>
                </Col>

                {/* Username */}
                <Col span={12}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: "Please enter username" }]}
                    >
                        <Input placeholder="johndoe" disabled={isUpdateForm} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                {/* Email */}
                <Col span={12}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter email" },
                            { type: "email", message: "Please enter a valid email" },
                        ]}
                    >
                        <Input placeholder="example@mail.com" disabled={isUpdateForm} />
                    </Form.Item>
                </Col>

                {/* Phone */}
                <Col span={12}>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[{ required: true, message: "Please enter phone number" }]}
                    >
                        <Input placeholder="+91 XXXXX XXXXX" />
                    </Form.Item>
                </Col>
            </Row>

            {/* Password */}
            {!isUpdateForm && (
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Please enter password" }]}
                >
                    <Input.Password placeholder="Enter Password" />
                </Form.Item>
            )}

            <Row gutter={16}>
                {/* Role Assignment */}
                <Col span={12}>
                    <Form.Item
                        label="Assign Role"
                        name="role"
                        rules={[{ required: true, message: "Please select a role" }]}
                    >
                        <Select
                            placeholder="Select Role"
                            loading={loadingRoles}
                            showSearch
                            optionFilterProp="label"
                            options={roles.map((role) => ({
                                label: role.name || role.title,
                                value: String(role._id || role.id),
                            }))}
                        />
                    </Form.Item>
                </Col>

                {/* Reports To (Manager) */}
                <Col span={12}>
                    <Form.Item label="Reports To (Manager)" name="reportsTo">
                        <Select
                            placeholder="Select Manager"
                            loading={loadingUsers}
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            options={users.map((u) => ({
                                label: `${u.fullname || u.name || u.username} (${u.username})`,
                                value: String(u._id || u.id),
                            }))}
                        />
                    </Form.Item>
                </Col>
            </Row>

            {/* Workspace Multiple Selection */}
            <Form.Item label="Workspaces" name="workspace">
                <Select
                    mode="multiple"
                    placeholder="Select Workspaces"
                    loading={loadingWorkspaces}
                    allowClear
                    optionFilterProp="label"
                    options={workspaces.map((ws) => ({
                        label: ws.name || ws.title,
                        value: String(ws._id || ws.id),
                    }))}
                />
            </Form.Item>

            <Row gutter={16}>
                {/* Account Enabled Switch */}
                <Col span={6}>
                    <Form.Item label="Enabled" name="enabled" valuePropName="checked" initialValue={false}>
                        <Switch />
                    </Form.Item>
                </Col>

                {/* Is Admin */}
                <Col span={6}>
                    <Form.Item label="Is Admin" name="isAdmin" valuePropName="checked" initialValue={false}>
                        <Switch />
                    </Form.Item>
                </Col>

                {/* Is Subadmin */}
                <Col span={6}>
                    <Form.Item label="Is Subadmin" name="isSubadmin" valuePropName="checked" initialValue={false}>
                        <Switch />
                    </Form.Item>
                </Col>

                {/* Is Owner */}
                <Col span={6}>
                    <Form.Item label="Is Owner" name="isOwner" valuePropName="checked" initialValue={false}>
                        <Switch />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
}