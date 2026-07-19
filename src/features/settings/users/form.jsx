import React, { useEffect, useRef } from "react";
import { Form, Input, Select, Switch, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { fetchOptions } from "@/redux/options/actions";
// import {
//     selectSpecificEntityLoading,
//     selectSpecificEntityData,
// } from "@/redux/options/selectors"; // अपने Redux पाथ के अनुसार बदलें

export default function UserForm({ isUpdateForm = false }) {
    // const dispatch = useDispatch();
    // const hasFetchedOptions = useRef(false);

    // Dropdown ऑप्शंस फ़ेच करना (Roles, Workspaces, Users)
    // useEffect(() => {
    //     if (!hasFetchedOptions.current) {
    //         hasFetchedOptions.current = true;
    //         dispatch(fetchOptions("role"));
    //         dispatch(fetchOptions("workspace"));
    //         dispatch(fetchOptions("user")); // 'reportsTo' (Manager) सिलेक्ट करने के लिए
    //     }
    // }, [dispatch]);

    // Redux Selectors से डेटा निकालना
    // const roles = useSelector((state) => selectSpecificEntityData(state, "role")) || [];
    // const workspaces = useSelector((state) => selectSpecificEntityData(state, "workspace")) || [];
    // const users = useSelector((state) => selectSpecificEntityData(state, "user")) || [];

    // Loading States
    // const loadingRoles = useSelector((state) => selectSpecificEntityLoading(state, "role"));
    // const loadingWorkspaces = useSelector((state) => selectSpecificEntityLoading(state, "workspace"));
    // const loadingUsers = useSelector((state) => selectSpecificEntityLoading(state, "user"));

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

            {/* Password - केवल Create Form में Required होना चाहिए, Update में ऑप्शनल या हिडन */}
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
                {/* <Col span={12}>
                    <Form.Item
                        label="Assign Role"
                        name="role"
                        rules={[{ required: true, message: "Please select a role" }]}
                    >
                        <Select placeholder="Select Role" loading={loadingRoles} showSearch filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                            {roles.map((role) => (
                                <Select.Option key={role._id} value={role._id}>
                                    {role.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col> */}

                {/* Reports To (Manager) */}
                {/* <Col span={12}>
                    <Form.Item label="Reports To (Manager)" name="reportsTo">
                        <Select placeholder="Select Manager" loading={loadingUsers} allowClear showSearch filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}>
                            {users.map((u) => (
                                <Select.Option key={u._id} value={u._id}>
                                    {u.fullname} ({u.username})
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col> */}
            </Row>

            {/* Workspace Multiple Selection */}
            {/* <Form.Item label="Workspaces" name="workspace">
                <Select
                    mode="multiple"
                    placeholder="Select Workspaces"
                    loading={loadingWorkspaces}
                    allowClear
                >
                    {workspaces.map((ws) => (
                        <Select.Option key={ws._id} value={ws._id}>
                            {ws.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item> */}

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