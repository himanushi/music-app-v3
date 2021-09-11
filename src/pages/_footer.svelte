<script lang="ts">
import { fly } from "svelte/transition";
import { canPlay } from "~/components/play-button.svelte";
import { openPlayer } from "~/components/player.svelte";
import SquareImage from "~/components/square-image.svelte";
import { playerService } from "~/machines/jukebox-machine";
import { radioService } from "~/machines/radio-machine";

$: track = $playerService.context.currentTrack;
$: player = $playerService.context.musicPlayerRef;
$: disabled = player && ($player.value === "loading" || !$canPlay);

const play_or_pause = () => {

  playerService.send("PLAY_OR_PAUSE");

};

const skip = () => {

  playerService.send("NEXT_PLAY");

};

const stop = () => {

  playerService.send("PAUSE");

};

const live = () => {

  if ($radioService.context.id) {

    radioService.send({
      id: $radioService.context.id,
      type: "SET_ID"
    });

  }

};

const showPlayer = () => {

  openPlayer();

};
</script>

<ion-footer
  class="footer"
  transition:fly={{
    duration: 200,
    opacity: 100,
    y: 56
  }}
>
  <ion-toolbar color="main">
    {#if track && player}
      {#key track.id}
        {#if $playerService.context.isRadio}
          <ion-thumbnail on:click={showPlayer} slot="start">
            <SquareImage src={track.artworkM.url} />
          </ion-thumbnail>
          <ion-title on:click={showPlayer}>{track.name}</ion-title>
          <ion-buttons slot="end">
            {#if $player.value === "playing"}
              <ion-button {disabled} on:click={stop}>
                <ion-icon name="stop" />
              </ion-button>
            {:else if $player.value === "loading"}
              <ion-button disabled={true}>
                <ion-icon name="sync" />
              </ion-button>
            {:else}
              <ion-button {disabled} on:click={live}>
                <ion-icon color="red" name="radio" />
              </ion-button>
            {/if}
          </ion-buttons>
        {:else}
          <ion-thumbnail on:click={showPlayer} slot="start">
            <SquareImage src={track.artworkM.url} />
          </ion-thumbnail>
          <ion-title on:click={showPlayer}>{track.name}</ion-title>
          <ion-buttons slot="end">
            <ion-button {disabled} on:click={play_or_pause}>
              {#if $player.value === "playing"}
                <ion-icon name="pause" />
              {:else if $player.value === "loading" || $player.value === "playerSelecting"}
                <ion-icon name="sync" />
              {:else}
                <ion-icon name="play" />
              {/if}
            </ion-button>
            <ion-button {disabled} on:click={skip}>
              <ion-icon name="play-forward" />
            </ion-button>
          </ion-buttons>
        {/if}
      {/key}
    {:else}
      <ion-thumbnail slot="start">
        <SquareImage />
      </ion-thumbnail>
      <ion-buttons slot="end">
        <ion-button disabled>
          <ion-icon name="play" />
        </ion-button>
        <ion-button disabled>
          <ion-icon name="play-forward" />
        </ion-button>
      </ion-buttons>
    {/if}
  </ion-toolbar>
</ion-footer>
