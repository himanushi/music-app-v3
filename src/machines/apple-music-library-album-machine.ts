// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { CapacitorAppleMusic } from "capacitor-plugin-applemusic";
import { assign } from "xstate";
import { Machine as machine } from "xstate";
import { TrackObject } from "~/graphql/types";
import { store } from "~/store/track-info";

type Schema = {
  states: {
    idle: {};
    load: {};
    purchased: {};
    notPurchased: {};
  };
};

type Event =
  | { type: "SET_TERM"; term: string; tracks: TrackObject[] }
  | { type: "LOAD" }
  | { type: "PURCHASED" }
  | { type: "NOT_PURCHASED" };

type Context = {
  purchased: boolean;
  term: string;
  tracks: TrackObject[];
};

const id = "apple-music-library-album";

export const libraryAlbumMachine = machine<Context, Schema, Event>(
  {
    id,

    initial: "idle",

    context: {
      purchased: false,
      term: "",
      tracks: [],
    },

    states: {
      // ログイン後に LOAD を実行すること
      idle: {
        on: {
          SET_TERM: {
            target: "load",
            actions: ["setTerm", "setTracks"],
          },
        },
        meta: { label: "loading" },
      },

      load: {
        meta: { label: "loading" },
        invoke: {
          src: (context) => (callback) => {
            (async () => {
              // iTunes のアルバムのみで実行される

              const result = await CapacitorAppleMusic.getLibraryAlbum({
                albumTitle: context.term,
              });

              let purchased = false;

              if (result.result && result.album) {
                for (const track of result.album.tracks) {
                  const foundTrack = context.tracks.find(
                    (conTrack) => conTrack.trackNumber.toString() === track.trackNumber &&
                      conTrack.discNumber.toString() === track.discNumber &&
                      conTrack.name === track.title
                  );
                  if (foundTrack) {
                    purchased = true;
                    await store.set(foundTrack.appleMusicId, {
                      librarySongId: track.id,
                      songTitle: track.title,
                      albumTitle: context.term,
                      purchased,
                    });
                  }
                }
              }

              if (purchased) {
                return callback("PURCHASED");
              }

              for (const track of context.tracks) {
                await store.set(track.appleMusicId, {
                  songTitle: track.name,
                  albumTitle: context.term,
                  purchased: false,
                });
              }
              return callback("NOT_PURCHASED");
            })();
          },
        },
        on: {
          PURCHASED: "purchased",
          NOT_PURCHASED: "notPurchased",
        },
      },

      purchased: {
        meta: { label: "purchased" },
      },

      notPurchased: {
        meta: { label: "not purchased" },
      },
    },
  },
  {
    actions: {
      setTerm: assign({
        term: (_, event) => "term" in event ? event.term : "",
      }),
      setTracks: assign({
        tracks: (_, event) => "tracks" in event ? event.tracks : [],
      }),
    },
  }
);
