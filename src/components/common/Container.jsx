"use client";

import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

export function Container({ children, className = "", style = {}, ...props }) {
  return (
    <Content
      className={`max-w-7xl mx-auto px-4 md:px-8 w-full ${className}`}
      style={{ background: "transparent", ...style }}
      {...props}
    >
      {children}
    </Content>
  );
}

export default Container;
