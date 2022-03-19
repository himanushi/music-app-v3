<script>
import { goto } from "@roxi/routify";
import AddPlaylistButton from "../add-playlist-button.svelte";
import CenterItem from "../center-item.svelte";
import Favorite from "../favorite.svelte";
import SquareImage from "../square-image.svelte";
import PlayerController from "./player-controller.svelte";
import SeekBar from "./seek-bar.svelte";
import { closeModal } from "~/lib/ionic";
import { playerService } from "~/machines/jukebox-machine";
import ModalContent from "~/pages/_modal-content.svelte";

$: player = $playerService.context.musicPlayerRef;

const link = () => {
  (async () => {
    if ($player && $player.context.track?.id) {
      const { id } = $player.context.track;
      await closeModal();
      $goto("/tracks/:id", { id });
    }
  })();
};
</script>

<ion-header translucent>
  <ion-toolbar>
    {#if $player && $player.context.track}
      <ion-buttons slot="start">
        <AddPlaylistButton tracks={[$player.context.track]} />
      </ion-buttons>
      <ion-title>{$player.context.track.name || ""}</ion-title>
      <ion-buttons slot="end">
        <Favorite type="track" id={$player.context.track.id} />
        <ion-button size="large" on:click={link}>
          <ion-icon slot="icon-only" name="link" />
        </ion-button>
      </ion-buttons>
    {/if}
  </ion-toolbar>
</ion-header>
<ModalContent>
  <CenterItem>
    {#if $player && $player.context.track}
      <SquareImage src={$player.context.track.artworkL?.url ?? undefined} />
    {:else}
      <SquareImage />
    {/if}
  </CenterItem>

  <SeekBar />
  <PlayerController />
</ModalContent>
