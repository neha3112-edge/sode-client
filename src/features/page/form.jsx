"use client";

import React from "react";
import { Form, Input, Select, Switch, Row, Col, Card, Button, InputNumber, Tag, Rate } from "antd";
import { PlusOutlined, DeleteOutlined, CheckCircleOutlined, QuestionCircleOutlined, CodeOutlined } from "@ant-design/icons";
import { useGetDynamicOptionsQuery } from "@/store/redux/dynamic/action";

// =========================================================
// PREVIEW BLOCKS FOR REAL-TIME FORM CANVAS
// =========================================================
function BlockPreview({ section }) {
  if (!section || !section.sectionType) return null;

  const { sectionType, sectionTitle, sectionSubtitle, bodyContent } = section;

  switch (sectionType) {
    case "hero":
      return (
        <div className="bg-[#102441] text-[#f8fafc] border border-slate-700/50 p-5 rounded-lg my-2 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#EEC471]/10 rounded-full blur-2xl" />
          <Tag color="gold" className="uppercase font-bold text-[9px] tracking-wider mb-1.5">HERO BLOCK</Tag>
          <h5 className="text-[#EEC471] text-sm font-bold tracking-tight mt-0.5">{sectionTitle || "Hero Headline..."}</h5>
          <p className="text-slate-300 text-[10px] mt-0.5 leading-relaxed">{sectionSubtitle || "Hero sub-description..."}</p>
          <div className="flex gap-2 mt-3">
            <button className="bg-[#EEC471] text-[#102441] text-[9px] font-bold px-2.5 py-1 rounded-full">Apply Now</button>
            <button className="border border-slate-500 text-slate-200 text-[9px] font-bold px-2.5 py-1 rounded-full">Brochure</button>
          </div>
        </div>
      );

    case "stats":
      return (
        <div className="bg-[#0f1d32] border border-slate-800 p-4 rounded-lg my-2 shadow-xs">
          <Tag color="cyan" className="uppercase font-bold text-[9px] tracking-wider mb-2">STATS GRID</Tag>
          <div className="text-[10px] font-bold text-slate-300 mb-1">{sectionTitle || "Analytics Stats"}</div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="bg-[#162a4d] p-2 rounded text-center">
              <div className="text-xs font-bold text-[#EEC471]">4.8 ★</div>
              <div className="text-[8px] text-slate-400">Reviews</div>
            </div>
            <div className="bg-[#162a4d] p-2 rounded text-center">
              <div className="text-xs font-bold text-[#EEC471]">10K+</div>
              <div className="text-[8px] text-slate-400">Alumni</div>
            </div>
            <div className="bg-[#162a4d] p-2 rounded text-center">
              <div className="text-xs font-bold text-[#EEC471]">Top 10</div>
              <div className="text-[8px] text-slate-400">Rankings</div>
            </div>
          </div>
        </div>
      );

    case "features":
      return (
        <div className="border border-slate-200 p-4 rounded-lg my-2 bg-white shadow-xs">
          <Tag color="blue" className="uppercase font-bold text-[9px] tracking-wider mb-1.5">FEATURES LIST</Tag>
          <h6 className="text-slate-800 text-xs font-bold mt-0.5">{sectionTitle || "Features Header"}</h6>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex gap-1.5 items-center text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded">
              <CheckCircleOutlined className="text-emerald-500 text-[10px]" />
              <span>Weekend Live Interactive Zoom Batches</span>
            </div>
            <div className="flex gap-1.5 items-center text-[10px] text-slate-600 bg-slate-50 p-1.5 rounded">
              <CheckCircleOutlined className="text-emerald-500 text-[10px]" />
              <span>1:1 Professional Mentorship Guides</span>
            </div>
          </div>
        </div>
      );

    case "faqs":
      return (
        <div className="border border-slate-200 p-4 rounded-lg my-2 bg-white shadow-xs">
          <Tag color="purple" className="uppercase font-bold text-[9px] tracking-wider mb-1.5">ACCORDION FAQS</Tag>
          <h6 className="text-slate-800 text-xs font-bold mt-0.5">{sectionTitle || "FAQs list..."}</h6>
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="border border-slate-100 p-2 rounded bg-slate-50/50 flex justify-between items-center text-[10px] text-slate-600">
              <span>What are the eligibility criteria?</span>
              <QuestionCircleOutlined className="text-slate-400" />
            </div>
          </div>
        </div>
      );

    case "reviews":
      return (
        <div className="bg-amber-50/30 border border-amber-200/50 p-4 rounded-lg my-2 shadow-xs">
          <Tag color="warning" className="uppercase font-bold text-[9px] tracking-wider mb-1.5">REVIEWS CAROUSEL</Tag>
          <h6 className="text-slate-800 text-xs font-bold mt-0.5">{sectionTitle || "Alumni Reviews"}</h6>
          <div className="bg-white p-2.5 rounded border border-slate-100 mt-2 shadow-xs">
            <Rate disabled allowHalf defaultValue={5} className="text-amber-400 text-[9px] mb-1 block" />
            <div className="text-[10px] font-bold text-slate-800">"Excellent executive course!"</div>
            <p className="text-[9px] text-slate-500 mt-0.5 italic">" Mentorship completely shifted my path."</p>
          </div>
        </div>
      );

    case "rich_text":
      return (
        <div className="border border-slate-200 p-4 rounded-lg my-2 bg-white shadow-xs">
          <Tag color="default" className="uppercase font-bold text-[9px] tracking-wider mb-1.5">RICH BODY TEXT</Tag>
          {sectionTitle && <h6 className="text-slate-800 text-xs font-bold mt-0.5 mb-1">{sectionTitle}</h6>}
          <div className="whitespace-pre-wrap text-slate-600 text-[10px] leading-relaxed">
            {bodyContent || "Body text content goes here..."}
          </div>
        </div>
      );

    case "custom_html":
      return (
        <div className="border border-slate-200 rounded-lg my-2 overflow-hidden shadow-2xs bg-white">
          <div className="bg-slate-100 px-2.5 py-1 border-b border-slate-200 flex justify-between items-center text-[8px] text-slate-500 font-bold">
            <span>CUSTOM HTML BLOCK</span>
            <CodeOutlined className="text-pink-500 text-[9px]" />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: bodyContent || "<div class='p-3 text-center text-slate-400 text-[9px] italic'>Empty custom HTML block</div>" }}
            className="w-full"
          />
        </div>
      );

    default:
      return null;
  }
}

