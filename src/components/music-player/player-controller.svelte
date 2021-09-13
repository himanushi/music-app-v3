<script lang="ts">
import { goto } from "@roxi/routify";
import AddPlaylistButton from "../add-playlist-button.svelte";
import Favorite from "../favorite.svelte";
import RepeatButton from "./repeat-button.svelte";
import { closeModal } from "~/lib/ionic";
import { playerService } from "~/machines/jukebox-machine";

$: player = $playerService.context.musicPlayerRef;

$: disabled =
  player &&
  ($player.value === "loading" || $player.value === "playerSelecting");

const playOrPause = () => {

  playerService.send("PLAY_OR_PAUSE");

};

const rewind = () => {

  playerService.send("PREVIOUS_PLAY");

};

const skip = () => {

  playerService.send("NEXT_PLAY");

};

const link = () => {

  (async () => {

    if (player && $player.context.track?.id) {

      const { id } = $player.context.track;
      await closeModal();
      $goto("/tracks/:id", { id });

    }

  })();

};
</script>

<ion-item>
  <ion-buttons slot="end">
    {#if player && $player.context.track}
      <ion-button size="large" on:click={link}>
        <ion-icon slot="icon-only" name="link" />
      </ion-button>
      <Favorite type="track" id={$player.context.track.id} />
      <AddPlaylistButton tracks={[$player.context.track]} />
    {/if}
  </ion-buttons>
</ion-item>

<ion-grid>
  <ion-row>
    <ion-col class="ion-text-center">
      <ion-button shape="round" size="large" {disabled} on:click={rewind}>
        <ion-icon slot="icon-only" name="play-skip-back" />
      </ion-button>
    </ion-col>

    {#if player}
      <ion-col class="ion-text-center">
        <ion-button
          shape="round"
          size="large"
          {disabled}
          class="h-16 w-16"
          on:click={playOrPause}
        >
          {#if $player.value === "playing"}
            <ion-icon slot="icon-only" name="pause" />
          {:else if $player.value === "loading"}
            <ion-icon slot="icon-only" name="sync" />
          {:else}
            <ion-icon slot="icon-only" name="play" />
          {/if}
        </ion-button>
      </ion-col>
    {/if}

    <ion-col class="ion-text-center">
      <ion-button shape="round" size="large" {disabled} on:click={skip}>
        <ion-icon slot="icon-only" name="play-skip-forward" />
      </ion-button>
    </ion-col>
  </ion-row>
</ion-grid>

<ion-grid>
  <ion-row>
    <ion-col class="ion-text-center">
      <RepeatButton />
    </ion-col>
  </ion-row>
</ion-grid>
