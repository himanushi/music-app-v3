<script lang="ts">
import { openModal } from "~/lib/ionic";

export let component: HTMLElement;
let fab: HTMLElement;
$: if (fab) {
  fab.setAttribute("slot", "fixed");
}
</script>

<ion-fab vertical="bottom" horizontal="end" bind:this={fab}>
  <ion-fab-button on:click={() => openModal({ component })}>
    <ion-icon name="search-outline" />
  </ion-fab-button>
</ion-fab>
