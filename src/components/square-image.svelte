<script lang="ts">
export let src: string | null | undefined = null;
export let alt: string | null | undefined = null;

if (!src) {

  src = "/no-image.jpeg";

}
</script>

<ion-img {src} {alt} />

<style lang="scss">
ion-img {
  max-width: 500px;
}
</style>
