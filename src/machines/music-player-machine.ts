/* eslint-disable max-lines-per-function */
// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import { CapacitorAppleMusic } from "capacitor-plugin-applemusic";
import {
  Machine as machine,
  ActorRef,
  State,
  assign,
  send,
  spawn,
} from "xstate";
import { sendParent } from "xstate/lib/actions";
import { TrackObject } from "~/graphql/types";
import {
  AppleMusicPlayerMachine,
  AppleMusicPlayerState,
  AppleMusicPlayerStateEvent,
  separateString,
} from "~/machines/apple-music-player-machine";
import {
  PreviewPlayerMachine,
  PreviewPlayerState,
  PreviewPlayerStateEvent,
} from "~/machines/preview-player-machine";

export type MusicPlayerContext = {
  previewPlayerRef?: ActorRef<PreviewPlayerStateEvent, PreviewPlayerState>;
  appleMusicPlayerRef?: ActorRef<
    AppleMusicPlayerStateEvent,
    AppleMusicPlayerState
  >;
  track?: TrackObject;
  duration: number;
  seek: number;
  currentPlayer: string;
  data: string;
};

export type MusicPlayerSchema = {
  states: {
    idle: {};
    playerSelecting: {};
    loading: {};
    playing: {};
    paused: {};
    stopped: {};
    finished: {};
  };
};

const previewPlayerId = "preview";
const appleMusicPlayerId = "apple-music-player";

export type MusicPlayerEvent =
  | { type: "SET_TRACK"; track: TrackObject }
  | { type: "SET_DURATION"; duration: number }
  | { type: "SET_SEEK"; seek: number }
  | { type: "SET_DATA"; data: string }
  | {
      type: "SET_CURRENT_PLAYER";
      currentPlayer: typeof previewPlayerId | typeof appleMusicPlayerId;
    }
  | { type: "CHANGE_SEEK"; seek: number }
  | { type: "LOAD" }
  | { type: "LOADING" }
  | { type: "DURATION_SETTING" }
  | { type: "PLAY" }
  | { type: "PLAYING" }
  | { type: "PAUSE" }
  | { type: "PAUSED" }
  | { type: "STOP" }
  | { type: "STOPPED" }
  | { type: "FINISHED" }
  | { type: "TICK" };

const selectPlayer = (context: MusicPlayerContext) => context.currentPlayer;

const id = "music-player";

export const MusicPlayerMachine = machine<
  MusicPlayerContext,
  MusicPlayerSchema,
  MusicPlayerEvent
