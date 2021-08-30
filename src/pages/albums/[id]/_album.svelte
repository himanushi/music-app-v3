<script lang="ts">
import { query } from "svelte-apollo";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
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

$: if ($albumQuery.data) {

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

}
</script>

{#if album && album.artworkL.url}
  <ion-item-group>
    <ion-item-divider>
      <ion-label>Album</ion-label>
    </ion-item-divider>

    <Image src={album.artworkL.url} />

    {#if album.status !== "ACTIVE"}
      <ion-item>
        Status : {album.status}
      </ion-item>
    {/if}
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
      <ion-label class="ion-text-wrap">
        発売日/配信日 : {convertDate(album.releaseDate)}
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap">
        曲数: {album.tracks.length}曲
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap">
        再生時間 : {convertTime(toMs(album.tracks))}
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-buttons>
        <Favorite type="album" id={album.id} />
        <AddPlaylistButton tracks={album.tracks.map((track) => track)} />
      </ion-buttons>
    </ion-item>
  </ion-item-group>

  <ion-item-group>
    <ion-item-divider>
      <ion-label>Music Services</ion-label>
    </ion-item-divider>
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
  </ion-item-group>

  <ion-item-group>
    <ion-item-divider>
      <ion-label>Tracks</ion-label>
    </ion-item-divider>

    {#each album.tracks as track, index (track.id)}
      <ItemCard
        viewImage={false}
        name={album.name}
        item={track}
        items={album.tracks.map((trk) => trk)}
        {index}
      />
    {/each}
  </ion-item-group>

  <ion-item-group>
    <ion-item-divider>
      <ion-label>Artists</ion-label>
    </ion-item-divider>

    {#if variables}
      <Artists {variables} />
    {/if}
  </ion-item-group>
{/if}
