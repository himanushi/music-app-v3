<script lang="ts">
import type { CheckboxChangeEventDetail } from "@ionic/core";
import Messages from "./messages.svelte";

export let label = "";
export let errorMessages: string[] | undefined = undefined;
export let checked: boolean;

const onChange = (event: CustomEvent<CheckboxChangeEventDetail<any>>) => {
  checked = Boolean(event.detail.checked);
};
</script>

<ion-item>
  <ion-label>{label}</ion-label>
  <ion-checkbox color="main" {checked} on:ionChange={onChange} />
</ion-item>
{#if errorMessages}
  <Messages type="error" messages={errorMessages} />
{/if}
