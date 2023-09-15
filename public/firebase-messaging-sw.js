importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCkzabtEFqa78Zu1jn8pa4HKC7Y6pIuY0c",
  authDomain: "mercadama-32ad1.firebaseapp.com",
  projectId: "mercadama-32ad1",
  storageBucket: "mercadama-32ad1.appspot.com",
  messagingSenderId: "781814545449",
  appId: "1:781814545449:web:1273b7a5910bda83217038",
  measurementId: "G-HE97VDMY7Q"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
