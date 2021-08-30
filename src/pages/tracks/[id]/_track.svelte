<script lang="ts">
import { query } from "svelte-apollo";
import Image from "~/components/square-image.svelte";
import { TrackDocument } from "~/graphql/types";
import type {
  Track,
  TrackQuery,
  ArtistsQueryVariables,
  AlbumsQueryVariables
} from "~/graphql/types";
import { convertTime } from "~/lib/convert";
import Albums from "~/pages/albums/_albums.svelte";
import Artists from "~/pages/artists/_artists.svelte";
import ItemCard from "~/pages/tracks/_item-card.svelte";

export let id = "";

const trackQuery = query<TrackQuery>(TrackDocument, {
  fetchPolicy: "cache-first",
  variables: { id }
});

let track: Track | undefined;

$: if ($trackQuery.data) {

  track = $trackQuery.data.track as Track;

}

let artistsVariables: ArtistsQueryVariables;
$: artistsVariables = {
  conditions: { tracks: { id: [id] } },
  sort: {
    order: "POPULARITY",
    type: "DESC"
  }
};

let albumsVariables: AlbumsQueryVariables;
$: albumsVariables = {
  conditions: { tracks: { id: [id] } },
  sort: {
    order: "NEW",
    type: "DESC"
  }
};
</script>

{#if track && track.artworkL.url}
  <ion-item-group>
    <ion-item-divider>
      <ion-label>Track</ion-label>
    </ion-item-divider>
    <Image src={track.artworkL.url} />
    <ion-item>
      <ion-label class="ion-text-wrap">
        {track.name}
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap"> 再生時間 </ion-label>
      <ion-note slot="end">
        {convertTime(track.durationMs)}
      </ion-note>
    </ion-item>
  </ion-item-group>

  <ion-item-group>
    <ion-item-divider>
      <ion-label>Tracks</ion-label>
    </ion-item-divider>
    <ItemCard name={track.name} item={track} items={[track]} index={0} />
  </ion-item-group>

  <ion-item-group>
    <ion-item-divider>
      <ion-label>Artists</ion-label>
    </ion-item-divider>
    <Artists variables={artistsVariables} />
  </ion-item-group>

  <ion-item-group>
    <ion-item-divider>
      <ion-label>Albums</ion-label>
    </ion-item-divider>
    <Albums variables={albumsVariables} />
  </ion-item-group>
{/if}
