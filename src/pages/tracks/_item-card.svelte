<script lang="ts">
import { goto } from "@roxi/routify";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import PlayButton from "~/components/play-button.svelte";
import SquareImage from "~/components/square-image.svelte";
import type { Track } from "~/graphql/types";

export let index: number;
export let item: Track;
export let items: Track[];
// eslint-disable-next-line prefer-destructuring
export let name = "曲一覧";
export let viewImage = true;

const path = `/tracks/${item.id}`;
</script>

<ion-item button detail={false} on:click={() => $goto(path)}>
  <ion-buttons slot="start">
    <ion-thumbnail>
      <SquareImage src={item.artworkM.url} />
    </ion-thumbnail>
    <span class="playButton">
      <PlayButton {name} {index} tracks={items} />
    </span>
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
  left: calc(14%);
}
</style>
