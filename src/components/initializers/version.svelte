<script lang="ts">
import { Capacitor } from "@capacitor/core";
import { onMount } from "svelte";
import { openModal } from "~/lib/ionic";
import { updateVersionForWeb, needsUpdateForIos } from "~/lib/version";

const openAppStore = () => {
  window.open(
    "https://itunes.apple.com/jp/app/apple-store/id1589081888",
    "_blank"
  );
};

let component: HTMLElement;
onMount(async () => {
  if (Capacitor.getPlatform() === "web") {
    updateVersionForWeb();
  } else if (Capacitor.getPlatform() === "ios" && await needsUpdateForIos()) {
    openModal({
      backdropDismiss: false,
      component,
    });
  }
});
</script>

<!-- Modal -->
<span style="display:none;">
  <span bind:this={component}>
    <ion-header>
      <ion-toolbar />
    </ion-header>
    <ion-content>
      <ion-item lines="none" />
      <ion-item lines="none" />
      <ion-item lines="none" />
      <ion-item lines="none" />
      <ion-item lines="none">
        <ion-icon name="information-circle-outline" slot="start" color="blue" />
        アップデートがあります。App Store にて更新お願いします。
      </ion-item>
      <div class="updateButton">
        <ion-button size="large" on:click={openAppStore}>
          <ion-icon name="logo-apple-appstore" slot="start" color="blue" />
          アップデート
        </ion-button>
      </div>
    </ion-content>
    <ion-footer>
      <ion-toolbar />
    </ion-footer>
  </span>
</span>

<style lang="scss">
.updateButton {
  text-align: center;
  padding: 20px;
}
</style>
