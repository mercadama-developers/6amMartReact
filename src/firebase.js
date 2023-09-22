import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCkzabtEFqa78Zu1jn8pa4HKC7Y6pIuY0c",
  authDomain: "mercadama-32ad1.firebaseapp.com",
  databaseURL: "https://mercadama-32ad1-default-rtdb.firebaseio.com",
  projectId: "mercadama-32ad1",
  storageBucket: "mercadama-32ad1.appspot.com",
  messagingSenderId: "781814545449",
  appId: "1:781814545449:web:1273b7a5910bda83217038",
  measurementId: "G-HE97VDMY7Q"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey: "BElAeiWivP8GitJ-0PLkKE0zaRwczQ7af82IGOsm8cJSQobS9Vy6rdv6Yprcheu8LdgK47Qnye_NGwx18sr_1Hw",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
