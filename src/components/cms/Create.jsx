"use client";

import { useEffect } from "react";
import { Form } from "antd";
import { useCrudContext } from "@/context/crud";
import { useCreateDynamicMutation } from "@/store/redux/dynamic/action";
import { serializeCourseForApi } from "@/lib/course.mapper";

export default function CreateForm({
  config,
  formElements,
  withUpload = false,
}) {
  const { entity } = config;
  const endPoint = config?.createEndPoint || config?.endPoint || "create";
  const { state, crudContextAction } = useCrudContext();
  const { isPanelClose, isBoxCollapsed } = state || {};
  const { panel, readBox } = crudContextAction;
  const [form] = Form.useForm();

  // Reset form whenever Create panel is opened
  useEffect(() => {
    if (!isPanelClose && !isBoxCollapsed) {
      form.resetFields();
    }
  }, [isPanelClose, isBoxCollapsed, form]);

  // RTK Query Mutation Hook
  const [createDynamic] = useCreateDynamicMutation();

  const onSubmit = async (fieldsValue) => {
    // File Upload Formatting if applicable
    if (fieldsValue?.file && withUpload) {
      fieldsValue.file =
        fieldsValue.file[0]?.originFileObj || fieldsValue.file;
    }

    let transformedValues = { ...fieldsValue };
    if (entity === "course" || entity === "courses") {
      transformedValues = serializeCourseForApi(transformedValues);
    }

    try {
      const response = await createDynamic({
        entity,
        endPoint,
        jsonData: transformedValues,
        withUpload,
      }).unwrap();

      if (response && response.success !== false) {
        form.resetFields();
        if (readBox && typeof readBox.close === "function") readBox.close();
        if (panel && typeof panel.close === "function") panel.close();
      }
    } catch (error) {
      console.error("Create operation failed:", error);
    }
  };

  return (
    <Form id="cms-drawer-form" form={form} layout="vertical" onFinish={onSubmit}>
      {formElements}
    </Form>
  );
}