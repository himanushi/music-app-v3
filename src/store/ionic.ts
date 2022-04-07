import { Storage } from "@capacitor/storage";

export const store = {
  async get (key: string) {
    const ret = await Storage.get({ key });
    if (ret.value) {
      return JSON.parse(ret.value).value;
    }
  },

  async set (key: string, value: any) {
    await Storage.set({
      key,
      value: JSON.stringify({ value }),
    });
  },
};
