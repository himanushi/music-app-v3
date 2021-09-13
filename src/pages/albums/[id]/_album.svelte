<script lang="ts">
import { query } from "svelte-apollo";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import LoadingItems from "~/components/loading-items.svelte";
import AmazonMusic from "~/components/search-buttons/amazon-music.svelte";
import AppleMusic from "~/components/search-buttons/apple-music.svelte";
import Itunes from "~/components/search-buttons/itunes.svelte";
import LineMusic from "~/components/search-buttons/line-music.svelte";
import Spotify from "~/components/search-buttons/spotify.svelte";
import YoutubeMusic from "~/components/search-buttons/youtube-music.svelte";
import Image from "~/components/square-image.svelte";
import { AlbumDocument } from "~/graphql/types";
import type {
  Album,
  AlbumQuery,
  ArtistsQueryVariables,
  StatusEnum
} from "~/graphql/types";
import {
  convertDate, convertTime, toMs
} from "~/lib/convert";
import Artists from "~/pages/artists/_artists.svelte";
import ItemCard from "~/pages/tracks/_item-card.svelte";

export let id = "";

const albumQuery = query<AlbumQuery>(AlbumDocument, {
  fetchPolicy: "cache-first",
  variables: { id }
});

let album: Album | undefined;
let variables: ArtistsQueryVariables | undefined;

let first = true;
$: if ($albumQuery.data && first) {

  album = $albumQuery.data.album as Album;
  let status: StatusEnum[] = ["ACTIVE"];
  if (album.status !== "ACTIVE") {

    status = [
      "ACTIVE",
      "IGNORE",
      "PENDING"
    ];

  }
  variables = {
    conditions: {
      albums: { id: [id] },
      status
    },
    sort: {
      order: "POPULARITY",
      type: "DESC"
    }
  };

  first = false;

}
</script>

<ion-item-group>
  <ion-item-divider sticky>
    <ion-label>Album</ion-label>
  </ion-item-divider>

  <Image src={album?.artworkL?.url} />

  {#if album}
    <ion-item>
      <ion-label class="ion-text-wrap">
        {album.name}
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap">
        {album.copyright}
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap"> 発売日/配信日 </ion-label>
      <ion-note slot="end">
        {convertDate(album.releaseDate)}
      </ion-note>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap"> 曲数 </ion-label>
      <ion-note slot="end">
        {album.tracks.length}曲
      </ion-note>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap"> 再生時間 </ion-label>
      <ion-note slot="end">
        {album ? convertTime(toMs(album.tracks)) : ""}
      </ion-note>
    </ion-item>
    <ion-item>
      <ion-buttons slot="end">
        <Favorite type="album" id={album.id} />
        <AddPlaylistButton tracks={album.tracks.map((track) => track)} />
      </ion-buttons>
    </ion-item>
  {:else}
    <LoadingItems count={6} />
  {/if}

  <ion-item-divider sticky>
    <ion-label>Music Services</ion-label>
  </ion-item-divider>
  {#if album}
    {#if album.appleMusicAlbum}
      <AppleMusic id={album.appleMusicAlbum.appleMusicId} />
    {/if}
    {#if album.itunesAlbum}
      <Itunes id={album.itunesAlbum.appleMusicId} />
    {/if}
    <Spotify name={album.name} />
    <AmazonMusic name={album.name} />
    <YoutubeMusic name={album.name} />
    <LineMusic name={album.name} />
  {:else}
    <LoadingItems count={6} />
  {/if}

  <ion-item-divider sticky>
    <ion-label>Tracks</ion-label>
  </ion-item-divider>

  {#if album}
    {#each album.tracks as track, index (track.id)}
      <ItemCard
        viewImage={false}
        name={album.name}
        item={track}
        items={album.tracks.map((trk) => trk)}
        {index}
      />
    {/each}
  {:else}
    <LoadingItems />
  {/if}

  <ion-item-divider sticky>
    <ion-label>Artists</ion-label>
  </ion-item-divider>

  {#if variables}
    <Artists {variables} />
  {:else}
    <LoadingItems />
  {/if}
</ion-item-group>
