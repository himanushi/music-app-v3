<script lang="ts">
import { mutation, query } from "svelte-apollo";
import SquareImage from "./square-image.svelte";
import {
  AddPlaylistItemsDocument,
  PlaylistDocument,
  PlaylistsDocument,
} from "~/graphql/types";
import type {
  AddPlaylistItemsMutationVariables,
  TrackObject,
  PlaylistObject,
  PlaylistsQuery,
} from "~/graphql/types";
import { openToast } from "~/lib/ionic";
import ModalContent from "~/pages/_modal-content.svelte";

export let tracks: TrackObject[];
$: firstTrack = tracks[0];

const playlistsQuery = query<PlaylistsQuery>(PlaylistsDocument, {
  fetchPolicy: "no-cache",
  variables: {
    conditions: { isMine: true },
    cursor: {
      limit: 1000,
      offset: 0,
    },
    sort: {
      order: "UPDATE",
      type: "DESC",
    },
  },
});

let playlists: PlaylistObject[];
$: playlists = $playlistsQuery?.data?.items as PlaylistObject[];

const addPlaylistItems = mutation<unknown, AddPlaylistItemsMutationVariables>(
  AddPlaylistItemsDocument
);

const addPlaylist = (playlist: PlaylistObject) => async () => {
  try {
    await addPlaylistItems({
      refetchQueries: [
        {
          query: PlaylistDocument,
          variables: { id: playlist.id },
        },
      ],
      variables: {
        input: {
          playlistId: playlist.id,
          trackIds: tracks.map((track) => track.id),
        },
      },
    });

    openToast({
      color: "light-green",
      duration: 3000,
      message: `${playlist.name} に追加されました`,
    });
  } catch (error) {
    openToast({
      color: "light-red",
      duration: 5000,
      message: "エラーが発生しました",
    });
  }
};
</script>

<ion-header>
  <ion-toolbar>
    <ion-title> プレイリストに追加 </ion-title>
  </ion-toolbar>
</ion-header>
<ModalContent>
  {#if playlists}
    {#each playlists as playlist}
      <ion-item>
        <ion-thumbnail slot="start">
          <SquareImage src={playlist.track?.artworkM?.url} />
        </ion-thumbnail>
        <ion-label>
          {playlist.name}
        </ion-label>
        <ion-buttons slot="end">
          <ion-button on:click={addPlaylist(playlist)}>
            <ion-icon name="add" />
          </ion-button>
        </ion-buttons>
      </ion-item>
    {/each}
  {/if}
</ModalContent>
<ion-footer>
  <ion-toolbar color="main">
    {#if firstTrack}
      <ion-thumbnail>
        <SquareImage src={firstTrack?.artworkM?.url} />
      </ion-thumbnail>
      <ion-title>
        {tracks.length}曲追加: {firstTrack.name}
      </ion-title>
      <ion-buttons slot="end">
        <ion-button>
          <ion-icon name="arrow-up-outline" />
        </ion-button>
      </ion-buttons>
    {:else}
      <ion-thumbnail />
    {/if}
  </ion-toolbar>
</ion-footer>
