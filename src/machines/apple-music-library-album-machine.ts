// xstate では順序を見やすくするため object key sort は無効にする
/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { assign, DoneInvokeEvent, interpret, send } from "xstate";
import { createMachine } from "xstate";

export type LibraryAlbum = {
  libraryId: string;
  name: string;
  artworkUrl?: string;
};

type Context = {
  hasNext: boolean;
  fetchUrl?: string;
  albumIds: string[];
  albums: LibraryAlbum[];
  total: number;
};

const id = "apple-music-library-album";

export const libraryAlbumsMachine = createMachine<Context>(
  {
    id,

    initial: "idle",

    context: {
      hasNext: true,
      fetchUrl: "/v1/me/library/albums?limit=100",
      albums: [],
      total: 0,
      albumIds: [],
    },

    states: {
      // ログイン後に LOAD を実行すること
      idle: {
        on: {
          LOAD: "loading",
        },
      },

      // 完了するかロードするかチェック
      checking: {
        entry: send({ type: "LOAD_test" }),
        on: {
          LOAD: [
            { target: "loading",
              cond: (context) => context.hasNext },
            { target: "done" },
          ],
        },
      },

      loading: {
        invoke: {
          id: "getLibraryAlbums",

          src: (context) => {
            if (!context.fetchUrl) {
              throw new Error("fetchUrl が設定されていない！");
            }
            return MusicKit.getInstance().api.music(context.fetchUrl);
          },

          onDone: {
            target: "checking",
            actions: assign({
              albums: (context, event: DoneInvokeEvent<MusicKit.APIResult>) => [
                ...context.albums,
                ...event.data.data.data.map((album) => ({
                  libraryId: album.attributes.playParams.id,
                  name: album.attributes.name,
                  artworkUrl: album.attributes.artwork?.url || "/no-image.png",
                })),
              ],
              fetchUrl: (_, event) => `${event.data.data.next}&limit=100`,
              hasNext: (context, event) => event.data.data.meta.total !==
                context.albums.length + event.data.data.data.length,
              total: (_, event) => event.data.data.meta.total,
            }),
          },
          onError: "checking",
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
