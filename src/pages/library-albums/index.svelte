<script lang="ts">
import { onDestroy, onMount } from "svelte";
import { interpret } from "xstate";
import type { Components } from "@ionic/core";
import { libraryAlbumsMachine } from "~/machines/apple-music-library-albums";
import type { LibraryAlbum } from "~/machines/apple-music-library-albums";
import VirtualScroll from "~/components/virtual-scroll.svelte";
import { goto } from "@roxi/routify";

let albums: LibraryAlbum[] = [];

const convertImageUrl = (url: string, px: number) => {
  const decodedUrl = decodeURI(url);
  return decodedUrl.replace("/{w}x{h}", `/${px}x${px}`);
};

let service = interpret(libraryAlbumsMachine, { devTools: true });

$: if ($service) {
  albums = $service.context.albums;
}

let infiniteScroll: HTMLElement & Components.IonInfiniteScroll;
$: if ($service && $service.matches("idle") && infiniteScroll) {
  infiniteScroll.complete();
  if ($service.context.hasNext) {
    infiniteScroll.disabled = false;
  } else {
    infiniteScroll.disabled = true;
  }
}

const ionInfinite = () => {
  service.send({ type: "LOAD" }, { delay: 10000 });
};

onMount(() => {
  service.start();
  service.send({ type: "LOAD" }, { delay: 10000 });
});

onDestroy(() => {
  service.stop();
});
</script>

<ion-item-group>
  <ion-item-divider sticky>
    <ion-label>Library Albums</ion-label>
  </ion-item-divider>
  <ion-list>
    <VirtualScroll items={albums} let:item let:index>
      <ion-item
        detail={false}
        button
        on:click={() => $goto(`/library-albums/${item.libraryId}`)}
      >
        <ion-thumbnail slot="start">
          <ion-img
            src={item.artworkUrl ? convertImageUrl(item.artworkUrl, 300) : ""}
            alt={item.name}
          />
        </ion-thumbnail>
        <ion-label>{item.name}</ion-label>
      </ion-item>
    </VirtualScroll>
  </ion-list>
</ion-item-group>

<ion-infinite-scroll
  on:ionInfinite={ionInfinite}
  threshold="100px"
  bind:this={infiniteScroll}
>
  <ion-infinite-scroll-content loading-spinner="lines" />
</ion-infinite-scroll>
