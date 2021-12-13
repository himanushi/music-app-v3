<script lang="ts">
export let src: string | null | undefined = null;
export let alt: string | null | undefined = null;

$: if (!src) {
  src = "/no-image.png";
}
</script>

<ion-img {src} {alt} />

<style lang="scss">
ion-img {
  max-width: 400px;
}
</style>
