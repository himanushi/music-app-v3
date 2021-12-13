<script>
import ChangePage from "./_change-page.svelte";
import BackButton from "~/components/back-button.svelte";
import { scrollElement } from "~/store/scroll-element";

let content: HTMLElement;
$: if (content && !$scrollElement) {
  content.getScrollElement().then((element) => {
    scrollElement.set(element);
  });
}
</script>

<ion-content bind:this={content}>
  <slot />
  <BackButton />
  {#if $scrollElement}
    <ChangePage scrollElement={$scrollElement} />
  {/if}
</ion-content>

<style lang="scss">
// ion-fab 56px + padding 10px * 2
ion-content {
  --padding-bottom: 76px;
}
</style>
