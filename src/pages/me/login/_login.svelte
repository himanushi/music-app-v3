<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputText from "~/components/input-item.svelte";
import Messages from "~/components/messages.svelte";
import RecaptchaV2 from "~/components/recaptcha-v2.svelte";
import {
  LoginDocument, MeDocument
} from "~/graphql/types";
import type {
  LoginMutationVariables, LoginMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import { openToast } from "~/lib/ionic";

let currentPassword: string;
let username: string;
let recaptcha: RecaptchaV2;
let messages: Record<string, string[]> = {};
let disabled = false;

const mutate = mutation<LoginMutation, LoginMutationVariables>(LoginDocument);

const login = async () => {

  disabled = true;
  try {

    await mutate({
      refetchQueries: [{ query: MeDocument }],
      variables: { input: {
        currentPassword,
        username
      } }
    });

    openToast({
      color: "green",
      duration: 3000,
      message: "ログインしました"
    });

    $goto("/me");

  } catch (error) {

    disabled = false;

    if (error instanceof ApolloError) {

      messages = errorMessages(error);
      recaptcha.reset();

    }

  }

};
</script>

<ion-list>
  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>ログイン</ion-label>
    </ion-item-divider>
    <form on:submit|preventDefault>
      <InputText
        label="ユーザー名"
        bind:value={username}
        errorMessages={messages.username}
        autocomplete="username"
      />
      <InputText
        label="パスワード"
        type="password"
        bind:value={currentPassword}
        errorMessages={messages.currentPassword}
        autocomplete="current-password"
      />
      <RecaptchaV2 bind:this={recaptcha} />
      <Messages type="error" messages={messages.recaptcha} />

      <ion-item {disabled} on:click={login} button>
        <ion-icon color="blue" name="log-in-outline" slot="start" />
        <ion-label>ログイン</ion-label>
      </ion-item>
      <Messages type="error" messages={messages._} />
    </form>
  </ion-item-group>
</ion-list>
