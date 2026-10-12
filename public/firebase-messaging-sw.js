importScripts("https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDWswHF0Oukc6LNXllkwmx2PWg3dKn62-8",
  authDomain: "erp-sode.firebaseapp.com",
  projectId: "erp-sode",
  storageBucket: "erp-sode.appspot.com",
  messagingSenderId: "521894701394",
  appId: "1:521894701394:web:b51774c5764babec77328b",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("🔕 [FCM SW] Background notification received:", payload);
  const notificationTitle =
    payload.notification?.title || payload.data?.title || "New Education Update";
  const notificationOptions = {
    body:
      payload.notification?.body ||
      payload.data?.body ||
      "New article published on Distance Education School.",
    icon: payload.notification?.icon || "/android-chrome-192x192.png",
    image: payload.notification?.image || payload.data?.imageUrl || undefined,
    data: {
      url: payload.data?.url || (payload.fcmOptions && payload.fcmOptions.link) || "/blogs",
      ...payload.data,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  const urlToOpen = event.notification.data?.url || "/blogs";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url && "focus" in client) {
          if (typeof client.navigate === "function") {
            client.navigate(urlToOpen);
          }
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
