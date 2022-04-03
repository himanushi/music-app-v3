<script lang="ts">
import { query } from "svelte-apollo";
import CenterItem from "~/components/center-item.svelte";
import ClipboardItem from "~/components/clipboard-item.svelte";
import LoadingItems from "~/components/loading-items.svelte";
import Image from "~/components/square-image.svelte";
import { TrackDocument } from "~/graphql/types";
import type {
  TrackObject,
  TrackQuery,
  ArtistsQueryVariables,
  AlbumsQueryVariables,
} from "~/graphql/types";
import { convertTime } from "~/lib/convert";
import Albums from "~/pages/albums/_albums.svelte";
import Artists from "~/pages/artists/_artists.svelte";
import ItemCard from "~/pages/tracks/_item-card.svelte";

export let id = "";

const trackQuery = query<TrackQuery>(TrackDocument, {
  fetchPolicy: "cache-first",
  variables: { id },
});

let track: TrackObject | undefined;
let artistsVariables: ArtistsQueryVariables;
let albumsVariables: AlbumsQueryVariables;

let first = true;
$: if ($trackQuery.data && first) {
  track = $trackQuery.data.track as TrackObject;
  artistsVariables = {
    conditions: { trackIds: [id] },
    sort: {
      direction: "DESC",
      order: "POPULARITY",
    },
  };
  albumsVariables = {
    conditions: { trackIds: [id] },
    sort: {
      direction: "DESC",
      order: "NEW",
    },
  };

  first = false;
}
</script>

<ion-item-group>
  <ion-item-divider sticky>
    <ion-label>Track</ion-label>
  </ion-item-divider>
  <CenterItem>
    <Image src={track?.artworkL.url ?? undefined} />
  </CenterItem>
  {#if track}
    <ClipboardItem name={track.name} />
    <ion-item>
      <ion-label class="ion-text-wrap"> 再生時間 </ion-label>
      <ion-note slot="end">
        {convertTime(track.durationMs)}
      </ion-note>
    </ion-item>
  {:else}
    <LoadingItems count={2} />
  {/if}

  <ion-item-divider sticky>
    <ion-label>Tracks</ion-label>
  </ion-item-divider>
  {#if track}
    <ItemCard name={track.name} item={track} items={[track]} index={0} />
  {:else}
    <LoadingItems />
  {/if}

  <ion-item-divider sticky>
    <ion-label>Artists</ion-label>
  </ion-item-divider>
  {#if artistsVariables}
    <Artists variables={artistsVariables} />
  {:else}
    <LoadingItems />
  {/if}

  <ion-item-divider sticky>
    <ion-label>Albums</ion-label>
  </ion-item-divider>
  {#if albumsVariables}
    <Albums variables={albumsVariables} />
  {:else}
    <LoadingItems />
  {/if}
</ion-item-group>
