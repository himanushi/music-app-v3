<script lang="ts">
import { goto } from "@roxi/routify";
import Favorite from "~/components/favorite.svelte";
import SquareImage from "~/components/square-image.svelte";
import type { ArtistObject } from "~/graphql/types";

export let item: ArtistObject;

const path = `/artists/${item.id}`;
</script>

<ion-item detail={false} button on:click={() => $goto(path)}>
  <ion-thumbnail slot="start">
    <SquareImage src={item.artworkM?.url ?? undefined} alt={item.name} />
  </ion-thumbnail>
  {#if item.status !== "ACTIVE"}
    <ion-icon
      color={item.status === "PENDING" ? "yellow" : "red"}
      slot="start"
      name="hourglass-outline"
    />
  {/if}
  <ion-label>{item.name}</ion-label>
  <ion-buttons slot="end">
    <Favorite type="artist" id={item.id} />
  </ion-buttons>
</ion-item>
