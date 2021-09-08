<script lang="ts">
import { query } from "svelte-apollo";
import Favorite from "~/components/favorite.svelte";
import Image from "~/components/square-image.svelte";
import { ArtistDocument } from "~/graphql/types";
import type {
  Artist,
  ArtistQuery,
  AlbumsQueryVariables,
  StatusEnum
} from "~/graphql/types";
import Albums from "~/pages/albums/_albums.svelte";

export let id = "";

const artistQuery = query<ArtistQuery>(ArtistDocument, {
  fetchPolicy: "cache-first",
  variables: { id }
});

let artist: Artist | undefined;
let variables: AlbumsQueryVariables | undefined;

let first = true;
$: if ($artistQuery.data && first) {

  artist = $artistQuery.data.artist as Artist;
  let status: StatusEnum[] = ["ACTIVE"];
  if (artist.status !== "ACTIVE") {

    status = [
      "ACTIVE",
      "IGNORE",
      "PENDING"
    ];

  }
  variables = {
    conditions: {
      artists: { id: [id] },
      status
    },
    sort: {
      order: "RELEASE",
      type: "DESC"
    }
  };

  first = false;

}
</script>

<ion-item-group>
  <ion-item-divider sticky>
    <ion-label>Artist</ion-label>
  </ion-item-divider>
  <Image src={artist?.artworkL?.url} />
  <ion-item>
    {#if artist}
      <ion-label class="ion-text-wrap">
        {artist.name}
      </ion-label>
    {:else}
      <ion-skeleton-text animated />
    {/if}
  </ion-item>
  <ion-item>
    {#if artist}
      <ion-buttons slot="end">
        <Favorite type="artist" id={artist.id} />
      </ion-buttons>
    {:else}
      <ion-skeleton-text animated />
    {/if}
  </ion-item>
</ion-item-group>

<ion-item-group>
  <ion-item-divider sticky>
    <ion-label>Albums</ion-label>
  </ion-item-divider>
  {#if variables}
    <Albums {variables} />
  {:else}
    <ion-item>
      <ion-skeleton-text animated />
    </ion-item>
  {/if}
</ion-item-group>
