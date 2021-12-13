<script>
export let iconName = "chevron-back-outline";

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
    <ion-icon name={iconName} />
  </ion-fab-button>
</ion-fab>
