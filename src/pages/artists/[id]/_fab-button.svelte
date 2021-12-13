<script lang="ts">
import ChangeStatusButton from "./_change-status-button.svelte";

export let id: string;
export let refresh: () => void;

let fab: HTMLElement;
$: if (fab) {
  fab.setAttribute("slot", "fixed");
}
</script>

<ion-fab horizontal="end" vertical="bottom" bind:this={fab}>
  <ion-fab-button>
    <ion-icon color="red" name="terminal-outline" />
  </ion-fab-button>
  <ion-fab-list side="top">
    <ChangeStatusButton {id} {refresh} />
  </ion-fab-list>
</ion-fab>
