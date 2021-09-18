<script lang="ts">
import { ApolloError } from "@apollo/client";
import { mutation } from "svelte-apollo";
import type {
  ChangeStatusInput,
  ChangeStatusMutationVariables,
  ChangeStatusPayload
} from "~/graphql/types";
import {
  ArtistDocument, ChangeStatusDocument
} from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import {
  closeLoading, openConfirm, openLoading, openToast
} from "~/lib/ionic";
import {
  isAllowed, meQuery
} from "~/lib/me";

export let id: string;
export let refresh: () => void;

const changeStatus =
  mutation<ChangeStatusPayload, ChangeStatusMutationVariables>(
    ChangeStatusDocument
  );

const change = () => {

  openConfirm({
    buttons: [
      {
        cssClass: "secondary",
        handler: () => true,
        role: "cancel",
        text: "キャンセル"
      },
      {
        handler: (values: ChangeStatusInput) => {

          (async () => {

            try {

              if (values) {

                await openLoading();

                await changeStatus({
                  refetchQueries: [
                    {
                      query: ArtistDocument,
                      variables: { id }
                    }
                  ],
                  variables: { input: {
                    artistId: id,
                    ...values
                  } }
                });

                refresh();

                openToast({
                  color: "light-green",
                  duration: 5000,
                  message: "ステータスを更新しました"
                });

              }

            } catch (error) {

              if (error instanceof ApolloError) {

                const messages = errorMessages(error);

                openToast({
                  color: "light-red",
                  duration: 5000,
                  message: `エラーが発生しました。[${messages._?.join(", ")}]`
                });

              }

            } finally {

              await closeLoading();

            }

          })();

        },
        text: "更新"
      }
    ],
    header: "ステータスを変更しますか？",
    inputs: [
      {
        label: "有効",
        type: "radio",
        value: {
          only: true,
          status: "ACTIVE",
          tweet: false
        }
      },
      {
        label: "保留",
        type: "radio",
        value: {
          only: true,
          status: "PENDING",
          tweet: false
        }
      },
      {
        label: "除外",
        type: "radio",
        value: {
          only: true,
          status: "IGNORE",
          tweet: false
        }
      }
    ]
  });

};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "upsertAlbum")}
  <ion-fab-button color="white" on:click={change}>
    <ion-icon name="hourglass-outline" />
  </ion-fab-button>
{/if}
