"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * AutoImageTitle
 * 
 * Automatically ensures 100% SEO compliance for images across the entire website:
 * 1. If an <img> has an `alt` attribute but no `title`, it sets `title = alt`.
 * 2. If an <img> has a `title` attribute but no `alt`, it sets `alt = title`.
 * 3. If neither exists, generates a clean Title-Case string from the image filename.
 * 
 * Uses MutationObserver and capturing load events so lazy-loaded Next.js images,
 * dynamic client transitions, and modal images are instantly patched with zero TBT.
 */
export default function AutoImageTitle() {
  const pathname = usePathname();

  useEffect(() => {
    function processImage(img) {
      if (!img || img.tagName !== "IMG") return;

      const alt = (img.getAttribute("alt") || "").trim();
      const title = (img.getAttribute("title") || "").trim();

      if (!title && alt) {
        img.setAttribute("title", alt);
      } else if (!alt && title) {
        img.setAttribute("alt", title);
      } else if (!alt && !title) {
        const src = img.getAttribute("src") || "";
        const filename = src.split("/").pop()?.split("?")[0]?.replace(/\.[^.]+$/, "");
        if (filename) {
          const clean = filename
            .replace(/[-_]+/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
            .trim();
          if (clean) {
            img.setAttribute("alt", clean);
            img.setAttribute("title", clean);
          }
        }
      }
    }

    function syncAllImages(root = document) {
      if (!root) return;
      if (root.tagName === "IMG") {
        processImage(root);
        return;
      }
      if (typeof root.querySelectorAll === "function") {
        const imgs = root.querySelectorAll("img");
        for (let i = 0; i < imgs.length; i++) {
          processImage(imgs[i]);
        }
      }
    }

    // Run initial pass during browser idle time (0ms blocking time)
    const runIdle = typeof window !== "undefined" && "requestIdleCallback" in window
      ? window.requestIdleCallback
      : (cb) => setTimeout(cb, 20);

    const idleId = runIdle(() => {
      syncAllImages(document.body);
    });

    // Fast-capture for dynamically loaded images
    const handleLoad = (e) => {
      if (e.target && e.target.tagName === "IMG") {
        processImage(e.target);
      }
    };
    document.addEventListener("load", handleLoad, true);

    // Throttled MutationObserver for client-side DOM insertions
    let timer = null;
    const observer = new MutationObserver((mutations) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        for (let i = 0; i < mutations.length; i++) {
          const mutation = mutations[i];
          if (mutation.type === "childList") {
            for (let j = 0; j < mutation.addedNodes.length; j++) {
              const node = mutation.addedNodes[j];
              if (node.nodeType === Node.ELEMENT_NODE) {
                syncAllImages(node);
              }
            }
          } else if (mutation.type === "attributes" && mutation.target?.tagName === "IMG") {
            processImage(mutation.target);
          }
        }
      }, 60);
    });

    // Only observe src and alt so setting title never re-triggers mutations
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["alt", "src"],
    });

    return () => {
      if (timer) clearTimeout(timer);
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      observer.disconnect();
      document.removeEventListener("load", handleLoad, true);
    };
  }, [pathname]);

  return null;
}
