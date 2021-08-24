<script lang="ts">
import { goto } from "@roxi/routify";
import Favorite from "~/components/favorite.svelte";
import type { Album } from "~/graphql/types";
import { openMenu } from "~/lib/ionic";

export let item: Album;

const path = `/albums/${item.id}`;
</script>

<ion-item detail={false} button on:click={() => $goto(path)}>
  <ion-thumbnail slot="start">
    <ion-img src={item.artworkM?.url} alt={item.name} />
  </ion-thumbnail>
  <ion-label>{item.name}</ion-label>
  <ion-buttons slot="end">
    <Favorite type="album" id={item.id} />
    <ion-button
      on:click|preventDefault|stopPropagation={openMenu("page-albums-menu")}
    >
      <ion-icon name="ellipsis-horizontal" />
    </ion-button>
  </ion-buttons>
</ion-item>
