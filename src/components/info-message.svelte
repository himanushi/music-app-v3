<script>
import Text from "~/components/text.svelte";
import Info from "~/icons/info.svelte";

let className = "";
export { className as class };
export let size: "s" | "m" = "m";
</script>

<ion-item>
  <ion-icon color="blue" name="information-circle-outline" slot="start" />
  <ion-label class="ion-text-wrap">
    <slot />
  </ion-label>
</ion-item>
