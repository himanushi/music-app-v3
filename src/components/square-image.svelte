<script lang="ts">
export let src: string | undefined = undefined;
export let alt: string | undefined = undefined;

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
