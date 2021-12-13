<script lang="ts">
import { ApolloError } from "@apollo/client";
import { mutation } from "svelte-apollo";
import type {
  ChangeArtistStatusInput,
  ChangeArtistStatusMutationVariables,
  ChangeArtistStatusPayload,
} from "~/graphql/types";
import { ArtistDocument, ChangeArtistStatusDocument } from "~/graphql/types";
import { errorMessages } from "~/lib/error";
import { closeLoading, openConfirm, openLoading, openToast } from "~/lib/ionic";
import { isAllowed, meQuery } from "~/lib/me";

export let id: string;
export let refresh: () => void;

const changeArtistStatus = mutation<
  ChangeArtistStatusPayload,
  ChangeArtistStatusMutationVariables
>(ChangeArtistStatusDocument);

const change = () => {
  openConfirm({
    buttons: [
      {
        cssClass: "secondary",
        handler: () => true,
        role: "cancel",
        text: "キャンセル",
      },
      {
        handler: (values: ChangeArtistStatusInput) => {
          (async () => {
            try {
              if (values) {
                await openLoading();

                await changeArtistStatus({
                  refetchQueries: [
                    {
                      query: ArtistDocument,
                      variables: { id },
                    },
                  ],
                  variables: {
                    input: {
                      ...values,
                      id,
                    },
                  },
                });

                refresh();

                openToast({
                  color: "light-green",
                  duration: 5000,
                  message: "ステータスを更新しました",
                });
              }
            } catch (error) {
              if (error instanceof ApolloError) {
                const messages = errorMessages(error);

                openToast({
                  color: "light-red",
                  duration: 5000,
                  message: `エラーが発生しました。[${messages._?.join(", ")}]`,
                });
              }
            } finally {
              await closeLoading();
            }
          })();
        },
        text: "更新",
      },
    ],
    header: "ステータスを変更しますか？",
    inputs: [
      {
        label: "有効",
        type: "radio",
        value: {
          only: true,
          status: "ACTIVE",
          tweet: false,
        },
      },
      {
        label: "保留",
        type: "radio",
        value: {
          only: true,
          status: "PENDING",
          tweet: false,
        },
      },
      {
        label: "除外",
        type: "radio",
        value: {
          only: true,
          status: "IGNORE",
          tweet: false,
        },
      },
    ],
  });
};

const query = meQuery();
$: me = $query?.data?.me;
</script>

{#if me && isAllowed(me, "changeArtistStatus")}
  <ion-fab-button color="white" on:click={change}>
    <ion-icon name="hourglass-outline" />
  </ion-fab-button>
{/if}
