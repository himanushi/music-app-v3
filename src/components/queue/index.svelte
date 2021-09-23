<script lang="ts">
import { goto } from "@roxi/routify";
import SquareImage from "../square-image.svelte";
import AddPlaylistButton from "~/components/add-playlist-button.svelte";
import Favorite from "~/components/favorite.svelte";
import { canPlay } from "~/components/play-button.svelte";
import { closeModal } from "~/lib/ionic";
import { playerService } from "~/machines/jukebox-machine";
import ModalContent from "~/pages/_modal-content.svelte";

$: tracks = $playerService.context.tracks.map((track) => track);
$: playbackNo = $playerService.context.currentPlaybackNo;

const decide = (
  event: CustomEvent & {
    detail: { from: number; to: number; complete: Function };
  }
) => {

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

const remove = (index: number) => () => {

  playerService.send({
    removeIndex: index,
    type: "REMOVE"
  });

  tracks = tracks.filter((_, idx) => idx !== index);

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
<ModalContent>
  <ion-reorder-group on:ionItemReorder={decide} disabled={false}>
    {#each tracks as track, index}
      <ion-item>
        <ion-reorder slot="start">
          <ion-icon name="reorder-two" />
        </ion-reorder>
        <ion-thumbnail slot="start" on:click|preventDefault|stopPropagation>
          <SquareImage src={track.artworkM.url} />
        </ion-thumbnail>
        <ion-buttons
          slot="start"
          class="playButton"
          on:click|preventDefault|stopPropagation
        >
          {#if playbackNo === index}
            <ion-button>
              <ion-icon slot="icon-only" color="main" name="musical-note" />
            </ion-button>
          {:else}
            <ion-button disabled={!$canPlay} on:click={play(index)}>
              <ion-icon slot="icon-only" name="play" />
            </ion-button>
          {/if}
        </ion-buttons>
        <ion-label>{track.name}</ion-label>
        <ion-buttons slot="end">
          <Favorite type="track" id={track.id} />
          <ion-button on:click={remove(index)}>
            <ion-icon name="trash-outline" color="red" />
          </ion-button>
        </ion-buttons>
      </ion-item>
    {/each}
  </ion-reorder-group>
</ModalContent>

<style lang="scss">
.playButton {
  position: absolute;
  left: calc(var(--padding-start) + var(--ion-safe-area-left, 0px) + 45px);
}
</style>