export default function PageForm({ isUpdateForm = false }) {
  const form = Form.useFormInstance();

  // Watch form fields reactively for live builder updates
  const pageType = Form.useWatch("pageType", form) || "general";
  const title = Form.useWatch("title", form) || "";
  const slug = Form.useWatch("slug", form) || "";
  const sections = Form.useWatch("sections", form) || [];

  // Fetch course options
  const { data: courseOptions = [], isLoading: isCoursesLoading } =
    useGetDynamicOptionsQuery(
      { entity: "course", endPoint: "options" },
      { skip: pageType !== "course" }
    );

  // Fetch university options
  const { data: universityOptions = [], isLoading: isUniversitiesLoading } =
    useGetDynamicOptionsQuery(
      { entity: "university", endPoint: "options" },
      { skip: pageType !== "university" }
    );

  return (
    <Row gutter={24} className="items-stretch min-w-[75vw]">
      {/* ── LEFT COLUMN: INPUTS BUILDER ── */}
      <Col xs={24} lg={13} className="flex flex-col gap-1">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Page Title"
              rules={[{ required: true, message: "Please enter page title" }]}
            >
              <Input placeholder="e.g. Executive MBA Noida Program" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="slug"
              label="URL Slug path"
              rules={[{ required: true, message: "Please enter unique URL slug" }]}
            >
              <Input placeholder="e.g. executive-mba-noida" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="pageType"
              label="Page Type Category"
              initialValue="general"
              rules={[{ required: true, message: "Please select page type category" }]}
            >
              <Select placeholder="Select page category">
                <Select.Option value="general">General / Landing Page</Select.Option>
                <Select.Option value="course">Course Linked Landing Page</Select.Option>
                <Select.Option value="university">University Linked Landing Page</Select.Option>
                <Select.Option value="blog">Blog layout Article Page</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Dynamic Association Fields */}
        {pageType === "course" && (
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="associatedCourse"
                label="Link Course (Parent Data)"
                rules={[{ required: true, message: "Please link associated course" }]}
              >
                <Select
                  placeholder="Select Course to link"
                  loading={isCoursesLoading}
                  showSearch
                  optionFilterProp="children"
                  virtual={false}
                >
                  {Array.isArray(courseOptions) &&
                    courseOptions.map((course) => (
                      <Select.Option key={course._id} value={course._id}>
                        {course.title || course.label}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}

        {pageType === "university" && (
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="associatedUniversity"
                label="Link University (Parent Data)"
                rules={[{ required: true, message: "Please link associated university" }]}
              >
                <Select
                  placeholder="Select University to link"
                  loading={isUniversitiesLoading}
                  showSearch
                  optionFilterProp="children"
                  virtual={false}
                >
                  {Array.isArray(universityOptions) &&
                    universityOptions.map((univ) => (
                      <Select.Option key={univ._id} value={univ._id}>
                        {univ.name || univ.label}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        )}

        {/* Layout Sections Builder (Blocks) */}
        <div className="border-t border-slate-100 pt-3 mt-1 mb-3">
          <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-2">Layout Sections Builder (Blocks)</span>

          <Form.List name="sections">
            {(fields, { add, remove }) => (
              <div className="flex flex-col gap-2 max-h-[40vh] overflow-y-auto pr-1">
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    size="small"
                    title={<span className="text-[10px] font-bold text-slate-500">Section block #{name + 1}</span>}
                    extra={
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined className="text-xs" />}
                        onClick={() => remove(name)}
                        className="p-0 h-auto"
                      />
                    }
                    className="bg-slate-50/30 border-slate-200"
                  >
                    <Row gutter={8}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "sectionType"]}
                          label="Block Template"
                          rules={[{ required: true, message: "Required" }]}
                        >
                          <Select placeholder="Select layout">
                            <Select.Option value="hero">Hero Banner Block</Select.Option>
                            <Select.Option value="stats">Analytics Stats Grid</Select.Option>
                            <Select.Option value="features">Key Features Cards</Select.Option>
                            <Select.Option value="faqs">Collapsible Accordion FAQs</Select.Option>
                            <Select.Option value="reviews">Student Reviews Carousel</Select.Option>
                            <Select.Option value="rich_text">Rich Body Text block</Select.Option>
                            <Select.Option value="custom_html">Custom HTML Code</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "order"]}
                          label="Render Order"
                          initialValue={name}
                        >
                          <InputNumber min={0} className="w-full" placeholder="e.g. 0, 1" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={8}>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "sectionTitle"]}
                          label="Title"
                        >
                          <Input placeholder="Block title..." />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...restField}
                          name={[name, "sectionSubtitle"]}
                          label="Subtitle"
                        >
                          <Input placeholder="Block subtitle..." />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      {...restField}
                      name={[name, "bodyContent"]}
                      label="Content"
                      className="mb-0"
                    >
                      <Input.TextArea rows={2} placeholder="Text / HTML..." />
                    </Form.Item>
                  </Card>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  className="mt-1 border-indigo-400 text-indigo-600 hover:text-indigo-700 hover:border-indigo-600 h-8 flex items-center justify-center"
                >
                  Add Layout Section Block
                </Button>
              </div>
            )}
          </Form.List>
        </div>

        <div className="border-t border-slate-100 pt-3 mt-1">
          <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider block mb-2">SEO configuration (Metadata)</span>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="metaTitle" label="Meta Title Tag">
                <Input placeholder="SEO Meta Page Title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="metaDescription" label="Meta Description Tag">
                <Input placeholder="SEO Meta Search Description" />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <Row gutter={16} className="mt-1">
          <Col span={12}>
            <Form.Item
              name="enabled"
              label="Publish Active"
              valuePropName="checked"
              initialValue={true}
              className="mb-0"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Col>

      {/* ── RIGHT COLUMN: DYNAMIC REAL-TIME CANVAS PREVIEW ── */}
      <Col xs={24} lg={11} className="border-l border-slate-100 pl-6 select-none bg-slate-50/20 rounded-r-xl flex flex-col gap-1">
        <div className="sticky top-0 bg-white/90 backdrop-blur-xs pt-1 pb-3 z-10 border-b border-slate-100">
          <span className="text-slate-800 text-xs font-bold uppercase tracking-wider block">
            📱 Real-Time Live Preview
          </span>
          <span className="text-[10px] text-indigo-600 font-mono block mt-0.5">
            Path: /{slug || "page-slug"}
          </span>
        </div>

        <div className="h-[calc(100vh-140px)] overflow-y-auto pr-2 mt-3 flex flex-col gap-2 pb-16">
          {sections.length > 0 ? (
            [...sections]
              .filter(s => s && s.sectionType)
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((section, idx) => (
                <BlockPreview key={idx} section={section} />
              ))
          ) : (
            <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <div className="text-3xl mb-2">✨</div>
              <div className="text-slate-400 font-bold text-xs">Real-Time Canvas is Empty</div>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                Add section blocks on the left and see layout renders dynamically here as you type!
              </p>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
}
