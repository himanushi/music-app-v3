<script lang="ts">
import AddPlaylistSelection from "~/components/add-playlist-selection.svelte";
import type { TrackObject } from "~/graphql/types";
import { openModal } from "~/lib/ionic";
import { isAllowed, meQuery } from "~/lib/me";

export let tracks: TrackObject[];

let component: HTMLElement;
let show = false;
const showMyPlaylist = () => {
  show = true;
  openModal(component);
};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, ["playlists", "addPlaylistItems"])}
  <ion-button
    size="large"
    on:click|preventDefault|stopPropagation={showMyPlaylist}
  >
    <ion-icon slot="icon-only" src="/assets/add-playlist.svg" />
  </ion-button>
{/if}

<!-- Modal -->
<span style="display:none;">
  <span bind:this={component}>
    {#if show}
      <AddPlaylistSelection {tracks} />
    {/if}
  </span>
</span>
