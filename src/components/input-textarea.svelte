<script lang="ts">
import type { TextareaChangeEventDetail } from "@ionic/core";
import Messages from "./messages.svelte";

export let label = "";
export let value = "";
export let placeholder = "";
export let rows = 10;
export let errorMessages: string[] | undefined = undefined;

const ionChange = (event: CustomEvent<TextareaChangeEventDetail>) => {
  if (event.detail.value) {
    value = event.detail.value;
  }
};
</script>

<ion-item>
  <ion-label position="stacked">{label}</ion-label>
  <ion-textarea {value} {placeholder} {rows} on:ionChange={ionChange} />
</ion-item>
{#if errorMessages}
  <Messages type="error" messages={errorMessages} />
{/if}
