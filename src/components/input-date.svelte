<script lang="ts">
import type { DatetimeChangeEventDetail, Components } from "@ionic/core";
import Messages from "./messages.svelte";

export let value: string;
export let errorMessages: string[] | undefined = undefined;

const onChange = (event: CustomEvent<DatetimeChangeEventDetail>) => {
  if (event.detail.value) {
    value = event.detail.value.substring(0, 10);
  }
};

const onCancel = () => {
  value = "";
};

let datetimeComponent: Components.IonDatetime;

const diside = async () => {
  await datetimeComponent.confirm();
  console.log(datetimeComponent.value);
};
const goToday = async () => {
  await datetimeComponent.reset();
  await datetimeComponent.confirm();
};
const reset = async () => {
  await datetimeComponent.cancel();
};
</script>

<ion-accordion-group>
  <ion-accordion>
    <ion-item slot="header">
      <ion-label>{value}</ion-label>
    </ion-item>

    <ion-item slot="content" lines="full">
      <ion-datetime
        presentation="date"
        on:ionChange={onChange}
        on:ionCancel={onCancel}
        bind:this={datetimeComponent}
      >
        <ion-buttons slot="buttons">
          <ion-button on:click={diside}>OK</ion-button>
          <ion-button on:click={goToday}>Today</ion-button>
          <ion-button on:click={reset}>Reset</ion-button>
        </ion-buttons>
      </ion-datetime>
    </ion-item>
  </ion-accordion>
</ion-accordion-group>

{#if errorMessages}
  <Messages type="error" messages={errorMessages} />
{/if}
