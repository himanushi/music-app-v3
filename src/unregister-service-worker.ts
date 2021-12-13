import { Capacitor } from "@capacitor/core";

export const unregister = () => {
  if (Capacitor.getPlatform() === "web" && "serviceWorker" in navigator) {
    navigator.serviceWorker.ready.
      then((registration) => {
        registration.unregister();
      }).
      catch((error) => {
        console.error(error.message);
      });
  }
};
