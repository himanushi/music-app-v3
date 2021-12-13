<script lang="ts">
import ChangeStatusButton from "./_change-status-button.svelte";
import DeleteButton from "./_delete-button.svelte";
import SyncButton from "./_sync-button.svelte";

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
    <SyncButton {id} {refresh} />
    <ChangeStatusButton {id} {refresh} />
    <DeleteButton {id} {refresh} />
  </ion-fab-list>
</ion-fab>
