import React from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className = "", ...props }) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 md:px-8", className)} {...props}>
      {children}
    </div>
  );
}

export default Container;
