<script lang="ts">
import { openModal } from "~/lib/ionic";

export let component: HTMLElement;
export let props: Record<string, any> = {};
let fabComponent: HTMLElement;
$: if (fabComponent) {

  fabComponent.setAttribute("slot", "fixed");

}
</script>

<ion-fab vertical="bottom" horizontal="end" bind:this={fabComponent}>
  <ion-fab-button on:click={() => openModal(component, props)}>
    <ion-icon name="search-outline" />
  </ion-fab-button>
</ion-fab>
