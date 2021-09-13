<script lang="ts">
import AddPlaylistSelection from "~/components/add-playlist-selection.svelte";
import type { Track } from "~/graphql/types";
import AddPlaylistIcon from "~/icons/add-playlist.svg";
import { openModal } from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let tracks: Track[];

let component: HTMLElement;
let show = false;
const showMyPlaylist = () => {

  show = true;
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

<!-- Modal -->
<span style="display:none;">
  <span bind:this={component}>
    {#if show}
      <AddPlaylistSelection {tracks} />
    {/if}
  </span>
</span>
