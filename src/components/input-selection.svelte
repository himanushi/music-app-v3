<script lang="ts">
import type { SelectChangeEventDetail } from "@ionic/core";

export let label: string;
export let value: string;
export let items: { value: string; label: string }[];

const onChange = (event: CustomEvent<SelectChangeEventDetail<any>>) => {
  if (event.detail.value) {
    value = event.detail.value;
  }
};
</script>

<ion-item>
  <ion-label position="stacked">{label}</ion-label>
  <ion-select
    {value}
    on:ionChange={onChange}
    ok-text="変更"
    cancel-text="キャンセル"
  >
    {#each items as item}
      <ion-select-option value={item.value}>
        {item.label}
      </ion-select-option>
    {/each}
  </ion-select>
</ion-item>
