<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputText from "~/components/input-item.svelte";
import Message from "~/components/toast-messages/message.svelte";
import { toasts } from "~/components/toasts.svelte";
import {
  UpdateMeDocument, MeDocument
} from "~/graphql/types";
import type {
  UpdateMeMutationVariables,
  UpdateMeMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";

export let name: string;
let currentPassword: string;
let newPassword: string;
let newPasswordConfirmation: string;
let messages: Record<string, string[]> = {};

const mutate =
  mutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument);

const signup = async () => {

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

    toasts.open({
      closeMs: 3000,
      component: Message,
      props: {
        text: "更新しました",
        type: "success"
      }
    });

    $goto("/me");

  } catch (error) {

    if (error instanceof ApolloError) {

      messages = errorMessages(error);

    }

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

    <ion-item button on:click={signup} messages={messages._}>
      <ion-icon name="build-outline" slot="start" />
      更新する
    </ion-item>
  </ion-item-group>

  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>Password</ion-label>
    </ion-item-divider>
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

    <ion-item button on:click={signup} messages={messages._}>
      <ion-icon name="build-outline" slot="start" />
      更新する
    </ion-item>
  </ion-item-group>
</ion-list>
