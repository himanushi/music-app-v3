<script lang="ts">
import { Clipboard } from "@capacitor/clipboard";
import { openToast } from "~/lib/ionic";

export let name: string;

const copy = async () => {
  await Clipboard.write({
    string: name,
  });
  openToast({
    color: "light-green",
    duration: 1000,
    message: "クリップボードにコピーしました",
  });
};
</script>

<ion-item on:click={copy} button detail={false}>
  <ion-label class="ion-text-wrap">
    {name}
  </ion-label>
  <ion-icon slot="end" name="clipboard-outline" color="gray" />
</ion-item>
