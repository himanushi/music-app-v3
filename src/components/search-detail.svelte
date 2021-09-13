<script lang="ts">
import { closeModal } from "~/lib/ionic";
import ModalContent from "~/pages/_modal-content.svelte";

export let title: string;
export let onClick: () => void;

const click = async () => {

  await closeModal();
  onClick();

};
</script>

<ion-header>
  <ion-toolbar>
    <ion-title>{title}</ion-title>
  </ion-toolbar>
</ion-header>
<ModalContent>
  <ion-list>
    <slot />
    <ion-item button on:click={click}>
      <ion-icon name="search-outline" slot="start" />
      検索
    </ion-item>
  </ion-list>
</ModalContent>
<ion-footer>
  <ion-toolbar color="main">
    <ion-thumbnail />
  </ion-toolbar>
</ion-footer>
