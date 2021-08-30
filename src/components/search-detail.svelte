<script lang="ts">
import { closeModal } from "~/lib/ionic";

export let title: string;
export let onClick: () => void;

const click = () => {

  onClick();
  closeModal();

};
</script>

<ion-content>
  <ion-header>
    <ion-toolbar>
      <ion-title>{title}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <slot />
    <ion-button on:click={click}>
      <ion-icon name="search-outline" />
    </ion-button>
  </ion-content>
</ion-content>
