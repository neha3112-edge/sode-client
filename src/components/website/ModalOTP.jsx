"use client";

import React, { useState, useEffect } from "react";
import { PhoneOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Button } from "antd";

export default function ModalOTP({
    open: controlledOpen,
    onCancel,
    onFinish,
    triggerId = "counselling-form-modal",
}) {
    const [form] = Form.useForm();
    const [isOpen, setIsOpen] = useState(Boolean(controlledOpen));

    useEffect(() => {
        if (controlledOpen !== undefined) {
            setIsOpen(Boolean(controlledOpen));
        }
    }, [controlledOpen]);

    useEffect(() => {
        const handleTriggerClick = (e) => {
            const target = e.target.closest(
                `#${triggerId}, #${triggerId}-btn, [data-modal="${triggerId}"], [data-target="#${triggerId}"], [data-target="${triggerId}"], a[href="#${triggerId}"]`
            );
            if (target) {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(true);
            }
        };

        const handleCustomEvent = (e) => {
            if (!e.detail || e.detail.targetId === triggerId || !e.detail.targetId) {
                setIsOpen(true);
            }
        };

        document.addEventListener("click", handleTriggerClick);
        window.addEventListener("sode:open-counselling-modal", handleCustomEvent);
        window.addEventListener("open-counselling-modal", handleCustomEvent);

        return () => {
            document.removeEventListener("click", handleTriggerClick);
            window.removeEventListener("sode:open-counselling-modal", handleCustomEvent);
            window.removeEventListener("open-counselling-modal", handleCustomEvent);
        };
    }, [triggerId]);

    const handleClose = () => {
        setIsOpen(false);
        form.resetFields();
        if (onCancel) onCancel();
    };

    const handleFinish = (values) => {
        if (onFinish) {
            onFinish(values);
        }
        handleClose();
    };

    return (
        <Modal
            id={triggerId}
            open={isOpen}
            onCancel={handleClose}
            title="Enter your phone number"
            destroyOnHidden
            centered
            className="counselling-otp-modal"
            footer={
                <Button
                    type="primary"
                    onClick={() => form.submit()}
                    block
                    className="rounded-lg h-10 font-bold bg-[#0C2B4E] hover:bg-[#08203b] border-none"
                >
                    Submit
                </Button>
            }
        >
            <Form form={form} onFinish={handleFinish} layout="vertical" className="pt-2">
                <Form.Item
                    name="phone"
                    className="mb-0"
                    rules={[
                        { required: true, message: "Please enter your phone number" },
                        { pattern: /^[6-9]\d{9}$/, message: "Please enter a valid 10-digit phone number" },
                    ]}
                >
                    <Input
                        placeholder="Enter your phone number"
                        prefix={<PhoneOutlined className="text-gray-400" />}
                        maxLength={10}
                        className="rounded-lg h-11 text-base"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
