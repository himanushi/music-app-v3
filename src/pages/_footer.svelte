<script lang="ts">
import { fly } from "svelte/transition";
import { canPlay } from "~/components/play-button.svelte";
import { openPlayer } from "~/components/player.svelte";
import SquareImage from "~/components/square-image.svelte";
import { playerService } from "~/machines/jukebox-machine";

$: track = $playerService.context.currentTrack;
$: disabled = $playerService.value === "loading" || !$canPlay;

const play_or_pause = () => playerService.send("PLAY_OR_PAUSE");
const skip = () => playerService.send("NEXT_PLAY");
const showPlayer = () => openPlayer();
</script>

<ion-footer
  class="footer"
  transition:fly={{
    duration: 200,
    opacity: 100,
    y: 56,
  }}
>
  <ion-toolbar color="main">
    {#if track && playerService}
      {#key track.id}
        <ion-thumbnail on:click={showPlayer} slot="start">
          <SquareImage src={track.artworkM.url ?? undefined} />
        </ion-thumbnail>
        <ion-title on:click={showPlayer}>{track.name}</ion-title>
        <ion-buttons slot="end">
          <ion-button {disabled} on:click={play_or_pause}>
            {#if $playerService.value === "playing"}
              <ion-icon name="pause" />
            {:else if $playerService.value === "loading"}
              <ion-icon name="sync" />
            {:else}
              <ion-icon name="play" />
            {/if}
          </ion-button>
          <ion-button {disabled} on:click={skip}>
            <ion-icon name="play-forward" />
          </ion-button>
        </ion-buttons>
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
