<script lang="ts">
import { url } from "@roxi/routify";
import InfoIcon from "./_info-icon.svelte";
import Favorite from "~/components/favorite.svelte";
import Image from "~/components/square-image.svelte";
import type { Album } from "~/graphql/types";

export let item: Album;

const path = `/albums/${item.id}`;
</script>

<!-- <a class="card" href={$url(path)}>
    <Image src={item.artworkM?.url} class="h-40 w-40" />
    <span class="name">{item.name}</span>
  </a>
  <span class="favorite">
    <Favorite type="album" id={item.id} />
  </span>
  <span class="info">
    <InfoIcon {item} />
  </span> -->

<ion-card>
  <ion-img src={item.artworkM?.url} alt={item.name} class="h-40 w-40" />
  <ion-card-subtitle>
    {item.name}
  </ion-card-subtitle>
</ion-card>
