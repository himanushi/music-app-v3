<script lang="ts">
import CreateRadioButton from "./_create-radio-button.svelte";
import DeleteButton from "./_delete-button.svelte";
import EditButton from "./_edit-button.svelte";
export let id: string;

let fab: HTMLElement;
$: if (fab) {

  fab.setAttribute("slot", "fixed");

}
</script>

<ion-fab horizontal="end" vertical="bottom" bind:this={fab}>
  <ion-fab-button>
    <ion-icon name="ellipsis-horizontal-outline" />
  </ion-fab-button>
  <ion-fab-list side="start">
    <EditButton {id} />
    <DeleteButton {id} />
    <CreateRadioButton {id} />
  </ion-fab-list>
</ion-fab>
