<script>
import ChangePage from "./_change-page.svelte";
</script>

<main data-routify="scroll-lock">
  <ChangePage />
  <ion-cotent>
    <slot />
  </ion-cotent>
</main>
