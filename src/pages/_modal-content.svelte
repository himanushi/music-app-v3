<script>
import { closeModal } from "~/lib/ionic";
const close = () => closeModal();
</script>

<ion-content>
  <slot />
  <ion-fab vertical="bottom" horizontal="start" slot="fixed">
    <ion-fab-button on:click={close}>
      <ion-icon name="close" />
    </ion-fab-button>
  </ion-fab>
</ion-content>

<style lang="scss">
// ion-fab 56px + padding 10px * 2
ion-content {
  --padding-bottom: 76px;
}
</style>
