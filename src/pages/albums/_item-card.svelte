<script lang="ts">
import { goto } from "@roxi/routify";
import Favorite from "~/components/favorite.svelte";
import type { Album } from "~/graphql/types";

export let item: Album;

const path = `/albums/${item.id}`;
const isAppleMusic = Boolean(item.appleMusicAlbum);
</script>

<ion-item detail={false} button on:click={() => $goto(path)}>
  <ion-thumbnail slot="start">
    <ion-img src={item.artworkM?.url} alt={item.name} />
  </ion-thumbnail>
  {#if isAppleMusic}
    <ion-icon slot="start" src="/assets/logo-apple-music.svg" />
  {:else}
    <ion-icon slot="start" src="/assets/logo-itunes.svg" />
  {/if}
  {#if item.status !== "ACTIVE"}
    <ion-icon
      color={item.status === "PENDING" ? "yellow" : "red"}
      slot="start"
      name="hourglass-outline"
    />
  {/if}
  <ion-label>{item.name}</ion-label>
  <ion-buttons slot="end">
    <Favorite type="album" id={item.id} />
  </ion-buttons>
</ion-item>
