<script>
let component: HTMLElement;
$: if (component) {

  component.setAttribute("slot", "fixed");

}
</script>

<ion-fab vertical="bottom" horizontal="start" bind:this={component}>
  <ion-fab-button>
    <ion-icon name="chevron-back-outline" />
  </ion-fab-button>
</ion-fab>
