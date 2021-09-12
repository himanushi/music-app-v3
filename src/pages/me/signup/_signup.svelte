<script lang="ts">
import { ApolloError } from "@apollo/client/core";
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import InputCheckbox from "~/components/input-checkbox.svelte";
import InputText from "~/components/input-item.svelte";
import Messages from "~/components/messages.svelte";
import RecaptchaV2 from "~/components/recaptcha-v2.svelte";
import {
  SignupDocument, MeDocument
} from "~/graphql/types";
import type {
  SignupMutationVariables, SignupMutation
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import {
  closeModal, openModal, openToast
} from "~/lib/ionic";
import ModalContent from "~/pages/_modal-content.svelte";
import Terms from "~/pages/terms.svelte";

let name: string;
let username: string;
let newPassword: string;
let newPasswordConfirmation: string;
let recaptcha: RecaptchaV2;
let messages: Record<string, string[]> = {};
let term: boolean;

const mutate =
  mutation<SignupMutation, SignupMutationVariables>(SignupDocument);

const signup = async () => {

  try {

    await mutate({
      refetchQueries: [{ query: MeDocument }],
      variables: { input: {
        name,
        newPassword,
        newPasswordConfirmation,
        username
      } }
    });

    openToast({
      color: "green",
      duration: 8000,
      message: "登録しました。音楽を楽しみましょう！"
    });

    $goto("/");

  } catch (error) {

    if (error instanceof ApolloError) {

      recaptcha.reset();
      messages = errorMessages(error);

    }

  }

};

let terms: HTMLElement;
const openTerms = async () => {

  await closeModal();
  await openModal(terms);

};
</script>

<ion-list>
  <ion-item-group>
    <ion-item-divider sticky>
      <ion-label>ユーザー登録</ion-label>
    </ion-item-divider>
    <form on:submit|preventDefault>
      <InputText
        label="名前(変更可能)"
        bind:value={name}
        errorMessages={messages.name}
      />
      <InputText
        label="ユーザーID(変更不可, 半角英数 と _ のみ)"
        bind:value={username}
        errorMessages={messages.username}
        autocomplete="username"
      />
      <InputText
        label="パスワード(8文字以上, 半角英数)"
        type="password"
        bind:value={newPassword}
        errorMessages={messages.newPassword}
        autocomplete="new-password"
      />
      <InputText
        label="パスワード再確認"
        type="password"
        bind:value={newPasswordConfirmation}
        errorMessages={messages.newPasswordConfirmation}
      />

      <ion-item button on:click={openTerms}>
        <ion-icon color="yellow" name="document-text-outline" slot="start" />
        <ion-label>利用規約はこちら</ion-label>
      </ion-item>

      <InputCheckbox label="利用規約に同意する" bind:checked={term} />

      <RecaptchaV2 bind:this={recaptcha} />
      <Messages type="error" messages={messages.recaptcha} />

      <ion-item
        disabled={!term || !name || !newPassword || !newPasswordConfirmation}
        on:click={signup}
        button
      >
        <ion-icon color="green" name="person-add-outline" slot="start" />
        <ion-label>登録</ion-label>
      </ion-item>
      <Messages type="error" messages={messages._} />
    </form>
  </ion-item-group>
</ion-list>

<!-- Modal -->
<span style="display:none">
  <span bind:this={terms}>
    <ModalContent>
      <Terms />
    </ModalContent>
  </span>
</span>
