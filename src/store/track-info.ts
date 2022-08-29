import { Storage } from "@capacitor/storage";

const key = "trackInfo";

type Info = {
  librarySongId?: string;
  songTitle?: string;
  albumTitle?: string;
};

type TrackInfo = {
  [key in string]: Info;
};

export const store = {
  async get (id: string) {
    const ret = await Storage.get({ key }) ?? "{}";
    if (ret.value) {
      const json = JSON.parse(ret.value) as TrackInfo;
      return json[id];
    }
  },

  async set (id: string, value: Info) {
    let json = {} as TrackInfo;

    const ret = await Storage.get({ key }) ?? "{}";
    if (ret.value) {
      json = JSON.parse(ret.value) as TrackInfo;
    }

    json[id] = {
      albumTitle: value.albumTitle || json[id]?.albumTitle,
      librarySongId: value.librarySongId || json[id]?.librarySongId,
      songTitle: value.songTitle || json[id]?.songTitle,
    };

    await Storage.set({
      key,
      value: JSON.stringify(json),
    });
  },
};
