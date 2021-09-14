<script lang="ts">
import { goto } from "@roxi/routify";
import { mutation } from "svelte-apollo";
import type {
  DeleteRadioMutation,
  DeleteRadioMutationVariables
} from "~/graphql/types";
import { DeleteRadioDocument } from "~/graphql/types";
import {
  openConfirm, openToast
} from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id: string;

const deleteRadio =
  mutation<DeleteRadioMutation, DeleteRadioMutationVariables>(
    DeleteRadioDocument
  );

const remove = () => {

  openConfirm({
    buttons: [
      {
        cssClass: "secondary",
        handler: () => true,
        role: "cancel",
        text: "キャンセル"
      },
      {
        handler: () => {

          (async () => {

            try {

              await deleteRadio({ variables: { input: { radioId: id } } });

              openToast({
                color: "light-green",
                duration: 5000,
                message: "ラジオを削除しました"
              });

              $goto("/radios");

            } catch (error) {

              openToast({
                color: "light-red",
                duration: 5000,
                message: "エラーが発生しました"
              });

            }

          })();

        },
        text: "削除"
      }
    ],
    header: "削除しますか？"
  });

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "deleteRadio")}
  <ion-fab-button color="red" on:click={remove}>
    <ion-icon name="trash-outline" />
  </ion-fab-button>
{/if}
