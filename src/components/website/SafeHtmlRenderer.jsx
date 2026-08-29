"use client";

import React, { useSyncExternalStore } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAssetPath } from "@/lib/utils";

// Helper function to parse raw CSS style strings into React style objects
function parseStyleString(styleStr) {
  if (!styleStr) return {};
  const styleObj = {};
  styleStr.split(";").forEach((pair) => {
    const trimmed = pair.trim();
    if (!trimmed) return;
    const splitIndex = trimmed.indexOf(":");
    if (splitIndex === -1) return;
    const key = trimmed.substring(0, splitIndex).trim();
    const value = trimmed.substring(splitIndex + 1).trim();
    if (key && value) {
      // Convert kebab-case key (e.g. background-color) to camelCase (e.g. backgroundColor)
      const camelKey = key.replace(/-./g, (x) => x[1].toUpperCase());
      styleObj[camelKey] = value;
    }
  });
  return styleObj;
}

export default function SafeHtmlRenderer({ html }) {
  const router = useRouter();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!html) return null;

  // SSR Fallback (Server Side Rendering): render raw HTML
  if (!mounted) {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="w-full"
      />
    );
  }

  // Client Side: Parse HTML string using DOMParser and convert nodes to Next.js components
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const renderNode = (node, keyIndex = 0) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const tagName = node.tagName.toLowerCase();

    // Map attributes (class -> className, style -> parsed style object, etc.)
    const attributes = {};
    Array.from(node.attributes).forEach((attr) => {
      if (attr.name === "class") {
        attributes.className = attr.value;
      } else if (attr.name === "style") {
        attributes.style = parseStyleString(attr.value);
      } else if (attr.name.startsWith("on")) {
        // Skip event handlers for security
      } else {
        attributes[attr.name] = attr.value;
      }
    });

    // Handle React warnings/requirements for select options
    if (tagName === "select") {
      const selectedOption = Array.from(node.querySelectorAll("option")).find(
        (opt) => opt.hasAttribute("selected")
      );
      if (selectedOption) {
        attributes.defaultValue =
          selectedOption.getAttribute("value") || selectedOption.textContent;
      }
    }

    if (tagName === "option") {
      delete attributes.selected;
    }

    const rawChildren = Array.from(node.childNodes).map((child, i) =>
      renderNode(child, `${keyIndex}-${i}`)
    );

    // 🎯 Filter whitespace-only text nodes for table elements to prevent Next.js hydration errors
    const tableElements = ["table", "thead", "tbody", "tfoot", "tr", "colgroup", "select"];
    const children = rawChildren.filter((child) => {
      if (child === null || child === undefined) return false;
      if (tableElements.includes(tagName) && typeof child === "string" && !child.trim()) {
        return false;
      }
      return true;
    });

    const key = `node-${keyIndex}`;

    // 🎯 RENDER NATIVE <a> TAG (Interception is handled on the root wrapper via router)
    if (tagName === "a") {
      const { href, ...rest } = attributes;
      const localPath =
        href &&
        (href.startsWith("/") ||
          href.startsWith("http://localhost:3000") ||
          href.startsWith("https://sode.co.in"))
          ? href.replace(/^https?:\/\/[^\/]+/, "")
          : href;

      return (
        <a key={key} href={localPath || "#"} {...rest}>
          {children}
        </a>
      );
    }

    // 🎯 REPLACE <img> WITH OPTIMIZED NEXT.JS <Image>
    if (tagName === "img") {
      const { src, alt, width, height, style, ...rest } = attributes;
      if (!src) return null;

      const finalSrc = getAssetPath(src);
      const w = parseInt(width, 10);
      const h = parseInt(height, 10);

      // If dimensions are missing, use <span> wrapper (NOT <div>) so it's 100% valid inside <p>
      if (isNaN(w) || isNaN(h)) {
        return (
          <span
            key={key}
            className="block relative w-full h-72 sm:h-96 my-4 overflow-hidden rounded-xl"
            style={style}
          >
            <Image
              src={finalSrc}
              alt={alt || "Blog image"}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              {...rest}
            />
          </span>
        );
      }

      return (
        <Image
          key={key}
          src={finalSrc}
          alt={alt || "Blog image"}
          width={w}
          height={h}
          style={{ maxWidth: "100%", height: "auto", ...style }}
          className={attributes.className || "rounded-xl my-3"}
          {...rest}
        />
      );
    }

    // Recursive creation of elements (div, p, span, h1-h6, list structures, etc.)
    return React.createElement(
      tagName,
      { key, ...attributes },
      children.length > 0 ? children : null
    );
  };

  // Map parsed children of document body element
  const rootElements = Array.from(doc.body.childNodes)
    .map((node, i) => renderNode(node, i))
    .filter((el) => el !== null && el !== undefined);

  // Client-side local link interception to bypass full page reloads and use Next.js single-page routing
  const handleContainerClick = (e) => {
    const anchor = e.target.closest("a");
    if (anchor) {
      const href = anchor.getAttribute("href");
      // Intercept local relative slugs or SODE domains for soft routing
      if (href && href.startsWith("/")) {
        e.preventDefault();
        router.push(href);
      }
    }
  };

  return (
    <div onClick={handleContainerClick} className="w-full font-sans antialiased">
      {rootElements}
    </div>
  );
}
