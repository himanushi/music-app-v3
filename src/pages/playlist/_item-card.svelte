<script lang="ts">
import { goto } from "@roxi/routify";
import Favorite from "~/components/favorite.svelte";
import SquareImage from "~/components/square-image.svelte";
import type { PlaylistObject } from "~/graphql/types";

export let item: PlaylistObject;

const path = `/playlist/${item.id}`;
</script>

<ion-item detail={false} button on:click={() => $goto(path)}>
  <ion-thumbnail slot="start">
    <SquareImage src={item.track?.artworkM?.url ?? undefined} alt={item.name} />
  </ion-thumbnail>
  <ion-label>{item.name}</ion-label>
  <ion-buttons slot="end">
    <Favorite type="playlist" id={item.id} />
  </ion-buttons>
</ion-item>
