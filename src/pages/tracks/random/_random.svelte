<script lang="ts">
import ItemCard from "./../_item-card.svelte";
import AddAppleMusicPlaylistButton from "~/components/add-apple-music-playlist-button.svelte";
import Items from "~/components/items.svelte";
import type {
  Track, TracksQueryVariables
} from "~/graphql/types";
import { TracksDocument } from "~/graphql/types";

const variables: TracksQueryVariables = {
  conditions: { random: true },
  cursor: { limit: 45 }
};

let tracks: Track[] = [];

const setTracks = (ts: Track[]) => {

  if (tracks.length > 0) {

    return "";

  }

  tracks = ts;
  return "";

};
</script>

<ion-item-group>
  <ion-item-divider sticky>
    <ion-label>Random Music</ion-label>
  </ion-item-divider>

  <AddAppleMusicPlaylistButton
    name="Random"
    description={`${location.origin}/tracks/random`}
    {tracks}
  />
  <ion-item-divider sticky>
    <ion-label>Tracks</ion-label>
  </ion-item-divider>

  <Items
    id="random-tracks"
    {variables}
    type="track"
    document={TracksDocument}
    let:items
    let:item
    let:index
  >
    {setTracks(items)}
    <ItemCard {items} {item} {index} />
  </Items>
</ion-item-group>
