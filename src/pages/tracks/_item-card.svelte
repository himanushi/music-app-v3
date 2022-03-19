<script lang="ts">
import { goto } from "@roxi/routify";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import PlayButton from "~/components/play-button.svelte";
import SquareImage from "~/components/square-image.svelte";
import type { TrackObject } from "~/graphql/types";

export let index: number;
export let item: TrackObject;
export let items: TrackObject[];
// eslint-disable-next-line prefer-destructuring
export let name = "曲一覧";
export let viewImage = true;

$: path = `/tracks/${item.id}`;
</script>

<ion-item button detail={false} on:click={() => $goto(path)}>
  <ion-thumbnail slot="start" on:click|preventDefault|stopPropagation>
    {#if viewImage}
      <SquareImage src={item.artworkM.url ?? undefined} />
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
  <ion-buttons slot="end">
    <Favorite type="track" id={item.id} />
    <AddPlaylistButton tracks={[item]} />
  </ion-buttons>
</ion-item>

<style lang="scss">
.playButton {
  position: absolute;
  left: calc(var(--padding-start) + var(--ion-safe-area-left, 0px) + 8px);
}
</style>
