<script lang="ts">
import { goto } from "@roxi/routify";
import Favorite from "~/components/favorite.svelte";
import SquareImage from "~/components/square-image.svelte";
import type { Radio } from "~/graphql/types";

export let item: Radio;

const path = `/radios/${item.id}`;
</script>

<ion-item detail={false} button on:click={() => $goto(path)}>
  <ion-thumbnail slot="start">
    <SquareImage src={item?.track?.artworkM?.url} alt={item.name} />
  </ion-thumbnail>
  <ion-label>{item.name}</ion-label>
  <ion-buttons slot="end">
    <Favorite type="radio" id={item.id} />
  </ion-buttons>
</ion-item>
