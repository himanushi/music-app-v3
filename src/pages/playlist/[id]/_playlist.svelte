<script lang="ts">
import { query } from "svelte-apollo";
import CreateRadioButton from "./_create-radio-button.svelte";
import DeleteButton from "./_delete-button.svelte";
import EditButton from "./_edit-button.svelte";
import AddAppleMusicPlaylistButton from "~/components/add-apple-music-playlist-button.svelte";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import Image from "~/components/square-image.svelte";
import TwitterButton from "~/components/twitter-button.svelte";
import { PlaylistDocument } from "~/graphql/types";
import type {
  Playlist, PlaylistQuery
} from "~/graphql/types";
import {
  convertDate, convertTime, toMs
} from "~/lib/convert";
import { title } from "~/lib/variable";
import ItemCard from "~/pages/tracks/_item-card.svelte";

export let id = "";

$: playlistQuery = query<PlaylistQuery>(PlaylistDocument, {
  fetchPolicy: "no-cache",
  variables: { id }
});

let playlist: Playlist | undefined;
let isMyPlaylist = false;

$: if ($playlistQuery.data) {

  playlist = $playlistQuery.data.playlist as Playlist;
  isMyPlaylist = playlist?.isMine || false;

}

const hashtags = [
  `${title}のプレイリスト`,
  title || ""
];
</script>

{#if playlist}
  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>Playlist</ion-label>
    </ion-item-divider>

    <Image src={playlist.track?.artworkL?.url} />

    <ion-item>
      <ion-label class="ion-text-wrap">
        {playlist.name}
      </ion-label>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap">
        {playlist.description}
      </ion-label>
    </ion-item>
    {#if playlist.author}
      <ion-item>
        <ion-label class="ion-text-wrap"> 作者 </ion-label>
        <ion-note slot="end">
          {playlist.author.name}(@{playlist.author.username})
        </ion-note>
      </ion-item>
    {/if}
    <ion-item>
      <ion-label class="ion-text-wrap"> 曲数 </ion-label>
      <ion-note slot="end">
        {playlist.items.length}曲
      </ion-note>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap"> 再生時間 </ion-label>
      <ion-note slot="end">
        {convertTime(toMs(playlist.items.map((item) => item.track)))}
      </ion-note>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap"> 作成日 </ion-label>
      <ion-note slot="end">
        {convertDate(playlist.createdAt)}
      </ion-note>
    </ion-item>
    <ion-item>
      <ion-label class="ion-text-wrap"> 更新日 </ion-label>
      <ion-note slot="end">
        {convertDate(playlist.updatedAt)}
      </ion-note>
    </ion-item>
    <ion-item>
      <ion-buttons slot="end">
        <TwitterButton
          title={playlist.name}
          path={`/playlist/${playlist.id}`}
          {hashtags}
        />
        <Favorite type="playlist" id={playlist.id} />
        <AddPlaylistButton tracks={playlist.items.map((item) => item.track)} />
      </ion-buttons>
    </ion-item>
  </ion-item-group>
  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>Music Services</ion-label>
    </ion-item-divider>
    <AddAppleMusicPlaylistButton
      name={playlist.name}
      description={`${location.origin}/playlist/${playlist.id}`}
      tracks={playlist.items.map((it) => it.track)}
    />
  </ion-item-group>
  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>Tracks</ion-label>
    </ion-item-divider>
    {#each playlist.items as item, index (`${item.id}_${index}`)}
      <ItemCard
        name={playlist.name}
        item={item.track}
        items={playlist.items.map((it) => it.track)}
        {index}
      />
    {/each}
  </ion-item-group>
{/if}
