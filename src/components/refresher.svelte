<script lang="ts">
export let refresh: () => void;

let refresher: HTMLElement;
$: if (refresher && !refresher.slot) {

  refresher.setAttribute("slot", "fixed");

}

const ionRefresh = () => {

  refresh();
  refresher.complete();

};
</script>

<ion-refresher bind:this={refresher} on:ionRefresh={ionRefresh}>
  <ion-refresher-content refreshing-spinner="lines" />
</ion-refresher>