>(
  {
    context: {
      duration: 0,
      seek: 0,
      currentPlayer: previewPlayerId,
      data: "",
    },

    id,

    initial: "idle",

    states: {
      finished: {
        entry: ["resetSeek", sendParent("NEXT_PLAY")],
      },

      idle: { entry: ["initPlayers"] },

      playerSelecting: {
        invoke: {
          src: (context) => (callback) => {
            (async () => {
              const appleAuth = (await CapacitorAppleMusic.isAuthorized()).
                result;
              const appleMusicId = context.track?.appleMusicId;

              if (appleAuth && appleMusicId) {
                callback({
                  type: "SET_CURRENT_PLAYER",
                  currentPlayer: appleMusicPlayerId,
                });
                callback({
                  type: "SET_DATA",
                  data: `${appleMusicId}${separateString}${context.track?.name}${separateString}${context.track?.previewUrl}`,
                });
              } else if (context.track?.previewUrl) {
                callback({
                  type: "SET_CURRENT_PLAYER",
                  currentPlayer: previewPlayerId,
                });
                callback({
                  type: "SET_DATA",
                  data: context.track?.previewUrl,
                });
              }

              callback("LOADING");
            })();
          },
        },
        on: {
          LOADING: "loading",
          SET_CURRENT_PLAYER: { actions: "setCurrentPlayer" },
          SET_DATA: { actions: "setData" },
        },
        exit: ["stopToPlayers", "setDataToPlayer", "loadToPlayer"],
      },

      loading: {
        // 30秒間再生できない音楽はスキップ
        after: { 30000: { target: "finished" } },
        on: { PLAYING: "playing" },
      },

      playing: {
        entry: [sendParent("PLAYING")],
        invoke: [
          {
            id: "setDuration",
            src: () => (callback) => {
              (async () => {
                const duration =
                  (await CapacitorAppleMusic.currentPlaybackDuration()).result *
                  1000;

                callback({
                  type: "SET_DURATION",
                  duration,
                });
              })();
            },
          },
          {
            id: "seekTimer",
            src: () => (callback) => {
              const interval = setInterval(() => callback("TICK"), 1000);

              return () => {
                clearInterval(interval);
              };
            },
          },
        ],
        on: {
          FINISHED: "finished",
          PAUSE: { actions: ["pauseToPlayers"] },
          PAUSED: "paused",
          SET_DURATION: { actions: ["setDuration"] },
          TICK: { actions: ["tickToPlayer"] },
        },
      },

      paused: {
        entry: [sendParent("PAUSED")],
        on: {
          FINISHED: "finished",
          PLAY: { actions: ["playToPlayer"] },
          PLAYING: "playing",
        },
      },

      stopped: {
        entry: [sendParent("STOPPED")],
        on: {
          FINISHED: "finished",
          PLAY: { actions: ["playToPlayer"] },
          PLAYING: "playing",
        },
      },
    },

    on: {
      CHANGE_SEEK: { actions: ["changeSeek", "changeSeekToPlayer"] },

      LOAD: "playerSelecting",

      LOADING: "loading",

      SET_SEEK: { actions: ["setSeek"] },

      SET_TRACK: { actions: ["resetSeek", "setTrack"] },

      STOP: { actions: ["stopToPlayers", "resetSeek"] },

      STOPPED: "stopped",
    },
  },
  {
    actions: {
      changeSeek: assign({
        seek: (_, event) => "seek" in event ? event.seek : 0,
      }),

      changeSeekToPlayer: send(
        (_, event) => {
          if ("seek" in event) {
            return {
              seek: event.seek,
              type: "CHANGE_SEEK",
            };
          }
          return { type: "" };
        },
        { to: selectPlayer }
      ),

      initPlayers: assign({
        appleMusicPlayerRef: (_) => spawn(AppleMusicPlayerMachine, appleMusicPlayerId),
        previewPlayerRef: (_) => spawn(PreviewPlayerMachine, previewPlayerId),
      }),

      loadToPlayer: send("LOAD", { to: selectPlayer }),

      pauseToPlayers: (context) => {
        context.previewPlayerRef?.send({ type: "PAUSE" });
        context.appleMusicPlayerRef?.send({ type: "PAUSE" });
      },

      playToPlayer: send("PLAY", { to: selectPlayer }),

      resetSeek: assign({ seek: (_) => 0 }),

      setDuration: assign({
        duration: (_, event) => "duration" in event ? event.duration : 0,
      }),

      setSeek: assign({
        seek: (_, event) => "seek" in event ? event.seek : 0,
      }),

      setTrack: assign({
        track: (_, event) => "track" in event ? event.track : undefined,
      }),

      setCurrentPlayer: assign({
        currentPlayer: (_, event) => "currentPlayer" in event ? event.currentPlayer : previewPlayerId,
      }),

      setData: assign({
        data: (_, event) => "data" in event ? event.data : "",
      }),

      setDataToPlayer: send(
        (context) => {
          if (context.data) {
            return {
              data: context.data,
              type: "SET_DATA",
            };
          }

          return { type: "" };
        },
        { to: selectPlayer }
      ),

      stopToPlayers: (context) => {
        context.previewPlayerRef?.send({ type: "STOP" });
        context.appleMusicPlayerRef?.send({ type: "STOP" });
      },

      tickToPlayer: send("TICK", { to: selectPlayer }),
    },
  }
);

export type MusicPlayerState = State<
  MusicPlayerContext,
  MusicPlayerEvent,
  MusicPlayerSchema,
  {
    value: any;
    context: MusicPlayerContext;
  }
>;
