<script lang="ts">
import { query } from "svelte-apollo";
import CenterItem from "~/components/center-item.svelte";
import Favorite from "~/components/favorite.svelte";
import LoadingItems from "~/components/loading-items.svelte";
import Image from "~/components/square-image.svelte";
import { ArtistDocument } from "~/graphql/types";
import type {
  ArtistObject,
  ArtistQuery,
  AlbumsQueryVariables,
  StatusEnum,
} from "~/graphql/types";
import type { CurrentUserObject } from "~/graphql/types";
import { isAllowed } from "~/lib/me";
import Albums from "~/pages/albums/_albums.svelte";

export let id = "";
export let me: CurrentUserObject | undefined;
export let loaded: boolean;

const artistQuery = query<ArtistQuery>(ArtistDocument, {
  fetchPolicy: "cache-first",
  variables: { id },
});

let artist: ArtistObject | undefined;
let variables: AlbumsQueryVariables | undefined;

let first = true;
$: if (me && $artistQuery.data && first) {
  loaded = true;

  artist = $artistQuery.data.artist as ArtistObject;
  let status: StatusEnum[] = ["ACTIVE"];
  if (isAllowed(me, "changeArtistStatus")) {
    status = ["ACTIVE", "IGNORE", "PENDING"];
  }
  variables = {
    conditions: {
      artistIds: [id],
      status,
    },
    sort: {
      direction: "DESC",
      order: "RELEASE",
    },
  };

  first = false;
}
</script>

<ion-item-group>
  <ion-item-divider sticky>
    <ion-label>Artist</ion-label>
  </ion-item-divider>
  <CenterItem>
    <Image src={artist?.artworkL?.url} />
  </CenterItem>
  {#if artist}
    {#if artist.status !== "ACTIVE"}
      <ion-item>
        <ion-label
          color={artist.status === "PENDING" ? "yellow" : "red"}
          class="ion-text-wrap"
        >
          {artist.status}
        </ion-label>
      </ion-item>
    {/if}
    <ion-item>
      <ion-label class="ion-text-wrap">
        {artist.name}
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-buttons slot="end">
        <Favorite type="artist" id={artist.id} />
      </ion-buttons>
    </ion-item>
  {:else}
    <LoadingItems count={2} />
  {/if}

  <ion-item-divider sticky>
    <ion-label>Albums</ion-label>
  </ion-item-divider>
  {#if variables}
    <Albums {variables} />
  {:else}
    <LoadingItems />
  {/if}
</ion-item-group>
