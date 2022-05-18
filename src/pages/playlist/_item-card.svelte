<script lang="ts">
import { goto } from "@roxi/routify";
import Favorite from "~/components/favorite.svelte";
import SquareImage from "~/components/square-image.svelte";
import type { PlaylistObject } from "~/graphql/types";

export let item: PlaylistObject;

const path = `/playlist/${item.id}`;
$: src = item.isCondition ? "/no-image.png" : item.track?.artworkM?.url ?? undefined;
</script>

<ion-item detail={false} button on:click={() => $goto(path)}>
  <ion-thumbnail slot="start">
    <SquareImage {src} alt={item.name} />
  </ion-thumbnail>
  {#if item.isCondition}
    <ion-buttons class="playlistCondition" slot="start">
      <ion-icon slot="icon-only" color="gray" name="settings" />
    </ion-buttons>
  {/if}
  <ion-label>{item.name}</ion-label>
  <ion-buttons slot="end">
    <Favorite type="playlist" id={item.id} />
  </ion-buttons>
</ion-item>

<style lang="scss">
.playlistCondition {
  position: absolute;
  left: calc(var(--padding-start) + var(--ion-safe-area-left, 0px) + 14px);
}
</style>
