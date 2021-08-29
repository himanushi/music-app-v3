<script lang="ts">
import { openModal } from "~/lib/ionic";

export let name: string;
export let props: Record<string, any>;
let component: HTMLElement;
$: if (component) {

  component.setAttribute("slot", "fixed");

}
</script>

<ion-fab vertical="bottom" horizontal="end" bind:this={component}>
  <ion-fab-button on:click={openModal(name, props)}>
    <ion-icon name="search-outline" />
  </ion-fab-button>
</ion-fab>
