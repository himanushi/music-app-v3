// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import { PluginListenerHandle } from "@capacitor/core";
import {
  CapacitorAppleMusic,
  PlaybackStates,
} from "capacitor-plugin-applemusic";
import { Machine as machine, assign, sendParent, State } from "xstate";
import { store } from "~/store/track-info";

export type AppleMusicPlayerContext = {
  idAndTitleAndPreviewUrl?: string;
  seek: number;
};

export const separateString = "@!@!@!@!@!";

export type AppleMusicPlayerStateSchema = {
  states: {
    idle: {};
    loading: {
      states: {
        stopping: {};
        queueing: {};
        fetching: {};
      };
    };
    waiting: {};
    playing: {};
    paused: {};
    stopped: {};
    finished: {};
  };
};

const setEvents = (callback: any, events: string[][]) => {
  const didChange: (state: { result: PlaybackStates }) => any = (state) => {
    events.forEach((event) => {
      if (state.result === event[0]) {
        callback(event[1]);
      }
    });
  };

  let cleaner: PluginListenerHandle;
  (async () => {
    cleaner = await CapacitorAppleMusic.addListener(
      "playbackStateDidChange",
      didChange
    );
  })();

  return () => {
    if (cleaner) {
      cleaner.remove();
    }
  };
};

export type AppleMusicPlayerStateEvent =
  | { type: "SET_DATA"; data: string }
  | { type: "CHANGE_SEEK"; seek: number }
  | { type: "LOAD" }
  | { type: "WAITING" }
  | { type: "PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "FINISHED" }
  | { type: "TICK" }
  | { type: "TACK"; seek: number };

export const appleMusicPlayerId = "apple-music-player";

export const AppleMusicPlayerMachine = machine<
  AppleMusicPlayerContext,
  AppleMusicPlayerStateSchema,
  AppleMusicPlayerStateEvent
>(
  {
    context: { seek: 0 },

    id: appleMusicPlayerId,

    initial: "idle",

    on: {
      CHANGE_SEEK: { actions: ["changeSeek"] },

      LOAD: { target: "loading" },

      PLAY: {
        actions: ["play"],
        target: "playing",
      },

      PLAYING: "playing",

      SET_DATA: { actions: ["setData"] },

      STOP: {
        actions: ["stop"],
        target: "stopped",
      },

      TICK: {
        actions: [
          sendParent(({ seek }) => ({
            seek,
            type: "SET_SEEK",
          })),
        ],
      },
    },

    states: {
      idle: {},

      loading: {
        initial: "stopping",

        states: {
          stopping: {
            invoke: {
              src: async () => {
                await CapacitorAppleMusic.setVolume({ volume: 0.3 });
              },

              onDone: "queueing",
            },
          },

          queueing: {
            invoke: {
              src: async (context) => {
                const { idAndTitleAndPreviewUrl } = context;

                if (idAndTitleAndPreviewUrl) {
                  // id だけで track を取得するとロケーションバグ(英語名になる)が起こることがあるため title も送信する
                  const [id, title, previewUrl] =
                    idAndTitleAndPreviewUrl.split(separateString);

                  // すでにライブラリIDがわかっている場合は直接再生する
                  const info = await store.get(id);

                  let result: {
                    result: boolean;
                    librarySongId?: string | undefined;
                    albumTitle?: string | undefined;
                  };

                  if (info) {
                    result = await CapacitorAppleMusic.setSong({
                      songId: id,
                      songTitle: title,
                      previewUrl,
                      librarySongId: info.librarySongId,
                      albumTitle: info.albumTitle,
                      forcePreview: !info.purchased,
                    });
                  } else {
                    result = await CapacitorAppleMusic.setSong({
                      songId: id,
                      songTitle: title,
                      previewUrl,
                    });
                  }

                  if (result.librarySongId) {
                    // iTunes のライブラリID検索結果を保持する
                    await store.set(id, {
                      librarySongId: result.librarySongId,
                      albumTitle: result.albumTitle,
                      songTitle: title,
                      purchased: true,
                    });
                  }

                  if (!result.result) {
                    throw new Error("play error!!");
                  }
                }
              },

              onDone: "fetching",
              onError: `#${appleMusicPlayerId}.finished`,
            },
          },

          fetching: {
            entry: ["play"],
            on: { PLAYING: `#${appleMusicPlayerId}.playing` },
            invoke: {
              src: () => (callback) => setEvents(callback, [["playing", "PLAYING"]]),
            },
          },
        },
      },

      waiting: {
        entry: [sendParent("LOADING")],

        invoke: {
          src: () => (callback) => setEvents(callback, [["playing", "PLAYING"]]),
        },

        on: { PLAYING: "playing" },
      },

      paused: {
        entry: [sendParent("PAUSED")],
        invoke: {
          src: () => (callback) => setEvents(callback, [
            ["ended", "FINISHED"],
            ["completed", "FINISHED"],
            ["playing", "PLAYING"],
            ["loading", "WAITING"],
          ]),
        },

        on: {
          FINISHED: "finished",
          WAITING: "waiting",
        },
      },

      playing: {
        invoke: [
          {
            id: "seekTimer",
            src: () => (callback) => {
              const interval = setInterval(async () => {
                const seek = (await CapacitorAppleMusic.currentPlaybackTime()).
                  result;
                callback({
                  type: "TACK",
                  seek,
                });
              }, 1000);

              return () => {
                clearInterval(interval);
              };
            },
          },
          {
            src: () => (callback) => setEvents(callback, [
              ["paused", "PAUSED"],
              ["waiting", "WAITING"],
              ["completed", "FINISHED"],
            ]),
          },
        ],

        entry: [sendParent("PLAYING")],

        on: {
          PAUSE: { actions: ["pause"] },
          PAUSED: "paused",
          WAITING: "waiting",
          FINISHED: "finished",
          TACK: { actions: ["tack"] },
        },
      },

      stopped: { entry: [sendParent("STOPPED")] },

      finished: { entry: [sendParent("FINISHED")] },
    },
  },
  {
    actions: {
      changeSeek: (_, event) => {
        if ("seek" in event) {
          CapacitorAppleMusic.seekToTime({ playbackTime: event.seek / 1000 });
        }
      },

      pause: () => {
        CapacitorAppleMusic.pause();
      },

      play: () => {
        CapacitorAppleMusic.play();
      },

      setData: assign({
        idAndTitleAndPreviewUrl: (_, event) => "data" in event ? event.data : undefined,
      }),

      stop: () => {
        CapacitorAppleMusic.stop();
      },

      tack: assign({
        seek: (_, event) => {
          if ("seek" in event) {
            return Math.floor(event.seek * 1000);
          }

          return 0;
        },
      }),
    },
  }
);

export type AppleMusicPlayerState = State<
  AppleMusicPlayerContext,
  AppleMusicPlayerStateEvent,
  AppleMusicPlayerStateSchema,
  {
    value: any;
    context: AppleMusicPlayerContext;
  }
>;
// result = await MusicKit.getInstance().api.music("v1/me/library/search", {term:"Where Angel Fear To Tread", types: ["library-songs"]})
