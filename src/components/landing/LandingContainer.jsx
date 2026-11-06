"use client";

import React from "react";
import { Container } from "@/components/common/Container";

export function LandingContainer({ children, className = "", style = {}, ...props }) {
  return (
    <Container className={className} style={style} {...props}>
      {children}
    </Container>
  );
}

export default LandingContainer;
