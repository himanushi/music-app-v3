<script lang="ts">
import { fly } from "svelte/transition";
import { modals } from "~/components/modals.svelte";
import Player from "~/components/player.svelte";
import SquareImage from "~/components/square-image.svelte";
import { playerService } from "~/machines/jukebox-machine";
import { radioService } from "~/machines/radio-machine";

$: track = $playerService.context.currentTrack;
$: player = $playerService.context.musicPlayerRef;
$: disabled = player && $player.value === "loading";

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

  modals.open(Player);

};

const goBack = () => window.history.go(-1);
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
    {#if track}
      {#key track.id}
        <ion-thumbnail slot="start">
          <SquareImage src={track.artworkM.url} />
        </ion-thumbnail>
        <ion-title button>{track.name}</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon name="play" />
          </ion-button>
          <ion-button>
            <ion-icon name="play-forward" />
          </ion-button>
        </ion-buttons>
      {/key}
    {:else}
      <ion-thumbnail slot="secondary">
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
