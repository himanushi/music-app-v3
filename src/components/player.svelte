<script context="module" lang="ts">
import { writable } from "svelte/store";
export const openPlayer = writable<boolean>(false);
</script>

<script lang="ts">
import {
  isOpenModal, openModal, closeModal
} from "~/lib/ionic";
let component: HTMLElement;
$: if (component) {

  if ($openPlayer) {

    openModal(component);

  } else if (isOpenModal()) {

    console.log(component);
    closeModal();
    console.log(component);

  }

}
</script>

<!-- Modal -->
<span style="display:none">
  <span bind:this={component}>
    <ion-tabs>
      <ion-tab tab="music">
        <ion-header translucent>
          <ion-toolbar>
            <ion-title>Music</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content fullscreen class="ion-padding">
          <h1>Music</h1>
        </ion-content>
      </ion-tab>

      <ion-tab tab="movies">
        <ion-header translucent>
          <ion-toolbar>
            <ion-title>Movies</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content fullscreen class="ion-padding">
          <h1>Movies</h1>
        </ion-content>
      </ion-tab>

      <ion-tab tab="games">
        <ion-header translucent>
          <ion-toolbar>
            <ion-title>Games</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content fullscreen class="ion-padding">
          <h1>Games</h1>
        </ion-content>
      </ion-tab>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="music">
          <ion-label>Music</ion-label>
          <ion-icon name="musical-note" />
        </ion-tab-button>
        <ion-tab-button tab="movies">
          <ion-label>Movies</ion-label>
          <ion-icon name="videocam" />
        </ion-tab-button>
        <ion-tab-button on:click={() => openPlayer.set(false)} tab="games">
          <ion-label>Games</ion-label>
          <ion-icon name="game-controller" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </span>
</span>
