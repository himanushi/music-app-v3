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
import { openModal } from "~/lib/ionic";

let component: HTMLElement;

$: if (component && $playerId) {
  openModal(component);
}
</script>

<!-- Modal -->
<span style="display:none">
  <span bind:this={component}>
    <ion-tabs>
      <ion-tab tab="player">
        <Player />
      </ion-tab>
      <ion-tab tab="queue">
        <Queue />
      </ion-tab>

      <ion-tab-bar color="main" slot="bottom">
        <ion-tab-button tab="player">
          <ion-label>Player</ion-label>
          <ion-icon name="musical-note" />
        </ion-tab-button>
        <ion-tab-button tab="queue">
          <ion-label>Queue</ion-label>
          <ion-icon name="list" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </span>
</span>
