<script lang="ts">
import { Capacitor } from "@capacitor/core";
import ItemCard from "./../_item-card.svelte";
import AddAppleMusicPlaylistButton from "~/components/add-apple-music-playlist-button.svelte";
import Items from "~/components/items.svelte";
import LoadingItems from "~/components/loading-items.svelte";
import type { TrackObject, TracksQueryVariables } from "~/graphql/types";
import { TracksDocument } from "~/graphql/types";

export let loaded: boolean = false;

const variables: TracksQueryVariables = {
  conditions: { random: true },
  cursor: { limit: 45 },
};

let tracks: TrackObject[] = [];

const setTracks = (ts: TrackObject[]) => {
  if (tracks.length > 0) {
    return "";
  }

  tracks = ts;
  return "";
};
</script>

<ion-item-group>
  <ion-item-divider sticky>
    <ion-label>Random Playlist</ion-label>
  </ion-item-divider>

  {#if Capacitor.getPlatform() === "web"}
    {#if tracks.length > 0}
      <AddAppleMusicPlaylistButton
        name="Random"
        description={`${location.origin}/tracks/random`}
        {tracks}
      />
    {:else}
      <LoadingItems />
    {/if}
  {/if}

  <Items
    {variables}
    type="track"
    document={TracksDocument}
    bind:loaded
    let:items
    let:item
    let:index
  >
    {setTracks(items)}
    <ItemCard {items} {item} {index} />
  </Items>
</ion-item-group>
