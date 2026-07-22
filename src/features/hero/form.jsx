"use client";

import React, { useEffect } from "react";
import {
  Form,
  Input,
  Switch,
  InputNumber,
  Row,
  Col,
  Select,
  Card,
  Button,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";
import { getAssetPath } from "@/lib/utils";

const { TextArea } = Input;

export default function HeroForm({ isUpdateForm = false }) {
  const form = Form.useFormInstance();

  // Fetch Media options for image selection dropdowns
  const { data: mediaOptions = [] } = useGetDynamicOptionsQuery({
    entity: "media",
    endPoint: "options",
  });

  const mediaList = Array.isArray(mediaOptions) ? mediaOptions : [];

  // Normalize initial form values on update form (convert populated objects to _id strings)
  useEffect(() => {
    if (!form || !isUpdateForm) return;

    const values = form.getFieldsValue();
    if (!values) return;

    const extractId = (val) =>
      typeof val === "object" && val !== null ? val._id : val;

    let needsUpdate = false;
    const patch = {};

    if (values.bgImage && typeof values.bgImage === "object") {
      patch.bgImage = values.bgImage._id;
      needsUpdate = true;
    }

    if (values.mobileImage && typeof values.mobileImage === "object") {
      patch.mobileImage = values.mobileImage._id;
      needsUpdate = true;
    }

    if (values.image && typeof values.image === "object") {
      patch.image = values.image._id;
      needsUpdate = true;
    }

    if (Array.isArray(values.slides)) {
      const updatedSlides = values.slides.map((s) => {
        if (typeof s !== "object" || s === null) return s;
        return {
          ...s,
          bgImage: extractId(s.bgImage),
          mobileImage: extractId(s.mobileImage),
          image: extractId(s.image),
        };
      });

      patch.slides = updatedSlides;
      needsUpdate = true;
    }

    if (needsUpdate) {
      form.setFieldsValue(patch);
    }
  }, [form, isUpdateForm]);

  // Helper to render image preview thumbnail from mediaList or direct URL
  const renderImagePreview = (selectedMediaId) => {
    if (!selectedMediaId) return null;
    const mediaObj = mediaList.find((m) => m._id === selectedMediaId);
    const rawUrl = mediaObj?.url || (typeof selectedMediaId === "string" ? selectedMediaId : null);
    if (!rawUrl) return null;

    const displayUrl = getAssetPath(rawUrl);

    return (
      <div className="mt-2 flex items-center gap-2 p-1.5 bg-slate-100 rounded-md border border-slate-200 w-fit">
        <div className="w-12 h-12 rounded overflow-hidden relative bg-slate-800">
          <img
            src={displayUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-[11px] font-semibold text-slate-600 max-w-37.5 truncate">
          {mediaObj?.name || mediaObj?.fileName || "Media Selected"}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 font-sans">
      {/* ── SECTION 1: TARGET PAGE & MODE ── */}
      <Card
        title="1. Target Page & Display Mode"
        size="small"
        variant="borderless"
        className="bg-slate-50/50"
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Hero Section Name / Identifier"
              rules={[
                { required: true, message: "Please enter Hero section name" },
              ]}
            >
              <Input placeholder="e.g. Home Page Main Hero, Universities Banner" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="page"
              label="Target Page Slug"
              initialValue="home"
              rules={[
                { required: true, message: "Please enter target page slug" },
              ]}
            >
              <Select
                showSearch
                virtual={false}
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                options={[
                  { label: "🏠 Home Page (home)", value: "home" },
                  { label: "🏛️ Universities List (universities)", value: "universities" },
                  { label: "🎓 Courses List (courses)", value: "courses" },
                  { label: "📝 Blog Page (blog)", value: "blog" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} align="middle">
          <Col span={12}>
            <Form.Item
              name="showForm"
              label="📋 Counselling Form Visibility"
              initialValue="both"
              tooltip="Choose where the Apply/Counselling Form should be displayed"
            >
              <Select
                virtual={false}
                options={[
                  { label: "📱💻 Both Mobile & Desktop (Default)", value: "both" },
                  { label: "💻 Desktop Only", value: "desktop" },
                  { label: "📱 Mobile Only", value: "mobile" },
                  { label: "🚫 Hide Form (No Form)", value: "none" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="isCarousel"
              label="Carousel Mode"
              valuePropName="checked"
              initialValue={false}
              tooltip="Enable multi-slide Carousel Slider or keep single Static Hero Banner"
            >
              <Switch
                checkedChildren="Carousel Active"
                unCheckedChildren="Single Static Banner"
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="enabled"
              label="Active Status"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch checkedChildren="Active" unCheckedChildren="Disabled" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* ── SECTION 2: SINGLE HERO BANNER CONFIG ── */}
      <Form.Item
        noStyle
        shouldUpdate={(prev, curr) => prev.isCarousel !== curr.isCarousel}
      >
        {({ getFieldValue }) =>
          !getFieldValue("isCarousel") && (
            <Card
              title="2. Single Hero Banner Content & Media"
              size="small"
              variant="borderless"
              className="bg-slate-50/50"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="badge" label="Top Badge Text">
                    <Input placeholder="e.g. #1 School of Online & Distance Education" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="primaryCtaText" label="Primary Button Text">
                    <Input placeholder="e.g. Book 1:1 Personalised Counselling" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="title" label="Main Heading Title">
                <Input placeholder="e.g. Certifications & Online Degree Courses from IITs & IIMs" />
              </Form.Item>

              <Form.Item name="subtitle" label="Subtitle / Tagline">
                <Input placeholder="e.g. Your Gateway to Strategic Leadership Program Learning" />
              </Form.Item>

              <Form.Item name="description" label="Detailed Description">
                <TextArea
                  rows={3}
                  placeholder="Enter detailed description paragraph..."
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="bgImage"
                    label="🖥️ Desktop Background Image (Media Asset)"
                  >
                    <Select
                      showSearch
                      virtual={false}
                      optionFilterProp="label"
                      filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      placeholder="Select Desktop Background from Media Collection"
                      allowClear
                      options={mediaList.map((m) => ({
                        label: `🖼️ ${m.name || m.fileName || m.url}`,
                        value: m._id,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prev, curr) => prev.bgImage !== curr.bgImage}
                  >
                    {({ getFieldValue }) =>
                      renderImagePreview(getFieldValue("bgImage"))
                    }
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="mobileImage"
                    label="📱 Mobile Counselor Banner Image (Media Asset)"
                  >
                    <Select
                      showSearch
                      virtual={false}
                      optionFilterProp="label"
                      filterOption={(input, option) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                      placeholder="Select Mobile Image from Media Collection"
                      allowClear
                      options={mediaList.map((m) => ({
                        label: `🖼️ ${m.name || m.fileName || m.url}`,
                        value: m._id,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prev, curr) => prev.mobileImage !== curr.mobileImage}
                  >
                    {({ getFieldValue }) =>
                      renderImagePreview(getFieldValue("mobileImage"))
                    }
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} className="mt-3">
                <Col span={12}>
                  <Form.Item name="primaryCtaLink" label="Primary Button Link / Action">
                    <Input placeholder="e.g. #counselling or /courses" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="order" label="Display Sort Order" initialValue={0}>
                    <InputNumber min={0} className="w-full" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          )
        }
      </Form.Item>

      {/* ── SECTION 3: CAROUSEL SLIDES MANAGER & SETTINGS ── */}
      <Form.Item
        noStyle
        shouldUpdate={(prev, curr) => prev.isCarousel !== curr.isCarousel}
      >
        {({ getFieldValue }) =>
          getFieldValue("isCarousel") && (
            <Card
              title="3. Carousel Slider Controls & Slides Manager"
              size="small"
              variant="borderless"
              className="bg-slate-50/50"
            >
              {/* Carousel Settings */}
              <div className="p-3 bg-white rounded-lg border border-slate-200 mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Slider Settings
                </h4>
                <Row gutter={16}>
                  <Col span={6}>
                    <Form.Item
                      name={["carouselSettings", "autoplay"]}
                      label="Autoplay"
                      valuePropName="checked"
                      initialValue={true}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      name={["carouselSettings", "autoplaySpeed"]}
                      label="Speed (ms)"
                      initialValue={5000}
                    >
                      <InputNumber min={1000} step={500} className="w-full" />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      name={["carouselSettings", "showDots"]}
                      label="Show Dots"
                      valuePropName="checked"
                      initialValue={true}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    <Form.Item
                      name={["carouselSettings", "showArrows"]}
                      label="Show Arrows"
                      valuePropName="checked"
                      initialValue={true}
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Form.List Slides Editor */}
              <Form.List name="slides">
                {(fields, { add, remove }) => (
                  <div className="space-y-4">
                    {fields.map(({ key, name, ...restField }, idx) => (
                      <Card
                        key={key}
                        size="small"
                        title={`Slide #${idx + 1}`}
                        extra={
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => remove(name)}
                          >
                            Remove Slide
                          </Button>
                        }
                        className="bg-white border-slate-200"
                      >
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, "badge"]}
                              label="Badge"
                            >
                              <Input placeholder="e.g. GLOBAL ACCREDITED DEGREES" />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, "primaryCtaText"]}
                              label="Primary Button Text"
                            >
                              <Input placeholder="e.g. Book 1:1 Counselling" />
                            </Form.Item>
                          </Col>
                        </Row>

                        <Form.Item
                          {...restField}
                          name={[name, "title"]}
                          label="Slide Title"
                          rules={[{ required: true, message: "Slide title is required" }]}
                        >
                          <Input placeholder="Slide main heading..." />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, "description"]}
                          label="Slide Description"
                        >
                          <TextArea rows={2} placeholder="Slide details..." />
                        </Form.Item>

                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, "bgImage"]}
                              label="🖥️ Slide Desktop Background (Media Asset)"
                            >
                              <Select
                                showSearch
                                virtual={false}
                                optionFilterProp="label"
                                filterOption={(input, option) =>
                                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                                }
                                placeholder="Select Desktop Background Media Asset"
                                allowClear
                                options={mediaList.map((m) => ({
                                  label: `🖼️ ${m.name || m.fileName || m.url}`,
                                  value: m._id,
                                }))}
                              />
                            </Form.Item>
                            <Form.Item
                              noStyle
                              shouldUpdate={(prev, curr) =>
                                prev?.slides?.[name]?.bgImage !== curr?.slides?.[name]?.bgImage
                              }
                            >
                              {({ getFieldValue }) =>
                                renderImagePreview(getFieldValue(["slides", name, "bgImage"]))
                              }
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, "mobileImage"]}
                              label="📱 Slide Mobile Image (Media Asset)"
                            >
                              <Select
                                showSearch
                                virtual={false}
                                optionFilterProp="label"
                                filterOption={(input, option) =>
                                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                                }
                                placeholder="Select Mobile Media Asset"
                                allowClear
                                options={mediaList.map((m) => ({
                                  label: `🖼️ ${m.name || m.fileName || m.url}`,
                                  value: m._id,
                                }))}
                              />
                            </Form.Item>
                            <Form.Item
                              noStyle
                              shouldUpdate={(prev, curr) =>
                                prev?.slides?.[name]?.mobileImage !== curr?.slides?.[name]?.mobileImage
                              }
                            >
                              {({ getFieldValue }) =>
                                renderImagePreview(getFieldValue(["slides", name, "mobileImage"]))
                              }
                            </Form.Item>
                          </Col>
                        </Row>

                        <Row gutter={16} className="mt-3">
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, "primaryCtaLink"]}
                              label="Primary Button Link"
                            >
                              <Input placeholder="e.g. #counselling" />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, "secondaryCtaText"]}
                              label="Secondary Button Text"
                            >
                              <Input placeholder="e.g. Explore Programs" />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}

                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add New Slide to Carousel
                    </Button>
                  </div>
                )}
              </Form.List>
            </Card>
          )
        }
      </Form.Item>
    </div>
  );
}
