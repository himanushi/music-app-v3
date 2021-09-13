<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputCheckbox from "~/components/input-checkbox.svelte";
import Messages from "~/components/messages.svelte";
import { CreateRadioDocument } from "~/graphql/types";
import type {
  Radio,
  CreateRadioMutationVariables,
  CreateRadioMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import { openToast } from "~/lib/ionic";

export let id: string;
let random = false;
let messages: Record<string, string[]> = {};
let disabled = false;

const mutate =
  mutation<CreateRadioMutation, CreateRadioMutationVariables>(
    CreateRadioDocument
  );

const live = async () => {

  disabled = true;

  try {

    const result = await mutate({ variables: { input: {
      playlistId: id,
      random
    } } });

    const radio = result?.data?.createRadio?.radio as Radio;

    openToast({
      color: "green",
      duration: 3000,
      message: "ラジオの放送を開始しました"
    });

    $goto("/radios/:id", { id: radio.id });

  } catch (error) {

    disabled = false;

    if (error instanceof ApolloError) {

      messages = errorMessages(error);

    }

  }

};
</script>

<ion-list>
  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>Radio</ion-label>
    </ion-item-divider>
    <form on:submit|preventDefault>
      <InputCheckbox
        label="ランダム放送"
        bind:checked={random}
        errorMessages={messages.random}
      />
      <Messages
        messages={["ランダム放送を有効にするとプレイリストの順序がランダムで放送されます"]}
      />

      <ion-item button {disabled} on:click={live}>
        <ion-icon color="red" name="radio" slot="start" />
        放送開始
      </ion-item>
      <Messages messages={messages._} />
    </form>
  </ion-item-group>
</ion-list>
