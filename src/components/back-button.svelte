<script>
const back = () => {

  window.history.go(-1);

};

let component: HTMLElement;
$: if (component) {

  component.setAttribute("slot", "fixed");

}
</script>

<ion-fab vertical="bottom" horizontal="start" bind:this={component}>
  <ion-fab-button on:click={back}>
    <ion-icon name="chevron-back-outline" />
  </ion-fab-button>
</ion-fab>
