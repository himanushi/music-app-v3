<script>
import PlayerController from "./player-controller.svelte";
import TrackInfo from "./track-info.svelte";
import ModalContent from "~/pages/_modal-content.svelte";
</script>

<ion-header translucent>
  <ion-toolbar>
    <ion-title>Radio</ion-title>
  </ion-toolbar>
</ion-header>
<ModalContent>
  <TrackInfo />
  <PlayerController />
</ModalContent>
