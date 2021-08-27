<script lang="ts">
import { goto } from "@roxi/routify";
import Favorite from "~/components/favorite.svelte";
import type { Album } from "~/graphql/types";
import { define } from "~/lib/customElement";
import { openMenu } from "~/lib/ionic";
import AlbumMenu from "~/pages/albums/_album-menu.svelte";

export let item: Album;

const path = `/albums/${item.id}`;

const name = "page-albums-menu";
define(name, AlbumMenu);
</script>

<ion-item detail={false} button on:click={() => $goto(path)}>
  <ion-thumbnail slot="start">
    <ion-img src={item.artworkM?.url} alt={item.name} />
  </ion-thumbnail>
  <ion-label>{item.name}</ion-label>
  <ion-buttons slot="end">
    <Favorite type="album" id={item.id} />
    <ion-button on:click|preventDefault|stopPropagation={openMenu(name)}>
      <ion-icon name="ellipsis-horizontal" />
    </ion-button>
  </ion-buttons>
</ion-item>
