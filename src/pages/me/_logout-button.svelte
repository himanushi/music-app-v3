<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import Messages from "~/components/messages.svelte";
import {
  LogoutDocument, MeDocument
} from "~/graphql/types";
import type {
  LogoutMutationVariables, LogoutMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import { openToast } from "~/lib/ionic";

let messages: Record<string, string[]> = {};
let disabled = false;

const mutate =
  mutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);

const logout = async () => {

  disabled = true;
  try {

    await mutate({
      refetchQueries: [{ query: MeDocument }],
      variables: { input: {} }
    });

    openToast({
      color: "light-green",
      duration: 3000,
      message: "ログアウトしました"
    });

    $goto("/me");

  } catch (error) {

    disabled = false;

    if (error instanceof ApolloError) {

      messages = errorMessages(error);

    }

  }

};
</script>

<ion-item {disabled} button on:click={logout}>
  <ion-icon color="red" name="exit-outline" slot="start" />
  ログアウト
</ion-item>
<Messages type="error" messages={messages._} />
