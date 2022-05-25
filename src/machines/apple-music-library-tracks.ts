// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */

import { assign, DoneInvokeEvent } from "xstate";
import { createMachine } from "xstate";

export type LibraryTrack = {
  appleMusicId: string;
  name: string;
  artworkUrl?: string;
  purchasedId?: string;
  durationMs: number;
};

type Context = {
  albumLibraryId?: string;
  hasNext: boolean;
  fetchUrl?: string;
  tracks: LibraryTrack[];
};

type Event = { type: "LOAD"; albumLibraryId?: string } | { type: "IDLE" };

type TypeState =
  | {
      value: "idle";
      context: Context;
    }
  | {
      value: "loading";
      context: Context;
    };

const id = "apple-music-library-track";

export const libraryTracksMachine = createMachine<Context, Event, TypeState>(
  {
    id,

    initial: "idle",

    context: {
      hasNext: true,
      tracks: [],
    },

    states: {
      idle: {
        on: {
          LOAD: {
            target: "loading",
            actions: ["setFirstFetchUrl"],
          },
        },
      },

      loading: {
        invoke: {
          id: "getLibraryTracks",

          src: (context) => {
            if (!context.fetchUrl) {
              throw new Error("fetchUrl が設定されていない！");
            }
            return MusicKit.getInstance().api.music(`${context.fetchUrl}`);
          },

          onDone: {
            target: "idle",
            actions: assign({
              tracks: (context, event: DoneInvokeEvent<MusicKit.APIResult>) => [
                ...context.tracks,
                ...event.data.data.data.map((track) => ({
                  appleMusicId: track.attributes.playParams.id,
                  name: track.attributes.name,
                  artworkUrl: track.attributes.artwork?.url,
                  purchasedId: track.attributes.playParams.purchasedId,
                  durationMs: track.attributes.durationInMillis,
                })),
              ],
              fetchUrl: (_, event) => `${event.data.data.next}&limit=100`,
              hasNext: (context, event) => event.data.data.meta.total !==
                context.tracks.length + event.data.data.data.length,
            }),
          },
          onError: "idle",
        },
        on: {},
      },
    },
  },
  {
    actions: {
      setFirstFetchUrl: assign({
        fetchUrl: (context, event) => "albumLibraryId" in event ? `/v1/me/library/albums/${event.albumLibraryId}/tracks?limit=100` : context.fetchUrl,
      }),
    },
  }
);
