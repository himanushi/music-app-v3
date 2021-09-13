<script lang="ts">
import { ApolloError } from "@apollo/client";
import { goto } from "@roxi/routify";
import {
  mutation, query
} from "svelte-apollo";
import InputText from "~/components/input-item.svelte";
import InputSelection from "~/components/input-selection.svelte";
import InputTextarea from "~/components/input-textarea.svelte";
import Messages from "~/components/messages.svelte";
import PlayButton from "~/components/play-button.svelte";
import {
  PlaylistDocument, UpsertPlaylistDocument
} from "~/graphql/types";
import type { Track } from "~/graphql/types";
import type {
  Playlist,
  PlaylistQuery,
  PlaylistPublicTypeEnum,
  UpsertPlaylistMutationVariables
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id = "";

let name = "";
let description = "";
let publicType: PlaylistPublicTypeEnum = "NON_OPEN";
let tracks: Track[] = [];
let messages: Record<string, string[]> = {};

const playlistQuery = query<PlaylistQuery>(PlaylistDocument, {
  fetchPolicy: "no-cache",
  variables: { id }
});

// 初期化
let playlist: Playlist;
let initialize = true;
$: if ($playlistQuery.data?.playlist && initialize) {

  playlist = $playlistQuery.data.playlist as Playlist;

  ({
    name, description, publicType
  } = playlist);

  tracks = playlist.items.map((item) => item.track);

  initialize = false;

}

const upsertPlaylist = mutation<unknown, UpsertPlaylistMutationVariables>(
  UpsertPlaylistDocument
);

let disabled = false;
const update = async () => {

  disabled = true;
  try {

    await upsertPlaylist({ variables: { input: {
      description,
      name,
      playlistId: id,
      publicType,
      trackIds: tracks.map((track) => track.id)
    } } });

    $goto("/playlist/:id", { id });

  } catch (error) {

    disabled = false;

    if (error instanceof ApolloError) {

      messages = errorMessages(error);

    }

  }

};

const changeItems = (
  event: CustomEvent & {
    detail: { from: number; to: number; complete: Function };
  }
) => {

  tracks = event.detail.complete(tracks);

};

const removeItem = (index: number) => () => {

  tracks = tracks.filter((_, idx) => idx !== index);

};

const publicTypes = [
  {
    label: "非公開",
    value: "NON_OPEN"
  },
  {
    label: "公開",
    value: "OPEN"
  },
  {
    label: "匿名公開",
    value: "ANONYMOUS_OPEN"
  }
];

const meq = meQuery();
$: me = $meq?.data?.me;
$: viewable =
  me && isAllowed(me, "upsertPlaylist") && playlist && playlist.isMine;
</script>

<ion-list>
  <form on:submit|preventDefault>
    <ion-item-group>
      <ion-item-divider sticky>
        <ion-label>Playlist</ion-label>
      </ion-item-divider>

      {#if viewable}
        <InputText
          label="タイトル"
          bind:value={name}
          errorMessages={messages.name}
        />
        <InputTextarea
          label="説明"
          bind:value={description}
          errorMessages={messages.description}
        />
        <InputSelection
          label="公開設定"
          bind:value={publicType}
          items={publicTypes}
        />
      {:else}
        {#each new Array(8) as item}
          <ion-item>
            <ion-skeleton-text animated />
          </ion-item>
        {/each}
      {/if}
    </ion-item-group>

    <ion-item-group>
      <ion-item-divider sticky>
        <ion-label>Playlist Tracks</ion-label>
      </ion-item-divider>
      {#if viewable}
        <ion-reorder-group on:ionItemReorder={changeItems} disabled={false}>
          {#each tracks as track, index}
            <ion-item>
              <ion-reorder slot="start">
                <ion-icon name="reorder-two" />
              </ion-reorder>
              <ion-buttons slot="start">
                <PlayButton {name} {index} {tracks} />
              </ion-buttons>
              <ion-label>{track.name}</ion-label>
              <ion-buttons slot="end">
                <ion-button on:click={removeItem(index)}>
                  <ion-icon name="trash-outline" color="red" />
                </ion-button>
              </ion-buttons>
            </ion-item>
          {/each}
        </ion-reorder-group>
      {:else}
        <ion-item>
          <ion-skeleton-text animated />
        </ion-item>
      {/if}

      <ion-item button {disabled} on:click={update}>
        <ion-icon name="musical-notes-outline" color="main" slot="start" />
        保存
      </ion-item>
      <Messages type="error" messages={messages._} />
    </ion-item-group>
  </form>
</ion-list>
