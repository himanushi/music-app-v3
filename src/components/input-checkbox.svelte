<script>
export let label = "";
export let errorMessages: string[] | undefined = undefined;
export let checked: boolean;

const onChange = (event: Event) => {

  if (event?.target?.value) {

    checked = event?.target?.value;

  }

};
</script>

<ion-item>
  <ion-label>{label}</ion-label>
  <ion-checkbox on:ionChange={onChange} />
</ion-item>
