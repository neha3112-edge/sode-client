"use strict";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path = "") {
  if (!path) return "";
  if (path.startsWith("/")) return path;
  return `/${path}`;
}
