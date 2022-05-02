<script lang="ts">
import { Clipboard } from "@capacitor/clipboard";
import { openToast } from "~/lib/ionic";

export let name: string;
export let iconName: string | undefined = undefined;
export let iconColor: string | undefined = undefined;

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
  {#if iconName && iconColor}
    <ion-buttons slot="start">
      <ion-icon slot="icon-only" name={iconName} color={iconColor} />
    </ion-buttons>
  {/if}
  <ion-label class="ion-text-wrap">
    {name}
  </ion-label>
  <ion-icon slot="end" name="clipboard-outline" color="gray" />
</ion-item>
