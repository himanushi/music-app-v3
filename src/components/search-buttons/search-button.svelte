<script lang="ts">
export let href: string;
</script>

<ion-item button {href} target="_blank">
  <ion-label>
    <slot />
  </ion-label>
</ion-item>
