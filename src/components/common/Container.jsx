"use client";

import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

export function Container({ children, className = "", style = {}, ...props }) {
  return (
    <Content
      className={`max-w-90 md:max-w-4xl lg:max-w-265 2xl:max-w-275 mx-auto ${className}`}
      style={{ background: "transparent", ...style }}
      {...props}
    >
      {children}
    </Content>
  );
}

export default Container;
