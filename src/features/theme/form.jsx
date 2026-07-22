"use client";

import React from "react";
import { Form, Input, Select, Switch, Row, Col, Tabs } from "antd";

export default function ThemeForm({ isUpdateForm = false }) {
  const form = Form.useFormInstance();

  // Watch color fields reactively for 2-way input sync
  const primaryColor = Form.useWatch("primaryColor", form) || "#102441";
  const secondaryColor = Form.useWatch("secondaryColor", form) || "#EEC471";
  const accentColor = Form.useWatch("accentColor", form) || "#3b82f6";
  const backgroundColor = Form.useWatch("backgroundColor", form) || "#0a1424";
  const textColor = Form.useWatch("textColor", form) || "#f8fafc";
  
  const gradientStart = Form.useWatch("gradientStart", form) || "#102441";
  const gradientEnd = Form.useWatch("gradientEnd", form) || "#0a1424";
  
  const buttonBgColor = Form.useWatch("buttonBgColor", form) || "#EEC471";
  const buttonTextColor = Form.useWatch("buttonTextColor", form) || "#102441";
  const buttonHoverBgColor = Form.useWatch("buttonHoverBgColor", form) || "#f7d594";
  
  const cardBgColor = Form.useWatch("cardBgColor", form) || "#162a4d";
  const cardBorderColor = Form.useWatch("cardBorderColor", form) || "#1e3b6c";
  
  const headerBgColor = Form.useWatch("headerBgColor", form) || "#102441";
  const headerTextColor = Form.useWatch("headerTextColor", form) || "#ffffff";

  return (
    <Tabs
      defaultActiveKey="general"
      className="custom-theme-tabs"
      items={[
        {
          key: "general",
          label: <span className="font-semibold text-xs uppercase tracking-wide">General & Typography</span>,
          children: (
            <div className="pt-3">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="themeName"
                    label="Theme Profile Name"
                    rules={[{ required: true, message: "Please enter theme profile name" }]}
                  >
                    <Input placeholder="e.g. SODE Executive Royal Dark" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="themeMode"
                    label="Default Mode Scheme"
                    initialValue="dark"
                    rules={[{ required: true, message: "Please select scheme mode" }]}
                  >
                    <Select placeholder="Select mode">
                      <Select.Option value="light">Light Mode</Select.Option>
                      <Select.Option value="dark">Dark Mode</Select.Option>
                      <Select.Option value="system">System Preference</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="headingFont" label="Heading Font (Google Font)" initialValue="Outfit">
                    <Input placeholder="e.g. Outfit, Playfair Display" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="bodyFont" label="Body Font (Google Font)" initialValue="Inter">
                    <Input placeholder="e.g. Inter, Roboto" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="borderRadius"
                    label="Global Border Radius"
                    initialValue="lg"
                  >
                    <Select placeholder="Select roundedness">
                      <Select.Option value="none">Square Corners (none)</Select.Option>
                      <Select.Option value="sm">Small (sm - 4px)</Select.Option>
                      <Select.Option value="md">Medium (md - 8px)</Select.Option>
                      <Select.Option value="lg">Large / Standard (lg - 12px)</Select.Option>
                      <Select.Option value="xl">Extra Large (xl - 16px)</Select.Option>
                      <Select.Option value="full">Pill / Circle (full)</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col span={12}>
                  <Form.Item
                    name="maxContainerWidth"
                    label="Layout Container Width"
                    initialValue="1440px"
                  >
                    <Select placeholder="Select maximum width">
                      <Select.Option value="1200px">Compact (1200px)</Select.Option>
                      <Select.Option value="1440px">Standard Wide (1440px)</Select.Option>
                      <Select.Option value="1600px">Ultra Wide (1600px)</Select.Option>
                      <Select.Option value="100%">Full Page Fluid (100%)</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          ),
        },
        {
          key: "colors",
          label: <span className="font-semibold text-xs uppercase tracking-wide">Brand Colors</span>,
          children: (
            <div className="pt-3">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="primaryColor" label="Primary Color" initialValue="#102441">
                    <Input
                      placeholder="Hex e.g. #102441"
                      suffix={
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => form.setFieldsValue({ primaryColor: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item name="secondaryColor" label="Secondary Color" initialValue="#EEC471">
                    <Input
                      placeholder="Hex e.g. #EEC471"
                      suffix={
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => form.setFieldsValue({ secondaryColor: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item name="accentColor" label="Accent Interaction Color" initialValue="#3b82f6">
                    <Input
                      placeholder="Hex e.g. #3b82f6"
                      suffix={
                        <input
                          type="color"
                          value={accentColor}
                          onChange={(e) => form.setFieldsValue({ accentColor: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="backgroundColor" label="Main Body Background" initialValue="#0a1424">
                    <Input
                      placeholder="Hex e.g. #0a1424"
                      suffix={
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => form.setFieldsValue({ backgroundColor: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="textColor" label="Primary Typography Color" initialValue="#f8fafc">
                    <Input
                      placeholder="Hex e.g. #f8fafc"
                      suffix={
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => form.setFieldsValue({ textColor: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          ),
        },
        {
          key: "gradients",
          label: <span className="font-semibold text-xs uppercase tracking-wide">Brand Gradients</span>,
          children: (
            <div className="pt-3">
              <Row gutter={16} align="middle">
                <Col span={12}>
                  <Form.Item
                    name="useGradient"
                    label="Enable Dynamic Background Gradients"
                    valuePropName="checked"
                    initialValue={true}
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="gradientDirection" label="Gradient Direction Flow" initialValue="to-b">
                    <Select placeholder="Select gradient direction">
                      <Select.Option value="to-b">Top to Bottom (to-b)</Select.Option>
                      <Select.Option value="to-r">Left to Right (to-r)</Select.Option>
                      <Select.Option value="to-tr">Bottom-Left to Top-Right (to-tr)</Select.Option>
                      <Select.Option value="to-br">Top-Left to Bottom-Right (to-br)</Select.Option>
                      <Select.Option value="to-t">Bottom to Top (to-t)</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="gradientStart" label="Gradient Start Color" initialValue="#102441">
                    <Input
                      placeholder="Hex e.g. #102441"
                      suffix={
                        <input
                          type="color"
                          value={gradientStart}
                          onChange={(e) => form.setFieldsValue({ gradientStart: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="gradientEnd" label="Gradient End Color" initialValue="#0a1424">
                    <Input
                      placeholder="Hex e.g. #0a1424"
                      suffix={
                        <input
                          type="color"
                          value={gradientEnd}
                          onChange={(e) => form.setFieldsValue({ gradientEnd: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          ),
        },
        {
          key: "buttons_cards",
          label: <span className="font-semibold text-xs uppercase tracking-wide">Buttons & Cards</span>,
          children: (
            <div className="pt-3">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-2">CTA Button Style Settings</span>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="buttonBgColor" label="Button Base Fill" initialValue="#EEC471">
                    <Input
                      placeholder="e.g. #EEC471"
                      suffix={
                        <input
                          type="color"
                          value={buttonBgColor}
                          onChange={(e) => form.setFieldsValue({ buttonBgColor: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="buttonTextColor" label="Button Text" initialValue="#102441">
                    <Input
                      placeholder="e.g. #102441"
                      suffix={
                        <input
                          type="color"
                          value={buttonTextColor}
                          onChange={(e) => form.setFieldsValue({ buttonTextColor: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="buttonHoverBgColor" label="Button Hover Fill" initialValue="#f7d594">
                    <Input
                      placeholder="e.g. #f7d594"
                      suffix={
                        <input
                          type="color"
                          value={buttonHoverBgColor}
                          onChange={(e) => form.setFieldsValue({ buttonHoverBgColor: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="buttonBorderRadius" label="Button Roundedness Corner Style" initialValue="full">
                    <Select placeholder="Select button corners style">
                      <Select.Option value="none">Square (none)</Select.Option>
                      <Select.Option value="sm">Small (sm)</Select.Option>
                      <Select.Option value="md">Medium (md)</Select.Option>
                      <Select.Option value="lg">Large (lg)</Select.Option>
                      <Select.Option value="xl">Extra Large (xl)</Select.Option>
                      <Select.Option value="full">Standard Capsule (full)</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <div className="border-t border-slate-100 pt-3 mt-1">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-2">Card Layout Aesthetics (IIT/IIM listings)</span>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="cardBgColor" label="Card Background" initialValue="#162a4d">
                      <Input
                        placeholder="e.g. #162a4d"
                        suffix={
                          <input
                            type="color"
                            value={cardBgColor}
                            onChange={(e) => form.setFieldsValue({ cardBgColor: e.target.value })}
                            className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                          />
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="cardBorderColor" label="Card Border" initialValue="#1e3b6c">
                      <Input
                        placeholder="e.g. #1e3b6c"
                        suffix={
                          <input
                            type="color"
                            value={cardBorderColor}
                            onChange={(e) => form.setFieldsValue({ cardBorderColor: e.target.value })}
                            className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                          />
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item name="cardShadow" label="Card Hover Shadow Elevation" initialValue="lg">
                      <Select placeholder="Select shadow elevation style">
                        <Select.Option value="none">Flat (no shadow)</Select.Option>
                        <Select.Option value="sm">Subtle Soft (sm)</Select.Option>
                        <Select.Option value="md">Medium depth (md)</Select.Option>
                        <Select.Option value="lg">Standard Premium (lg)</Select.Option>
                        <Select.Option value="xl">Intense depth (xl)</Select.Option>
                        <Select.Option value="2xl">Glow hover style (2xl)</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>
          ),
        },
        {
          key: "header_animations",
          label: <span className="font-semibold text-xs uppercase tracking-wide">Nav & Transitions</span>,
          children: (
            <div className="pt-3">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-2">Navbar Header Custom Design</span>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="headerBgColor" label="Header Fill" initialValue="#102441">
                    <Input
                      placeholder="e.g. #102441"
                      suffix={
                        <input
                          type="color"
                          value={headerBgColor}
                          onChange={(e) => form.setFieldsValue({ headerBgColor: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="headerTextColor" label="Header Text" initialValue="#ffffff">
                    <Input
                      placeholder="e.g. #ffffff"
                      suffix={
                        <input
                          type="color"
                          value={headerTextColor}
                          onChange={(e) => form.setFieldsValue({ headerTextColor: e.target.value })}
                          className="w-5 h-5 border-none p-0 cursor-pointer rounded-full overflow-hidden shadow-2xs outline-none"
                        />
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={8} className="flex items-center">
                  <Form.Item
                    name="headerSticky"
                    label="Sticky Navigation"
                    valuePropName="checked"
                    initialValue={true}
                    className="mb-0"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item name="headerFont" label="Header Font (Google Font)" initialValue="Inter">
                    <Input placeholder="e.g. Inter, Outfit" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="logoWidth" label="Logo Max Width (px)" initialValue={120}>
                    <Input type="number" placeholder="e.g. 120" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="logoHeight" label="Logo Max Height (px)" initialValue={40}>
                    <Input type="number" placeholder="e.g. 40" />
                  </Form.Item>
                </Col>
              </Row>

              <div className="border-t border-slate-100 pt-3 mt-3">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block mb-2">Animations, Speeds & overrides</span>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item name="transitionSpeed" label="Transitions Speed Rate" initialValue="normal">
                      <Select placeholder="Select speed rate">
                        <Select.Option value="fast">Snappy (150ms)</Select.Option>
                        <Select.Option value="normal">Standard Smooth (300ms)</Select.Option>
                        <Select.Option value="slow">Ease Elegant (500ms)</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  
                  <Col span={12}>
                    <Form.Item
                      name="enableAnimations"
                      label="Enable Micro-Animations"
                      valuePropName="checked"
                      initialValue={true}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <Form.Item name="customCss" label="Custom Advanced CSS Overrides" className="mt-2">
                <Input.TextArea rows={4} placeholder="/* Add custom styling rules override */" />
              </Form.Item>
            </div>
          ),
        }
      ]}
    />
  );
}
