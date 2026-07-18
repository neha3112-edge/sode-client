"use client";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function PageHeader({
  title,
  description,
  buttonText,
  onButtonClick,
  icon,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 gap-4 px-4 py-1.5">
      <div className="flex items-center gap-2">
        {icon && (
          <div className="text-xl text-gray-600 flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <div className="text-base font-medium text-gray-700 tracking-tight">
            {title}
          </div>
          {description && (
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div>
        {buttonText && (
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={onButtonClick}
            className="rounded-lg text-sm font-medium transition-all shadow-sm flex items-center text-gray-700"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
