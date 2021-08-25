<script lang="ts">
import { openModal } from "~/lib/ionic";
</script>

<ion-fab-button on:click={openModal("modal-albums-search")}>
  <ion-icon name="search-outline" />
</ion-fab-button>
