"use client";

import { App } from "antd";
import { useEffect } from "react";
import { messageService } from "@/services/request/messageService";

/**
 * AntdMessageBridge — Mounts inside <App> context to inject
 * the context-aware `message` instance into the static messageService.
 * This resolves the "Static function can not consume context" warning.
 */
export default function AntdMessageBridge() {
  const { message, notification, modal } = App.useApp();

  useEffect(() => {
    messageService.setMessage(message);
    messageService.setNotification(notification);
    messageService.setModal(modal);
  }, [message, notification, modal]);

  return null;
}
