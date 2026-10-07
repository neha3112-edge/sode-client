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

const DEFAULT_TYPOGRAPHY_CLASSES =
  "w-full font-sans antialiased leading-relaxed [&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:text-[#0D3B66] [&_h1]:my-3 [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#0D3B66] [&_h2]:my-2.5 [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#0D3B66] [&_h3]:my-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:my-1.5 [&_p]:my-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-2 [&_li]:leading-relaxed [&_strong]:font-bold [&_strong]:text-gray-900 [&_a]:text-blue-600 [&_a]:underline [&_a]:font-semibold hover:[&_a]:text-blue-800";

/**
 * SafeHtmlRenderer
 * Global HTML parser and renderer that converts raw HTML strings or rich content
 * into safe, interactive Next.js components (optimizing links, images, tables, etc.).
 *
 * Props:
 * - html / content / children: The HTML or text content to render.
 * - className: Custom Tailwind classes for the wrapper element.
 * - as: Element tag to render as ('div', 'p', 'span', 'article', etc.).
 * - inline: If true, defaults wrapper tag to 'span' instead of 'div'.
 * - linkClassName: Custom styling for nested <a> tags.
 */
export default function SafeHtmlRenderer({
  html,
  content,
  children,
  className = "",
  as = null,
  inline = false,
  linkClassName = "",
  onClick,
  ...rest
}) {
  const router = useRouter();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const raw = html ?? content ?? (typeof children === "string" ? children : null);

  if (raw === null || raw === undefined || raw === "") {
    return null;
  }

  const rawString = String(raw);
  const Tag = as || (inline ? "span" : "div");
  const finalWrapperClass = className || DEFAULT_TYPOGRAPHY_CLASSES;
  const isCustomStyled = Boolean(className);

  // Fast-path: If string does not contain any HTML tags, render it directly
  const hasHtmlTags = /<[a-z][\s\S]*>/i.test(rawString);
  if (!hasHtmlTags) {
    return (
      <Tag className={finalWrapperClass} onClick={onClick} {...rest}>
        {rawString}
      </Tag>
    );
  }

  // SSR Fallback (Server Side Rendering): render HTML string safely
  if (!mounted) {
    return (
      <Tag
        dangerouslySetInnerHTML={{ __html: rawString }}
        className={finalWrapperClass}
        onClick={onClick}
        {...rest}
      />
    );
  }

  // Client Side: Parse HTML string using DOMParser and convert nodes to interactive React components
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawString, "text/html");

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

    // Handle React requirements for select options
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

    // Filter whitespace-only text nodes for table elements to prevent hydration warnings
    const tableElements = ["table", "thead", "tbody", "tfoot", "tr", "colgroup", "select"];
    const elementChildren = rawChildren.filter((child) => {
      if (child === null || child === undefined) return false;
      if (tableElements.includes(tagName) && typeof child === "string" && !child.trim()) {
        return false;
      }
      return true;
    });

    const key = `node-${keyIndex}`;

    // 🎯 RENDER NATIVE <a> TAG WITH LINK ROUTING AND ADAPTIVE STYLING
    if (tagName === "a") {
      const { href, className: aClass, ...restAttr } = attributes;
      const targetHref = href || "#";
      const isRelative = targetHref.startsWith("/") && !targetHref.startsWith("//");

      let finalLinkClass = aClass || "";
      if (linkClassName) {
        finalLinkClass = `${finalLinkClass} ${linkClassName}`.trim();
      } else if (!finalLinkClass) {
        const hasContainerLinkClass = className && (className.includes("[&_a]:") || className.includes("text-"));
        if (hasContainerLinkClass) {
          finalLinkClass = "underline font-medium hover:opacity-80 transition-opacity cursor-pointer inline";
        } else {
          finalLinkClass = "text-blue-600 hover:text-blue-800 underline font-semibold transition-colors cursor-pointer inline";
        }
      }

      return (
        <a
          key={key}
          href={targetHref}
          target={!isRelative && targetHref.startsWith("http") ? "_blank" : undefined}
          rel={!isRelative && targetHref.startsWith("http") ? "noopener noreferrer" : undefined}
          className={finalLinkClass}
          {...restAttr}
        >
          {elementChildren}
        </a>
      );
    }

    // Default typography styles if no custom class provided
    if (tagName === "h1" && !attributes.className) {
      attributes.className = isCustomStyled ? "text-2xl sm:text-3xl font-extrabold my-3 leading-tight" : "text-2xl sm:text-3xl font-extrabold text-[#0D3B66] my-3 leading-tight";
    } else if (tagName === "h2" && !attributes.className) {
      attributes.className = isCustomStyled ? "text-xl sm:text-2xl font-bold my-2.5 leading-snug" : "text-xl sm:text-2xl font-bold text-[#0D3B66] my-2.5 leading-snug";
    } else if (tagName === "h3" && !attributes.className) {
      attributes.className = isCustomStyled ? "text-lg sm:text-xl font-bold my-2 leading-snug" : "text-lg sm:text-xl font-bold text-[#0D3B66] my-2 leading-snug";
    } else if (tagName === "h4" && !attributes.className) {
      attributes.className = isCustomStyled ? "text-base sm:text-lg font-semibold my-1.5" : "text-base sm:text-lg font-semibold text-gray-800 my-1.5";
    } else if (tagName === "p" && !attributes.className) {
      attributes.className = isCustomStyled ? "my-1 leading-relaxed" : "my-1.5 leading-relaxed text-gray-700";
    } else if (tagName === "ul" && !attributes.className) {
      attributes.className = isCustomStyled ? "list-disc pl-5 my-2 space-y-1" : "list-disc pl-5 my-2 space-y-1 text-gray-700";
    } else if (tagName === "ol" && !attributes.className) {
      attributes.className = isCustomStyled ? "list-decimal pl-5 my-2 space-y-1" : "list-decimal pl-5 my-2 space-y-1 text-gray-700";
    } else if (tagName === "li" && !attributes.className) {
      attributes.className = "leading-relaxed";
    } else if ((tagName === "strong" || tagName === "b") && !attributes.className) {
      attributes.className = isCustomStyled ? "font-bold" : "font-bold text-gray-900";
    }

    // 🎯 REPLACE <img> WITH OPTIMIZED NEXT.JS <Image>
    if (tagName === "img") {
      const { src, alt, width, height, style, ...restImgAttr } = attributes;
      if (!src) return null;

      const finalSrc = getAssetPath(src);
      const w = parseInt(width, 10);
      const h = parseInt(height, 10);

      // If dimensions are missing, use <span> wrapper so it's 100% valid HTML
      if (isNaN(w) || isNaN(h)) {
        return (
          <span
            key={key}
            className="block relative w-full h-72 sm:h-96 my-4 overflow-hidden rounded-xl"
            style={style}
          >
            <Image
              src={finalSrc}
              alt={alt || "Image"}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              {...restImgAttr}
            />
          </span>
        );
      }

      return (
        <Image
          key={key}
          src={finalSrc}
          alt={alt || "Image"}
          width={w}
          height={h}
          style={{ maxWidth: "100%", height: "auto", ...style }}
          className={attributes.className || "rounded-xl my-3"}
          {...restImgAttr}
        />
      );
    }

    // Recursive creation of elements
    return React.createElement(
      tagName,
      { key, ...attributes },
      elementChildren.length > 0 ? elementChildren : null
    );
  };

  // Map parsed children of document body element
  const rootElements = Array.from(doc.body.childNodes)
    .map((node, i) => renderNode(node, i))
    .filter((el) => el !== null && el !== undefined);

  // Client-side local link interception to bypass full page reloads and use Next.js single-page routing
  const handleContainerClick = (e) => {
    if (onClick) onClick(e);

    const anchor = e.target.closest("a");
    if (anchor && !e.defaultPrevented && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      const href = anchor.getAttribute("href");
      if (href) {
        // Intercept local relative slugs
        if (href.startsWith("/") && !href.startsWith("//")) {
          e.preventDefault();
          router.push(href);
        } else if (typeof window !== "undefined") {
          // Intercept same-origin absolute URLs
          try {
            const urlObj = new URL(href, window.location.origin);
            if (urlObj.origin === window.location.origin && !href.startsWith("#")) {
              e.preventDefault();
              router.push(urlObj.pathname + urlObj.search + urlObj.hash);
            }
          } catch {
            // Ignore invalid URLs
          }
        }
      }
    }
  };

  return (
    <Tag onClick={handleContainerClick} className={finalWrapperClass} {...rest}>
      {rootElements}
    </Tag>
  );
}
