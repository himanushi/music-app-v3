<script>
import ChangePage from "./_change-page.svelte";
import BackButton from "~/components/back-button.svelte";

let content: HTMLElement;
let scrollElement: HTMLElement;
$: if (content && !scrollElement) {

  content.getScrollElement().then((element) => {

    scrollElement = element;

  });

}
</script>

<ion-content bind:this={content}>
  <slot />
  <BackButton />
  {#if scrollElement}
    <ChangePage bind:scrollElement />
  {/if}
</ion-content>

<style lang="scss">
// ion-fab 56px + padding 10px * 2
ion-content {
  --padding-bottom: 76px;
}
</style>
