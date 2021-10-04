// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import { PluginListenerHandle } from "@capacitor/core";
import {
  CapacitorAppleMusic,
  PlaybackStates
} from "capacitor-plugin-applemusic";
import {
  Machine as machine, assign, sendParent, State
} from "xstate";

export type PreviewPlayerContext = {
  url?: string;
  seek: number;
};

export type PreviewPlayerStateSchema = {
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

  // eslint-disable-next-line no-unused-vars
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

export type PreviewPlayerStateEvent =
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

export const previewPlayerId = "preview-player";

export const PreviewPlayerMachine = machine<
  PreviewPlayerContext,
  PreviewPlayerStateSchema,
  PreviewPlayerStateEvent
>(
  {
    context: { seek: 0 },

    id: previewPlayerId,

    initial: "idle",

    on: {
      CHANGE_SEEK: { actions: ["changeSeek"] },

      LOAD: { target: "loading" },

      PLAY: {
        actions: ["play"],
        target: "playing"
      },

      PLAYING: "playing",

      SET_DATA: { actions: ["setData"] },

      STOP: {
        actions: ["stop"],
        target: "stopped"
      },

      TICK: { actions: [
        sendParent(({ seek }) => ({
          seek,
          type: "SET_SEEK"
        }))
      ] }
    },

    states: {
      idle: {},

      loading: {
        initial: "stopping",

        states: {
          stopping: { invoke: {
            src: async () => {

              await CapacitorAppleMusic.setVolume({ volume: 0.3 });

            },

            onDone: "queueing"
          } },

          queueing: { invoke: {
            src: async (context) => {

              const { url } = context;

              if (url) {

                await CapacitorAppleMusic.setSong({
                  songId: "",
                  previewUrl: url
                });

              }

            },

            onDone: "fetching"
          } },

          fetching: {
            entry: ["play"],
            on: { PLAYING: `#${previewPlayerId}.playing` },
            invoke: { src: () => (callback) => setEvents(callback, [
              [
                "playing",
                "PLAYING"
              ]
            ]) }
          }
        }
      },

      waiting: {
        entry: [sendParent("LOADING")],

        invoke: { src: () => (callback) => setEvents(callback, [
          [
            "playing",
            "PLAYING"
          ]
        ]) },

        on: { PLAYING: "playing" }
      },

      paused: {
        entry: [sendParent("PAUSED")],
        invoke: { src: () => (callback) => setEvents(callback, [
          [
            "ended",
            "FINISHED"
          ],
          [
            "completed",
            "FINISHED"
          ],
          [
            "playing",
            "PLAYING"
          ],
          [
            "loading",
            "WAITING"
          ]
        ]) },

        on: {
          FINISHED: "finished",
          WAITING: "waiting"
        }
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
                  seek
                });

              }, 1000);

              return () => {

                clearInterval(interval);

              };

            }
          },
          { src: () => (callback) => setEvents(callback, [
            [
              "paused",
              "PAUSED"
            ],
            [
              "waiting",
              "WAITING"
            ],
            [
              "completed",
              "FINISHED"
            ]
          ]) }
        ],

        entry: [sendParent("PLAYING")],

        on: {
          PAUSE: { actions: ["pause"] },
          PAUSED: "paused",
          WAITING: "waiting",
          FINISHED: "finished",
          TACK: { actions: ["tack"] }
        }
      },

      stopped: { entry: [sendParent("STOPPED")] },

      finished: { entry: [sendParent("FINISHED")] }
    }
  },
  { actions: {
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

    setData: assign({ url: (_, event) => "data" in event ? event.data : undefined }),

    stop: () => {

      CapacitorAppleMusic.stop();

    },

    tack: assign({ seek: (_, event) => {

      if ("seek" in event) {

        return Math.floor(event.seek * 1000);

      }

      return 0;

    } })
  } }
);

export type PreviewPlayerState = State<
  PreviewPlayerContext,
  PreviewPlayerStateEvent,
  PreviewPlayerStateSchema,
  {
    value: any;
    context: PreviewPlayerContext;
  }
>;
// result = await MusicKit.getInstance().api.music("v1/me/library/search", {term:"Where Angel Fear To Tread", types: ["library-songs"]})
