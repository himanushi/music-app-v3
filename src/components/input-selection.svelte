<script lang="ts">
export let label: string;
export let value: string;
export let items: { value: string; label: string }[];

const onChange = (event: Event) => {

  if (event?.target?.value) {

    value = event?.target?.value;

  }

};
</script>

<ion-item>
  <ion-label>{label}</ion-label>
  <ion-select {value} on:ionChange={onChange} ok-text="OK" cancel-text="Cancel">
    {#each items as item}
      <ion-select-option value={item.value}>
        {item.label}
      </ion-select-option>
    {/each}
  </ion-select>
</ion-item>
