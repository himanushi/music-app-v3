<script lang="ts">
import { goto } from "@roxi/routify";
import AddPlaylistButton from "../add-playlist-button.svelte";
import Favorite from "../favorite.svelte";
import { closeModal } from "~/lib/ionic";
import { playerService } from "~/machines/jukebox-machine";
import { radioService } from "~/machines/radio-machine";

$: player = $playerService.context.musicPlayerRef;
$: disabled = player && $player.value === "loading";

const stop = () => playerService.send("PAUSE");

const live = () => {

  if ($radioService.context.id) {

    radioService.send({
      id: $radioService.context.id,
      type: "SET_ID"
    });

  }

};

const link = async () => {

  if (player && $player.context.track?.id) {

    await closeModal();
    const { id } = $player.context.track;
    $goto("/tracks/:id", { id });

  }

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
      {#if player}
        {#if $player.value === "playing"}
          <ion-button shape="round" size="large" {disabled} on:click={stop}>
            <ion-icon slot="icon-only" name="stop" />
          </ion-button>
        {:else if $player.value === "loading"}
          <ion-button shape="round" size="large" {disabled}>
            <ion-icon slot="icon-only" name="sync" />
          </ion-button>
        {:else}
          <ion-button shape="round" size="large" {disabled} on:click={live}>
            <ion-icon slot="icon-only" color="red" name="radio" />
          </ion-button>
        {/if}
      {/if}
    </ion-col>
  </ion-row>
</ion-grid>
