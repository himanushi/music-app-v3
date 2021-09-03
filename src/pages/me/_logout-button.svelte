<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import Message from "~/components/toast-messages/message.svelte";
import { toasts } from "~/components/toasts.svelte";
import {
  LogoutDocument, MeDocument
} from "~/graphql/types";
import type {
  LogoutMutationVariables, LogoutMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";

let messages: Record<string, string[]> = {};

const mutate =
  mutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);

const logout = async () => {

  try {

    await mutate({
      refetchQueries: [{ query: MeDocument }],
      variables: { input: {} }
    });

    toasts.open({
      closeMs: 3000,
      component: Message,
      props: {
        text: "ログアウトしました",
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

<ion-item button on:click={logout}>
  <ion-icon color="red" name="exit-outline" slot="start" />
  ログアウト
</ion-item>
