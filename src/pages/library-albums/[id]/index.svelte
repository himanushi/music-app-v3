<script lang="ts">
import type { Components } from "@ionic/core";
import { onDestroy, onMount } from "svelte";
import { interpret } from "xstate";
import VirtualScroll from "~/components/virtual-scroll.svelte";
import { libraryTracksMachine } from "~/machines/apple-music-library-tracks";
import type { LibraryTrack } from "~/machines/apple-music-library-tracks";
import TrackItem from "./_track_item.svelte";

export let id = "";

let tracks: LibraryTrack[] = [];

let service = interpret(libraryTracksMachine, { devTools: true });

$: if ($service) {
  tracks = $service.context.tracks;
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
  service.send("LOAD");
};

onMount(() => {
  service.start();
  service.send({ type: "LOAD", albumLibraryId: id });
});

onDestroy(() => {
  service.stop();
});
</script>

<ion-item-group>
  <ion-item-divider sticky>
    <ion-label>Album</ion-label>
  </ion-item-divider>

  <ion-list>
    <!-- <VirtualScroll items={tracks} let:item let:index> -->
    {#each tracks as track}
      <TrackItem index={0} items={tracks} item={track} />
    {/each}
    <!-- </VirtualScroll> -->
  </ion-list>
</ion-item-group>

<ion-infinite-scroll
  on:ionInfinite={ionInfinite}
  threshold="100px"
  bind:this={infiniteScroll}
>
  <ion-infinite-scroll-content loading-spinner="lines" />
</ion-infinite-scroll>
