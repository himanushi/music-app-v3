<script lang="ts">
import { closeModal } from "~/lib/ionic";

export let title: string;
export let onClick: () => void;

const click = () => {

  onClick();
  closeModal();

};

const close = () => closeModal();
</script>

<ion-header>
  <ion-toolbar>
    <ion-title>{title}</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
    <slot />
  </ion-list>
  <ion-grid>
    <ion-row class="ion-text-center">
      <ion-col>
        <ion-button on:click={click}>
          <ion-icon name="search-outline" />
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
<ion-footer>
  <ion-toolbar color="main">
    <ion-buttons slot="end">
      <ion-button on:click={close}>
        <ion-icon name="close" />
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-footer>
