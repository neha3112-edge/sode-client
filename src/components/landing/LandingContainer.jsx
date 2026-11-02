"use client";

import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

export function LandingContainer({ children, className = "", style = {}, ...props }) {
  return (
    <Content
      className={`w-full px-3.5 sm:px-4 md:max-w-4xl lg:max-w-6xl 2xl:max-w-7xl min-[1600px]:max-w-[1520px] min-[1920px]:max-w-[1680px] min-[2560px]:max-w-[1880px] mx-auto ${className}`}
      style={{ background: "transparent", ...style }}
      {...props}
    >
      {children}
    </Content>
  );
}

export default LandingContainer;
