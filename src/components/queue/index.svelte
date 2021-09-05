<script lang="ts">
import { goto } from "@roxi/routify";
import IconButton from "../icon-button.svelte";
import { modals } from "../modals.svelte";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import DndSelection from "~/components/dnd-selection.svelte";
import type { ItemsType } from "~/components/dnd-selection.svelte";
import { canPlay } from "~/components/play-button.svelte";
import Text from "~/components/text.svelte";
import type { Track } from "~/graphql/types";
import Link from "~/icons/link.svelte";
import MusicNote from "~/icons/music-note.svelte";
import Play from "~/icons/play.svelte";
import { closeModal } from "~/lib/ionic";
import { playerService } from "~/machines/jukebox-machine";
import Content from "~/pages/_content.svelte";

let tracks = $playerService.context.tracks.map((track) => track);
$: playbackNo = $playerService.context.currentPlaybackNo;

const decide = (
  event: CustomEvent & {
    detail: { from: number; to: number; complete: Function };
  }
) => {

  console.log({
    from: event.detail.from,
    playbackNo,
    to: event.detail.to
  });
  playerService.send({
    from: event.detail.from,
    to: event.detail.to,
    type: "MOVE"
  });

  tracks = event.detail.complete(tracks);

};

const play = (currentPlaybackNo: number) => () => {

  canPlay.play();

  playerService.send({
    currentPlaybackNo,
    type: "CHANGE_PLAYBACK_NO"
  });

};

const remove = (
  event: CustomEvent & {
    detail: { index: number };
  }
) => {

  playerService.send({
    removeIndex: event.detail.index,
    type: "REMOVE"
  });

};

const link = () => {

  (async () => {

    await closeModal();
    $goto($playerService.context.link);

  })();

};
</script>

{#if playerService}
  <ion-header translucent>
    <ion-toolbar>
      <ion-title>{$playerService.context.name}</ion-title>
      <ion-buttons slot="end">
        <ion-button size="large" on:click={link}>
          <ion-icon slot="icon-only" name="link" />
        </ion-button>
        <AddPlaylistButton {tracks} />
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
{/if}
<Content>
  <ion-reorder-group on:ionItemReorder={decide} disabled={false}>
    {#each tracks as track, index}
      <ion-item>
        <ion-reorder slot="start">
          <ion-icon name="reorder-two" />
        </ion-reorder>
        <ion-buttons slot="start">
          {#if playbackNo === index}
            <ion-button size="large">
              <ion-icon slot="icon-only" color="main" name="musical-note" />
            </ion-button>
          {:else}
            <ion-button disabled={!$canPlay} on:click={play(index)}>
              <ion-icon name="play" />
            </ion-button>
          {/if}
        </ion-buttons>
        <ion-label>{track.name}</ion-label>
      </ion-item>
    {/each}
  </ion-reorder-group>
</Content>
