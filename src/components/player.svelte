<script context="module" lang="ts">
import { writable } from "svelte/store";
import { v4 as uuid } from "uuid";
const playerId = writable<string | null>(null);
export const openPlayer = () => {

  playerId.set(uuid());

};
</script>

<script lang="ts">
import Player from "~/components/music-player/index.svelte";
import Queue from "~/components/queue/index.svelte";
import Radio from "~/components/radio-player/index.svelte";
import { openModal } from "~/lib/ionic";
import { playerService } from "~/machines/jukebox-machine";

let component: HTMLElement;
let tabs: HTMLElement;

$: if (component && $playerId) {

  openModal(component);

}

const select = (tabName: string) => {

  tabs?.select(tabName);
  return "";

};
</script>

<!-- Modal -->
<span style="display:none">
  <span bind:this={component}>
    <ion-tabs bind:this={tabs}>
      {#if $playerService.context.isRadio}
        {select("radio")}
        <ion-tab tab="radio">
          <Radio />
        </ion-tab>
      {:else}
        {select("player")}
        <ion-tab tab="player">
          <Player />
        </ion-tab>
        <ion-tab tab="queue">
          <Queue />
        </ion-tab>
      {/if}

      <ion-tab-bar color="main" slot="bottom">
        {#if $playerService.context.isRadio}
          <ion-tab-button tab="radio">
            <ion-label>Radio</ion-label>
            <ion-icon color="red" name="radio" />
          </ion-tab-button>
        {:else}
          <ion-tab-button tab="player">
            <ion-label>Player</ion-label>
            <ion-icon name="musical-note" />
          </ion-tab-button>
          <ion-tab-button tab="queue">
            <ion-label>Queue</ion-label>
            <ion-icon name="list" />
          </ion-tab-button>
        {/if}
      </ion-tab-bar>
    </ion-tabs>
  </span>
</span>
