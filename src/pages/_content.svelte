<script>
import BackButton from "~/components/back-button.svelte";
</script>

<ion-content>
  <slot />
  <BackButton />
</ion-content>

<style lang="scss">
// ion-fab 56px + padding 10px * 2
ion-content {
  --padding-bottom: 76px;
}
</style>
