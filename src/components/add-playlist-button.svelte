<script lang="ts">
import {
  getClient, mutation
} from "svelte-apollo";
import NoPlaylistMessage from "./toast-messages/no-playlist-message.svelte";
import AddPlaylistSelection from "~/components/add-playlist-selection.svelte";
import type { selectionType } from "~/components/add-playlist-selection.svelte";
import type { Props } from "~/components/toast-messages/added-playlist-message.svelte";
import AddedPlaylistMessage from "~/components/toast-messages/added-playlist-message.svelte";
import { toasts } from "~/components/toasts.svelte";
import {
  PlaylistsDocument,
  AddPlaylistItemsDocument,
  PlaylistDocument
} from "~/graphql/types";
import type {
  Track, AddPlaylistItemsMutationVariables
} from "~/graphql/types";
import AddPlaylistIcon from "~/icons/add-playlist.svg";
import { openModal } from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let tracks: Track[];

let component: HTMLElement;

const showMyPlaylist = () => {

  openModal(component);

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, [
"playlists",
"addPlaylistItems"
])}
  <ion-button
    size="large"
    on:click|preventDefault|stopPropagation={showMyPlaylist}
  >
    <ion-icon slot="icon-only" src={AddPlaylistIcon} />
  </ion-button>
{/if}

<!-- 犯人 -->
<!-- Modal -->
<!-- <span style="display:none;">
  <span bind:this={component}>
    <AddPlaylistSelection />
  </span>
</span> -->
