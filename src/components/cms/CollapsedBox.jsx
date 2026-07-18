"use client";

import React from "react";
import { Button } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

const CollapseBoxButton = ({ onChange, title, isCollapsed }) => {
  return (
    <Button
      onClick={onChange}
      type="primary"
      ghost
      icon={isCollapsed ? <DownOutlined /> : <UpOutlined />}
      style={{
        width: "100%",
        marginBottom: "15px",
        borderRadius: "8px",
        fontWeight: "600",
      }}
    >
      {title}
    </Button>
  );
};

const TopCollapseBox = ({ isOpen, children }) => {
  return isOpen ? (
    <div style={{ marginBottom: "10px" }} className="animate-fadeIn">
      {children}
    </div>
  ) : null;
};

const BottomCollapseBox = ({ isOpen, children }) => {
  return !isOpen ? (
    <div style={{ marginBottom: "10px" }} className="animate-fadeIn">
      {children}
    </div>
  ) : null;
};

export default function CollapseBox({
  topContent,
  bottomContent,
  buttonTitle,
  isCollapsed,
  onCollapse,
}) {
  return (
    <>
      {/* ⚡ FIXED: बटन को रेंडर किया ताकि फ़ॉर्म ओपन/क्लोज़ एक्शन काम करे */}
      <CollapseBoxButton
        title={buttonTitle}
        onChange={onCollapse}
        isCollapsed={isCollapsed}
      />
      <TopCollapseBox isOpen={isCollapsed}>{topContent}</TopCollapseBox>
      <BottomCollapseBox isOpen={isCollapsed}>
        {bottomContent}
      </BottomCollapseBox>
    </>
  );
}
