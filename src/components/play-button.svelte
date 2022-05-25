<script context="module">
// 連続再生するとバグので、Webアプリ全体で連続再生できないようにしておく
import { writable } from "svelte/store";

const createCanPlay = () => {
  const { subscribe, update } = writable<boolean>(true);

  return {
    play: () => {
      update(() => false);
      setTimeout(() => update(() => true), 1000);
    },
    subscribe,
    update,
  };
};

export const canPlay = createCanPlay();
</script>

<script lang="ts">
import { playerService } from "~/machines/jukebox-machine";
import type { JukeboxTrack } from "~/machines/jukebox-machine";

export let name: string;
export let index: number;
export let tracks: JukeboxTrack[];

const onClick = () => {
  canPlay.play();

  playerService.send([
    {
      name,
      type: "SET_NAME",
    },
    {
      link: location.pathname + location.search,
      type: "SET_LINK",
    },
    {
      currentPlaybackNo: index,
      tracks: tracks.map((track) => track),
      type: "REPLACE_AND_PLAY",
    },
  ]);
};
</script>

<ion-button disabled={!$canPlay} on:click={onClick}>
  <ion-icon name="play" />
</ion-button>
