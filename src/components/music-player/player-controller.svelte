<script lang="ts">
import { canPlay } from "../play-button.svelte";
import RepeatButton from "./repeat-button.svelte";
import { playerService } from "~/machines/jukebox-machine";

$: disabled = $playerService.value === "loading" || !$canPlay;

const playOrPause = () => {

  playerService.send("PLAY_OR_PAUSE");

};

const rewind = () => {

  playerService.send("PREVIOUS_PLAY");

};

const skip = () => {

  playerService.send("NEXT_PLAY");

};
</script>

<ion-grid>
  <ion-row>
    <ion-col class="ion-text-center">
      <ion-button shape="round" size="large" {disabled} on:click={rewind}>
        <ion-icon slot="icon-only" name="play-skip-back" />
      </ion-button>
    </ion-col>

    {#if playerService}
      <ion-col class="ion-text-center">
        <ion-button
          shape="round"
          size="large"
          {disabled}
          class="h-16 w-16"
          on:click={playOrPause}
        >
          {#if $playerService.value === "playing"}
            <ion-icon slot="icon-only" name="pause" />
          {:else if $playerService.value === "loading"}
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
