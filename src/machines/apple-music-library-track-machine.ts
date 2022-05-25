// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { assign, DoneInvokeEvent, interpret, send } from "xstate";
import { createMachine } from "xstate";

type TrackIds = {
  // AppleMusicId: LibraryId
  [key in string]: string;
};

type LibraryTrack = {
  libraryId: string;
  name: string;
  artworkUrl?: string;
  purchasedId?: string;
};

type LibraryAlbum = {
  libraryId: string;
  name: string;
  artworkUrl?: string;
  tracks: LibraryTrack[];
};

type Context = {
  hasNext: boolean;
  fetchUrl: string;
  offset: number;
  albums: { [key in string]: LibraryAlbum };
  total: number;
  trackIds: TrackIds;
};

const id = "apple-music-library-album";
const endpoint = "/v1/me/library/albums";

export const libraryAlbumsMachine = createMachine<Context>(
  {
    id,

    initial: "idle",

    context: {
      hasNext: true,
      fetchUrl: `${endpoint}?limit=1`,
      offset: 0,
      total: 0,
      albums: {},
      trackIds: {},
    },

    states: {
      // ログイン後に LOAD を実行すること
      idle: {
        on: {
          LOAD: "checking",
        },
      },

      // 完了するかアルバムロードするかトラックロードするかチェック
      checking: {
        entry: send({ type: "LOAD" }),
        on: {
          LOAD: [
            {
              target: "loading",
              cond: (context) => context.hasNext,
            },
            { target: "done" },
          ],
        },
      },

      loading: {
        invoke: {
          src: (context) => MusicKit.getInstance().api.music(context.fetchUrl),

          onDone: {
            target: "checking",
            actions: assign({
              albums: (context, event: DoneInvokeEvent<MusicKit.APIResult>) => {
                const albums: Context["albums"] = {};

                event.data.data.data.forEach((album) => {
                  albums[album.id] = {
                    libraryId: album.attributes.playParams.id,
                    name: album.attributes.name,
                    artworkUrl:
                      album.attributes.artwork?.url || "/no-image.png",
                    tracks: album.relationships.tracks.data.map((track) => ({
                      libraryId: track.id,
                      name: track.attributes.name,
                      artworkUrl: album.attributes.artwork?.url,
                      purchasedId: track.attributes.playParams?.purchasedId,
                    })),
                  };
                });

                return {
                  ...context.albums,
                  ...albums,
                };
              },
              fetchUrl: (context, event) => `${event.data.data.next}&limit=1&offset=${context.offset + 1}`,
              // hasNext: (context, event) => event.data.data.meta.total !==
              //   context.albums.length + event.data.data.data.length,
              hasNext: (_, _event) => false,
              total: (_, event) => event.data.data.meta.total,
              offset: (context, _) => context.offset + 1,
            }),
          },
          // onError: "checking",
        },
        on: {},
      },

      done: {},
    },
  },
  {
    actions: {},
  }
);

export const libraryAlbumsService = interpret(libraryAlbumsMachine).start();
