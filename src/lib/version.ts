import axios from "axios";
import { originUrl } from "./variable";
import { store } from "~/store/ionic";

const key = "jsFileVersion";

export const reset = () => {
  localStorage.removeItem("jukebox");
  window.location.reload();
};

export const currentVersion = () => store.get<string>(key);

export const updateVersionForWeb = async () => {
  const result = await axios.get(
    `${window.location.origin}/version.txt?time=${new Date().getTime()}`
  );
  if (!result.data) {
    return;
  }
  store.set(key, result.data);
};

export const needsUpdateForIos = async () => {
  if (!originUrl) {
    return false;
  }

  const result = await axios.get(
    `${originUrl}/version.txt?time=${new Date().getTime()}`
  );
  if (!result.data) {
    return false;
  }

  const localResult = await axios.get(
    `/version.txt?time=${new Date().getTime()}`
  );
  if (!localResult.data) {
    return false;
  }

  if (result.data.toString() !== localResult.data.toString()) {
    return true;
  }

  return false;
};
