<script lang="ts">
import { query } from "svelte-apollo";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import CenterItem from "~/components/center-item.svelte";
import ClipboardItem from "~/components/clipboard-item.svelte";
import Favorite from "~/components/favorite.svelte";
import LoadingItems from "~/components/loading-items.svelte";
import AmazonMusic from "~/components/search-buttons/amazon-music.svelte";
import AppleMusic from "~/components/search-buttons/apple-music.svelte";
import Itunes from "~/components/search-buttons/itunes.svelte";
import LineMusic from "~/components/search-buttons/line-music.svelte";
import Spotify from "~/components/search-buttons/spotify.svelte";
import YoutubeMusic from "~/components/search-buttons/youtube-music.svelte";
import Image from "~/components/square-image.svelte";
import VirtualScroll from "~/components/virtual-scroll.svelte";
import { AlbumDocument } from "~/graphql/types";
import type {
  AlbumObject,
  AlbumQuery,
  ArtistsQueryVariables,
  StatusEnum,
} from "~/graphql/types";
import type { CurrentUserObject } from "~/graphql/types";
import { convertDate, convertTime, toMs } from "~/lib/convert";
import { isAllowed } from "~/lib/me";
import Artists from "~/pages/artists/_artists.svelte";
import ItemCard from "~/pages/tracks/_item-card.svelte";

export let id = "";
export let me: CurrentUserObject | undefined;
export let loaded: boolean;

const albumQuery = query<AlbumQuery>(AlbumDocument, {
  fetchPolicy: "cache-first",
  variables: { id },
});

let album: AlbumObject | undefined;
let variables: ArtistsQueryVariables | undefined;

let first = true;
$: if (me && $albumQuery.data && first) {
  loaded = true;

  album = $albumQuery.data.album as AlbumObject;
  let status: StatusEnum[] = ["ACTIVE"];
  if (isAllowed(me, "changeAlbumStatus")) {
    status = ["ACTIVE", "IGNORE", "PENDING"];
  }

  variables = {
    conditions: {
      albumIds: [id],
      status,
    },
    sort: {
      direction: "DESC",
      order: "POPULARITY",
    },
  };

  first = false;
}

$: tracks = album?.tracks.map((track) => track) || [];
</script>

<ion-item-group>
  <ion-item-divider sticky>
    <ion-label>Album</ion-label>
  </ion-item-divider>

  <CenterItem>
    <Image src={album?.artworkL?.url ?? undefined} />
  </CenterItem>

  {#if album}
    {#if album.status !== "ACTIVE"}
      <ion-item>
        <ion-label
          color={album.status === "PENDING" ? "yellow" : "red"}
          class="ion-text-wrap"
        >
          {album.status}
        </ion-label>
      </ion-item>
    {/if}
    <ClipboardItem name={album.name} />
    <ClipboardItem name={album.copyright} />
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
    {#if album.appleMusicPlayable}
      <AppleMusic id={album.appleMusicId} />
    {:else}
      <Itunes id={album.appleMusicId} />
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
    <VirtualScroll items={tracks} let:item let:index>
      <ItemCard
        name={album.name}
        {item}
        items={tracks}
        {index}
        viewImage={false}
      />
    </VirtualScroll>
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
