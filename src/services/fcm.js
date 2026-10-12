"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { request } from "@/services/request";

const firebaseConfig = {
  apiKey: "AIzaSyDWswHF0Oukc6LNXllkwmx2PWg3dKn62-8",
  authDomain: "erp-sode.firebaseapp.com",
  projectId: "erp-sode",
  storageBucket: "erp-sode.appspot.com",
  messagingSenderId: "521894701394",
  appId: "1:521894701394:web:b51774c5764babec77328b",
};

const VAPID_KEY =
  "BLr2f2Ga-IzYHr4lyP1wSwJS5KCITS0f6OnOCFBPC0Chp9dlTXJuqgik8ZGE8b67w3tewNHBPFaX4vyLR7ysXJ8";

function getFirebaseMessaging() {
  if (typeof window === "undefined") return null;
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  return getMessaging(app);
}

/**
 * Request notification permission and obtain device FCM token
 */
export async function requestFcmToken() {
  try {
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.warn("⚠️ Push notifications are not supported in this browser.");
      return { token: null, status: "unsupported" };
    }

    const supported = await isSupported().catch(() => false);
    if (!supported) {
      console.warn("⚠️ Firebase Messaging is not supported in this browser environment.");
      return { token: null, status: "unsupported" };
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("⚠️ Push notification permission denied by user.");
      return { token: null, status: "denied" };
    }

    // Register service worker if not already registered
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    await navigator.serviceWorker.ready;

    const messaging = getFirebaseMessaging();
    if (!messaging) {
      return { token: null, status: "unsupported" };
    }

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      return { token, status: "granted" };
    } else {
      return { token: null, status: "no_token" };
    }
  } catch (error) {
    console.error("❌ Error obtaining FCM token:", error);
    return { token: null, status: "error", error: error.message };
  }
}

/**
 * Subscribe user device token to backend and Firebase topic 'blogs'
 */
export async function subscribeToBlogPushNotifications(email = "") {
  try {
    const { token, status, error } = await requestFcmToken();

    if (status === "denied") {
      return {
        success: false,
        message: "Notification permission was blocked. Please allow notifications in your browser settings.",
      };
    }

    if (status === "unsupported") {
      return {
        success: false,
        message: "Push notifications are not supported on this browser.",
      };
    }

    if (!token) {
      return {
        success: false,
        message: error || "Unable to generate push notification token.",
      };
    }

    // Send token to backend API to store in DB and subscribe to Firebase topic 'blogs'
    const response = await request.dynamicPost({
      entity: "blogs",
      endPoint: "v1/subscribe-notifications",
      body: {
        token,
        email: email ? email.trim() : undefined,
        topic: "blogs",
      },
    });

    if (typeof window !== "undefined") {
      localStorage.setItem("blog_fcm_subscribed", "true");
      localStorage.setItem("blog_fcm_token", token);
    }

    return {
      success: true,
      token,
      message: response?.message || "Subscribed successfully to blog updates!",
    };
  } catch (err) {
    console.error("❌ Subscription error:", err);
    return {
      success: false,
      message: err?.message || "Something went wrong while subscribing. Please try again.",
    };
  }
}

/**
 * Check if the current browser already has notification permission granted & subscribed
 */
export function isBlogSubscribed() {
  if (typeof window === "undefined") return false;
  return (
    Notification?.permission === "granted" &&
    localStorage.getItem("blog_fcm_subscribed") === "true"
  );
}
