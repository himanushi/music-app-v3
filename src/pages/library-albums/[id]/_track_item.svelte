<script lang="ts">
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import PlayButton from "~/components/play-button.svelte";
import SquareImage from "~/components/square-image.svelte";
import { convertImageUrl } from "~/lib/image";
import type { LibraryTrack } from "~/machines/apple-music-library-tracks";
import type { JukeboxTrack } from "~/machines/jukebox-machine";

export let index: number;
export let item: JukeboxTrack;
export let items: JukeboxTrack[];
// eslint-disable-next-line prefer-destructuring
export let name = "曲一覧";
export let viewImage = true;
</script>

<ion-item>
  <ion-thumbnail slot="start" on:click|preventDefault|stopPropagation>
    {#if viewImage}
      <SquareImage
        src={item.artworkUrl
          ? convertImageUrl(item.artworkUrl, 300)
          : undefined}
      />
    {/if}
  </ion-thumbnail>
  <ion-buttons
    class="playButton"
    slot="start"
    on:click|preventDefault|stopPropagation
  >
    <PlayButton {name} {index} tracks={items} />
  </ion-buttons>
  <ion-label>
    {item.name}
  </ion-label>
  <!-- <ion-buttons slot="end">
    <Favorite type="track" id={item.libraryId} />
    <AddPlaylistButton tracks={[item]} />
  </ion-buttons> -->
</ion-item>

<style lang="scss">
.playButton {
  position: absolute;
  left: calc(var(--padding-start) + var(--ion-safe-area-left, 0px) + 8px);
}
</style>
