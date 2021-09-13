<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputText from "~/components/input-item.svelte";
import Messages from "~/components/messages.svelte";
import {
  UpdateMeDocument, MeDocument
} from "~/graphql/types";
import type {
  UpdateMeMutationVariables,
  UpdateMeMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import { openToast } from "~/lib/ionic";

export let name: string;
let currentPassword: string;
let newPassword: string;
let newPasswordConfirmation: string;
let messages: Record<string, string[]> = {};
let disabled = false;

const mutate =
  mutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument);

const signup = async () => {

  disabled = true;
  try {

    await mutate({
      refetchQueries: [{ query: MeDocument }],
      variables: { input: {
        currentPassword,
        name,
        newPassword,
        newPasswordConfirmation
      } }
    });

    openToast({
      color: "green",
      duration: 3000,
      message: "更新しました"
    });

    $goto("/me");

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
      <ion-label>User</ion-label>
    </ion-item-divider>

    <InputText
      label="名前"
      bind:value={name}
      autocomplete="nickname"
      errorMessages={messages.name}
    />

    <ion-item {disabled} button on:click={signup}>
      <ion-icon name="build-outline" slot="start" />
      更新する
    </ion-item>
    <Messages type="error" messages={messages._} />
  </ion-item-group>

  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>Password</ion-label>
    </ion-item-divider>
    <form on:submit|preventDefault>
      <InputText
        label="現在のパスワード"
        type="password"
        bind:value={currentPassword}
        errorMessages={messages.currentPassword}
        autocomplete="current-password"
      />
      <InputText
        label="新しいパスワード"
        type="password"
        bind:value={newPassword}
        errorMessages={messages.newPassword}
        autocomplete="new-password"
      />
      <InputText
        label="新しいパスワード再確認"
        type="password"
        bind:value={newPasswordConfirmation}
        errorMessages={messages.newPasswordConfirmation}
        autocomplete="new-password"
      />

      <ion-item {disabled} button on:click={signup}>
        <ion-icon name="build-outline" slot="start" />
        更新する
      </ion-item>
      <Messages type="error" messages={messages._} />
    </form>
  </ion-item-group>
</ion-list>
