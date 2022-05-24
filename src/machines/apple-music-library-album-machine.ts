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
  albumFetchUrl?: string;
  searchAlbumLibraryIds: string[];
  albums: LibraryAlbum[];
  total: number;
  trackIds: TrackIds;
};

const id = "apple-music-library-album";
const endpoint = "/v1/me/library/albums";
const limit = 1;

export const libraryAlbumsMachine = createMachine<Context>(
  {
    id,

    initial: "idle",

    context: {
      hasNext: true,
      albumFetchUrl: `${endpoint}?limit=${limit}`,
      albums: [],
      total: 0,
      searchAlbumLibraryIds: [],
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
              target: "tracksLoading",
              cond: (context) => context.searchAlbumLibraryIds.length > 0,
            },
            {
              target: "albumLoading",
              cond: (context) => context.hasNext,
            },
            { target: "done" },
          ],
        },
      },

      albumLoading: {
        invoke: {
          src: (context) => {
            if (!context.albumFetchUrl) {
              throw new Error("fetchUrl が設定されていない！");
            }
            return MusicKit.getInstance().api.music(context.albumFetchUrl);
          },

          onDone: {
            target: "checking",
            actions: assign({
              searchAlbumLibraryIds: (
                _,
                event: DoneInvokeEvent<MusicKit.APIResult>
              ) => event.data.data.data.map((album) => album.id),
              albumFetchUrl: (_, event) => `${event.data.data.next}&limit=${limit}`,
              // hasNext: (context, event) => event.data.data.meta.total !==
              //   context.albums.length + event.data.data.data.length,
              hasNext: (_, _event) => false,
              total: (_, event) => event.data.data.meta.total,
            }),
          },
          // onError: "checking",
        },
        on: {},
      },

      tracksLoading: {
        invoke: {
          src: (context) => MusicKit.getInstance().api.music(
            `${endpoint}/${context.searchAlbumLibraryIds[0]}`
          ),

          onDone: {
            target: "checking",
            actions: assign({
              albums: (context, event: DoneInvokeEvent<MusicKit.APIResult>) => [
                ...context.albums,
                ...event.data.data.data.map((album) => {
                  console.log({ album });
                  return {
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
                }),
              ],
              searchAlbumLibraryIds: (context, _event) => context.searchAlbumLibraryIds.splice(1),
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
