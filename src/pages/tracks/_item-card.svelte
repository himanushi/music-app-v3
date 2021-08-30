<script lang="ts">
import { url } from "@roxi/routify";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import PlayButton from "~/components/play-button.svelte";
import type { Track } from "~/graphql/types";

export let index: number;
export let item: Track;
export let items: Track[];
// eslint-disable-next-line prefer-destructuring
export let name = "曲一覧";
export let viewImage = true;

const path = `/tracks/${item.id}`;
</script>

<ion-item button detail={false}>
  <ion-buttons slot="start">
    <PlayButton {name} {index} tracks={items} />
  </ion-buttons>
  <ion-label href={$url(path)}>
    {item.name}
  </ion-label>
  <ion-buttons slot="end">
    <Favorite type="track" id={item.id} />
    <AddPlaylistButton tracks={[item]} />
  </ion-buttons>
</ion-item>
