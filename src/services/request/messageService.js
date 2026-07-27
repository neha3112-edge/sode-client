/**
 * messageService.js
 * 
 * Global singleton that holds the context-aware Antd message/notification/modal
 * instances injected by AntdMessageBridge (which lives inside <App> context).
 * 
 * Usage in service files (success.js, error.js, etc.):
 *   import { messageService } from "@/services/request/messageService";
 *   messageService.message.success("Done!");
 */

import { message as staticMessage, notification as staticNotification } from "antd";

const messageService = {
  _message: null,
  _notification: null,
  _modal: null,

  setMessage(instance) {
    this._message = instance;
  },
  setNotification(instance) {
    this._notification = instance;
  },
  setModal(instance) {
    this._modal = instance;
  },

  get message() {
    // Use context-aware instance if available, fallback to static
    return this._message || staticMessage;
  },
  get notification() {
    return this._notification || staticNotification;
  },
  get modal() {
    return this._modal;
  },
};

export { messageService };
