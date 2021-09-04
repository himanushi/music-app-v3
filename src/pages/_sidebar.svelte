<script lang="ts">
import {
  goto, url
} from "@roxi/routify";
import { fly } from "svelte/transition";
import IconButton from "~/components/icon-button.svelte";
import { modals } from "~/components/modals.svelte";
import Player from "~/components/player.svelte";
import Text from "~/components/text.svelte";
import ChevronLeft from "~/icons/chevron-left.svelte";
import Disc from "~/icons/disc.svelte";
import Live from "~/icons/live.svelte";
import MusicNote from "~/icons/music-note.svelte";
import Music from "~/icons/music.svelte";
import PlaylistSearch from "~/icons/playlist-search.svg";
import User from "~/icons/user.svelte";
import { closeSidebar } from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

const close = () => modals.close();

const showPlayer = () => {
  // closeSidebar();
  // openPlayer();
};

const go =
  (path: string, params: Record<string, string> = {}) => () => {

    closeSidebar();
    $goto(path, params);

  };

const myPlaylist = [
  "playlists",
  "upsertPlaylist",
  "addPlaylistItems"
];

const query = meQuery();
$: me = $query?.data?.me;
</script>

<ion-menu
  side="end"
  id="sidebar"
  menu-id="sidebar"
  content-id="sidebar-content"
>
  <ion-header>
    <ion-toolbar color="main">
      <ion-title>Menu</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-item-group>
      <ion-item-divider>
        <ion-label>Search</ion-label>
      </ion-item-divider>
      <ion-item button on:click={go("/artists")}>
        <ion-icon name="person-outline" slot="start" />
        <ion-label>アーティスト</ion-label>
      </ion-item>
      <ion-item button on:click={go("/albums")}>
        <ion-icon name="disc-outline" slot="start" />
        <ion-label>アルバム</ion-label>
      </ion-item>
      <ion-item button on:click={go("/tracks")}>
        <ion-icon name="musical-note-outline" slot="start" />
        <ion-label>曲</ion-label>
      </ion-item>
      <ion-item button on:click={go("/radios")}>
        <ion-icon name="radio-outline" slot="start" />
        <ion-label>ラジオ</ion-label>
      </ion-item>
      <ion-item button on:click={go("/tracks/random")}>
        <ion-icon src={PlaylistSearch} slot="start" />
        <ion-label>おまかせプレイリスト</ion-label>
      </ion-item>
      <ion-item button on:click={go("/playlist")}>
        <ion-icon src={PlaylistSearch} slot="start" />
        <ion-label>みんなのプレイリスト</ion-label>
      </ion-item>
      <ion-item button on:click={go("/playlist", { pm: "1" })}>
        <ion-icon src={PlaylistSearch} slot="start" />
        <ion-label>マイプレイリスト</ion-label>
      </ion-item>
    </ion-item-group>

    <ion-item-group>
      <ion-item-divider>
        <ion-label>Setting</ion-label>
      </ion-item-divider>
      <ion-item button on:click={go("/me")}>
        <ion-icon name="settings-outline" slot="start" />
        <ion-label>設定</ion-label>
      </ion-item>
      <ion-item button on:click={showPlayer}>
        <ion-icon name="musical-notes-outline" slot="start" />
        <ion-label>ミュージックプレイヤー</ion-label>
      </ion-item>
    </ion-item-group>

    <ion-item-group>
      <ion-item-divider>
        <ion-label>About</ion-label>
      </ion-item-divider>
      <ion-item button on:click={go("/about")}>
        <ion-label>このサイトについて</ion-label>
      </ion-item>
      <ion-item button on:click={go("/terms")}>
        <ion-label>利用規約</ion-label>
      </ion-item>
      <ion-item button on:click={go("/privacy")}>
        <ion-label>プレイバシーポリシー</ion-label>
      </ion-item>
      <ion-item button on:click={go("/cookie-policy")}>
        <ion-label>クッキーポリシー</ion-label>
      </ion-item>
    </ion-item-group>
  </ion-content>
</ion-menu>

<span id="sidebar-content" />
<!--
<nav
  on:click|stopPropagation
  transition:fly={{
    duration: 200,
    opacity: 100,
    x: -288
  }}
>
  <header>
    <IconButton class="h-10 w-10" on:click={close}>
      <ChevronLeft class="text-black h-5 w-5" />
    </IconButton>
    <h4>メニュー</h4>
  </header>
  <main>
    <section>
      <h5>Search</h5>
      <ul>
        {#if me && isAllowed(me, "artists")}
          <li class="clickable" on:click={go("/artists")}>
            <User class="h-5 w-5" /><Text>アーティスト</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, "albums")}
          <li class="clickable" on:click={go("/albums")}>
            <Disc class="h-5 w-5" /><Text>アルバム</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, "tracks")}
          <li class="clickable" on:click={go("/tracks")}>
            <MusicNote class="h-5 w-5" /><Text>曲</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, "radios")}
          <li class="clickable" on:click={go("/radios")}>
            <Live class="h-5 w-5" /><Text>ラジオ</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, "tracks")}
          <li class="clickable" on:click={go("/tracks/random")}>
            <PlaylistSearch class="h-5 w-5" /><Text>おまかせプレイリスト</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, "playlists")}
          <li class="clickable" on:click={go("/playlist")}>
            <PlaylistSearch class="h-5 w-5" /><Text>みんなのプレイリスト</Text>
          </li>
        {/if}
        {#if me && isAllowed(me, myPlaylist)}
          <li class="clickable" on:click={go("/playlist", { pm: "1" })}>
            <PlaylistSearch class="h-5 w-5" /><Text>マイプレイリスト</Text>
          </li>
        {/if}
        <h5>Setting</h5>
        <li class="clickable" on:click={go("/me")}>
          <User class="h-5 w-5" /><Text>設定</Text>
        </li>
        <li class="clickable" on:click={showPlayer}>
          <Music class="h-5 w-5" /><Text>ミュージックプレイヤー</Text>
        </li>
        <h5>About</h5>
        <li class="clickable" on:click={go("/about")}>このサイトについて</li>
        <li class="clickable" on:click={go("/terms")}>利用規約</li>
        <li class="clickable" on:click={go("/privacy")}>
          プレイバシーポリシー
        </li>
        <li class="clickable" on:click={go("/cookie-policy")}>
          クッキーポリシー
        </li>
      </ul>
    </section>
  </main>
</nav> -->
