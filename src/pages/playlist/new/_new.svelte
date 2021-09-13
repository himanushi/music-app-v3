<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputText from "~/components/input-item.svelte";
import Messages from "~/components/messages.svelte";
import { UpsertPlaylistDocument } from "~/graphql/types";
import type {
  UpsertPlaylistMutationVariables,
  UpsertPlaylistMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";

const upsertPlaylist = mutation<
  UpsertPlaylistMutation,
  UpsertPlaylistMutationVariables
>(UpsertPlaylistDocument);

let name = "";
let description = "";
let messages: Record<string, string[]> = {};
let disabled = false;

const create = async () => {

  disabled = true;

  try {

    await upsertPlaylist({ variables: { input: {
      description,
      name,
      publicType: "NON_OPEN",
      trackIds: []
    } } });

    $goto("/playlist", { pm: "1" });

  } catch (error) {

    if (error instanceof ApolloError) {

      messages = errorMessages(error);

    }

  } finally {

    disabled = false;

  }

};
</script>

<ion-list>
  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>Create Playlist</ion-label>
    </ion-item-divider>
    <form on:submit|preventDefault>
      <InputText
        label="タイトル"
        bind:value={name}
        errorMessages={messages.name}
      />

      <InputText
        label="説明"
        bind:value={description}
        errorMessages={messages.description}
      />

      <Messages type="error" messages={messages.publicType} />

      <ion-item {disabled} button on:click={create}>
        <ion-icon name="add" slot="start" />
        保存
      </ion-item>
      <Messages type="error" messages={messages._} />
    </form>
  </ion-item-group>
</ion-list>
