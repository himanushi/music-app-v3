<script lang="ts">
import { Capacitor } from "@capacitor/core";
import { goto } from "@roxi/routify";
import { openPlayer } from "~/components/player.svelte";
import type { ActionEnum } from "~/graphql/types";
import { closeSidebar } from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";
import { playerService } from "~/machines/jukebox-machine";

$: track = $playerService.context.currentTrack;

const showPlayer = () => {

  closeSidebar();
  openPlayer();

};

const go =
  (path: string, params: Record<string, string> = {}) => () => {

    closeSidebar();
    $goto(path, params);

  };

const myPlaylist: ActionEnum[] = [
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
      <ion-buttons slot="end">
        <ion-menu-button menu="sidebar" auto-hide={false}>
          <ion-icon name="close" />
        </ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-item-group>
      <ion-item-divider>
        <ion-label>Search</ion-label>
      </ion-item-divider>
      {#if me && isAllowed(me, "artists")}
        <ion-item button on:click={go("/artists")}>
          <ion-icon name="person-outline" slot="start" />
          <ion-label>アーティスト</ion-label>
        </ion-item>
      {/if}
      {#if me && isAllowed(me, "albums")}
        <ion-item button on:click={go("/albums")}>
          <ion-icon name="disc-outline" slot="start" />
          <ion-label>アルバム</ion-label>
        </ion-item>
      {/if}
      {#if me && isAllowed(me, "tracks")}
        <ion-item button on:click={go("/tracks")}>
          <ion-icon name="musical-note-outline" slot="start" />
          <ion-label>曲</ion-label>
        </ion-item>
      {/if}
      {#if me && isAllowed(me, "radios")}
        <ion-item button on:click={go("/radios")}>
          <ion-icon name="radio-outline" slot="start" />
          <ion-label>ラジオ</ion-label>
        </ion-item>
      {/if}
      {#if me && isAllowed(me, "tracks")}
        <ion-item button on:click={go("/tracks/random")}>
          <ion-icon src="/assets/playlist-search.svg" slot="start" />
          <ion-label>おまかせプレイリスト</ion-label>
        </ion-item>
      {/if}
      {#if me && isAllowed(me, "playlists")}
        <ion-item button on:click={go("/playlist")}>
          <ion-icon src="/assets/playlist-search.svg" slot="start" />
          <ion-label>みんなのプレイリスト</ion-label>
        </ion-item>
      {/if}
      {#if me && isAllowed(me, myPlaylist)}
        <ion-item button on:click={go("/playlist", { pm: "1" })}>
          <ion-icon src="/assets/playlist-search.svg" slot="start" />
          <ion-label>マイプレイリスト</ion-label>
        </ion-item>
      {/if}
    </ion-item-group>

    <ion-item-group>
      <ion-item-divider>
        <ion-label>Setting</ion-label>
      </ion-item-divider>
      <ion-item button on:click={go("/me")}>
        <ion-icon name="settings-outline" slot="start" />
        <ion-label>設定</ion-label>
      </ion-item>
      <ion-item button disabled={!track} on:click={showPlayer}>
        <ion-icon name="musical-notes-outline" slot="start" />
        <ion-label>ミュージックプレイヤー</ion-label>
      </ion-item>
      {#if me && isAllowed(me, "console")}
        <ion-item button on:click={go("/console")}>
          <ion-icon name="terminal-outline" slot="start" color="red" />
          <ion-label>コンソール</ion-label>
        </ion-item>
      {/if}
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
      {#if Capacitor.getPlatform() === "web"}
        <ion-item button on:click={go("/cookie-policy")}>
          <ion-label>クッキーポリシー</ion-label>
        </ion-item>
      {/if}
    </ion-item-group>
  </ion-content>
</ion-menu>

<span id="sidebar-content" />
