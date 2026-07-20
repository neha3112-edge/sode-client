"use client";

import { Form } from "antd";
import { useCrudContext } from "@/context/crud";
import { useCreateDynamicMutation } from "@/store/redux/dynamic/action";

export default function CreateForm({
  config,
  formElements,
  withUpload = false,
}) {
  const { entity } = config;
  const endPoint = config?.createEndPoint || config?.endPoint || "create";
  const { crudContextAction } = useCrudContext();
  const { panel, readBox } = crudContextAction;
  const [form] = Form.useForm();

  // RTK Query Mutation Hook
  const [createDynamic] = useCreateDynamicMutation();

  const onSubmit = async (fieldsValue) => {
    // File Upload Formatting if applicable
    if (fieldsValue?.file && withUpload) {
      fieldsValue.file =
        fieldsValue.file[0]?.originFileObj || fieldsValue.file;
    }

    try {
      const response = await createDynamic({
        entity,
        endPoint,
        jsonData: fieldsValue,
        withUpload,
      }).unwrap();

      if (response && response.success !== false) {
        if (readBox && typeof readBox.close === "function") readBox.close();
        if (panel && typeof panel.close === "function") panel.close();
        form.resetFields();
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